'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getNewsById, updateNews } from "@/lib/newsService";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    getNewsById(id).then(news => {
      if (news) {
        setTitle(news.title);
        setContent(news.content);
        setImageUrl(news.image_url || "");
        setCategory(news.category);
      }
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateNews(id, { title, content, image_url, category });
    router.push("/");
  };

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">खबर एडिट करें</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2 rounded"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          className="w-full border p-2 rounded"
          value={image_url}
          onChange={e => setImageUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2 rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </main>
  );
}
