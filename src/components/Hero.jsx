import { profile, socials, thesis } from '../data/site.js';
import { useLocalTime } from '../hooks/useLocalTime.js';
import { container, cx, label as labelClass } from '../lib/ui.js';
import { ArrowLink } from './ArrowLink.jsx';
import { MagneticCta } from './MagneticCta.jsx';
import { RequestPath } from './RequestPath.jsx';

/**
 * Not a centred "Hi, I'm Vivek".
 *
 * The name sits where a masthead would, small and set in the display face. The
 * space normally spent on a greeting goes to a statement of what he actually
 * does, with the request-path instrument beside it doing the same job visually.
 * By the time you have read two lines you know the role, the city and the scope.
 */
export function Hero() {
  const time = useLocalTime(profile.timeZone);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="draft-grid absolute inset-0" aria-hidden="true" />

      <div
        className={cx(
          container,
          'relative flex min-h-[88svh] flex-col pt-14 pb-28 sm:pt-16 lg:min-h-dvh lg:pb-20'
        )}
      >
        {/* Masthead: who, where, and what time it is there. */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-edge pb-4">
          <p className="font-display text-lg font-normal tracking-tight text-bone sm:text-xl">
            {profile.name}
          </p>
          <p className={cx(labelClass, 'flex items-center gap-2.5 text-mute')}>
            <span className="beacon size-1.5 shrink-0 rounded-full bg-brass" aria-hidden="true" />
            <span>
              {profile.city}, {profile.country}
              {time ? ` · ${time} IST` : ''}
            </span>
          </p>
        </div>

        <div className="flex flex-1 items-center pt-14 sm:pt-20 lg:pt-16">
          <div className="grid w-full grid-cols-1 gap-x-10 gap-y-16 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h1 className="text-hero font-display font-light text-bone">
                {thesis.lineOne}{' '}
                <span className="text-mute">{thesis.lineTwo}</span>
              </h1>

              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5 sm:mt-11">
                <span className={cx(labelClass, 'text-brass')}>{profile.role}</span>
                <span className="hidden h-px w-8 bg-line sm:block" aria-hidden="true" />
                <span className={cx(labelClass, 'text-mute')}>{thesis.status}</span>
              </div>

              <p className="mt-8 max-w-[48ch] text-lead text-mute">{thesis.support}</p>

              <div className="mt-10 flex flex-col gap-8 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-12">
                <MagneticCta href="#work">{thesis.cta}</MagneticCta>

                <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
                  {socials.map((social) => (
                    <li key={social.key}>
                      <ArrowLink href={social.href}>{social.label}</ArrowLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <RequestPath />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
