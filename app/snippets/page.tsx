'use client';

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { CopyButton } from '../components/CopyButton';

const snippets = [
  {
    category: 'Tailwind Layouts',
    items: [
      {
        name: 'Centered Container',
        description: 'Responsive centered container with max width',
        code: '<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">\n  {/* Content */}\n</div>',
      },
      {
        name: 'Flex Center',
        description: 'Center content both vertically and horizontally',
        code: '<div className="flex items-center justify-center min-h-screen">\n  {/* Content */}\n</div>',
      },
      {
        name: 'Grid Responsive',
        description: 'Responsive grid layout',
        code: '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n  {/* Items */}\n</div>',
      },
    ],
  },
  {
    category: 'CSS Components',
    items: [
      {
        name: 'Card Component',
        description: 'Modern card with hover effect',
        code: '.card {\n  background: #1a1a1a;\n  border: 1px solid #2a2a2a;\n  border-radius: 12px;\n  padding: 1.5rem;\n  transition: all 0.3s ease;\n}\n\n.card:hover {\n  border-color: rgba(255, 255, 255, 0.2);\n  transform: translateY(-2px);\n}',
      },
      {
        name: 'Button Primary',
        description: 'Primary button with hover state',
        code: '.btn-primary {\n  background: #ffffff;\n  color: #0d0d0d;\n  padding: 0.75rem 1.5rem;\n  border-radius: 8px;\n  font-weight: 600;\n  transition: all 0.2s ease;\n  border: none;\n  cursor: pointer;\n}\n\n.btn-primary:hover {\n  background: #e0e0e0;\n  transform: scale(1.05);\n}',
      },
      {
        name: 'Input Field',
        description: 'Styled input with focus state',
        code: '.input {\n  width: 100%;\n  background: #1a1a1a;\n  border: 1px solid #2a2a2a;\n  border-radius: 8px;\n  padding: 0.75rem 1rem;\n  color: #ffffff;\n  font-size: 0.875rem;\n  transition: all 0.2s ease;\n}\n\n.input:focus {\n  outline: none;\n  border-color: rgba(255, 255, 255, 0.4);\n  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);\n}',
      },
    ],
  },
  {
    category: 'React Components',
    items: [
      {
        name: 'Loading Spinner',
        description: 'Animated loading spinner component',
        code: 'export function LoadingSpinner() {\n  return (\n    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />\n  );\n}',
      },
      {
        name: 'Toast Notification',
        description: 'Simple toast notification',
        code: 'export function Toast({ message, onClose }) {\n  return (\n    <div className="fixed bottom-4 right-4 bg-white text-black px-6 py-3 rounded-lg shadow-lg animate-slide-up">\n      <div className="flex items-center gap-3">\n        <span>{message}</span>\n        <button onClick={onClose}>×</button>\n      </div>\n    </div>\n  );\n}',
      },
      {
        name: 'Modal Overlay',
        description: 'Modal with backdrop',
        code: 'export function Modal({ isOpen, onClose, children }) {\n  if (!isOpen) return null;\n  \n  return (\n    <div className="fixed inset-0 z-50 flex items-center justify-center">\n      <div className="absolute inset-0 bg-black/50" onClick={onClose} />\n      <div className="relative bg-[#1a1a1a] rounded-xl p-6 max-w-md w-full mx-4">\n        {children}\n      </div>\n    </div>\n  );\n}',
      },
    ],
  },
  {
    category: 'Animations',
    items: [
      {
        name: 'Fade In',
        description: 'Fade in animation',
        code: '@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n.fade-in {\n  animation: fadeIn 0.3s ease-in;\n}',
      },
      {
        name: 'Slide Up',
        description: 'Slide up animation',
        code: '@keyframes slideUp {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.slide-up {\n  animation: slideUp 0.4s ease-out;\n}',
      },
      {
        name: 'Pulse',
        description: 'Pulsing animation',
        code: '@keyframes pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n\n.pulse {\n  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n}',
      },
    ],
  },
  {
    category: 'Utility Classes',
    items: [
      {
        name: 'Scrollbar Styling',
        description: 'Custom scrollbar styles',
        code: '::-webkit-scrollbar {\n  width: 8px;\n  height: 8px;\n}\n\n::-webkit-scrollbar-track {\n  background: #0d0d0d;\n}\n\n::-webkit-scrollbar-thumb {\n  background: #3a3a3a;\n  border-radius: 4px;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background: #4a4a4a;\n}',
      },
      {
        name: 'Text Gradient',
        description: 'Gradient text effect',
        code: '.text-gradient {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}',
      },
      {
        name: 'Truncate Text',
        description: 'Truncate text with ellipsis',
        code: '.truncate-lines {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}',
      },
    ],
  },
];

export default function SnippetsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...snippets.map(s => s.category)];

  const filteredSnippets = snippets.filter(section => {
    if (selectedCategory !== 'All' && selectedCategory !== section.category) return false;
    
    const hasMatch = section.items.some(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return hasMatch || searchQuery === '';
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8 lg:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-3">UI/Code Snippets</h1>
            <p className="text-lg text-[#a0a0a0]">
              Reusable CSS, Tailwind, and React component snippets
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search snippets..."
            />
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-white text-[#0d0d0d]'
                      : 'bg-[#1a1a1a] text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Snippets */}
          <div className="space-y-12">
            {filteredSnippets.map((section) => (
              <div key={section.category}>
                <h2 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-[#2a2a2a]">
                  {section.category}
                </h2>
                
                <div className="space-y-4">
                  {section.items
                    .filter(item =>
                      searchQuery === '' ||
                      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.code.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item) => (
                      <div
                        key={item.name}
                        className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden hover:border-white/20 transition-all"
                      >
                        <div className="p-6 border-b border-[#2a2a2a]">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-1">
                                {item.name}
                              </h3>
                              <p className="text-sm text-[#a0a0a0]">{item.description}</p>
                            </div>
                            <CopyButton text={item.code} />
                          </div>
                        </div>
                        
                        <div className="bg-[#0d0d0d] p-6">
                          <pre className="text-sm text-white font-mono overflow-x-auto">
                            <code>{item.code}</code>
                          </pre>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {filteredSnippets.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#a0a0a0] text-lg">
                No snippets found matching your search.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
