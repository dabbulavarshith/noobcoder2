import { useState } from 'react';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Expand, BarChart3 } from 'lucide-react';

export function ChartsSection() {
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY 50');

  const handleExpandChart = () => {
    // TODO: Implement chart expansion modal/fullscreen functionality
    console.log('Chart expand requested');
  };

  return (
    <section id="charts">
      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display gradient-text">Live Charts</h2>
            <p className="text-gray-400 text-sm mt-1">Real-time data that hits different 📊</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
              <SelectTrigger className="w-40 bg-darker/80 border-gray-600 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-darker border-gray-600 rounded-xl">
                <SelectItem value="NIFTY 50">NIFTY 50</SelectItem>
                <SelectItem value="BANK NIFTY">BANK NIFTY</SelectItem>
                <SelectItem value="RELIANCE">RELIANCE</SelectItem>
                <SelectItem value="TCS">TCS</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExpandChart} className="bg-gradient-to-r from-electric-blue to-teal hover:from-teal hover:to-electric-blue text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 transform hover:scale-105">
              <Expand className="w-4 h-4 mr-2" />
              Go Full Screen
            </Button>
          </div>
        </div>
        
        {/* Modern Chart Container */}
        <div className="relative rounded-3xl p-6 h-96 bg-gradient-to-br from-darker/50 via-dark to-darker/80 border border-gray-700/50 backdrop-blur-xl overflow-hidden">
          {/* Animated background grid */}
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
              <p className="text-sm text-gray-300 mb-4">Real-time {selectedSymbol} data streaming</p>
              <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-full text-primary text-sm font-medium">
                <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></div>
                Live Data Connected
              </div>
              <div className="mt-6 p-4 bg-darker/70 rounded-2xl border border-gray-600/50 backdrop-blur-sm">
                <p className="text-xs text-gray-400 mb-3 font-medium">Chart Features:</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                    Professional charting
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></div>
                    Technical indicators
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-coral rounded-full mr-2"></div>
                    Real-time updates
                  </div>
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-teal rounded-full mr-2"></div>
                    Full-screen mode
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
