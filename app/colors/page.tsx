'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const predefinedPalettes = [
  { name: 'Ocean Breeze', colors: ['#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'] },
  { name: 'Sunset Vibes', colors: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#d946ef'] },
  { name: 'Forest Green', colors: ['#065f46', '#059669', '#10b981', '#34d399', '#6ee7b7'] },
  { name: 'Purple Dream', colors: ['#581c87', '#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'] },
  { name: 'Monochrome', colors: ['#18181b', '#27272a', '#3f3f46', '#71717a', '#a1a1aa'] },
  { name: 'Retro Neon', colors: ['#ff007a', '#ff8a00', '#ffd600', '#8cff66', '#00fff0'] },
  { name: 'Soft Pastels', colors: ['#f8b4d9', '#fce7f3', '#c7f9cc', '#dbeafe', '#fff1d6'] },
  { name: 'Earth Tones', colors: ['#7c3e1b', '#b45309', '#f59e0b', '#fde68a', '#efefef'] },
  { name: 'Corporate Blue', colors: ['#0b3d91', '#1366d6', '#2ea6ff', '#7fd3ff', '#dff6ff'] },
  { name: 'Minimal Slate', colors: ['#0f1724', '#111827', '#374151', '#9ca3af', '#e6e7ea'] },
];

const gradientPresets = [
  { name: 'Sunset', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Ocean', css: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)' },
  { name: 'Fire', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Forest', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Aurora', css: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: 'Dusk', css: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
  { name: 'Night', css: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
];

// --- Contrast helpers ---
function hexToRgb(hex: string) {
  const sanitized = hex.replace('#', '').trim();
  const h = sanitized.length === 3 ? sanitized.split('').map(c => c + c).join('') : sanitized;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}

function srgbToLinear(channel: number) {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(hexA: string, hexB: string) {
  const la = luminance(hexA);
  const lb = luminance(hexB);
  const L1 = Math.max(la, lb);
  const L2 = Math.min(la, lb);
  return +( (L1 + 0.05) / (L2 + 0.05) ).toFixed(2);
}

function blendTowards(hex: string, targetHex: string, t: number) {
  const a = hexToRgb(hex);
  const b = hexToRgb(targetHex);
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `#${[r, g, bl].map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

function suggestAccessibleForeground(fg: string, bg: string, targetRatio = 4.5) {
  // First try white/black
  const whiteRatio = contrastRatio('#ffffff', bg);
  const blackRatio = contrastRatio('#000000', bg);
  if (whiteRatio >= targetRatio) return { suggestion: '#ffffff', ratio: whiteRatio };
  if (blackRatio >= targetRatio) return { suggestion: '#000000', ratio: blackRatio };

  // Otherwise, blend the foreground toward white and black and pick smallest step that meets target
  // Search t from 0 to 1
  for (let i = 1; i <= 100; i++) {
    const t = i / 100;
    const tryWhite = blendTowards(fg, '#ffffff', t);
    if (contrastRatio(tryWhite, bg) >= targetRatio) return { suggestion: tryWhite, ratio: contrastRatio(tryWhite, bg) };
    const tryBlack = blendTowards(fg, '#000000', t);
    if (contrastRatio(tryBlack, bg) >= targetRatio) return { suggestion: tryBlack, ratio: contrastRatio(tryBlack, bg) };
  }

  // fallback: return white with its ratio
  return { suggestion: '#ffffff', ratio: whiteRatio };
}

export default function ColorsPage() {
  const [customColors, setCustomColors] = useState(['#3b82f6', '#8b5cf6', '#ec4899']);
  const [gradientColor1, setGradientColor1] = useState('#3b82f6');
  const [gradientColor2, setGradientColor2] = useState('#8b5cf6');
  const [gradientAngle, setGradientAngle] = useState(135);

  // Contrast checker state
  const [foreground, setForeground] = useState('#ffffff');
  const [background, setBackground] = useState('#0f1724');
  const [largeText, setLargeText] = useState(false);
  const [suggestion, setSuggestion] = useState<{ suggestion: string; ratio: number }>(() => ({ suggestion: '#ffffff', ratio: contrastRatio('#ffffff', '#0f1724') }));

  const ratio = contrastRatio(foreground, background);
  const threshold = largeText ? 3 : 4.5;
  const isPassing = ratio >= threshold;

  const handleSuggest = () => {
    const res = suggestAccessibleForeground(foreground, background, threshold);
    setSuggestion(res);
    toast.success('Suggestion generated');
  };

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  const generateRandomPalette = () => {
    const newColors = Array.from({ length: 5 }, () => generateRandomColor());
    setCustomColors(newColors);
    toast.success('Generated new palette!');
  };

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color}!`);
  };

  const copyGradient = () => {
    const gradient = `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`;
    navigator.clipboard.writeText(gradient);
    toast.success('Gradient CSS copied!');
  };

  const addColor = () => {
    setCustomColors([...customColors, generateRandomColor()]);
  };

  const removeColor = (index: number) => {
    if (customColors.length > 2) {
      setCustomColors(customColors.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...customColors];
    newColors[index] = color;
    setCustomColors(newColors);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Colors & Gradients</h1>
        <p className="text-muted">
          Generate beautiful color palettes and CSS gradients for your projects
        </p>
      </div>

      {/* Custom Palette Generator */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold border-b border-border pb-2 flex-1">
            Custom Palette Generator
          </h2>
          <Button onClick={generateRandomPalette} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Generate Random
          </Button>
        </div>

        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {customColors.map((color, index) => (
              <div key={index} className="space-y-2">
                <div
                  className="h-32 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-lg"
                  style={{ backgroundColor: color }}
                  onClick={() => copyColor(color)}
                />
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="flex-1 font-mono text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeColor(index)}
                    disabled={customColors.length <= 2}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={addColor} className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Add Color
          </Button>
        </Card>
      </section>

      {/* Predefined Palettes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Predefined Palettes
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {predefinedPalettes.map((palette) => (
            <Card key={palette.name} className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">{palette.name}</h3>
              <div className="flex gap-2">
                {palette.colors.map((color) => (
                  <div
                    key={color}
                    className="flex-1 h-24 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-lg"
                    style={{ backgroundColor: color }}
                    onClick={() => copyColor(color)}
                    title={color}
                  />
                ))}
              </div>
              <div className="flex gap-1 flex-wrap">
                {palette.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => copyColor(color)}
                    className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 rounded text-xs font-mono transition-colors"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Gradient Generator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Gradient Generator
        </h2>

        <Card className="p-6 space-y-6">
          {/* Preview */}
          <div
            className="h-48 rounded-lg shadow-xl"
            style={{
              background: `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`,
            }}
          />

          {/* Controls */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Color 1</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={gradientColor1}
                  onChange={(e) => setGradientColor1(e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-border"
                />
                <Input
                  type="text"
                  value={gradientColor1}
                  onChange={(e) => setGradientColor1(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Color 2</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-border"
                />
                <Input
                  type="text"
                  value={gradientColor2}
                  onChange={(e) => setGradientColor2(e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Angle: {gradientAngle}°</label>
              <input
                type="range"
                min="0"
                max="360"
                value={gradientAngle}
                onChange={(e) => setGradientAngle(Number(e.target.value))}
                className="w-full h-10"
              />
            </div>
          </div>

          {/* CSS Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">CSS Code</label>
            <div className="flex gap-2">
              <code className="flex-1 px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono overflow-x-auto">
                linear-gradient({gradientAngle}deg, {gradientColor1}, {gradientColor2})
              </code>
              <Button onClick={copyGradient} className="gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Contrast Checker */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">Contrast Checker</h2>

        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-sm font-medium">Foreground</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={foreground}
                  onChange={(e) => setForeground(e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-border"
                />
                <Input type="text" value={foreground} onChange={(e) => setForeground(e.target.value)} className="flex-1 font-mono" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Background</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-border"
                />
                <Input type="text" value={background} onChange={(e) => setBackground(e.target.value)} className="flex-1 font-mono" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Options</label>
              <div className="flex gap-2 items-center">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={largeText} onChange={(e) => setLargeText(e.target.checked)} />
                  Large text
                </label>
                <Button onClick={() => handleSuggest()} className="gap-2">Suggest accessible</Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div className="p-4 rounded-lg" style={{ background: background }}>
              <div className="p-4 rounded" style={{ background: 'rgba(0,0,0,0.12)' }}>
                <div style={{ color: foreground }} className="text-lg font-medium">Aa</div>
                <div className="text-sm text-white/60">Preview</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono">Ratio:</span>
                <span className="text-lg font-semibold">{ratio}</span>
                <span className={`px-2 py-0.5 rounded ${isPassing ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>{isPassing ? 'Pass' : 'Fail'}</span>
              </div>
              <div className="text-sm text-white/60">
                WCAG {largeText ? 'Large' : 'Normal'} text threshold: {largeText ? '3.0' : '4.5'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded border" style={{ background: suggestion.suggestion }} />
                <div>
                  <div className="font-mono">{suggestion.suggestion}</div>
                  <div className="text-sm text-white/60">Ratio: {suggestion.ratio}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => { navigator.clipboard.writeText(suggestion.suggestion); toast.success('Copied suggestion'); }} variant="ghost">Copy</Button>
                <Button onClick={() => setForeground(suggestion.suggestion)} variant="outline">Apply</Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Gradient Presets */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Gradient Presets
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {gradientPresets.map((preset) => (
            <Card
              key={preset.name}
              className="p-0 overflow-hidden cursor-pointer hover:border-primary/50 transition-all group"
              onClick={() => {
                navigator.clipboard.writeText(preset.css);
                toast.success(`Copied "${preset.name}" gradient!`);
              }}
            >
              <div
                className="h-32 group-hover:scale-105 transition-transform"
                style={{ background: preset.css }}
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{preset.name}</h3>
                <code className="block px-3 py-2 bg-zinc-900 rounded text-xs font-mono truncate">
                  {preset.css}
                </code>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
