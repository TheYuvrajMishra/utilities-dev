'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const snippets = [
  {
    title: 'React Hook: useLocalStorage',
    language: 'TypeScript',
    category: 'React Hooks',
    description: 'Custom hook for syncing state with localStorage',
    code: `import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}`,
  },
  {
    title: 'React Hook: useDebounce',
    language: 'TypeScript',
    category: 'React Hooks',
    description: 'Debounce any fast-changing value',
    code: `import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`,
  },
  {
    title: 'Fetch with Error Handling',
    language: 'TypeScript',
    category: 'API',
    description: 'Type-safe fetch wrapper with error handling',
    code: `async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}`,
  },
  {
    title: 'CSS: Glassmorphism Card',
    language: 'CSS',
    category: 'Styling',
    description: 'Modern glassmorphism effect for cards',
    code: `.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}`,
  },
  {
    title: 'Tailwind: Button Variants',
    language: 'CSS',
    category: 'Tailwind',
    description: 'Reusable button component styles',
    code: `/* Primary Button */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors;
}

/* Secondary Button */
.btn-secondary {
  @apply bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors;
}

/* Ghost Button */
.btn-ghost {
  @apply bg-transparent hover:bg-gray-100 text-gray-900 font-medium py-2 px-4 rounded-lg transition-colors;
}`,
  },
  {
    title: 'Next.js: Error Boundary',
    language: 'TypeScript',
    category: 'Next.js',
    description: 'Client-side error boundary component',
    code: `'use client';

import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-900">Something went wrong</h2>
          <pre className="mt-2 text-sm text-red-700">{this.state.error?.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}`,
  },
  {
    title: 'Array Utility Functions',
    language: 'TypeScript',
    category: 'Utilities',
    description: 'Common array manipulation helpers',
    code: `// Remove duplicates from array
export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];

// Chunk array into smaller arrays
export const chunk = <T>(arr: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

// Shuffle array randomly
export const shuffle = <T>(arr: T[]): T[] => {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};`,
  },
  {
    title: 'String Utility Functions',
    language: 'TypeScript',
    category: 'Utilities',
    description: 'Common string manipulation helpers',
    code: `// Convert to title case
export const toTitleCase = (str: string): string => {
  return str.replace(/\\w\\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

// Truncate string with ellipsis
export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};

// Generate slug from string
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\\w\\s-]/g, '')
    .replace(/[\\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};`,
  },
];

const categories = ['All', ...Array.from(new Set(snippets.map((s) => s.category)))];

export default function SnippetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredSnippets = snippets.filter((snippet) => {
    const matchesSearch =
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || snippet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Code Snippets</h1>
          <p className="text-muted">
            Ready-to-use code snippets for common development patterns
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Snippets List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold border-b border-border pb-2 flex-1">
            Available Snippets ({filteredSnippets.length})
          </h2>
        </div>

        {filteredSnippets.length > 0 ? (
          <div className="space-y-4">
            {filteredSnippets.map((snippet, index) => (
              <Card key={index} className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-semibold">{snippet.title}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                        {snippet.language}
                      </span>
                      <span className="px-2 py-1 bg-zinc-800 text-muted text-xs font-medium rounded-md">
                        {snippet.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{snippet.description}</p>
                  </div>
                  <Button
                    onClick={() => copyCode(snippet.code, index)}
                    className="gap-2"
                    size="sm"
                  >
                    {copiedIndex === index ? (
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
                  </Button>
                </div>

                {/* Code Block */}
                <div className="relative">
                  <pre className="p-4 bg-zinc-900 border border-border rounded-lg overflow-x-auto">
                    <code className="text-sm font-mono text-foreground whitespace-pre">
                      {snippet.code}
                    </code>
                  </pre>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted">No snippets found matching your search.</p>
          </div>
        )}
      </section>

      {/* Info Card */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">💡 Pro Tip</h3>
          <p className="text-sm text-muted">
            Click the "Copy" button to quickly copy any snippet to your clipboard. All snippets are
            production-ready and follow best practices.
          </p>
        </div>
      </Card>
    </div>
  );
}
