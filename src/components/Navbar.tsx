import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

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

  const handleSignOut = async () => {
    await signOut();
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
          <Link to="/" className="flex items-center gap-3">
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
          </Link>

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

          {/* CTA Button & Auth */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={isScrolled ? 'outline' : 'hero'}
                    size="lg"
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    Akun Saya
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      Status Booking
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant={isScrolled ? 'outline' : 'heroOutline'}
                size="lg"
                asChild
              >
                <Link to="/auth">Login</Link>
              </Button>
            )}
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
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-foreground font-medium hover:text-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Status Booking
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/auth">Login / Daftar</Link>
                </Button>
              )}
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
