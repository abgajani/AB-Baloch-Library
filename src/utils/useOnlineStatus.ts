import { useEffect, useState } from 'react';
import { offlineStorage } from './offlineStorage';

export function useOnlineStatus() {
  const [isBrowserOnline, setIsBrowserOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(
    offlineStorage.isSimulatedOffline()
  );

  useEffect(() => {
    const handleOnline = () => setIsBrowserOnline(true);
    const handleOffline = () => setIsBrowserOnline(false);
    const handleConnectivity = () => {
      setIsSimulatedOffline(offlineStorage.isSimulatedOffline());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('ilm-connectivity-change', handleConnectivity);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('ilm-connectivity-change', handleConnectivity);
    };
  }, []);

  const effectiveIsOnline = isBrowserOnline && !isSimulatedOffline;

  return {
    isOnline: effectiveIsOnline,
    isSimulatedOffline,
    toggleSimulatedOffline: () => {
      const next = !offlineStorage.isSimulatedOffline();
      offlineStorage.setSimulatedOffline(next);
    }
  };
}
