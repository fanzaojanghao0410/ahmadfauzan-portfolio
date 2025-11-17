import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedProject: React.FC = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span style={{ color: 'rgba(255, 240, 240, 0.95)' }}>Crafting Digital</span>
            <br />
          </h2>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
            Selected projects that combine craft, storytelling and performance-grade engineering.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Project 1 - Portfolio Website */}
          <Card className="group relative overflow-hidden p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-maroon-dark/20 to-maroon-darker/10 backdrop-blur-sm">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-maroon-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--maroon-primary)' }}>
                  Live Project
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
                  Portfolio Website
                </h3>
                <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
                  A narrative-driven portfolio built with React, TypeScript, Tailwind and Framer Motion. 
                  Focus on performance, accessibility and theatrical interactions.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {['React', 'TypeScript', 'Tailwind'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{ 
                        background: 'rgba(128,0,32,0.15)', 
                        color: 'var(--maroon-primary)',
                        border: '1px solid rgba(128,0,32,0.3)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a 
                  href="https://github.com/fanzaojanghao0410/ahmadfauzan-portfolio" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1"
                >
                  <Button 
                    variant="outline" 
                    className="primary-button"
                    style={{ color: 'var(--maroon-primary)' }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Code
                      <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          </Card>

          {/* Project 2 - Interactive Story */}
          <Card className="group relative overflow-hidden p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-maroon-dark/15 to-maroon-darker/5 backdrop-blur-sm">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-maroon-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                <span className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--maroon-primary)' }}>
                  Prototype
                </span>
              </div>

              {/* Title & Description */}
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight" style={{ color: 'rgba(255, 240, 240, 0.95)' }}>
                  Interactive Story
                </h3>
                <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: 'rgba(255, 220, 220, 0.85)' }}>
                  An interactive storytelling prototype blending animated text, branching narrative 
                  and responsive audio cues. Built as a proof-of-concept for narrative-led interfaces.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {['UX Design', 'Prototyping'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                      style={{ 
                        background: 'rgba(128,0,32,0.15)', 
                        color: 'var(--maroon-primary)',
                        border: '1px solid rgba(128,0,32,0.3)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button 
                  variant="outline" 
                  className="primary-button"
                  style={{ color: 'var(--maroon-primary)' }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;