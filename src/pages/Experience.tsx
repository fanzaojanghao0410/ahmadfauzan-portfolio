// @ts-nocheck
import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Calendar, Award, Users, Mic } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/PageLayout';
import { experiences, Experience as ExperienceType } from '@/data/experiences';
import { useRef } from 'react';
import InfiniteMenu from '../components/InfiniteMenu/InfiniteMenu';

const items = [
  {
    image: '/images/emoji1.png',
    link: '#',
    title: 'Digital Content Creation',
    description: 'Creating structured, engaging, and purpose-driven digital materials'
  },
  {
    image: '/images/emoji2.png',
    link: '#',
    title: 'Creative Writing',
    description: 'Developing stories, scripts, and narrative concepts for digital media'
  },
  {
    image: '/images/emoji3.png',
    link: '#',
    title: 'Visual Design Basics',
    description: 'Designing simple digital visuals and layouts for online use'
  },
  {
    image: '/images/emoji4.png',
    link: '#',
    title: 'Digital Branding',
    description: 'Building personal branding elements for online identity'
  },
  {
    image: '/images/emoji5.png',
    link: '#',
    title: 'Public Communication',
    description: 'Presenting and delivering messages effectively through digital platforms'
  },
  {
    image: '/images/emoji6.png',
    link: '#',
    title: 'Story Development',
    description: 'Structuring ideas and turning them into digital-ready concepts'
  }
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    filter: "blur(10px)",
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

const categoryIcons = {
  event: Mic,
  committee: Users,
  competition: Award,
  performance: Mic
};

const categoryColors = {
  event: 'bg-blue-500/10 text-blue-500',
  committee: 'bg-green-500/10 text-green-500',
  competition: 'bg-yellow-500/10 text-yellow-500',
  performance: 'bg-purple-500/10 text-purple-500'
};

const Experience = () => {
  const [selectedExp, setSelectedExp] = useState<ExperienceType | null>(null);
  const infiniteMenuRef = useRef(null);
  const isInView = useInView(infiniteMenuRef, { once: true, margin: "-100px" });

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>Experience</h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
              A journey of creative expression, design innovation, storytelling, and digital development
            </p>
          </div>

          {/* Experiences Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {experiences.map((exp, index) => {
              const Icon = categoryIcons[exp.category];
              return (
                <motion.div
                  key={exp.id}
                  variants={cardVariants}
                  whileHover={{ 
                    x: 8,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="p-6 hover:shadow-glow transition-smooth overflow-hidden relative group" style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
                    {/* Animated background gradient on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(to right, rgba(128, 0, 32, 0.05), rgba(128, 0, 32, 0.1))' }}
                      initial={false}
                    />
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                      <motion.div 
                        className="flex-shrink-0"
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:shadow-glow transition-all" style={{ backgroundColor: 'rgba(128, 0, 32, 0.1)', border: '1px solid rgba(128, 0, 32, 0.2)' }}>
                          <Icon className="w-6 h-6 text-maroon" style={{ color: 'var(--maroon-primary)' }} />
                        </div>
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Badge className={`${categoryColors[exp.category]}`} style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
                              {exp.category}
                            </Badge>
                          </motion.div>
                          <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255, 200, 200, 0.7)' }}>
                            <Calendar className="w-4 h-4" />
                            {exp.date}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 transition-colors hover:text-maroon" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
                          {exp.title}
                        </h3>
                        <p className="text-base mb-4" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>{exp.shortDesc}</p>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Button
                          onClick={() => setSelectedExp(exp)}
                          variant="outline"
                          className="flex-shrink-0 outline-button group/btn"
                          style={{ borderColor: 'rgba(128, 0, 32, 0.3)' }}
                        >
                          View Details
                          <motion.span
                            className="ml-2 inline-block button-icon-outline w-1.5 h-1.5 rounded-full"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        </Button>
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Infinite Menu Section - Enhanced with Container */}
        <motion.section
          ref={infiniteMenuRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-32 pt-16"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ color: 'rgba(255, 240, 240, 0.95)' }}
            >
              Creative Works & Projects
            </motion.h2>
            <motion.p 
              className="text-lg max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{ color: 'rgba(255, 220, 220, 0.85)' }}
            >
              Showcasing my diverse creative endeavors spanning visual design, novel writing, performances, and web development
            </motion.p>
          </div>

          {/* Enhanced Container with Border Radius */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="relative"
          >
            <div className="">
              <div className="h-[600px] relative rounded-xl overflow-hidden">
                <InfiniteMenu items={items}/>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Experience Detail Modal */}
      <AnimatePresence>
        {selectedExp && (
          <Dialog open={!!selectedExp} onOpenChange={() => setSelectedExp(null)}>
            <DialogContent className="max-w-2xl" style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
              <DialogHeader>
                <DialogTitle className="text-2xl text-maroon" style={{ color: 'var(--maroon-primary)' }}>{selectedExp.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Badge className={`${categoryColors[selectedExp.category]}`} style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
                    {selectedExp.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255, 200, 200, 0.7)' }}>
                    <Calendar className="w-4 h-4" />
                    {selectedExp.date}
                  </div>
                </div>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>{selectedExp.fullDesc}</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Experience;