-- Add skills field to projects, experience, education, and certifications tables

-- Projects already has tags field which can be used for skills
-- No change needed for projects table

-- Add skills field to experience table
ALTER TABLE public.experience ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}';

-- Add skills field to education table
ALTER TABLE public.education ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}';

-- Add skills field to certifications table
ALTER TABLE public.certifications ADD COLUMN IF NOT EXISTS skills TEXT[] DEFAULT '{}';
