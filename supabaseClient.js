import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://parpdryxwshgrkobfpgz.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhcnBkcnl4d3NoZ3Jrb2JmcGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzUxOTAsImV4cCI6MjA2MzYxMTE5MH0.LREXU0NWTCvNQXr7K4Mwu9GlS_NIanyR55752AlmW4s';

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);