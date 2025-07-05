import Link from "next/link";
import { fetchNews } from "@/lib/newsService";
import NewsActions from "@/components/NewsActions";

export const revalidate = 0;

export default async function HomePage() {
  const news = await fetchNews();

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">सभी खबरें</h1>
      <Link
        href="/news/create"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-6"
      >
        नई खबर जोड़ें
      </Link>
      <ul className="space-y-4">
        {news.map((item) => (
          <li key={item.id} className="border p-4 rounded shadow">
            <Link href={`/news/${item.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
                {item.title}
              </h2>
            </Link>
            <p className="mt-2">{item.content}</p>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="mt-2 max-h-48 object-cover rounded"
              />
            )}
            <p className="text-sm text-gray-500 mt-2">
              {new Date(item.created_at).toLocaleString()}
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                href={`/news/edit/${item.id}`}
                className="text-green-600 hover:underline"
              >
                Edit
              </Link>
              <NewsActions id={item.id} />
            </div>
          </li>
        ))}
      </ul>
      {news.length === 0 && <p>कोई खबर उपलब्ध नहीं है।</p>}
    </main>
  );
}
