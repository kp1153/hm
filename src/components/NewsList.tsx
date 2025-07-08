import Link from 'next/link';
import Image from 'next/image';

interface News {
  id: string;
  title: string;
  content: string;
  slug: string;
  category: string;
  image_url?: string;
  created_at: string;
}

interface NewsListProps {
  news: News[];
}

export default function NewsList({ news }: NewsListProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getCategoryRoute = (category: string): string => {
    const routes: Record<string, string> = {
      'न्यूज़': 'news',
      'जीवन के रंग': 'jeevan-ke-rang',
      'कोडिंग की दुनिया': 'coding-ki-duniya',
      'प्रतिरोध': 'pratirodh',
    };

    return routes[category] || 'news';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">हमारा मोर्चा</h1>

      {news.map((item) => (
        <article
          key={item.id}
          className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center mb-3">
            <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-sm font-medium">
              {item.category}
            </span>
            <span className="ml-4 text-sm text-gray-600">{formatDate(item.created_at)}</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-red-600">
            <Link href={`/${getCategoryRoute(item.category)}/${item.slug}`}>
              {item.title}
            </Link>
          </h2>

          {item.image_url && (
            <div className="mb-4">
              <Image
                src={item.image_url}
                alt={item.title}
                width={400}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
          )}

          <p className="text-gray-700 mb-4 leading-relaxed whitespace-pre-line">
            {item.content}
          </p>

          <Link
            href={`/${getCategoryRoute(item.category)}/${item.slug}`}
            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            इसी पेज पर लिंक से देखें →
          </Link>
        </article>
      ))}
    </div>
  );
}
