'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, RefreshCw, Plus, Trash2, Palette, Sparkles, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

const predefinedPalettes = [
  {
    name: 'Ocean Blues',
    colors: ['#0ea5e9', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'],
  },
  {
    name: 'Sunset',
    colors: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#d946ef'],
  },
  {
    name: 'Forest Greens',
    colors: ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
  },
  {
    name: 'Purple Dream',
    colors: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'],
  },
  {
    name: 'Cherry Reds',
    colors: ['#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fecaca'],
  },
  {
    name: 'Warm Yellows',
    colors: ['#eab308', '#facc15', '#fde047', '#fef08a', '#fef9c3'],
  },
  {
    name: 'Cool Teals',
    colors: ['#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4'],
  },
  {
    name: 'Pink Blush',
    colors: ['#db2777', '#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8'],
  },
  {
    name: 'Vibrant Orange',
    colors: ['#ea580c', '#f97316', '#fb923c', '#fdba74', '#fed7aa'],
  },
  {
    name: 'Royal Purple',
    colors: ['#6d28d9', '#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'],
  },
  {
    name: 'Lime Greens',
    colors: ['#65a30d', '#84cc16', '#a3e635', '#bef264', '#d9f99d'],
  },
  {
    name: 'Dark Spectrum',
    colors: ['#000000', '#0d0d0d', '#1a1a1a', '#2a2a2a', '#404040'],
  },
];

const themedPalettes = [
  {
    theme: 'Tropical Paradise',
    description: 'Vibrant tropical colors',
    colors: ['#f43f5e', '#f59e0b', '#eab308', '#22c55e', '#06b6d4'],
  },
  {
    theme: 'Nordic Cool',
    description: 'Cool Scandinavian blues',
    colors: ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
  },
  {
    theme: 'Sunset Gradient',
    description: 'Warm sunset hues',
    colors: ['#dc2626', '#ea580c', '#f59e0b', '#fbbf24', '#fcd34d'],
  },
  {
    theme: 'Nature Fresh',
    description: 'Fresh green tones',
    colors: ['#14532d', '#166534', '#15803d', '#16a34a', '#22c55e'],
  },
  {
    theme: 'Purple Majesty',
    description: 'Rich purple shades',
    colors: ['#581c87', '#6d28d9', '#7c3aed', '#8b5cf6', '#a78bfa'],
  },
  {
    theme: 'Cherry Blossom',
    description: 'Soft pink gradients',
    colors: ['#be123c', '#e11d48', '#f43f5e', '#fb7185', '#fda4af'],
  },
  {
    theme: 'Electric Neon',
    description: 'Bold neon colors',
    colors: ['#dc2626', '#d946ef', '#8b5cf6', '#06b6d4', '#10b981'],
  },
  {
    theme: 'Ocean Depths',
    description: 'Deep blue ocean tones',
    colors: ['#172554', '#1e3a8a', '#1d4ed8', '#2563eb', '#3b82f6'],
  },
  {
    theme: 'Modern Dark',
    description: 'Sleek dark interface',
    colors: ['#0a0a0a', '#141414', '#1f1f1f', '#2a2a2a', '#ffffff'],
  },
];

const gradientPresets = [
  { name: 'Sunset Blaze', css: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%)' },
  { name: 'Ocean Wave', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Tropical Paradise', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Aurora Sky', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Fresh Mint', css: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { name: 'Purple Dream', css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { name: 'Fire Flame', css: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: 'Cool Blues', css: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)' },
  { name: 'Emerald Forest', css: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' },
  { name: 'Rose Gold', css: 'linear-gradient(135deg, #ed4264 0%, #ffedbc 100%)' },
  { name: 'Neon Life', css: 'linear-gradient(135deg, #b3ffab 0%, #12fff7 100%)' },
  { name: 'Dark Night', css: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
];

const colorUtilities = [
  {
    name: 'HEX to RGB',
    description: 'Convert hexadecimal color codes to RGB format',
    icon: Palette,
  },
  {
    name: 'RGB to HEX',
    description: 'Convert RGB color values to hexadecimal',
    icon: Palette,
  },
  {
    name: 'Color Shades',
    description: 'Generate lighter and darker shades of any color',
    icon: Sparkles,
  },
  {
    name: 'Contrast Checker',
    description: 'Check color contrast ratios for accessibility',
    icon: Lightbulb,
  },
];

export default function ColorsPage() {
  const [customColors, setCustomColors] = useState(['#3b82f6', '#8b5cf6', '#ec4899']);
  const [gradientColor1, setGradientColor1] = useState('#667eea');
  const [gradientColor2, setGradientColor2] = useState('#764ba2');
  const [gradientAngle, setGradientAngle] = useState(135);
  const [hexInput, setHexInput] = useState('#3b82f6');
  const [rgbOutput, setRgbOutput] = useState('');
  const [rgbR, setRgbR] = useState('59');
  const [rgbG, setRgbG] = useState('130');
  const [rgbB, setRgbB] = useState('246');
  const [hexOutput, setHexOutput] = useState('');

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

  const copyPalette = (colors: string[]) => {
    const paletteText = colors.join(', ');
    navigator.clipboard.writeText(paletteText);
    toast.success('Palette copied!');
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

  const hexToRgb = () => {
    const hex = hexInput.replace('#', '');
    if (hex.length === 6) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const result = `rgb(${r}, ${g}, ${b})`;
      setRgbOutput(result);
      toast.success('Converted to RGB!');
    } else {
      toast.error('Invalid HEX color!');
    }
  };

  const rgbToHex = () => {
    const r = parseInt(rgbR);
    const g = parseInt(rgbG);
    const b = parseInt(rgbB);
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
      const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
      setHexOutput(hex.toUpperCase());
      toast.success('Converted to HEX!');
    } else {
      toast.error('Invalid RGB values! Must be 0-255');
    }
  };

  const generateShades = (baseColor: string) => {
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const shades = [];
    for (let i = 0; i <= 4; i++) {
      const factor = i / 4;
      const newR = Math.round(r + (255 - r) * factor);
      const newG = Math.round(g + (255 - g) * factor);
      const newB = Math.round(b + (255 - b) * factor);
      const shade = '#' + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1);
      shades.push(shade);
    }
    return shades;
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
          Color Palettes
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {predefinedPalettes.map((palette) => (
            <Card key={palette.name} className="p-6 space-y-4 hover:border-white/20 transition-all">
              <h3 className="text-lg font-semibold">{palette.name}</h3>
              <div className="flex gap-2">
                {palette.colors.map((color) => (
                  <div
                    key={color}
                    className="flex-1 h-20 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-lg border border-white/10"
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyPalette(palette.colors)}
                className="w-full gap-2"
              >
                <Copy className="w-3 h-3" />
                Copy All
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Themed Palettes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Themed Palettes
        </h2>
        <p className="text-muted text-sm">
          Pre-designed color schemes for different design styles and purposes
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {themedPalettes.map((palette) => (
            <Card key={palette.theme} className="p-6 space-y-4 hover:border-white/20 transition-all">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{palette.theme}</h3>
                <p className="text-sm text-muted">{palette.description}</p>
              </div>
              <div className="flex gap-2">
                {palette.colors.map((color) => (
                  <div
                    key={color}
                    className="flex-1 h-24 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-lg border border-white/10"
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyPalette(palette.colors)}
                className="w-full gap-2"
              >
                <Copy className="w-3 h-3" />
                Copy Palette
              </Button>
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

      {/* Gradient Presets */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Gradient Presets
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gradientPresets.map((preset) => (
            <Card
              key={preset.name}
              className="p-0 overflow-hidden cursor-pointer hover:border-white/20 transition-all group"
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

      {/* Color Utilities */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Color Utilities
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* HEX to RGB Converter */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">HEX to RGB</h3>
                <p className="text-sm text-muted">Convert hexadecimal to RGB</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="#0d0d0d"
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  className="flex-1 font-mono"
                />
                <Button onClick={hexToRgb}>Convert</Button>
              </div>
              {rgbOutput && (
                <div className="flex gap-2">
                  <code className="flex-1 px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono">
                    {rgbOutput}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(rgbOutput);
                      toast.success('RGB copied!');
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* RGB to HEX Converter */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">RGB to HEX</h3>
                <p className="text-sm text-muted">Convert RGB to hexadecimal</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <Input
                  type="number"
                  placeholder="R"
                  value={rgbR}
                  onChange={(e) => setRgbR(e.target.value)}
                  min="0"
                  max="255"
                />
                <Input
                  type="number"
                  placeholder="G"
                  value={rgbG}
                  onChange={(e) => setRgbG(e.target.value)}
                  min="0"
                  max="255"
                />
                <Input
                  type="number"
                  placeholder="B"
                  value={rgbB}
                  onChange={(e) => setRgbB(e.target.value)}
                  min="0"
                  max="255"
                />
              </div>
              <Button onClick={rgbToHex} className="w-full">Convert</Button>
              {hexOutput && (
                <div className="flex gap-2">
                  <code className="flex-1 px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono">
                    {hexOutput}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(hexOutput);
                      toast.success('HEX copied!');
                    }}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Color Shades Generator */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Color Shades</h3>
                <p className="text-sm text-muted">Generate lighter shades</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="color"
                  value={customColors[0]}
                  onChange={(e) => updateColor(0, e.target.value)}
                  className="w-12 h-10 rounded-lg cursor-pointer border border-border"
                />
                <Input
                  type="text"
                  value={customColors[0]}
                  onChange={(e) => updateColor(0, e.target.value)}
                  className="flex-1 font-mono"
                />
              </div>
              <div className="flex gap-2">
                {generateShades(customColors[0]).map((shade, i) => (
                  <div
                    key={i}
                    className="flex-1 h-16 rounded-lg cursor-pointer hover:scale-105 transition-transform border border-white/10"
                    style={{ backgroundColor: shade }}
                    onClick={() => copyColor(shade)}
                    title={shade}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Color Contrast Info */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Accessibility Tips</h3>
                <p className="text-sm text-muted">WCAG color contrast guidelines</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-zinc-900 rounded-lg">
                <p className="font-medium mb-1">Normal Text (AA)</p>
                <p className="text-muted">Minimum ratio: 4.5:1</p>
              </div>
              <div className="p-3 bg-zinc-900 rounded-lg">
                <p className="font-medium mb-1">Large Text (AA)</p>
                <p className="text-muted">Minimum ratio: 3:1</p>
              </div>
              <div className="p-3 bg-zinc-900 rounded-lg">
                <p className="font-medium mb-1">Enhanced (AAA)</p>
                <p className="text-muted">Normal: 7:1, Large: 4.5:1</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
