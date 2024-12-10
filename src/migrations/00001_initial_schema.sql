-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'ONG')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

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

-- Create adoption_fairs table
CREATE TABLE IF NOT EXISTS adoption_fairs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ong_id UUID NOT NULL REFERENCES users(id),
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
  fair_id UUID NOT NULL REFERENCES adoption_fairs(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  breed TEXT NOT NULL,
  age TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoption_fairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE animals ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Reports policies
CREATE POLICY "Anyone can create reports"
  ON reports FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view reports"
  ON reports FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own reports"
  ON reports FOR UPDATE
  USING (reporter_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('ADMIN', 'ONG')
  ));

-- Adoption fairs policies
CREATE POLICY "Anyone can view adoption fairs"
  ON adoption_fairs FOR SELECT
  USING (true);

CREATE POLICY "ONGs can create adoption fairs"
  ON adoption_fairs FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ONG'
  ));

CREATE POLICY "ONGs can update their own fairs"
  ON adoption_fairs FOR UPDATE
  USING (ong_id = auth.uid() OR EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'ADMIN'
  ));

-- Animals policies
CREATE POLICY "Anyone can view animals"
  ON animals FOR SELECT
  USING (true);

CREATE POLICY "ONGs can manage their fair animals"
  ON animals FOR ALL
  USING (EXISTS (
    SELECT 1 FROM adoption_fairs
    WHERE id = fair_id AND ong_id = auth.uid()
  ));

-- Create functions for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_adoption_fairs_updated_at
  BEFORE UPDATE ON adoption_fairs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_animals_updated_at
  BEFORE UPDATE ON animals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();