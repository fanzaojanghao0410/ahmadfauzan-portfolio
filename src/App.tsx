// @ts-nocheck
"use client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { Sidebar } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import CardSwap from "@/components/CardSwap/CardSwap";
import LiquidEther from "./components/LiquidEther";
import ProfileCard from '../src/components/ProfileCard/ProfileCard'
import SplashCursor from '@/components/SplashCursor/SplashCursor'
import Particles from '../src/components/Particles/Particles';

import Index from "./pages/Index";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            {/* ===================== */}
            {/* ✨ Particles Background */}
            {/* ===================== */}
            <div style={{ 
              width: '100%', 
              height: '100vh', 
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: -1,
              pointerEvents: 'auto'
            }}>
              <Particles
                particleColors={['#ffffff', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={false}
                disableRotation={false}
              />
            </div>

            {/* ===================== */}
            {/* 🌐 App Layout */}
            {/* ===================== */}
            <div className="relative min-h-screen w-full flex">
              {/* Sidebar */}
              <Sidebar />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
            <SplashCursor />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;