// src/app/utpati-bandar/[slug]/page.tsx

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Page for: {slug}</h1>
    </div>
  );
}