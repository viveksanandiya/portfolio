import { projects } from '../data/projects.js';
import { sections } from '../data/site.js';
import { container, cx, sectionSpace } from '../lib/ui.js';
import { ProjectSpread } from './ProjectSpread.jsx';
import { Reveal } from './Reveal.jsx';
import { SectionHeader } from './SectionHeader.jsx';

const meta = sections.find((s) => s.id === 'work');

/** The centre of the page. Three projects, three treatments, one grid. */
export function Work() {
  return (
    <section id="work" className={cx('relative', sectionSpace)}>
      <div className={container}>
        <SectionHeader index={meta.index} title={meta.label} descriptor={meta.descriptor} />

        <Reveal>
          <p className="max-w-[34ch] text-h3 font-display font-light text-bone sm:max-w-[24ch]">
            Everything here is deployed and open. Click the screenshot to use it.
          </p>
        </Reveal>

        <div className="mt-20 space-y-28 sm:mt-28 sm:space-y-40 lg:space-y-52">
          {projects.map((project, i) => (
            <ProjectSpread
              key={project.id}
              project={project}
              position={i + 1}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
