# PROJECT SAVEPOINT: V20 UI Fixes Session
**Date:** 2025-12-26
**Time:** 12:43 PM (UTC+4)
**Session:** Windows Laptop Development
**Project:** atc-support-v20
**GitHub:** https://github.com/aldrinstellus/atc-support-v20

---

## Session Summary

This session focused on running V20 alongside V18 and fixing three UI bugs discovered during testing.

## Environment

- **Machine:** Windows Laptop (Administrator)
- **V18 Dev Server:** http://localhost:3019
- **V20 Dev Server:** http://localhost:3020
- **Browser:** Chrome DevTools MCP

---

## Bugs Fixed

### 1. Duplicate Chat Input Layer
**Issue:** A ghost/duplicate chat input layer was appearing behind the main floating input and Quick Launch button.

**Root Cause:** CSS selector mismatch in `InteractiveChatWithFloatingInput.tsx`. The hiding CSS was targeting `.border-t.border-border.bg-card` but the actual component used `.absolute.bottom-0`.

**Fix:** Updated CSS selector to `.floating-input-wrapper .absolute.bottom-0`

**Commit:** `07a70d3`

---

### 2. Mode Switcher Hydration Issue
**Issue:** The Government/Project/ATC mode switcher wasn't showing on first page load - required a refresh to appear.

**Root Cause:** React hydration mismatch. The `ModeContext` reads from localStorage in `useEffect`, causing server-rendered HTML to differ from client-rendered HTML.

**Fix:** Wrapped `ModeSwitcher` component in `ClientOnly` wrapper with a placeholder fallback in `CTISLogo.tsx`.

**Commit:** `c65da44`

---

### 3. Missing Top Controls (Sidebar Toggle + Theme Toggle)
**Issue:** The sidebar collapse/expand button and theme toggle (dark/light mode) were missing from the top of the right panel.

**Root Cause:** V20's `InteractiveChatWithFloatingInput.tsx` was missing these controls that existed in V18's `InteractiveChat.tsx`.

**Fix:** Added the control buttons to `InteractiveChatWithFloatingInput.tsx`:
- Imported `PanelLeft`, `PanelLeftClose` from lucide-react
- Imported `ThemeToggle` component
- Added `toggleSidebar` from `useSidebar()` context
- Added JSX for both buttons at top-left of chat area

**Commit:** `eb94e65`

---

## Issues Encountered (Lessons Learned)

### Bash Heredoc Escaping Problem
**Problem:** When using bash heredoc (`cat << 'EOF'`) to write JSX/TSX files, backticks (`) and template literals (`${}`) get escaped as `\`` and `\${}`, causing syntax errors.

**Symptoms:**
- Console errors: `Parsing ecmascript source code failed`
- Template literals showing as literal strings instead of evaluating
- Button title showing `${sidebarOpen ? 'Close' : 'Open'}` instead of actual value

**Solution:**
1. Used Python script to fix escaped characters
2. Added development guidelines to CLAUDE.md to prevent future occurrences

**Prevention Added:**
```markdown
### File Editing Best Practices (Claude Code)
- **NEVER use bash heredoc** (`cat << 'EOF'`) to write JSX/TSX files
- **ALWAYS use the Edit tool** for modifying existing files
- **Use the Write tool** only for new files
- If Edit tool fails with "file modified", re-read and retry
```

**Commit:** `0bbd261`

---

## Files Modified

| File | Changes |
|------|---------|
| `src/components/chat/InteractiveChatWithFloatingInput.tsx` | CSS fix, added top controls |
| `src/components/layout/CTISLogo.tsx` | ClientOnly wrapper for ModeSwitcher |
| `CLAUDE.md` | Added file editing best practices |

---

## Git Status

### Commits Pushed (All Verified on GitHub)

| SHA | Message |
|-----|---------|
| `07a70d3` | ald-from-win-latop: Fix duplicate chat input layer |
| `c65da44` | ald-from-win-latop: Fix mode switcher hydration issue |
| `eb94e65` | Add sidebar toggle and theme toggle to top of chat panel |
| `0bbd261` | docs: Add file editing best practices for Claude Code |

### Branch Status
- **Branch:** main
- **Status:** Up to date with origin/main
- **No uncommitted changes**

---

## Current State

### What's Working
- V20 dev server running on port 3020
- V18 dev server running on port 3019 (parallel)
- Mode switcher (Government/Project/ATC) shows on first load
- Sidebar toggle button functional
- Theme toggle (dark/light) functional
- No duplicate input layer
- All 11 personas accessible across 3 modes

### Known Issues (Pre-existing, Not Session Related)
- Console warning: Image with src "/ctis-logo-dark.png" has width/height modified
- CSP warning about connect-src invalid source
- 500 error on auth endpoint (demo mode, expected)

---

## Next Steps (Recommended)

1. Test all 11 persona demos to verify no regressions
2. Verify sidebar toggle keyboard shortcut (Cmd+B) works
3. Check theme persistence across page refreshes
4. Consider adding similar top controls to other pages if missing

---

## Session Artifacts

- **Savepoint:** `archive/savepoints/PROJECT-SAVEPOINT-2025-12-26-V20-UI-FIXES.md`
- **GitHub Commits:** 4 commits pushed to main

---

**Session Status:** COMPLETE
**All Changes:** COMMITTED AND PUSHED
**GitHub Verified:** YES
