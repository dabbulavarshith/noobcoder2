import { useState, useEffect } from 'react';
import { Navigation } from '../components/navigation';
import { GlassCard } from '../components/ui/glass-card';
import { Button } from '../components/ui/button';
import { useMarketData } from '../hooks/use-market-data';
import { BarChart3, TrendingUp, TrendingDown, Maximize2, RefreshCw, Settings } from 'lucide-react';

export default function ChartsPage() {
  const { data: marketData, isLoading } = useMarketData();
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY');
  const [timeFrame, setTimeFrame] = useState('1D');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chartData, setChartData] = useState<Array<{time: string, price: number, volume: number}>>([]);

  useEffect(() => {
    // Generate realistic chart data for the selected symbol
    const generateChartData = () => {
      const data = [];
      const basePrice = selectedSymbol === 'NIFTY' ? 19500 : selectedSymbol === 'BANKNIFTY' ? 45000 : 3500;
      let currentPrice = basePrice;
      
      for (let i = 0; i < 100; i++) {
        const time = new Date(Date.now() - (100 - i) * 15 * 60 * 1000).toISOString();
        const change = (Math.random() - 0.5) * 2; // Random walk
        currentPrice += change;
        const volume = Math.floor(Math.random() * 1000000) + 100000;
        
        data.push({
          time,
          price: currentPrice,
          volume
        });
      }
      
      return data;
    };

    setChartData(generateChartData());
  }, [selectedSymbol]);

  const getCurrentPrice = () => {
    const symbolData = marketData.find(item => item.symbol === selectedSymbol);
    return symbolData ? symbolData.price : chartData[chartData.length - 1]?.price || 0;
  };

  const getCurrentChange = () => {
    const symbolData = marketData.find(item => item.symbol === selectedSymbol);
    return symbolData ? symbolData.changePercent : 0;
  };

  const symbols = [
    { name: 'NIFTY 50', symbol: 'NIFTY' },
    { name: 'BANK NIFTY', symbol: 'BANKNIFTY' },
    { name: 'RELIANCE', symbol: 'RELIANCE' },
    { name: 'TCS', symbol: 'TCS' },
    { name: 'INFY', symbol: 'INFY' },
    { name: 'HDFC BANK', symbol: 'HDFCBANK' },
    { name: 'ITC', symbol: 'ITC' },
    { name: 'L&T', symbol: 'LT' }
  ];

  const timeFrames = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'];

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display gradient-text mb-4">Live Charts</h1>
          <p className="text-gray-400 text-lg">Real-time charts that update faster than your TikTok feed 📊</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-3">
            <GlassCard className="p-6">
              {/* Chart Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-white">{selectedSymbol}</h2>
                  <div className="flex items-center space-x-2">
                    <div className="text-3xl font-bold text-white">
                      ₹{getCurrentPrice().toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </div>
                    <div className={`flex items-center px-3 py-1 rounded-xl ${
                      getCurrentChange() >= 0 ? 'bg-accent/20 text-accent' : 'bg-coral/20 text-coral'
                    }`}>
                      {getCurrentChange() >= 0 ? 
                        <TrendingUp className="w-4 h-4 mr-1" /> : 
                        <TrendingDown className="w-4 h-4 mr-1" />
                      }
                      {getCurrentChange() >= 0 ? '+' : ''}{getCurrentChange().toFixed(2)}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-xl"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Time Frame Selector */}
              <div className="flex items-center space-x-2 mb-6">
                {timeFrames.map(tf => (
                  <Button
                    key={tf}
                    variant={timeFrame === tf ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeFrame(tf)}
                    className="rounded-xl"
                  >
                    {tf}
                  </Button>
                ))}
              </div>

              {/* Chart Container */}
              <div className={`relative rounded-2xl bg-gradient-to-br from-darker/50 via-dark to-darker/80 border border-gray-700/50 ${isFullscreen ? 'h-screen' : 'h-96'}`}>
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-20 grid-rows-10 h-full w-full">
                    {Array.from({ length: 200 }).map((_, i) => (
                      <div key={i} className="border border-gray-700/30"></div>
                    ))}
                  </div>
                </div>

                {/* Simulated Chart */}
                <div className="relative p-6 h-full">
                  <svg className="w-full h-full">
                    {/* Price Line */}
                    <polyline
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      points={chartData.map((point, index) => 
                        `${(index / chartData.length) * 100}% ${100 - ((point.price - Math.min(...chartData.map(d => d.price))) / (Math.max(...chartData.map(d => d.price)) - Math.min(...chartData.map(d => d.price)))) * 80}%`
                      ).join(' ')}
                    />
                    
                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00D4FF" />
                        <stop offset="50%" stopColor="#5DECA0" />
                        <stop offset="100%" stopColor="#FF6B6B" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Chart Info Overlay */}
                  <div className="absolute top-6 left-6 bg-dark/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 space-y-1">
                      <div>Open: ₹{(getCurrentPrice() * 0.99).toFixed(2)}</div>
                      <div>High: ₹{(getCurrentPrice() * 1.02).toFixed(2)}</div>
                      <div>Low: ₹{(getCurrentPrice() * 0.97).toFixed(2)}</div>
                      <div>Volume: {(Math.random() * 10000000).toFixed(0)}</div>
                    </div>
                  </div>

                  {/* Live Indicator */}
                  <div className="absolute top-6 right-6 flex items-center bg-dark/80 backdrop-blur-sm rounded-xl p-3 border border-gray-700">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse mr-2"></div>
                    <span className="text-sm text-accent font-medium">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Chart Tools */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-400">Chart Tools:</span>
                  <Button variant="outline" size="sm" className="rounded-xl">Trend Lines</Button>
                  <Button variant="outline" size="sm" className="rounded-xl">Fibonacci</Button>
                  <Button variant="outline" size="sm" className="rounded-xl">Support/Resistance</Button>
                </div>
                <div className="text-sm text-gray-400">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Symbol Selector */}
          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold font-display gradient-text mb-4">Symbols</h3>
              <div className="space-y-2">
                {symbols.map(symbol => (
                  <button
                    key={symbol.symbol}
                    onClick={() => setSelectedSymbol(symbol.symbol)}
                    className={`w-full text-left p-3 rounded-xl transition-colors ${
                      selectedSymbol === symbol.symbol 
                        ? 'bg-primary/20 border border-primary/50 text-white' 
                        : 'bg-darker/30 border border-gray-700 text-gray-300 hover:bg-darker/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{symbol.name}</div>
                        <div className="text-xs text-gray-400">{symbol.symbol}</div>
                      </div>
                      <div className="text-right">
                        {(() => {
                          const symbolData = marketData.find(item => item.symbol === symbol.symbol);
                          return symbolData ? (
                            <>
                              <div className="text-sm">₹{symbolData.price.toFixed(2)}</div>
                              <div className={`text-xs ${symbolData.changePercent >= 0 ? 'text-accent' : 'text-coral'}`}>
                                {symbolData.changePercent >= 0 ? '+' : ''}
                                {symbolData.changePercent.toFixed(2)}%
                              </div>
                            </>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>

            {/* Quick Stats */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold font-display gradient-text mb-4">Market Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Advances</span>
                  <span className="text-accent font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Declines</span>
                  <span className="text-coral font-medium">892</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Unchanged</span>
                  <span className="text-gray-300 font-medium">341</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">New Highs</span>
                  <span className="text-accent font-medium">67</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">New Lows</span>
                  <span className="text-coral font-medium">23</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
}