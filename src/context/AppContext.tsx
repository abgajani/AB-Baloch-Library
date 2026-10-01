import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  ClassLevel, 
  SubjectId, 
  UserProfile, 
  Subject, 
  Chapter, 
  Lesson, 
  Quiz, 
  Flashcard,
  PastPaper 
} from '../types';
import { SUBJECTS, CHAPTERS_DATA, ALL_QUIZZES, PAST_PAPERS, BADGES_LIST } from '../data/mockData';
import { offlineStorage, CachedPdfNote } from '../utils/offlineStorage';

export type ScreenType = 
  | 'dashboard' 
  | 'subjects' 
  | 'subject_detail' 
  | 'lesson' 
  | 'quiz' 
  | 'practice' 
  | 'progress' 
  | 'library' 
  | 'islamic' 
  | 'admin';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  
  user: UserProfile;
  updateUser: (fields: Partial<UserProfile>) => void;
  addXP: (amount: number) => void;
  upgradeToPremium: () => void;
  
  activeScreen: ScreenType;
  setActiveScreen: (screen: ScreenType) => void;
  
  selectedSubjectId: SubjectId;
  setSelectedSubjectId: (id: SubjectId) => void;
  selectedSubject: Subject;
  
  selectedChapter: Chapter | null;
  setSelectedChapter: (chapter: Chapter | null) => void;
  
  selectedLesson: Lesson | null;
  setSelectedLesson: (lesson: Lesson | null) => void;
  
  activeQuiz: Quiz | null;
  setActiveQuiz: (quiz: Quiz | null) => void;

  activePdfPaper: PastPaper | null;
  setActivePdfPaper: (paper: PastPaper | null) => void;
  
  showOnboarding: boolean;
  setShowOnboarding: (val: boolean) => void;
  
  showPremiumModal: boolean;
  setShowPremiumModal: (val: boolean) => void;
  
  showSettingsModal: boolean;
  setShowSettingsModal: (val: boolean) => void;

  // Study actions
  markLessonComplete: (lessonId: string) => void;
  toggleBookmarkLesson: (lessonId: string) => void;
  toggleBookmarkQuestion: (questionId: string) => void;
  toggleDownloadItem: (itemId: string, lessonObj?: Lesson) => void;
  recordQuizResult: (quizId: string, score: number, total: number, mistakes: string[]) => void;
  
  // Dynamic admin data
  subjectsList: Subject[];
  chaptersMap: Record<string, Chapter[]>;
  quizzesList: Quiz[];
  addNewLesson: (newLesson: Lesson) => void;
  addNewQuiz: (newQuiz: Quiz) => void;
}

