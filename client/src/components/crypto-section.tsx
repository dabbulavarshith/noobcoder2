import { useState, useEffect } from 'react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import type { CryptoData } from '../types/market';

export function CryptoSection() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 2987450,
      change: 35670,
      changePercent: 1.2,
      icon: '₿'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 198245,
      change: -1587,
      changePercent: -0.8,
      icon: 'Ξ'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 8234,
      change: 169,
      changePercent: 2.1,
      icon: '⊕'
    }
  ]);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(crypto => {
        const changePercent = (Math.random() - 0.5) * 0.5; // Small random change
        const newPrice = crypto.price * (1 + changePercent / 100);
        const change = newPrice - crypto.price;
        
        return {
          ...crypto,
          price: newPrice,
          change,
          changePercent,
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const formatChange = (changePercent: number) => {
    const sign = changePercent >= 0 ? '+' : '';
    return `${sign}${changePercent.toFixed(1)}%`;
  };

  const getIconColor = (symbol: string) => {
    switch (symbol) {
      case 'BTC': return 'bg-orange-500';
      case 'ETH': return 'bg-blue-500';
      case 'SOL': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <GlassCard>
      <div className="mb-6">
        <h3 className="text-xl font-bold font-display gradient-text">Crypto Markets</h3>
        <p className="text-gray-400 text-sm mt-1">Digital assets that never sleep 💎</p>
      </div>
      
      <div className="space-y-4">
        {cryptoData.map((crypto) => (
          <div 
            key={crypto.symbol}
            className="flex items-center justify-between p-3 bg-darker/50 rounded-xl border border-gray-700 hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${getIconColor(crypto.symbol)} rounded-full flex items-center justify-center text-xs font-bold text-white`}>
                {crypto.icon}
              </div>
              <div>
                <div className="text-white font-medium text-sm">{crypto.name}</div>
                <div className="text-gray-400 text-xs">{crypto.symbol}/INR</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-mono text-sm">{formatPrice(crypto.price)}</div>
              <div className={`text-xs ${crypto.changePercent >= 0 ? 'text-accent' : 'text-coral'}`}>
                {formatChange(crypto.changePercent)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        variant="ghost" 
        className="w-full mt-4 text-primary hover:text-primary/80 text-sm font-medium"
      >
        View All Cryptos →
      </Button>
    </GlassCard>
  );
}
