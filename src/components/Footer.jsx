import { footer, profile } from '../data/site.js';
import { container, cx, label as labelClass } from '../lib/ui.js';

/** Colophon. Same paper as the contact section, so the end reads as one block. */
export function Footer() {
  return (
    <footer className={cx('on-paper bg-paper text-ink')}>
      <div className={container}>
        {/* Extra bottom room on small screens so the fixed nav bar never sits
            on top of the colophon. */}
        <div className="flex flex-col gap-4 border-t border-paper-line pb-28 pt-8 sm:flex-row sm:items-baseline sm:justify-between lg:pb-8">
          <p className={cx(labelClass, 'text-ink-mute')}>
            © {footer.year} {profile.name} · {footer.note}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2">
            <p className={cx(labelClass, 'text-ink-mute')}>{footer.built}</p>
            <a
              href="#top"
              className={cx(
                labelClass,
                'text-ink underline decoration-paper-line decoration-1 underline-offset-[5px] transition-colors duration-300 hover:text-brass-ink hover:decoration-brass-ink'
              )}
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
