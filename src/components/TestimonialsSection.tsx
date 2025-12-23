import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import pilgrimsImage from '@/assets/happy-pilgrims.jpg';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  text: string;
  package: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Hj. Siti Aminah',
    location: 'Jakarta Selatan',
    image: pilgrimsImage,
    rating: 5,
    text: 'Alhamdulillah, perjalanan umrah bersama Barokah Tour sangat nyaman dan khusyuk. Pembimbing sangat sabar dan informatif. Hotel sangat dekat dengan Masjidil Haram. Insya Allah akan berangkat lagi.',
    package: 'Umrah Premium 2024',
  },
  {
    id: 2,
    name: 'H. Ahmad Fauzi',
    location: 'Surabaya',
    image: pilgrimsImage,
    rating: 5,
    text: 'Pelayanan sangat memuaskan dari awal hingga akhir. Tim Barokah sangat profesional dan responsif. Tidak ada kendala selama perjalanan. Highly recommended!',
    package: 'Umrah Reguler 2024',
  },
  {
    id: 3,
    name: 'Ibu Nurhaliza',
    location: 'Bandung',
    image: pilgrimsImage,
    rating: 5,
    text: 'Haji Furoda bersama Barokah Tour adalah pengalaman terbaik seumur hidup. Semua fasilitas VIP, tidak perlu menunggu lama. Terima kasih Barokah Tour!',
    package: 'Haji Furoda 2024',
  },
  {
    id: 4,
    name: 'Bpk. Rahmat Hidayat',
    location: 'Medan',
    image: pilgrimsImage,
    rating: 5,
    text: 'Saya membawa orang tua yang sudah lanjut usia. Tim Barokah sangat perhatian dan membantu. Fasilitas kursi roda tersedia. Jazakallahu khairan.',
    package: 'Umrah Premium 2024',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="galeri" className="py-20 bg-secondary pattern-islamic">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold font-medium mb-3">Testimoni Jamaah</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Apa Kata Mereka?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pengalaman nyata dari jamaah yang telah bersama kami
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-card shadow-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-card shadow-card flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-card-hover">
            <Quote className="w-12 h-12 text-gold/30 mb-6" />
            
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
              "{testimonials[currentIndex].text}"
            </p>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].location}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
              </div>
              <div className="ml-auto hidden md:block">
                <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  {testimonials[currentIndex].package}
                </span>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-gold' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
