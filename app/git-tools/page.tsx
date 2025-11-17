'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Copy, GitBranch, FileCode, Terminal, GitCommit } from 'lucide-react';
import { toast } from 'sonner';

export default function GitToolsPage() {
  const [branchName, setBranchName] = useState('');
  const [commitType, setCommitType] = useState('feat');
  const [commitScope, setCommitScope] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [gitignoreTemplate, setGitignoreTemplate] = useState('node');
  const [gitignoreContent, setGitignoreContent] = useState('');

  const generateBranchName = (type: string) => {
    const description = branchName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return `${type}/${description}`;
  };

  const generateCommitMessage = () => {
    const scope = commitScope ? `(${commitScope})` : '';
    return `${commitType}${scope}: ${commitMessage}`;
  };

  const gitignoreTemplates: Record<string, string> = {
    node: `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.pnpm-store/

# Testing
coverage/
.nyc_output/

# Production
build/
dist/
.next/
out/

# Misc
.DS_Store
.env
.env.local
.env.production.local
*.log

# Editor
.vscode/
.idea/
*.swp
*.swo
*~`,
    python: `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
eggs/
*.egg-info/
*.egg

# Virtual environments
venv/
ENV/
env/

# IDE
.vscode/
.idea/
*.swp

# Testing
.pytest_cache/
.coverage
htmlcov/

# Environment
.env
.env.local`,
    java: `# Compiled class files
*.class

# Package Files
*.jar
*.war
*.ear

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup

# Gradle
.gradle/
build/

# IDE
.idea/
*.iml
.vscode/

# OS
.DS_Store`,
    react: `# Dependencies
node_modules/
.pnp/
.pnp.js

# Testing
coverage/

# Production
build/
dist/

# Misc
.DS_Store
.env
.env.local
.env.production

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/`,
  };

  const loadGitignoreTemplate = () => {
    setGitignoreContent(gitignoreTemplates[gitignoreTemplate] || '');
    toast.success('.gitignore template loaded!');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const gitCommands = [
    {
      name: 'Clone Repository',
      command: 'git clone <repository-url>',
      description: 'Clone a repository',
    },
    {
      name: 'Create Branch',
      command: 'git checkout -b <branch-name>',
      description: 'Create and switch to new branch',
    },
    {
      name: 'Stage Changes',
      command: 'git add .',
      description: 'Stage all changes',
    },
    {
      name: 'Commit',
      command: 'git commit -m "message"',
      description: 'Commit staged changes',
    },
    {
      name: 'Push',
      command: 'git push origin <branch-name>',
      description: 'Push to remote branch',
    },
    {
      name: 'Pull',
      command: 'git pull origin <branch-name>',
      description: 'Pull from remote branch',
    },
    {
      name: 'Merge',
      command: 'git merge <branch-name>',
      description: 'Merge branch into current',
    },
    {
      name: 'Rebase',
      command: 'git rebase <branch-name>',
      description: 'Rebase current branch',
    },
    {
      name: 'Stash',
      command: 'git stash',
      description: 'Stash current changes',
    },
    {
      name: 'Stash Pop',
      command: 'git stash pop',
      description: 'Apply stashed changes',
    },
    {
      name: 'Reset Soft',
      command: 'git reset --soft HEAD~1',
      description: 'Undo last commit (keep changes)',
    },
    {
      name: 'Reset Hard',
      command: 'git reset --hard HEAD',
      description: 'Discard all changes',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Git Tools</h1>
        <p className="text-muted">
          Helpful tools for working with Git repositories
        </p>
      </div>

      {/* Branch Name Generator */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Branch Name Generator</h2>
            <p className="text-sm text-muted">Generate conventional branch names</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Branch Description</label>
            <Input
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Add user authentication"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['feature', 'bugfix', 'hotfix', 'release', 'chore', 'docs'].map((type) => (
              <Button
                key={type}
                onClick={() => copyToClipboard(generateBranchName(type))}
                variant="secondary"
                size="sm"
              >
                {type}/...
              </Button>
            ))}
          </div>

          {branchName && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Generated Branch Names</label>
              {['feature', 'bugfix', 'hotfix'].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Input
                    value={generateBranchName(type)}
                    readOnly
                    className="flex-1 font-mono text-sm bg-zinc-900"
                  />
                  <Button
                    onClick={() => copyToClipboard(generateBranchName(type))}
                    variant="secondary"
                    size="sm"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Commit Message Helper */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <GitCommit className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Commit Message Helper</h2>
            <p className="text-sm text-muted">Generate conventional commit messages</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <select
                value={commitType}
                onChange={(e) => setCommitType(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-900 border border-border rounded-lg"
              >
                <option value="feat">feat: New feature</option>
                <option value="fix">fix: Bug fix</option>
                <option value="docs">docs: Documentation</option>
                <option value="style">style: Code style</option>
                <option value="refactor">refactor: Code refactoring</option>
                <option value="test">test: Tests</option>
                <option value="chore">chore: Maintenance</option>
                <option value="perf">perf: Performance</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Scope (optional)</label>
              <Input
                value={commitScope}
                onChange={(e) => setCommitScope(e.target.value)}
                placeholder="api, ui, auth"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Input
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="add user login functionality"
            />
          </div>

          {commitMessage && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Generated Commit Message</label>
              <div className="flex items-center gap-2">
                <Input
                  value={generateCommitMessage()}
                  readOnly
                  className="flex-1 font-mono text-sm bg-zinc-900"
                />
                <Button
                  onClick={() => copyToClipboard(generateCommitMessage())}
                  variant="secondary"
                  size="sm"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* .gitignore Generator */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <FileCode className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">.gitignore Generator</h2>
            <p className="text-sm text-muted">Generate .gitignore templates</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <select
              value={gitignoreTemplate}
              onChange={(e) => setGitignoreTemplate(e.target.value)}
              className="flex-1 px-3 py-2 bg-zinc-900 border border-border rounded-lg"
            >
              <option value="node">Node.js / JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="react">React / Next.js</option>
            </select>
            <Button onClick={loadGitignoreTemplate}>
              Load Template
            </Button>
          </div>

          {gitignoreContent && (
            <div className="space-y-2">
              <label className="text-sm font-medium">.gitignore Content</label>
              <div className="relative">
                <Textarea
                  value={gitignoreContent}
                  onChange={(e) => setGitignoreContent(e.target.value)}
                  className="font-mono text-sm min-h-[300px]"
                />
                <Button
                  onClick={() => copyToClipboard(gitignoreContent)}
                  variant="secondary"
                  size="sm"
                  className="absolute right-2 top-2"
                >
                  <Copy className="w-3 h-3 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Git Commands Cheatsheet */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Terminal className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Git Commands Cheatsheet</h2>
            <p className="text-sm text-muted">Common Git commands</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {gitCommands.map((cmd, index) => (
            <Card key={index} className="p-4 bg-zinc-900 hover:bg-zinc-800 transition-colors cursor-pointer" onClick={() => copyToClipboard(cmd.command)}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-semibold text-sm mb-1">{cmd.name}</div>
                  <code className="text-xs text-primary">{cmd.command}</code>
                  <div className="text-xs text-muted mt-1">{cmd.description}</div>
                </div>
                <Copy className="w-4 h-4 text-muted shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
