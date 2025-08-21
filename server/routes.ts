import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertPineScriptSchema, insertPriceAlertSchema } from "@shared/schema";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Pine Scripts routes
  app.get("/api/pine-scripts", async (req, res) => {
    try {
      const { userId, search, category } = req.query;
      
      let scripts;
      if (search) {
        scripts = await storage.searchPineScripts(
          search as string,
          category as string | undefined
        );
      } else {
        scripts = await storage.getPineScripts(userId as string | undefined);
      }
      
      res.json(scripts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Pine Scripts" });
    }
  });

  app.post("/api/pine-scripts", async (req, res) => {
    try {
      const validatedData = insertPineScriptSchema.parse(req.body);
      const script = await storage.createPineScript({
        ...validatedData,
        userId: "default-user", // In a real app, get from auth
      });
      res.status(201).json(script);
    } catch (error) {
      res.status(400).json({ message: "Invalid Pine Script data" });
    }
  });

  app.post("/api/pine-scripts/bulk-upload", upload.array("scripts"), async (req: Request & { files?: any[] }, res) => {
    try {
      const files = req.files as any[];
      const scripts = [];

      for (const file of files) {
        const content = file.buffer.toString('utf-8');
        const fileName = file.originalname.replace('.pine', '');
        
        const script = await storage.createPineScript({
          name: fileName,
          description: `Uploaded script: ${fileName}`,
          category: "strategy",
          code: content,
          userId: "default-user",
        });
        
        scripts.push(script);
      }

      res.status(201).json(scripts);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload scripts" });
    }
  });

  app.put("/api/pine-scripts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertPineScriptSchema.partial().parse(req.body);
      const script = await storage.updatePineScript(id, validatedData);
      
      if (!script) {
        return res.status(404).json({ message: "Pine Script not found" });
      }
      
      res.json(script);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  app.delete("/api/pine-scripts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deletePineScript(id);
      
      if (!success) {
        return res.status(404).json({ message: "Pine Script not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete Pine Script" });
    }
  });

  app.post("/api/pine-scripts/:id/view", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.incrementScriptViews(id);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to increment views" });
    }
  });

  // Market Data routes
  app.get("/api/market-data", async (req, res) => {
    try {
      const { symbols } = req.query;
      const symbolArray = symbols ? (symbols as string).split(',') : undefined;
      const data = await storage.getMarketData(symbolArray);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });

  app.get("/api/market-data/gainers", async (req, res) => {
    try {
      const { limit = "10" } = req.query;
      const data = await storage.getTopGainers(parseInt(limit as string));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch top gainers" });
    }
  });

  app.get("/api/market-data/losers", async (req, res) => {
    try {
      const { limit = "10" } = req.query;
      const data = await storage.getTopLosers(parseInt(limit as string));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch top losers" });
    }
  });

  app.get("/api/market-data/high-volume", async (req, res) => {
    try {
      const { limit = "10" } = req.query;
      const data = await storage.getHighVolumeStocks(parseInt(limit as string));
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch high volume stocks" });
    }
  });

  // Price Alerts routes
  app.get("/api/price-alerts", async (req, res) => {
    try {
      const alerts = await storage.getPriceAlerts("default-user");
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch price alerts" });
    }
  });

  app.post("/api/price-alerts", async (req, res) => {
    try {
      const validatedData = insertPriceAlertSchema.parse(req.body);
      const alert = await storage.createPriceAlert({
        ...validatedData,
        userId: "default-user",
      });
      res.status(201).json(alert);
    } catch (error) {
      res.status(400).json({ message: "Invalid price alert data" });
    }
  });

  app.delete("/api/price-alerts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deletePriceAlert(id);
      
      if (!success) {
        return res.status(404).json({ message: "Price alert not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete price alert" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket server for real-time data
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    console.log('New WebSocket connection');

    // Send initial market data
    storage.getMarketData().then(data => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'market_data', data }));
      }
    });

    // Simulate real-time updates every 5 seconds
    const interval = setInterval(async () => {
      if (ws.readyState === WebSocket.OPEN) {
        const data = await storage.getMarketData();
        // Simulate price changes
        data.forEach(item => {
          const changePercent = (Math.random() - 0.5) * 0.1; // Small random change
          const newPrice = item.price * (1 + changePercent / 100);
          const change = newPrice - item.price;
          
          storage.updateMarketData(item.symbol, {
            ...item,
            price: newPrice,
            change,
            changePercent,
          });
        });

        const updatedData = await storage.getMarketData();
        ws.send(JSON.stringify({ type: 'market_data', data: updatedData }));
      }
    }, 5000);

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      clearInterval(interval);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clearInterval(interval);
    });
  });

  return httpServer;
}
