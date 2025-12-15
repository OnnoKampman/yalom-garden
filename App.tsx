import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PlantData, PlantStage, YalomCategory } from './types';
import { YALOM_FACTORS } from './constants';
import { PlantIcon } from './components/PlantIcon';
import { Modal } from './components/Modal';
import { SoundController } from './components/SoundController';
import { generateFollowUpQuestion } from './services/geminiService';

// Scaffolding: Permanent "Ancient" trees and vines that frame the garden
const JungleScaffolding: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    {/* Left Frame Tree - Dark Silhouette */}
    <svg className="absolute top-0 left-0 h-full w-[20%] text-[#1a350d] opacity-90" preserveAspectRatio="none" viewBox="0 0 100 800">
       <path d="M0 0 H 60 Q 40 200 80 400 Q 20 600 90 800 H 0 Z" fill="currentColor" />
       {/* Branch */}
       <path d="M40 200 Q 150 250 180 220" stroke="currentColor" strokeWidth="20" fill="none" strokeLinecap="round"/>
    </svg>

    {/* Right Frame Tree - Dark Silhouette */}
    <svg className="absolute top-0 right-0 h-full w-[15%] text-[#1a350d] opacity-90" preserveAspectRatio="none" viewBox="0 0 100 800">
       <path d="M100 0 H 20 Q 80 200 40 500 Q 90 700 30 800 H 100 Z" fill="currentColor" />
       {/* Branch */}
       <path d="M60 150 Q -50 200 -80 160" stroke="currentColor" strokeWidth="15" fill="none" strokeLinecap="round"/>
    </svg>

    {/* Hanging Vines - Scaffolding for the top */}
    <div className="absolute top-0 left-0 w-full h-[30%] text-[#2D5016]">
       <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
         {/* Vine 1 */}
         <path d="M100 0 Q 120 100 100 200" stroke="currentColor" strokeWidth="4" fill="none" />
         <circle cx="100" cy="200" r="5" fill="#E8B923" />
         {/* Vine 2 */}
         <path d="M300 0 Q 280 150 320 250" stroke="currentColor" strokeWidth="3" fill="none" />
         <path d="M320 250 L 310 270 L 330 270 Z" fill="#C65D3B" />
         {/* Vine 3 */}
         <path d="M600 0 Q 650 120 620 220" stroke="currentColor" strokeWidth="5" fill="none" />
         {/* Vine 4 */}
         <path d="M850 0 Q 820 180 880 280" stroke="currentColor" strokeWidth="4" fill="none" />
         <circle cx="880" cy="280" r="8" fill="#E8B923" />
       </svg>
    </div>
  </div>
);

