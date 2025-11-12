import { motion, useInView } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageLayout } from '@/components/PageLayout';
import { technicalSkills, softSkills } from '@/data/skills';
import { useRef, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    rotateX: -15,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15
    }
  }
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              style={{ color: 'rgba(255, 240, 240, 0.95)' }}
            >
              Skills & Expertise
            </motion.h1>
            <motion.div 
              initial={{ widths: 0 }}
              animate={{ widths: 80 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            />
            <motion.p 
              className="text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ color: 'rgba(255, 220, 220, 0.85)' }}
            >
              A combination of technical proficiency and interpersonal abilities that drive success
            </motion.p>
          </div>

          {/* Technical Skills */}
          <div className="mb-16" ref={technicalRef}>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold mb-8 text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={technicalInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ color: 'rgba(255, 240, 240, 0.95)' }}
            >
              Technical Skills
            </motion.h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={technicalInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {technicalSkills.map((skill) => {
                const Icon = skill.icon;
                const isHovered = hoveredCard === skill.title;
                return (
                  <motion.div
                    key={skill.title}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -8, 
                      scale: 1.03,
                      rotateY: 5,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    onHoverStart={() => setHoveredCard(skill.title)}
                    onHoverEnd={() => setHoveredCard(null)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <Card className="h-full hover:shadow-glow transition-smooth overflow-hidden relative group">
                      {/* Animated gradient overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <CardHeader className="relative z-10">
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"
                          animate={isHovered ? { 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <Icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <CardTitle className="group-hover:text-maroon transition-colors" style={{ '--maroon-primary': '#800020' } as React.CSSProperties}>
                          {skill.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-base" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>{skill.description}</p>
                      </CardContent>

                      {/* Corner accent */}
                      <motion.div
                        className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Soft Skills */}
          <div ref={softRef}>
            <motion.h2 
              className="text-2xl md:text-3xl font-semibold mb-8 text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={softInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ color: 'rgba(255, 240, 240, 0.95)' }}
            >
              Soft Skills
            </motion.h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate={softInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {softSkills.map((skill) => {
                const Icon = skill.icon;
                const isHovered = hoveredCard === `soft-${skill.title}`;
                return (
                  <motion.div
                    key={skill.title}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -8,
                      scale: 1.05,
                      rotateZ: 2,
                      transition: { type: "spring", stiffness: 300, damping: 15 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredCard(`soft-${skill.title}`)}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <Card className="h-full hover:shadow-glow transition-smooth relative overflow-hidden group">
                      {/* Pulsing background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20"
                        animate={isHovered ? {
                          opacity: [0.5, 0.8, 0.5],
                        } : { opacity: 0 }}
                        transition={{ duration: 2, repeatType: "reverse" }}
                      />

                      <CardHeader className="relative z-10">
                        <motion.div 
                          className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4"
                          animate={isHovered ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          } : {}}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-6 h-6 text-primary" />
                        </motion.div>
                        <CardTitle className="text-lg group-hover:text-maroon transition-colors" style={{ '--maroon-primary': '#800020' } as React.CSSProperties}>
                          {skill.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-sm" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>{skill.description}</p>
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
