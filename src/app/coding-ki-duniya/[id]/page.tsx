interface CodingKiDuniyaDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CodingKiDuniyaDetailPage({ params }: CodingKiDuniyaDetailPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Coding Ki Duniya - {id}</h1>
     
    </div>
  );
}