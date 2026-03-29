/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Email form state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setTimeout(() => {
      setStatus("idle");
    }, 3000);
  };

  // Set up scroll progress tracking over the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Shared font styles
  const text_font_colour = "#9E5BC8";

  // Parallax translation speeds based on your list:
  // Foreground (Fastest), Sky, Lake, Grassy Planes (Slowest)
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const skyY = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const lakeY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const grassyY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  // Scale artboard accurately without distortion (recreates object-cover visually)
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const updateScale = () => {
      // The exact master artboard size from your SVGs
      const artboardW = 1800;
      const artboardH = 1200;
      const scaleX = window.innerWidth / artboardW;
      const scaleY = window.innerHeight / artboardH;
      setScale(Math.max(scaleX, scaleY));
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-[#C2F5FD] text-foreground selection:bg-accent-primary selection:text-white">

      {/* Header (Retained from original) */}
      {/*
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#756281] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/gemini logo.png"
              alt="Gemini logo"
              width={60}
              height={20}
              className="object-contain"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="#waitlist-hero"
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
            >
              Join waitlist
            </Link>
          </div>
        </div>
      </header>
      */}

      {/* Main Container for Parallax Graphic Scene */}
      <main ref={containerRef} className="relative w-full h-[300vh]">

        {/* Sticky viewport container keeps layers on screen during scroll */}
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#C2F5FD]">

          {/* Master Artboard Container */}
          <div
            style={{
              position: 'absolute',
              top: '1vh',
              left: '50%',
              width: '1800px',
              height: '1200px',
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: 'top center',
              pointerEvents: 'none'
            }}
          >
            {/* 1. Plain Background */}
            <img
              src="/plain_background.svg"
              alt=""
              style={{ position: 'absolute', left: 0, top: -9, width: 1800, height: 1200, zIndex: 0 }}
            />

            {/* 2. Sky Components */}
            <motion.img
              src="/sky_components.svg"
              alt=""
              style={{ position: 'absolute', left: -0.5, top: -320.5, width: 1906, height: 2473, zIndex: 35, y: skyY }}
            />

            {/* 3. Grassy Planes (Slowest movement) */}
            <motion.img
              src="/grassy_planes.svg"
              alt=""
              style={{ position: 'absolute', left: -0.5, top: -150, width: 1823, height: 2036, zIndex: 10, y: grassyY }}
            />

            {/* 4. Lake */}
            <motion.img
              src="/lake.svg"
              alt=""
              style={{ position: 'absolute', left: 201.6, top: 259.5, width: 2751, height: 1286, zIndex: 30, y: lakeY }}
            />

            {/* 5. Foreground Component (Fastest movement) */}
            <motion.img
              src="/foreground_components.svg"
              alt=""
              style={{ position: 'absolute', left: 0, top: 450, width: 2144, height: 1992, zIndex: 40, y: foregroundY }}
            />

            {/* 6. Arched Title Text */}
            <motion.div
              style={{
                position: 'absolute',
                top: -80,
                left: 0,
                width: 1800,
                height: 400,
                zIndex: 50,
                y: skyY, // Scroll it up with the sky so it feels rooted in the background
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <svg width="1800" height="400" viewBox="0 0 1800 400" style={{ overflow: 'visible' }}>
                <defs>
                  {/* Expanded arch curve with plenty of length to prevent SVG path clipping */}
                  <path id="textCurve" d="M 100,350 Q 900,50 1700,350" fill="transparent" />
                </defs>
                <text style={{ 
                  fontFamily: 'var(--font-baloo), sans-serif', 
                  fontSize: '85px', 
                  fontWeight: 'bold',
                  letterSpacing: '2px'
                }}>
                  <textPath
                    href="#textCurve"
                    startOffset="50%"
                    textAnchor="middle"
                    fill={text_font_colour}
                    stroke="#FFFFFF"
                    strokeWidth="15"
                    strokeLinejoin="round"
                    style={{ paintOrder: 'stroke fill' }}
                  >
                    Health has never been this fun
                  </textPath>
                </text>
              </svg>
            </motion.div>

            {/* 7. Subtitle Text */}
            <motion.div
              style={{
                position: 'absolute',
                top: 150, // Comfortably nested right under the arch
                left: 0,
                width: 1800,
                height: 200,
                zIndex: 51,
                y: skyY, // Links the parallax scrolling directly onto the sky's movement to match the title
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <svg width="1800" height="200" viewBox="0 0 1800 200" style={{ overflow: 'visible' }}>
                <text 
                  x="50%" 
                  y="70" 
                  textAnchor="middle" 
                  fill={text_font_colour} 
                  stroke="#FFFFFF" 
                  strokeWidth="5" 
                  strokeLinejoin="round"
                  style={{ 
                    fontFamily: 'var(--font-baloo), sans-serif', 
                    fontSize: '35px', 
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    paintOrder: 'stroke fill'
                  }}
                >
                  Stay consistent with better habits.
                </text>
                <text 
                  x="50%" 
                  y="120" 
                  textAnchor="middle" 
                  fill={text_font_colour} 
                  stroke="#FFFFFF" 
                  strokeWidth="5" 
                  strokeLinejoin="round"
                  style={{ 
                    fontFamily: 'var(--font-baloo), sans-serif', 
                    fontSize: '35px', 
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    paintOrder: 'stroke fill'
                  }}
                >
                  Collect and evolve your pets as you get healthier.
                </text>
              </svg>
            </motion.div>

            {/* 8. Email Input Box */}
            <motion.form
              onSubmit={handleSubscribe}
              style={{
                position: 'absolute',
                top: 320, // Snapped cleanly under the subtitle text
                left: 0,
                width: 1800,
                zIndex: 52,
                y: skyY, // Locked to the same group scroll
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email..."
                className="placeholder-[#ECD7FA] transition-transform hover:-translate-y-1 focus:scale-[1.02]"
                style={{
                  pointerEvents: 'auto',
                  backgroundColor: '#FFFFFF',
                  border: `4px solid ${text_font_colour}`,
                  boxShadow: 'inset 7px 7px 0px #FFC528',
                  borderRadius: '999px',
                  width: '650px',
                  height: '75px',
                  padding: '0 40px',
                  fontSize: '32px',
                  fontFamily: 'var(--font-baloo), sans-serif',
                  color: text_font_colour,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="transition-transform hover:-translate-y-1 active:scale-95 disabled:hover:translate-y-0 disabled:active:scale-100 disabled:opacity-80"
                style={{
                  pointerEvents: 'auto',
                  backgroundColor: status === "success" ? "#FFC528" : text_font_colour,
                  boxShadow: 'inset 7px 7px 0px #FFC528',
                  borderRadius: '999px',
                  height: '75px',
                  padding: '0 50px',
                  fontSize: '32px',
                  fontFamily: 'var(--font-baloo), sans-serif',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: status === "loading" || status === "success" ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {status === "loading" ? "..." : status === "success" ? "Done!" : "Join!"}
              </button>
            </motion.form>
          </div>
        </div>
      </main>

      {/* Content Section below the graphics */}
      <section className="relative z-50 bg-white min-h-[50vh] p-8 md:p-16 flex flex-col items-center border-t-8 border-[#756281]">
        <h2 className="text-3xl md:text-5xl font-bold text-[#483556] mb-6 pt-16">
          More updates coming soon!
        </h2>
        <p className="text-gray-500 text-lg md:text-xl text-center max-w-2xl">
          Don't forget to keep an eye on your inbox 👀
        </p>
      </section>

      {/* Footer (Retained from original) */}
      <footer className="relative z-50 border-t border-white/10 bg-[#483556] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-white">mewnie</div>
          <div className="flex gap-6 text-gray-300 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
          <div className="text-gray-400 text-sm">
            © 2026 Mewnie Inc. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
