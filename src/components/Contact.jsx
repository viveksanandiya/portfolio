import { contact, profile, sections, socials } from '../data/site.js';
import { container, cx, label as labelClass, sectionSpace } from '../lib/ui.js';
import { Reveal } from './Reveal.jsx';
import { SectionHeader } from './SectionHeader.jsx';

const meta = sections.find((s) => s.id === 'contact');

/**
 * The page inverts here. After scrolling through a dark workbench you arrive at
 * something that reads like paper, which does the work an animation would
 * otherwise have to do: it tells you you have reached the end.
 *
 * Each way of getting in touch is a full-width row that fills with ink on hover.
 * Three real links and no invented email address.
 */
export function Contact() {
  return (
    <section
      id="contact"
      className={cx('on-paper relative bg-paper text-ink', sectionSpace)}
    >
      <div className={container}>
        <SectionHeader
          index={meta.index}
          title={meta.label}
          descriptor={meta.descriptor}
          tone="paper"
        />

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h3 className="max-w-[18ch] text-hero font-display font-light text-ink">
              {contact.heading}
            </h3>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <p className="max-w-[40ch] text-ink-mute">{contact.body}</p>
            <p className={cx(labelClass, 'mt-8 text-ink-mute')}>
              {profile.city}, {profile.country} · {profile.utcOffset}
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 sm:mt-24">
          {socials.map((social, i) => (
            <Reveal as="li" key={social.key} delay={i * 0.05} y={14}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cx(
                  'sweep group/row relative flex items-baseline justify-between gap-6',
                  'border-t border-paper-line py-7 transition-colors duration-500 sm:px-6 sm:py-9',
                  i === socials.length - 1 && 'border-b'
                )}
              >
                <span className="text-h3 font-display font-light text-ink transition-colors duration-500 group-hover/row:text-paper">
                  {social.label}
                </span>
                <span
                  className={cx(
                    labelClass,
                    'text-right text-ink-mute transition-colors duration-500 group-hover/row:text-paper-2'
                  )}
                >
                  {social.handle}
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
