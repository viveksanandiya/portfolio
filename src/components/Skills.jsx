import { strata } from '../data/skills.js';
import { sections } from '../data/site.js';
import { container, cx, label as labelClass, sectionSpace } from '../lib/ui.js';
import { Reveal } from './Reveal.jsx';
import { SectionHeader } from './SectionHeader.jsx';

const meta = sections.find((s) => s.id === 'skills');

/**
 * The stack, drawn as a cross-section: what a person touches at the top, what
 * it is all written in at the bottom. Each layer sits on a slightly darker
 * ground than the one above so depth is carried by the surface itself.
 *
 * No proficiency bars — a number next to "React" would be invented, and the
 * ordering already says the useful thing. Hovering one layer recedes the rest
 * (CSS only), and with hover or motion unavailable it is simply a clear,
 * grouped list.
 */
export function Skills() {
  return (
    <section id="skills" className={cx('relative', sectionSpace)}>
      <div className={container}>
        <SectionHeader index={meta.index} title={meta.label} descriptor={meta.descriptor} />

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="max-w-[26ch] text-h3 font-display font-light text-bone">
                Read it top to bottom, like a core sample.
              </p>
              <p className="mt-6 max-w-[38ch] text-mute">
                Nearest the surface is what someone using the thing can see. Everything under it
                is what holds that up.
              </p>
            </Reveal>
          </div>

          <div className="strata lg:col-span-8">
            {strata.map((layer, i) => (
              <Reveal key={layer.id} delay={i * 0.06} y={14}>
                <div
                  className={cx(
                    'stratum group/layer grid grid-cols-1 gap-x-8 gap-y-4 border-t border-edge px-4 py-7 sm:grid-cols-[13rem_1fr] sm:px-6',
                    i === strata.length - 1 && 'border-b',
                    // Each layer a step deeper than the last.
                    ['bg-raise', 'bg-base', 'bg-base', 'bg-well', 'bg-void'][i]
                  )}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={cx(
                        labelClass,
                        'text-dim transition-colors duration-300 group-hover/layer:text-brass'
                      )}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className={cx(labelClass, 'font-medium text-bone')}>{layer.layer}</h3>
                      <p className="mt-2 max-w-[22ch] text-xs leading-relaxed text-mute">
                        {layer.note}
                      </p>
                    </div>
                  </div>

                  <ul className="flex flex-wrap items-baseline gap-x-2.5 gap-y-2 sm:justify-end">
                    {layer.items.map((item) => (
                      <li
                        key={item}
                        className="font-mono text-meta text-mute transition-colors duration-300 after:ml-2.5 after:text-line after:content-['/'] last:after:content-[''] group-hover/layer:text-bone"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
