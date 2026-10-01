import React from 'react';
import { useApp, ScreenType } from '../context/AppContext';
import { 
  Home, 
  BookOpen, 
  Dumbbell, 
  BarChart3, 
  Bookmark, 
  Moon,
  Sparkles
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeScreen, setActiveScreen, language } = useApp();

  const navItems: { screen: ScreenType; labelEn: string; labelUr: string; icon: React.ComponentType<{ className?: string }> }[] = [
    {
      screen: 'dashboard',
      labelEn: 'Home',
      labelUr: 'مرکزی',
      icon: Home
    },
    {
      screen: 'subjects',
      labelEn: 'Subjects',
      labelUr: 'مضامین',
      icon: BookOpen
    },
    {
      screen: 'practice',
      labelEn: 'Practice',
      labelUr: 'مشق و ٹیسٹ',
      icon: Dumbbell
    },
    {
      screen: 'islamic',
      labelEn: 'Islamic',
      labelUr: 'اسلامک سیکشن',
      icon: Moon
    },
    {
      screen: 'progress',
      labelEn: 'Progress',
      labelUr: 'کارکردگی',
      icon: BarChart3
    },
    {
      screen: 'library',
      labelEn: 'Library',
      labelUr: 'لائبریری',
      icon: Bookmark
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-lg mx-auto px-2 flex items-center justify-around h-16">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeScreen === item.screen || 
            (item.screen === 'subjects' && (activeScreen === 'subject_detail' || activeScreen === 'lesson'));

          return (
            <button
              key={item.screen}
              onClick={() => setActiveScreen(item.screen)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all group ${
                isActive 
                  ? 'text-[#0F9D75] dark:text-[#12b385] font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${
                isActive 
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 scale-110 shadow-sm' 
                  : 'group-hover:bg-slate-100 dark:group-hover:bg-slate-800'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight ${
                language === 'ur' ? 'font-urdu leading-tight' : 'font-medium'
              }`}>
                {language === 'ur' ? item.labelUr : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
