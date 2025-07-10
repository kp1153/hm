import Link from "next/link";
import supabase from '@/lib/supabaseClient';

export const revalidate = 60;

type NewsItem = {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  image_url?: string;
  caption?: string;
  created_at: string;
};

// कैटेगरी के अनुसार path
function getCategoryPath(category: string): string {
  switch (category) {
    case "कोडिंग की दुनिया":
      return "coding-ki-duniya";
    case "प्रतिरोध":
      return "pratirodh";
    case "देश-विदेश":
      return "desh-videsh";
    case "जीवन के रंग":
      return "jeevan-ke-rang";
    default:
      return "news"; // fallback
  }
}

export default async function HomePage() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return <p className="text-red-600">Error loading news: {error?.message}</p>;
  }

  const allNews = data as NewsItem[];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="bg-gray-50 min-h-screen px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {allNews.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-lg shadow p-4 border border-gray-200"
          >
            {/* कैटेगरी */}
            <div className="text-sm text-red-600 font-semibold mb-1">
              {news.category}
            </div>

            {/* शीर्षक लिंक */}
            <Link href={`/${getCategoryPath(news.category)}/${news.slug}`}>
              <h2 className="text-xl font-bold text-blue-700 hover:underline cursor-pointer">
                {news.title}
              </h2>
            </Link>

            {/* तारीख */}
            <p className="text-xs text-gray-500 mt-1">
              🕐 {formatDate(news.created_at)}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
