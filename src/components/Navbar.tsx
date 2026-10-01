import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Sparkles, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Crown, 
  Settings, 
  UserCheck, 
  BookMarked,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    user, 
    isDark, 
    toggleTheme, 
    activeScreen, 
    setActiveScreen,
    setShowPremiumModal,
    setShowSettingsModal
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);

  const notifications = [
    {
      id: 1,
      titleEn: 'Streak Alert 🔥',
      titleUr: 'مسلسل پڑھائی کی یاد دہانی 🔥',
      descEn: 'Keep your 7-day streak alive! Complete today\'s 5-min quiz.',
      descUr: 'اپنا ۷ دن کا تسلسل برقرار رکھیں! آج کا ۵ منٹ کا کوئز حل کریں۔',
      time: '1h ago',
      unread: true
    },
    {
      id: 2,
      titleEn: 'New Islamiyat Past Paper Added',
      titleUr: 'اسلامیات کا نیا حل شدہ پرچہ شامل',
      descEn: 'FBISE 2024 solved paper is now available in library.',
      descUr: 'فیڈرل بورڈ ۲۰۲۴ء کا حل شدہ پرچہ اب دستیاب ہے۔',
      time: '4h ago',
      unread: true
    },
    {
      id: 3,
      titleEn: 'Weekly Leaderboard Updated',
      titleUr: 'ہفتہ وار رینکنگ اپ ڈیٹ',
      descEn: 'You are currently Rank #4 in Peshawar division!',
      descUr: 'آپ اس وقت پشاور ڈویژن میں چوتھے نمبر پر ہیں!',
      time: 'Yesterday',
      unread: false
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div 
          onClick={() => setActiveScreen('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0F9D75] to-[#12b385] text-white flex items-center justify-center shadow-md shadow-[#0F9D75]/20 group-hover:scale-105 transition-transform">
            <span className="font-urdu font-bold text-xl leading-none pt-0.5">علم</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                {language === 'ur' ? 'اے بی بلوچ لائبریری' : "AB Baloch's Library"}
              </span>
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                {language === 'ur' ? 'علم و مطالعہ' : 'Study & Offline'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              {language === 'ur' ? 'اردو و انگریزی سمارٹ نصاب و کتب خانہ' : 'Smart Bilingual Curriculum & Offline Library'}
            </p>
          </div>
        </div>

        {/* Center / Right Action Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Badge */}
          <div className="relative">
            <button
              onClick={() => setShowStreakModal(!showStreakModal)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-300/40 dark:border-amber-700/30 transition-all font-semibold text-xs sm:text-sm"
              title="Daily Streak"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{user.streakDays}</span>
              <span className="hidden md:inline font-normal text-xs text-amber-600 dark:text-amber-300">
                {language === 'ur' ? 'دن' : 'Days'}
              </span>
            </button>

            {/* Streak popover */}
            {showStreakModal && (
              <div className="absolute top-full mt-2 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-64 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                    {language === 'ur' ? 'پڑھائی کا تسلسل' : 'Study Streak'}
                  </span>
                  <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-semibold px-2 py-0.5 rounded-md">
                    {user.streakDays} {language === 'ur' ? 'روزانہ' : 'active days'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                  {language === 'ur' 
                    ? 'شاباش! روزانہ کم از کم ایک سبق یا کوئز مکمل کریں تاکہ اسٹریک برقرار رہے۔' 
                    : 'Great consistency! Complete at least 1 lesson or quiz daily to maintain your streak.'}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{language === 'ur' ? 'اسٹریک شیلڈز:' : 'Streak Freeze:'}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {user.streakShields} Available
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* XP Pill */}
          <div 
            onClick={() => setActiveScreen('progress')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 cursor-pointer hover:bg-purple-100 transition-colors text-xs font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{user.xp.toLocaleString()} XP</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-200/70 dark:bg-purple-800 text-purple-800 dark:text-purple-200">
              Lvl {user.level}
            </span>
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all border border-slate-200 dark:border-slate-700"
            title="Toggle Urdu / English"
          >
            <Globe className="w-3.5 h-3.5 text-[#0F9D75]" />
            <span>{language === 'en' ? 'اردو' : 'English'}</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {showNotifications && (
              <div className="absolute top-full mt-2 right-0 w-80 max-w-[90vw] p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-50">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="font-bold text-sm text-slate-800 dark:text-white">
                    {language === 'ur' ? 'اطلاعات و الرٹس' : 'Notifications'}
                  </span>
                  <span className="text-[11px] text-[#0F9D75] font-medium cursor-pointer">
                    {language === 'ur' ? 'سب پڑھیں' : 'Mark all read'}
                  </span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div 
                      key={n.id}
                      className={`p-2.5 rounded-xl text-xs transition-colors ${
                        n.unread 
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40' 
                          : 'bg-slate-50 dark:bg-slate-900/40'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200 mb-0.5">
                        <span>{language === 'ur' ? n.titleUr : n.titleEn}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                        {language === 'ur' ? n.descUr : n.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Premium button or badge */}
          {user.isPremium ? (
            <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 text-xs font-bold shadow-sm">
              <Crown className="w-3.5 h-3.5 text-slate-900" />
              <span>PRO</span>
            </span>
          ) : (
            <button
              onClick={() => setShowPremiumModal(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-xs shadow-md shadow-amber-500/20 hover:opacity-95 transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'پریمیم' : 'Go Pro'}</span>
            </button>
          )}

          {/* Admin Switcher */}
          <button
            onClick={() => setActiveScreen(activeScreen === 'admin' ? 'dashboard' : 'admin')}
            className={`hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              activeScreen === 'admin'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
            }`}
            title="Switch to Admin Management View"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{activeScreen === 'admin' ? (language === 'ur' ? 'طالب علم موڈ' : 'Student Mode') : (language === 'ur' ? 'ایڈمن پینل' : 'Admin Panel')}</span>
          </button>

          {/* Settings / User Avatar */}
          <button
            onClick={() => setShowSettingsModal(true)}
            className="p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Settings & Profile"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