const initialProfile: UserProfile = {
  name: 'Bilal Ahmed',
  email: 'bilal.ahmed@student.pk',
  phone: '+92 300 1234567',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
  classLevel: 'Class 9 (Matric)',
  favoriteSubjects: ['islamiyat', 'math', 'pakstudies', 'computer'],
  language: 'en',
  streakDays: 7,
  streakShields: 2,
  xp: 1850,
  level: 4,
  dailyGoalMinutes: 20,
  todayStudiedMinutes: 14,
  isPremium: false,
  completedLessonIds: ['isl-les-1', 'pak-les-1'],
  bookmarkedQuestionIds: ['q-isl-1', 'dq-2'],
  bookmarkedLessonIds: ['isl-les-1'],
  downloadedItemIds: ['isl-ch1', 'pak-ch1'],
  solvedQuizResults: [
    { quizId: 'daily-quiz-today', score: 4, total: 5, date: '2026-09-30', percentage: 80 }
  ],
  mistakeQuestionIds: ['dq-3'],
  joinedDate: 'September 2026'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [user, setUser] = useState<UserProfile>(initialProfile);
  
  const [activeScreen, setActiveScreen] = useState<ScreenType>('dashboard');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('islamiyat');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [activePdfPaper, setActivePdfPaper] = useState<PastPaper | null>(null);

  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [showPremiumModal, setShowPremiumModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  const [chaptersMap, setChaptersMap] = useState<Record<string, Chapter[]>>(CHAPTERS_DATA);
  const [quizzesList, setQuizzesList] = useState<Quiz[]>(ALL_QUIZZES);

  // Seed default offline cached materials into localStorage if empty
  useEffect(() => {
    try {
      const cachedLessons = offlineStorage.getAllLessons();
      if (Object.keys(cachedLessons).length === 0) {
        // Seed Islamiyat lesson 1 & Pak Studies lesson 1
        const isl1 = CHAPTERS_DATA['islamiyat']?.[0]?.lessons?.[0];
        const pak1 = CHAPTERS_DATA['pakstudies']?.[0]?.lessons?.[0];
        if (isl1) offlineStorage.saveLesson(isl1);
        if (pak1) offlineStorage.saveLesson(pak1);
      }

      const cachedNotes = offlineStorage.getAllPdfNotes();
      if (Object.keys(cachedNotes).length === 0 && PAST_PAPERS.length > 0) {
        // Seed first solved past paper as cached PDF note
        const firstPaper = PAST_PAPERS[0];
        offlineStorage.savePdfNote({
          id: firstPaper.id,
          titleEn: firstPaper.titleEn,
          titleUr: firstPaper.titleUr,
          subjectId: firstPaper.subjectId,
          board: firstPaper.board,
          year: firstPaper.year,
          totalMarks: firstPaper.totalMarks,
          downloadedAt: '2026-10-01',
          fileSizeKb: 345,
          content: {
            sectionA: {
              titleEn: 'Section A (Objective MCQs)',
              titleUr: 'حصہ اول (معروضی سوالات)',
              questions: ['1. Heart of the Quran: Surah Yasin (Solved)', '2. Second Pillar of Islam: Salah']
            },
            sectionB: {
              titleEn: 'Section B (Short Answers)',
              titleUr: 'حصہ دوم (مختصر جوابات)',
              questions: ['Q1: Importance of honesty in business', 'Q2: Categories of Tawheed']
            },
            detailedSolutionsEn: 'Comprehensive solved model answers verified by FBISE curriculum examiners.',
            detailedSolutionsUr: 'فیڈرل بورڈ کے نصاب کے مطابق حل شدہ جامع ماڈل جوابات۔',
            formulasOrKeyConcepts: ['Clear headings', 'Accurate Hadith citations']
          }
        });
      }
    } catch (e) {
      console.warn('Initial offline seeding skipped:', e);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.setAttribute('dir', lang === 'ur' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ur' : 'en';
    setLanguage(nextLang);
  };

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const updateUser = (fields: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...fields }));
  };

  const addXP = (amount: number) => {
    setUser(prev => {
      const newXp = prev.xp + amount;
      const calculatedLevel = Math.floor(newXp / 500) + 1;
      return {
        ...prev,
        xp: newXp,
        level: Math.max(prev.level, calculatedLevel)
      };
    });
  };

  const upgradeToPremium = () => {
    setUser(prev => ({ ...prev, isPremium: true }));
    setShowPremiumModal(false);
  };

  const markLessonComplete = (lessonId: string) => {
    setUser(prev => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
        xp: prev.xp + 25,
        todayStudiedMinutes: prev.todayStudiedMinutes + 5
      };
    });
  };

  const toggleBookmarkLesson = (lessonId: string) => {
    setUser(prev => {
      const exists = prev.bookmarkedLessonIds.includes(lessonId);
      return {
        ...prev,
        bookmarkedLessonIds: exists 
          ? prev.bookmarkedLessonIds.filter(id => id !== lessonId)
          : [...prev.bookmarkedLessonIds, lessonId]
      };
    });
  };

  const toggleBookmarkQuestion = (questionId: string) => {
    setUser(prev => {
      const exists = prev.bookmarkedQuestionIds.includes(questionId);
      return {
        ...prev,
        bookmarkedQuestionIds: exists
          ? prev.bookmarkedQuestionIds.filter(id => id !== questionId)
          : [...prev.bookmarkedQuestionIds, questionId]
      };
    });
  };

  const toggleDownloadItem = (itemId: string, lessonObj?: Lesson) => {
    setUser(prev => {
      const exists = prev.downloadedItemIds.includes(itemId);
      if (exists) {
        offlineStorage.removeLesson(itemId);
        offlineStorage.removePdfNote(itemId);
        return {
          ...prev,
          downloadedItemIds: prev.downloadedItemIds.filter(id => id !== itemId)
        };
      } else {
        if (lessonObj) {
          offlineStorage.saveLesson(lessonObj);
        } else {
          // Find lesson by itemId if available
          const allLessons = Object.values(chaptersMap).flatMap(list => list.flatMap(c => c.lessons));
          const found = allLessons.find(l => l.id === itemId);
          if (found) offlineStorage.saveLesson(found);
        }
        return {
          ...prev,
          downloadedItemIds: [...prev.downloadedItemIds, itemId]
        };
      }
    });
  };

  const recordQuizResult = (quizId: string, score: number, total: number, mistakes: string[]) => {
    const percentage = Math.round((score / total) * 100);
    const xpGained = score * 10 + (percentage === 100 ? 20 : 5);
    
    setUser(prev => {
      const remainingMistakes = prev.mistakeQuestionIds.filter(id => !mistakes.includes(id));
      const updatedMistakes = Array.from(new Set([...remainingMistakes, ...mistakes]));
      
      return {
        ...prev,
        xp: prev.xp + xpGained,
        todayStudiedMinutes: prev.todayStudiedMinutes + 10,
        mistakeQuestionIds: updatedMistakes,
        solvedQuizResults: [
          ...prev.solvedQuizResults.filter(r => r.quizId !== quizId),
          {
            quizId,
            score,
            total,
            date: new Date().toISOString().split('T')[0],
            percentage
          }
        ]
      };
    });
  };

  const addNewLesson = (newLesson: Lesson) => {
    setChaptersMap(prev => {
      const currentList = prev[newLesson.subjectId] || [];
      const updated = currentList.map(ch => {
        if (ch.id === newLesson.chapterId) {
          return {
            ...ch,
            lessons: [...ch.lessons, newLesson]
          };
        }
        return ch;
      });
      return { ...prev, [newLesson.subjectId]: updated };
    });
  };

  const addNewQuiz = (newQuiz: Quiz) => {
    setQuizzesList(prev => [newQuiz, ...prev]);
  };

  const selectedSubject = SUBJECTS.find(s => s.id === selectedSubjectId) || SUBJECTS[0];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isDark,
        toggleTheme,
        fontSize,
        setFontSize,
        user,
        updateUser,
        addXP,
        upgradeToPremium,
        activeScreen,
        setActiveScreen,
        selectedSubjectId,
        setSelectedSubjectId,
        selectedSubject,
        selectedChapter,
        setSelectedChapter,
        selectedLesson,
        setSelectedLesson,
        activeQuiz,
        setActiveQuiz,
        activePdfPaper,
        setActivePdfPaper,
        showOnboarding,
        setShowOnboarding,
        showPremiumModal,
        setShowPremiumModal,
        showSettingsModal,
        setShowSettingsModal,
        markLessonComplete,
        toggleBookmarkLesson,
        toggleBookmarkQuestion,
        toggleDownloadItem,
        recordQuizResult,
        subjectsList: SUBJECTS,
        chaptersMap,
        quizzesList,
        addNewLesson,
        addNewQuiz
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
