import { supabase } from '@/lib/supabaseClient';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url?: string | null;
  caption?: string;
  created_at?: string;
  slug: string;
  views?: number;
}

// सभी news fetch करने के लिए (होम पेज के लिए)
export async function fetchNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching news:', error);
    return [];
  }
  return data || [];
}

// slug के आधार पर news fetch (डिटेल पेज)
export async function fetchNewsBySlug(slug: string): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching news by slug:', error);
    return null;
  }
  return data;
}

// ✅ category और slug दोनों से news fetch (safe for category routes)
export async function fetchNewsBySlugAndCategory(
  slug: string,
  category: string
): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('category', category)
    .single();

  if (error || !data) {
    console.error('Error fetching news by slug and category:', error);
    return null;
  }
  return data;
}

// category के आधार पर news fetch
export async function fetchNewsByCategory(category: string): Promise<NewsItem[]> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching news by category:', error);
    return [];
  }
  return data || [];
}

// id के आधार पर news fetch (edit के लिए)
export async function getNewsById(id: number): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching news by ID:', error);
    return null;
  }
  return data;
}

// news को update करने के लिए
export async function updateNews(id: string, newData: Partial<NewsItem>): Promise<boolean> {
  const { error } = await supabase
    .from('news')
    .update(newData)
    .eq('id', id);

  if (error) {
    console.error('Error updating news:', error);
    return false;
  }
  return true;
}

// news को delete करने के लिए
export async function deleteNews(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting news:', error);
    return false;
  }
  return true;
}
