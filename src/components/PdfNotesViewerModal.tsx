import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PastPaper } from '../types';
import { offlineStorage, CachedPdfNote } from '../utils/offlineStorage';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  Check, 
  HardDrive, 
  Share2, 
  BookOpen, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';

interface PdfNotesViewerModalProps {
  paper: PastPaper | null;
  onClose: () => void;
}

export const PdfNotesViewerModal: React.FC<PdfNotesViewerModalProps> = ({ paper, onClose }) => {
  const { language } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!paper) return null;

  const isCached = offlineStorage.isPdfNoteCached(paper.id);

  const handleDownloadOffline = () => {
    const cachedNote: CachedPdfNote = {
      id: paper.id,
      titleEn: paper.titleEn,
      titleUr: paper.titleUr,
      subjectId: paper.subjectId,
      board: paper.board,
      year: paper.year,
      totalMarks: paper.totalMarks,
      downloadedAt: new Date().toLocaleDateString(),
      fileSizeKb: 345,
      content: {
        sectionA: {
          titleEn: 'Section A (Objective & Multiple Choice Questions - 15 Marks)',
          titleUr: 'حصہ اول (معروضی سوالات و کثیر الانتخابی پرچہ - ۱۵ نمبر)',
          questions: [
            '1. Which Surah is known as the Heart of the Quran? [Surah Yasin]',
            '2. The Second Pillar of Islam is: [Salah (Prayer)]',
            '3. In which year was the Treaty of Hudaybiyyah signed? [6 AH / 628 CE]',
            '4. Who is referred to as the Seal of the Prophets? [Prophet Muhammad PBUH]'
          ]
        },
        sectionB: {
          titleEn: 'Section B (Short Answer Questions - 20 Marks)',
          titleUr: 'حصہ دوم (مختصر جوابات کے سوالات - ۲۰ نمبر)',
          questions: [
            'Q1: Explain the importance of honesty in business according to Hadith.',
            'Q2: List the three categories of Tawheed with brief definitions.',
            'Q3: State four rights of neighbors highlighted in Islamic teachings.',
            'Q4: What was the primary motivation behind the migration to Madinah?'
          ]
        },
        detailedSolutionsEn: `### Comprehensive Solved Model Answers:\n\n**Answer to Q1 (Honesty in Business):**\nThe Holy Prophet (PBUH) stated: "The truthful, trustworthy merchant will be with the prophets, the truthful ones, and the martyrs on the Day of Resurrection" (Tirmidhi). Honest commerce eliminates fraud, strengthens societal trust, and brings divine blessings (Barakah) to one's livelihood.\n\n**Answer to Q2 (Categories of Tawheed):**\n1. *Tawheed ar-Ruboobiyyah:* Believing solely in Allah as Creator and Sustainer.\n2. *Tawheed al-Uloohiyyah:* Directing all devotional acts exclusively to Allah.\n3. *Tawheed al-Asma wa-s-Sifat:* Affirming Allah's pristine names without comparison.\n\n**Answer to Section A Objective Keys:**\n1. (C) Surah Yasin  |  2. (A) Salah  |  3. (B) 6 AH  |  4. (D) Prophet Muhammad (PBUH)`,
        detailedSolutionsUr: `### حل شدہ ماڈل جوابات و تفصیلی تشریحات:\n\n**سوال نمبر ۱ کا تفصیلی حل (تجارت میں سچائی کی اہمیت):**\nنبی کریم صلی اللہ علیہ و آلہ وسلم کا ارشادِ مبارک ہے: "سچا اور دیانت دار تاجر قیامت کے روز انبیاء، صدیقین اور شہداء کے ساتھ ہوگا" (ترمذی)۔ اسلام نے ناپ تول میں کمی اور ملاوٹ کی سخت مذمت کی ہے اور دیانت دارانہ روزگار کو عبادت قرار دیا ہے۔\n\n**سوال نمبر ۲ کا حل (توحید کی اقسام):**\n۱. *توحید فی الربوبیت:* اللہ تعالیٰ کو کائنات کا تنہا خالق و مالک ماننا۔\n۲. *توحید فی الالوہیت:* تمام عبادات، دعائیں اور سجدے صرف اللہ کے لیے مخصوص کرنا۔\n۳. *توحید فی الاسماء والصفات:* اللہ تعالیٰ کی تمام صفات کو بے مثل و بے عیب تسلیم کرنا۔`,
        formulasOrKeyConcepts: [
          'FBISE Marking Rubric: 2 marks per accurate point',
          'Include Quranic references and Hadith citations for distinction',
          'Highlight keywords with neat headings'
        ]
      }
    };

    offlineStorage.savePdfNote(cachedNote);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200 space-y-6">
        
        {/* Top Action Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {paper.board} • {paper.year}
                </span>
                {isCached && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Offline Saved
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {language === 'ur' ? paper.titleUr : paper.titleEn}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadOffline}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isCached || downloadSuccess
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-[#0F9D75] hover:bg-[#0c8261] text-white shadow-sm'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Saved to Local Storage!</span>
                </>
              ) : isCached ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Cached Offline</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download for Offline</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button 
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Paper Header Sheet */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 font-serif">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 dark:border-slate-700 pb-2">
            <span>FEDERAL & PROVINCIAL BOARDS OF INTERMEDIATE & SECONDARY EDUCATION</span>
            <span>SSC / MATRIC ANNUAL EXAM</span>
          </div>

          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Subject: {paper.subjectId.toUpperCase()}</span>
            <span>Time Allowed: 2:30 Hours</span>
            <span>Total Marks: {paper.totalMarks}</span>
          </div>
        </div>

        {/* Section A: Objective / Multiple Choice */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Section A (Objective & MCQs - Solved)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="font-bold">1. Heart of the Quran:</span> Surah Yasin (Solved)
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="font-bold">2. Second Pillar of Islam:</span> Salah / Prayers
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="font-bold">3. Treaty of Hudaybiyyah:</span> 6 AH (628 CE)
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="font-bold">4. Seal of the Prophets:</span> Prophet Muhammad (PBUH)
            </div>
          </div>
        </div>

        {/* Section B & Detailed Answers */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0F9D75]" />
            <span>Section B & Model Solutions</span>
          </h3>

          <div className={`p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed ${
            language === 'ur' ? 'font-urdu text-right text-base leading-[2.3]' : ''
          }`}>
            {language === 'ur' 
              ? `### حل شدہ ماڈل جوابات و تفصیلی تشریحات:\n\n**سوال نمبر ۱ کا تفصیلی حل (تجارت میں سچائی کی اہمیت):**\nنبی کریم صلی اللہ علیہ و آلہ وسلم کا ارشادِ مبارک ہے: "سچا اور دیانت دار تاجر قیامت کے روز انبیاء، صدیقین اور شہداء کے ساتھ ہوگا" (ترمذی)۔ اسلام نے ناپ تول میں کمی اور ملاوٹ کی سخت مذمت کی ہے اور دیانت دارانہ روزگار کو عبادت قرار دیا ہے۔\n\n**سوال نمبر ۲ کا حل (توحید کی اقسام):**\n۱. *توحید فی الربوبیت:* اللہ تعالیٰ کو کائنات کا تنہا خالق و مالک ماننا۔\n۲. *توحید فی الالوہیت:* تمام عبادات، دعائیں اور سجدے صرف اللہ کے لیے مخصوص کرنا۔\n۳. *توحید فی الاسماء والصفات:* اللہ تعالیٰ کی تمام صفات کو بے مثل و بے عیب تسلیم کرنا۔`
              : `### Solved Model Answers (Teacher Annotated):\n\n**Answer to Q1 (Honesty in Business):**\nThe Holy Prophet (PBUH) stated: "The truthful, trustworthy merchant will be with the prophets, the truthful ones, and the martyrs on the Day of Resurrection" (Tirmidhi). Honest commerce eliminates fraud, strengthens societal trust, and brings divine barakah to one's sustenance.\n\n**Answer to Q2 (Dimensions of Tawheed):**\n1. *Tawheed ar-Ruboobiyyah:* Believing that Allah alone is Creator, Sovereign, and Sustainer of the cosmos.\n2. *Tawheed al-Uloohiyyah:* Directing all prayers, sacrifices, and worship exclusively to Allah without intermediary.\n3. *Tawheed al-Asma wa-s-Sifat:* Affirming Allah's supreme attributes without dilution or anthropomorphism.`
            }
          </div>
        </div>

        {/* Offline Badge Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-blue-500" />
            <span>Cached in browser LocalStorage & Service Worker</span>
          </span>
          <span className="font-bold text-[#0F9D75]">
            Verified for Offline Examination Study
          </span>
        </div>
      </div>
    </div>
  );
};
