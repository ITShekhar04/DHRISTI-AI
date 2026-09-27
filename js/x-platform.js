/* ==========================================================================
   SOCIALPULSE AI - X (FORMERLY TWITTER) ANALYTICS RENDER ENGINE
   ========================================================================== */

(function () {
  'use strict';

  let currentXTab = 'overview';
  let currentPost = null;

  function getXData() {
    return SOCIALPULSE_DATA.x;
  }

  function getCurrentPost() {
    if (!currentPost) {
      const data = getXData();
      currentPost = data.posts.find((p) => p.id === data.defaultPostId) || data.posts[0];
    }
    return currentPost;
  }

  window.getCurrentPost = getCurrentPost;

  function renderPostCard(item) {
    const isSelected = getCurrentPost().id === item.id ? ' selected' : '';
    const badge = item.badge
      ? `<span class="video-status-chip" style="background: rgba(29,155,240,0.15); color: #1d9bf0;">${item.badge}</span>`
      : '';

    return `
      <div class="video-card-3d x-post-card${isSelected}" data-post-id="${item.id}" onclick="window.selectPost('${item.id}'); if(window.inspectPostDetail) window.inspectPostDetail('x', '${item.id}');">
        <div class="video-thumb-container" style="position: relative;">
          <div class="video-thumb-gradient" style="background: ${item.gradient || 'linear-gradient(135deg, #0f172a, #1d9bf0)'};"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" opacity="0.95">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span class="video-duration-tag" style="background: rgba(0,0,0,0.75);">${item.tag || 'Post'}</span>
        </div>
        <div class="video-card-body">
          <h4 class="video-card-title">${item.title}</h4>
          <p style="font-size: 0.78rem; color: var(--text-secondary); margin: 6px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4;">
            ${item.text || ''}
          </p>
          <div class="video-card-metrics">
            <span>${item.impressions} imp</span>
            <span style="color: #1d9bf0;">${item.reposts} reposts</span>
            <span style="color: #10b981;">${item.bookmarks} bookmarks</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
            ${badge}
            <span style="font-size: 0.72rem; font-weight: 700; color: var(--brand-cyan);">${item.engagementRate} eng</span>
          </div>
          <button type="button" class="btn btn-secondary" onclick="event.stopPropagation(); if(window.inspectPostDetail) window.inspectPostDetail('x', '${item.id}');" style="margin-top: 8px; width: 100%; font-size: 0.72rem; padding: 3px 8px; border-color: rgba(29,155,240,0.4); color: #1d9bf0;">
            🔍 Inspect Post
          </button>
        </div>
      </div>
    `;
  }

  window.renderXDashboard = function (tab) {
    if (tab) currentXTab = tab;
    const container = document.getElementById('x-dashboard-content');
    if (!container) return;

    const data = getXData();
    const ov = (data.tabMetrics && data.tabMetrics[currentXTab]) || data.overview;
    const posts = data.posts || [];

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">
              <span>X (Twitter) Command Center</span>
              <span class="nav-badge pulse" style="background: rgba(29,155,240,0.15); color: #1d9bf0; border-color: rgba(29,155,240,0.3);">X API v2</span>
            </h2>
            <p class="page-subtitle">Impression velocity, repost resonance, bookmarks density & conversation intelligence</p>
          </div>
          <button class="btn btn-ai" onclick="window.navigateTo('copilot')">
            <svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Ask X Copilot</span>
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
              <span class="kpi-trend up">${ov.impressionsTrend || '↑ 26.5%'}</span>
            </div>
            <span class="kpi-subtext">Cumulative post impressions</span>
          </div>

          <!-- KPI 2: Reposts (Retweets) -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Reposts</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.reposts}</span>
              <span class="kpi-trend up">${ov.repostsTrend || '↑ 19.4%'}</span>
            </div>
            <span class="kpi-subtext">Organic virality amplifier</span>
          </div>

          <!-- KPI 3: Bookmarks -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Bookmarks</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.bookmarks}</span>
              <span class="kpi-trend up">${ov.bookmarksTrend || '↑ 32.1%'}</span>
            </div>
            <span class="kpi-subtext">High-utility reference saves</span>
          </div>

          <!-- KPI 4: Likes -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Likes</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.likes}</span>
              <span class="kpi-trend up">${ov.likesTrend || '↑ 15.8%'}</span>
            </div>
            <span class="kpi-subtext">Audience agreement signal</span>
          </div>

          <!-- KPI 5: Replies -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Replies</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.replies}</span>
              <span class="kpi-trend up">↑ 8.4%</span>
            </div>
            <span class="kpi-subtext">Direct discussion threads</span>
          </div>

          <!-- KPI 6: Engagement Rate -->
          <div class="kpi-card card-3d">
            <div class="kpi-header">
              <span class="kpi-title">Engagement Rate</span>
              <div class="kpi-icon-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">${ov.engagementRate}</span>
              <span class="kpi-trend up">↑ 0.9%</span>
            </div>
            <span class="kpi-subtext">X benchmark: 3.5%</span>
          </div>
        </div>

        <!-- Posts Grid Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin: 32px 0 16px 0;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">Published Posts</h3>
            <p style="font-size: 0.8rem; color: var(--text-tertiary);">Select an active post to inspect resonance, reposts & safety attribution</p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary ${currentXTab === 'overview' ? 'active' : ''}" onclick="window.renderXDashboard('overview')" style="font-size: 0.8rem; padding: 6px 14px;">All Posts</button>
            <button class="btn btn-secondary ${currentXTab === 'posts' ? 'active' : ''}" onclick="window.renderXDashboard('posts')" style="font-size: 0.8rem; padding: 6px 14px;">Top Resonance</button>
          </div>
        </div>

        <div class="video-cards-grid">
          ${posts.map((p) => renderPostCard(p)).join('')}
        </div>
      </div>
    `;
  };

  window.renderXRetention = function () {
    const container = document.getElementById('x-retention-content');
    if (!container) return;

    const post = getCurrentPost();

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">
              <span>${post.title}</span>
              <span style="font-size: 1rem; color: var(--text-tertiary); font-weight: 500;">— Engagement Velocity & Utility</span>
            </h2>
            <p class="page-subtitle">X telemetry • Repost velocity, bookmark density & metric transparency</p>
          </div>
        </div>

        <div class="glass-panel" style="padding: 24px; margin-bottom: 24px;">
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 14px;">Post Interaction Metrics</h3>
          <div class="ig-reel-metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
            <div class="ig-metric-item"><span class="ig-metric-label">Impressions</span><span class="ig-metric-value">${post.impressions}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Likes</span><span class="ig-metric-value">${post.likes}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Reposts</span><span class="ig-metric-value" style="color: #1d9bf0;">${post.reposts}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Quotes</span><span class="ig-metric-value">${post.quotes}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Replies</span><span class="ig-metric-value">${post.replies}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Bookmarks</span><span class="ig-metric-value" style="color: #10b981;">${post.bookmarks}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Engagement Rate</span><span class="ig-metric-value" style="color: var(--brand-cyan);">${post.engagementRate}</span></div>
            <div class="ig-metric-item"><span class="ig-metric-label">Score</span><span class="ig-metric-value" style="color: var(--brand-purple);">${post.performanceScore}/100</span></div>
          </div>
        </div>

        <!-- Telemetry Incompatibility Transparency Card -->
        <div class="glass-panel" style="padding: 28px; border-left: 4px solid #1d9bf0;">
          <div style="display: flex; gap: 16px; align-items: flex-start;">
            <div style="width: 44px; height: 44px; border-radius: 10px; background: rgba(29,155,240,0.12); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #1d9bf0;">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div>
              <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">
                Video Retention Curves: Not Available for Text/Microblog Posts on X
              </h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 12px;">
                Second-by-second video retention curves require a timecode media player. Text posts and discussion threads on X are measured by <strong>Impression Velocity</strong>, <strong>Bookmark Ratio</strong>, and <strong>Repost Reach</strong>.
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                <span style="font-size: 0.75rem; background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 6px; color: var(--text-secondary);">
                  Utility Signal: Bookmarks (${post.bookmarks})
                </span>
                <span style="font-size: 0.75rem; background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 6px; color: var(--text-secondary);">
                  Virality Signal: Reposts (${post.reposts})
                </span>
                <span style="font-size: 0.75rem; background: rgba(29,155,240,0.12); color: #1d9bf0; padding: 4px 10px; border-radius: 6px;">
                  Honest Data Guarantee: No Hallucinated Retention
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.renderXAudience = function () {
    const container = document.getElementById('x-audience-content');
    if (!container) return;

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">X Network Demographics & Follower Reach</h2>
            <p class="page-subtitle">Verified accounts, reply sentiment & conversation thread influence</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 24px;">
          <!-- Follower Verification Breakdown -->
          <div class="glass-panel" style="padding: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Follower Tiers</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 20px;">Engagement split by subscriber classification</p>

            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span style="color: var(--text-primary); font-weight: 600;">Verified Organizations / Premium</span>
                  <span style="color: #1d9bf0; font-weight: 700;">42%</span>
                </div>
                <div style="height: 8px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden;">
                  <div style="width: 42%; height: 100%; background: #1d9bf0; border-radius: 4px;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span style="color: var(--text-primary); font-weight: 600;">Active Technical Engineers</span>
                  <span style="color: #10b981; font-weight: 700;">38%</span>
                </div>
                <div style="height: 8px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden;">
                  <div style="width: 38%; height: 100%; background: #10b981; border-radius: 4px;"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span style="color: var(--text-primary); font-weight: 600;">General Tech Enthusiasts</span>
                  <span style="color: var(--brand-purple); font-weight: 700;">20%</span>
                </div>
                <div style="height: 8px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden;">
                  <div style="width: 20%; height: 100%; background: var(--brand-purple); border-radius: 4px;"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Discussion Highlights -->
          <div class="glass-panel" style="padding: 24px;">
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Trending Hashtags & Topics</h3>
            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 16px;">Top conversations sparked in reply threads</p>

            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              <span style="padding: 6px 12px; border-radius: 20px; background: rgba(29,155,240,0.1); color: #1d9bf0; font-size: 0.8rem; font-weight: 600;">#AIAgents</span>
              <span style="padding: 6px 12px; border-radius: 20px; background: rgba(16,185,129,0.1); color: #10b981; font-size: 0.8rem; font-weight: 600;">#TypeScript</span>
              <span style="padding: 6px 12px; border-radius: 20px; background: rgba(99,102,241,0.1); color: var(--brand-indigo); font-size: 0.8rem; font-weight: 600;">#CleanArchitecture</span>
              <span style="padding: 6px 12px; border-radius: 20px; background: rgba(245,158,11,0.1); color: #f59e0b; font-size: 0.8rem; font-weight: 600;">#FullStack</span>
              <span style="padding: 6px 12px; border-radius: 20px; background: rgba(6,182,212,0.1); color: var(--brand-cyan); font-size: 0.8rem; font-weight: 600;">#DevTools2026</span>
            </div>

            <div style="margin-top: 20px; padding: 14px; border-radius: var(--radius-md); background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-size: 0.75rem; color: var(--text-tertiary); text-transform: uppercase; font-weight: 700;">Community Sentiment</div>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;">
                86% positive resonance on technical architecture posts. High bookmark-to-like ratio indicates audience views your posts as actionable reference code.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.renderXInsights = function () {
    const container = document.getElementById('x-insights-content');
    if (!container) return;

    container.innerHTML = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">AI Strategic Intelligence: X (Twitter)</h2>
            <p class="page-subtitle">Algorithmic velocity insights & actionable reach recommendations</p>
          </div>
        </div>

        <div class="insights-grid">
          <div class="insight-card">
            <div class="insight-card-header">
              <span class="insight-icon">𝕏</span>
              <h4 class="insight-card-title">Top Performing Post</h4>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">What Happened</div>
              <div class="insight-text">'10 System Architecture Rules' achieved 640K impressions with 4.2K reposts and 18.9K bookmarks.</div>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">Why It Matters</div>
              <div class="insight-text">The X algorithm strongly weights Reposts and Bookmarks as signals of deep authority and utility.</div>
            </div>
            <div class="insight-detail-block" style="border-left-color: #10b981;">
              <div class="insight-label" style="color: #10b981;">Recommended Action</div>
              <div class="insight-text" style="color: var(--text-primary); font-weight: 500;">Posts receiving more reposts are generating stronger engagement. Post comprehensive technical breakdowns with actionable checklists.</div>
            </div>
          </div>

          <div class="insight-card">
            <div class="insight-card-header">
              <span class="insight-icon">💬</span>
              <h4 class="insight-card-title">High Reply Velocity in First Hour</h4>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">What Happened</div>
              <div class="insight-text">4.8K replies generated with an average reply turnaround of 3 minutes in the initial 60 minutes after posting.</div>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">Why It Matters</div>
              <div class="insight-text">Fast early reply threads maintain trending momentum for up to 36 hours.</div>
            </div>
            <div class="insight-detail-block" style="border-left-color: #1d9bf0;">
              <div class="insight-label" style="color: #1d9bf0;">Recommended Action</div>
              <div class="insight-text" style="color: var(--text-primary); font-weight: 500;">Pin your own clarifying response at the top of the thread within the first 15 minutes of posting.</div>
            </div>
          </div>

          <div class="insight-card">
            <div class="insight-card-header">
              <span class="insight-icon">💡</span>
              <h4 class="insight-card-title">Best Performing Topic</h4>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">What Happened</div>
              <div class="insight-text">Autonomous AI agents and distributed backend architectures generate 3.4× higher engagement than general coding tips.</div>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">Why It Matters</div>
              <div class="insight-text">Senior engineering audience actively curates professional engineering feeds on X.</div>
            </div>
            <div class="insight-detail-block" style="border-left-color: var(--brand-indigo);">
              <div class="insight-label" style="color: var(--brand-indigo);">Recommended Action</div>
              <div class="insight-text" style="color: var(--text-primary); font-weight: 500;">Focus weekly technical threads on production distributed system design patterns.</div>
            </div>
          </div>

          <div class="insight-card">
            <div class="insight-card-header">
              <span class="insight-icon">📊</span>
              <h4 class="insight-card-title">Best Post Format (Threads vs Single)</h4>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">What Happened</div>
              <div class="insight-text">6-part numbered threads generate 4.8× more profile clicks and reposts than standalone single tweets.</div>
            </div>
            <div class="insight-detail-block">
              <div class="insight-label">Why It Matters</div>
              <div class="insight-text">Readers inspect creator profiles after completing comprehensive multi-tweet breakdowns.</div>
            </div>
            <div class="insight-detail-block" style="border-left-color: var(--brand-cyan);">
              <div class="insight-label" style="color: var(--brand-cyan);">Recommended Action</div>
              <div class="insight-text" style="color: var(--text-primary); font-weight: 500;">Structure high-value technical topics as concise 5-7 post threads scheduled on Tuesday mornings.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.selectPost = function (postId) {
    const data = getXData();
    const post = data.posts.find((p) => p.id === postId);
    if (!post) return;

    currentPost = post;
    if (window.setAudienceBaseForContent) {
      window.setAudienceBaseForContent(post.impressions || '180,000');
    }

    // Update active state on cards
    document.querySelectorAll('.x-post-card').forEach((card) => {
      card.classList.toggle('selected', card.getAttribute('data-post-id') === postId);
    });

    // Update global content selector if present
    const select = document.getElementById('global-video-select');
    if (select) select.value = postId;

    // Trigger dynamic Copyright Radar update for this post
    if (typeof window.renderCopyrightRadar === 'function') {
      window.renderCopyrightRadar('x', post);
    }

    // Re-render views
    window.renderXRetention();

    // Toast
    if (window.showToast) {
      window.showToast(`Switched workspace to Post: "${post.title}"`);
    }
  };

  window.populateXContentSelector = function () {
    const select = document.getElementById('global-video-select');
    if (!select) return;
    const data = getXData();
    select.innerHTML = data.posts
      .map((p) => `<option value="${p.id}">${p.title} (${p.impressions} imp)</option>`)
      .join('');
    select.value = getCurrentPost().id;
  };

  window.renderAllXViews = function () {
    window.renderXDashboard(currentXTab);
    window.renderXRetention();
    window.renderXAudience();
    window.renderXInsights();
  };

})();
