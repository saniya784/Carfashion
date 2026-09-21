import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { safeParse, setStorage } from '@/utils/storage';

// ---- 1. Sensible defaults so useApp() never returns undefined ----
const DEFAULT_SEARCH_PREFS = {
  location: 'Bhopal, Madhya Pradesh',
  pickup: '',
  return: '',
};

const DEFAULT_CONTEXT = {
  favorites: [],
  toggleFavorite: () => {},
  compare: [],
  toggleCompare: () => {},
  setCompare: () => {},
  bookings: [],
  addBooking: () => {},
  recentlyViewed: [],
  addRecentlyViewed: () => {},
  searchPrefs: DEFAULT_SEARCH_PREFS,
  saveSearchPrefs: () => {},
  theme: 'light',
  toggleTheme: () => {},
  toasts: [],
  addToast: () => {},
  passport: { trips: 0, km: 0, savings: 0, points: 0 },
};

const AppContext = createContext(DEFAULT_CONTEXT);

export function AppProvider({ children }) {
  const [favorites, setFavorites] = useState(() => safeParse('cf_favorites', []) ?? []);
  const [bookings, setBookings] = useState(() => safeParse('cf_bookings', []) ?? []);
  const [compare, setCompare] = useState(() => safeParse('cf_compare', []) ?? []);
  const [recentlyViewed, setRecentlyViewed] = useState(() => safeParse('cf_recent', []) ?? []);

  // ---- 2. Hardened searchPrefs with guaranteed fallback ----
  const [searchPrefs, setSearchPrefs] = useState(() => {
    const parsed = safeParse('cf_search_preferences', null);
    if (parsed && typeof parsed === 'object' && parsed.location !== undefined) {
      return { ...DEFAULT_SEARCH_PREFS, ...parsed };
    }
    return DEFAULT_SEARCH_PREFS;
  });

  const [theme, setTheme] = useState(() => safeParse('cf_theme', 'light') ?? 'light');
  const [toasts, setToasts] = useState([]);

  const [passport, setPassport] = useState(() => {
    const parsed = safeParse('cf_passport', null);
    return parsed ?? { trips: 0, km: 0, savings: 0, points: 0 };
  });

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    setStorage('cf_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3400);
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const isRemoving = prev.includes(id);
      const next = isRemoving ? prev.filter((f) => f !== id) : [...prev, id];
      setStorage('cf_favorites', next);
      addToast(
        isRemoving ? 'Removed from favorites' : 'Added to favorites ❤️',
        isRemoving ? 'info' : 'success'
      );
      return next;
    });
  }, [addToast]);

  const toggleCompare = useCallback((id) => {
    setCompare((prev) => {
      if (prev.includes(id)) {
        const next = prev.filter((c) => c !== id);
        setStorage('cf_compare', next);
        return next;
      }
      if (prev.length >= 3) {
        addToast('You can compare up to 3 cars', 'error');
        return prev;
      }
      const next = [...prev, id];
      setStorage('cf_compare', next);
      addToast('Added to compare', 'success');
      return next;
    });
  }, [addToast]);

  const addRecentlyViewed = useCallback((id) => {
    setRecentlyViewed((prev) => {
      const next = [id, ...prev.filter((r) => r !== id)].slice(0, 5);
      setStorage('cf_recent', next);
      return next;
    });
  }, []);

  const saveSearchPrefs = useCallback((prefs) => {
    const merged = { ...DEFAULT_SEARCH_PREFS, ...prefs };
    setSearchPrefs(merged);
    setStorage('cf_search_preferences', merged);
  }, []);

  const addBooking = useCallback((booking) => {
    setBookings((prev) => {
      const next = [...prev, booking];
      setStorage('cf_bookings', next);
      setPassport((p) => {
        const np = {
          trips: (p.trips || 0) + 1,
          km: (p.km || 0) + (booking.days || 1) * 150,
          savings: (p.savings || 0) + Math.round(booking.total * 0.05),
          points: (p.points || 0) + Math.round(booking.total / 10),
        };
        setStorage('cf_passport', np);
        return np;
      });
      return next;
    });
  }, []);

  const value = {
    favorites, toggleFavorite,
    compare, toggleCompare, setCompare,
    bookings, addBooking,
    recentlyViewed, addRecentlyViewed,
    searchPrefs, saveSearchPrefs,
    theme, toggleTheme,
    toasts, addToast,
    passport,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ---- 3. useApp with a safety fallback ----
export function useApp() {
  const ctx = useContext(AppContext);
  // Return default context if provider missing — never return undefined
  return ctx ?? DEFAULT_CONTEXT;
}