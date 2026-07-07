// @ts-nocheck
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/PageLayout';
import { useState, useEffect, useRef } from 'react';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { experiences, categoryIcons } from '@/data/experiences';
import './Index.css';


const RotatingText = ({ texts = [], rotationInterval = 3000 }: { texts: string[]; rotationInterval?: number }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (texts.length === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, rotationInterval);
    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  if (texts.length === 0) return null;

  return (
    <div className="rotating-text-container px-6 py-2.5">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rotating-text inline-block font-bold text-xl md:text-2xl lg:text-3xl tracking-tight"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
};

// About Preview
const AboutPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon icon="lucide:user" className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">About Me</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get to know me better</p>
        </motion.div>


        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div className="order-2 lg:order-1" initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }}>
            <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
              I am Ahmad Fauzan, an IT student with a multifaceted creative passion. By day, I craft 
              elegant frontend solutions; by night, I weave intricate narratives as a novelist.
            </p>
            <p className="text-lg leading-relaxed mb-6 text-muted-foreground">
              With expertise in visual design, web development, storytelling, and performance art, I bring a 
              holistic creative approach to every project.
            </p>
            <Link to="/about">
              <Button className="primary-button">
                Learn More About Me
                <Icon icon="lucide:chevron-right" className="ml-2 w-4 h-4" />
              </Button>

            </Link>
          </motion.div>
          <motion.div className="order-1 lg:order-2 flex justify-center" initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.6 }}>
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
        </div>
      </div>
    </section>
  );
};

// Skills Preview
const SkillsPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const previewSkills = [
    { title: 'Visual Design', icon: 'lucide:palette' },
    { title: 'Novel Writing', icon: 'lucide:book-open' },
    { title: 'Frontend Dev', icon: 'lucide:code-2' },
    { title: 'Performance Art', icon: 'lucide:drama' },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon icon="lucide:brain" className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Skills & Expertise</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Technical proficiency meets interpersonal abilities</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {previewSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <Card className="glass-card w-32 h-32 flex flex-col items-center justify-center text-center p-4">
                <Icon icon={skill.icon} className="w-8 h-8 mb-3 text-primary" />
                <p className="text-sm font-medium text-foreground">{skill.title}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/skills">
            <Button className="primary-button">
              View All Skills <Icon icon="lucide:chevron-right" className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};


// Experience Preview
const ExperiencePreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const featuredExperiences = experiences.slice(0, 3);

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon icon="lucide:briefcase" className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Recent Experience</h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Leadership, creativity, and continuous growth</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredExperiences.map((exp, index) => {
            const iconName = categoryIcons[exp.category];
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <Card className="glass-card overflow-hidden h-full group">
                  <div className="w-full h-48 overflow-hidden relative">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                      <Icon icon={iconName} className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs capitalize">{exp.category}</Badge>
                      <span className="text-xs text-muted-foreground">{exp.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground">{exp.shortDesc}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link to="/experience">
            <Button className="primary-button">
              View All Experience <Icon icon="lucide:chevron-right" className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};


// Contact Preview
const ContactPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <Card className="glass-card p-8 md:p-16 text-center">
            <Icon icon="lucide:mail" className="w-12 h-12 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you.
            </p>
            <Link to="/contact">
              <Button className="primary-button">
                Get In Touch <Icon icon="lucide:mail" className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </Card>

        </motion.div>
      </div>
    </section>
  );
};

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const name = "Ahmad Fauzan";
  const rotatingTexts = ["creating", "designing", "writing", "performing"];
  const description = "A creative visionary blending visual design, storytelling, performance art, and cutting-edge technology into compelling digital experiences.";

  return (
    <PageLayout>
      <div className="pb-20 lg:pb-0">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
              
              {/* Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-primary/5 border border-primary/10">
                <span className="text-sm font-semibold tracking-wide text-foreground">Creative Visionary & Developer</span>
              </motion.div>

              {/* Name */}
              <motion.h1 variants={itemVariants} className="name-typography text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tighter">
                {name}
              </motion.h1>
              
              {/* Rotating text */}
              <motion.div variants={itemVariants} className="mb-10 flex flex-col sm:flex-row justify-center items-center gap-2">
                <span className="font-bold text-xl sm:text-2xl md:text-3xl text-foreground">I'm</span>
                <RotatingText texts={rotatingTexts} rotationInterval={3200} />
              </motion.div>

              {/* Description */}
              <motion.p variants={itemVariants} className="description-text text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-14 text-muted-foreground font-light">
                {description}
              </motion.p>

              {/* CTA */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                <Link to="/projects">
                  <Button size="lg" className="primary-button px-8 py-6 text-base md:text-lg rounded-xl font-semibold">
                    Explore My Work
                    <Icon icon="lucide:arrow-right" className="ml-2 w-5 h-5" />
                  </Button>

                </Link>
                <a href="https://drive.google.com/file/d/1fFvi-j3rT1jMHCscybAsZkBk-lUyE0nt/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="outline-button px-8 py-6 text-base md:text-lg rounded-xl font-semibold">
                    Download CV
                  </Button>
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-border">
                {[
                  { value: "4", label: "Creative Disciplines" },
                  { value: "10+", label: "Projects" },
                  { value: "100%", label: "Passion" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="stat-value text-2xl md:text-3xl mb-2">{stat.value}</div>
                    <div className="stat-label text-xs md:text-sm font-medium uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Sections */}
        <div className="relative">
          <AboutPreview />
          <SkillsPreview />
          <ExperiencePreview />
          <ContactPreview />
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
