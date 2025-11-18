import Link from "next/link";
import { ArrowRight, Terminal, Compass, ScanLine, Layers, Type, Palette, Zap, Code2, Hash, FileJson, CheckCircle2, Shield, Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  return (
    <>
    <main className="relative overflow-hidden">
      {/* Noise + Vignette + Texture */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.07),transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('/noise.png')] opacity-[0.07] mix-blend-overlay" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),transparent_40%,rgba(0,0,0,0.6))]" />

      {/* Hero */}
      <section className="relative px-6 pb-48 max-w-6xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className="relative z-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm mb-8 animate-[fadeIn_0.6s_ease-out]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-white/60">
              Developer Workspace
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-[3.8rem] lg:text-[6rem] xl:text-[5rem] font-[350] leading-[0.95] tracking-tight max-w-5xl mb-8 animate-[fadeIn_0.8s_ease-out_0.1s_both]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60">
              Tools that improve
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white/90 via-white/70 to-white/40">
              your work, not your
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              landing page.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-[17px] lg:text-[19px] text-white/55 max-w-3xl leading-[1.7] font-light mb-12 animate-[fadeIn_1s_ease-out_0.2s_both]">
            A focused kit of developer utilities, built for people who hate noisy UI,
            chaotic generators, and tools that feel like side projects pretending to be products.
            <span className="block mt-3 text-white/45">
              Typography systems · Color labs · Text formatters · Data converters · Generators
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 items-center animate-[fadeIn_1.2s_ease-out_0.3s_both]">
            <Link href="/typography">
              <Button size="xl" className="font-medium gap-2.5 px-8">
                Start Exploring <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="https://github.com/TheYuvrajMishra/utilities-dev" target="_blank">
              <Button variant="ghost" size="xl" className="font-medium px-8">
                View on GitHub
              </Button>
            </Link>
            
            <div className="hidden md:flex items-center gap-6 ml-4 text-[13px] text-white/30">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <span>No Sign-up</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Categories Overview */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-[350] mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/60">
            What's Inside
          </h2>
          <p className="text-white/45 text-[16px] lg:text-[17px] max-w-2xl mx-auto leading-relaxed font-light">
            Six focused tool categories. No bloat, no filler. Just the essentials, refined.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <Card className="p-6 bg-white/2.5 border-white/10 backdrop-blur-sm hover:bg-white/4 transition-all group">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/15 transition-colors">
                <Type className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight">Typography</h3>
                <p className="text-[13px] text-white/40 leading-[1.6] mb-3 font-light">
                  50+ professional fonts, live previews, weight variations, Google Fonts integration
                </p>
                <Link href="/typography" className="text-[13px] text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1">
                  Explore fonts <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/[0.025] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/15 transition-colors">
                <Palette className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight">Color Lab</h3>
                <p className="text-[13px] text-white/40 leading-[1.6] mb-3 font-light">
                  Palette generator, format converter (HEX/RGB/HSL), contrast checker, gradients
                </p>
                <Link href="/colors" className="text-[13px] text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-1">
                  Mix colors <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/[0.025] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-green-500/10 rounded-lg group-hover:bg-green-500/15 transition-colors">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight">Generators</h3>
                <p className="text-[13px] text-white/40 leading-[1.6] mb-3 font-light">
                  UUID v4, Lorem Ipsum, secure passwords with custom rules, dummy data
                </p>
                <Link href="/generators" className="text-[13px] text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1">
                  Generate <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/[0.025] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/15 transition-colors">
                <Code2 className="w-5 h-5 text-orange-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight">Text Tools</h3>
                <p className="text-[13px] text-white/40 leading-[1.6] mb-3 font-light">
                  Case converters, regex tester, find & replace, word counter, line sorter
                </p>
                <Link href="/text-tools" className="text-[13px] text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-1">
                  Transform text <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/[0.025] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/15 transition-colors">
                <FileJson className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight">Data Tools</h3>
                <p className="text-[13px] text-white/40 leading-[1.6] mb-3 font-light">
                  JSON formatter/validator, Base64 encoder, URL encoder/decoder, hash generator
                </p>
                <Link href="/data-tools" className="text-[13px] text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1">
                  Process data <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/[0.025] border-white/10 backdrop-blur-sm hover:bg-white/[0.04] transition-all group">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-pink-500/10 rounded-lg group-hover:bg-pink-500/15 transition-colors">
                <Hash className="w-5 h-5 text-pink-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-[15px] font-semibold text-white mb-2 tracking-tight">Code Snippets</h3>
                <p className="text-[13px] text-white/40 leading-[1.6] mb-3 font-light">
                  Copy-paste ready snippets for common patterns, utilities, and boilerplate
                </p>
                <Link href="/snippets" className="text-[13px] text-pink-400 hover:text-pink-300 transition-colors inline-flex items-center gap-1">
                  Browse snippets <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </Card>

        </div>
      </section>

      {/* Feature Highlights with gradient headings */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl lg:text-[2.75rem] xl:text-5xl font-[350] leading-[1.15] tracking-tight mb-7 text-transparent bg-clip-text bg-gradient-to-br from-white via-white/85 to-white/60">
              50+ Professional Fonts,<br/>Ready to Use
            </h2>
            <p className="text-white/50 text-[15px] lg:text-[16px] leading-[1.75] mb-7 font-light">
              From Inter to JetBrains Mono, explore curated typography with live previews, 
              multiple weights, and instant Google Fonts integration. See how each font looks 
              in your project before committing.
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-[14px] text-white/50 font-light leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Live preview with custom text input</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white/50 font-light leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Weight variations from 100 to 900</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white/50 font-light leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>One-click CSS and import code copy</span>
              </li>
            </ul>
            <div className="mt-8">
              <Link href="/typography">
                <Button size="lg" variant="ghost" className="font-normal gap-2 border border-white/10">
                  Explore Typography <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 backdrop-blur-sm">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-[11px] text-white/30 uppercase tracking-wider">Sans-Serif</div>
                  <div className="text-2xl font-light text-white" style={{fontFamily: 'Inter'}}>
                    The quick brown fox jumps
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] text-white/30 uppercase tracking-wider">Monospace</div>
                  <div className="text-xl text-white/80 font-mono">
                    const result = await fetch()
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] text-white/30 uppercase tracking-wider">Display</div>
                  <div className="text-3xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                    Modern & Clean
                  </div>
                </div>
              </div>
            </Card>
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl" />
          </div>

        </div>
      </section>

      {/* Color Tools Section */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <Card className="p-8 bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/10 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600" />
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600" />
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-pink-400 to-pink-600" />
                </div>
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600" />
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-400 to-red-600" />
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600" />
                </div>
                <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-[13px]">
                  <div className="text-white/40">#3b82f6 → rgb(59, 130, 246)</div>
                  <div className="text-white/40">hsl(217, 91%, 60%)</div>
                </div>
              </div>
            </Card>
            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-3xl lg:text-[2.75rem] xl:text-5xl font-[350] leading-[1.15] tracking-tight mb-7 text-transparent bg-clip-text bg-gradient-to-br from-purple-300 via-pink-300 to-orange-300">
              Color Lab for<br/>Design Systems
            </h2>
            <p className="text-white/50 text-[15px] lg:text-[16px] leading-[1.75] mb-7 font-light">
              Generate palettes, convert between formats (HEX, RGB, HSL), check contrast ratios, 
              and create gradients. Everything you need to build consistent, accessible color systems.
            </p>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-[14px] text-white/50 font-light leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>AI-powered palette generation</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white/50 font-light leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>WCAG contrast checker built-in</span>
              </li>
              <li className="flex items-start gap-3 text-[14px] text-white/50 font-light leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Export to CSS, Tailwind, or JSON</span>
              </li>
            </ul>
            <div className="mt-8">
              <Link href="/colors">
                <Button size="lg" variant="ghost" className="font-normal gap-2 border border-white/10">
                  Open Color Lab <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Use Cases Section */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-[350] mb-5 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
            Built for Real Workflows
          </h2>
          <p className="text-white/45 text-[16px] lg:text-[17px] max-w-2xl mx-auto leading-relaxed font-light">
            Whether you're prototyping, building design systems, or formatting data—these tools fit naturally into your process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <Card className="relative p-6 bg-white/[0.03] border-white/10 backdrop-blur-sm h-full">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-[17px] font-semibold text-white mb-3 tracking-tight">Design Handoff</h3>
              <p className="text-[13px] text-white/45 leading-[1.65] font-light">
                Export color palettes, check contrast ratios, and grab font CSS for your design systems. 
                No more copy-pasting from Figma comments.
              </p>
            </Card>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <Card className="relative p-6 bg-white/[0.03] border-white/10 backdrop-blur-sm h-full">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-[17px] font-semibold text-white mb-3 tracking-tight">Rapid Prototyping</h3>
              <p className="text-[13px] text-white/45 leading-[1.65] font-light">
                Generate UUIDs, create dummy data, format JSON on the fly. 
                Everything you need to mock APIs and test flows quickly.
              </p>
            </Card>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <Card className="relative p-6 bg-white/[0.03] border-white/10 backdrop-blur-sm h-full">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-[17px] font-semibold text-white mb-3 tracking-tight">Data Wrangling</h3>
              <p className="text-[13px] text-white/45 leading-[1.65] font-light">
                Base64 encode/decode, URL escaping, regex testing, case conversion. 
                Transform messy data into clean outputs instantly.
              </p>
            </Card>
          </div>

        </div>
      </section>

      {/* Why Choose Section with gradient text */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-[350] mb-5 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white">
            Why developers choose this workspace
          </h2>
          <p className="text-white/45 text-[16px] lg:text-[17px] max-w-2xl mx-auto leading-relaxed font-light">
            Not another bloated toolkit. Just the essentials, refined.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <Card className="p-6 bg-white/[0.02] border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-base font-medium text-white mb-2">Zero Configuration</h3>
            <p className="text-[13px] text-white/35 leading-relaxed">
              Open and use. No setup, no accounts, no bloat. Just tools that work.
            </p>
          </Card>

          <Card className="p-6 bg-white/[0.02] border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-base font-medium text-white mb-2">Privacy First</h3>
            <p className="text-[13px] text-white/35 leading-relaxed">
              Everything runs locally. Your data never leaves your browser. No tracking pixels.
            </p>
          </Card>

          <Card className="p-6 bg-white/[0.02] border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-base font-medium text-white mb-2">Lightning Fast</h3>
            <p className="text-[13px] text-white/35 leading-relaxed">
              Built with Next.js 14. Instant page loads, smooth interactions, zero lag.
            </p>
          </Card>

          <Card className="p-6 bg-white/[0.02] border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-base font-medium text-white mb-2">Production Ready</h3>
            <p className="text-[13px] text-white/35 leading-relaxed">
              Copy outputs directly into your projects. No cleanup needed.
            </p>
          </Card>

        </div>
      </section>
      
      {/* CTA */}
      <section className="px-6 max-w-5xl mx-auto">
        <Card className="p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/6 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl lg:text-5xl font-[350] mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/60">
                Skip the noise. Build better.
              </h2>

              <p className="text-white/50 max-w-2xl mx-auto md:mx-0 leading-[1.75] text-[16px] lg:text-[17px] mb-5 font-light">
                This project is not trying to impress Dribbble. It's trying to make
                developers faster. Every tool here exists because it solves a real problem.
                No tracking, no subscriptions, no "sign up to unlock features."
              </p>

              <div className="flex items-center justify-center md:justify-start gap-6 text-[13px] text-white/30 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-white/70" />
                  <span>100% Client-side</span>
                </div>
                <div className="flex items-center gap-2">
                  <ScanLine className="w-4 h-4 text-white/70" />
                  <span>Zero Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-white/70" />
                  <span>Open Source</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center">
                <Link href="/typography">
                  <Button size="xl" className="w-full md:w-auto font-medium gap-2.5 px-8">
                    Start Exploring <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link href="https://github.com/TheYuvrajMishra/utilities-dev" target="_blank">
                  <Button variant="ghost" size="xl" className="w-full md:w-auto font-medium px-8">
                    View on GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </main>
    </>
  );
}
