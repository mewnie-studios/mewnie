import Link from "next/link";
import Image from "next/image";

import FadeIn from "@/components/FadeIn";
import HowItWorks from "@/components/HowItWorks";
import VideoPlayer from "@/components/VideoPlayer";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-[rgb(200,240,209)] text-foreground selection:bg-accent-primary selection:text-white">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#756281] border-b border-white/10">
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

      <main className="pt-20">
        {/* Hero Section */}
        <section id="waitlist-hero" className="w-full relative scroll-mt-20">
            <div className="relative w-full">
              {/* Background Image */}
              <Image
                src="/frontpageclear.png"
                alt="Mewnie Interface Background"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
                priority
                unoptimized
              />

              {/* Foreground Overlay Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-center md:-mt-12">
                <FadeIn>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#483556] tracking-tight drop-shadow-xl mb-3 md:mb-5">
                    Making Health Fun
                  </h1>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-[#362741] font-semibold max-w-xs sm:max-w-md md:max-w-2xl mb-6 md:mb-10 drop-shadow-lg leading-snug">
                    Mewnie makes tracking health fun by turning your daily health habits into rewards. Be rewarded for your steps, sleep and exercise! You'll have a Pet which grows and evolves as you get healthier!
                  </p>
                </FadeIn>
                <FadeIn delay={0.2} className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                  <WaitlistForm />
                </FadeIn>
              </div>
            </div>
        </section>

        {/* River Background Section */}
        <section className="w-full relative">
            <div className="relative w-full">
              <Image
                src="/secondpagefinal2.0.png"
                alt="River Background"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
                unoptimized
              />
              <div className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-video rounded-[3rem] overflow-hidden">
                <VideoPlayer
                  src="/Mewnie Product Video Actual.mov"
                  className="w-full h-full"
                />
              </div>
            </div>
        </section>

        {/* How It Works Section */}
        <HowItWorks />




        {/* FAQ Section */}
        <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {[
              {
                q: "Is Mewnie free to use?",
                a: "Yes! Completely free to use and there will be no features behind a paywall. Only cosmetics will be available for purchase.",
              },
              {
                q: "Will there be other Mewnie's I can collect?",
                a: "Yes! We are currently developing more Mewnies in the pipeline so you can collect and evolve your favourite one!",
              },
              {
                q: "Can I use the app right now?",
                a: "Unfortunately, the app is still currently in a closed beta but you can sign up below to join the waitlist! (Limited numbers)",
              },
              {
                q: "What makes this app different from other apps?",
                a: "Mewnie is different from other apps because it is a unique experience that allows you to collect and evolve your own Mewnies!",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <details
                  className="group glass rounded-xl border border-black/10 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-black/5 transition-colors list-none">
                    <span className="font-medium text-lg text-black">
                      {item.q}
                    </span>
                    <span className="text-gray-600 group-open:rotate-180 transition-transform duration-300">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0 text-gray-700 leading-relaxed border-t border-black/5 mt-2">
                    <p className="pt-4">{item.a}</p>
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6">
            <div className="w-full max-w-5xl mx-auto relative rounded-3xl md:rounded-[3rem] overflow isolate flex flex-col justify-center items-center text-center py-17 px-4 md:py-32 transform-gpu [backface-visibility:hidden] [will-change:transform]">
              <Image
                src="/sleepyforest.png"
                alt="Sleepy Forest"
                fill
                className="object-cover -z-10"
                unoptimized
                priority
              />
              <FadeIn>
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg">
                  Join Mewnie Today
                </h2>
              </FadeIn>
              
              <FadeIn delay={0.1}>
                <Link
                  href="#waitlist-hero"
                  className="px-8 py-4 mb-30 md:px-10 md:py-5 rounded-full bg-white text-black font-bold text-lg md:text-xl hover:bg-gray-100 transition-transform hover:scale-105 inline-block shadow-lg"
                >
                  Join waitlist
                </Link>
              </FadeIn>
            </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/20 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-white">mewnie</div>
          <div className="flex gap-6 text-gray-400 text-sm">
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
          <div className="text-gray-500 text-sm">
            © 2026 Mewnie Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
