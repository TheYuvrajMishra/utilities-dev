'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail, Heart, Code2 } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-black/40 backdrop-blur-sm mt-auto">
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.4),transparent)]" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-white" />
              <span className="text-lg font-medium text-white">DevUtilities</span>
            </div>
            <p className="text-[13px] text-white/40 leading-relaxed mb-6">
              Professional developer tools and resources. Built for people who value clean design and efficient workflows.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/TheYuvrajMishra/utilities-dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="mailto:contact@devutilities.com"
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/50 hover:text-white"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">Tools</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/typography" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Typography
                </Link>
              </li>
              <li>
                <Link href="/colors" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Color Lab
                </Link>
              </li>
              <li>
                <Link href="/generators" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Generators
                </Link>
              </li>
              <li>
                <Link href="/text-tools" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link href="/data-tools" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Data Tools
                </Link>
              </li>
              <li>
                <Link href="/snippets" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Code Snippets
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/TheYuvrajMishra/utilities-dev" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Release Notes
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Contributing
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-medium text-white mb-4 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-[13px] text-white/40 hover:text-white/70 transition-colors">
                  License (MIT)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/30 text-center md:text-left">
            © {currentYear} DevUtilities. All rights reserved.
          </p>
          <p className="text-[13px] text-white/30 flex items-center gap-1.5">
            Built with <Heart className="w-3 h-3 text-red-500/70" /> by developers, for developers
          </p>
        </div>
      </div>
    </footer>
  );
}
