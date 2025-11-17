'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Calculator, Palette, Box, ArrowLeftRight } from 'lucide-react';
import { toast } from 'sonner';

export default function ConverterPage() {
  // CSS Units
  const [pixelValue, setPixelValue] = useState(16);
  const [remValue, setRemValue] = useState(1);
  const [emValue, setEmValue] = useState(1);
  const [baseFontSize, setBaseFontSize] = useState(16);

  // Colors
  const [hexColor, setHexColor] = useState('#3b82f6');
  const [rgbColor, setRgbColor] = useState('rgb(59, 130, 246)');
  const [hslColor, setHslColor] = useState('hsl(217, 91%, 60%)');

  // Data Units
  const [bytes, setBytes] = useState(1024);
  const [kilobytes, setKilobytes] = useState(1);
  const [megabytes, setMegabytes] = useState(0.001);
  const [gigabytes, setGigabytes] = useState(0.000001);

  // Convert CSS Units
  const convertFromPixels = (px: number) => {
    setPixelValue(px);
    setRemValue(px / baseFontSize);
    setEmValue(px / baseFontSize);
  };

  const convertFromRem = (rem: number) => {
    setRemValue(rem);
    setPixelValue(rem * baseFontSize);
    setEmValue(rem);
  };

  // Convert Colors
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      setRgbColor(`rgb(${r}, ${g}, ${b})`);
      
      // Convert to HSL
      const hsl = rgbToHsl(r, g, b);
      setHslColor(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
    }
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // Convert Data Units
  const convertFromBytes = (b: number) => {
    setBytes(b);
    setKilobytes(b / 1024);
    setMegabytes(b / (1024 * 1024));
    setGigabytes(b / (1024 * 1024 * 1024));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Unit Converter</h1>
        <p className="text-muted">
          Convert between different units for CSS, colors, and data sizes
        </p>
      </div>

      {/* CSS Units Converter */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">CSS Units Converter</h2>
            <p className="text-sm text-muted">Convert between px, rem, and em</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Base Font Size (px)</label>
            <Input
              type="number"
              value={baseFontSize}
              onChange={(e) => {
                setBaseFontSize(Number(e.target.value));
                convertFromPixels(pixelValue);
              }}
              className="max-w-xs"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pixels (px)</label>
              <Input
                type="number"
                value={pixelValue}
                onChange={(e) => convertFromPixels(Number(e.target.value))}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">REM</label>
              <Input
                type="number"
                step="0.1"
                value={remValue.toFixed(4)}
                onChange={(e) => convertFromRem(Number(e.target.value))}
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">EM</label>
              <Input
                type="number"
                step="0.1"
                value={emValue.toFixed(4)}
                readOnly
                className="font-mono bg-zinc-900"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Color Converter */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Palette className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Color Converter</h2>
            <p className="text-sm text-muted">Convert between HEX, RGB, and HSL</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">HEX</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={hexColor}
                  onChange={(e) => {
                    setHexColor(e.target.value);
                    hexToRgb(e.target.value);
                  }}
                  className="flex-1 font-mono"
                  placeholder="#3b82f6"
                />
                <Input
                  type="color"
                  value={hexColor}
                  onChange={(e) => {
                    setHexColor(e.target.value);
                    hexToRgb(e.target.value);
                  }}
                  className="w-16"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">RGB</label>
              <Input
                type="text"
                value={rgbColor}
                readOnly
                className="font-mono bg-zinc-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">HSL</label>
              <Input
                type="text"
                value={hslColor}
                readOnly
                className="font-mono bg-zinc-900"
              />
            </div>
          </div>

          <div className="flex items-center justify-center bg-zinc-900 rounded-lg p-8">
            <div
              className="w-full h-48 rounded-lg shadow-lg"
              style={{ backgroundColor: hexColor }}
            />
          </div>
        </div>
      </Card>

      {/* Data Units Converter */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Box className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Data Units Converter</h2>
            <p className="text-sm text-muted">Convert between bytes, KB, MB, and GB</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Bytes (B)</label>
            <Input
              type="number"
              value={bytes}
              onChange={(e) => convertFromBytes(Number(e.target.value))}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Kilobytes (KB)</label>
            <Input
              type="number"
              step="0.01"
              value={kilobytes.toFixed(2)}
              onChange={(e) => convertFromBytes(Number(e.target.value) * 1024)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Megabytes (MB)</label>
            <Input
              type="number"
              step="0.001"
              value={megabytes.toFixed(6)}
              onChange={(e) => convertFromBytes(Number(e.target.value) * 1024 * 1024)}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Gigabytes (GB)</label>
            <Input
              type="number"
              step="0.000001"
              value={gigabytes.toFixed(9)}
              readOnly
              className="font-mono bg-zinc-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button onClick={() => convertFromBytes(1024)} variant="secondary" size="sm">
            1 KB
          </Button>
          <Button onClick={() => convertFromBytes(1024 * 1024)} variant="secondary" size="sm">
            1 MB
          </Button>
          <Button onClick={() => convertFromBytes(1024 * 1024 * 1024)} variant="secondary" size="sm">
            1 GB
          </Button>
          <Button onClick={() => convertFromBytes(1024 * 1024 * 1024 * 1024)} variant="secondary" size="sm">
            1 TB
          </Button>
        </div>
      </Card>
    </div>
  );
}
