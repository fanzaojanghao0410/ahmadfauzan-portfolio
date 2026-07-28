// @ts-nocheck
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/PageLayout';
import { categoryIcons } from '@/data/experiences';
import { useExperiences } from '@/hooks/useSiteData';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } }
};

const Experience = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const containerRef = useRef(null);
  const containerInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { data: experiences } = useExperiences();


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

          <div ref={containerRef} className="mb-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={containerInView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {experiences.map((exp) => {
                const iconName = categoryIcons[exp.category];
                const isExpanded = expandedId === exp.id;

                return (
                  <motion.div key={exp.id} variants={cardVariants} whileHover={{ y: -4 }}>
                    <Card className="glass-card h-full flex flex-col overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 p-4 flex-shrink-0">
                          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                            <img
                              src={exp.image}
                              alt={`${exp.title} documentation`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        </div>

                        <div className="flex-1 md:pl-0 pl-4 md:pr-4">
                          <CardHeader className="pb-3 px-0">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                              <Icon icon={iconName} className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge variant="secondary" className="capitalize text-xs font-semibold">
                                {exp.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Icon icon="lucide:calendar" className="w-3 h-3" /> {exp.date}
                              </span>
                            </div>
                            <CardTitle className="text-base lg:text-lg text-foreground line-clamp-2">
                              {exp.title}
                            </CardTitle>
                          </CardHeader>

                          <CardContent className="flex-1 flex flex-col pb-3 px-0">
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
                              {exp.short_desc}
                            </p>
                            <button
                              onClick={() => toggleExpand(exp.id)}
                              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 self-start"
                            >
                              {isExpanded ? 'Hide details' : 'View details'}
                              <Icon
                                icon="lucide:chevron-down"
                                className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                              />
                            </button>
                          </CardContent>
                        </div>
                      </div>

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
                            {exp.full_desc}
                          </p>
                        </div>
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={containerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-3 gap-3 md:gap-6"
          >
            <Card className="glass-card p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{experiences.length}</div>
              <p className="text-xs md:text-sm text-muted-foreground">Total Experiences</p>
            </Card>
            <Card className="glass-card p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {Object.keys(categoryIcons).length}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">Categories</p>
            </Card>
            <Card className="glass-card p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{experiences.length}</div>
              <p className="text-xs md:text-sm text-muted-foreground">Documentations</p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Experience;
