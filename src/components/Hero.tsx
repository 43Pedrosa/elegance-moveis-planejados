import { motion, useReducedMotion } from "motion/react";

import { useEffect, useRef } from "react";

const VIDEO_PATH = "/hero/cozinha.mp4";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (reduceMotion) video.current?.pause();
    else video.current?.play().catch(() => { /* A imagem de capa permanece se a reprodução automática for bloqueada. */ });
  }, [reduceMotion]);

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#1C1A18]">
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        <video
          ref={video}
          autoPlay={!reduceMotion}
          poster="/hero/cozinha-poster.jpg"
          loop
          muted
          playsInline
          controls={false}
          preload="metadata"
          className="h-full w-full object-cover object-center opacity-100 transition-opacity duration-700"
        >
          <source src={VIDEO_PATH} type="video/mp4" />
          Seu navegador não suporta a reprodução de vídeos.
        </video>

        <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-start px-6 sm:px-12 md:px-24">
        <div className="w-full overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 2.2,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-serif text-[15vw] font-light leading-none tracking-[-0.04em] text-white [text-shadow:0_4px_24px_rgb(0_0_0_/_0.3)] sm:text-[clamp(74px,13vw,250px)] sm:tracking-[-0.06em]"
          >
            ELEGANCE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: reduceMotion ? 0 : 0.95,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-3 ml-1 font-sans text-[9px] font-medium uppercase tracking-[0.42em] text-white/85 sm:mt-4 sm:text-[11px] md:text-[13px]"
          >
            Móveis Planejados
          </motion.p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 opacity-40 md:bottom-10">
        <span className="h-px w-8 bg-white" />
        <span className="select-none font-sans text-[9px] uppercase tracking-[0.25em] text-white">
          Explore
        </span>
      </div>
    </section>
  );
}