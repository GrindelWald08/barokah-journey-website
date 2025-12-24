-- Add database-level constraints for registrations table to validate input server-side
-- These constraints mirror the client-side Zod validation

-- Add length constraints for text fields
ALTER TABLE public.registrations 
  ADD CONSTRAINT registrations_full_name_length CHECK (char_length(full_name) >= 3 AND char_length(full_name) <= 100),
  ADD CONSTRAINT registrations_email_length CHECK (char_length(email) <= 255),
  ADD CONSTRAINT registrations_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT registrations_phone_length CHECK (char_length(phone) >= 10 AND char_length(phone) <= 15),
  ADD CONSTRAINT registrations_nik_length CHECK (char_length(nik) = 16),
  ADD CONSTRAINT registrations_nik_numeric CHECK (nik ~ '^[0-9]+$'),
  ADD CONSTRAINT registrations_birth_place_length CHECK (char_length(birth_place) >= 2 AND char_length(birth_place) <= 50),
  ADD CONSTRAINT registrations_address_length CHECK (char_length(address) >= 10 AND char_length(address) <= 300),
  ADD CONSTRAINT registrations_emergency_contact_length CHECK (char_length(emergency_contact) >= 3 AND char_length(emergency_contact) <= 100),
  ADD CONSTRAINT registrations_emergency_phone_length CHECK (char_length(emergency_phone) >= 10 AND char_length(emergency_phone) <= 15),
  ADD CONSTRAINT registrations_passport_number_length CHECK (passport_number IS NULL OR (char_length(passport_number) >= 6 AND char_length(passport_number) <= 20)),
  ADD CONSTRAINT registrations_notes_length CHECK (notes IS NULL OR char_length(notes) <= 500),
  ADD CONSTRAINT registrations_package_name_length CHECK (char_length(package_name) <= 200);