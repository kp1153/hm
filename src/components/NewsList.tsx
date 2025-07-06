'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url?: string;
  caption?: string;
  created_at?: string;
  slug?: string; // स्लग भी रखें
}

export default function NewsList({ news }: { news: NewsItem[] }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if (diffHours < 24) {
      return `${diffHours} घंटे पहले`;
    } else {
      return date.toLocaleDateString('hi-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'न्यूज': 'bg-red-50 text-red-700 border-red-200',
      'जीवन के रंग': 'bg-pink-50 text-pink-700 border-pink-200',
      'कोडिंग की दुनिया': 'bg-blue-50 text-blue-700 border-blue-200',
      'उत्पाती बंदर': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    };
    return (
      colors[category as keyof typeof colors] ||
      'bg-gray-50 text-gray-700 border-gray-200'
    );
  };

  if (!news || news.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-gray-500">
          <p className="text-lg">कोई समाचार उपलब्ध नहीं है</p>
        </div>
      </div>
    );
  }

  const featuredNews = news[0];
  const otherNews = news.slice(1);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured News Section */}
      {featuredNews && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1 h-6 bg-blue-600 mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-900">मुख्य समाचार</h2>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="lg:flex">
              {featuredNews.image_url && (
                <div className="lg:w-2/5">
                  <Image
                    src={featuredNews.image_url}
                    alt={featuredNews.title}
                    width={600}
                    height={400}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
              )}
              <div className="lg:w-3/5 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                      featuredNews.category
                    )}`}
                  >
                    {featuredNews.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span className="mr-1">🕐</span>
                    {formatDate(featuredNews.created_at || '')}
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight hover:text-blue-600 transition-colors cursor-pointer">
                  {featuredNews.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  {featuredNews.content.length > 200
                    ? featuredNews.content.substring(0, 200) + '...'
                    : featuredNews.content}
                </p>
                <div className="flex items-center justify-between">
                  {/* पूरी खबर पढ़ें लिंक */}
                  <Link href={`/utpati-bandar/${featuredNews.slug || featuredNews.id}`}>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium group">
                      पूरी खबर पढ़ें
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </Link>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-500 hover:text-gray-700 text-sm transition-colors">
                      <span className="mr-1">👁️</span>
                      पढ़ें
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-gray-700 text-sm transition-colors">
                      <span className="mr-1">📤</span>
                      साझा करें
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other News Section */}
      {otherNews.length > 0 && (
        <div>
          <div className="flex items-center mb-6">
            <div className="w-1 h-6 bg-gray-600 mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-900">अन्य समाचार</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherNews.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                {item.image_url && (
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium border backdrop-blur-sm bg-white/90 ${getCategoryColor(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  {!item.image_url && (
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span className="mr-1">🕐</span>
                        {formatDate(item.created_at || '')}
                      </div>
                    </div>
                  )}

                  {/* टाइटल को भी लिंक बनाएं */}
                  <Link href={`/utpati-bandar/${item.slug || item.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {item.content.length > 120
                      ? item.content.substring(0, 120) + '...'
                      : item.content}
                  </p>

                  <div className="flex items-center justify-between">
                    {item.image_url && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <span className="mr-1">🕐</span>
                        {formatDate(item.created_at || '')}
                      </div>
                    )}
                    <div className="flex items-center space-x-3 ml-auto">
                      <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm transition-colors">
                        <span className="mr-1">👁️</span>
                        पढ़ें
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm transition-colors">
                        <span className="mr-1">📤</span>
                        साझा करें
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Load More Section */}
      {news.length > 6 && (
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
            और खबरें देखें
          </button>
        </div>
      )}
    </div>
  );
}