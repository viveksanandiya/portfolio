import { cx } from '../lib/ui.js';

/** The layer mark: three rules narrowing as they descend the stack. */
function LayerMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true" focusable="false">
      <rect x="7" y="9" width="18" height="2.4" className="fill-bone" />
      <rect x="7" y="14.8" width="13" height="2.4" className="fill-brass" />
      <rect x="7" y="20.6" width="8" height="2.4" className="fill-patina" />
    </svg>
  );
}

/**
 * Desktop navigation as a gauge rather than a navbar.
 *
 * Six graduation marks down the left edge; the current one extends and turns
 * brass. Names stay in the DOM at all times and surface as a chip on hover or
 * keyboard focus, so nothing is hidden from assistive technology.
 */
export function Rail({ sections, active }) {
  return (
    <nav
      aria-label="Sections"
      className="fixed left-0 top-0 z-50 hidden h-dvh w-[76px] flex-col border-r border-edge bg-base/85 backdrop-blur-sm lg:flex"
    >
      <a
        href="#top"
        aria-label="Vivek Sanandiya — back to top"
        className="flex h-[76px] shrink-0 items-center justify-center border-b border-edge transition-opacity duration-300 hover:opacity-70"
      >
        <LayerMark />
      </a>

      <ul className="flex flex-1 flex-col justify-center">
        {sections.map((section) => {
          const isActive = section.id === active;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'true' : undefined}
                className="group/nav relative flex items-center gap-2.5 py-3 pl-4"
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    'h-px shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    isActive
                      ? 'w-6 bg-brass'
                      : 'w-2.5 bg-line group-hover/nav:w-4 group-hover/nav:bg-mute'
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cx(
                    'font-mono text-[10px] tracking-[0.12em] transition-colors duration-300',
                    isActive ? 'text-bone' : 'text-dim group-hover/nav:text-mute'
                  )}
                >
                  {section.index}
                </span>
                <span
                  className={cx(
                    'pointer-events-none absolute left-full top-1/2 -translate-y-1/2 whitespace-nowrap',
                    'rounded-tool border border-line bg-raise px-2.5 py-1.5',
                    'font-mono text-micro uppercase text-bone',
                    'opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    'group-hover/nav:translate-x-2 group-hover/nav:opacity-100',
                    'group-focus-visible/nav:translate-x-2 group-focus-visible/nav:opacity-100'
                  )}
                >
                  {section.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="h-[76px] shrink-0" aria-hidden="true" />
    </nav>
  );
}
