import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Flashcard } from '../types';
import { 
  ArrowLeft, 
  RotateCw, 
  Check, 
  X, 
  Sparkles, 
  Layers, 
  Shuffle, 
  ChevronRight, 
  ChevronLeft 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlashcardsViewProps {
  cards: Flashcard[];
  title: string;
  onBack: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ cards, title, onBack }) => {
  const { language, addXP } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [learningIds, setLearningIds] = useState<string[]>([]);

  if (cards.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-500">No flashcards available in this deck yet.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-[#0F9D75] text-white rounded-xl text-xs font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const isLast = currentIndex === cards.length - 1;

  const handleMarkMastered = () => {
    setMasteredIds(prev => Array.from(new Set([...prev, currentCard.id])));
    handleNextCard(true);
  };

  const handleMarkLearning = () => {
    setLearningIds(prev => Array.from(new Set([...prev, currentCard.id])));
    handleNextCard(false);
  };

  const handleNextCard = (awarded: boolean) => {
    if (awarded) addXP(10);
    setIsFlipped(false);
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
    } else {
      confetti({ particleCount: 70, spread: 60 });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds([]);
    setLearningIds([]);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ur' ? 'واپس' : 'Back'}</span>
        </button>

        <span className="text-xs font-bold text-slate-500">
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div 
          className="h-full bg-purple-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* 3D Flashcard */}
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative min-h-[320px] rounded-3xl p-8 cursor-pointer select-none border-2 border-purple-200 dark:border-purple-800/60 bg-gradient-to-br from-white to-purple-50/40 dark:from-slate-800 dark:to-slate-800/90 shadow-xl flex flex-col justify-between items-center text-center transition-all transform hover:scale-[1.01]"
      >
        <div className="w-full flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Layers className="w-3.5 h-3.5" />
            {currentCard.category}
          </span>
          <span className="text-slate-400 text-[11px] flex items-center gap-1">
            <RotateCw className="w-3 h-3" />
            {language === 'ur' ? 'الٹانے کے لیے کلک کریں' : 'Tap to Flip'}
          </span>
        </div>

        {/* Card Content */}
        <div className="my-auto py-6">
          {!isFlipped ? (
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Question / Term</span>
              <h3 className={`text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white leading-snug ${
                language === 'ur' ? 'font-urdu text-2xl leading-[2.2]' : ''
              }`}>
                {language === 'ur' ? currentCard.frontUr : currentCard.frontEn}
              </h3>
            </div>
          ) : (
            <div className="space-y-3 animate-in fade-in duration-200">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-600">Definition / Answer</span>
              <p className={`text-base sm:text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed ${
                language === 'ur' ? 'font-urdu text-xl leading-[2.2]' : ''
              }`}>
                {language === 'ur' ? currentCard.backUr : currentCard.backEn}
              </p>
            </div>
          )}
        </div>

        <div className="text-[11px] text-slate-400">
          {isFlipped ? 'Answer revealed' : 'Think of the answer, then flip'}
        </div>
      </div>

      {/* Action Buttons: Still Learning vs Mastered */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleMarkLearning}
          className="flex-1 py-3 px-4 rounded-2xl border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>{language === 'ur' ? 'مزید مشق درکار ہے' : 'Still Learning'}</span>
        </button>

        <button
          onClick={handleMarkMastered}
          className="flex-1 py-3 px-4 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#0F9D75]/25 transition-all"
        >
          <Check className="w-4 h-4" />
          <span>{language === 'ur' ? 'یاد ہو گیا (+10 XP)' : 'Mastered (+10 XP)'}</span>
        </button>
      </div>

      {/* Completion Summary if finished */}
      {isLast && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-2">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {language === 'ur' 
              ? `آپ نے تمام کارڈز مکمل کر لیے ہیں۔ یاد شدہ: ${masteredIds.length}` 
              : `Deck finished! Mastered: ${masteredIds.length} / ${cards.length}`}
          </p>
          <button
            onClick={handleRestart}
            className="text-xs font-bold text-[#0F9D75] hover:underline"
          >
            {language === 'ur' ? 'دوبارہ شروع کریں' : 'Restart Deck'}
          </button>
        </div>
      )}
    </div>
  );
};
