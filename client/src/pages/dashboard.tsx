import { Navigation } from '../components/navigation';
import { HeroSection } from '../components/hero-section';
import { ChartsSection } from '../components/charts-section';
import { PineScriptsManager } from '../components/pine-scripts-manager';
import { MarketScreener } from '../components/market-screener';
import { CryptoSection } from '../components/crypto-section';
import { EducationHub } from '../components/education-hub';
import { QuickTools } from '../components/quick-tools';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navigation />
      
      <main className="pt-16">
        <HeroSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <ChartsSection />
              <PineScriptsManager />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              <MarketScreener />
              <CryptoSection />
              <EducationHub />
              <QuickTools />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold gradient-text mb-4">MarketPulse</div>
              <p className="text-gray-400 text-sm">Advanced market analysis for the modern trader</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Charts</div>
                <div>Pine Scripts</div>
                <div>Screeners</div>
                <div>Education</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Markets</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Indian Stocks</div>
                <div>Indices</div>
                <div>Crypto</div>
                <div>Commodities</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Discord</div>
                <div>Telegram</div>
                <div>Twitter</div>
                <div>YouTube</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex items-center justify-between text-sm text-gray-400">
            <div>&copy; 2024 MarketPulse. All rights reserved.</div>
            <div>Made with ❤️ for traders</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
