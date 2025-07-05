'use client';
import { deleteNews } from "@/lib/newsService";
import { useRouter } from "next/navigation";

export default function NewsActions({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteNews(id);
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline ml-4"
    >
      Delete
    </button>
  );
}
