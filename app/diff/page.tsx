'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Diff, RefreshCw, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function DiffPage() {
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [diffOutput, setDiffOutput] = useState<Array<{ type: 'add' | 'remove' | 'same'; text: string }>>([]);

  const calculateDiff = () => {
    const left = leftText.split('\n');
    const right = rightText.split('\n');
    const result: Array<{ type: 'add' | 'remove' | 'same'; text: string }> = [];

    let i = 0, j = 0;
    
    while (i < left.length || j < right.length) {
      if (i >= left.length) {
        result.push({ type: 'add', text: right[j] });
        j++;
      } else if (j >= right.length) {
        result.push({ type: 'remove', text: left[i] });
        i++;
      } else if (left[i] === right[j]) {
        result.push({ type: 'same', text: left[i] });
        i++;
        j++;
      } else {
        // Check if line was removed
        const foundInRight = right.slice(j).indexOf(left[i]);
        // Check if line was added
        const foundInLeft = left.slice(i).indexOf(right[j]);
        
        if (foundInRight !== -1 && (foundInLeft === -1 || foundInRight < foundInLeft)) {
          // Lines were added
          for (let k = 0; k < foundInRight; k++) {
            result.push({ type: 'add', text: right[j + k] });
          }
          j += foundInRight;
        } else if (foundInLeft !== -1) {
          // Lines were removed
          for (let k = 0; k < foundInLeft; k++) {
            result.push({ type: 'remove', text: left[i + k] });
          }
          i += foundInLeft;
        } else {
          // Different lines
          result.push({ type: 'remove', text: left[i] });
          result.push({ type: 'add', text: right[j] });
          i++;
          j++;
        }
      }
    }

    setDiffOutput(result);
    toast.success('Diff calculated!');
  };

  const swapTexts = () => {
    const temp = leftText;
    setLeftText(rightText);
    setRightText(temp);
    toast.success('Texts swapped!');
  };

  const loadExample = () => {
    setLeftText(`function hello() {
  console.log("Hello");
  return true;
}`);
    setRightText(`function hello(name) {
  console.log("Hello " + name);
  console.log("Welcome!");
  return true;
}`);
    toast.success('Example loaded!');
  };

  const copyDiff = () => {
    const text = diffOutput.map(line => {
      if (line.type === 'add') return `+ ${line.text}`;
      if (line.type === 'remove') return `- ${line.text}`;
      return `  ${line.text}`;
    }).join('\n');
    navigator.clipboard.writeText(text);
    toast.success('Diff copied to clipboard!');
  };

  const stats = {
    additions: diffOutput.filter(l => l.type === 'add').length,
    deletions: diffOutput.filter(l => l.type === 'remove').length,
    unchanged: diffOutput.filter(l => l.type === 'same').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Diff Checker</h1>
        <p className="text-muted">
          Compare text or code side-by-side and see the differences
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <Button onClick={calculateDiff}>
          <Diff className="w-4 h-4 mr-2" />
          Calculate Diff
        </Button>
        <Button onClick={swapTexts} variant="secondary">
          <RefreshCw className="w-4 h-4 mr-2" />
          Swap
        </Button>
        <Button onClick={loadExample} variant="secondary">
          Load Example
        </Button>
        {diffOutput.length > 0 && (
          <Button onClick={copyDiff} variant="secondary">
            <Copy className="w-4 h-4 mr-2" />
            Copy Diff
          </Button>
        )}
      </div>

      {/* Input Areas */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Original</h2>
            <span className="text-xs text-muted">{leftText.split('\n').length} lines</span>
          </div>
          <Textarea
            value={leftText}
            onChange={(e) => setLeftText(e.target.value)}
            placeholder="Paste original text here..."
            className="min-h-[400px] font-mono text-sm"
          />
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Modified</h2>
            <span className="text-xs text-muted">{rightText.split('\n').length} lines</span>
          </div>
          <Textarea
            value={rightText}
            onChange={(e) => setRightText(e.target.value)}
            placeholder="Paste modified text here..."
            className="min-h-[400px] font-mono text-sm"
          />
        </Card>
      </div>

      {/* Stats */}
      {diffOutput.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-green-500/10 border-green-500/20">
            <div className="text-2xl font-bold text-green-500">+{stats.additions}</div>
            <div className="text-sm text-muted">Additions</div>
          </Card>
          <Card className="p-4 bg-red-500/10 border-red-500/20">
            <div className="text-2xl font-bold text-red-500">-{stats.deletions}</div>
            <div className="text-sm text-muted">Deletions</div>
          </Card>
          <Card className="p-4 bg-zinc-900">
            <div className="text-2xl font-bold">{stats.unchanged}</div>
            <div className="text-sm text-muted">Unchanged</div>
          </Card>
        </div>
      )}

      {/* Diff Output */}
      {diffOutput.length > 0 && (
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Diff Result</h2>
          <div className="bg-zinc-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            {diffOutput.map((line, idx) => (
              <div
                key={idx}
                className={`py-0.5 ${
                  line.type === 'add'
                    ? 'bg-green-500/10 text-green-400'
                    : line.type === 'remove'
                    ? 'bg-red-500/10 text-red-400'
                    : ''
                }`}
              >
                <span className="inline-block w-6 text-center">
                  {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}
                </span>
                {line.text || ' '}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
