// @ts-nocheck
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PageLayout } from '@/components/PageLayout';
import { useMemo, useState } from 'react';
import { useProjects } from '@/hooks/useSiteData';

const caseSections = [
  { key: 'problem', label: 'Problem Statement', icon: 'lucide:target' },
  { key: 'tech_decisions', label: 'Technical Decisions', icon: 'lucide:cpu' },
  { key: 'challenges', label: 'Challenges & Solutions', icon: 'lucide:puzzle' },
  { key: 'results', label: 'Results & Impact', icon: 'lucide:trending-up' },
];

const ProjectLinks = ({ project }) =>
  (project.link || project.github) ? (
    <div className="flex flex-wrap gap-3">
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
  ) : null;

const Projects = () => {
  const { data } = useProjects();
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState(null);

  const projects = useMemo(
    () => [...data].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || a.sort_order - b.sort_order),
    [data]
  );
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category || 'Web Application')))],
    [projects]
  );
  const shown = filter === 'All' ? projects : projects.filter((p) => (p.category || 'Web Application') === filter);
  const hasCase = (p) => caseSections.some((s) => p[s.key]);

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-20 pb-28 lg:pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Projects</h1>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">Selected works across development, design, and creative writing</p>
          </div>

          {categories.length > 2 && (
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    filter === c ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          <motion.div layout className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {shown.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Card className="glass-card p-6 h-full flex flex-col group">
                    <div className="mb-4 overflow-hidden rounded-lg aspect-video relative">
                      <img src={project.image} alt={`${project.title} preview`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      {project.featured && (
                        <span className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg">
                          <Icon icon="lucide:star" className="w-3.5 h-3.5" /> Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Icon icon={project.icon} className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${project.status_color}`} />
                        <span className="text-xs font-medium text-muted-foreground">{project.status}</span>
                      </div>
                    </div>

                    <p className="text-xs uppercase tracking-wider text-primary font-medium mb-1">{project.category || 'Web Application'}</p>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{project.title}</h3>
                    <p className="text-sm mb-4 flex-1 text-muted-foreground">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto">
                      {hasCase(project) && (
                        <Button variant="ghost" size="sm" onClick={() => setActive(project)} className="text-primary">
                          <Icon icon="lucide:book-open" className="w-4 h-4 mr-2" /> Case Study
                        </Button>
                      )}
                      <ProjectLinks project={project} />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto w-[calc(100vw-1.5rem)] sm:w-full rounded-2xl">
          {active && (
            <>
              <img src={active.image} alt="" className="w-full aspect-video object-cover rounded-lg" />
              <DialogHeader>
                <p className="text-xs uppercase tracking-wider text-primary font-medium">{active.category || 'Web Application'}</p>
                <DialogTitle className="text-2xl">{active.title}</DialogTitle>
                <DialogDescription>{active.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                {active.tags.map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
              </div>
              <div className="space-y-5 pt-2">
                {caseSections.filter((s) => active[s.key]).map((s) => (
                  <div key={s.key}>
                    <h4 className="flex items-center gap-2 font-semibold mb-1.5 text-foreground">
                      <Icon icon={s.icon} className="w-4 h-4 text-primary" /> {s.label}
                    </h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{active[s.key]}</p>
                  </div>
                ))}
              </div>
              <ProjectLinks project={active} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default Projects;
