'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const categories = [
  'राष्ट्रीय',
  'अंतरराष्ट्रीय',
  'खेल',
  'मनोरंजन',
  'टेक्नोलॉजी',
  'जीवन के रंग',
  'कोडिंग की दुनिया',
];

export default function NewsForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Image upload handler (Supabase storage)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from('news-images')
      .upload(fileName, file);
    if (error) {
      setMessage('Image upload error: ' + error.message);
      setLoading(false);
      return;
    }
    const { data: publicUrlData } = supabase.storage
      .from('news-images')
      .getPublicUrl(fileName);
    setImageUrl(publicUrlData.publicUrl);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = await supabase.from('news').insert([
      { title, content, category, image_url: imageUrl, caption },
    ]);
    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('News added successfully!');
      setTitle('');
      setContent('');
      setCategory('');
      setImageUrl('');
      setCaption('');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">शीर्षक</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">कैटेगरी</label>
        <select
          className="w-full border rounded p-2"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">--चुनें--</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">खबर</label>
        <textarea
          className="w-full border rounded p-2"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">तस्वीर</label>
        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={handleImageUpload}
        />
        {imageUrl && (
          <img src={imageUrl} alt="Preview" className="mt-2 max-h-40 rounded" />
        )}
      </div>
      <div>
        <label className="block mb-1 font-medium">कैप्शन</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={caption}
          onChange={e => setCaption(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add News'}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
