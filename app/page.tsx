'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { 
  Type, 
  Image, 
  Palette, 
  Code, 
  FileJson, 
  Sparkles, 
  Regex,
  ArrowRight,
  Zap,
  Shield,
  Layers,
  Github,
  Twitter,
  Mail,
  Heart,
  ExternalLink,
  Star,
  TrendingUp,
  Clock
} from 'lucide-react';

const features = [
  {
    title: 'Typography Library',
    description: 'Professional font pairings, showcase, and live preview system',
    icon: Type,
    href: '/typography',
    linear: 'from-blue-500 to-cyan-500',
    stats: '70+ Fonts',
    badge: 'Popular',
  },
  {
    title: 'Icons & SVG',
    description: 'Browse 1000+ professional icons with instant copy functionality',
    icon: Image,
    href: '/icons',
    linear: 'from-purple-500 to-pink-500',
    stats: '2,800+ Icons',
    badge: 'Updated',
  },
  {
    title: 'Colors & linears',
    description: 'Generate beautiful color palettes and CSS linears',
    icon: Palette,
    href: '/colors',
    linear: 'from-orange-500 to-red-500',
    stats: '50+ Presets',
    badge: 'New',
  },
  {
    title: 'Code Snippets',
    description: 'Ready-to-use code snippets for common development patterns',
    icon: Code,
    href: '/snippets',
    linear: 'from-green-500 to-emerald-500',
    stats: '100+ Snippets',
    badge: 'Essential',
  },
  {
    title: 'Data Conversion',
    description: 'JSON formatter, Base64 encoder/decoder, and more',
    icon: FileJson,
    href: '/data-tools',
    linear: 'from-yellow-500 to-amber-500',
    stats: 'Multi-Tool',
    badge: 'Pro',
  },
  {
    title: 'Generators',
    description: 'UUID, Lorem Ipsum, passwords, and custom generators',
    icon: Sparkles,
    href: '/generators',
    linear: 'from-indigo-500 to-blue-500',
    stats: '10+ Tools',
    badge: 'Hot',
  },
  {
    title: 'Text & Regex',
    description: 'Text manipulation tools and regex tester with explanations',
    icon: Regex,
    href: '/text-tools',
    linear: 'from-pink-500 to-rose-500',
    stats: 'Smart AI',
    badge: 'Beta',
  },
];

const stats = [
  { label: 'Developer Tools', value: '20+' },
  { label: 'Professional Fonts', value: '50+' },
  { label: 'Icon Library', value: '1000+' },
  { label: 'Code Snippets', value: '100+' },
];

const highlights = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Next.js for optimal performance',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'All tools run locally in your browser',
  },
  {
    icon: Layers,
    title: 'Production Ready',
    description: 'Professional-grade tools for developers',
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative space-y-10 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-full text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Professional Developer Utilities
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-linear-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">
                Everything You Need
              </span>
              <br />
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                In One Place
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-400 leading-relaxed">
              A comprehensive suite of professional tools, assets, and utilities designed for modern developers. 
              Typography, icons, colors, generators, and more—all beautifully crafted.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/typography">
              <Button size="lg" className="gap-2 px-8 h-12 text-base shadow-lg shadow-white/20 hover:shadow-white/30 transition-all">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2 px-8 h-12 text-base">
                <Github className="w-5 h-5" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-4xl font-bold tracking-tight">Powerful Tools</h2>
          <p className="text-gray-400 text-lg">Everything you need for modern development workflows</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={feature.href}>
                  <div className="group relative">
                    {/* Animated linear border */}
                    <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:blur-md" />
                    
                    <Card className="relative p-8 h-full border-white/10 hover:border-white/20 transition-all duration-500 group cursor-pointer overflow-hidden bg-background">
                      {/* Background animated linear */}
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 -left-full h-full w-1/2 bg-linear-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:left-full transition-all duration-700" />
                      </div>

                      {/* Badge */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-2 py-1 text-xs font-semibold bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-full">
                          {feature.badge}
                        </span>
                      </div>
                      
                      <div className="relative space-y-6">
                        {/* Icon with animated background */}
                        <div className="relative">
                          <div className={`absolute inset-0 bg-linear-to-br ${feature.linear} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`} />
                          <div className={`relative w-16 h-16 rounded-2xl bg-linear-to-br ${feature.linear} flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-2xl`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-xl font-semibold group-hover:text-white transition-colors">
                              {feature.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                            {feature.description}
                          </p>
                        </div>

                        {/* Stats bar */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <span className="text-xs text-gray-500 font-medium">{feature.stats}</span>
                          <div className="flex items-center gap-2 text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="font-medium">Explore</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Highlights */}
      <section className="space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-4xl font-bold tracking-tight">Why DevUtilities?</h2>
          <p className="text-gray-400 text-lg">Built for developers, by developers</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              >
                <Card className="relative p-8 text-center border-white/10 hover:border-white/20 transition-all duration-500 group overflow-hidden">
                  {/* Animated background circles */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="relative space-y-5">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                      <div className="relative w-20 h-20 mx-auto rounded-2xl bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-white/10">
                        <Icon className="w-10 h-10 text-blue-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-white transition-colors">{highlight.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{highlight.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <Card className="p-16 text-center overflow-hidden border-white/10">
          <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="absolute inset-0 bg-[radial-linear(circle_at_center,transparent_0%,#0d0d0d_100%)]" />
          
          <div className="relative space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Ready to boost your workflow?
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Start using professional developer utilities right now. No sign-up required. 
                All tools are free and run locally in your browser.
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/typography">
                <Button size="lg" className="gap-2 px-8 h-12 text-base shadow-lg shadow-white/20">
                  Explore Tools
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2 px-8 h-12 text-base">
                  <Star className="w-5 h-5" />
                  Star on GitHub
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative mt-20 border-t border-white/10">
        <div className="pt-12 pb-8 space-y-8">
          {/* Main Footer Content */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">DevUtilities</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Professional developer tools and utilities. Built with passion for the developer community.
              </p>
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:hello@devutilities.com"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Tools Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Tools</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/typography" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Typography
                  </Link>
                </li>
                <li>
                  <Link href="/icons" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Icons & SVG
                  </Link>
                </li>
                <li>
                  <Link href="/colors" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Colors & linears
                  </Link>
                </li>
                <li>
                  <Link href="/snippets" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Code Snippets
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    What's New
                  </a>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Stay Updated</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Get notified about new tools and features.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-white/20 transition-colors"
                />
                <Button variant="outline" size="sm" className="w-full">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} DevUtilities. Made with <Heart className="w-4 h-4 inline text-red-500" /> for developers.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
