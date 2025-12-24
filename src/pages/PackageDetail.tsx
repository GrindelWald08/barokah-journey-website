import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatPrice } from '@/data/packages';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';
import RegistrationForm from '@/components/RegistrationForm';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Star, 
  Users, 
  Clock, 
  ChevronLeft,
  CheckCircle,
  Utensils,
  Building,
  Plane,
  Loader2
} from 'lucide-react';

interface DatabasePackage {
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
}

const PackageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<DatabasePackage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('id', Number(id))
        .maybeSingle();

      if (!error && data) {
        setPkg(data);
      }
      setLoading(false);
    };

    fetchPackage();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
            Paket Tidak Ditemukan
          </h1>
          <p className="text-muted-foreground mb-6">
            Maaf, paket yang Anda cari tidak tersedia.
          </p>
          <Link to="/#paket">
            <Button variant="default">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali ke Daftar Paket
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const hotelStars = pkg.hotel_makkah_stars || 5;
  const displayPrice = pkg.discount_price || pkg.price;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pkg.image_url || '/placeholder.svg'})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
          <div>
            <Link 
              to="/#paket" 
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Kembali ke Daftar Paket
            </Link>
            
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                pkg.type === 'haji' ? 'bg-gold text-accent-foreground' : 'bg-primary text-primary-foreground'
              }`}>
                {pkg.type === 'haji' ? 'HAJI' : 'UMRAH'}
              </span>
              {pkg.discount_price && (
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-gold/20 text-gold border border-gold">
                  DISKON
                </span>
              )}
            </div>
            
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              {pkg.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-primary-foreground/90">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {pkg.departure_date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {pkg.duration}
              </span>
              <span className="flex items-center gap-1">
                {[...Array(hotelStars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </span>
              <span className="flex items-center gap-2 bg-card/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <Users className="w-4 h-4" />
                Sisa {pkg.available_quota} kursi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                  Tentang Paket Ini
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Paket perjalanan ibadah {pkg.type === 'haji' ? 'Haji' : 'Umrah'} dengan durasi {pkg.duration}. 
                  Berangkat pada tanggal {pkg.departure_date} dengan akomodasi hotel bintang {hotelStars}.
                </p>
                
                {pkg.highlights && pkg.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {pkg.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hotels */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Akomodasi Hotel
                </h2>
                
                <div className="grid gap-4">
                  {pkg.hotel_makkah && (
                    <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Building className="w-5 h-5 text-primary" />
                            <h3 className="font-heading font-bold text-foreground">
                              {pkg.hotel_makkah}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(pkg.hotel_makkah_stars || 5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                            ))}
                          </div>
                        </div>
                        <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                          Makkah
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {pkg.hotel_madinah && (
                    <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Building className="w-5 h-5 text-primary" />
                            <h3 className="font-heading font-bold text-foreground">
                              {pkg.hotel_madinah}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(pkg.hotel_madinah_stars || 5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                            ))}
                          </div>
                        </div>
                        <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                          Madinah
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Includes */}
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Termasuk dalam Paket
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Tiket pesawat pulang-pergi
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Akomodasi hotel bintang {hotelStars}
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Makan 3x sehari (menu Indonesia/Internasional)
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Transportasi bus AC selama di tanah suci
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Pembimbing ibadah berpengalaman
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Perlengkapan umrah/haji
                  </li>
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Asuransi perjalanan
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Price Card */}
                <div className="bg-card rounded-2xl p-6 shadow-card border-2 border-primary/20">
                  <div className="text-center mb-6">
                    <span className="text-sm text-muted-foreground">Mulai dari</span>
                    <div className="flex items-end justify-center gap-2">
                      <span className="font-heading text-3xl md:text-4xl font-bold text-primary">
                        {formatPrice(displayPrice)}
                      </span>
                    </div>
                    {pkg.discount_price && (
                      <span className="text-muted-foreground line-through text-sm">
                        {formatPrice(pkg.price)}
                      </span>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">per orang</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <Plane className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Tiket pesawat PP</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Building className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Hotel {hotelStars} bintang</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Utensils className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Makan 3x sehari</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-foreground">Pembimbing berpengalaman</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="whatsapp" 
                    size="lg" 
                    className="w-full mb-3"
                    onClick={() => {
                      const message = encodeURIComponent(
                        `Assalamualaikum, saya tertarik dengan paket *${pkg.title}* dengan harga ${formatPrice(displayPrice)}. Mohon informasi lebih lanjut.`
                      );
                      window.open(`https://wa.me/6287782408192?text=${message}`, '_blank');
                    }}
                  >
                    Tanya via WhatsApp
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    atau isi formulir pendaftaran di bawah
                  </p>
                </div>

                {/* Quick Info */}
                <div className="bg-secondary/50 rounded-2xl p-4">
                  <h4 className="font-heading font-semibold text-foreground mb-3">
                    Informasi Penting
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Harga dapat berubah sewaktu-waktu</li>
                    <li>• Minimal 2 bulan sebelum keberangkatan</li>
                    <li>• DP 30% untuk booking</li>
                    <li>• Pelunasan H-30</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="mt-12 bg-card rounded-2xl p-6 md:p-8 shadow-card" id="daftar">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                Formulir Pendaftaran Online
              </h2>
              <p className="text-muted-foreground">
                Isi data dengan lengkap dan benar untuk proses pendaftaran {pkg.title}
              </p>
            </div>
            
            <RegistrationForm packageId={pkg.id} packageTitle={pkg.title} />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default PackageDetail;
