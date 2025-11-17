'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Copy, Check, FileJson, Code2, Minimize2, FileType } from 'lucide-react';
import { toast } from 'sonner';

export default function JSONToolsPage() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [typeScriptOutput, setTypeScriptOutput] = useState('');
  const [interfaceName, setInterfaceName] = useState('MyInterface');
  const [activeTab, setActiveTab] = useState<'format' | 'validate' | 'minify' | 'typescript'>('format');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonOutput(formatted);
      toast.success('JSON formatted successfully!');
    } catch (error: any) {
      toast.error(`Invalid JSON: ${error.message}`);
      setJsonOutput(`Error: ${error.message}`);
    }
  };

  const validateJSON = () => {
    try {
      JSON.parse(jsonInput);
      toast.success('✓ Valid JSON!');
      setJsonOutput('✓ JSON is valid!');
    } catch (error: any) {
      toast.error(`Invalid JSON: ${error.message}`);
      setJsonOutput(`✗ Invalid JSON:\n${error.message}`);
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const minified = JSON.stringify(parsed);
      setJsonOutput(minified);
      toast.success('JSON minified successfully!');
    } catch (error: any) {
      toast.error(`Invalid JSON: ${error.message}`);
      setJsonOutput(`Error: ${error.message}`);
    }
  };

  const generateTypeScript = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const typescript = jsonToTypeScript(parsed, interfaceName);
      setTypeScriptOutput(typescript);
      toast.success('TypeScript interface generated!');
    } catch (error: any) {
      toast.error(`Invalid JSON: ${error.message}`);
      setTypeScriptOutput(`Error: ${error.message}`);
    }
  };

  const jsonToTypeScript = (obj: any, name: string): string => {
    if (typeof obj !== 'object' || obj === null) {
      return `type ${name} = ${typeof obj};`;
    }

    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return `type ${name} = any[];`;
      }
      const itemType = jsonToTypeScript(obj[0], `${name}Item`);
      return `${itemType}\n\ntype ${name} = ${name}Item[];`;
    }

    let interfaces = '';
    let properties = '';

    for (const [key, value] of Object.entries(obj)) {
      const type = getTypeScriptType(value, key);
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const nestedInterfaceName = capitalize(key);
        interfaces += `\n\n${jsonToTypeScript(value, nestedInterfaceName)}`;
        properties += `  ${key}: ${nestedInterfaceName};\n`;
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
        const nestedInterfaceName = capitalize(key) + 'Item';
        interfaces += `\n\n${jsonToTypeScript(value[0], nestedInterfaceName)}`;
        properties += `  ${key}: ${nestedInterfaceName}[];\n`;
      } else {
        properties += `  ${key}: ${type};\n`;
      }
    }

    return `${interfaces}\n\ninterface ${name} {\n${properties}}`.trim();
  };

  const getTypeScriptType = (value: any, key: string): string => {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const firstItemType = typeof value[0];
      if (firstItemType === 'object') {
        return `${capitalize(key)}Item[]`;
      }
      return `${firstItemType}[]`;
    }
    if (typeof value === 'object') {
      return capitalize(key);
    }
    return typeof value;
  };

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const exampleJSON = {
    user: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      active: true,
      roles: ["admin", "user"],
      profile: {
        avatar: "https://example.com/avatar.jpg",
        bio: "Developer"
      }
    },
    posts: [
      {
        id: 1,
        title: "First Post",
        published: true
      }
    ]
  };

  const loadExample = () => {
    setJsonInput(JSON.stringify(exampleJSON, null, 2));
    toast.success('Example JSON loaded!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">JSON Tools Suite</h1>
        <p className="text-muted">
          Format, validate, minify, and convert JSON to TypeScript interfaces
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('format')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'format'
              ? 'border-b-2 border-primary text-foreground'
              : 'text-muted hover:text-foreground'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4" />
            Format
          </div>
        </button>
        <button
          onClick={() => setActiveTab('validate')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'validate'
              ? 'border-b-2 border-primary text-foreground'
              : 'text-muted hover:text-foreground'
          }`}
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            Validate
          </div>
        </button>
        <button
          onClick={() => setActiveTab('minify')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'minify'
              ? 'border-b-2 border-primary text-foreground'
              : 'text-muted hover:text-foreground'
          }`}
        >
          <div className="flex items-center gap-2">
            <Minimize2 className="w-4 h-4" />
            Minify
          </div>
        </button>
        <button
          onClick={() => setActiveTab('typescript')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'typescript'
              ? 'border-b-2 border-primary text-foreground'
              : 'text-muted hover:text-foreground'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileType className="w-4 h-4" />
            To TypeScript
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Input JSON</h2>
            <Button onClick={loadExample} variant="secondary" size="sm">
              Load Example
            </Button>
          </div>
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="font-mono text-sm min-h-[400px]"
          />
          <div className="flex gap-2">
            {activeTab === 'format' && (
              <Button onClick={formatJSON} className="flex-1">
                <FileJson className="w-4 h-4 mr-2" />
                Format JSON
              </Button>
            )}
            {activeTab === 'validate' && (
              <Button onClick={validateJSON} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                Validate JSON
              </Button>
            )}
            {activeTab === 'minify' && (
              <Button onClick={minifyJSON} className="flex-1">
                <Minimize2 className="w-4 h-4 mr-2" />
                Minify JSON
              </Button>
            )}
            {activeTab === 'typescript' && (
              <Button onClick={generateTypeScript} className="flex-1">
                <FileType className="w-4 h-4 mr-2" />
                Generate TypeScript
              </Button>
            )}
          </div>
        </Card>

        {/* Output */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {activeTab === 'typescript' ? 'TypeScript Interface' : 'Output'}
            </h2>
            <Button
              onClick={() => copyToClipboard(activeTab === 'typescript' ? typeScriptOutput : jsonOutput)}
              variant="secondary"
              size="sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>

          {activeTab === 'typescript' ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Interface Name</label>
                <input
                  type="text"
                  value={interfaceName}
                  onChange={(e) => setInterfaceName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="MyInterface"
                />
              </div>
              <Textarea
                value={typeScriptOutput}
                readOnly
                className="font-mono text-sm min-h-[340px] bg-zinc-900"
                placeholder="TypeScript interface will appear here..."
              />
            </>
          ) : (
            <Textarea
              value={jsonOutput}
              readOnly
              className="font-mono text-sm min-h-[400px] bg-zinc-900"
              placeholder="Output will appear here..."
            />
          )}
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <FileJson className="w-8 h-8 text-blue-500 mb-3" />
          <h3 className="font-semibold mb-1">Format</h3>
          <p className="text-sm text-muted">
            Beautify JSON with proper indentation
          </p>
        </Card>
        <Card className="p-4">
          <Check className="w-8 h-8 text-green-500 mb-3" />
          <h3 className="font-semibold mb-1">Validate</h3>
          <p className="text-sm text-muted">
            Check JSON syntax and structure
          </p>
        </Card>
        <Card className="p-4">
          <Minimize2 className="w-8 h-8 text-purple-500 mb-3" />
          <h3 className="font-semibold mb-1">Minify</h3>
          <p className="text-sm text-muted">
            Compress JSON to save space
          </p>
        </Card>
        <Card className="p-4">
          <FileType className="w-8 h-8 text-orange-500 mb-3" />
          <h3 className="font-semibold mb-1">TypeScript</h3>
          <p className="text-sm text-muted">
            Generate TypeScript interfaces
          </p>
        </Card>
      </div>
    </div>
  );
}
