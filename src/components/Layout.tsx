import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell, User, Brain, Network, Lightbulb, TrendingUp, Users, BarChart2, GraduationCap } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-800/70 backdrop-blur-md border-b border-slate-700/50">
        <div className="container-responsive mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
              
              <Link to="/" className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-indigo-400" />
                <span className="text-xl font-bold text-white">Panel Profits</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="nav-link flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/ideas" className="nav-link flex items-center space-x-2">
                <Lightbulb className="h-4 w-4" />
                <span>AI Intelligence</span>
              </Link>
              <Link to="/trading" className="nav-link flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Trading</span>
              </Link>
              <Link to="/characters" className="nav-link flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Assets</span>
              </Link>
              <Link to="/portfolio" className="nav-link flex items-center space-x-2">
                <BarChart2 className="h-4 w-4" />
                <span>Portfolio</span>
              </Link>
              <Link to="/markets" className="nav-link flex items-center space-x-2">
                <Network className="h-4 w-4" />
                <span>Markets</span>
              </Link>
              <Link to="/learn" className="nav-link flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>Learn</span>
              </Link>
            </nav>
            
            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <button
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
              
              <button
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Profile"
              >
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-slate-800 border-b border-slate-700 px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            Home
          </Link>
          <Link to="/ideas" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            AI Intelligence
          </Link>
          <Link to="/trading" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            Trading
          </Link>
          <Link to="/characters" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            Assets
          </Link>
          <Link to="/portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            Portfolio
          </Link>
          <Link to="/markets" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            Markets
          </Link>
          <Link to="/learn" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700">
            Learn
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="relative">
        <div className="main-content-parallax">
          <div className="container-responsive mx-auto py-6">
            {children}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-800/90 backdrop-blur-md border-t border-slate-700/50 py-8">
        <div className="container-responsive mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-indigo-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Panel Profits</h3>
                  <p className="text-xs text-indigo-400">Comic Trading Platform</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col space-y-1">
                  <Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link>
                  <Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-600/30">
                  <div className="space-y-1">
                    <p className="text-white text-sm font-medium">561-600-2271</p>
                    <div className="text-gray-400 text-xs leading-snug">
                      <div>1300 GREENSBORO LANE</div>
                      <div>SUITE 305</div>
                      <div>SARASOTA FL 34234</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Trading</h3>
              <ul className="space-y-2">
                <li><Link to="/characters" className="text-gray-400 hover:text-white">Characters</Link></li>
                <li><Link to="/creators" className="text-gray-400 hover:text-white">Creators</Link></li>
                <li><Link to="/bonds" className="text-gray-400 hover:text-white">Bonds</Link></li>
                <li><Link to="/funds" className="text-gray-400 hover:text-white">Funds</Link></li>
                <li><Link to="/trading/options" className="text-gray-400 hover:text-white">Options</Link></li>
                <li><Link to="/portfolio" className="text-gray-400 hover:text-white">Portfolio</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Intelligence</h3>
              <ul className="space-y-2">
                <li><Link to="/ideas" className="text-gray-400 hover:text-white">AI Analysis</Link></li>
                <li><Link to="/ideas/mapping" className="text-gray-400 hover:text-white">Market Mapping</Link></li>
                <li><Link to="/news" className="text-gray-400 hover:text-white">Market News</Link></li>
                <li><Link to="/markets/calendar" className="text-gray-400 hover:text-white">Market Calendar</Link></li>
                <li><Link to="/learn" className="text-gray-400 hover:text-white">Learning Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Research</h3>
              <ul className="space-y-2">
                <li><Link to="/research" className="text-gray-400 hover:text-white">Research Reports</Link></li>
                <li><Link to="/markets" className="text-gray-400 hover:text-white">Market Analysis</Link></li>
                <li><Link to="/portfolio/tools" className="text-gray-400 hover:text-white">Charts & Data</Link></li>
                <li><Link to="/portfolio/formulas" className="text-gray-400 hover:text-white">Analytics Dashboard</Link></li>
                <li><Link to="/markets/calendar" className="text-gray-400 hover:text-white">Performance Reports</Link></li>
                <li><Link to="/navigation-test" className="text-gray-400 hover:text-white">System Testing</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Innovation Studio. Part of the Panel Profits ecosystem.</p>
            <p className="text-gray-400 text-sm">© 2025 Panel Profits. Advanced Comic Trading Platform.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}