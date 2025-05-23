import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 sm:p-16 bg-gray-100 text-gray-800">
      <header className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">About BahtsulMasail.tech</h1>
        <p className="text-xl text-gray-600">
          Illuminating Jurisprudence, Empowering Understanding for a Vibrant Islamic Civilization.
        </p>
      </header>

      <section className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Vision</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          To be the preeminent digital embodiment of &quot;Bahtsul Masail untuk Islam Digdaya,&quot; an Awwwards-recognized platform where the depth, dynamism, and intellectual rigor of Islamic jurisprudence are showcased through exceptional design, intuitive AI-powered tools, and collaborative scholarly engagement.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          BahtsulMasail.tech aims to preserve, analyze, and present these crucial discussions in a way that inspires intellectual confidence, fosters enlightened understanding, and contributes to a vibrant, forward-looking Islamic civilization.
        </p>
      </section>

      <section className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">The Core Problem We Address</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          The invaluable insights from Bahtsul Masail, essential for navigating contemporary challenges and fostering an &quot;Islam Digdaya,&quot; often remain confined to specialized circles or presented in formats that lack the visual appeal and accessibility needed to engage a broader, digitally-savvy audience. This limits their potential to inspire and empower.
        </p>
      </section>

      <section className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Solution</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          BahtsulMasail.tech will be a landmark web platform, built with Next.js for peak performance and sophisticated UI, supported by a robust Django backend. It will fuse advanced AI-driven search and analysis with world-class UI/UX design embodying the spirit of &quot;Islam Digdaya.&quot;
        </p>
      </section>

      <div className="mt-12 text-center">
        <Link href="/" legacyBehavior>
          <a className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition duration-300">
            &larr; Back to Home
          </a>
        </Link>
      </div>
       <footer className="mt-16 pt-8 border-t border-gray-300 w-full max-w-4xl text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BahtsulMasail.tech - Clarity in Knowledge.
      </footer>
    </main>
  );
} 