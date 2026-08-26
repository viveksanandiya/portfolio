import { motion, useReducedMotion } from 'framer-motion';

/**
 * Scroll-reveal wrapper.
 *
 * When motion is reduced this renders no initial state at all, so content is
 * never left invisible waiting for an animation that will not run.
 */
export function Reveal({ as = 'div', children, className, delay = 0, y = 20, once = true }) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  return (
    <Tag
      className={className}
      initial={reduceMotion ? undefined : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
