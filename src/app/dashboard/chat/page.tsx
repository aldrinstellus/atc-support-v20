'use client';

import { useState, useCallback, Suspense } from 'react';
import { MessageSquare, ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';
import { InteractiveChat } from '@/components/chat/InteractiveChat';
import { PersonaProvider, usePersona } from '@/contexts/PersonaContext';
import { ConversationProvider } from '@/contexts/ConversationContext';
import { QuickActionProvider } from '@/contexts/QuickActionContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { ModeProvider } from '@/contexts/ModeContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { Persona, PersonaType } from '@/types/persona';

function ChatLoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[400px]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-muted" />
        <div className="h-4 w-48 rounded bg-muted" />
        <div className="h-3 w-32 rounded bg-muted/50" />
      </div>
    </div>
  );
}

function ChatPageContent() {
  const { currentPersona, setPersona, availablePersonas } = usePersona();
  const { theme, toggleTheme, mounted } = useTheme();
  const [showPersonaDropdown, setShowPersonaDropdown] = useState(false);

  const handlePersonaChange = (persona: Persona) => {
    setPersona(persona.id as PersonaType);
    setShowPersonaDropdown(false);
  };

  const getPersonaColor = (personaId: string) => {
    switch (personaId) {
      case 'atc-support':
        return 'bg-green-500';
      case 'atc-executive':
        return 'bg-purple-500';
      case 'atc-manager':
        return 'bg-teal-500';
      case 'atc-csm':
        return 'bg-cyan-500';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Compact Header - Integrated with dashboard */}
      <div className="sticky top-0 z-30 border-b border-border/50 bg-card-elevated/95 backdrop-blur-xl px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card-elevated flex items-center justify-center">
                <Sparkles className="h-2 w-2 text-success-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">AI Assistant</h1>
              <p className="text-xs text-muted-foreground">
                Claude-powered support for IT tickets and knowledge base
              </p>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle - Elegant pill design */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 hover:bg-muted border border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 group"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <div className="relative w-5 h-5">
                  {/* Sun icon - visible in dark mode */}
                  <Sun
                    className={`absolute inset-0 h-5 w-5 text-amber-400 transition-all duration-300 ${
                      theme === 'dark'
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 rotate-90 scale-50'
                    }`}
                  />
                  {/* Moon icon - visible in light mode */}
                  <Moon
                    className={`absolute inset-0 h-5 w-5 text-slate-600 transition-all duration-300 ${
                      theme === 'light'
                        ? 'opacity-100 rotate-0 scale-100'
                        : 'opacity-0 -rotate-90 scale-50'
                    }`}
                  />
                </div>
              </button>
            )}

            {/* Persona Selector - Compact */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaDropdown(!showPersonaDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-border/50"
              >
                <span className={`h-2 w-2 rounded-full ${getPersonaColor(currentPersona.id)}`} />
                <span className="text-sm font-medium text-foreground">
                  {currentPersona.name}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              {showPersonaDropdown && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-card-elevated border border-border shadow-xl z-50">
                  <div className="p-2 space-y-1">
                    <p className="text-xs text-muted-foreground px-2 py-1">Select Role</p>
                    {availablePersonas.map((persona) => (
                      <button
                        key={persona.id}
                        onClick={() => handlePersonaChange(persona)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          currentPersona.id === persona.id
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full ${getPersonaColor(persona.id)}`} />
                        <span className="text-sm font-medium">{persona.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Content - Fills remaining height */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Suspense fallback={<ChatLoadingFallback />}>
          <InteractiveChat />
        </Suspense>
      </div>
    </div>
  );
}

function ChatPageWithSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  return (
    <SidebarProvider value={{ sidebarOpen, toggleSidebar }}>
      <ChatPageContent />
    </SidebarProvider>
  );
}

export default function ChatPage() {
  return (
    <ModeProvider initialMode="atc">
      <PersonaProvider initialPersonaId="atc-support">
        <ConversationProvider>
          <QuickActionProvider>
            <ChatPageWithSidebar />
          </QuickActionProvider>
        </ConversationProvider>
      </PersonaProvider>
    </ModeProvider>
  );
}
