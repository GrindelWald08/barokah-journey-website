import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, Loader2, LogIn, MessageCircle } from 'lucide-react';

// Nomor WhatsApp admin (ganti dengan nomor yang benar)
const ADMIN_WHATSAPP = '6287782408192';

const registrationSchema = z.object({
  fullName: z.string()
    .min(3, 'Nama lengkap minimal 3 karakter')
    .max(100, 'Nama lengkap maksimal 100 karakter')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Nama hanya boleh berisi huruf'),
  email: z.string()
    .email('Format email tidak valid')
    .max(255, 'Email maksimal 255 karakter'),
  phone: z.string()
    .min(10, 'Nomor telepon minimal 10 digit')
    .max(15, 'Nomor telepon maksimal 15 digit')
    .regex(/^[0-9+\-\s]+$/, 'Format nomor telepon tidak valid'),
  nik: z.string()
    .length(16, 'NIK harus 16 digit')
    .regex(/^[0-9]+$/, 'NIK hanya boleh berisi angka'),
  birthPlace: z.string()
    .min(2, 'Tempat lahir minimal 2 karakter')
    .max(50, 'Tempat lahir maksimal 50 karakter'),
  birthDate: z.string()
    .min(1, 'Tanggal lahir wajib diisi'),
  gender: z.enum(['male', 'female'], {
    required_error: 'Pilih jenis kelamin',
  }),
  address: z.string()
    .min(10, 'Alamat minimal 10 karakter')
    .max(300, 'Alamat maksimal 300 karakter'),
  passportNumber: z.string()
    .optional()
    .refine(val => !val || (val.length >= 6 && val.length <= 20), {
      message: 'Nomor paspor harus 6-20 karakter'
    }),
  emergencyContact: z.string()
    .min(3, 'Nama kontak darurat minimal 3 karakter')
    .max(100, 'Nama kontak darurat maksimal 100 karakter'),
  emergencyPhone: z.string()
    .min(10, 'Nomor darurat minimal 10 digit')
    .max(15, 'Nomor darurat maksimal 15 digit')
    .regex(/^[0-9+\-\s]+$/, 'Format nomor telepon tidak valid'),
  roomType: z.enum(['quad', 'triple', 'double'], {
    required_error: 'Pilih tipe kamar',
  }),
  notes: z.string().max(500, 'Catatan maksimal 500 karakter').optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  packageId: number;
  packageTitle: string;
}

const RegistrationForm = ({ packageId, packageTitle }: RegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      email: user?.email || '',
      phone: '',
      nik: '',
      birthPlace: '',
      birthDate: '',
      address: '',
      passportNumber: '',
      emergencyContact: '',
      emergencyPhone: '',
      notes: '',
    },
  });

  const openWhatsAppWithMessage = (data: RegistrationFormData) => {
    const roomTypeLabel = {
      quad: 'Quad (4 orang)',
      triple: 'Triple (3 orang)',
      double: 'Double (2 orang)',
    }[data.roomType];

    const genderLabel = data.gender === 'male' ? 'Laki-laki' : 'Perempuan';

    const message = `Assalamualaikum, saya ingin konfirmasi pendaftaran:

*PAKET:* ${packageTitle}

*DATA JAMAAH:*
- Nama: ${data.fullName}
- NIK: ${data.nik}
- Tempat/Tgl Lahir: ${data.birthPlace}, ${data.birthDate}
- Jenis Kelamin: ${genderLabel}
- No. HP: ${data.phone}
- Email: ${data.email}
- Alamat: ${data.address}
${data.passportNumber ? `- No. Paspor: ${data.passportNumber}` : ''}

*KONTAK DARURAT:*
- Nama: ${data.emergencyContact}
- No. HP: ${data.emergencyPhone}

*TIPE KAMAR:* ${roomTypeLabel}
${data.notes ? `\n*CATATAN:* ${data.notes}` : ''}

Mohon informasi selanjutnya untuk proses pembayaran. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const onSubmit = async (data: RegistrationFormData) => {
    if (!user) {
      toast({
        title: 'Login Diperlukan',
        description: 'Silakan login terlebih dahulu untuk mendaftar.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase.from('registrations').insert({
      user_id: user.id,
      package_id: packageId,
      package_name: packageTitle,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      nik: data.nik,
      birth_place: data.birthPlace,
      birth_date: data.birthDate,
      gender: data.gender,
      address: data.address,
      passport_number: data.passportNumber || null,
      emergency_contact: data.emergencyContact,
      emergency_phone: data.emergencyPhone,
      room_type: data.roomType,
      notes: data.notes || null,
    });

    setIsSubmitting(false);

    if (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Pendaftaran Gagal',
        description: 'Terjadi kesalahan. Silakan coba lagi.',
        variant: 'destructive',
      });
      return;
    }
    
    // Buka WhatsApp dengan pesan pre-filled
    openWhatsAppWithMessage(data);
    
    setIsSuccess(true);
    toast({
      title: 'Pendaftaran Berhasil!',
      description: 'WhatsApp terbuka untuk konfirmasi dengan admin.',
    });
  };

  // Show login prompt if not authenticated
  if (!user) {
    return (
      <div className="text-center py-12 px-6 bg-secondary/50 rounded-2xl">
        <LogIn className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          Login Diperlukan
        </h3>
        <p className="text-muted-foreground mb-6">
          Silakan login atau buat akun terlebih dahulu untuk mendaftar paket <strong>{packageTitle}</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="gold">
            <Link to="/auth">Login / Daftar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-6 bg-primary/5 rounded-2xl">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
          Pendaftaran Berhasil!
        </h3>
        <p className="text-muted-foreground mb-6">
          Terima kasih telah mendaftar paket <strong>{packageTitle}</strong>.<br />
          Tim kami akan menghubungi Anda dalam 1x24 jam untuk konfirmasi.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => {
              const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}`;
              window.open(whatsappUrl, '_blank');
            }} 
            variant="gold"
            className="gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Hubungi Admin via WhatsApp
          </Button>
          <Button onClick={() => navigate('/dashboard')} variant="outline">
            Lihat Status Booking
          </Button>
          <Button onClick={() => setIsSuccess(false)} variant="ghost">
            Daftar Lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4 md:col-span-2">
            <h4 className="font-heading font-semibold text-foreground border-b border-border pb-2">
              Data Pribadi
            </h4>
          </div>

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap (Sesuai KTP) *</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nik"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIK (16 Digit) *</FormLabel>
                <FormControl>
                  <Input placeholder="3201234567890123" maxLength={16} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthPlace"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tempat Lahir *</FormLabel>
                <FormControl>
                  <Input placeholder="Jakarta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Lahir *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Kelamin *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Laki-laki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor WhatsApp *</FormLabel>
                <FormControl>
                  <Input placeholder="08123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@contoh.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Alamat Lengkap *</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan, Kota, Provinsi" 
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Passport Information */}
          <div className="space-y-4 md:col-span-2 pt-4">
            <h4 className="font-heading font-semibold text-foreground border-b border-border pb-2">
              Data Paspor (Opsional)
            </h4>
            <p className="text-sm text-muted-foreground">
              Jika belum memiliki paspor, data ini bisa dilengkapi nanti
            </p>
          </div>

          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Nomor Paspor</FormLabel>
                <FormControl>
                  <Input placeholder="A1234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Emergency Contact */}
          <div className="space-y-4 md:col-span-2 pt-4">
            <h4 className="font-heading font-semibold text-foreground border-b border-border pb-2">
              Kontak Darurat
            </h4>
          </div>

          <FormField
            control={form.control}
            name="emergencyContact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Kontak Darurat *</FormLabel>
                <FormControl>
                  <Input placeholder="Nama keluarga/kerabat" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emergencyPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon Darurat *</FormLabel>
                <FormControl>
                  <Input placeholder="08123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Room Type */}
          <div className="space-y-4 md:col-span-2 pt-4">
            <h4 className="font-heading font-semibold text-foreground border-b border-border pb-2">
              Preferensi Kamar
            </h4>
          </div>

          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Tipe Kamar *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe kamar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="quad">Quad (4 orang/kamar) - Standar</SelectItem>
                    <SelectItem value="triple">Triple (3 orang/kamar) - +Rp 2.000.000</SelectItem>
                    <SelectItem value="double">Double (2 orang/kamar) - +Rp 5.000.000</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Catatan Tambahan</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Informasi tambahan (kondisi kesehatan, kebutuhan khusus, dll)" 
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-secondary/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Dengan mengisi formulir ini, Anda menyetujui bahwa data yang diberikan adalah benar 
            dan bersedia dihubungi oleh tim Barokah Tour & Travel untuk proses pendaftaran lebih lanjut.
          </p>
        </div>

        <Button 
          type="submit" 
          variant="gold" 
          size="lg" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Memproses Pendaftaran...
            </>
          ) : (
            'Kirim Pendaftaran'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;
