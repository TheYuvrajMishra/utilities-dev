import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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
  Layers
} from 'lucide-react';

const features = [
  {
    title: 'Typography Library',
    description: 'Professional font pairings, showcase, and live preview system',
    icon: Type,
    href: '/typography',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Icons & SVG',
    description: 'Browse 1000+ professional icons with instant copy functionality',
    icon: Image,
    href: '/icons',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Colors & Gradients',
    description: 'Generate beautiful color palettes and CSS gradients',
    icon: Palette,
    href: '/colors',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'Code Snippets',
    description: 'Ready-to-use code snippets for common development patterns',
    icon: Code,
    href: '/snippets',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Data Conversion',
    description: 'JSON formatter, Base64 encoder/decoder, and more',
    icon: FileJson,
    href: '/data-tools',
    gradient: 'from-yellow-500 to-amber-500',
  },
  {
    title: 'Generators',
    description: 'UUID, Lorem Ipsum, passwords, and custom generators',
    icon: Sparkles,
    href: '/generators',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Text & Regex',
    description: 'Text manipulation tools and regex tester with explanations',
    icon: Regex,
    href: '/text-tools',
    gradient: 'from-pink-500 to-rose-500',
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
      <section className="relative pt-8 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent rounded-3xl" />
        
        <div className="relative space-y-8 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
              <Sparkles className="w-4 h-4" />
              <span>Professional Developer Utilities</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground to-muted bg-clip-text text-transparent">
              Everything You Need
              <br />
              <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                In One Place
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-muted">
              A comprehensive suite of professional tools, assets, and utilities designed for modern developers. 
              Typography, icons, colors, generators, and more—all beautifully crafted.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/typography">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                View on GitHub
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Powerful Tools</h2>
          <p className="text-muted">Everything you need for modern development workflows</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} href={feature.href}>
                <Card className="p-6 h-full hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group cursor-pointer">
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Highlights */}
      <section className="space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Why DevUtilities?</h2>
          <p className="text-muted">Built for developers, by developers</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((highlight) => {
            const Icon = highlight.icon;
            return (
              <Card key={highlight.title} className="p-6 text-center">
                <div className="space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{highlight.title}</h3>
                    <p className="text-sm text-muted">{highlight.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative">
        <Card className="p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
          <div className="relative space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Ready to boost your workflow?</h2>
            <p className="text-muted max-w-xl mx-auto">
              Start using professional developer utilities right now. No sign-up required.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/typography">
                <Button size="lg" className="gap-2">
                  Explore Tools
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
