
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  DollarSign, 
  Pencil, 
  PenTool, 
  Image as ImageIcon, 
  Zap, 
  Target, 
  Briefcase, 
  TrendingUp, 
  Globe 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionThirteenProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

const SOLUTIONS = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    color: "text-cyan-neon",
    text: "Se autopromover e <strong class='text-white'>aumentar suas vendas</strong> para alcançar resultados consistentes."
  },
  {
    icon: <Pencil className="w-6 h-6" />,
    color: "text-magenta-neon",
    text: "Dominar Técnicas de <strong class='text-white'>Desenho Manual</strong> e expressão visual."
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    color: "text-yellow-gold",
    text: "Dominar Técnicas de <strong class='text-white'>Vetorização com Illustrator</strong>."
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    color: "text-blue-400",
    text: "Dominar Técnicas de <strong class='text-white'>Renderização com Photoshop</strong>."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    color: "text-yellow-gold",
    text: "Ganhar <strong class='text-white'>TEMPO</strong> e criar projetos 10x mais <strong class='text-white'>PODEROSOS</strong>."
  },
  {
    icon: <Target className="w-6 h-6" />,
    color: "text-magenta-neon",
    text: "Dominar o Design <strong class='text-white'>Integrativo e Estratégico</strong>."
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    color: "text-cyan-neon",
    text: "Estruturar seu <strong class='text-white'>Portfólio Profissional</strong> PRONTO e VALIDADO."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-green-400",
    text: "Um Caminho Claro para sair do <strong class='text-white'>Zero até o Lucro</strong> no Mercado Criativo."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    color: "text-cyan-neon",
    text: "Atuar no <strong class='text-white'>Mercado GRINGO</strong> e Ganhar em Dólar."
  }
];

export const SectionThirteen: React.FC<SectionThirteenProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: scrollerRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. Grid Stagger Animation
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { 
            y: 40, 
            opacity: 0, 
            scale: 0.95,
            filter: "blur(4px)"
          },
          {
            y: 0, 
            opacity: 1, 
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              scroller: scrollerRef.current,
              start: "top 70%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-4 bg-[#0A0A0A] overflow-hidden flex flex-col items-center"
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Header Connection */}
        <div ref={headerRef} className="mb-16 md:mb-20 text-center px-4">
          <h2 className="text-white font-sans text-lg md:text-2xl tracking-[0.15em] uppercase font-light opacity-90">
            Pois ao final do Design Hack <br className="md:hidden" /> você será capaz de:
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#00CBD9] to-transparent mx-auto mt-6"></div>
        </div>

        {/* BENTO GRID */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 w-full px-2 md:px-0"
        >
          {SOLUTIONS.map((item, index) => (
            <HypnoticCard key={index} item={item} />
          ))}
        </div>

      </div>

      {/* Styles for Hypnotic Motion */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

// Extracted Component for Bento Card
const HypnoticCard: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="group relative w-full h-full min-h-[200px] rounded-2xl overflow-hidden bg-transparent transform transition-transform duration-300 hover:-translate-y-1">
      
      {/* 
         BASE BORDER (Resting State)
         Very subtle static border so the card shape is visible when not hovering.
      */}
      <div className="absolute inset-0 rounded-2xl border border-white/5 z-0" />

      {/* 
         TRAVELING LINE EFFECT (Hover State)
         A conic gradient that spins behind the inner content.
         Because 'inset' of inner content is 1px, this reveals a moving line on the border.
      */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(transparent_270deg,#00CBD9_360deg)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      {/* 
        INNER CONTENT BACKGROUND
        Masks the spinning gradient, leaving only the edge visible.
      */}
      <div className="absolute inset-[1px] rounded-[15px] bg-gradient-to-b from-[#01090a] to-[#011418] flex flex-col p-6 md:p-8 overflow-hidden z-10">
          
          {/* Subtle Top Highlight (Glass Effect) */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Icon Container with Hypnotic Float */}
          <div className={`
              w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6
              ${item.color} 
              transition-all duration-300
              group-hover:bg-[#00CBD9]/10 group-hover:border-[#00CBD9]/30
          `}>
             <div className="animate-float-slow">
                {item.icon}
             </div>
          </div>

          {/* Text Content */}
          <p 
            className="font-sans text-[#B4B4B4] text-base md:text-lg leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10"
            dangerouslySetInnerHTML={{ __html: item.text }} 
          />
      </div>
    </div>
  );
};
