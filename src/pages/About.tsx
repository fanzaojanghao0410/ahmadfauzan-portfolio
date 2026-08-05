// @ts-nocheck
import { motion, useInView } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/card';
import { PageLayout } from '@/components/PageLayout';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { Badge } from '@/components/ui/badge';
import { useRef } from 'react';
import { useSiteProfile } from '@/hooks/useSiteData';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const About = () => {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: '-100px' });
  const { data: profile } = useSiteProfile();

  const personalDetails = [
    { icon: 'lucide:user', label: 'Name', value: 'Ahmad Fauzan' },
    { icon: 'lucide:map-pin', label: 'Based In', value: 'Bekasi, Indonesia' },
    { icon: 'lucide:code-2', label: 'Focus', value: 'Frontend Development & Creative Tech' },
  ];

  const education = [
    { period: '2024 – Present', institution: 'Metland Vocational High School', major: 'Information Technology' },
  ];

  const educationLogos: Record<string, string> = {
    'Metland Vocational High School': '/education-logo/LOGO SMK METLAND.png',
  };

  const highlights = [
    'Frontend Development',
    'UI Engineering',
    'Responsive Design',
    'Web Performance',
    'Creative Coding',
    'Interactive Experience',
    'Motion Interface',
    'Problem Solving',
  ];

  const stats = [
    { value: '10+', label: 'Projects Built' },
    { value: '15+', label: 'Technologies' },
    { value: '2024', label: 'Coding Since' },
    { value: '100%', label: 'Curiosity' },
  ];

  const whatIDo = [
    {
      icon: 'lucide:layout-template',
      title: 'Frontend Development',
      description: 'Building modern web interfaces with React, TypeScript, and Tailwind CSS that stay clean and maintainable.',
    },
    {
      icon: 'lucide:smartphone',
      title: 'Responsive UI Engineering',
      description: 'Designing layouts that feel right on every screen size, with attention to spacing, hierarchy, and accessibility.',
    },
    {
      icon: 'lucide:wand-sparkles',
      title: 'Creative Interaction',
      description: 'Adding purposeful motion and micro-interactions that make a product feel alive without hurting performance.',
    },
    {
      icon: 'lucide:gauge',
      title: 'Performance & Detail',
      description: 'Caring about load time, rendering cost, and the small visual details that separate good from polished.',
    },
  ];

  const timeline = [
    { year: '2024', title: 'Started in IT', desc: 'Began studying Information Technology and wrote my first lines of HTML, CSS, and JavaScript.' },
    { year: '2025', title: 'Focused on Frontend', desc: 'Went deeper into React, TypeScript, and Tailwind CSS while building real interfaces.' },
    { year: '2026', title: 'Creative Technologist', desc: 'Combining design, motion, and full-stack tooling to turn ideas into digital products.' },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">

          <div className="text-center mb-20">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-primary/5 border border-primary/10" whileHover={{ scale: 1.05 }}>
              <span className="text-sm font-semibold tracking-wide text-foreground">Frontend Developer & Creative Technologist</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About Me</h1>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              I build modern web experiences where clean interfaces, thoughtful interaction, and solid engineering meet.
            </p>
          </div>

          {/* Intro + profile */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="flex justify-center lg:justify-start">
                <ProfileCard
                  name="Ahmad Fauzan"
                  title="Frontend Developer & Creative Technologist"
                  handle="ahmadfauzan"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl={profile?.about_photo_url || "/profile1.png"}
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => window.location.href = '/Contact'}
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Who I Am</h2>
                <div className="space-y-4">
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    I'm an IT student focused on frontend development, and I enjoy turning ideas into interfaces
                    that are clean, interactive, and responsive on every device.
                  </p>
                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    I care about the details: visual consistency, performance, accessibility, and code that stays
                    maintainable. Learning new frontend technology is part of my daily routine.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {personalDetails.map((detail, index) => (
                    <motion.div key={detail.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.1 }}>
                      <Card className="glass-card p-5">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <Icon icon={detail.icon} className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">{detail.label}</p>
                            <p className="font-semibold text-foreground">{detail.value}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Stats */}
          <motion.section
            className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <Card className="glass-card p-5 text-center h-full">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{s.value}</div>
                  <p className="text-xs md:text-sm text-muted-foreground">{s.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.section>

          {/* What I Do */}
          <motion.section
            className="mb-20"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-foreground">What I Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {whatIDo.map((item) => (
                <motion.div key={item.title} variants={fadeUp} whileHover={{ y: -5 }}>
                  <Card className="glass-card p-6 h-full transition-smooth hover:border-primary/40 hover:shadow-glow">
                    <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon icon={item.icon} className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Journey timeline */}
          <motion.section
            className="mb-20"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-foreground">My Journey</h2>
            <div className="relative pl-6 md:pl-8">
              <div className="absolute left-1.5 md:left-2 top-2 bottom-2 w-px bg-border" />
              <div className="space-y-6">
                {timeline.map((t) => (
                  <motion.div key={t.year} variants={fadeUp} className="relative">
                    <span className="absolute -left-[1.35rem] md:-left-[1.6rem] top-6 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/15" />
                    <Card className="glass-card p-5">
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <Badge variant="secondary" className="text-xs font-semibold">{t.year}</Badge>
                        <h3 className="font-semibold text-foreground">{t.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <section className="mb-20" ref={contentRef}>
            <div className="flex items-center justify-center gap-4 mb-12">
              <Icon icon="lucide:graduation-cap" className="w-10 h-10 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Education</h2>
            </div>
            <div className="space-y-8">
              {education.map((edu) => (
                <Card key={edu.institution} className="glass-card p-6 md:pl-24 relative overflow-hidden">
                  <img
                    src={educationLogos[edu.institution] || '/images/education/default-school.png'}
                    alt={`${edu.institution} logo`}
                    className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 object-contain"
                    loading="lazy"
                  />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">{edu.institution}</h3>
                      {edu.major && <p className="text-primary font-medium">{edu.major}</p>}
                    </div>
                    <Badge variant="secondary" className="w-fit">{edu.period}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default About;
