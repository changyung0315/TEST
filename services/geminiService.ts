
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askAITutor = async (question: string, userAnswer: string) => {
  const prompt = `
    你是一位親切的國小三年級數學老師。
    學生正在練習這道題目： "${question}"。
    學生的回答是： "${userAnswer}"。
    
    請以 8-9 歲小孩能聽懂的語言：
    1. 給予鼓勵。
    2. 如果答錯了，請不要直接給答案，而是引導他思考步驟。
    3. 如果答對了，請稱讚他並解釋為什麼正確。
    4. 語氣要生動、充滿耐心。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "老師現在有點累，休息一下再問我好嗎？";
  }
};

export const generateQuizByTopic = async (topic: string) => {
  const prompt = `
    請針對國小三年級程度，生成 3 道關於「${topic}」的數學題目。
    請包含：題目內容、標準答案、以及給學生的簡單詳解。
    必須符合翰林版或康軒版教材程度。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              answer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["id", "text", "answer", "explanation"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Generation Error:", error);
    return null;
  }
};
