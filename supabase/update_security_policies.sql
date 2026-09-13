-- SQL Migration: Secure Storage Bucket Policies and Table RLS Policies
-- Execute this script in your Supabase SQL Editor to enforce security.

-- ==============================================================
-- 1. STORAGE BUCKETS SECURITY POLICIES
-- ==============================================================

-- Ensure buckets exist and are marked public for GET requests
INSERT INTO storage.buckets (id, name, public)
VALUES ('foto-pekerja', 'foto-pekerja', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('artikel-gambar', 'artikel-gambar', true)
ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public)
VALUES ('gambar-artikel', 'gambar-artikel', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop old public policies on storage.objects
DROP POLICY IF EXISTS "Public Upload Access for foto-pekerja" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Access for foto-pekerja" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Access for foto-pekerja" ON storage.objects;

DROP POLICY IF EXISTS "Public Upload Access for artikel-gambar" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Access for artikel-gambar" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Access for artikel-gambar" ON storage.objects;

DROP POLICY IF EXISTS "Authenticated Upload Access for foto-pekerja" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Access for foto-pekerja" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete Access for foto-pekerja" ON storage.objects;

DROP POLICY IF EXISTS "Authenticated Upload Access for artikel-gambar" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Access for artikel-gambar" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete Access for artikel-gambar" ON storage.objects;

-- Create PUBLIC READ policies for buckets
DROP POLICY IF EXISTS "Public Read Access for foto-pekerja" ON storage.objects;
CREATE POLICY "Public Read Access for foto-pekerja"
ON storage.objects FOR SELECT
USING (bucket_id = 'foto-pekerja');

DROP POLICY IF EXISTS "Public Read Access for artikel-gambar" ON storage.objects;
CREATE POLICY "Public Read Access for artikel-gambar"
ON storage.objects FOR SELECT
USING (bucket_id = 'artikel-gambar' OR bucket_id = 'gambar-artikel');

-- Create AUTHENTICATED ONLY policies for INSERT, UPDATE, DELETE on foto-pekerja
CREATE POLICY "Authenticated Upload Access for foto-pekerja"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'foto-pekerja' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Update Access for foto-pekerja"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'foto-pekerja' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Delete Access for foto-pekerja"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'foto-pekerja' AND auth.role() = 'authenticated');

-- Create AUTHENTICATED ONLY policies for INSERT, UPDATE, DELETE on artikel-gambar / gambar-artikel
CREATE POLICY "Authenticated Upload Access for artikel-gambar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ((bucket_id = 'artikel-gambar' OR bucket_id = 'gambar-artikel') AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Update Access for artikel-gambar"
ON storage.objects FOR UPDATE
TO authenticated
USING ((bucket_id = 'artikel-gambar' OR bucket_id = 'gambar-artikel') AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Delete Access for artikel-gambar"
ON storage.objects FOR DELETE
TO authenticated
USING ((bucket_id = 'artikel-gambar' OR bucket_id = 'gambar-artikel') AND auth.role() = 'authenticated');


-- ==============================================================
-- 2. DATABASE TABLES ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================

-- Enable RLS on all tables
ALTER TABLE public.pekerja ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artikel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.master_keahlian ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 2.1 Table Pekerja
DROP POLICY IF EXISTS "Allow public read access on pekerja" ON public.pekerja;
DROP POLICY IF EXISTS "Allow public write access on pekerja" ON public.pekerja;
DROP POLICY IF EXISTS "Allow authenticated insert on pekerja" ON public.pekerja;
DROP POLICY IF EXISTS "Allow authenticated update on pekerja" ON public.pekerja;
DROP POLICY IF EXISTS "Allow authenticated delete on pekerja" ON public.pekerja;

CREATE POLICY "Allow public read access on pekerja"
ON public.pekerja FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated insert on pekerja"
ON public.pekerja FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on pekerja"
ON public.pekerja FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on pekerja"
ON public.pekerja FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');

-- 2.2 Table Artikel
DROP POLICY IF EXISTS "Allow public read access on artikel" ON public.artikel;
DROP POLICY IF EXISTS "Allow public write access on artikel" ON public.artikel;
DROP POLICY IF EXISTS "Allow authenticated insert on artikel" ON public.artikel;
DROP POLICY IF EXISTS "Allow authenticated update on artikel" ON public.artikel;
DROP POLICY IF EXISTS "Allow authenticated delete on artikel" ON public.artikel;

CREATE POLICY "Allow public read access on artikel"
ON public.artikel FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated insert on artikel"
ON public.artikel FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on artikel"
ON public.artikel FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on artikel"
ON public.artikel FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');

-- 2.3 Table Master Keahlian
DROP POLICY IF EXISTS "Allow public read access on master_keahlian" ON public.master_keahlian;
DROP POLICY IF EXISTS "Allow public write access on master_keahlian" ON public.master_keahlian;
DROP POLICY IF EXISTS "Allow authenticated insert on master_keahlian" ON public.master_keahlian;
DROP POLICY IF EXISTS "Allow authenticated update on master_keahlian" ON public.master_keahlian;
DROP POLICY IF EXISTS "Allow authenticated delete on master_keahlian" ON public.master_keahlian;

CREATE POLICY "Allow public read access on master_keahlian"
ON public.master_keahlian FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated insert on master_keahlian"
ON public.master_keahlian FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on master_keahlian"
ON public.master_keahlian FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on master_keahlian"
ON public.master_keahlian FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');

-- 2.4 Table Site Settings
DROP POLICY IF EXISTS "Allow public read access on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow public write access on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated insert on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated update on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow authenticated delete on site_settings" ON public.site_settings;

CREATE POLICY "Allow public read access on site_settings"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Allow authenticated insert on site_settings"
ON public.site_settings FOR INSERT
TO authenticated
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on site_settings"
ON public.site_settings FOR UPDATE
TO authenticated
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on site_settings"
ON public.site_settings FOR DELETE
TO authenticated
USING (auth.role() = 'authenticated');
