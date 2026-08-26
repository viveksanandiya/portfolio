import brainlyShot from '../assets/brainly.png';
import contentShot from '../assets/content.png';
import syncboardShot from '../assets/syncboard.png';

/**
 * Projects, in the order they should appear.
 *
 * Every project carries its own art direction rather than sharing one generic
 * card: `pull` sets which side the media hangs off, `focal` sets the crop for
 * that specific screenshot, and `tint` picks the accent used for its rules and
 * hover state. Adding a project means adding one object here.
 *
 * `stack` deliberately reuses the layer vocabulary from the hero instrument
 * (interface / server / data), so a reader can see at a glance which parts of
 * the stack each project touches — SyncBoard has a live transport row that the
 * others don't, Content Hub is Next.js where Brainly is React. It replaces the
 * usual row of technology chips, which says what was used but not what it does.
 */
export const projects = [
  {
    id: 'brainly',
    index: '01',
    title: 'Brainly',
    kind: 'Personal knowledge base',
    subtitle: 'Somewhere to keep the things worth keeping',
    description:
      'Save, organise and share content and memories in one place — and get any of it back later without scrolling through everything you have ever kept.',
    note: 'The filter rail is the whole idea. Saving something is easy; the value is in finding the one thing you meant, months later.',
    stack: [
      { layer: 'Interface', items: 'React · TypeScript · Tailwind CSS' },
      { layer: 'Server', items: 'Node.js · Express' },
      { layer: 'Data', items: 'MongoDB' },
      { layer: 'Guards', items: 'Zod · bcrypt' },
    ],
    image: brainlyShot,
    alt: 'The Brainly interface: a sidebar filtering saved content by type, beside saved items shown as cards.',
    links: {
      live: 'https://brainly-frontend-dusky.vercel.app/',
      code: 'https://github.com/viveksanandiya/Brainly-Frontend',
    },
    pull: 'right',
    focal: 'left top',
    tint: 'brass',
  },
  {
    id: 'content-hub',
    index: '02',
    title: 'Content Hub',
    kind: 'Personalised dashboard',
    subtitle: 'One feed instead of six tabs',
    description:
      'News, tech, entertainment, music and sport in a single place. You choose which of it you want to see, and keep the pieces you want to come back to.',
    note: 'You pick the categories; nothing decides the feed on your behalf. Preferences and saved items belong to the account, not the browser.',
    stack: [
      { layer: 'Interface', items: 'Next.js · TypeScript · Tailwind CSS' },
      { layer: 'Server', items: 'Node.js' },
      { layer: 'Data', items: 'MongoDB' },
      { layer: 'Guards', items: 'Zod · bcrypt' },
    ],
    image: contentShot,
    alt: 'The Content Hub dashboard: category controls above a grid of articles, each with a save action.',
    links: {
      live: 'https://your-content-hub.vercel.app/',
      code: 'https://github.com/viveksanandiya/your-content-hub',
    },
    pull: 'left',
    focal: 'center top',
    tint: 'patina',
  },
  {
    id: 'syncboard',
    index: '03',
    // The deployed app brands itself SyncBoard, so the casing follows the product.
    title: 'SyncBoard',
    kind: 'Real-time collaboration',
    subtitle: 'A whiteboard two people can draw on at once',
    description:
      'Sketch ideas and build diagrams together in the browser. Open a board, send the link, and every stroke appears on the other screen as it is drawn.',
    note: 'The interesting part is agreement: several cursors, one canvas, and no save button to hide the latency behind.',
    stack: [
      { layer: 'Interface', items: 'React · Tailwind CSS' },
      { layer: 'Live', items: 'WebSocket' },
      { layer: 'Data', items: 'MongoDB' },
    ],
    image: syncboardShot,
    alt: 'SyncBoard in use: a shared canvas with freehand strokes and diagram shapes drawn collaboratively.',
    links: {
      live: 'https://collaborative-whiteboard.pages.dev/',
      code: 'https://github.com/viveksanandiya/collaborative-whiteboard',
    },
    pull: 'right',
    focal: 'center top',
    tint: 'brass',
  },
];
