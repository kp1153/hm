import { fetchNews } from "@/lib/newsService";
import NewsList from "@/components/NewsList";

export const revalidate = 0;

// ✅ यहीं पर सही टाइप बनाओ — slug REQUIRED है
type News = {
  id: string;
  title: string;
  content: string;
  slug: string;
  category: string;
  image_url?: string;
  created_at: string;
};

export default async function HomePage() {
  const rawNews = await fetchNews();

  // ✅ Filter करके सिर्फ उन्हीं items को रखो जिनमें slug मौजूद है
  const filteredNews = rawNews.filter(
    (item): item is News => typeof item.slug === "string"
  );

  return (
    <main className="max-w-4xl mx-auto p-4">
      <NewsList news={filteredNews} />
    </main>
  );
}
