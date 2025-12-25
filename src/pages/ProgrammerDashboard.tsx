import { Code } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RateLimitManagement from '@/components/admin/RateLimitManagement';

const ProgrammerDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Code className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Programmer Dashboard</h1>
            <p className="text-muted-foreground">Kelola pengaturan teknis sistem</p>
          </div>
        </div>

        <RateLimitManagement />
      </main>

      <Footer />
    </div>
  );
};

export default ProgrammerDashboard;
