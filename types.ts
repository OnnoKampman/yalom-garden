export enum PlantStage {
  Seed = 0,
  Seedling = 1,
  Sprout = 2,
  Bloom = 3,
  Mature = 4
}

export type YalomCategory = 
  | 'Universality'
  | 'Altruism'
  | 'Hope'
  | 'Interpersonal'
  | 'Existential'
  | 'Catharsis'
  | 'Cohesion'
  | 'Information';

export interface PromptDefinition {
  category: YalomCategory;
  question: string;
  color: string;
  flowerColor: string;
  description: string;
}

export interface ReflectionEntry {
  question: string;
  answer: string;
  timestamp: number;
}

export interface PlantData {
  id: string;
  category: YalomCategory;
  stage: PlantStage;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  reflections: ReflectionEntry[];
  lastWatered: number;
}
