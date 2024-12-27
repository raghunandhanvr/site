'use client';

import React, { useEffect, useState } from 'react';
import { trackView, getViews } from '@/app/actions/blog';

interface ViewCounterProps {
  slug: string;
}

export function ViewCounter({ slug }: ViewCounterProps) {
  const [views, setViews] = useState<number>(0);

  useEffect(() => {
    const fetchViews = async () => {
      const initialViews = await getViews(slug);
      setViews(initialViews);

      const hasViewed = sessionStorage.getItem(`viewed:${slug}`);
      if (!hasViewed) {
        const updatedViews = await trackView(slug);
        setViews(updatedViews);
        sessionStorage.setItem(`viewed:${slug}`, 'true');
      }
    };

    fetchViews();
  }, [slug]);

  return (
    <span className="text-sm text-neutral-600 dark:text-neutral-400">
      {views} view{views === 1 ? '' : 's'}
    </span>
  );
}

