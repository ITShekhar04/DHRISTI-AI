/**
 * Facebook & Telegram creator dashboards — isolated datasets (simulated/demo).
 */
(function () {
  'use strict';

  function simLabel() {
    return (window.DrishtiDemo && window.DrishtiDemo.SIM_LABEL) || 'SIMULATED / DEMO DATA';
  }

  function fbStore() {
    return (window.DrishtiDemo && window.DrishtiDemo.store.facebook) || { posts: [], kpis: {}, defaultId: '' };
  }

  function tgStore() {
    return (window.DrishtiDemo && window.DrishtiDemo.store.telegram) || { posts: [], kpis: {}, defaultId: '' };
  }

  let currentFb = null;
  let currentTg = null;

  window.getCurrentFbPost = function () {
    const s = fbStore();
    if (!currentFb) currentFb = (s.posts || []).find((p) => p.id === s.defaultId) || (s.posts || [])[0];
    return currentFb;
  };

  window.getCurrentTgPost = function () {
    const s = tgStore();
    if (!currentTg) currentTg = (s.posts || []).find((p) => p.id === s.defaultId) || (s.posts || [])[0];
    return currentTg;
  };

  function cardHtml(item, platform, selectFn, selectedId, accent) {
    const sel = selectedId === item.id ? ' selected' : '';
    return `
      <div class="video-card-3d${sel}" data-item-id="${item.id}" onclick="${selectFn}('${item.id}'); if(window.inspectPostDetail) window.inspectPostDetail('${platform}', '${item.id}');">
        <div class="video-thumb-container">
          <div class="video-thumb-gradient" style="background: linear-gradient(135deg, #0f172a, ${accent});"></div>
          <span class="video-duration-tag">${platform === 'facebook' ? 'Post' : 'Channel'}</span>
        </div>
        <div class="video-card-body">
          <h4 class="video-card-title">${item.title}</h4>
          <div class="video-card-metrics">
            <span>${item.views} views</span>
            <span>${item.likes} likes</span>
            <span>${item.shares || item.forwards || '0'} ${platform === 'telegram' ? 'fwds' : 'shares'}</span>
          </div>
          <div style="font-size: 0.68rem; color: var(--text-tertiary); margin-top: 6px;">${item.dataStatus || simLabel()}</div>
          <button type="button" class="btn btn-secondary" onclick="event.stopPropagation(); if(window.inspectPostDetail) window.inspectPostDetail('${platform}', '${item.id}');" style="margin-top: 8px; width: 100%; font-size: 0.72rem; padding: 3px 8px;">
            Inspect content
          </button>
        </div>
      </div>
    `;
  }

  function kpiRow(pairs) {
    return `<div class="kpi-grid">${pairs.map(function (p) {
      return `<div class="kpi-card card-3d"><div class="kpi-header"><span class="kpi-title">${p[0]}</span></div><div class="kpi-value-row"><span class="kpi-value">${p[1]}</span></div><span class="kpi-subtext">${simLabel()}</span></div>`;
    }).join('')}</div>`;
  }

  function fillEmpty(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  window.selectFbPost = function (id) {
    currentFb = (fbStore().posts || []).find((p) => p.id === id) || currentFb;
    const sel = document.getElementById('global-video-select');
    if (sel) sel.value = id;
    window.renderFacebookDashboard();
  };

  window.selectTgPost = function (id) {
    currentTg = (tgStore().posts || []).find((p) => p.id === id) || currentTg;
    const sel = document.getElementById('global-video-select');
    if (sel) sel.value = id;
    window.renderTelegramDashboard();
  };

  window.populateFacebookContentSelector = function () {
    const sel = document.getElementById('global-video-select');
    if (!sel) return;
    const posts = fbStore().posts || [];
    const cur = window.getCurrentFbPost();
    sel.innerHTML = posts.map((p) => `<option value="${p.id}">${p.title}</option>`).join('');
    if (cur) sel.value = cur.id;
    sel.onchange = function (e) { window.selectFbPost(e.target.value); };
  };

  window.populateTelegramContentSelector = function () {
    const sel = document.getElementById('global-video-select');
    if (!sel) return;
    const posts = tgStore().posts || [];
    const cur = window.getCurrentTgPost();
    sel.innerHTML = posts.map((p) => `<option value="${p.id}">${p.title}</option>`).join('');
    if (cur) sel.value = cur.id;
    sel.onchange = function (e) { window.selectTgPost(e.target.value); };
  };

  window.renderFacebookDashboard = function () {
    const s = fbStore();
    const k = s.kpis || {};
    const cur = window.getCurrentFbPost() || {};
    const html = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">Facebook Page Intelligence</h2>
            <p class="page-subtitle">${simLabel()} • Isolated Facebook dataset (not YouTube/Instagram)</p>
          </div>
          <span class="nav-badge">Page / Groups / Reactions</span>
        </div>
        ${kpiRow([['Page reach', k.pageReach || '—'], ['Followers', k.followers || '—'], ['Reactions', k.reactions || '—'], ['Comments', k.comments || '—'], ['Shares', k.shares || '—'], ['Video 3s views', k.videoPerf || '—']])}
        <div class="glass-panel" style="padding: 20px; margin-top: 18px;">
          <h3 style="color:#fff;margin-bottom:12px;">Page posts</h3>
          <div class="video-library-grid">${(s.posts || []).map((p) => cardHtml(p, 'facebook', 'window.selectFbPost', cur.id, '#1877f2')).join('')}</div>
        </div>
      </div>`;
    fillEmpty('facebook-dashboard-content', html);
  };

  window.renderFacebookRetention = function () {
    const cur = window.getCurrentFbPost() || {};
    fillEmpty('facebook-retention-content', `
      <div class="page-title-row"><div><h2 class="page-headline">${cur.title || 'Facebook post'} — hold & drop-off</h2><p class="page-subtitle">Estimated 3-second view vs skip (simulated)</p></div></div>
      <div class="glass-panel" style="padding:20px;color:var(--text-secondary);">
        Reach ${cur.reach || '—'} • Engagement ${cur.engagementRate || '—'} • Reactions ${cur.reactions || cur.likes}
        <div style="margin-top:12px;height:8px;background:rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;"><div style="width:${cur.engagementRate || '40%'};height:100%;background:#1877f2;"></div></div>
      </div>`);
  };

  window.renderFacebookAudience = function () {
    fillEmpty('facebook-audience-content', `
      <div class="page-title-row"><div><h2 class="page-headline">Facebook audience (estimated)</h2><p class="page-subtitle">${simLabel()} — not verified census data</p></div></div>
      <div class="glass-panel" style="padding:20px;">Age mix (sim.): 18–24 22% • 25–34 38% • 35–49 28% • 50+ 12%</div>`);
  };

  window.renderFacebookInsights = function () {
    fillEmpty('facebook-insights-content', `
      <div class="page-title-row"><div><h2 class="page-headline">Facebook insights</h2></div></div>
      <div class="glass-panel" style="padding:20px;">Group discussions outperform boosted posts on comment depth in this demo dataset. Recommended: seed AMA clips into Groups, not only the Page feed.</div>`);
  };

  window.renderAllFacebookViews = function () {
    window.renderFacebookDashboard();
    window.renderFacebookRetention();
    window.renderFacebookAudience();
    window.renderFacebookInsights();
    window.populateFacebookContentSelector();
  };

  window.renderTelegramDashboard = function () {
    const s = tgStore();
    const k = s.kpis || {};
    const cur = window.getCurrentTgPost() || {};
    const html = `
      <div class="platform-fade-in">
        <div class="page-title-row">
          <div>
            <h2 class="page-headline">Telegram Channel Intelligence</h2>
            <p class="page-subtitle">${simLabel()} • Isolated Telegram dataset</p>
          </div>
          <span class="nav-badge">Channels / Forwards</span>
        </div>
        ${kpiRow([['Subscribers', k.subscribers || '—'], ['Views', k.views || '—'], ['Forwards', k.forwards || '—'], ['Reactions', k.reactions || '—'], ['Engagement', k.engagement || '—'], ['Posts', String((s.posts || []).length)]])}
        <div class="glass-panel" style="padding: 20px; margin-top: 18px;">
          <h3 style="color:#fff;margin-bottom:12px;">Channel posts</h3>
          <div class="video-library-grid">${(s.posts || []).map((p) => cardHtml(p, 'telegram', 'window.selectTgPost', cur.id, '#229ed9')).join('')}</div>
        </div>
      </div>`;
    fillEmpty('telegram-dashboard-content', html);
  };

  window.renderTelegramRetention = function () {
    const cur = window.getCurrentTgPost() || {};
    fillEmpty('telegram-retention-content', `
      <div class="page-title-row"><div><h2 class="page-headline">${cur.title || 'Telegram post'} — view-to-forward</h2></div></div>
      <div class="glass-panel" style="padding:20px;">Forwards ${cur.forwards || cur.shares} • Views ${cur.views} • ${simLabel()}</div>`);
  };

  window.renderTelegramAudience = function () {
    fillEmpty('telegram-audience-content', `
      <div class="page-title-row"><div><h2 class="page-headline">Telegram subscribers (estimated)</h2></div></div>
      <div class="glass-panel" style="padding:20px;">Most active windows (sim.): 08:00–10:00 IST and 21:00–23:00 IST. Demographics are estimates only.</div>`);
  };

  window.renderTelegramInsights = function () {
    fillEmpty('telegram-insights-content', `
      <div class="page-title-row"><div><h2 class="page-headline">Telegram insights</h2></div></div>
      <div class="glass-panel" style="padding:20px;">Checklist PDFs generate the highest forward rate in this demo set. Keep posts under 800 characters plus one attachment.</div>`);
  };

  window.renderAllTelegramViews = function () {
    window.renderTelegramDashboard();
    window.renderTelegramRetention();
    window.renderTelegramAudience();
    window.renderTelegramInsights();
    window.populateTelegramContentSelector();
  };
})();
