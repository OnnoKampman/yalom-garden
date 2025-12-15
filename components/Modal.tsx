import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, icon }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Solid Backdrop - Multiply effect for richness */}
      <div 
        className="absolute inset-0 bg-[#2D5016] opacity-40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Paper Card - Solid, framed */}
      <div className="relative w-full max-w-lg bg-[#F4EBD9] shadow-[8px_8px_0px_#5C4033] border-2 border-[#5C4033] transform transition-all animate-[fadeIn_0.3s_ease-out]">
        
        {/* Header with decorative border bottom */}
        <div className="px-8 pt-6 pb-4 flex items-center justify-between border-b-2 border-[#5C4033] bg-[#E8B923]/10">
          <div className="flex items-center gap-3">
             {icon && <div className="text-2xl text-[#C65D3B]">{icon}</div>}
             <h2 className="text-2xl font-serif font-bold text-[#2D5016] tracking-tight">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#5C4033] hover:text-[#C65D3B] text-2xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>
        
        {/* Content */}
        <div className="px-8 py-8 text-[#5C4033]">
          {children}
        </div>
      </div>
    </div>
  );
};