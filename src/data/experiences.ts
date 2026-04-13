export interface Experience {
  id: string;
  date: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'event' | 'committee' | 'competition' | 'performance';
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    date: 'November 2024 – Present',
    title: 'Novel Writing Project - "Dimensi Terakhir"',
    shortDesc: 'Writing and publishing an original novel in Indonesian',
    fullDesc: 'Currently developing and publishing an original novel titled "Dimensi Terakhir", showcasing narrative depth and character development. This project demonstrates creative writing skills, storytelling ability, and commitment to literary arts.',
    category: 'performance'
  },
  {
    id: 'exp-2',
    date: 'October 2024 – Present',
    title: 'Frontend Developer - Portfolio Website',
    shortDesc: 'Building a modern, interactive portfolio with React and TypeScript',
    fullDesc: 'Designed and developed this personal portfolio website using React, TypeScript, Tailwind CSS, and Framer Motion. The project showcases web development skills, UI/UX design sensibility, and ability to create engaging user experiences with smooth animations.',
    category: 'event'
  },
  {
    id: 'exp-3',
    date: 'August 2024',
    title: 'Visual Identity Design - School Event',
    shortDesc: 'Creating cohesive visual branding for school events',
    fullDesc: 'Designed comprehensive visual identity systems for school events including logos, color palettes, and promotional materials. This work demonstrates expertise in visual design, brand consistency, and understanding of design principles.',
    category: 'event'
  },
  {
    id: 'exp-4',
    date: 'July 14, 2025',
    title: 'MC & Moderator - New Student Orientation',
    shortDesc: 'Hosted and moderated the new student orientation event',
    fullDesc: 'Served as Master of Ceremony and moderator for the school\'s new student orientation program. Demonstrated performance skills, public speaking ability, and stage presence while welcoming and engaging with audiences.',
    category: 'event'
  },
  {
    id: 'exp-5',
    date: 'July 5, 2025 – Present',
    title: 'MHSWR 2026 Registration Committee',
    shortDesc: 'Committee member for student registration process',
    fullDesc: 'Active member of the MHSWR 2026 registration committee, organizing and managing registration processes. Contributes to event planning and coordination with attention to detail and efficiency.',
    category: 'committee'
  },
  {
    id: 'exp-6',
    date: 'May 31, 2025',
    title: 'Committee Member - Mahes of Creativity Vol. 2',
    shortDesc: 'Organizing creative talent showcase event',
    fullDesc: 'Participated as committee member in organizing Mahes of Creativity Vol. 2, a showcase of student talents in performing arts, visual arts, and digital media—aligning perfectly with creative pursuits.',
    category: 'event'
  },
  {
    id: 'exp-7',
    date: 'May 27, 2025',
    title: 'AI & Digital Business Mindset Workshop',
    shortDesc: 'Attended workshop on AI and digital entrepreneurship',
    fullDesc: 'Participated in intensive workshop on artificial intelligence applications and digital business strategies, gaining insights into technology trends and digital innovation—essential for frontend development and creative tech.',
    category: 'event'
  },
  {
    id: 'exp-8',
    date: 'May 24, 2025',
    title: 'MC - MetshooFest Vol. 1',
    shortDesc: 'Hosted the inaugural cultural festival event',
    fullDesc: 'Served as Master of Ceremony for MetshooFest Vol. 1, the school\'s premier cultural festival. Demonstrated performance excellence, audience engagement, and ability to coordinate cultural events.',
    category: 'event'
  },
  {
    id: 'exp-9',
    date: 'Feb 15, 2025 – Feb 14, 2026',
    title: 'School Ambassador (2nd Runner-Up)',
    shortDesc: 'Selected as school ambassador representing student body',
    fullDesc: 'Achieved 2nd Runner-Up position in the school ambassador competition, representing the school at various events. This recognizes leadership, charisma, and ability to represent brand and community effectively.',
    category: 'competition'
  },
  {
    id: 'exp-10',
    date: 'November 16, 2024',
    title: 'Performer - Monologue "Runtuh"',
    shortDesc: 'Performed dramatic monologue at Maheswara/i event',
    fullDesc: 'Delivered a powerful and emotionally nuanced monologue titled "Runtuh" at the Maheswara/i "Nusantara Berbakat" event. This performance showcased acting skills, emotional depth, and stage presence.',
    category: 'performance'
  },
  {
    id: 'exp-11',
    date: 'September 10, 2024',
    title: 'Actor - "Shiap Bos" Short Film',
    shortDesc: 'Acted in student short film production',
    fullDesc: 'Participated as talent in "Shiap Bos," a student-led short film exploring themes of ambition and entrepreneurship. Gained practical experience in film acting and character portrayal.',
    category: 'performance'
  },
  {
    id: 'exp-12',
    date: 'July 22, 2024',
    title: 'Class Chairman (X – IT)',
    shortDesc: 'Elected as class leader for IT department',
    fullDesc: 'Elected as Class Chairman for grade X IT program, coordinating class activities and representing classmates. This leadership role demonstrates organizational skills and community engagement.',
    category: 'committee'
  }
];
