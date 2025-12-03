
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, PlayCircle, Layers, Package } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionModulesListProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

// Detailed Content for the Modules
const MODULE_DETAILS = [
  {
    title: "Módulo 1 - Boas Vindas",
    lessons: [
      "Aula 01: Bem-vindo ao Design Hack",
      "Aula 02: Como aproveitar o curso ao máximo",
      "Aula 03: Acesso à Comunidade VIP",
      "Aula 04: Mindset de um Designer de Elite"
    ]
  },
  {
    title: "Módulo 2 - Design Hack PRO",
    lessons: [
      "Aula 01: Fundamentos do Design Invisível",
      "Aula 02: Psicologia das Cores Aplicada",
      "Aula 03: Tipografia que Converte",
      "Aula 04: Composição e Grid Avançado",
      "Aula 05: Hierarquia Visual Estratégica"
    ]
  },
  {
    title: "Módulo 3 - Workflow",
    lessons: [
      "Aula 01: Organização de Arquivos e Pastas",
      "Aula 02: Atalhos e Produtividade no Photoshop/Illustrator",
      "Aula 03: Criando seu Processo Criativo",
      "Aula 04: Gestão de Tempo para Criativos"
    ]
  },
  {
    title: "Módulo 4 - Inteligência Artificial",
    lessons: [
      "Aula 01: Introdução à IA Generativa",
      "Aula 02: Midjourney: Do Básico ao Avançado",
      "Aula 03: ChatGPT para Copy e Estratégia",
      "Aula 04: Upscaling e Tratamento com IA",
      "Aula 05: Integrando IA no fluxo de trabalho"
    ]
  },
  {
    title: "Módulo 5 - Portfólio Imbatível",
    lessons: [
      "Aula 01: O que os clientes realmente buscam",
      "Aula 02: Estrutura de Case de Sucesso no Behance",
      "Aula 03: Curadoria de Projetos",
      "Aula 04: Personal Branding para Designers"
    ]
  },
  {
    title: "Módulo 6 - Corpo e Mente",
    lessons: [
      "Aula 01: Ergonomia e Saúde",
      "Aula 02: Lidando com Bloqueio Criativo",
      "Aula 03: Foco e Alta Performance",
      "Aula 04: Equilíbrio Vida Pessoal x Trabalho"
    ]
  },
  {
    title: "Módulo 7 - Empreendedorismo",
    lessons: [
      "Aula 01: Precificação: Quanto vale seu trabalho?",
      "Aula 02: Proposta Comercial Irresistível",
      "Aula 03: Contratos e Segurança Jurídica",
      "Aula 04: Técnicas de Negociação e Vendas"
    ]
  },
  {
    title: "Módulo 8 - Espiritualidade",
    lessons: [
      "Aula 01: O Design como Propósito",
      "Aula 02: Ética e Responsabilidade",
      "Aula 03: Visão de Longo Prazo",
      "Aula 04: Legado Criativo"
    ]
  },
  {
    title: "Módulo 9 - Bônus Acelerador",
    lessons: [
      "Aula 01: Pack de Assets Premium",
      "Aula 02: Masterclass com Convidados",
      "Aula 03: Gravações de Lives Exclusivas",
      "Aula 04: Templates de Contrato e Proposta"
    ]
  }
];

export const SectionModulesList: React.FC<SectionModulesListProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleModule = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 75%"
          }
        }
      );

      // List Entrance
      gsap.fromTo(listRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            scroller: scrollerRef.current,
            start: "top 70%"
          }
        }
      );
      
      // Stats Entrance
      gsap.fromTo(statsRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: statsRef.current,
            scroller: scrollerRef.current,
            start: "top 85%"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
        ref={containerRef}
        className="relative w-full py-16 md:py-24 bg-[#0A0A0A] overflow-hidden flex flex-col items-center"
    >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
            
            {/* Header */}
            <div ref={headerRef} className="text-center mb-12">
                <p className="text-[#00CBD9] text-xs md:text-sm tracking-[0.2em] font-bold uppercase mb-3 font-sans">
                    // CRONOGRAMA COMPLETO
                </p>
                <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-2">
                    O que você aprenderá ?
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#00CBD9] to-transparent mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Accordion List - Grid Layout on Desktop */}
            <div 
                ref={listRef} 
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start"
            >
                {MODULE_DETAILS.map((module, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div 
                            key={index}
                            onClick={() => toggleModule(index)}
                            className={`
                                group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 border h-fit
                                ${isOpen 
                                    ? 'bg-gradient-to-r from-[#002a33] to-[#050505] border-[#00CBD9] shadow-[0_0_25px_rgba(0,203,217,0.15)]' 
                                    : 'bg-gradient-to-r from-[#001E24] to-[#020608] border-[#00CBD9]/20 hover:border-[#00CBD9]/50'
                                }
                            `}
                        >
                            {/* Card Header */}
                            <div className="p-4 md:p-6 flex items-center justify-between gap-4">
                                <h3 className={`text-base md:text-lg lg:text-xl font-bold font-sans transition-colors ${isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                                    {module.title}
                                </h3>
                                
                                {/* Plus Icon */}
                                <div className={`
                                    w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                                    ${isOpen 
                                        ? 'bg-[#00CBD9] text-black rotate-180 shadow-[0_0_15px_#00CBD9]' 
                                        : 'bg-[#00CBD9]/10 text-[#00CBD9] group-hover:bg-[#00CBD9] group-hover:text-black'
                                    }
                                `}>
                                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                </div>
                            </div>

                            {/* Dropdown Content */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-4 pb-6 md:px-8 md:pb-8">
                                            <div className="h-[1px] w-full bg-[#00CBD9]/20 mb-4"></div>
                                            <ul className="grid grid-cols-1 gap-3">
                                                {module.lessons.map((lesson, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-gray-400 text-sm md:text-base font-sans">
                                                        <PlayCircle size={14} className="text-[#00CBD9] shrink-0" />
                                                        <span>{lesson}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>

            {/* Stats Section (Same Design as Modules) */}
            <div ref={statsRef} className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 md:mt-12">
                <StatCard icon={<Layers size={24} />} text="10 Módulos" />
                <StatCard icon={<PlayCircle size={24} />} text="+ 100 horas aula" />
                <StatCard icon={<Package size={24} />} text="10 cursos em 1" />
            </div>

        </div>
    </section>
  );
};

// Helper Component for Stats - Matches Module Card Design
const StatCard = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="bg-gradient-to-r from-[#001E24] to-[#020608] border border-[#00CBD9]/20 rounded-xl p-6 flex items-center justify-center gap-4 shadow-[0_0_15px_rgba(0,203,217,0.1)] hover:border-[#00CBD9]/50 hover:shadow-[0_0_25px_rgba(0,203,217,0.2)] transition-all duration-300 group">
        <div className="text-[#00CBD9] group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <span className="text-white font-bold text-lg md:text-xl font-sans tracking-wide">
            {text}
        </span>
    </div>
);
