import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Bookmark, 
  CheckCircle, 
  Play, 
  Pause, 
  Volume2, 
  RotateCcw, 
  Check, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Share2, 
  Type, 
  Download, 
  ChevronRight,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LessonView: React.FC = () => {
  const { 
    selectedLesson, 
    selectedChapter, 
    selectedSubject, 
    language, 
    user, 
    setActiveScreen, 
    markLessonComplete, 
    toggleBookmarkLesson,
    toggleDownloadItem,
    fontSize,
    setFontSize,
    setActiveQuiz,
    quizzesList
  } = useApp();

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'content' | 'notes' | 'summary'>('content');
  const [studentNote, setStudentNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  // Audio simulation timer
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 2;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  if (!selectedLesson) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">No lesson selected.</p>
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="mt-4 px-4 py-2 bg-[#0F9D75] text-white rounded-xl text-xs font-semibold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isCompleted = user.completedLessonIds.includes(selectedLesson.id);
  const isBookmarked = user.bookmarkedLessonIds.includes(selectedLesson.id);
  const isDownloaded = user.downloadedItemIds.includes(selectedLesson.id);

  const handleComplete = () => {
    markLessonComplete(selectedLesson.id);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSaveNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  const handleStartAttachedQuiz = () => {
    const attachedQuiz = quizzesList.find(q => q.id === selectedLesson.quizId) || quizzesList[0];
    setActiveQuiz(attachedQuiz);
    setActiveScreen('quiz');
  };

  // Font size classes
  const fontClass = 
    fontSize === 'small' 
      ? 'text-sm' 
      : fontSize === 'large' 
      ? 'text-lg leading-relaxed' 
      : 'text-base leading-normal';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-28">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setActiveScreen('subject_detail')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ur' ? 'واپس فہرست اسباق' : 'Back to Chapters'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Font Size Toggle */}
          <div className="flex items-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-0.5">
            <button
              onClick={() => setFontSize('small')}
              className={`px-2 py-1 text-xs font-bold rounded-lg ${fontSize === 'small' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-400'}`}
              title="Small Text"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('medium')}
              className={`px-2 py-1 text-xs font-bold rounded-lg ${fontSize === 'medium' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-400'}`}
              title="Medium Text"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2 py-1 text-xs font-bold rounded-lg ${fontSize === 'large' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-400'}`}
              title="Large Text"
            >
              A+
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmarkLesson(selectedLesson.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isBookmarked 
                ? 'bg-amber-50 text-amber-600 border-amber-300 dark:bg-amber-950 dark:border-amber-700' 
                : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-slate-900'
            }`}
            title="Bookmark Lesson"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Download Button */}
          <button
            onClick={() => toggleDownloadItem(selectedLesson.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isDownloaded 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-300 dark:bg-emerald-950 dark:border-emerald-700' 
                : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-slate-900'
            }`}
            title="Save Offline"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span 
            className="text-xs font-bold px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: `${selectedSubject.color}15`, color: selectedSubject.color }}
          >
            {language === 'ur' ? selectedSubject.nameUr : selectedSubject.nameEn}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {language === 'ur' ? selectedChapter?.titleUr : selectedChapter?.titleEn}
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs text-slate-400">
            {language === 'ur' ? selectedLesson.durationUr : selectedLesson.durationEn}
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-slate-900 dark:text-white leading-tight">
          {language === 'ur' ? selectedLesson.titleUr : selectedLesson.titleEn}
        </h1>

        {/* Audio Player Bar */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-10 h-10 rounded-full bg-[#0F9D75] hover:bg-[#0c8261] text-white flex items-center justify-center shadow-md shadow-[#0F9D75]/25 transition-transform active:scale-95 shrink-0"
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#0F9D75]" />
                <span>{language === 'ur' ? 'صوتی خلاصہ و تلاوت سنیں' : 'Audio Narration & Pronunciation'}</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {isPlayingAudio 
                  ? (language === 'ur' ? 'آڈیو چل رہی ہے...' : 'Playing narration (HQ)...') 
                  : (language === 'ur' ? '۳ منٹ صوتی خلاصہ سنیں' : 'Listen to 3-min audio summary')}
              </div>
            </div>
          </div>

          <div className="w-full flex-1 flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden cursor-pointer">
              <div 
                className="h-full bg-[#0F9D75] transition-all duration-300"
                style={{ width: `${audioProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
              {Math.floor((audioProgress * 1.8) / 60)}:{String(Math.floor((audioProgress * 1.8) % 60)).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs for Reading View / Key Takeaways / Personal Notes */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'content'
              ? 'bg-[#0F9D75] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {language === 'ur' ? 'مکمل سبق کا متن' : 'Full Lesson Text'}
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'summary'
              ? 'bg-[#0F9D75] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {language === 'ur' ? 'اہم نکات و خلاصہ' : 'Key Takeaways'}
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'notes'
              ? 'bg-[#0F9D75] text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{language === 'ur' ? 'میرے نوٹس' : 'My Personal Notes'}</span>
        </button>
      </div>

      {/* TAB CONTENT: FULL LESSON */}
      {activeTab === 'content' && (
        <article className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
          {/* Key points alert box */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F9D75] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {language === 'ur' ? 'بنیادی حاصلِ سبق (Core Concepts)' : 'Lesson Highlights'}
            </h3>
            <ul className="space-y-2">
              {(language === 'ur' ? selectedLesson.keyPointsUr : selectedLesson.keyPointsEn).map((point, idx) => (
                <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F9D75] mt-1.5 shrink-0" />
                  <span className={language === 'ur' ? 'font-urdu' : ''}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Body with Nastaliq or Standard English font */}
          <div className={`prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 whitespace-pre-line ${fontClass} ${language === 'ur' ? 'font-urdu text-right text-lg leading-[2.4]' : ''}`}>
            {language === 'ur' ? selectedLesson.contentUr : selectedLesson.contentEn}
          </div>
        </article>
      )}

      {/* TAB CONTENT: SUMMARY */}
      {activeTab === 'summary' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-4">
          <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
            {language === 'ur' ? 'جامع امتحانی خلاصہ' : 'Exam Cheatsheet & Summary'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {language === 'ur' ? selectedLesson.summaryUr : selectedLesson.summaryEn}
          </p>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {language === 'ur' ? 'متوقع امتحانی سوالات' : 'Likely Exam Questions'}
            </h4>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300">
                1. {language === 'ur' ? 'توحید کے لغوی و اصطلاحی معنی واضح کریں اور اس کی اقسام بیان کریں۔' : 'Define the linguistic and theological definition of Tawheed and its three pillars.'}
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300">
                2. {language === 'ur' ? 'عقیدۂ توحید انسان کی عملی زندگی پر کس طرح اثر انداز ہوتا ہے؟' : 'How does conviction in the Oneness of God elevate human courage and equality?'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: NOTES */}
      {activeTab === 'notes' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-slate-900 dark:text-white">
              {language === 'ur' ? 'اپنے ذاتی نوٹس تحریر کریں' : 'Personal Study Scratchpad'}
            </h3>
            {noteSaved && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" /> {language === 'ur' ? 'محفوظ ہو گیا!' : 'Saved to Library!'}
              </span>
            )}
          </div>

          <textarea
            rows={6}
            value={studentNote}
            onChange={e => setStudentNote(e.target.value)}
            placeholder={language === 'ur' ? 'یہاں اہم نکات، فارمولے یا یاد دہانیاں لکھیں...' : 'Write key takeaways, questions to ask teacher, or mnemonics here...'}
            className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white outline-none focus:border-[#0F9D75]"
          />

          <div className="flex justify-end">
            <button
              onClick={handleSaveNote}
              className="px-5 py-2.5 rounded-xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-semibold shadow-sm transition-all"
            >
              {language === 'ur' ? 'نوٹ محفوظ کریں' : 'Save Note'}
            </button>
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-800 dark:text-white">
              {isCompleted ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 fill-emerald-600 text-white" />
                  {language === 'ur' ? 'سبق مکمل ہے (+25 XP)' : 'Lesson Completed (+25 XP)'}
                </span>
              ) : (
                <span>{language === 'ur' ? 'مکمل ہونے پر ۲۵ ایک پی ملیں گے' : 'Earn +25 XP upon completion'}</span>
              )}
            </div>
            <div className="text-[11px] text-slate-400">
              {selectedLesson.readTimeMin} min read
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedLesson.quizId && (
              <button
                onClick={handleStartAttachedQuiz}
                className="px-4 py-2.5 rounded-xl border border-[#0F9D75] text-[#0F9D75] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{language === 'ur' ? 'کوئز حل کریں' : 'Take Quiz'}</span>
              </button>
            )}

            {!isCompleted ? (
              <button
                onClick={handleComplete}
                className="px-6 py-2.5 rounded-xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-bold shadow-md shadow-[#0F9D75]/25 flex items-center gap-1.5 transition-all"
              >
                <span>{language === 'ur' ? 'مکمل نشان زد کریں' : 'Mark as Done'}</span>
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setActiveScreen('subject_detail')}
                className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <span>{language === 'ur' ? 'اگلا سبق' : 'Next Lesson'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
