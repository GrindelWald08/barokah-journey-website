import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, RefreshCw, Search, Clock, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  source: string;
  message: string;
}

const SystemLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Simulate fetching logs - in a real app, this would call an edge function
  const fetchLogs = async () => {
    setLoading(true);
    // Simulated log data - in production, this would fetch from an API
    const simulatedLogs: LogEntry[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        level: 'info',
        source: 'auth',
        message: 'User login successful',
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 60000).toISOString(),
        level: 'info',
        source: 'rate-limit',
        message: 'Rate limit check passed for IP 103.166.90.78',
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        level: 'warn',
        source: 'rate-limit',
        message: 'Rate limit approaching threshold for login action',
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 180000).toISOString(),
        level: 'error',
        source: 'database',
        message: 'Connection timeout - retrying...',
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 240000).toISOString(),
        level: 'info',
        source: 'edge-function',
        message: 'check-rate-limit function booted successfully',
      },
      {
        id: '6',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        level: 'debug',
        source: 'cache',
        message: 'Cache hit for package data',
      },
    ];
    
    setTimeout(() => {
      setLogs(simulatedLogs);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchLogs, 10000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warn':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getLevelBadge = (level: string) => {
    const colors: Record<string, string> = {
      error: 'bg-destructive text-destructive-foreground',
      warn: 'bg-yellow-500 text-white',
      info: 'bg-blue-500 text-white',
      debug: 'bg-gray-500 text-white',
    };
    return (
      <Badge className={colors[level] || 'bg-gray-500 text-white'}>
        {level.toUpperCase()}
      </Badge>
    );
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const stats = {
    total: logs.length,
    errors: logs.filter(l => l.level === 'error').length,
    warnings: logs.filter(l => l.level === 'warn').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Logs</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Errors</CardDescription>
            <CardTitle className="text-3xl text-destructive">{stats.errors}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Warnings</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.warnings}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Logs Viewer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            System Logs
          </CardTitle>
          <CardDescription>
            Monitor sistem logs untuk debugging dan monitoring aplikasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warn">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="debug">Debug</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={autoRefresh ? 'default' : 'outline'}
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              <Clock className="h-4 w-4 mr-2" />
              {autoRefresh ? 'Auto ON' : 'Auto OFF'}
            </Button>
            <Button variant="outline" onClick={fetchLogs} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          <ScrollArea className="h-[400px] rounded-md border">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                <FileText className="h-12 w-12 mb-4 opacity-50" />
                <p>Tidak ada logs ditemukan.</p>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    {getLevelIcon(log.level)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getLevelBadge(log.level)}
                        <Badge variant="outline">{log.source}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <p className="text-sm font-mono break-all">{log.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemLogs;
