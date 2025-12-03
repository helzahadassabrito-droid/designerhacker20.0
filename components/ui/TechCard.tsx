import React from 'react';

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const TechCard: React.FC<TechCardProps> = ({ 
  children, 
  className = "", 
  hoverEffect = true 
}) => {
  return (
    <div 
      className={`
        group relative rounded-2xl p-[1px] 
        bg-gradient-to-b from-[#00CBD9]/30 to-transparent 
        hover:from-[#00CBD9] hover:to-[#00CBD9]/10
        transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:-translate-y-[5px] hover:shadow-[0_0_30px_rgba(0,203,217,0.15)]' : ''}
        ${className}
      `}
    >
      {/* Background & Content Container */}
      <div className="relative h-full w-full rounded-[15px] bg-[#141414]/80 backdrop-blur-md overflow-hidden">
        
        {/* Subtle Top Inner Highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
        
        {/* Content */}
        <div className="relative z-10 h-full">
            {children}
        </div>

        {/* Optional: subtle noise or texture could be added here if needed in the future */}
      </div>
    </div>
  );
};
