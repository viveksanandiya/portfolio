import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * A one-pixel brass rule across the top of the page showing read position.
 * Transform-only, so it costs nothing to animate, and it is the smallest
 * possible way to tell someone how much is left.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px origin-left bg-brass"
    />
  );
}
