'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Copy, Code2, FileCode, Minimize2 } from 'lucide-react';
import { toast } from 'sonner';

export default function FormattersPage() {
  const [htmlInput, setHtmlInput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [cssInput, setCssInput] = useState('');
  const [cssOutput, setCssOutput] = useState('');
  const [sqlInput, setSqlInput] = useState('');
  const [sqlOutput, setSqlOutput] = useState('');

  const formatHTML = () => {
    try {
      let formatted = htmlInput;
      formatted = formatted.replace(/>\s+</g, '><');
      
      let indent = 0;
      formatted = formatted.replace(/(<[^>]+>)/g, (match) => {
        if (match.startsWith('</')) {
          indent--;
          return '\n' + '  '.repeat(Math.max(0, indent)) + match;
        } else if (match.endsWith('/>')) {
          return '\n' + '  '.repeat(indent) + match;
        } else {
          const result = '\n' + '  '.repeat(indent) + match;
          indent++;
          return result;
        }
      });
      
      setHtmlOutput(formatted.trim());
      toast.success('HTML formatted!');
    } catch (error) {
      toast.error('Formatting failed!');
    }
  };

  const minifyHTML = () => {
    const minified = htmlInput
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
    setHtmlOutput(minified);
    toast.success('HTML minified!');
  };

  const formatCSS = () => {
    try {
      let formatted = cssInput;
      formatted = formatted.replace(/\s*{\s*/g, ' {\n  ');
      formatted = formatted.replace(/;\s*/g, ';\n  ');
      formatted = formatted.replace(/\s*}\s*/g, '\n}\n\n');
      formatted = formatted.replace(/,\s*/g, ',\n');
      
      setCssOutput(formatted.trim());
      toast.success('CSS formatted!');
    } catch (error) {
      toast.error('Formatting failed!');
    }
  };

  const minifyCSS = () => {
    const minified = cssInput
      .replace(/\s+/g, ' ')
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*,\s*/g, ',')
      .trim();
    setCssOutput(minified);
    toast.success('CSS minified!');
  };

  const formatSQL = () => {
    try {
      const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 
                       'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'INSERT', 'UPDATE', 'DELETE', 
                       'CREATE', 'ALTER', 'DROP', 'AND', 'OR'];
      
      let formatted = sqlInput.toUpperCase();
      
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g');
        formatted = formatted.replace(regex, `\n${keyword}`);
      });
      
      formatted = formatted.trim();
      setSqlOutput(formatted);
      toast.success('SQL formatted!');
    } catch (error) {
      toast.error('Formatting failed!');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Code Formatters</h1>
        <p className="text-muted">
          Format and beautify HTML, CSS, and SQL code
        </p>
      </div>

      {/* HTML Formatter */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">HTML Formatter</h2>
            <p className="text-sm text-muted">Beautify or minify HTML code</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input HTML</label>
            <Textarea
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="<div><p>Hello World</p></div>"
              className="font-mono text-sm min-h-[200px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            <Textarea
              value={htmlOutput}
              readOnly
              className="font-mono text-sm min-h-[200px] bg-zinc-900"
              placeholder="Formatted HTML will appear here"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={formatHTML} className="flex-1">
            <Code2 className="w-4 h-4 mr-2" />
            Format
          </Button>
          <Button onClick={minifyHTML} variant="secondary" className="flex-1">
            <Minimize2 className="w-4 h-4 mr-2" />
            Minify
          </Button>
          <Button onClick={() => copyToClipboard(htmlOutput)} variant="secondary">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* CSS Formatter */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <FileCode className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">CSS Formatter</h2>
            <p className="text-sm text-muted">Beautify or minify CSS code</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input CSS</label>
            <Textarea
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              placeholder=".class{color:red;margin:0;}"
              className="font-mono text-sm min-h-[200px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            <Textarea
              value={cssOutput}
              readOnly
              className="font-mono text-sm min-h-[200px] bg-zinc-900"
              placeholder="Formatted CSS will appear here"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={formatCSS} className="flex-1">
            <Code2 className="w-4 h-4 mr-2" />
            Format
          </Button>
          <Button onClick={minifyCSS} variant="secondary" className="flex-1">
            <Minimize2 className="w-4 h-4 mr-2" />
            Minify
          </Button>
          <Button onClick={() => copyToClipboard(cssOutput)} variant="secondary">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* SQL Formatter */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <FileCode className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">SQL Formatter</h2>
            <p className="text-sm text-muted">Format SQL queries</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Input SQL</label>
            <Textarea
              value={sqlInput}
              onChange={(e) => setSqlInput(e.target.value)}
              placeholder="select * from users where id=1"
              className="font-mono text-sm min-h-[200px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Output</label>
            <Textarea
              value={sqlOutput}
              readOnly
              className="font-mono text-sm min-h-[200px] bg-zinc-900"
              placeholder="Formatted SQL will appear here"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={formatSQL} className="flex-1">
            <Code2 className="w-4 h-4 mr-2" />
            Format SQL
          </Button>
          <Button onClick={() => copyToClipboard(sqlOutput)} variant="secondary">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
