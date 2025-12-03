
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Plus, MessageCircle, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionTwentyProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

const FAQS = [
  {
    question: "O que é o Design Hack?",
    answer: "É um treinamento imersivo que revela os segredos por trás de projetos de design de alto nível. Você vai aprender não apenas ferramentas, mas a lógica estética e estratégica usada pelos maiores profissionais do mercado para criar visuais impactantes e cobrar mais caro."
  },
  {
    question: "Como faço para acessar o curso?",
    answer: "Assim que seu pagamento for confirmado, você receberá um e-mail com login e senha para nossa área de membros exclusiva. O acesso é imediato e você pode assistir às aulas pelo computador, tablet ou celular."
  },
  {
    question: "O que eu ganho fazendo o Design Hack?",
    answer: "Além de dominar técnicas avançadas de vetorização e renderização, você ganha acesso a uma comunidade VIP, templates prontos, módulos sobre negociação e vendas, e um certificado reconhecido para turbinar seu portfólio."
  },
  {
    question: "Em quanto tempo eu começo a ter resultados?",
    answer: "O método foi desenhado para ser rápido e prático. Aplicando as técnicas do Módulo 1 e 2, você já verá uma mudança drástica na qualidade dos seus projetos em menos de 7 dias."
  }
];

export const SectionTwenty: React.FC<SectionTwentyProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqContainerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
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
            start: "top 70%"
          }
        }
      );

      // FAQ List Animation (Stagger)
      gsap.fromTo(faqContainerRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: faqContainerRef.current,
            scroller: scrollerRef.current,
            start: "top 65%"
          }
        }
      );

       // CTA Buttons Animation
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            scroller: scrollerRef.current,
            start: "top 80%"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
        ref={containerRef}
        className="relative w-full py-24 md:py-32 bg-[#0A0A0A] overflow-hidden flex flex-col items-center border-t border-white/5"
    >
        {/* Background Ambience */}
        <div className="absolute bottom-0 left-0 w-full h-[800px] bg-gradient-to-t from-[#00CBD9]/10 via-[#00CBD9]/5 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 flex flex-col items-center">
            
            {/* Header */}
            <div ref={headerRef} className="text-center mb-10">
                <p className="text-[#00CBD9] text-xs md:text-sm tracking-[0.2em] font-bold uppercase mb-2 font-sans">
                    // TIRE SUAS DÚVIDAS
                </p>
                <h2 className="text-3xl md:text-5xl font-sans font-normal text-white">
                    Perguntas Frequentes
                </h2>
            </div>

            {/* FAQ Items */}
            <div ref={faqContainerRef} className="w-full flex flex-col gap-4 mb-16">
                {FAQS.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div 
                            key={index}
                            onClick={() => toggleFAQ(index)}
                            className={`
                                group cursor-pointer rounded-xl md:rounded-2xl border transition-all duration-300 overflow-hidden
                                ${isOpen 
                                    ? 'bg-gradient-to-r from-[#002a33] to-[#050505] border-[#00CBD9]/50 shadow-[0_0_20px_rgba(0,203,217,0.15)]' 
                                    : 'bg-gradient-to-r from-[#001E24] to-[#020608] border-[#00CBD9]/20 hover:border-[#00CBD9]/40'
                                }
                            `}
                        >
                             <div className="relative z-10 p-5 md:p-6 flex flex-col">
                                 <div className="flex justify-between items-center gap-4">
                                     <h3 className={`text-base md:text-lg font-medium font-sans text-left transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                                         {faq.question}
                                     </h3>
                                     
                                     {/* Toggle Icon */}
                                     <div className={`
                                        w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                                        ${isOpen 
                                            ? 'bg-transparent text-[#00CBD9] rotate-180' 
                                            : 'bg-[#00CBD9]/10 text-[#00CBD9] shadow-[0_0_10px_rgba(0,203,217,0.2)]'
                                        }
                                     `}>
                                          {isOpen ? <X size={20} /> : <Plus size={20} />}
                                     </div>
                                 </div>

                                 <AnimatePresence>
                                     {isOpen && (
                                         <motion.div
                                             initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                             animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                             exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                             transition={{ duration: 0.3, ease: "easeInOut" }}
                                             className="overflow-hidden"
                                         >
                                             <div className="h-[1px] w-full bg-[#00CBD9]/20 mb-4"></div>
                                             <p className="text-gray-300 text-sm md:text-base leading-relaxed font-sans">
                                                 {faq.answer}
                                             </p>
                                         </motion.div>
                                     )}
                                 </AnimatePresence>
                             </div>
                        </div>
                    );
                })}
            </div>

            {/* CTA Section */}
            <div ref={ctaRef} className="w-full flex flex-col items-center gap-2">
                
                {/* Primary Button (Standard Site Button) */}
                <button className="w-full md:w-auto min-w-[320px] group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-bold text-sm md:text-lg px-8 py-5 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_0_30px_rgba(0,203,217,0.3)] hover:scale-105 hover:shadow-[0_0_50px_rgba(0,203,217,0.6)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-3">
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-shimmer w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <Rocket className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
                    <span className="relative z-10">QUERO SUBIR DE NÍVEL AGORA</span>
                </button>

                <div className="flex flex-col items-center w-full md:w-auto mt-8 gap-4">
                    <h3 className="text-white font-sans text-2xl md:text-3xl font-normal">
                        Ainda com Dúvida?
                    </h3>
                    
                    {/* WhatsApp Button (Green Variant of Standard) */}
                    <button className="w-full md:w-auto min-w-[320px] group relative overflow-hidden bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white font-bold text-sm md:text-lg px-8 py-4 rounded-2xl border-2 border-[#25D366]/40 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-105 hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] transition-all duration-300 uppercase tracking-wider font-sans flex items-center justify-center gap-3">
                         {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-white/20 w-[200%] animate-shimmer-sweep opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
                        <span className="relative z-10">ENTRE EM CONTATO COMIGO</span>
                    </button>
                </div>
            </div>

        </div>
    </section>
  );
};
