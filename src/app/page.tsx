import { fetchNews } from "@/lib/newsService";
import NewsList from "@/components/NewsList";

export const revalidate = 0;

export default async function HomePage() {
  const news = await fetchNews();
  
  return (
    <main className="max-w-4xl mx-auto p-4">
      <NewsList news={news} />
    </main>
  );
}