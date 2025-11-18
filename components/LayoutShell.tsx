'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Footer } from './Footer';

interface LayoutShellProps {
  children: React.ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#04040a] text-white">
      {/* Universal background layers */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.07),transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('/noise.png')] opacity-[0.12] mix-blend-soft-light" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.65),transparent_35%,rgba(0,0,0,0.75))]" />

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="relative lg:ml-64 flex flex-col min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6 lg:p-10">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
