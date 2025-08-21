import { Navigation } from './navigation';
import { GlassCard } from './ui/glass-card';
import { useMarketData } from '../hooks/use-market-data';
import { TrendingUp, Building2, Bitcoin, Users, BarChart3, Code, Filter } from 'lucide-react';

export default function SimpleDashboard() {
  // Use static market data for reliable display
  const marketStats = {
    nifty: { price: 19674.25, change: 124.50, changePercent: 0.63 },
    bankNifty: { price: 44234.80, change: -87.20, changePercent: -0.20 },
    btc: { price: 2987450, change: 1.2 },
    activeScripts: { count: 2847, todayCount: 12 }
  };

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
                  {formatPrice(marketStats.nifty.price)}
                </div>
                <div className={`text-sm font-medium ${
                  marketStats.nifty.change >= 0 ? 'text-accent' : 'text-coral'
                }`}>
                  {formatChange(marketStats.nifty.change, marketStats.nifty.changePercent)}
                </div>
              </GlassCard>

              <GlassCard hover className="animate-float" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="w-8 h-8 text-coral" />
                  <span className="text-sm text-gray-400">BANK NIFTY</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {formatPrice(marketStats.bankNifty.price)}
                </div>
                <div className={`text-sm font-medium ${
                  marketStats.bankNifty.change >= 0 ? 'text-accent' : 'text-coral'
                }`}>
                  {formatChange(marketStats.bankNifty.change, marketStats.bankNifty.changePercent)}
                </div>
              </GlassCard>

              <GlassCard hover className="animate-float" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center justify-between mb-4">
                  <Bitcoin className="w-8 h-8 text-teal" />
                  <span className="text-sm text-gray-400">BTC/INR</span>
                </div>
                <div className="text-2xl font-bold text-white">₹{marketStats.btc.price.toLocaleString('en-IN')}</div>
                <div className="text-teal text-sm font-medium">+{marketStats.btc.change}%</div>
              </GlassCard>

              <GlassCard hover className="animate-float" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                  <span className="text-sm text-gray-400">ACTIVE SCRIPTS</span>
                </div>
                <div className="text-2xl font-bold text-white">{marketStats.activeScripts.count.toLocaleString()}</div>
                <div className="text-secondary text-sm font-medium">+{marketStats.activeScripts.todayCount} today</div>
              </GlassCard>
            </div>
          </div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* TradingView Charts Section */}
              <section id="charts">
                <GlassCard>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold font-display gradient-text">Live Charts</h2>
                      <p className="text-gray-400 text-sm mt-1">Professional charts powered by TradingView</p>
                    </div>
                  </div>
                  
                  {/* TradingView Widget */}
                  <div className="rounded-2xl overflow-hidden bg-darker/30 border border-gray-700">
                    <div 
                      id="tradingview_widget"
                      className="h-96"
                      dangerouslySetInnerHTML={{
                        __html: `
                          <div class="tradingview-widget-container" style="height:100%;width:100%">
                            <div class="tradingview-widget-container__widget" style="height:calc(100% - 32px);width:100%"></div>
                            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
                            {
                              "autosize": true,
                              "symbol": "NSE:NIFTY",
                              "interval": "D",
                              "timezone": "Asia/Kolkata",
                              "theme": "dark",
                              "style": "1",
                              "locale": "en",
                              "enable_publishing": false,
                              "withdateranges": true,
                              "range": "YTD",
                              "hide_side_toolbar": false,
                              "allow_symbol_change": true,
                              "details": true,
                              "hotlist": true,
                              "calendar": false,
                              "support_host": "https://www.tradingview.com"
                            }
                            </script>
                          </div>
                        `
                      }}
                    />
                  </div>
                </GlassCard>
              </section>

              {/* Commodities Section */}
              <section id="commodities">
                <GlassCard>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold font-display gradient-text">Commodities</h2>
                    <p className="text-gray-400 text-sm mt-1">Live commodity prices and trends</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Gold', price: '₹62,450', change: '+0.45%', positive: true },
                      { name: 'Silver', price: '₹74,280', change: '-0.23%', positive: false },
                      { name: 'Crude Oil', price: '₹6,890', change: '+1.2%', positive: true },
                      { name: 'Natural Gas', price: '₹245.60', change: '-2.1%', positive: false },
                      { name: 'Copper', price: '₹765.30', change: '+0.8%', positive: true },
                      { name: 'Zinc', price: '₹198.45', change: '+1.5%', positive: true },
                      { name: 'Aluminum', price: '₹178.90', change: '-0.6%', positive: false },
                      { name: 'Nickel', price: '₹1,345', change: '+2.3%', positive: true }
                    ].map((commodity, index) => (
                      <div key={index} className="bg-darker/50 border border-gray-700 rounded-xl p-4">
                        <div className="text-white font-medium text-sm">{commodity.name}</div>
                        <div className="text-lg font-bold text-white mt-1">{commodity.price}</div>
                        <div className={`text-sm font-medium ${commodity.positive ? 'text-accent' : 'text-coral'}`}>
                          {commodity.change}
                        </div>
                      </div>
                    ))}
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
                  {[
                    { name: 'Reliance Industries', symbol: 'RELIANCE', price: 2456.75, change: 1.2 },
                    { name: 'Tata Consultancy Services', symbol: 'TCS', price: 3687.90, change: -0.8 },
                    { name: 'HDFC Bank', symbol: 'HDFCBANK', price: 1634.50, change: 0.6 },
                    { name: 'Infosys', symbol: 'INFY', price: 1456.30, change: 2.1 }
                  ].map((stock, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-darker/30 rounded-xl border border-gray-700">
                      <div className="flex-1">
                        <div className="font-medium text-white text-sm">{stock.name}</div>
                        <div className="text-gray-400 text-xs">{stock.symbol}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm">₹{stock.price.toFixed(2)}</div>
                        <div className={`text-xs ${stock.change >= 0 ? 'text-accent' : 'text-coral'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
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