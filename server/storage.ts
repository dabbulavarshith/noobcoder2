import { type User, type InsertUser, type PineScript, type InsertPineScript, type MarketData, type InsertMarketData, type PriceAlert, type InsertPriceAlert } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Pine Script methods
  getPineScripts(userId?: string): Promise<PineScript[]>;
  getPineScript(id: string): Promise<PineScript | undefined>;
  createPineScript(script: InsertPineScript & { userId: string }): Promise<PineScript>;
  updatePineScript(id: string, updates: Partial<PineScript>): Promise<PineScript | undefined>;
  deletePineScript(id: string): Promise<boolean>;
  searchPineScripts(query: string, category?: string): Promise<PineScript[]>;
  incrementScriptViews(id: string): Promise<void>;

  // Market Data methods
  getMarketData(symbols?: string[]): Promise<MarketData[]>;
  getMarketDataBySymbol(symbol: string): Promise<MarketData | undefined>;
  updateMarketData(symbol: string, data: InsertMarketData): Promise<MarketData>;
  getTopGainers(limit?: number): Promise<MarketData[]>;
  getTopLosers(limit?: number): Promise<MarketData[]>;
  getHighVolumeStocks(limit?: number): Promise<MarketData[]>;

  // Price Alert methods
  getPriceAlerts(userId: string): Promise<PriceAlert[]>;
  createPriceAlert(alert: InsertPriceAlert & { userId: string }): Promise<PriceAlert>;
  deletePriceAlert(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private pineScripts: Map<string, PineScript>;
  private marketData: Map<string, MarketData>;
  private priceAlerts: Map<string, PriceAlert>;

  constructor() {
    this.users = new Map();
    this.pineScripts = new Map();
    this.marketData = new Map();
    this.priceAlerts = new Map();
    this.seedMarketData();
    this.startMarketDataUpdates();
  }

  private startMarketDataUpdates() {
    // Generate subtle updates to simulate realistic market data
    setInterval(() => {
      this.marketData.forEach(item => {
        const change = (Math.random() - 0.5) * 0.003; // ±0.15% max change for realistic movement
        const oldPrice = item.price;
        item.price *= (1 + change);
        item.change = item.price - oldPrice;
        item.changePercent = (item.change / oldPrice) * 100;
        item.lastUpdated = new Date();
      });
    }, 15000); // Update every 15 seconds for less frequent fluctuations
  }

  private seedMarketData() {
    const sampleData: MarketData[] = [
      {
        id: randomUUID(),
        symbol: "NIFTY",
        name: "NIFTY 50",
        price: 19674.25,
        change: 124.50,
        changePercent: 0.63,
        volume: 0,
        marketCap: 0,
        sector: "Index",
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        symbol: "BANKNIFTY",
        name: "BANK NIFTY",
        price: 44234.80,
        change: -87.20,
        changePercent: -0.20,
        volume: 0,
        marketCap: 0,
        sector: "Index",
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd",
        price: 2456.75,
        change: 12.30,
        changePercent: 0.50,
        volume: 1250000,
        marketCap: 1660000000000,
        sector: "Oil & Gas",
        lastUpdated: new Date(),
      },
      {
        id: randomUUID(),
        symbol: "TCS",
        name: "Tata Consultancy Services",
        price: 3687.90,
        change: -45.20,
        changePercent: -1.21,
        volume: 890000,
        marketCap: 1340000000000,
        sector: "IT",
        lastUpdated: new Date(),
      },
    ];

    sampleData.forEach(data => {
      this.marketData.set(data.symbol, data);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Pine Script methods
  async getPineScripts(userId?: string): Promise<PineScript[]> {
    const scripts = Array.from(this.pineScripts.values());
    return userId ? scripts.filter(script => script.userId === userId) : scripts;
  }

  async getPineScript(id: string): Promise<PineScript | undefined> {
    return this.pineScripts.get(id);
  }

  async createPineScript(script: InsertPineScript & { userId: string }): Promise<PineScript> {
    const id = randomUUID();
    const newScript: PineScript = {
      ...script,
      id,
      description: script.description ?? null,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.pineScripts.set(id, newScript);
    return newScript;
  }

  async updatePineScript(id: string, updates: Partial<PineScript>): Promise<PineScript | undefined> {
    const script = this.pineScripts.get(id);
    if (!script) return undefined;

    const updatedScript = { ...script, ...updates, updatedAt: new Date() };
    this.pineScripts.set(id, updatedScript);
    return updatedScript;
  }

  async deletePineScript(id: string): Promise<boolean> {
    return this.pineScripts.delete(id);
  }

  async searchPineScripts(query: string, category?: string): Promise<PineScript[]> {
    const scripts = Array.from(this.pineScripts.values());
    return scripts.filter(script => {
      const matchesQuery = script.name.toLowerCase().includes(query.toLowerCase()) ||
                          script.description?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || script.category === category;
      return matchesQuery && matchesCategory;
    });
  }

  async incrementScriptViews(id: string): Promise<void> {
    const script = this.pineScripts.get(id);
    if (script) {
      script.views = (script.views || 0) + 1;
      this.pineScripts.set(id, script);
    }
  }

  // Market Data methods
  async getMarketData(symbols?: string[]): Promise<MarketData[]> {
    const data = Array.from(this.marketData.values());
    return symbols ? data.filter(item => symbols.includes(item.symbol)) : data;
  }

  async getMarketDataBySymbol(symbol: string): Promise<MarketData | undefined> {
    return this.marketData.get(symbol);
  }

  async updateMarketData(symbol: string, data: InsertMarketData): Promise<MarketData> {
    const existing = this.marketData.get(symbol);
    const updated: MarketData = {
      id: existing?.id || randomUUID(),
      ...data,
      volume: data.volume ?? null,
      marketCap: data.marketCap ?? null,
      sector: data.sector ?? null,
      lastUpdated: new Date(),
    };
    this.marketData.set(symbol, updated);
    return updated;
  }

  async getTopGainers(limit = 10): Promise<MarketData[]> {
    return Array.from(this.marketData.values())
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, limit);
  }

  async getTopLosers(limit = 10): Promise<MarketData[]> {
    return Array.from(this.marketData.values())
      .sort((a, b) => a.changePercent - b.changePercent)
      .slice(0, limit);
  }

  async getHighVolumeStocks(limit = 10): Promise<MarketData[]> {
    return Array.from(this.marketData.values())
      .filter(item => item.volume && item.volume > 0)
      .sort((a, b) => (b.volume || 0) - (a.volume || 0))
      .slice(0, limit);
  }

  // Price Alert methods
  async getPriceAlerts(userId: string): Promise<PriceAlert[]> {
    return Array.from(this.priceAlerts.values())
      .filter(alert => alert.userId === userId);
  }

  async createPriceAlert(alert: InsertPriceAlert & { userId: string }): Promise<PriceAlert> {
    const id = randomUUID();
    const newAlert: PriceAlert = {
      ...alert,
      id,
      isActive: true,
      createdAt: new Date(),
    };
    this.priceAlerts.set(id, newAlert);
    return newAlert;
  }

  async deletePriceAlert(id: string): Promise<boolean> {
    return this.priceAlerts.delete(id);
  }
}

export const storage = new MemStorage();
