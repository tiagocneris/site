-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('abuse', 'abandonment', 'injury', 'other')),
  description TEXT NOT NULL,
  location JSONB NOT NULL,
  images TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved', 'cancelled')),
  reporter_id UUID REFERENCES users(id),
  anonymous BOOLEAN NOT NULL DEFAULT false,
  contact_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Anyone can create reports
CREATE POLICY "Anyone can create reports"
  ON reports FOR INSERT
  WITH CHECK (true);

-- Anyone can view reports
CREATE POLICY "Anyone can view reports"
  ON reports FOR SELECT
  USING (true);

-- Only admins and the reporter can update reports
CREATE POLICY "Only admins and reporter can update reports"
  ON reports FOR UPDATE
  USING (
    reporter_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'ADMIN'
    )
  );

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_reports_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_reports_updated_at();

-- Create storage bucket for report images
INSERT INTO storage.buckets (id, name, public)
VALUES ('report-images', 'Report Images', true)
ON CONFLICT DO NOTHING;

-- Create storage policies for report images
CREATE POLICY "Anyone can view report images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'report-images');

CREATE POLICY "Anyone can upload report images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'report-images');