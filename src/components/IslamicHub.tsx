import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DUAS_DATA, QURAN_SURAHS, SEERAH_STORIES } from '../data/mockData';
import { DuaItem, QuranSurah, SeerahStory } from '../types';
import { 
  Moon, 
  Sparkles, 
  Volume2, 
  Play, 
  Pause, 
  BookOpen, 
  Heart, 
  Share2, 
  Check, 
  Award, 
  Clock, 
  ChevronRight,
  Bookmark
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const IslamicHub: React.FC = () => {
  const { language, addXP } = useApp();
  const [activeSection, setActiveSection] = useState<'duas' | 'quran' | 'seerah'>('duas');
  
  // Audio state
  const [activeAudioDuaId, setActiveAudioDuaId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);

  // Selected Surah
  const [selectedSurah, setSelectedSurah] = useState<QuranSurah>(QURAN_SURAHS[0]);
  
  // Selected Seerah Story
  const [selectedStory, setSelectedStory] = useState<SeerahStory | null>(null);

  // Audio simulator
  useEffect(() => {
    let interval: any;
    if (activeAudioDuaId) {
      interval = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setActiveAudioDuaId(null);
            return 0;
          }
          return prev + 5;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [activeAudioDuaId]);

  const handleToggleAudio = (id: string) => {
    if (activeAudioDuaId === id) {
      setActiveAudioDuaId(null);
    } else {
      setActiveAudioDuaId(id);
      setAudioProgress(0);
      addXP(10);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Header with Emerald Arabesque Motif */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F9D75] via-[#0c7a5c] to-[#1B2A49] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold">
              <Moon className="w-3.5 h-3.5 fill-current" />
              <span>{language === 'ur' ? 'روحانی و قرآنی تربیت' : 'Islamic Spiritual Essentials'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
              {language === 'ur' ? 'اسلامک سیکشن و مسنون دعائیں' : 'Islamic Hub & Masnoon Duas'}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
              {language === 'ur'
                ? 'علم میں برکت کے لیے روزانہ مسنون دعائیں سنیں، قرآن مجید کی تجوید اور سیرتِ طیبہ کا مطالعہ کریں۔'
                : 'Enrich your study journey with daily authenticated Duas, Quranic recitation, and life lessons from the Seerah of the Prophet (PBUH).'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-[160px]">
            <span className="text-[11px] text-emerald-200 font-medium block">
              {language === 'ur' ? 'روزانہ کی دعا' : 'Daily Dua Reward'}
            </span>
            <span className="text-xl font-bold font-arabic text-amber-300">رَّبِّ زِدْنِي عِلْمًا</span>
            <span className="text-[10px] text-white/80 block mt-1">+10 XP per listening</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-1">
        <button
          onClick={() => { setActiveSection('duas'); setSelectedStory(null); }}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeSection === 'duas' && !selectedStory
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{language === 'ur' ? 'مسنون دعائیں' : 'Masnoon Duas'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700">
            {DUAS_DATA.length}
          </span>
        </button>

        <button
          onClick={() => { setActiveSection('quran'); setSelectedStory(null); }}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeSection === 'quran' && !selectedStory
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>{language === 'ur' ? 'قرآن و تجوید' : 'Quran Basics'}</span>
        </button>

        <button
          onClick={() => { setActiveSection('seerah'); setSelectedStory(null); }}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeSection === 'seerah' || selectedStory
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Moon className="w-4 h-4 text-purple-600" />
          <span>{language === 'ur' ? 'سیرت النبیﷺ' : 'Seerah Stories'}</span>
        </button>
      </div>

      {/* SECTION 1: MASNOON DUAS */}
      {activeSection === 'duas' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DUAS_DATA.map(dua => {
              const isPlaying = activeAudioDuaId === dua.id;
              return (
                <div 
                  key={dua.id}
                  className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {language === 'ur' ? dua.titleUr : dua.titleEn}
                      </span>
                      <span className="font-mono text-[11px]">{dua.reference}</span>
                    </div>

                    {/* Arabic Text with Naskh/Nastaliq */}
                    <div className="py-4 my-2 text-center bg-emerald-50/40 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
                      <p className="font-arabic text-xl sm:text-2xl font-bold text-slate-900 dark:text-emerald-100 leading-[2.2] px-4">
                        {dua.arabicText}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-2 px-4">
                        "{dua.transliteration}"
                      </p>
                    </div>

                    {/* Translation */}
                    <div className="my-3 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {language === 'ur' ? dua.translationUr : dua.translationEn}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                        ✨ {language === 'ur' ? dua.benefitUr : dua.benefitEn}
                      </div>
                    </div>
                  </div>

                  {/* Audio Recitation Player for Dua */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleToggleAudio(dua.id)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>{language === 'ur' ? 'روکیں' : 'Pause'}</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{language === 'ur' ? 'تلاوت سنیں' : 'Listen Recitation'}</span>
                        </>
                      )}
                    </button>

                    {isPlaying && (
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div 
                            className="h-full bg-[#0F9D75] transition-all"
                            style={{ width: `${audioProgress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold">Audio playing</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: QURAN BASICS & SURAHS */}
      {activeSection === 'quran' && (
        <div className="space-y-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {QURAN_SURAHS.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSurah(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedSurah.id === s.id
                    ? 'bg-[#0F9D75] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {s.nameArabic} • {language === 'ur' ? s.nameUr : s.nameEn}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
            <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-700">
              <span className="text-xs uppercase font-bold tracking-widest text-[#0F9D75]">
                {selectedSurah.revelationType} • {selectedSurah.versesCount} Verses
              </span>
              <h2 className="text-2xl font-bold font-arabic text-slate-900 dark:text-white mt-1">
                {selectedSurah.nameArabic}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'ur' ? selectedSurah.nameUr : selectedSurah.nameEn}
              </p>
            </div>

            {/* Verses List */}
            <div className="space-y-6">
              {selectedSurah.verses.map(v => (
                <div 
                  key={v.number}
                  className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center font-bold text-[11px]">
                      {v.number}
                    </span>
                    <button
                      onClick={() => handleToggleAudio(`verse-${v.number}`)}
                      className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-semibold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{language === 'ur' ? 'سنیں' : 'Listen'}</span>
                    </button>
                  </div>

                  <p className="font-arabic text-xl sm:text-2xl text-right font-bold text-slate-900 dark:text-white leading-[2.4]">
                    {v.arabic}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 text-xs space-y-1">
                    <p className="text-slate-500 italic">
                      "{v.transliteration}"
                    </p>
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      {language === 'ur' ? v.ur : v.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: SEERAH STORIES */}
      {(activeSection === 'seerah' || selectedStory) && (
        <div className="space-y-4">
          {!selectedStory ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SEERAH_STORIES.map(story => (
                <div 
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        {language === 'ur' ? story.eraUr : story.eraEn}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3" /> {story.audioDurationMin} min read
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-[#0F9D75] transition-colors mb-2">
                      {language === 'ur' ? story.titleUr : story.titleEn}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {language === 'ur' ? story.contentUr : story.contentEn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-[#0F9D75] font-semibold">
                    <span>{language === 'ur' ? 'مکمل واقعہ پڑھیں' : 'Read Full Story'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 space-y-6">
              <button
                onClick={() => setSelectedStory(null)}
                className="text-xs font-semibold text-[#0F9D75] flex items-center gap-1"
              >
                ← {language === 'ur' ? 'واپس تمام واقعات' : 'Back to Seerah Stories'}
              </button>

              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-purple-600">
                  {language === 'ur' ? selectedStory.eraUr : selectedStory.eraEn}
                </span>
                <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  {language === 'ur' ? selectedStory.titleUr : selectedStory.titleEn}
                </h2>
              </div>

              <div className={`prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line ${
                language === 'ur' ? 'font-urdu text-right text-lg leading-[2.3]' : ''
              }`}>
                {language === 'ur' ? selectedStory.contentUr : selectedStory.contentEn}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs">
                <span className="font-bold text-amber-800 dark:text-amber-200 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {language === 'ur' ? 'حاصلِ سبق اور نصیحت:' : 'Key Moral Lesson:'}
                </span>
                <p className="text-amber-900 dark:text-amber-300">
                  {language === 'ur' ? selectedStory.lessonLearnedUr : selectedStory.lessonLearnedEn}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
