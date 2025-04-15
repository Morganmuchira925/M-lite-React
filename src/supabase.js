import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://guaosvftlpuoqfibvemg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1YW9zdmZ0bHB1b3FmaWJ2ZW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MTgwOTMsImV4cCI6MjA2MDI5NDA5M30.Y-7WSWpfRtJ2py0ja9otuXKjz8cMPleqvA249qzU7X8';

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or Key is missing. Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;