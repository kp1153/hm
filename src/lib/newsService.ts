import supabase from './supabaseClient';

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  content: string;
  image_url?: string;
  caption?: string;
  created_at: string;
  category: string;
  author?: string;
  published: boolean;
  views?: number;
}

// 1. कैटेगरी से न्यूज़ लाने के लिए
export async function getNewsByCategory(category: string): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('category', category)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching news by category:', error.message);
    return [];
  }

  return data ?? []; // fallback in case of null
}

// 2. न्यूज़ डिलीट करने के लिए
export async function deleteNews(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id);
  
  return { error };
}

// 3. स्लग और कैटेगरी से न्यूज़ लाने के लिए (सुरक्षित)
export async function fetchNewsBySlugAndCategory(
  slug: string,
  category: string
): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('category', category)
    .eq('published', true)
    .maybeSingle(); // 👈 use safe fallback

  if (error) {
    console.error('Error fetching news by slug and category:', error.message);
    return null;
  }

  return data ?? null;
}
