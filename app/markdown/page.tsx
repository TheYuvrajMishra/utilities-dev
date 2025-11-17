'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Copy, Eye, FileCode, Code2 } from 'lucide-react';
import { toast } from 'sonner';

export default function MarkdownPage() {
  const [markdown, setMarkdown] = useState('# Hello Markdown!\n\nStart typing your **markdown** here...\n\n## Features\n- **Bold** and *italic* text\n- [Links](https://example.com)\n- `Code blocks`\n\n```javascript\nconst hello = "world";\n```');
  const [mode, setMode] = useState<'split' | 'edit' | 'preview'>('split');

  const convertToHTML = (md: string): string => {
    let html = md;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-primary hover:underline">$1</a>');
    
    // Inline code
    html = html.replace(/`(.*?)`/gim, '<code class="bg-zinc-800 px-1 py-0.5 rounded text-sm">$1</code>');
    
    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-zinc-900 p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>');
    
    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/, '<ul class="list-disc list-inside space-y-1">$1</ul>');
    
    // Paragraphs
    html = html.split('\n\n').map(p => {
      if (!p.startsWith('<') && p.trim()) {
        return `<p class="mb-4">${p}</p>`;
      }
      return p;
    }).join('\n');
    
    return html;
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    toast.success('Markdown copied!');
  };

  const copyHTML = () => {
    navigator.clipboard.writeText(convertToHTML(markdown));
    toast.success('HTML copied!');
  };

  const loadTemplate = (template: string) => {
    const templates: Record<string, string> = {
      blog: `# My Blog Post Title

Published on ${new Date().toLocaleDateString()}

## Introduction

This is the introduction paragraph. Write your engaging opening here.

## Main Content

### Section 1

Your main points go here. You can use **bold** for emphasis and *italic* for style.

- Bullet point 1
- Bullet point 2
- Bullet point 3

### Section 2

More content with a [link to something](https://example.com).

\`\`\`javascript
// Code example
const example = "Hello World";
console.log(example);
\`\`\`

## Conclusion

Wrap up your thoughts here.`,
      readme: `# Project Name

Brief description of your project.

## Installation

\`\`\`bash
npm install project-name
\`\`\`

## Usage

\`\`\`javascript
import { something } from 'project-name';

something.doThing();
\`\`\`

## Features

- Feature 1
- Feature 2
- Feature 3

## Contributing

Pull requests are welcome!

## License

MIT`,
      docs: `# Documentation

## Getting Started

### Prerequisites

- Requirement 1
- Requirement 2

### Installation

Step-by-step installation guide.

## API Reference

### \`functionName(param1, param2)\`

Description of the function.

**Parameters:**
- \`param1\` (Type): Description
- \`param2\` (Type): Description

**Returns:** Description of return value

**Example:**
\`\`\`javascript
const result = functionName('value1', 'value2');
\`\`\``,
    };
    setMarkdown(templates[template] || '');
    toast.success('Template loaded!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Markdown Editor</h1>
        <p className="text-muted">
          Write and preview Markdown with live rendering
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2">
          <Button
            onClick={() => setMode('split')}
            variant={mode === 'split' ? 'primary' : 'secondary'}
            size="sm"
          >
            Split View
          </Button>
          <Button
            onClick={() => setMode('edit')}
            variant={mode === 'edit' ? 'primary' : 'secondary'}
            size="sm"
          >
            <Code2 className="w-4 h-4 mr-2" />
            Editor
          </Button>
          <Button
            onClick={() => setMode('preview')}
            variant={mode === 'preview' ? 'primary' : 'secondary'}
            size="sm"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>

        <div className="flex gap-2">
          <select
            onChange={(e) => loadTemplate(e.target.value)}
            className="px-3 py-1.5 text-sm bg-zinc-900 border border-border rounded-lg"
          >
            <option value="">Load Template...</option>
            <option value="blog">Blog Post</option>
            <option value="readme">README</option>
            <option value="docs">Documentation</option>
          </select>
          <Button onClick={copyMarkdown} variant="secondary" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Copy MD
          </Button>
          <Button onClick={copyHTML} variant="secondary" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Copy HTML
          </Button>
        </div>
      </div>

      {/* Editor & Preview */}
      <div className={`grid gap-4 ${mode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {(mode === 'split' || mode === 'edit') && (
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <FileCode className="w-5 h-5" />
              Markdown
            </h2>
            <Textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="min-h-[600px] font-mono text-sm"
              placeholder="# Start typing markdown..."
            />
          </Card>
        )}

        {(mode === 'split' || mode === 'preview') && (
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Preview
            </h2>
            <div
              className="prose prose-invert max-w-none min-h-[600px]"
              dangerouslySetInnerHTML={{ __html: convertToHTML(markdown) }}
            />
          </Card>
        )}
      </div>

      {/* Markdown Cheatsheet */}
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Markdown Cheatsheet</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-semibold">Headers</div>
            <div className="text-xs font-mono space-y-1 text-muted">
              <div># H1</div>
              <div>## H2</div>
              <div>### H3</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold">Emphasis</div>
            <div className="text-xs font-mono space-y-1 text-muted">
              <div>**bold**</div>
              <div>*italic*</div>
              <div>`code`</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold">Lists</div>
            <div className="text-xs font-mono space-y-1 text-muted">
              <div>- Item</div>
              <div>1. Numbered</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold">Links</div>
            <div className="text-xs font-mono space-y-1 text-muted">
              <div>[Text](url)</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold">Code Blocks</div>
            <div className="text-xs font-mono space-y-1 text-muted">
              <div>```language</div>
              <div>code</div>
              <div>```</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
