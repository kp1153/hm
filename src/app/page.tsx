import { fetchNews } from "@/lib/newsService";
import NewsList from "@/components/NewsList";

export const revalidate = 0;

// ✅ News टाइप में सभी जरूरी फील्ड्स शामिल हैं, slug REQUIRED है
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
  // सभी खबरें लाओ (fetchNews को SSR compatible रखें)
  const rawNews = await fetchNews();

  // ✅ सिर्फ वे खबरें रखें जिनका slug है (data safety के लिए)
  const filteredNews: News[] = rawNews.filter(
    (item): item is News =>
      typeof item.slug === "string" &&
      typeof item.id === "string" &&
      typeof item.title === "string" &&
      typeof item.content === "string" &&
      typeof item.category === "string" &&
      typeof item.created_at === "string"
  );

  return (
    <main className="max-w-4xl mx-auto p-4">    
      <NewsList news={filteredNews} />
    </main>
  );
}
