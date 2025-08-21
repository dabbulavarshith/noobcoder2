import { GlassCard } from './ui/glass-card';
import { useMarketData } from '../hooks/use-market-data';
import { TrendingUp, Building2, Bitcoin, Users } from 'lucide-react';

export function HeroSection() {
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
  );
}