// Wildlife Component - Interactive and Permanent Residents
const GardenWildlife: React.FC<{ plantCount: number }> = ({ plantCount }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
      
      {/* PERMANENT GUARDIAN: The Wise Owl (Always present) */}
      <div className="absolute top-[18%] left-[8%] animate-sway-slow origin-bottom">
         <svg width="80" height="100" viewBox="0 0 80 100">
            {/* Body */}
            <ellipse cx="40" cy="50" rx="30" ry="40" fill="#5C4033" />
            {/* Wings */}
            <path d="M10 50 Q 0 70 20 80" fill="#2D5016" />
            <path d="M70 50 Q 80 70 60 80" fill="#2D5016" />
            {/* Eyes */}
            <circle cx="28" cy="40" r="10" fill="#E8B923" />
            <circle cx="52" cy="40" r="10" fill="#E8B923" />
            <circle cx="28" cy="40" r="3" fill="#1c1917" />
            <circle cx="52" cy="40" r="3" fill="#1c1917" />
            {/* Beak */}
            <path d="M40 50 L 35 55 L 45 55 Z" fill="#C65D3B" />
            {/* Ear Tufts */}
            <path d="M20 20 L 15 5 L 35 20" fill="#5C4033" />
            <path d="M60 20 L 65 5 L 45 20" fill="#5C4033" />
         </svg>
      </div>

      {/* 1+ Plants: Geometric Butterflies */}
      {plantCount >= 1 && (
        <>
          <div className="absolute top-[25%] left-[25%] animate-float" style={{ animationDuration: '9s' }}>
             <svg width="60" height="60" viewBox="0 0 60 60">
                <path d="M30 30 L5 10 L5 50 Z" fill="#E8B923" />
                <path d="M30 30 L55 10 L55 50 Z" fill="#E8B923" />
                <rect x="28" y="10" width="4" height="40" fill="#5C4033" rx="2" />
             </svg>
          </div>
        </>
      )}

      {/* 3+ Plants: Minimalist Toucan */}
      {plantCount >= 3 && (
        <div className="absolute top-[15%] right-[5%] z-10 animate-sway">
           <svg width="120" height="120" viewBox="0 0 100 100">
              <path d="M50 20 Q 80 20 80 50 Q 80 80 50 80 L 50 20" fill="#1c1917" />
              <path d="M50 25 L 10 35 L 50 45" fill="#C65D3B" />
              <path d="M20 32 L 30 30 L 30 40 Z" fill="#E8B923" />
              <circle cx="60" cy="35" r="8" fill="white" />
              <circle cx="60" cy="35" r="3" fill="#1c1917" />
           </svg>
        </div>
      )}

      {/* 5+ Plants: Harper Style Tiger (Hidden in grass) */}
      {plantCount >= 5 && (
        <div className="absolute bottom-[10%] left-[5%] z-0 opacity-90">
           <svg width="200" height="150" viewBox="0 0 200 150">
             <rect x="50" y="50" width="100" height="60" rx="30" fill="#C65D3B" />
             <path d="M70 50 L80 80 L90 50" fill="#1c1917" />
             <path d="M100 50 L110 90 L120 50" fill="#1c1917" />
             <path d="M130 50 L140 80 L150 50" fill="#1c1917" />
             <circle cx="160" cy="60" r="25" fill="#C65D3B" />
             <path d="M145 40 L155 20 L165 40" fill="#1c1917" />
             <path d="M165 40 L175 20 L185 40" fill="#1c1917" />
             <circle cx="155" cy="55" r="3" fill="#2D5016" />
             <circle cx="170" cy="55" r="3" fill="#2D5016" />
           </svg>
        </div>
      )}
    </div>
  );
};

// Rousseau Style Scenery - Background Layers
const RousseauScenery: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Background: Warm Cream */}
    <div className="absolute inset-0 bg-[#F4EBD9]" />
    
    {/* Sun: Big Geometric Circle (Harper Style) - Restored with Rays */}
    <div className="absolute top-[5%] right-[10%] w-32 h-32 bg-[#E8B923] rounded-full opacity-80" />
    <div className="absolute top-[5%] right-[10%] w-32 h-32">
       <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible animate-[spin_20s_linear_infinite]">
         {[...Array(12)].map((_, i) => (
           <line 
             key={i} 
             x1="50" y1="50" x2="50" y2="-20" 
             stroke="#E8B923" strokeWidth="2" strokeDasharray="5 5"
             transform={`rotate(${i * 30} 50 50)`} 
           />
         ))}
       </svg>
    </div>
    
    {/* Layer 1: Distant Pale Foliage */}
    <div className="absolute bottom-[30%] w-full h-[50%] text-[#2D5016] opacity-10">
       <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 C 10 50 20 80 30 40 C 40 80 50 20 60 70 C 70 30 80 80 90 50 C 95 80 100 60 V 100 H 0 Z" fill="currentColor" />
       </svg>
    </div>

    {/* Layer 2: Midground Flat Shapes (Rousseau Bushes) */}
    <div className="absolute bottom-0 w-full h-[40%] text-[#2D5016] opacity-20">
       <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 100">
          <ellipse cx="20" cy="100" rx="30" ry="60" fill="currentColor" />
          <ellipse cx="60" cy="120" rx="40" ry="70" fill="currentColor" />
          <ellipse cx="100" cy="100" rx="30" ry="50" fill="currentColor" />
          <ellipse cx="150" cy="110" rx="50" ry="80" fill="currentColor" />
          <ellipse cx="190" cy="100" rx="20" ry="40" fill="currentColor" />
       </svg>
    </div>

    {/* Layer 3: Foreground Ground Line (Refined Soil) */}
    <div className="absolute bottom-0 w-full h-[18%] z-0">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
            {/* Darker Earth Layer */}
            <path d="M0 120 V 40 C 200 30 400 60 600 40 C 800 20 1000 50 1200 30 V 120 Z" fill="#4A3728" opacity="0.2" />
            {/* Lighter Earth Layer */}
            <path d="M0 120 V 60 C 300 80 500 40 800 60 C 1000 80 1100 50 1200 70 V 120 Z" fill="#5C4033" opacity="0.15" />
        </svg>
    </div>
  </div>
);

