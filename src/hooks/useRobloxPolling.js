// src/hooks/useRobloxPolling.js
import { useEffect, useRef } from 'react';

const useRobloxPolling = (setNotifications) => {
  const seenIds = useRef(new Set());

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('http://localhost:5000/notifications');
        const data = await res.json();

        const incoming = data.notifications || [];

        const newOnes = incoming.filter((n) => {
          const uniqueId = n.id || `${n.timestamp}-${n.content}`;
          if (seenIds.current.has(uniqueId)) return false;
          seenIds.current.add(uniqueId);
          return true;
        });

        if (newOnes.length > 0) {
          setNotifications((prev) => [...newOnes, ...prev]);
        }
      } catch (err) {
        console.error('[Polling Error]', err);
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [setNotifications]);
};

export default useRobloxPolling;
