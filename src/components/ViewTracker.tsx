'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return; // 👈 यह चेक नई लाइन है, ताकि slug अगर undefined हो तो query ना चले

    const incrementViews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('views')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        console.error('Error fetching views:', error);
        return;
      }

      const currentViews = data.views || 0;

      const { error: updateError } = await supabase
        .from('news')
        .update({ views: currentViews + 1 })
        .eq('slug', slug);

      if (updateError) {
        console.error('Error updating views:', updateError);
      }
    };

    incrementViews();
  }, [slug]);

  return null;
}
