"use client";
import { useState } from "react";
import { supabase } from '@/lib/supabaseClient';

export default function NewsCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    // यूनिक नाम बनाएं, ताकि ओवरराइट न हो
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("news-images")
      .upload(fileName, file);

    if (error) {
      alert("Upload error: " + error.message);
      setUploading(false);
      return;
    }

    // पब्लिक URL निकालें
    const { data } = supabase.storage
      .from("news-images")
      .getPublicUrl(fileName);

    setImageUrl(data.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // यहाँ अपनी खबर डेटाबेस में सेव करें, imageUrl भी साथ में भेजें
    // ...
    alert("खबर सेव हो गई!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-4">
      <input
        type="text"
        placeholder="खबर का शीर्षक"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <textarea
        placeholder="खबर का विवरण"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="border p-2 w-full"
      />
      {uploading && <p>Uploading...</p>}
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="max-h-48 rounded" />
      )}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        खबर सेव करें
      </button>
    </form>
  );
}
