import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { fetchNewsBySlug } from '@/lib/newsService';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 0;

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const news = await fetchNewsBySlug(slug);
  if (!news) {
    notFound();
  }

  const formatDate = (dateString: string) => {
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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-red-600">होम</Link>
            <span>/</span>
            <Link href={`/${news.category?.toLowerCase().replace(/\s/g, '-')}`} className="hover:text-red-600">
              {news.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{news.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-sm font-medium">
                {news.category}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{news.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center"><span className="mr-1">🕐</span>{formatDate(news.created_at || '')}</div>
              <div className="flex items-center"><span className="mr-1">👁️</span>पढ़ा गया</div>
              <div className="flex items-center"><span className="mr-1">📤</span>साझा करें</div>
            </div>
            {news.image_url && (
              <div className="mb-6">
                <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image src={news.image_url.trimEnd()} alt={news.title} fill className="object-cover" priority />
                </div>
                {news.caption && <p className="text-sm text-gray-600 mt-2 text-center italic">{news.caption}</p>}
              </div>
            )}
            <div className="text-gray-800 leading-relaxed text-base md:text-lg whitespace-pre-wrap">
              {news.content}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">इस खबर को साझा करें</h3>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"><span className="mr-2">📘</span>Facebook</button>
              <button className="flex items-center px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"><span className="mr-2">🐦</span>Twitter</button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"><span className="mr-2">📱</span>WhatsApp</button>
              <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"><span className="mr-2">🔗</span>Copy Link</button>
            </div>
          </div>

          <div className="text-center">
            <Link
              href={`/${news.category?.toLowerCase().replace(/\s/g, '-')}`}
              className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              ← {news.category} में वापस जाएं
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}