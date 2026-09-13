-- ==============================================================================
-- Evergreen Jobs Database Freshness Maintenance Script (Supabase / PostgreSQL)
-- ==============================================================================
-- Description:
-- Keeps active hiring postings fresh by normalizing raw created_at / updated_at
-- timestamps on positions older than 30 days. Prevents search engine algorithmic
-- anti-spam drops on continuous recruitment postings.
-- ==============================================================================

-- 1. Create maintenance function
CREATE OR REPLACE FUNCTION public.refresh_evergreen_jobs_timestamps()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Update created_at to 3 days prior for active jobs older than 30 days
    UPDATE public.jobs
    SET created_at = (now() - INTERVAL '3 days')
    WHERE is_active = true
      AND created_at < (now() - INTERVAL '30 days');
END;
$$;

-- Grant execution permissions
GRANT EXECUTE ON FUNCTION public.refresh_evergreen_jobs_timestamps() TO postgres, authenticated, service_role;

-- 2. Optional: Schedule recurring execution with pg_cron (if pg_cron extension enabled in Supabase)
-- Runs every Sunday at 00:00 UTC
/*
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
    'evergreen-jobs-weekly-refresh',
    '0 0 * * 0', -- Every Sunday at midnight
    $$SELECT public.refresh_evergreen_jobs_timestamps()$$
);
*/
