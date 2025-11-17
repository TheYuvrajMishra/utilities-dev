'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, Box, Palette, Layout as LayoutIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function CSSToolsPage() {
  // Box Shadow
  const [shadowX, setShadowX] = useState(0);
  const [shadowY, setShadowY] = useState(4);
  const [shadowBlur, setShadowBlur] = useState(6);
  const [shadowSpread, setShadowSpread] = useState(0);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  // Border Radius
  const [radiusTL, setRadiusTL] = useState(8);
  const [radiusTR, setRadiusTR] = useState(8);
  const [radiusBR, setRadiusBR] = useState(8);
  const [radiusBL, setRadiusBL] = useState(8);

  // Flexbox
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('center');
  const [alignItems, setAlignItems] = useState('center');
  const [flexGap, setFlexGap] = useState(16);

  const getShadowCSS = () => {
    const rgba = `${shadowColor}${Math.round(shadowOpacity * 255).toString(16).padStart(2, '0')}`;
    return `box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${rgba};`;
  };

  const getRadiusCSS = () => {
    if (radiusTL === radiusTR && radiusTR === radiusBR && radiusBR === radiusBL) {
      return `border-radius: ${radiusTL}px;`;
    }
    return `border-radius: ${radiusTL}px ${radiusTR}px ${radiusBR}px ${radiusBL}px;`;
  };

  const getFlexboxCSS = () => {
    return `display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
gap: ${flexGap}px;`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">CSS Tools</h1>
        <p className="text-muted">
          Generate CSS for shadows, borders, flexbox, and more
        </p>
      </div>

      {/* Box Shadow Generator */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Box className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Box Shadow Generator</h2>
            <p className="text-sm text-muted">Create beautiful box shadows</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Horizontal Offset (X)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowX}
                  onChange={(e) => setShadowX(Number(e.target.value))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={shadowX}
                  onChange={(e) => setShadowX(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Vertical Offset (Y)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowY}
                  onChange={(e) => setShadowY(Number(e.target.value))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={shadowY}
                  onChange={(e) => setShadowY(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Blur Radius</label>
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={shadowBlur}
                  onChange={(e) => setShadowBlur(Number(e.target.value))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={shadowBlur}
                  onChange={(e) => setShadowBlur(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Spread Radius</label>
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowSpread}
                  onChange={(e) => setShadowSpread(Number(e.target.value))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={shadowSpread}
                  onChange={(e) => setShadowSpread(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <Input
                  type="color"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Opacity</label>
                <Input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={shadowOpacity}
                  onChange={(e) => setShadowOpacity(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">CSS</label>
              <div className="relative">
                <Input
                  value={getShadowCSS()}
                  readOnly
                  className="font-mono text-sm bg-zinc-900 pr-10"
                />
                <Button
                  onClick={() => copyToClipboard(getShadowCSS())}
                  variant="secondary"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-zinc-900 rounded-lg p-8">
            <div
              className="w-48 h-48 bg-white rounded-lg"
              style={{
                boxShadow: `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}${Math.round(shadowOpacity * 255).toString(16).padStart(2, '0')}`
              }}
            />
          </div>
        </div>
      </Card>

      {/* Border Radius Generator */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Palette className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Border Radius Generator</h2>
            <p className="text-sm text-muted">Create custom border radius</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Top Left</label>
                <Input
                  type="number"
                  value={radiusTL}
                  onChange={(e) => setRadiusTL(Number(e.target.value))}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Top Right</label>
                <Input
                  type="number"
                  value={radiusTR}
                  onChange={(e) => setRadiusTR(Number(e.target.value))}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bottom Left</label>
                <Input
                  type="number"
                  value={radiusBL}
                  onChange={(e) => setRadiusBL(Number(e.target.value))}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bottom Right</label>
                <Input
                  type="number"
                  value={radiusBR}
                  onChange={(e) => setRadiusBR(Number(e.target.value))}
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">CSS</label>
              <div className="relative">
                <Input
                  value={getRadiusCSS()}
                  readOnly
                  className="font-mono text-sm bg-zinc-900 pr-10"
                />
                <Button
                  onClick={() => copyToClipboard(getRadiusCSS())}
                  variant="secondary"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-zinc-900 rounded-lg p-8">
            <div
              className="w-48 h-48 bg-blue-500"
              style={{
                borderTopLeftRadius: `${radiusTL}px`,
                borderTopRightRadius: `${radiusTR}px`,
                borderBottomLeftRadius: `${radiusBL}px`,
                borderBottomRightRadius: `${radiusBR}px`,
              }}
            />
          </div>
        </div>
      </Card>

      {/* Flexbox Generator */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <LayoutIcon className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Flexbox Generator</h2>
            <p className="text-sm text-muted">Generate flexbox layouts</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Flex Direction</label>
              <select
                value={flexDirection}
                onChange={(e) => setFlexDirection(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-border rounded-lg"
              >
                <option value="row">Row</option>
                <option value="row-reverse">Row Reverse</option>
                <option value="column">Column</option>
                <option value="column-reverse">Column Reverse</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Justify Content</label>
              <select
                value={justifyContent}
                onChange={(e) => setJustifyContent(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-border rounded-lg"
              >
                <option value="flex-start">Flex Start</option>
                <option value="flex-end">Flex End</option>
                <option value="center">Center</option>
                <option value="space-between">Space Between</option>
                <option value="space-around">Space Around</option>
                <option value="space-evenly">Space Evenly</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Align Items</label>
              <select
                value={alignItems}
                onChange={(e) => setAlignItems(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-border rounded-lg"
              >
                <option value="flex-start">Flex Start</option>
                <option value="flex-end">Flex End</option>
                <option value="center">Center</option>
                <option value="stretch">Stretch</option>
                <option value="baseline">Baseline</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Gap (px)</label>
              <Input
                type="number"
                value={flexGap}
                onChange={(e) => setFlexGap(Number(e.target.value))}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">CSS</label>
              <div className="relative">
                <textarea
                  value={getFlexboxCSS()}
                  readOnly
                  className="w-full px-3 py-2 bg-zinc-900 border border-border rounded-lg font-mono text-sm min-h-[120px]"
                />
                <Button
                  onClick={() => copyToClipboard(getFlexboxCSS())}
                  variant="secondary"
                  size="sm"
                  className="absolute right-2 top-2"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-lg p-8">
            <div
              style={{
                display: 'flex',
                flexDirection: flexDirection as any,
                justifyContent: justifyContent as any,
                alignItems: alignItems as any,
                gap: `${flexGap}px`,
                height: '100%',
                minHeight: '300px',
              }}
            >
              <div className="w-16 h-16 bg-blue-500 rounded"></div>
              <div className="w-16 h-16 bg-purple-500 rounded"></div>
              <div className="w-16 h-16 bg-pink-500 rounded"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
