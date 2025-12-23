import heroImage from '@/assets/hero-kaaba.jpg';
import madinahImage from '@/assets/madinah-mosque.jpg';
import pilgrimsImage from '@/assets/happy-pilgrims.jpg';

export interface Hotel {
  name: string;
  rating: number;
  location: string;
  distance: string;
  amenities: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Package {
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
  description?: string;
  includes?: string[];
  excludes?: string[];
  hotels?: Hotel[];
  itinerary?: ItineraryDay[];
}

export const packages: Package[] = [
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
    description: 'Paket umrah hemat dengan fasilitas lengkap dan pelayanan terbaik. Cocok untuk jamaah yang ingin beribadah dengan nyaman tanpa menguras kantong.',
    includes: [
      'Tiket pesawat PP (Saudia Airlines)',
      'Akomodasi hotel bintang 4',
      'Makan 3x sehari (menu Indonesia)',
      'Transportasi AC selama di Arab Saudi',
      'Visa umrah',
      'Pembimbing berpengalaman',
      'Perlengkapan umrah',
      'Air zamzam 5 liter',
      'Asuransi perjalanan',
      'Handling bandara'
    ],
    excludes: [
      'Paspor (min. 6 bulan masa berlaku)',
      'Suntik meningitis',
      'Tips tour guide & sopir',
      'Pengeluaran pribadi',
      'Kelebihan bagasi'
    ],
    hotels: [
      {
        name: 'Elaf Ajyad Hotel',
        rating: 4,
        location: 'Makkah',
        distance: '200m dari Masjidil Haram',
        amenities: ['WiFi Gratis', 'Sarapan', 'AC', 'TV', 'Kamar Mandi Dalam']
      },
      {
        name: 'Dallah Taibah Hotel',
        rating: 4,
        location: 'Madinah',
        distance: '150m dari Masjid Nabawi',
        amenities: ['WiFi Gratis', 'Sarapan', 'AC', 'TV', 'Kamar Mandi Dalam']
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Jakarta - Jeddah',
        description: 'Keberangkatan dari Indonesia menuju Tanah Suci',
        activities: [
          'Berkumpul di Bandara Soekarno-Hatta Terminal 3',
          'Check-in dan pengurusan bagasi',
          'Penerbangan menuju Jeddah dengan Saudia Airlines',
          'Tiba di Jeddah, proses imigrasi dan pengambilan bagasi'
        ]
      },
      {
        day: 2,
        title: 'Jeddah - Madinah',
        description: 'Perjalanan menuju Kota Madinah',
        activities: [
          'Perjalanan darat menuju Madinah (±5 jam)',
          'Check-in hotel di Madinah',
          'Istirahat dan persiapan',
          'Sholat berjamaah di Masjid Nabawi'
        ]
      },
      {
        day: 3,
        title: 'Madinah',
        description: 'Ziarah kota Madinah',
        activities: [
          'Sholat Subuh di Masjid Nabawi',
          'Ziarah makam Rasulullah SAW',
          'Ziarah Raudhah (sesuai jadwal)',
          'City tour: Masjid Quba, Jabal Uhud, Masjid Qiblatain'
        ]
      },
      {
        day: 4,
        title: 'Madinah',
        description: 'Ibadah di Masjid Nabawi',
        activities: [
          'Sholat 5 waktu berjamaah di Masjid Nabawi',
          'Tadarus Al-Quran',
          'Waktu bebas untuk ibadah pribadi',
          'Belanja oleh-oleh (optional)'
        ]
      },
      {
        day: 5,
        title: 'Madinah - Makkah',
        description: 'Perjalanan menuju Makkah dengan Miqat',
        activities: [
          'Check-out hotel',
          'Perjalanan menuju Makkah via Bir Ali (Miqat)',
          'Niat Ihram dan mandi di Miqat',
          'Tiba di Makkah, check-in hotel',
          'Umrah: Thawaf, Sai, Tahallul'
        ]
      },
      {
        day: 6,
        title: 'Makkah',
        description: 'Ibadah di Masjidil Haram',
        activities: [
          'Sholat 5 waktu berjamaah di Masjidil Haram',
          'Thawaf Sunnah',
          'Tadarus Al-Quran',
          'Waktu bebas untuk ibadah'
        ]
      },
      {
        day: 7,
        title: 'Makkah',
        description: 'City tour Makkah',
        activities: [
          'Ziarah: Jabal Rahmah, Muzdalifah, Mina',
          'Jabal Tsur dan Jabal Nur (melihat dari bawah)',
          'Sholat berjamaah di Masjidil Haram',
          'Waktu bebas'
        ]
      },
      {
        day: 8,
        title: 'Makkah - Jeddah',
        description: 'Persiapan kepulangan',
        activities: [
          'Sholat Subuh di Masjidil Haram',
          'Thawaf Wada',
          'Check-out hotel',
          'Perjalanan menuju Bandara Jeddah',
          'Penerbangan menuju Jakarta'
        ]
      },
      {
        day: 9,
        title: 'Tiba di Jakarta',
        description: 'Kembali ke tanah air',
        activities: [
          'Tiba di Bandara Soekarno-Hatta',
          'Proses imigrasi dan pengambilan bagasi',
          'Penjemputan keluarga',
          'Selesai - Semoga menjadi umrah yang mabrur'
        ]
      }
    ]
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
    description: 'Paket umrah premium dengan fasilitas bintang 5 dan penerbangan Garuda Indonesia. Nikmati perjalanan ibadah yang nyaman dan berkesan.',
    includes: [
      'Tiket pesawat PP (Garuda Indonesia)',
      'Akomodasi hotel bintang 5',
      'Makan 3x sehari (menu internasional)',
      'Transportasi VIP selama di Arab Saudi',
      'Visa umrah',
      'Pembimbing senior berpengalaman',
      'Perlengkapan umrah premium',
      'Air zamzam 10 liter',
      'Asuransi perjalanan premium',
      'Handling bandara VIP',
      'City tour lengkap'
    ],
    excludes: [
      'Paspor (min. 6 bulan masa berlaku)',
      'Suntik meningitis',
      'Tips tour guide & sopir',
      'Pengeluaran pribadi'
    ],
    hotels: [
      {
        name: 'Swissotel Al Maqam Makkah',
        rating: 5,
        location: 'Makkah',
        distance: 'Terhubung langsung ke Masjidil Haram',
        amenities: ['WiFi Premium', 'All Meals', 'Spa', 'Gym', 'Concierge 24 Jam']
      },
      {
        name: 'Pullman Zamzam Madinah',
        rating: 5,
        location: 'Madinah',
        distance: '50m dari Masjid Nabawi',
        amenities: ['WiFi Premium', 'All Meals', 'Spa', 'Gym', 'Butler Service']
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Jakarta - Jeddah',
        description: 'Keberangkatan dengan Garuda Indonesia',
        activities: [
          'Berkumpul di Bandara Soekarno-Hatta Terminal 3',
          'VIP Lounge access',
          'Penerbangan premium dengan Garuda Indonesia',
          'Tiba di Jeddah dengan sambutan khusus'
        ]
      },
      {
        day: 2,
        title: 'Jeddah - Madinah',
        description: 'Perjalanan VIP ke Madinah',
        activities: [
          'Sarapan di hotel transit',
          'Perjalanan VIP bus menuju Madinah',
          'Check-in hotel bintang 5',
          'Sholat Ashar di Masjid Nabawi'
        ]
      },
      {
        day: 3,
        title: 'Madinah',
        description: 'Ziarah lengkap Madinah',
        activities: [
          'Sholat Subuh di Masjid Nabawi',
          'Ziarah Raudhah (slot khusus)',
          'Makan siang di restoran premium',
          'City tour lengkap Madinah'
        ]
      },
      {
        day: 4,
        title: 'Madinah',
        description: 'Ibadah di Masjid Nabawi',
        activities: ['Sholat 5 waktu berjamaah', 'Kajian dengan ustadz', 'Waktu bebas ibadah']
      },
      {
        day: 5,
        title: 'Madinah',
        description: 'Hari terakhir di Madinah',
        activities: ['Sholat berjamaah', 'Belanja oleh-oleh', 'Ziarah tambahan']
      },
      {
        day: 6,
        title: 'Madinah - Makkah',
        description: 'Perjalanan ke Makkah',
        activities: ['Check-out', 'Miqat di Bir Ali', 'Tiba di Makkah', 'Umrah']
      },
      {
        day: 7,
        title: 'Makkah',
        description: 'Ibadah di Masjidil Haram',
        activities: ['Sholat 5 waktu', 'Thawaf Sunnah', 'Tadarus']
      },
      {
        day: 8,
        title: 'Makkah',
        description: 'City tour Makkah',
        activities: ['Ziarah tempat bersejarah', 'Mina, Muzdalifah, Arafah']
      },
      {
        day: 9,
        title: 'Makkah',
        description: 'Ibadah bebas',
        activities: ['Waktu bebas untuk ibadah pribadi', 'Belanja']
      },
      {
        day: 10,
        title: 'Makkah',
        description: 'Hari terakhir di Makkah',
        activities: ['Thawaf Wada', 'Persiapan kepulangan']
      },
      {
        day: 11,
        title: 'Makkah - Jeddah - Jakarta',
        description: 'Kepulangan',
        activities: ['Menuju bandara', 'Penerbangan pulang']
      },
      {
        day: 12,
        title: 'Tiba di Jakarta',
        description: 'Kembali ke tanah air',
        activities: ['Tiba dengan selamat', 'Penjemputan keluarga']
      }
    ]
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
    description: 'Kombinasi ibadah umrah dan wisata religi ke Turki. Kunjungi situs-situs bersejarah Islam di Istanbul.',
    includes: [
      'Tiket pesawat PP (Turkish Airlines)',
      'Akomodasi hotel bintang 5',
      'Makan 3x sehari',
      'Transportasi premium',
      'Visa umrah & Turki',
      'Tour guide lokal',
      'Tiket masuk wisata'
    ],
    excludes: ['Paspor', 'Suntik meningitis', 'Tips', 'Pengeluaran pribadi'],
    hotels: [
      {
        name: 'Raffles Makkah Palace',
        rating: 5,
        location: 'Makkah',
        distance: '100m dari Masjidil Haram',
        amenities: ['Premium Semua Fasilitas']
      },
      {
        name: 'Hilton Madinah',
        rating: 5,
        location: 'Madinah',
        distance: '100m dari Masjid Nabawi',
        amenities: ['Premium Semua Fasilitas']
      },
      {
        name: 'Four Seasons Istanbul',
        rating: 5,
        location: 'Istanbul',
        distance: 'Sultanahmet Area',
        amenities: ['Premium Semua Fasilitas']
      }
    ],
    itinerary: [
      { day: 1, title: 'Jakarta - Istanbul', description: 'Keberangkatan', activities: ['Penerbangan ke Istanbul'] },
      { day: 2, title: 'Istanbul', description: 'City tour Istanbul', activities: ['Hagia Sophia', 'Blue Mosque', 'Topkapi Palace'] },
      { day: 3, title: 'Istanbul', description: 'Lanjutan tour', activities: ['Grand Bazaar', 'Bosphorus Cruise'] },
      { day: 4, title: 'Istanbul - Madinah', description: 'Menuju Arab Saudi', activities: ['Penerbangan ke Madinah'] },
      { day: 5, title: 'Madinah', description: 'Ziarah Madinah', activities: ['Masjid Nabawi', 'Ziarah kota'] },
      { day: 6, title: 'Madinah', description: 'Ibadah', activities: ['Sholat berjamaah', 'Tadarus'] },
      { day: 7, title: 'Madinah', description: 'Hari terakhir Madinah', activities: ['Waktu bebas'] },
      { day: 8, title: 'Madinah - Makkah', description: 'Menuju Makkah', activities: ['Miqat', 'Umrah'] },
      { day: 9, title: 'Makkah', description: 'Ibadah', activities: ['Masjidil Haram'] },
      { day: 10, title: 'Makkah', description: 'City tour', activities: ['Ziarah tempat bersejarah'] },
      { day: 11, title: 'Makkah', description: 'Ibadah', activities: ['Waktu bebas'] },
      { day: 12, title: 'Makkah', description: 'Hari terakhir', activities: ['Thawaf Wada'] },
      { day: 13, title: 'Jeddah - Jakarta', description: 'Kepulangan', activities: ['Penerbangan pulang'] },
      { day: 14, title: 'Tiba di Jakarta', description: 'Selesai', activities: ['Sampai dengan selamat'] }
    ]
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
    description: 'Rasakan kekhusyukan ibadah di bulan suci Ramadhan. Buka puasa di Masjidil Haram dan berburu Lailatul Qadr.',
    includes: [
      'Tiket pesawat PP',
      'Hotel bintang 5 dekat Haram',
      'Makan sahur & buka puasa',
      'Visa umrah',
      'Pembimbing khusus Ramadhan'
    ],
    excludes: ['Paspor', 'Vaksin', 'Tips', 'Pribadi'],
    hotels: [
      {
        name: 'Makkah Clock Royal Tower',
        rating: 5,
        location: 'Makkah',
        distance: 'View langsung Kabah',
        amenities: ['Full Ramadhan Package']
      }
    ],
    itinerary: [
      { day: 1, title: 'Keberangkatan', description: 'Jakarta - Jeddah', activities: ['Penerbangan'] },
      { day: 2, title: 'Makkah', description: 'Umrah', activities: ['Tiba di Makkah', 'Umrah'] },
      { day: 3, title: 'Makkah', description: 'Ibadah Ramadhan', activities: ['Sholat tarawih', 'Tadarus'] },
      { day: 4, title: 'Makkah', description: 'Ibadah', activities: ['Puasa', 'Ibadah'] },
      { day: 5, title: 'Makkah', description: 'Ibadah', activities: ['Puasa', 'Ibadah'] },
      { day: 6, title: 'Makkah', description: 'Ibadah', activities: ['Puasa', 'Ibadah'] },
      { day: 7, title: 'Makkah', description: 'Itikaf', activities: ['Mulai itikaf'] },
      { day: 8, title: 'Makkah', description: 'Lailatul Qadr', activities: ['Malam ibadah'] },
      { day: 9, title: 'Makkah - Jeddah', description: 'Kepulangan', activities: ['Thawaf Wada'] },
      { day: 10, title: 'Jakarta', description: 'Tiba', activities: ['Sampai'] }
    ]
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
    description: 'Paket haji VIP tanpa antrian dengan fasilitas terbaik. Berangkat tahun ini juga!',
    includes: [
      'Tanpa antrian - berangkat langsung',
      'Penerbangan first class',
      'Hotel bintang 5 terbaik',
      'Tenda VIP di Mina',
      'Muthawwif pribadi',
      'Full board meals'
    ],
    excludes: ['Paspor', 'Dam/fidyah', 'Kurban', 'Pribadi'],
    hotels: [
      {
        name: 'Fairmont Makkah Clock Royal Tower',
        rating: 5,
        location: 'Makkah',
        distance: 'Terhubung ke Masjidil Haram',
        amenities: ['Ultimate VIP Package']
      },
      {
        name: 'The Oberoi Madinah',
        rating: 5,
        location: 'Madinah',
        distance: 'Premium location',
        amenities: ['Ultimate VIP Package']
      }
    ],
    itinerary: [
      { day: 1, title: 'Keberangkatan', description: 'Jakarta - Madinah', activities: ['First class flight'] },
      { day: 2, title: 'Madinah', description: 'Tiba', activities: ['VIP welcome'] },
      { day: 3, title: 'Madinah', description: 'Ziarah', activities: ['Tour VIP'] },
      { day: 4, title: 'Madinah', description: 'Ibadah', activities: ['Sholat berjamaah'] },
      { day: 5, title: 'Madinah', description: 'Ibadah', activities: ['Waktu bebas'] },
      { day: 6, title: 'Makkah', description: 'Menuju Makkah', activities: ['Perjalanan VIP'] },
      { day: 7, title: 'Makkah', description: 'Persiapan Haji', activities: ['Briefing'] },
      { day: 8, title: 'Tarwiyah', description: 'Menuju Mina', activities: ['Tenda VIP Mina'] },
      { day: 9, title: 'Arafah', description: 'Wukuf', activities: ['Tenda AC di Arafah'] },
      { day: 10, title: 'Muzdalifah', description: 'Mabit', activities: ['Kumpul di Muzdalifah'] },
      { day: 11, title: 'Mina', description: 'Melontar', activities: ['Jamarat VIP access'] },
      { day: 12, title: 'Mina', description: 'Melontar', activities: ['Hari Tasyrik'] },
      { day: 13, title: 'Mina', description: 'Melontar', activities: ['Hari Tasyrik'] },
      { day: 14, title: 'Makkah', description: 'Thawaf Ifadhah', activities: ['Kembali ke hotel'] },
      { day: 15, title: 'Makkah', description: 'Ibadah', activities: ['Istirahat'] },
      { day: 16, title: 'Makkah', description: 'Ibadah', activities: ['Waktu bebas'] },
      { day: 17, title: 'Makkah', description: 'Ibadah', activities: ['Waktu bebas'] },
      { day: 18, title: 'Makkah', description: 'Ibadah', activities: ['Waktu bebas'] },
      { day: 19, title: 'Makkah', description: 'Ibadah', activities: ['Waktu bebas'] },
      { day: 20, title: 'Makkah', description: 'Ibadah', activities: ['Waktu bebas'] },
      { day: 21, title: 'Makkah', description: 'Ibadah', activities: ['Waktu bebas'] },
      { day: 22, title: 'Makkah', description: 'Ibadah', activities: ['Waktu bebas'] },
      { day: 23, title: 'Makkah', description: 'Thawaf Wada', activities: ['Persiapan pulang'] },
      { day: 24, title: 'Jeddah - Jakarta', description: 'Kepulangan', activities: ['Penerbangan'] },
      { day: 25, title: 'Jakarta', description: 'Tiba', activities: ['Selesai'] }
    ]
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
    description: 'Haji dengan proses lebih cepat dan fasilitas premium.',
    includes: [
      'Proses visa haji cepat',
      'Hotel bintang 4',
      'Tenda AC di Mina',
      'Muthawwif profesional',
      'Meals lengkap'
    ],
    excludes: ['Paspor', 'Dam', 'Kurban', 'Pribadi'],
    hotels: [
      {
        name: 'Hilton Makkah Convention',
        rating: 4,
        location: 'Makkah',
        distance: '300m dari Masjidil Haram',
        amenities: ['Haji Package']
      }
    ],
    itinerary: [
      { day: 1, title: 'Keberangkatan', description: 'Jakarta - Madinah', activities: ['Penerbangan'] },
      { day: 2, title: 'Madinah', description: 'Tiba', activities: ['Check-in'] },
      { day: 3, title: 'Madinah', description: 'Ziarah', activities: ['Tour'] },
      { day: 4, title: 'Madinah', description: 'Ibadah', activities: ['Sholat'] },
      { day: 5, title: 'Makkah', description: 'Perjalanan', activities: ['Bus'] },
      { day: 6, title: 'Makkah', description: 'Persiapan', activities: ['Briefing'] },
      { day: 7, title: 'Tarwiyah', description: 'Mina', activities: ['Tenda'] },
      { day: 8, title: 'Arafah', description: 'Wukuf', activities: ['Arafah'] },
      { day: 9, title: 'Muzdalifah', description: 'Mabit', activities: ['Bermalam'] },
      { day: 10, title: 'Mina', description: 'Melontar', activities: ['Jamarat'] },
      { day: 11, title: 'Mina', description: 'Tasyrik', activities: ['Melontar'] },
      { day: 12, title: 'Mina', description: 'Tasyrik', activities: ['Melontar'] },
      { day: 13, title: 'Makkah', description: 'Thawaf', activities: ['Ifadhah'] },
      { day: 14, title: 'Makkah', description: 'Ibadah', activities: ['Bebas'] },
      { day: 15, title: 'Makkah', description: 'Ibadah', activities: ['Bebas'] },
      { day: 16, title: 'Makkah', description: 'Ibadah', activities: ['Bebas'] },
      { day: 17, title: 'Makkah', description: 'Ibadah', activities: ['Bebas'] },
      { day: 18, title: 'Makkah', description: 'Ibadah', activities: ['Bebas'] },
      { day: 19, title: 'Makkah', description: 'Ibadah', activities: ['Bebas'] },
      { day: 20, title: 'Makkah', description: 'Wada', activities: ['Thawaf Wada'] },
      { day: 21, title: 'Pulang', description: 'Jeddah - Jakarta', activities: ['Penerbangan'] },
      { day: 22, title: 'Tiba', description: 'Jakarta', activities: ['Selesai'] }
    ]
  }
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const months = ['Semua', 'Agustus', 'September', 'Oktober', 'Ramadhan', 'Haji'];

export const priceRanges = [
  { label: 'Semua Harga', min: 0, max: Infinity },
  { label: '< 30 Juta', min: 0, max: 30000000 },
  { label: '30 - 50 Juta', min: 30000000, max: 50000000 },
  { label: '> 50 Juta', min: 50000000, max: Infinity },
];
