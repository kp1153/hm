import { supabase } from "./supabaseClient";

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  category: string;
  created_at: string;
};

export async function fetchNews(category?: string): Promise<NewsItem[]> {
  let query = supabase
    .from("news")
    .select("id, title, content, image_url, category, created_at");
  if (category) {
    query = query.eq("category", category);
  }
  query = query.order("created_at", { ascending: false });
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const { data, error } = await supabase
    .from("news")
    .select("id, title, content, image_url, category, created_at")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function addNews(news: Omit<NewsItem, "id" | "created_at">): Promise<void> {
  const { error } = await supabase.from("news").insert([news]);
  if (error) throw error;
}

export async function updateNews(id: string, updates: Partial<NewsItem>): Promise<void> {
  const { error } = await supabase.from("news").update(updates).eq("id", id);
  if (error) throw error;
}

export async function deleteNews(id: string): Promise<void> {
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) throw error;
}
