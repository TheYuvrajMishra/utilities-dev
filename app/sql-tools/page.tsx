'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Database, Copy, Play, Table } from 'lucide-react';
import { toast } from 'sonner';

export default function SqlToolsPage() {
  const [sqlInput, setSqlInput] = useState('');
  const [tableName, setTableName] = useState('users');
  const [columns, setColumns] = useState('id, name, email, created_at');
  const [rowCount, setRowCount] = useState(10);
  const [mockData, setMockData] = useState('');

  const formatSql = () => {
    if (!sqlInput.trim()) {
      toast.error('Please enter SQL code');
      return;
    }

    // Basic SQL formatter
    let formatted = sqlInput
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\bSELECT\b/gi, '\nSELECT\n  ')
      .replace(/\bFROM\b/gi, '\nFROM\n  ')
      .replace(/\bWHERE\b/gi, '\nWHERE\n  ')
      .replace(/\bAND\b/gi, '\n  AND ')
      .replace(/\bOR\b/gi, '\n  OR ')
      .replace(/\bJOIN\b/gi, '\nJOIN\n  ')
      .replace(/\bINNER JOIN\b/gi, '\nINNER JOIN\n  ')
      .replace(/\bLEFT JOIN\b/gi, '\nLEFT JOIN\n  ')
      .replace(/\bRIGHT JOIN\b/gi, '\nRIGHT JOIN\n  ')
      .replace(/\bON\b/gi, '\n  ON ')
      .replace(/\bGROUP BY\b/gi, '\nGROUP BY\n  ')
      .replace(/\bHAVING\b/gi, '\nHAVING\n  ')
      .replace(/\bORDER BY\b/gi, '\nORDER BY\n  ')
      .replace(/\bLIMIT\b/gi, '\nLIMIT ')
      .replace(/,/g, ',\n  ')
      .trim();

    setSqlInput(formatted);
    toast.success('SQL formatted!');
  };

  const minifySql = () => {
    if (!sqlInput.trim()) {
      toast.error('Please enter SQL code');
      return;
    }

    const minified = sqlInput
      .replace(/\s+/g, ' ')
      .replace(/\s*,\s*/g, ',')
      .replace(/\s*=\s*/g, '=')
      .trim();

    setSqlInput(minified);
    toast.success('SQL minified!');
  };

  const copySql = () => {
    navigator.clipboard.writeText(sqlInput);
    toast.success('SQL copied to clipboard!');
  };

  const generateInsert = () => {
    const cols = columns.split(',').map((c) => c.trim());
    const values = cols.map((col) => {
      if (col.includes('id')) return 'NULL';
      if (col.includes('email')) return "'user@example.com'";
      if (col.includes('name')) return "'John Doe'";
      if (col.includes('date') || col.includes('time')) return 'NOW()';
      if (col.includes('status')) return "'active'";
      return "'value'";
    });

    const query = `INSERT INTO ${tableName} (${cols.join(', ')})\nVALUES (${values.join(', ')});`;
    setSqlInput(query);
    toast.success('INSERT query generated!');
  };

  const generateSelect = () => {
    const cols = columns.split(',').map((c) => c.trim());
    const query = `SELECT\n  ${cols.join(',\n  ')}\nFROM ${tableName}\nWHERE id = 1;`;
    setSqlInput(query);
    toast.success('SELECT query generated!');
  };

  const generateUpdate = () => {
    const cols = columns.split(',').map((c) => c.trim()).filter((c) => !c.includes('id'));
    const sets = cols.map((col) => {
      if (col.includes('email')) return `${col} = 'newemail@example.com'`;
      if (col.includes('name')) return `${col} = 'New Name'`;
      return `${col} = 'new_value'`;
    });

    const query = `UPDATE ${tableName}\nSET\n  ${sets.join(',\n  ')}\nWHERE id = 1;`;
    setSqlInput(query);
    toast.success('UPDATE query generated!');
  };

  const generateMockData = () => {
    const cols = columns.split(',').map((c) => c.trim());
    const data = [];

    const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Eve', 'Frank'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];

    for (let i = 1; i <= rowCount; i++) {
      const row: Record<string, string | number> = {};
      cols.forEach((col) => {
        if (col.includes('id')) {
          row[col] = i;
        } else if (col.includes('name')) {
          row[col] = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
        } else if (col.includes('email')) {
          row[col] = `user${i}@example.com`;
        } else if (col.includes('age')) {
          row[col] = 20 + Math.floor(Math.random() * 50);
        } else if (col.includes('status')) {
          row[col] = i % 2 === 0 ? 'active' : 'inactive';
        } else if (col.includes('date') || col.includes('created')) {
          const date = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
          row[col] = date.toISOString().split('T')[0];
        } else {
          row[col] = `value_${i}`;
        }
      });
      data.push(row);
    }

    setMockData(JSON.stringify(data, null, 2));
    toast.success(`Generated ${rowCount} mock records!`);
  };

  const copyMockData = () => {
    navigator.clipboard.writeText(mockData);
    toast.success('Mock data copied!');
  };

  const loadExample = () => {
    setSqlInput(`SELECT u.id, u.name, u.email, COUNT(o.id) as order_count FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.status = 'active' GROUP BY u.id ORDER BY order_count DESC LIMIT 10`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">SQL Tools</h1>
        <p className="text-muted">
          Format, build, and generate SQL queries
        </p>
      </div>

      {/* SQL Formatter */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">SQL Formatter</h2>
              <p className="text-sm text-muted">Format and beautify SQL code</p>
            </div>
          </div>
          <Button onClick={loadExample} size="sm" variant="secondary">
            Load Example
          </Button>
        </div>

        <Textarea
          value={sqlInput}
          onChange={(e) => setSqlInput(e.target.value)}
          placeholder="Paste your SQL code here..."
          className="min-h-48 font-mono text-sm"
        />

        <div className="flex gap-2">
          <Button onClick={formatSql} className="flex-1">
            Format SQL
          </Button>
          <Button onClick={minifySql} className="flex-1" variant="secondary">
            Minify SQL
          </Button>
          <Button onClick={copySql} variant="secondary">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </Card>

      {/* Query Builder */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Play className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Query Builder</h2>
            <p className="text-sm text-muted">Generate common SQL queries</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Table Name</label>
              <Input
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="users"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Columns (comma-separated)</label>
              <Input
                value={columns}
                onChange={(e) => setColumns(e.target.value)}
                placeholder="id, name, email"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button onClick={generateSelect} variant="secondary">
              Generate SELECT
            </Button>
            <Button onClick={generateInsert} variant="secondary">
              Generate INSERT
            </Button>
            <Button onClick={generateUpdate} variant="secondary">
              Generate UPDATE
            </Button>
          </div>
        </div>
      </Card>

      {/* Mock Data Generator */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Table className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Mock Data Generator</h2>
            <p className="text-sm text-muted">Generate test data for your database</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Rows</label>
          <div className="flex gap-2 items-center">
            <input
              type="range"
              min="1"
              max="100"
              value={rowCount}
              onChange={(e) => setRowCount(Number(e.target.value))}
              className="flex-1"
            />
            <Input
              type="number"
              value={rowCount}
              onChange={(e) => setRowCount(Number(e.target.value))}
              className="w-20"
              min="1"
              max="100"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateMockData} className="flex-1">
            Generate Mock Data
          </Button>
          <Button onClick={copyMockData} variant="secondary">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>

        {mockData && (
          <Textarea
            value={mockData}
            readOnly
            className="min-h-64 font-mono text-sm bg-zinc-900"
          />
        )}
      </Card>

      {/* Common Patterns */}
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Common SQL Patterns</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { name: 'Find Duplicates', query: 'SELECT column, COUNT(*) FROM table GROUP BY column HAVING COUNT(*) > 1;' },
            { name: 'Delete Duplicates', query: 'DELETE t1 FROM table t1 INNER JOIN table t2 WHERE t1.id < t2.id AND t1.column = t2.column;' },
            { name: 'Rank Rows', query: 'SELECT *, ROW_NUMBER() OVER (ORDER BY column DESC) as rank FROM table;' },
            { name: 'Running Total', query: 'SELECT date, amount, SUM(amount) OVER (ORDER BY date) as running_total FROM table;' },
          ].map((pattern) => (
            <button
              key={pattern.name}
              onClick={() => {
                setSqlInput(pattern.query);
                toast.success(`${pattern.name} loaded`);
              }}
              className="p-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors text-left"
            >
              <div className="font-medium text-sm">{pattern.name}</div>
              <div className="text-xs text-muted font-mono mt-1 truncate">{pattern.query}</div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
