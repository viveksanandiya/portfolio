import { useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

/**
 * The one magnetic element on the site.
 *
 * The button leans a few pixels toward the cursor as it approaches. Offsets are
 * written as CSS custom properties inside an animation frame, so this never
 * costs a React render, and it is skipped entirely for non-mouse pointers and
 * for anyone who has asked for reduced motion.
 */
export function MagneticCta({ href, children, strength = 8 }) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const offsetRef = useRef({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const flush = useCallback(() => {
    rafRef.current = 0;
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--mx', `${offsetRef.current.x}px`);
    node.style.setProperty('--my', `${offsetRef.current.y}px`);
  }, []);

  const schedule = useCallback(() => {
    if (rafRef.current === 0) rafRef.current = window.requestAnimationFrame(flush);
  }, [flush]);

  const handleMove = useCallback(
    (event) => {
      if (reduceMotion || event.pointerType !== 'mouse') return;
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      offsetRef.current = {
        x: Math.max(-1, Math.min(1, dx)) * strength,
        y: Math.max(-1, Math.min(1, dy)) * strength,
      };
      schedule();
    },
    [reduceMotion, schedule, strength]
  );

  const handleLeave = useCallback(() => {
    offsetRef.current = { x: 0, y: 0 };
    schedule();
  }, [schedule]);

  useEffect(
    () => () => {
      if (rafRef.current !== 0) window.cancelAnimationFrame(rafRef.current);
    },
    []
  );

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onBlur={handleLeave}
      style={{ translate: 'var(--mx, 0px) var(--my, 0px)' }}
      className="group/cta inline-flex items-center gap-4 rounded-tool border border-brass-deep bg-brass/5 px-6 py-3.5 font-mono text-meta uppercase text-brass transition-[background-color,border-color,color,translate] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-brass hover:text-void hover:border-brass"
    >
      <span>{children}</span>
      <ArrowDown
        className="size-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-y-1"
        aria-hidden="true"
        strokeWidth={1.75}
      />
    </a>
  );
}
