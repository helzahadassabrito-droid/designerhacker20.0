
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Zap, Lock, MessageSquare, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SectionFourteenProps {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}

export const SectionFourteen: React.FC<SectionFourteenProps> = ({ scrollerRef }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for independent animation
  const titleRef = useRef<HTMLDivElement>(null);
  const bill1Ref = useRef<HTMLDivElement>(null); // Gold
  const bill2Ref = useRef<HTMLDivElement>(null); // Blue
  const chatRef = useRef<HTMLDivElement>(null);  // Chat Box
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          scroller: scrollerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Responsive scrubbing
        }
      });

      // --- TIMELINE SEQUENCE (SEQUENTIAL REPLACEMENT) ---

      // 1. TITLE (Fixed)
      tl.to(titleRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.2 
      });

      // 2. GOLD BILL (Enter)
      tl.fromTo(bill1Ref.current, 
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );
      
      // Hold Gold Bill briefly
      tl.to(bill1Ref.current, { duration: 0.5 }); 

      // 3. GOLD BILL (Exit) & BLUE BILL (Enter)
      tl.to(bill1Ref.current, 
        { y: -100, opacity: 0, scale: 0.9, duration: 1, ease: "power2.in" }
      , "switch1");

      tl.fromTo(bill2Ref.current,
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      , "switch1-=0.5"); // Overlap slightly for smoothness

      // Hold Blue Bill briefly
      tl.to(bill2Ref.current, { duration: 0.5 });

      // 4. BLUE BILL (Exit) & CHAT BOX (Enter)
      tl.to(bill2Ref.current, 
        { y: -100, opacity: 0, scale: 0.9, duration: 1, ease: "power2.in" }
      , "switch2");

      tl.fromTo(chatRef.current,
        { scale: 0.8, opacity: 0, filter: "blur(10px)", y: 100 },
        { scale: 1, opacity: 1, filter: "blur(0px)", y: 0, duration: 1.5, ease: "back.out(1.2)" }
      , "switch2-=0.5");

      // 5. CTA BUTTON (Enter at the very end)
      tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 1 });

    }, containerRef);

    return () => ctx.revert();
  }, [scrollerRef]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#0A0A0A]"
    >
      {/* STICKY CONTAINER */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center py-12 md:py-0">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,203,217,0.08)_0%,_#0A0A0A_70%)] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center justify-center h-full">
            
            {/* FIXED TITLE */}
            <div ref={titleRef} className="opacity-0 translate-y-[-20px] absolute top-[15%] md:top-[12%] z-50 text-center max-w-4xl w-full">
                <h2 className="text-2xl md:text-5xl font-sans font-bold text-white leading-tight drop-shadow-2xl">
                    Acesso a um Networking que vai te permitir <br className="hidden md:block" />
                    <span className="bg-gradient-to-r from-[#00CBD9] to-[#AEECF1] bg-clip-text text-transparent">
                        fechar contratos exclusivos
                    </span>
                </h2>
            </div>

            {/* --- CENTRAL STAGE (All items centered) --- */}
            <div className="relative w-full max-w-[600px] h-[400px] flex items-center justify-center mt-20 md:mt-0">
                
                {/* ITEM 1: GOLD BILL (Absolute Center) */}
                <div ref={bill1Ref} className="absolute inset-0 flex items-center justify-center z-30 opacity-0 pointer-events-none">
                     <div className="w-[300px] md:w-[340px] h-[160px] md:h-[180px]">
                        <CyberBill amount="R$ 12.500,00" label="CONTRATO UI/UX" id="CHK-9942" isGold />
                     </div>
                </div>

                {/* ITEM 2: BLUE BILL (Absolute Center) */}
                <div ref={bill2Ref} className="absolute inset-0 flex items-center justify-center z-30 opacity-0 pointer-events-none">
                     <div className="w-[300px] md:w-[340px] h-[160px] md:h-[180px]">
                        <CyberBill amount="R$ 8.000,00" label="RETAINER MENSAL" id="CHK-1024" />
                     </div>
                </div>

                {/* ITEM 3: CHAT BOX (Absolute Center) */}
                <div ref={chatRef} className="absolute inset-0 flex items-center justify-center z-40 opacity-0 w-full">
                    <div className="w-full max-w-[500px]">
                        <div className="bg-[#141414]/90 backdrop-blur-xl border border-[#00CBD9]/30 rounded-2xl shadow-[0_0_60px_rgba(0,203,217,0.1)] overflow-hidden flex flex-col transform scale-95 md:scale-100 origin-center">
                            {/* Header */}
                            <div className="bg-[#050505] border-b border-white/10 p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00CBD9] to-[#00A0B0] flex items-center justify-center shadow-[0_0_10px_#00CBD9]">
                                        <MessageSquare className="text-white w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-xs tracking-wide">Grupo Networking VIP Designer Hacker</h4>
                                        <span className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> ONLINE
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Body */}
                            <div className="p-4 md:p-6 bg-[#0c0c0c] min-h-[220px] md:min-h-[260px] relative overflow-hidden flex flex-col justify-end space-y-4">
                                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                
                                <div className="flex gap-3 items-end opacity-80 scale-95 origin-bottom-left">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-8 h-8 rounded-full border border-white/10" />
                                    <div className="bg-[#1F1F1F] p-3 rounded-2xl rounded-bl-none border border-white/5">
                                        <p className="text-gray-300 text-xs">Alguém tem indicação de freela? Tô com agenda livre essa semana.</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-end opacity-90 scale-95 origin-bottom-left">
                                     <div className="w-8 h-8 rounded-full bg-[#00CBD9]/20 flex items-center justify-center border border-[#00CBD9]/30 text-[10px] text-[#00CBD9]">JP</div>
                                    <div className="bg-[#1F1F1F] p-3 rounded-2xl rounded-bl-none border border-white/5">
                                        <p className="text-gray-300 text-xs">Mandei lá no canal de #vagas um projeto de R$ 8k. Dá uma olhada!</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 items-end justify-end">
                                    <div className="bg-[#00CBD9]/10 p-3 rounded-2xl rounded-br-none border border-[#00CBD9]/30">
                                        <p className="text-white text-xs md:text-sm">Boa! Vou aplicar agora. Valeu demais! 🚀</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/10 text-[10px] text-white">VC</div>
                                </div>
                            </div>
                            {/* Input */}
                            <div className="p-3 bg-[#050505] border-t border-white/10 flex items-center gap-3">
                                <div className="flex-1 h-8 bg-[#141414] rounded-lg border border-white/5"></div>
                                <Zap size={16} className="text-[#00CBD9]" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
            {/* CTA Button */}
            <div ref={ctaRef} className="mt-8 md:mt-12 opacity-0 flex-shrink-0 absolute bottom-[10%] md:bottom-[15%]">
                 <button className="group relative overflow-hidden bg-gradient-to-br from-[#00CBD9] to-[#AEECF1] text-black font-bold text-sm md:text-lg px-8 py-4 rounded-2xl border-2 border-[#00CBD9]/40 shadow-[0_0_30px_rgba(0,203,217,0.3)] hover:scale-105 transition-all duration-300 uppercase tracking-wider font-sans">
                    <div className="absolute inset-0 bg-white/40 w-[200%] animate-shimmer-sweep"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        QUERO ACESSO À COMUNIDADE <ShieldCheck className="w-5 h-5" />
                    </span>
                </button>
            </div>

        </div>

      </div>
    </section>
  );
};

