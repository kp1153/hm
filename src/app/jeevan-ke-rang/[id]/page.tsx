import { notFound } from 'next/navigation';
import { jeevanKeRangData } from '@/data/jeevanKeRang';

interface JeevanKeRangDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JeevanKeRangDetailPage({ params }: JeevanKeRangDetailPageProps) {
  const { id } = await params;
  
  const post = jeevanKeRangData.find(post => post.id === id);
  
  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 mb-4">
          <span>{post.date}</span>
        </div>
        <div className="prose max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}