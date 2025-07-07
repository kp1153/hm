import Link from "next/link";
import { fetchNews } from "@/lib/newsService";

export default async function JeevanKeRangPage() {
  // सभी पोस्ट लाओ
  const allPosts = await fetchNews();
  // सिर्फ "जीवन के रंग" कैटेगरी वाली पोस्टें फ़िल्टर करो
  const posts = allPosts.filter(item => item.category === "जीवन के रंग");

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">जीवन के रंग</h1>
      <ul className="space-y-4">
        {posts.map((item) => (
          <li key={item.id} className="bg-white p-4 rounded shadow">
            <Link href={`/jeevan-ke-rang/${item.id}`}>
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
