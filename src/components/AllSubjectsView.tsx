import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectId } from '../types';
import { Search, BookOpen, ChevronRight, Layers, Award } from 'lucide-react';

export const AllSubjectsView: React.FC = () => {
  const { subjectsList, language, user, updateUser, setSelectedSubjectId, setActiveScreen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubjects = subjectsList.filter(s => 
    s.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nameUr.includes(searchQuery)
  );

  const handleOpenSubject = (id: SubjectId) => {
    setSelectedSubjectId(id);
    setActiveScreen('subject_detail');
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 dark:text-white">
          {language === 'ur' ? 'تمام نصابی مضامین' : 'All Curriculum Subjects'}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {language === 'ur' 
            ? `${user.classLevel} کے تمام ۷ مضامین، اسباق اور ماڈل پرچے` 
            : `Complete syllabus for ${user.classLevel} with structured lessons & past papers`}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder={language === 'ur' ? 'مضمون یا عنوان تلاش کریں...' : 'Search subjects by name or topic...'}
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-white outline-none focus:border-[#0F9D75] shadow-sm"
        />
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map(sub => (
          <div
            key={sub.id}
            onClick={() => handleOpenSubject(sub.id)}
            className="group bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div 
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: sub.color }}
            />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm"
                  style={{ backgroundColor: `${sub.color}18`, color: sub.color }}
                >
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {sub.totalChapters} {language === 'ur' ? 'ابواب' : 'Chapters'}
                </span>
              </div>

              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white mb-1 group-hover:text-[#0F9D75] transition-colors">
                {language === 'ur' ? sub.nameUr : sub.nameEn}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {language === 'ur' ? sub.descriptionUr : sub.descriptionEn}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                {sub.totalLessons} {language === 'ur' ? 'اسباق' : 'Lessons'}
              </span>

              <span className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1 group-hover:text-[#0F9D75] transition-colors">
                <span>{language === 'ur' ? 'کھولیں' : 'Open'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
