export type Language = 'en' | 'ur';

export type ClassLevel = 'Class 8' | 'Class 9 (Matric)' | 'Class 10 (Matric)' | 'Class 11 (FSc-I)' | 'Class 12 (FSc-II)' | 'O/A Levels' | 'MDCAT / ECAT';

export type SubjectId = 'gk' | 'islamiyat' | 'urdu' | 'english' | 'math' | 'pakstudies' | 'computer';

export interface Subject {
  id: SubjectId;
  nameEn: string;
  nameUr: string;
  descriptionEn: string;
  descriptionUr: string;
  color: string;
  accentBg: string;
  iconName: string;
  totalChapters: number;
  totalLessons: number;
  totalQuizzes: number;
}

export interface Question {
  id: string;
  questionEn: string;
  questionUr: string;
  optionsEn: string[];
  optionsUr: string[];
  correctAnswer: number; // 0-indexed
  explanationEn: string;
  explanationUr: string;
}

export interface Quiz {
  id: string;
  subjectId: SubjectId;
  chapterId?: string;
  titleEn: string;
  titleUr: string;
  durationMinutes: number;
  questions: Question[];
  xpReward: number;
  isDailyQuiz?: boolean;
}

export interface Flashcard {
  id: string;
  frontEn: string;
  frontUr: string;
  backEn: string;
  backUr: string;
  category: string;
}

export interface PastPaper {
  id: string;
  subjectId: SubjectId;
  board: string; // e.g. Federal Board, Lahore Board, Karachi Board
  year: number;
  titleEn: string;
  titleUr: string;
  solved: boolean;
  totalMarks: number;
  questionsCount: number;
  downloadUrl?: string;
}

export interface Lesson {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  titleEn: string;
  titleUr: string;
  durationEn: string;
  durationUr: string;
  readTimeMin: number;
  audioDurationSec?: number;
  keyPointsEn: string[];
  keyPointsUr: string[];
  contentEn: string;
  contentUr: string;
  summaryEn: string;
  summaryUr: string;
  videoUrl?: string;
  quizId?: string;
}

export interface Chapter {
  id: string;
  subjectId: SubjectId;
  number: number;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  lessons: Lesson[];
  quizzes: Quiz[];
  flashcards: Flashcard[];
}

export interface DuaItem {
  id: string;
  titleEn: string;
  titleUr: string;
  arabicText: string;
  transliteration: string;
  translationEn: string;
  translationUr: string;
  benefitEn: string;
  benefitUr: string;
  reference: string;
  audioUrl?: string;
}

export interface QuranSurah {
  id: string;
  surahNumber: number;
  nameArabic: string;
  nameEn: string;
  nameUr: string;
  versesCount: number;
  revelationType: 'Makki' | 'Madani';
  verses: {
    number: number;
    arabic: string;
    transliteration: string;
    en: string;
    ur: string;
  }[];
}

export interface SeerahStory {
  id: string;
  titleEn: string;
  titleUr: string;
  eraEn: string;
  eraUr: string;
  contentEn: string;
  contentUr: string;
  lessonLearnedEn: string;
  lessonLearnedUr: string;
  audioDurationMin: number;
}

export interface Badge {
  id: string;
  titleEn: string;
  titleUr: string;
  descriptionEn: string;
  descriptionUr: string;
  icon: string;
  color: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  nameUr: string;
  avatar: string;
  xp: number;
  streak: number;
  badge: string;
  city: string;
  isCurrentUser?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  classLevel: ClassLevel;
  favoriteSubjects: SubjectId[];
  language: Language;
  streakDays: number;
  streakShields: number;
  xp: number;
  level: number;
  dailyGoalMinutes: number;
  todayStudiedMinutes: number;
  isPremium: boolean;
  completedLessonIds: string[];
  bookmarkedQuestionIds: string[];
  bookmarkedLessonIds: string[];
  downloadedItemIds: string[];
  solvedQuizResults: {
    quizId: string;
    score: number;
    total: number;
    date: string;
    percentage: number;
  }[];
  mistakeQuestionIds: string[];
  joinedDate: string;
}
