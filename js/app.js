/* ==========================================================================
   SOCIALPULSE AI - APPLICATION CONTROLLER & INTERACTION ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // Application State
  let currentVideo = SOCIALPULSE_DATA.videos.find((v) => v.id === 'vid-3') || SOCIALPULSE_DATA.videos[0];
  let currentView = 'hero';
  window.currentPlatform = 'youtube';
  window.currentView = currentView;
  window.currentVideo = currentVideo;
  window.getCurrentVideo = function () { return currentVideo; };
  window.getCurrentContentItem = function () {
    const p = window.currentPlatform || 'youtube';
    if (p === 'instagram' && window.getCurrentReel) return window.getCurrentReel();
    if (p === 'pinterest' && window.getCurrentPin) return window.getCurrentPin();
    if (p === 'x' && window.getCurrentPost) return window.getCurrentPost();
    if (p === 'facebook' && window.getCurrentFbPost) return window.getCurrentFbPost();
    if (p === 'telegram' && window.getCurrentTgPost) return window.getCurrentTgPost();
    return currentVideo;
  };

  // 1. VIEW ROUTER
  window.navigateTo = function (viewId) {
    currentView = viewId;
    window.currentView = viewId;

    // Update nav links active state
    document.querySelectorAll('.nav-item').forEach((item) => {
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update views visibility with smooth fade
    document.querySelectorAll('.view-section').forEach((sec) => {
      if (sec.id === `view-${viewId}`) {
        sec.classList.add('active');
        sec.style.display = 'block';
      } else {
        sec.classList.remove('active');
        sec.style.display = 'none';
      }
    });

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu if open
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');

    // Route Government Command Center to the existing Command Hub overview screen
    if (viewId === 'gov-command-center' || viewId === 'command-center' || viewId === 'command-hub') {
      if (window.navigateToGovSection && !window._isGovNavigating) {
        window._isGovNavigating = true;
        try {
          window.navigateToGovSection('overview');
        } finally {
          window._isGovNavigating = false;
        }
      }
    }

    // Ensure platform-specific content is displayed
    const currentPlat = window.currentPlatform || 'youtube';
    ['dashboard', 'retention', 'audience', 'insights'].forEach((v) => {
      ['youtube', 'instagram', 'pinterest', 'x', 'facebook', 'telegram'].forEach((p) => {
        const el = document.getElementById(`${p}-${v}-content`);
        if (el) el.style.display = currentPlat === p ? 'block' : 'none';
      });
    });

    // Trigger platform-specific view renders
    if (currentPlat === 'youtube') {
      if (viewId === 'dashboard' || viewId === 'retention') {
        if (window.renderRetentionChart) window.renderRetentionChart(currentVideo);
        if (window.renderSatisfactionGauge) window.renderSatisfactionGauge(currentVideo.satisfactionScore, currentVideo.scoreBreakdown);
      }
      if (viewId === 'audience') {
        if (window.renderAudienceDonut) window.renderAudienceDonut(currentVideo.audienceSegments);
      }
      if (viewId === 'copyright' && window.renderCopyrightRadar) {
        window.renderCopyrightRadar('youtube', currentVideo);
      }
    } else if (currentPlat === 'instagram') {
      if (viewId === 'dashboard' && window.renderInstagramDashboard) window.renderInstagramDashboard();
      if (viewId === 'retention' && window.renderInstagramRetention) window.renderInstagramRetention();
      if (viewId === 'audience' && window.renderInstagramAudience) window.renderInstagramAudience();
      if (viewId === 'insights' && window.renderInstagramInsights) window.renderInstagramInsights();
      if (viewId === 'copyright' && window.renderCopyrightRadar && window.getCurrentReel) {
        window.renderCopyrightRadar('instagram', window.getCurrentReel());
      }
    } else if (currentPlat === 'pinterest') {
      if (viewId === 'dashboard' && window.renderPinterestDashboard) window.renderPinterestDashboard();
      if (viewId === 'retention' && window.renderPinterestRetention) window.renderPinterestRetention();
      if (viewId === 'audience' && window.renderPinterestAudience) window.renderPinterestAudience();
      if (viewId === 'insights' && window.renderPinterestInsights) window.renderPinterestInsights();
      if (viewId === 'copyright' && window.renderCopyrightRadar && window.getCurrentPin) {
        window.renderCopyrightRadar('pinterest', window.getCurrentPin());
      }
    } else if (currentPlat === 'x') {
      if (viewId === 'dashboard' && window.renderXDashboard) window.renderXDashboard();
      if (viewId === 'retention' && window.renderXRetention) window.renderXRetention();
      if (viewId === 'audience' && window.renderXAudience) window.renderXAudience();
      if (viewId === 'insights' && window.renderXInsights) window.renderXInsights();
      if (viewId === 'copyright' && window.renderCopyrightRadar && window.getCurrentPost) {
        window.renderCopyrightRadar('x', window.getCurrentPost());
      }
    } else if (currentPlat === 'facebook') {
      if (viewId === 'dashboard' && window.renderFacebookDashboard) window.renderFacebookDashboard();
      if (viewId === 'retention' && window.renderFacebookRetention) window.renderFacebookRetention();
      if (viewId === 'audience' && window.renderFacebookAudience) window.renderFacebookAudience();
      if (viewId === 'insights' && window.renderFacebookInsights) window.renderFacebookInsights();
    } else if (currentPlat === 'telegram') {
      if (viewId === 'dashboard' && window.renderTelegramDashboard) window.renderTelegramDashboard();
      if (viewId === 'retention' && window.renderTelegramRetention) window.renderTelegramRetention();
      if (viewId === 'audience' && window.renderTelegramAudience) window.renderTelegramAudience();
      if (viewId === 'insights' && window.renderTelegramInsights) window.renderTelegramInsights();
    }

    // Special View Renders (Scroll-Past, Reports, Publisher, Society Trends)
    if (viewId === 'dashboard') {
      if (window.updateScrollPastVideo) {
        window.updateScrollPastVideo(currentVideo ? currentVideo.id : 'vid-3');
      }
    } else if (viewId === 'reports') {
      if (window.switchReportPlatform) {
        window.switchReportPlatform(window.activeReportPlatform || 'youtube');
      }
    } else if (viewId === 'publisher') {
      if (window.syncPublisherPreview) {
        window.syncPublisherPreview();
      }
    } else if (viewId === 'society-trends') {
      if (window.renderSocietyTrends) {
        window.renderSocietyTrends('all', 'all');
      }
    }
  };

  // Helper to get active item for any platform
  window.getCurrentItemForPlatform = function (platform) {
    switch (platform) {
      case 'instagram':
        return window.getCurrentReel ? window.getCurrentReel() : null;
      case 'pinterest':
        return window.getCurrentPin ? window.getCurrentPin() : null;
      case 'x':
        return window.getCurrentPost ? window.getCurrentPost() : null;
      case 'facebook':
        return window.getCurrentFbPost ? window.getCurrentFbPost() : null;
      case 'telegram':
        return window.getCurrentTgPost ? window.getCurrentTgPost() : null;
      case 'youtube':
      default:
        return currentVideo;
    }
  };

  // Centralized Copilot prompt updater for all 4 platforms
  window.updateCopilotForPlatform = function (platform) {
    const chipsContainer = document.querySelector('.copilot-prompt-chips');
    const inputEl = document.getElementById('copilot-input-field');
    const contextEl = document.getElementById('copilot-context-video');

    let prompts = [];
    let placeholder = 'Ask Dhristi Copilot anything...';
    let contextTitle = '';

    if (platform === 'instagram') {
      prompts = (SOCIALPULSE_DATA.instagram && SOCIALPULSE_DATA.instagram.copilotPrompts) || [];
      placeholder = 'Ask Dhristi Copilot anything about your Instagram Reels...';
      contextTitle = window.getCurrentReel ? window.getCurrentReel().title : 'Instagram Reel';
    } else if (platform === 'pinterest') {
      prompts = (SOCIALPULSE_DATA.pinterest && SOCIALPULSE_DATA.pinterest.copilotPrompts) || [];
      placeholder = 'Ask Dhristi Copilot anything about your Pinterest Pins...';
      contextTitle = window.getCurrentPin ? window.getCurrentPin().title : 'Pinterest Pin';
    } else if (platform === 'x') {
      prompts = (SOCIALPULSE_DATA.x && SOCIALPULSE_DATA.x.copilotPrompts) || [];
      placeholder = 'Ask Dhristi Copilot anything about your X posts...';
      contextTitle = window.getCurrentPost ? window.getCurrentPost().title : 'X Post';
    } else {
      prompts = [
        'Why did my video perform poorly?',
        'Where did viewers lose interest?',
        'What should I improve?',
        'Which content performs best?',
        'What should I make next?',
        'Why are people rewatching this section?'
      ];
      placeholder = 'Ask Dhristi Copilot anything about your YouTube video...';
      contextTitle = currentVideo.title;
    }

    if (chipsContainer && prompts.length > 0) {
      chipsContainer.innerHTML = prompts
        .map((p) => `<span class="prompt-chip" onclick="window.sendCopilotQuery('${p.replace(/'/g, "\\'")}')">${p}</span>`)
        .join('');
    }
    if (inputEl) inputEl.placeholder = placeholder;
    if (contextEl) contextEl.textContent = `Analyzing: ${contextTitle}`;
  };

  // PLATFORM SWITCHER
  window.selectPlatform = function (platformId) {
    if (platformId === window.currentPlatform) return;
    window.currentPlatform = platformId;

    document.querySelectorAll('.platform-btn').forEach((btn) => {
      const isActive = btn.getAttribute('data-platform') === platformId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    ['youtube', 'instagram', 'pinterest', 'x', 'facebook', 'telegram'].forEach((p) => {
      document.body.classList.toggle(`platform-${p}-active`, platformId === p);
    });

    ['dashboard', 'retention', 'audience', 'insights'].forEach((v) => {
      ['youtube', 'instagram', 'pinterest', 'x', 'facebook', 'telegram'].forEach((p) => {
        const el = document.getElementById(`${p}-${v}-content`);
        if (el) el.style.display = platformId === p ? 'block' : 'none';
      });
    });

    // Copyright Radar is ALWAYS visible across all platforms
    const copyrightNav = document.querySelector('.nav-item[data-view="copyright"]');
    if (copyrightNav) {
      copyrightNav.style.display = '';
    }

    // Dynamic retention nav label
    const retentionNav = document.querySelector('.nav-item[data-view="retention"]');
    if (retentionNav) {
      const label = retentionNav.querySelector('span:not(.nav-badge)');
      if (label) {
        if (platformId === 'instagram') label.textContent = 'Hook Intelligence';
        else if (platformId === 'pinterest') label.textContent = 'Pin Telemetry';
        else if (platformId === 'x') label.textContent = 'Engagement Velocity';
        else label.textContent = 'Retention & Drop-Off';
      }
    }

    // Dynamic active workspace label & creator role
    const selectorLabel = document.querySelector('.video-selector-label');
    const creatorRoleEl = document.querySelector('.creator-role');
    if (window.platformConfig && window.platformConfig[platformId]) {
      const cfg = window.platformConfig[platformId];
      if (selectorLabel) selectorLabel.textContent = cfg.terminology.selectorLabel;
      if (creatorRoleEl) creatorRoleEl.textContent = cfg.terminology.creatorRole;
    } else {
      if (selectorLabel) {
        if (platformId === 'instagram') selectorLabel.textContent = 'Active Reel:';
        else if (platformId === 'pinterest') selectorLabel.textContent = 'Active Pin:';
        else if (platformId === 'x') selectorLabel.textContent = 'Active Post:';
        else selectorLabel.textContent = 'Active Video:';
      }
    }

    // Update global content select dropdown
    const select = document.getElementById('global-video-select');
    if (select) {
      select.replaceWith(select.cloneNode(true));
      const newSelect = document.getElementById('global-video-select');
      if (platformId === 'youtube') {
        newSelect.innerHTML = SOCIALPULSE_DATA.videos
          .map((v) => `<option value="${v.id}">${v.title} (${v.views})</option>`)
          .join('');
        newSelect.value = currentVideo.id;
        newSelect.addEventListener('change', (e) => window.selectVideo(e.target.value));
      } else if (platformId === 'instagram') {
        if (window.populateInstagramContentSelector) window.populateInstagramContentSelector();
        newSelect.addEventListener('change', (e) => window.selectReel(e.target.value));
      } else if (platformId === 'pinterest') {
        if (window.populatePinterestContentSelector) window.populatePinterestContentSelector();
        newSelect.addEventListener('change', (e) => window.selectPin(e.target.value));
      } else if (platformId === 'x') {
        if (window.populateXContentSelector) window.populateXContentSelector();
        newSelect.addEventListener('change', (e) => window.selectPost(e.target.value));
      } else if (platformId === 'facebook') {
        if (window.populateFacebookContentSelector) window.populateFacebookContentSelector();
        newSelect.addEventListener('change', (e) => window.selectFbPost(e.target.value));
      } else if (platformId === 'telegram') {
        if (window.populateTelegramContentSelector) window.populateTelegramContentSelector();
        newSelect.addEventListener('change', (e) => window.selectTgPost(e.target.value));
      }
    }

    // Render all views for the platform
    if (platformId === 'instagram') {
      if (window.renderAllInstagramViews) window.renderAllInstagramViews();
      if (window.updateCopilotForPlatform) window.updateCopilotForPlatform('instagram');
      if (window.renderCopyrightRadar && window.getCurrentReel) window.renderCopyrightRadar('instagram', window.getCurrentReel());
    } else if (platformId === 'pinterest') {
      if (window.renderAllPinterestViews) window.renderAllPinterestViews();
      if (window.updateCopilotForPlatform) window.updateCopilotForPlatform('pinterest');
      if (window.renderCopyrightRadar && window.getCurrentPin) window.renderCopyrightRadar('pinterest', window.getCurrentPin());
    } else if (platformId === 'x') {
      if (window.renderAllXViews) window.renderAllXViews();
      if (window.updateCopilotForPlatform) window.updateCopilotForPlatform('x');
      if (window.renderCopyrightRadar && window.getCurrentPost) window.renderCopyrightRadar('x', window.getCurrentPost());
    } else if (platformId === 'facebook') {
      if (window.renderAllFacebookViews) window.renderAllFacebookViews();
      if (window.renderCopyrightRadar && window.getCurrentFbPost) window.renderCopyrightRadar('facebook', window.getCurrentFbPost());
    } else if (platformId === 'telegram') {
      if (window.renderAllTelegramViews) window.renderAllTelegramViews();
      if (window.renderCopyrightRadar && window.getCurrentTgPost) window.renderCopyrightRadar('telegram', window.getCurrentTgPost());
    } else {
      window.selectVideo(currentVideo.id);
      if (window.updateCopilotForPlatform) window.updateCopilotForPlatform('youtube');
      if (window.renderRetentionChart) window.renderRetentionChart(currentVideo);
      if (window.renderSatisfactionGauge) window.renderSatisfactionGauge(currentVideo.satisfactionScore, currentVideo.scoreBreakdown);
      if (window.renderAudienceDonut) window.renderAudienceDonut(currentVideo.audienceSegments);
      if (window.renderCopyrightRadar) window.renderCopyrightRadar('youtube', currentVideo);
    }

    const platformLabels = { youtube: 'YouTube', instagram: 'Instagram', pinterest: 'Pinterest', x: 'X (Twitter)', facebook: 'Facebook', telegram: 'Telegram' };
    if (window.showToast) {
      window.showToast(`Switched to ${platformLabels[platformId] || platformId} Analytics`);
    }

    window.navigateTo(currentView === 'hero' ? 'dashboard' : currentView);
  };

  // 2. VIDEO SWITCHER SYNCHRONIZATION
  window.selectVideo = function (videoId) {
    if (window.currentPlatform === 'instagram') {
      if (window.selectReel) window.selectReel(videoId);
      return;
    }
    if (window.currentPlatform === 'pinterest') {
      if (window.selectPin) window.selectPin(videoId);
      return;
    }
    if (window.currentPlatform === 'x') {
      if (window.selectPost) window.selectPost(videoId);
      return;
    }
    if (window.currentPlatform === 'facebook') {
      if (window.selectFbPost) window.selectFbPost(videoId);
      return;
    }
    if (window.currentPlatform === 'telegram') {
      if (window.selectTgPost) window.selectTgPost(videoId);
      return;
    }
    const found = SOCIALPULSE_DATA.videos.find((v) => v.id === videoId);
    if (!found) return;
    currentVideo = found;
    window.currentVideo = currentVideo;

    // Update video selector dropdown
    const select = document.getElementById('global-video-select');
    if (select) select.value = videoId;

    // Update KPI Cards
    const kpiViews = document.getElementById('kpi-views');
    const kpiWatchTime = document.getElementById('kpi-watchtime');
    const kpiEngagement = document.getElementById('kpi-engagement');
    const kpiRetention = document.getElementById('kpi-retention');
    const kpiReturning = document.getElementById('kpi-returning');

    if (kpiViews) kpiViews.textContent = currentVideo.views;
    if (kpiWatchTime) kpiWatchTime.textContent = currentVideo.watchTimeHours;
    if (kpiEngagement) kpiEngagement.textContent = currentVideo.engagementRate;
    if (kpiRetention) kpiRetention.textContent = currentVideo.avgRetention;
    if (kpiReturning) kpiReturning.textContent = `${currentVideo.audienceSegments.returning}%`;

    // Update active video detail titles
    document.querySelectorAll('.current-video-title').forEach((el) => {
      el.textContent = currentVideo.title;
    });

    // Update Copilot Active Context Badge
    const copilotContext = document.getElementById('copilot-context-video');
    if (copilotContext) copilotContext.textContent = `Analyzing: ${currentVideo.title}`;

    // Update Video Cards in Library
    document.querySelectorAll('.video-card-3d').forEach((card) => {
      if (card.getAttribute('data-video-id') === videoId) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    // Re-render charts
    if (window.renderRetentionChart) window.renderRetentionChart(currentVideo);
    if (window.renderSatisfactionGauge) window.renderSatisfactionGauge(currentVideo.satisfactionScore, currentVideo.scoreBreakdown);
    if (window.renderAudienceDonut) window.renderAudienceDonut(currentVideo.audienceSegments);
    if (window.renderCopyrightRadar) window.renderCopyrightRadar('youtube', currentVideo);

    // Update Anomaly Banner Visibility
    const anomalyBanner = document.getElementById('retention-anomaly-banner');
    if (anomalyBanner) {
      anomalyBanner.style.display = currentVideo.anomaly ? 'flex' : 'none';
    }

    // Update Scroll-Past Analyzer
    if (window.updateScrollPastVideo) {
      window.updateScrollPastVideo(videoId);
    }

    if (window.showToast) {
      window.showToast(`Switched workspace to: "${currentVideo.title}"`);
    }
  };

  // 3. 3D CARD TILT & MOUSE INTERPOLATION
  function setup3DCardTilt() {
    const cards = document.querySelectorAll('.card-3d, .kpi-card, .video-card-3d');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6.5; // Max 6.5deg
        const rotateY = ((x - centerX) / centerX) * 6.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      });
    });
  }

  // 4. "EXPLAIN THIS DROP" MODAL LOGIC
  window.openDropModal = function () {
    const modal = document.getElementById('drop-explanation-modal');
    if (!modal) return;

    if (window.currentPlatform === 'instagram' && window.getCurrentReel) {
      const reel = window.getCurrentReel();
      if (reel && reel.anomaly) {
        const tsEl = modal.querySelector('.modal-body span[style*="JetBrains"]');
        const dropBadge = modal.querySelector('.modal-body span[style*="accent-rose"]');
        const hypothesisP = modal.querySelector('.modal-body p');
        const actionP = modal.querySelector('.modal-body div[style*="accent-emerald"] p');
        if (tsEl) tsEl.textContent = `TIMESTAMP: ${reel.anomaly.timestamp}`;
        if (dropBadge) dropBadge.textContent = `${reel.anomaly.dropPercent}% Audience Drop`;
        if (hypothesisP) hypothesisP.textContent = `"${reel.anomaly.hypothesis}"`;
        if (actionP) actionP.textContent = reel.anomaly.recommendedAction;
      }
    } else if (currentVideo.anomaly) {
      const tsEl = modal.querySelector('.modal-body span[style*="JetBrains"]');
      const dropBadge = modal.querySelector('.modal-body span[style*="accent-rose"]');
      const hypothesisP = modal.querySelector('.modal-body p');
      const actionP = modal.querySelector('.modal-body div[style*="accent-emerald"] p');
      if (tsEl) tsEl.textContent = `TIMESTAMP: ${currentVideo.anomaly.timestamp}`;
      if (dropBadge) dropBadge.textContent = `${currentVideo.anomaly.dropPercent}% Audience Drop`;
      if (hypothesisP) hypothesisP.textContent = `"${currentVideo.anomaly.hypothesis}"`;
      if (actionP) actionP.textContent = currentVideo.anomaly.recommendedAction;
    }

    modal.classList.add('open');
  };

  window.closeDropModal = function () {
    const modal = document.getElementById('drop-explanation-modal');
    if (modal) modal.classList.remove('open');
  };

  // 5. "WATCH DEMO" CINEMATIC MODAL LOGIC
  window.openDemoModal = function () {
    const modal = document.getElementById('demo-showcase-modal');
    if (modal) modal.classList.add('open');
  };

  window.closeDemoModal = function () {
    const modal = document.getElementById('demo-showcase-modal');
    if (modal) modal.classList.remove('open');
  };

  // 6. AI COPILOT INTERACTION ENGINE
  window.sendCopilotQuery = function (questionText) {
    const messagesBox = document.getElementById('copilot-messages');
    const inputEl = document.getElementById('copilot-input-field');
    const text = questionText || (inputEl ? inputEl.value.trim() : '');
    if (!text || !messagesBox) return;

    if (inputEl) inputEl.value = '';

    // Append User Message Bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = text;
    messagesBox.appendChild(userBubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    // Simulate AI Thinking with typing dots
    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-bubble ai';
    aiBubble.innerHTML = `
      <div style="display: flex; gap: 4px; align-items: center; padding: 4px 0;">
        <span style="font-size: 0.72rem; color: var(--brand-cyan); font-weight: 600; margin-right: 6px;">DHRISTI COPILOT</span>
        <span class="animate-ping" style="width: 5px; height: 5px; background: #00f2fe; border-radius: 50%;"></span>
        <span style="font-size: 0.8rem; color: var(--text-tertiary);">Synthesizing video intelligence...</span>
      </div>
    `;
    messagesBox.appendChild(aiBubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;

    const plat = window.currentPlatform || 'youtube';
    let contentTitle = currentVideo.title;
    let responses = SOCIALPULSE_DATA.copilotResponses || {};
    let fallback = `Analyzing "${contentTitle}"... Based on audience behaviour metrics, your retention averages ${currentVideo.avgRetention} with a ${currentVideo.rewatchRate} rewatch multiplier. We suggest checking drop-off anomalies around 03:12 for quick pacing fixes.`;
    let confidenceNote = 'Based on 1.42M viewer sessions';

    if (plat === 'instagram') {
      contentTitle = window.getCurrentReel ? window.getCurrentReel().title : 'Instagram Reel';
      responses = (SOCIALPULSE_DATA.instagram && SOCIALPULSE_DATA.instagram.copilotResponses) || {};
      fallback = `Analyzing "${contentTitle}"... Based on Instagram Reel metrics, engagement rate is strong but hook retention may need optimization around the mid-section.`;
      confidenceNote = 'Based on aggregate Instagram telemetry';
    } else if (plat === 'pinterest') {
      contentTitle = window.getCurrentPin ? window.getCurrentPin().title : 'Pinterest Pin';
      responses = (SOCIALPULSE_DATA.pinterest && SOCIALPULSE_DATA.pinterest.copilotResponses) || {};
      fallback = `Analyzing "${contentTitle}"... Pinterest save velocity is high. Focus on high-clarity typography and clear outbound action buttons.`;
      confidenceNote = 'Based on Pinterest v5 API analytics';
    } else if (plat === 'x') {
      contentTitle = window.getCurrentPost ? window.getCurrentPost().title : 'X Post';
      responses = (SOCIALPULSE_DATA.x && SOCIALPULSE_DATA.x.copilotResponses) || {};
      fallback = `Analyzing "${contentTitle}"... Bookmarks indicate high practical utility on X. Repackage this post's key points into a multi-part discussion thread.`;
      confidenceNote = 'Based on X API v2 engagement telemetry';
    }

    const responseText = responses[text] || fallback;

    setTimeout(() => {
      aiBubble.innerHTML = `
        <div style="font-size: 0.72rem; color: var(--brand-cyan); font-weight: 700; margin-bottom: 6px; letter-spacing: 0.05em;">
          AI COPILOT INSIGHT • ${contentTitle.toUpperCase()}
        </div>
        <p style="white-space: pre-line;">${responseText}</p>
        <div style="margin-top: 10px; display: flex; gap: 8px; font-size: 0.72rem; color: var(--text-tertiary);">
          <span>Confidence: 94%</span> • <span>${confidenceNote}</span>
        </div>
      `;
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }, 700);
  };

  // 7. REPORT GENERATOR & DOWNLOAD SIMULATOR
  window.generateAIReport = function () {
    const btn = document.getElementById('btn-generate-report');
    const preview = document.getElementById('report-preview-container');
    if (!btn || !preview) return;

    btn.disabled = true;
    btn.innerHTML = `
      <svg class="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke-width="4" stroke="rgba(255,255,255,0.2)"></circle>
        <path d="M4 12a8 8 0 018-8" stroke-width="4" stroke="currentColor"></path>
      </svg>
      Compiling Executive Intelligence...
    `;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Regenerate Report
      `;
      preview.style.display = 'block';
      preview.scrollIntoView({ behavior: 'smooth' });
      if (window.showToast) {
        window.showToast('AI Creator Intelligence Report generated successfully.');
      }
    }, 1200);
  };

  window.downloadReport = function () {
    const activePlat = window.currentPlatform || 'youtube';
    const currentItem = (window.getCurrentContentItem ? window.getCurrentContentItem() : null) || (window.getCurrentVideo ? window.getCurrentVideo() : window.currentVideo) || { title: '5 Productivity Hacks' };
    const contentTitle = currentItem.title || 'Active Content Piece';

    const printWindow = window.open('', '_blank', 'width=880,height=800');
    if (!printWindow) {
      if (window.showToast) window.showToast('Please allow popups to export the PDF report.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>DHRISTI AI - Creator Intelligence Executive Audit (${activePlat.toUpperCase()})</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 36px; color: #0f172a; margin: 0; background: #fff; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #6366f1; padding-bottom: 16px; margin-bottom: 20px; }
          h1 { margin: 0; font-size: 20px; color: #1e1b4b; text-transform: uppercase; letter-spacing: 0.05em; }
          .badge { background: #e0e7ff; color: #4338ca; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 11px; }
          .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
          .kpi-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
          .kpi-title { font-size: 11px; color: #64748b; text-transform: uppercase; }
          .kpi-val { font-size: 20px; font-weight: bold; color: #0f172a; margin-top: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 12px; }
          th { background: #f1f5f9; padding: 8px; text-align: left; border: 1px solid #cbd5e1; }
          td { padding: 8px; border: 1px solid #e2e8f0; }
          @media print { button { display: none; } body { padding: 15px; } }
        </style>
      </head>
      <body>
        <div style="text-align: right; margin-bottom: 10px;">
          <button onclick="window.print()" style="padding: 8px 16px; background: #6366f1; color: #fff; font-weight: bold; border: none; border-radius: 6px; cursor: pointer;">
            🖨️ Print / Save as PDF
          </button>
        </div>
        <div class="header">
          <div>
            <span class="badge">दृष्टि (DHRISTI) AI CREATOR INTELLIGENCE</span>
            <h1 style="margin-top: 4px;">Executive Content Performance & Retention Audit</h1>
            <div style="font-size: 12px; color: #64748b; margin-top: 2px;">
              Platform: <strong>${activePlat.toUpperCase()}</strong> • Analyzed Asset: <strong>"${contentTitle}"</strong>
            </div>
          </div>
          <div style="text-align: right; font-size: 12px; color: #64748b;">
            Creator: <strong>Alex Vance (348K Subs)</strong><br>
            Date: <strong>${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
          </div>
        </div>

        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-title">Total Reach / Impressions</div>
            <div class="kpi-val">${currentItem.views || '1.42M Views'}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-title">Watch Time Equivalent</div>
            <div class="kpi-val">${currentItem.watchTimeHours || '84.6K'} Hrs</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-title">Avg Retention / Hold</div>
            <div class="kpi-val">${currentItem.avgRetention || '64.2%'}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-title">AI Satisfaction Score</div>
            <div class="kpi-val" style="color: #6366f1;">${currentItem.satisfactionScore || 82} / 100</div>
          </div>
        </div>

        <h3>Key Forensic & Retention Highlights</h3>
        <table>
          <thead>
            <tr><th>Analysis Dimension</th><th>Finding / Evidence</th><th>Impact Score</th><th>Recommended Strategic Action</th></tr>
          </thead>
          <tbody>
            <tr><td>Hook Velocity</td><td>00:00–00:15 Retention maintained at 94%</td><td>Optimal</td><td>Preserve rapid on-screen question hook format</td></tr>
            <tr><td>Drop-Off Anomaly</td><td>Sharper drop observed around 03:12 transition</td><td>Attention Needed</td><td>Insert dynamic b-roll or sound cue at 03:08</td></tr>
            <tr><td>Rewatch Hotspot</td><td>High replay cluster observed (2.8x baseline)</td><td>Exceptional</td><td>Extract code demo clip into standalone short/reel</td></tr>
            <tr><td>Copyright Safety</td><td>Zero unauthorized third-party audio claims</td><td>Clean (0 Strikes)</td><td>C2PA provenance block registered on-chain</td></tr>
          </tbody>
        </table>

        <div style="margin-top: 30px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between;">
          <span>दृष्टि (DHRISTI) AI Enterprise Engine • Cryptographic Verification Token: SHA256-DHRISTI-REP-${Date.now()}</span>
          <span>Verified Creator Security Protocol Active</span>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);

    if (window.showToast) {
      window.showToast('✅ Executive Creator PDF Report generated. Opening print dialog...');
    }
  };

  // 8. NOTIFICATION TOAST SYSTEM
  window.showToast = function (message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `
      <div style="width: 24px; height: 24px; border-radius: 50%; background: rgba(0, 242, 254, 0.2); display: flex; align-items: center; justify-content: center; color: var(--brand-cyan);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div style="flex: 1; font-weight: 500;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('exiting');
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 350);
    }, 3500);
  };

  // 9. CENTRALIZED THEME STATE & MANAGER
  const THEME_STORAGE_KEY = 'socialpulse_theme';

  const ThemeManager = {
    getTheme() {
      return 'space';
    },

    setTheme(themeName, showToast = false) {
      // Entire application is permanently unified in Dark Theme (Dark Cyber / Space)
      const actualTheme = 'space';

      document.documentElement.setAttribute('data-theme', actualTheme);
      localStorage.setItem(THEME_STORAGE_KEY, actualTheme);

      // Update button UX
      ThemeManager.updateButtonUI(actualTheme);

      // Notify charts and visualizers to re-render with appropriate contrast
      if (window.renderRetentionChart && currentVideo) {
        window.renderRetentionChart(currentVideo);
      }
      if (window.renderSatisfactionGauge && currentVideo) {
        window.renderSatisfactionGauge(currentVideo.satisfactionScore, currentVideo.scoreBreakdown);
      }
      if (window.renderAudienceDonut && currentVideo) {
        window.renderAudienceDonut(currentVideo.audienceSegments);
      }
      if (window.updateCopyrightTheme) {
        window.updateCopyrightTheme(actualTheme);
      }

      if (showToast && window.showToast) {
        window.showToast(`Theme switched to: ${isLight ? 'Executive Daylight' : 'Obsidian Deep Space'}`);
      }

      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 300);
    },

    toggleTheme() {
      const current = ThemeManager.getTheme();
      const next = current === 'light' ? 'space' : 'light';
      ThemeManager.setTheme(next, true);
    },

    updateButtonUI(themeName) {
      const btn = document.getElementById('btn-theme-toggle');
      const text = document.getElementById('btn-theme-toggle-text');
      const icon = document.getElementById('btn-theme-toggle-icon');
      if (!btn) return;

      const isLight = themeName === 'light';
      if (text) {
        text.textContent = isLight ? 'Dark Mode' : 'Light Mode';
      }
      btn.title = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';
      btn.setAttribute('aria-label', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');

      if (icon) {
        if (isLight) {
          // Moon icon
          icon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          `;
        } else {
          // Sun icon
          icon.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          `;
        }
      }
    },

    init() {
      const savedTheme = ThemeManager.getTheme();
      ThemeManager.setTheme(savedTheme, false);
    }
  };

  window.ThemeManager = ThemeManager;
  window.toggleTheme = function () {
    ThemeManager.toggleTheme();
  };

  /* ==========================================================================
     10. CYBERSECURITY ZERO-TRUST STARTUP ACCESS GATE
     ========================================================================== */
  const CYBER_AUTH_KEY = 'socialpulse_cyber_auth';

  window.selectCyberRole = function (roleId) {
    document.querySelectorAll('.cyber-role-btn').forEach(btn => {
      btn.classList.toggle('active', btn.id === `role-btn-${roleId.replace('role-', '')}`);
    });

    const userInput = document.getElementById('cyber-input-user');
    const tokenInput = document.getElementById('cyber-input-token');
    const clearanceTag = document.getElementById('cyber-clearance-tag');

    // Strictly 2 Login Roles (Creator or Influencer, Administrator)
    const roles = {
      'role-creator': {
        name: 'Creator or Influencer',
        user: 'creator@dhristi.ai',
        token: 'CREATOR-STUDIO-2026-KEY',
        clearance: 'CREATOR & INFLUENCER STUDIO CLEARANCE'
      },
      'role-admin': {
        name: 'Administrator',
        user: 'admin@dhristi.gov.in',
        token: 'ADMIN-ROOT-NIC-2026',
        clearance: 'LEVEL-5 GOVERNANCE & AUDIT'
      }
    };

    const role = roles[roleId] || roles['role-creator'];
    if (userInput) userInput.value = role.user;
    if (tokenInput) tokenInput.value = role.token;
    if (clearanceTag) clearanceTag.textContent = role.clearance;
    window.selectedCyberRole = role;
  };

  window.launchBusinessModeDirect = function () {
    sessionStorage.setItem(CYBER_AUTH_KEY, 'active');
    sessionStorage.setItem('sp_gov_role', 'Business');
    sessionStorage.setItem('sp_gov_token', 'biz_token_' + Date.now());
    sessionStorage.setItem('sp_gov_user', JSON.stringify({
      email: 'business@brandpulse.in',
      name: 'Nexus Enterprise Media',
      role: 'Business',
      clearance: 'ENTERPRISE BUSINESS CLEARANCE'
    }));

    const gate = document.getElementById('cyber-gate-screen');
    if (gate) {
      gate.style.display = 'none';
      gate.classList.add('hidden');
      gate.style.pointerEvents = 'none';
    }
    const entryPage = document.getElementById('socialpulse-entry-page');
    if (entryPage) {
      entryPage.style.display = 'none';
      entryPage.style.opacity = '0';
      entryPage.style.pointerEvents = 'none';
    }
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.style.display = 'flex';
      appContainer.style.opacity = '1';
      appContainer.style.pointerEvents = 'auto';
    }

    if (window.switchWorkspaceMode) {
      window.switchWorkspaceMode('government');
    }
    if (window.showToast) {
      window.showToast('🏢 Welcome to दृष्टि (DHRISTI) AI — Enterprise Business Workspace');
    }
  };

  window.launchCreatorModeDirect = function () {
    sessionStorage.setItem(CYBER_AUTH_KEY, 'active');
    sessionStorage.setItem('sp_gov_role', 'Verified Creator');
    sessionStorage.setItem('sp_gov_token', 'creator_token_' + Date.now());
    sessionStorage.setItem('sp_gov_user', JSON.stringify({
      email: 'alex@socialpulse.io',
      name: 'Alex Vance',
      role: 'Verified Creator',
      clearance: 'VERIFIED CREATOR CLEARANCE'
    }));

    const gate = document.getElementById('cyber-gate-screen');
    if (gate) {
      gate.style.display = 'none';
      gate.classList.add('hidden');
      gate.style.pointerEvents = 'none';
    }
    const entryPage = document.getElementById('socialpulse-entry-page');
    if (entryPage) {
      entryPage.style.display = 'none';
      entryPage.style.opacity = '0';
      entryPage.style.pointerEvents = 'none';
    }
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.style.display = 'flex';
      appContainer.style.opacity = '1';
      appContainer.style.pointerEvents = 'auto';
    }

    window.launchGovModeDirect(true);
  };

  window.launchInfluencerModeDirect = function () {
    window.launchGovModeDirect(true);
  };

  window.launchGovModeDirect = async function (isAdmin = true) {
    const roleName = 'Administrator';
    const roleEmail = 'admin@dhristi.gov';
    const roleClearance = 'LEVEL-5 GOVERNANCE & AUDIT';

    sessionStorage.setItem(CYBER_AUTH_KEY, 'active');
    sessionStorage.setItem('sp_gov_role', roleName);
    sessionStorage.setItem('sp_gov_token', 'sp_gov_adm_' + Date.now());
    sessionStorage.setItem('sp_gov_user', JSON.stringify({
      email: roleEmail,
      name: 'Dr. Rajesh Kumar',
      role: roleName,
      clearance: roleClearance
    }));

    // Perform live backend 2FA handshake with SQLite DB if available
    if (window.SocialPulseAPI && window.SocialPulseAPI.loginGov) {
      try {
        const loginRes = await window.SocialPulseAPI.loginGov(roleEmail, 'ADMIN-ROOT-2026-ALPHA');
        if (loginRes && loginRes.challengeToken) {
          const verifyRes = await window.SocialPulseAPI.verifyGov2FA(loginRes.challengeToken, '202609');
          if (verifyRes && verifyRes.token) {
            sessionStorage.setItem('sp_gov_token', verifyRes.token);
            if (window.GovState) {
              window.GovState.sessionToken = verifyRes.token;
              window.GovState.activeRole = 'Administrator';
            }
          }
        }
      } catch (e) {
        console.warn('Backend login handshake skipped in direct mode:', e);
      }
    }

    const gate = document.getElementById('cyber-gate-screen');
    if (gate) {
      gate.style.display = 'none';
      gate.classList.add('hidden');
      gate.style.pointerEvents = 'none';
    }
    const entryPage = document.getElementById('socialpulse-entry-page');
    if (entryPage) {
      entryPage.style.display = 'none';
      entryPage.style.opacity = '0';
      entryPage.style.pointerEvents = 'none';
    }
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.style.display = 'flex';
      appContainer.style.opacity = '1';
      appContainer.style.pointerEvents = 'auto';
    }

    if (window.switchWorkspaceMode) {
      window.switchWorkspaceMode('government');
    }
    if (window.initGovernmentIntelligence) {
      window.initGovernmentIntelligence();
    }
    window.navigateTo('gov-command-center');
    if (window.showToast) {
      window.showToast('👑 दृष्टि सरकारी साइबर सुरक्षा एवं कमांड केंद्र सक्रिय');
    }
  };

  /* ==========================================================================
     ZERO-TRUST DEMO OTP AUTHENTICATION SYSTEM (Government Command Center)
     ========================================================================== */
  window.pendingLoginRole = 'Administrator';

  window.requestLoginWithRole = function (roleName = 'Administrator') {
    window.pendingLoginRole = 'Administrator';
    const credBox = document.getElementById('cyber-credentials-container');
    const otpBox = document.getElementById('cyber-otp-container');
    const badge = document.getElementById('otp-target-role-badge');
    const input = document.getElementById('cyber-demo-otp-input');
    const errBox = document.getElementById('cyber-otp-error');
    const btn = document.getElementById('btn-verify-otp-submit');

    if (badge) {
      badge.textContent = '👑 Administrator Command Center Access';
    }
    if (input) {
      input.value = '';
      input.style.borderColor = 'var(--border-subtle)';
    }
    if (errBox) { errBox.style.display = 'none'; errBox.textContent = ''; }
    if (btn) {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Verify OTP & Enter Command Center</span>
      `;
      btn.style.background = '';
    }

    if (credBox) credBox.style.display = 'none';
    if (otpBox) {
      otpBox.style.display = 'block';
      setTimeout(() => { if (input && typeof input.focus === 'function') input.focus(); }, 120);
    }
  };

  window.backToCredentialsStep = function () {
    const credBox = document.getElementById('cyber-credentials-container');
    const otpBox = document.getElementById('cyber-otp-container');
    if (otpBox) otpBox.style.display = 'none';
    if (credBox) credBox.style.display = 'block';
  };

  window.autoFillDemoOTP = function () {
    const input = document.getElementById('cyber-demo-otp-input');
    if (input) {
      input.value = '202609';
      input.style.borderColor = '#00f2fe';
    }
    const errBox = document.getElementById('cyber-otp-error');
    if (errBox) errBox.style.display = 'none';
    if (window.showToast) window.showToast('Demo OTP 202609 auto-filled.');
  };

  window.verifyCyberDemoOTP = function () {
    const input = document.getElementById('cyber-demo-otp-input');
    const val = input ? input.value.trim() : '';
    const errBox = document.getElementById('cyber-otp-error');

    if (val !== '202609') {
      if (errBox) {
        errBox.style.display = 'block';
        errBox.textContent = '❌ Invalid OTP code. Please enter the preloaded Demo OTP: 202609';
      }
      if (input) input.style.borderColor = '#f43f5e';
      return;
    }

    if (errBox) errBox.style.display = 'none';
    if (input) input.style.borderColor = '#10b981';

    const btn = document.getElementById('btn-verify-otp-submit');
    if (btn) {
      btn.innerHTML = '<span>✓ Biometric & OTP Verified! Access Granted...</span>';
      btn.style.background = '#10b981';
    }

    setTimeout(() => {
      window.launchGovModeDirect(true);
    }, 450);
  };

  window.handleCyberGateLogin = async function (event) {
    if (event) event.preventDefault();
    window.requestLoginWithRole('Administrator');
  };

  window.quickDemoLogin = async function () {
    window.requestLoginWithRole('Administrator');
  };

  /* ==========================================================================
     CONNECT ACCOUNTS SYSTEM (Universal Across Admin & Creator)
     ========================================================================== */
  window.CONNECTED_PLATFORMS = JSON.parse(sessionStorage.getItem('sp_connected_platforms') || JSON.stringify({
    youtube: { name: 'YouTube', icon: '▶', type: 'Channel & Shorts', handle: '@dhristi_creator', connected: true, lastSync: '2m ago' },
    instagram: { name: 'Instagram', icon: '◎', type: 'Professional Reels', handle: '@alex_vance_official', connected: true, lastSync: '5m ago' },
    x: { name: 'X (Twitter)', icon: '𝕏', type: 'Posts & Streams', handle: '@alexvance_tech', connected: true, lastSync: '1m ago' },
    facebook: { name: 'Facebook', icon: 'f', type: 'Pages & Watch', handle: '@dhristi_page', connected: false, lastSync: 'Never' },
    telegram: { name: 'Telegram', icon: '✈', type: 'Intelligence Channel', handle: '@dhristi_intel_feed', connected: false, lastSync: 'Never' },
    whatsapp: { name: 'WhatsApp', icon: '💬', type: 'Community & Alerts', handle: '+91-98765-XXXXX', connected: false, lastSync: 'Never' },
    linkedin: { name: 'LinkedIn', icon: 'in', type: 'Articles & Insights', handle: 'alex-vance-creator', connected: false, lastSync: 'Never' },
    pinterest: { name: 'Pinterest', icon: '📌', type: 'Visual Idea Pins', handle: '@alexvance_pins', connected: true, lastSync: '12m ago' }
  }));

  window.activeConnectPlatformId = 'youtube';

  window.openConnectAccountsModal = function () {
    const modal = document.getElementById('connect-accounts-modal');
    if (!modal) return;
    window.renderConnectPlatformsGrid();
    window.backToConnectPlatformGrid();
    modal.style.display = 'flex';
  };

  window.closeConnectAccountsModal = function () {
    const modal = document.getElementById('connect-accounts-modal');
    if (modal) modal.style.display = 'none';
  };

  window.renderConnectPlatformsGrid = function () {
    const grid = document.querySelector('.connect-platforms-grid');
    if (!grid) return;
    const plats = window.CONNECTED_PLATFORMS;
    grid.innerHTML = Object.entries(plats).map(([id, p]) => `
      <div onclick="window.selectConnectPlatform('${id}')" 
        style="background: rgba(255,255,255,0.03); border: 1px solid ${p.connected ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)'}; border-radius: 10px; padding: 12px; cursor: pointer; transition: all 0.2s ease; display: flex; align-items: center; justify-content: space-between;"
        onmouseover="this.style.borderColor='var(--brand-cyan)'" onmouseout="this.style.borderColor='${p.connected ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.08)'}'">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: #fff;">
            ${p.icon}
          </div>
          <div>
            <strong style="font-size: 0.85rem; color: var(--gov-navy); display: block;">${p.name}</strong>
            <span style="font-size: 0.7rem; color: var(--text-tertiary);">${p.type}</span>
          </div>
        </div>
        <div>
          ${p.connected ? `
            <span style="font-size: 0.65rem; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); color: #10b981; padding: 3px 8px; border-radius: 20px; font-weight: 700;">
              ● LINKED
            </span>
          ` : `
            <span style="font-size: 0.65rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-subtle); color: var(--text-tertiary); padding: 3px 8px; border-radius: 20px;">
              + CONNECT
            </span>
          `}
        </div>
      </div>
    `).join('');
  };

  window.selectConnectPlatform = function (platformId) {
    window.activeConnectPlatformId = platformId;
    const p = window.CONNECTED_PLATFORMS[platformId];
    if (!p) return;

    const step1 = document.getElementById('connect-step-platforms');
    const step2 = document.getElementById('connect-step-credentials');
    const bannerIcon = document.getElementById('connect-banner-icon');
    const bannerName = document.getElementById('connect-banner-name');
    const bannerProto = document.getElementById('connect-banner-protocol');
    const inputHandle = document.getElementById('connect-input-handle');
    const inputSecret = document.getElementById('connect-input-secret');
    const hint = document.getElementById('connect-demo-handle-hint');

    if (bannerIcon) bannerIcon.textContent = p.icon;
    if (bannerName) bannerName.textContent = `${p.name} Account Credentials`;
    if (bannerProto) bannerProto.textContent = `${p.type} • OAuth 2.0 PKCE / Realtime Ingestion`;
    if (inputHandle) inputHandle.value = p.connected ? p.handle : '';
    if (inputSecret) inputSecret.value = p.connected ? '••••••••••••••••' : '';
    if (hint) hint.textContent = p.handle;

    if (step1) step1.style.display = 'none';
    if (step2) step2.style.display = 'block';
  };

  window.backToConnectPlatformGrid = function () {
    const step1 = document.getElementById('connect-step-platforms');
    const step2 = document.getElementById('connect-step-credentials');
    if (step2) step2.style.display = 'none';
    if (step1) step1.style.display = 'block';
  };

  window.autoFillConnectCredentials = function () {
    const p = window.CONNECTED_PLATFORMS[window.activeConnectPlatformId];
    if (!p) return;
    const inputHandle = document.getElementById('connect-input-handle');
    const inputSecret = document.getElementById('connect-input-secret');
    if (inputHandle) inputHandle.value = p.handle;
    if (inputSecret) inputSecret.value = 'SP-SEC-' + window.activeConnectPlatformId.toUpperCase() + '-AUTH-99';
    if (window.showToast) window.showToast(`Preloaded verified credentials for ${p.name}`);
  };

  window.submitConnectCredentials = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const platId = window.activeConnectPlatformId;
    const p = window.CONNECTED_PLATFORMS[platId];
    const inputHandle = document.getElementById('connect-input-handle');
    const handle = inputHandle ? inputHandle.value.trim() : (p ? p.handle : '');

    if (p) {
      p.connected = true;
      p.handle = handle || p.handle;
      p.lastSync = 'Just now';
      sessionStorage.setItem('sp_connected_platforms', JSON.stringify(window.CONNECTED_PLATFORMS));
    }

    if (window.showToast) {
      window.showToast(`✅ Successfully connected to ${p?.name || 'Platform'} (${handle}). Telemetry pipeline active!`);
    }

    window.renderConnectPlatformsGrid();
    window.backToConnectPlatformGrid();
    setTimeout(() => {
      window.closeConnectAccountsModal();
    }, 600);
  };

  window.lockCyberTerminal = async function (reason) {
    if (window.SocialPulseAPI && window.SocialPulseAPI.logoutGov) {
      try {
        await window.SocialPulseAPI.logoutGov();
      } catch (e) {
        console.warn('Logout API error:', e);
      }
    }
    sessionStorage.removeItem(CYBER_AUTH_KEY);
    sessionStorage.removeItem('sp_gov_token');
    sessionStorage.removeItem('sp_gov_role');
    sessionStorage.removeItem('sp_gov_user');
    const gate = document.getElementById('cyber-gate-screen');
    if (gate) {
      gate.style.display = 'flex';
      gate.classList.remove('hidden');
      gate.style.opacity = '1';
      gate.style.pointerEvents = 'auto';
    }
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.style.display = 'none';
    }
    const headerPill = document.getElementById('header-gov-session-pill');
    if (headerPill) headerPill.style.display = 'none';

    if (window.showToast) {
      window.showToast(reason || 'Cyber Terminal Locked. Re-authentication required.');
    }
  };

  function checkInitialCyberAuth() {
    const isAuth = sessionStorage.getItem(CYBER_AUTH_KEY) === 'active';
    const gate = document.getElementById('cyber-gate-screen');
    const entryPage = document.getElementById('socialpulse-entry-page');
    const appContainer = document.querySelector('.app-container');

    if (isAuth) {
      if (gate) {
        gate.style.display = 'none';
        gate.classList.add('hidden');
        gate.style.pointerEvents = 'none';
      }
      if (entryPage) {
        entryPage.style.display = 'none';
        entryPage.style.opacity = '0';
        entryPage.style.pointerEvents = 'none';
      }
      if (appContainer) {
        appContainer.style.display = 'flex';
        appContainer.style.opacity = '1';
        appContainer.style.pointerEvents = 'auto';
      }
      if (window.switchWorkspaceMode) {
        window.switchWorkspaceMode('government');
      }
      if (window.navigateTo) {
        window.navigateTo('gov-command-center');
      }
    } else {
      if (gate) {
        gate.style.display = 'flex';
        gate.classList.remove('hidden');
        gate.style.opacity = '1';
        gate.style.pointerEvents = 'auto';
      }
      if (entryPage) {
        entryPage.style.display = 'none';
        entryPage.style.pointerEvents = 'none';
      }
      if (appContainer) {
        appContainer.style.display = 'none';
        appContainer.style.opacity = '0';
        appContainer.style.pointerEvents = 'none';
      }
    }
  }

  /* ==========================================================================
     11. PLATFORM CYBER DEMO LOGIN MODAL
     ========================================================================== */
  window._pendingPlatformLogin = 'youtube';

  window.openPlatformCyberModal = function (platformId) {
    const plat = platformId || 'youtube';
    window._pendingPlatformLogin = plat;

    const modal = document.getElementById('platform-cyber-login-modal');
    const iconBox = document.getElementById('modal-platform-icon-box');
    const titleEl = document.getElementById('modal-platform-title');
    const subEl = document.getElementById('modal-platform-sub');
    const clientIdEl = document.getElementById('modal-platform-clientid');
    const progressBox = document.getElementById('modal-cyber-progress-box');
    const btnConnect = document.getElementById('btn-modal-cyber-connect');

    const meta = {
      youtube: {
        title: 'YouTube Cyber OAuth 2.0 PKCE',
        sub: 'Google Cloud Identity & YouTube v3 Telemetry Gateway',
        clientId: 'client_id: sp-demo-auth-yt-01.apps.googleusercontent.com',
        icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
        color: '#ff0000'
      },
      instagram: {
        title: 'Instagram Meta Graph Cyber Handshake',
        sub: 'Meta Graph API v19.0 End-to-End Encrypted Telemetry',
        clientId: 'client_id: sp-demo-meta-graph-ig-9482',
        icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
        color: '#e1306c'
      },
      pinterest: {
        title: 'Pinterest v5 API Zero-Trust Token',
        sub: 'Pinterest Business Telemetry & Creative Pin Analytics',
        clientId: 'client_id: sp-demo-pin-v5-live-token',
        icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.211-.174.256-.402.155-1.499-.696-2.435-2.883-2.435-4.643 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>',
        color: '#e60023'
      },
      x: {
        title: 'X (Twitter) OAuth 2.0 PKCE Handshake',
        sub: 'X Developer Platform v2 Real-time Impression Firehose',
        clientId: 'client_id: sp-demo-x-auth-pkce-2026',
        icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
        color: '#ffffff'
      }
    };

    const cur = meta[plat] || meta.youtube;
    if (titleEl) titleEl.textContent = cur.title;
    if (subEl) subEl.textContent = cur.sub;
    if (clientIdEl) clientIdEl.textContent = cur.clientId;
    if (iconBox) {
      iconBox.innerHTML = cur.icon;
      iconBox.style.color = cur.color;
    }
    if (progressBox) progressBox.style.display = 'none';
    if (btnConnect) {
      btnConnect.disabled = false;
      btnConnect.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>1-Click Demo Cyber Login (${plat.toUpperCase()})</span>
      `;
    }

    if (modal) modal.classList.add('open');
  };

  window.closePlatformCyberModal = function () {
    const modal = document.getElementById('platform-cyber-login-modal');
    if (modal) modal.classList.remove('open');
  };

  window.executePlatformCyberDemoLogin = function () {
    const plat = window._pendingPlatformLogin || 'youtube';
    const progressBox = document.getElementById('modal-cyber-progress-box');
    const statusText = document.getElementById('modal-cyber-status-text');
    const pctText = document.getElementById('modal-cyber-pct');
    const progressBar = document.getElementById('modal-cyber-progress-bar');
    const btnConnect = document.getElementById('btn-modal-cyber-connect');

    if (progressBox) progressBox.style.display = 'block';
    if (btnConnect) btnConnect.disabled = true;

    // Step 1: PKCE Challenge
    if (statusText) statusText.textContent = 'Generating PKCE Code Verifier & SHA-256 Challenge...';
    if (pctText) pctText.textContent = '35%';
    if (progressBar) progressBar.style.width = '35%';

    setTimeout(() => {
      // Step 2: Mutual TLS & Zero-Trust Check
      if (statusText) statusText.textContent = 'Mutual TLS 1.3 Handshake & Zero-Knowledge Audit...';
      if (pctText) pctText.textContent = '72%';
      if (progressBar) progressBar.style.width = '72%';

      setTimeout(() => {
        // Step 3: Access Token Issued
        if (statusText) statusText.textContent = 'Access Token Issued. Decrypting Workspace Telemetry...';
        if (pctText) pctText.textContent = '100%';
        if (progressBar) progressBar.style.width = '100%';

        setTimeout(() => {
          window.closePlatformCyberModal();

          // If entry screen is visible, transition into main dashboard
          const entryScreen = document.getElementById('socialpulse-entry-page');
          const appContainer = document.querySelector('.app-container');

          if (entryScreen && entryScreen.style.display !== 'none' && window.SocialPulseEntry) {
            window.SocialPulseEntry.enterDashboard();
          } else if (appContainer && appContainer.style.display === 'none') {
            if (entryScreen) entryScreen.style.display = 'none';
            appContainer.style.display = 'flex';
            appContainer.style.opacity = '1';
          }

          // Switch active platform
          window.selectPlatform(plat);

          if (window.showToast) {
            window.showToast(`${plat.toUpperCase()} Cyber OAuth Handshake Verified. Session Active.`);
          }
        }, 400);
      }, 500);
    }, 450);
  };

  /* ==========================================================================
     12. VOICE ASSISTANT IN CREATOR COPILOT (SPEECH-TO-TEXT & TEXT-TO-SPEECH)
     ========================================================================== */
  let voiceRecognition = null;
  let isVoiceListening = false;
  let voiceTTSActive = true;

  window.initVoiceAssistant = function () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      voiceRecognition = new SpeechRecognition();
      voiceRecognition.continuous = false;
      voiceRecognition.interimResults = false;
      voiceRecognition.lang = 'en-US';

      voiceRecognition.onstart = function () {
        isVoiceListening = true;
        updateVoiceUI(true);
      };

      voiceRecognition.onresult = function (event) {
        if (event.results && event.results[0] && event.results[0][0]) {
          const transcript = event.results[0][0].transcript;
          const transcriptEl = document.getElementById('voice-transcript-display');
          if (transcriptEl) transcriptEl.textContent = `Recognized: "${transcript}"`;
          window.handleVoiceCommand(transcript);
        }
      };

      voiceRecognition.onerror = function (event) {
        console.warn('Voice recognition error:', event.error);
        isVoiceListening = false;
        updateVoiceUI(false);
        const transcriptEl = document.getElementById('voice-transcript-display');
        if (transcriptEl) transcriptEl.textContent = `Voice recognition notice (${event.error}). Click mic to try again or use chips.`;
      };

      voiceRecognition.onend = function () {
        isVoiceListening = false;
        updateVoiceUI(false);
      };
    } catch (e) {
      console.warn('SpeechRecognition initialization notice', e);
    }
  };

  function updateVoiceUI(listening) {
    const micBtn = document.getElementById('btn-copilot-voice');
    const label = document.getElementById('voice-status-label');
    const visualizer = document.querySelector('.voice-wave-visualizer');

    if (micBtn) {
      micBtn.classList.toggle('recording', listening);
    }
    if (label) {
      label.textContent = listening
        ? 'VOICE COPILOT: LISTENING... SPEAK YOUR ACTION OR QUERY NOW'
        : 'VOICE COPILOT: STANDBY (CLICK MIC OR SAY "OPEN MISSION CONTROL")';
      label.style.color = listening ? '#f43f5e' : 'var(--brand-cyan)';
    }
    if (visualizer) {
      visualizer.classList.toggle('active', listening);
    }
  }

  window.toggleVoiceAssistant = function () {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (window.showToast) {
        window.showToast('Microphone Speech API not supported in this browser. Please click the voice prompt chips!');
      }
      const transcriptEl = document.getElementById('voice-transcript-display');
      if (transcriptEl) transcriptEl.textContent = 'Voice API unsupported. Click any voice prompt chip below to execute commands.';
      return;
    }

    if (!voiceRecognition) {
      window.initVoiceAssistant();
    }

    if (isVoiceListening) {
      try { voiceRecognition.stop(); } catch (e) {}
      isVoiceListening = false;
      updateVoiceUI(false);
    } else {
      try {
        voiceRecognition.start();
      } catch (e) {
        console.warn('Recognition start notice', e);
        if (window.showToast) {
          window.showToast('Microphone access requested. Please allow mic permission.');
        }
      }
    }
  };

  window.toggleVoiceTTS = function () {
    voiceTTSActive = !voiceTTSActive;
    const btn = document.getElementById('btn-voice-tts-toggle');
    const label = document.getElementById('voice-tts-label');

    if (btn) btn.classList.toggle('active', voiceTTSActive);
    if (label) label.textContent = `Voice Speech Output: ${voiceTTSActive ? 'ON' : 'OFF'}`;

    if (window.showToast) {
      window.showToast(`Voice Speech Audio: ${voiceTTSActive ? 'Enabled' : 'Muted'}`);
    }
  };

  window.speakResponse = function (text) {
    if (!voiceTTSActive || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/<[^>]*>?/gm, '').replace(/[*_#]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  };

  window.handleVoiceCommand = function (commandText) {
    if (!commandText) return;
    const raw = commandText.trim();
    const cmd = raw.toLowerCase();

    const transcriptEl = document.getElementById('voice-transcript-display');
    if (transcriptEl) transcriptEl.textContent = `Voice Command Received: "${raw}"`;

    let voiceReply = '';

    // Command Parser
    if (cmd.includes('mission control') || cmd.includes('dashboard')) {
      window.navigateTo('dashboard');
      voiceReply = 'Navigating to Mission Control Dashboard.';
    } else if (cmd.includes('retention') || cmd.includes('drop off') || cmd.includes('dropoff') || cmd.includes('hook')) {
      window.navigateTo('retention');
      voiceReply = 'Opening Audience Retention Intelligence and drop-off analysis.';
    } else if (cmd.includes('society') || cmd.includes('trends') || cmd.includes('radar') || cmd.includes('harmful')) {
      window.navigateTo('society-trends');
      voiceReply = 'Displaying Society Impact and Cybersecurity Trend Radar.';
    } else if (cmd.includes('publisher') || cmd.includes('post') || cmd.includes('publish') || cmd.includes('broadcast')) {
      window.navigateTo('publisher');
      voiceReply = 'Opening Cross-Platform Content Publisher Studio.';
    } else if (cmd.includes('report') || cmd.includes('executive')) {
      window.navigateTo('reports');
      voiceReply = 'Loading Multi-Platform Executive Reports Hub.';
    } else if (cmd.includes('audience') || cmd.includes('demographics')) {
      window.navigateTo('audience');
      voiceReply = 'Opening Audience Demographics and segment breakdown.';
    } else if (cmd.includes('copyright') || cmd.includes('radar') || cmd.includes('dmca')) {
      window.navigateTo('copyright');
      voiceReply = 'Opening Copyright Similarity Radar.';
    } else if (cmd.includes('switch to instagram') || (cmd.includes('instagram') && cmd.includes('switch'))) {
      window.selectPlatform('instagram');
      voiceReply = 'Switched active workspace to Instagram Reels Analytics.';
    } else if (cmd.includes('switch to youtube') || (cmd.includes('youtube') && cmd.includes('switch'))) {
      window.selectPlatform('youtube');
      voiceReply = 'Switched active workspace to YouTube Analytics.';
    } else if (cmd.includes('switch to pinterest') || (cmd.includes('pinterest') && cmd.includes('switch'))) {
      window.selectPlatform('pinterest');
      voiceReply = 'Switched active workspace to Pinterest Pin Telemetry.';
    } else if (cmd.includes('switch to x') || cmd.includes('twitter')) {
      window.selectPlatform('x');
      voiceReply = 'Switched active workspace to X Velocity Analytics.';
    } else if (cmd.includes('dark mode') || cmd.includes('light mode') || cmd.includes('theme')) {
      window.toggleTheme();
      voiceReply = 'Visual theme toggled successfully.';
    } else if (cmd.includes('explain drop') || cmd.includes('drop anomaly') || cmd.includes('why drop')) {
      window.openDropModal();
      voiceReply = 'Opening drop anomaly root-cause breakdown.';
    } else {
      window.sendCopilotQuery(raw);
      return;
    }

    // Append Voice Execution to Copilot Messages
    const messagesBox = document.getElementById('copilot-messages');
    if (messagesBox) {
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.textContent = `🎤 "${raw}"`;
      messagesBox.appendChild(userBubble);

      const aiBubble = document.createElement('div');
      aiBubble.className = 'chat-bubble ai';
      aiBubble.innerHTML = `
        <div style="font-size: 0.72rem; color: var(--brand-cyan); font-weight: 700; margin-bottom: 6px;">
          VOICE ASSISTANT EXECUTED
        </div>
        <p>${voiceReply}</p>
      `;
      messagesBox.appendChild(aiBubble);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    if (window.showToast) {
      window.showToast(`Voice Command: "${raw}" -> Executed`);
    }

    window.speakResponse(voiceReply);
  };

  /* ==========================================================================
     13. MISSION CONTROL LIVE TELEMETRY & THUMBNAIL SCROLL-PAST ANALYZER
     ========================================================================== */
  let telemetryLiveActive = true;
  let liveTelemetryTimer = null;

  window.toggleLiveTelemetryFeed = function () {
    telemetryLiveActive = !telemetryLiveActive;
    const dot = document.getElementById('mc-live-dot');
    const text = document.getElementById('mc-live-status-text');
    const btnText = document.getElementById('mc-live-toggle-text');

    if (dot) dot.className = telemetryLiveActive ? 'entry-backend-dot online' : 'entry-backend-dot paused';
    if (btnText) btnText.textContent = telemetryLiveActive ? 'Live Ingestion: ON' : 'Live Ingestion: PAUSED';
    if (text) {
      text.textContent = telemetryLiveActive
        ? '18,420 Active Concurrent Sessions • Ping: 18ms'
        : 'Telemetry Feed Paused • Snapshot Frozen';
    }

    if (window.showToast) {
      window.showToast(`Live Telemetry Ingestion ${telemetryLiveActive ? 'Resumed' : 'Paused'}`);
    }
  };

  function startLiveTelemetrySimulation() {
    if (liveTelemetryTimer) clearInterval(liveTelemetryTimer);
    liveTelemetryTimer = setInterval(() => {
      if (!telemetryLiveActive) return;
      const text = document.getElementById('mc-live-status-text');
      if (text) {
        const jitterSessions = 18400 + Math.floor(Math.random() * 80);
        const ping = 16 + Math.floor(Math.random() * 6);
        text.textContent = `${jitterSessions.toLocaleString()} Active Concurrent Sessions • Ping: ${ping}ms • Ingesting Feed Data`;
      }
    }, 2800);
  }

  window.populateScrollPastVideos = function () {
    const select = document.getElementById('scroll-past-video-select');
    if (!select || !SOCIALPULSE_DATA.videos) return;

    select.innerHTML = SOCIALPULSE_DATA.videos
      .map(v => `<option value="${v.id}">${v.title} (${v.views})</option>`)
      .join('');

    select.value = currentVideo ? currentVideo.id : 'vid-3';
    window.updateScrollPastVideo(select.value);
  };

  window.updateScrollPastVideo = function (videoId) {
    const video = (SOCIALPULSE_DATA.videos && SOCIALPULSE_DATA.videos.find(v => v.id === videoId)) || currentVideo;
    if (!video) return;

    const rawM = video.thumbnailMetrics || {};
    const impressions = rawM.impressionsFormatted || (rawM.feedImpressions ? rawM.feedImpressions.toLocaleString() : (rawM.impressions || '2,450,000'));
    const ghostCount = rawM.scrolledPastCount ? rawM.scrolledPastCount.toLocaleString() : (rawM.ghostScrolledPast || '1,675,800');
    const ghostPct = rawM.scrolledPastPercent !== undefined ? rawM.scrolledPastPercent : (rawM.ghostScrolledPastPercent !== undefined ? rawM.ghostScrolledPastPercent : 68.4);
    const previewCount = rawM.previewCount ? rawM.previewCount.toLocaleString() : (rawM.previewed || '514,500');
    const previewPct = rawM.previewPercent !== undefined ? rawM.previewPercent : (rawM.previewedPercent !== undefined ? rawM.previewedPercent : 21.0);
    const clickedCount = rawM.clickedCount ? rawM.clickedCount.toLocaleString() : (rawM.clicked || '259,700');
    const clickedPct = rawM.clickedPercent !== undefined ? rawM.clickedPercent : (rawM.ctr !== undefined ? rawM.ctr : 10.6);
    const velocity = rawM.avgScrollVelocity || rawM.avgSwipeTime || '1.2s';
    const factor = rawM.primaryScrollPastFactor || rawM.primaryFactor || 'Low font legibility & high clutter on mobile feed';
    const fix = rawM.aiOptimizationTip || rawM.aiRecommendedFix || 'Increase headline text size by 28% and outline with high-contrast glow.';

    const valImpressions = document.getElementById('sp-val-impressions');
    const valAbandoned = document.getElementById('sp-val-abandoned');
    const pctAbandoned = document.getElementById('sp-pct-abandoned');
    const barAbandoned = document.getElementById('sp-bar-abandoned');
    const valPreview = document.getElementById('sp-val-preview');
    const pctPreview = document.getElementById('sp-pct-preview');
    const barPreview = document.getElementById('sp-bar-preview');
    const valClicked = document.getElementById('sp-val-clicked');
    const pctClicked = document.getElementById('sp-pct-clicked');
    const barClicked = document.getElementById('sp-bar-clicked');
    const velocityEl = document.getElementById('sp-feed-velocity');
    const mockTitle = document.getElementById('sp-mock-title');
    const mockThumb = document.getElementById('sp-mock-thumb-title');
    const primaryFactor = document.getElementById('sp-primary-factor');
    const aiFix = document.getElementById('sp-ai-fix');

    if (valImpressions) valImpressions.textContent = impressions;
    if (valAbandoned) valAbandoned.textContent = ghostCount;
    if (pctAbandoned) pctAbandoned.textContent = `${ghostPct}% Drop-Off`;
    if (barAbandoned) barAbandoned.style.width = `${ghostPct}%`;

    if (valPreview) valPreview.textContent = previewCount;
    if (pctPreview) pctPreview.textContent = `${previewPct}% Previewed`;
    if (barPreview) barPreview.style.width = `${previewPct}%`;

    if (valClicked) valClicked.textContent = clickedCount;
    if (pctClicked) pctClicked.textContent = `${clickedPct}% Click-Through`;
    if (barClicked) barClicked.style.width = `${clickedPct}%`;

    if (velocityEl) velocityEl.textContent = `Avg Swipe: ${velocity}`;
    if (mockTitle) mockTitle.textContent = video.title;
    if (mockThumb) mockThumb.textContent = video.title.slice(0, 14) + '...';
    if (primaryFactor) primaryFactor.textContent = factor;
    if (aiFix) aiFix.textContent = fix;
  };

  /* ==========================================================================
     14. MULTI-PLATFORM EXECUTIVE REPORTS HUB
     ========================================================================== */
  window.activeReportPlatform = 'youtube';

  window.switchReportPlatform = function (platformId) {
    window.activeReportPlatform = platformId;

    document.querySelectorAll('.reports-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-report-plat') === platformId);
    });

    const selector = document.getElementById('report-content-selector');
    if (!selector) return;

    let items = [];
    if (platformId === 'youtube') {
      items = SOCIALPULSE_DATA.videos.map(v => ({ id: v.id, title: v.title }));
    } else if (platformId === 'instagram') {
      items = (SOCIALPULSE_DATA.instagram && SOCIALPULSE_DATA.instagram.reels)
        ? SOCIALPULSE_DATA.instagram.reels.map(r => ({ id: r.id, title: r.title }))
        : [{ id: 'reel-1', title: 'Viral Hook Reel' }];
    } else if (platformId === 'pinterest') {
      items = (SOCIALPULSE_DATA.pinterest && SOCIALPULSE_DATA.pinterest.pins)
        ? SOCIALPULSE_DATA.pinterest.pins.map(p => ({ id: p.id, title: p.title }))
        : [{ id: 'pin-1', title: 'Aesthetic Board Pin' }];
    } else if (platformId === 'x') {
      items = (SOCIALPULSE_DATA.x && SOCIALPULSE_DATA.x.posts)
        ? SOCIALPULSE_DATA.x.posts.map(p => ({ id: p.id, title: p.title }))
        : [{ id: 'post-1', title: 'Tech Opinion Post' }];
    } else {
      items = [{ id: 'fleet-all', title: 'Omnichannel Fleet Global Rollup' }];
    }

    selector.innerHTML = items.map(it => `<option value="${it.id}">${it.title}</option>`).join('');
    selector.value = items[0] ? items[0].id : '';

    window.updateReportContentItem(selector.value);
  };

  window.updateReportContentItem = function (contentId) {
    const plat = window.activeReportPlatform || 'youtube';
    const repData = (SOCIALPULSE_DATA.executiveReports && SOCIALPULSE_DATA.executiveReports.platforms && SOCIALPULSE_DATA.executiveReports.platforms[plat])
      || (SOCIALPULSE_DATA.executiveReports && SOCIALPULSE_DATA.executiveReports[plat])
      || {};

    const tagLabel = document.getElementById('report-tag-label');
    const mainTitle = document.getElementById('report-main-title');
    const subMeta = document.getElementById('report-sub-meta');
    const gradeBadge = document.getElementById('report-grade-badge');
    const kpiViews = document.getElementById('report-kpi-views');
    const kpiHours = document.getElementById('report-kpi-hours');
    const kpiRetention = document.getElementById('report-kpi-retention');
    const kpiScrollpast = document.getElementById('report-kpi-scrollpast');
    const execSummary = document.getElementById('report-exec-summary-text');
    const roadmapBox = document.getElementById('report-action-roadmap-box');

    const platNames = {
      youtube: 'YouTube Channel',
      instagram: 'Instagram Professional',
      pinterest: 'Pinterest Business',
      x: 'X Analytics',
      fleet: 'Omnichannel Fleet Composite'
    };

    if (tagLabel) tagLabel.textContent = `DHRISTI AI EXECUTIVE BRIEF • ${platNames[plat].toUpperCase()}`;
    if (mainTitle) mainTitle.textContent = `${platNames[plat]} Performance & Security Telemetry Audit`;
    if (subMeta) subMeta.textContent = `Report generated for: Alex Vance • Analyzed Asset: "${contentId}" • Window: Last 30 Days`;

    // Extract metrics supporting both structures
    const reach = repData.views30Days || (repData.kpis && repData.kpis.reach) || '14.8M Views';
    const engagement = repData.watchTimeHours || (repData.kpis && repData.kpis.engagement) || '892.4K Hours';
    const retention = repData.avgRetentionRate || (repData.kpis && repData.kpis.retentionRate) || '67.4%';
    const dropOff = repData.scrollPastRateAvg || (repData.kpis && repData.kpis.feedDropOff) || '63.2%';
    const score = repData.avgSatisfactionScore || (repData.kpis && repData.kpis.satisfactionGrade) || 86;

    if (kpiViews) kpiViews.textContent = reach;
    if (kpiHours) kpiHours.textContent = engagement;
    if (kpiRetention) kpiRetention.textContent = retention;
    if (kpiScrollpast) kpiScrollpast.textContent = dropOff;
    if (gradeBadge) gradeBadge.textContent = `${score}/100 (OPTIMAL)`;

    const summary = repData.executiveSummary || repData.strategicDiagnosis || '';
    if (execSummary && summary) {
      execSummary.textContent = summary;
    }

    if (roadmapBox && repData.actionRoadmap) {
      roadmapBox.innerHTML = repData.actionRoadmap.map((item, idx) => {
        const text = typeof item === 'string' ? item : `${item.priority ? item.priority + ': ' : ''}${item.task || ''}`;
        return `
          <div style="display: flex; align-items: flex-start; gap: 10px; padding: 8px 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: 6px; font-size: 0.8rem; color: var(--text-primary);">
            <span style="color: var(--brand-cyan); font-weight: 700; font-family: 'JetBrains Mono';">0${idx + 1}.</span>
            <span>${text}</span>
          </div>
        `;
      }).join('');
    }
  };

  window.exportReportCSV = function () {
    const plat = window.activeReportPlatform || 'youtube';
    const repData = (SOCIALPULSE_DATA.executiveReports && SOCIALPULSE_DATA.executiveReports.platforms && SOCIALPULSE_DATA.executiveReports.platforms[plat])
      || (SOCIALPULSE_DATA.executiveReports && SOCIALPULSE_DATA.executiveReports[plat])
      || {};

    const reach = repData.views30Days || (repData.kpis && repData.kpis.reach) || '14.8M Views';
    const engagement = repData.watchTimeHours || (repData.kpis && repData.kpis.engagement) || '892.4K Hours';
    const retention = repData.avgRetentionRate || (repData.kpis && repData.kpis.retentionRate) || '67.4%';
    const dropOff = repData.scrollPastRateAvg || (repData.kpis && repData.kpis.feedDropOff) || '63.2%';
    const score = repData.avgSatisfactionScore || (repData.kpis && repData.kpis.satisfactionGrade) || 86;

    const csvContent = [
      ['Dhristi AI Executive Report', plat.toUpperCase()],
      ['Timestamp', new Date().toISOString()],
      ['Total Reach', reach],
      ['Engagement Units', engagement],
      ['Average Retention', retention],
      ['Feed Scroll-Past (Ghost Viewers)', dropOff],
      ['Satisfaction Score', `${score}/100`],
      ['Audit Status', 'Zero-Trust Verified • ChaCha20-Poly1305']
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `SocialPulse_Audit_${plat}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (window.showToast) {
      window.showToast(`Exported ${plat.toUpperCase()} Telemetry CSV.`);
    }
  };

  /* ==========================================================================
     15. CROSS-PLATFORM CONTENT PUBLISHER STUDIO
     ========================================================================== */
  let activePublisherPlatforms = ['youtube', 'instagram', 'x'];

  window.togglePublisherPlatform = function (btn, platformId) {
    const idx = activePublisherPlatforms.indexOf(platformId);
    if (idx > -1) {
      if (activePublisherPlatforms.length > 1) {
        activePublisherPlatforms.splice(idx, 1);
        if (btn) btn.classList.remove('selected');
      } else {
        if (window.showToast) window.showToast('At least one platform must be selected.');
      }
    } else {
      activePublisherPlatforms.push(platformId);
      if (btn) btn.classList.add('selected');
    }
    window.syncPublisherPreview();
  };

  window.loadPublisherPreset = function (presetId) {
    const presets = (SOCIALPULSE_DATA.publisherLibrary && SOCIALPULSE_DATA.publisherLibrary.presets) || [];
    const found = presets.find(p => p.id === presetId);
    if (!found) return;

    const titleInput = document.getElementById('pub-input-title');
    const captionInput = document.getElementById('pub-input-caption');
    const tagsInput = document.getElementById('pub-input-tags');

    if (titleInput) titleInput.value = found.title;
    if (captionInput) captionInput.value = found.caption;
    if (tagsInput) tagsInput.value = found.tags ? found.tags.split ? found.tags : found.tags.join(' ') : '';

    window.syncPublisherPreview();
    if (window.showToast) {
      window.showToast(`Loaded preset: "${found.title}"`);
    }
  };

  window.syncPublisherPreview = function () {
    const titleInput = document.getElementById('pub-input-title');
    const captionInput = document.getElementById('pub-input-caption');
    const tagsInput = document.getElementById('pub-input-tags');
    const charCount = document.getElementById('pub-char-count');

    const previewGraphicTitle = document.getElementById('preview-graphic-title');
    const previewHeadline = document.getElementById('preview-text-headline');
    const previewCaption = document.getElementById('preview-text-caption');
    const previewTags = document.getElementById('preview-text-tags');

    const title = titleInput ? titleInput.value : '';
    const caption = captionInput ? captionInput.value : '';
    const tags = tagsInput ? tagsInput.value : '';

    if (charCount) charCount.textContent = `${caption.length} chars`;
    if (previewGraphicTitle) previewGraphicTitle.textContent = title.toUpperCase() || 'POST PREVIEW';
    if (previewHeadline) previewHeadline.textContent = title || 'Post Headline';
    if (previewCaption) previewCaption.textContent = caption || 'Post caption goes here...';
    if (previewTags) previewTags.textContent = tags;

    // Security & Compliance Pre-Flight Audit
    const badge = document.getElementById('preflight-status-badge');
    if (badge) {
      const isSuspicious = caption.toLowerCase().includes('http://') || caption.toLowerCase().includes('password') || caption.toLowerCase().includes('secret');
      if (isSuspicious) {
        badge.textContent = 'FLAG DETECTED (REVIEW)';
        badge.style.background = 'rgba(245, 158, 11, 0.15)';
        badge.style.color = 'var(--accent-amber)';
      } else {
        badge.textContent = 'ALL CLEAR (100% SAFE)';
        badge.style.background = 'rgba(16, 185, 129, 0.15)';
        badge.style.color = 'var(--accent-emerald)';
      }
    }
  };

  window.switchPreviewDevice = function (platformId) {
    document.querySelectorAll('#btn-preview-yt, #btn-preview-ig, #btn-preview-x').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-preview-${platformId === 'youtube' ? 'yt' : platformId === 'instagram' ? 'ig' : 'x'}`);
    if (activeBtn) activeBtn.classList.add('active');

    const imageBox = document.getElementById('preview-image-box');
    if (imageBox) {
      if (platformId === 'instagram') {
        imageBox.style.height = '240px';
        imageBox.style.background = 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)';
      } else if (platformId === 'x') {
        imageBox.style.height = '140px';
        imageBox.style.background = 'linear-gradient(135deg, #18181b, #27272a)';
      } else {
        imageBox.style.height = '180px';
        imageBox.style.background = 'linear-gradient(135deg, #0f172a, #1e1b4b)';
      }
    }
  };

  window.executeDirectPublish = function () {
    const btn = document.getElementById('btn-execute-publish');
    const container = document.getElementById('publish-progress-container');
    const statusText = document.getElementById('publish-status-text');
    const pct = document.getElementById('publish-pct');
    const fill = document.getElementById('publish-progress-fill');

    if (!btn || !container) return;

    btn.disabled = true;
    container.style.display = 'block';

    if (statusText) statusText.textContent = 'Encrypting Payload with AES-256 GCM...';
    if (pct) pct.textContent = '25%';
    if (fill) fill.style.width = '25%';

    setTimeout(() => {
      if (statusText) statusText.textContent = `Broadcasting to APIs (${activePublisherPlatforms.map(p => p.toUpperCase()).join(', ')})...`;
      if (pct) pct.textContent = '65%';
      if (fill) fill.style.width = '65%';

      setTimeout(() => {
        if (statusText) statusText.textContent = 'Verifying Global CDN Edge Replication...';
        if (pct) pct.textContent = '90%';
        if (fill) fill.style.width = '90%';

        setTimeout(() => {
          if (statusText) statusText.textContent = 'Published Omnichannel! Content Live Globally.';
          if (pct) pct.textContent = '100%';
          if (fill) fill.style.width = '100%';

          setTimeout(() => {
            container.style.display = 'none';
            btn.disabled = false;
            if (window.showToast) {
              window.showToast(`🚀 Published to ${activePublisherPlatforms.join(', ').toUpperCase()} successfully!`);
            }
          }, 1200);
        }, 500);
      }, 600);
    }, 500);
  };

  /* ==========================================================================
     16. SOCIETY IMPACT & CYBERSECURITY TREND RADAR
     ========================================================================== */
  let currentTrendFilterType = 'all';
  let currentTrendFilterCat = 'all';

  window.renderSocietyTrends = function (filterType, filterCategory) {
    const grid = document.getElementById('society-trends-cards-grid');
    if (!grid || !SOCIALPULSE_DATA.societyTrends) return;

    currentTrendFilterType = filterType || currentTrendFilterType;
    currentTrendFilterCat = filterCategory || currentTrendFilterCat;

    const trends = SOCIALPULSE_DATA.societyTrends.filter(t => {
      const matchType = currentTrendFilterType === 'all' || t.type === currentTrendFilterType;
      const matchCat = currentTrendFilterCat === 'all' || t.category === currentTrendFilterCat;
      return matchType && matchCat;
    });

    grid.innerHTML = trends.map(t => {
      const isBeneficial = t.type === 'beneficial';
      const badgeClass = isBeneficial ? 'beneficial' : 'harmful';
      const badgeText = isBeneficial ? '🟢 BENEFICIAL FOR SOCIETY' : '🔴 HARMFUL / THREAT TO SOCIETY';
      const scoreColor = isBeneficial ? 'var(--accent-emerald)' : 'var(--accent-rose)';
      const impactScoreText = isBeneficial
        ? `+${t.benefitScore || 95}/100 Public Benefit`
        : `-${t.harmScore || 90}/100 Threat Rating`;
      const factCheck = t.factCheckStatus || t.factCheck || 'VERIFIED';
      const desc = t.summary || t.description || '';
      const action = t.recommendedAction || t.creatorAction || '';

      return `
        <div class="trend-card ${badgeClass}">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <span class="trend-badge ${badgeClass}">${badgeText}</span>
            <span class="nav-badge" style="font-family: 'JetBrains Mono'; font-size: 0.7rem;">⚡ Velocity: ${t.velocity}</span>
          </div>

          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--gov-navy); margin-bottom: 6px;">
            ${t.title}
          </h4>

          <div style="display: flex; flex-wrap: wrap; gap: 6px 10px; align-items: center; margin-bottom: 12px; font-size: 0.74rem; word-break: break-word;">
            <span style="color: var(--text-tertiary);">${t.category}</span> •
            <span style="color: ${scoreColor}; font-weight: 700;">${impactScoreText}</span> •
            <span style="color: var(--brand-cyan); font-family: 'JetBrains Mono';">${factCheck}</span>
          </div>

          <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 14px;">
            ${desc}
          </p>

          <div style="padding: 10px 12px; background: rgba(255,255,255,0.03); border-radius: 6px; border-left: 3px solid ${scoreColor}; margin-bottom: 14px;">
            <div style="font-size: 0.68rem; text-transform: uppercase; color: ${scoreColor}; font-weight: 700; margin-bottom: 3px;">
              CREATOR ACTION RECOMMENDATION:
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary);">
              ${action}
            </div>
          </div>

          <button type="button" class="btn btn-secondary" onclick="window.loadTrendIntoPublisher('${t.title.replace(/'/g, "\\'")}')" style="width: 100%; font-size: 0.76rem; padding: 8px; justify-content: center;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span>Draft Content on this Trend</span>
          </button>
        </div>
      `;
    }).join('');
  };

  window.filterSocietyTrends = function (type) {
    document.querySelectorAll('.trend-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.classList.contains(type));
    });
    window.renderSocietyTrends(type, currentTrendFilterCat);
  };

  window.filterSocietyCategory = function (category) {
    window.renderSocietyTrends(currentTrendFilterType, category);
  };

  window.loadTrendIntoPublisher = function (trendTitle) {
    window.navigateTo('publisher');
    const titleInput = document.getElementById('pub-input-title');
    const captionInput = document.getElementById('pub-input-caption');
    if (titleInput) titleInput.value = `Critical Awareness: ${trendTitle}`;
    if (captionInput) captionInput.value = `Important digital awareness breakdown regarding "${trendTitle}". Here is what you need to know to stay safe and protect your community.`;
    window.syncPublisherPreview();
    if (window.showToast) {
      window.showToast(`Loaded trend "${trendTitle}" into Publisher Studio.`);
    }
  };

  window.simulateTrendIngestion = function () {
    const newTrend = {
      id: `trend-live-${Date.now()}`,
      title: 'Zero-Day QR Quishing Attack Wave in Transit Terminals',
      category: 'Social Engineering',
      type: 'harmful',
      velocity: '+320% Viral Surge',
      impactScore: '-92/100 Public Risk',
      factCheck: 'CERT-IN CRITICAL ADVISORY',
      description: 'Physical posters in metro hubs replaced with fraudulent QR payment codes harvesting banking credentials.',
      creatorAction: 'Create immediate visual PSA: Teach viewers how to inspect URL domain before executing QR scanning.'
    };

    if (SOCIALPULSE_DATA.societyTrends) {
      SOCIALPULSE_DATA.societyTrends.unshift(newTrend);
    }
    window.renderSocietyTrends(currentTrendFilterType, currentTrendFilterCat);
    if (window.showToast) {
      window.showToast('🚨 Global Threat Ingestion: Zero-Day Quishing Surge Detected & Placed on Radar.');
    }
  };

  /* ==========================================================================
     CREATOR STUDIO: COPYRIGHT INFRINGERS, SECURITY ALERTS & REALTIME AUDIENCE
     ========================================================================== */

  // 1. Copyright Infringing Accounts Renderer
  window.renderCopyrightInfringers = function () {
    const container = document.getElementById('copyright-infringers-list');
    if (!container) return;

    const infringers = window.CREATOR_COPYRIGHT_INFRINGERS || [];
    if (infringers.length === 0) {
      container.innerHTML = '<div style="padding: 16px; text-align: center; color: var(--text-tertiary);">No infringing re-uploads detected across monitored platforms.</div>';
      return;
    }

    container.innerHTML = infringers.map(inf => `
      <div style="background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 10px; padding: 16px; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
        <div style="display: flex; gap: 12px; flex: 1; min-width: 280px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: #f87171; flex-shrink: 0;">
            ${inf.platform === 'YouTube' ? '▶' : inf.platform === 'Instagram' ? '◎' : '𝕏'}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="font-size: 0.95rem; color: var(--gov-navy);">${inf.channelName}</strong>
              <span style="font-size: 0.75rem; color: var(--text-tertiary); font-family: 'JetBrains Mono';">${inf.channelHandle}</span>
              <span class="nav-badge" style="background: rgba(239,68,68,0.2); color: #f87171; font-weight: 700;">${inf.similarityPercentage} Match</span>
            </div>
            <div style="font-size: 0.76rem; color: var(--text-secondary); margin: 4px 0;">
              Copied Clip: <strong style="color: var(--gov-navy);">"${inf.matchedOriginalTitle}"</strong> • Matched Duration: <span style="color: #fbbf24; font-weight: 600;">${inf.matchedClipRange}</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-tertiary);">
              Platform: <strong>${inf.platform}</strong> • Audience Reach: <span style="color: #f87171;">${inf.viewsAccumulated}</span> • Followers: ${inf.followers || 'N/A'}
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-end; min-width: 200px;">
          ${(inf.actions || []).map(act => `
            <button class="btn btn-secondary" onclick="window.takeCopyrightAction('${inf.id}', '${act}')" 
              style="font-size: 0.74rem; padding: 5px 12px; width: 100%; text-align: center; border-color: rgba(239,68,68,0.35); color: #fca5a5;">
              ⚡ ${act}
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');
  };

  window.takeCopyrightAction = function (infringerId, actionName) {
    const infringers = window.CREATOR_COPYRIGHT_INFRINGERS || [];
    const inf = infringers.find(item => item.id === infringerId);
    if (!inf) return;

    if (actionName.includes('View') || actionName.includes('Receipt') || actionName.includes('Certificate')) {
      // Open modal showing formal signed legal / license notice
      let modal = document.getElementById('copyright-receipt-modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'copyright-receipt-modal';
        modal.className = 'modal-backdrop';
        modal.style.cssText = 'display: flex; align-items: center; justify-content: center; z-index: 10000;';
        document.body.appendChild(modal);
      }
      modal.innerHTML = `
        <div class="modal-dialog platform-cyber-modal-card" style="max-width: 520px; width: 90%;">
          <div class="modal-header" style="border-bottom: 1px solid var(--border-glass); padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.4rem;">📜</span>
              <div>
                <h3 style="margin: 0; font-size: 1.1rem; color: var(--gov-navy);">Copyright Enforcement Record</h3>
                <span style="font-size: 0.72rem; color: var(--brand-cyan); font-family: 'JetBrains Mono';">${inf.caseNumber || ('CASE-CR-' + inf.id.toUpperCase())}</span>
              </div>
            </div>
            <button class="modal-close-btn" onclick="document.getElementById('copyright-receipt-modal').style.display='none'">&times;</button>
          </div>
          <div class="modal-body" style="padding-top: 14px; font-size: 0.8rem; line-height: 1.5; color: var(--text-secondary);">
            <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; margin-bottom: 14px;">
              <div><strong style="color: var(--text-primary);">Infringing Target:</strong> ${inf.channelName || inf.platform} (${inf.platform})</div>
              <div><strong style="color: var(--text-primary);">Stem Match Confidence:</strong> <span style="color: #f43f5e; font-weight: 700;">${inf.matchScore}% Audio-Visual Duplicate</span></div>
              <div><strong style="color: var(--text-primary);">Original Content Hash:</strong> <code style="color: #34d399;">${inf.fingerprintHash || 'sha256-0x98f24a1b09'}</code></div>
              <div><strong style="color: var(--text-primary);">Legal Disposition:</strong> <span style="color: #00f2fe;">${inf.matchStatus}</span></div>
            </div>
            <p style="margin: 0 0 14px; font-size: 0.76rem;">
              Cryptographically verified under Section 52(1)(a) Indian Copyright Act & Global WIPO Treaties. Automated takedown notice dispatched to platform rights manager.
            </p>
            <div style="display: flex; justify-content: flex-end; gap: 8px;">
              <button class="btn btn-secondary" onclick="document.getElementById('copyright-receipt-modal').style.display='none'">Close</button>
              <button class="btn btn-primary" onclick="window.showToast('Official legal certification exported as PDF.'); document.getElementById('copyright-receipt-modal').style.display='none'">Export PDF Copy</button>
            </div>
          </div>
        </div>
      `;
      modal.style.display = 'flex';
      return;
    }

    if (actionName.includes('DMCA') || actionName.includes('Takedown') || actionName.includes('Dispute')) {
      inf.matchStatus = '✓ TAKEDOWN NOTICE FILED (PENDING 24H EXPULSION)';
      inf.caseNumber = 'CASE-DMCA-' + Math.floor(10000 + Math.random() * 90000);
      inf.actions = ['View Filed Notice', 'Monitor Takedown'];
      if (window.showToast) window.showToast(`🛡️ DMCA Notice dispatched for ${inf.channelName}. Reference: ${inf.caseNumber}`);
    } else if (actionName.includes('Monetize') || actionName.includes('Revenue') || actionName.includes('Claim')) {
      inf.matchStatus = '✓ AD REVENUE CLAIM ACTIVE (100% ROUTED TO YOU)';
      inf.caseNumber = 'REV-CLAIM-' + Math.floor(10000 + Math.random() * 90000);
      inf.actions = ['View Revenue Routing Ledger'];
      if (window.showToast) window.showToast(`💰 Monetization claim confirmed. 100% video ad revenue redirected to your account.`);
    } else if (actionName.includes('License') || actionName.includes('Collaborate') || actionName.includes('Allow')) {
      inf.matchStatus = '✓ LICENSED COLLABORATOR (CC-BY 4.0 ATTRIBUTION)';
      inf.caseNumber = 'LIC-CC-' + Math.floor(10000 + Math.random() * 90000);
      inf.actions = ['View CC License Certificate'];
      if (window.showToast) window.showToast(`🤝 Creative Commons attribution license granted to ${inf.channelName}.`);
    } else {
      inf.matchStatus = `✓ ACTION EXECUTED: ${actionName.toUpperCase()}`;
      inf.actions = ['View Enforcement Receipt'];
      if (window.showToast) window.showToast(`Action "${actionName}" executed on case #${inf.id}.`);
    }

    window.renderCopyrightInfringers();
  };

  window.refreshCopyrightInfringers = function () {
    if (window.showToast) window.showToast('↻ Rescanning global social platforms with perceptual audio-video hashing...');
    const btn = document.querySelector('.btn-refresh-radar');
    if (btn) btn.classList.add('animate-spin');

    setTimeout(() => {
      if (btn) btn.classList.remove('animate-spin');
      window.renderCopyrightInfringers();
      if (window.showToast) window.showToast('✅ Global stem rescan complete. Fingerprint ledger updated across all platforms.');
    }, 600);
  };

  // 2. Creator Top-Right Security Alert Drawer
  window.renderCreatorSecurityAlerts = function () {
    const drawer = document.getElementById('creator-security-drawer');
    const badge = document.getElementById('creator-security-badge-count');
    const alerts = window.CREATOR_SECURITY_ALERTS || [];

    if (badge) {
      badge.textContent = alerts.length;
      badge.style.display = alerts.length > 0 ? 'inline-block' : 'none';
    }

    if (!drawer) return;

    drawer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.1rem;">🛡️</span>
          <strong style="font-size: 0.9rem; color: var(--gov-navy);">Account Security & Bot Radar</strong>
        </div>
        <button class="btn btn-secondary" onclick="window.toggleCreatorSecurityDrawer()" style="padding: 2px 8px; font-size: 0.7rem;">✕</button>
      </div>

      <div style="max-height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;">
        ${alerts.length > 0 ? alerts.map(a => `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid ${a.severity === 'CRITICAL' ? 'rgba(239,68,68,0.4)' : a.severity === 'HIGH' ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.08)'}; border-radius: 8px; padding: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
              <strong style="font-size: 0.82rem; color: var(--gov-navy);">${a.title}</strong>
              <span class="nav-badge" style="font-size: 0.62rem; ${a.severity === 'CRITICAL' ? 'background: rgba(239,68,68,0.2); color: #f87171;' : 'background: rgba(245,158,11,0.2); color: #fbbf24;'}">${a.severity}</span>
            </div>
            <p style="font-size: 0.72rem; color: var(--text-secondary); margin: 0 0 8px; line-height: 1.35;">
              ${a.detail}
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
              <span style="font-size: 0.65rem; color: var(--text-tertiary);">${a.timeAgo}</span>
              <button class="btn btn-primary" onclick="window.executeCreatorSecurityCounteraction('${a.id}', '${a.actionKey}')" 
                style="padding: 4px 10px; font-size: 0.7rem; background: #ef4444; border: none; font-weight: 700;">
                ⚡ Auto-Counter Threat
              </button>
            </div>
          </div>
        `).join('') : `
          <div style="padding: 24px; text-align: center; color: var(--text-tertiary); font-size: 0.78rem;">
            No active security threats. Account protected by Zero-Trust shield.
          </div>
        `}
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 10px; margin-top: 10px; text-align: center;">
        <span style="font-size: 0.68rem; color: var(--text-tertiary);">Zero-Trust Protocol • Sybil & Comment Spam Defense</span>
      </div>
    `;
  };

  window.toggleCreatorSecurityDrawer = function () {
    const drawer = document.getElementById('creator-security-drawer');
    if (!drawer) return;
    const isHidden = drawer.style.display === 'none' || !drawer.style.display;
    drawer.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      window.renderCreatorSecurityAlerts();
    }
  };

  window.executeCreatorSecurityCounteraction = function (alertId, actionKey) {
    const messages = {
      purge_bots: '🛡️ Bot swarm eliminated! 340 spam comments auto-purged and bot account IPs blacklisted.',
      terminate_sessions: '🔒 Remote session terminated! Hardware 2FA token rotated and unauthorized IP blocked.',
      report_impersonator: '📢 Automated impersonation takedown packet dispatched to Meta Trust & Safety.',
      view_spam_log: '✅ AI Comment Shield sensitivity increased to maximum. Spam log archived.'
    };

    const alertIndex = (window.CREATOR_SECURITY_ALERTS || []).findIndex(a => a.id === alertId);
    if (alertIndex !== -1) {
      window.CREATOR_SECURITY_ALERTS.splice(alertIndex, 1);
    }

    const msg = messages[actionKey] || 'Countermeasure deployed! Problem neutralized.';
    if (window.showToast) window.showToast(msg);
    window.renderCreatorSecurityAlerts();
  };

  // 3. Realtime Audience Fluctuation Simulator
  let liveAudienceBase = 1420;
  function startAudienceFluctuation() {
    if (window._audienceInterval) clearInterval(window._audienceInterval);
    window._audienceInterval = setInterval(() => {
      const delta = Math.floor(Math.random() * 11) - 5; // -5 to +5
      liveAudienceBase = Math.max(200, liveAudienceBase + delta);
      const audienceEl = document.getElementById('live-audience-fluctuation-counter');
      const deltaEl = document.getElementById('live-audience-delta');
      if (audienceEl) {
        audienceEl.textContent = liveAudienceBase.toLocaleString() + ' live audience';
      }
      if (deltaEl) {
        deltaEl.textContent = '(' + (delta >= 0 ? '+' : '') + delta + '/s)';
        deltaEl.style.color = delta >= 0 ? '#34d399' : '#f43f5e';
      }

      // Also update top header persistent audience indicator
      const hdrAudienceEl = document.getElementById('header-live-audience-counter');
      const hdrDeltaEl = document.getElementById('header-live-audience-delta');
      if (hdrAudienceEl) {
        hdrAudienceEl.textContent = liveAudienceBase.toLocaleString();
      }
      if (hdrDeltaEl) {
        hdrDeltaEl.textContent = '(' + (delta >= 0 ? '+' : '') + delta + '/s)';
        hdrDeltaEl.style.color = delta >= 0 ? '#34d399' : '#f43f5e';
      }
    }, 2400);
  }

  window.setAudienceBaseForContent = function (viewCountStr) {
    if (typeof viewCountStr === 'string') {
      const num = parseInt(viewCountStr.replace(/[^0-9]/g, ''), 10);
      if (!isNaN(num) && num > 0) {
        liveAudienceBase = Math.round(num * 0.001);
      }
    }
  };

  // 4. Universal Post Inspection Modal (Full post telemetry, metrics & provenance)
  window.inspectPostDetail = function (platform, itemId) {
    platform = platform || window.currentPlatform || 'youtube';
    let item = null;

    // 1. Resolve item from datasets
    if (platform === 'youtube') {
      item = (SOCIALPULSE_DATA.videos || []).find(v => v.id === itemId) || (SOCIALPULSE_DATA.videos || [])[0];
    } else if (platform === 'instagram') {
      const ig = SOCIALPULSE_DATA.instagram || {};
      item = (ig.reels || []).find(r => r.id === itemId) ||
             (ig.posts || []).find(p => p.id === itemId) ||
             (ig.stories || []).find(s => s.id === itemId) ||
             (window.CREATOR_PLATFORM_DATA?.instagram?.recentPosts || []).find(p => p.id === itemId) ||
             (ig.reels || [])[0];
    } else if (platform === 'pinterest') {
      const pin = SOCIALPULSE_DATA.pinterest || {};
      item = (pin.pins || []).find(p => p.id === itemId) ||
             (window.CREATOR_PLATFORM_DATA?.pinterest?.recentPosts || []).find(p => p.id === itemId) ||
             (pin.pins || [])[0];
    } else if (platform === 'x') {
      const xData = SOCIALPULSE_DATA.x || {};
      item = (xData.posts || []).find(p => p.id === itemId) ||
             (window.CREATOR_PLATFORM_DATA?.x?.recentPosts || []).find(p => p.id === itemId) ||
             (xData.posts || [])[0];
    } else if (platform === 'facebook') {
      const fb = (window.DrishtiDemo && window.DrishtiDemo.store.facebook) || {};
      item = (fb.posts || []).find(p => p.id === itemId) || (fb.posts || [])[0];
    } else if (platform === 'telegram') {
      const tg = (window.DrishtiDemo && window.DrishtiDemo.store.telegram) || {};
      item = (tg.posts || []).find(p => p.id === itemId) || (tg.posts || [])[0];
    }

    if (!item) {
      if (window.showToast) window.showToast('Item details not found.', 'error');
      return;
    }

    let modal = document.getElementById('post-inspection-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'post-inspection-modal';
      modal.className = 'post-inspection-modal-backdrop';
      document.body.appendChild(modal);
    }

    const platformLabels = {
      youtube: { name: 'YouTube', icon: '▶', color: '#ff4444', badge: 'rgba(239,68,68,0.15)', type: 'Video / Short' },
      instagram: { name: 'Instagram', icon: '◎', color: '#e1306c', badge: 'rgba(225,48,108,0.15)', type: 'Reel / Post' },
      pinterest: { name: 'Pinterest', icon: '📌', color: '#e60023', badge: 'rgba(230,0,35,0.15)', type: 'Pin / Idea Pin' },
      x: { name: 'X (Twitter)', icon: '𝕏', color: '#1da1f2', badge: 'rgba(29,161,242,0.15)', type: 'Post / Thread' },
      facebook: { name: 'Facebook', icon: 'f', color: '#1877f2', badge: 'rgba(24,119,242,0.15)', type: 'Post / Reel' },
      telegram: { name: 'Telegram', icon: '✈', color: '#229ed9', badge: 'rgba(34,158,217,0.15)', type: 'Channel post' }
    };
    const pMeta = platformLabels[platform] || platformLabels.youtube;

    const title = item.title || 'Untitled Post';
    const views = item.views || item.impressions || '1.2M';
    const reach = item.reach || item.impressions || (parseInt(String(views).replace(/[^0-9]/g, '') || '100') * 1.4).toLocaleString();
    const likes = item.likes || (item.metrics ? item.metrics.likes : '48.2K');
    const comments = item.comments ? (typeof item.comments === 'object' ? item.comments.totalCount || '3.4K' : item.comments) : (item.replies || '1.8K');
    const shares = item.shares || item.reposts || item.saves || '12.6K';
    const retention = item.avgRetention || item.retentionPct || (item.completionRate || '68.4%');
    const score = item.satisfactionScore || item.performanceScore || 89;
    const duration = item.duration || item.tag || (platform === 'x' ? 'Thread' : 'Media');
    const timeAgo = item.timeAgo || '3 days ago';
    const gradient = item.gradient || 'linear-gradient(135deg, #00f2fe, #6366f1)';

    modal.innerHTML = `
      <div class="post-inspection-modal-dialog">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 18px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 38px; height: 38px; border-radius: 10px; background: ${pMeta.badge}; border: 1px solid ${pMeta.color}; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: ${pMeta.color};">
              ${pMeta.icon}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="nav-badge" style="background: ${pMeta.badge}; color: ${pMeta.color}; font-size: 0.7rem; font-weight: 700;">${pMeta.name}</span>
                <span style="font-size: 0.72rem; color: var(--text-tertiary);">${pMeta.type} &bull; ${timeAgo}</span>
              </div>
              <h3 style="margin: 2px 0 0; font-size: 1.2rem; color: var(--gov-navy); font-family: 'Outfit', sans-serif; font-weight: 700;">
                ${title}
              </h3>
            </div>
          </div>
          <button type="button" onclick="window.closePostInspectionModal()" class="btn btn-secondary" style="padding: 4px 10px; font-size: 1.1rem; line-height: 1; border-radius: 8px;">✕</button>
        </div>

        <!-- Body Layout -->
        <div style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 20px; margin-bottom: 20px;" class="post-modal-cols">
          <!-- Left: Thumbnail Preview & Quick Health -->
          <div>
            <div style="height: 180px; border-radius: 12px; background: ${gradient}; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <span style="font-size: 2.5rem; opacity: 0.85;">${pMeta.icon}</span>
              <span style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.75); color: #fff; font-size: 0.72rem; font-family: 'JetBrains Mono'; padding: 2px 8px; border-radius: 4px; font-weight: 600;">
                ${duration}
              </span>
            </div>

            <!-- Content Health Card -->
            <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px; margin-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.74rem; color: var(--text-tertiary); text-transform: uppercase; font-weight: 700;">AI Satisfaction Index:</span>
                <strong style="color: var(--accent-emerald); font-size: 1rem;">${score}/100</strong>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; margin-bottom: 10px;">
                <div style="width: ${score}%; height: 100%; background: linear-gradient(90deg, #10b981, #00f2fe); border-radius: 3px;"></div>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); line-height: 1.4;">
                Algorithms favor this content piece for high initial hook velocity and above-benchmark audience retention.
              </div>
            </div>
          </div>

          <!-- Right: Detailed Telemetry Grid & Demographics -->
          <div>
            <!-- Metrics 6 Grid -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px;">
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
                <span style="font-size: 0.68rem; color: var(--text-tertiary); text-transform: uppercase; display: block;">Total Views</span>
                <strong style="font-size: 1.15rem; color: var(--gov-navy);">${views}</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
                <span style="font-size: 0.68rem; color: var(--text-tertiary); text-transform: uppercase; display: block;">Estimated Reach</span>
                <strong style="font-size: 1.15rem; color: var(--brand-cyan);">${reach}</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
                <span style="font-size: 0.68rem; color: var(--text-tertiary); text-transform: uppercase; display: block;">Retention Rate</span>
                <strong style="font-size: 1.15rem; color: var(--accent-emerald);">${retention}</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
                <span style="font-size: 0.68rem; color: var(--text-tertiary); text-transform: uppercase; display: block;">Likes / Favs</span>
                <strong style="font-size: 1.15rem; color: var(--gov-navy);">${likes}</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
                <span style="font-size: 0.68rem; color: var(--text-tertiary); text-transform: uppercase; display: block;">Comments / Replies</span>
                <strong style="font-size: 1.15rem; color: #fbbf24;">${comments}</strong>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px;">
                <span style="font-size: 0.68rem; color: var(--text-tertiary); text-transform: uppercase; display: block;">Shares / Saves</span>
                <strong style="font-size: 1.15rem; color: #a5b4fc;">${shares}</strong>
              </div>
            </div>

            <!-- Demographic Reach Bars -->
            <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; margin-bottom: 14px;">
              <div style="font-size: 0.72rem; color: var(--text-tertiary); font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">
                Audience Demographics Breakdown:
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.72rem;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>18–24 (Gen Z)</span>
                  <span style="color: var(--brand-cyan); font-weight: 700;">44%</span>
                </div>
                <div style="height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden;">
                  <div style="width: 44%; height: 100%; background: var(--brand-cyan);"></div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>25–34 (Millennials)</span>
                  <span style="color: #6366f1; font-weight: 700;">38%</span>
                </div>
                <div style="height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden;">
                  <div style="width: 38%; height: 100%; background: #6366f1;"></div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>35+ (Gen X & Older)</span>
                  <span style="color: #fbbf24; font-weight: 700;">18%</span>
                </div>
                <div style="height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden;">
                  <div style="width: 18%; height: 100%; background: #f59e0b;"></div>
                </div>
              </div>
            </div>

            <!-- Copyright Clearance & Provenance Status -->
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem;">
              <div>
                <strong style="color: #34d399; display: flex; align-items: center; gap: 4px;">
                  <span>🛡️</span> 100% Cleared Original Content
                </strong>
                <span style="color: var(--text-tertiary); font-size: 0.68rem; font-family: 'JetBrains Mono';">ID: ${item.id} &bull; SHA-256 Provenance Verified</span>
              </div>
              <span class="nav-badge" style="background: rgba(16,185,129,0.2); color: #10b981; font-weight: 700;">0 Claims</span>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px;">
          <button type="button" class="btn btn-secondary" onclick="window.closePostInspectionModal()" style="padding: 8px 16px; font-size: 0.8rem;">
            Close
          </button>
          <button type="button" class="btn btn-secondary" onclick="window.downloadReport(); window.closePostInspectionModal();" style="padding: 8px 16px; font-size: 0.8rem;">
            📑 Export Post PDF
          </button>
          <button type="button" class="btn btn-primary" onclick="window.activateAndCloseInspection('${platform}', '${item.id}')" style="padding: 8px 18px; font-size: 0.8rem; background: linear-gradient(135deg, #00f2fe, #6366f1); font-weight: 700;">
            Set as Active Content Workspace
          </button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
  };

  window.closePostInspectionModal = function () {
    const modal = document.getElementById('post-inspection-modal');
    if (modal) modal.style.display = 'none';
  };

  window.activateAndCloseInspection = function (platform, itemId) {
    if (platform === 'youtube' && window.selectVideo) window.selectVideo(itemId);
    else if (platform === 'instagram' && window.selectReel) window.selectReel(itemId);
    else if (platform === 'pinterest' && window.selectPin) window.selectPin(itemId);
    else if (platform === 'x' && window.selectPost) window.selectPost(itemId);

    window.closePostInspectionModal();
    if (window.showToast) window.showToast(`Active workspace updated to "${itemId}"`);
  };

  // Initialize upon DOM load
  document.addEventListener('DOMContentLoaded', () => {
    // 0. Verify Cybersecurity Startup Gate
    checkInitialCyberAuth();

    // 1. Setup 3D Tilt
    setup3DCardTilt();

    // 2. Populate initial video selector options
    const select = document.getElementById('global-video-select');
    if (select) {
      select.innerHTML = SOCIALPULSE_DATA.videos
        .map((v) => `<option value="${v.id}">${v.title} (${v.views})</option>`)
        .join('');
      select.value = currentVideo.id;
      select.addEventListener('change', (e) => {
        window.selectVideo(e.target.value);
      });
    }

    // 3. Connect Nav Items (Click & Touch)
    document.querySelectorAll('.nav-item').forEach((item) => {
      const handleNavAction = (e) => {
        const view = item.getAttribute('data-view');
        if (view === 'gov-command-center') {
          e.preventDefault();
          if (window.navigateToGovSection) {
            window.navigateToGovSection('overview');
          } else if (window.navigateTo) {
            window.navigateTo('gov-command-center');
          }
        } else if (view) {
          e.preventDefault();
          window.navigateTo(view);
        }
      };
      item.addEventListener('click', handleNavAction);
    });

    // 4. Mobile Nav Toggle
    const mobileBtn = document.getElementById('mobile-nav-toggle-btn');
    const sidebar = document.querySelector('.sidebar');
    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }

    // 5. Apply Centralized Theme State
    ThemeManager.init();

    // 6. Initialize New Features
    window.populateScrollPastVideos();
    window.initVoiceAssistant();
    startLiveTelemetrySimulation();
    window.renderSocietyTrends('all', 'all');
    window.syncPublisherPreview();

    // 7. Initialize Default View (Government Intelligence Command Center)
    if (window.switchWorkspaceMode) {
      window.switchWorkspaceMode('government');
    }
    if (window.initGovernmentIntelligence) {
      window.initGovernmentIntelligence();
    }
    window.navigateTo('gov-command-center');
  });

  // Apply saved theme immediately to prevent flashing
  try {
    ThemeManager.init();
  } catch (e) {}
})();
