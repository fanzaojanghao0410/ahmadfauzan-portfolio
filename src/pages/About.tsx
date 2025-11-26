// @ts-nocheck
import { motion, useInView } from 'framer-motion';
import { Calendar, MapPin, User, GraduationCap, Target, Heart, Lightbulb, Code, Palette, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { PageLayout } from '@/components/PageLayout';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { Badge } from '@/components/ui/badge';
import { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15
    }
  }
};

const About = () => {
  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true, margin: "-100px" });

  const personalDetails = [
    { icon: User, label: 'Name', value: 'Ahmad Fauzan' },
    { icon: MapPin, label: 'Based In', value: 'Bekasi, Indonesia' },
    { icon: Code, label: 'Focus', value: 'Frontend Development & Creative Tech' },
  ];

  const education = [
    {
      period: '2024 – Present',
      institution: 'Metland Vocational High School',
      major: 'Information Technology'
    }
  ];

  // Map institution names to logo image paths (place logos in `public/images/education/`)
  const educationLogos: Record<string, string> = {
    'Metland Vocational High School': '/education-logo/LOGO SMK METLAND.png',
  };

  const values = [
    { icon: Target, title: 'Visionary', description: 'Pushing creative boundaries across multiple disciplines' },
    { icon: Heart, title: 'Passionate', description: 'Deeply committed to craft and continuous artistic growth' },
    { icon: Lightbulb, title: 'Innovative', description: 'Blending creativity with technology for unique solutions' },
  ];

  const interests = [
    { icon: Code, label: 'Frontend Development' },
    { icon: Palette, label: 'Visual Design' },
    { icon: Users, label: 'Storytelling' },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: 'linear-gradient(135deg, rgba(128, 0, 32, 0.15) 0%, rgba(160, 0, 42, 0.1) 100%)',
                border: '1px solid rgba(128, 0, 32, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-semibold tracking-wide" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
                Designer • Writer • Actor • Developer
              </span>
            </motion.div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              style={{ 
                color: 'rgba(255, 240, 240, 0.95)',
                textShadow: '0 2px 10px rgba(128, 0, 32, 0.3), 0 4px 20px rgba(128, 0, 32, 0.2)'
              }}
            >
              About Me
            </motion.h1>
            <motion.p
              className="text-lg max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ color: 'rgba(255, 220, 220, 0.85)' }}
            >
              A multidisciplinary creative professional blending visual design, storytelling, performance, and technology
            </motion.p>
            <motion.div
              className="mx-auto mt-8 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              style={{ background: '' }}
            />
          </motion.div>

          {/* Profile & Personal Details Section */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex justify-center lg:justify-start"
              >
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-2xl blur-2xl group-hover:blur-3xl"
                    style={{
                      background: 'rgba(128, 0, 32, 0.2)',
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative">
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
                  </div>
                </motion.div>
              </motion.div>

              {/* Personal Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-6"
              >
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ color: 'rgba(255, 240, 240, 0.95)' }}
                >
                  Personal Information
                </motion.h2>
                <div className="space-y-4">
                  {personalDetails.map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -2, scale: 1.01 }}
                    >
                      <Card className="p-5 hover:shadow-glow transition-all duration-300 relative overflow-hidden group" style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(to bottom right, rgba(128, 0, 32, 0.05), transparent)' }}
                        />
                        <div className="flex items-center gap-4 relative z-10">
                          <motion.div 
                            className="flex-shrink-0 p-3 rounded-lg"
                            style={{ backgroundColor: 'rgba(128, 0, 32, 0.1)' }}
                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <detail.icon className="w-5 h-5" style={{ color: 'var(--maroon-primary)' }} />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                          <p className="text-sm mb-1 font-medium" style={{ color: 'rgba(255, 200, 200, 0.7)' }}>{detail.label}</p>
                          <p className="font-semibold text-base md:text-lg" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>{detail.value}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Interests Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="mt-8"
                >
                  <p className="text-sm font-medium mb-3" style={{ color: 'rgba(255, 200, 200, 0.7)' }}>Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                      <motion.div
                        key={interest.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.1 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="px-4 py-2 text-sm"
                          style={{ 
                            borderColor: 'rgba(128, 0, 32, 0.3)',
                            backgroundColor: 'rgba(128, 0, 32, 0.05)'
                          }}
                        >
                          <interest.icon className="w-4 h-4 mr-2" style={{ color: 'var(--maroon-primary)' }} />
                          {interest.label}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* About Me Story Section */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-8 text-center"
                style={{ color: 'rgba(255, 240, 240, 0.95)' }}
              >
                My Story
              </motion.h2>
              <Card className="p-8 md:p-12 hover:shadow-glow transition-all duration-300" style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
                <div className="space-y-6 max-w-4xl mx-auto">
                  <motion.p 
                    className="text-base md:text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    style={{ color: 'rgba(255, 220, 220, 0.85)' }}
                  >
                    I am Ahmad Fauzan, an IT student at <span className="font-semibold text-maroon" style={{ color: 'var(--maroon-primary)' }}>Metland Vocational School</span>, 
                    driven by a passion for creative expression across multiple disciplines. My journey spans visual design, novel writing, 
                    performance art, and frontend development.
                  </motion.p>
                  <motion.p 
                    className="text-base md:text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    style={{ color: 'rgba(255, 220, 220, 0.85)' }}
                  >
                    I believe that great work emerges from the intersection of art and technology. Whether designing interfaces, 
                    crafting narratives, performing on stage, or writing code, I approach each discipline with the same dedication 
                    to excellence, creativity, and human connection.
                  </motion.p>
                  <motion.p 
                    className="text-base md:text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    style={{ color: 'rgba(255, 220, 220, 0.85)' }}
                  >
                    My goal is to create meaningful experiences that resonate emotionally while remaining technically sound, 
                    blending the worlds of art and innovation.
                  </motion.p>
                </div>
              </Card>
            </motion.div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-12 text-center"
                style={{ color: 'rgba(255, 240, 240, 0.95)' }}
              >
                Core Values
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <Card className="p-6 h-full hover:shadow-glow transition-all duration-300 text-center" style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}>
                      <motion.div
                        className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(128, 0, 32, 0.1)' }}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <value.icon className="w-8 h-8" style={{ color: 'var(--maroon-primary)' }} />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
                        {value.title}
                      </h3>
                      <p className="text-base" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>{value.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Education Timeline Section */}
          <section className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <motion.div 
                className="flex items-center justify-center gap-4 mb-12"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <GraduationCap className="w-10 h-10" style={{ color: 'var(--maroon-primary)' }} />
                </motion.div>
                <motion.h2 
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: 'rgba(255, 240, 240, 0.95)' }}
                >
                  Education
                </motion.h2>
              </motion.div>
              
              <div className="relative">
                {/* Timeline Line */}
                <div 
                  className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block"
                  style={{ background: 'linear-gradient(to bottom, var(--maroon-primary), var(--maroon-light))' }}
                />
                
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.institution}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.6 + index * 0.15, duration: 0.6 }}
                      className="relative"
                    >
                      {/* Timeline Dot */}
                      <div 
                        className="absolute left-6 w-4 h-4 rounded-full hidden md:block z-10"
                        style={{ 
                          backgroundColor: 'var(--maroon-primary)',
                          boxShadow: '0 0 10px rgba(128, 0, 32, 0.6)',
                          top: '1.5rem'
                        }}
                      />
                      
                      <Card 
                        className="ml-0 md:ml-16 p-6 md:pl-24 hover:shadow-glow transition-all duration-300 relative overflow-hidden group" 
                        style={{ borderColor: 'rgba(128, 0, 32, 0.2)' }}
                        whileHover={{ x: 5 }}
                      >
                        {/* Education logo as direct image (absolute, vertically centered). Hidden on small screens. */}
                        <img
                          src={educationLogos[edu.institution] || '/images/education/default-school.png'}
                          alt={`${edu.institution} logo`}
                          aria-hidden
                          className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 object-contain transition-transform duration-300 group-hover:scale-105 shadow-md"
                        />

                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(to right, rgba(128, 0, 32, 0.05), transparent)' }}
                        />
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl md:text-2xl font-semibold mb-2 transition-colors duration-300 hover:text-maroon" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
                              {edu.institution}
                            </h3>
                            {edu.major && (
                              <p className="font-medium text-base md:text-lg" style={{ color: 'var(--maroon-primary)' }}>
                                {edu.major}
                              </p>
                            )}
                          </div>
                          <motion.div 
                            className="font-semibold px-4 py-2 rounded-lg flex-shrink-0"
                            style={{ 
                              backgroundColor: 'rgba(128, 0, 32, 0.1)',
                              border: '1px solid rgba(128, 0, 32, 0.2)',
                              color: 'rgba(255, 200, 200, 0.7)'
                            }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            {edu.period}
                          </motion.div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default About;