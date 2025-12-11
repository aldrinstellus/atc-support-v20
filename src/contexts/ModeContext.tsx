'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ModeType } from '@/types/persona';

const MODE_STORAGE_KEY = 'selected-mode';

interface ModeContextType {
  currentMode: ModeType;
  setMode: (mode: ModeType) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [currentMode, setCurrentMode] = useState<ModeType>('government'); // Default to government

  // Load from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem(MODE_STORAGE_KEY) as ModeType | null;
    if (savedMode && (savedMode === 'government' || savedMode === 'project' || savedMode === 'atc')) {
      setCurrentMode(savedMode);
    }
  }, []);

  // Save to localStorage when mode changes
  useEffect(() => {
    localStorage.setItem(MODE_STORAGE_KEY, currentMode);
  }, [currentMode]);

  const setMode = (mode: ModeType) => {
    setCurrentMode(mode);
    // Mode change will trigger persona filtering in usePersona hook
  };

  return (
    <ModeContext.Provider value={{ currentMode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within ModeProvider');
  }
  return context;
}
