'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function GeneratorsPage() {
  const [uuid, setUuid] = useState('');
  const [loremLength, setLoremLength] = useState(3);
  const [loremText, setLoremText] = useState('');
  const [passwordLength, setPasswordLength] = useState(16);
  const [password, setPassword] = useState('');
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generateUUID = () => {
    const newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    setUuid(newUuid);
    toast.success('UUID generated!');
  };

  const generateLorem = () => {
    const lorem = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
      'Qui officia deserunt mollit anim id est laborum.',
      'Curabitur pretium tincidunt lacus nulla gravida orci a odio.',
      'Cum sociis natoque penatibus et magnis dis parturient montes.',
      'Nascetur ridiculus mus mauris vitae ultricies leo integer.',
      'Malesuada fames ac turpis egestas sed tempus urna.',
    ];

    const paragraphs = [];
    for (let i = 0; i < loremLength; i++) {
      const sentences = [];
      for (let j = 0; j < 5; j++) {
        sentences.push(lorem[Math.floor(Math.random() * lorem.length)]);
      }
      paragraphs.push(sentences.join(' '));
    }

    setLoremText(paragraphs.join('\n\n'));
    toast.success('Lorem ipsum generated!');
  };

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars.length === 0) {
      toast.error('Please select at least one character type!');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(newPassword);
    toast.success('Password generated!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  useEffect(() => {
    generateUUID();
    generateLorem();
    generatePassword();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Generators</h1>
        <p className="text-muted">
          Generate UUIDs, lorem ipsum, passwords, and more
        </p>
      </div>

      {/* UUID Generator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          UUID Generator
        </h2>

        <Card className="p-6 space-y-4">
          <p className="text-sm text-muted">
            Generate universally unique identifiers (v4) for your projects
          </p>

          <div className="flex gap-2">
            <Input
              value={uuid}
              readOnly
              className="flex-1 font-mono"
            />
            <Button onClick={() => copyToClipboard(uuid)} variant="outline">
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <Button onClick={generateUUID} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Generate New UUID
          </Button>
        </Card>
      </section>

      {/* Lorem Ipsum Generator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Lorem Ipsum Generator
        </h2>

        <Card className="p-6 space-y-4">
          <p className="text-sm text-muted">
            Generate placeholder text for your designs and mockups
          </p>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium whitespace-nowrap">
              Number of paragraphs:
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={loremLength}
              onChange={(e) => setLoremLength(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium w-8">{loremLength}</span>
          </div>

          <Textarea
            value={loremText}
            readOnly
            className="font-serif min-h-[200px]"
          />

          <div className="flex gap-2">
            <Button onClick={generateLorem} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Generate New
            </Button>
            <Button onClick={() => copyToClipboard(loremText)} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </Button>
          </div>
        </Card>
      </section>

      {/* Password Generator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Password Generator
        </h2>

        <Card className="p-6 space-y-4">
          <p className="text-sm text-muted">
            Generate secure random passwords with custom options
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium whitespace-nowrap">
                Password Length:
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={passwordLength}
                onChange={(e) => setPasswordLength(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-medium w-12">{passwordLength}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm">Uppercase (A-Z)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm">Lowercase (a-z)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm">Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm">Symbols (!@#$...)</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              value={password}
              readOnly
              className="flex-1 font-mono text-lg"
            />
            <Button onClick={() => copyToClipboard(password)} variant="outline">
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <Button onClick={generatePassword} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Generate New Password
          </Button>
        </Card>
      </section>

      {/* Color Generator */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Random Color Generator
        </h2>

        <Card className="p-6">
          <RandomColorGenerator />
        </Card>
      </section>
    </div>
  );
}

function RandomColorGenerator() {
  const [color, setColor] = useState('#3b82f6');

  const generateColor = () => {
    const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor(newColor);
    toast.success('Color generated!');
  };

  const copyColor = () => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color}!`);
  };

  useEffect(() => {
    generateColor();
  }, []);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Generate random hex colors for your designs
      </p>

      <div
        className="h-48 rounded-lg cursor-pointer hover:scale-105 transition-transform shadow-xl"
        style={{ backgroundColor: color }}
        onClick={generateColor}
      />

      <div className="flex gap-2">
        <Input
          value={color}
          readOnly
          className="flex-1 font-mono text-lg"
        />
        <Button onClick={copyColor} variant="outline">
          <Copy className="w-4 h-4" />
        </Button>
      </div>

      <Button onClick={generateColor} className="gap-2 w-full">
        <RefreshCw className="w-4 h-4" />
        Generate New Color
      </Button>
    </div>
  );
}
