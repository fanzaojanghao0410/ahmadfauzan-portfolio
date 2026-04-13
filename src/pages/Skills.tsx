import { motion, useInView } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/PageLayout';
import { technicalSkills, softSkills } from '@/data/skills';
import { useRef, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

const Skills = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const technicalRef = useRef(null);
  const softRef = useRef(null);
  const technicalInView = useInView(technicalRef, { once: true, margin: "-100px" });
  const softInView = useInView(softRef, { once: true, margin: "-100px" });

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Skills & Expertise</h1>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              A combination of technical proficiency and interpersonal abilities
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-16" ref={technicalRef}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-foreground">Technical Skills</h2>
            <motion.div variants={containerVariants} initial="hidden" animate={technicalInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <motion.div key={skill.title} variants={cardVariants} whileHover={{ y: -6 }}>
                    <Card className="glass-card h-full">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-foreground">{skill.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{skill.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Soft Skills */}
          <div ref={softRef}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-foreground">Soft Skills</h2>
            <motion.div variants={containerVariants} initial="hidden" animate={softInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {softSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <motion.div key={skill.title} variants={cardVariants} whileHover={{ y: -6 }}>
                    <Card className="glass-card h-full">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg text-foreground">{skill.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Skills;
