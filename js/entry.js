/**
 * SOCIALPULSE AI - Entry & Sign-In Flow Controller
 * Manages YouTube and Instagram OAuth connection states, loading, and error handling.
 */
(function () {
  'use strict';

  const BACKEND_URL = (window.SocialPulseAPI && window.SocialPulseAPI.backendUrl) || 'http://localhost:5000';

  const state = {
    backendOnline: false,
    youtube: {
      connected: false,
      configured: false,
      channel: null
    },
    instagram: {
      connected: false,
      configured: false
    },
    pinterest: {
      connected: false,
      configured: false
    },
    x: {
      connected: false,
      configured: false
    }
  };

  // Elements
  const entryScreen = document.getElementById('socialpulse-entry-page');
  const appContainer = document.querySelector('.app-container');
  const backendDot = document.getElementById('entry-backend-dot');
  const backendText = document.getElementById('entry-backend-text');

  // YouTube Elements
  const ytBtn = document.getElementById('btn-continue-youtube');
  const ytConnectedBadge = document.getElementById('yt-connected-badge');
  const ytChannelProfile = document.getElementById('yt-channel-profile');
  const ytChannelAvatar = document.getElementById('yt-channel-avatar');
  const ytChannelName = document.getElementById('yt-channel-name');
  const ytChannelMeta = document.getElementById('yt-channel-meta');
  const ytNotice = document.getElementById('yt-notice');

  // Instagram Elements
  const igBtn = document.getElementById('btn-continue-instagram');
  const igConnectedBadge = document.getElementById('ig-connected-badge');
  const igNotice = document.getElementById('ig-notice');

  // Pinterest Elements
  const pinBtn = document.getElementById('btn-continue-pinterest');
  const pinConnectedBadge = document.getElementById('pin-connected-badge');
  const pinNotice = document.getElementById('pin-notice');

  // X Elements
  const xBtn = document.getElementById('btn-continue-x');
  const xConnectedBadge = document.getElementById('x-connected-badge');
  const xNotice = document.getElementById('x-notice');

  // Dashboard CTA Button
  const enterDashboardBtn = document.getElementById('btn-enter-dashboard');
  const enterDashboardText = document.getElementById('btn-enter-dashboard-text');

  /**
   * Check backend /auth/status to detect connection states
   */
  async function checkConnectionStatus() {
    try {
      const res = await fetch(`${BACKEND_URL}/auth/status`, { mode: 'cors' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      state.backendOnline = true;
      if (backendDot) {
        backendDot.className = 'entry-backend-dot online';
        backendText.textContent = 'Backend Service Online (Port 5000)';
      }

      // Check YouTube State
      state.youtube.connected = Boolean(data.authenticated || data.youtube?.connected);
      state.youtube.configured = Boolean(data.clientIdConfigured || data.youtube?.configured);

      // Check Instagram State
      state.instagram.connected = Boolean(data.instagram?.connected);
      state.instagram.configured = Boolean(data.instagram?.configured);

      // Check Pinterest State
      state.pinterest.connected = Boolean(data.pinterest?.connected);
      state.pinterest.configured = Boolean(data.pinterest?.configured);

      // Check X State
      state.x.connected = Boolean(data.x?.connected);
      state.x.configured = Boolean(data.x?.configured);

      if (state.youtube.connected) {
        await fetchYouTubeChannel();
      }

      renderStatus();
    } catch (err) {
      state.backendOnline = false;
      if (backendDot) {
        backendDot.className = 'entry-backend-dot offline';
        backendText.textContent = 'Backend Offline (Demo Mode Ready)';
      }
      renderStatus();
    }
  }

  /**
   * Fetch connected YouTube channel details
   */
  async function fetchYouTubeChannel() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/channel`);
      if (!res.ok) return;
      const channel = await res.json();
      state.youtube.channel = channel;
    } catch (e) {
      console.warn('Could not fetch channel details:', e);
    }
  }

  /**
   * Render UI based on current connection states
   */
  function renderStatus() {
    // 1. YouTube UI State
    if (state.youtube.connected) {
      if (ytConnectedBadge) ytConnectedBadge.classList.add('visible');
      if (ytNotice) ytNotice.classList.remove('visible');

      if (state.youtube.channel && ytChannelProfile) {
        ytChannelProfile.classList.add('visible');
        if (ytChannelName) ytChannelName.textContent = state.youtube.channel.name || 'Connected Creator';
        if (ytChannelMeta) ytChannelMeta.textContent = `${state.youtube.channel.subscribers || '0'} Subscribers • ${state.youtube.channel.handle || ''}`;
        if (ytChannelAvatar) {
          if (state.youtube.channel.avatarUrl) {
            ytChannelAvatar.style.backgroundImage = `url(${state.youtube.channel.avatarUrl})`;
            ytChannelAvatar.textContent = '';
          } else {
            ytChannelAvatar.textContent = state.youtube.channel.avatarLetter || 'YT';
          }
        }
      }

      if (ytBtn) {
        ytBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>YouTube Account Connected</span>
        `;
        ytBtn.style.background = 'rgba(16, 185, 129, 0.2)';
        ytBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        ytBtn.style.color = '#34d399';
      }
    } else {
      if (ytConnectedBadge) ytConnectedBadge.classList.remove('visible');
      if (ytChannelProfile) ytChannelProfile.classList.remove('visible');
    }

    // 2. Instagram UI State
    if (state.instagram.connected) {
      if (igConnectedBadge) igConnectedBadge.classList.add('visible');
      if (igNotice) igNotice.classList.remove('visible');
    } else {
      if (igConnectedBadge) igConnectedBadge.classList.remove('visible');
    }

    // 3. Pinterest UI State
    if (state.pinterest.connected) {
      if (pinConnectedBadge) pinConnectedBadge.classList.add('visible');
      if (pinNotice) pinNotice.classList.remove('visible');
    } else {
      if (pinConnectedBadge) pinConnectedBadge.classList.remove('visible');
    }

    // 4. X UI State
    if (state.x.connected) {
      if (xConnectedBadge) xConnectedBadge.classList.add('visible');
      if (xNotice) xNotice.classList.remove('visible');
    } else {
      if (xConnectedBadge) xConnectedBadge.classList.remove('visible');
    }

    // 5. Dashboard CTA Text
    if (enterDashboardText) {
      const connectedCount = [state.youtube.connected, state.instagram.connected, state.pinterest.connected, state.x.connected].filter(Boolean).length;
      if (connectedCount > 0) {
        enterDashboardText.textContent = `Continue to Dashboard (${connectedCount} Accounts Connected) →`;
      } else {
        enterDashboardText.textContent = 'Explore Dashboard in Demo Mode →';
      }
    }
  }

  /**
   * Handle Click: Continue with YouTube
   */
  async function handleYouTubeConnect() {
    if (state.youtube.connected) {
      enterDashboard();
      return;
    }
    if (window.openPlatformCyberModal) {
      window.openPlatformCyberModal('youtube');
    }
  }

  /**
   * Handle Click: Continue with Instagram
   */
  async function handleInstagramConnect() {
    if (state.instagram.connected) {
      enterDashboard();
      return;
    }
    if (window.openPlatformCyberModal) {
      window.openPlatformCyberModal('instagram');
    }
  }

  /**
   * Handle Click: Continue with Pinterest
   */
  async function handlePinterestConnect() {
    if (state.pinterest.connected) {
      enterDashboard();
      return;
    }
    if (window.openPlatformCyberModal) {
      window.openPlatformCyberModal('pinterest');
    }
  }

  /**
   * Handle Click: Continue with X (Twitter)
   */
  async function handleXConnect() {
    if (state.x.connected) {
      enterDashboard();
      return;
    }
    if (window.openPlatformCyberModal) {
      window.openPlatformCyberModal('x');
    }
  }

  function showNotice(el, type, html) {
    if (!el) return;
    el.className = `entry-notice visible ${type}`;
    el.innerHTML = html;
  }

  /**
   * Transition into Dashboard
   */
  function enterDashboard() {
    sessionStorage.setItem('socialpulse_cyber_auth', 'active');
    sessionStorage.setItem('sp_gov_role', 'Administrator');
    sessionStorage.setItem('sp_gov_token', 'admin_token_' + Date.now());
    sessionStorage.setItem('sp_gov_user', JSON.stringify({
      email: 'admin@dhristi.gov',
      name: 'Dr. Rajesh Kumar',
      role: 'Administrator',
      clearance: 'LEVEL-5 GOVERNANCE & AUDIT'
    }));

    const gate = document.getElementById('cyber-gate-screen');
    if (gate) {
      gate.style.display = 'none';
      gate.classList.add('hidden');
      gate.style.pointerEvents = 'none';
    }

    if (!entryScreen) return;
    if (!appContainer) {
      window.location.href = 'index.html';
      return;
    }

    entryScreen.style.opacity = '0';
    entryScreen.style.transform = 'scale(0.98)';
    entryScreen.style.transition = 'opacity 0.35s ease, transform 0.35s ease';

    setTimeout(() => {
      entryScreen.style.display = 'none';
      entryScreen.style.pointerEvents = 'none';
      appContainer.style.display = 'flex';
      appContainer.style.opacity = '1';
      appContainer.style.pointerEvents = 'auto';

      if (window.switchWorkspaceMode) {
        window.switchWorkspaceMode('government');
      }
      if (window.navigateTo) {
        window.navigateTo('gov-command-center');
      }
      window.dispatchEvent(new Event('resize'));
    }, 350);
  }

  /**
   * Return back to Entry / Accounts Screen
   */
  function openEntryPage() {
    window.location.href = 'index.html';
  }

  // Bind Event Listeners
  if (ytBtn) ytBtn.addEventListener('click', handleYouTubeConnect);
  if (igBtn) igBtn.addEventListener('click', handleInstagramConnect);
  if (pinBtn) pinBtn.addEventListener('click', handlePinterestConnect);
  if (xBtn) xBtn.addEventListener('click', handleXConnect);
  if (enterDashboardBtn) enterDashboardBtn.addEventListener('click', enterDashboard);

  // Quick skip button in header
  const skipBtn = document.getElementById('entry-skip-btn');
  if (skipBtn) skipBtn.addEventListener('click', enterDashboard);

  // Expose methods for global navigation
  window.launchGovFromEntry = function () {
    const isAuth = sessionStorage.getItem('socialpulse_cyber_auth') === 'active';
    const role = sessionStorage.getItem('sp_gov_role');
    if (isAuth && role && role !== 'Verified Creator') {
      enterDashboard();
      setTimeout(() => {
        if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      }, 360);
    } else {
      const gate = document.getElementById('cyber-gate-screen');
      if (gate) {
        gate.style.display = 'flex';
        gate.style.opacity = '1';
        gate.classList.remove('hidden');
        gate.style.pointerEvents = 'auto';
      }
    }
  };

  window.DhristiEntry = window.SocialPulseEntry = {
    checkStatus: checkConnectionStatus,
    enterDashboard: enterDashboard,
    openEntryPage: openEntryPage,
    launchGovFromEntry: window.launchGovFromEntry,
    state: state
  };

  // Check URL query parameters
  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const isAuth = sessionStorage.getItem('socialpulse_cyber_auth') === 'active';
    if (params.get('view') === 'dashboard' && isAuth) {
      enterDashboard();
    } else if (params.get('auth') === 'google_success' || params.get('connected') === 'youtube') {
      checkConnectionStatus();
    }
  }

  // Run on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      checkConnectionStatus();
      checkUrlParams();
    });
  } else {
    checkConnectionStatus();
    checkUrlParams();
  }
})();
