-- Create delivery_partners table if not exists
CREATE TABLE IF NOT EXISTS delivery_partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  cpf TEXT UNIQUE NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('moto', 'car')),
  license_plate TEXT NOT NULL,
  documents JSONB NOT NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE')),
  current_location JSONB,
  last_updated TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create deliveries table
CREATE TABLE IF NOT EXISTS deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL,
  delivery_partner_id UUID REFERENCES delivery_partners(id),
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED')),
  pickup_location JSONB NOT NULL,
  delivery_location JSONB NOT NULL,
  estimated_delivery_time TIMESTAMP WITH TIME ZONE,
  actual_delivery_time TIMESTAMP WITH TIME ZONE,
  tracking_history JSONB[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create RLS policies
ALTER TABLE delivery_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

-- Delivery Partners policies
CREATE POLICY "Users can view their own delivery partner profile"
  ON delivery_partners FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own delivery partner location"
  ON delivery_partners FOR UPDATE
  USING (user_id = auth.uid());

-- Deliveries policies
CREATE POLICY "Users can view their assigned deliveries"
  ON deliveries FOR SELECT
  USING (
    delivery_partner_id IN (
      SELECT id FROM delivery_partners WHERE user_id = auth.uid()
    ) OR
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Delivery partners can update their assigned deliveries"
  ON deliveries FOR UPDATE
  USING (
    delivery_partner_id IN (
      SELECT id FROM delivery_partners WHERE user_id = auth.uid()
    )
  );

-- Create functions for location updates
CREATE OR REPLACE FUNCTION update_delivery_location(
  delivery_id UUID,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  status TEXT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  current_timestamp TIMESTAMP WITH TIME ZONE := NOW();
  location_update JSONB;
BEGIN
  -- Create location update object
  location_update := jsonb_build_object(
    'timestamp', current_timestamp,
    'location', jsonb_build_object('lat', lat, 'lng', lng),
    'status', COALESCE(status, (SELECT status FROM deliveries WHERE id = delivery_id))
  );

  -- Update delivery tracking history
  UPDATE deliveries
  SET 
    tracking_history = tracking_history || location_update,
    status = COALESCE(status, deliveries.status),
    updated_at = current_timestamp
  WHERE id = delivery_id;

  -- Update delivery partner location
  UPDATE delivery_partners
  SET 
    current_location = jsonb_build_object('lat', lat, 'lng', lng),
    last_updated = current_timestamp
  WHERE id = (SELECT delivery_partner_id FROM deliveries WHERE id = delivery_id);
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate distance between two points
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 DOUBLE PRECISION,
  lng1 DOUBLE PRECISION,
  lat2 DOUBLE PRECISION,
  lng2 DOUBLE PRECISION
)
RETURNS DOUBLE PRECISION AS $$
DECLARE
  R DOUBLE PRECISION := 6371; -- Earth's radius in kilometers
  dlat DOUBLE PRECISION;
  dlng DOUBLE PRECISION;
  a DOUBLE PRECISION;
  c DOUBLE PRECISION;
BEGIN
  dlat := radians(lat2 - lat1);
  dlng := radians(lng2 - lng1);
  a := sin(dlat/2) * sin(dlat/2) +
       cos(radians(lat1)) * cos(radians(lat2)) *
       sin(dlng/2) * sin(dlng/2);
  c := 2 * atan2(sqrt(a), sqrt(1-a));
  RETURN R * c;
END;
$$ LANGUAGE plpgsql;

-- Create function to find nearby delivery partners
CREATE OR REPLACE FUNCTION find_nearby_delivery_partners(
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  vehicle_type TEXT,
  distance DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    dp.id,
    dp.user_id,
    dp.vehicle_type,
    calculate_distance(
      lat,
      lng,
      (dp.current_location->>'lat')::DOUBLE PRECISION,
      (dp.current_location->>'lng')::DOUBLE PRECISION
    ) as distance
  FROM delivery_partners dp
  WHERE 
    dp.status = 'ACTIVE' AND
    dp.current_location IS NOT NULL AND
    calculate_distance(
      lat,
      lng,
      (dp.current_location->>'lat')::DOUBLE PRECISION,
      (dp.current_location->>'lng')::DOUBLE PRECISION
    ) <= radius_km
  ORDER BY distance ASC;
END;
$$ LANGUAGE plpgsql;