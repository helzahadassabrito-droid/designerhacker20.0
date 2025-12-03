
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Star, Zap, Timer, Award } from 'lucide-react';
import { ASSETS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

interface SectionFifteenProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionFifteen: React.FC<SectionFifteenProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Separate refs for Polaroids to animate them sequentially
  const polaroid1Ref = useRef<HTMLDivElement>(null); // 2019
  const polaroid2Ref = useRef<HTMLDivElement>(null); // 2025
  
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- 1. HEADER & POLAROIDS (Common Start) ---
      // This runs for both but we define the trigger based on container top
      const tlHeader = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: scrollerRef.current,
          start: "top 70%", // Triggers when section top hits 70% of viewport
        }
      });

      tlHeader.fromTo(headerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      tlHeader.fromTo(polaroid1Ref.current,
        { scale: 0, rotation: -20, opacity: 0, y: 50 },
        { 
          scale: 1, 
          rotation: -6, 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "back.out(1.5)" 
        }
      );

      tlHeader.fromTo(polaroid2Ref.current,
        { scale: 0, rotation: 20, opacity: 0, y: 50 },
        { 
          scale: 1, 
          rotation: 6, 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "back.out(1.5)" 
        },
        "-=0.3"
      );

      // --- 2. CARDS ANIMATION (Responsive Split) ---

      // DESKTOP: Animate with the header timeline or DOM order
      mm.add("(min-width: 768px)", () => {
         if (cardsRef.current) {
             // Append to main timeline so it flows naturally after polaroids
             tlHeader.fromTo(cardsRef.current.children,
                { y: 100, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    stagger: 0.15, 
                    duration: 0.8, 
                    ease: "power3.out" 
                },
                "-=0.1"
             );
         }
      });

      // MOBILE: Separate trigger to handle vertical stacking and visual order
      mm.add("(max-width: 767px)", () => {
         if (cardsRef.current && cardsRef.current.children.length === 3) {
             const c = cardsRef.current.children;
             // VISUAL ORDER ON MOBILE: 
             // 1. Gold (DOM Index 2 - order-1)
             // 2. Monthly (DOM Index 0 - order-2)
             // 3. Annual (DOM Index 1 - order-3)
             const orderedCards = [c[2], c[0], c[1]];
             
             gsap.fromTo(orderedCards, 
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    stagger: 0.25, // Slower stagger for mobile scroll
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: cardsRef.current, // Trigger on the cards grid itself
                        scroller: scrollerRef.current,
                        start: "top 65%", // Start when top of cards hits 65% of viewport
                    }
                }
             );
         }
      });

      // --- 3. FOOTER SLIDE UP ---
      // Independent trigger to ensure it animates when actually reached
      gsap.fromTo(footerRef.current,
        { y: 30, opacity: 0 },
        {
            y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
            scrollTrigger: {
                trigger: footerRef.current,
                scroller: scrollerRef.current,
                start: "top 85%", // Triggers near bottom of viewport
            }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[100dvh] py-20 md:py-32 bg-[#0A0A0A] flex flex-col items-center justify-between overflow-x-hidden"
    >
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#00CBD9]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FFD700]/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col flex-grow">
            
            {/* --- HEADER: STORYTELLING --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
                
                {/* Text Content */}
                <div ref={headerRef} className="space-y-6 text-center lg:text-left order-2 lg:order-1 opacity-0">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold text-white leading-tight">
                        Existem momentos na vida <br />
                        <span className="bg-gradient-to-r from-[#00CBD9] to-white bg-clip-text text-transparent">que definem o rumo</span> dos próximos anos.
                    </h2>
                    
                    <div className="space-y-4 text-gray-400 text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        <p>
                            Por cada Módulo, eu poderia cobrar o valor de uma mensalidade de qualquer faculdade, em torno de <span className="text-white font-bold">R$ 2.000</span>.
                        </p>
                        <p>
                            Mas meu intuito é ajudar o máximo de pessoas. Por isso, vou liberar <span className="text-[#00CBD9] font-bold">3 planos</span> para você decidir qual é o melhor para você!
                        </p>
                        <p className="border-l-4 border-[#00CBD9] pl-4 text-white font-medium italic">
                            Por um valor que volta para o seu bolso logo no primeiro projeto. Aproveite o valor promocional — <span className="text-[#00CBD9]">Não é gasto! É investimento!</span>
                        </p>
                    </div>
                </div>

                {/* Polaroids - Sequential Animation Target */}
                <div className="relative h-[280px] md:h-[400px] flex items-center justify-center order-1 lg:order-2">
                     
                     {/* 2019 (The Past) */}
                     <div ref={polaroid1Ref} className="absolute transform -rotate-6 translate-x-[-15%] md:translate-x-[-30%] hover:rotate-0 hover:z-20 transition-all duration-500 hover:scale-105 cursor-pointer opacity-0">
                        <div className="bg-white p-3 md:p-4 pb-8 md:pb-12 shadow-2xl rounded-sm w-[180px] md:w-[260px]">
                            <div className="w-full aspect-square bg-gray-200 overflow-hidden filter grayscale contrast-125">
                                <img src={ASSETS.MENTOR_IMAGE} alt="2019" className="w-full h-full object-cover" />
                            </div>
                            <p className="text-black font-sans text-center mt-3 font-bold text-xl md:text-2xl opacity-70">2019</p>
                        </div>
                    </div>

                    {/* 2025 (The Future) */}
                    <div ref={polaroid2Ref} className="absolute transform rotate-6 translate-x-[15%] md:translate-x-[30%] z-10 hover:rotate-0 transition-all duration-500 hover:scale-105 cursor-pointer opacity-0">
                        <div className="bg-white p-3 md:p-4 pb-8 md:pb-12 shadow-[0_0_30px_rgba(0,203,217,0.3)] rounded-sm w-[180px] md:w-[260px] border-2 border-[#00CBD9]/30">
                            <div className="w-full aspect-square bg-gray-900 overflow-hidden">
                                <img src={ASSETS.MENTOR_PORTRAIT} alt="2025" className="w-full h-full object-cover" />
                            </div>
                            <p className="text-[#00CBD9] font-sans text-center mt-3 font-bold text-xl md:text-2xl">2025</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- PRICING CARDS --- */}
            <div 
                ref={cardsRef}
                className="flex flex-col md:grid md:grid-cols-3 gap-8 items-stretch md:items-end w-full max-w-6xl mx-auto"
            >
                {/* PLAN 1: MENSAL (DOM 0) - Mobile Order 2 */}
                <div className="order-2 md:order-1 h-full opacity-0">
                    <PricingCard 
                        title="Plano Mensal"
                        accentColor="#00CBD9"
                        price="R$ 37,00"
                        period="por mês"
                        features={[
                            "Curso Completo",
                            "Acesso à Comunidade Exclusiva",
                            "Assinatura automática, seu acesso é liberado todo mês"
                        ]}
                        buttonText="QUERO ESTE PLANO PARA SUBIR DE NÍVEL AGORA"
                        vibe="Entrada no sistema"
                    />
                </div>

                {/* PLAN 2: ANUAL (DOM 1) - Mobile Order 3 */}
                <div className="order-3 md:order-2 h-full opacity-0">
                    <PricingCard 
                        title="Plano Anual"
                        accentColor="#00A0B0"
                        price="R$ 17,27"
                        period="12x"
                        subPrice="ou R$ 167,00 à vista"
                        features={[
                            "Curso Completo",
                            "Acesso à Comunidade Exclusiva",
                            "Acesso liberado automaticamente, sempre que for renovado"
                        ]}
                        buttonText="QUERO ESTE PLANO PARA SUBIR DE NÍVEL AGORA"
                        vibe="Racional e Seguro"
                    />
                </div>

                {/* PLAN 3: VITALÍCIO (DOM 2) - Mobile Order 1 */}
                <div className="order-1 md:order-3 h-full relative z-20 opacity-0">
                     <PricingCard 
                        title="Plano Vitalício"
                        accentColor="#FFD700"
                        price="R$ 25,55"
                        period="12x"
                        subPrice="ou R$ 247,00 à vista"
                        features={[
                            "Curso Completo Para SEMPRE",
                            "Acesso GARANTIDO a todas as Atualizações Futuras",
                            "Acesso VITALÍCIO à Comunidade Exclusiva"
                        ]}
                        buttonText="QUERO ESTE PLANO PARA SUBIR DE NÍVEL AGORA"
                        isGold={true}
                        badge="MELHOR QUE BITCOIN EM 2015 ⚡"
                    />
                </div>

            </div>
        </div>

        {/* --- FOOTER TRUST BAR --- */}
        <div 
            ref={footerRef} 
            className="relative w-full mt-24 z-10 opacity-0"
        >
             <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00CBD9]/10 to-transparent border-y border-[#00CBD9]/20"
                style={{ 
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
                }}
             />
             <div className="absolute inset-y-0 left-1/3 right-1/3 bg-[#00CBD9]/5 blur-2xl pointer-events-none"></div>
             
             <div className="relative z-10 flex gap-6 md:gap-16 items-center justify-center py-10 md:py-12">
                 <TrustItem icon={<Zap size={18} />} text="RÁPIDO" />
                 <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-[#00CBD9]/50 to-transparent"></div>
                 <TrustItem icon={<Timer size={18} />} text="ACESSÍVEL" />
                 <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-[#00CBD9]/50 to-transparent"></div>
                 <TrustItem icon={<Award size={18} />} text="INOVADOR" />
             </div>
        </div>
    </section>
  );
};

const TrustItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-2 md:gap-3 text-white/90 font-bold text-xs md:text-sm tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(0,203,217,0.3)] hover:text-[#00CBD9] hover:scale-105 transition-all duration-300">
        <span className="text-[#00CBD9]">{icon}</span> <span>{text}</span>
    </div>
);

interface PricingCardProps {
    title: string;
    accentColor: string;
    price: string;
    period: string;
    subPrice?: string;
    features: string[];
    buttonText: string;
    isGold?: boolean;
    badge?: string;
    vibe?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
    title, accentColor, price, period, subPrice, features, buttonText, isGold, badge, vibe 
}) => {
    return (
        // OUTER WRAPPER: Handles scaling and badge positioning. Overflow visible to allow badge to float.
        <div 
            className={`
                group relative flex flex-col h-full rounded-2xl transition-all duration-500
                ${isGold 
                    ? 'scale-[1.02] md:scale-110 z-20' 
                    : 'hover:-translate-y-2'
                }
            `}
        >
            {/* Top Badge for Gold - Floating Outside */}
            {badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black font-bold text-[9px] md:text-[10px] px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-lg whitespace-nowrap z-30 flex items-center gap-1">
                    {badge}
                </div>
            )}

            {/* INNER CONTAINER: Handles background, border, and clipping (overflow-hidden) */}
            <div className={`
                relative flex flex-col h-full rounded-2xl p-6 md:p-8 overflow-hidden w-full
                ${isGold 
                    ? 'bg-gradient-to-b from-[#3a2d00] to-black border border-[#FFD700]/50 shadow-[0_0_40px_rgba(255,215,0,0.15)] group-hover:shadow-[0_0_60px_rgba(255,215,0,0.3)]' 
                    : 'bg-[#141414]/80 backdrop-blur-sm border border-white/10 group-hover:border-white/20'
                }
            `}>
                
                {/* Top Border Accent (Inside clipped container) */}
                <div 
                    className="absolute top-0 left-0 w-full h-[3px] opacity-100 shadow-[0_0_15px_rgba(0,203,217,0.5)]"
                    style={{ 
                        background: `linear-gradient(90deg, ${accentColor} 0%, rgba(5,16,20,0) 100%)`,
                        boxShadow: `0 0 10px ${accentColor}` 
                    }}
                />

                {/* Content */}
                <div className="flex-1 flex flex-col">
                    
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${isGold ? 'border-[#FFD700]/30 text-[#FFD700] bg-[#FFD700]/10' : 'border-white/10 text-gray-400 bg-white/5'}`}>
                                {title}
                            </span>
                            {/* Vibe Text */}
                            {vibe && <span className="text-[9px] text-gray-600 uppercase tracking-wider hidden md:block">{vibe}</span>}
                        </div>

                        <div className="flex items-end gap-1 flex-wrap">
                            {period === '12x' && <span className={`text-lg font-bold mb-1 ${isGold ? 'text-[#FFD700]' : 'text-gray-500'}`}>12x</span>}
                            <span 
                                className={`text-4xl md:text-5xl font-black tracking-tighter leading-none ${isGold ? 'text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]' : 'bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent'}`}
                            >
                                {price}
                            </span>
                            {period !== '12x' && <span className="text-gray-500 text-xs font-bold mb-1 uppercase">{period}</span>}
                        </div>
                        
                        {subPrice && <p className="text-gray-500 text-xs mt-1">{subPrice}</p>}
                    </div>

                    {/* Divider */}
                    <div className="w-full h-[1px] bg-white/5 mb-6"></div>

                    {/* Checklist */}
                    <ul className="space-y-4 mb-8">
                        {features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className={`mt-0.5 min-w-[16px] h-4 flex items-center justify-center rounded-full ${isGold ? 'bg-[#FFD700]' : 'bg-transparent border border-white/20'}`}>
                                    {isGold ? <Check size={10} className="text-black stroke-[4px]" /> : <Check size={10} className={accentColor === '#00CBD9' ? 'text-[#00CBD9]' : 'text-[#00A0B0]'} />}
                                </div>
                                <span className={`text-xs md:text-sm font-sans leading-relaxed ${isGold ? 'text-white font-medium' : 'text-gray-400'}`}>
                                    {feat}
                                </span>
                            </li>
                        ))}
                    </ul>

                    {/* Button */}
                    <div className="mt-auto">
                        <button 
                            className={`
                                w-full py-4 rounded-xl font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-300 relative overflow-hidden
                                ${isGold 
                                    ? 'bg-[#FFD700] text-black hover:bg-[#ffe44d] shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)]' 
                                    : 'bg-transparent border border-white/20 text-white hover:border-[#00CBD9] hover:text-[#00CBD9] hover:bg-[#00CBD9]/5'
                                }
                            `}
                        >
                            {buttonText.includes("AGORA") ? "QUERO SUBIR DE NÍVEL" : buttonText}
                        </button>
                    </div>
                    
                    {/* Rating for Gold */}
                    {isGold && (
                        <div className="flex justify-center gap-1 mt-4">
                            {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#FFD700" className="text-[#FFD700]" />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
