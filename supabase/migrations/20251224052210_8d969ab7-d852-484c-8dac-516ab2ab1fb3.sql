
-- Create packages table
CREATE TABLE public.packages (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'umroh',
  price NUMERIC NOT NULL,
  discount_price NUMERIC,
  duration TEXT NOT NULL,
  departure_date TEXT NOT NULL,
  quota INTEGER NOT NULL DEFAULT 45,
  available_quota INTEGER NOT NULL DEFAULT 45,
  hotel_makkah TEXT,
  hotel_makkah_stars INTEGER DEFAULT 5,
  hotel_madinah TEXT,
  hotel_madinah_stars INTEGER DEFAULT 5,
  highlights TEXT[] DEFAULT '{}',
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Anyone can view active packages (public read)
CREATE POLICY "Anyone can view active packages"
ON public.packages
FOR SELECT
USING (is_active = true);

-- Admins can view all packages
CREATE POLICY "Admins can view all packages"
ON public.packages
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can insert packages
CREATE POLICY "Admins can insert packages"
ON public.packages
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update packages
CREATE POLICY "Admins can update packages"
ON public.packages
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete packages
CREATE POLICY "Admins can delete packages"
ON public.packages
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_packages_updated_at
BEFORE UPDATE ON public.packages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data from existing packages
INSERT INTO public.packages (id, title, type, price, duration, departure_date, quota, available_quota, hotel_makkah, hotel_makkah_stars, hotel_madinah, hotel_madinah_stars, highlights, image_url)
VALUES 
(1, 'Paket Umroh Reguler Januari', 'umroh', 28500000, '9 Hari', '15 Januari 2025', 45, 45, 'Elaf Ajyad Hotel', 5, 'Dallah Taibah Hotel', 5, ARRAY['Visa Umroh', 'Tiket PP', 'Hotel Bintang 5', 'Makan 3x Sehari', 'Tour Ziarah', 'Muthawif'], NULL),
(2, 'Paket Umroh Premium Februari', 'umroh', 35000000, '12 Hari', '10 Februari 2025', 30, 30, 'Fairmont Makkah', 5, 'The Oberoi Madinah', 5, ARRAY['Visa Umroh', 'Tiket PP Business', 'Hotel Bintang 5 Premium', 'Makan 3x Sehari', 'Tour Ziarah Lengkap', 'Muthawif Pribadi', 'Handling VIP'], NULL),
(3, 'Paket Umroh Hemat Maret', 'umroh', 22000000, '9 Hari', '5 Maret 2025', 50, 50, 'Grand Zamzam Hotel', 4, 'Movenpick Hotel', 4, ARRAY['Visa Umroh', 'Tiket PP', 'Hotel Bintang 4', 'Makan 3x Sehari', 'Tour Ziarah', 'Muthawif'], NULL),
(4, 'Paket Umroh Ramadhan', 'umroh', 45000000, '14 Hari', '1 Maret 2025', 40, 40, 'Swissotel Makkah', 5, 'Pullman Madinah', 5, ARRAY['Visa Umroh', 'Tiket PP', 'Hotel Bintang 5', 'Makan 3x Sehari', 'Tour Ziarah', 'Muthawif', 'Iftar di Masjidil Haram'], NULL),
(5, 'Paket Umroh Plus Turki', 'umroh', 55000000, '14 Hari', '20 April 2025', 35, 35, 'Raffles Makkah', 5, 'Anwar Al Madinah', 5, ARRAY['Visa Umroh + Turki', 'Tiket PP', 'Hotel Bintang 5', 'Makan 3x Sehari', 'Tour Istanbul', 'Tour Ziarah Lengkap', 'Muthawif'], NULL),
(6, 'Paket Umroh Keluarga Mei', 'umroh', 32000000, '10 Hari', '15 Mei 2025', 40, 40, 'Conrad Makkah', 5, 'Shaza Al Madina', 5, ARRAY['Visa Umroh', 'Tiket PP', 'Hotel Bintang 5', 'Makan 3x Sehari', 'Tour Ziarah', 'Muthawif', 'Kids Program'], NULL);

-- Reset the sequence to continue after our inserts
SELECT setval('packages_id_seq', (SELECT MAX(id) FROM packages));
