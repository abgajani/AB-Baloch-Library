import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClassLevel, SubjectId } from '../types';
import { PLACEMENT_QUESTIONS } from '../data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  BookOpen, 
  Flame, 
  Award, 
  Phone, 
  Clock, 
  Check, 
  X,
  Languages,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage, user, updateUser, subjectsList } = useApp();

  // Steps: 0: Language, 1: Slides, 2: Auth, 3: Class & Goals, 4: Placement Quiz, 5: Ready!
  const [currentStep, setCurrentStep] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  
  // Auth state
  const [authMethod, setAuthMethod] = useState<'phone' | 'google' | 'guest'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('0300 1234567');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Class & Goals state
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(user.classLevel);
  const [selectedSubs, setSelectedSubs] = useState<SubjectId[]>(user.favoriteSubjects);
  const [dailyGoal, setDailyGoal] = useState<number>(20);

  // Placement quiz state
  const [currentPqIndex, setCurrentPqIndex] = useState(0);
  const [pqAnswers, setPqAnswers] = useState<Record<number, number>>({});
  const [pqSubmitted, setPqSubmitted] = useState(false);
  const [pqScore, setPqScore] = useState(0);

  if (!isOpen) return null;

  const slides = [
    {
      titleEn: 'Interactive Short Lessons & Audio',
      titleUr: 'مختصر اور پرتاثیر اسباق مع تلاوت و آڈیو',
      descEn: 'Master complex concepts across 7 subjects with structured chapter summaries, rich illustrations, and bilingual notes.',
      descUr: 'ساتوں مضامین کے اہم تصورات کو جامع نوٹس، خلاصہ جات اور دو لسانی وضاحت کے ساتھ آسانی سے سمجھیں۔',
      icon: BookOpen,
      color: 'from-[#0F9D75] to-[#12b385]'
    },
    {
      titleEn: 'Smart Practice & Past Papers',
      titleUr: 'سمارٹ کوئز، ماضی کے پرچہ جات اور امتحانی مشق',
      descEn: 'Sharpen your skills with timed chapter tests, board past papers from FBISE & BISE, and instant explanations.',
      descUr: 'بورڈ کے حل شدہ ماڈل پیپرز، وقتی ٹیسٹ اور غلطیوں کی اصلاح کے ساتھ امتحانات میں ۱۰۰٪ کامیابی حاصل کریں۔',
      icon: Flame,
      color: 'from-amber-500 to-orange-500'
    },
    {
      titleEn: 'Streaks, Badges & Islamic Hub',
      titleUr: 'روزانہ کا تسلسل، تمغے اور مسنون دعائیں',
      descEn: 'Stay motivated with daily study streaks, unlock prestigious badges, and nourish your soul with Quran & Duas.',
      descUr: 'روزمرہ مطالعے کے تسلسل سے تمغے جیتیں اور اسلامک سیکشن میں مسنون دعائیں و سیرت کا مطالعہ کریں۔',
      icon: Award,
      color: 'from-purple-600 to-indigo-600'
    }
  ];

  const classLevels: ClassLevel[] = [
    'Class 8',
    'Class 9 (Matric)',
    'Class 10 (Matric)',
    'Class 11 (FSc-I)',
    'Class 12 (FSc-II)',
    'O/A Levels',
    'MDCAT / ECAT'
  ];

  const handleToggleSubject = (subId: SubjectId) => {
    setSelectedSubs(prev => 
      prev.includes(subId) ? prev.filter(id => id !== subId) : [...prev, subId]
    );
  };

  const handleFinishPlacement = () => {
    let score = 0;
    PLACEMENT_QUESTIONS.forEach((q, idx) => {
      if (pqAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    setPqScore(score);
    setPqSubmitted(true);
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleCompleteAll = () => {
    updateUser({
      classLevel: selectedClass,
      favoriteSubjects: selectedSubs,
      dailyGoalMinutes: dailyGoal
    });
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4, 5].map(step => (
              <div 
                key={step} 
                className={`h-1.5 rounded-full transition-all ${
                  step === currentStep 
                    ? 'w-8 bg-[#0F9D75]' 
                    : step < currentStep 
                    ? 'w-4 bg-emerald-300 dark:bg-emerald-800' 
                    : 'w-2 bg-slate-200 dark:bg-slate-700'
                }`} 
              />
            ))}
          </div>

          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 0: LANGUAGE PICK */}
        {currentStep === 0 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-[#0F9D75] flex items-center justify-center shadow-sm">
              <Languages className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white mb-2">
              Welcome to AB Baloch's Library • اے بی بلوچ لائبریری
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
              Please choose your primary learning language. You can change this anytime with a single tap.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setLanguage('en')}
                className={`p-5 rounded-2xl border-2 text-center transition-all ${
                  language === 'en'
                    ? 'border-[#0F9D75] bg-emerald-50/60 dark:bg-emerald-950/30 text-[#0F9D75] shadow-md'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-heading font-bold text-lg mb-1">English</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Standard English Curriculum</div>
              </button>

              <button
                onClick={() => setLanguage('ur')}
                className={`p-5 rounded-2xl border-2 text-center transition-all ${
                  language === 'ur'
                    ? 'border-[#0F9D75] bg-emerald-50/60 dark:bg-emerald-950/30 text-[#0F9D75] shadow-md'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="font-urdu font-bold text-xl mb-1">اردو زبان</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">مکمل اردو نستعلیق رسم الخط</div>
              </button>
            </div>

            <button
              onClick={() => setCurrentStep(1)}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0F9D75]/25 transition-all"
            >
              <span>{language === 'ur' ? 'جاری رکھیں' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 1: ONBOARDING SLIDES */}
        {currentStep === 1 && (
          <div className="text-center py-2">
            <div className="relative overflow-hidden mb-6">
              {slides.map((s, idx) => {
                if (idx !== slideIndex) return null;
                const Icon = s.icon;
                return (
                  <div key={idx} className="animate-in fade-in duration-300">
                    <div className={`w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-lg`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
                      {language === 'ur' ? s.titleUr : s.titleEn}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      {language === 'ur' ? s.descUr : s.descEn}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Slide Dots */}
            <div className="flex justify-center gap-2 mb-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    slideIndex === i ? 'w-6 bg-[#0F9D75]' : 'w-2 bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              {slideIndex > 0 ? (
                <button
                  onClick={() => setSlideIndex(prev => prev - 1)}
                  className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : null}

              {slideIndex < slides.length - 1 ? (
                <button
                  onClick={() => setSlideIndex(prev => prev + 1)}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0F9D75]/25 transition-all"
                >
                  <span>{language === 'ur' ? 'اگلا' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0F9D75]/25 transition-all"
                >
                  <span>{language === 'ur' ? 'اکاؤنٹ بنائیں' : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: AUTH MODAL */}
        {currentStep === 2 && (
          <div className="py-2">
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-1 text-center">
              {language === 'ur' ? 'اے بی بلوچ لائبریری میں شامل ہوں' : "Join AB Baloch's Library"}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 text-center">
              {language === 'ur' 
                ? 'اپنے درجات، اسٹریک اور نتائج کو محفوظ رکھنے کے لیے سائن ان کریں۔' 
                : 'Save your progress, streaks, and quiz results across devices.'}
            </p>

            <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 mb-5">
              <button
                onClick={() => setAuthMethod('phone')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  authMethod === 'phone' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'
                }`}
              >
                {language === 'ur' ? 'فون نمبر / OTP' : 'Phone / OTP'}
              </button>
              <button
                onClick={() => setAuthMethod('google')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  authMethod === 'google' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'
                }`}
              >
                {language === 'ur' ? 'گوگل' : 'Google'}
              </button>
              <button
                onClick={() => setAuthMethod('guest')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  authMethod === 'guest' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500'
                }`}
              >
                {language === 'ur' ? 'مہمان (Guest)' : 'Guest Mode'}
              </button>
            </div>

            {authMethod === 'phone' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {language === 'ur' ? 'پاکستانی موبائل نمبر درج کریں' : 'Mobile Number (Pakistan)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-xs text-slate-400 font-medium">🇵🇰 +92</span>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      placeholder="300 1234567"
                      className="w-full pl-16 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-white outline-none focus:border-[#0F9D75]"
                    />
                  </div>
                </div>

                {otpSent && (
                  <div className="animate-in fade-in duration-200">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {language === 'ur' ? 'چار ہندسی او ٹی پی کوڈ' : '4-Digit Verification Code'}
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpCode}
                      onChange={e => setOtpCode(e.target.value)}
                      placeholder="1 2 3 4"
                      className="w-full text-center tracking-widest text-lg font-bold py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white outline-none focus:border-[#0F9D75]"
                    />
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 text-center">
                      ✓ Demo code: 1234 (sent via SMS)
                    </p>
                  </div>
                )}

                {!otpSent ? (
                  <button
                    onClick={() => { setOtpSent(true); setOtpCode('1234'); }}
                    className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:opacity-95 transition-opacity"
                  >
                    {language === 'ur' ? 'او ٹی پی کوڈ بھیجیں' : 'Send Verification OTP'}
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full py-3 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white font-semibold text-sm transition-all shadow-md shadow-[#0F9D75]/20"
                  >
                    {language === 'ur' ? 'تصدیق کریں اور آگے بڑھیں' : 'Verify & Continue'}
                  </button>
                )}
              </div>
            )}

            {authMethod === 'google' && (
              <div className="text-center py-6 mb-4">
                <button
                  onClick={() => {
                    updateUser({ name: 'Bilal Ahmed', email: 'bilal.ahmed@student.pk' });
                    setCurrentStep(3);
                  }}
                  className="w-full py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.665-5.17 3.665-9.09z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.28 21.42 7.35 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.1z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.28 2.58 1.25 6.58l4.03 3.1c.95-2.83 3.6-4.93 6.72-4.93z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            )}

            {authMethod === 'guest' && (
              <div className="text-center py-4 mb-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  {language === 'ur'
                    ? 'مہمان موڈ میں ڈیٹا صرف اسی ڈیوائس پر محفوظ رہے گا۔'
                    : 'Guest mode stores progress locally in this browser.'}
                </p>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full py-3 rounded-2xl bg-slate-800 text-white font-semibold text-sm hover:bg-slate-700"
                >
                  {language === 'ur' ? 'بطور مہمان شروع کریں' : 'Continue as Guest'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: CLASS LEVEL & FAVORITE SUBJECTS & GOAL */}
        {currentStep === 3 && (
          <div className="py-2">
            <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-1">
              {language === 'ur' ? 'اپنی کلاس اور پسندیدہ مضامین منتخب کریں' : 'Personalize Your Study Plan'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              {language === 'ur' ? 'ہم آپ کے لیے مناسب نصاب اور ٹیسٹ تیار کریں گے۔' : 'Select your grade level and focus areas.'}
            </p>

            {/* Class Level Selector */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ur' ? 'تعلیمی درجہ / کلاس' : 'Class / Grade Level'}
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto p-1">
                {classLevels.map(cls => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                      selectedClass === cls
                        ? 'border-[#0F9D75] bg-emerald-50 dark:bg-emerald-950/40 text-[#0F9D75]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Favorite Subjects */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ur' ? 'اہم مضامین (کم از کم ۲ چنیں)' : 'Focus Subjects (Select 2+)'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {subjectsList.map(s => {
                  const isSelected = selectedSubs.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleToggleSubject(s.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                        isSelected
                          ? 'border-[#0F9D75] bg-emerald-50 dark:bg-emerald-950/50 text-[#0F9D75]'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-[#0F9D75]" />}
                      <span>{language === 'ur' ? s.nameUr : s.nameEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Daily Goal */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ur' ? 'روزانہ مطالعے کا ہدف' : 'Daily Study Goal'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[10, 20, 30].map(mins => (
                  <button
                    key={mins}
                    onClick={() => setDailyGoal(mins)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border flex flex-col items-center justify-center ${
                      dailyGoal === mins
                        ? 'border-[#0F9D75] bg-emerald-50 dark:bg-emerald-950/40 text-[#0F9D75]'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span className="text-sm font-extrabold">{mins} {language === 'ur' ? 'منٹ' : 'mins'}</span>
                    <span className="text-[10px] text-slate-400">{mins === 10 ? 'Casual' : mins === 20 ? 'Recommended' : 'Intense'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentStep(4)}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0F9D75]/25 transition-all text-sm"
              >
                <span>{language === 'ur' ? 'مختصر ٹیسٹ لیں (۵ سوالات)' : 'Take 5-Q Placement Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={handleCompleteAll}
                className="py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                {language === 'ur' ? 'چھوڑیں' : 'Skip'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: 5-QUESTION PLACEMENT QUIZ */}
        {currentStep === 4 && (
          <div className="py-2">
            {!pqSubmitted ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F9D75]">
                    {PLACEMENT_QUESTIONS[currentPqIndex].subject}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Question {currentPqIndex + 1} of {PLACEMENT_QUESTIONS.length}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  {language === 'ur'
                    ? PLACEMENT_QUESTIONS[currentPqIndex].questionUr
                    : PLACEMENT_QUESTIONS[currentPqIndex].questionEn}
                </h4>

                <div className="space-y-2.5 mb-6">
                  {(language === 'ur'
                    ? PLACEMENT_QUESTIONS[currentPqIndex].optionsUr
                    : PLACEMENT_QUESTIONS[currentPqIndex].optionsEn
                  ).map((opt, oIdx) => {
                    const isSelected = pqAnswers[currentPqIndex] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => setPqAnswers(prev => ({ ...prev, [currentPqIndex]: oIdx }))}
                        className={`w-full p-3.5 rounded-2xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#0F9D75] bg-emerald-50 dark:bg-emerald-950/40 text-[#0F9D75] font-semibold'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <CheckCircle className="w-4 h-4 text-[#0F9D75]" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    disabled={currentPqIndex === 0}
                    onClick={() => setCurrentPqIndex(prev => prev - 1)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 disabled:opacity-40"
                  >
                    {language === 'ur' ? 'پچھلا' : 'Previous'}
                  </button>

                  {currentPqIndex < PLACEMENT_QUESTIONS.length - 1 ? (
                    <button
                      onClick={() => setCurrentPqIndex(prev => prev + 1)}
                      className="px-6 py-2.5 rounded-xl bg-[#0F9D75] text-white text-xs font-semibold shadow-md"
                    >
                      {language === 'ur' ? 'اگلا سوال' : 'Next Question'}
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishPlacement}
                      className="px-6 py-2.5 rounded-xl bg-[#0F9D75] text-white text-xs font-semibold shadow-md"
                    >
                      {language === 'ur' ? 'نتیجہ دیکھیں' : 'Submit & View Level'}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-emerald-100 text-[#0F9D75] flex items-center justify-center text-2xl font-bold">
                  {pqScore} / 5
                </div>
                <h4 className="text-xl font-bold font-heading text-slate-900 dark:text-white mb-2">
                  {pqScore >= 4 
                    ? (language === 'ur' ? 'شاندار آغاز! (Advanced)' : 'Outstanding Start! (Advanced)') 
                    : (language === 'ur' ? 'بہترین بنیاد! (Intermediate)' : 'Solid Foundation! (Intermediate)')}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                  {language === 'ur'
                    ? `آپ کا تعلیمی خاکہ تیار کر لیا گیا ہے۔ ہم آپ کو روزانہ کے اہداف اور مضامین کی رہنمائی فراہم کریں گے۔`
                    : `We tailored your dashboard for ${selectedClass} with ${dailyGoal} mins daily study.`}
                </p>

                <button
                  onClick={handleCompleteAll}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#0F9D75] hover:bg-[#0c8261] text-white font-semibold shadow-lg shadow-[#0F9D75]/25 text-sm"
                >
                  {language === 'ur' ? 'ڈیش بورڈ پر جائیں' : 'Enter Dashboard'}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
