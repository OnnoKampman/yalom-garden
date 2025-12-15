import { PromptDefinition, YalomCategory } from './types';

// Palette Reference:
// Deep Green: #2D5016
// Terracotta: #C65D3B
// Cream: #F4EBD9
// Gold: #E8B923
// Brown: #5C4033

export const YALOM_FACTORS: Record<YalomCategory, PromptDefinition> = {
  Universality: {
    category: 'Universality',
    question: "In your moments of struggle, what shared human experience reminds you that you are not isolated?",
    color: 'text-[#C65D3B]', // Terracotta
    flowerColor: '#C65D3B', 
    description: "Connection to the shared human condition (Protective Factor: Connectedness)."
  },
  Altruism: {
    category: 'Altruism',
    question: "Who relies on you, and how does your care for them anchor you to life?",
    color: 'text-[#E8B923]', // Gold
    flowerColor: '#E8B923', 
    description: "Responsibility to family and others (Reasons for Living Inventory)."
  },
  Hope: {
    category: 'Hope',
    question: "What is one 'unfinished story' or future joy that you are determined to stay for?",
    color: 'text-[#2D5016]', // Deep Green
    flowerColor: '#F4EBD9', // Cream (Contrast flower)
    description: "Cultivating positive emotion and optimism (PERMA)."
  },
  Interpersonal: {
    category: 'Interpersonal',
    question: "Which relationship in your life acts as a safe harbor, and how does it strengthen you?",
    color: 'text-[#C65D3B]', 
    flowerColor: '#E8B923', // Gold center
    description: "The protective power of authentic connection (Protective Factors)."
  },
  Existential: {
    category: 'Existential',
    question: "If life is asking a question of you right now, what is your answer through action?",
    color: 'text-[#5C4033]', // Brown
    flowerColor: '#C65D3B',
    description: "Finding meaning by taking responsibility for your existence (Frankl)."
  },
  Catharsis: {
    category: 'Catharsis',
    question: "Think of a recent emotional storm you weathered. What inner resource helped you survive it?",
    color: 'text-[#2D5016]',
    flowerColor: '#E8B923',
    description: "Trusting your coping beliefs and survival skills (RFL)."
  },
  Cohesion: {
    category: 'Cohesion',
    question: "Where do you find a sense of 'tribe' or safety that makes the world feel like home?",
    color: 'text-[#5C4033]',
    flowerColor: '#F4EBD9',
    description: "Belonging and social integration (Protective Factors)."
  },
  Information: {
    category: 'Information',
    question: "What have you learned about your own resilience that proves you can handle difficult things?",
    color: 'text-[#C65D3B]',
    flowerColor: '#5C4033', // Dark flower
    description: "Recognizing mastery and self-efficacy (PERMA)."
  }
};

export const FALLBACK_FOLLOW_UPS = [
  "How does recognizing this strength change your perspective today?",
  "What small step can you take to honor this reason for living?",
  "Why is this particular anchor important to you right now?",
  "How does this connect to your sense of purpose?",
  "What would you tell a friend who possesses this same strength?"
];