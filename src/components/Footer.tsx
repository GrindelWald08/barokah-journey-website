import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Paket Umrah', href: '#paket' },
    { label: 'Paket Haji', href: '#haji' },
    { label: 'Galeri', href: '#galeri' },
    { label: 'Tentang Kami', href: '#tentang' },
  ];

  const services = [
    'Umrah Reguler',
    'Umrah Plus',
    'Haji Furoda',
    'Haji Plus',
    'City Tour',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'Youtube' },
    { icon: Send, href: '#', label: 'Telegram' },
  ];

  return (
    <footer id="tentang" className="bg-emerald-dark text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="text-2xl font-heading font-bold text-accent-foreground">B</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl">BAROKAH</h3>
                <span className="text-xs tracking-widest text-primary-foreground/70">TOUR & TRAVEL</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 mb-6 leading-relaxed">
              Mitra perjalanan ibadah terpercaya sejak 2009. Melayani dengan sepenuh hati untuk kenyamanan ibadah Anda.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-primary-foreground group-hover:text-accent-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Menu Cepat</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Layanan Kami</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-primary-foreground/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <span className="text-primary-foreground/70">
                  Jl. Masjid Raya No. 123, Jakarta Pusat 10110
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <a href="tel:+6281234567890" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a href="mailto:info@barokahtour.com" className="text-primary-foreground/70 hover:text-gold transition-colors">
                  info@barokahtour.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold shrink-0" />
                <span className="text-primary-foreground/70">
                  Senin - Sabtu: 08.00 - 17.00 WIB
                </span>
              </li>
            </ul>

            <Button
              variant="gold"
              size="lg"
              className="mt-6 w-full"
              onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
            >
              <Phone className="w-4 h-4" />
              Hubungi via WhatsApp
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/50 text-sm text-center md:text-left">
              © 2024 Barokah Tour & Travel. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/50">
              <a href="#" className="hover:text-gold transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="hover:text-gold transition-colors">Kebijakan Privasi</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
