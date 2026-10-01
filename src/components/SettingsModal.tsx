import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClassLevel } from '../types';
import { 
  X, 
  User, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  HardDrive, 
  Clock, 
  Shield, 
  LogOut, 
  HelpCircle, 
  Trash2, 
  Check, 
  Phone,
  Sparkles
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { 
    showSettingsModal, 
    setShowSettingsModal, 
    language, 
    setLanguage, 
    isDark, 
    toggleTheme, 
    user, 
    updateUser,
    fontSize,
    setFontSize
  } = useApp();

  const [parentPhone, setParentPhone] = useState('+92 321 9876543');
  const [dailyGoal, setDailyGoal] = useState<number>(user.dailyGoalMinutes);
  const [notifyDaily, setNotifyDaily] = useState(true);
  const [notifyStreak, setNotifyStreak] = useState(true);
  const [notifyIslamic, setNotifyIslamic] = useState(true);
  const [savedAlert, setSavedAlert] = useState(false);

  if (!showSettingsModal) return null;

  const handleSave = () => {
    updateUser({
      dailyGoalMinutes: dailyGoal
    });
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      setShowSettingsModal(false);
    }, 800);
  };

  const handleClearCache = () => {
    updateUser({ downloadedItemIds: [] });
    alert(language === 'ur' ? 'آف لائن کیشے کامیابی سے صاف کر دیا گیا ہے۔' : 'Offline storage cache cleared.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold font-heading text-slate-900 dark:text-white">
              {language === 'ur' ? 'ترتیبات و پروفائل' : 'Settings & Preferences'}
            </h2>
            <p className="text-xs text-slate-400">Manage account, study goals & language</p>
          </div>
          <button 
            onClick={() => setShowSettingsModal(false)}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#0F9D75]"
          />
          <div className="flex-1">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</h3>
            <p className="text-xs text-slate-400">{user.email} • {user.classLevel}</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
            Level {user.level}
          </span>
        </div>

        {/* 1. Language & Appearance */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'ur' ? 'زبان اور ظاہری وضع' : 'Language & Display'}
          </h4>

          {/* Language Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Globe className="w-4 h-4 text-[#0F9D75]" />
              <span>{language === 'ur' ? 'ایپ کی بنیادی زبان' : 'Interface Language'}</span>
            </div>
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${language === 'en' ? 'bg-white dark:bg-slate-700 shadow-sm text-[#0F9D75]' : 'text-slate-500'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-3 py-1 text-xs font-bold rounded-lg ${language === 'ur' ? 'bg-white dark:bg-slate-700 shadow-sm text-[#0F9D75]' : 'text-slate-500'}`}
              >
                اردو
              </button>
            </div>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              {isDark ? <Moon className="w-4 h-4 text-purple-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span>{language === 'ur' ? 'ڈارک موڈ (Dark Theme)' : 'Dark Theme'}</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${isDark ? 'bg-[#0F9D75] justify-end' : 'bg-slate-300 justify-start'}`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </button>
          </div>

          {/* Text Size */}
          <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {language === 'ur' ? 'متن کا سائز (Reading Font Size)' : 'Lesson Font Size'}
            </span>
            <div className="flex gap-1">
              {(['small', 'medium', 'large'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setFontSize(s)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${fontSize === s ? 'bg-[#0F9D75] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
                >
                  {s.charAt(0).toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Study Goal & Parent Contact */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'ur' ? 'پڑھائی کا ہدف اور رابطہ' : 'Study Goal & Monitoring'}
          </h4>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
              {language === 'ur' ? 'روزانہ مطالعے کا ہدف' : 'Daily Goal Minutes'}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 20, 30, 45].map(m => (
                <button
                  key={m}
                  onClick={() => setDailyGoal(m)}
                  className={`py-2 text-xs font-bold rounded-xl border ${dailyGoal === m ? 'border-[#0F9D75] bg-emerald-50 text-[#0F9D75]' : 'border-slate-200 dark:border-slate-700 text-slate-600'}`}
                >
                  {m} mins
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center justify-between">
              <span>{language === 'ur' ? 'والدین کا موبائل نمبر (ہفتہ وار رپورٹ)' : 'Parent Contact (Weekly Progress SMS)'}</span>
              <span className="text-[10px] text-slate-400">Optional</span>
            </label>
            <input
              type="text"
              value={parentPhone}
              onChange={e => setParentPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white outline-none focus:border-[#0F9D75]"
            />
          </div>
        </div>

        {/* 3. Notifications */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {language === 'ur' ? 'یاد دہانیاں اور نوٹیفیکیشنز' : 'Notification Triggers'}
          </h4>

          <div className="flex items-center justify-between py-1 text-xs">
            <span className="text-slate-700 dark:text-slate-300">Daily Study Reminder (8:00 PM)</span>
            <input 
              type="checkbox" 
              checked={notifyDaily} 
              onChange={e => setNotifyDaily(e.target.checked)} 
              className="accent-[#0F9D75] w-4 h-4 rounded" 
            />
          </div>

          <div className="flex items-center justify-between py-1 text-xs">
            <span className="text-slate-700 dark:text-slate-300">Streak-at-Risk Alert (Before midnight)</span>
            <input 
              type="checkbox" 
              checked={notifyStreak} 
              onChange={e => setNotifyStreak(e.target.checked)} 
              className="accent-[#0F9D75] w-4 h-4 rounded" 
            />
          </div>

          <div className="flex items-center justify-between py-1 text-xs">
            <span className="text-slate-700 dark:text-slate-300">Daily Islamic Masnoon Dua Reminder</span>
            <input 
              type="checkbox" 
              checked={notifyIslamic} 
              onChange={e => setNotifyIslamic(e.target.checked)} 
              className="accent-[#0F9D75] w-4 h-4 rounded" 
            />
          </div>
        </div>

        {/* 4. Storage & Cache */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Offline Storage Cache</div>
            <div className="text-[11px] text-slate-400">{user.downloadedItemIds.length} items stored locally</div>
          </div>
          <button
            onClick={handleClearCache}
            className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50"
          >
            Clear Cache
          </button>
        </div>

        {/* Save button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-semibold shadow-lg shadow-[#0F9D75]/25 flex items-center justify-center gap-1.5 transition-all"
          >
            {savedAlert ? (
              <>
                <Check className="w-4 h-4" />
                <span>{language === 'ur' ? 'ترتیبات محفوظ ہو گئیں!' : 'Preferences Saved!'}</span>
              </>
            ) : (
              <span>{language === 'ur' ? 'محفوظ کریں' : 'Save Changes'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
