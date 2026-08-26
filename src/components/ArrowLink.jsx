import { ArrowUpRight } from 'lucide-react';
import { cx, label as labelClass } from '../lib/ui.js';

/**
 * Every outbound link on the site. The arrow shifts on hover so the whole row
 * feels like one target rather than text with an icon stuck beside it.
 *
 * @param {'brass'|'bone'|'ink'} tone Which palette the surrounding section uses.
 */
export function ArrowLink({ href, children, tone = 'bone', className }) {
  const tones = {
    bone: 'text-bone hover:text-brass decoration-line hover:decoration-brass',
    brass: 'text-brass hover:text-bone decoration-brass-deep hover:decoration-bone',
    ink: 'text-ink hover:text-brass-ink decoration-paper-line hover:decoration-brass-ink',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        'group/link inline-flex items-baseline gap-1.5 underline decoration-1 underline-offset-[5px]',
        'transition-colors duration-300',
        tones[tone] ?? tones.bone,
        labelClass,
        className
      )}
    >
      <span>{children}</span>
      <ArrowUpRight
        className="size-3 shrink-0 translate-y-px transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:-translate-y-px group-hover/link:translate-x-px"
        aria-hidden="true"
        strokeWidth={2}
      />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
