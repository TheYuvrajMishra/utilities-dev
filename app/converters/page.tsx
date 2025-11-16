'use client';

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';

type ConverterType = 'base64' | 'hash' | 'url' | 'hex';

export default function ConvertersPage() {
  const [activeConverter, setActiveConverter] = useState<ConverterType>('base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Base64 Conversion
  const encodeBase64 = (text: string) => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (e) {
      return 'Error encoding';
    }
  };

  const decodeBase64 = (text: string) => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (e) {
      return 'Error decoding';
    }
  };

  // Hash Generation
  const generateHash = async (text: string, algorithm: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // URL Encoding
  const encodeURL = (text: string) => {
    try {
      return encodeURIComponent(text);
    } catch (e) {
      return 'Error encoding';
    }
  };

  const decodeURL = (text: string) => {
    try {
      return decodeURIComponent(text);
    } catch (e) {
      return 'Error decoding';
    }
  };

  // Hex Conversion
  const stringToHex = (text: string) => {
    return Array.from(text)
      .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  };

  const hexToString = (hex: string) => {
    try {
      const hexStr = hex.replace(/\s/g, '');
      let str = '';
      for (let i = 0; i < hexStr.length; i += 2) {
        str += String.fromCharCode(parseInt(hexStr.substr(i, 2), 16));
      }
      return str;
    } catch (e) {
      return 'Error converting';
    }
  };

  const handleConvert = async (direction: 'encode' | 'decode') => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    let result = '';

    switch (activeConverter) {
      case 'base64':
        result = direction === 'encode' ? encodeBase64(input) : decodeBase64(input);
        break;
      case 'hash':
        if (direction === 'encode') {
          const sha256 = await generateHash(input, 'SHA-256');
          const sha1 = await generateHash(input, 'SHA-1');
          result = `SHA-256: ${sha256}\n\nSHA-1: ${sha1}`;
        } else {
          result = 'Hash is one-way (cannot decode)';
        }
        break;
      case 'url':
        result = direction === 'encode' ? encodeURL(input) : decodeURL(input);
        break;
      case 'hex':
        result = direction === 'encode' ? stringToHex(input) : hexToString(input);
        break;
    }

    setOutput(result);
  };

  const converters = [
    { id: 'base64' as ConverterType, name: 'Base64', description: 'Encode/Decode Base64' },
    { id: 'hash' as ConverterType, name: 'Hash', description: 'Generate SHA-256/SHA-1' },
    { id: 'url' as ConverterType, name: 'URL', description: 'Encode/Decode URL' },
    { id: 'hex' as ConverterType, name: 'Hex', description: 'String to Hex' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">Data Converters</h1>
            <p className="text-lg text-[#a0a0a0]">
              Base64, Hash, URL, and Hex conversion utilities
            </p>
          </div>

          {/* Converter Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {converters.map((converter) => (
              <button
                key={converter.id}
                onClick={() => {
                  setActiveConverter(converter.id);
                  setInput('');
                  setOutput('');
                }}
                className={`p-4 rounded-lg text-left transition-all ${
                  activeConverter === converter.id
                    ? 'bg-white text-[#0d0d0d]'
                    : 'bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:border-white/20'
                }`}
              >
                <h3 className="font-semibold mb-1">{converter.name}</h3>
                <p className={`text-xs ${activeConverter === converter.id ? 'text-[#0d0d0d]/70' : 'text-[#a0a0a0]'}`}>
                  {converter.description}
                </p>
              </button>
            ))}
          </div>

          {/* Conversion Interface */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="space-y-6">
              {/* Input */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Input
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Enter text to ${activeConverter === 'hash' ? 'hash' : 'convert'}...`}
                  className="w-full h-40 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4 text-white placeholder:text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-white/20 font-mono text-sm resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleConvert('encode')}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#0d0d0d] rounded-lg font-medium hover:bg-[#e0e0e0] transition-all"
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  {activeConverter === 'hash' ? 'Generate Hash' : 'Encode'}
                </button>
                {activeConverter !== 'hash' && (
                  <button
                    onClick={() => handleConvert('decode')}
                    className="flex items-center gap-2 px-6 py-3 bg-[#2a2a2a] text-white rounded-lg font-medium hover:bg-[#3a3a3a] transition-all"
                  >
                    <ArrowLeftRight className="w-4 h-4 rotate-180" />
                    Decode
                  </button>
                )}
              </div>

              {/* Output */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-white">
                    Output
                  </label>
                  {output && (
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                <textarea
                  value={output}
                  readOnly
                  placeholder="Output will appear here..."
                  className="w-full h-40 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4 text-white placeholder:text-[#a0a0a0] focus:outline-none font-mono text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Common Use Cases</h3>
              <ul className="space-y-2 text-sm text-[#a0a0a0]">
                <li>• Base64: Encoding binary data in text format</li>
                <li>• Hash: Password verification and data integrity</li>
                <li>• URL: Encoding query parameters and URLs</li>
                <li>• Hex: Low-level data representation</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Tips</h3>
              <ul className="space-y-2 text-sm text-[#a0a0a0]">
                <li>• Base64 increases data size by ~33%</li>
                <li>• Hashes are one-way (cannot be reversed)</li>
                <li>• URL encoding is essential for web parameters</li>
                <li>• Hex is commonly used in color codes</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
