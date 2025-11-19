"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function AIWorkspacePage() {
  const [prompt, setPrompt] = useState('');
  const [history, setHistory] = useState<Array<{ prompt: string; response: string }>>([]);

  function run() {
    if (!prompt.trim()) return;

    // Local simulated assistant behavior (client-only). No external calls.
    let response = '';

    if (prompt.trim().toLowerCase().startsWith('format json')) {
      const body = prompt.replace(/^[^\n]*\n?/, '');
      try {
        const parsed = JSON.parse(body || prompt);
        response = JSON.stringify(parsed, null, 2);
      } catch (e) {
        response = 'Error: invalid JSON';
      }
    } else if (prompt.trim().toLowerCase().includes('uppercase')) {
      response = prompt.toUpperCase();
    } else {
      response = `Simulated assistant reply — ${prompt}`;
    }

    setHistory([{ prompt, response }, ...history]);
    toast.success('Processed locally');
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">AI Workspace (Local)</h1>
        <p className="text-white/60 text-sm">A lightweight, client-only assistant for rapid prototyping.</p>
      </div>

      <Card className="p-4">
        <div className="space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={'Try "format json" followed by raw JSON, or ask to UPPERCASE text.'}
            className="w-full min-h-[140px] p-3 rounded bg-zinc-900 font-mono text-sm"
          />
          <div className="flex gap-2">
            <Button onClick={run}>Run</Button>
            <Button variant="ghost" onClick={() => { setPrompt(''); setHistory([]); }}>Clear</Button>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        {history.map((h, i) => (
          <Card key={i} className="p-3">
            <div className="mb-2 font-mono text-xs text-white/60">Prompt</div>
            <pre className="bg-black/50 p-3 rounded text-sm overflow-auto">{h.prompt}</pre>
            <div className="mt-3 mb-2 font-mono text-xs text-white/60">Response</div>
            <pre className="bg-black/60 p-3 rounded text-sm overflow-auto">{h.response}</pre>
            <div className="mt-3 flex gap-2">
              <Button variant="ghost" onClick={() => { navigator.clipboard.writeText(h.response); toast.success('Copied response'); }}>
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
