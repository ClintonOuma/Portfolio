import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wkmynkliufzdxzhzkyet.supabase.co';
const supabaseAnonKey = 'sb_publishable_HSXL4Fh4wwV7mrr7-BbOGQ_JxBMGfzH';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
