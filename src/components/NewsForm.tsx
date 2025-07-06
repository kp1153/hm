'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const categories = [
  "होम",
  "न्यूज",
  "जीवन के रंग",
  "कोडिंग की दुनिया",
  "उत्पाती बंदर",
  "टीम",
];

const ADMIN_EMAIL = 'prasad.kamta@gmail.com';

export default function NewsForm() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  // News form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState('');

  // News list & edit states
  const [newsList, setNewsList] = useState([]);
  const [editId, setEditId] = useState(null);

  // On mount: check user
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

  // Fetch news for admin
  const fetchNews = async () => {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('id', { ascending: false });
    if (!error) setNewsList(data || []);
  };

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) fetchNews();
  }, [user]);

  // Login handler
  const handleLogin = async (e) => {
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
    } catch (error) {
      setLoginMessage('Login में त्रुटि: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setLoginMessage('Logged out.');
  };

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormLoading(true);
    setMessage('फोटो अपलोड हो रही है...');
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (uploadError) throw uploadError;
      const { data: publicUrlData } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);
      if (publicUrlData?.publicUrl) {
        setImageUrl(publicUrlData.publicUrl);
        setMessage('फोटो सफलतापूर्वक अपलोड हो गई!');
      } else {
        throw new Error('Public URL नहीं मिल सका');
      }
    } catch (error) {
      setMessage('फोटो अपलोड में एरर: ' + error.message);
      setImageUrl('');
    } finally {
      setFormLoading(false);
    }
  };

  // Edit handler: fill form with news data
  const handleEdit = (news) => {
    setEditId(news.id);
    setTitle(news.title);
    setContent(news.content);
    setCategory(news.category);
    setImageUrl(news.image_url || '');
    setCaption(news.caption || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete handler
  const handleDelete = async (id) => {
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
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setFormLoading(false);
    }
  };

  // News submit handler (add/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage('');
    try {
      if (editId) {
        // Update
        const { error } = await supabase.from('news').update({
          title, content, category, image_url: imageUrl, caption
        }).eq('id', editId);
        if (error) throw error;
        setMessage('खबर अपडेट हो गई!');
      } else {
        // Insert
        const { error } = await supabase.from('news').insert([
          { title, content, category, image_url: imageUrl, caption },
        ]);
        if (error) throw error;
        setMessage('News added successfully!');
      }
      setTitle('');
      setContent('');
      setCategory('');
      setImageUrl('');
      setCaption('');
      setEditId(null);
      fetchNews();
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">एडमिन लॉगिन</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ईमेल
              </label>
              <input
                type="email"
                placeholder="ईमेल दर्ज करें"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-600"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                पासवर्ड
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="पासवर्ड दर्ज करें"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-600"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((s) => !s);
                  }}
                  className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              disabled={loading}
            >
              {loading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें'}
            </button>
            {loginMessage && (
              <div className={`p-3 rounded-md text-sm ${
                loginMessage.includes('successful') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {loginMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">एडमिन पैनल</h2>
          <button 
            onClick={handleLogout} 
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Logout
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              शीर्षक
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              कैटेगरी
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">--चुनें--</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              खबर
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px] text-blue-600"
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              तस्वीर
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-600"
              onChange={handleImageUpload}
              disabled={formLoading}
            />
            {imageUrl && (
              <div className="mt-3">
                <Image 
                  src={imageUrl} 
                  alt="Preview" 
                  className="max-h-48 rounded-md border border-gray-300 shadow-sm"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Image URL: {imageUrl}
                </p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              कैप्शन
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-blue-600"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            disabled={formLoading}
          >
            {formLoading ? (editId ? 'Updating...' : 'Saving...') : (editId ? 'Update News' : 'Add News')}
          </button>
          {editId && (
            <button
              type="button"
              className="w-full mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none"
              onClick={() => {
                setEditId(null);
                setTitle('');
                setContent('');
                setCategory('');
                setImageUrl('');
                setCaption('');
              }}
              disabled={formLoading}
            >
              एडिट कैंसिल करें
            </button>
          )}
          {message && (
            <div className={`p-3 rounded-md text-sm ${
              message.includes('Error') || message.includes('एरर') 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}
        </form>

        {/* News List */}
        <div className="my-8">
          <h3 className="text-lg font-bold mb-2">सारी खबरें</h3>
          <ul>
            {newsList.map(news => (
              <li key={news.id} className="mb-6 border-b pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    {/* हेडिंग को लाल रंग में */}
                    <span className="font-semibold text-red-600">{news.title}</span>
                    <span className="ml-2 text-gray-500 text-xs">({news.category})</span>
                  </div>
                  <div>
                    <button
                      className="text-sm text-yellow-700 mr-2 underline"
                      onClick={() => handleEdit(news)}
                      disabled={formLoading}
                    >Edit</button>
                    <button
                      className="text-sm text-red-700 underline"
                      onClick={() => handleDelete(news.id)}
                      disabled={formLoading}
                    >Delete</button>
                  </div>
                </div>
                {news.image_url && (
                  <img src={news.image_url} alt="Image" className="max-h-32 mt-2 rounded" />
                )}
                {/* खबर को नीले रंग में */}
                <div className="text-sm mt-2 whitespace-pre-line text-blue-600">{news.content}</div>
                {news.caption && (
                  <div className="text-xs text-gray-500 mt-1">कैप्शन: {news.caption}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
