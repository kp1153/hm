'use client';
import { useState } from "react";
import { deleteNews } from "@/lib/newsService";
import { useRouter } from "next/navigation";

export default function NewsActions({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('क्या आप सच में डिलीट करना चाहते हैं?')) return;
    setLoading(true);
    try {
      await deleteNews(id);
      router.refresh();
    } catch (error) {
      alert("Error deleting news!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline ml-4"
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
