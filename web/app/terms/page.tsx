
import Link from "next/link";
import Image from "next/image";


export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[rgb(200,240,209)] font-sans text-gray-900">
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

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 border-b pb-4">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Mewnie ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
              <p>
                Mewnie is currently in a beta phase. The Service is provided "as is" and "as available". We reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Conduct</h2>
              <p>
                You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, impairs, or renders the Service less efficient.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Intellectual Property</h2>
              <p>
                All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Mewnie or its content suppliers and protected by international copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Beta Usage</h2>
              <p>
                Users acknowledge that the software is in a development stage (Beta) and may contain errors or bugs. We are not liable for any data loss or other issues that may arise during the use of the Beta version.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Mewnie operates, without regard to its conflict of law provisions.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-black/10 bg-black/5 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold text-gray-800">mewnie</div>
          <div className="flex gap-6 text-gray-600 text-sm">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors font-medium">Terms of Service</Link>
            <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
          </div>
          <div className="text-gray-500 text-sm">© 2026 Mewnie Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
