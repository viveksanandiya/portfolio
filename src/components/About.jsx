import { about, sections } from '../data/site.js';
import { container, cx, label as labelClass, sectionSpace } from '../lib/ui.js';
import { Reveal } from './Reveal.jsx';
import { SectionHeader } from './SectionHeader.jsx';

const meta = sections.find((s) => s.id === 'about');

/**
 * Not a paragraph in a card.
 *
 * The lead is set large in the display face and given its own line length, the
 * body sits in a narrow measure beneath it, and the facts move out into a true
 * margin column — the way a printed page handles an aside. On mobile the margin
 * becomes a plain list under the text, which is what it always was underneath.
 */
export function About() {
  return (
    <section id="about" className={cx('relative', sectionSpace)}>
      <div className={container}>
        <SectionHeader index={meta.index} title={meta.label} descriptor={meta.descriptor} />

        <div className="grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="max-w-[30ch] text-h2 text-bone">{about.lead}</p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2 lg:mt-16">
              {about.body.map((paragraph, i) => (
                <Reveal key={paragraph.slice(0, 24)} delay={i * 0.05}>
                  <p className={cx('text-mute', i === 0 && 'sm:col-span-2 sm:max-w-[62ch]')}>
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Margin column: the résumé facts, kept out of the prose. */}
          <Reveal
            as="dl"
            delay={0.1}
            className="lg:col-span-3 lg:col-start-10 lg:border-l lg:border-edge lg:pl-8"
          >
            {about.margin.map((row) => (
              <div key={row.label} className="border-t border-edge py-3.5 first:border-t-0 lg:first:border-t">
                <dt className={cx(labelClass, 'text-dim')}>{row.label}</dt>
                <dd className="mt-1.5 text-sm text-bone">{row.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
