import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Chapter, Lesson, Quiz } from '../types';
import { PAST_PAPERS, ALL_QUIZZES } from '../data/mockData';
import { 
  ArrowLeft, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Download, 
  FileText, 
  HelpCircle, 
  Layers, 
  Play, 
  Share2, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';

export const SubjectView: React.FC = () => {
  const { 
    selectedSubject, 
    chaptersMap, 
    user, 
    language, 
    setActiveScreen, 
    setSelectedChapter, 
    setSelectedLesson,
    setActiveQuiz,
    setActivePdfPaper,
    toggleDownloadItem
  } = useApp();

  const [activeTab, setActiveTab] = useState<'chapters' | 'pastpapers' | 'flashcards' | 'quizzes'>('chapters');

  const chapters = chaptersMap[selectedSubject.id] || [];
  const subjectPastPapers = PAST_PAPERS.filter(p => p.subjectId === selectedSubject.id);
  const subjectQuizzes = ALL_QUIZZES.filter(q => q.subjectId === selectedSubject.id);

  // Compute progress
  const allSubjectLessonIds = chapters.flatMap(ch => ch.lessons.map(l => l.id));
  const completedCount = allSubjectLessonIds.filter(id => user.completedLessonIds.includes(id)).length;
  const progressPercent = allSubjectLessonIds.length > 0 
    ? Math.round((completedCount / allSubjectLessonIds.length) * 100) 
    : 0;

  const handleOpenLesson = (ch: Chapter, les: Lesson) => {
    setSelectedChapter(ch);
    setSelectedLesson(les);
    setActiveScreen('lesson');
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setActiveScreen('quiz');
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ur' ? 'مرکزی صفحہ پر واپسی' : 'Back to Dashboard'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span 
            className="text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider"
            style={{ backgroundColor: `${selectedSubject.color}20`, color: selectedSubject.color }}
          >
            {user.classLevel}
          </span>
        </div>
      </div>

      {/* Subject Header Banner */}
      <div 
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-xl"
        style={{
          background: `linear-gradient(135deg, #1B2A49 0%, ${selectedSubject.color} 100%)`
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              {language === 'ur' ? selectedSubject.nameUr : selectedSubject.nameEn}
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              {language === 'ur' ? selectedSubject.descriptionUr : selectedSubject.descriptionEn}
            </p>
          </div>

          {/* Progress Box */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 min-w-[200px]">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span>{language === 'ur' ? 'مکمل نصاب' : 'Subject Progress'}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
              <div 
                className="h-full bg-[#F5B83D] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-300 mt-2 flex justify-between">
              <span>{completedCount} / {allSubjectLessonIds.length || 1} {language === 'ur' ? 'اسباق مکمل' : 'lessons done'}</span>
              <span>{chapters.length} {language === 'ur' ? 'ابواب' : 'chapters'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('chapters')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'chapters'
              ? 'border-[#0F9D75] text-[#0F9D75] dark:text-[#12b385] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{language === 'ur' ? 'ابواب اور اسباق' : 'Chapters & Lessons'}</span>
        </button>

        <button
          onClick={() => setActiveTab('pastpapers')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'pastpapers'
              ? 'border-[#0F9D75] text-[#0F9D75] dark:text-[#12b385] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{language === 'ur' ? 'ماضی کے بورڈ پیپرز' : 'Past Papers'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700">
            {subjectPastPapers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('flashcards')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'flashcards'
              ? 'border-[#0F9D75] text-[#0F9D75] dark:text-[#12b385] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{language === 'ur' ? 'فلیش کارڈز' : 'Flashcards'}</span>
        </button>

        <button
          onClick={() => setActiveTab('quizzes')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'quizzes'
              ? 'border-[#0F9D75] text-[#0F9D75] dark:text-[#12b385] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>{language === 'ur' ? 'امتحانی کوئز' : 'Quizzes'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700">
            {subjectQuizzes.length}
          </span>
        </button>
      </div>

      {/* TAB 1: CHAPTERS & LESSONS */}
      {activeTab === 'chapters' && (
        <div className="space-y-4">
          {chapters.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 text-sm">
                {language === 'ur' ? 'اس مضمون کے اسباق جلد شامل کیے جائیں گے۔' : 'More chapters are being published for this subject.'}
              </p>
            </div>
          ) : (
            chapters.map(ch => {
              const isDownloaded = user.downloadedItemIds.includes(ch.id);
              return (
                <div 
                  key={ch.id} 
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 overflow-hidden shadow-sm"
                >
                  {/* Chapter Header */}
                  <div className="p-4 sm:p-5 bg-slate-50/70 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700/60 flex items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {language === 'ur' ? `باب نمبر ${ch.number}` : `Chapter ${ch.number}`}
                        </span>
                        <span className="text-xs text-slate-400">
                          {ch.lessons.length} {language === 'ur' ? 'اسباق' : 'Lessons'}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                        {language === 'ur' ? ch.titleUr : ch.titleEn}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {language === 'ur' ? ch.descriptionUr : ch.descriptionEn}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleDownloadItem(ch.id)}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        isDownloaded
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-50'
                      }`}
                      title={isDownloaded ? 'Downloaded for offline reading' : 'Download chapter offline'}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">
                        {isDownloaded ? (language === 'ur' ? 'محفوظ شدہ' : 'Offline') : (language === 'ur' ? 'ڈاؤنلوڈ' : 'Download')}
                      </span>
                    </button>
                  </div>

                  {/* Lessons list */}
                  <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {ch.lessons.map((les, lIdx) => {
                      const isCompleted = user.completedLessonIds.includes(les.id);
                      return (
                        <div
                          key={les.id}
                          onClick={() => handleOpenLesson(ch, les)}
                          className="p-4 hover:bg-slate-50/80 dark:hover:bg-slate-700/30 cursor-pointer flex items-center justify-between gap-3 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              isCompleted 
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-[#0F9D75] group-hover:text-white'
                            }`}>
                              {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : lIdx + 1}
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#0F9D75] transition-colors">
                                {language === 'ur' ? les.titleUr : les.titleEn}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {language === 'ur' ? les.durationUr : les.durationEn}
                                </span>
                                <span>•</span>
                                <span>{language === 'ur' ? 'آڈیو شامل' : 'Audio Narration'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {isCompleted && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 hidden sm:inline">
                                {language === 'ur' ? 'مکمل' : 'Done'}
                              </span>
                            )}
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: PAST PAPERS */}
      {activeTab === 'pastpapers' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold">{language === 'ur' ? 'بورڈ امتحانات کی خصوصی تیاری:' : 'Board Exam Preparation:'}</span>{' '}
              {language === 'ur'
                ? 'فیڈرل، لاہور اور کراچی بورڈ کے اصل حل شدہ پرچہ جات مع تشریحات۔'
                : 'Original solved past exam papers from FBISE, BISE Lahore, and BIEK Karachi.'}
            </div>
            <span className="text-[10px] bg-amber-200 dark:bg-amber-900 px-2 py-0.5 rounded font-bold">2024-2022</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectPastPapers.map(paper => (
              <div 
                key={paper.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {paper.board}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{paper.year}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                    {language === 'ur' ? paper.titleUr : paper.titleEn}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span>{paper.totalMarks} {language === 'ur' ? 'کل نمبر' : 'Marks'}</span>
                    <span>•</span>
                    <span>{paper.questionsCount} {language === 'ur' ? 'سوالات' : 'Questions'}</span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {language === 'ur' ? 'مکمل حل شدہ' : '100% Solved'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <button 
                    onClick={() => setActivePdfPaper(paper)}
                    className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-[#0F9D75] font-semibold"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    <span>{language === 'ur' ? 'پی ڈی ایف نوٹس دیکھیں' : 'View Solved PDF'}</span>
                  </button>

                  <button 
                    onClick={() => setActivePdfPaper(paper)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'ur' ? 'آف لائن پڑھیں' : 'Open & Cache'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: FLASHCARDS */}
      {activeTab === 'flashcards' && (
        <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
            {language === 'ur' ? `${selectedSubject.nameUr} فلیش کارڈز` : `${selectedSubject.nameEn} Flashcards Deck`}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {language === 'ur'
              ? 'اہم اصطلاحات، تعریفات اور فارمولوں کو تیزی سے دہرانے کے لیے ۳D فلیش کارڈز استعمال کریں۔'
              : 'Interactive 3D flipcards to drill definitions, formulas, and critical concepts.'}
          </p>

          <button
            onClick={() => setActiveScreen('practice')}
            className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md shadow-purple-600/20"
          >
            {language === 'ur' ? 'فلیش کارڈ ڈیک کھولیں' : 'Launch Flashcard Practice'}
          </button>
        </div>
      )}

      {/* TAB 4: SUBJECT QUIZZES */}
      {activeTab === 'quizzes' && (
        <div className="space-y-3">
          {subjectQuizzes.map(quiz => (
            <div 
              key={quiz.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4"
            >
              <div>
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  +{quiz.xpReward} XP Reward
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {language === 'ur' ? quiz.titleUr : quiz.titleEn}
                </h4>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>{quiz.questions.length} {language === 'ur' ? 'سوالات' : 'Questions'}</span>
                  <span>•</span>
                  <span>{quiz.durationMinutes} {language === 'ur' ? 'منٹ' : 'Mins'}</span>
                </div>
              </div>

              <button
                onClick={() => handleStartQuiz(quiz)}
                className="px-4 py-2 rounded-xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <span>{language === 'ur' ? 'شروع کریں' : 'Start'}</span>
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
