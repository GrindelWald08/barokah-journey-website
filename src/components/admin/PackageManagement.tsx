import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Plus, Pencil, Trash2, RefreshCw, Percent, Users, DollarSign } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface PackageData {
  id: number;
  title: string;
  type: string;
  price: number;
  discount_price: number | null;
  duration: string;
  departure_date: string;
  quota: number;
  available_quota: number;
  hotel_makkah: string | null;
  hotel_makkah_stars: number | null;
  hotel_madinah: string | null;
  hotel_madinah_stars: number | null;
  highlights: string[] | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

const emptyPackage = {
  title: '',
  type: 'umroh',
  price: 0,
  discount_price: null as number | null,
  duration: '',
  departure_date: '',
  quota: 45,
  available_quota: 45,
  hotel_makkah: '',
  hotel_makkah_stars: 5,
  hotel_madinah: '',
  hotel_madinah_stars: 5,
  highlights: [] as string[],
  image_url: '',
  is_active: true,
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const PackageManagement = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(null);
  const [formData, setFormData] = useState(emptyPackage);
  const [highlightsText, setHighlightsText] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching packages:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat data paket.',
        variant: 'destructive',
      });
    } else {
      setPackages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openAddDialog = () => {
    setEditingPackage(null);
    setFormData(emptyPackage);
    setHighlightsText('');
    setDialogOpen(true);
  };

  const openEditDialog = (pkg: PackageData) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      type: pkg.type,
      price: pkg.price,
      discount_price: pkg.discount_price,
      duration: pkg.duration,
      departure_date: pkg.departure_date,
      quota: pkg.quota,
      available_quota: pkg.available_quota,
      hotel_makkah: pkg.hotel_makkah || '',
      hotel_makkah_stars: pkg.hotel_makkah_stars || 5,
      hotel_madinah: pkg.hotel_madinah || '',
      hotel_madinah_stars: pkg.hotel_madinah_stars || 5,
      highlights: pkg.highlights || [],
      image_url: pkg.image_url || '',
      is_active: pkg.is_active,
    });
    setHighlightsText((pkg.highlights || []).join('\n'));
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.price || !formData.duration || !formData.departure_date) {
      toast({
        title: 'Error',
        description: 'Mohon lengkapi semua field yang diperlukan.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    const highlights = highlightsText.split('\n').filter(h => h.trim() !== '');
    
    const packageData = {
      ...formData,
      highlights,
      discount_price: formData.discount_price || null,
      hotel_makkah: formData.hotel_makkah || null,
      hotel_madinah: formData.hotel_madinah || null,
      image_url: formData.image_url || null,
    };

    if (editingPackage) {
      const { error } = await supabase
        .from('packages')
        .update(packageData)
        .eq('id', editingPackage.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Gagal mengupdate paket.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Berhasil',
          description: 'Paket berhasil diupdate.',
        });
        setDialogOpen(false);
        fetchPackages();
      }
    } else {
      const { error } = await supabase
        .from('packages')
        .insert([packageData]);

      if (error) {
        toast({
          title: 'Error',
          description: 'Gagal menambah paket.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Berhasil',
          description: 'Paket berhasil ditambahkan.',
        });
        setDialogOpen(false);
        fetchPackages();
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus paket ini?')) return;

    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Gagal menghapus paket.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Berhasil',
        description: 'Paket berhasil dihapus.',
      });
      fetchPackages();
    }
  };

  const toggleActive = async (id: number, currentStatus: boolean) => {
    const { error } = await supabase
      .from('packages')
      .update({ is_active: !currentStatus })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Gagal mengubah status paket.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Berhasil',
        description: `Paket berhasil ${!currentStatus ? 'diaktifkan' : 'dinonaktifkan'}.`,
      });
      fetchPackages();
    }
  };

  const calculateDiscount = (price: number, discountPrice: number | null) => {
    if (!discountPrice) return null;
    const percentage = Math.round(((price - discountPrice) / price) * 100);
    return percentage;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Manajemen Paket Umroh
            </CardTitle>
            <CardDescription>Tambah, edit, dan kelola paket umroh</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchPackages} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="gold" onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Paket
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingPackage ? 'Edit Paket' : 'Tambah Paket Baru'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingPackage ? 'Edit informasi paket umroh.' : 'Isi informasi paket umroh baru.'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Nama Paket *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Paket Umroh Reguler"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipe</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tipe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="umroh">Umroh</SelectItem>
                          <SelectItem value="haji">Haji</SelectItem>
                          <SelectItem value="umroh-plus">Umroh Plus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Harga Normal (Rp) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        placeholder="28500000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discount_price">Harga Diskon (Rp)</Label>
                      <Input
                        id="discount_price"
                        type="number"
                        value={formData.discount_price || ''}
                        onChange={(e) => setFormData({ ...formData, discount_price: e.target.value ? Number(e.target.value) : null })}
                        placeholder="25000000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durasi *</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="9 Hari"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departure_date">Tanggal Keberangkatan *</Label>
                      <Input
                        id="departure_date"
                        value={formData.departure_date}
                        onChange={(e) => setFormData({ ...formData, departure_date: e.target.value })}
                        placeholder="15 Januari 2025"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quota">Kuota Total</Label>
                      <Input
                        id="quota"
                        type="number"
                        value={formData.quota}
                        onChange={(e) => setFormData({ ...formData, quota: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="available_quota">Kuota Tersedia</Label>
                      <Input
                        id="available_quota"
                        type="number"
                        value={formData.available_quota}
                        onChange={(e) => setFormData({ ...formData, available_quota: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hotel_makkah">Hotel Makkah</Label>
                      <Input
                        id="hotel_makkah"
                        value={formData.hotel_makkah}
                        onChange={(e) => setFormData({ ...formData, hotel_makkah: e.target.value })}
                        placeholder="Elaf Ajyad Hotel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel_makkah_stars">Bintang</Label>
                      <Select
                        value={String(formData.hotel_makkah_stars)}
                        onValueChange={(value) => setFormData({ ...formData, hotel_makkah_stars: Number(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[3, 4, 5].map(star => (
                            <SelectItem key={star} value={String(star)}>{star} Bintang</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hotel_madinah">Hotel Madinah</Label>
                      <Input
                        id="hotel_madinah"
                        value={formData.hotel_madinah}
                        onChange={(e) => setFormData({ ...formData, hotel_madinah: e.target.value })}
                        placeholder="Dallah Taibah Hotel"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hotel_madinah_stars">Bintang</Label>
                      <Select
                        value={String(formData.hotel_madinah_stars)}
                        onValueChange={(value) => setFormData({ ...formData, hotel_madinah_stars: Number(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[3, 4, 5].map(star => (
                            <SelectItem key={star} value={String(star)}>{star} Bintang</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="highlights">Highlights (satu per baris)</Label>
                    <Textarea
                      id="highlights"
                      value={highlightsText}
                      onChange={(e) => setHighlightsText(e.target.value)}
                      placeholder="Visa Umroh&#10;Tiket PP&#10;Hotel Bintang 5&#10;Makan 3x Sehari"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image_url">URL Gambar</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button variant="gold" onClick={handleSave} disabled={saving}>
                    {saving ? 'Menyimpan...' : 'Simpan'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada paket. Klik "Tambah Paket" untuk memulai.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Paket</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Diskon</TableHead>
                  <TableHead>Kuota</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {pkg.title}
                    </TableCell>
                    <TableCell className="capitalize">{pkg.type}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        {pkg.discount_price ? (
                          <>
                            <span className="text-muted-foreground line-through text-sm">
                              {formatPrice(pkg.price)}
                            </span>
                            <span className="text-green-600 font-semibold">
                              {formatPrice(pkg.discount_price)}
                            </span>
                          </>
                        ) : (
                          <span>{formatPrice(pkg.price)}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {pkg.discount_price ? (
                        <Badge variant="secondary" className="bg-red-100 text-red-700">
                          <Percent className="h-3 w-3 mr-1" />
                          {calculateDiscount(pkg.price, pkg.discount_price)}%
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{pkg.available_quota}/{pkg.quota}</span>
                      </div>
                    </TableCell>
                    <TableCell>{pkg.departure_date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={pkg.is_active ? 'default' : 'secondary'}
                        className={pkg.is_active ? 'bg-green-500' : 'bg-gray-400'}
                      >
                        {pkg.is_active ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(pkg)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActive(pkg.id, pkg.is_active)}
                        >
                          {pkg.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(pkg.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
  );
};

export default PackageManagement;
