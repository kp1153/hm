interface NewsDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">News - {id}</h1>
    
    </div>
  );
}