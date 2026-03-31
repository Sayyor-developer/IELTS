import { createClient } from '@supabase/supabase-js'

// Bularni Supabase Dashboard -> Settings -> API bo'limidan olasan
const supabaseUrl = 'https://guopzecapoxmfnkvhpvc.supabase.co'
const supabaseAnonKey = 'sb_publishable_fCWpiL994ip_ELkrvPFV9g_TSa22QKY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)