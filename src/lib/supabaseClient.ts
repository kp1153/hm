import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bnyrcyemzfbmihqhuwpt.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJueXJjeWVtemZibWlocWh1d3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDAyOTMsImV4cCI6MjA2NzI3NjI5M30.bN3wLNnbCYH6D2jx7Q1tN288y2d-sM1vOcTaf1LuD5A'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)