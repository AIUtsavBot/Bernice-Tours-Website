-- Bernice Tours N Travels - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create contacts table for storing form submissions
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Create services table (optional - for dynamic service management)
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    price_range VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default services
INSERT INTO services (slug, name, description, price_range, features, display_order) VALUES
('passport', 'Passport Services', 'New passport applications, renewals, and Tatkal services. We handle all documentation for hassle-free processing.', '₹1,500 - ₹5,000', '["New Applications", "Renewals", "Tatkal Service", "Minor Passports"]', 1),
('visa', 'Visa Assistance', 'Expert guidance for tourist, business, and work visas. We ensure your application meets all requirements.', '₹2,000 - ₹15,000', '["Tourist Visa", "Business Visa", "Work Permits", "Student Visa"]', 2),
('flight', 'Flight Bookings', 'Best deals on domestic and international flights. Flexible booking options with 24/7 support.', 'Service fee: ₹500', '["Best Prices", "All Airlines", "Easy Cancellation", "Group Bookings"]', 3),
('attestation', 'Document Attestation', 'Apostille and attestation services for all your important documents. Embassy and consulate verified.', '₹1,000 - ₹8,000', '["Apostille", "MEA Attestation", "Embassy Attestation", "Quick Processing"]', 4),
('insurance', 'Travel Insurance', 'Comprehensive travel insurance for peace of mind. Coverage for medical, trip cancellation, and more.', '₹500 - ₹5,000', '["Medical Coverage", "Trip Protection", "Baggage Cover", "Emergency Assistance"]', 5)
ON CONFLICT (slug) DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to contacts table
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Apply trigger to services table
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (for contact form submission)
CREATE POLICY "Allow anonymous contact submissions" ON contacts
    FOR INSERT TO anon
    WITH CHECK (true);

-- Create policy for reading services (public)
CREATE POLICY "Allow public to read active services" ON services
    FOR SELECT TO anon
    USING (is_active = true);

-- Create admin policies (requires authentication)
-- You'll need to set up authentication for admin access
CREATE POLICY "Allow authenticated users full access to contacts" ON contacts
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users full access to services" ON services
    FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON services TO anon;
GRANT INSERT ON contacts TO anon;
GRANT ALL ON contacts TO authenticated;
GRANT ALL ON services TO authenticated;
