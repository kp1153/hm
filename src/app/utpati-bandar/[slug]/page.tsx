import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

// पोस्ट का टाइप
type Post = {
  id: number;
  slug: string;
  title: string;
  content: string;
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

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // Supabase से पोस्ट फेच करें (news टेबल से)
  const { data: post, error } = await supabase
    .from('news') // ✅ आपकी टेबल का सही नाम
    .select('*')
    .eq('slug', slug)
    .single<Post>();

  if (error || !post) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center text-gray-500">
        <h1 className="text-2xl font-bold mb-4">खबर नहीं मिली</h1>
        <p>यह खबर उपलब्ध नहीं है।</p>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto py-10 px-4 bg-white rounded-lg shadow-md">
      {/* हेडलाइन */}
      <h1 className="text-3xl font-extrabold mb-4 text-gray-900 leading-tight">
        {post.title}
      </h1>
      {/* रिपोर्टर और तारीख */}
      <div className="flex items-center gap-2 mb-6 text-gray-500 text-sm">
        <span>By {post.author || 'डेस्क'}</span>
        <span>•</span>
        <span>
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString('hi-IN', { dateStyle: 'long' })
            : ''}
        </span>
      </div>
      {/* मुख्य इमेज */}
      {post.image_url && (
        <div className="mb-6">
          <Image
            src={post.image_url}
            alt={post.title}
            width={720}
            height={400}
            className="rounded-md object-cover w-full"
            priority
          />
        </div>
      )}
      {/* खबर का मुख्य कंटेंट */}
      <div
        className="prose prose-lg prose-blue max-w-none text-gray-800"
        style={{ fontFamily: 'Hind, Arial, sans-serif' }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      {/* कैटेगरी */}
      {post.category && (
        <div className="mt-8 text-xs text-blue-600 uppercase tracking-wider">
          {post.category}
        </div>
      )}
    </article>
  );
}
