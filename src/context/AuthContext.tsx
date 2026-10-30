import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User;
  currentRole: UserRole;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  switchRole: (role: UserRole) => void;
  login: (emailOrPhone: string, role?: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'saarthi_auth_user';
const LANG_STORAGE_KEY = 'saarthi_language';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse auth user', e);
    }
    return DEMO_USERS.owner;
  });

  const [language, setLanguageState] = useState<'en' | 'hi'>(() => {
    return (localStorage.getItem(LANG_STORAGE_KEY) as 'en' | 'hi') || 'en';
  });

  useEffect(() => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
  }, [currentUser]);

  const setLanguage = (lang: 'en' | 'hi') => {
    setLanguageState(lang);
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  };

  const switchRole = (role: UserRole) => {
    const user = DEMO_USERS[role];
    if (user) {
      setCurrentUser(user);
    }
  };

  const login = (emailOrPhone: string, role: UserRole = 'owner') => {
    const baseUser = DEMO_USERS[role] || DEMO_USERS.owner;
    setCurrentUser({
      ...baseUser,
      email: emailOrPhone.includes('@') ? emailOrPhone : baseUser.email,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : baseUser.phone,
    });
  };

  const logout = () => {
    // Return to owner demo or clear
    setCurrentUser(DEMO_USERS.owner);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: currentUser.role,
        language,
        setLanguage,
        switchRole,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
