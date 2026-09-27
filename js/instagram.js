/* ==========================================================================
   SOCIALPULSE AI - INSTAGRAM ANALYTICS RENDER ENGINE
   ========================================================================== */

(function () {
  'use strict';

  let currentIgTab = 'overview';
  let currentReel = null;

  function getIgData() {
    return SOCIALPULSE_DATA.instagram;
  }

  function getCurrentReel() {
    if (!currentReel) {
      const data = getIgData();
      currentReel = data.reels.find((r) => r.id === data.defaultReelId) || data.reels[0];
    }
    return currentReel;
  }

  window.getCurrentReel = getCurrentReel;
  window.getCurrentPlatform = function () {
    return window.currentPlatform || 'youtube';
  };

  function formatContentList(tab) {
    const data = getIgData();
    if (tab === 'reels') return data.reels;
    if (tab === 'posts') return data.posts;
    if (tab === 'stories') return data.stories;
    return data.reels;
  }

  function renderContentCard(item, isReel) {
    const onClick = isReel 
      ? `window.selectReel('${item.id}'); if(window.inspectPostDetail) window.inspectPostDetail('instagram', '${item.id}');` 
      : `if(window.inspectPostDetail) window.inspectPostDetail('instagram', '${item.id}');`;
    const selected = isReel && getCurrentReel().id === item.id ? ' selected' : '';
    const duration = item.duration ? `<span class="video-duration-tag">${item.duration}</span>` : '';
    const badge = item.badge
      ? `<span class="video-status-chip" style="background: rgba(99,102,241,0.15); color: var(--brand-indigo);">${item.badge}</span>`
      : '';

    return `
      <div class="video-card-3d ig-content-card${selected}" data-reel-id="${item.id}" onclick="${onClick}">
        <div class="video-thumb-container ig-reel-thumb">
          <div class="video-thumb-gradient" style="background: ${item.gradient};"></div>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" opacity="0.85"><circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="3" fill="#fff"/></svg>
          ${duration}
        </div>
        <div class="video-card-body">
          <h4 class="video-card-title">${item.title}</h4>
          <div class="video-card-metrics">
            <span>${item.views} views</span>
            <span>${item.reach || item.engagement || ''} ${item.reach ? 'reach' : ''}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
            ${badge}
            ${item.performanceScore ? `<span style="font-size:0.72rem;color:var(--brand-cyan);">Score: ${item.performanceScore}/100</span>` : ''}
          </div>
          <button type="button" class="btn btn-secondary" onclick="event.stopPropagation(); if(window.inspectPostDetail) window.inspectPostDetail('instagram', '${item.id}');" style="margin-top: 8px; width: 100%; font-size: 0.72rem; padding: 3px 8px; border-color: rgba(225,48,108,0.4); color: #f43f5e;">
            🔍 Inspect Post
          </button>
        </div>
      </div>
    `;
  }

  window.renderInstagramDashboard = function (tab) {
    if (tab) currentIgTab = tab;
    const container = document.getElementById('instagram-dashboard-content');
    if (!container) return;

    const data = getIgData();
    const ov = (data.tabMetrics && data.tabMetrics[currentIgTab]) || data.overview;
    const contentList = currentIgTab === 'overview' ? data.reels : formatContentList(currentIgTab);
    const tabLabel = { overview: 'Overview', reels: 'Reels', posts: 'Posts', stories: 'Stories' };

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">
              <span>Instagram Mission Control</span>
              <span class="nav-badge pulse">Real-time</span>
            </h2>
            <p class="page-subtitle">Reels performance, engagement intelligence & content satisfaction</p>
          </div>
          <button class="btn btn-ai" onclick="window.navigateTo('copilot')">
            <svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Ask Creator Copilot</span>
          </button>
        </div>

        <p class="ig-demo-notice">Instagram analytics shown here are simulated demo data for the DHRISTI AI prototype.</p>

        <div class="kpi-grid">
          <div class="kpi-card card-3d">
            <div class="kpi-header"><span class="kpi-title">Total Reach</span><div class="kpi-icon-pill"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg></div></div>
            <div class="kpi-value-row"><span class="kpi-value">${ov.totalReach}</span><span class="kpi-trend up">${ov.reachTrend || '↑ 14.2%'}</span></div>
            <span class="kpi-subtext">Unique accounts reached</span>
          </div>
          <div class="kpi-card card-3d">
            <div class="kpi-header"><span class="kpi-title">Views</span><div class="kpi-icon-pill"><svg viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></div></div>
            <div class="kpi-value-row"><span class="kpi-value">${ov.views}</span><span class="kpi-trend up">${ov.viewsTrend || '↑ 22.6%'}</span></div>
            <span class="kpi-subtext">Total content views</span>
          </div>
          <div class="kpi-card card-3d">
            <div class="kpi-header"><span class="kpi-title">Engagement Rate</span><div class="kpi-icon-pill"><svg viewBox="0 0 24 24" fill="none"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></div></div>
            <div class="kpi-value-row"><span class="kpi-value">${ov.engagementRate}</span><span class="kpi-trend up">${ov.engTrend || '↑ 3.1%'}</span></div>
            <span class="kpi-subtext">Likes, comments, shares & saves</span>
          </div>
          <div class="kpi-card card-3d">
            <div class="kpi-header"><span class="kpi-title">Follower Growth</span><div class="kpi-icon-pill"><svg viewBox="0 0 24 24" fill="none"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg></div></div>
            <div class="kpi-value-row"><span class="kpi-value">${ov.followerGrowth}</span><span class="kpi-trend up">${ov.growthTrend || '↑ 2.4%'}</span></div>
            <span class="kpi-subtext">Net new followers this month</span>
          </div>
          <div class="kpi-card card-3d">
            <div class="kpi-header"><span class="kpi-title">Shares</span><div class="kpi-icon-pill"><svg viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></div></div>
            <div class="kpi-value-row"><span class="kpi-value">${ov.shares}</span><span class="kpi-trend up">${ov.sharesTrend || '↑ 31.8%'}</span></div>
            <span class="kpi-subtext">Content forwarded via DM & stories</span>
          </div>
          <div class="kpi-card card-3d">
            <div class="kpi-header"><span class="kpi-title">Saves</span><div class="kpi-icon-pill"><svg viewBox="0 0 24 24" fill="none"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg></div></div>
            <div class="kpi-value-row"><span class="kpi-value">${ov.saves}</span><span class="kpi-trend up">${ov.savesTrend || '↑ 28.4%'}</span></div>
            <span class="kpi-subtext">Bookmarked for later reference</span>
          </div>
        </div>

        <div class="ig-content-tabs">
          ${['overview', 'reels', 'posts', 'stories']
            .map(
              (t) =>
                `<button class="ig-tab-btn${currentIgTab === t ? ' active' : ''}" onclick="window.renderInstagramDashboard('${t}')">${tabLabel[t]}</button>`
            )
            .join('')}
        </div>

        <div style="margin-top: 28px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 1.25rem; font-family: 'Outfit', sans-serif; font-weight: 700; color: var(--text-primary);">
            ${currentIgTab === 'overview' ? 'Top Performing Content' : `${tabLabel[currentIgTab]} Analytics`}
          </h3>
          <span style="font-size: 0.8rem; color: var(--text-tertiary);">${contentList.length} items synchronized</span>
        </div>

        <div class="video-library-grid ig-content-grid">
          ${contentList.map((item) => renderContentCard(item, currentIgTab === 'overview' || currentIgTab === 'reels')).join('')}
        </div>

        ${currentIgTab === 'overview' ? renderTopPerformingTable(data.reels) : ''}
        ${currentIgTab === 'overview' ? renderContentOpportunities(data.contentOpportunities) : ''}
      </div>
    `;

    if (window.setup3DCardTilt) window.setup3DCardTilt();
  };

  function renderTopPerformingTable(reels) {
    const sorted = [...reels].sort((a, b) => b.performanceScore - a.performanceScore);
    return `
      <div class="glass-panel" style="padding: 24px; margin-top: 28px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px;">Top Performing Content</h3>
        <div class="ig-performance-table">
          ${sorted
            .map(
              (r) => `
            <div class="ig-performance-row" onclick="window.selectReel('${r.id}')">
              <div class="ig-perf-thumb" style="background: ${r.gradient};">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" opacity="0.9"><circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="3" fill="#fff"/></svg>
              </div>
              <div class="ig-perf-info">
                <span class="ig-perf-title">${r.title}</span>
                <span class="ig-perf-meta">${r.views} views · ${r.reach} reach · ${r.engagementRate || '11.4%'} eng</span>
              </div>
              <div class="ig-perf-stats">
                <span class="ig-perf-pill">${r.shares} shares</span>
                <span class="ig-perf-pill">${r.saves} saves</span>
                <span class="ig-perf-score">${r.performanceScore}/100</span>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  function renderContentOpportunities(opp) {
    return `
      <div class="glass-panel" style="padding: 24px; margin-top: 24px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px;">AI Content Opportunities</h3>
        <div class="ig-opportunities-grid">
          <div class="ig-opp-item"><span class="ig-opp-label">Best Topic</span><span class="ig-opp-value">${opp.bestTopic}</span></div>
          <div class="ig-opp-item"><span class="ig-opp-label">Best Format</span><span class="ig-opp-value">${opp.bestFormat}</span></div>
          <div class="ig-opp-item"><span class="ig-opp-label">Best Duration</span><span class="ig-opp-value">${opp.bestDuration}</span></div>
          <div class="ig-opp-item"><span class="ig-opp-label">Best Hook</span><span class="ig-opp-value">${opp.bestHook}</span></div>
          <div class="ig-opp-item"><span class="ig-opp-label">Strongest Signal</span><span class="ig-opp-value">${opp.strongestSignal}</span></div>
        </div>
        <div style="margin-top: 16px; padding: 16px; border-radius: var(--radius-md); background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.35);">
          <div style="font-size: 0.72rem; font-weight: 700; color: var(--brand-cyan); text-transform: uppercase;">AI Recommendation</div>
          <p style="font-size: 0.9rem; color: var(--text-primary); margin-top: 6px; line-height: 1.5;">"${opp.recommendation}"</p>
          <div style="font-size: 0.72rem; color: var(--text-tertiary); margin-top: 8px; font-style: italic;">AI-generated recommendation based on demo analytics.</div>
        </div>
      </div>
    `;
  }

  window.renderInstagramRetention = function () {
    const container = document.getElementById('instagram-retention-content');
    if (!container) return;

    const reel = getCurrentReel();

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">
              <span class="current-video-title">${reel.title}</span>
              <span style="font-size: 1rem; color: var(--text-tertiary); font-weight: 500;">— Hook Intelligence</span>
            </h2>
            <p class="page-subtitle">First-second retention analysis • Reel engagement & replay intelligence</p>
          </div>
          ${reel.anomaly ? `<button class="btn btn-primary" onclick="window.openDropModal()"><svg viewBox="0 0 24 24" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg><span>Explain This Drop</span></button>` : ''}
        </div>

        <div class="glass-panel" style="padding: 20px; margin-bottom: 24px;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 14px;">Reel Performance Metrics</h3>
          <div class="ig-reel-metrics-grid">
            <div class="ig-metric-item"><span class="ig-metric-label">Reel Views</span><span class="ig-metric-value">${reel.views}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Reach</span><span class="ig-metric-value">${reel.reach}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Likes</span><span class="ig-metric-value">${reel.likes}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Comments</span><span class="ig-metric-value">${typeof reel.comments === 'object' ? reel.comments.totalCount : reel.comments}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Shares</span><span class="ig-metric-value">${reel.shares}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Saves</span><span class="ig-metric-value">${reel.saves}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Avg Watch Time</span><span class="ig-metric-value">${reel.avgWatchTime}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Completion Rate</span><span class="ig-metric-value">${reel.completionRate}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Replay Rate</span><span class="ig-metric-value">${reel.replayRate}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Follower Conversion</span><span class="ig-metric-value" style="color: var(--accent-emerald);">${reel.followerConversion || '+4.2%'}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Performance Score</span><span class="ig-metric-value" style="color: var(--brand-cyan);">${reel.performanceScore}/100</span></div>
          </div>
        </div>

        <div class="analytics-workspace-grid">
          <div class="glass-panel retention-container">
            <div class="retention-header">
              <div>
                <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">Hook Intelligence</h3>
                <span style="font-size: 0.75rem; color: var(--text-tertiary);">First-second retention curve with anomaly detection</span>
              </div>
              <div class="chart-legend">
                <div class="legend-item"><span class="legend-dot retention"></span><span>Retention</span></div>
                <div class="legend-item"><span class="legend-dot drop"></span><span>Major Drop</span></div>
                <div class="legend-item"><span class="legend-dot rewatch"></span><span>Rewatch Zone</span></div>
              </div>
            </div>
            <div id="ig-hook-chart-wrapper"></div>
            ${
              reel.anomaly
                ? `
              <div id="ig-retention-anomaly-banner" class="drop-callout-card">
                <div class="drop-callout-left">
                  <div class="drop-badge-icon">⚠</div>
                  <div>
                    <div class="drop-callout-title">
                      <span>Major Drop — ${reel.anomaly.timestamp}</span>
                      <span style="font-size: 0.75rem; padding: 2px 8px; border-radius: 99px; background: rgba(244,63,94,0.2); color: #f43f5e;">${reel.anomaly.label}</span>
                    </div>
                    <div class="drop-callout-desc">${reel.anomaly.hypothesis.substring(0, 80)}...</div>
                  </div>
                </div>
                <button class="btn btn-ai" onclick="window.openDropModal()" style="font-size: 0.8rem; padding: 8px 16px; white-space: nowrap;">
                  <span>Explain This Drop</span>
                </button>
              </div>
            `
                : ''
            }
            <div class="rewatch-timeline-card">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 1.1rem;">🔁</span>
                  <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary);">Rewatch Hotspots</span>
                </div>
                <span style="font-size: 0.72rem; color: var(--accent-amber); font-weight: 600;">${reel.rewatchHotspots.length} Detected Zones</span>
              </div>
              ${reel.rewatchHotspots
                .map(
                  (h) => `
                <div class="rewatch-hotspot-item">
                  <div>
                    <span style="font-weight: 600; color: var(--text-primary); font-size: 0.85rem;">${h.timestamp}</span>
                    <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">${h.note}</p>
                  </div>
                  <span class="rewatch-pill">${h.multiplier} Replay Rate</span>
                </div>
              `
                )
                .join('')}
              <div id="ig-rewatch-timeline"></div>
              <div style="margin-top: 14px; padding: 12px 14px; border-radius: var(--radius-sm); background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25);">
                <div style="font-size: 0.7rem; font-weight: 700; color: var(--accent-amber); text-transform: uppercase; margin-bottom: 2px;">AI Rewatch Intelligence</div>
                <p style="font-size: 0.8rem; color: var(--text-primary); line-height: 1.4;">"This segment received unusually high replay activity and may contain highly valuable, interesting or difficult-to-process information."</p>
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div class="glass-panel satisfaction-card" id="ig-satisfaction-panel">
              <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--brand-cyan); letter-spacing: 0.05em;">Content Satisfaction</span>
              <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-top: 4px;">Performance Score</h3>
              <div class="satisfaction-gauge-wrapper">
                <svg class="satisfaction-circle-svg" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="68" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="12"></circle>
                  <circle id="ig-satisfaction-circle-progress" cx="80" cy="80" r="68" fill="none" stroke="url(#igSatGrad)" stroke-width="12" stroke-linecap="round"></circle>
                  <defs><linearGradient id="igSatGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00f2fe"></stop><stop offset="100%" stop-color="#6366f1"></stop></linearGradient></defs>
                </svg>
                <div class="satisfaction-inner-text">
                  <span class="satisfaction-number" id="ig-satisfaction-number">${reel.satisfactionScore}</span>
                  <span class="satisfaction-total">out of 100</span>
                </div>
              </div>
              <div id="ig-satisfaction-breakdown"></div>
            </div>

            <div class="glass-panel" style="padding: 20px;">
              <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 14px;">Engagement Intelligence</h3>
              <div class="ig-engagement-grid">
                <div class="ig-eng-item"><span>Likes</span><strong>${reel.likes}</strong></div>
                <div class="ig-eng-item"><span>Comments</span><strong>${reel.comments}</strong></div>
                <div class="ig-eng-item"><span>Shares</span><strong>${reel.shares}</strong></div>
                <div class="ig-eng-item"><span>Saves</span><strong>${reel.saves}</strong></div>
              </div>
              <div style="margin-top: 14px;">
                <div class="breakdown-row"><span style="color: var(--text-secondary);">Engagement Rate</span><span style="font-weight: 700; color: var(--text-primary);">${reel.engagementRate}</span></div>
                <div class="breakdown-row" style="margin-top: 8px;"><span style="color: var(--text-secondary);">Shareability Score</span><span style="font-weight: 700; color: var(--accent-emerald);">${reel.shareabilityScore}/100</span></div>
                <div class="breakdown-row" style="margin-top: 8px;"><span style="color: var(--text-secondary);">Saveability Score</span><span style="font-weight: 700; color: var(--brand-cyan);">${reel.saveabilityScore}/100</span></div>
              </div>
              <p style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 14px; line-height: 1.4;">${reel.engagementInterpretation}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    if (window.renderHookChart) window.renderHookChart(reel);
    if (window.renderInstagramSatisfaction) window.renderInstagramSatisfaction(reel.satisfactionScore, reel.scoreBreakdown);
    if (window.renderRewatchTimeline) window.renderRewatchTimeline(reel);
  };

  window.renderInstagramAudience = function () {
    const container = document.getElementById('instagram-audience-content');
    if (!container) return;

    const data = getIgData();
    const aud = data.audienceOverview;
    const reel = getCurrentReel();
    const comments = reel.comments;

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">Instagram Audience Intelligence</h2>
            <p class="page-subtitle">Follower growth, audience segments & comment sentiment analysis</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 24px;">
          <div class="glass-panel" style="padding: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Audience Segments</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 20px;">Distribution across your Instagram audience</p>
            <div id="ig-audience-donut-wrapper" class="donut-svg-wrapper" style="display:flex;justify-content:center;"></div>
            <div class="audience-legend-list" style="margin-top: 16px;">
              <div class="audience-legend-row"><div style="display:flex;align-items:center;gap:8px;"><span style="width:10px;height:10px;border-radius:2px;background:#6366f1;"></span><span style="color: var(--text-primary);font-weight:600;">New Audience</span></div><span style="font-family:'Outfit';font-weight:700;color: var(--text-primary);">${aud.newAudience}%</span></div>
              <div class="audience-legend-row"><div style="display:flex;align-items:center;gap:8px;"><span style="width:10px;height:10px;border-radius:2px;background:#00f2fe;"></span><span style="color: var(--text-primary);font-weight:600;">Returning Audience</span></div><span style="font-family:'Outfit';font-weight:700;color: var(--text-primary);">${aud.returningAudience}%</span></div>
              <div class="audience-legend-row"><div style="display:flex;align-items:center;gap:8px;"><span style="width:10px;height:10px;border-radius:2px;background:#8b5cf6;"></span><span style="color: var(--text-primary);font-weight:600;">Highly Engaged</span></div><span style="font-family:'Outfit';font-weight:700;color: var(--text-primary);">${aud.highlyEngaged}%</span></div>
            </div>
            <div style="margin-top: 20px; padding: 14px; border-radius: var(--radius-md); background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3);">
              <span style="font-size: 0.72rem; font-weight: 700; color: var(--accent-emerald); text-transform: uppercase;">Follower Growth</span>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--text-primary); font-family: 'Outfit'; margin-top: 4px;">${aud.followerGrowth}</div>
            </div>
            <div id="ig-growth-chart-wrapper" style="margin-top: 16px;"></div>
          </div>

          <div class="glass-panel" style="padding: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px;">Audience Activity</h3>
            <div class="ig-activity-grid">
              <div class="ig-activity-item"><span>Most Active Time</span><strong>${aud.mostActiveTime}</strong></div>
              <div class="ig-activity-item"><span>Most Active Day</span><strong>${aud.mostActiveDay}</strong></div>
              <div class="ig-activity-item"><span>Follower Conversion</span><strong>${aud.followerConversion}</strong></div>
              <div class="ig-activity-item"><span>Profile Visits</span><strong>${aud.profileVisits}</strong></div>
              <div class="ig-activity-item"><span>New Followers</span><strong>${aud.newFollowers}</strong></div>
              <div class="ig-activity-item"><span>Audience Engagement</span><strong>${aud.audienceEngagement}</strong></div>
            </div>
          </div>
        </div>

        <div class="glass-panel" style="padding: 24px; margin-top: 24px;">
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Comment Sentiment Intelligence</h3>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 16px;">NLP analysis across ${comments.totalCount} comments on "${reel.title}"</p>
          <div class="comment-sentiment-bar">
            <div class="sentiment-seg sentiment-positive" style="width: ${comments.positive}%;">${comments.positive}% Pos</div>
            <div class="sentiment-seg sentiment-neutral" style="width: ${comments.neutral}%;">${comments.neutral}% Neu</div>
            <div class="sentiment-seg sentiment-negative" style="width: ${comments.negative}%;">${comments.negative}% Neg</div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; color: var(--text-tertiary); margin-bottom: 20px;">
            <span>Positive: ${comments.positive}%</span><span>Neutral: ${comments.neutral}%</span><span>Negative: ${comments.negative}%</span>
          </div>
          <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--brand-cyan); letter-spacing: 0.05em;">Top Discussion Topics</span>
          <div class="topic-chips-group">
            ${comments.trendingTopics.map((t) => `<span class="topic-chip"># ${t}</span>`).join('')}
          </div>
          <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: var(--brand-cyan); letter-spacing: 0.05em; margin-top: 20px; display: block;">Audience Wants</span>
          ${comments.audienceWants
            .map(
              (w) => `
            <div style="margin-top: 10px; padding: 12px 16px; border-radius: var(--radius-md); background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.35);">
              <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">"${w}"</div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    if (window.renderInstagramAudienceDonut) window.renderInstagramAudienceDonut(aud);
    if (window.renderInstagramGrowthChart) window.renderInstagramGrowthChart(aud.growthChart);
  };

  window.renderInstagramInsights = function () {
    const container = document.getElementById('instagram-insights-content');
    if (!container) return;

    const insights = getIgData().insights;

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">AI Strategic Insights</h2>
            <p class="page-subtitle">Instagram intelligence: What Happened, Why It Matters, and Next Action</p>
          </div>
        </div>
        <div class="insights-grid">
          ${insights
            .map(
              (ins) => `
            <div class="insight-card">
              <div class="insight-card-header">
                <span class="insight-icon">${ins.icon}</span>
                <h4 class="insight-card-title">${ins.title}</h4>
              </div>
              <div class="insight-detail-block">
                <div class="insight-label">What Happened</div>
                <div class="insight-text">${ins.whatHappened}</div>
              </div>
              <div class="insight-detail-block">
                <div class="insight-label">Why It Matters</div>
                <div class="insight-text">${ins.whyItMatters}</div>
              </div>
              <div class="insight-detail-block" style="border-left-color: var(--brand-cyan);">
                <div class="insight-label" style="color: var(--brand-cyan);">Recommended Action</div>
                <div class="insight-text" style="color: var(--text-primary); font-weight: 500;">${ins.recommendedAction}</div>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  };

  window.selectReel = function (reelId) {
    const found = getIgData().reels.find((r) => r.id === reelId);
    if (!found) return;
    currentReel = found;
    if (window.setAudienceBaseForContent) {
      window.setAudienceBaseForContent(currentReel.plays || currentReel.reach || '840,000');
    }

    const select = document.getElementById('global-video-select');
    if (select) select.value = reelId;

    document.querySelectorAll('.current-video-title').forEach((el) => {
      el.textContent = currentReel.title;
    });

    const copilotContext = document.getElementById('copilot-context-video');
    if (copilotContext) copilotContext.textContent = `Analyzing: ${currentReel.title}`;

    document.querySelectorAll('.ig-content-card').forEach((card) => {
      if (card.getAttribute('data-reel-id') === reelId) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    if (window.currentView === 'retention' || document.getElementById('view-retention')?.classList.contains('active')) {
      window.renderInstagramRetention();
    }
    if (window.currentView === 'audience' || document.getElementById('view-audience')?.classList.contains('active')) {
      window.renderInstagramAudience();
    }
    if (window.currentView === 'copyright' || document.getElementById('view-copyright')?.classList.contains('active')) {
      if (typeof window.renderCopyrightRadar === 'function') {
        window.renderCopyrightRadar('instagram', currentReel);
      }
    }

    if (window.showToast) {
      window.showToast(`Switched workspace to: "${currentReel.title}"`);
    }
  };

  window.updateCopilotForPlatform = function (platform) {
    const chipsContainer = document.querySelector('.copilot-prompt-chips');
    const inputEl = document.getElementById('copilot-input-field');
    const contextEl = document.getElementById('copilot-context-video');

    if (platform === 'instagram') {
      const prompts = getIgData().copilotPrompts;
      if (chipsContainer) {
        chipsContainer.innerHTML = prompts
          .map((p) => `<span class="prompt-chip" onclick="window.sendCopilotQuery('${p.replace(/'/g, "\\'")}')">${p}</span>`)
          .join('');
      }
      if (inputEl) inputEl.placeholder = 'Ask Dhristi Copilot anything about your Instagram Reels...';
      if (contextEl) contextEl.textContent = `Analyzing: ${getCurrentReel().title}`;
    } else {
      const prompts = [
        'Why did my video perform poorly?',
        'Where did viewers lose interest?',
        'What should I improve?',
        'Which content performs best?',
        'What should I make next?',
        'Why are people rewatching this section?'
      ];
      if (chipsContainer) {
        chipsContainer.innerHTML = prompts
          .map((p) => `<span class="prompt-chip" onclick="window.sendCopilotQuery('${p}')">${p}</span>`)
          .join('');
      }
      if (inputEl) inputEl.placeholder = 'Ask Dhristi Copilot anything about your video...';
    }
  };

  window.renderAllInstagramViews = function () {
    window.renderInstagramDashboard(currentIgTab);
    window.renderInstagramRetention();
    window.renderInstagramAudience();
    window.renderInstagramInsights();
  };

  window.populateInstagramContentSelector = function () {
    const select = document.getElementById('global-video-select');
    if (!select) return;
    select.innerHTML = getIgData()
      .reels.map((r) => `<option value="${r.id}">${r.title} (${r.views})</option>`)
      .join('');
    select.value = getCurrentReel().id;
  };
})();
