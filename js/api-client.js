  /**
   * SocialPulse AI - Backend API Integration Client
   * Seamlessly bridges the frontend to the real backend service at http://localhost:5000
   * Falls back to static SOCIALPULSE_DATA automatically if backend is not reachable.
   */

  (function () {
    'use strict';

    // Dynamic Environment-Aware Backend Resolution:
    // 1. Explicit window override (e.g. window.DRISHTI_BACKEND_URL or window.BACKEND_URL)
    // 2. User configured endpoint in localStorage ('drishti_backend_url')
    // 3. Localhost detection: if running on localhost/127.0.0.1, default to http://localhost:5000
    // 4. Production Cloud fallback: https://socialpulse-gateway.onrender.com (matching render.yaml)
    const isLocalhost = Boolean(
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '' ||
      window.location.protocol === 'file:'
    );
    const PRODUCTION_DEFAULT_BACKEND = 'https://socialpulse-gateway.onrender.com';

    const rawBackendUrl = window.DRISHTI_BACKEND_URL ||
      window.BACKEND_URL ||
      localStorage.getItem('drishti_backend_url') ||
      (isLocalhost ? 'http://localhost:5000' : PRODUCTION_DEFAULT_BACKEND);

    const BACKEND_URL = rawBackendUrl.replace(/\/+$/, '');
    window.isBackendConnected = false;

    async function checkBackendStatus() {
      try {
        const res = await fetch(`${BACKEND_URL}/auth/status`, { mode: 'cors' });
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    }

    async function syncChannelProfile() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/channel`);
        if (!res.ok) return;
        const channel = await res.json();

        // Update in-memory data
        SOCIALPULSE_DATA.creator = {
          name: channel.name,
          handle: channel.handle,
          subscribers: channel.subscribers,
          totalViews: channel.totalViews,
          avatarLetter: channel.avatarLetter || 'DH'
        };

        // Update DOM elements in sidebar footer
        const nameEl = document.querySelector('.creator-name');
        const roleEl = document.querySelector('.creator-role');
        const avatarEl = document.querySelector('.creator-avatar');

        if (nameEl) nameEl.textContent = channel.name;
        if (roleEl) roleEl.textContent = `${channel.subscribers} Subscribers`;
        if (avatarEl) {
          avatarEl.textContent = channel.avatarLetter || 'SP';
          if (channel.avatarUrl) {
            avatarEl.style.backgroundImage = `url(${channel.avatarUrl})`;
            avatarEl.style.backgroundSize = 'cover';
          }
        }
      } catch (e) {
        console.warn('[SocialPulse API] Could not sync channel profile:', e);
      }
    }

    async function syncVideosCatalog() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/videos`);
        if (!res.ok) return;
        const data = await res.json();
        if (!data.videos || data.videos.length === 0) return;

        // Update videos collection
        SOCIALPULSE_DATA.videos = data.videos;

        // Re-populate video select dropdown
        const select = document.getElementById('global-video-select');
        if (select && window.currentPlatform === 'youtube') {
          const currentVal = select.value;
          select.innerHTML = data.videos
            .map((v) => `<option value="${v.id}">${v.title} (${v.views})</option>`)
            .join('');

          if (data.videos.some((v) => v.id === currentVal)) {
            select.value = currentVal;
          } else {
            select.value = data.videos[0].id;
            if (window.selectVideo) {
              window.selectVideo(data.videos[0].id);
            }
          }
        }
      } catch (e) {
        console.warn('[SocialPulse API] Could not sync videos catalog:', e);
      }
    }

    async function fetchDetailedVideo(videoId) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/videos/${videoId}`);
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    }

    async function fetchGroundedInsights(itemId, platform = 'youtube') {
      try {
        const res = await fetch(`${BACKEND_URL}/api/insights`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platform, itemId, videoId: itemId })
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.insights;
      } catch (e) {
        return null;
      }
    }

    async function fetchPinterestOverview() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/pinterest/overview`);
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    }

    async function fetchPinterestPins() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/pinterest/pins`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.pins;
      } catch (e) {
        return null;
      }
    }

    async function fetchPinterestPinDetail(pinId) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/pinterest/pins/${pinId}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.pin;
      } catch (e) {
        return null;
      }
    }

    async function fetchXOverview() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/x/overview`);
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    }

    async function fetchXPosts() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/x/posts`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.posts;
      } catch (e) {
        return null;
      }
    }

    async function fetchXPostDetail(postId) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/x/posts/${postId}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.post;
      } catch (e) {
        return null;
      }
    }

    async function fetchCopyrightRadar(platform = 'youtube', itemId, mode = 'demo') {
      console.log('Copyright Radar request started', { platform, itemId, mode });
      try {
        const url = `${BACKEND_URL}/api/copyright/radar?platform=${encodeURIComponent(platform)}&itemId=${encodeURIComponent(itemId || '')}&mode=${encodeURIComponent(mode)}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Copyright Radar response received', data);
        return data;
      } catch (err) {
        console.log('Copyright Radar request failed', err);
        return null;
      }
    }

    async function triggerCopyrightScan(platform = 'youtube', itemId, mode = 'demo') {
      console.log('Copyright Radar request started', { platform, itemId, mode, action: 'scan' });
      try {
        const res = await fetch(`${BACKEND_URL}/api/copyright/scan`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platform, itemId, mode })
        });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        console.log('Copyright Radar response received', data);
        return data;
      } catch (err) {
        console.log('Copyright Radar request failed', err);
        return null;
      }
    }

    // Update UI with connection state badge in header
    // Single modern Connect Accounts button is kept; remove older badge permanently
    function renderConnectionBadge(status) {
      const badge = document.getElementById('backend-status-badge');
      if (badge) badge.remove();
    }

    // Enhance video selection to fetch detailed video analytics from backend
    function hookVideoSelection() {
      const originalSelectVideo = window.selectVideo;
      if (!originalSelectVideo) return;

      window.selectVideo = async function (videoId) {
        // Call original UI updater first
        originalSelectVideo(videoId);

        if (!window.isBackendConnected) return;

        // Fetch live detail from backend if not already fully hydrated
        const liveDetail = await fetchDetailedVideo(videoId);
        if (liveDetail) {
          // Merge into existing video object
          const idx = SOCIALPULSE_DATA.videos.findIndex((v) => v.id === videoId);
          if (idx !== -1) {
            SOCIALPULSE_DATA.videos[idx] = { ...SOCIALPULSE_DATA.videos[idx], ...liveDetail };
            // Trigger chart re-render with fresh live data
            if (window.renderRetentionChart) window.renderRetentionChart(liveDetail);
            if (window.renderSatisfactionGauge) window.renderSatisfactionGauge(liveDetail.satisfactionScore, liveDetail.scoreBreakdown);
            if (window.renderAudienceDonut) window.renderAudienceDonut(liveDetail.audienceSegments);
          }
        }
      };
    }

    // Helper for authenticated government fetch
    function getGovHeaders() {
      const token = sessionStorage.getItem('sp_gov_token');
      return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      };
    }

    /* Government Intelligence API methods */
    async function loginGov(email, token) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gov/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, token })
        });
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    async function verifyGov2FA(challengeToken, otp) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gov/auth/verify-2fa`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ challengeToken, otp })
        });
        const data = await res.json();
        if (data.token) {
          sessionStorage.setItem('sp_gov_token', data.token);
          sessionStorage.setItem('sp_gov_role', data.user.role);
          sessionStorage.setItem('sp_gov_user', JSON.stringify(data.user));
        }
        return data;
      } catch (err) {
        return null;
      }
    }

    async function logoutGov() {
      try {
        await fetch(`${BACKEND_URL}/api/gov/auth/logout`, {
          method: 'POST',
          headers: getGovHeaders()
        });
      } catch (e) {}
      sessionStorage.removeItem('sp_gov_token');
      sessionStorage.removeItem('sp_gov_role');
      sessionStorage.removeItem('sp_gov_user');
    }

    async function checkGovSession() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gov/auth/session`, {
          headers: getGovHeaders()
        });
        if (!res.ok) return null;
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    async function fetchGovEndpoint(path) {
      try {
        const res = await fetch(`${BACKEND_URL}${path}`, {
          headers: getGovHeaders()
        });
        if (!res.ok) return null;
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    async function triggerGovNarrativeAction(narrativeId, actionType) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gov/narratives/${narrativeId}/action`, {
          method: 'POST',
          headers: getGovHeaders(),
          body: JSON.stringify({ actionType })
        });
        return { status: res.status, data: await res.json() };
      } catch (err) {
        return { status: 500, error: err.message };
      }
    }

    async function registerCreatorProvenance(content) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/copyright/provenance/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content })
        });
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    async function fetchCreatorProvenanceChain(contentId) {
      try {
        const url = contentId ? `${BACKEND_URL}/api/copyright/provenance/chain?contentId=${contentId}` : `${BACKEND_URL}/api/copyright/provenance/chain`;
        const res = await fetch(url);
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    async function fetchCreatorSimilarityReport(contentId = 'vid-3') {
      try {
        const res = await fetch(`${BACKEND_URL}/api/copyright/provenance/similarity/${contentId}`);
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    // Initialize API connection
    async function init() {
      const status = await checkBackendStatus();
      renderConnectionBadge(status);

      if (status) {
        window.isBackendConnected = true;
        window.backendAuthStatus = status;
        console.log('⚡ [SocialPulse] Connected to backend API service:', status);

        // Preserve existing dashboard data intact per prompt instructions
        if (window.ENABLE_LIVE_DASHBOARD_DATA) {
          await syncChannelProfile();
          await syncVideosCatalog();
          hookVideoSelection();
        }
      } else {
        console.log(`ℹ️ [Dhristi] Backend not detected on ${BACKEND_URL}. Operating in static demo mode.`);
      }
    }

    
    async function classifyGovContent(payload) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gov/content-filtration/classify`, {
          method: 'POST',
          headers: getGovHeaders(),
          body: JSON.stringify(payload || {})
        });
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    async function scanMissionControlUrl(url) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gov/mission-control/scan-url`, {
          method: 'POST',
          headers: getGovHeaders(),
          body: JSON.stringify({ url })
        });
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    async function executeMissionControlAction(actionType, payload = {}) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gov/mission-control/execute-action`, {
          method: 'POST',
          headers: getGovHeaders(),
          body: JSON.stringify({ actionType, target: payload.target || '', notes: payload.notes || '' })
        });
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    async function executeAlertCountermeasure(alertId, countermeasureType) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gov/alerts/${alertId}/countermeasure`, {
          method: 'POST',
          headers: getGovHeaders(),
          body: JSON.stringify({ countermeasureType })
        });
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    async function submitCitizenCyberReport(reportData) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/gov/cybercrime/report`, {
          method: 'POST',
          headers: getGovHeaders(),
          body: JSON.stringify(reportData)
        });
        return await res.json();
      } catch (err) {
        return null;
      }
    }

    // Multi-Platform Official API Methods
    async function fetchMultiPlatformHealth() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/health`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Health fetch failed:', e);
      }
      return null;
    }

    async function fetchMultiPlatformTrending(platform = '', category = '', query = '', limit = 20) {
      try {
        const params = new URLSearchParams();
        if (platform) params.append('platform', platform);
        if (category) params.append('category', category);
        if (query) params.append('query', query);
        if (limit) params.append('limit', limit);
        const res = await fetch(`${BACKEND_URL}/api/trending?${params.toString()}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Multi-platform trending fetch failed:', e);
      }
      return null;
    }

    async function fetchMultiPlatformStatePulse(state = 'Madhya Pradesh', category = 'Technology', limit = 15) {
      try {
        const params = new URLSearchParams({ state, limit });
        if (category) params.append('category', category);
        const res = await fetch(`${BACKEND_URL}/api/state-pulse?${params.toString()}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Multi-platform state-pulse failed:', e);
      }
      return null;
    }

    async function fetchMultiPlatformNarrativeIntelligence(topic = '', limit = 30) {
      try {
        const params = new URLSearchParams({ limit });
        if (topic) params.append('topic', topic);
        const res = await fetch(`${BACKEND_URL}/api/narrative-intelligence?${params.toString()}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Multi-platform narrative intelligence failed:', e);
      }
      return null;
    }

    async function fetchMultiPlatformAnalytics() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/analytics`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Multi-platform analytics failed:', e);
      }
      return null;
    }

    async function searchPlatformContent(platform, query, limit = 10) {
      try {
        const params = new URLSearchParams({ query, limit });
        const res = await fetch(`${BACKEND_URL}/api/${platform}/search?${params.toString()}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn(`[SocialPulse API] ${platform} search failed:`, e);
      }
      return null;
    }

    async function fetchInstagramStatus() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/instagram/status`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Instagram status fetch failed:', e);
      }
      return null;
    }

    async function fetchInstagramHashtag(hashtag, limit = 15) {
      try {
        const cleanTag = encodeURIComponent((hashtag || '').replace(/^#/, ''));
        const res = await fetch(`${BACKEND_URL}/api/instagram/hashtag/${cleanTag}?limit=${limit}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Instagram hashtag fetch failed:', e);
      }
      return null;
    }

    async function fetchInstagramTrends(limit = 10) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/instagram/trends?limit=${limit}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Instagram trends fetch failed:', e);
      }
      return null;
    }

    async function fetchFacebookStatus() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/facebook/status`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Facebook status fetch failed:', e);
      }
      return null;
    }

    async function fetchFacebookPages() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/facebook/pages`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Facebook pages fetch failed:', e);
      }
      return null;
    }

    async function fetchFacebookFeed(limit = 15) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/facebook/feed?limit=${limit}`);
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[SocialPulse API] Facebook feed fetch failed:', e);
      }
      return null;
    }

    // Expose API client methods globally
    window.SocialPulseAPI = {
      checkStatus: checkBackendStatus,
      fetchChannel: syncChannelProfile,
      fetchVideos: syncVideosCatalog,
      fetchVideoDetail: fetchDetailedVideo,
      fetchInsights: fetchGroundedInsights,
      fetchPinterestOverview,
      fetchPinterestPins,
      fetchPinterestPinDetail,
      fetchXOverview,
      fetchXPosts,
      fetchXPostDetail,
      fetchCopyrightRadar,
      triggerCopyrightScan,
      backendUrl: BACKEND_URL,
      // Multi-Platform Official API Methods
      fetchMultiPlatformHealth,
      fetchMultiPlatformTrending,
      fetchMultiPlatformStatePulse,
      fetchMultiPlatformNarrativeIntelligence,
      fetchMultiPlatformAnalytics,
      searchPlatformContent,
      // Instagram Official API Integration Methods
      fetchInstagramStatus,
      fetchInstagramHashtag,
      fetchInstagramTrends,
      // Facebook Official Meta Graph API Integration Methods
      fetchFacebookStatus,
      fetchFacebookPages,
      fetchFacebookFeed,
      // Government Intelligence Methods
      loginGov,
      verifyGov2FA,
      logoutGov,
      checkGovSession,
      fetchGovViralTrends: (field, platform) => fetchGovEndpoint('/api/gov/trends/viral' + (field || platform ? `?field=${encodeURIComponent(field || '')}&platform=${encodeURIComponent(platform || '')}` : '')),
      fetchGovAiSignal: (id) => fetchGovEndpoint(`/api/gov/trends/${id}/ai-signal`),
      fetchGovSimilarityRadar: (id) => fetchGovEndpoint(`/api/gov/trends/${id}/similarity-radar`),
      fetchGovClusters: () => fetchGovEndpoint('/api/gov/clusters'),
      fetchGovPropagation: (id) => fetchGovEndpoint(`/api/gov/trends/${id}/propagation`),
      fetchGovCoordinationRadar: () => fetchGovEndpoint('/api/gov/coordination-radar'),
      fetchGovNarratives: () => fetchGovEndpoint('/api/gov/narratives'),
      triggerGovNarrativeAction,
      fetchGovPublicImpact: (id) => fetchGovEndpoint(`/api/gov/public-impact?trendId=${id || ''}`),
      fetchGovStatePulse: (state, field) => fetchGovEndpoint(`/api/gov/state-pulse?state=${encodeURIComponent(state || 'Madhya Pradesh')}${field ? `&field=${encodeURIComponent(field)}` : ''}`),
      classifyGovContent,
      scanMissionControlUrl,
      executeMissionControlAction,
      executeAlertCountermeasure,
      submitCitizenCyberReport,
      fetchGovContentFiltration: (category) => fetchGovEndpoint(`/api/gov/content-filtration${category ? `?category=${encodeURIComponent(category)}` : ''}`),
      fetchGovAlerts: () => fetchGovEndpoint('/api/gov/alerts'),
      fetchGovPlatformMatrix: () => fetchGovEndpoint('/api/gov/platform-matrix'),
      fetchGovAuditLogs: () => fetchGovEndpoint('/api/gov/audit-logs'),
      fetchGovTransparencyReport: () => fetchGovEndpoint('/api/gov/transparency-report'),
      // Creator Provenance Methods
      registerCreatorProvenance,
      fetchCreatorProvenanceChain,
      fetchCreatorSimilarityReport
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();

