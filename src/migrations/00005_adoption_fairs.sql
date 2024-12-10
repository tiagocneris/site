-- Create adoption_fairs table
CREATE TABLE IF NOT EXISTS adoption_fairs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ong_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create animals table
CREATE TABLE IF NOT EXISTS animals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fair_id UUID REFERENCES adoption_fairs(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  breed TEXT NOT NULL,
  age TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE adoption_fairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;

-- Policies for adoption_fairs
CREATE POLICY "Anyone can view approved fairs"
  ON adoption_fairs FOR SELECT
  USING (status = 'APPROVED');

CREATE POLICY "ONGs can create fairs"
  ON adoption_fairs FOR INSERT
  WITH CHECK (auth.uid() = ong_id);

CREATE POLICY "ONGs can update their own fairs"
  ON adoption_fairs FOR UPDATE
  USING (auth.uid() = ong_id);

-- Policies for animals
CREATE POLICY "Anyone can view animals"
  ON animals FOR SELECT
  USING (true);

CREATE POLICY "ONGs can manage their fair animals"
  ON animals FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM adoption_fairs
      WHERE id = fair_id AND ong_id = auth.uid()
    )
  );

-- Create storage bucket for fair images
INSERT INTO storage.buckets (id, name, public)
VALUES ('adoption-fairs', 'Adoption Fair Images', true)
ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view fair images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'adoption-fairs');

CREATE POLICY "ONGs can upload fair images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'adoption-fairs' AND
    auth.uid() IN (
      SELECT ong_id FROM adoption_fairs
    )
  );

-- Function to find nearby fairs
CREATE OR REPLACE FUNCTION nearby_fairs(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 10
)
RETURNS SETOF adoption_fairs AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM adoption_fairs
  WHERE status = 'APPROVED'
  AND ST_DWithin(
    ST_MakePoint(lng, lat)::geography,
    ST_MakePoint(
      (location->>'lng')::float,
      (location->>'lat')::float
    )::geography,
    radius_km * 1000
  )
  ORDER BY
    ST_Distance(
      ST_MakePoint(lng, lat)::geography,
      ST_MakePoint(
        (location->>'lng')::float,
        (location->>'lat')::float
      )::geography
    );
END;
$$ LANGUAGE plpgsql;