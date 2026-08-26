import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { socials } from '../data/site.js';
import { useScrollLock } from '../hooks/useScrollLock.js';
import { cx } from '../lib/ui.js';

/**
 * Mobile navigation, designed for a thumb rather than shrunk down from desktop.
 *
 * At rest it is a status readout pinned to the bottom edge: which section you
 * are in, and how far through the page that is. Tapping it opens the full index
 * upward from the same spot, so the control never moves out from under the
 * thumb that just pressed it.
 *
 * Implemented as a disclosure (button + labelled panel), not a modal dialog —
 * that is the honest pattern for a menu, and it keeps the trigger usable while
 * the panel is open.
 */
export function MobileNav({ sections, active }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  useScrollLock(open);

  const currentIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === active)
  );
  const current = sections[currentIndex];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const pad = (value) => String(value).padStart(2, '0');

  return (
    <div className="lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close section index"
            onClick={() => setOpen(false)}
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-void/80 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div className="fixed inset-x-0 bottom-0 z-50">
        <AnimatePresence>
          {open && (
            <motion.nav
              id="section-index"
              aria-label="Sections"
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[74dvh] overflow-y-auto border-t border-line bg-base/98 backdrop-blur-xl"
            >
              <ul>
                {sections.map((section) => {
                  const isActive = section.id === active;
                  return (
                    <li key={section.id} className="border-b border-edge last:border-b-0">
                      <a
                        href={`#${section.id}`}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? 'true' : undefined}
                        className="flex items-baseline gap-5 px-6 py-4 active:bg-raise"
                      >
                        <span
                          aria-hidden="true"
                          className={cx(
                            'font-mono text-micro',
                            isActive ? 'text-brass' : 'text-dim'
                          )}
                        >
                          {section.index}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={cx(
                              'block font-display text-2xl font-light leading-tight',
                              isActive ? 'text-brass' : 'text-bone'
                            )}
                          >
                            {section.label}
                          </span>
                          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-mute">
                            {section.descriptor}
                          </span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-6 py-5">
                {socials.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-micro uppercase text-mute"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="section-index"
          className="flex w-full items-center justify-between gap-4 border-t border-line bg-base/95 px-6 py-4 backdrop-blur-md"
        >
          <span className="flex items-baseline gap-3 font-mono text-micro uppercase">
            <span className="text-brass">{current.index}</span>
            <span className="text-bone">{current.label}</span>
          </span>
          <span className="flex items-center gap-3 font-mono text-micro uppercase text-mute">
            <span>
              {pad(currentIndex + 1)} / {pad(sections.length)}
            </span>
            <ChevronUp
              aria-hidden="true"
              strokeWidth={1.75}
              className={cx(
                'size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                open && 'rotate-180'
              )}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
