import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePointerLabel } from '../hooks/usePointerLabel.js';
import { cx, hostOf, label as labelClass } from '../lib/ui.js';
import { ArrowLink } from './ArrowLink.jsx';
import { Reveal } from './Reveal.jsx';

/**
 * One project, presented as a specimen rather than a card.
 *
 * The layout is asymmetric: a wide media block that hangs off the outer edge of
 * the page, and a narrower column of text and specification opposite it. Which
 * side the media hangs off alternates per project, the crop is set per
 * screenshot, and the accent is set per project — so three projects read as
 * three different objects instead of one component printed three times.
 */
export function ProjectSpread({ project, position, total }) {
  const { frameRef, labelRef, onPointerMove } = usePointerLabel();
  const reduceMotion = useReducedMotion();

  /* Media drifts against the page as it passes. Small on purpose — 36px total,
     enough to feel like depth, not enough to notice as an effect. */
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-18, 18]);

  const mediaOnRight = project.pull === 'right';

  const tints = {
    brass: { mark: 'text-brass', frame: 'group-hover/spread:border-brass-deep', dot: 'bg-brass' },
    patina: { mark: 'text-patina', frame: 'group-hover/spread:border-patina', dot: 'bg-patina' },
  };
  const tint = tints[project.tint] ?? tints.brass;

  const media = (
    <div
      ref={frameRef}
      onPointerMove={onPointerMove}
      className={cx(
        'media-frame relative lg:col-span-7',
        mediaOnRight
          ? 'lg:col-start-6 lg:-mr-10 xl:-mr-14'
          : 'lg:col-start-1 lg:-ml-10 xl:-ml-14'
      )}
    >
      <a
        href={project.links.live}
        target="_blank"
        rel="noopener noreferrer"
        className={cx(
          'block overflow-hidden rounded-tool border border-line bg-well transition-colors duration-500',
          tint.frame
        )}
      >
        {/* The frame's one piece of chrome is the address it actually runs at. */}
        <span className="flex items-center gap-2.5 border-b border-edge px-4 py-2.5">
          <span className={cx('size-1.5 shrink-0 rounded-full', tint.dot)} aria-hidden="true" />
          <span className="truncate font-mono text-[0.625rem] tracking-[0.08em] text-dim">
            {hostOf(project.links.live)}
          </span>
        </span>

        <span className="relative block aspect-[19/9] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.alt}
            loading={position === 1 ? 'eager' : 'lazy'}
            decoding="async"
            /* Scale has to travel through framer's style object: it owns the
               `transform` property here, so a Tailwind scale class would lose. */
            style={{ y, scale: 1.08, objectPosition: project.focal }}
            className="shot absolute inset-0 size-full object-cover"
          />
        </span>

        <span className="sr-only">— open the live site in a new tab</span>
      </a>

      <span
        ref={labelRef}
        aria-hidden="true"
        className="cursor-label z-10 flex items-center gap-2 whitespace-nowrap rounded-full border border-brass bg-void/85 px-4 py-2 font-mono text-micro uppercase text-brass backdrop-blur-sm"
      >
        Open live
        <ArrowUpRight className="size-3" strokeWidth={2} aria-hidden="true" />
      </span>
    </div>
  );

  const copy = (
    <div
      className={cx('lg:col-span-5 lg:pt-16', mediaOnRight ? 'lg:col-start-1' : 'lg:col-start-8')}
    >
      <Reveal>
        <h3 className="text-h2 text-bone">{project.title}</h3>
        <p className="mt-4 text-lead text-mute">{project.subtitle}</p>
        <p className="mt-7 max-w-[46ch] text-mute">{project.description}</p>

        <p className="mt-8 max-w-[46ch] border-l border-brass-deep pl-5 text-[0.9375rem] leading-relaxed text-mute">
          {project.note}
        </p>

        <dl className="mt-10">
          {project.stack.map((row) => (
            <div
              key={row.layer}
              className="grid grid-cols-[5.5rem_1fr] items-baseline gap-x-5 border-t border-edge py-2.5 sm:grid-cols-[6.5rem_1fr]"
            >
              <dt className={cx(labelClass, 'text-dim')}>{row.layer}</dt>
              <dd className="font-mono text-meta text-bone">{row.items}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-3">
          <ArrowLink href={project.links.live} tone="brass">
            Live site
          </ArrowLink>
          <ArrowLink href={project.links.code}>Source</ArrowLink>
        </div>
      </Reveal>
    </div>
  );

  return (
    <article className="group/spread">
      {/* Number and category. The numbering is real information: the projects
          are an ordered set, and the rail nav counts the same way. */}
      <Reveal as="header" y={12}>
        <div className="flex items-baseline justify-between gap-6 border-t border-line pb-10 pt-4 sm:pb-14">
          <span className={cx(labelClass, tint.mark)}>
            {project.index} <span className="text-dim">/ {String(total).padStart(2, '0')}</span>
          </span>
          <span className={cx(labelClass, 'text-dim')}>{project.kind}</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 items-start gap-x-10 gap-y-10 lg:grid-cols-12">
        {mediaOnRight ? (
          <>
            {copy}
            {media}
          </>
        ) : (
          <>
            {media}
            {copy}
          </>
        )}
      </div>
    </article>
  );
}
