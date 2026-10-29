/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { MotionConfig, useReducedMotion } from 'motion/react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Philosophy from './components/Philosophy';
import Footer from './components/Footer';
import EnvironmentPage from './pages/EnvironmentPage';

function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Projects />
        <Philosophy />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);
    const stopForMenu = (event: Event) => {
      if ((event as CustomEvent<boolean>).detail) lenis.stop();
      else lenis.start();
    };
    window.addEventListener('menu-toggle', stopForMenu);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('menu-toggle', stopForMenu);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        let id = location.hash.slice(1);
        try { id = decodeURIComponent(id); } catch { /* Keep malformed fragments harmless. */ }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, reduceMotion]);

  return (
    <MotionConfig reducedMotion="user"><div className="relative min-h-screen selection:bg-brand-accent selection:text-white bg-[#F5F3EF]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cozinhas" element={<EnvironmentPage title="Cozinhas" />} />
        <Route path="/quartos" element={<EnvironmentPage title="Quartos" />} />
        <Route path="/salas" element={<EnvironmentPage title="Salas" />} />
        <Route path="/banheiros" element={<EnvironmentPage title="Banheiros" />} />
        <Route path="/adegas" element={<EnvironmentPage title="Adegas" />} />
        <Route path="*" element={<main className="min-h-screen px-6 pt-40 text-center"><h1 className="font-serif text-5xl">Página não encontrada</h1><p className="my-8">O endereço pode ter mudado. Conheça nossos ambientes na página inicial.</p><Link to="/" className="underline">Voltar ao início</Link></main>} />
      </Routes>
    </div></MotionConfig>
  );
}
