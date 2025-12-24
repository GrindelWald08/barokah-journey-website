import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Shield, Search, RefreshCw, Trash2, Clock, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface RateLimit {
  id: string;
  identifier: string;
  action_type: string;
  attempt_count: number;
  window_start: string;
  created_at: string;
  updated_at: string;
}

const RateLimitManagement = () => {
  const { toast } = useToast();
  const [rateLimits, setRateLimits] = useState<RateLimit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRateLimits = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('rate_limits')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Gagal memuat data rate limit.',
        variant: 'destructive',
      });
    } else {
      setRateLimits(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRateLimits();
  }, []);

  const deleteRateLimit = async (id: string) => {
    const { error } = await supabase
      .from('rate_limits')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Gagal menghapus rate limit.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Berhasil',
        description: 'Rate limit berhasil dihapus. IP dapat mencoba lagi.',
      });
      fetchRateLimits();
    }
  };

  const clearAllRateLimits = async () => {
    const { error } = await supabase
      .from('rate_limits')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
      toast({
        title: 'Error',
        description: 'Gagal menghapus semua rate limit.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Berhasil',
        description: 'Semua rate limit berhasil dihapus.',
      });
      fetchRateLimits();
    }
  };

  const resetRateLimit = async (id: string) => {
    const { error } = await supabase
      .from('rate_limits')
      .update({ attempt_count: 0, window_start: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Gagal mereset rate limit.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Berhasil',
        description: 'Rate limit berhasil direset.',
      });
      fetchRateLimits();
    }
  };

  const getActionTypeBadge = (actionType: string) => {
    const colors: Record<string, string> = {
      login: 'bg-blue-500',
      registration: 'bg-green-500',
      password_reset: 'bg-purple-500',
    };
    return (
      <Badge className={`${colors[actionType] || 'bg-gray-500'} text-white`}>
        {actionType}
      </Badge>
    );
  };

  const isBlocked = (limit: RateLimit) => {
    const windowStart = new Date(limit.window_start);
    const windowEnd = new Date(windowStart.getTime() + 15 * 60 * 1000); // 15 minutes
    return limit.attempt_count >= 5 && new Date() < windowEnd;
  };

  const getTimeRemaining = (windowStart: string) => {
    const start = new Date(windowStart);
    const end = new Date(start.getTime() + 15 * 60 * 1000);
    const now = new Date();
    const remaining = end.getTime() - now.getTime();
    
    if (remaining <= 0) return 'Expired';
    
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const filteredRateLimits = rateLimits.filter(limit => 
    limit.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    limit.action_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: rateLimits.length,
    blocked: rateLimits.filter(isBlocked).length,
    loginAttempts: rateLimits.filter(r => r.action_type === 'login').length,
    registrationAttempts: rateLimits.filter(r => r.action_type === 'registration').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Records</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Currently Blocked</CardDescription>
            <CardTitle className="text-3xl text-red-600">{stats.blocked}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Login Attempts</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{stats.loginAttempts}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Registration Attempts</CardDescription>
            <CardTitle className="text-3xl text-green-600">{stats.registrationAttempts}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Rate Limits Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Rate Limit Records
          </CardTitle>
          <CardDescription>
            Kelola pembatasan percobaan login dan registrasi. IP yang terblokir akan otomatis terbuka setelah 15 menit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari IP address atau action type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={fetchRateLimits} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={rateLimits.length === 0}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Hapus Semua Rate Limit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini akan menghapus semua record rate limit dan membuka blokir semua IP yang terblokir.
                    Tindakan ini tidak dapat dibatalkan.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction onClick={clearAllRateLimits}>
                    Hapus Semua
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : filteredRateLimits.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Tidak ada rate limit records.</p>
              <p className="text-sm">Records akan muncul saat ada percobaan login/registrasi.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Action Type</TableHead>
                    <TableHead>Attempts</TableHead>
                    <TableHead>Time Remaining</TableHead>
                    <TableHead>Last Attempt</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRateLimits.map((limit) => (
                    <TableRow key={limit.id} className={isBlocked(limit) ? 'bg-red-50 dark:bg-red-950/20' : ''}>
                      <TableCell>
                        {isBlocked(limit) ? (
                          <Badge variant="destructive" className="flex items-center gap-1 w-fit">
                            <AlertTriangle className="h-3 w-3" />
                            Blocked
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Active</Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-sm">{limit.identifier}</TableCell>
                      <TableCell>{getActionTypeBadge(limit.action_type)}</TableCell>
                      <TableCell>
                        <span className={limit.attempt_count >= 5 ? 'text-red-600 font-bold' : ''}>
                          {limit.attempt_count}/5
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {getTimeRemaining(limit.window_start)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(limit.updated_at).toLocaleString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => resetRateLimit(limit.id)}
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Reset
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Rate Limit?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Menghapus rate limit untuk IP {limit.identifier} akan mengizinkan mereka untuk mencoba lagi.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteRateLimit(limit.id)}>
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RateLimitManagement;
