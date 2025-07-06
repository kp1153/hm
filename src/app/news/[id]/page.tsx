// src/app/news/[id]/page.tsx

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <h1>News Detail - {id}</h1>
      {/* बाकी आपका कोड यहाँ */}
    </div>
  );
}