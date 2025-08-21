import { Navigation } from './navigation';
import { GlassCard } from './ui/glass-card';
import { useMarketData } from '../hooks/use-market-data';
import { TrendingUp, Building2, Bitcoin, Users, BarChart3, Code, Filter } from 'lucide-react';

export default function SimpleDashboard() {
  const { data: marketData, isLoading } = useMarketData();

  const getMarketItem = (symbol: string) => {
    return marketData.find(item => item.symbol === symbol);
  };

  const nifty = getMarketItem('NIFTY');
  const bankNifty = getMarketItem('BANKNIFTY');

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatChange = (change: number, changePercent: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`;
  };

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-darker to-dark opacity-90"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
                <span className="gradient-text">Indian Markets</span><br />
                <span className="text-white">Just Hit Different</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Real-time data, fire Pine Scripts, and next-level analysis tools that actually make sense 📈
              </p>
            </div>

            {/* Live Market Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <GlassCard hover className="animate-float">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-accent" />
                  <span className="text-sm text-gray-400">NIFTY 50</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {isLoading ? 'Loading...' : nifty ? formatPrice(nifty.price) : 'N/A'}
                </div>
                <div className={`text-sm font-medium ${
                  nifty && nifty.change >= 0 ? 'text-accent' : 'text-coral'
                }`}>
                  {isLoading ? '' : nifty ? formatChange(nifty.change, nifty.changePercent) : 'N/A'}
                </div>
              </GlassCard>

              <GlassCard hover className="animate-float" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="w-8 h-8 text-coral" />
                  <span className="text-sm text-gray-400">BANK NIFTY</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {isLoading ? 'Loading...' : bankNifty ? formatPrice(bankNifty.price) : 'N/A'}
                </div>
                <div className={`text-sm font-medium ${
                  bankNifty && bankNifty.change >= 0 ? 'text-accent' : 'text-coral'
                }`}>
                  {isLoading ? '' : bankNifty ? formatChange(bankNifty.change, bankNifty.changePercent) : 'N/A'}
                </div>
              </GlassCard>

              <GlassCard hover className="animate-float" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center justify-between mb-4">
                  <Bitcoin className="w-8 h-8 text-teal" />
                  <span className="text-sm text-gray-400">BTC/INR</span>
                </div>
                <div className="text-2xl font-bold text-white">₹29,87,450</div>
                <div className="text-teal text-sm font-medium">+1.2%</div>
              </GlassCard>

              <GlassCard hover className="animate-float" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                  <span className="text-sm text-gray-400">ACTIVE SCRIPTS</span>
                </div>
                <div className="text-2xl font-bold text-white">2,847</div>
                <div className="text-secondary text-sm font-medium">+12 today</div>
              </GlassCard>
            </div>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Charts Section */}
              <section id="charts">
                <GlassCard>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold font-display gradient-text">Live Charts</h2>
                      <p className="text-gray-400 text-sm mt-1">Real-time data that hits different 📊</p>
                    </div>
                  </div>
                  
                  <div className="relative rounded-3xl p-6 h-96 bg-gradient-to-br from-darker/50 via-dark to-darker/80 border border-gray-700/50 backdrop-blur-xl overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                        {Array.from({ length: 96 }).map((_, i) => (
                          <div key={i} className="border border-gray-700/30"></div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="relative flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <div className="relative mb-6">
                          <BarChart3 className="w-20 h-20 text-primary mx-auto animate-pulse" />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-ping"></div>
                        </div>
                        <p className="text-xl font-semibold text-white mb-2">TradingView Integration Ready</p>
                        <p className="text-sm text-gray-300 mb-4">Real-time NIFTY 50 data streaming</p>
                        <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full text-primary text-sm font-medium">
                          <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></div>
                          Live Data Connected
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </section>

              {/* Pine Scripts */}
              <section id="pine-scripts">
                <GlassCard>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold font-display gradient-text">Pine Scripts</h2>
                      <p className="text-gray-400 text-sm mt-1">Your trading strategies, but make them smart ⚡</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-8">
                    <Code className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-gray-400">Upload your Pine Scripts to get started</p>
                    <p className="text-gray-500 text-sm mt-2">Drag and drop .pine files or click to browse</p>
                  </div>
                </GlassCard>
              </section>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Market Screener */}
              <GlassCard>
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-display gradient-text">Market Screener</h3>
                  <p className="text-gray-400 text-sm mt-1">Find the stocks that are about to moon 🚀</p>
                </div>
                
                <div className="space-y-4">
                  {marketData.slice(0, 4).map((stock, index) => (
                    <div key={stock.id || index} className="flex items-center justify-between p-3 bg-darker/30 rounded-xl border border-gray-700">
                      <div className="flex-1">
                        <div className="font-medium text-white text-sm">{stock.name}</div>
                        <div className="text-gray-400 text-xs">{stock.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm">₹{stock.price.toFixed(2)}</div>
                        <div className={`text-xs ${stock.changePercent >= 0 ? 'text-accent' : 'text-coral'}`}>
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Quick Tools */}
              <GlassCard>
                <h3 className="text-xl font-bold font-display gradient-text mb-6">Quick Tools</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-darker/50 border border-gray-700 rounded-xl p-4 text-center cursor-pointer hover:bg-primary/20 transition-colors">
                    <Filter className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-white text-sm font-medium">Screener</div>
                  </div>
                  <div className="bg-darker/50 border border-gray-700 rounded-xl p-4 text-center cursor-pointer hover:bg-secondary/20 transition-colors">
                    <BarChart3 className="w-6 h-6 text-secondary mx-auto mb-2" />
                    <div className="text-white text-sm font-medium">P&L Calc</div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold font-display gradient-text mb-4">MarketPulse</div>
            <p className="text-gray-400 text-sm">Advanced market analysis for the modern trader</p>
            <div className="mt-8 text-sm text-gray-400">
              &copy; 2024 MarketPulse. Made with ❤️ for traders
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}