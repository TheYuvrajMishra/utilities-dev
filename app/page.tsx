import { Sidebar } from './components/Sidebar';
import { 
  Type, 
  Image, 
  Palette, 
  Code, 
  RefreshCw, 
  Sparkles, 
  FileCode,
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    name: 'Typography Library',
    description: 'Professional font families for development, UI/UX, and documentation',
    icon: Type,
    href: '/typography',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'SVG & Icons',
    description: 'System icons, UI elements, and diagramming shapes',
    icon: Image,
    href: '/icons',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Colors & Gradients',
    description: 'Palette generator, gradients, shadows, and glassmorphism presets',
    icon: Palette,
    href: '/colors',
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'UI/Code Snippets',
    description: 'Reusable CSS, Tailwind, and component snippets',
    icon: Code,
    href: '/snippets',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Data Converters',
    description: 'Base64, Hash, and other data conversion utilities',
    icon: RefreshCw,
    href: '/converters',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Generators',
    description: 'UUID, password, and token generation tools',
    icon: Sparkles,
    href: '/generators',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    name: 'Formatters',
    description: 'JSON, XML, SQL, and Markdown beautifiers',
    icon: FileCode,
    href: '/formatters',
    color: 'from-pink-500 to-rose-500',
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8 lg:p-12">
          {/* Hero Section */}
          <div className="mb-20">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/80">
                ✨ Professional Developer Tools
              </span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
                DevUtilities
              </span>
            </h1>
            <p className="text-xl text-[#a0a0a0] max-w-2xl leading-relaxed">
              A comprehensive utility hub for developers. Access professional fonts, 
              SVG assets, color tools, code snippets, formatters, and generators — 
              all in one place.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.name}
                  href={feature.href}
                  className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-[#2a2a2a] rounded-2xl p-8 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-[0.08] rounded-2xl transition-opacity duration-500`} />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#666] group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-[#999] leading-relaxed group-hover:text-[#b0b0b0] transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-white/5">
            <div className="text-center group">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-400 to-cyan-400 mb-3 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-sm text-[#999] font-medium">Font Families</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-pink-400 mb-3 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-sm text-[#999] font-medium">SVG Icons</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-400 to-red-400 mb-3 group-hover:scale-110 transition-transform duration-300">100+</div>
              <div className="text-sm text-[#999] font-medium">Code Snippets</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-green-400 to-emerald-400 mb-3 group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-sm text-[#999] font-medium">Utilities</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
