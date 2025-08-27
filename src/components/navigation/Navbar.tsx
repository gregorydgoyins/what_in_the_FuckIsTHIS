import React from 'react';

export function Navbar() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white">
            Trading Platform
          </div>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-slate-300 hover:text-white">
              Dashboard
            </a>
            <a href="/portfolio" className="text-slate-300 hover:text-white">
              Portfolio
            </a>
            <a href="/trading" className="text-slate-300 hover:text-white">
              Trading
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}