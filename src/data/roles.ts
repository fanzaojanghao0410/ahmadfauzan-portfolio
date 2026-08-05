export const roleGroups: { group: string; roles: string[] }[] = [
  {
    group: 'Development',
    roles: [
      'Frontend Developer',
      'React Developer',
      'Web Developer',
      'Full Stack Developer',
      'Backend Developer',
      'Software Engineer',
      'UI Engineer',
    ],
  },
  {
    group: 'Design',
    roles: [
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Product Designer',
      'Graphic Designer',
      'Visual Designer',
    ],
  },
  {
    group: 'Creative',
    roles: [
      'Creative Technologist',
      'Creative Developer',
      'Digital Creator',
      'Content Creator',
      'Motion Designer',
    ],
  },
  {
    group: 'Leadership',
    roles: ['Project Lead', 'Team Lead', 'Community Lead', 'Student Leader', 'Event Coordinator'],
  },
  {
    group: 'Business',
    roles: ['Freelancer', 'Founder', 'Co-Founder', 'Entrepreneur', 'Product Manager'],
  },
  {
    group: 'Education',
    roles: ['Student', 'Teaching Assistant', 'Mentor', 'Research Assistant'],
  },
  {
    group: 'Organization',
    roles: ['Committee Member', 'Volunteer', 'School Ambassador', 'Public Speaker', 'Master of Ceremony'],
  },
];

export const allRoles = roleGroups.flatMap((g) => g.roles);

export const techOptions = [
  'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS',
  'Node.js', 'Express.js', 'Supabase', 'PostgreSQL',
  'Lovable', 'GitHub', 'Figma', 'VS Code', 'Vercel',
  'Framer Motion', 'Vite', 'Canva', 'Adobe Photoshop', 'Adobe Illustrator',
];
