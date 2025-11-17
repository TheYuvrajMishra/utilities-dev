'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, Clock, Calendar, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function TimeToolsPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timestamp, setTimestamp] = useState(Date.now());
  const [dateString, setDateString] = useState('');
  const [cronExpression, setCronExpression] = useState('0 0 * * *');
  const [cronDescription, setCronDescription] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertTimestampToDate = () => {
    const date = new Date(timestamp);
    setDateString(date.toString());
  };

  const convertDateToTimestamp = () => {
    const date = new Date(dateString);
    setTimestamp(date.getTime());
  };

  const getCurrentTimestamp = () => {
    const now = Date.now();
    setTimestamp(now);
    toast.success('Current timestamp copied!');
  };

  const describeCron = () => {
    // Simple cron description (basic implementation)
    const parts = cronExpression.split(' ');
    if (parts.length < 5) {
      setCronDescription('Invalid cron expression');
      return;
    }

    const [minute, hour, day, month, weekday] = parts;
    let description = 'Run ';

    if (minute === '*' && hour === '*' && day === '*' && month === '*' && weekday === '*') {
      description += 'every minute';
    } else if (hour === '*' && day === '*' && month === '*' && weekday === '*') {
      description += `at minute ${minute} of every hour`;
    } else if (day === '*' && month === '*' && weekday === '*') {
      description += `at ${hour}:${minute.padStart(2, '0')} every day`;
    } else if (month === '*' && weekday === '*') {
      description += `at ${hour}:${minute.padStart(2, '0')} on day ${day} of every month`;
    } else {
      description += cronExpression;
    }

    setCronDescription(description);
  };

  useEffect(() => {
    describeCron();
  }, [cronExpression]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.toString());
    toast.success('Copied to clipboard!');
  };

  const timezones = [
    { name: 'UTC', offset: 0 },
    { name: 'EST (New York)', offset: -5 },
    { name: 'PST (Los Angeles)', offset: -8 },
    { name: 'GMT (London)', offset: 0 },
    { name: 'CET (Paris)', offset: 1 },
    { name: 'IST (India)', offset: 5.5 },
    { name: 'JST (Tokyo)', offset: 9 },
    { name: 'AEST (Sydney)', offset: 10 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Time & Date Tools</h1>
        <p className="text-muted">
          Work with timestamps, dates, timezones, and cron expressions
        </p>
      </div>

      {/* Current Time Display */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Current Time</h2>
            <p className="text-sm text-muted">Live time display</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 bg-zinc-900">
            <div className="text-sm text-muted mb-1">Local Time</div>
            <div className="text-3xl font-bold font-mono">{currentTime.toLocaleTimeString()}</div>
            <div className="text-sm text-muted mt-2">{currentTime.toLocaleDateString()}</div>
          </Card>
          <Card className="p-4 bg-zinc-900">
            <div className="text-sm text-muted mb-1">Unix Timestamp</div>
            <div className="text-3xl font-bold font-mono">{Math.floor(currentTime.getTime() / 1000)}</div>
            <Button onClick={() => copyToClipboard(Math.floor(currentTime.getTime() / 1000).toString())} variant="secondary" size="sm" className="mt-2">
              <Copy className="w-3 h-3 mr-2" />
              Copy
            </Button>
          </Card>
        </div>
      </Card>

      {/* Timestamp Converter */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Timestamp Converter</h2>
            <p className="text-sm text-muted">Convert between timestamp and date</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Unix Timestamp (milliseconds)</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={timestamp}
                  onChange={(e) => setTimestamp(Number(e.target.value))}
                  className="flex-1 font-mono"
                />
                <Button onClick={getCurrentTimestamp} variant="secondary">
                  Now
                </Button>
              </div>
            </div>
            <Button onClick={convertTimestampToDate} className="w-full">
              Convert to Date →
            </Button>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date String</label>
              <Input
                type="datetime-local"
                value={dateString}
                onChange={(e) => setDateString(e.target.value)}
                className="font-mono"
              />
            </div>
            <Button onClick={convertDateToTimestamp} variant="secondary" className="w-full">
              Convert to Timestamp →
            </Button>
          </div>
        </div>

        {dateString && (
          <div className="p-4 bg-zinc-900 rounded-lg">
            <div className="text-sm text-muted mb-1">Result</div>
            <div className="font-mono text-sm">{dateString}</div>
          </div>
        )}
      </Card>

      {/* World Clock */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">World Clock</h2>
            <p className="text-sm text-muted">View time across different timezones</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {timezones.map((tz) => {
            const time = new Date(currentTime.getTime() + tz.offset * 3600000);
            return (
              <Card key={tz.name} className="p-3 bg-zinc-900">
                <div className="text-xs text-muted mb-1">{tz.name}</div>
                <div className="text-lg font-bold font-mono">{time.getUTCHours().toString().padStart(2, '0')}:{time.getUTCMinutes().toString().padStart(2, '0')}</div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* Cron Expression Generator */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Cron Expression Helper</h2>
            <p className="text-sm text-muted">Create and understand cron expressions</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cron Expression</label>
            <Input
              value={cronExpression}
              onChange={(e) => setCronExpression(e.target.value)}
              placeholder="* * * * *"
              className="font-mono"
            />
            <div className="text-xs text-muted">Format: minute hour day month weekday</div>
          </div>

          {cronDescription && (
            <div className="p-4 bg-zinc-900 rounded-lg">
              <div className="text-sm text-muted mb-1">Description</div>
              <div className="font-medium">{cronDescription}</div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => setCronExpression('* * * * *')} variant="secondary" size="sm">
              Every Minute
            </Button>
            <Button onClick={() => setCronExpression('0 * * * *')} variant="secondary" size="sm">
              Every Hour
            </Button>
            <Button onClick={() => setCronExpression('0 0 * * *')} variant="secondary" size="sm">
              Daily at Midnight
            </Button>
            <Button onClick={() => setCronExpression('0 0 * * 0')} variant="secondary" size="sm">
              Weekly (Sunday)
            </Button>
            <Button onClick={() => setCronExpression('0 0 1 * *')} variant="secondary" size="sm">
              Monthly (1st)
            </Button>
            <Button onClick={() => setCronExpression('0 9 * * 1-5')} variant="secondary" size="sm">
              Weekdays 9 AM
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
