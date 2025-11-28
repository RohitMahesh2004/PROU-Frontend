// src/app/page.tsx
"use client";

import React, { Suspense, useState } from "react";
import EarthScene from "@/components/EarthScene";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SparklesCore } from "@/components/ui/sparkles";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const navItems = [
  { name: "HOME", link: "#" },
  { name: "ABOUT", link: "#" },
  { name: "CONTACT", link: "#" },
];

const words = `PLANET EARTH`;

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  return (
    <AuroraBackground>
      {/* SPARKLES BACKGROUND */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* NAVBAR */}
      <Navbar className="fixed top-5 left-0 right-0 z-[100] pointer-events-none font-[var(--font-astro)]">
        <NavBody className="pointer-events-auto mx-auto">

          {/* Desktop nav */}
          <NavItems 
            items={navItems} 
            className="font-[var(--font-astro)] tracking-widest"
          />

          {/* Mobile nav toggle */}
          <div className="lg:hidden">
            <MobileNavToggle 
              isOpen={isOpen} 
              onClick={() => setIsOpen(!isOpen)} 
            />
          </div>

        </NavBody>

        {/* MOBILE MENU */}
        <MobileNav visible={isOpen}>
          <MobileNavHeader className="font-[var(--font-astro)]">

            {/* Mobile toggle only */}
            <MobileNavToggle 
              isOpen={isOpen} 
              onClick={() => setIsOpen(!isOpen)} 
            />

          </MobileNavHeader>

          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            {navItems.map((item, i) => (
              <a 
                key={i}
                href={item.link}
                className="text-black dark:text-white text-lg font-[var(--font-astro)] tracking-widest"
              >
                {item.name}
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* PAGE CONTENT */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        {/* TEXT HEADER (uses TextGenerateEffect which applies the Orbitron font via var(--font-astro)) */}
        <div style={{ fontFamily: "var(--font-astro)" }}>
          <div className="absolute top-28 w-full flex justify-center z-[50] px-4 text-center">
            <TextGenerateEffect
              words={words}
              className="text-white text-4xl md:text-3xl tracking-widest"
              filter={true}
              duration={0.6}
            />
          </div>
          
          {/* SUBTITLE WITH GLASSY BACKGROUND - Shows on click */}
          {showDescription && (
            <div className="absolute top-48 w-full flex justify-center z-[50] px-4 animate-in fade-in duration-500">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg px-6 py-3 max-w-2xl">
                <p className="text-white/90 text-sm md:text-base tracking-wide">
                  Our home in the cosmos, a pale blue dot floating in the vastness of space
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* EARTH SCENE – shifted downward from center */}
        <div 
          className="absolute inset-0 flex justify-center items-center pt-52 cursor-pointer"
          onClick={() => setShowDescription(!showDescription)}
        >
          <Suspense fallback={null}>
            <EarthScene />
          </Suspense>
        </div>

        {/* FOOTER - Interactive glassy element */}
        <footer className="absolute bottom-6 left-0 right-0 z-[50] px-6">
          <div className="max-w-6xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Left side - Social links */}
              <div className="flex gap-6">
                <a 
                  href="#" 
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wider font-[var(--font-astro)]"
                >
                  TWITTER
                </a>
                <a 
                  href="#" 
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wider font-[var(--font-astro)]"
                >
                  GITHUB
                </a>
                <a 
                  href="#" 
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm tracking-wider font-[var(--font-astro)]"
                >
                  LINKEDIN
                </a>
              </div>

              {/* Center - Copyright */}
              <div className="text-white/70 text-sm font-[var(--font-astro)] tracking-wider">
                © 2024 PLANET EARTH
              </div>

              {/* Right side - Quick actions */}
              <div className="flex gap-4">
                <button 
                  className="backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white/80 hover:text-white transition-all duration-300 text-sm tracking-wider font-[var(--font-astro)]"
                >
                  EXPLORE
                </button>
                <button 
                  className="backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white/80 hover:text-white transition-all duration-300 text-sm tracking-wider font-[var(--font-astro)]"
                >
                  LEARN MORE
                </button>
              </div>

            </div>
          </div>
        </footer>
      </div>
    </AuroraBackground>
  );
}