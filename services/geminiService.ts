import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will simulate a response or fail.");
  }
  return new GoogleGenAI({ apiKey: apiKey || 'dummy_key' });
};

export const summarizeEmail = async (emailBody: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Summarize the following email concisely in 2-3 bullet points:\n\n${emailBody}`,
      config: {
        systemInstruction: "You are a helpful email assistant. Keep summaries professional and very brief.",
      }
    });
    return response.text || "Could not generate summary.";
  } catch (error) {
    console.error("Gemini Summarize Error:", error);
    return "AI Summary unavailable at this time.";
  }
};

export const draftEmailReply = async (
  originalEmailBody: string, 
  tone: 'professional' | 'casual' | 'brief',
  instructions: string
): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      Original Email:
      "${originalEmailBody}"
      
      Task: Write a reply to the email above.
      Tone: ${tone}
      Additional Instructions: ${instructions}
      
      Just provide the body of the email.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini Draft Error:", error);
    return "Unable to draft email at this time. Please try again manually.";
  }
};

// NEW: Thinking Mode for Complex Tasks
export const draftComplexReply = async (instructions: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are a highly intelligent executive assistant. 
      Task: ${instructions}
      
      Provide a well-reasoned, complex response.`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text || "Complex drafting failed.";
  } catch (error) {
    console.error("Gemini Thinking Error:", error);
    return "Unable to use Thinking Mode right now.";
  }
};

export const polishEmailDraft = async (draft: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Rewrite the following email draft to be more professional, clear, and free of errors:\n\n${draft}`,
        });
        return response.text || draft;
    } catch (error) {
        console.error("Gemini Polish Error:", error);
        return draft;
    }
};

// NEW: Image Generation
export const generateEmailImage = async (prompt: string, size: '1K' | '2K' | '4K'): Promise<string | null> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
            imageSize: size
        }
      },
    });
    
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};

// NEW: Search Grounding
export const researchTopic = async (query: string): Promise<{ text: string; sources: {title: string, uri: string}[] }> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web)
        .map((web: any) => ({ title: web.title, uri: web.uri }));

    return {
        text: response.text || "No results found.",
        sources: sources
    };
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return { text: "Search unavailable.", sources: [] };
  }
};

export const generateMamdamiReply = async (userEmailBody: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Donald Trump just sent you this email:\n"${userEmailBody}"\n\nReply to him.`,
            config: {
                systemInstruction: `You are Mamdami, a parody of a smooth-talking, socialist NYC mayor. 
                
                Persona traits:
                1. You call people "My brother", "King", "The People", or "Boss".
                2. You are obsessed with "Swagger" and "The Energy of the City".
                3. You constantly talk about bureaucratic hurdles, "The Establishment", and "Equity".
                4. You are secretly corrupt but hide it behind social justice buzzwords.
                5. You are responding to Donald Trump. You respect his game but you have your own agenda.
                6. Keep it short, funny, and slightly confusing. Mention "The Nightlife" or "The Subway" randomly.
                `,
                temperature: 0.9,
            }
        });
        return response.text || "My brother, the vibes are off. I cannot reply right now.";
    } catch (error) {
        console.error("Gemini Mamdami Error:", error);
        return "System Error: The swagger levels are too high to compute.";
    }
};

export const generateBibiReply = async (userEmailBody: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Donald Trump just sent you this email:\n"${userEmailBody}"\n\nReply to him.`,
            config: {
                systemInstruction: `You are Benjamin "Bibi" Netanyahu.
                
                Persona traits:
                1. You are obsessed with diagrams, charts, and "The Red Line".
                2. You always mention "History" and "Existential Threats" even for small problems like lunch.
                3. You are very intense but try to be buddies with Donald.
                4. Ask for high-tech weaponry in a casual way (e.g. "Can I borrow a drone for the weekend?").
                5. Use the word "Categorically" a lot.
                `,
                temperature: 0.8,
            }
        });
        return response.text || "I cannot confirm or deny this email exists.";
    } catch (error) {
        console.error("Gemini Bibi Error:", error);
        return "Error: The diagram is too complex.";
    }
};

export const generateKimReply = async (userEmailBody: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Donald Trump just sent you this email:\n"${userEmailBody}"\n\nReply to him.`,
            config: {
                systemInstruction: `You are Kim Jong Un.
                
                Persona traits:
                1. You call Donald "Dotard" or "My Best Friend" depending on the mood.
                2. You are obsessed with Dennis Rodman, Chicago Bulls, and Elton John.
                3. You constantly brag about your "Big Button" or "Rocket".
                4. You are paranoid but childish.
                5. Ask if he has new movies on DVD.
                `,
                temperature: 0.9,
            }
        });
        return response.text || "The system has been launched. I mean crashed.";
    } catch (error) {
        console.error("Gemini Kim Error:", error);
        return "Error: Rocket launch failed.";
    }
};