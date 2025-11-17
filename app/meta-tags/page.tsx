'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Copy, Tag, Share2, Twitter, Code } from 'lucide-react';
import { toast } from 'sonner';

export default function MetaTagsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [siteName, setSiteName] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [author, setAuthor] = useState('');
  const [keywords, setKeywords] = useState('');

  const generateBasicMeta = () => {
    return `<!-- Basic Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title || 'Your Page Title'}</title>
<meta name="description" content="${description || 'Your page description'}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}
${author ? `<meta name="author" content="${author}">` : ''}`;
  };

  const generateOpenGraph = () => {
    return `<!-- Open Graph / Facebook Meta Tags -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url || 'https://yoursite.com'}">
<meta property="og:title" content="${title || 'Your Page Title'}">
<meta property="og:description" content="${description || 'Your page description'}">
${image ? `<meta property="og:image" content="${image}">` : ''}
${siteName ? `<meta property="og:site_name" content="${siteName}">` : ''}`;
  };

  const generateTwitterCard = () => {
    return `<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${url || 'https://yoursite.com'}">
<meta name="twitter:title" content="${title || 'Your Page Title'}">
<meta name="twitter:description" content="${description || 'Your page description'}">
${image ? `<meta name="twitter:image" content="${image}">` : ''}
${twitterHandle ? `<meta name="twitter:creator" content="@${twitterHandle}">` : ''}`;
  };

  const generateJSONLD = () => {
    return `<!-- JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "${title || 'Your Page Title'}",
  "description": "${description || 'Your page description'}",
  "url": "${url || 'https://yoursite.com'}"${image ? `,
  "image": "${image}"` : ''}${author ? `,
  "author": {
    "@type": "Person",
    "name": "${author}"
  }` : ''}
}
</script>`;
  };

  const generateAllMeta = () => {
    return `${generateBasicMeta()}

${generateOpenGraph()}

${generateTwitterCard()}

${generateJSONLD()}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const loadExample = () => {
    setTitle('Ultimate Developer Utilities - DevUtils');
    setDescription('A comprehensive collection of developer tools and utilities for web development, including formatters, generators, converters, and more.');
    setUrl('https://devutils.com');
    setImage('https://devutils.com/og-image.jpg');
    setSiteName('DevUtils');
    setTwitterHandle('devutils');
    setAuthor('DevUtils Team');
    setKeywords('developer tools, web development, utilities, formatters, generators');
    toast.success('Example data loaded!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Meta Tags Generator</h1>
        <p className="text-muted">
          Generate SEO-friendly meta tags for your website
        </p>
      </div>

      {/* Input Form */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Page Information</h2>
              <p className="text-sm text-muted">Fill in your page details</p>
            </div>
          </div>
          <Button onClick={loadExample} variant="secondary">
            Load Example
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Page Title"
            />
            <div className="text-xs text-muted">
              {title.length}/60 characters (recommended)
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Site Name</label>
            <Input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Your Site Name"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Description *</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of your page"
              className="min-h-20"
            />
            <div className="text-xs text-muted">
              {description.length}/160 characters (recommended)
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">URL *</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yoursite.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://yoursite.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Author</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Twitter Handle</label>
            <Input
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              placeholder="username"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Keywords</label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </div>
      </Card>

      {/* Generated Meta Tags */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Basic Meta */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Code className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold">Basic Meta Tags</h3>
          </div>
          <div className="relative">
            <Textarea
              value={generateBasicMeta()}
              readOnly
              className="font-mono text-xs min-h-[200px] bg-zinc-900"
            />
            <Button
              onClick={() => copyToClipboard(generateBasicMeta())}
              variant="secondary"
              size="sm"
              className="absolute right-2 top-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </Card>

        {/* Open Graph */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Share2 className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold">Open Graph (Facebook)</h3>
          </div>
          <div className="relative">
            <Textarea
              value={generateOpenGraph()}
              readOnly
              className="font-mono text-xs min-h-[200px] bg-zinc-900"
            />
            <Button
              onClick={() => copyToClipboard(generateOpenGraph())}
              variant="secondary"
              size="sm"
              className="absolute right-2 top-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </Card>

        {/* Twitter Card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Twitter className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold">Twitter Card</h3>
          </div>
          <div className="relative">
            <Textarea
              value={generateTwitterCard()}
              readOnly
              className="font-mono text-xs min-h-[200px] bg-zinc-900"
            />
            <Button
              onClick={() => copyToClipboard(generateTwitterCard())}
              variant="secondary"
              size="sm"
              className="absolute right-2 top-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </Card>

        {/* JSON-LD */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Code className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">JSON-LD Schema</h3>
          </div>
          <div className="relative">
            <Textarea
              value={generateJSONLD()}
              readOnly
              className="font-mono text-xs min-h-[200px] bg-zinc-900"
            />
            <Button
              onClick={() => copyToClipboard(generateJSONLD())}
              variant="secondary"
              size="sm"
              className="absolute right-2 top-2"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </Card>
      </div>

      {/* All Meta Tags */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Complete Meta Tags</h3>
          <Button onClick={() => copyToClipboard(generateAllMeta())}>
            <Copy className="w-4 h-4 mr-2" />
            Copy All
          </Button>
        </div>
        <Textarea
          value={generateAllMeta()}
          readOnly
          className="font-mono text-xs min-h-[400px] bg-zinc-900"
        />
      </Card>

      {/* Preview */}
      {title && description && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-lg">Social Media Preview</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Facebook/Open Graph Preview */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted">Facebook / Open Graph</div>
              <div className="border border-border rounded-lg overflow-hidden">
                {image && (
                  <div className="aspect-video bg-zinc-800 flex items-center justify-center">
                    <img src={image} alt="OG" className="w-full h-full object-cover" onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }} />
                  </div>
                )}
                <div className="p-4 bg-zinc-900">
                  <div className="text-sm text-muted mb-1">{url}</div>
                  <div className="font-semibold mb-1">{title}</div>
                  <div className="text-sm text-muted">{description.slice(0, 100)}...</div>
                </div>
              </div>
            </div>

            {/* Twitter Preview */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted">Twitter Card</div>
              <div className="border border-border rounded-lg overflow-hidden">
                {image && (
                  <div className="aspect-video bg-zinc-800 flex items-center justify-center">
                    <img src={image} alt="Twitter" className="w-full h-full object-cover" onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }} />
                  </div>
                )}
                <div className="p-4 bg-zinc-900">
                  <div className="font-semibold mb-1">{title}</div>
                  <div className="text-sm text-muted mb-2">{description.slice(0, 100)}...</div>
                  <div className="text-xs text-muted">{url}</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
