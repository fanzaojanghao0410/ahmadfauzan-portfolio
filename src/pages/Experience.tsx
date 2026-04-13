// @ts-nocheck
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Award, Users, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/PageLayout';
import { experiences, Experience as ExperienceType } from '@/data/experiences';

const categoryIcons = { event: Mic, committee: Users, competition: Award, performance: Mic };

// Gallery photos mapped to experiences
const experienceGallery: Record<string, string[]> = {
  'exp-1': ['/images/emoji2.png'],
  'exp-2': ['/images/emoji3.png', '/images/emoji4.png'],
  'exp-3': ['/images/emoji3.png'],
  'exp-4': ['/images/emoji5.png'],
  'exp-5': ['/images/emoji1.png'],
  'exp-6': ['/images/emoji2.png'],
  'exp-7': ['/images/emoji4.png'],
  'exp-8': ['/images/emoji5.png'],
  'exp-9': ['/images/emoji1.png', '/images/emoji6.png'],
  'exp-10': ['/images/emoji2.png'],
  'exp-11': ['/images/emoji5.png'],
  'exp-12': ['/images/emoji1.png'],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

const Experience = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef(null);
  const containerInView = useInView(containerRef, { once: true, margin: "-100px" });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-20 pb-28 lg:pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Experience & Achievements</h1>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">Leadership, creativity, continuous growth, and documented results</p>
          </div>

          {/* Experience Grid */}
          <div ref={containerRef} className="mb-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={containerInView ? "visible" : "hidden"}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {experiences.map((exp, index) => {
                const Icon = categoryIcons[exp.category];
                const photos = experienceGallery[exp.id] || [];
                const isExpanded = expandedId === exp.id;

                return (
                  <motion.div
                    key={exp.id}
                    variants={cardVariants}
                    whileHover={{ y: -4 }}
                  >
                    <Card className="glass-card h-full flex flex-col overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        {/* Photo Section */}
                        {photos.length > 0 && (
                          <div className="md:w-1/3 p-4 flex-shrink-0">
                            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                              <img
                                src={photos[0]}
                                alt={`${exp.title} documentation`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        )}

                        {/* Content Section */}
                        <div className={`flex-1 ${photos.length > 0 ? 'md:pl-0 pl-4' : 'p-4'}`}>
                          <CardHeader className="pb-3 px-0">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                              <Icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge variant="secondary" className="capitalize text-xs font-semibold">
                                {exp.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {exp.date}
                              </span>
                            </div>
                            <CardTitle className="text-base lg:text-lg text-foreground line-clamp-2">
                              {exp.title}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="flex-1 flex flex-col pb-3 px-0">
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
                              {exp.shortDesc}
                            </p>
                          </CardContent>
                        </div>
                      </div>

                      {/* Full Description Footer */}
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-border/40"
                      >
                        <div className="px-6 py-3 bg-muted/20">
                          <p className="text-xs leading-relaxed text-foreground/80">
                            {exp.fullDesc}
                          </p>
                        </div>
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={containerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-3 gap-3 md:gap-6"
          >
            <Card className="glass-card p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {experiences.length}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Total Experiences</p>
            </Card>
            <Card className="glass-card p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {Object.keys(categoryIcons).length}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Categories</p>
            </Card>
            <Card className="glass-card p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {Object.values(experienceGallery).flat().length}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Documentations</p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Experience;
