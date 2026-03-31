CREATE TABLE employers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- basic info
    fullname TEXT,
    email TEXT UNIQUE,
    phone TEXT UNIQUE,

    -- verification
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,

    -- auth
    password_hash TEXT,

    -- company info
    company_name TEXT NOT NULL,
    company_email TEXT UNIQUE NOT NULL,
    company_website TEXT UNIQUE,

    profile_photo TEXT,

    referrals_left INTEGER NOT NULL DEFAULT 0,

    -- tokens
    refresh_token_hash TEXT,

    -- email verification
    email_verification_token TEXT,
    email_verification_expires TIMESTAMP,

    -- password reset
    password_reset_token TEXT,
    password_reset_expires TIMESTAMP,

    -- status
    is_active BOOLEAN DEFAULT TRUE,
    is_suspended BOOLEAN DEFAULT FALSE,

    -- timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);