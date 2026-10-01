import React from 'react';
import { useApp } from '../context/AppContext';
import { SubjectId } from '../types';
import { LEADERBOARD_USERS, ALL_QUIZZES } from '../data/mockData';
import { 
  Flame, 
  Sparkles, 
  Play, 
  Clock, 
  Award, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Bookmark,
  BookOpen,
  Calendar,
  Layers,
  HelpCircle,
  Crown
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    language, 
    user, 
    subjectsList, 
    setActiveScreen, 
    setSelectedSubjectId, 
    setSelectedChapter,
    setSelectedLesson,
    setActiveQuiz,
    setShowPremiumModal,
    setShowOnboarding,
    chaptersMap
  } = useApp();

  const dailyQuiz = ALL_QUIZZES.find(q => q.isDailyQuiz) || ALL_QUIZZES[0];
  const goalPercent = Math.min(100, Math.round((user.todayStudiedMinutes / user.dailyGoalMinutes) * 100));

  const handleOpenSubject = (subId: SubjectId) => {
    setSelectedSubjectId(subId);
    setActiveScreen('subject_detail');
  };

  const handleStartDailyQuiz = () => {
    setActiveQuiz(dailyQuiz);
    setActiveScreen('quiz');
  };

  const handleResumeRecentLesson = () => {
    const islamiyatChapters = chaptersMap['islamiyat'] || [];
    if (islamiyatChapters.length > 0 && islamiyatChapters[0].lessons.length > 0) {
      setSelectedSubjectId('islamiyat');
      setSelectedChapter(islamiyatChapters[0]);
      setSelectedLesson(islamiyatChapters[0].lessons[0]);
      setActiveScreen('lesson');
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* 1. Greeting & Hero Banner with Streak Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1B2A49] via-[#111f38] to-[#0F9D75] text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#F5B83D]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{user.classLevel}</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('en-PK', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              {language === 'ur' ? (
                <span>خوش آمدید، {user.name} 👋</span>
              ) : (
                <span>Assalam-o-Alaikum, {user.name} 👋</span>
              )}
            </h1>

            <p className="text-sm text-slate-300 max-w-lg leading-relaxed">
              {language === 'ur' 
                ? 'علم حاصل کرنا ہر مسلمان پر فرض ہے۔ آج کا ۱۰ منٹ کا کوئز مکمل کریں اور اپنی اسٹریک جاری رکھیں۔'
                : 'Seeking knowledge is an obligation. Maintain your momentum with today’s bite-sized quiz and chapters.'}
            </p>
          </div>

          {/* Daily Goal & Streak Counter Pill Card */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-full sm:w-auto justify-between sm:justify-start">
            {/* Goal Ring */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#F5B83D] transition-all duration-700 ease-out"
                  strokeDasharray={`${goalPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xs font-bold">{goalPercent}%</span>
              </div>
            </div>

            <div className="text-left space-y-0.5">
              <div className="text-[11px] text-slate-300 font-medium">
                {language === 'ur' ? 'آج کی پڑھائی' : 'Daily Goal'}
              </div>
              <div className="text-sm font-bold">
                {user.todayStudiedMinutes} / {user.dailyGoalMinutes} {language === 'ur' ? 'منٹ' : 'mins'}
              </div>
              <div className="text-[10px] text-amber-300 font-semibold flex items-center gap-1">
                <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
                {user.streakDays} {language === 'ur' ? 'روزہ اسٹریک' : 'Day Streak'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Action Cards: Continue Learning & Daily Quiz */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Continue Learning Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F9D75] dark:text-[#12b385] flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {language === 'ur' ? 'پڑھائی جاری رکھیں' : 'Continue Learning'}
              </span>
              <span className="text-xs text-slate-400">Chapter 1 • Lesson 1</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {language === 'ur' ? 'توحید اور انسانی زندگی پر اثرات' : 'Tawheed and Its Importance in Human Life'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {language === 'ur'
                ? 'اسلامیات: توحید فی الربوبیت، توحید فی الالوہیت اور صفاتِ الٰہیہ کا جامع تفصیلی جائزہ۔'
                : 'Islamiyat: A comprehensive breakdown of Tawheed and its direct psychological and moral effects.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">8 min read • Audio ready</span>
            <button
              onClick={handleResumeRecentLesson}
              className="px-4 py-2 rounded-xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>{language === 'ur' ? 'سبق شروع کریں' : 'Resume Lesson'}</span>
              <Play className="w-3 h-3 fill-current" />
            </button>
          </div>
        </div>

        {/* Daily Quiz Challenge Card */}
        <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-950/20 dark:via-amber-950/10 rounded-2xl p-5 border border-amber-200/80 dark:border-amber-800/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {language === 'ur' ? 'آج کا خصوصی کوئز' : 'Daily Challenge'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-bold">
                +50 XP
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              {language === 'ur' ? dailyQuiz.titleUr : dailyQuiz.titleEn}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'ur'
                ? '۵ دلچسپ سوالات، فوری حل، اور اسٹریک میں ایک دن کا فوری اضافہ!'
                : '5 quick questions to test your knowledge, earn bonus XP, and safeguard your streak.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-200/40 dark:border-amber-800/30 flex items-center justify-between">
            <span className="text-xs text-amber-700 dark:text-amber-300 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 5 Questions • 5 Mins
            </span>
            <button
              onClick={handleStartDailyQuiz}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
            >
              <span>{language === 'ur' ? 'کوئز حل کریں' : 'Start Daily Quiz'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Subject Grid (7 Color-Coded Subject Cards) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-heading font-bold text-slate-900 dark:text-white">
              {language === 'ur' ? 'نصاب کے مضامین' : 'Core Subjects'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ur' ? 'اپنا پسندیدہ مضمون منتخب کر کے اسباق شروع کریں' : 'Choose a subject to explore chapters, tests & past papers'}
            </p>
          </div>
          <button
            onClick={() => setActiveScreen('subjects')}
            className="text-xs font-semibold text-[#0F9D75] hover:underline flex items-center gap-1"
          >
            <span>{language === 'ur' ? 'سب دیکھیں' : 'View All'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {subjectsList.map(sub => {
            return (
              <div
                key={sub.id}
                onClick={() => handleOpenSubject(sub.id)}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Accent Top Bar */}
                <div 
                  className="absolute top-0 left-4 right-4 h-1 rounded-b-md"
                  style={{ backgroundColor: sub.color }}
                />

                <div className="mt-1">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shadow-sm"
                    style={{ backgroundColor: `${sub.color}15`, color: sub.color }}
                  >
                    <BookOpen className="w-5 h-5" />
                  </div>

                  <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-0.5 group-hover:text-[#0F9D75] transition-colors">
                    {language === 'ur' ? sub.nameUr : sub.nameEn}
                  </h3>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {language === 'ur' ? sub.descriptionUr : sub.descriptionEn}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{sub.totalChapters} {language === 'ur' ? 'ابواب' : 'Chapters'}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Recommended Weak Topics & Mistake Review */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {language === 'ur' ? 'توجہ طلب موضوعات (Mistake Review)' : 'Targeted Weak Areas'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {language === 'ur' ? 'کوئز کی بنیاد پر خودکار سفارشات' : 'Based on past quiz mistakes'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveScreen('practice')}
              className="text-xs font-semibold text-[#0F9D75] hover:underline"
            >
              {language === 'ur' ? 'غلطیوں کا جائزہ' : 'Practice Mistakes'}
            </button>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {language === 'ur' ? 'ریاضی: قالب کا مقطع اور معکوس' : 'Mathematics: Matrix Determinants & Inverse'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {language === 'ur' ? '۱ بار غلط ہوا • نکتہ: اگر مقطع صفر ہو تو معکوس ممکن نہیں' : '1 incorrect attempt • Tip: |A|=0 means undefined'}
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedSubjectId('math');
                  setActiveScreen('subject_detail');
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-[#0F9D75] text-xs font-semibold hover:bg-emerald-100"
              >
                {language === 'ur' ? 'دوبارہ پڑھیں' : 'Review'}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {language === 'ur' ? 'معلوماتِ عامہ: کرۂ ارض کی گیسیں' : 'General Knowledge: Atmospheric Gases'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {language === 'ur' ? 'نائٹروجن ۷۸ فیصد اور آکسیجن ۲۱ فیصد ہے' : 'Nitrogen comprises ~78% of atmospheric air'}
                </div>
              </div>
              <button 
                onClick={() => {
                  setSelectedSubjectId('gk');
                  setActiveScreen('subject_detail');
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-[#0F9D75] text-xs font-semibold hover:bg-emerald-100"
              >
                {language === 'ur' ? 'دوبارہ پڑھیں' : 'Review'}
              </button>
            </div>
          </div>
        </div>

        {/* Leaderboard Podium Preview */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                <TrendingUp className="w-4 h-4 text-amber-500" />
                <span>{language === 'ur' ? 'ہفتہ وار مقابلہ' : 'Top Students'}</span>
              </div>
              <button 
                onClick={() => setActiveScreen('progress')}
                className="text-xs text-[#0F9D75] font-semibold hover:underline"
              >
                {language === 'ur' ? 'رینکنگ' : 'Full Board'}
              </button>
            </div>

            <div className="space-y-2.5">
              {LEADERBOARD_USERS.slice(0, 3).map((item, i) => (
                <div key={item.rank} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      i === 0 ? 'bg-amber-100 text-amber-800' : i === 1 ? 'bg-slate-200 text-slate-700' : 'bg-amber-50 text-amber-900'
                    }`}>
                      {item.rank}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">
                      {language === 'ur' ? item.nameUr : item.name}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[#0F9D75]">{item.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 text-center">
            <span className="text-xs text-slate-500">
              {language === 'ur' ? `آپ کا رینک: #${LEADERBOARD_USERS[3].rank} (${user.xp} XP)` : `Your Rank: #${LEADERBOARD_USERS[3].rank} (${user.xp} XP)`}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Islamic Essentials Highlight Ribbon */}
      <div 
        onClick={() => setActiveScreen('islamic')}
        className="rounded-2xl p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white cursor-pointer hover:shadow-lg transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-emerald-200 font-semibold uppercase tracking-wider">
              {language === 'ur' ? 'اسلامک سیکشن و دعائیں' : 'Islamic Section & Duas'}
            </div>
            <h4 className="text-base font-bold font-heading">
              {language === 'ur' ? 'روزمرہ مسنون دعائیں، تجوید اور سیرت النبیﷺ' : 'Daily Masnoon Duas, Quran Basics & Seerah Stories'}
            </h4>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              {language === 'ur' ? 'صوتی تلاوت اور اردو ترجمے کے ساتھ سنیں' : 'Listen with Arabic audio recitations and reflections'}
            </p>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-white text-emerald-900 text-xs font-bold hover:bg-emerald-50 transition-colors whitespace-nowrap">
          {language === 'ur' ? 'کھولیں' : 'Explore Islamic Hub'} →
        </button>
      </div>
    </div>
  );
};
