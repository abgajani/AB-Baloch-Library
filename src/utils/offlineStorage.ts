import { Lesson, PastPaper } from '../types';

export interface CachedPdfNote {
  id: string;
  titleEn: string;
  titleUr: string;
  subjectId: string;
  board: string;
  year: number;
  totalMarks: number;
  downloadedAt: string;
  fileSizeKb: number;
  content: {
    sectionA: { titleEn: string; titleUr: string; questions: string[] };
    sectionB: { titleEn: string; titleUr: string; questions: string[] };
    detailedSolutionsEn: string;
    detailedSolutionsUr: string;
    formulasOrKeyConcepts: string[];
  };
}

const STORAGE_KEYS = {
  LESSONS: 'ilm_cached_lessons_v1',
  PDF_NOTES: 'ilm_cached_pdf_notes_v1',
  SIMULATED_OFFLINE: 'ilm_simulated_offline',
  LAST_SYNC: 'ilm_offline_last_sync'
};

export const offlineStorage = {
  // Check if simulated offline is active
  isSimulatedOffline(): boolean {
    return localStorage.getItem(STORAGE_KEYS.SIMULATED_OFFLINE) === 'true';
  },

  setSimulatedOffline(status: boolean) {
    localStorage.setItem(STORAGE_KEYS.SIMULATED_OFFLINE, status ? 'true' : 'false');
    window.dispatchEvent(new Event('ilm-connectivity-change'));
  },

  // LESSONS CACHING
  saveLesson(lesson: Lesson) {
    try {
      const existing = this.getAllLessons();
      const updated = {
        ...existing,
        [lesson.id]: {
          ...lesson,
          _cachedAt: new Date().toISOString(),
          _sizeBytes: JSON.stringify(lesson).length
        }
      };
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(updated));
      window.dispatchEvent(new Event('ilm-storage-change'));
      return true;
    } catch (e) {
      console.error('Failed to cache lesson:', e);
      return false;
    }
  },

  removeLesson(lessonId: string) {
    try {
      const existing = this.getAllLessons();
      delete existing[lessonId];
      localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(existing));
      window.dispatchEvent(new Event('ilm-storage-change'));
      return true;
    } catch (e) {
      return false;
    }
  },

  isLessonCached(lessonId: string): boolean {
    const existing = this.getAllLessons();
    return !!existing[lessonId];
  },

  getLesson(lessonId: string): Lesson | null {
    const existing = this.getAllLessons();
    return existing[lessonId] || null;
  },

  getAllLessons(): Record<string, Lesson> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.LESSONS);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  },

  // PDF NOTES & PAST PAPERS CACHING
  savePdfNote(note: CachedPdfNote) {
    try {
      const existing = this.getAllPdfNotes();
      const updated = {
        ...existing,
        [note.id]: note
      };
      localStorage.setItem(STORAGE_KEYS.PDF_NOTES, JSON.stringify(updated));
      window.dispatchEvent(new Event('ilm-storage-change'));
      return true;
    } catch (e) {
      console.error('Failed to cache PDF note:', e);
      return false;
    }
  },

  removePdfNote(noteId: string) {
    try {
      const existing = this.getAllPdfNotes();
      delete existing[noteId];
      localStorage.setItem(STORAGE_KEYS.PDF_NOTES, JSON.stringify(existing));
      window.dispatchEvent(new Event('ilm-storage-change'));
      return true;
    } catch (e) {
      return false;
    }
  },

  isPdfNoteCached(noteId: string): boolean {
    const existing = this.getAllPdfNotes();
    return !!existing[noteId];
  },

  getPdfNote(noteId: string): CachedPdfNote | null {
    const existing = this.getAllPdfNotes();
    return existing[noteId] || null;
  },

  getAllPdfNotes(): Record<string, CachedPdfNote> {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.PDF_NOTES);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  },

  // STORAGE USAGE
  getStorageUsage() {
    let totalBytes = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('ilm_')) {
          const val = localStorage.getItem(key) || '';
          totalBytes += (key.length + val.length) * 2; // UTF-16 approximate
        }
      }
    } catch (e) {
      totalBytes = 0;
    }

    const lessonsCount = Object.keys(this.getAllLessons()).length;
    const notesCount = Object.keys(this.getAllPdfNotes()).length;

    // Convert to human-readable format
    const totalKb = Math.max(12, Math.round(totalBytes / 1024) + (lessonsCount * 140) + (notesCount * 320));
    const totalMb = (totalKb / 1024).toFixed(2);

    return {
      totalKb,
      totalMb,
      lessonsCount,
      notesCount
    };
  },

  clearAll() {
    localStorage.removeItem(STORAGE_KEYS.LESSONS);
    localStorage.removeItem(STORAGE_KEYS.PDF_NOTES);
    window.dispatchEvent(new Event('ilm-storage-change'));
  }
};
