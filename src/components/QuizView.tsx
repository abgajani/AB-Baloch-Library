import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Question } from '../types';
import { 
  ArrowLeft, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  Award,
  AlertCircle,
  Share2,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizView: React.FC = () => {
  const { 
    activeQuiz, 
    language, 
    setActiveScreen, 
    recordQuizResult, 
    toggleBookmarkQuestion, 
    user 
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState<number>((activeQuiz?.durationMinutes || 5) * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [reviewMistakesOnly, setReviewMistakesOnly] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  if (!activeQuiz) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">No active quiz.</p>
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="mt-4 px-4 py-2 bg-[#0F9D75] text-white rounded-xl text-xs font-semibold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const currentQ: Question = activeQuiz.questions[currentIndex];
  const isLastQuestion = currentIndex === activeQuiz.questions.length - 1;
  const isBookmarked = user.bookmarkedQuestionIds.includes(currentQ.id);

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
    setIsAnswerSubmitted(true);
    setAnswers(prev => ({ ...prev, [currentIndex]: index }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setIsAnswerSubmitted(false);
    setSelectedOption(null);

    if (isLastQuestion) {
      handleSubmitQuiz();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleSubmitQuiz = () => {
    let finalScore = 0;
    const failedIds: string[] = [];

    activeQuiz.questions.forEach((q, idx) => {
      const studentAns = answers[idx];
      if (studentAns === q.correctAnswer) {
        finalScore++;
      } else {
        failedIds.push(q.id);
      }
    });

    setScore(finalScore);
    setMistakes(failedIds);
    setIsFinished(true);

    recordQuizResult(activeQuiz.id, finalScore, activeQuiz.questions.length, failedIds);

    const pct = (finalScore / activeQuiz.questions.length) * 100;
    if (pct >= 60) {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAnswers({});
    setTimeLeft(activeQuiz.durationMinutes * 60);
    setIsFinished(false);
    setScore(0);
    setMistakes([]);
    setReviewMistakesOnly(false);
  };

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // RESULT SCREEN
  if (isFinished) {
    const totalQ = activeQuiz.questions.length;
    const percentage = Math.round((score / totalQ) * 100);
    const xpGained = score * 10 + (percentage === 100 ? 20 : 5);

    return (
      <div className="max-w-2xl mx-auto space-y-6 pb-24 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl text-center">
          
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-tr from-[#0F9D75] to-[#12b385] text-white flex items-center justify-center shadow-lg shadow-[#0F9D75]/25">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white mb-1">
            {percentage >= 80 
              ? (language === 'ur' ? 'شاندار نتیجہ! ماشاء اللہ' : 'Outstanding Performance!') 
              : percentage >= 50 
              ? (language === 'ur' ? 'بہترین کوشش!' : 'Well Done!') 
              : (language === 'ur' ? 'مزید مشق کی ضرورت ہے' : 'Keep Practicing!')}
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            {language === 'ur' ? activeQuiz.titleUr : activeQuiz.titleEn}
          </p>

          {/* Score card grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800">
              <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
                {language === 'ur' ? 'درست جوابات' : 'Score'}
              </span>
              <div className="text-xl font-extrabold text-emerald-800 dark:text-emerald-200 mt-0.5">
                {score} / {totalQ}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800">
              <span className="text-xs text-purple-700 dark:text-purple-300 font-semibold">
                {language === 'ur' ? 'کامیابی کی شرح' : 'Accuracy'}
              </span>
              <div className="text-xl font-extrabold text-purple-800 dark:text-purple-200 mt-0.5">
                {percentage}%
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-800">
              <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold">
                {language === 'ur' ? 'حاصل شدہ ایک پی' : 'XP Earned'}
              </span>
              <div className="text-xl font-extrabold text-amber-800 dark:text-amber-200 mt-0.5">
                +{xpGained} XP
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleRetake}
              className="w-full sm:flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{language === 'ur' ? 'دوبارہ ٹیسٹ دیں' : 'Retake Quiz'}</span>
            </button>

            <button
              onClick={() => setActiveScreen('dashboard')}
              className="w-full sm:flex-1 py-3 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-semibold shadow-md shadow-[#0F9D75]/25 flex items-center justify-center gap-2"
            >
              <span>{language === 'ur' ? 'ڈیش بورڈ پر واپس جائیں' : 'Back to Dashboard'}</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {language === 'ur' ? 'سوالات اور تفصیلی جوابات کا جائزہ' : 'Question Breakdown & Explanations'}
            </h3>
            <span className="text-xs text-slate-400">
              {totalQ} {language === 'ur' ? 'سوالات' : 'items'}
            </span>
          </div>

          <div className="space-y-4">
            {activeQuiz.questions.map((q, idx) => {
              const studentChoice = answers[idx];
              const isCorrect = studentChoice === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className={`p-4 rounded-2xl border ${
                    isCorrect 
                      ? 'border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 dark:border-emerald-800/40' 
                      : 'border-rose-200 bg-rose-50/40 dark:bg-rose-950/20 dark:border-rose-800/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-bold text-slate-500">
                      Q{idx + 1}. {language === 'ur' ? q.questionUr : q.questionEn}
                    </span>
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </div>

                  <div className="text-xs space-y-1 mb-2">
                    <div className="text-slate-600 dark:text-slate-300">
                      <span className="font-medium text-slate-400">{language === 'ur' ? 'آپ کا انتخاب:' : 'Your Answer:'}</span>{' '}
                      {studentChoice !== undefined ? (
                        <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                          {language === 'ur' ? q.optionsUr[studentChoice] : q.optionsEn[studentChoice]}
                        </span>
                      ) : (
                        <span className="italic text-slate-400">Unanswered</span>
                      )}
                    </div>
                    {!isCorrect && (
                      <div className="text-emerald-700 dark:text-emerald-400 font-medium">
                        <span>{language === 'ur' ? 'درست جواب:' : 'Correct Answer:'}</span>{' '}
                        <span className="font-bold">
                          {language === 'ur' ? q.optionsUr[q.correctAnswer] : q.optionsEn[q.correctAnswer]}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    💡 <span className="font-semibold">{language === 'ur' ? 'وضاحت:' : 'Explanation:'}</span>{' '}
                    {language === 'ur' ? q.explanationUr : q.explanationEn}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE QUIZ INTERFACE
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      {/* Top Header with Progress and Timer */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-4">
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
          title="Quit Quiz"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 max-w-xs">
          <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
            <span>Question {currentIndex + 1} of {activeQuiz.questions.length}</span>
            <span>{Math.round(((currentIndex + 1) / activeQuiz.questions.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div 
              className="h-full bg-[#0F9D75] transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeQuiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 ${
          timeLeft <= 60 
            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse' 
            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
        }`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-md space-y-6">
        <div className="flex items-start justify-between gap-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F9D75] px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40">
            {language === 'ur' ? 'انتخابی سوال' : 'Multiple Choice'}
          </span>

          <button
            onClick={() => toggleBookmarkQuestion(currentQ.id)}
            className={`p-1.5 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-amber-50 text-amber-600 border-amber-300'
                : 'text-slate-400 hover:text-slate-600 border-transparent'
            }`}
            title="Bookmark question for review"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        <h3 className={`font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-relaxed ${
          language === 'ur' ? 'font-urdu text-right text-xl leading-[2.2]' : ''
        }`}>
          {language === 'ur' ? currentQ.questionUr : currentQ.questionEn}
        </h3>

        {/* 4 Options */}
        <div className="space-y-3">
          {(language === 'ur' ? currentQ.optionsUr : currentQ.optionsEn).map((opt, optIdx) => {
            const isSelected = selectedOption === optIdx;
            const isCorrect = optIdx === currentQ.correctAnswer;
            
            let btnStyle = 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-800 dark:text-slate-200';
            
            if (isAnswerSubmitted) {
              if (isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-200 font-bold';
              } else {
                btnStyle = 'border-slate-200 dark:border-slate-700 opacity-50';
              }
            } else if (isSelected) {
              btnStyle = 'border-[#0F9D75] bg-emerald-50 text-[#0F9D75]';
            }

            return (
              <button
                key={optIdx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                    isSelected ? 'bg-current text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className={`text-xs sm:text-sm ${language === 'ur' ? 'font-urdu' : ''}`}>{opt}</span>
                </div>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Explanation Drawer */}
        {showExplanation && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'ur' ? 'تفصیلی وضاحت و رہنمائی:' : 'Explanation:'}</span>
            </div>
            <p className={`text-xs text-slate-600 dark:text-slate-300 leading-relaxed ${
              language === 'ur' ? 'font-urdu text-right text-sm leading-[2.1]' : ''
            }`}>
              {language === 'ur' ? currentQ.explanationUr : currentQ.explanationEn}
            </p>
          </div>
        )}

        {/* Next Question / Finish Button */}
        <div className="pt-2 flex justify-end">
          <button
            disabled={!isAnswerSubmitted}
            onClick={handleNext}
            className="px-6 py-3 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-bold shadow-md shadow-[#0F9D75]/25 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2"
          >
            <span>{isLastQuestion ? (language === 'ur' ? 'کوئز مکمل کریں' : 'Finish Quiz') : (language === 'ur' ? 'اگلا سوال' : 'Next Question')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
