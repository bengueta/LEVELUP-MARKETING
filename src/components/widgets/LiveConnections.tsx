'use client';

import { useEffect, useRef, useState } from 'react';

const livePeople = [
  { name: 'גיא', location: 'ת\"א', action: 'חיצה על "דבר איתנו"' },
  { name: 'שירה', location: 'חיפה', action: 'צפתה בדשבורד' },
  { name: 'אורי', location: 'באר שבע', action: 'שאלת שאלה בצ\'אט' },
  { name: 'ליה', location: 'רמת גן', action: 'שלחה טופס הבקשה' },
  { name: 'דוד', location: 'נתניה', action: 'חיבר שיחת זום' },
  { name: 'נועה', location: 'ראשון', action: 'התעדכנה בתוכנית' },
];

interface ConnectionNotification {
  id: number;
  name: string;
  location: string;
  action: string;
}

export default function LiveConnections() {
  const [connectedCount, setConnectedCount] = useState(() => Math.floor(Math.random() * (38 - 7 + 1)) + 7);
  const [notification, setNotification] = useState<ConnectionNotification | null>(null);
  const notificationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = (person: ConnectionNotification) => {
    setNotification(person);
    if (notificationTimer.current) clearTimeout(notificationTimer.current);
    notificationTimer.current = setTimeout(() => setNotification(null), 3200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectedCount(prev => {
        const direction = Math.random() < 0.75 ? 1 : -1;
        const next = Math.min(38, Math.max(7, prev + direction));
        if (direction > 0 && next > prev) {
          const randomPerson = livePeople[Math.floor(Math.random() * livePeople.length)];
          showNotification({
            id: Date.now(),
            name: randomPerson.name,
            location: randomPerson.location,
            action: randomPerson.action,
          });
        }
        return next;
      });
    }, 6500);

    const drift = setInterval(() => {
      setConnectedCount(prev => Math.max(7, prev - (Math.random() < 0.4 ? 1 : 0)));
    }, 11000);

    return () => {
      clearInterval(interval);
      clearInterval(drift);
      if (notificationTimer.current) clearTimeout(notificationTimer.current);
    };
  }, []);

  return (
    <div className="relative inline-flex flex-col gap-2">
      <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-xs font-semibold uppercase tracking-[2px] rounded-full border border-purple-500/40 text-[#cbd5f5]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          כמה מחוברים עכשיו?
        </span>
        <span className="text-white text-base font-black ml-2">{connectedCount}</span>
        <span className="text-[0.6rem] text-[#a1a1aa] flex-1 text-left">Live Dashboard · עדכון איטי וקבוע</span>
      </div>

      {notification && (
        <div
          className="absolute -bottom-14 right-0 w-full max-w-sm bg-black/70 border border-white/10 glass-effect-2 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 text-sm text-white shadow-2xl animate-slideUp"
          style={{ zIndex: 10 }}
        >
          <div className="flex items-center gap-2 text-[#a5f3fc] font-semibold">
            <span className="text-xs font-bold text-emerald-400">+1</span>
            {notification.name} • {notification.location}
          </div>
          <span className="text-[0.75rem] text-[#cbd5f5]">{notification.action}</span>
        </div>
      )}
    </div>
  );
}


