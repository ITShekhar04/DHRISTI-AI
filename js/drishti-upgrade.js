/**
 * DRISHTI upgrade layer — hydrates existing shells with demo-engine data.
 * Does not replace the original app; hooks after existing renders.
 */
(function () {
  'use strict';

  const STEPS = [
    'Detect', 'Collect evidence', 'Verify', 'Classify', 'Assess severity', 'Preserve evidence',
    'Report', 'Restrict/block where authorized', 'Escalate', 'Monitor', 'Resolve', 'Document the incident'
  ];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  function banner() {
    return '<div class="drishti-sim-banner">Simulated / demonstration data — not live social-media APIs. Architecture is ready for later connectors.</div>';
  }

  function ageHtml(ages) {
    if (!ages) return '';
    return Object.keys(ages).map(function (k) {
      return '<div style="display:flex;justify-content:space-between;font-size:0.75rem;margin:3px 0;color:var(--text-primary);"><span style="color:var(--text-secondary);font-weight:600;">' + esc(k) + ' (est.)</span><strong style="color:var(--brand-cyan);font-weight:800;">' + esc(ages[k]) + '%</strong></div>';
    }).join('');
  }

  function renderLivePanel() {
    const D = window.DrishtiDemo;
    if (!D) return;
    const c = D.counts();
    const critEl = document.getElementById('live-alert-crit');
    const highEl = document.getElementById('live-alert-high');
    const medEl = document.getElementById('live-alert-med');
    if (critEl) critEl.textContent = c.CRITICAL;
    if (highEl) highEl.textContent = c.HIGH;
    if (medEl) medEl.textContent = c.MEDIUM;
    const list = document.getElementById('live-alert-dropdown-list');
    if (!list) return;
    const alerts = D.store.alerts.slice(0, 12);
    if (!alerts.length) {
      list.innerHTML = '<div class="drishti-empty">No alerts in the demo feed yet.</div>';
      return;
    }
    list.innerHTML = alerts.map(function (a) {
      return '<button type="button" class="live-alert-row sev-' + a.severity + '" data-alert-id="' + esc(a.id) + '">' +
        '<span>' + a.severityIcon + ' ' + esc(a.severity) + '</span>' +
        '<strong>' + esc(a.title) + '</strong>' +
        '<small>' + esc(a.relatedPlatform) + ' • ' + esc(a.alertType) + '</small></button>';
    }).join('');
    list.querySelectorAll('[data-alert-id]').forEach(function (btn) {
      btn.onclick = function () { openAlertDetail(btn.getAttribute('data-alert-id')); };
    });
  }

  function openAlertDetail(id) {
    const D = window.DrishtiDemo;
    const a = D && D.store.alerts.find(function (x) { return x.id === id; });
    if (!a) return;
    showModal('Alert detail (simulated)',
      '<p><strong>' + esc(a.alertType) + '</strong> • ' + esc(a.severity) + ' • ' + esc(a.status) + '</p>' +
      '<p>' + esc(a.description) + '</p>' +
      '<ul><li>Timestamp: ' + esc(a.timestamp) + '</li><li>Source: ' + esc(a.source) + '</li>' +
      '<li>Platform: ' + esc(a.relatedPlatform) + '</li><li>Related content: ' + esc(a.relatedContent) + '</li>' +
      '<li>Recommended action: ' + esc(a.recommendedAction) + '</li></ul>' +
      '<p class="drishti-sim-banner">' + esc(a.dataStatus) + '</p>');
    const dd = document.getElementById('live-alert-dropdown'); if (dd) dd.style.display = 'none';
  }

  function showModal(title, bodyHtml) {
    let m = document.getElementById('drishti-upgrade-modal');
    if (!m) {
      m = document.createElement('div');
      m.id = 'drishti-upgrade-modal';
      m.className = 'post-inspection-modal-backdrop';
      document.body.appendChild(m);
    }
    m.innerHTML = '<div class="post-inspection-modal-dialog" style="max-width:720px;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><h3 style="color:var(--gov-navy);margin:0;">' +
      esc(title) + '</h3><button type="button" class="btn btn-secondary" id="drishti-modal-close">Close</button></div><div style="color:var(--text-secondary);font-size:0.85rem;line-height:1.5;">' +
      bodyHtml + '</div></div>';
    m.style.display = 'flex';
    document.getElementById('drishti-modal-close').onclick = function () { m.style.display = 'none'; };
    m.onclick = function (e) { if (e.target === m) m.style.display = 'none'; };
  }

  function hydrateViral(GovState) {
    const card = document.getElementById('card-viral-intel');
    const D = window.DrishtiDemo;
    if (!card || !D) return;
    const t = D.getTrend(GovState.activeTrendId) || D.store.trends[0];
    if (!t) return;
    let extra = card.querySelector('#viral-intel-extra');
    if (!extra) {
      extra = document.createElement('div');
      extra.id = 'viral-intel-extra';
      card.appendChild(extra);
    }
    const platKey = (GovState.activePlatformFilter || 'All').toLowerCase();
    const plat = t.platformBreakdown && t.platformBreakdown[platKey];
    extra.innerHTML = 
      '<div style="margin-top:16px;background:#ffffff;border:1.5px solid #cbd5e1;border-radius:10px;padding:16px;box-shadow:0 1px 4px rgba(11,58,117,0.05);">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1.5px solid #e2e8f0;padding-bottom:8px;">' +
      '<strong style="font-size:0.88rem;color:#0b3a75;font-weight:800;">📊 Deep Granular Propagation Metrics</strong>' +
      '<span class="nav-badge" style="background:#e0f2fe;color:#0369a1;font-weight:700;">SECTION 18 AUDIT COMPLIANT</span>' +
      '</div>' +
      '<div class="gov-metric-matrix" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin:12px 0;">' +
      [['Trend score', t.trendScore], ['Virality', t.viralityScore], ['Posts', t.relatedPostsCount],
        ['Views', t.views], ['Likes', t.likes], ['Comments', t.comments], ['Shares', t.shares],
        ['Engagement', t.engagementRate], ['Growth', t.growthVelocity], ['Status', t.status],
        ['Location', t.location], ['Origin', t.trendOrigin], ['Source', t.source]].map(function (row) {
        return '<div class="glass-mini" style="background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:8px;padding:10px 12px;box-shadow:var(--shadow-sm);"><span style="display:block;font-size:0.7rem;color:var(--text-tertiary);text-transform:uppercase;font-weight:700;margin-bottom:2px;">' + esc(row[0]) + '</span><strong style="color:var(--brand-cyan, #00f2fe);font-size:1.05rem;font-weight:800;font-family:\'Outfit\',sans-serif;">' + esc(row[1]) + '</strong></div>';
      }).join('') + '</div>' +
      '<p style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;font-weight:500;margin:10px 0;">' + esc(t.description) + '</p>' +
      '<div style="font-size:0.75rem;color:var(--text-secondary);font-weight:600;margin:6px 0;">Hashtags: <span style="color:var(--brand-cyan);">' + esc((t.relatedHashtags || []).join(' ')) +
      '</span> • Keywords: <span style="color:var(--brand-cyan);">' + esc((t.relatedKeywords || []).join(', ')) + '</span></div>' +
      '<div style="margin-top:10px;background:rgba(255,255,255,0.03);padding:10px 14px;border-radius:8px;border:1px solid var(--border-subtle);">' +
      '<div style="font-size:0.72rem;color:var(--text-tertiary);font-weight:700;text-transform:uppercase;margin-bottom:6px;">Demographic Resonance Distribution:</div>' +
      ageHtml(t.ageGroups) + '</div>' +
      (plat ? '<div style="margin-top:10px;font-size:0.78rem;color:var(--text-secondary);"><strong>' + esc(GovState.activePlatformFilter) + ' isolated metrics:</strong> ' +
        Object.keys(plat).map(function (k) { return '<span style="color:var(--text-tertiary);">' + esc(k) + ':</span> <strong style="color:var(--brand-cyan);">' + esc(plat[k]) + '</strong>'; }).join(' · ') + '</div>' : '') +
      '<div style="margin-top:12px;color:var(--text-primary);"><strong style="color:var(--brand-cyan);font-size:0.8rem;">Propagation Lifecycle Progression:</strong>' + (t.timeline || []).map(function (x) {
        return '<div style="font-size:0.74rem;padding:5px 0;border-left:3px solid var(--brand-cyan);padding-left:10px;margin:4px 0;color:var(--text-secondary);"><strong style="color:var(--brand-cyan);">' + esc(x.stage) + '</strong> — ' + esc(x.note) + '</div>';
      }).join('') + '</div>' +
      '</div>';
  }

  function hydrateStatePulse(GovState) {
    const D = window.DrishtiDemo;
    const card = document.getElementById('card-state-pulse');
    if (!card || !D) return;
    const d = D.statePulse(GovState.statePulseState, GovState.statePulseField);
    let box = card.querySelector('#state-pulse-extra');
    if (!box) {
      box = document.createElement('div');
      box.id = 'state-pulse-extra';
      card.appendChild(box);
    }
    box.innerHTML = banner() +
      '<p style="font-size:0.8rem;color:var(--text-primary);">Activity volume (sim.): <strong>' + esc(d.activity) + '</strong> • Regional score ' + d.regionalScore + '</p>' +
      '<div>Trending hashtags: ' + esc((d.trendingHashtags || []).join(' ')) + '</div>' +
      '<div style="margin-top:8px;"><strong>Regional news (simulated desk)</strong><ul>' + d.regionalNews.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></div>' +
      '<div><strong>Most discussed</strong><ul>' + d.mostDiscussed.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul></div>' +
      '<div>Most active platforms: ' + esc((d.mostActivePlatforms || []).join(', ')) + '</div>' +
      '<div>Locations: ' + esc((d.mostActiveLocations || []).join(', ')) + '</div>' +
      '<div style="margin-top:8px;">' + ageHtml(d.demographics) + '</div>' +
      '<div>Top accounts (fictional): ' + d.topAccounts.map(function (a) { return esc(a.handle); }).join(', ') + '</div>' +
      '<div>Emerging: ' + esc((d.emergingIssues || []).join(', ')) + '</div>';
  }

  function hydrateNarratives(GovState) {
    const D = window.DrishtiDemo;
    const card = document.getElementById('card-narratives');
    if (!card || !D) return;
    const list = D.narrativesFromTrends(GovState.trends || D.store.trends);
    let box = card.querySelector('#narrative-extra');
    if (!box) {
      box = document.createElement('div');
      box.id = 'narrative-extra';
      card.appendChild(box);
    }
    box.innerHTML = banner() + list.map(function (n) {
      const tone = n.sentiment.indexOf('Positive') === 0 ? '#10b981' : n.sentiment.indexOf('Negative') === 0 ? '#f43f5e' : '#f59e0b';
      return '<div class="glass-panel" style="padding:12px;margin:10px 0;border-left:3px solid ' + tone + ';">' +
        '<h4 style="color:var(--gov-navy);margin:0 0 6px;">' + esc(n.narrativeTitle) + '</h4>' +
        '<span class="nav-badge" style="background:' + tone + '22;color:' + tone + ';">' + esc(n.sentiment) + '</span>' +
        '<p style="font-size:0.78rem;">Topic: ' + esc(n.topic) + ' • Reach ' + esc(n.reach) + ' • Growth ' + esc(n.narrativeGrowth) + '</p>' +
        '<p style="font-size:0.75rem;">+ ' + n.positivePct + '% / − ' + n.negativePct + '% / ○ ' + n.neutralPct + '% (estimated)</p>' +
        '<p style="font-size:0.75rem;">' + esc(n.audienceReaction) + '</p>' +
        '<p style="font-size:0.75rem;"><em>Supporting:</em> ' + esc(n.supportingOpinions.join('; ')) + '<br><em>Opposing:</em> ' + esc(n.opposingOpinions.join('; ')) + '</p>' +
        '</div>';
    }).join('');
  }

  function hydrateCoordination(GovState) {
    const D = window.DrishtiDemo;
    const card = document.getElementById('card-coordination');
    if (!card || !D) return;
    const trend = D.getTrend(GovState.activeTrendId) || (GovState.trends || [])[0];
    const c = D.coordinationFor(trend);
    let box = card.querySelector('#coord-extra');
    if (!box) {
      box = document.createElement('div');
      box.id = 'coord-extra';
      card.appendChild(box);
    }
    const stages = ['SOURCE', 'FIRST PLATFORM', 'EARLY AMPLIFIERS', 'SECONDARY PLATFORMS', 'VIRAL SPREAD', 'PUBLIC REACTION'];
    box.innerHTML = banner() +
      '<p style="font-size:0.78rem;">Started: ' + esc(c.whereStarted) + ' • First platform: ' + esc(c.firstPlatform) +
      ' • Time: ' + esc(c.firstDetectedTime) + '</p>' +
      '<p style="font-size:0.75rem;">Source account (fictional): ' + esc(c.sourceAccount) + ' • URL: ' + esc(c.sourceUrl) + '</p>' +
      '<p style="font-size:0.75rem;">' + esc(c.spreadHow) + '</p>' +
      '<p style="font-size:0.75rem;">' + esc(c.coordinatedAmplification) + ' • ' + esc(c.botSpamIndicators) + '</p>' +
      '<div style="display:flex;flex-direction:column;align-items:flex-start;gap:4px;margin:12px 0;">' +
      stages.map(function (s, i) {
        const note = (c.timeline && c.timeline[i] && c.timeline[i].note) || s;
        return '<div><strong style="color:var(--brand-cyan);">' + s + '</strong><div style="font-size:0.72rem;">' + esc(note) + '</div>' +
          (i < stages.length - 1 ? '<div style="opacity:0.5;">↓</div>' : '') + '</div>';
      }).join('') + '</div>';
  }

  function hydrateFiltration() {
    const card = document.getElementById('card-filtration');
    if (!card) return;
    let box = card.querySelector('#filtration-extra');
    if (!box) {
      box = document.createElement('div');
      box.id = 'filtration-extra';
      card.appendChild(box);
    }
    box.innerHTML = banner() +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin:8px 0;">' +
      ['Image', 'Video', 'Article', 'PDF', 'Reel', 'Social-media screenshot', 'Text content', 'URL'].map(function (k) {
        return '<button type="button" class="btn btn-secondary" style="font-size:0.72rem;padding:4px 10px;" onclick="window.DrishtiUpgrade.runFiltration(\'' + k + '\')">' + k + '</button>';
      }).join('') + '</div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;"><input id="filtration-url-or-text" class="cyber-input-box" placeholder="Paste URL or text for simulated analysis" style="flex:1;min-width:200px;padding:8px;">' +
      '<button type="button" class="btn btn-primary" onclick="window.DrishtiUpgrade.runFiltration(\'URL\')">Analyse</button></div>' +
      '<div id="filtration-result-live" style="margin-top:10px;"></div>' +
      '<p style="font-size:0.72rem;color:var(--text-tertiary);">Prototype uses simulated forensic scores. It cannot determine absolute truth.</p>';
  }

  function runFiltration(kind) {
    const D = window.DrishtiDemo;
    const input = document.getElementById('filtration-url-or-text');
    const name = (input && input.value) || kind;
    const panel = document.getElementById('filtration-result-live');
    if (panel) panel.innerHTML = '<div class="drishti-loading">Running simulated analysis…</div>';
    setTimeout(function () {
      const r = D.authenticityFor(kind, name);
      const html = '<div class="glass-panel" style="padding:14px;"><h4 style="color:var(--gov-navy);">Authenticity assessment</h4>' +
        '<p>REAL: ' + r.authenticityScore + '% &nbsp; FAKE/MANIPULATED: ' + r.fakeScore + '% &nbsp; UNCERTAIN: ' + r.uncertainScore + '%</p>' +
        '<div style="height:10px;display:flex;border-radius:6px;overflow:hidden;"><div style="width:' + r.authenticityScore + '%;background:#10b981;"></div><div style="width:' + r.fakeScore + '%;background:#f43f5e;"></div><div style="width:' + r.uncertainScore + '%;background:#f59e0b;"></div></div>' +
        '<p><strong>' + esc(r.detectionResult) + '</strong></p>' +
        '<p>' + esc(r.explanation) + '</p>' +
        '<ul style="font-size:0.75rem;"><li>Manipulation: ' + esc(r.manipulationIndicators.join(', ')) + '</li>' +
        '<li>AI-generated indicators: ' + esc(r.aiGeneratedIndicators.join(', ')) + '</li>' +
        '<li>Source: ' + esc(r.sourceInfo) + '</li><li>Metadata: ' + esc(r.metadata) + '</li>' +
        '<li>Text issues: ' + esc(r.textInconsistencies.join(', ')) + '</li>' +
        '<li>Credibility: ' + esc(r.sourceCredibility) + '</li></ul></div>';
      if (panel) panel.innerHTML = html;
      if (window.GovIntelligence && window.GovIntelligence.state) {
        window.GovIntelligence.state.filtrationResult = {
          status: r.detectionResult,
          confidence: (100 - r.uncertainScore) + '%',
          realnessScore: r.authenticityScore,
          fakenessScore: r.fakeScore,
          multiModalBreakdown: {
            faceSynthesisProbability: r.manipulationIndicators[0],
            acousticVoiceCloneAnomaly: r.aiGeneratedIndicators[0],
            temporalConsistencyScore: 'Simulated',
            metadataProvenance: r.metadata
          }
        };
      }
      if (window.showToast) window.showToast('Simulated analysis complete');
    }, 600);
  }

  function hydrateAlerts() {
    const D = window.DrishtiDemo;
    const card = document.getElementById('card-alerts');
    if (!card || !D) return;
    let box = card.querySelector('#alerts-live-extra');
    if (!box) {
      box = document.createElement('div');
      box.id = 'alerts-live-extra';
      card.appendChild(box);
    }
    box.innerHTML = banner() + D.store.alerts.slice(0, 10).map(function (a) {
      return '<div class="gov-alert-item" style="margin:8px 0;padding:10px;border:1px solid var(--border-glass);border-radius:8px;">' +
        '<div style="display:flex;justify-content:space-between;gap:8px;"><strong style="color:var(--gov-navy);">' + esc(a.title) + '</strong><span>' + esc(a.severity) + '</span></div>' +
        '<div style="font-size:0.72rem;color:var(--text-tertiary);">' + esc(a.timestamp) + ' • ' + esc(a.alertType) + ' • ' + esc(a.relatedPlatform) + ' • ' + esc(a.status) + '</div>' +
        '<p style="font-size:0.78rem;margin:6px 0;">' + esc(a.description) + '</p>' +
        '<button type="button" class="btn btn-secondary" style="font-size:0.7rem;" onclick="window.DrishtiUpgrade.openAlert(\'' + a.id + '\')">Open</button> ' +
        '<button type="button" class="btn btn-primary" style="font-size:0.7rem;" onclick="window.DrishtiUpgrade.ackAlert(\'' + a.id + '\')">Acknowledge</button></div>';
    }).join('');
  }

  function hydrateProvenance() {
    const D = window.DrishtiDemo;
    const card = document.getElementById('card-provenance');
    if (!card || !D) return;
    let box = card.querySelector('#prov-extra');
    if (!box) {
      box = document.createElement('div');
      box.id = 'prov-extra';
      card.appendChild(box);
    }
    box.innerHTML = banner() + '<p style="font-size:0.75rem;">Fictional training cases only. No accusations against real persons.</p>' +
      '<div style="overflow:auto;"><table class="gov-platform-table">' +
      '<thead><tr><th>Case ID</th><th>Type</th><th>Platform</th><th>Entity (fictional)</th><th>Status</th><th>Evidence</th><th>Action</th></tr></thead><tbody>' +
      D.store.cases.map(function (c) {
        return '<tr><td>' + esc(c.caseId) + '</td><td>' + esc(c.incidentType) + '</td><td>' + esc(c.platform) + '</td><td>' + esc(c.reportedEntity) +
          '</td><td>' + esc(c.caseStatus) + '</td><td>' + esc(c.evidenceStatus) + '</td><td>' +
          '<select onchange="window.DrishtiUpgrade.setCaseStatus(\'' + c.caseId + '\', this.value)">' +
          ['Under Review', 'Evidence Collected', 'Reported', 'Escalated', 'Resolved', 'Closed'].map(function (s) {
            return '<option' + (s === c.caseStatus ? ' selected' : '') + '>' + s + '</option>';
          }).join('') + '</select></td></tr>';
      }).join('') + '</tbody></table></div>';
  }

  function hydrateMission() {
    const card = document.getElementById('card-mission-control');
    if (!card) return;
    let box = card.querySelector('#mission-extra');
    if (!box) {
      box = document.createElement('div');
      box.id = 'mission-extra';
      card.appendChild(box);
    }
    const types = ['Cyber fraud', 'Scam accounts', 'Phishing', 'Spam', 'Bot attacks', 'Account abuse', 'Malicious content', 'Suspicious URLs', 'Impersonation', 'Coordinated abuse'];
    box.innerHTML = banner() +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">' + types.map(function (t) {
        return '<button type="button" class="btn btn-secondary" style="font-size:0.72rem;" onclick="window.DrishtiUpgrade.showPlaybook(\'' + t + '\')">' + t + '</button>';
      }).join('') + '</div>' +
      '<div id="mission-playbook"></div>' +
      '<div class="glass-panel" style="padding:14px;margin-top:12px;"><h4 style="color:var(--gov-navy);">URL analysis (does not fetch the URL)</h4>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;"><input id="upgrade-url-input" class="cyber-input-box" placeholder="https://example.invalid/..." style="flex:1;padding:8px;">' +
      '<button type="button" class="btn btn-primary" onclick="window.DrishtiUpgrade.scanUrl()">Analyse URL</button></div>' +
      '<div id="upgrade-url-result" style="margin-top:10px;"></div></div>';
    window.DrishtiUpgrade.showPlaybook('Phishing');
  }

  function showPlaybook(name) {
    const el = document.getElementById('mission-playbook');
    if (!el) return;
    el.innerHTML = '<div class="glass-panel" style="padding:12px;"><h4 style="color:var(--gov-navy);">Response procedure: ' + esc(name) + '</h4>' +
      STEPS.map(function (s, i) {
        const kind = i < 6 ? 'Recommended action' : i < 9 ? 'Requires human approval' : 'Document / already performed (demo)';
        return '<div style="display:flex;gap:8px;align-items:flex-start;margin:6px 0;"><span class="nav-badge">' + (i + 1) + '</span><div><strong style="color:var(--gov-navy);">' + s + '</strong><div style="font-size:0.7rem;color:var(--text-tertiary);">' + kind + '</div></div></div>';
      }).join('') +
      '<button type="button" class="btn btn-primary" style="margin-top:8px;" onclick="window.showToast && window.showToast(\'Logged as recommended only — no automatic enforcement\')">Log recommended actions</button></div>';
  }

  function scanUrl() {
    const input = document.getElementById('upgrade-url-input') || document.getElementById('gov-scanner-url-input');
    const out = document.getElementById('upgrade-url-result');
    const raw = input ? input.value : '';
    if (out) out.innerHTML = '<div class="drishti-loading">Heuristic scan (local, URL is not visited)…</div>';
    setTimeout(function () {
      const r = window.DrishtiDemo.analyzeUrl(raw);
      const color = r.verdict === 'HIGH RISK' ? '#f43f5e' : r.verdict === 'SUSPICIOUS' ? '#f59e0b' : r.verdict === 'SAFE' ? '#10b981' : '#94a3b8';
      const html = '<div style="border:1px solid ' + color + ';padding:12px;border-radius:8px;">' +
        '<div style="font-size:1.1rem;color:' + color + ';font-weight:800;">' + esc(r.verdict) + ' • score ' + r.riskScore + '</div>' +
        '<p style="font-size:0.78rem;">Domain ' + esc(r.domain) + ' • Age ' + esc(r.domainAge) + ' • HTTPS ' + esc(String(r.https)) + '</p>' +
        '<p style="font-size:0.75rem;">Redirects: ' + esc(r.redirects) + '<br>Phishing: ' + esc(r.phishingIndicators) + '<br>Malware: ' + esc(r.malwareIndicators) + '</p>' +
        '<p>' + esc(r.recommendedAction) + '</p>' +
        '<p style="font-size:0.7rem;">' + esc(r.note) + '</p>' +
        ['Monitor', 'Flag', 'Report', 'Block/restrict where authorized', 'Escalate', 'Investigate'].map(function (a) {
          return '<button type="button" class="btn btn-secondary" style="font-size:0.7rem;margin:3px;" onclick="window.showToast && window.showToast(\'' + a + ' queued for human approval\')">' + a + '</button>';
        }).join('') + '</div>';
      if (out) out.innerHTML = html;
      if (window.GovIntelligence) {
        window.GovIntelligence.state.scamScanResult = { url: r.url, threatScore: r.riskScore, riskLevel: r.verdict };
      }
    }, 500);
  }

  function hydrateReports() {
    const card = document.getElementById('card-audit');
    if (!card || !window.DrishtiDemo) return;
    let box = card.querySelector('#audit-filters');
    if (!box) {
      box = document.createElement('div');
      box.id = 'audit-filters';
      card.insertBefore(box, card.children[1] || null);
    }
    const D = window.DrishtiDemo;
    box.innerHTML = banner() +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin:10px 0;">' +
      '<label>Date range<select id="rpt-range"><option>Last 24 hours</option><option>Last 7 days</option><option selected>Last 30 days</option></select></label>' +
      '<label>Platform<select id="rpt-plat"><option>All</option>' + D.platforms.map(function (p) { return '<option>' + p + '</option>'; }).join('') + '</select></label>' +
      '<label>State<select id="rpt-state"><option>All</option>' + D.states.map(function (s) { return '<option>' + s + '</option>'; }).join('') + '</select></label>' +
      '<label>Category<select id="rpt-cat"><option>All</option>' + D.categories.map(function (s) { return '<option>' + s + '</option>'; }).join('') + '</select></label>' +
      '<label>Report type<select id="rpt-type"><option>Comprehensive</option><option>Viral trends</option><option>Alerts</option><option>Cases</option></select></label></div>' +
      '<button type="button" class="btn btn-primary" onclick="window.DrishtiUpgrade.generateAdminReport()">Generate report</button> ' +
      '<button type="button" class="btn btn-secondary" onclick="window.downloadGovAdminReportPDF()">Download PDF</button>' +
      '<div id="admin-report-preview" style="margin-top:10px;"></div>';
  }

  function generateAdminReport() {
    const D = window.DrishtiDemo;
    const prev = document.getElementById('admin-report-preview');
    if (prev) prev.innerHTML = '<div class="drishti-loading">Compiling…</div>';
    setTimeout(function () {
      const plat = (document.getElementById('rpt-plat') || {}).value;
      const st = (document.getElementById('rpt-state') || {}).value;
      const cat = (document.getElementById('rpt-cat') || {}).value;
      const html = '<div class="glass-panel" style="padding:12px;font-size:0.78rem;">' +
        '<p>दृष्टि (DRISHTI) AI • Administrator intelligence report • ' + new Date().toLocaleString('en-IN') + '</p>' +
        '<p>Filters: ' + esc(plat) + ' / ' + esc(st) + ' / ' + esc(cat) + '</p>' +
        '<p>Trends: ' + D.store.trends.length + ' • Alerts: ' + D.store.alerts.length + ' • Cases: ' + D.store.cases.length + '</p>' +
        '<p>Conclusion: Demonstration summary only. Connect platform APIs before operational use.</p></div>';
      if (prev) prev.innerHTML = html;
      if (window.showToast) window.showToast('Report ready — use Download PDF');
    }, 500);
  }

  function hydrateCopyright() {
    const panel = document.getElementById('copyright-infringers-panel');
    const D = window.DrishtiDemo;
    if (!panel || !D) return;
    let box = document.getElementById('copyright-sim-cases');
    if (!box) {
      box = document.createElement('div');
      box.id = 'copyright-sim-cases';
      panel.appendChild(box);
    }
    box.innerHTML = banner() + D.store.copyright.map(function (c) {
      return '<div class="glass-panel" style="padding:12px;margin:8px 0;">' +
        '<div>Original content → Detected similar content</div>' +
        '<strong style="color:var(--gov-navy);">' + esc(c.original) + '</strong><div style="opacity:0.6;">↓</div>' +
        '<div>' + esc(c.reused) + '</div>' +
        '<p>Similarity: ' + c.similarity + '% • Platform: ' + esc(c.platform) + ' • Account: ' + esc(c.account) + '</p>' +
        '<p style="font-size:0.75rem;">Portion: ' + esc(c.portion) + ' • Status: ' + esc(c.status) + '</p>' +
        ['Review', 'Save Evidence', 'Report', 'Send Notice', 'Escalate', 'Mark Resolved'].map(function (a) {
          return '<button type="button" class="btn btn-secondary" style="font-size:0.7rem;margin:3px;" onclick="window.DrishtiUpgrade.copyrightAction(\'' + c.id + '\',\'' + a + '\')">' + a + '</button>';
        }).join('') + '</div>';
    }).join('');
  }

  function copyrightAction(id, action) {
    if (action === 'Report' || action === 'Send Notice' || action === 'Escalate') {
      if (!window.confirm(action + ' requires confirmation. Continue? (Demo — nothing is filed with a platform.)')) return;
    }
    const c = window.DrishtiDemo.store.copyright.find(function (x) { return x.id === id; });
    if (c) {
      if (action === 'Mark Resolved') c.status = 'Resolved';
      else if (action === 'Save Evidence') c.status = 'Evidence saved';
      else c.status = action;
    }
    hydrateCopyright();
    if (window.showToast) window.showToast(action + ' recorded in demo ledger');
  }

  function afterGovRender(GovState) {
    try {
      hydrateViral(GovState);
      hydrateStatePulse(GovState);
      hydrateNarratives(GovState);
      hydrateCoordination(GovState);
      hydrateFiltration();
      hydrateAlerts();
      hydrateProvenance();
      hydrateMission();
      hydrateReports();
      renderLivePanel();
    } catch (e) {
      console.warn('DrishtiUpgrade afterGovRender', e);
    }
  }

  function startTicks() {
    if (window.__drishtiTick) return;
    window.__drishtiTick = setInterval(function () {
      if (window.DrishtiDemo) window.DrishtiDemo.tick();
      renderLivePanel();
      if (window.SOCIALPULSE_DATA && window.SOCIALPULSE_DATA.videos) {
        window.SOCIALPULSE_DATA.videos.forEach(function (v) {
          if (typeof v.viewsNumeric === 'number') {
            v.viewsNumeric += Math.round(4 + Math.random() * 18);
            v.views = window.DrishtiDemo ? window.DrishtiDemo.fmt(v.viewsNumeric) : String(v.viewsNumeric);
          }
        });
      }
      const kpi = document.getElementById('kpi-views');
      if (kpi && window.currentPlatform === 'youtube' && window.currentVideo && window.currentVideo.views) {
        kpi.textContent = window.currentVideo.views;
      }
    }, 8000);
  }

  function patchCreatorReportsPdf() {
    const btn = document.getElementById('btn-generate-report');
    if (btn && !document.getElementById('btn-creator-pdf-extra')) {
      const extra = document.createElement('button');
      extra.id = 'btn-creator-pdf-extra';
      extra.className = 'btn btn-secondary';
      extra.textContent = 'Download PDF';
      extra.onclick = function () { if (window.downloadReport) window.downloadReport(); };
      btn.parentNode.appendChild(extra);
    }
    ['facebook', 'telegram'].forEach(function (p) {
      const nav = document.querySelector('.reports-platform-nav');
      if (!nav || nav.querySelector('[data-report-plat="' + p + '"]')) return;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'reports-nav-btn';
      b.setAttribute('data-report-plat', p);
      b.innerHTML = '<span>' + (p === 'facebook' ? 'f' : '✈') + '</span><span>' + (p === 'facebook' ? 'Facebook' : 'Telegram') + '</span>';
      b.onclick = function () { if (window.switchReportPlatform) window.switchReportPlatform(p); };
      nav.appendChild(b);
    });
  }

  window.DrishtiUpgrade = {
    afterGovRender: afterGovRender,
    runFiltration: runFiltration,
    openAlert: openAlertDetail,
    ackAlert: function (id) {
      const a = window.DrishtiDemo.store.alerts.find(function (x) { return x.id === id; });
      if (a) a.status = 'Acknowledged';
      hydrateAlerts();
      renderLivePanel();
      if (window.showToast) window.showToast('Alert acknowledged');
    },
    setCaseStatus: function (id, status) {
      const c = window.DrishtiDemo.store.cases.find(function (x) { return x.caseId === id; });
      if (c) {
        c.caseStatus = status;
        c.actionLog.push({ t: new Date().toISOString(), by: 'Admin (demo)', a: 'Status → ' + status });
      }
      hydrateProvenance();
    },
    showPlaybook: showPlaybook,
    scanUrl: scanUrl,
    generateAdminReport: generateAdminReport,
    copyrightAction: copyrightAction,
    renderLivePanel: renderLivePanel
  };

  window.toggleLiveAlertPanel = function () {
    if (window.openNotificationModal) {
      const modal = document.getElementById('gov-notification-modal');
      if (modal && modal.style.display === 'flex') {
        window.closeNotificationModal();
      } else {
        window.openNotificationModal();
      }
      return;
    }
    const d = document.getElementById('live-alert-dropdown');
    if (d) {
      d.style.display = d.style.display === 'block' ? 'none' : 'block';
      renderLivePanel();
    }
  };

  function boot() {
    startTicks();
    hydrateCopyright();
    patchCreatorReportsPdf();
    renderLivePanel();
    document.addEventListener('click', function (e) {
      const wrap = document.getElementById('live-alert-panel');
      const drop = document.getElementById('live-alert-dropdown');
      if (wrap && drop && !wrap.contains(e.target)) drop.style.display = 'none';
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
