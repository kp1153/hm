// app/news/[id]/page.tsx (NO "use client")
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params; // Next.js 15 में params Promise होता है
  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <h1>News Detail Page</h1>
      <p>News ID: {id}</p>
    </div>
  );
}