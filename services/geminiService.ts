
import { GoogleGenAI } from "@google/genai";

// Fix: Removed environment variable caching and pre-checks.
// Followed guideline to use process.env.API_KEY directly in constructor.
export const generateRehabAdvice = async (userPrompt: string) => {
  // Fix: Initializing GoogleGenAI with named parameter and direct process.env reference
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are a professional rehabilitation assistant for Chify Rehabilitation. Your tone is empathetic, clinical yet accessible, and professional. Provide information about physical therapy, occupational therapy, and general wellness. Always remind users to consult with Chify specialists for a personalized plan.",
        temperature: 0.7,
      },
    });

    // Fix: Access response.text directly (property, not a function)
    return response.text;
  } catch (error) {
    console.error("Error generating advice:", error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base. Please contact our support team at Chify Rehabilitation directly.";
  }
};
