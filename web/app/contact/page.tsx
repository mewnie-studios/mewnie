
import Link from "next/link";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[rgb(200,240,209)] font-sans text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#756281] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/gemini logo.png"
              alt="Mewnie logo"
              width={60}
              height={20}
              className="object-contain"
            />
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
          >
            Join Beta
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600">
              Have questions about the beta? Looking to partner? Or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-10">
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
              <p className="text-purple-600 font-medium">isaac.arli@gmail.com</p>
            </div>

            <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100 text-center">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Instagram</h3>
              <p className="text-pink-600 font-medium">@mewnieapp</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              We typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-black/10 bg-black/5 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-gray-800">mewnie</div>
          <div className="flex gap-6 text-gray-600 text-sm">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-black transition-colors font-medium">Contact</Link>
          </div>
          <div className="text-gray-500 text-sm">© 2026 Mewnie Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
