-- Create storage bucket for package images
INSERT INTO storage.buckets (id, name, public)
VALUES ('package-images', 'package-images', true);

-- Allow admins to upload images
CREATE POLICY "Admins can upload package images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'package-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to update images
CREATE POLICY "Admins can update package images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'package-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to delete images
CREATE POLICY "Admins can delete package images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'package-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow public read access to package images
CREATE POLICY "Anyone can view package images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'package-images');