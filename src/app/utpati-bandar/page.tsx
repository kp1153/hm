import Link from "next/link";
import { fetchNews } from "@/lib/newsService";

export default async function UtpatiBandarPage() {
  // सभी पोस्ट लाओ
  const allPosts = await fetchNews();
  // सिर्फ "उत्पाती बंदर" कैटेगरी वाली पोस्टें फ़िल्टर करो
  const posts = allPosts.filter(item => item.category === "उत्पाती बंदर");

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">उत्पाती बंदर</h1>
      <ul className="space-y-4">
        {posts.map((item) => (
          <li key={item.id} className="bg-white p-4 rounded shadow">
            <Link href={`/utpati-bandar/${item.id}`}>
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