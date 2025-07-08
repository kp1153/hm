import ViewTracker from '@/components/ViewTracker';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchNewsBySlugAndCategory } from '@/lib/newsService'; // ✅ नया import
type NewsItem = {
  id: string;
  slug: string;
  title: string;
  content: string;
  category: string;
  image_url?: string;
  caption?: string;
  created_at: string;
  views?: number; // 👈 यह लाइन व्यू काउंट के लिए जरूरी है
};


export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // ✅ category के साथ fetch
  const news = await fetchNewsBySlugAndCategory(slug, 'प्रतिरोध');

  if (!news) notFound();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
    <ViewTracker slug={news.slug} />
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-sm font-medium">
              {news.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{news.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <span className="mr-1">🕐</span>{formatDate(news.created_at)}
            </div>
          </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{news.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center"><span className="mr-1">🕐</span>{formatDate(news.created_at)}</div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
  👁 {news.views || 0} बार देखा गया
</p>
          {news.image_url && (
            <div className="mb-6">
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src={news.image_url.trimEnd()}
                  alt={news.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {news.caption && (
                <p className="text-sm text-gray-600 mt-2 text-center italic">
                  {news.caption}
                </p>
              )}
            </div>
          )}
          <div className="text-gray-800 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
            {news.content}
          </div>
        </div>
      </div>
    </main>
     </>
  );
}
