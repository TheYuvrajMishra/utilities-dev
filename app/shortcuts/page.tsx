'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Keyboard, Command, Search } from 'lucide-react';

export default function ShortcutsPage() {
  const shortcuts = [
    {
      category: 'VS Code',
      icon: '💻',
      items: [
        { keys: ['Ctrl', 'P'], action: 'Quick Open, Go to File' },
        { keys: ['Ctrl', 'Shift', 'P'], action: 'Command Palette' },
        { keys: ['Ctrl', '/'], action: 'Toggle Line Comment' },
        { keys: ['Alt', '↑/↓'], action: 'Move Line Up/Down' },
        { keys: ['Ctrl', 'D'], action: 'Select Next Occurrence' },
        { keys: ['Ctrl', 'Shift', 'L'], action: 'Select All Occurrences' },
        { keys: ['Ctrl', '`'], action: 'Toggle Terminal' },
        { keys: ['Ctrl', 'B'], action: 'Toggle Sidebar' },
        { keys: ['Ctrl', 'Shift', 'E'], action: 'Explorer' },
        { keys: ['Ctrl', 'Shift', 'F'], action: 'Find in Files' },
      ],
    },
    {
      category: 'Chrome DevTools',
      icon: '🔍',
      items: [
        { keys: ['F12'], action: 'Open DevTools' },
        { keys: ['Ctrl', 'Shift', 'C'], action: 'Inspect Element' },
        { keys: ['Ctrl', 'Shift', 'J'], action: 'Open Console' },
        { keys: ['Ctrl', 'R'], action: 'Reload Page' },
        { keys: ['Ctrl', 'Shift', 'R'], action: 'Hard Reload' },
        { keys: ['Ctrl', 'Shift', 'Delete'], action: 'Clear Browsing Data' },
        { keys: ['Ctrl', 'P'], action: 'Search Files' },
        { keys: ['Ctrl', 'Shift', 'P'], action: 'Command Menu' },
      ],
    },
    {
      category: 'Git',
      icon: '🌿',
      items: [
        { keys: ['git status'], action: 'Check working tree status' },
        { keys: ['git add .'], action: 'Stage all changes' },
        { keys: ['git commit -m'], action: 'Commit with message' },
        { keys: ['git push'], action: 'Push to remote' },
        { keys: ['git pull'], action: 'Pull from remote' },
        { keys: ['git checkout -b'], action: 'Create new branch' },
        { keys: ['git merge'], action: 'Merge branches' },
        { keys: ['git log'], action: 'View commit history' },
      ],
    },
    {
      category: 'Terminal',
      icon: '⌨️',
      items: [
        { keys: ['Ctrl', 'C'], action: 'Cancel current command' },
        { keys: ['Ctrl', 'L'], action: 'Clear screen' },
        { keys: ['Ctrl', 'A'], action: 'Move to beginning of line' },
        { keys: ['Ctrl', 'E'], action: 'Move to end of line' },
        { keys: ['Ctrl', 'U'], action: 'Clear line before cursor' },
        { keys: ['Ctrl', 'K'], action: 'Clear line after cursor' },
        { keys: ['↑/↓'], action: 'Navigate command history' },
        { keys: ['Tab'], action: 'Auto-complete' },
      ],
    },
    {
      category: 'Windows',
      icon: '🪟',
      items: [
        { keys: ['Win', 'D'], action: 'Show Desktop' },
        { keys: ['Win', 'E'], action: 'Open File Explorer' },
        { keys: ['Win', 'L'], action: 'Lock Computer' },
        { keys: ['Win', 'Tab'], action: 'Task View' },
        { keys: ['Alt', 'Tab'], action: 'Switch Windows' },
        { keys: ['Ctrl', 'Shift', 'Esc'], action: 'Task Manager' },
        { keys: ['Win', 'V'], action: 'Clipboard History' },
        { keys: ['Win', '.'], action: 'Emoji Panel' },
      ],
    },
    {
      category: 'General',
      icon: '⚡',
      items: [
        { keys: ['Ctrl', 'C'], action: 'Copy' },
        { keys: ['Ctrl', 'V'], action: 'Paste' },
        { keys: ['Ctrl', 'X'], action: 'Cut' },
        { keys: ['Ctrl', 'Z'], action: 'Undo' },
        { keys: ['Ctrl', 'Y'], action: 'Redo' },
        { keys: ['Ctrl', 'A'], action: 'Select All' },
        { keys: ['Ctrl', 'F'], action: 'Find' },
        { keys: ['Ctrl', 'S'], action: 'Save' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Keyboard Shortcuts</h1>
        <p className="text-muted">
          Quick reference for essential keyboard shortcuts
        </p>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-muted" />
          <input
            type="text"
            placeholder="Search shortcuts..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>
      </Card>

      {/* Shortcuts Grid */}
      <div className="space-y-6">
        {shortcuts.map((section) => (
          <Card key={section.category} className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-2xl">
                {section.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{section.category}</h2>
                <p className="text-sm text-muted">{section.items.length} shortcuts</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {section.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <span className="text-sm flex-1">{item.action}</span>
                  <div className="flex gap-1">
                    {item.keys.map((key, keyIdx) => (
                      <React.Fragment key={keyIdx}>
                        {keyIdx > 0 && <span className="text-muted">+</span>}
                        <kbd className="px-2 py-1 text-xs font-mono bg-zinc-800 border border-border rounded">
                          {key}
                        </kbd>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <Keyboard className="w-5 h-5 text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold mb-2">Pro Tips</h3>
            <ul className="text-sm text-muted space-y-1 list-disc list-inside">
              <li>Memorizing just 5-10 shortcuts can significantly boost your productivity</li>
              <li>On Mac, replace Ctrl with Cmd (⌘) for most shortcuts</li>
              <li>Practice shortcuts regularly to build muscle memory</li>
              <li>Customize shortcuts in your IDE to match your workflow</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
