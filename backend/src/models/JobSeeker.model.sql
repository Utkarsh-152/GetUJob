CREATE TABLE jobseekers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- link to main user identity
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    -- basic info
    fullname TEXT NOT NULL,
    profile_photo TEXT,

    -- verification
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,

    resume TEXT,

    referrals_matched INTEGER DEFAULT 0,
    
    -- timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

    -- prevent duplicate profile per user
    CONSTRAINT unique_jobseeker_per_user UNIQUE (user_id)
);

CREATE TABLE jobseeker_experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jobseeker_id UUID REFERENCES jobseekers(id) ON DELETE CASCADE,

    company TEXT,
    role TEXT,
    start_date DATE,
    end_date DATE,
    description TEXT
);

CREATE TABLE jobseeker_education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jobseeker_id UUID REFERENCES jobseekers(id) ON DELETE CASCADE,

    institution TEXT,
    degree TEXT,
    field_of_study TEXT,
    start_year INTEGER,
    end_year INTEGER
);

CREATE TABLE jobseeker_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jobseeker_id UUID REFERENCES jobseekers(id) ON DELETE CASCADE,

    skill_name TEXT
);

CREATE TABLE jobseeker_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jobseeker_id UUID REFERENCES jobseekers(id) ON DELETE CASCADE,

    title TEXT,
    description TEXT,
    project_url TEXT
);

CREATE TABLE jobseeker_certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    jobseeker_id UUID REFERENCES jobseekers(id) ON DELETE CASCADE,

    name TEXT,
    issuer TEXT,
    issue_date DATE
);