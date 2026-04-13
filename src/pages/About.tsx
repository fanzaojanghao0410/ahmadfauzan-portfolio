// @ts-nocheck
import { motion, useInView } from 'framer-motion';
import { User, MapPin, GraduationCap, Target, Heart, Lightbulb, Code, Palette, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PageLayout } from '@/components/PageLayout';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { Badge } from '@/components/ui/badge';
import { useRef } from 'react';

const About = () => {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: "-100px" });

  const personalDetails = [
    { icon: User, label: 'Name', value: 'Ahmad Fauzan' },
    { icon: MapPin, label: 'Based In', value: 'Bekasi, Indonesia' },
    { icon: Code, label: 'Focus', value: 'Frontend Development & Creative Tech' },
  ];

  const education = [
    { period: '2024 – Present', institution: 'Metland Vocational High School', major: 'Information Technology' }
  ];

  const educationLogos: Record<string, string> = {
    'Metland Vocational High School': '/education-logo/LOGO SMK METLAND.png',
  };

  const values = [
    { icon: Target, title: 'Visionary', description: 'Pushing creative boundaries across multiple disciplines' },
    { icon: Heart, title: 'Passionate', description: 'Deeply committed to craft and continuous artistic growth' },
    { icon: Lightbulb, title: 'Innovative', description: 'Blending creativity with technology for unique solutions' },
  ];

  const interests = [
    { icon: Code, label: 'Frontend Development' },
    { icon: Palette, label: 'Visual Design' },
    { icon: Users, label: 'Psychology' },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12 md:py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-20">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-primary/5 border border-primary/10" whileHover={{ scale: 1.05 }}>
              <span className="text-sm font-semibold tracking-wide text-foreground">Designer • Developer</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">About Me</h1>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
              A multidisciplinary creative professional blending visual design, performance, and technology
            </p>
          </div>

          {/* Profile & Details */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="flex justify-center lg:justify-start">
                <ProfileCard
                  name="Ahmad Fauzan"
                  title="Creative Visionary & Developer"
                  handle="ahmadfauzan"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/profile1.png"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => window.location.href = '/Contact'}
                />
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">Personal Information</h2>
                <div className="space-y-4">
                  {personalDetails.map((detail, index) => (
                    <motion.div key={detail.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.1 }}>
                      <Card className="glass-card p-5">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-primary/10">
                            <detail.icon className="w-5 h-5 text-primary" />
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

                <div className="mt-8">
                  <p className="text-sm font-medium text-muted-foreground mb-3">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge key={interest.label} variant="secondary" className="px-4 py-2 text-sm">
                        <interest.icon className="w-4 h-4 mr-2 text-primary" />
                        {interest.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Story */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">My Story</h2>
            <Card className="glass-card p-8 md:p-12">
              <div className="space-y-6 max-w-4xl mx-auto">
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  I am Ahmad Fauzan, an IT student at <span className="font-semibold text-primary">Metland Vocational School</span>, 
                  driven by a passion for creative expression across multiple disciplines.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  I believe that great work emerges from the intersection of art and technology. Whether designing interfaces, 
                  crafting narratives, performing on stage, or writing code, I approach each discipline with dedication.
                </p>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  My goal is to create meaningful experiences that resonate emotionally while remaining technically sound.
                </p>
              </div>
            </Card>
          </section>

          {/* Values */}
          <section className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-foreground">Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + index * 0.1 }} whileHover={{ y: -4 }}>
                  <Card className="glass-card p-6 h-full text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-20" ref={contentRef}>
            <div className="flex items-center justify-center gap-4 mb-12">
              <GraduationCap className="w-10 h-10 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Education</h2>
            </div>
            <div className="space-y-8">
              {education.map((edu) => (
                <Card key={edu.institution} className="glass-card p-6 md:pl-24 relative overflow-hidden">
                  <img
                    src={educationLogos[edu.institution] || '/images/education/default-school.png'}
                    alt={`${edu.institution} logo`}
                    className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 object-contain"
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
