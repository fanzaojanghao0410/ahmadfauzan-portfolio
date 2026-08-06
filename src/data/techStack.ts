export interface Tech {
  name: string;
  icon: string; // Iconify icon name
  hint: string;
  invertOnDark?: boolean;
}

export interface TechGroup {
  category: string;
  icon: string;
  items: Tech[];
}

export const techStack: TechGroup[] = [
  {
    category: 'Frontend',
    icon: 'lucide:layout-template',
    items: [
      { name: 'HTML5', icon: 'logos:html-5', hint: 'Semantic & accessible markup' },
      { name: 'CSS3', icon: 'logos:css-3', hint: 'Modern layouts & animations' },
      { name: 'JavaScript', icon: 'logos:javascript', hint: 'Interactive web logic' },
      { name: 'TypeScript', icon: 'logos:typescript-icon', hint: 'Type-safe development' },
      { name: 'React', icon: 'logos:react', hint: 'Component-based UI' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', hint: 'Utility-first styling' },
    ],
  },
  {
    category: 'Backend',
    icon: 'lucide:server',
    items: [
      { name: 'Node.js', icon: 'logos:nodejs-icon', hint: 'JavaScript runtime' },
      { name: 'Express.js', icon: 'simple-icons:express', hint: 'Minimal web framework', invertOnDark: true },
    ],
  },
  {
    category: 'Database',
    icon: 'lucide:database',
    items: [
      { name: 'Supabase', icon: 'logos:supabase-icon', hint: 'Auth, storage & realtime DB' },
      { name: 'PostgreSQL', icon: 'logos:postgresql', hint: 'Relational database' },
    ],
  },
  {
    category: 'Tools',
    icon: 'lucide:wrench',
    items: [
      { name: 'GitHub', icon: 'simple-icons:github', hint: 'Version control & collaboration', invertOnDark: true },
      { name: 'Figma', icon: 'logos:figma', hint: 'UI design & prototyping' },
      { name: 'VS Code', icon: 'logos:visual-studio-code', hint: 'Primary code editor' },
      { name: 'Vercel', icon: 'simple-icons:vercel', hint: 'Deployment & hosting', invertOnDark: true },
    ],
  },
];
