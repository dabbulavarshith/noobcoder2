import { useState } from 'react';
import { Navigation } from '../components/navigation';
import { GlassCard } from '../components/ui/glass-card';
import { Button } from '../components/ui/button';
import { TrendingUp, TrendingDown, Building2, Users, Newspaper, DollarSign } from 'lucide-react';

export default function MarketDataPage() {
  const [activeTab, setActiveTab] = useState('option-chain');

  const optionChainData = [
    { strike: 19400, callOI: 2456789, putOI: 1234567, callVol: 145678, putVol: 98765 },
    { strike: 19500, callOI: 3456789, putOI: 2345678, callVol: 256789, putVol: 187654 },
    { strike: 19600, callOI: 4567890, putOI: 3456789, callVol: 367890, putVol: 276543 },
    { strike: 19700, callOI: 5678901, putOI: 4567890, callVol: 478901, putVol: 365432 },
    { strike: 19800, callOI: 6789012, putOI: 5678901, callVol: 589012, putVol: 454321 }
  ];

  const fiiDiiData = [
    { date: '2024-01-15', fiiEquity: -1234.56, fiiDebt: 567.89, diiEquity: 2345.67, diiDebt: -123.45 },
    { date: '2024-01-14', fiiEquity: 2345.67, fiiDebt: -234.56, diiEquity: -1456.78, diiDebt: 345.67 },
    { date: '2024-01-13', fiiEquity: -3456.78, fiiDebt: 789.01, diiEquity: 3567.89, diiDebt: -567.89 },
    { date: '2024-01-12', fiiEquity: 4567.89, fiiDebt: -345.67, diiEquity: -2678.90, diiDebt: 678.90 },
    { date: '2024-01-11', fiiEquity: -567.89, fiiDebt: 456.78, diiEquity: 1789.01, diiDebt: -234.56 }
  ];

  const bulkDeals = [
    { company: 'Reliance Industries', buyer: 'Mukesh Ambani Trust', seller: 'Institutional Investor', quantity: 5000000, price: 2456.75 },
    { company: 'TCS', buyer: 'SBI Mutual Fund', seller: 'HDFC Mutual Fund', quantity: 2500000, price: 3687.90 },
    { company: 'HDFC Bank', buyer: 'ICICI Prudential MF', seller: 'Aditya Birla MF', quantity: 3000000, price: 1634.50 },
    { company: 'Infosys', buyer: 'LIC of India', seller: 'Foreign Portfolio Investor', quantity: 1800000, price: 1456.30 }
  ];

  const marketNews = [
    {
      title: 'RBI keeps repo rate unchanged at 6.5%, maintains accommodative stance',
      time: '2 hours ago',
      impact: 'positive'
    },
    {
      title: 'Nifty likely to test 20,000 levels amid strong FII inflows',
      time: '3 hours ago',
      impact: 'positive'
    },
    {
      title: 'IT sector faces headwinds as US recession fears mount',
      time: '4 hours ago',
      impact: 'negative'
    },
    {
      title: 'Banking stocks rally on improved credit growth expectations',
      time: '5 hours ago',
      impact: 'positive'
    },
    {
      title: 'Auto sector shows resilience despite supply chain challenges',
      time: '6 hours ago',
      impact: 'neutral'
    }
  ];

  const tabs = [
    { id: 'option-chain', label: 'Option Chain', icon: <Building2 className="w-4 h-4" /> },
    { id: 'fii-dii', label: 'FII/DII Data', icon: <Users className="w-4 h-4" /> },
    { id: 'bulk-deals', label: 'Bulk Deals', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'news', label: 'Market News', icon: <Newspaper className="w-4 h-4" /> }
  ];

  const formatNumber = (num: number) => {
    if (Math.abs(num) >= 10000000) return `${(num / 10000000).toFixed(2)}Cr`;
    if (Math.abs(num) >= 100000) return `${(num / 100000).toFixed(2)}L`;
    if (Math.abs(num) >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-display gradient-text mb-4">NSE Market Data</h1>
          <p className="text-gray-400 text-lg">Comprehensive market insights and institutional data</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id)}
              className="rounded-xl"
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Option Chain */}
        {activeTab === 'option-chain' && (
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold font-display gradient-text mb-6">NIFTY Option Chain</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Call OI</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Call Vol</th>
                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Strike</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Put Vol</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Put OI</th>
                  </tr>
                </thead>
                <tbody>
                  {optionChainData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-darker/30">
                      <td className="py-3 px-4 text-accent">{formatNumber(row.callOI)}</td>
                      <td className="py-3 px-4 text-white">{formatNumber(row.callVol)}</td>
                      <td className="py-3 px-4 text-center font-bold text-white">{row.strike}</td>
                      <td className="py-3 px-4 text-right text-white">{formatNumber(row.putVol)}</td>
                      <td className="py-3 px-4 text-right text-coral">{formatNumber(row.putOI)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {/* FII/DII Data */}
        {activeTab === 'fii-dii' && (
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold font-display gradient-text mb-6">FII/DII Investment Data</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">FII Equity</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">FII Debt</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">DII Equity</th>
                    <th className="text-right py-3 px-4 text-gray-400 font-medium">DII Debt</th>
                  </tr>
                </thead>
                <tbody>
                  {fiiDiiData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-darker/30">
                      <td className="py-3 px-4 text-white">{row.date}</td>
                      <td className={`py-3 px-4 text-right font-medium ${row.fiiEquity >= 0 ? 'text-accent' : 'text-coral'}`}>
                        ₹{Math.abs(row.fiiEquity).toFixed(2)}Cr
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${row.fiiDebt >= 0 ? 'text-accent' : 'text-coral'}`}>
                        ₹{Math.abs(row.fiiDebt).toFixed(2)}Cr
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${row.diiEquity >= 0 ? 'text-accent' : 'text-coral'}`}>
                        ₹{Math.abs(row.diiEquity).toFixed(2)}Cr
                      </td>
                      <td className={`py-3 px-4 text-right font-medium ${row.diiDebt >= 0 ? 'text-accent' : 'text-coral'}`}>
                        ₹{Math.abs(row.diiDebt).toFixed(2)}Cr
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}

        {/* Bulk Deals */}
        {activeTab === 'bulk-deals' && (
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold font-display gradient-text mb-6">Bulk Deals</h2>
            <div className="space-y-4">
              {bulkDeals.map((deal, index) => (
                <div key={index} className="bg-darker/30 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-white">{deal.company}</div>
                    <div className="text-accent font-medium">₹{deal.price.toFixed(2)}</div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <div className="flex items-center justify-between">
                      <span>Buyer: {deal.buyer}</span>
                      <span>Quantity: {formatNumber(deal.quantity)}</span>
                    </div>
                    <div className="mt-1">Seller: {deal.seller}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Market News */}
        {activeTab === 'news' && (
          <GlassCard className="p-6">
            <h2 className="text-xl font-bold font-display gradient-text mb-6">Market Impact News</h2>
            <div className="space-y-4">
              {marketNews.map((news, index) => (
                <div key={index} className="bg-darker/30 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-2">{news.title}</h3>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">{news.time}</span>
                        <div className={`flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                          news.impact === 'positive' ? 'bg-accent/20 text-accent' :
                          news.impact === 'negative' ? 'bg-coral/20 text-coral' :
                          'bg-gray-700/20 text-gray-300'
                        }`}>
                          {news.impact === 'positive' && <TrendingUp className="w-3 h-3 mr-1" />}
                          {news.impact === 'negative' && <TrendingDown className="w-3 h-3 mr-1" />}
                          {news.impact.charAt(0).toUpperCase() + news.impact.slice(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </main>
    </div>
  );
}