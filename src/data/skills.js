/**
 * Skills as a cross-section of the stack rather than a flat list of logos —
 * top layer is what a person touches, bottom layer is what it is all written in.
 * No proficiency numbers: they would be invented, and nobody believes them.
 */
export const strata = [
  {
    id: 'interface',
    layer: 'Interface',
    note: 'What the person actually touches.',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Shadcn UI', 'Aceternity UI', 'Bootstrap'],
  },
  {
    id: 'server',
    layer: 'Server',
    note: 'Where the logic and the auth live.',
    items: ['Node.js', 'Express.js', 'JWT', 'WebSocket'],
  },
  {
    id: 'data',
    layer: 'Data',
    note: 'Where state gets shaped and kept.',
    items: ['MongoDB', 'Mongoose', 'PostgreSQL', 'MySQL', 'Prisma'],
  },
  {
    id: 'platform',
    layer: 'Platform',
    note: 'How it ships and stays up.',
    items: ['AWS', 'Vercel', 'Render', 'Cloudflare', 'Git', 'GitHub'],
  },
  {
    id: 'fundamentals',
    layer: 'Fundamentals',
    note: 'What all of it is written in.',
    items: ['JavaScript', 'TypeScript', 'C', 'C++', 'DSA'],
  },
];
