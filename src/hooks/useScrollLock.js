import { useEffect } from 'react';

/**
 * Freezes background scrolling while an overlay is open, and puts the
 * scrollbar's width back as padding so the page doesn't jump sideways.
 */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gutter = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
