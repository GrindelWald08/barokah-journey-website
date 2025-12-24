import { ReactNode, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { Loader2, ShieldX, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: 'Akses Ditolak',
        description: 'Silakan login terlebih dahulu.',
        variant: 'destructive',
      });
      navigate('/auth', { replace: true });
    }
  }, [user, authLoading, navigate]);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-muted-foreground">Memverifikasi akses...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldX className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
            403
          </h1>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
            Akses Ditolak
          </h2>
          <p className="text-muted-foreground mb-8">
            Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. 
            Halaman ini hanya dapat diakses oleh administrator.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="outline">
              <Link to="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ke Dashboard
              </Link>
            </Button>
            <Button asChild variant="gold">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Ke Beranda
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
