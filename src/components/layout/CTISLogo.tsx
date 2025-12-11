'use client';

import { ModeSwitcher } from './ModeSwitcher';

/**
 * CTIS Logo Component
 *
 * Displays the CTIS (Customer Technology & Information Services) branding
 * with mode switcher in the application sidebar.
 *
 * V17 Mode Switcher - Government/Project mode toggle
 * V19 - Theme-aware logo switching using CSS (instant, no flicker)
 *
 * Both logos are preloaded and CSS controls visibility based on theme class.
 * This eliminates network lag and hydration flicker.
 */

export const CTISLogo = () => {
  return (
    <div className="flex-shrink-0 px-3 pt-3 pb-3 space-y-2">
      {/* CTIS Logo - Both versions rendered, CSS controls visibility */}
      <div className="flex items-center justify-center py-2 relative">
        {/* Dark theme logo - shown when .dark class is on html */}
        <img
          src="/ctis-logo-dark.png"
          alt="CTIS Logo"
          className="h-10 w-auto object-contain dark:block hidden"
        />
        {/* Light theme logo - shown when .light class is on html */}
        <img
          src="/ctis-logo.png"
          alt="CTIS Logo"
          className="h-10 w-auto object-contain dark:hidden block"
        />
      </div>

      {/* Mode Switcher - Government vs Project */}
      <ModeSwitcher />
    </div>
  );
};

export default CTISLogo;
