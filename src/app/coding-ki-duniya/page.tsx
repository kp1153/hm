import Link from "next/link";
import { getNewsByCategory } from "@/lib/newsService";

export default async function CodingKiDuniyaPage() {
  // केवल "कोडिंग की दुनिया" कैटेगरी वाली पोस्टें लाओ
  const posts = (await getNewsByCategory("कोडिंग की दुनिया")) || [];

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">कोडिंग की दुनिया</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">कोई पोस्ट उपलब्ध नहीं है।</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded shadow">
              <Link href={`/coding-ki-duniya/${item.slug}`}>
                <h2 className="text-xl font-semibold text-red-600 hover:underline cursor-pointer">
                  {item.title}
                </h2>
              </Link>
              <p className="mt-2 text-blue-700">{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
