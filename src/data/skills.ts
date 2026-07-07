export interface Skill {
  icon: string; // Iconify icon name
  title: string;
  description: string;
}

export const technicalSkills: Skill[] = [
  {
    icon: 'lucide:code-2',
    title: 'Frontend Development',
    description: 'Creating responsive web applications with React, TypeScript, and modern frameworks'
  },
  {
    icon: 'lucide:palette',
    title: 'Visual Design',
    description: 'Crafting compelling visual identities through layout, color, and typography'
  },
  {
    icon: 'lucide:book-open',
    title: 'Novel Writing',
    description: 'Developing engaging narratives with depth, character development, and compelling storytelling'
  },
  {
    icon: 'lucide:clapperboard',
    title: 'Performance & Acting',
    description: 'Expressing emotions and bringing characters to life through dramatic performance'
  }
];

export const softSkills: Skill[] = [
  {
    icon: 'lucide:sparkles',
    title: 'Creativity',
    description: 'Generating innovative ideas across multiple creative disciplines'
  },
  {
    icon: 'lucide:brush',
    title: 'Artistic Vision',
    description: 'Translating concepts into visually and emotionally compelling works'
  },
  {
    icon: 'lucide:message-square',
    title: 'Storytelling',
    description: 'Crafting narratives that resonate and engage audiences deeply'
  },
  {
    icon: 'lucide:target',
    title: 'Attention to Detail',
    description: 'Meticulous approach to every element, from pixels to words to expressions'
  },
  {
    icon: 'lucide:heart',
    title: 'Emotional Intelligence',
    description: 'Understanding human emotions and translating them into art and design'
  },
  {
    icon: 'lucide:zap',
    title: 'Adaptability',
    description: 'Seamlessly moving between different creative mediums and disciplines'
  }
];
