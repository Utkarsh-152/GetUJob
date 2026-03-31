CREATE TABLE phone_otps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    phone TEXT NOT NULL,
    otp_hash TEXT NOT NULL,

    expires_at TIMESTAMP NOT NULL,
    attempts INTEGER DEFAULT 0,
    is_used BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT now()
);