import { About } from './components/About.jsx';
import { Contact } from './components/Contact.jsx';
import { Education } from './components/Education.jsx';
import { Footer } from './components/Footer.jsx';
import { Grain } from './components/Grain.jsx';
import { Hero } from './components/Hero.jsx';
import { MobileNav } from './components/MobileNav.jsx';
import { Rail } from './components/Rail.jsx';
import { ScrollProgress } from './components/ScrollProgress.jsx';
import { Skills } from './components/Skills.jsx';
import { Work } from './components/Work.jsx';
import { sections } from './data/site.js';
import { useActiveSection } from './hooks/useActiveSection.js';
import { cx, label as labelClass } from './lib/ui.js';

/**
 * Composition only. Every section owns its own layout and copy, so this file
 * stays readable and reordering the page is a one-line change.
 *
 * The left inset matches the fixed rail's width on large screens; below that
 * the rail is replaced by the bottom navigation and no inset is needed.
 */
export default function App() {
  const active = useActiveSection(sections);

  return (
    <>
      <a
        href="#work"
        className={cx(
          labelClass,
          'sr-only rounded-tool focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:border focus:border-brass focus:bg-raise focus:px-4 focus:py-2.5 focus:text-brass'
        )}
      >
        Skip to the work
      </a>

      <ScrollProgress />
      <Grain />
      <Rail sections={sections} active={active} />
      <MobileNav sections={sections} active={active} />

      <div className="lg:pl-[76px]">
        <main>
          <Hero />
          <About />
          <Work />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
