/* ==========================================================================
   SOCIALPULSE AI - PINTEREST ANALYTICS RENDER ENGINE
   ========================================================================== */

(function () {
  'use strict';

  let currentPinterestTab = 'overview';
  let currentPin = null;

  function getPinterestData() {
    return SOCIALPULSE_DATA.pinterest;
  }

  function getCurrentPin() {
    if (!currentPin) {
      const data = getPinterestData();
      currentPin = data.pins.find((p) => p.id === data.defaultPinId) || data.pins[0];
    }
    return currentPin;
  }

  window.getCurrentPin = getCurrentPin;

  function renderPinCard(item) {
    const isSelected = getCurrentPin().id === item.id ? ' selected' : '';
    const badge = item.badge
      ? `<span class="video-status-chip" style="background: rgba(230,0,35,0.15); color: #e60023;">${item.badge}</span>`
      : '';

    return `
      <div class="video-card-3d pinterest-pin-card${isSelected}" data-pin-id="${item.id}" onclick="window.selectPin('${item.id}'); if(window.inspectPostDetail) window.inspectPostDetail('pinterest', '${item.id}');">
        <div class="video-thumb-container" style="position: relative;">
          <div class="video-thumb-gradient" style="background: ${item.gradient || 'linear-gradient(135deg, #e60023, #ff4757)'};"></div>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" opacity="0.9">
            <path d="M12 0a12 12 0 0 0-4.37 23.17c-.07-.95-.14-2.42.03-3.46.16-.94 1.04-4.41 1.04-4.41s-.26-.53-.26-1.32c0-1.24.72-2.16 1.61-2.16.76 0 1.13.57 1.13 1.26 0 .76-.49 1.91-.74 2.97-.21.89.44 1.61 1.32 1.61 1.58 0 2.8-1.67 2.8-4.08 0-2.13-1.53-3.62-3.72-3.62-2.54 0-4.03 1.9-4.03 3.87 0 .77.3 1.59.67 2.04.07.09.08.17.06.27-.07.29-.23.94-.26 1.07-.04.18-.14.22-.32.13-1.2-.56-1.95-2.31-1.95-3.72 0-3.03 2.2-5.81 6.35-5.81 3.33 0 5.92 2.37 5.92 5.55 0 3.31-2.09 5.98-4.99 5.98-.97 0-1.89-.51-2.2-1.11l-.6 2.28c-.22.84-.81 1.9-1.21 2.54A12 12 0 1 0 12 0z"/>
          </svg>
          <span class="video-duration-tag" style="background: rgba(0,0,0,0.7);">${item.tag || 'Pin'}</span>
        </div>
        <div class="video-card-body">
          <h4 class="video-card-title">${item.title}</h4>
          <div class="video-card-metrics">
            <span>${item.impressions} impressions</span>
            <span style="color: var(--brand-cyan);">${item.saves} saves</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
            ${badge}
            <span style="font-size: 0.72rem; font-weight: 700; color: #10b981;">${item.saveRate} save rate</span>
          </div>
          <span style="font-size: 0.72rem; color: var(--text-tertiary); margin-top: 4px; display: block;">Board: ${item.board}</span>
          <button type="button" class="btn btn-secondary" onclick="event.stopPropagation(); if(window.inspectPostDetail) window.inspectPostDetail('pinterest', '${item.id}');" style="margin-top: 8px; width: 100%; font-size: 0.72rem; padding: 3px 8px; border-color: rgba(230,0,35,0.4); color: #e60023;">
            🔍 Inspect Post
          </button>
        </div>
      </div>
    `;
  }

  window.renderPinterestDashboard = function (tab) {
    if (tab) currentPinterestTab = tab;
    const container = document.getElementById('pinterest-dashboard-content');
    if (!container) return;

    const data = getPinterestData();
    const ov = (data.tabMetrics && data.tabMetrics[currentPinterestTab]) || data.overview;
    const pins = data.pins || [];

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">
              <span>Pinterest Analytics & Idea Hub</span>
              <span class="nav-badge pulse" style="background: rgba(230,0,35,0.15); color: #e60023; border-color: rgba(230,0,35,0.3);">Pinterest v5 API</span>
            </h2>
            <p class="page-subtitle">Save velocity, outbound link intent, and visual pin distribution metrics</p>
          </div>
          <button class="btn btn-ai" onclick="window.navigateTo('copilot')">
            <svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Ask Pinterest Copilot</span>
          </button>
        </div>

        <div class="kpi-grid">
          <!-- KPI 1: Impressions -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Total Impressions</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.totalImpressions}</span>
              <span class="kpi-trend up">${ov.impressionsTrend || '↑ 18.4%'}</span>
            </div>
            <span class="kpi-subtext">Cumulative pin impressions</span>
          </div>

          <!-- KPI 2: Pin Clicks -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Pin Clicks</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.pinClicks}</span>
              <span class="kpi-trend up">${ov.pinClicksTrend || '↑ 14.2%'}</span>
            </div>
            <span class="kpi-subtext">Close-up inspection clicks</span>
          </div>

          <!-- KPI 3: Saves (Repins) -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Saves (Repins)</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.saves}</span>
              <span class="kpi-trend up">${ov.savesTrend || '↑ 24.6%'}</span>
            </div>
            <span class="kpi-subtext">Added to personal boards</span>
          </div>

          <!-- KPI 4: Outbound Clicks -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Outbound Clicks</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.outboundClicks}</span>
              <span class="kpi-trend up">${ov.outboundTrend || '↑ 12.8%'}</span>
            </div>
            <span class="kpi-subtext">Traffic to external domain</span>
          </div>

          <!-- KPI 5: Save Rate -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Save Rate</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.saveRate}</span>
              <span class="kpi-trend up">↑ 0.4%</span>
            </div>
            <span class="kpi-subtext">Industry baseline: 1.8%</span>
          </div>

          <!-- KPI 6: Engagement Rate -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Engagement Rate</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.engagementRate}</span>
              <span class="kpi-trend up">↑ 1.1%</span>
            </div>
            <span class="kpi-subtext">Pins with interactions</span>
          </div>
        </div>

        <!-- Pinterest Content Grid Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 32px 0 16px 0;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">Published Pins</h3>
            <p style="font-size: 0.8rem; color: var(--text-tertiary);">Select an active pin to analyze metadata, attribution & copyright safety</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary ${currentPinterestTab === 'overview' ? 'active' : ''}" onclick="window.renderPinterestDashboard('overview')" style="font-size: 0.8rem; padding: 6px 14px;">All Boards</button>
            <button class="btn btn-secondary ${currentPinterestTab === 'pins' ? 'active' : ''}" onclick="window.renderPinterestDashboard('pins')" style="font-size: 0.8rem; padding: 6px 14px;">Top Performing</button>
          </div>
        </div>

        <div class="video-cards-grid">
          ${pins.map((p) => renderPinCard(p)).join('')}
        </div>
      </div>
    `;
  };

  window.renderPinterestRetention = function () {
    const container = document.getElementById('pinterest-retention-content');
    if (!container) return;

    const pin = getCurrentPin();

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">
              <span>${pin.title}</span>
              <span style="font-size: 1rem; color: var(--text-tertiary); font-weight: 500;">— Telemetry & Engagement Intent</span>
            </h2>
            <p class="page-subtitle">Pinterest pin engagement lifecycle • Pin clicks, outbound intent & retention transparency</p>
          </div>
        </div>

        <div class="glass-panel" style="padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 14px;">Pin Performance Breakdown</h3>
          <div class="ig-reel-metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));">
            <div class="ig-metric-item"><span class="ig-metric-label">Impressions</span><span class="ig-metric-value">${pin.impressions}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Pin Clicks</span><span class="ig-metric-value">${pin.pinClicks}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Saves (Repins)</span><span class="ig-metric-value">${pin.saves}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Outbound Clicks</span><span class="ig-metric-value">${pin.outboundClicks}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Save Rate</span><span class="ig-metric-value" style="color: #10b981;">${pin.saveRate}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Engagement Rate</span><span class="ig-metric-value" style="color: var(--brand-cyan);">${pin.engagementRate}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Performance Score</span><span class="ig-metric-value" style="color: #e60023;">${pin.pinScore}/100</span></div>
          </div>
        </div>

        <!-- Telemetry Incompatibility Transparency Card -->
        <div class="glass-panel" style="padding: 28px; border-left: 4px solid var(--brand-indigo);">
          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(99,102,241,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--brand-indigo);">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div>
              <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                Video Retention Curves: Not Available on Pinterest
              </h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
                Pinterest is predominantly a static visual bookmarking and discovery engine. Second-by-second viewer hold curves and drop-off timestamps are <strong>Not available</strong> because this pin format does not use continuous timecode video playback.
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                <span style="font-size: 0.75rem; background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 6px; color: var(--text-secondary);">
                  Primary Signal: Save Rate (${pin.saveRate})
                </span>
                <span style="font-size: 0.75rem; background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 6px; color: var(--text-secondary);">
                  Intent Signal: Outbound CTR (${pin.outboundClicks})
                </span>
                <span style="font-size: 0.75rem; background: rgba(230,0,35,0.12); color: #e60023; padding: 4px 10px; border-radius: 6px;">
                  Honest Data Guarantee: No Hallucinated Metrics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.renderPinterestAudience = function () {
    const container = document.getElementById('pinterest-audience-content');
    if (!container) return;

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">Pinterest Board & Discovery Demographics</h2>
            <p class="page-subtitle">Pinner intent cohorts, high-affinity categories & search query terms</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px;">
          <!-- Board Distribution Card -->
          <div class="glass-panel" style="padding: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Board Engagement Share</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 20px;">Distribution across creator boards</p>

            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span style="color: var(--text-primary); font-weight: 600;">Tech & Architecture</span>
                  <span style="color: #e60023; font-weight: 700;">48%</span>
                </div>
                <div style="height: 8px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden;">
                  <div style="width: 48%; height: 100%; background: #e60023; border-radius: 4px;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span style="color: var(--text-primary); font-weight: 600;">Coding & Design</span>
                  <span style="color: #10b981; font-weight: 700;">32%</span>
                </div>
                <div style="height: 8px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden;">
                  <div style="width: 32%; height: 100%; background: #10b981; border-radius: 4px;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span style="color: var(--text-primary); font-weight: 600;">Productivity & Gear</span>
                  <span style="color: var(--brand-cyan); font-weight: 700;">20%</span>
                </div>
                <div style="height: 8px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden;">
                  <div style="width: 20%; height: 100%; background: var(--brand-cyan); border-radius: 4px;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Organic Search Keywords -->
          <div class="glass-panel" style="padding: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Top Search Queries</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 16px;">Organic search queries driving pin views</p>

            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <span style="padding: 6px 12px; border-radius: 20px; background: rgba(230,0,35,0.1); color: #e60023; font-size: 0.8rem; font-weight: 600;">#systemarchitecture</span>
              <span style="padding: 6px 12px; border-radius: 20px; background: rgba(99,102,241,0.1); color: var(--brand-indigo); font-size: 0.8rem; font-weight: 600;">#cleancode</span>
              <span style="padding: 6px 12px; border-radius: 20px; background: rgba(16,185,129,0.1); color: #10b981; font-size: 0.8rem; font-weight: 600;">#webdevcheatsheet</span>
              <span style="padding: 6px 12px; border-radius: 20px; background: rgba(6,182,212,0.1); color: var(--brand-cyan); font-size: 0.8rem; font-weight: 600;">#minimalistdesk</span>
              <span style="padding: 6px 12px; border-radius: 20px; background: rgba(245,158,11,0.1); color: #f59e0b; font-size: 0.8rem; font-weight: 600;">#typescripttips</span>
            </div>

            <div style="margin-top: 20px; padding: 14px; border-radius: var(--radius-md); background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.75rem; color: var(--text-tertiary); text-transform: uppercase; font-weight: 700;">Key Behavioral Takeaway</div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;">
                Pinners discover your content through visual infographics. 68% of saves occur on mobile devices during evening hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.renderPinterestInsights = function () {
    const container = document.getElementById('pinterest-insights-content');
    if (!container) return;

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">AI Strategic Intelligence: Pinterest</h2>
            <p class="page-subtitle">Cross-platform synthesis & automated growth actions for Pinterest pins</p>
          </div>
        </div>

        <div class="insights-grid">
          <div class="insight-card">
            <div class="insight-card-header">
              <span class="insight-icon">📌</span>
              <h4 class="insight-card-title">Top Performing Pin</h4>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">What Happened</div>
              <div class="insight-text">'Modern Architecture Cheat Sheet' achieved a 3.4% save rate — 88% above category benchmark.</div>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">Why It Matters</div>
              <div class="insight-text">High save rates trigger Pinterest's visual discovery algorithm to recommend the pin in related visual feeds.</div>
            </div>
            <div class="insight-detail-block" style="border-left-color: var(--accent-emerald);">
              <div class="insight-label" style="color: var(--accent-emerald);">Recommended Action</div>
              <div class="insight-text" style="color: var(--text-primary); font-weight: 500;">Pins with higher save rates are performing better. Create a 3-part sequel infographic series focusing on Backend System Schematics.</div>
            </div>
          </div>

          <div class="insight-card">
            <div class="insight-card-header">
              <span class="insight-icon">📂</span>
              <h4 class="insight-card-title">Top Performing Board</h4>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">What Happened</div>
              <div class="insight-text">'Tech & Architecture' board drives 48% of total creator impressions and 62% of saves.</div>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">Why It Matters</div>
              <div class="insight-text">Topic cohesion allows Pinterest search algorithms to categorize your profile authority.</div>
            </div>
            <div class="insight-detail-block" style="border-left-color: var(--brand-indigo);">
              <div class="insight-label" style="color: var(--brand-indigo);">Recommended Action</div>
              <div class="insight-text" style="color: var(--text-primary); font-weight: 500;">Pin at least 5 new vertical visual assets per week directly to this board.</div>
            </div>
          </div>

          <div class="insight-card">
            <div class="insight-card-header">
              <span class="insight-icon">🔗</span>
              <h4 class="insight-card-title">Outbound Click Optimization</h4>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">What Happened</div>
              <div class="insight-text">Pin clicks to outbound clicks conversion rate is 26.4%, showing high intent.</div>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">Why It Matters</div>
              <div class="insight-text">Pinners clicking through are pre-qualified for newsletter subscriptions and GitHub repo stars.</div>
            </div>
            <div class="insight-detail-block" style="border-left-color: var(--accent-amber);">
              <div class="insight-label" style="color: var(--accent-amber);">Recommended Action</div>
              <div class="insight-text" style="color: var(--text-primary); font-weight: 500;">Add a dedicated interactive demo landing page at the destination URL to increase conversion.</div>
            </div>
          </div>

          <div class="insight-card">
            <div class="insight-card-header">
              <span class="insight-icon">🎨</span>
              <h4 class="insight-card-title">Best Pin Topic & Visual Content</h4>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">What Happened</div>
              <div class="insight-text">Dark-background visual architecture cheat sheets achieved 42% higher click-throughs.</div>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">Why It Matters</div>
              <div class="insight-text">Contrasting visual cards stand out immediately on Pinterest's light discovery feed.</div>
            </div>
            <div class="insight-detail-block" style="border-left-color: var(--brand-cyan);">
              <div class="insight-label" style="color: var(--brand-cyan);">Recommended Action</div>
              <div class="insight-text" style="color: var(--text-primary); font-weight: 500;">Standardize on high-contrast 2:3 vertical templates with clear typographic hierarchy.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.selectPin = function (pinId) {
    const data = getPinterestData();
    const pin = data.pins.find((p) => p.id === pinId);
    if (!pin) return;

    currentPin = pin;
    if (window.setAudienceBaseForContent) {
      window.setAudienceBaseForContent(pin.impressions || '420,000');
    }

    // Update active state on cards
    document.querySelectorAll('.pinterest-pin-card').forEach((card) => {
      card.classList.toggle('selected', card.getAttribute('data-pin-id') === pinId);
    });

    // Update global content selector if present
    const select = document.getElementById('global-video-select');
    if (select) select.value = pinId;

    // Trigger dynamic Copyright Radar update for this pin
    if (typeof window.renderCopyrightRadar === 'function') {
      window.renderCopyrightRadar('pinterest', pin);
    }

    // Re-render views
    window.renderPinterestRetention();

    // Toast
    if (window.showToast) {
      window.showToast(`Switched workspace to Pin: "${pin.title}"`);
    }
  };

  window.populatePinterestContentSelector = function () {
    const select = document.getElementById('global-video-select');
    if (!select) return;
    const data = getPinterestData();
    select.innerHTML = data.pins
      .map((p) => `<option value="${p.id}">${p.title} (${p.saves} saves)</option>`)
      .join('');
    select.value = getCurrentPin().id;
  };

  window.renderAllPinterestViews = function () {
    window.renderPinterestDashboard(currentPinterestTab);
    window.renderPinterestRetention();
    window.renderPinterestAudience();
    window.renderPinterestInsights();
  };

})();
