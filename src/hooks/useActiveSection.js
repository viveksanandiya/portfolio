import { useEffect, useState } from 'react';

/**
 * Reports which section is currently under the reader's eye.
 *
 * The observer band is a thin horizontal slice near the middle of the viewport
 * rather than the whole screen, so the active state changes once, decisively,
 * instead of flickering between two sections that are both partly visible.
 *
 * @param {{id: string}[]} items Stable array (defined at module scope, not inline).
 * @returns {string} id of the active section
 */
export function useActiveSection(items) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node) => node !== null);

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries.filter((entry) => entry.isIntersecting);
        if (inBand.length === 0) return;

        // If two sections share the band, the higher one wins.
        inBand.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(inBand[0].target.id);
      },
      { rootMargin: '-42% 0px -53% 0px', threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  return active;
}
