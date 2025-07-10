import Link from "next/link";
import { getNewsByCategory } from "@/lib/newsService";

export default async function PratirodhPage() {
  // "प्रतिरोध" कैटेगरी वाली पोस्टें सीधे लाओ
  const posts = await getNewsByCategory("प्रतिरोध");

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">प्रतिरोध</h1>
      <ul className="space-y-4">
        {posts.map((item) => (
          <li key={item.id} className="bg-white p-4 rounded shadow">
            <Link href={`/pratirodh/${item.slug}`}>
              <h2 className="text-xl font-semibold text-red-600 hover:underline cursor-pointer">
                {item.title}
              </h2>
            </Link>
            <p className="mt-2 text-blue-700">{item.content}</p>
          </li>
        ))}
      </ul> 
    </main>
  );
}
