import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { safeParse, setStorage } from '@/utils/storage';
import { hashPassword, generateAvatar, generateId } from '@/utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => safeParse('cf_users', []));
  const [currentUser, setCurrentUser] = useState(() => safeParse('cf_current_user', null));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStorage('cf_users', users);
  }, [users]);

  useEffect(() => {
    setStorage('cf_current_user', currentUser);
  }, [currentUser]);

  const signUp = useCallback(
    ({ name, email, password, phone }) => {
      setLoading(true);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const normalizedEmail = email.trim().toLowerCase();
          if (users.some((u) => u.email === normalizedEmail)) {
            setLoading(false);
            return reject(new Error('An account with this email already exists.'));
          }
          const avatar = generateAvatar(name);
          const newUser = {
            id: generateId(),
            name: name.trim(),
            email: normalizedEmail,
            phone: phone || '',
            passwordHash: hashPassword(password),
            avatar,
            joinedAt: new Date().toISOString(),
            favorites: [],
            bookings: [],
            rating: 0,
            reviews: 0,
          };
          setUsers((prev) => [...prev, newUser]);
          const { passwordHash, ...safeUser } = newUser;
          setCurrentUser(safeUser);
          setLoading(false);
          resolve(safeUser);
        }, 400);
      });
    },
    [users]
  );

  const login = useCallback(
    ({ email, password }) => {
      setLoading(true);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const normalizedEmail = email.trim().toLowerCase();
          const user = users.find((u) => u.email === normalizedEmail);
          if (!user) {
            setLoading(false);
            return reject(new Error('No account found with this email.'));
          }
          if (user.passwordHash !== hashPassword(password)) {
            setLoading(false);
            return reject(new Error('Incorrect password. Please try again.'));
          }
          const { passwordHash, ...safeUser } = user;
          setCurrentUser(safeUser);
          setLoading(false);
          resolve(safeUser);
        }, 400);
      });
    },
    [users]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const updateProfile = useCallback(
    (updates) => {
      if (!currentUser) return;
      const updated = { ...currentUser, ...updates };
      if (updates.name) {
        updated.avatar = generateAvatar(updates.name);
      }
      setCurrentUser(updated);
      setUsers((prev) =>
        prev.map((u) => (u.id === currentUser.id ? { ...u, ...updated } : u))
      );
    },
    [currentUser]
  );

  const value = {
    users,
    user: currentUser,
    isAuthenticated: !!currentUser,
    loading,
    signUp,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};