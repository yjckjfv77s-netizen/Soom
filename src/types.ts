export type MoodType = 'Calm' | 'Joy' | 'Reflective' | 'Mindful' | 'Tired';

export interface MoodRecord {
  id: string;
  date: string; // YYYY-MM-DD
  mood: MoodType;
  note?: string;
  score: number; // 1-10 level of that mood
}

export interface Journal {
  id: string;
  date: string;
  content: string;
  treeLevel: number;
}

export interface Comment {
  id: string;
  author: string;
  avatarUrl?: string;
  content: string;
  date: string;
}

export interface LoungePost {
  id: string;
  author: string;
  role?: string;
  avatarUrl: string;
  content: string;
  category: '전체' | '스트레칭' | '명상' | '취미' | 'ASMR' | '기타';
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  date: string;
  isLikedByUser?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  imageUrl: string;
  rating: number;
  isFavorite?: boolean;
}

export interface StretchingStep {
  title: string;
  subtitle: string;
  description: string;
  duration: number; // in seconds
  proTip: string;
}

export interface Soundscape {
  id: string;
  name: string;
  koreanName: string;
  imageUrl: string;
  description: string;
  audioUrl?: string; // We can use Web Audio API synthesis or a safe placeholder
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  category: 'physical' | 'mental' | 'stress';
  options: {
    text: string;
    score: number;
  }[];
}
