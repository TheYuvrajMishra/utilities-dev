'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { QrCode, Download, Palette } from 'lucide-react';
import { toast } from 'sonner';

export default function QRCodePage() {
  const [text, setText] = useState('https://devutils.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorLevel, setErrorLevel] = useState('M');

  // Simple QR code generation placeholder
  const generateQRCodeDataURL = () => {
    // In a real implementation, you'd use a library like qrcode
    // This is a placeholder that shows a message
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
      
      // Simple pattern (not a real QR code)
      ctx.fillStyle = fgColor;
      const cellSize = size / 20;
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if ((i + j) % 2 === 0) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }
      
      // Center text
      ctx.fillStyle = bgColor;
      ctx.fillRect(size / 4, size / 4, size / 2, size / 2);
      ctx.fillStyle = fgColor;
      ctx.font = `${size / 20}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('QR', size / 2, size / 2 - 10);
      ctx.fillText('CODE', size / 2, size / 2 + 10);
    }
    
    return canvas.toDataURL();
  };

  const downloadQRCode = () => {
    const dataURL = generateQRCodeDataURL();
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'qrcode.png';
    link.click();
    toast.success('QR Code downloaded!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">QR Code Generator</h1>
        <p className="text-muted">
          Create customizable QR codes for URLs, text, and more
        </p>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
        <div className="text-sm text-yellow-500">
          ⚠️ <strong>Note:</strong> This is a placeholder implementation. For production use, install a QR code library like <code className="bg-zinc-900 px-1 py-0.5 rounded">qrcode</code> or <code className="bg-zinc-900 px-1 py-0.5 rounded">react-qr-code</code>.
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Settings */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">QR Code Settings</h2>
              <p className="text-sm text-muted">Customize your QR code</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Content *</label>
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or text..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Size (px)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min="128"
                  max="512"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-24"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Foreground Color</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-16"
                  />
                  <Input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Background Color</label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-16"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1 font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Error Correction Level</label>
              <select
                value={errorLevel}
                onChange={(e) => setErrorLevel(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-border rounded-lg"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
              <div className="text-xs text-muted">
                Higher levels allow the QR code to be read even if partially damaged
              </div>
            </div>

            <Button onClick={downloadQRCode} className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download QR Code
            </Button>
          </div>
        </Card>

        {/* Preview */}
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Preview</h2>
          <div className="flex items-center justify-center bg-zinc-900 rounded-lg p-8">
            <div
              style={{
                width: size,
                height: size,
                backgroundImage: `url(${generateQRCodeDataURL()})`,
                backgroundSize: 'contain',
              }}
              className="rounded-lg"
            />
          </div>
          <div className="text-center text-sm text-muted">
            {text.length} characters
          </div>
        </Card>
      </div>

      {/* Quick Presets */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Quick Styles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            onClick={() => {
              setFgColor('#000000');
              setBgColor('#ffffff');
            }}
            variant="secondary"
            size="sm"
          >
            Classic
          </Button>
          <Button
            onClick={() => {
              setFgColor('#1e40af');
              setBgColor('#dbeafe');
            }}
            variant="secondary"
            size="sm"
          >
            Blue
          </Button>
          <Button
            onClick={() => {
              setFgColor('#15803d');
              setBgColor('#dcfce7');
            }}
            variant="secondary"
            size="sm"
          >
            Green
          </Button>
          <Button
            onClick={() => {
              setFgColor('#9333ea');
              setBgColor('#f3e8ff');
            }}
            variant="secondary"
            size="sm"
          >
            Purple
          </Button>
        </div>
      </Card>

      {/* Info */}
      <Card className="p-6">
        <h3 className="font-semibold mb-2">Implementation Note</h3>
        <p className="text-sm text-muted mb-4">
          To enable full QR code functionality, install a QR code library:
        </p>
        <div className="bg-zinc-900 p-4 rounded-lg">
          <code className="text-sm">npm install qrcode</code>
          <br />
          <code className="text-sm">npm install @types/qrcode -D</code>
        </div>
      </Card>
    </div>
  );
}
