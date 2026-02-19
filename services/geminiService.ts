
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const generateRehabAdvice = async (userPrompt: string) => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are a professional rehabilitation assistant for Chify Rehabilitation. Your tone is empathetic, clinical yet accessible, and professional. Provide information about physical therapy, occupational therapy, and general wellness. Always remind users to consult with Chify specialists for a personalized plan.",
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating advice:", error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base. Please contact our support team at Chify Rehabilitation directly.";
  }
};
