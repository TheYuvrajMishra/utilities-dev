'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Copy, Regex, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

export default function RegexPage() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState('');

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: RegExpMatchArray[] = [];
      
      if (flags.includes('g')) {
        let match;
        const globalRegex = new RegExp(pattern, flags);
        while ((match = globalRegex.exec(testString)) !== null) {
          allMatches.push(match);
        }
      } else {
        const match = testString.match(regex);
        if (match) allMatches.push(match);
      }
      
      setMatches(allMatches);
      setError('');
      toast.success(`Found ${allMatches.length} match(es)!`);
    } catch (err: any) {
      setError(err.message);
      setMatches([]);
      toast.error('Invalid regex pattern!');
    }
  };

  const patterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
    { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flags: 'g' },
    { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', flags: 'g' },
    { name: 'IP Address', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
    { name: 'Hex Color', pattern: '#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}', flags: 'g' },
    { name: 'Credit Card', pattern: '\\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b', flags: 'g' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', flags: 'g' },
    { name: 'Time (HH:MM)', pattern: '([01]?[0-9]|2[0-3]):[0-5][0-9]', flags: 'g' },
    { name: 'Username', pattern: '@[a-zA-Z0-9_]{1,15}', flags: 'g' },
    { name: 'Hashtag', pattern: '#[a-zA-Z0-9_]+', flags: 'g' },
  ];

  const loadPattern = (p: string, f: string) => {
    setPattern(p);
    setFlags(f);
    toast.success('Pattern loaded!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const highlightMatches = () => {
    if (matches.length === 0) return testString;
    
    let result = testString;
    matches.reverse().forEach((match) => {
      if (match.index !== undefined) {
        const start = match.index;
        const end = start + match[0].length;
        result = result.slice(0, start) + `<mark class="bg-yellow-500/30">${match[0]}</mark>` + result.slice(end);
      }
    });
    return result;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Regex Tester</h1>
        <p className="text-muted">
          Test and validate regular expressions with live matching and common patterns
        </p>
      </div>

      {/* Main Tester */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Regex className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Regular Expression</h2>
            <p className="text-sm text-muted">Enter your regex pattern and test string</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Pattern</label>
            <div className="flex gap-2">
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="[a-z]+"
                className="flex-1 font-mono"
              />
              <div className="flex items-center gap-1">
                {['g', 'i', 'm', 's'].map((flag) => (
                  <button
                    key={flag}
                    onClick={() => setFlags(flags.includes(flag) ? flags.replace(flag, '') : flags + flag)}
                    className={`px-2 py-1 text-xs font-mono rounded border ${
                      flags.includes(flag)
                        ? 'bg-primary text-black border-primary'
                        : 'bg-zinc-900 border-border'
                    }`}
                  >
                    {flag}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xs text-muted">
              Flags: g (global), i (case-insensitive), m (multiline), s (dotAll)
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Result</label>
            <div className="flex items-center gap-2 h-10 px-3 rounded-lg border border-border bg-zinc-900">
              {error ? (
                <>
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">Invalid Pattern</span>
                </>
              ) : matches.length > 0 ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">{matches.length} match(es) found</span>
                </>
              ) : (
                <span className="text-sm text-muted">No matches yet</span>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Test String</label>
          <Textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the regex pattern..."
            className="min-h-[150px]"
          />
        </div>

        <Button onClick={testRegex} className="w-full">
          <Regex className="w-4 h-4 mr-2" />
          Test Regex
        </Button>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="text-sm text-red-500">{error}</div>
          </div>
        )}

        {matches.length > 0 && (
          <div className="space-y-3">
            <div className="p-4 bg-zinc-900 rounded-lg">
              <div className="text-sm font-medium mb-2">Highlighted Matches</div>
              <div 
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightMatches() }}
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Match Details</div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {matches.map((match, idx) => (
                  <div key={idx} className="p-3 bg-zinc-900 rounded-lg">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="text-sm font-mono text-primary">{match[0]}</div>
                        <div className="text-xs text-muted mt-1">
                          Position: {match.index} | Length: {match[0].length}
                        </div>
                      </div>
                      <Button
                        onClick={() => copyToClipboard(match[0])}
                        variant="secondary"
                        size="sm"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Common Patterns */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Common Patterns</h2>
            <p className="text-sm text-muted">Click to load frequently used regex patterns</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {patterns.map((p, idx) => (
            <Card
              key={idx}
              className="p-4 bg-zinc-900 hover:bg-zinc-800 cursor-pointer transition-colors"
              onClick={() => loadPattern(p.pattern, p.flags)}
            >
              <div className="font-semibold text-sm mb-1">{p.name}</div>
              <code className="text-xs text-primary break-all">{p.pattern}</code>
            </Card>
          ))}
        </div>
      </Card>

      {/* Cheat Sheet */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold text-lg">Regex Cheat Sheet</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold">Character Classes</div>
            <div className="text-xs space-y-1 text-muted">
              <div><code className="text-primary">.</code> - Any character</div>
              <div><code className="text-primary">\d</code> - Digit (0-9)</div>
              <div><code className="text-primary">\w</code> - Word character</div>
              <div><code className="text-primary">\s</code> - Whitespace</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold">Quantifiers</div>
            <div className="text-xs space-y-1 text-muted">
              <div><code className="text-primary">*</code> - 0 or more</div>
              <div><code className="text-primary">+</code> - 1 or more</div>
              <div><code className="text-primary">?</code> - 0 or 1</div>
              <div><code className="text-primary">{'{n,m}'}</code> - n to m times</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold">Anchors</div>
            <div className="text-xs space-y-1 text-muted">
              <div><code className="text-primary">^</code> - Start of string</div>
              <div><code className="text-primary">$</code> - End of string</div>
              <div><code className="text-primary">\b</code> - Word boundary</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
