'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const predefinedPalettes = [
  {
    name: 'Ocean Breeze',
    colors: ['#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'],
  },
  {
    name: 'Sunset Vibes',
    colors: ['#f59e0b', '#f97316', '#ef4444', '#ec4899', '#d946ef'],
  },
  {
    name: 'Forest Green',
    colors: ['#065f46', '#059669', '#10b981', '#34d399', '#6ee7b7'],
  },
  {
    name: 'Purple Dream',
    colors: ['#581c87', '#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'],
  },
  {
    name: 'Monochrome',
    colors: ['#18181b', '#27272a', '#3f3f46', '#71717a', '#a1a1aa'],
  },
];

const gradientPresets = [
  { name: 'Sunset', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: 'Ocean', css: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)' },
  { name: 'Fire', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: 'Forest', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: 'Aurora', css: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { name: 'Night', css: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
];

export default function ColorsPage() {
  const [customColors, setCustomColors] = useState(['#3b82f6', '#8b5cf6', '#ec4899']);
  const [gradientColor1, setGradientColor1] = useState('#3b82f6');
  const [gradientColor2, setGradientColor2] = useState('#8b5cf6');
  const [gradientAngle, setGradientAngle] = useState(135);

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
