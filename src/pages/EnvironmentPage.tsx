import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface EnvironmentPageProps {
  title: string;
}

export default function EnvironmentPage({ title }: EnvironmentPageProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#F5F3EF] pt-32 px-6 md:px-12 lg:px-24 pb-24"
    >
      <div className="max-w-[1800px] mx-auto">
        <Link
          to="/"
          state={{ openMenu: true }}
          className="group inline-flex items-center gap-4 text-black uppercase text-[11px] tracking-[0.2em] font-medium transition-all duration-300 hover:opacity-60 relative overflow-hidden pb-2 mb-16"
        >
          <ArrowLeft
            size={16}
            strokeWidth={1.5}
            className="relative z-10"
          />

          <span className="relative z-10">
            Voltar
          </span>

          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
        </Link>

        <h1 className="font-serif text-[clamp(40px,8vw,120px)] leading-[0.9] tracking-[-0.02em] font-light uppercase text-black mb-24">
          {title}
        </h1>

        <div className="max-w-2xl border-t border-black/10 pt-8">
          <p className="text-lg leading-relaxed text-[#5A524B]">Converse com a Elegance sobre as medidas, o estilo e as necessidades do seu ambiente. Solicite referências de {title.toLowerCase()} e um orçamento pelo WhatsApp.</p>
          <a href="https://wa.me/message/ZLNO7DS5LWUVD1" target="_blank" rel="noopener noreferrer" className="inline-flex mt-8 rounded-full bg-[#1C1A18] text-white px-8 py-4">Conversar sobre {title.toLowerCase()}</a>
          <Link to="/#projetos" className="block mt-6 underline underline-offset-4">Ver imagens na página inicial</Link>
        </div>
      </div>
    </motion.main>
  );
}
