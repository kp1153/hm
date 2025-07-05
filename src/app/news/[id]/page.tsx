import { notFound } from 'next/navigation';
import { newsData } from '@/data/news';

interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  
  const newsItem = newsData.find(item => item.id === id);
  
  if (!newsItem) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {newsItem.category}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
        
        <div className="text-gray-600 mb-6">
          <span>{newsItem.date}</span>
          <span className="mx-2">•</span>
          <span>{newsItem.author}</span>
        </div>
        
        <img 
          src={newsItem.image} 
          alt={newsItem.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        
        <div className="prose max-w-none">
          {newsItem.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}