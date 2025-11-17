'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Image as ImageIcon, Upload, Download, Copy, Code2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ImageToolsPage() {
  const [base64Input, setBase64Input] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [placeholderWidth, setPlaceholderWidth] = useState(300);
  const [placeholderHeight, setPlaceholderHeight] = useState(200);
  const [placeholderText, setPlaceholderText] = useState('');
  const [placeholderBg, setPlaceholderBg] = useState('#cccccc');
  const [placeholderColor, setPlaceholderColor] = useState('#333333');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBase64Input(result);
      setImageUrl(result);
      toast.success('Image uploaded and converted to Base64!');
    };
    reader.readAsDataURL(file);
  };

  const decodeBase64 = () => {
    if (!base64Input.trim()) {
      toast.error('Please enter Base64 string');
      return;
    }
    setImageUrl(base64Input);
    toast.success('Image decoded!');
  };

  const generatePlaceholder = () => {
    const canvas = document.createElement('canvas');
    canvas.width = placeholderWidth;
    canvas.height = placeholderHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background
      ctx.fillStyle = placeholderBg;
      ctx.fillRect(0, 0, placeholderWidth, placeholderHeight);
      
      // Text
      const text = placeholderText || `${placeholderWidth}×${placeholderHeight}`;
      ctx.fillStyle = placeholderColor;
      ctx.font = '20px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, placeholderWidth / 2, placeholderHeight / 2);
      
      // Diagonal lines
      ctx.strokeStyle = placeholderColor;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(placeholderWidth, placeholderHeight);
      ctx.moveTo(placeholderWidth, 0);
      ctx.lineTo(0, placeholderHeight);
      ctx.stroke();
    }
    
    setImageUrl(canvas.toDataURL());
    toast.success('Placeholder generated!');
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'image.png';
    link.click();
    toast.success('Image downloaded!');
  };

  const copyBase64 = () => {
    navigator.clipboard.writeText(base64Input);
    toast.success('Base64 copied to clipboard!');
  };

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#3b82f6"/>
</svg>`;

  const optimizedSvg = svgCode
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();

  const copySvg = () => {
    navigator.clipboard.writeText(optimizedSvg);
    toast.success('Optimized SVG copied!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Image Tools</h1>
        <p className="text-muted">
          Convert, optimize, and generate images
        </p>
      </div>

      {/* Base64 Encoder/Decoder */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Upload className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Base64 Encoder/Decoder</h2>
            <p className="text-sm text-muted">Convert images to and from Base64</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Or Paste Base64 String</label>
            <Textarea
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="data:image/png;base64,iVBORw0KGgo..."
              className="min-h-32"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={decodeBase64} className="flex-1">
              Decode Base64
            </Button>
            <Button onClick={copyBase64} variant="secondary">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>

          {imageUrl && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Preview</label>
                <Button onClick={downloadImage} size="sm" variant="secondary">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="border border-border rounded-lg p-4 bg-zinc-900 flex items-center justify-center">
                <img src={imageUrl} alt="Preview" className="max-w-full max-h-96" />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Placeholder Generator */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Placeholder Generator</h2>
            <p className="text-sm text-muted">Create custom placeholder images</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Width (px)</label>
            <Input
              type="number"
              value={placeholderWidth}
              onChange={(e) => setPlaceholderWidth(Number(e.target.value))}
              min="50"
              max="2000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Height (px)</label>
            <Input
              type="number"
              value={placeholderHeight}
              onChange={(e) => setPlaceholderHeight(Number(e.target.value))}
              min="50"
              max="2000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Background Color</label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={placeholderBg}
                onChange={(e) => setPlaceholderBg(e.target.value)}
                className="w-16"
              />
              <Input
                type="text"
                value={placeholderBg}
                onChange={(e) => setPlaceholderBg(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Text Color</label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={placeholderColor}
                onChange={(e) => setPlaceholderColor(e.target.value)}
                className="w-16"
              />
              <Input
                type="text"
                value={placeholderColor}
                onChange={(e) => setPlaceholderColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Custom Text (optional)</label>
            <Input
              type="text"
              value={placeholderText}
              onChange={(e) => setPlaceholderText(e.target.value)}
              placeholder="Leave empty for dimensions"
            />
          </div>
        </div>

        <Button onClick={generatePlaceholder} className="w-full">
          Generate Placeholder
        </Button>
      </Card>

      {/* SVG Optimizer */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">SVG Optimizer</h2>
            <p className="text-sm text-muted">Minify SVG code</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Original SVG</label>
            <Textarea value={svgCode} readOnly className="min-h-32 font-mono text-sm" />
            <p className="text-xs text-muted">{svgCode.length} characters</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Optimized SVG</label>
            <Textarea value={optimizedSvg} readOnly className="min-h-32 font-mono text-sm" />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted">
                {optimizedSvg.length} characters (-{Math.round((1 - optimizedSvg.length / svgCode.length) * 100)}%)
              </p>
              <Button onClick={copySvg} size="sm" variant="secondary">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Links */}
      <Card className="p-6">
        <h3 className="font-semibold mb-3">External Image Tools</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <a
            href="https://tinypng.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <div className="font-medium">TinyPNG</div>
            <div className="text-sm text-muted">Smart PNG/JPEG compression</div>
          </a>
          <a
            href="https://realfavicongenerator.net"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <div className="font-medium">Favicon Generator</div>
            <div className="text-sm text-muted">Generate favicons for all platforms</div>
          </a>
        </div>
      </Card>
    </div>
  );
}
