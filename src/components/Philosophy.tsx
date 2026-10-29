import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useRef, useState } from "react";

const beliefs = [
  {
    id: 1,
    title: "PROJETOS\nEXCLUSIVOS",
    description:
      "Criamos projetos sob medida totalmente personalizados, traduzindo as suas necessidades reais em ambientes planejados com sofisticação, autenticidade e bom gosto.",
    mainImage: "/Philosophy/projetos1.jpg",
    secondaryImage: "/Philosophy/projetos2.jpg",
  },
  {
    id: 2,
    title: "MATERIAIS\nPREMIUM",
    description:
      "Trabalhamos com materiais de alta tecnologia e superfícies sofisticadas, assegurando um padrão de acabamento milimétrico que você consegue ver e sentir em cada toque.",
    mainImage: "/Philosophy/material1.jpg",
    secondaryImage: "/Philosophy/material2.jpg",
  },
  {
    id: 3,
    title: "ESTÉTICA\n& CONFORTO",
    description:
      "Nossa filosofia é transformar ambientes através de soluções precisas que unem beleza e funcionalidade. Trabalhamos para que cada canto da sua casa seja aproveitado ao máximo, oferecendo um design exclusivo que traz organização, elegância e o acolhimento que a sua rotina merece.",
    mainImage: "/Philosophy/estetica1.jpg",
    secondaryImage: "/Philosophy/estetica2.jpg",
  },
];

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) {
      setActiveIndex(0);
    } else if (latest < 0.66) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  return (
    <section
      ref={containerRef}
      id="filosofia"
      className="philosophy-section relative h-[300vh] bg-[#F6F1E8]"
    >
      <div className="philosophy-static px-6 py-20 space-y-20">
        {beliefs.map(belief => <article key={belief.id} className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl whitespace-pre-line mb-6">{belief.title}</h2>
          <p className="text-[#5A524B] leading-relaxed mb-8">{belief.description}</p>
          <div className="grid grid-cols-2 gap-4"><img src={belief.mainImage} alt="Ambiente planejado" loading="lazy" className="w-full aspect-[3/4] object-cover" /><img src={belief.secondaryImage} alt="Detalhes do ambiente" loading="lazy" className="w-full aspect-[3/4] object-cover" /></div>
        </article>)}
      </div>
      <div className="philosophy-animated sticky top-0 h-auto lg:h-screen w-full flex items-center overflow-hidden py-16 lg:py-0 pb-24 lg:pb-0">
        <div className="max-w-[1800px] w-full mx-auto px-6 md:px-12 lg:px-24 h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">

          {/* Coluna de Texto */}
          <div className="w-full lg:w-5/12 h-auto flex flex-col justify-center relative z-20 pt-8 lg:pt-0 mb-4 lg:mb-0">
            
            <span className="block font-serif italic text-[14px] tracking-[0.05em] text-[#7F756B] uppercase mb-6 lg:mb-12">
              (NOSSA FILOSOFIA)
            </span>

            <div className="flex relative items-center">

              <div className="w-[1px] bg-black/10 h-[240px] lg:h-[400px] absolute left-0 top-1/2 -translate-y-1/2">
                <motion.div
                  className="w-full bg-[#1C1A18] origin-top h-full"
                  style={{ scaleY: scrollYProgress }}
                />
              </div>

              {/* Box de conteúdo com altura mínima flexível para evitar quebras */}
              <div className="pl-6 lg:pl-24 relative w-full min-h-[240px] lg:h-[400px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="lg:absolute inset-0 pl-2 lg:pl-16 flex flex-col justify-center"
                  >
                    <h2 className="font-serif text-[clamp(34px,4.5vw,72px)] leading-[1.05] tracking-[-0.03em] font-light uppercase whitespace-pre-line mb-5 text-[#1C1A18]">
                      {beliefs[activeIndex].title}
                    </h2>

                    <p className="font-light text-[15px] lg:text-[17px] leading-[1.7] text-[#5A524B] max-w-[430px]">
                      {beliefs[activeIndex].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Container de Imagens Otimizado */}
          <div className="w-full lg:w-6/12 h-[45vh] lg:h-[80vh] relative lg:absolute lg:right-24 z-10 mt-2 lg:mt-0 pb-12 lg:pb-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="absolute inset-0 flex items-center justify-center lg:justify-end"
              >
                {/* Imagem Principal */}
                <motion.div
                  initial={{ opacity: 0, scale: 1.02, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -30 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="w-[85%] lg:w-[75%] h-full relative z-0 overflow-hidden border border-black/10 shadow-[0_30px_80px_rgba(0,0,0,.06)]"
                >
                  <img
                    src={beliefs[activeIndex].mainImage}
                    loading="lazy"
                    decoding="async"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Imagem Secundária Sobreposta (ATUALIZADA COM BORDA E SOMBRA PREMIUM) */}
                <motion.div
                  initial={{ opacity: 0, scale: 1.02, y: 45 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -45 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute bottom-6 lg:bottom-16 left-2 lg:-left-12 w-[48%] lg:w-[45%] aspect-[4/5] z-10 overflow-hidden border-4 border-[#F6F1E8] shadow-[0_25px_60px_rgba(0,0,0,0.18)]"
                >
                  <img
                    src={beliefs[activeIndex].secondaryImage}
                    loading="lazy"
                    decoding="async"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}