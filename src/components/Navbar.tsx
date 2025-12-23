import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#beranda', label: 'Beranda' },
    { href: '#paket', label: 'Paket Umrah' },
    { href: '#haji', label: 'Paket Haji' },
    { href: '#galeri', label: 'Galeri' },
    { href: '#tentang', label: 'Tentang Kami' },
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/6281234567890?text=Halo, saya ingin konsultasi tentang paket Umrah/Haji', '_blank');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-card py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isScrolled ? 'bg-primary' : 'bg-primary-foreground/20 backdrop-blur-sm'
            }`}>
              <span className={`text-xl font-heading font-bold ${
                isScrolled ? 'text-primary-foreground' : 'text-primary-foreground'
              }`}>B</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-bold text-lg leading-tight ${
                isScrolled ? 'text-primary' : 'text-primary-foreground'
              }`}>
                BAROKAH
              </span>
              <span className={`text-xs tracking-widest ${
                isScrolled ? 'text-muted-foreground' : 'text-primary-foreground/80'
              }`}>
                TOUR & TRAVEL
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  isScrolled ? 'text-foreground' : 'text-primary-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant={isScrolled ? 'whatsapp' : 'hero'}
              size="lg"
              onClick={handleWhatsAppClick}
              className="gap-2"
            >
              <Phone className="w-4 h-4" />
              Konsultasi via WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-primary-foreground'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slide-up">
            <div className="flex flex-col gap-4 bg-card rounded-xl p-6 shadow-card">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground font-medium hover:text-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="whatsapp"
                size="lg"
                onClick={handleWhatsAppClick}
                className="mt-2"
              >
                <Phone className="w-4 h-4" />
                Konsultasi via WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
