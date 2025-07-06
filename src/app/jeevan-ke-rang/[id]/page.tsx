// src/app/jeevan-ke-rang/[id]/page.tsx

interface JeevanKeRangDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JeevanKeRangDetailPage({ params }: JeevanKeRangDetailPageProps) {
  const { id } = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Jeevan Ke Rang - {id}</h1>
      {/* बाकी आपका कोड यहाँ */}
    </div>
  );
}