const App: React.FC = () => {
  const [plants, setPlants] = useState<PlantData[]>([]);
  const [isPlanting, setIsPlanting] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [plantingCategory, setPlantingCategory] = useState<YalomCategory | null>(null);
  const [inputText, setInputText] = useState('');
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);
  const [followUpQuestion, setFollowUpQuestion] = useState<string>('');
  const [loadingFollowUp, setLoadingFollowUp] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('reasons_garden_plants');
    if (saved) {
      try {
        setPlants(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load garden", e);
      }
    } else {
      setShowAbout(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reasons_garden_plants', JSON.stringify(plants));
  }, [plants]);

  const startPlanting = () => {
    const categories = Object.keys(YALOM_FACTORS) as YalomCategory[];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    setPlantingCategory(randomCategory);
    setIsPlanting(true);
    setInputText('');
  };

  const plantSeed = () => {
    if (!plantingCategory || !inputText.trim()) return;

    const newPlant: PlantData = {
      id: uuidv4(),
      category: plantingCategory,
      stage: PlantStage.Seed,
      // Focus planting in central area so massive scaling doesn't go off-screen immediately
      x: 10 + Math.random() * 80, 
      y: 35 + Math.random() * 35, 
      reflections: [{
        question: YALOM_FACTORS[plantingCategory].question,
        answer: inputText,
        timestamp: Date.now()
      }],
      lastWatered: Date.now()
    };

    setPlants([...plants, newPlant]);
    setIsPlanting(false);
    setPlantingCategory(null);
    setInputText('');
  };

  const handlePlantClick = async (plant: PlantData) => {
    setSelectedPlantId(plant.id);
    setLoadingFollowUp(true);
    setInputText('');
    const lastReflection = plant.reflections[plant.reflections.length - 1];
    const question = await generateFollowUpQuestion(plant.category, lastReflection.question, lastReflection.answer);
    setFollowUpQuestion(question);
    setLoadingFollowUp(false);
  };

  const submitReflection = () => {
    if (!selectedPlantId || !inputText.trim()) return;

    setPlants(prev => prev.map(p => {
      if (p.id === selectedPlantId) {
        const nextStage = p.stage < PlantStage.Mature ? p.stage + 1 : p.stage;
        return {
          ...p,
          stage: nextStage,
          lastWatered: Date.now(),
          reflections: [...p.reflections, { question: followUpQuestion, answer: inputText, timestamp: Date.now() }]
        };
      }
      return p;
    }));
    setSelectedPlantId(null);
    setInputText('');
  };

  const selectedPlant = plants.find(p => p.id === selectedPlantId);

  return (
    <div className="relative min-h-screen flex flex-col font-sans overflow-hidden bg-[#F4EBD9]">
      
      {/* Background Layers */}
      <RousseauScenery />
      <JungleScaffolding /> {/* Permanent Scaffolding Layer */}
      <GardenWildlife plantCount={plants.length} />

      {/* Header UI - Paper Card Style */}
      <header className="relative z-20 px-6 py-6 flex justify-between items-start">
        <div className="paper-panel p-4 pr-6 flex items-center gap-4 rounded-none transform -rotate-1">
           <div className="w-12 h-12 bg-[#2D5016] flex items-center justify-center text-2xl border-2 border-[#5C4033] text-[#F4EBD9]">
             🌿
           </div>
           <div>
              <h1 className="text-3xl font-serif font-bold text-[#2D5016] tracking-tight">Yalom’s Garden</h1>
              <p className="text-[#C65D3B] text-xs font-bold tracking-widest uppercase">Mental Resilience</p>
           </div>
           <button 
             onClick={() => setShowAbout(true)}
             className="ml-2 w-8 h-8 border-2 border-[#5C4033] bg-[#E8B923] hover:bg-[#C65D3B] flex items-center justify-center text-[#2D5016] transition-colors font-serif font-bold"
           >
             ?
           </button>
        </div>
        
        {/* Sound Controller in Header */}
        <SoundController />
      </header>

      {/* Garden Interactive Area */}
      <main className="flex-grow relative w-full h-full">
        {plants.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
             <div className="text-center p-8 max-w-sm paper-panel rotate-1 text-[#5C4033] bg-[#F4EBD9]/95">
                <h3 className="serif-font text-2xl font-bold mb-2">The Ground is Fertile</h3>
                <p className="text-[#5C4033] mb-4 font-medium italic">"Every blade of grass has its angel that bends over it and whispers, 'Grow, grow.'"</p>
                <div className="text-3xl animate-bounce text-[#C65D3B]">↓</div>
             </div>
          </div>
        )}

        {plants.map((plant) => (
          <div
            key={plant.id}
            className="absolute z-10 transition-all duration-1000 ease-out"
            style={{ left: `${plant.x}%`, top: `${plant.y}%` }}
          >
            <PlantIcon 
              category={plant.category} 
              stage={plant.stage}
              className={`drop-shadow-xl ${plant.id.charCodeAt(0) % 2 === 0 ? 'animate-sway' : 'animate-sway-slow'}`}
              onClick={() => handlePlantClick(plant)}
            />
          </div>
        ))}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center z-30">
        <button
          onClick={startPlanting}
          className="group flex items-center gap-3 btn-primary px-8 py-4 shadow-[6px_6px_0px_#5C4033]"
        >
          <span className="text-3xl font-light leading-none text-[#E8B923]">+</span>
          <span className="font-serif font-bold text-lg tracking-wide">Plant a Seed</span>
        </button>
      </div>

      {/* Modals */}
      <Modal isOpen={showAbout} onClose={() => setShowAbout(false)} title="Jungle of the Mind">
        <div className="space-y-4">
          <p className="leading-relaxed font-medium font-serif text-lg">
            This garden is built on the principles of Existential Psychotherapy.
          </p>
          <div className="bg-[#E8B923]/20 p-6 border-l-4 border-[#C65D3B] space-y-2">
             <p>Just as a jungle grows dense through diversity, your resilience grows through different sources of meaning:</p>
             <ul className="list-disc pl-5 space-y-1 font-bold text-[#2D5016] text-sm mt-2">
                <li>Altruism & Service</li>
                <li>Human Connection</li>
                <li>Existential Purpose</li>
                <li>Hope & Future Vision</li>
             </ul>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isPlanting} onClose={() => setIsPlanting(false)} title={plantingCategory ? "Sow Intention" : "Plant Seed"}>
        {plantingCategory && (
          <div className="space-y-6">
            <div className="text-center space-y-3 bg-[#F4EBD9] p-6 border-2 border-[#5C4033] shadow-[4px_4px_0px_rgba(92,64,51,0.1)]">
              <span className={`inline-block px-4 py-1.5 text-xs font-black uppercase tracking-widest bg-[#2D5016] text-[#F4EBD9]`}>
                {YALOM_FACTORS[plantingCategory].category}
              </span>
              <h3 className="serif-font text-2xl text-[#2D5016] font-bold leading-tight">
                {YALOM_FACTORS[plantingCategory].question}
              </h3>
              <p className="text-[#5C4033] text-sm font-bold">
                {YALOM_FACTORS[plantingCategory].description}
              </p>
            </div>
            
            <textarea
              autoFocus
              className="w-full p-5 bg-white border-2 border-[#5C4033] focus:border-[#C65D3B] focus:ring-0 resize-none text-lg min-h-[140px] placeholder:text-stone-300 font-medium text-[#2D5016]"
              placeholder="Root your thoughts here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <div className="flex gap-3">
              <button onClick={() => setIsPlanting(false)} className="flex-1 py-3 border-2 border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-[#F4EBD9] transition-colors font-bold uppercase tracking-wide text-xs">
                Cancel
              </button>
              <button onClick={plantSeed} disabled={!inputText.trim()} className="flex-[2] py-3 bg-[#2D5016] text-[#F4EBD9] border-2 border-[#2D5016] hover:bg-[#1a350d] disabled:opacity-50 transition-all font-bold uppercase tracking-wide text-xs shadow-[4px_4px_0px_#5C4033] active:translate-y-[2px] active:shadow-[2px_2px_0px_#5C4033]">
                Plant
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!selectedPlantId} onClose={() => setSelectedPlantId(null)} title="Cultivate">
        {selectedPlant && (
          <div className="space-y-6">
            <div className="max-h-[250px] overflow-y-auto space-y-4 pr-2 scrollbar-thin">
               <div className="flex items-center justify-between text-xs text-[#5C4033] font-black uppercase tracking-widest border-b-2 border-[#5C4033] pb-2">
                  <span>Roots & Growth</span>
                  <span className="text-[#C65D3B]">{selectedPlant.category}</span>
               </div>
               {selectedPlant.reflections.map((ref, idx) => (
                 <div key={idx} className="bg-white p-4 border-l-4 border-[#2D5016] shadow-sm">
                   <p className="serif-font text-[#2D5016] font-bold mb-1 text-lg">{ref.question}</p>
                   <p className="text-[#5C4033] text-sm leading-relaxed font-medium">"{ref.answer}"</p>
                 </div>
               ))}
            </div>

            <div className="pt-2">
              {loadingFollowUp ? (
                <div className="text-center py-8 space-y-4 opacity-70">
                  <div className="inline-block w-8 h-8 border-4 border-[#F4EBD9] border-t-[#C65D3B] rounded-full animate-spin"></div>
                  <p className="text-xs text-[#C65D3B] font-bold uppercase tracking-widest">Deepening Roots...</p>
                </div>
              ) : (
                <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
                  <div className="p-5 bg-[#E8B923]/20 border-2 border-[#E8B923]">
                    <p className="serif-font text-xl text-[#5C4033] font-bold italic text-center">
                      {followUpQuestion}
                    </p>
                  </div>
                  
                  <textarea
                    autoFocus
                    className="w-full p-5 bg-white border-2 border-[#5C4033] focus:border-[#C65D3B] focus:ring-0 resize-none min-h-[120px] font-medium text-[#2D5016]"
                    placeholder="Reflect..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />

                  <button onClick={submitReflection} disabled={!inputText.trim()} className="w-full py-4 bg-[#C65D3B] text-[#F4EBD9] border-2 border-[#C65D3B] hover:bg-[#a54d30] disabled:opacity-50 transition-all font-bold uppercase tracking-widest shadow-[4px_4px_0px_#5C4033] active:translate-y-[2px] active:shadow-[2px_2px_0px_#5C4033]">
                    Nurture Growth
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;