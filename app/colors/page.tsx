'use client';

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { CopyButton } from '../components/CopyButton';
import { Shuffle, Palette } from 'lucide-react';

const gradientPresets = [
  { name: 'Sunset', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', colors: ['#f093fb', '#f5576c'] },
  { name: 'Ocean', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', colors: ['#4facfe', '#00f2fe'] },
  { name: 'Forest', css: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', colors: ['#43e97b', '#38f9d7'] },
  { name: 'Midnight', css: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', colors: ['#0f2027', '#203a43', '#2c5364'] },
  { name: 'Fire', css: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)', colors: ['#ff0844', '#ffb199'] },
  { name: 'Aurora', css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', colors: ['#a8edea', '#fed6e3'] },
  { name: 'Purple Haze', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', colors: ['#667eea', '#764ba2'] },
  { name: 'Citrus', css: 'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)', colors: ['#fddb92', '#d1fdff'] },
];

const shadowPresets = [
  { name: 'Soft', css: 'box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);' },
  { name: 'Medium', css: 'box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);' },
  { name: 'Hard', css: 'box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);' },
  { name: 'Inner', css: 'box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);' },
  { name: 'Colored', css: 'box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);' },
  { name: 'Multi-layer', css: 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);' },
];

const glassmorphismPresets = [
  { 
    name: 'Light Glass', 
    css: 'background: rgba(255, 255, 255, 0.1);\nbackdrop-filter: blur(10px);\nborder: 1px solid rgba(255, 255, 255, 0.2);' 
  },
  { 
    name: 'Dark Glass', 
    css: 'background: rgba(0, 0, 0, 0.2);\nbackdrop-filter: blur(10px);\nborder: 1px solid rgba(255, 255, 255, 0.1);' 
  },
  { 
    name: 'Frosted', 
    css: 'background: rgba(255, 255, 255, 0.05);\nbackdrop-filter: blur(20px) saturate(180%);\nborder: 1px solid rgba(255, 255, 255, 0.15);' 
  },
];

export default function ColorsPage() {
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  const generatePalette = () => {
    const palette = Array.from({ length: 5 }, () => generateRandomColor());
    setGeneratedColors(palette);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : null;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">Colors & Gradients</h1>
            <p className="text-lg text-[#a0a0a0]">
              Color palette generator, gradients, shadows, and glassmorphism presets
            </p>
          </div>

          {/* Color Palette Generator */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Color Palette Generator</h2>
              <button
                onClick={generatePalette}
                className="flex items-center gap-2 px-4 py-2 bg-white text-[#0d0d0d] rounded-lg font-medium hover:bg-[#e0e0e0] transition-all"
              >
                <Shuffle className="w-4 h-4" />
                Generate
              </button>
            </div>
            
            {generatedColors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {generatedColors.map((color, index) => (
                  <div key={index} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-white/20 transition-all">
                    <div 
                      className="h-32 w-full"
                      style={{ backgroundColor: color }}
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm text-white font-mono">{color}</code>
                        <CopyButton text={color} />
                      </div>
                      <code className="text-xs text-[#a0a0a0] font-mono block">
                        {hexToRgb(color)}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-12 text-center">
                <Palette className="w-12 h-12 text-[#a0a0a0] mx-auto mb-4" />
                <p className="text-[#a0a0a0]">Click Generate to create a color palette</p>
              </div>
            )}
          </section>

          {/* Gradient Presets */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Gradient Presets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gradientPresets.map((gradient) => (
                <div
                  key={gradient.name}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-white/20 transition-all"
                >
                  <div 
                    className="h-32 w-full"
                    style={{ background: gradient.css }}
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-white">{gradient.name}</h3>
                      <CopyButton text={gradient.css} />
                    </div>
                    <code className="text-xs text-[#a0a0a0] font-mono break-all block">
                      {gradient.css}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shadow Presets */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Shadow Presets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shadowPresets.map((shadow) => (
                <div
                  key={shadow.name}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white">{shadow.name}</h3>
                    <CopyButton text={shadow.css} />
                  </div>
                  
                  <div className="bg-[#0d0d0d] rounded-lg p-8 flex items-center justify-center mb-4">
                    <div 
                      className="w-24 h-24 bg-white rounded-lg"
                      style={{ boxShadow: shadow.css.replace('box-shadow: ', '').replace(';', '') }}
                    />
                  </div>
                  
                  <code className="text-xs text-[#a0a0a0] font-mono break-all block">
                    {shadow.css}
                  </code>
                </div>
              ))}
            </div>
          </section>

          {/* Glassmorphism Presets */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Glassmorphism Presets</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {glassmorphismPresets.map((glass) => (
                <div
                  key={glass.name}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white">{glass.name}</h3>
                    <CopyButton text={glass.css} />
                  </div>
                  
                  <div 
                    className="bg-linear-to-br from-purple-500 to-pink-500 rounded-lg p-8 flex items-center justify-center mb-4"
                    style={{ minHeight: '200px' }}
                  >
                    <div 
                      className="w-full h-32 rounded-lg flex items-center justify-center"
                      style={{
                        background: glass.css.split('\n')[0].replace('background: ', '').replace(';', ''),
                        backdropFilter: glass.css.split('\n')[1]?.replace('backdrop-filter: ', '').replace(';', ''),
                        border: glass.css.split('\n')[2]?.replace('border: ', '').replace(';', ''),
                      }}
                    >
                      <span className="text-white text-sm font-medium">Glass Effect</span>
                    </div>
                  </div>
                  
                  <pre className="text-xs text-[#a0a0a0] font-mono whitespace-pre-wrap break-all">
                    {glass.css}
                  </pre>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
