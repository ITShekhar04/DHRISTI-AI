/**
 * DHRISTI AI - Premium Opening Animation & Splash Experience Controller
 * Target: 5.0s cinematic opening animation duration, 60 FPS, Apple/Modern SaaS Polish
 * Strictly complies with Sections 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
 */
(function () {
  'use strict';

  const SPLASH_KEY = 'dhristi_splash_played';
  const TARGET_DURATION_MS = 5000; // Strictly 5.0 seconds as requested by user

  function initOpeningExperience() {
    const splashEl = document.getElementById('dhristi-splash-screen');
    if (!splashEl) return;

    // Respect accessibility prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const effectiveDuration = prefersReducedMotion ? 250 : TARGET_DURATION_MS;

    // Mark splash as active
    splashEl.classList.remove('splash-hidden', 'splash-exit');
    splashEl.style.display = 'flex';
    splashEl.style.opacity = '1';

    // Transition into application after timing sequence
    setTimeout(() => {
      // Stage 4: Smooth transition into application (fade & subtle zoom)
      splashEl.classList.add('splash-exit');

      setTimeout(() => {
        splashEl.classList.add('splash-hidden');
        splashEl.style.display = 'none';
        sessionStorage.setItem(SPLASH_KEY, 'true');

        // Check authentication state to determine landing screen
        const isAuth = sessionStorage.getItem('socialpulse_cyber_auth') === 'active';
        const gate = document.getElementById('cyber-gate-screen');
        const appContainer = document.querySelector('.app-container');

        if (!isAuth) {
          // Take user to the login page where OTP is required!
          if (gate) {
            gate.style.display = 'flex';
            gate.classList.remove('hidden');
            gate.style.opacity = '1';
            gate.style.pointerEvents = 'auto';
          }
          if (appContainer) {
            appContainer.style.display = 'none';
            appContainer.style.opacity = '0';
          }
          const otpInput = document.getElementById('cyber-demo-otp-input');
          if (otpInput && typeof otpInput.focus === 'function') {
            setTimeout(() => otpInput.focus(), 80);
          }
        } else {
          // Already authenticated in this session -> show home page
          if (gate) {
            gate.style.display = 'none';
            gate.classList.add('hidden');
          }
          if (appContainer) {
            appContainer.style.display = 'flex';
            appContainer.style.opacity = '1';
          }
        }
      }, 420);
    }, effectiveDuration);
  }

  // Expose replay function for preview and manual testing
  window.replayOpeningAnimation = function () {
    const splashEl = document.getElementById('dhristi-splash-screen');
    if (!splashEl) return;
    sessionStorage.removeItem(SPLASH_KEY);
    initOpeningExperience();
  };

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOpeningExperience);
  } else {
    initOpeningExperience();
  }
})();
