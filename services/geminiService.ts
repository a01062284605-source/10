import { Mission } from "../types";

// API 호출 대신 사용할 정적 미션 목록
const LOCAL_MISSIONS = [
  {
    title: "책상 정리하기",
    description: "책상 위에 어지러운 물건들을 5분 동안 정리하여 마음의 여유를 찾아보세요.",
    difficulty: "Easy",
    rewardPoints: 50
  },
  {
    title: "물 한 잔 마시기",
    description: "시원한 물 한 잔을 천천히 마시며 몸을 깨워보세요.",
    difficulty: "Easy",
    rewardPoints: 30
  },
  {
    title: "창문 열고 환기하기",
    description: "창문을 활짝 열고 신선한 공기를 1분간 들이마셔 보세요.",
    difficulty: "Easy",
    rewardPoints: 40
  },
  {
    title: "하늘 사진 찍기",
    description: "잠시 밖을 보거나 나가서 오늘의 하늘을 사진으로 남겨보세요.",
    difficulty: "Easy",
    rewardPoints: 50
  },
  {
    title: "좋아하는 노래 듣기",
    description: "가장 좋아하는 노래 한 곡을 온전히 집중해서 들어보세요.",
    difficulty: "Easy",
    rewardPoints: 30
  },
  {
    title: "5분 스트레칭",
    description: "굳어있는 목과 어깨를 천천히 돌리며 근육을 이완시켜주세요.",
    difficulty: "Medium",
    rewardPoints: 60
  },
  {
    title: "감사한 일 하나 적기",
    description: "오늘 하루 중 사소하지만 감사했던 일 하나를 메모장이나 노트에 적어보세요.",
    difficulty: "Medium",
    rewardPoints: 70
  },
  {
    title: "스마트폰 사진첩 정리",
    description: "필요 없는 스크린샷이나 흔들린 사진 5장을 지워보세요.",
    difficulty: "Easy",
    rewardPoints: 40
  },
  {
    title: "거울 보고 미소 짓기",
    description: "거울 속의 나를 보고 10초간 활짝 웃어보세요. 기분이 한결 나아질 거예요.",
    difficulty: "Medium",
    rewardPoints: 50
  },
  {
    title: "내일의 할 일 3가지 적기",
    description: "내일 꼭 하고 싶은 사소한 일 3가지를 미리 계획해보세요.",
    difficulty: "Hard",
    rewardPoints: 80
  }
];

export const generateMission = async (_userMood: string = "neutral"): Promise<Omit<Mission, 'id' | 'timestamp' | 'status'>> => {
  // Simulate network delay for realistic experience
  await new Promise(resolve => setTimeout(resolve, 800));

  // Select a random mission
  const randomIndex = Math.floor(Math.random() * LOCAL_MISSIONS.length);
  const mission = LOCAL_MISSIONS[randomIndex];

  return {
    title: mission.title,
    description: mission.description,
    difficulty: mission.difficulty as 'Easy' | 'Medium' | 'Hard',
    rewardPoints: mission.rewardPoints
  };
};