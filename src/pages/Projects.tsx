// @ts-nocheck
import { motion, useInView } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/PageLayout';
import { useRef } from 'react';
import { useProjects } from '@/hooks/useSiteData';

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { data: projects } = useProjects();



  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-20 pb-28 lg:pb-20">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Projects</h1>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">Selected works across development, design, and creative writing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="glass-card p-6 h-full flex flex-col group">
                  <div className="mb-4 overflow-hidden rounded-lg aspect-video">
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Icon icon={project.icon} className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${project.statusColor}`} />
                      <span className="text-xs font-medium text-muted-foreground">{project.status}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">{project.title}</h3>
                  <p className="text-sm mb-4 flex-1 text-muted-foreground">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>

                  {(project.link || project.github) && (
                    <div className="flex gap-3 mt-auto">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="outline-button">
                            <Icon icon="mdi:github" className="w-4 h-4 mr-2" /> Code
                          </Button>
                        </a>
                      )}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button size="sm" className="primary-button">
                            <Icon icon="lucide:external-link" className="w-4 h-4 mr-2" /> Live Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Projects;
