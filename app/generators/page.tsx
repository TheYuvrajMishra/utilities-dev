'use client';

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react';

type GeneratorType = 'uuid' | 'password' | 'token' | 'lorem';

export default function GeneratorsPage() {
  const [activeGenerator, setActiveGenerator] = useState<GeneratorType>('uuid');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  
  // Password options
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  
  // Token options
  const [tokenLength, setTokenLength] = useState(32);
  
  // Lorem options
  const [loremParagraphs, setLoremParagraphs] = useState(3);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // UUID Generator
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Password Generator
  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    if (chars === '') return 'Please select at least one character type';
    
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Token Generator
  const generateToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  };

  // Lorem Ipsum Generator
  const generateLorem = () => {
    const lorem = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.',
    ];
    
    let result = '';
    for (let i = 0; i < loremParagraphs; i++) {
      result += lorem[i % lorem.length] + '\n\n';
    }
    return result.trim();
  };

  const handleGenerate = () => {
    let result = '';
    
    switch (activeGenerator) {
      case 'uuid':
        result = generateUUID();
        break;
      case 'password':
        result = generatePassword();
        break;
      case 'token':
        result = generateToken();
        break;
      case 'lorem':
        result = generateLorem();
        break;
    }
    
    setOutput(result);
    setCopied(false);
  };

  const generators = [
    { id: 'uuid' as GeneratorType, name: 'UUID', description: 'Generate unique identifier' },
    { id: 'password' as GeneratorType, name: 'Password', description: 'Generate secure password' },
    { id: 'token' as GeneratorType, name: 'Token', description: 'Generate random token' },
    { id: 'lorem' as GeneratorType, name: 'Lorem Ipsum', description: 'Generate placeholder text' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">Generators</h1>
            <p className="text-lg text-[#a0a0a0]">
              UUID, password, token, and text generation tools
            </p>
          </div>

          {/* Generator Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {generators.map((generator) => (
              <button
                key={generator.id}
                onClick={() => {
                  setActiveGenerator(generator.id);
                  setOutput('');
                }}
                className={`p-4 rounded-lg text-left transition-all ${
                  activeGenerator === generator.id
                    ? 'bg-white text-[#0d0d0d]'
                    : 'bg-[#1a1a1a] text-white border border-[#2a2a2a] hover:border-white/20'
                }`}
              >
                <h3 className="font-semibold mb-1">{generator.name}</h3>
                <p className={`text-xs ${activeGenerator === generator.id ? 'text-[#0d0d0d]/70' : 'text-[#a0a0a0]'}`}>
                  {generator.description}
                </p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Options Panel */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Options</h3>
                
                {activeGenerator === 'uuid' && (
                  <div className="text-sm text-[#a0a0a0]">
                    <p>Generates a random UUID v4</p>
                    <p className="mt-2">Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</p>
                  </div>
                )}
                
                {activeGenerator === 'password' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-white mb-2">
                        Length: {passwordLength}
                      </label>
                      <input
                        type="range"
                        min="8"
                        max="64"
                        value={passwordLength}
                        onChange={(e) => setPasswordLength(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeUppercase}
                          onChange={(e) => setIncludeUppercase(e.target.checked)}
                          className="rounded"
                        />
                        Uppercase (A-Z)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeLowercase}
                          onChange={(e) => setIncludeLowercase(e.target.checked)}
                          className="rounded"
                        />
                        Lowercase (a-z)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeNumbers}
                          onChange={(e) => setIncludeNumbers(e.target.checked)}
                          className="rounded"
                        />
                        Numbers (0-9)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeSymbols}
                          onChange={(e) => setIncludeSymbols(e.target.checked)}
                          className="rounded"
                        />
                        Symbols (!@#$...)
                      </label>
                    </div>
                  </div>
                )}
                
                {activeGenerator === 'token' && (
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Length: {tokenLength}
                    </label>
                    <input
                      type="range"
                      min="16"
                      max="128"
                      value={tokenLength}
                      onChange={(e) => setTokenLength(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
                
                {activeGenerator === 'lorem' && (
                  <div>
                    <label className="block text-sm text-white mb-2">
                      Paragraphs: {loremParagraphs}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={loremParagraphs}
                      onChange={(e) => setLoremParagraphs(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Output Panel */}
            <div className="lg:col-span-2">
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Output</h3>
                  <div className="flex gap-2">
                    {output && (
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] transition-all"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    )}
                    <button
                      onClick={handleGenerate}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-[#0d0d0d] rounded-lg font-medium hover:bg-[#e0e0e0] transition-all"
                    >
                      {output ? <RefreshCw className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      Generate
                    </button>
                  </div>
                </div>
                
                {output ? (
                  <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-4 min-h-[300px]">
                    <pre className="text-sm text-white font-mono whitespace-pre-wrap break-all">
                      {output}
                    </pre>
                  </div>
                ) : (
                  <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg p-12 min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 text-[#a0a0a0] mx-auto mb-4" />
                      <p className="text-[#a0a0a0]">Click Generate to create output</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Use Cases</h3>
              <ul className="space-y-2 text-sm text-[#a0a0a0]">
                <li>• UUID: Database primary keys, unique identifiers</li>
                <li>• Password: User accounts, secure credentials</li>
                <li>• Token: API keys, session tokens, authentication</li>
                <li>• Lorem Ipsum: UI mockups, design placeholders</li>
              </ul>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Security Tips</h3>
              <ul className="space-y-2 text-sm text-[#a0a0a0]">
                <li>• Use longer passwords for better security</li>
                <li>• Include all character types in passwords</li>
                <li>• Regenerate tokens regularly</li>
                <li>• Never share passwords or tokens publicly</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
