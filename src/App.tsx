/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { OfflineBanner } from './components/OfflineBanner';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { AllSubjectsView } from './components/AllSubjectsView';
import { SubjectView } from './components/SubjectView';
import { LessonView } from './components/LessonView';
import { QuizView } from './components/QuizView';
import { PracticeHub } from './components/PracticeHub';
import { IslamicHub } from './components/IslamicHub';
import { ProgressView } from './components/ProgressView';
import { LibraryView } from './components/LibraryView';
import { AdminPortal } from './components/AdminPortal';
import { OnboardingModal } from './components/OnboardingModal';
import { SettingsModal } from './components/SettingsModal';
import { PremiumModal } from './components/PremiumModal';
import { PdfNotesViewerModal } from './components/PdfNotesViewerModal';

const AppContent: React.FC = () => {
  const { 
    activeScreen, 
    showOnboarding, 
    setShowOnboarding,
    activePdfPaper,
    setActivePdfPaper
  } = useApp();

  return (
    <div className="min-h-screen bg-[#F7F9FB] dark:bg-[#0F1720] text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-[#0F9D75]/20 selection:text-[#0F9D75]">
      {/* Top Sticky Header */}
      <Navbar />

      {/* Offline Status & Connectivity Banner */}
      <OfflineBanner />

      {/* Main App Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-5">
        {activeScreen === 'dashboard' && <Dashboard />}
        {activeScreen === 'subjects' && <AllSubjectsView />}
        {activeScreen === 'subject_detail' && <SubjectView />}
        {activeScreen === 'lesson' && <LessonView />}
        {activeScreen === 'quiz' && <QuizView />}
        {activeScreen === 'practice' && <PracticeHub />}
        {activeScreen === 'islamic' && <IslamicHub />}
        {activeScreen === 'progress' && <ProgressView />}
        {activeScreen === 'library' && <LibraryView />}
        {activeScreen === 'admin' && <AdminPortal />}
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav />

      {/* Modals & Dialogs */}
      <OnboardingModal 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
      <SettingsModal />
      <PremiumModal />
      <PdfNotesViewerModal 
        paper={activePdfPaper}
        onClose={() => setActivePdfPaper(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
