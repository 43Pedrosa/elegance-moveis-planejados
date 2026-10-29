import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const projectsData = [
  {
    id: 1,
    titleLines: ["AMPLITUDE", "EM", "DETALHES"],
    image: "/Projects/amplitudeemdetalhes.jpg",
  },
  {
    id: 2,
    titleLines: ["PROJETOS", "QUE", "INSPIRAM"],
    image: "/Projects/projetosqueinspiram.jpg",
  },
  {
    id: 3,
    titleLines: ["AMBIENTES", "DE", "LUXO"],
    image: "/Projects/ambientedeluxo.jpg",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  const handleDotClick = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  useEffect(() => {
    if (paused || hovered || reduceMotion) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % projectsData.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused, hovered, reduceMotion]);

  const getSlidePosition = (index: number) => {
    const distance =
      (index - activeIndex + projectsData.length) % projectsData.length;

    if (distance === 0) return "center";
    if (distance === 1) return "right";

    return "left";
  };

  const slideVariants = {
    center: {
      x: "-50%",
      y: "-50%",
      scale: 1,
      zIndex: 20,
      opacity: 1,
      filter: "contrast(100%) brightness(100%)",
    },
    left: {
      x: "-175%",
      y: "-50%",
      scale: 0.82,
      zIndex: 10,
      opacity: 0.42,
      filter: "contrast(85%) brightness(68%)",
    },
    right: {
      x: "75%",
      y: "-50%",
      scale: 0.82,
      zIndex: 10,
      opacity: 0.42,
      filter: "contrast(85%) brightness(68%)",
    },
  };

  const activeProject = projectsData[activeIndex];

  return (
    <section
      id="projetos"
      aria-label="Projetos"
      onFocusCapture={(event) => { if (!(event.target as HTMLElement).closest("[data-rotation-control]")) setPaused(true); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex h-screen w-full select-none flex-col overflow-hidden bg-[#F6F1E8] py-24 font-sans"
    >
      <div className="absolute top-12 right-6 left-6 z-40 flex items-start justify-between md:right-12 md:left-12 lg:right-24 lg:left-24">
        <span className="font-serif text-[14px] italic tracking-[0.05em] text-[#7F756B]">
          (PROJETOS)
        </span>

        <div className="flex gap-2 sm:gap-6">
          {!reduceMotion && <button data-rotation-control type="button" onClick={() => setPaused(!paused)} className="min-h-11 px-2 text-xs underline">{paused ? "Retomar" : "Pausar"}</button>}
          {projectsData.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleDotClick(index)}
                aria-label={`Ver projeto ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`min-h-11 min-w-11 text-[12px] font-medium tracking-[0.2em] transition-all duration-500 ${
                  isActive
                    ? "font-bold text-[#1C1A18]"
                    : "text-[#A89F95] hover:text-[#5B534C]"
                }`}
              >
                ({index + 1})
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {projectsData.map((project, index) => {
          const position = getSlidePosition(index);
          const isActive = position === "center";

          return (
            <motion.button
              key={project.id}
              type="button"
              variants={slideVariants}
              initial={false}
              animate={position}
              onClick={() => !isActive && handleDotClick(index)}
              aria-label={`Ver projeto ${project.titleLines.join(" ")}`}
              className="
                absolute top-[55%] left-1/2
                h-[45vh] max-h-[780px] w-[75vw]
                cursor-pointer overflow-hidden rounded-[2px]
                shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                md:top-1/2 md:h-[65vh] md:w-[38vw]
                lg:h-[72vh] lg:w-[25vw]
              "
              transition={{
                type: "tween",
                ease: [0.16, 1, 0.3, 1],
                duration: reduceMotion ? 0 : 0.85,
              }}
            >
              <img
                loading="lazy"
                decoding="async"
                src={project.image}
                alt={`Projeto Elegance: ${project.titleLines.join(" ")}`}
                className="h-full w-full object-cover"
              />

              <div
                className={`pointer-events-none absolute inset-0 transition-colors duration-700 ${
                  isActive ? "bg-black/15" : "bg-black/30"
                }`}
              />
            </motion.button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute top-[55%] flex -translate-y-1/2 flex-col items-center md:top-1/2"
          >
            {activeProject.titleLines.map((line, index) => (
              <div key={line} className="overflow-hidden">
                <motion.h2
                  initial={{ y: direction * 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: direction * -40, opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.75,
                    ease: [0.16, 1, 0.3, 1],
                    delay: index * 0.04,
                  }}
                  className="
                    whitespace-nowrap text-center
                    font-serif text-[clamp(38px,7.5vw,135px)]
                    font-normal leading-[0.9] tracking-[0.02em] text-white
                    [text-shadow:none]
                    [-webkit-text-stroke:0.25px_rgba(255,255,255,0.55)]
                  "
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
     