import { Code, ShieldAlert, Database, FileText, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RateLimitManagement from '@/components/admin/RateLimitManagement';
import SystemLogs from '@/components/programmer/SystemLogs';
import DatabaseStats from '@/components/programmer/DatabaseStats';
import SystemConfig from '@/components/programmer/SystemConfig';

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

        <Tabs defaultValue="rate-limits" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="rate-limits" className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span className="hidden sm:inline">Rate Limits</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">System Logs</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Database</span>
            </TabsTrigger>
            <TabsTrigger value="config" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rate-limits">
            <RateLimitManagement />
          </TabsContent>

          <TabsContent value="logs">
            <SystemLogs />
          </TabsContent>

          <TabsContent value="database">
            <DatabaseStats />
          </TabsContent>

          <TabsContent value="config">
            <SystemConfig />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ProgrammerDashboard;
