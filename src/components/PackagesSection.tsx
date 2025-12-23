import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Star, Users, Clock, ChevronRight, Filter } from 'lucide-react';
import { packages, formatPrice, months, priceRanges } from '@/data/packages';

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
                <Link to={`/paket/${pkg.id}`}>
                  <Button variant="outline" className="w-full group/btn">
                    Detail Paket
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
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
