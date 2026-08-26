import { useCallback, useEffect, useRef } from 'react';

/**
 * Lets a label track the pointer inside a container.
 *
 * Coordinates are written straight onto the node as CSS custom properties and
 * batched into one animation frame, so moving the mouse never triggers a React
 * render. That is the difference between this feeling weightless and feeling
 * like the page is thinking.
 *
 * Usage: spread `frameRef` + `onPointerMove` on the container, `labelRef` on
 * the element that should follow.
 */
export function usePointerLabel() {
  const frameRef = useRef(null);
  const labelRef = useRef(null);
  const pointRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  const flush = useCallback(() => {
    rafRef.current = 0;
    const label = labelRef.current;
    if (!label) return;
    label.style.setProperty('--px', `${pointRef.current.x}px`);
    label.style.setProperty('--py', `${pointRef.current.y}px`);
  }, []);

  const onPointerMove = useCallback(
    (event) => {
      const frame = frameRef.current;
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      pointRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      if (rafRef.current === 0) {
        rafRef.current = window.requestAnimationFrame(flush);
      }
    },
    [flush]
  );

  useEffect(
    () => () => {
      if (rafRef.current !== 0) window.cancelAnimationFrame(rafRef.current);
    },
    []
  );

  return { frameRef, labelRef, onPointerMove };
}
