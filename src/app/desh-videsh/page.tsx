import Link from "next/link";
import { getNewsByCategory } from "@/lib/newsService";

export default async function DeshVideshPage() {
  // "देश-विदेश" कैटेगरी वाली पोस्टें सीधे लाओ
  const posts = await getNewsByCategory("देश-विदेश");

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">देश-विदेश</h1>
      <ul className="space-y-4">
        {posts.map((item) => (
          <li key={item.id} className="bg-white p-4 rounded shadow">
            <Link href={`/news/${item.slug}`}>
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
