'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Copy, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function DataToolsPage() {
  // JSON Formatter State
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');

  // Base64 State
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [base64Mode, setBase64Mode] = useState<'encode' | 'decode'>('encode');

  // URL Encoder State
  const [urlInput, setUrlInput] = useState('');
  const [urlOutput, setUrlOutput] = useState('');
  const [urlMode, setUrlMode] = useState<'encode' | 'decode'>('encode');

  // Hash Generator State
  const [hashInput, setHashInput] = useState('');
  const [md5Hash, setMd5Hash] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonOutput(formatted);
      toast.success('JSON formatted successfully!');
    } catch (error) {
      toast.error('Invalid JSON format!');
      setJsonOutput('Error: Invalid JSON');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setJsonOutput(minified);
      toast.success('JSON minified successfully!');
    } catch (error) {
      toast.error('Invalid JSON format!');
      setJsonOutput('Error: Invalid JSON');
    }
  };

  const handleBase64 = () => {
    try {
      if (base64Mode === 'encode') {
        const encoded = btoa(base64Input);
        setBase64Output(encoded);
        toast.success('Encoded to Base64!');
      } else {
        const decoded = atob(base64Input);
        setBase64Output(decoded);
        toast.success('Decoded from Base64!');
      }
    } catch (error) {
      toast.error('Conversion failed!');
      setBase64Output('Error: Conversion failed');
    }
  };

  const handleURL = () => {
    try {
      if (urlMode === 'encode') {
        const encoded = encodeURIComponent(urlInput);
        setUrlOutput(encoded);
        toast.success('URL encoded!');
      } else {
        const decoded = decodeURIComponent(urlInput);
        setUrlOutput(decoded);
        toast.success('URL decoded!');
      }
    } catch (error) {
      toast.error('Conversion failed!');
      setUrlOutput('Error: Conversion failed');
    }
  };

  const generateHashes = async () => {
    if (!hashInput) {
      toast.error('Please enter text to hash');
      return;
    }

    // Simple hash implementation (for demo purposes)
    // In production, use a proper crypto library
    const simpleHash = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16).padStart(8, '0');
    };

    setMd5Hash(simpleHash(hashInput + 'md5'));
    setSha256Hash(simpleHash(hashInput + 'sha256').padStart(64, '0'));
    toast.success('Hashes generated!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Data Conversion Tools</h1>
        <p className="text-muted">
          Format, encode, decode, and transform data with ease
        </p>
      </div>

      {/* JSON Formatter */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          JSON Formatter & Minifier
        </h2>

        <Card className="p-6 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Input JSON</label>
              <Textarea
                placeholder='{"name":"John","age":30}'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="font-mono min-h-[200px]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Output</label>
                {jsonOutput && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(jsonOutput)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Textarea
                value={jsonOutput}
                readOnly
                className="font-mono min-h-[200px] bg-zinc-900"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={formatJSON}>Format JSON</Button>
            <Button onClick={minifyJSON} variant="secondary">
              Minify JSON
            </Button>
          </div>
        </Card>
      </section>

      {/* Base64 Encoder/Decoder */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Base64 Encoder/Decoder
        </h2>

        <Card className="p-6 space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant={base64Mode === 'encode' ? 'primary' : 'ghost'}
              onClick={() => setBase64Mode('encode')}
            >
              Encode
            </Button>
            <Button
              variant={base64Mode === 'decode' ? 'primary' : 'ghost'}
              onClick={() => setBase64Mode('decode')}
            >
              Decode
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Textarea
              label="Input"
              placeholder={base64Mode === 'encode' ? 'Enter text to encode' : 'Enter Base64 to decode'}
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              className="font-mono"
            />

            <Textarea
              label="Output"
              value={base64Output}
              readOnly
              className="font-mono bg-zinc-900"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleBase64} className="gap-2">
              {base64Mode === 'encode' ? 'Encode' : 'Decode'}
              <ArrowRight className="w-4 h-4" />
            </Button>
            {base64Output && (
              <Button variant="outline" onClick={() => copyToClipboard(base64Output)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            )}
          </div>
        </Card>
      </section>

      {/* URL Encoder/Decoder */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          URL Encoder/Decoder
        </h2>

        <Card className="p-6 space-y-4">
          <div className="flex gap-2 mb-4">
            <Button
              variant={urlMode === 'encode' ? 'primary' : 'ghost'}
              onClick={() => setUrlMode('encode')}
            >
              Encode
            </Button>
            <Button
              variant={urlMode === 'decode' ? 'primary' : 'ghost'}
              onClick={() => setUrlMode('decode')}
            >
              Decode
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Textarea
              label="Input"
              placeholder={urlMode === 'encode' ? 'Enter URL to encode' : 'Enter encoded URL to decode'}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="font-mono"
            />

            <Textarea
              label="Output"
              value={urlOutput}
              readOnly
              className="font-mono bg-zinc-900"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleURL} className="gap-2">
              {urlMode === 'encode' ? 'Encode' : 'Decode'}
              <ArrowRight className="w-4 h-4" />
            </Button>
            {urlOutput && (
              <Button variant="outline" onClick={() => copyToClipboard(urlOutput)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            )}
          </div>
        </Card>
      </section>

      {/* Hash Generator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Hash Generator
        </h2>

        <Card className="p-6 space-y-4">
          <Textarea
            label="Input Text"
            placeholder="Enter text to generate hashes"
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            className="font-mono"
          />

          <Button onClick={generateHashes}>Generate Hashes</Button>

          {(md5Hash || sha256Hash) && (
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">MD5 (Demo)</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(md5Hash)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <code className="block px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono break-all">
                  {md5Hash}
                </code>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">SHA-256 (Demo)</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(sha256Hash)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <code className="block px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono break-all">
                  {sha256Hash}
                </code>
              </div>
            </div>
          )}
        </Card>
      </section>

      {/* Info */}
      <Card className="p-6 bg-yellow-500/5 border-yellow-500/20">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">⚠️ Note</h3>
          <p className="text-sm text-muted">
            The hash generator uses a simple algorithm for demonstration purposes. For production use,
            please use proper cryptographic libraries like crypto-js or the Web Crypto API.
          </p>
        </div>
      </Card>
    </div>
  );
}
