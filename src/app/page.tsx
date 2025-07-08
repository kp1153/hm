import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

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
    case 'कोडिंग की दुनिया':
      return 'coding-ki-duniya';
    case 'प्रतिरोध':
      return 'pratirodh';
    case 'देश-विदेश':
      return 'desh-videsh';
    case 'जीवन के रंग':
      return 'jeevan-ke-rang';
    default:
      return 'news'; // fallback
  }
}

export default async function HomePage() {
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return <p className="text-red-600">Error loading news: {error.message}</p>;
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
      <div className="max-w-5xl mx-auto space-y-12">
        {allNews.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            {/* कैटेगरी */}
            <div className="flex items-center mb-4">
              <span className="bg-red-100 text-red-800 border border-red-300 px-3 py-1 rounded-full text-sm font-medium">
                {news.category}
              </span>
            </div>

            {/* शीर्षक लिंक */}
            <Link href={`/${getCategoryPath(news.category)}/${news.slug}`}>
              <h2 className="text-2xl font-bold text-blue-700 hover:underline mb-2 cursor-pointer">
                {news.title}
              </h2>
            </Link>

            {/* तारीख */}
            <p className="text-sm text-gray-500 mb-4">
              🕐 {formatDate(news.created_at)}
            </p>

            {/* छवि */}
            {news.image_url && (
              <div className="mb-4 relative w-full h-64 md:h-96 rounded overflow-hidden">
                <Image
                  src={news.image_url.trim()}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* कैप्शन */}
            {news.caption && (
              <p className="text-xs text-center italic text-gray-600 mb-4">
                {news.caption}
              </p>
            )}

            {/* कंटेंट */}
            <div className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base md:text-lg">
              {news.content}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
