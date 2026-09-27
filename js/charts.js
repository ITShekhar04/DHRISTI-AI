/* ==========================================================================
   SOCIALPULSE AI - INTERACTIVE RETENTION & AUDIENCE CHARTS ENGINE
   ========================================================================== */

(function () {
  'use strict';

  // 1. RENDER RETENTION CURVE
  window.renderRetentionChart = function (videoData) {
    const container = document.getElementById('retention-chart-wrapper');
    if (!container) return;

    const dataPoints = videoData.retentionCurve || [];
    if (!dataPoints.length) return;

    const width = 760;
    const height = 240;
    const padX = 40;
    const padY = 30;
    const chartW = width - padX * 2;
    const chartH = height - padY * 2;

    // Map data points to coordinates
    const coords = dataPoints.map((pt, i) => {
      const x = padX + (i / (dataPoints.length - 1)) * chartW;
      const y = padY + chartH - (pt.percent / 100) * chartH;
      return { x, y, ...pt };
    });

    // Build smooth SVG path
    let dPath = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const cur = coords[i];
      const cx1 = prev.x + (cur.x - prev.x) / 2;
      const cy1 = prev.y;
      const cx2 = prev.x + (cur.x - prev.x) / 2;
      const cy2 = cur.y;
      dPath += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${cur.x} ${cur.y}`;
    }

    const dArea = `${dPath} L ${coords[coords.length - 1].x} ${height - padY} L ${coords[0].x} ${height - padY} Z`;

    // Locate anomaly point if exists (e.g. 03:12)
    const anomalyCoord = coords.find((c) => c.isAnomaly);

    // Rewatch zones (02:10–02:35 is roughly 43% to 51% of timeline, 04:20–04:55 is 86% to 98%)
    const rewatchX1 = padX + chartW * 0.43;
    const rewatchW1 = chartW * 0.09;
    const rewatchX2 = padX + chartW * 0.86;
    const rewatchW2 = chartW * 0.11;

    let svgHtml = `
      <svg viewBox="0 0 ${width} ${height}" class="retention-chart-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="curveFillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4facfe" stop-opacity="0.35"/>
            <stop offset="70%" stop-color="#6366f1" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="curveLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#00f2fe"/>
            <stop offset="50%" stop-color="#4facfe"/>
            <stop offset="100%" stop-color="#8b5cf6"/>
          </linearGradient>
          <filter id="glowDrop" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <!-- Horizontal grid lines -->
        <line x1="${padX}" y1="${padY}" x2="${width - padX}" y2="${padY}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4"/>
        <line x1="${padX}" y1="${padY + chartH * 0.5}" x2="${width - padX}" y2="${padY + chartH * 0.5}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4"/>
        <line x1="${padX}" y1="${height - padY}" x2="${width - padX}" y2="${height - padY}" stroke="rgba(255,255,255,0.1)"/>

        <!-- Rewatch Hotspot Highlights -->
        <rect x="${rewatchX1}" y="${padY}" width="${rewatchW1}" height="${chartH}" fill="rgba(245, 158, 11, 0.12)" rx="4"/>
        <rect x="${rewatchX2}" y="${padY}" width="${rewatchW2}" height="${chartH}" fill="rgba(245, 158, 11, 0.12)" rx="4"/>

        <text x="${rewatchX1 + rewatchW1 / 2}" y="${padY + 14}" fill="#f59e0b" font-size="10" font-weight="700" text-anchor="middle">2.8× Replay</text>
        <text x="${rewatchX2 + rewatchW2 / 2}" y="${padY + 14}" fill="#f59e0b" font-size="10" font-weight="700" text-anchor="middle">2.3× Replay</text>

        <!-- Area fill & Line curve -->
        <path d="${dArea}" fill="url(#curveFillGrad)"/>
        <path d="${dPath}" fill="none" stroke="url(#curveLineGrad)" stroke-width="3.5" stroke-linecap="round"/>

        <!-- Normal Data Points -->
        ${coords
          .filter((c) => !c.isAnomaly)
          .map(
            (c) => `
          <circle cx="${c.x}" cy="${c.y}" r="3.5" fill="#4facfe" stroke="#05070d" stroke-width="2"/>
        `
          )
          .join('')}

        <!-- 03:12 Major Drop-Off Anomaly Marker -->
        ${
          anomalyCoord
            ? `
          <!-- Pulsing Beacon Halo -->
          <circle cx="${anomalyCoord.x}" cy="${anomalyCoord.y}" r="14" fill="rgba(244, 63, 94, 0.25)" class="animate-beacon"/>
          <circle cx="${anomalyCoord.x}" cy="${anomalyCoord.y}" r="6" fill="#f43f5e" stroke="#ffffff" stroke-width="2"/>

          <!-- Anomaly Callout Tag -->
          <g transform="translate(${anomalyCoord.x - 65}, ${anomalyCoord.y - 36})" filter="url(#glowDrop)" style="cursor: pointer;" onclick="window.openDropModal()">
            <rect width="130" height="26" rx="6" fill="rgba(244, 63, 94, 0.95)" stroke="#fff" stroke-width="1"/>
            <text x="65" y="17" fill="#fff" font-size="10" font-weight="700" text-anchor="middle" letter-spacing="0.5">
              ⚠ 03:12 (-17% Drop)
            </text>
          </g>
        `
            : ''
        }

        <!-- X-Axis Labels -->
        <text x="${coords[0].x}" y="${height - 10}" fill="#64748b" font-size="11" text-anchor="start">0:00 (100%)</text>
        ${coords
          .slice(1, -1)
          .filter((_, idx) => idx % 2 === 0)
          .map((c) => `<text x="${c.x}" y="${height - 10}" fill="#64748b" font-size="11" text-anchor="middle">${c.time}</text>`)
          .join('')}
        <text x="${coords[coords.length - 1].x}" y="${height - 10}" fill="#64748b" font-size="11" text-anchor="end">${coords[coords.length - 1].time}</text>
      </svg>
    `;

    container.innerHTML = svgHtml;
  };

  // 2. CIRCULAR CONTENT SATISFACTION (ANIMATING 0 TO TARGET)
  window.renderSatisfactionGauge = function (score, breakdown) {
    const numberEl = document.getElementById('satisfaction-number');
    const circleEl = document.getElementById('satisfaction-circle-progress');
    if (!numberEl || !circleEl) return;

    const circumference = 2 * Math.PI * 68; // r = 68
    circleEl.style.strokeDasharray = `${circumference} ${circumference}`;
    circleEl.style.strokeDashoffset = `${circumference}`;

    // Animate stroke offset
    const offset = circumference - (score / 100) * circumference;
    setTimeout(() => {
      circleEl.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
      circleEl.style.strokeDashoffset = `${offset}`;
    }, 100);

    // Number count-up animation
    let current = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        current = score;
        clearInterval(timer);
      }
      numberEl.textContent = Math.round(current);
    }, stepTime);

    // Update breakdown bars
    if (breakdown) {
      const bars = [
        { id: 'bar-retention', val: breakdown.retention },
        { id: 'bar-engagement', val: breakdown.engagement },
        { id: 'bar-rewatch', val: breakdown.rewatch },
        { id: 'bar-sentiment', val: breakdown.sentiment }
      ];
      bars.forEach((b) => {
        const el = document.getElementById(b.id);
        const valEl = document.getElementById(`${b.id}-val`);
        if (el) el.style.width = `${b.val}%`;
        if (valEl) valEl.textContent = `${b.val}/100`;
      });
    }
  };

  // 3. AUDIENCE SEGMENT DONUT
  window.renderAudienceDonut = function (segments) {
    const container = document.getElementById('audience-donut-wrapper');
    if (!container) return;

    // Segment percentages: loyal (34%), returning (27%), casual (25%), oneTime (14%)
    const segs = [
      { label: 'Loyal Viewers', pct: segments.loyal || 34, color: '#6366f1' },
      { label: 'Returning Viewers', pct: segments.returning || 27, color: '#00f2fe' },
      { label: 'Casual Viewers', pct: segments.casual || 25, color: '#8b5cf6' },
      { label: 'One-Time Viewers', pct: segments.oneTime || 14, color: '#475569' }
    ];

    const size = 180;
    const radius = 70;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    let accumulated = 0;

    const circlesSvg = segs
      .map((s) => {
        const strokeLen = (s.pct / 100) * circumference;
        const offset = circumference - accumulated;
        accumulated += strokeLen;
        return `
        <circle 
          cx="${center}" 
          cy="${center}" 
          r="${radius}" 
          fill="transparent" 
          stroke="${s.color}" 
          stroke-width="18" 
          stroke-dasharray="${strokeLen} ${circumference}" 
          stroke-dashoffset="${offset}"
          transform="rotate(-90 ${center} ${center})"
          style="transition: all 0.8s ease;"
        />
      `;
      })
      .join('');

    container.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        ${circlesSvg}
        <text x="${center}" y="${center - 4}" text-anchor="middle" fill="#ffffff" font-family="'Outfit', sans-serif" font-size="22" font-weight="700">
          ${segs[0].pct + segs[1].pct}%
        </text>
        <text x="${center}" y="${center + 14}" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="600">
          Core Loyalty
        </text>
      </svg>
    `;
  };

  // 4. INSTAGRAM HOOK INTELLIGENCE CHART
  window.renderHookChart = function (reelData) {
    const container = document.getElementById('ig-hook-chart-wrapper');
    if (!container || !reelData.hookCurve) return;

    const dataPoints = reelData.hookCurve;
    const width = 760;
    const height = 240;
    const padX = 40;
    const padY = 30;
    const chartW = width - padX * 2;
    const chartH = height - padY * 2;

    const coords = dataPoints.map((pt, i) => {
      const x = padX + (i / (dataPoints.length - 1)) * chartW;
      const y = padY + chartH - (pt.percent / 100) * chartH;
      return { x, y, ...pt };
    });

    let dPath = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const cur = coords[i];
      const cx1 = prev.x + (cur.x - prev.x) / 2;
      dPath += ` C ${cx1} ${prev.y}, ${cx1} ${cur.y}, ${cur.x} ${cur.y}`;
    }

    const dArea = `${dPath} L ${coords[coords.length - 1].x} ${height - padY} L ${coords[0].x} ${height - padY} Z`;
    const anomalyCoord = coords.find((c) => c.isAnomaly);

    const maxSec = coords[coords.length - 1].seconds || 30;
    const rewatchRects = (reelData.rewatchHotspots || [])
      .map((h) => {
        const x = padX + (h.startSec / maxSec) * chartW;
        const w = ((h.endSec - h.startSec) / maxSec) * chartW;
        return `<rect x="${x}" y="${padY}" width="${w}" height="${chartH}" fill="rgba(245,158,11,0.12)" rx="4"/>
          <text x="${x + w / 2}" y="${padY + 14}" fill="#f59e0b" font-size="10" font-weight="700" text-anchor="middle">${h.multiplier}</text>`;
      })
      .join('');

    container.innerHTML = `
      <svg viewBox="0 0 ${width} ${height}" class="retention-chart-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="igHookFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#4facfe" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="igHookLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#00f2fe"/>
            <stop offset="100%" stop-color="#8b5cf6"/>
          </linearGradient>
        </defs>
        <line x1="${padX}" y1="${padY}" x2="${width - padX}" y2="${padY}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="4"/>
        <line x1="${padX}" y1="${height - padY}" x2="${width - padX}" y2="${height - padY}" stroke="rgba(255,255,255,0.1)"/>
        ${rewatchRects}
        <path d="${dArea}" fill="url(#igHookFill)"/>
        <path d="${dPath}" fill="none" stroke="url(#igHookLine)" stroke-width="3.5" stroke-linecap="round"/>
        ${coords.filter((c) => !c.isAnomaly).map((c) => `<circle cx="${c.x}" cy="${c.y}" r="3.5" fill="#4facfe" stroke="#05070d" stroke-width="2"/>`).join('')}
        ${
          anomalyCoord
            ? `
          <circle cx="${anomalyCoord.x}" cy="${anomalyCoord.y}" r="14" fill="rgba(244,63,94,0.25)" class="animate-beacon"/>
          <circle cx="${anomalyCoord.x}" cy="${anomalyCoord.y}" r="6" fill="#f43f5e" stroke="#fff" stroke-width="2"/>
          <g transform="translate(${anomalyCoord.x - 65}, ${anomalyCoord.y - 36})" style="cursor:pointer;" onclick="window.openDropModal()">
            <rect width="130" height="26" rx="6" fill="rgba(244,63,94,0.95)" stroke="#fff" stroke-width="1"/>
            <text x="65" y="17" fill="#fff" font-size="10" font-weight="700" text-anchor="middle">⚠ ${anomalyCoord.time} (-${anomalyCoord.dropPercent}%)</text>
          </g>
        `
            : ''
        }
        ${coords.map((c) => `<text x="${c.x}" y="${height - 10}" fill="#64748b" font-size="10" text-anchor="middle">${c.time}</text>`).join('')}
      </svg>
    `;
  };

  // 5. INSTAGRAM SATISFACTION GAUGE
  window.renderInstagramSatisfaction = function (score, breakdown) {
    const numberEl = document.getElementById('ig-satisfaction-number');
    const circleEl = document.getElementById('ig-satisfaction-circle-progress');
    const breakdownEl = document.getElementById('ig-satisfaction-breakdown');
    if (!numberEl || !circleEl) return;

    const circumference = 2 * Math.PI * 68;
    circleEl.style.strokeDasharray = `${circumference} ${circumference}`;
    circleEl.style.strokeDashoffset = `${circumference}`;
    setTimeout(() => {
      circleEl.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
      circleEl.style.strokeDashoffset = `${circumference - (score / 100) * circumference}`;
    }, 100);

    numberEl.textContent = score;

    if (breakdown && breakdownEl) {
      const bars = [
        { label: 'Reach', val: breakdown.reach, color: '#4facfe' },
        { label: 'Engagement', val: breakdown.engagement, color: '#6366f1' },
        { label: 'Shares', val: breakdown.shares, color: '#f59e0b' },
        { label: 'Saves', val: breakdown.saves, color: '#10b981' },
        { label: 'Sentiment', val: breakdown.sentiment, color: '#8b5cf6' }
      ];
      breakdownEl.innerHTML = `<div class="satisfaction-breakdown-list">${bars
        .map(
          (b) => `
        <div>
          <div class="breakdown-row"><span style="color: var(--text-secondary);">${b.label}</span><span style="font-weight: 700; color: #fff;">${b.val}/100</span></div>
          <div class="breakdown-bar-bg"><div class="breakdown-bar-fill" style="width: ${b.val}%; background: ${b.color};"></div></div>
        </div>
      `
        )
        .join('')}</div>`;
    }
  };

  // 6. INSTAGRAM AUDIENCE DONUT
  window.renderInstagramAudienceDonut = function (aud) {
    const container = document.getElementById('ig-audience-donut-wrapper');
    if (!container) return;

    const segs = [
      { pct: aud.newAudience, color: '#6366f1' },
      { pct: aud.returningAudience, color: '#00f2fe' },
      { pct: aud.highlyEngaged, color: '#8b5cf6' }
    ];
    const size = 180;
    const radius = 70;
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    let accumulated = 0;

    const circlesSvg = segs
      .map((s) => {
        const strokeLen = (s.pct / 100) * circumference;
        const offset = circumference - accumulated;
        accumulated += strokeLen;
        return `<circle cx="${center}" cy="${center}" r="${radius}" fill="transparent" stroke="${s.color}" stroke-width="18" stroke-dasharray="${strokeLen} ${circumference}" stroke-dashoffset="${offset}" transform="rotate(-90 ${center} ${center})"/>`;
      })
      .join('');

    container.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        ${circlesSvg}
        <text x="${center}" y="${center - 4}" text-anchor="middle" fill="#fff" font-family="'Outfit'" font-size="22" font-weight="700">${aud.newAudience + aud.returningAudience}%</text>
        <text x="${center}" y="${center + 14}" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="600">Core Audience</text>
      </svg>
    `;
  };

  // 7. INSTAGRAM GROWTH CHART
  window.renderInstagramGrowthChart = function (dataPoints) {
    const container = document.getElementById('ig-growth-chart-wrapper');
    if (!container || !dataPoints) return;

    const width = 320;
    const height = 100;
    const pad = 20;
    const chartW = width - pad * 2;
    const chartH = height - pad * 2;
    const max = Math.max(...dataPoints);

    const coords = dataPoints.map((v, i) => ({
      x: pad + (i / (dataPoints.length - 1)) * chartW,
      y: pad + chartH - (v / max) * chartH,
      v
    }));

    let dPath = `M ${coords[0].x} ${coords[0].y}`;
    coords.slice(1).forEach((c) => {
      dPath += ` L ${c.x} ${c.y}`;
    });

    container.innerHTML = `
      <div style="font-size: 0.72rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 8px;">7-Day Growth Trend</div>
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 80px;">
        <path d="${dPath}" fill="none" stroke="#00f2fe" stroke-width="2.5" stroke-linecap="round"/>
        ${coords.map((c) => `<circle cx="${c.x}" cy="${c.y}" r="3" fill="#6366f1"/>`).join('')}
      </svg>
    `;
  };

  // 8. REWATCH TIMELINE VISUAL
  window.renderRewatchTimeline = function (reelData) {
    const container = document.getElementById('ig-rewatch-timeline');
    if (!container || !reelData.rewatchHotspots) return;

    const maxSec = reelData.hookCurve ? reelData.hookCurve[reelData.hookCurve.length - 1].seconds : 30;

    container.innerHTML = `
      <div style="margin-top: 14px; position: relative; height: 32px; background: rgba(255,255,255,0.04); border-radius: 6px; overflow: hidden;">
        ${reelData.rewatchHotspots
          .map((h) => {
            const left = (h.startSec / maxSec) * 100;
            const width = ((h.endSec - h.startSec) / maxSec) * 100;
            return `<div style="position: absolute; left: ${left}%; width: ${width}%; height: 100%; background: rgba(245,158,11,0.35); border-radius: 4px;" title="${h.timestamp} — ${h.multiplier}"></div>`;
          })
          .join('')}
        <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.68rem; color: var(--text-tertiary);">Reel Timeline</div>
      </div>
    `;
  };
})();
