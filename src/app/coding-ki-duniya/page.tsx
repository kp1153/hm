import Link from "next/link";
import { fetchNews } from "@/lib/newsService";

export default async function CodingKiDuniyaPage() {
  // सभी पोस्ट लाओ
  const allPosts = await fetchNews();
  // सिर्फ "कोडिंग की दुनिया" कैटेगरी वाली पोस्टें फ़िल्टर करो
  const posts = allPosts.filter(item => item.category === "कोडिंग की दुनिया");

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">कोडिंग की दुनिया</h1>
      <ul className="space-y-4">
        {posts.map((item) => (
          <li key={item.id} className="border p-4 rounded shadow">
            <Link href={`/coding-ki-duniya/${item.id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
                {item.title}
              </h2>
            </Link>
            <p className="mt-2">{item.content}</p>
          </li>
        ))}
      </ul>
      {posts.length === 0 && <p>कोई पोस्ट उपलब्ध नहीं है।</p>}
    </main>
  );
}
