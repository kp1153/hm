import { fetchNews } from "@/lib/newsService";

export default async function JeevanKeRangPage() {
  // सभी पोस्ट लाओ
  const allPosts = await fetchNews();
  // सिर्फ़ "जीवन के रंग" कैटेगरी वाली पोस्टें फ़िल्टर करो
  const posts = allPosts.filter(item => item.category === "जीवन के रंग");

  return (
    <main className="max-w-3xl mx-auto p-4">

      <ul className="space-y-4">
        {posts.map((item) => (
          <li key={item.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2">{item.content}</p>
          </li>
        ))}
      </ul>
     
    </main>
  );
}
