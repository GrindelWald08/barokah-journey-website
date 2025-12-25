import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Settings, Shield, Clock, Globe, Bell, Save } from 'lucide-react';

const SystemConfig = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // Configuration state
  const [config, setConfig] = useState({
    // Rate Limiting
    rateLimitMaxAttempts: 5,
    rateLimitWindowMinutes: 15,
    rateLimitEnabled: true,
    
    // Authentication
    autoConfirmEmail: true,
    allowGoogleAuth: true,
    sessionTimeoutHours: 24,
    
    // Notifications
    emailNotifications: true,
    adminAlerts: true,
    
    // General
    maintenanceMode: false,
    debugMode: false,
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate saving - in production, this would save to a config table or edge function
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: 'Konfigurasi Tersimpan',
      description: 'Pengaturan sistem berhasil diperbarui.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Status Sistem</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Badge className={config.maintenanceMode ? 'bg-yellow-500' : 'bg-green-500'}>
                {config.maintenanceMode ? 'Maintenance' : 'Online'}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rate Limiting</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Badge className={config.rateLimitEnabled ? 'bg-green-500' : 'bg-gray-500'}>
                {config.rateLimitEnabled ? 'Active' : 'Disabled'}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Debug Mode</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Badge className={config.debugMode ? 'bg-orange-500' : 'bg-gray-500'}>
                {config.debugMode ? 'ON' : 'OFF'}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Session Timeout</CardDescription>
            <CardTitle className="text-2xl">{config.sessionTimeoutHours}h</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Rate Limiting Config */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Rate Limiting Configuration
          </CardTitle>
          <CardDescription>
            Konfigurasi pembatasan percobaan login dan registrasi.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Rate Limiting</Label>
              <p className="text-sm text-muted-foreground">
                Aktifkan pembatasan percobaan untuk mencegah brute force.
              </p>
            </div>
            <Switch
              checked={config.rateLimitEnabled}
              onCheckedChange={(checked) => setConfig({ ...config, rateLimitEnabled: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxAttempts">Max Attempts</Label>
              <Input
                id="maxAttempts"
                type="number"
                value={config.rateLimitMaxAttempts}
                onChange={(e) => setConfig({ ...config, rateLimitMaxAttempts: parseInt(e.target.value) || 5 })}
                min={1}
                max={20}
              />
              <p className="text-xs text-muted-foreground">
                Jumlah maksimal percobaan sebelum diblokir.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="windowMinutes">Window (Minutes)</Label>
              <Input
                id="windowMinutes"
                type="number"
                value={config.rateLimitWindowMinutes}
                onChange={(e) => setConfig({ ...config, rateLimitWindowMinutes: parseInt(e.target.value) || 15 })}
                min={1}
                max={60}
              />
              <p className="text-xs text-muted-foreground">
                Durasi blokir dalam menit.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Config */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Authentication Settings
          </CardTitle>
          <CardDescription>
            Pengaturan autentikasi pengguna.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Confirm Email</Label>
              <p className="text-sm text-muted-foreground">
                Otomatis konfirmasi email saat registrasi.
              </p>
            </div>
            <Switch
              checked={config.autoConfirmEmail}
              onCheckedChange={(checked) => setConfig({ ...config, autoConfirmEmail: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Google OAuth</Label>
              <p className="text-sm text-muted-foreground">
                Izinkan login dengan akun Google.
              </p>
            </div>
            <Switch
              checked={config.allowGoogleAuth}
              onCheckedChange={(checked) => setConfig({ ...config, allowGoogleAuth: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="sessionTimeout" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Session Timeout (Hours)
            </Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={config.sessionTimeoutHours}
              onChange={(e) => setConfig({ ...config, sessionTimeoutHours: parseInt(e.target.value) || 24 })}
              min={1}
              max={168}
              className="max-w-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications Config */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Pengaturan notifikasi sistem.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Kirim notifikasi email untuk pendaftaran baru.
              </p>
            </div>
            <Switch
              checked={config.emailNotifications}
              onCheckedChange={(checked) => setConfig({ ...config, emailNotifications: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Admin Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Kirim alert ke admin untuk kejadian penting.
              </p>
            </div>
            <Switch
              checked={config.adminAlerts}
              onCheckedChange={(checked) => setConfig({ ...config, adminAlerts: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* System Config */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Settings
          </CardTitle>
          <CardDescription>
            Pengaturan sistem umum.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-yellow-600">Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Aktifkan mode maintenance untuk menonaktifkan akses pengguna.
              </p>
            </div>
            <Switch
              checked={config.maintenanceMode}
              onCheckedChange={(checked) => setConfig({ ...config, maintenanceMode: checked })}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-orange-600">Debug Mode</Label>
              <p className="text-sm text-muted-foreground">
                Aktifkan log debug tambahan (hanya untuk development).
              </p>
            </div>
            <Switch
              checked={config.debugMode}
              onCheckedChange={(checked) => setConfig({ ...config, debugMode: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="min-w-32">
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Simpan Konfigurasi
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SystemConfig;
