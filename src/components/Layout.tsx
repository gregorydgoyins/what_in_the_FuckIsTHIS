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
      <header className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-40">
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
      <main className="container-responsive mx-auto py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-800/90 backdrop-blur-md border-t border-slate-700/50 py-8">
        <div className="container-responsive mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Panel Profits</h3>
              <p className="text-gray-400">AI-powered comic book trading platform with advanced market intelligence and professional-grade analytics.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Trading</h3>
              <ul className="space-y-2">
                <li><Link to="/characters" className="text-gray-400 hover:text-white">Characters</Link></li>
                <li><Link to="/creators" className="text-gray-400 hover:text-white">Creators</Link></li>
                <li><Link to="/bonds" className="text-gray-400 hover:text-white">Bonds</Link></li>
                <li><Link to="/funds" className="text-gray-400 hover:text-white">Funds</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Intelligence</h3>
              <ul className="space-y-2">
                <li><Link to="/ideas" className="text-gray-400 hover:text-white">AI Analysis</Link></li>
                <li><Link to="/ideas/mapping" className="text-gray-400 hover:text-white">Market Mapping</Link></li>
                <li><Link to="/learn" className="text-gray-400 hover:text-white">Learning Center</Link></li>
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