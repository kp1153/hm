import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';

// पोस्ट का टाइप
type News = {
  id: number;
  slug: string;
  title: string;
  summary?: string;
  image_url?: string;
  author?: string;
  published_at: string;
  category?: string;
};

// Supabase क्लाइंट
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Page() {
  // Supabase से 'उत्पाती बंदर' कैटेगरी की सभी पोस्ट्स लाएँ
  const { data: posts, error } = await supabase
    .from('news') // ← यहाँ 'posts' की जगह 'news' करें
    .select('*')
    .eq('category', 'उत्पाती बंदर')
    .order('published_at', { ascending: false });

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center text-red-500">
        <h1 className="text-2xl font-bold mb-4">डाटा लोड करने में दिक्कत</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center text-gray-500">
        <h1 className="text-2xl font-bold mb-4">कोई खबर नहीं मिली</h1>
        <p>इस कैटेगरी में अभी कोई खबर उपलब्ध नहीं है।</p>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">
        उत्पाती बंदर : सभी खबरें
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/utpati-bandar/${post.slug}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            {post.image_url && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                {post.title}
              </h2>
              {post.summary && (
                <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                  {post.summary}
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <span>{post.author || 'डेस्क'}</span>
                <span>•</span>
                <span>
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString('hi-IN', { dateStyle: 'long' })
                    : ''}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
