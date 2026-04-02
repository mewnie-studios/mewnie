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
  const text_font_colour = "#4a1d5eff";

  // Parallax translation speeds based on your list:
  // Foreground (Fastest), Sky, Lake, Grassy Planes (Slowest)
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const skyY = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const uiY = useTransform(scrollYProgress, [0, 1], [0, -950]); // Slightly faster than sky
  const lakeY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const grassyY = useTransform(scrollYProgress, [0, 1], [0, -180]);

  // Scale artboard accurately without distortion (recreates object-cover visually)
  const [scale, setScale] = useState(1);
  const [windowWidth, setWindowWidth] = useState(1024);
  useEffect(() => {
    const updateScale = () => {
      // The exact master artboard size from your SVGs
      const artboardW = 1800;
      const artboardH = 1200;
      const scaleX = window.innerWidth / artboardW;
      const scaleY = window.innerHeight / artboardH;
      setScale(Math.max(scaleX, scaleY));
      setWindowWidth(window.innerWidth);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Calculate the visible width of the artboard in its internal coordinates.
  const safeInternalWidth = scale > 0 ? (windowWidth / scale) : 1800;

  // Title text uses standard HTML sizing now

  // Subtitle shrinks gracefully to keep text bound neatly within the card
  const subtitleScale = Math.min(1, (0.95 * safeInternalWidth) / 1000);
  const subtitleFontSize = Math.max(35, 26 * subtitleScale);

  // Card background responsive wrap to securely space it off the edges
  const cardWidth = Math.min(1000, safeInternalWidth - 40);
  const cardPadding = safeInternalWidth < 600 ? 20 : 12;

  // Form controls stay strictly large, snapping to wrap exactly on screen borders
  const inputWidth = Math.min(650, safeInternalWidth - 40);
  const inputHeight = safeInternalWidth < 800 ? 55 : 52;
  const inputFontSize = windowWidth < 768 ? 25 : 25;
  const inputPadding = 40;
  const buttonPadding = 50;

  // Gradually push the foreground and UI layers down as the screen squishes layout
  const squishFactor = Math.max(0, Math.min(1, (1500 - safeInternalWidth) / 600));
  const foregroundTop = 540 + (140 * squishFactor);
  const textTop = 100 + (80 * squishFactor);
  const formTop = 400 + (100 * squishFactor);

  return (
    <div className="min-h-screen font-sans bg-[#C2F5FD] text-foreground selection:bg-accent-primary selection:text-white">




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

            {/* Logo attached to sky so it scrolls away organically */}
            <motion.div
              style={{
                position: 'absolute',
                top: 20,
                left: (1800 - safeInternalWidth) / 2 + 40, // Keeps it pinned to the screen's edge even when squished!
                zIndex: 55, // above sky
                y: skyY,
                pointerEvents: 'auto', // so it can be clicked
              }}
            >
              <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-4">
                {/* <Image
                  src="/gemini logo.png"
                  alt="Mewnie logo"
                  width={90}
                  height={50}
                  className="object-contain"
                /> */}
                <span
                  style={{
                    fontFamily: 'var(--font-jakarta), sans-serif',
                    fontSize: `${30 - (8 * squishFactor)}px`,
                    fontWeight: 'bold',
                    color: text_font_colour,
                    letterSpacing: '1px'
                  }}
                >
                  Mewnie
                </span>
              </Link>
            </motion.div>

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
              style={{ position: 'absolute', left: 0, top: foregroundTop, width: 2144, height: 1992, zIndex: 40, y: foregroundY }}
            />

            {/* 6. Title and Subtitle Text */}
            <motion.div
              style={{
                position: 'absolute',
                top: textTop,
                left: 0,
                width: 1800,
                height: 280,
                zIndex: 51,
                y: uiY, // Scrolls faster than the sky
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  // background: 'rgba(0, 0 ,0,0.05)',
                  // background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.3))',
                  // backdropFilter: 'blur(8px)',
                  // borderRadius: '24px',
                  // border: '1px solid rgba(255,255,255,0.2)',
                  padding: `${cardPadding}px`,
                  width: `${cardWidth}px`,
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '24px'
                }}
              >
                <h1
                  style={{
                    fontFamily: 'var(--font-jakarta), sans-serif',
                    fontWeight: 780,
                    fontSize: 'clamp(50px, 5vw, 55px)',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em',
                    color: text_font_colour,
                    textAlign: 'center',
                    margin: 0
                  }}
                >
                  Build healthy habits.
                  <br />
                  Watch your pet thrive.
                </h1>

                <div style={{ textAlign: 'center', padding: windowWidth < 768 ? '0 40px' : '0' }}>
                  {/* <p 
                    style={{ 
                      fontFamily: 'var(--font-jakarta), sans-serif', 
                      fontSize: `${subtitleFontSize}px`, 
                      fontWeight: 'bold',
                      letterSpacing: '1px',
                      color: text_font_colour,
                      margin: '0 0 1px 0'
                    }}
                  >
                    Stay consistent with better habits.
                  </p> */}
                  <p
                    style={{
                      fontFamily: 'var(--font-jakarta), sans-serif',
                      fontSize: `${subtitleFontSize}px`,
                      fontWeight: 780,
                      letterSpacing: '1px',
                      color: text_font_colour,
                      margin: 0
                    }}
                  >
                    Stay consistent, collect and evolve your pets.
                  </p>
                </div>
              </div>
            </motion.div>


            {/* 8. Email Input Box */}
            <motion.form
              onSubmit={handleSubscribe}
              style={{
                position: 'absolute',
                top: formTop, // Gradually drops with the squish factor
                left: (1800 - safeInternalWidth) / 2, // Centered tightly exactly to the viewport boundary
                width: safeInternalWidth, // Pinches the form wrap boundary exactly to screen edge
                zIndex: 52,
                y: uiY, // Scrolls faster than the sky
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: safeInternalWidth < 800 ? 'column' : 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: safeInternalWidth < 800 ? '20px' : '15px',
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email..."
                className="placeholder-[#602c77]/80 transition-transform hover:-translate-y-1 focus:scale-[1.02]"
                style={{
                  pointerEvents: 'auto',
                  // backgroundColor: '#FFFFFF',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                  border: `1.5px solid ${text_font_colour}`,
                  boxShadow: `inset 4px 4px 0px #FFC528`,
                  borderRadius: '30px',
                  width: safeInternalWidth < 800 ? '60%' : '30%',
                  maxWidth: '500px',
                  minWidth: 'min(300px, 100%)', // Locks the box to a fixed minimum size so it stops squishing on mobile
                  height: `60px`,
                  padding: `0 ${inputPadding}px`,
                  // fontSize: `${inputFontSize}px`,
                  fontSize: `${30 - (4 * squishFactor)}px`,
                  fontFamily: 'var(--font-jakarta), sans-serif',
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
                  boxShadow: `inset 4px 4px 0px #FFC528`,
                  borderRadius: '30px',
                  width: safeInternalWidth < 800 ? '300px' : 'auto', // Visually shorter than the input box above it
                  height: `70px`,
                  // padding: `0 ${buttonPadding}px`,
                  padding: `0 30px`,
                  // fontSize: `${inputFontSize}px`,
                  fontSize: `${Math.max(35, 20 - (4 * squishFactor))}px`,
                  fontFamily: 'var(--font-jakarta), sans-serif',
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: status === "loading" || status === "success" ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {status === "loading" ? "..." : status === "success" ? "Done!" : "Join Waitlist!"}
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
