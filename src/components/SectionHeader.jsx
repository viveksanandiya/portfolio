import { Reveal } from './Reveal.jsx';
import { cx, label as labelClass } from '../lib/ui.js';

/**
 * The rule that opens every section: a hairline, the section's number, its name,
 * and a one-line descriptor on the right. The number is real information here —
 * it matches the rail nav, so the page has a stated order you can navigate by.
 *
 * The <h2> is deliberately small and monospaced. Visual weight belongs to the
 * editorial line underneath; the outline a screen reader hears stays clean.
 */
export function SectionHeader({ index, title, descriptor, tone = 'dark' }) {
  const tones = {
    dark: {
      rule: 'border-line',
      index: 'text-brass',
      title: 'text-bone',
      descriptor: 'text-mute',
    },
    paper: {
      rule: 'border-paper-line',
      index: 'text-brass-ink',
      title: 'text-ink',
      descriptor: 'text-ink-mute',
    },
  };
  const t = tones[tone] ?? tones.dark;

  return (
    <Reveal as="header" y={12} className="mb-14 sm:mb-20">
      <div
        className={cx(
          'flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-t pt-4',
          t.rule
        )}
      >
        <div className="flex items-baseline gap-5 sm:gap-7">
          <span className={cx(labelClass, t.index)} aria-hidden="true">
            {index}
          </span>
          <h2 className={cx(labelClass, 'font-medium', t.title)}>{title}</h2>
        </div>
        <p className={cx(labelClass, 'max-w-[26ch] text-pretty', t.descriptor)}>{descriptor}</p>
      </div>
    </Reveal>
  );
}
