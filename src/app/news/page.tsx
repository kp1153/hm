import { supabase } from "@/lib/supabaseClient";

export default async function NewsPage() {
  // अपनी खबरें और image_url डेटाबेस से fetch करें
  const { data: newsList } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-3xl mx-auto p-4 min-h-screen bg-white text-indigo-700">
      <h1 className="text-3xl font-bold mb-6">न्यूज</h1>
      <ul className="space-y-4">
        {newsList?.map((item) => (
          <li key={item.id} className="border p-4 rounded shadow bg-white">
            {/* हेडिंग इंडिगो रंग में */}
            <h2 className="text-xl font-semibold text-red-600">{item.title}</h2>
            {/* खबर नीले रंग में */}
            <p className="text-blue-600 whitespace-pre-line">{item.content}</p>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.title}
                className="mt-2 max-h-48 object-cover rounded"
              />
            )}
          </li>
        ))}
      </ul>
      {(!newsList || newsList.length === 0) && (
        <p className="text-center text-gray-500 mt-8">कोई खबर उपलब्ध नहीं है।</p>
      )}
    </main>
  );
}
