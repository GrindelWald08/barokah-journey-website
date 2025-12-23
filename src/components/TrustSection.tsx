import { Shield, Star, Users, CheckCircle, Plane } from 'lucide-react';

const TrustSection = () => {
  const trustItems = [
    {
      icon: Shield,
      title: 'Izin Resmi Kemenag',
      description: 'Terdaftar resmi di Kementerian Agama RI',
    },
    {
      icon: Star,
      title: 'Hotel Bintang 5',
      description: 'Penginapan premium dekat Masjidil Haram',
    },
    {
      icon: Users,
      title: 'Pembimbing Berpengalaman',
      description: 'Ustadz profesional bersertifikat',
    },
    {
      icon: CheckCircle,
      title: 'Pasti Berangkat',
      description: 'Jaminan keberangkatan sesuai jadwal',
    },
  ];

  const airlines = [
    { name: 'Garuda Indonesia', logo: '🇮🇩' },
    { name: 'Saudia Airlines', logo: '🇸🇦' },
    { name: 'Emirates', logo: '🇦🇪' },
    { name: 'Qatar Airways', logo: '🇶🇦' },
  ];

  return (
    <section className="py-16 bg-card pattern-islamic">
      <div className="container mx-auto px-4">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-background shadow-card hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Partner Airlines */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6 flex items-center justify-center gap-2">
            <Plane className="w-4 h-4" />
            Partner Maskapai Penerbangan Kami
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {airlines.map((airline, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <span className="text-2xl">{airline.logo}</span>
                <span className="font-medium text-foreground">{airline.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
