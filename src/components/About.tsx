import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

const ABOUT_IMAGE = '/about/quarto.webp';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const words = [
    'DESIGN',
    'MODERNO',
    'CRIADO',
    'PARA VOCÊ',
  ];

  return (
    <section
      ref={containerRef}
      id="sobre"
      className="py-24 lg:py-48 bg-[#F6F1E8] text-[#1C1A18] relative overflow-hidden"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-24">

        {/* Mudamos o gap-16 para gap-12 no mobile para compactar o layout vertical */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-start justify-between">

          {/* Left Column - Removido min-h no mobile para não criar vazios artificiais */}
          <div className="w-full lg:w-4/12 flex flex-col lg:min-h-[80vh] justify-between">

            {/* Ajustado mb-8 no mobile para o título não sumir ou descer demais */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1 }}
              className="mb-8 lg:mb-auto"
            >
              <span className="font-serif italic text-[14px] tracking-[0.05em] text-[#7F756B] block">
                (SOBRE NÓS)
              </span>
            </motion.div>

            {/* Adicionado mb-10 no mobile para afastar as palavras gigantes da imagem que vem abaixo */}
            <div className="flex flex-col relative z-10 mb-10 lg:mb-0">
              {words.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="
                      font-serif
                      text-[clamp(42px,5.8vw,88px)]
                      leading-[0.95]
                      font-light
                      tracking-[-0.025em]
                      text-[#1C1A18]
                    "     
                  >
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>

          </div>

          {/* Center Column - Adicionado mb-10 no mobile para afastar a imagem do parágrafo de texto */}
          <div className="w-full lg:w-5/12 flex justify-center relative z-0 mb-10 lg:mb-0">

            <div className="w-full relative aspect-[2/3] max-w-[500px] overflow-hidden rounded-[4px] bg-[#F6F1E8]">
              <div className="w-full h-full relative">
                <motion.div
                  style={{ y: reduceMotion ? 0 : imageY }}
                  className="absolute -top-[10%] left-0 w-full h-[120%]"
                >
                  <img
                    src={ABOUT_IMAGE}
                    alt="Quarto planejado de alto padrão com closet sob medida"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="w-full lg:w-3/12 flex flex-col justify-end lg:min-h-[80vh]">

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
                filter: 'blur(10px)',
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
              }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="max-w-[340px] lg:ml-auto text-[#4B433C]"
            >
              <p className="text-[17px] leading-[1.9] font-light mb-10">
                Acreditamos que o verdadeiro luxo está na precisão dos detalhes,
                na qualidade dos materiais e na criação de ambientes que unem
                elegância, funcionalidade e personalidade.
              </p>

              <p className="text-[17px] leading-[1.9] font-light">
                Desenvolvemos móveis planejados sob medida para transformar cada
                espaço em uma experiência única.
              </p>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}