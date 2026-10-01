import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BADGES_LIST, LEADERBOARD_USERS } from '../data/mockData';
import { 
  BarChart3, 
  Flame, 
  Award, 
  TrendingUp, 
  CheckCircle, 
  Lock, 
  Sparkles, 
  Calendar, 
  Clock, 
  Target,
  Trophy,
  Share2
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { language, user, subjectsList } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'badges' | 'leaderboard'>('analytics');

  // Weekly study minutes mock
  const weeklyData = [
    { dayEn: 'Mon', dayUr: 'پیر', mins: 25 },
    { dayEn: 'Tue', dayUr: 'منگل', mins: 35 },
    { dayEn: 'Wed', dayUr: 'بدھ', mins: 20 },
    { dayEn: 'Thu', dayUr: 'جمعرات', mins: 40 },
    { dayEn: 'Fri', dayUr: 'جمعہ', mins: 30 },
    { dayEn: 'Sat', dayUr: 'ہفتہ', mins: 45 },
    { dayEn: 'Sun', dayUr: 'اتوار', mins: user.todayStudiedMinutes }
  ];

  const maxMins = 50;

  return (
    <div className="space-y-6 pb-24">
      {/* Top Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
          {language === 'ur' ? 'تعلیمی کارکردگی اور رینکنگ' : 'Progress & Analytics'}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {language === 'ur' 
            ? 'ہفتہ وار پڑھائی کا جائزہ، تمغے اور ہم جماعتوں میں رینکنگ دیکھیں۔' 
            : 'Track your weekly study minutes, subject mastery, and leaderboard standing.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{language === 'ur' ? 'مطالعے کے اعداد و شمار' : 'Study Analytics'}</span>
        </button>

        <button
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'badges'
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{language === 'ur' ? 'تمغے اور اعزازات' : 'Badges & Rewards'}</span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'leaderboard'
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>{language === 'ur' ? 'ہفتہ وار رینکنگ' : 'Weekly Leaderboard'}</span>
        </button>
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{language === 'ur' ? 'موجودہ اسٹریک' : 'Current Streak'}</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {user.streakDays} <span className="text-xs font-normal text-slate-400">{language === 'ur' ? 'دن' : 'Days'}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>{language === 'ur' ? 'کل تجربہ' : 'Total XP'}</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {user.xp.toLocaleString()} <span className="text-xs font-normal text-slate-400">XP</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{language === 'ur' ? 'مکمل اسباق' : 'Lessons Done'}</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {user.completedLessonIds.length} <span className="text-xs font-normal text-slate-400">{language === 'ur' ? 'اسباق' : 'items'}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Target className="w-4 h-4 text-blue-600" />
                <span>{language === 'ur' ? 'کوئز ایکوریسی' : 'Quiz Accuracy'}</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                85%
              </div>
            </div>
          </div>

          {/* Weekly Time Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {language === 'ur' ? 'ہفتہ وار پڑھائی کا دورانیہ' : 'Weekly Study Time (Minutes)'}
                </h3>
                <p className="text-xs text-slate-400">Total 219 mins studied this week</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                Goal: {user.dailyGoalMinutes}m/day
              </span>
            </div>

            {/* Vertical Bar Chart */}
            <div className="pt-6 flex items-end justify-between gap-2 h-44 border-b border-slate-100 dark:border-slate-700 pb-3">
              {weeklyData.map((d, i) => {
                const heightPct = Math.round((d.mins / maxMins) * 100);
                const isToday = i === 6;
                return (
                  <div key={d.dayEn} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.mins}m
                    </span>
                    <div className="w-full max-w-[28px] h-32 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-end overflow-hidden p-0.5">
                      <div
                        className={`w-full rounded-lg transition-all duration-700 ${
                          isToday
                            ? 'bg-[#0F9D75]'
                            : d.mins >= user.dailyGoalMinutes
                            ? 'bg-[#0F9D75]/80'
                            : 'bg-amber-400'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className={`text-[11px] font-semibold ${isToday ? 'text-[#0F9D75] font-bold' : 'text-slate-400'}`}>
                      {language === 'ur' ? d.dayUr : d.dayEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subject Mastery Radar / Breakdown */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {language === 'ur' ? 'مضامین کی سطح اور مہارت' : 'Subject Mastery Breakdown'}
            </h3>

            <div className="space-y-3">
              {subjectsList.map(s => {
                const mockMastery = s.id === 'islamiyat' ? 88 : s.id === 'pakstudies' ? 76 : s.id === 'math' ? 62 : 70;
                return (
                  <div key={s.id} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">
                        {language === 'ur' ? s.nameUr : s.nameEn}
                      </span>
                      <span className="font-mono text-slate-500">{mockMastery}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${mockMastery}%`, backgroundColor: s.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BADGES & ACHIEVEMENTS */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {BADGES_LIST.map(badge => (
            <div 
              key={badge.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
                badge.isUnlocked
                  ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm'
                  : 'bg-slate-50/80 dark:bg-slate-900/40 border-dashed border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md bg-gradient-to-tr ${badge.color}`}>
                    <Award className="w-6 h-6" />
                  </div>
                  {badge.isUnlocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                  {language === 'ur' ? badge.titleUr : badge.titleEn}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {language === 'ur' ? badge.descriptionUr : badge.descriptionEn}
                </p>
              </div>

              {badge.isUnlocked && badge.unlockedAt && (
                <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-700 text-[10px] text-slate-400">
                  Earned {badge.unlockedAt}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {language === 'ur' ? 'ملک گیر طلبہ رینکنگ' : 'Pakistan Nationwide Leaderboard'}
              </h3>
              <p className="text-xs text-slate-400">Class 9 & 10 Division • Refreshes Sunday midnight</p>
            </div>
            <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
              <Trophy className="w-4 h-4" /> Season 4
            </span>
          </div>

          <div className="space-y-3">
            {LEADERBOARD_USERS.map((student) => (
              <div 
                key={student.rank}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  student.isCurrentUser
                    ? 'border-[#0F9D75] bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm'
                    : 'border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                    student.rank === 1 
                      ? 'bg-amber-400 text-slate-900' 
                      : student.rank === 2 
                      ? 'bg-slate-300 text-slate-800' 
                      : student.rank === 3 
                      ? 'bg-amber-700 text-white' 
                      : 'text-slate-500 font-semibold'
                  }`}>
                    {student.rank}
                  </span>

                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />

                  <div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <span>{language === 'ur' ? student.nameUr : student.name}</span>
                      {student.isCurrentUser && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 font-bold">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{student.city}</span>
                      <span>•</span>
                      <span className="text-amber-600 flex items-center gap-0.5">
                        <Flame className="w-3 h-3 fill-current" /> {student.streak}d streak
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-extrabold text-sm text-[#0F9D75] dark:text-[#12b385]">
                    {student.xp.toLocaleString()} XP
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {student.badge}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
