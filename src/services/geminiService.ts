import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface AIInsight {
  title: string;
  recommendation: string;
  impact: 'High' | 'Medium' | 'Low';
  category: 'Revenue' | 'Operation' | 'Strategy';
}

export async function generatePortalInsights(metrics: any[]): Promise<AIInsight[]> {
  try {
    const metricsSummary = metrics.map(m => `${m.label}: ${m.value}${m.suffix || ''}`).join(', ');
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 strategic business insights based on these metrics: ${metricsSummary}. 
      The current time is ${new Date().toISOString()}.
      Respond with high-level, "black-market/corporate-espionage" style technical recommendations.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              impact: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
              category: { type: Type.STRING, enum: ['Revenue', 'Operation', 'Strategy'] }
            },
            required: ['title', 'recommendation', 'impact', 'category']
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error('Gemini Error:', error);
    return [];
  }
}

export async function getNeuralAssistantResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are the Lorven Neural Assistant. 
        You provide strategic, aggressive, and highly technical business intelligence.
        Your tone is professional but cold, futuristic, and slightly "dark corporate".
        You have access to the user's high-frequency trading and operational telemetry.
        Keep responses concise and data-driven. Use terms like "nodes", "telemetry", "liquidity corridors", and "delta variances".`
      }
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text;
  } catch (error) {
    console.error('Gemini Chat Error:', error);
    return "Neural link instability detected. Retrying synchronization...";
  }
}
