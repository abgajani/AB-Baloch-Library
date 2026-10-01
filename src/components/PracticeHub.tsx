import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectId, Question, Flashcard } from '../types';
import { ALL_QUIZZES, CHAPTERS_DATA } from '../data/mockData';
import { FlashcardsView } from './FlashcardsView';
import { 
  Flame, 
  Clock, 
  HelpCircle, 
  Layers, 
  AlertCircle, 
  Bookmark, 
  Play, 
  ChevronRight, 
  Filter, 
  CheckCircle2,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export const PracticeHub: React.FC = () => {
  const { 
    language, 
    subjectsList, 
    user, 
    setActiveScreen, 
    setActiveQuiz, 
    toggleBookmarkQuestion 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'daily' | 'timed' | 'mistakes' | 'flashcards'>('daily');

  // Timed test generator state
  const [selectedSubId, setSelectedSubId] = useState<SubjectId>('islamiyat');
  const [qCount, setQCount] = useState<number>(5);
  const [durationMins, setDurationMins] = useState<number>(5);

  // Active flashcard deck
  const [activeDeck, setActiveDeck] = useState<Flashcard[] | null>(null);

  // All questions flattened for mistake and bookmark lookup
  const allQuestions: Question[] = ALL_QUIZZES.flatMap(q => q.questions);
  const mistakeQuestions = allQuestions.filter(q => user.mistakeQuestionIds.includes(q.id));
  const bookmarkedQuestions = allQuestions.filter(q => user.bookmarkedQuestionIds.includes(q.id));

  // Collect flashcards from all chapters
  const allFlashcards: Flashcard[] = Object.values(CHAPTERS_DATA).flatMap(chList => 
    chList.flatMap(ch => ch.flashcards)
  );

  const handleStartCustomTest = () => {
    const relevantQuiz = ALL_QUIZZES.find(q => q.subjectId === selectedSubId) || ALL_QUIZZES[0];
    
    // Create a tailored quiz instance
    const customQuiz = {
      ...relevantQuiz,
      id: `custom-${Date.now()}`,
      titleEn: `Custom Mock Test: ${selectedSubId.toUpperCase()} (${qCount} Qs)`,
      titleUr: `خصوصی آزمائشی ٹیسٹ: ${qCount} سوالات`,
      durationMinutes: durationMins,
      questions: relevantQuiz.questions.slice(0, qCount)
    };

    setActiveQuiz(customQuiz);
    setActiveScreen('quiz');
  };

  if (activeDeck) {
    return (
      <FlashcardsView
        cards={activeDeck}
        title="Subject Flashcards"
        onBack={() => setActiveDeck(null)}
      />
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
          {language === 'ur' ? 'مشق، ٹیسٹ اور دہرائی کا مرکز' : 'Practice & Exam Preparation'}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {language === 'ur' 
            ? 'روزانہ کا چیلنج، وقتی ٹیسٹ، فلیش کارڈز اور غلطیوں کا ازالہ۔' 
            : 'Timed tests, mistake review notebook, and flashcard drills.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'daily'
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>{language === 'ur' ? 'روزانہ چیلنج' : 'Daily Challenge'}</span>
        </button>

        <button
          onClick={() => setActiveTab('timed')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'timed'
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{language === 'ur' ? 'وقتی ماک ٹیسٹ' : 'Timed Mock Test'}</span>
        </button>

        <button
          onClick={() => setActiveTab('mistakes')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'mistakes'
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <span>{language === 'ur' ? 'غلطیوں کا ازالہ' : 'Mistake Notebook'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 font-bold">
            {mistakeQuestions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'flashcards'
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4 text-purple-600" />
          <span>{language === 'ur' ? 'فلیش کارڈ ڈیک' : 'Flashcards'}</span>
        </button>
      </div>

      {/* TAB 1: DAILY CHALLENGE */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-500/15 via-white to-emerald-500/10 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-3xl p-6 sm:p-8 border border-amber-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>{language === 'ur' ? 'آج کا اہم ٹیسٹ' : 'Featured Daily Quiz'}</span>
            </div>

            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
              {language === 'ur' ? 'جنرل نالج و سائنس: سمارٹ کوئز' : 'General Knowledge & Science Daily Quiz'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-lg leading-relaxed">
              {language === 'ur'
                ? '۵ دلچسپ سوالات حل کریں، ۵۰ ایک پی حاصل کریں اور اپنی اسٹریک شیلڈ کو محفوظ رکھیں۔'
                : 'Solve 5 quick questions on Pakistani geography, science fundamentals, and history.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300 mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> 5 Minutes
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-[#0F9D75]" /> 5 Questions
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" /> +50 XP Reward
              </span>
            </div>

            <button
              onClick={() => {
                setActiveQuiz(ALL_QUIZZES[0]);
                setActiveScreen('quiz');
              }}
              className="py-3 px-6 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-semibold shadow-lg shadow-[#0F9D75]/25 flex items-center gap-2 transition-all"
            >
              <span>{language === 'ur' ? 'ابھی ٹیسٹ شروع کریں' : 'Start Today\'s Quiz'}</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: TIMED MOCK TEST GENERATOR */}
      {activeTab === 'timed' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              {language === 'ur' ? 'اپنی مرضی کا ٹیسٹ تیار کریں' : 'Custom Mock Test Generator'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ur' ? 'مضمون، سوالات کی تعداد اور وقت منتخب کریں۔' : 'Select subject, question count, and timer to simulate real exam pressure.'}
            </p>
          </div>

          {/* Subject Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'ur' ? 'مضمون چنیں' : 'Choose Subject'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {subjectsList.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubId(s.id)}
                  className={`p-3 rounded-xl border text-xs font-semibold transition-all text-left flex items-center justify-between ${
                    selectedSubId === s.id
                      ? 'border-[#0F9D75] bg-emerald-50 dark:bg-emerald-950/40 text-[#0F9D75]'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{language === 'ur' ? s.nameUr : s.nameEn}</span>
                  {selectedSubId === s.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#0F9D75]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'ur' ? 'سوالات کی تعداد' : 'Number of Questions'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 10].map(count => (
                <button
                  key={count}
                  onClick={() => setQCount(count)}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    qCount === count
                      ? 'border-[#0F9D75] bg-emerald-50 text-[#0F9D75]'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {count} {language === 'ur' ? 'سوالات' : 'Questions'}
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'ur' ? 'وقت کی حد' : 'Time Limit'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map(mins => (
                <button
                  key={mins}
                  onClick={() => setDurationMins(mins)}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    durationMins === mins
                      ? 'border-[#0F9D75] bg-emerald-50 text-[#0F9D75]'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {mins} {language === 'ur' ? 'منٹ' : 'Minutes'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStartCustomTest}
            className="w-full py-3.5 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-semibold shadow-md shadow-[#0F9D75]/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>{language === 'ur' ? 'ٹیسٹ شروع کریں' : 'Launch Mock Test'}</span>
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      )}

      {/* TAB 3: MISTAKE REVIEW NOTEBOOK */}
      {activeTab === 'mistakes' && (
        <div className="space-y-4">
          {mistakeQuestions.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
              <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-500 mb-2" />
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                {language === 'ur' ? 'ماشاء اللہ! کوئی غلطی درج نہیں ہے' : 'Zero Active Mistakes!'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                {language === 'ur'
                  ? 'جب بھی آپ کسی کوئز میں غلط جواب دیں گے، وہ سوال خود بخود یہاں دہرائی کے لیے آ جائے گا۔'
                  : 'Whenever you get a question wrong in any quiz, it appears here for targeted drill.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {mistakeQuestions.map((q, idx) => (
                <div 
                  key={q.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-rose-200/80 dark:border-rose-900/40 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {idx + 1}. {language === 'ur' ? q.questionUr : q.questionEn}
                    </span>
                    <button
                      onClick={() => toggleBookmarkQuestion(q.id)}
                      className="text-slate-400 hover:text-amber-500"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
                    ✓ {language === 'ur' ? 'درست جواب:' : 'Correct:'}{' '}
                    {language === 'ur' ? q.optionsUr[q.correctAnswer] : q.optionsEn[q.correctAnswer]}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[11px] text-slate-600 dark:text-slate-400">
                    💡 {language === 'ur' ? q.explanationUr : q.explanationEn}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: FLASHCARD DECKS */}
      {activeTab === 'flashcards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setActiveDeck(allFlashcards)}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {language === 'ur' ? 'اسلامیات و عقائد فلیش کارڈز' : 'Islamiyat & Faith Fundamentals'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'ur'
                  ? 'توحید، ختم نبوت، اور ارکانِ اسلام کی اہم تعریفات۔'
                  : 'Key definitions of Tawheed, Khatam an-Nabiyyin, and essential Islamic terms.'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-purple-600 font-semibold">
              <span>{allFlashcards.length} Cards in Deck</span>
              <span>Start Review →</span>
            </div>
          </div>

          <div 
            onClick={() => setActiveDeck(allFlashcards)}
            className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                {language === 'ur' ? 'ریاضی و مطالعہ پاکستان تاریخ' : 'Math Formulas & Historical Dates'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {language === 'ur'
                  ? 'قالب کے قوانین، تاریخی خطبات اور اہم سنین کا جائزہ۔'
                  : 'Matrix operations, 1940 resolution dates, and quick formula drills.'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-blue-600 font-semibold">
              <span>Quick Flashcards</span>
              <span>Start Review →</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
