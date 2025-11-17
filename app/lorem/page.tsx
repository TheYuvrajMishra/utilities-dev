'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Copy, Wand2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function LoremPage() {
  const [paragraphs, setParagraphs] = useState(3);
  const [theme, setTheme] = useState('classic');
  const [output, setOutput] = useState('');

  const themes: Record<string, string[]> = {
    classic: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    tech: [
      'Initialize the quantum blockchain processor with neural network capabilities.',
      'Deploy microservices architecture using containerized Docker environments.',
      'Implement machine learning algorithms for predictive analytics and data optimization.',
      'Configure CI/CD pipeline with automated testing and deployment workflows.',
      'Integrate RESTful APIs with GraphQL endpoints for efficient data queries.',
      'Establish distributed systems with load balancing and fault tolerance.',
    ],
    hipster: [
      'Artisanal cold-brew coffee paired with organic avocado toast.',
      'Sustainable fashion meets minimalist design in urban environments.',
      'Craft beer breweries revolutionizing the local food scene.',
      'Vintage typewriters and vinyl records in reclaimed wood spaces.',
      'Ethical sourcing and farm-to-table dining experiences.',
    ],
    corporate: [
      'Synergize cross-functional teams to maximize operational efficiency.',
      'Leverage key performance indicators to drive strategic initiatives.',
      'Implement best practices for enterprise-level solutions.',
      'Optimize workflow processes to enhance productivity metrics.',
      'Facilitate stakeholder engagement through collaborative platforms.',
    ],
    pirate: [
      'Ahoy matey! Hoist the main sail and set course for adventure.',
      'Shiver me timbers! The treasure be buried on the eastern shore.',
      'Yo ho ho and a bottle of rum, the pirates life for me!',
      'Walk the plank ye scurvy dog, or face the wrath of the crew.',
      'Avast ye landlubbers! The Jolly Roger flies high today.',
    ],
  };

  const generate = () => {
    const sentences = themes[theme] || themes.classic;
    const result = [];
    
    for (let i = 0; i < paragraphs; i++) {
      const paragraph = [];
      const sentenceCount = 4 + Math.floor(Math.random() * 3);
      
      for (let j = 0; j < sentenceCount; j++) {
        paragraph.push(sentences[Math.floor(Math.random() * sentences.length)]);
      }
      
      result.push(paragraph.join(' '));
    }
    
    setOutput(result.join('\n\n'));
    toast.success('Text generated!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  React.useEffect(() => {
    generate();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Lorem Ipsum Generator</h1>
        <p className="text-muted">
          Generate placeholder text with various themes and styles
        </p>
      </div>

      {/* Settings */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Generator Settings</h2>
            <p className="text-sm text-muted">Customize your placeholder text</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Paragraphs</label>
            <div className="flex gap-2 items-center">
              <input
                type="range"
                min="1"
                max="10"
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
                className="flex-1"
              />
              <Input
                type="number"
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
                className="w-20"
                min="1"
                max="10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-border rounded-lg"
            >
              <option value="classic">Classic Lorem Ipsum</option>
              <option value="tech">Tech Jargon</option>
              <option value="hipster">Hipster</option>
              <option value="corporate">Corporate Speak</option>
              <option value="pirate">Pirate Talk</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={generate} className="flex-1">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate
          </Button>
          <Button onClick={copyToClipboard} variant="secondary">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </Card>

      {/* Output */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Generated Text</h2>
          <span className="text-sm text-muted">
            {output.split(' ').length} words, {output.length} characters
          </span>
        </div>
        <Textarea
          value={output}
          readOnly
          className="min-h-[400px] bg-zinc-900"
          placeholder="Generated text will appear here..."
        />
      </Card>

      {/* Theme Examples */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Theme Previews</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(themes).map(([key, sentences]) => (
            <Card key={key} className="p-4 bg-zinc-900">
              <div className="font-semibold text-sm mb-2 capitalize">{key}</div>
              <div className="text-xs text-muted italic">{sentences[0]}</div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
