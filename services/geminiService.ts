import { GoogleGenAI } from "@google/genai";
import { Shelter } from "../types";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we will proceed, but API calls will fail.
  console.warn("Gemini API key not found. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getAiShelterRecommendation = async (
  userSituation: string,
  shelters: Shelter[]
): Promise<Shelter | null> => {
  if (!API_KEY || shelters.length === 0) {
    if (shelters.length === 0) {
        console.warn("AI recommendation requested with an empty shelter list.");
    }
    return null;
  }

  const model = 'gemini-2.5-flash';
  
  const shelterListText = shelters.map(s => 
    `ID: ${s.id}, Name: ${s.name}, City: ${s.city}, For: ${s.forWhom.join(', ')}, Services: ${s.services.join(', ')}, Beds Available: ${s.bedsAvailable}`
  ).join('\n');

  const prompt = `
    You are an AI assistant for "ShelterConnect India". Your task is to recommend the most suitable shelter for a person in need.
    
    User's situation: "${userSituation}"
    
    Here is a list of available shelters:
    ${shelterListText}
    
    Based on the user's situation, analyze the list of shelters and determine the single best match. Consider factors like location (city), who the shelter is for (men, women, families), available services, and bed availability.
    
    Respond with ONLY the numeric ID of the most suitable shelter. For example, if you think shelter with ID 3 is the best match, your entire response should be just "3". 

    If no shelter is a good match for the user's needs, respond with the word "NONE". Do not add any other text, explanation, or formatting.
  `;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: prompt
    });
    
    const responseText = response.text.trim();

    if (responseText.toUpperCase().includes('NONE')) {
        return null;
    }

    const match = responseText.match(/\d+/);
    const recommendedId = match ? parseInt(match[0], 10) : NaN;

    if (!isNaN(recommendedId)) {
      const recommendedShelter = shelters.find(s => s.id === recommendedId);
      return recommendedShelter || null;
    }
    return null;
  } catch (error) {
    console.error("Error getting AI recommendation:", error);
    return null;
  }
};