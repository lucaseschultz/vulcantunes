'use client';

import { useEffect } from 'react';

interface ProductViewTrackerProps {
  productId: number;
}

export default function ProductViewTracker({ productId }: ProductViewTrackerProps) {
  useEffect(() => {
    const incrementViewCount = async () => {
      try {
        await fetch('/api/product/views', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });
      } catch (error) {
        console.error('Failed to track product view:', error);
      }
    };

    incrementViewCount();
  }, [productId]);

  return null;
}
