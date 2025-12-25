import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Database, RefreshCw, Users, Package, FileText, Shield } from 'lucide-react';

interface TableStats {
  name: string;
  rowCount: number;
  icon: React.ReactNode;
}

const DatabaseStats = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    profiles: 0,
    packages: 0,
    registrations: 0,
    rateLimits: 0,
    userRoles: 0,
  });

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [profilesRes, packagesRes, registrationsRes, rateLimitsRes, userRolesRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('packages').select('id', { count: 'exact', head: true }),
        supabase.from('registrations').select('id', { count: 'exact', head: true }),
        supabase.from('rate_limits').select('id', { count: 'exact', head: true }),
        supabase.from('user_roles').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        profiles: profilesRes.count || 0,
        packages: packagesRes.count || 0,
        registrations: registrationsRes.count || 0,
        rateLimits: rateLimitsRes.count || 0,
        userRoles: userRolesRes.count || 0,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'Gagal memuat statistik database.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const tableStats: TableStats[] = [
    { name: 'profiles', rowCount: stats.profiles, icon: <Users className="h-4 w-4" /> },
    { name: 'packages', rowCount: stats.packages, icon: <Package className="h-4 w-4" /> },
    { name: 'registrations', rowCount: stats.registrations, icon: <FileText className="h-4 w-4" /> },
    { name: 'rate_limits', rowCount: stats.rateLimits, icon: <Shield className="h-4 w-4" /> },
    { name: 'user_roles', rowCount: stats.userRoles, icon: <Shield className="h-4 w-4" /> },
  ];

  const totalRows = Object.values(stats).reduce((a, b) => a + b, 0);
  const maxRows = Math.max(...Object.values(stats), 1);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Tables</CardDescription>
            <CardTitle className="text-3xl">5</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Rows</CardDescription>
            <CardTitle className="text-3xl">{totalRows}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Storage Bucket</CardDescription>
            <CardTitle className="text-3xl">1</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Table Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Tables
              </CardTitle>
              <CardDescription>
                Statistik dan informasi tabel database.
              </CardDescription>
            </div>
            <Button variant="outline" onClick={fetchStats} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Name</TableHead>
                  <TableHead>Row Count</TableHead>
                  <TableHead>Distribution</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableStats.map((table) => (
                  <TableRow key={table.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {table.icon}
                        <span className="font-mono">{table.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{table.rowCount.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="w-48">
                      <Progress 
                        value={(table.rowCount / maxRows) * 100} 
                        className="h-2"
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                        Active
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Storage Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Storage Buckets
          </CardTitle>
          <CardDescription>
            Informasi penyimpanan file.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bucket Name</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <span className="font-mono">package-images</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Public</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                    Active
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseStats;
