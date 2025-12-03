export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rewardPoints: number;
  status: 'pending' | 'completed';
  timestamp: number;
}

export interface Theme {
  id: string;
  name: string;
  price: number;
  primaryColor: string; // Hex for preview
  classes: {
    bg: string;
    bgSoft: string;
    text: string;
    border: string;
    button: string;
    accent: string;
  };
}

export interface UserState {
  credits: number;
  streak: number;
  inventory: string[]; // List of owned theme IDs
  activeThemeId: string;
  history: Mission[];
}

export interface FeedPost {
  id: string;
  username: string; // Anonymous names like "Brave Lion"
  missionTitle: string;
  timestamp: string;
  likes: number;
  message?: string;
}
