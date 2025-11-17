'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Send, Copy, Save, Trash2, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function ApiTesterPage() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  const sendRequest = async () => {
    if (!url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    setLoading(true);
    const startTime = Date.now();

    try {
      const parsedHeaders: Record<string, string> = {};
      if (headers.trim()) {
        headers.split('\n').forEach((line) => {
          const [key, value] = line.split(':').map((s) => s.trim());
          if (key && value) parsedHeaders[key] = value;
        });
      }

      const options: RequestInit = {
        method,
        headers: parsedHeaders,
      };

      if (method !== 'GET' && body.trim()) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const endTime = Date.now();
      setResponseTime(endTime - startTime);
      setStatusCode(res.status);

      const contentType = res.headers.get('content-type');
      let data;

      if (contentType?.includes('application/json')) {
        data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        data = await res.text();
        setResponse(data);
      }

      toast.success(`Request completed in ${endTime - startTime}ms`);
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setStatusCode(null);
      toast.error('Request failed');
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    toast.success('Response copied!');
  };

  const generateCurl = () => {
    let curl = `curl -X ${method} "${url}"`;

    if (headers.trim()) {
      headers.split('\n').forEach((line) => {
        const [key, value] = line.split(':').map((s) => s.trim());
        if (key && value) {
          curl += ` -H "${key}: ${value}"`;
        }
      });
    }

    if (method !== 'GET' && body.trim()) {
      curl += ` -d '${body}'`;
    }

    navigator.clipboard.writeText(curl);
    toast.success('cURL command copied!');
  };

  const clearAll = () => {
    setUrl('');
    setHeaders('');
    setBody('');
    setResponse('');
    setStatusCode(null);
    setResponseTime(null);
    toast.success('All fields cleared');
  };

  const loadExample = () => {
    setMethod('POST');
    setUrl('https://jsonplaceholder.typicode.com/posts');
    setHeaders('Content-Type: application/json');
    setBody(JSON.stringify({ title: 'Test Post', body: 'This is a test', userId: 1 }, null, 2));
    toast.success('Example loaded');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">API Tester</h1>
        <p className="text-muted">
          Test HTTP requests and inspect responses
        </p>
      </div>

      {/* Request Builder */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Request</h2>
              <p className="text-sm text-muted">Configure your HTTP request</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadExample} size="sm" variant="secondary">
              Load Example
            </Button>
            <Button onClick={clearAll} size="sm" variant="secondary">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="px-3 py-2 bg-zinc-900 border border-border rounded-lg w-32"
            >
              {methods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="flex-1"
            />
            <Button onClick={sendRequest} disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Headers (one per line)</label>
            <Textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder="Content-Type: application/json&#10;Authorization: Bearer token123"
              className="min-h-24 font-mono text-sm"
            />
          </div>

          {method !== 'GET' && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Request Body</label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='{"key": "value"}'
                className="min-h-32 font-mono text-sm"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Response */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">Response</h2>
            {statusCode !== null && (
              <span
                className={`px-2 py-1 rounded text-sm ${
                  statusCode >= 200 && statusCode < 300
                    ? 'bg-green-500/20 text-green-400'
                    : statusCode >= 400
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-yellow-500/20 text-yellow-400'
                }`}
              >
                {statusCode}
              </span>
            )}
            {responseTime !== null && (
              <span className="text-sm text-muted flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {responseTime}ms
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={generateCurl} size="sm" variant="secondary">
              <Copy className="w-4 h-4 mr-2" />
              cURL
            </Button>
            <Button onClick={copyResponse} size="sm" variant="secondary">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>

        <Textarea
          value={response}
          readOnly
          placeholder="Response will appear here..."
          className="min-h-96 font-mono text-sm bg-zinc-900"
        />
      </Card>

      {/* Quick Tests */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Quick Test APIs</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { name: 'JSONPlaceholder', url: 'https://jsonplaceholder.typicode.com/posts/1' },
            { name: 'Dog CEO', url: 'https://dog.ceo/api/breeds/image/random' },
            { name: 'Cat Facts', url: 'https://catfact.ninja/fact' },
            { name: 'HTTPBin', url: 'https://httpbin.org/get' },
          ].map((api) => (
            <button
              key={api.name}
              onClick={() => {
                setMethod('GET');
                setUrl(api.url);
                setHeaders('');
                setBody('');
              }}
              className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors text-left"
            >
              <div className="font-medium">{api.name}</div>
              <div className="text-xs text-muted truncate">{api.url}</div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
