/**
 * All copy, identity and navigation content for the site.
 * Kept free of JSX and imports on purpose: everything here is editable
 * without touching a component.
 */

export const profile = {
  name: 'Vivek Sanandiya',
  role: 'Fullstack Web Developer',
  city: 'Bangalore',
  country: 'IN',
  timeZone: 'Asia/Kolkata',
  utcOffset: 'UTC+5:30',
};

/** The hero statement, split so the second half can carry less weight. */
export const thesis = {
  lineOne: 'I build the whole thing —',
  lineTwo: 'interface, API, and the data underneath.',
  support:
    'Mostly MERN: React on the front, Node and Express behind it, MongoDB underneath — plus whatever the problem actually needs. Three things I designed, built and deployed are below.',
  cta: 'See the work',
  status: 'Final year, computer science',
};

export const socials = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: 'vivek-sanandiya787',
    href: 'https://www.linkedin.com/in/vivek-sanandiya787/',
  },
  {
    key: 'github',
    label: 'GitHub',
    handle: 'viveksanandiya',
    href: 'https://github.com/viveksanandiya',
  },
  {
    key: 'x',
    label: 'X',
    handle: '@vivekbhai_',
    href: 'https://x.com/vivekbhai_',
  },
];

/**
 * Single source of truth for the rail nav, the mobile bar and the section
 * headers, so the numbering can never drift out of sync between them.
 */
export const sections = [
  { id: 'top', index: '01', label: 'Home', descriptor: 'Index' },
  { id: 'about', index: '02', label: 'About', descriptor: 'Who is writing the code' },
  { id: 'work', index: '03', label: 'Work', descriptor: 'Three things, built and deployed' },
  { id: 'skills', index: '04', label: 'Skills', descriptor: 'A cross-section of the stack' },
  { id: 'education', index: '05', label: 'Education', descriptor: 'Where the degree comes from' },
  { id: 'contact', index: '06', label: 'Contact', descriptor: 'Three ways to reach me' },
];

/**
 * The signature element in the hero. Ordered as a real request actually
 * travels — client, edge, server, data — not as a tidy list.
 */
export const requestPath = [
  { layer: 'Client', stack: 'React · Next.js' },
  { layer: 'Edge', stack: 'Vercel · Cloudflare' },
  { layer: 'Server', stack: 'Node · Express' },
  { layer: 'Data', stack: 'MongoDB · Postgres' },
];

export const about = {
  lead: 'Final year of a computer science degree. Nearly everything I know came from building things end to end.',
  body: [
    'The MERN stack is where I move fastest — MongoDB, Express, React, Node — and I work comfortably around it with Next.js, TypeScript, PostgreSQL and WebSockets.',
    'What I actually care about is the part that is harder to see: how the data is shaped, where state belongs, whether the thing still feels fast once it grows, and whether someone can work out the interface without being told.',
    'So far that has meant a real-time collaborative whiteboard, a personalised content dashboard, and somewhere to keep the things worth remembering. Different problems, same instinct — get it working, then keep going until it feels finished.',
  ],
  margin: [
    { label: 'Degree', value: 'B.E. Computer Science' },
    { label: 'University', value: 'Savitribai Phule Pune University' },
    { label: 'Based', value: 'Bangalore, India' },
    { label: 'Stack', value: 'MERN, Next.js, TypeScript' },
  ],
};

export const education = {
  degree: 'Bachelor of Engineering, Computer Science',
  institute: "MET's Institute of Engineering",
  instituteLocation: 'Nashik, Maharashtra',
  university: 'Savitribai Phule Pune University',
  status: 'Final year',
};

export const contact = {
  heading: 'Got something worth building?',
  body: 'I am looking for fullstack work, and I am always interested in problems that do not have an obvious answer yet. LinkedIn is the quickest way to reach me.',
};

export const footer = {
  note: 'Designed and built by hand',
  built: 'React · Vite · Tailwind CSS',
  year: new Date().getFullYear(),
};
