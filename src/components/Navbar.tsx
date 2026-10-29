import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { title: 'Cozinhas', path: '/cozinhas' },
  { title: 'Quartos', path: '/quartos' },
  { title: 'Salas', path: '/salas' },
  { title: 'Banheiros', path: '/banheiros' },
  { title: 'Adegas', path: '/adegas' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isOpen || !dialog.current) return;
    const modal = dialog.current;
    const overflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('menu-toggle', { detail: true }));
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
      window.dispatchEvent(new CustomEvent('menu-toggle', { detail: false }));
      trigger.current?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  // Abre automaticamente o menu quando voltar das páginas de ambientes
  useEffect(() => {
    if (location.pathname === '/' && location.state?.openMenu) {
      setIsOpen(true);

      // Remove o state para evitar reabrir o menu ao navegar novamente
      navigate(location.pathname + location.hash, { replace: true, state: null });
    }
  }, [location, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = location.pathname === '/';

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.5,
        }}
        className={`fixed top-0 left-0 right-0 z-[60] h-24 flex items-center transition-all duration-500 ${
          scrolled && !isOpen
            ? 'bg-[#F5F3EF]/90 backdrop-blur-md border-b border-black/5'
            : 'bg-transparent'
        }`}
      >
        <AnimatePresence>
          {(
            <motion.button
              ref={trigger}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-controls="products-menu"
              key="produtos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(true)}
              className={`
                absolute
                top-1/2
                right-6
                md:right-10
                -translate-y-1/2
                h-[44px]
                px-4 sm:px-8
                rounded-full
                border
                ${
                  isHomePage && !scrolled
                    ? 'border-white/80 text-white'
                    : 'border-black/80 text-black'
                }
                bg-transparent
                uppercase
                text-[12px]
                tracking-[0.22em]
                font-medium
                transition-all
                duration-500
                ease-out
                hover:bg-white
                hover:text-black
                hover:border-white
              `}
            >
              PRODUTOS
            </motion.button>
          )}

          {scrolled && (
            <motion.div
              key="orcamento"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute left-3 right-36 flex justify-center md:left-0 md:right-0 md:pointer-events-none"
            >
              <a
                href="https://wa.me/message/ZLNO7DS5LWUVD1"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto inline-flex min-h-11 items-center justify-center rounded-full border border-[#B59662]/60 bg-[#1C1A18] px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.10em] text-white shadow-[0_4px_16px_rgba(28,26,24,0.16)] transition-colors duration-200 hover:bg-[#3D3328] sm:px-7 sm:text-[13px] sm:tracking-[0.16em] lg:px-9 lg:text-[14px]"
              >
                SOLICITE UM ORÇAMENTO
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

          <dialog ref={dialog} id="products-menu" aria-label="Ambientes planejados" onCancel={() => setIsOpen(false)} data-lenis-prevent className="fixed inset-0 m-0 w-full max-w-none h-[100dvh] max-h-none bg-[#F5F3EF] overflow-y-auto p-0 text-black">
            <button
              aria-label="Fechar menu"
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute w-11 h-11 flex items-center justify-center top-8 left-6 md:top-10 md:left-10 z-[110] text-black transition-opacity hover:opacity-60"
            >
              <X size={30} strokeWidth={1.4} />
            </button>

            <div className="flex min-h-full py-24 items-center justify-center">
              <nav className="flex flex-col items-center gap-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + index * 0.08,
                      duration: 0.5,
                    }}
                  >
                    <Link
                      to={item.path}
                      state={{ returnToMenu: true }}
                      onClick={() => setIsOpen(false)}
                      className="
                        group
                        relative
                        inline-block
                        font-serif
                        text-[clamp(44px,7vw,88px)]
                        font-light
                        tracking-[-0.02em]
                        leading-none
                        pb-2
                      "
                    >
                      {item.title}

                      <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </dialog>
    </>
  );
}
