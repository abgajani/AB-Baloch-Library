import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SubjectId, Lesson, Quiz, Question } from '../types';
import { LEADERBOARD_USERS } from '../data/mockData';
import { 
  Users, 
  BarChart3, 
  Upload, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  ArrowLeft,
  Search,
  Filter,
  Check
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    language, 
    subjectsList, 
    chaptersMap, 
    quizzesList, 
    addNewLesson, 
    addNewQuiz,
    setActiveScreen 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'upload' | 'assign' | 'content'>('analytics');

  // New Lesson Form State
  const [targetSubId, setTargetSubId] = useState<SubjectId>('islamiyat');
  const [lessonTitleEn, setLessonTitleEn] = useState('');
  const [lessonTitleUr, setLessonTitleUr] = useState('');
  const [readTime, setReadTime] = useState('8');
  const [lessonContentEn, setLessonContentEn] = useState('');
  const [lessonContentUr, setLessonContentUr] = useState('');
  const [lessonPublished, setLessonPublished] = useState(false);

  // Assign Test Form State
  const [assignedClass, setAssignedClass] = useState('Class 9 (Matric)');
  const [assignedDeadline, setAssignedDeadline] = useState('2026-10-15');
  const [assignedQuizId, setAssignedQuizId] = useState(quizzesList[0]?.id || '');
  const [assignedSuccess, setAssignedSuccess] = useState(false);

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitleEn.trim()) return;

    const chapters = chaptersMap[targetSubId] || [];
    const chapterId = chapters[0]?.id || `${targetSubId}-ch1`;

    const newLesson: Lesson = {
      id: `custom-les-${Date.now()}`,
      subjectId: targetSubId,
      chapterId,
      titleEn: lessonTitleEn,
      titleUr: lessonTitleUr || lessonTitleEn,
      durationEn: `${readTime} mins read`,
      durationUr: `${readTime} منٹ مطالعہ`,
      readTimeMin: parseInt(readTime) || 8,
      audioDurationSec: 180,
      keyPointsEn: ['Important concept introduced by educator', 'Core syllabus alignment for board exams'],
      keyPointsUr: ['اساتذہ کی جانب سے تیار کردہ اہم نصابی نکات', 'امتحانی نقطہ نظر سے انتہائی ضروری'],
      contentEn: lessonContentEn || 'Detailed curriculum study notes provided by teacher.',
      contentUr: lessonContentUr || 'اساتذہ کے تحریر کردہ تفصیلی نوٹس اور اسباق۔',
      summaryEn: 'Summary notes for quick revision.',
      summaryUr: 'تیز رفتار امتحانی دہرائی کے لیے خلاصہ۔'
    };

    addNewLesson(newLesson);
    setLessonPublished(true);
    setLessonTitleEn('');
    setLessonTitleUr('');
    setLessonContentEn('');
    setLessonContentUr('');

    setTimeout(() => setLessonPublished(false), 3000);
  };

  const handleAssignTest = (e: React.FormEvent) => {
    e.preventDefault();
    setAssignedSuccess(true);
    setTimeout(() => setAssignedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'ur' ? 'واپس ڈیش بورڈ' : 'Return to Student Mode'}</span>
        </button>

        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-bold">
          Admin & Teacher Portal
        </span>
      </div>

      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <h1 className="text-2xl font-bold font-heading">
          {language === 'ur' ? 'ایڈمن و اساتذہ مینجمنٹ پینل' : 'Educator & Client Management Tools'}
        </h1>
        <p className="text-xs sm:text-sm text-indigo-200 mt-1 max-w-xl">
          {language === 'ur'
            ? 'نئے اسباق و کوئز شامل کریں، کلاس کے لیے ٹیسٹ مقرر کریں اور طلبہ کی کارکردگی کا جائزہ لیں۔'
            : 'Publish bilingual lessons, assign board mock tests with deadlines, and monitor student completion analytics.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'analytics'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{language === 'ur' ? 'طلبہ رپورٹس و تجزیات' : 'Student Reports & Analytics'}</span>
        </button>

        <button
          onClick={() => setActiveTab('upload')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'upload'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{language === 'ur' ? 'نیا سبق شامل کریں' : 'Upload Lesson'}</span>
        </button>

        <button
          onClick={() => setActiveTab('assign')}
          className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'assign'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{language === 'ur' ? 'ٹیسٹ تفویض کریں' : 'Assign Tests'}</span>
        </button>
      </div>

      {/* TAB 1: STUDENT REPORTS & ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Key KPI Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-xs text-slate-400 font-medium">Total Registered Students</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">1,248</div>
              <span className="text-[10px] text-emerald-600 font-bold">+18% this month</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-xs text-slate-400 font-medium">Average Quiz Pass Rate</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">82.4%</div>
              <span className="text-[10px] text-emerald-600 font-bold">FBISE Syllabus Align</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-xs text-slate-400 font-medium">Active Streaks Today</span>
              <div className="text-2xl font-extrabold text-amber-500 mt-1">840 🔥</div>
              <span className="text-[10px] text-slate-400">67% daily retention</span>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="text-xs text-slate-400 font-medium">Total Solved Past Papers</span>
              <div className="text-2xl font-extrabold text-indigo-600 mt-1">5,820</div>
              <span className="text-[10px] text-slate-400">2024 Exam season</span>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'ur' ? 'طلبہ کی کارکردگی کی فہرست' : 'Student Performance Roster'}
              </h3>
              <span className="text-xs text-slate-400">Class 9 Matric Section A</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-3 rounded-l-xl">Student Name</th>
                    <th className="p-3">Class</th>
                    <th className="p-3">Avg Score</th>
                    <th className="p-3">Streak</th>
                    <th className="p-3 rounded-r-xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {LEADERBOARD_USERS.map(s => (
                    <tr key={s.rank} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                      <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <img src={s.avatar} alt={s.name} className="w-7 h-7 rounded-full object-cover" />
                        <span>{s.name}</span>
                      </td>
                      <td className="p-3 text-slate-500">Class 9</td>
                      <td className="p-3 font-mono font-bold text-emerald-600">{85 + (s.rank * 2)}%</td>
                      <td className="p-3 font-bold text-amber-600">{s.streak} Days</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UPLOAD LESSON */}
      {activeTab === 'upload' && (
        <form onSubmit={handleCreateLesson} className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {language === 'ur' ? 'نیا سبق اور مواد شائع کریں' : 'Publish New Bilingual Lesson'}
            </h3>
            <p className="text-xs text-slate-400">Content will be instantly available to students in curriculum</p>
          </div>

          {lessonPublished && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Lesson successfully published to syllabus!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target Subject
              </label>
              <select
                value={targetSubId}
                onChange={e => setTargetSubId(e.target.value as SubjectId)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
              >
                {subjectsList.map(s => (
                  <option key={s.id} value={s.id}>{s.nameEn} ({s.nameUr})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Estimated Reading Time (Minutes)
              </label>
              <input
                type="number"
                value={readTime}
                onChange={e => setReadTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Title (English)
              </label>
              <input
                type="text"
                required
                value={lessonTitleEn}
                onChange={e => setLessonTitleEn(e.target.value)}
                placeholder="e.g. Fundamental Rights in Constitution"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Title (اردو میں عنوان)
              </label>
              <input
                type="text"
                value={lessonTitleUr}
                onChange={e => setLessonTitleUr(e.target.value)}
                placeholder="مثلاً: آئین پاکستان میں بنیادی حقوق"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none font-urdu"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Lesson Content (English)
            </label>
            <textarea
              rows={4}
              value={lessonContentEn}
              onChange={e => setLessonContentEn(e.target.value)}
              placeholder="Write detailed lesson explanations..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              سبق کا تفصیلی متن (اردو نستعلیق)
            </label>
            <textarea
              rows={4}
              value={lessonContentUr}
              onChange={e => setLessonContentUr(e.target.value)}
              placeholder="اردو میں سبق کا مواد تحریر کریں..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none font-urdu"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/25 flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4" />
              <span>Publish Lesson to Database</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: ASSIGN TESTS */}
      {activeTab === 'assign' && (
        <form onSubmit={handleAssignTest} className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4 max-w-xl">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {language === 'ur' ? 'کلاس کے لیے ٹیسٹ اور ڈیڈ لائن مقرر کریں' : 'Assign Test to Class'}
            </h3>
            <p className="text-xs text-slate-400">Students will receive a push notification reminder</p>
          </div>

          {assignedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Test assigned to {assignedClass} with deadline {assignedDeadline}!</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Target Class
            </label>
            <select
              value={assignedClass}
              onChange={e => setAssignedClass(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
            >
              <option>Class 9 (Matric)</option>
              <option>Class 10 (Matric)</option>
              <option>Class 11 (FSc-I)</option>
              <option>Class 12 (FSc-II)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Quiz / Past Paper
            </label>
            <select
              value={assignedQuizId}
              onChange={e => setAssignedQuizId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
            >
              {quizzesList.map(q => (
                <option key={q.id} value={q.id}>{q.titleEn}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Submission Deadline
            </label>
            <input
              type="date"
              value={assignedDeadline}
              onChange={e => setAssignedDeadline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/25 flex items-center justify-center gap-1.5"
          >
            <span>Assign Test & Notify Students</span>
          </button>
        </form>
      )}
    </div>
  );
};
