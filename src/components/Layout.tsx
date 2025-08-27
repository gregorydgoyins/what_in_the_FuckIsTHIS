import React from 'react';
import { Navbar } from './navigation/Navbar';
import { Footer } from './navigation/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl parallax-bg">
        {children}
      </main>
      <Footer />
    </div>
  );
}