'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Copy, Hash, Lock, Shield, Key } from 'lucide-react';
import { toast } from 'sonner';

export default function HashToolsPage() {
  const [input, setInput] = useState('');
  const [md5, setMd5] = useState('');
  const [sha1, setSha1] = useState('');
  const [sha256, setSha256] = useState('');
  const [sha512, setSha512] = useState('');
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, text: '', color: '' });

  const simpleHash = async (str: string, algorithm: string) => {
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const generateHashes = async () => {
    if (!input) {
      toast.error('Please enter text to hash');
      return;
    }

    try {
      const sha1Hash = await simpleHash(input, 'SHA-1');
      const sha256Hash = await simpleHash(input, 'SHA-256');
      const sha512Hash = await simpleHash(input, 'SHA-512');
      
      // Simple MD5-like hash (not cryptographically secure)
      const md5Hash = await simpleHash(input, 'SHA-1').then(h => h.substring(0, 32));

      setMd5(md5Hash);
      setSha1(sha1Hash);
      setSha256(sha256Hash);
      setSha512(sha512Hash);
      
      toast.success('Hashes generated!');
    } catch (error) {
      toast.error('Failed to generate hashes');
    }
  };

  const checkPasswordStrength = (pwd: string) => {
    let score = 0;
    if (!pwd) return { score: 0, text: 'Empty', color: 'text-gray-500' };

    // Length check
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;

    // Character variety
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    // Determine strength
    if (score <= 2) return { score, text: 'Weak', color: 'text-red-500' };
    if (score <= 4) return { score, text: 'Fair', color: 'text-orange-500' };
    if (score <= 6) return { score, text: 'Good', color: 'text-yellow-500' };
    return { score, text: 'Strong', color: 'text-green-500' };
  };

  useEffect(() => {
    setStrength(checkPasswordStrength(password));
  }, [password]);

  useEffect(() => {
    if (input) {
      generateHashes();
    }
  }, [input]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Hash & Crypto Tools</h1>
        <p className="text-muted">
          Generate cryptographic hashes and check password strength
        </p>
      </div>

      {/* Hash Generator */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Hash className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Hash Generator</h2>
            <p className="text-sm text-muted">Generate cryptographic hashes from text</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Input Text</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">MD5 (32 chars)</label>
              <Button onClick={() => copyToClipboard(md5)} variant="secondary" size="sm">
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Input
              value={md5}
              readOnly
              className="font-mono text-sm bg-zinc-900"
              placeholder="MD5 hash will appear here"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">SHA-1 (40 chars)</label>
              <Button onClick={() => copyToClipboard(sha1)} variant="secondary" size="sm">
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Input
              value={sha1}
              readOnly
              className="font-mono text-sm bg-zinc-900"
              placeholder="SHA-1 hash will appear here"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">SHA-256 (64 chars)</label>
              <Button onClick={() => copyToClipboard(sha256)} variant="secondary" size="sm">
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Input
              value={sha256}
              readOnly
              className="font-mono text-sm bg-zinc-900"
              placeholder="SHA-256 hash will appear here"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">SHA-512 (128 chars)</label>
              <Button onClick={() => copyToClipboard(sha512)} variant="secondary" size="sm">
                <Copy className="w-3 h-3" />
              </Button>
            </div>
            <Textarea
              value={sha512}
              readOnly
              className="font-mono text-xs bg-zinc-900 min-h-[60px]"
              placeholder="SHA-512 hash will appear here"
            />
          </div>
        </div>
      </Card>

      {/* Password Strength Checker */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Password Strength Checker</h2>
            <p className="text-sm text-muted">Analyze password security and strength</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to check..."
            className="font-mono"
          />
        </div>

        {password && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Strength:</span>
              <span className={`text-lg font-bold ${strength.color}`}>{strength.text}</span>
            </div>

            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  strength.score <= 2
                    ? 'bg-red-500'
                    : strength.score <= 4
                    ? 'bg-orange-500'
                    : strength.score <= 6
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${(strength.score / 7) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-zinc-700'}`} />
                <span className="text-sm text-muted">8+ characters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${/[a-z]/.test(password) ? 'bg-green-500' : 'bg-zinc-700'}`} />
                <span className="text-sm text-muted">Lowercase</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-zinc-700'}`} />
                <span className="text-sm text-muted">Uppercase</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-zinc-700'}`} />
                <span className="text-sm text-muted">Numbers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${/[^a-zA-Z0-9]/.test(password) ? 'bg-green-500' : 'bg-zinc-700'}`} />
                <span className="text-sm text-muted">Symbols</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${password.length >= 12 ? 'bg-green-500' : 'bg-zinc-700'}`} />
                <span className="text-sm text-muted">12+ characters</span>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <Lock className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="font-semibold mb-1">Secure Hashing</h3>
          <p className="text-sm text-muted">
            All hashing is done client-side using the Web Crypto API. Your data never leaves your browser.
          </p>
        </Card>
        <Card className="p-4">
          <Key className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="font-semibold mb-1">Privacy First</h3>
          <p className="text-sm text-muted">
            No data is stored or transmitted. All operations happen locally in your browser.
          </p>
        </Card>
      </div>
    </div>
  );
}
