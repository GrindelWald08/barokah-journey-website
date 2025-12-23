import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Package, Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';

interface Registration {
  id: string;
  package_name: string;
  package_id: number;
  full_name: string;
  room_type: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
      } else {
        setRegistrations(data || []);
      }
      setLoading(false);
    };

    if (user) {
      fetchRegistrations();
    }
  }, [user]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline', label: string }> = {
      pending: { variant: 'secondary', label: 'Menunggu Konfirmasi' },
      confirmed: { variant: 'default', label: 'Terkonfirmasi' },
      paid: { variant: 'default', label: 'Lunas' },
      cancelled: { variant: 'destructive', label: 'Dibatalkan' },
    };
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getRoomTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      quad: 'Quad (4 orang)',
      triple: 'Triple (3 orang)',
      double: 'Double (2 orang)',
    };
    return labels[type] || type;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-muted-foreground hover:text-primary mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
              Status Booking Anda
            </h1>
            <p className="text-muted-foreground">
              Pantau status pendaftaran paket Umrah/Haji Anda
            </p>
          </div>

          {registrations.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Belum Ada Pendaftaran
                </h3>
                <p className="text-muted-foreground mb-6">
                  Anda belum mendaftar paket apapun. Mulai perjalanan ibadah Anda sekarang!
                </p>
                <Button asChild variant="gold">
                  <Link to="/#paket">Lihat Paket Tersedia</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {registrations.map((reg) => (
                <Card key={reg.id} className="overflow-hidden">
                  <CardHeader className="bg-secondary/30">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="font-heading text-xl text-foreground">
                          {reg.package_name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Pendaftar: {reg.full_name}
                        </p>
                      </div>
                      {getStatusBadge(reg.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Tanggal Daftar</p>
                          <p className="font-medium text-foreground">
                            {new Date(reg.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Tipe Kamar</p>
                          <p className="font-medium text-foreground">
                            {getRoomTypeLabel(reg.room_type)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">ID Booking</p>
                          <p className="font-medium text-foreground font-mono text-sm">
                            {reg.id.slice(0, 8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/paket/${reg.package_id}`}>Lihat Detail Paket</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
