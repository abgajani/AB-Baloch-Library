import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_QUIZZES, PAST_PAPERS, CHAPTERS_DATA } from '../data/mockData';
import { 
  Bookmark, 
  Download, 
  FileText, 
  Trash2, 
  HardDrive, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2,
  Share2
} from 'lucide-react';

export const LibraryView: React.FC = () => {
  const { 
    language, 
    user, 
    toggleDownloadItem, 
    toggleBookmarkLesson, 
    toggleBookmarkQuestion,
    setSelectedSubjectId,
    setSelectedChapter,
    setSelectedLesson,
    setActiveScreen,
    setActivePdfPaper
  } = useApp();

  const [activeTab, setActiveTab] = useState<'downloads' | 'bookmarks' | 'pastpapers'>('downloads');

  // Filter downloaded chapters
  const allChapters = Object.values(CHAPTERS_DATA).flat();
  const downloadedChapters = allChapters.filter(ch => user.downloadedItemIds.includes(ch.id));

  // Filter bookmarked lessons
  const allLessons = allChapters.flatMap(ch => ch.lessons);
  const bookmarkedLessons = allLessons.filter(l => user.bookmarkedLessonIds.includes(l.id));

  // Storage calculation simulation
  const usedStorageMB = (user.downloadedItemIds.length * 14.5).toFixed(1);

  const handleOpenLesson = (les: any) => {
    const parentCh = allChapters.find(ch => ch.id === les.chapterId) || allChapters[0];
    setSelectedSubjectId(les.subjectId);
    setSelectedChapter(parentCh);
    setSelectedLesson(les);
    setActiveScreen('lesson');
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
          {language === 'ur' ? 'ذاتی لائبریری و ڈاؤنلوڈز' : 'My Library & Offline Downloads'}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {language === 'ur' 
            ? 'آف لائن مطالعے کے لیے محفوظ شدہ مواد اور پسندیدہ اسباق۔' 
            : 'Access saved chapters offline without internet and view bookmarked topics.'}
        </p>
      </div>

      {/* Offline Storage Meter */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{language === 'ur' ? 'مقامی ڈیوائس اسٹوریج' : 'Device Offline Storage'}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                Offline Ready
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {usedStorageMB} MB used of 500 MB allocated offline cache
            </div>
          </div>
        </div>

        <div className="w-full sm:w-48 space-y-1">
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${Math.min(100, (parseFloat(usedStorageMB) / 500) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>{user.downloadedItemIds.length} items offline</span>
            <span>Free: {(500 - parseFloat(usedStorageMB)).toFixed(0)} MB</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('downloads')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'downloads'
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>{language === 'ur' ? 'ڈاؤنلوڈ شدہ اسباق' : 'Downloaded Chapters'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700">
            {downloadedChapters.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'bookmarks'
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bookmark className="w-4 h-4 text-amber-500" />
          <span>{language === 'ur' ? 'محفوظ کردہ اسباق' : 'Bookmarked Lessons'}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-700">
            {bookmarkedLessons.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('pastpapers')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'pastpapers'
              ? 'border-[#0F9D75] text-[#0F9D75] bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-500" />
          <span>{language === 'ur' ? 'ماضی کے پرچے' : 'Saved Past Papers'}</span>
        </button>
      </div>

      {/* TAB 1: DOWNLOADS */}
      {activeTab === 'downloads' && (
        <div className="space-y-3">
          {downloadedChapters.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
              <Download className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                {language === 'ur' ? 'کوئی مواد ڈاؤنلوڈ نہیں ہوا' : 'No chapters saved for offline study'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                {language === 'ur'
                  ? 'بغیر انٹرنیٹ پڑھنے کے لیے کسی بھی باب پر ڈاؤنلوڈ کا بٹن دبائیں۔'
                  : 'Tap the download icon on any chapter or past paper to study even with no Wi-Fi.'}
              </p>
            </div>
          ) : (
            downloadedChapters.map(ch => (
              <div 
                key={ch.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#0F9D75] uppercase">
                    Chapter {ch.number} • {ch.subjectId.toUpperCase()}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {language === 'ur' ? ch.titleUr : ch.titleEn}
                  </h4>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                    <span>{ch.lessons.length} lessons included</span>
                    <span>•</span>
                    <span>~14.5 MB</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (ch.lessons.length > 0) handleOpenLesson(ch.lessons[0]);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#0F9D75] text-white text-xs font-semibold hover:bg-[#0c8261]"
                  >
                    {language === 'ur' ? 'پڑھیں' : 'Read'}
                  </button>

                  <button
                    onClick={() => toggleDownloadItem(ch.id)}
                    className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Remove from offline"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarkedLessons.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
              <Bookmark className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
              <h3 className="font-bold text-sm text-slate-800 dark:text-white">
                {language === 'ur' ? 'کوئی سبق محفوظ نہیں کیا گیا' : 'No bookmarked lessons yet'}
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                {language === 'ur'
                  ? 'سبق پڑھتے ہوئے اوپر دیے گئے بُک مارک بٹن پر کلک کریں تاکہ وہ یہاں محفوظ رہے۔'
                  : 'Bookmark key lessons while reading to quickly return to them here.'}
              </p>
            </div>
          ) : (
            bookmarkedLessons.map(les => (
              <div 
                key={les.id}
                onClick={() => handleOpenLesson(les)}
                className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-4 cursor-pointer hover:border-emerald-300 transition-all"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#0F9D75] uppercase">
                    {les.subjectId}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {language === 'ur' ? les.titleUr : les.titleEn}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {les.readTimeMin} min read
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmarkLesson(les.id);
                    }}
                    className="p-1.5 rounded-xl text-amber-500 hover:bg-amber-50"
                  >
                    <Bookmark className="w-4 h-4 fill-amber-500" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: PAST PAPERS */}
      {activeTab === 'pastpapers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PAST_PAPERS.map(paper => (
            <div 
              key={paper.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {paper.board} • {paper.year}
                </span>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1 mb-2">
                  {language === 'ur' ? paper.titleUr : paper.titleEn}
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {paper.totalMarks} Marks • Solved Past Exam
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> PDF Ready
                </span>
                <button
                  onClick={() => setActivePdfPaper(paper)}
                  className="px-3 py-1.5 rounded-xl bg-[#0F9D75] hover:bg-[#0c8261] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'پرچہ کھولیں' : 'Open Solved PDF'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
