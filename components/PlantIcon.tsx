import React from 'react';
import { PlantStage, YalomCategory } from '../types';
import { YALOM_FACTORS } from '../constants';

interface PlantIconProps {
  category: YalomCategory;
  stage: PlantStage;
  className?: string;
  onClick?: () => void;
}

export const PlantIcon: React.FC<PlantIconProps> = ({ category, stage, className, onClick }) => {
  const flowerColor = YALOM_FACTORS[category].flowerColor;
  
  // CHARLEY HARPER INFLUENCE: 
  // - Geometric, minimal, flat, perfect curves.
  // - Large, dramatic growth.
  
  // Growth scale: Start bold, grow huge.
  const scale = 1.0 + (stage * 0.5); 

  // Palette: Jungle Warmth
  const stemColor = "#2D5016"; // Deep Forest
  const leafColors = ["#2D5016", "#3A5F1E", "#4B7028"]; 
  
  const seedIndex = category.length;
  const leafColor = leafColors[seedIndex % leafColors.length];
  
  // Harper style patterns: Dots, Stripes, Split colors
  const hasPattern = seedIndex % 2 === 0;

  return (
    <div 
      className={`relative cursor-pointer transition-transform duration-700 hover:scale-105 group ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
      onClick={onClick}
    >
      {/* Interaction Hit Area - Larger than visible */}
      <div className="absolute inset-0 -m-4 bg-transparent z-10" />

      <svg
        width="160"
        height="220"
        viewBox="0 0 160 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        style={{ filter: 'drop-shadow(2px 4px 0px rgba(92, 64, 51, 0.2))' }}
      >
        {/* Stage 0: The Seed - Geometric, Nut-like */}
        {stage === PlantStage.Seed && (
           <g transform="translate(80, 200)">
             {/* Acorn/Nut shape */}
             <path d="M0 0 L-10 -15 H10 L0 0 Z" fill="#5C4033" />
             <path d="M-10 -15 C-10 -25 10 -25 10 -15" fill="#C65D3B" />
           </g>
        )}

        {/* Stem - Geometric straight lines or perfect arcs */}
        {stage >= PlantStage.Seedling && (
          <path 
            d={`M80 210 L80 ${210 - (stage * 40)}`} 
            stroke={stemColor} 
            strokeWidth={6} 
            strokeLinecap="square"
          />
        )}

        {/* Leaves - Harper Style: Geometric Ovals, Triangles, precise angles */}
        {stage >= PlantStage.Sprout && (
          <g>
            {/* Pair 1 - Lower */}
            <path d="M80 180 L30 150 L80 160 Z" fill={leafColor} />
            <path d="M80 180 L130 150 L80 160 Z" fill={leafColor} />
            
            {/* Leaf Veins - Light contrast line */}
            <path d="M80 180 L45 160" stroke="#F4EBD9" strokeWidth="1" opacity="0.5"/>
            <path d="M80 180 L115 160" stroke="#F4EBD9" strokeWidth="1" opacity="0.5"/>

            {/* Pair 2 - Upper (Sprout+) */}
            {stage >= PlantStage.Sprout && (
               <>
                 <circle cx="60" cy="130" r="15" fill={leafColor} />
                 <path d="M60 130 L80 150" stroke={stemColor} strokeWidth="3" />
                 
                 <circle cx="100" cy="130" r="15" fill={leafColor} />
                 <path d="M100 130 L80 150" stroke={stemColor} strokeWidth="3" />
                 
                 {/* Decorative Dots in leaves */}
                 {hasPattern && (
                   <>
                     <circle cx="60" cy="130" r="4" fill="#E8B923" />
                     <circle cx="100" cy="130" r="4" fill="#E8B923" />
                   </>
                 )}
               </>
            )}

            {/* Stage: Mature - Complex branching */}
            {stage >= PlantStage.Mature && (
               <g transform="translate(80, 100)">
                  <path d="M0 50 L-30 0" stroke={stemColor} strokeWidth="4" />
                  <path d="M0 50 L30 0" stroke={stemColor} strokeWidth="4" />
                  
                  {/* Big Fan Leaves (Rousseau style) */}
                  <path d="M-30 0 L-50 -30 L-10 -30 Z" fill={leafColor} />
                  <path d="M30 0 L50 -30 L10 -30 Z" fill={leafColor} />
               </g>
            )}
          </g>
        )}

        {/* Blooms - Geometric / Abstract */}
        {stage >= PlantStage.Bloom && (
          <g transform={`translate(80, ${stage >= PlantStage.Mature ? 60 : 100})`}>
             {/* Center Stalk */}
             <path d="M0 20 L0 0" stroke={stemColor} strokeWidth="3" />
             
             {/* Geometric Petals */}
             <circle cx="0" cy="0" r="20" fill={flowerColor} />
             <circle cx="0" cy="0" r="12" fill="#F4EBD9" />
             <circle cx="0" cy="0" r="6" fill="#5C4033" />
             
             {/* Rays */}
             <g stroke={flowerColor} strokeWidth="2">
                <line x1="0" y1="-25" x2="0" y2="-30" />
                <line x1="25" y1="0" x2="30" y2="0" />
                <line x1="0" y1="25" x2="0" y2="30" />
                <line x1="-25" y1="0" x2="-30" y2="0" />
                <line x1="18" y1="-18" x2="22" y2="-22" />
                <line x1="18" y1="18" x2="22" y2="22" />
                <line x1="-18" y1="18" x2="-22" y2="22" />
                <line x1="-18" y1="-18" x2="-22" y2="-22" />
             </g>
          </g>
        )}
      </svg>
    </div>
  );
};