-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('avatars', 'avatars', true),
  ('reports', 'reports', true),
  ('adoption-fairs', 'adoption-fairs', true);

-- Create storage policies
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  );

CREATE POLICY "Report images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'reports');

CREATE POLICY "Anyone can upload report images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'reports');

CREATE POLICY "Adoption fair images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'adoption-fairs');

CREATE POLICY "ONGs can upload fair images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'adoption-fairs' AND
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'ONG'
    )
  );