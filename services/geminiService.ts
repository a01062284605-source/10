import { GoogleGenAI, Type } from "@google/genai";
import { Mission } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMission = async (userMood: string = "neutral"): Promise<Omit<Mission, 'id' | 'timestamp' | 'status'>> => {
  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      사회적 불안감을 느끼거나 무기력할 수 있는 사용자를 위해 "아주 작은 미션(Micro-mission)"을 하나 생성해주세요.
      현재 사용자의 기분 상태: ${userMood}.
      
      미션 생성 조건:
      1. 결과물은 반드시 **한국어**로 작성해주세요.
      2. 매우 구체적이고 실천 가능해야 합니다.
      3. 15분 이내로 완료할 수 있어야 합니다.
      4. 자기 관리, 소소한 사회적 상호작용, 또는 주변 정리정돈에 초점을 맞추세요.
      
      예시: "책상 한구석 정리하기", "친구에게 안부 문자 하나 보내기", "창밖을 보며 물 한 잔 마시기".
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
            rewardPoints: { type: Type.INTEGER },
          },
          required: ["title", "description", "difficulty", "rewardPoints"],
        },
      },
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data;
    }
    throw new Error("No data returned");

  } catch (error) {
    console.error("Gemini mission generation failed:", error);
    // Return a safe fallback directly if API fails
    return {
      title: "깊은 숨 들이마시기",
      description: "눈을 감고 천천히 5번 깊게 숨을 들이마시며 마음을 차분하게 만들어보세요.",
      difficulty: "Easy",
      rewardPoints: 30
    };
  }
};