'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function TextToolsPage() {
  const [textInput, setTextInput] = useState('');
  const [regexPattern, setRegexPattern] = useState('');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexMatches, setRegexMatches] = useState<string[]>([]);
  const [replacePattern, setReplacePattern] = useState('');
  const [replaceWith, setReplaceWith] = useState('');
  const [replaceResult, setReplaceResult] = useState('');

  const transformText = (type: string) => {
    let result = '';
    switch (type) {
      case 'uppercase':
        result = textInput.toUpperCase();
        break;
      case 'lowercase':
        result = textInput.toLowerCase();
        break;
      case 'capitalize':
        result = textInput.replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'reverse':
        result = textInput.split('').reverse().join('');
        break;
      case 'removeSpaces':
        result = textInput.replace(/\s+/g, '');
        break;
      case 'removeLines':
        result = textInput.replace(/\n/g, ' ');
        break;
      case 'trim':
        result = textInput.trim();
        break;
      default:
        result = textInput;
    }
    setTextInput(result);
    toast.success('Text transformed!');
  };

  const testRegex = () => {
    try {
      const regex = new RegExp(regexPattern, regexFlags);
      const matches = textInput.match(regex) || [];
      setRegexMatches(matches);
      toast.success(`Found ${matches.length} match(es)!`);
    } catch (error) {
      toast.error('Invalid regex pattern!');
      setRegexMatches([]);
    }
  };

  const replaceText = () => {
    try {
      const regex = new RegExp(replacePattern, regexFlags);
      const result = textInput.replace(regex, replaceWith);
      setReplaceResult(result);
      toast.success('Text replaced!');
    } catch (error) {
      toast.error('Invalid regex pattern!');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getTextStats = () => {
    const chars = textInput.length;
    const charsNoSpaces = textInput.replace(/\s/g, '').length;
    const words = textInput.trim().split(/\s+/).filter(Boolean).length;
    const lines = textInput.split('\n').length;
    const paragraphs = textInput.split(/\n\n+/).filter(Boolean).length;

    return { chars, charsNoSpaces, words, lines, paragraphs };
  };

  const stats = getTextStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Text & Regex Tools</h1>
        <p className="text-muted">
          Transform text, test regex patterns, and analyze content
        </p>
      </div>

      {/* Text Input */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Text Input</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(textInput)}
            disabled={!textInput}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
        
        <Textarea
          placeholder="Enter or paste your text here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="min-h-[200px]"
        />

        {/* Text Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-4 bg-zinc-900 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.chars}</div>
            <div className="text-xs text-muted">Characters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.charsNoSpaces}</div>
            <div className="text-xs text-muted">No Spaces</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.words}</div>
            <div className="text-xs text-muted">Words</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.lines}</div>
            <div className="text-xs text-muted">Lines</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
            <div className="text-xs text-muted">Paragraphs</div>
          </div>
        </div>
      </Card>

      {/* Text Transformations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Text Transformations
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button onClick={() => transformText('uppercase')} variant="outline">
            UPPERCASE
          </Button>
          <Button onClick={() => transformText('lowercase')} variant="outline">
            lowercase
          </Button>
          <Button onClick={() => transformText('capitalize')} variant="outline">
            Capitalize Words
          </Button>
          <Button onClick={() => transformText('reverse')} variant="outline">
            Reverse Text
          </Button>
          <Button onClick={() => transformText('removeSpaces')} variant="outline">
            Remove Spaces
          </Button>
          <Button onClick={() => transformText('removeLines')} variant="outline">
            Remove Line Breaks
          </Button>
          <Button onClick={() => transformText('trim')} variant="outline">
            Trim Whitespace
          </Button>
          <Button onClick={() => setTextInput('')} variant="outline">
            Clear Text
          </Button>
        </div>
      </section>

      {/* Regex Tester */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Regex Pattern Tester
        </h2>

        <Card className="p-6 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Input
              label="Regex Pattern"
              placeholder="e.g., \d{3}-\d{3}-\d{4}"
              value={regexPattern}
              onChange={(e) => setRegexPattern(e.target.value)}
              className="font-mono"
            />
            <Input
              label="Flags"
              placeholder="e.g., g, gi, gim"
              value={regexFlags}
              onChange={(e) => setRegexFlags(e.target.value)}
              className="font-mono"
            />
          </div>

          <Button onClick={testRegex} disabled={!regexPattern}>
            Test Pattern
          </Button>

          {regexMatches.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Matches ({regexMatches.length})
                </label>
              </div>
              <div className="p-4 bg-zinc-900 rounded-lg space-y-2">
                {regexMatches.map((match, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-zinc-800 rounded"
                  >
                    <code className="text-sm font-mono text-green-400">{match}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(match)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </section>

      {/* Find and Replace */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Find & Replace
        </h2>

        <Card className="p-6 space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Input
              label="Find Pattern (Regex)"
              placeholder="e.g., old"
              value={replacePattern}
              onChange={(e) => setReplacePattern(e.target.value)}
              className="font-mono"
            />
            <Input
              label="Replace With"
              placeholder="e.g., new"
              value={replaceWith}
              onChange={(e) => setReplaceWith(e.target.value)}
              className="font-mono"
            />
          </div>

          <Button onClick={replaceText} disabled={!replacePattern}>
            Replace Text
          </Button>

          {replaceResult && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Result</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(replaceResult)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Textarea
                value={replaceResult}
                readOnly
                className="min-h-[150px] bg-zinc-900"
              />
            </div>
          )}
        </Card>
      </section>

      {/* Common Regex Patterns */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Common Regex Patterns
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
            { name: 'URL', pattern: 'https?://[^\\s]+' },
            { name: 'Phone (US)', pattern: '\\d{3}-\\d{3}-\\d{4}' },
            { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
            { name: 'IP Address', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}' },
            { name: 'Hex Color', pattern: '#[0-9a-fA-F]{6}' },
          ].map((item) => (
            <Card
              key={item.name}
              className="p-4 cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => {
                setRegexPattern(item.pattern);
                toast.success(`${item.name} pattern copied!`);
              }}
            >
              <div className="space-y-2">
                <h3 className="font-semibold">{item.name}</h3>
                <code className="block px-3 py-2 bg-zinc-900 rounded text-xs font-mono text-muted">
                  {item.pattern}
                </code>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
