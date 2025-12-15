import { GoogleGenAI } from "@google/genai";
import { FALLBACK_FOLLOW_UPS } from "../constants";

let genAI: GoogleGenAI | null = null;

try {
  if (process.env.API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (e) {
  console.warn("Gemini API Key not found, using fallbacks.");
}

export const generateFollowUpQuestion = async (
  category: string,
  originalPrompt: string,
  userAnswer: string
): Promise<string> => {
  if (!genAI) {
    return getRandomFallback();
  }

  try {
    const prompt = `
      You are a compassionate, gentle therapist assistant in a gardening app called "Reasons Garden".
      The user just planted a seed representing the therapeutic factor: "${category}".
      
      Original Prompt: "${originalPrompt}"
      User's Answer: "${userAnswer}"
      
      Please generate a single, short, warm, and non-judgmental follow-up question to help them reflect deeper or appreciate this strength. 
      Keep it under 20 words. Do not be clinical. Be poetic but grounded.
    `;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    return getRandomFallback();
  }
};

const getRandomFallback = () => {
  return FALLBACK_FOLLOW_UPS[Math.floor(Math.random() * FALLBACK_FOLLOW_UPS.length)];
};