// Reusable CyberBill Component
const CyberBill: React.FC<{ amount: string, label: string, id: string, isGold?: boolean }> = ({ amount, label, id, isGold }) => (
    <div 
        className="w-full h-full rounded-xl p-[1px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#051014] border border-white/10 overflow-hidden relative backdrop-blur-md"
        style={{ 
            boxShadow: isGold ? '0 20px 60px rgba(255, 215, 0, 0.2)' : '0 20px 60px rgba(0, 203, 217, 0.2)',
            borderColor: isGold ? '#FFD700' : '#00CBD9'
        }}
    >
        {/* Top Stripe */}
        <div className={`absolute top-0 left-0 w-full h-1 ${isGold ? 'bg-[#FFD700]' : 'bg-[#00CBD9]'}`}></div>
        
        <div className="p-4 flex flex-col justify-between h-full relative z-10 bg-[#051014]/90">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isGold ? 'bg-[#FFD700]' : 'bg-[#00CBD9]'}`}></div>
                    <span className={`text-[9px] font-bold tracking-widest ${isGold ? 'text-[#FFD700]' : 'text-[#00CBD9]'}`}>DESIGN BANK</span>
                </div>
                <Lock size={12} className={`opacity-70 ${isGold ? 'text-[#FFD700]' : 'text-[#00CBD9]'}`} />
             </div>
             
             <div className="text-center py-1">
                 <div className={`text-2xl md:text-3xl font-black tracking-tight ${isGold ? 'text-white' : 'text-white'}`}>{amount}</div>
                 <div className="text-[8px] text-gray-500 tracking-[0.3em] uppercase mt-1">{label}</div>
             </div>
             
             <div className="flex justify-between items-end border-t border-white/5 pt-2">
                 <div className="text-[8px] text-gray-600 font-mono">{id}</div>
                 <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider uppercase ${isGold ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20' : 'bg-[#00CBD9]/10 text-[#00CBD9] border border-[#00CBD9]/20'}`}>
                    <CheckCircle2 size={8} /> APROVADO
                 </div>
             </div>
        </div>
        
        {/* Security Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)' }}></div>
    </div>
);
