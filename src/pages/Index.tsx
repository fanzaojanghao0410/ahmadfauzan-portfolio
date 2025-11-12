// @ts-nocheck
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, User, Brain, Briefcase, Mail, ChevronRight, Award, Mic, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageLayout } from '@/components/PageLayout';
import { useState, useEffect, useRef } from 'react';
import Particles from '../components/Particles/Particles';
import { experiences } from '@/data/experiences';
import { technicalSkills } from '@/data/skills';
import './Index.css';

// RotatingText Component
const RotatingText = ({ 
  texts = [], 
  rotationInterval = 3000 
}: { 
  texts: string[];
  rotationInterval?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 400);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  if (texts.length === 0) return null;

  return (
    <motion.div className="flex items-center justify-center">
      <motion.div 
        className="rotating-text-container"
        whileHover={{
          scale: 1.02,
          backgroundColor: "rgba(128, 0, 32, 0.18)",
          transition: { duration: 0.2 }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rotating-text inline-block font-bold text-xl md:text-2xl tracking-tight whitespace-nowrap"
          >
            {texts[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      mass: 0.8
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(2px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

// About Preview Component
const AboutPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <User className="w-8 h-8 md:w-10 md:h-10" style={{ color: 'var(--maroon-primary)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
              About Me
            </h2>
          </div>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
            Get to know me better
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
              I am Ahmad Fauzan, an IT student with a multifaceted creative passion. By day, I craft 
              elegant frontend solutions; by night, I weave intricate narratives as a novelist.
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'rgba(255, 220, 220, 0.75)' }}>
              With expertise in visual design, web development, storytelling, and performance art, I bring a 
              holistic creative approach to every project, seamlessly blending aesthetics with functionality, 
              and imagination with innovation.
            </p>
            <div className="flex justify-start">
              <Link to="/about">
                <Button className="primary-button group">
                  Learn More About Me
                  <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="p-6 md:p-8 w-full max-w-md hover:shadow-glow transition-all" style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Name', value: 'Ahmad Fauzan' },
                  { label: 'Age', value: '17 years' },
                  { label: 'Location', value: 'Bekasi, Indonesia' },
                  { label: 'Education', value: 'IT Student' }
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: 'rgba(128, 0, 32, 0.05)' }}
                  >
                    <p className="text-xs mb-2 uppercase tracking-wide" style={{ color: 'rgba(255, 200, 200, 0.7)' }}>{item.label}</p>
                    <p className="font-semibold text-base" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Skills Preview Component
// Skills Preview Component
const SkillsPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Skills data untuk preview
  const previewSkills = [
    { title: "Visual Design", icon: "🎨" },
    { title: "Novel Writing", icon: "✍️" },
    { title: "Frontend Development", icon: "💻" },
    { title: "Performance Art", icon: "🎭" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: 'rgba(20, 0, 5, 0.3)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 md:w-10 md:h-10" style={{ color: 'var(--maroon-primary)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
              Skills & Expertise
            </h2>
          </div>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
            A combination of technical proficiency and interpersonal abilities
          </p>
        </motion.div>
        
        {/* Skills Grid - Pusatkan dengan flexbox */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full max-w-4xl">
            {previewSkills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ 
                  delay: 0.2 + index * 0.05, 
                  duration: 0.4 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="flex-shrink-0"
              >
                <Card 
                  className="
                    w-32 h-32 
                    flex flex-col 
                    items-center 
                    justify-center 
                    text-center 
                    p-4 
                    hover:shadow-glow 
                    transition-all
                  " 
                  style={{ 
                    borderColor: 'rgba(128, 0, 32, 0.2)',
                    backgroundColor: 'rgba(128, 0, 32, 0.05)'
                  }}
                >
                  <div 
                    className="text-2xl mb-3"
                    style={{ color: 'var(--maroon-primary)' }}
                  >
                    {skill.icon}
                  </div>
                  <p 
                    className="text-sm font-medium leading-tight"
                    style={{ color: 'rgba(255, 240, 240, 0.95)' }}
                  >
                    {skill.title}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Button Section */}
        <div className="flex justify-center">
          <Link to="/skills">
            <Button className="primary-button">
              View All Skills
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Experience Preview Component
const ExperiencePreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const featuredExperiences = experiences.slice(0, 3);

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

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 lg:py-40"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 md:w-10 md:h-10" style={{ color: 'var(--maroon-primary)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
              Recent Experience
            </h2>
          </div>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
            A journey of leadership, creativity, and continuous growth
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
            {featuredExperiences.map((exp, index) => {
              const Icon = categoryIcons[exp.category];
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="flex justify-center"
                >
                  <Card className="overflow-hidden hover:shadow-glow transition-all h-full w-full group" style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
                    <div 
                      className="w-full h-48 md:h-56 bg-gradient-to-br flex items-center justify-center relative overflow-hidden"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.3), rgba(160, 0, 42, 0.2))'
                      }}
                    >
                      <div 
                        className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity"
                        style={{
                          backgroundImage: `url(/images/emoji${(index % 6) + 1}.png)`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'grayscale(100%)'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <Icon className="w-16 h-16 md:w-20 md:h-20 relative z-10 group-hover:scale-110 transition-transform" style={{ color: 'var(--maroon-primary)', opacity: 0.8 }} />
                    </div>
                    
                    <div className="p-5 md:p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge className={`${categoryColors[exp.category]}`} style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
                          {exp.category}
                        </Badge>
                        <span className="text-xs" style={{ color: 'rgba(255, 200, 200, 0.7)' }}>{exp.date}</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold mb-3" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
                        {exp.title}
                      </h3>
                      <p className="text-sm md:text-base mb-4" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
                        {exp.shortDesc}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center">
          <Link to="/experience">
            <Button className="primary-button">
              View All Experience
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Contact Preview Component
const ContactPreview = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 lg:py-40"
      style={{ backgroundColor: 'rgba(20, 0, 5, 0.3)' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 md:p-12 lg:p-16 text-center hover:shadow-glow transition-all w-full max-w-4xl" style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
            <Mail className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6" style={{ color: 'var(--maroon-primary)' }} />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
              Let's Work Together
            </h2>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
              Have a project in mind or want to collaborate? I'd love to hear from you. 
              Let's create something amazing together.
            </p>
            <div className="flex justify-center">
              <Link to="/contact">
                <Button size="lg" className="primary-button text-base md:text-lg px-8 py-6">
                  Get In Touch
                  <Mail className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

const Index = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const name = "Ahmad Fauzan";
  const rotatingTexts = ["creating", "designing", "writing", "performing"];
  const description = "A creative visionary blending visual design, storytelling, performance art, and cutting-edge technology into compelling digital experiences.";
  const words = description.split(" ");

  return (
    <PageLayout>
      <div className="index-container index-background relative overflow-hidden">
        {/* Particles Background */}
        <div style={{ 
          width: '100%', 
          height: '100%', 
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'auto'
        }}>
          <Particles
            particleColors={['#800020', '#a0002a']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>

        {/* Overlay */}
        <div className="index-overlay absolute inset-0 z-1" />

        {/* Cursor-activated dot */}
        {isHovering && (
          <motion.div
            className="cursor-dot fixed w-2 h-2 rounded-full pointer-events-none z-50"
            style={{
              left: cursorPosition.x - 4,
              top: cursorPosition.y - 4,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 20,
              mass: 0.5
            }}
          />
        )}

        {/* Hero Section */}
        <section 
          className="relative z-10 min-h-screen flex items-center justify-center py-20 md:py-32"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ opacity }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              {/* Professional Badge */}
              <motion.div
                variants={letterVariants}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 professional-badge"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <Sparkles className="sparkles-icon w-4 h-4" />
                </motion.div>
                <span className="text-sm font-semibold tracking-wide" style={{ color: 'rgba(255, 220, 220, 0.95)' }}>
                  Creative Visionary & Developer
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.div className="mb-8">
                <motion.h1
                  className="name-typography text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
                >
                  {name.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      variants={letterVariants}
                      custom={index}
                      whileHover={{
                        scale: 1.05,
                        color: "rgba(255, 180, 180, 1)",
                        y: -2,
                        transition: { 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 12,
                          mass: 0.7
                        }
                      }}
                      className="name-letter inline-block cursor-default"
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </motion.h1>
                
                {/* Tagline */}
                <motion.div
                  variants={letterVariants}
                  className="mb-8"
                >
                  <motion.div
                    className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 18,
                      duration: 0.4
                    }}
                  >
                    <motion.span 
                      className="font-bold text-xl sm:text-2xl md:text-3xl tracking-tight"
                      style={{ color: 'rgba(255, 240, 240, 0.95)' }}
                    >
                      Creative
                    </motion.span>
                    <RotatingText texts={rotatingTexts} rotationInterval={3200} />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Value Proposition */}
              <motion.div
                className="max-w-3xl mx-auto mb-12"
                variants={letterVariants}
              >
                <motion.p
                  className="description-text text-lg sm:text-xl md:text-2xl leading-relaxed font-medium px-4"
                  initial="hidden"
                  animate="visible"
                  style={{ color: 'rgba(255, 220, 220, 0.85)' }}
                >
                  {words.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      variants={{
                        hidden: { 
                          opacity: 0, 
                          y: 8,
                          filter: "blur(2px)",
                          scale: 0.95
                        },
                        visible: (i: number) => ({
                          opacity: 1, 
                          y: 0,
                          filter: "blur(0px)",
                          scale: 1,
                          transition: {
                            delay: i * 0.04,
                            duration: 0.6,
                            ease: [0.25, 0.46, 0.45, 0.94],
                            scale: {
                              duration: 0.4,
                              ease: "backOut"
                            }
                          }
                        })
                      }}
                      custom={index}
                      className="description-word inline-block mr-1.5"
                      whileHover={{
                        color: "rgba(255, 180, 180, 1)",
                        scale: 1.05,
                        y: -1,
                        transition: { 
                          duration: 0.3,
                          ease: "easeOut",
                          color: {
                            duration: 0.2
                          }
                        }
                      }}
                      style={{
                        display: 'inline-block',
                        willChange: 'transform, opacity, filter'
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>

              {/* Primary CTA Buttons */}
              <motion.div
                variants={letterVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              >
                <Link to="/experience">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      transition: { 
                        type: "spring", 
                        stiffness: 280, 
                        damping: 12,
                        mass: 0.8
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="lg" 
                      className="primary-button group relative font-semibold px-8 py-6 text-base md:text-lg rounded-xl transition-all duration-300"
                    >
                      <span className="relative z-10">Explore My Work</span>
                      <ArrowRight className="button-icon-primary ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 ease-out" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/contact">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      transition: { 
                        type: "spring", 
                        stiffness: 280, 
                        damping: 12,
                        mass: 0.8
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="outline-button group font-semibold px-8 py-6 text-base md:text-lg rounded-xl transition-all duration-300"
                    >
                      <span>Get In Touch</span>
                      <motion.div
                        className="button-icon-outline ml-2 w-1.5 h-1.5 rounded-full"
                        animate={{ 
                          scale: [1, 1.3, 1],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Key Metrics / Stats */}
              <motion.div
                variants={letterVariants}
                className="stats-container grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t"
                style={{ borderColor: 'rgba(128, 0, 32, 0.3)' }}
              >
                {[
                  { value: "4", label: "Creative Disciplines" },
                  { value: "10+", label: "Projects" },
                  { value: "100%", label: "Passion" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="stat-item text-center"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      transition: { 
                        type: "spring", 
                        stiffness: 280,
                        damping: 12
                      }
                    }}
                  >
                    <motion.div 
                      className="stat-value text-3xl md:text-4xl font-bold mb-2"
                      whileHover={{ 
                        color: "var(--maroon-light)",
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="stat-label text-xs md:text-sm font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="relative z-10">
          <AboutPreview />
          <SkillsPreview />
          <ExperiencePreview />
          <ContactPreview />
        </div>

        {/* Floating elements */}
        {isHovering && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-element absolute rounded-full"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                }}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 30,
                }}
                animate={{
                  y: -30,
                  x: [null, `${Math.random() * 60 - 30}px`],
                  opacity: [0, 0.2, 0.2, 0],
                  scale: [0, 1, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 8 + 6,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Index;
