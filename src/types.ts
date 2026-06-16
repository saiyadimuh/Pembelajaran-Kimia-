export interface Lesson {
  id: string;
  babId: string;
  babTitle: string;
  title: string;
  description: string;
  content: string; // Markdown text containing core materials
  duration: string; // e.g. "10 Menit"
  badge: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  explanations: string[]; // Explanation for each option to provide thorough learning
}

export interface Quiz {
  babId: string;
  babTitle: string;
  questions: QuizQuestion[];
}

export interface UserProgress {
  completedLessons: string[]; // List of completed lesson ids
  quizScores: { [babId: string]: number }; // Score for each bab
  simulatedElements: string[]; // List of element symbols modeled by the user
}

export interface ElementPreset {
  name: string;
  symbol: string;
  protons: number;
  neutrons: number;
  electrons: number;
  group: string;
  period: number;
  category: string;
  description: string;
  funFact: string;
}
