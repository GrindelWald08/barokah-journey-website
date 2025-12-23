import { Briefcase, Coffee, Droplets, BookOpen, Plane, Hotel, Bus, HeartHandshake } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Plane,
      title: 'Tiket Pesawat PP',
      description: 'Penerbangan langsung dengan maskapai terpercaya',
    },
    {
      icon: Hotel,
      title: 'Akomodasi Premium',
      description: 'Hotel bintang 4-5 dekat Masjidil Haram & Nabawi',
    },
    {
      icon: Briefcase,
      title: 'Handling Bagasi',
      description: 'Pengurusan bagasi dari dan ke bandara',
    },
    {
      icon: Coffee,
      title: 'Makan 3x Sehari',
      description: 'Menu halal Indonesia dan Arab',
    },
    {
      icon: Droplets,
      title: 'Air Zamzam 5 Liter',
      description: 'Bonus air zamzam untuk dibawa pulang',
    },
    {
      icon: BookOpen,
      title: 'Manasik Lengkap',
      description: 'Bimbingan manasik sebelum keberangkatan',
    },
    {
      icon: Bus,
      title: 'Transportasi Lokal',
      description: 'Bus AC full untuk ziarah dan city tour',
    },
    {
      icon: HeartHandshake,
      title: 'Mutasi Gratis',
      description: 'Pengurusan perpindahan kloter jika diperlukan',
    },
  ];

  return (
    <section className="py-20 bg-primary pattern-islamic-gold">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold font-medium mb-3">Fasilitas Lengkap</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Semua Yang Anda Butuhkan
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Kami menyediakan fasilitas lengkap untuk kenyamanan ibadah Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-gold group-hover:text-accent-foreground transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-primary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-primary-foreground/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
