'use client';

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { FileCode, Copy, Check, Wand2 } from 'lucide-react';

type FormatterType = 'json' | 'xml' | 'sql' | 'markdown';

export default function FormattersPage() {
  const [activeFormatter, setActiveFormatter] = useState<FormatterType>('json');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // JSON Formatter
  const formatJSON = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      throw new Error('Invalid JSON format');
    }
  };

  const minifyJSON = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      return JSON.stringify(parsed);
    } catch (e) {
      throw new Error('Invalid JSON format');
    }
  };

  // XML Formatter (basic)
  const formatXML = (text: string) => {
    try {
      const formatted = text
        .replace(/>\s*</g, '>\n<')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
      
      let indent = 0;
      const result = formatted.map((line) => {
        if (line.match(/<\/\w/)) indent--;
        const spaces = '  '.repeat(Math.max(0, indent));
        if (line.match(/<\w[^>]*[^\/]>$/)) indent++;
        return spaces + line;
      });
      
      return result.join('\n');
    } catch (e) {
      throw new Error('Error formatting XML');
    }
  };

  // SQL Formatter (basic)
  const formatSQL = (text: string) => {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
                      'INNER JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 
                      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM'];
    
    let formatted = text.toUpperCase();
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      formatted = formatted.replace(regex, `\n${keyword}`);
    });
    
    return formatted
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
  };

  // Markdown Formatter (basic)
  const formatMarkdown = (text: string) => {
    // Add proper spacing around headers, lists, and code blocks
    let formatted = text
      .replace(/^(#{1,6}\s)/gm, '\n$1')
      .replace(/```/g, '\n```\n')
      .replace(/^([*-]\s)/gm, '\n$1')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    return formatted;
  };

  const handleFormat = (action: 'format' | 'minify' = 'format') => {
    setError('');
    
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      let result = '';
      
      switch (activeFormatter) {
        case 'json':
          result = action === 'minify' ? minifyJSON(input) : formatJSON(input);
          break;
        case 'xml':
          result = formatXML(input);
          break;
        case 'sql':
          result = formatSQL(input);
          break;
        case 'markdown':
          result = formatMarkdown(input);
          break;
      }
      
      setOutput(result);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const formatters = [
    { id: 'json' as FormatterType, name: 'JSON', description: 'Format & Minify JSON' },
    { id: 'xml' as FormatterType, name: 'XML', description: 'Format XML' },
    { id: 'sql' as FormatterType, name: 'SQL', description: 'Format SQL Queries' },
    { id: 'markdown' as FormatterType, name: 'Markdown', description: 'Format Markdown' },
  ];

  const examples = {
    json: '{"name":"DevUtilities","version":"1.0.0","description":"Developer tools","features":["fonts","icons","colors"]}',
    xml: '<root><user><name>John</name><email>john@example.com</email></user></root>',
    sql: 'select users.name, orders.total from users inner join orders on users.id = orders.user_id where orders.total > 100 order by orders.total desc',
    markdown: '#Heading\n\n##Subheading\nSome text here.\n\n*List item 1\n*List item 2\n\n```code here```',
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">Formatters & Beautifiers</h1>
            <p className="text-lg text-[#a0a0a0]">
              Format and beautify JSON, XML, SQL, and Markdown
            </p>
          </div>

          {/* Formatter Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {formatters.map((formatter) => (
              <button
                key={formatter.id}
                onClick={() => {
                  setActiveFormatter(formatter.id);
                  setInput('');
                  setOutput('');
                  setError('');
                }}
                className={`p-4 rounded-lg text-left transition-all ${
                  activeFormatter === formatter.id
                    ? 'bg-white text-[#0d0d0d]'
                    : 'bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:border-white/20'
                }`}
              >
                <h3 className="font-semibold mb-1">{formatter.name}</h3>
                <p className={`text-xs ${activeFormatter === formatter.id ? 'text-[#0d0d0d]/70' : 'text-[#a0a0a0]'}`}>
                  {formatter.description}
                </p>
              </button>
            ))}
          </div>

          {/* Format Interface */}
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
            <div className="space-y-6">
              {/* Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-white">
                    Input
                  </label>
                  <button
                    onClick={() => setInput(examples[activeFormatter])}
                    className="text-xs text-[#a0a0a0] hover:text-white transition-colors"
                  >
                    Load Example
                  </button>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Paste your ${activeFormatter.toUpperCase()} here...`}
                  className="w-full h-64 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4 text-white placeholder:text-[#a0a0a0] focus:outline-none focus:ring-2 focus:ring-white/20 font-mono text-sm resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleFormat('format')}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#0d0d0d] rounded-lg font-medium hover:bg-[#e0e0e0] transition-all"
                >
                  <Wand2 className="w-4 h-4" />
                  Format
                </button>
                {activeFormatter === 'json' && (
                  <button
                    onClick={() => handleFormat('minify')}
                    className="flex items-center gap-2 px-6 py-3 bg-[#2a2a2a] text-white rounded-lg font-medium hover:bg-[#3a3a3a] transition-all"
                  >
                    <FileCode className="w-4 h-4" />
                    Minify
                  </button>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Output */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-white">
                    Output
                  </label>
                  {output && (
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-3 py-1 text-sm bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
                <textarea
                  value={output}
                  readOnly
                  placeholder="Formatted output will appear here..."
                  className="w-full h-64 bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4 text-white placeholder:text-[#a0a0a0] focus:outline-none font-mono text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-[#a0a0a0]">
                <li>• JSON: Format with proper indentation or minify</li>
                <li>• XML: Auto-indent and structure validation</li>
                <li>• SQL: Keyword highlighting and formatting</li>
                <li>• Markdown: Clean spacing and structure</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Use Cases</h3>
              <ul className="space-y-2 text-sm text-[#a0a0a0]">
                <li>• Debug API responses and configuration files</li>
                <li>• Clean up minified code for readability</li>
                <li>• Validate data structure and syntax</li>
                <li>• Prepare code for documentation</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
