'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';

type News = {
  id: string;
  slug: string;
  title: string;
  content: string;
  summary?: string;
  image_url?: string;
  author?: string;
  published_at: string;
  category?: string;
  caption?: string;
};

const categories = [
  // "होम",  // "होम" ड्रॉपडाउन में नहीं दिखेगा
  "देश-विदेश",
  "जीवन के रंग",
  "कोडिंग की दुनिया",
  "प्रतिरोध",
  "टीम",
];

const ADMIN_EMAIL = 'prasad.kamta@gmail.com';

export default function NewsForm() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [newsList, setNewsList] = useState<News[]>([]); 
  const [editId, setEditId] = useState<string | null>(null);


  useEffect(() => {
    let ignore = false;
    supabase.auth.getUser().then(({ data }) => {
      if (!ignore) {
        setUser(data?.user ?? null);
        setLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      ignore = true;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const fetchNews = async () => {
    // सभी खबरें लाओ (कोई filter नहीं), ताकि होम पेज पर सभी दिखें
    const { data, error } = await supabase.from('news').select('*').order('id', { ascending: false });
    if (!error) setNewsList((data as News[]) || []);
  };

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) fetchNews();
  }, [user]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoginMessage('');
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });
      if (error) {
        setLoginMessage('Login failed: ' + error.message);
      } else if (data?.user?.email !== ADMIN_EMAIL) {
        setLoginMessage('Unauthorized: केवल एडमिन लॉगिन कर सकता है।');
        await supabase.auth.signOut();
      } else {
        setLoginMessage('Login successful!');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginMessage('Login में त्रुटि: ' + error.message);
      } else {
        setLoginMessage('Login में अज्ञात त्रुटि');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setLoginMessage('Logged out.');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormLoading(true);
    setMessage('फोटो अपलोड हो रही है...');
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('news-images').upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage.from('news-images').getPublicUrl(fileName);
      if (publicUrlData?.publicUrl) {
        setImageUrl(publicUrlData.publicUrl);
        setMessage('फोटो सफलतापूर्वक अपलोड हो गई!');
      } else {
        throw new Error('Public URL नहीं मिल सका');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage('फोटो अपलोड में एरर: ' + error.message);
      } else {
        setMessage('फोटो अपलोड में अज्ञात एरर');
      }
      setImageUrl('');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (news: News) => {
    setEditId(news.id);
    setTitle(news.title);
    setContent(news.content);
    setCategory(news.category || '');
    setImageUrl(news.image_url || '');
    setCaption(news.caption || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('क्या आप सच में डिलीट करना चाहते हैं?')) return;
    setFormLoading(true);
    try {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw error;
      setMessage('खबर डिलीट हो गई!');
      setNewsList(newsList.filter((n) => n.id !== id));
      if (editId === id) {
        setEditId(null);
        setTitle('');
        setContent('');
        setCategory('');
        setImageUrl('');
        setCaption('');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage('Error: ' + error.message);
      } else {
        setMessage('Unknown error');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage('');
    try {
      // "होम" कैटेगरी में खबर सेव करने से रोकें
      if (category === "होम") {
        setMessage('"होम" कैटेगरी में खबर सेव नहीं कर सकते।');
        setFormLoading(false);
        return;
      }
      if (editId) {
        const { error } = await supabase.from('news').update({
          title, content, category, image_url: imageUrl, caption
        }).eq('id', editId);
        if (error) throw error;
        setMessage('खबर अपडेट हो गई!');
      } else {
        try {
          const { data, error } = await supabase.from("news").insert([
            { title, content, category, image_url: imageUrl, caption },
          ]);
          if (error) {
            console.error("❌ Supabase insert error:", error);
            alert("खबर सेव नहीं हो पाई। Console देखें।");
            return;
          }
          console.log("✅ खबर सेव हो गई:", data);
          setMessage('News added successfully!');
        } catch (err) {
          console.error("❌ Unknown JS error:", err);
          alert("अज्ञात त्रुटि आई है। Console देखें।");
          return;
        }
      }
      setTitle('');
      setContent('');
      setCategory('');
      setImageUrl('');
      setCaption('');
      setEditId(null);
      fetchNews();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage('Error: ' + error.message);
      } else {
        setMessage('Unknown error');
      }
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><div className="text-lg">Loading...</div></div>;
  if (!user || user.email !== ADMIN_EMAIL) return <div>Unauthorized</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* लॉगिन, फॉर्म आदि */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-1 font-bold">शीर्षक</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded p-2" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">विवरण</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full border rounded p-2" rows={4} required />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">कैटेगरी</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border rounded p-2" required>
            <option value="">कैटेगरी चुनें</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">फोटो</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
          {imageUrl && (
            <div className="mt-2">
              <Image src={imageUrl} alt="खबर फोटो" width={200} height={120} className="rounded" />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">कैप्शन</label>
          <input type="text" value={caption} onChange={e => setCaption(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={formLoading}>
          {editId ? 'अपडेट करें' : 'सेव करें'}
        </button>
        {message && <div className="mt-2 text-center text-green-600">{message}</div>}
      </form>

      {/* खबरों की लिस्ट */}
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">सभी खबरें</h2>
        <ul>
          {newsList.map(news => (
            <li key={news.id} className="border-b py-4 flex items-start gap-4">
              {news.image_url && (
                <Image src={news.image_url} alt={news.title} width={100} height={60} className="rounded" />
              )}
              <div className="flex-1">
                <div className="font-bold">{news.title}</div>
                <div className="text-sm text-gray-600">{news.category}</div>
                {/* पूरा content दिखाएँ */}
                <div className="text-gray-800 whitespace-pre-line">{news.content}</div>
                {news.caption && <div className="text-xs text-gray-500 mt-1">{news.caption}</div>}
                <div className="mt-2 flex gap-2">
                  <button onClick={() => handleEdit(news)} className="text-blue-600 underline">Edit</button>
                  <button onClick={() => handleDelete(news.id)} className="text-red-600 underline">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
