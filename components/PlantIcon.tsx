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
  
  // DRAMATIC GROWTH SCALING
  // Formula designed to hit "Impressive Tree" by Stage 2.
  // Stage 0 (Seed): 1.0
  // Stage 1 (Seedling): 1.8 (Significant start)
  // Stage 2 (Sprout): 3.5 (Huge jump - 10% screen feel)
  // Stage 3 (Bloom): 5.5
  // Stage 4 (Mature): 8.0
  const scale = 1.0 + (Math.pow(stage, 1.8) * 0.7);

  // Palette: Jungle Warmth
  const stemColor = "#2D5016"; // Deep Forest Green
  const leafColors = ["#2D5016", "#3A5F1E", "#4B7028", "#1a350d"]; 
  
  const seedIndex = category.length;
  const leafColor = leafColors[seedIndex % leafColors.length];
  
  // Harper style patterns: Dots, Stripes
  const hasPattern = seedIndex % 2 === 0;

  return (
    <div 
      className={`relative cursor-pointer transition-transform duration-1000 ease-in-out hover:scale-110 hover:z-50 group ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: 'bottom center' }}
      onClick={onClick}
    >
      {/* Interaction Hit Area - Massive for easy clicking */}
      <div className="absolute inset-0 -m-10 bg-transparent z-10 rounded-full" />

      <svg
        width="160"
        height="220"
        viewBox="0 0 160 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        style={{ filter: 'drop-shadow(4px 8px 0px rgba(92, 64, 51, 0.15))' }}
      >
        {/* Stage 0: The Seed - Geometric Nut */}
        {stage === PlantStage.Seed && (
           <g transform="translate(80, 200)">
             <path d="M0 0 L-12 -18 H12 L0 0 Z" fill="#5C4033" />
             <path d="M-12 -18 C-12 -28 12 -28 12 -18" fill="#C65D3B" />
             {/* Sprouting bit hint */}
             <path d="M0 -28 L0 -35" stroke="#2D5016" strokeWidth="3" />
           </g>
        )}

        {/* Stem - Thick and sturdy from the start */}
        {stage >= PlantStage.Seedling && (
          <path 
            d={`M80 210 Q 85 ${180 - (stage * 20)} 80 ${210 - (stage * 55)}`} 
            stroke={stemColor} 
            strokeWidth={Math.max(6, 4 + stage * 2)} 
            strokeLinecap="round"
          />
        )}

        {/* Leaves - Accelerated Growth */}
        {/* Even Stage 1 gets leaves now */}
        {stage >= PlantStage.Seedling && (
          <g>
            {/* Base Leaves (Big & Geometric) */}
            <path d="M80 200 Q 50 180 30 200 Q 50 220 80 200" fill={leafColor} />
            <path d="M80 200 Q 110 180 130 200 Q 110 220 80 200" fill={leafColor} />
            
            {/* Mid Leaves (Added at Stage 1 for density) */}
            <path d="M80 170 Q 50 150 40 170 C 40 180 80 180 80 170" fill={leafColor} transform={stage >= PlantStage.Sprout ? "scale(1.2) translate(-10, -10)" : ""} />
            <path d="M80 170 Q 110 150 120 170 C 120 180 80 180 80 170" fill={leafColor} transform={stage >= PlantStage.Sprout ? "scale(1.2) translate(5, -10)" : ""} />

            {/* Stage 2 (Sprout) -> Looks like a Tree */}
            {stage >= PlantStage.Sprout && (
               <g transform="translate(0, -30)">
                 {/* Branching */}
                 <path d="M80 160 L 50 130" stroke={stemColor} strokeWidth="5" />
                 <path d="M80 160 L 110 130" stroke={stemColor} strokeWidth="5" />
                 
                 {/* Big Canopy Leaves */}
                 <circle cx="50" cy="130" r="25" fill={leafColor} />
                 <circle cx="110" cy="130" r="25" fill={leafColor} />
                 <circle cx="80" cy="110" r="30" fill={leafColor} />
                 
                 {/* Patterns */}
                 {hasPattern && (
                   <>
                     <circle cx="80" cy="110" r="8" fill="#E8B923" />
                     <path d="M40 130 H 60" stroke="#F4EBD9" strokeWidth="2" />
                     <path d="M100 130 H 120" stroke="#F4EBD9" strokeWidth="2" />
                   </>
                 )}
               </g>
            )}

            {/* Stage 3+ (Mature) -> Huge Fan Leaves / Rousseau Jungle Style */}
            {stage >= PlantStage.Bloom && (
               <g transform="translate(80, 80) scale(1.3)">
                  <path d="M0 0 L -40 -40 L -10 -50 Z" fill={leafColor} />
                  <path d="M0 0 L 40 -40 L 10 -50 Z" fill={leafColor} />
                  <path d="M0 -20 L 0 -70" stroke={stemColor} strokeWidth="4" />
                  <ellipse cx="0" cy="-70" rx="15" ry="30" fill={leafColor} />
               </g>
            )}
          </g>
        )}

        {/* Blooms - Massive, Geometric, Radiant */}
        {stage >= PlantStage.Bloom && (
          <g transform={`translate(80, ${stage >= PlantStage.Mature ? 0 : 40}) scale(${stage >= PlantStage.Mature ? 1.5 : 1})`}>
             {/* Center Stalk */}
             <path d="M0 40 L0 0" stroke={stemColor} strokeWidth="4" />
             
             {/* Petals - Big Geometric Flower */}
             {/* Layer 1 */}
             <circle cx="0" cy="0" r="35" fill={flowerColor} />
             {/* Layer 2 */}
             <circle cx="0" cy="0" r="25" fill="#F4EBD9" />
             {/* Center */}
             <circle cx="0" cy="0" r="12" fill="#5C4033" />
             
             {/* Decorative Rays - Harper Style */}
             <g stroke={flowerColor} strokeWidth="3">
                <line x1="0" y1="-40" x2="0" y2="-50" />
                <line x1="40" y1="0" x2="50" y2="0" />
                <line x1="0" y1="40" x2="0" y2="50" />
                <line x1="-40" y1="0" x2="-50" y2="0" />
                <line x1="28" y1="-28" x2="35" y2="-35" />
                <line x1="28" y1="28" x2="35" y2="35" />
                <line x1="-28" y1="28" x2="-35" y2="35" />
                <line x1="-28" y1="-28" x2="-35" y2="-35" />
             </g>
          </g>
        )}
      </svg>
    </div>
  );
};