import { useState } from 'react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { useTopGainers, useTopLosers, useHighVolumeStocks } from '../hooks/use-market-data';

export function MarketScreener() {
  const [marketCap, setMarketCap] = useState('');
  const [sector, setSector] = useState('');
  const [activeFilter, setActiveFilter] = useState('gainers');

  const { data: gainers } = useTopGainers();
  const { data: losers } = useTopLosers();
  const { data: highVolume } = useHighVolumeStocks();

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const getCurrentData = () => {
    switch (activeFilter) {
      case 'gainers': return gainers || [];
      case 'losers': return losers || [];
      case 'volume': return highVolume || [];
      default: return [];
    }
  };

  return (
    <section id="screeners">
      <GlassCard>
        <div className="mb-6">
          <h3 className="text-xl font-bold font-display gradient-text">Market Screener</h3>
          <p className="text-gray-400 text-sm mt-1">Find the stocks that are about to moon 🚀</p>
        </div>
        
        {/* Quick Filters */}
        <div className="space-y-4 mb-6">
          <Button
            variant={activeFilter === 'gainers' ? 'default' : 'ghost'}
            onClick={() => handleFilterClick('gainers')}
            className={`w-full justify-between p-3 h-auto ${
              activeFilter === 'gainers' 
                ? 'bg-primary/20 border-primary/30 text-white' 
                : 'bg-darker/50 border-gray-700 text-white hover:bg-primary/20'
            }`}
          >
            <span className="font-medium">Top Gainers</span>
            <TrendingUp className="w-5 h-5 text-accent" />
          </Button>
          
          <Button
            variant={activeFilter === 'losers' ? 'default' : 'ghost'}
            onClick={() => handleFilterClick('losers')}
            className={`w-full justify-between p-3 h-auto ${
              activeFilter === 'losers' 
                ? 'bg-primary/20 border-primary/30 text-white' 
                : 'bg-darker/50 border-gray-700 text-white hover:bg-primary/20'
            }`}
          >
            <span className="font-medium">Top Losers</span>
            <TrendingDown className="w-5 h-5 text-coral" />
          </Button>
          
          <Button
            variant={activeFilter === 'volume' ? 'default' : 'ghost'}
            onClick={() => handleFilterClick('volume')}
            className={`w-full justify-between p-3 h-auto ${
              activeFilter === 'volume' 
                ? 'bg-primary/20 border-primary/30 text-white' 
                : 'bg-darker/50 border-gray-700 text-white hover:bg-primary/20'
            }`}
          >
            <span className="font-medium">High Volume</span>
            <BarChart3 className="w-5 h-5 text-teal" />
          </Button>
        </div>

        {/* Results */}
        <div className="space-y-3 mb-6">
          {getCurrentData().slice(0, 5).map((stock, index) => (
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

        {/* Advanced Filters */}
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Market Cap</label>
            <Select value={marketCap} onValueChange={setMarketCap}>
              <SelectTrigger className="w-full bg-darker border-gray-600 text-white">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-darker border-gray-600">
                <SelectItem value="">All</SelectItem>
                <SelectItem value="large">Large Cap</SelectItem>
                <SelectItem value="mid">Mid Cap</SelectItem>
                <SelectItem value="small">Small Cap</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Sector</label>
            <Select value={sector} onValueChange={setSector}>
              <SelectTrigger className="w-full bg-darker border-gray-600 text-white">
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent className="bg-darker border-gray-600">
                <SelectItem value="">All Sectors</SelectItem>
                <SelectItem value="banking">Banking</SelectItem>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="pharma">Pharma</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="fmcg">FMCG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="w-full bg-accent hover:bg-accent/80 text-dark font-medium">
            Apply Filters
          </Button>
        </div>
      </GlassCard>
    </section>
  );
}
