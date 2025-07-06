// app/coding-ki-duniya/[slug]/page.tsx (NO "use client")
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CodingKiDuniyaDetailPage({ params }: PageProps) {
  const { slug } = await params; // Next.js 15 में params Promise होता है
  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <h1>Coding Ki Duniya Detail Page</h1>
      <p>Slug: {slug}</p>
    </div>
  );
}