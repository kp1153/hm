import NewsForm from '@/components/NewsForm';

export default function AdminPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add News</h1>
      <NewsForm />
    </main>
  );
}
