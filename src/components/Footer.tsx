import { motion } from "motion/react";

// Mantido os caminhos absolutos apontando para a pasta public (Fim do erro do Vite)
import instagramIcon from "/assets/instagram.png";
import facebookIcon from "/assets/facebook.png";
import whatsappIcon from "/assets/whatsapp.png";

export default function Footer() {
  return (
    <footer
      id="contato"
      className="relative overflow-hidden bg-[#F6F1E8] pt-36 pb-16"
    >
      <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center"
        >
          <h2
            className="
              mt-8
              font-serif
              font-light
              text-[#1C1A18]
              leading-[0.95]
              tracking-[-0.04em]
              text-[clamp(56px,7vw,110px)]
              max-w-[1100px]
              mx-auto
            "
          >
            Eleve o padrão
            <br />
            do seu projeto.
          </h2>

          <p
            className="
              mt-10
              text-[#6E655D]
              text-[20px]
              leading-[1.8]
              max-w-[700px]
              mx-auto
            "
          >
            Criamos móveis planejados exclusivos para transformar
            ambientes em espaços elegantes, funcionais e atemporais.
          </p>
        </motion.div>

        {/* Rodapé */}

        <div
          className="
            mt-20
            border-t
            border-black/10
            pt-10
            flex
            flex-col
            lg:flex-row
            justify-between
            items-center
            gap-6
          "
        >
          <p className="text-[#8B837A] text-sm tracking-[0.08em]">
            © {new Date().getFullYear()} Elegance Móveis Planejados.
          </p>

          {/* Redes Sociais com Super Destaque Premium */}

          <div className="flex items-center gap-8">

            <a
              href="https://www.instagram.com/planejadoselegance_/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-122 hover:opacity-100 block"
            >
              <img
                src={instagramIcon}
                alt="Instagram"
                className="w-20 h-20 object-contain"
              />
            </a>

            {/* Link do Facebook atualizado para a pesquisa do perfil específico */}
            <a
              href="https://www.facebook.com/search/top?q=elegance%20panejados&locale=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-122 hover:opacity-100 block"
            >
              <img
                src={facebookIcon}
                alt="Facebook"
                className="w-20 h-20 object-contain"
              />
            </a>

            {/* Link do WhatsApp atualizado para o formato direto da API */}
            <a
              href="https://api.whatsapp.com/send?phone=5531981070026"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-122 hover:opacity-100 block"
            >
              <img
                src={whatsappIcon}
                alt="WhatsApp"
                className="w-20 h-20 object-contain"
              />
            </a>

          </div>

        </div>

      </div>

      {/* Texto de fundo corrigido para Mobile e Desktop */}

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span
          className="
            font-serif
            font-light
            text-[18vw]
            sm:text-[22vw]
            tracking-[-0.05em]
            sm:tracking-[-0.06em]
            text-black/[0.022]
            whitespace-nowrap
            select-none
          "
        >
          ELEGANCE
        </span>
      </div>

    </footer>
  );
}