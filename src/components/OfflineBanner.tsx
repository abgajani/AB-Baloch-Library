import React, { useState, useEffect } from 'react';
import { useOnlineStatus } from '../utils/useOnlineStatus';
import { useApp } from '../context/AppContext';
import { offlineStorage } from '../utils/offlineStorage';
import { 
  WifiOff, 
  Wifi, 
  HardDrive, 
  Download, 
  Check, 
  Info,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isOnline, isSimulatedOffline, toggleSimulatedOffline } = useOnlineStatus();
  const { language, setActiveScreen } = useApp();
  const [stats, setStats] = useState(offlineStorage.getStorageUsage());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setStats(offlineStorage.getStorageUsage());
    };
    window.addEventListener('ilm-storage-change', handleStorageUpdate);
    return () => window.removeEventListener('ilm-storage-change', handleStorageUpdate);
  }, []);

  return (
    <div className="bg-slate-900 text-white text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
      <div className="flex items-center gap-2">
        {!isOnline ? (
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
            <WifiOff className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>{language === 'ur' ? 'آف لائن موڈ فعال ہے' : 'Offline Mode Active'}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5" />
            <span className="text-[11px] font-semibold">{language === 'ur' ? 'آن لائن • سروس ورکر فعال' : 'Online • Service Worker Active'}</span>
          </div>
        )}

        <span className="text-slate-400 hidden sm:inline">•</span>

        <span className="text-slate-300 hidden sm:inline flex items-center gap-1">
          <HardDrive className="w-3 h-3 text-blue-400" />
          <span>{stats.lessonsCount} lessons & {stats.notesCount} PDF notes cached offline</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* Offline simulator toggle */}
        <button
          onClick={toggleSimulatedOffline}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
            isSimulatedOffline
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
          }`}
          title="Toggle simulated offline mode to test reading without internet"
        >
          {isSimulatedOffline ? (
            <span className="flex items-center gap-1">
              <WifiOff className="w-3 h-3" />
              <span>{language === 'ur' ? 'آف لائن آزمائیں (فعال)' : 'Testing Offline'}</span>
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              <span>{language === 'ur' ? 'آف لائن موڈ ٹیسٹ کریں' : 'Test Offline Mode'}</span>
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveScreen('library')}
          className="text-[11px] text-emerald-400 hover:underline font-semibold"
        >
          {language === 'ur' ? 'ڈاؤنلوڈز دیکھیں' : 'View Cached'} →
        </button>
      </div>
    </div>
  );
};
