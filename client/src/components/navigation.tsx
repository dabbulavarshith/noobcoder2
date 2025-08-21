import { useState } from 'react';
import { Link } from 'wouter';
import { Search, BarChart3, Code, Filter, GraduationCap, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold font-display gradient-text">
              MarketPulse
            </Link>
            <div className="hidden md:flex space-x-6 ml-8">
              <Link href="#charts" className="text-white hover:text-accent transition-colors duration-300 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Charts
              </Link>
              <Link href="#pine-scripts" className="text-white hover:text-accent transition-colors duration-300 flex items-center">
                <Code className="w-4 h-4 mr-2" />
                Pine Scripts
              </Link>
              <Link href="#screeners" className="text-white hover:text-accent transition-colors duration-300 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Screeners
              </Link>
              <Link href="#education" className="text-white hover:text-accent transition-colors duration-300 flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                Education
              </Link>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search stocks, scripts..." 
                className="w-full bg-darker/50 backdrop-blur-sm border border-gray-600 rounded-xl px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Real-time indicator */}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Live</span>
            </div>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <Link href="#charts" className="text-white hover:text-accent transition-colors flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Charts
              </Link>
              <Link href="#pine-scripts" className="text-white hover:text-accent transition-colors flex items-center">
                <Code className="w-4 h-4 mr-2" />
                Pine Scripts
              </Link>
              <Link href="#screeners" className="text-white hover:text-accent transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Screeners
              </Link>
              <Link href="#education" className="text-white hover:text-accent transition-colors flex items-center">
                <GraduationCap className="w-4 h-4 mr-2" />
                Education
              </Link>
              <div className="pt-4">
                <input 
                  type="text" 
                  placeholder="Search stocks, scripts..." 
                  className="w-full bg-darker/50 backdrop-blur-sm border border-gray-600 rounded-xl px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-accent transition-colors"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
