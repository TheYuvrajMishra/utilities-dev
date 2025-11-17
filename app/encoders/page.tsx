'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Copy, ArrowLeftRight, Lock, Type, Link2, FileCode } from 'lucide-react';
import { toast } from 'sonner';

export default function EncodersPage() {
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [urlOutput, setUrlOutput] = useState('');
  const [htmlInput, setHtmlInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [jwtInput, setJwtInput] = useState('');
  const [jwtDecoded, setJwtDecoded] = useState('');
  const [stringInput, setStringInput] = useState('');
  const [slugOutput, setSlugOutput] = useState('');

  // Base64 Encoding/Decoding
  const encodeBase64 = () => {
    try {
      const encoded = btoa(base64Input);
      setBase64Output(encoded);
      toast.success('Encoded to Base64!');
    } catch (error) {
      toast.error('Encoding failed!');
    }
  };

  const decodeBase64 = () => {
    try {
      const decoded = atob(base64Input);
      setBase64Output(decoded);
      toast.success('Decoded from Base64!');
    } catch (error) {
      toast.error('Decoding failed! Invalid Base64.');
    }
  };

  // URL Encoding/Decoding
  const encodeURL = () => {
    try {
      const encoded = encodeURIComponent(urlInput);
      setUrlOutput(encoded);
      toast.success('URL encoded!');
    } catch (error) {
      toast.error('Encoding failed!');
    }
  };

  const decodeURL = () => {
    try {
      const decoded = decodeURIComponent(urlInput);
      setUrlOutput(decoded);
      toast.success('URL decoded!');
    } catch (error) {
      toast.error('Decoding failed!');
    }
  };

  // HTML Encoding/Decoding
  const encodeHTML = () => {
    const encoded = htmlInput
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    setHtmlOutput(encoded);
    toast.success('HTML encoded!');
  };

  const decodeHTML = () => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = htmlInput;
    setHtmlOutput(textarea.value);
    toast.success('HTML decoded!');
  };

  // JWT Decoder
  const decodeJWT = () => {
    try {
      const parts = jwtInput.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }
      
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      
      const decoded = JSON.stringify(
        {
          header,
          payload,
          signature: parts[2]
        },
        null,
        2
      );
      
      setJwtDecoded(decoded);
      toast.success('JWT decoded!');
    } catch (error) {
      toast.error('Invalid JWT token!');
      setJwtDecoded('Error: Invalid JWT format');
    }
  };

  // String to Slug
  const generateSlug = () => {
    const slug = stringInput
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlugOutput(slug);
    toast.success('Slug generated!');
  };

  // Case Converters
  const transformCase = (type: string) => {
    let result = '';
    switch (type) {
      case 'upper':
        result = stringInput.toUpperCase();
        break;
      case 'lower':
        result = stringInput.toLowerCase();
        break;
      case 'title':
        result = stringInput.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        break;
      case 'camel':
        result = stringInput
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/\s+/g, '');
        break;
      case 'pascal':
        result = stringInput
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
          .replace(/\s+/g, '');
        break;
      case 'snake':
        result = stringInput
          .toLowerCase()
          .replace(/\s+/g, '_');
        break;
      case 'kebab':
        result = stringInput
          .toLowerCase()
          .replace(/\s+/g, '-');
        break;
    }
    setSlugOutput(result);
    toast.success('Text transformed!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">String & Encoding Tools</h1>
        <p className="text-muted">
          Encode, decode, and transform strings with various methods
        </p>
      </div>

      {/* Base64 Encoder/Decoder */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Base64 Encoder/Decoder</h2>
            <p className="text-sm text-muted">Convert text to/from Base64 encoding</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input</label>
            <Textarea
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="Enter text to encode/decode"
              className="min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            <Textarea
              value={base64Output}
              readOnly
              className="min-h-[120px] bg-zinc-900"
              placeholder="Result will appear here"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={encodeBase64} className="flex-1">
            Encode to Base64
          </Button>
          <Button onClick={decodeBase64} variant="secondary" className="flex-1">
            Decode from Base64
          </Button>
          <Button onClick={() => copyToClipboard(base64Output)} variant="secondary">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* URL Encoder/Decoder */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Link2 className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">URL Encoder/Decoder</h2>
            <p className="text-sm text-muted">Encode/decode URLs and query parameters</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input</label>
            <Textarea
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter URL to encode/decode"
              className="min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            <Textarea
              value={urlOutput}
              readOnly
              className="min-h-[120px] bg-zinc-900"
              placeholder="Result will appear here"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={encodeURL} className="flex-1">
            Encode URL
          </Button>
          <Button onClick={decodeURL} variant="secondary" className="flex-1">
            Decode URL
          </Button>
          <Button onClick={() => copyToClipboard(urlOutput)} variant="secondary">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* HTML Encoder/Decoder */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <FileCode className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">HTML Entity Encoder/Decoder</h2>
            <p className="text-sm text-muted">Encode/decode HTML special characters</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input</label>
            <Textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Enter HTML to encode/decode"
              className="min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            <Textarea
              value={htmlOutput}
              readOnly
              className="min-h-[120px] bg-zinc-900"
              placeholder="Result will appear here"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={encodeHTML} className="flex-1">
            Encode HTML
          </Button>
          <Button onClick={decodeHTML} variant="secondary" className="flex-1">
            Decode HTML
          </Button>
          <Button onClick={() => copyToClipboard(htmlOutput)} variant="secondary">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* JWT Decoder */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">JWT Decoder</h2>
            <p className="text-sm text-muted">Decode and inspect JWT tokens</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">JWT Token</label>
            <Textarea
              value={jwtInput}
              onChange={(e) => setJwtInput(e.target.value)}
              placeholder="Paste JWT token here (eyJhbGciOi...)"
              className="min-h-[150px] font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Decoded</label>
            <Textarea
              value={jwtDecoded}
              readOnly
              className="min-h-[150px] bg-zinc-900 font-mono text-sm"
              placeholder="Decoded JWT will appear here"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={decodeJWT} className="flex-1">
            <Lock className="w-4 h-4 mr-2" />
            Decode JWT
          </Button>
          <Button onClick={() => copyToClipboard(jwtDecoded)} variant="secondary">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Case Converter & Slug Generator */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
            <Type className="w-5 h-5 text-pink-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Case Converter & Slug Generator</h2>
            <p className="text-sm text-muted">Transform text case and generate URL-friendly slugs</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input Text</label>
            <Textarea
              value={stringInput}
              onChange={(e) => setStringInput(e.target.value)}
              placeholder="Enter text to transform"
              className="min-h-[120px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            <Textarea
              value={slugOutput}
              readOnly
              className="min-h-[120px] bg-zinc-900"
              placeholder="Result will appear here"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button onClick={() => transformCase('upper')} variant="secondary" size="sm">
            UPPERCASE
          </Button>
          <Button onClick={() => transformCase('lower')} variant="secondary" size="sm">
            lowercase
          </Button>
          <Button onClick={() => transformCase('title')} variant="secondary" size="sm">
            Title Case
          </Button>
          <Button onClick={() => transformCase('camel')} variant="secondary" size="sm">
            camelCase
          </Button>
          <Button onClick={() => transformCase('pascal')} variant="secondary" size="sm">
            PascalCase
          </Button>
          <Button onClick={() => transformCase('snake')} variant="secondary" size="sm">
            snake_case
          </Button>
          <Button onClick={() => transformCase('kebab')} variant="secondary" size="sm">
            kebab-case
          </Button>
          <Button onClick={generateSlug} size="sm">
            Generate Slug
          </Button>
        </div>
        <Button onClick={() => copyToClipboard(slugOutput)} variant="secondary" className="w-full">
          <Copy className="w-4 h-4 mr-2" />
          Copy Result
        </Button>
      </Card>
    </div>
  );
}
