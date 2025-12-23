import { MessageCircle } from 'lucide-react';

const WhatsAppFloatingButton = () => {
  const handleClick = () => {
    window.open(
      'https://wa.me/6281234567890?text=Halo, saya ingin bertanya tentang paket Umrah/Haji',
      '_blank'
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl flex items-center justify-center group transition-all duration-300 hover:scale-110"
      aria-label="Chat WhatsApp"
    >
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      
      {/* Icon */}
      <MessageCircle className="w-7 h-7 text-white relative z-10" />

      {/* Tooltip */}
      <span className="absolute right-full mr-3 whitespace-nowrap bg-foreground text-background text-sm font-medium px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat dengan Kami
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-foreground" />
      </span>
    </button>
  );
};

export default WhatsAppFloatingButton;
