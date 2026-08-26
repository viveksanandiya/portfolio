import { education, sections } from '../data/site.js';
import { container, cx, label as labelClass, sectionSpace } from '../lib/ui.js';
import { Reveal } from './Reveal.jsx';
import { SectionHeader } from './SectionHeader.jsx';

const meta = sections.find((s) => s.id === 'education');

/**
 * One degree, one institution. No dots, no connecting line, no timeline — there
 * is nothing to sequence. The degree gets the display face at size, and the
 * institution details sit beside it as plain typed facts.
 */
export function Education() {
  const rows = [
    { label: 'Institute', value: education.institute },
    { label: 'Location', value: education.instituteLocation },
    { label: 'University', value: education.university },
    { label: 'Status', value: education.status },
  ];

  return (
    <section id="education" className={cx('relative', sectionSpace)}>
      <div className={container}>
        <SectionHeader index={meta.index} title={meta.label} descriptor={meta.descriptor} />

        <div className="grid grid-cols-1 items-start gap-x-10 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h3 className="max-w-[20ch] text-h2 text-bone">{education.degree}</h3>
          </Reveal>

          <Reveal as="dl" delay={0.08} className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-5 border-t border-edge py-3"
              >
                <dt className={cx(labelClass, 'text-dim')}>{row.label}</dt>
                <dd className="text-sm text-bone">{row.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
