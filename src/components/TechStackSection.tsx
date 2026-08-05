import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { techStack } from '@/data/techStack';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const TechStackSection = ({ showHeading = true }: { showHeading?: boolean }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="w-full">
      {showHeading && (
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon icon="lucide:layers" className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Tech Stack</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tools and technologies I use to build modern web experiences
          </p>
        </motion.div>
      )}

      <div className="space-y-10">
        {techStack.map((group) => (
          <div key={group.category}>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon icon={group.icon} className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{group.category}</h3>
              <div className="flex-1 h-px bg-border ml-2" />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
            >
              {group.items.map((tech) => (
                <motion.div key={tech.name} variants={cardVariants}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ y: -6, scale: 1.03 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="h-full"
                      >
                        <Card className="glass-card h-full p-4 flex flex-col items-center justify-center gap-3 text-center transition-smooth hover:border-primary/40 hover:shadow-glow cursor-default">
                          <Icon
                            icon={tech.icon}
                            className={`w-9 h-9 sm:w-10 sm:h-10 ${tech.invertOnDark ? 'text-foreground dark:invert-0' : ''}`}
                          />
                          <p className="text-xs sm:text-sm font-medium text-foreground leading-tight">{tech.name}</p>
                        </Card>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>{tech.hint}</TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default memo(TechStackSection);
