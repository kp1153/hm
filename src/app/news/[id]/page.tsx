import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

interface NewsDetailProps {
  params: { id: string };
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { id } = params;

  // Supabase से खबर लाएँ
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">खबर नहीं मिली</h1>
        <Link href="/news" className="text-blue-600 hover:underline">← सभी खबरें देखें</Link>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link href="/news" className="text-blue-600 hover:underline text-sm">← सभी खबरें</Link>
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <div className="text-sm text-gray-500 mb-2">{data.category}</div>
      {data.image_url && (
        <img src={data.image_url} alt={data.caption || data.title} className="max-h-80 rounded mb-2" />
      )}
      {data.caption && (
        <div className="text-xs text-gray-600 italic mb-2">{data.caption}</div>
      )}
      <div className="mb-4 whitespace-pre-line">{data.content}</div>
      <div className="text-xs text-gray-400 mt-2">
        प्रकाशित: {new Date(data.created_at).toLocaleString()}
      </div>
    </main>
  );
}
