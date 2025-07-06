// app/news/[id]/page.tsx (NO "use client")
export default async function NewsDetailPage({ params }) {
  const { id } = params; // params अब Promise नहीं, डायरेक्ट object मिलता है
  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700">News - {id}</h1>
    </div>
  );
}
