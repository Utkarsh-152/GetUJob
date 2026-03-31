CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email TEXT UNIQUE,
    phone TEXT UNIQUE,

    password_hash TEXT,

    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,

    role TEXT CHECK (role IN ('employer', 'jobseeker')) NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);