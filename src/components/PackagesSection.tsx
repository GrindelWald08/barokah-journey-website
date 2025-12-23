import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Star, Users, Clock, ChevronRight, Filter } from 'lucide-react';
import madinahImage from '@/assets/madinah-mosque.jpg';
import pilgrimsImage from '@/assets/happy-pilgrims.jpg';
import heroImage from '@/assets/hero-kaaba.jpg';

interface Package {
  id: number;
  title: string;
  type: 'umrah' | 'haji';
  price: number;
  originalPrice?: number;
  duration: string;
  date: string;
  month: string;
  hotelRating: number;
  seatsLeft: number;
  image: string;
  highlights: string[];
  isPopular?: boolean;
}

const packages: Package[] = [
  {
    id: 1,
    title: 'Umrah Reguler Hemat',
    type: 'umrah',
    price: 25000000,
    originalPrice: 28000000,
    duration: '9 Hari',
    date: '15 Agustus 2024',
    month: 'Agustus',
    hotelRating: 4,
    seatsLeft: 12,
    image: heroImage,
    highlights: ['Pesawat Saudia', 'Hotel 200m dari Masjid', 'Makan 3x'],
  },
  {
    id: 2,
    title: 'Umrah Premium',
    type: 'umrah',
    price: 35000000,
    duration: '12 Hari',
    date: '20 September 2024',
    month: 'September',
    hotelRating: 5,
    seatsLeft: 8,
    image: madinahImage,
    highlights: ['Garuda Indonesia', 'Hotel Bintang 5', 'City Tour'],
    isPopular: true,
  },
  {
    id: 3,
    title: 'Umrah Plus Turki',
    type: 'umrah',
    price: 45000000,
    duration: '14 Hari',
    date: '10 Oktober 2024',
    month: 'Oktober',
    hotelRating: 5,
    seatsLeft: 15,
    image: pilgrimsImage,
    highlights: ['Istanbul Tour', 'Hagia Sophia', 'Blue Mosque'],
  },
  {
    id: 4,
    title: 'Umrah Ramadhan',
    type: 'umrah',
    price: 38000000,
    duration: '10 Hari',
    date: '5 Ramadhan 1446',
    month: 'Ramadhan',
    hotelRating: 5,
    seatsLeft: 5,
    image: heroImage,
    highlights: ['Itikaf di Masjidil Haram', 'Buka Puasa', 'Lailatul Qadr'],
    isPopular: true,
  },
  {
    id: 5,
    title: 'Haji Furoda VIP',
    type: 'haji',
    price: 180000000,
    duration: '25 Hari',
    date: 'Musim Haji 2025',
    month: 'Haji',
    hotelRating: 5,
    seatsLeft: 3,
    image: madinahImage,
    highlights: ['Tanpa Antrian', 'Tenda VIP Mina', 'Pendampingan Eksklusif'],
    isPopular: true,
  },
  {
    id: 6,
    title: 'Haji Plus',
    type: 'haji',
    price: 120000000,
    duration: '22 Hari',
    date: 'Musim Haji 2025',
    month: 'Haji',
    hotelRating: 4,
    seatsLeft: 10,
    image: pilgrimsImage,
    highlights: ['Proses Cepat', 'Hotel Dekat', 'Muthawwif'],
  },
];

const months = ['Semua', 'Agustus', 'September', 'Oktober', 'Ramadhan', 'Haji'];
const priceRanges = [
  { label: 'Semua Harga', min: 0, max: Infinity },
  { label: '< 30 Juta', min: 0, max: 30000000 },
  { label: '30 - 50 Juta', min: 30000000, max: 50000000 },
  { label: '> 50 Juta', min: 50000000, max: Infinity },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const PackagesSection = () => {
  const [selectedMonth, setSelectedMonth] = useState('Semua');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPackages = packages.filter((pkg) => {
    const monthMatch = selectedMonth === 'Semua' || pkg.month === selectedMonth;
    const priceMatch = pkg.price >= selectedPriceRange.min && pkg.price < selectedPriceRange.max;
    return monthMatch && priceMatch;
  });

  return (
    <section id="paket" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-gold font-medium mb-3">Paket Perjalanan</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Pilihan Paket Umrah & Haji
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Berbagai pilihan paket perjalanan ibadah yang dapat disesuaikan dengan kebutuhan dan budget Anda
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2 text-primary font-medium mb-4"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Sembunyikan Filter' : 'Tampilkan Filter'}
          </button>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-center">
              {/* Month Filter */}
              <div className="flex flex-wrap gap-2">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(month)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedMonth === month
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>

              {/* Price Filter */}
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedPriceRange.label === range.label
                        ? 'bg-gold text-accent-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-gold/10'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute top-4 left-4 bg-gold text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                    POPULER
                  </div>
                )}

                {/* Seats Left */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Sisa {pkg.seatsLeft} kursi
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 text-primary-foreground text-sm">
                  <Clock className="w-4 h-4" />
                  {pkg.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Type Badge */}
                <span className={`inline-block text-xs font-medium px-2 py-1 rounded mb-3 ${
                  pkg.type === 'haji' ? 'bg-gold/20 text-gold' : 'bg-primary/10 text-primary'
                }`}>
                  {pkg.type === 'haji' ? 'HAJI' : 'UMRAH'}
                </span>

                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {pkg.title}
                </h3>

                {/* Date & Rating */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {pkg.date}
                  </span>
                  <span className="flex items-center gap-1">
                    {[...Array(pkg.hotelRating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </span>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-2xl font-heading font-bold text-primary">
                    {formatPrice(pkg.price)}
                  </span>
                  {pkg.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(pkg.originalPrice)}
                    </span>
                  )}
                </div>

                {/* CTA */}
                <Button variant="outline" className="w-full group/btn">
                  Detail Paket
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Tidak ada paket yang sesuai dengan filter Anda.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PackagesSection;
