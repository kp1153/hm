import { getNewsById } from "@/lib/newsService";
import { notFound } from "next/navigation";

export default async function CodingKiDuniyaDetailPage({ params }) {
  const post = await getNewsById(params.id);

  if (!post || post.category !== "कोडिंग की दुनिया") {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="mb-4 max-h-72 object-cover rounded"
        />
      )}
      <p className="mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">
        {new Date(post.created_at).toLocaleString()}
      </p>
    </main>
  );
}
