import { useState, useEffect } from 'react';
import { Navigation } from '../components/navigation';
import { GlassCard } from '../components/ui/glass-card';
import { Button } from '../components/ui/button';
import { useMarketData } from '../hooks/use-market-data';
import { Filter, TrendingUp, TrendingDown, Volume, Eye, Star, ArrowUpDown } from 'lucide-react';

interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  pe: number;
  pb: number;
}

export default function ScreenersPage() {
  const { data: marketData } = useMarketData();
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('changePercent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // Generate comprehensive stock data
    const generateStocks = (): Stock[] => {
      const sectors = ['Banking', 'IT', 'Pharma', 'Auto', 'FMCG', 'Metals', 'Energy', 'Real Estate', 'Telecom', 'Media'];
      const stockNames = [
        'Reliance Industries', 'Tata Consultancy Services', 'HDFC Bank', 'Infosys', 'ICICI Bank',
        'Hindustan Unilever', 'State Bank of India', 'ITC', 'Bharti Airtel', 'Larsen & Toubro',
        'Asian Paints', 'Axis Bank', 'Bajaj Finance', 'Maruti Suzuki', 'Nestle India',
        'Kotak Mahindra Bank', 'HCL Technologies', 'Titan Company', 'UltraTech Cement', 'Wipro',
        'Sun Pharmaceutical', 'Tech Mahindra', 'Bajaj Finserv', 'ONGC', 'Tata Steel',
        'Power Grid Corporation', 'NTPC', 'JSW Steel', 'Adani Enterprises', 'Grasim Industries',
        'IndusInd Bank', 'Mahindra & Mahindra', 'Coal India', 'Cipla', 'Eicher Motors',
        'Bajaj Auto', 'BPCL', 'Shree Cement', 'Divis Laboratories', 'SBI Life Insurance',
        'Britannia Industries', 'Tata Consumer Products', 'Apollo Hospitals', 'Hero MotoCorp', 'Dr Reddys Labs',
        'HDFC Life Insurance', 'IOC', 'Hindalco Industries', 'Vedanta', 'Godrej Consumer',
        'Pidilite Industries', 'Dabur India', 'Marico', 'Berger Paints', 'Page Industries',
        'Muthoot Finance', 'Bandhan Bank', 'Avenue Supermarts', 'Info Edge', 'MindTree',
        'L&T Infotech', 'Persistent Systems', 'Mphasis', 'HDFC AMC', 'SBI Cards',
        'Zomato', 'Paytm', 'Nykaa', 'PolicyBazaar', 'Delhivery'
      ];

      return stockNames.map((name, index) => {
        const basePrice = 100 + Math.random() * 5000;
        const changePercent = (Math.random() - 0.5) * 20; // -10% to +10%
        const change = (basePrice * changePercent) / 100;
        
        return {
          id: `stock-${index + 1}`,
          symbol: name.replace(/[^A-Z]/g, '').substring(0, 8) || `STK${index}`,
          name: name,
          price: basePrice,
          change: change,
          changePercent: changePercent,
          volume: Math.floor(Math.random() * 10000000) + 100000,
          marketCap: Math.floor(Math.random() * 500000) + 10000,
          sector: sectors[index % sectors.length],
          pe: 5 + Math.random() * 50,
          pb: 0.5 + Math.random() * 10
        };
      });
    };

    const generatedStocks = generateStocks();
    setStocks(generatedStocks);
    setFilteredStocks(generatedStocks);
  }, []);

  useEffect(() => {
    let filtered = [...stocks];

    // Apply filters
    switch (activeFilter) {
      case 'gainers':
        filtered = filtered.filter(stock => stock.changePercent > 0);
        break;
      case 'losers':
        filtered = filtered.filter(stock => stock.changePercent < 0);
        break;
      case 'high-volume':
        filtered = filtered.filter(stock => stock.volume > 5000000);
        break;
      case 'large-cap':
        filtered = filtered.filter(stock => stock.marketCap > 100000);
        break;
      case 'mid-cap':
        filtered = filtered.filter(stock => stock.marketCap > 25000 && stock.marketCap <= 100000);
        break;
      case 'small-cap':
        filtered = filtered.filter(stock => stock.marketCap <= 25000);
        break;
      case 'banking':
        filtered = filtered.filter(stock => stock.sector === 'Banking');
        break;
      case 'it':
        filtered = filtered.filter(stock => stock.sector === 'IT');
        break;
      case 'pharma':
        filtered = filtered.filter(stock => stock.sector === 'Pharma');
        break;
      default:
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (sortBy) {
        case 'changePercent':
          aValue = a.changePercent;
          bValue = b.changePercent;
          break;
        case 'volume':
          aValue = a.volume;
          bValue = b.volume;
          break;
        case 'marketCap':
          aValue = a.marketCap;
          bValue = b.marketCap;
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        default:
          aValue = a.changePercent;
          bValue = b.changePercent;
      }

      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

    setFilteredStocks(filtered);
  }, [activeFilter, sortBy, sortOrder, stocks]);

  const filters = [
    { id: 'all', label: 'All Stocks', icon: <Filter className="w-4 h-4" /> },
    { id: 'gainers', label: 'Top Gainers', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'losers', label: 'Top Losers', icon: <TrendingDown className="w-4 h-4" /> },
    { id: 'high-volume', label: 'High Volume', icon: <Volume className="w-4 h-4" /> },
    { id: 'large-cap', label: 'Large Cap', icon: <Star className="w-4 h-4" /> },
    { id: 'mid-cap', label: 'Mid Cap', icon: <Star className="w-4 h-4" /> },
    { id: 'small-cap', label: 'Small Cap', icon: <Star className="w-4 h-4" /> },
    { id: 'banking', label: 'Banking', icon: <Filter className="w-4 h-4" /> },
    { id: 'it', label: 'IT', icon: <Filter className="w-4 h-4" /> },
    { id: 'pharma', label: 'Pharma', icon: <Filter className="w-4 h-4" /> }
  ];

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const formatVolume = (volume: number) => {
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(1)}Cr`;
    if (volume >= 100000) return `${(volume / 100000).toFixed(1)}L`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toString();
  };

  const formatMarketCap = (cap: number) => {
    if (cap >= 100000) return `₹${(cap / 100000).toFixed(1)}L Cr`;
    if (cap >= 1000) return `₹${(cap / 1000).toFixed(1)}K Cr`;
    return `₹${cap.toFixed(0)} Cr`;
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display gradient-text mb-4">Market Screeners</h1>
          <p className="text-gray-400 text-lg">Find the stocks that are about to absolutely moon 🚀</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {filters.map(filter => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter.id)}
              className="rounded-xl"
            >
              {filter.icon}
              <span className="ml-2">{filter.label}</span>
            </Button>
          ))}
        </div>

        {/* Results Table */}
        <GlassCard className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {filters.find(f => f.id === activeFilter)?.label} ({filteredStocks.length})
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Sort by:</span>
                <Button variant="outline" size="sm" onClick={() => handleSort('changePercent')} className="rounded-xl">
                  Change % <ArrowUpDown className="w-3 h-3 ml-1" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSort('volume')} className="rounded-xl">
                  Volume <ArrowUpDown className="w-3 h-3 ml-1" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleSort('marketCap')} className="rounded-xl">
                  Market Cap <ArrowUpDown className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Stock</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Price</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Change</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Volume</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Market Cap</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.slice(0, 50).map((stock, index) => (
                    <tr key={stock.id} className="border-b border-gray-800 hover:bg-darker/30 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-white">{stock.name}</div>
                          <div className="text-sm text-gray-400">{stock.symbol} • {stock.sector}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="text-white font-medium">₹{formatNumber(stock.price)}</div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className={`font-medium ${stock.changePercent >= 0 ? 'text-accent' : 'text-coral'}`}>
                          {stock.changePercent >= 0 ? '+' : ''}{formatNumber(stock.change)}
                        </div>
                        <div className={`text-sm ${stock.changePercent >= 0 ? 'text-accent' : 'text-coral'}`}>
                          {stock.changePercent >= 0 ? '+' : ''}{formatNumber(stock.changePercent)}%
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="text-white font-medium">{formatVolume(stock.volume)}</div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="text-white font-medium">{formatMarketCap(stock.marketCap)}</div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>

        {filteredStocks.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No stocks match your current filters</p>
            <p className="text-gray-500">Try adjusting your criteria or selecting a different filter</p>
          </div>
        )}
      </main>
    </div>
  );
}