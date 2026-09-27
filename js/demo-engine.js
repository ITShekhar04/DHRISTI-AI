/**
 * DRISHTI AI — Simulated / demo data engine
 * Isolated platform datasets, state/category intelligence, live-but-realistic ticks.
 * Ready for later API swap via window.DrishtiDemo.fetch* stubs.
 */
(function () {
  'use strict';

  const SIM_LABEL = 'SIMULATED / DEMO DATA — not live social-media telemetry';

  const STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const CATEGORIES = [
    'Politics', 'Government', 'Economy', 'Business', 'Technology', 'Cybersecurity', 'Education',
    'Agriculture', 'Farmers', 'Defence', 'International affairs', 'Entertainment', 'Sports',
    'Health', 'Environment', 'Social issues', 'Regional issues', 'Employment', 'Government schemes',
    'Crime', 'Other'
  ];

  const PLATFORMS = ['YouTube', 'Instagram', 'X', 'Facebook', 'Telegram'];

  function hash(str) {
    let h = 2166136261;
    const s = String(str);
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function rng(seed) {
    let x = seed || 1;
    return function () {
      x ^= x << 13;
      x ^= x >>> 17;
      x ^= x << 5;
      return ((x >>> 0) % 10000) / 10000;
    };
  }

  function pick(arr, r) {
    return arr[Math.floor(r() * arr.length) % arr.length];
  }

  function fmt(n) {
    const v = Math.max(0, Math.round(n));
    if (v >= 1e7) return (v / 1e7).toFixed(2) + ' Cr';
    if (v >= 1e5) return (v / 1e5).toFixed(1) + ' L';
    if (v >= 1e3) return (v / 1e3).toFixed(1) + 'K';
    return String(v);
  }

  function nowIso(offsetMin) {
    return new Date(Date.now() - (offsetMin || 0) * 60000).toISOString();
  }

  function ageMix(r) {
    const a = 18 + Math.floor(r() * 22);
    const b = 22 + Math.floor(r() * 18);
    const c = 14 + Math.floor(r() * 16);
    const d = Math.max(4, 100 - a - b - c);
    return { '13-17': Math.max(4, 100 - a - b - c - 8), '18-24': a, '25-34': b, '35-49': c, '50+': d };
  }

  const TREND_TITLES = {
    Politics: 'State assembly floor debate clips go pan-India',
    Government: 'Digital public service portal wait-time discussion',
    Economy: 'Rupee settlement corridor explainers trend among MSMEs',
    Business: 'Startup hiring freeze vs campus placement debate',
    Technology: 'Open-source local LLM runtimes for Indic languages',
    Cybersecurity: 'Quishing QR codes in festive offer flyers',
    Education: 'NEET counselling round capacity rumours',
    Agriculture: 'MSP dialogue and crop insurance claim timelines',
    Farmers: 'Kisan morcha live feeds and highway disruption clips',
    Defence: 'Indigenous UAV trial footage and veteran commentary',
    'International affairs': 'BRICS 2026 trade-corridor briefings',
    Entertainment: 'Regional cinema interval songs on short-form',
    Sports: 'Domestic T20 auction snubs and fan edits',
    Health: 'Seasonal dengue ward occupancy explainers',
    Environment: 'Urban lake restoration before monsoon',
    'Social issues': 'Gig-worker social-security draft comments',
    'Regional issues': 'Language-medium school policy threads',
    Employment: 'National skill mission portal timeout reports',
    'Government schemes': 'PM-KISAN instalment verification queries',
    Crime: 'Simulated cyber-fraud awareness campaigns (fictional handles)',
    Other: 'Emerging civic hashtag with unclear origin'
  };

  function platformMetrics(platform, seed, base) {
    const r = rng(seed + hash(platform));
    const views = Math.round(base * (0.4 + r() * 1.8));
    const likes = Math.round(views * (0.02 + r() * 0.08));
    const comments = Math.round(likes * (0.08 + r() * 0.2));
    const shares = Math.round(likes * (0.12 + r() * 0.4));
    const common = {
      platform,
      views: fmt(views),
      likes: fmt(likes),
      comments: fmt(comments),
      shares: fmt(shares),
      engagementRate: (1.8 + r() * 8).toFixed(1) + '%',
      growthRate: '+' + Math.round(12 + r() * 180) + '%/hr',
      estimatedAudience: fmt(views * (1.4 + r())),
      dataStatus: SIM_LABEL
    };
    if (platform === 'YouTube') {
      return Object.assign(common, {
        videos: Math.round(8 + r() * 90),
        channels: Math.round(4 + r() * 40),
        watchTimeHours: fmt(views / 40),
        shorts: Math.round(12 + r() * 80),
        topAsset: 'Long-form briefing + Shorts recap',
        format: 'Video / Shorts'
      });
    }
    if (platform === 'Instagram') {
      return Object.assign(common, {
        reels: Math.round(20 + r() * 120),
        posts: Math.round(10 + r() * 40),
        stories: Math.round(30 + r() * 90),
        saves: fmt(likes * 0.35),
        hashtags: 6 + Math.floor(r() * 10),
        creatorAccounts: Math.round(15 + r() * 80),
        topAsset: 'Reel + carousel recap',
        format: 'Reels / Posts / Stories'
      });
    }
    if (platform === 'X') {
      return Object.assign(common, {
        posts: Math.round(200 + r() * 2400),
        reposts: fmt(shares),
        replies: fmt(comments),
        impressions: fmt(views * 1.6),
        trendingTopics: 3 + Math.floor(r() * 6),
        topAsset: 'Quote-posts + civic threads',
        format: 'Posts / Hashtags'
      });
    }
    if (platform === 'Facebook') {
      return Object.assign(common, {
        pagePosts: Math.round(18 + r() * 70),
        pages: Math.round(6 + r() * 28),
        groups: Math.round(4 + r() * 22),
        reactions: fmt(likes * 1.15),
        videoViews: fmt(views * 0.55),
        topAsset: 'Page video + group discussion',
        format: 'Posts / Pages / Groups'
      });
    }
    return Object.assign(common, {
      channels: Math.round(5 + r() * 24),
      messages: fmt(1200 + r() * 18000),
      groups: Math.round(3 + r() * 18),
      forwards: fmt(shares * 1.8),
      subscribers: fmt(8000 + r() * 120000),
      topAsset: 'Broadcast channel dossier',
      format: 'Channels / Forwards'
    });
  }

  function buildTrend(id, category, extra) {
    extra = extra || {};
    const r = rng(hash(id + category));
    const base = 180000 + Math.floor(r() * 9e6);
    const sentP = 28 + Math.floor(r() * 48);
    const sentN = 8 + Math.floor(r() * 32);
    const sentU = Math.max(6, 100 - sentP - sentN);
    const platforms = {};
    PLATFORMS.forEach((p) => {
      platforms[p.toLowerCase()] = platformMetrics(p, hash(id), base * (0.15 + r() * 0.5));
    });
    const loc = extra.location || pick(STATES, r);
    return {
      id: id,
      name: extra.name || TREND_TITLES[category] || category + ' discussion cluster',
      title: extra.name || TREND_TITLES[category],
      category: category,
      field: extra.field || category,
      description: extra.description || ('Simulated India-wide discussion around ' + category.toLowerCase() + '. Figures are demonstration estimates, not verified census or platform API counts.'),
      status: pick(['Rising', 'Peaking', 'Stabilising', 'Declining', 'Watch'], r),
      platform: extra.platform || 'Multi-platform',
      trendScore: 55 + Math.floor(r() * 44),
      viralityScore: extra.viralityScore || (60 + Math.floor(r() * 39)),
      relatedPostsCount: Math.round(400 + r() * 8000),
      views: fmt(base),
      viewsNumeric: base,
      likes: fmt(base * 0.06),
      comments: fmt(base * 0.012),
      shares: fmt(base * 0.02),
      engagementRate: (2 + r() * 9).toFixed(1) + '%',
      growthVelocity: '+' + Math.round(20 + r() * 380) + '%/hr',
      growthVelocityNumeric: Math.round(20 + r() * 380),
      firstObservedTimestamp: extra.firstObservedTimestamp || nowIso(180 + r() * 800),
      latestActivity: nowIso(2 + r() * 40),
      location: loc,
      geographicConcentration: extra.geographicConcentration || (loc + ' and neighbouring districts'),
      relatedHashtags: extra.topHashtags || ['#' + category.replace(/\s/g, ''), '#IndiaDiscourse', '#DrishtiDemo'],
      topHashtags: extra.topHashtags || ['#' + category.replace(/\s/g, ''), '#IndiaDiscourse'],
      relatedKeywords: extra.keywords || [category.toLowerCase(), 'public discussion', 'regional feed'],
      sentimentDistribution: extra.sentimentDistribution || { positive: sentP, negative: sentN, neutral: sentU },
      estimatedAudience: fmt(base * 1.7),
      ageGroups: extra.demographics || ageMix(r),
      demographics: extra.demographics || ageMix(r),
      source: extra.earliestObservedSource || ('Simulated source node on ' + pick(PLATFORMS, r)),
      earliestObservedSource: extra.earliestObservedSource || 'Simulated origin account (fictional handle)',
      trendOrigin: extra.originCity || loc,
      originCity: extra.originCity || loc,
      relatedContent: extra.relatedContent || ['Explainers', 'Citizen comments', 'Official clarifications (where issued)'],
      timeline: [
        { stage: 'SOURCE', time: nowIso(900), note: 'First simulated mention logged' },
        { stage: 'FIRST PLATFORM', time: nowIso(720), note: pick(PLATFORMS, r) + ' seed post' },
        { stage: 'EARLY AMPLIFIERS', time: nowIso(480), note: 'Regional pages / channels' },
        { stage: 'SECONDARY PLATFORMS', time: nowIso(240), note: 'Cross-posting pattern' },
        { stage: 'VIRAL SPREAD', time: nowIso(90), note: 'Velocity threshold crossed (demo)' },
        { stage: 'PUBLIC REACTION', time: nowIso(12), note: 'Comment sentiment mixed' }
      ],
      narrative: extra.citizenViewpoint || extra.narrative || TREND_TITLES[category],
      platformBreakdown: platforms,
      dataSourceStatus: SIM_LABEL,
      sparklineData: [12, 18, 22, 31, 44, 58, 70].map((n) => Math.round(n * (0.8 + r() * 0.5)))
    };
  }

  function enrichExistingTrends(list) {
    return (list || []).map(function (t) {
      const cat = t.field && t.field.indexOf('Agri') >= 0 ? 'Agriculture'
        : t.field && t.field.indexOf('Cyber') >= 0 ? 'Cybersecurity'
        : t.field && t.field.indexOf('Geo') >= 0 ? 'International affairs'
        : t.field && t.field.indexOf('Tech') >= 0 ? 'Technology'
        : t.field && t.field.indexOf('Science') >= 0 ? 'Defence'
        : t.field && t.field.indexOf('Economy') >= 0 ? 'Economy'
        : 'Government';
      const built = buildTrend(t.id || ('trend-' + hash(t.name)), cat, t);
      return Object.assign({}, built, t, {
        category: built.category,
        description: built.description,
        status: built.status,
        trendScore: built.trendScore,
        latestActivity: built.latestActivity,
        location: t.originCity || built.location,
        relatedHashtags: t.topHashtags || built.relatedHashtags,
        relatedKeywords: built.relatedKeywords,
        estimatedAudience: built.estimatedAudience,
        ageGroups: t.demographics || built.ageGroups,
        source: t.earliestObservedSource || built.source,
        trendOrigin: t.originCity || built.trendOrigin,
        relatedContent: built.relatedContent,
        timeline: built.timeline,
        platformBreakdown: Object.assign({}, built.platformBreakdown, t.platformBreakdown || {}),
        dataSourceStatus: SIM_LABEL
      });
    });
  }

  function extraCategoryTrends() {
    return CATEGORIES.map(function (c, i) {
      return buildTrend('trend-cat-' + i, c);
    });
  }

  function statePulse(state, area) {
    const r = rng(hash(state + '|' + area));
    const cats = area && area !== 'All' && area !== 'Other' ? [area] : pick(CATEGORIES, r) && [pick(CATEGORIES, r), pick(CATEGORIES, r), pick(CATEGORIES, r)];
    const topics = (Array.isArray(cats) ? cats : [area || 'Regional issues']).slice(0, 4).map(function (c, i) {
      const t = buildTrend('sp-' + hash(state + c + i), c || 'Regional issues', { location: state });
      return {
        topic: t.title + ' — ' + state,
        field: t.category,
        platform: pick(PLATFORMS, r),
        velocity: t.growthVelocity,
        volume: t.views,
        sentiment: t.sentimentDistribution,
        hashtags: t.relatedHashtags
      };
    });
    const pos = 30 + Math.floor(r() * 45);
    const neg = 10 + Math.floor(r() * 30);
    const neu = Math.max(8, 100 - pos - neg);
    return {
      state: state,
      area: area || 'All',
      dataStatus: SIM_LABEL,
      regionalScore: 40 + Math.floor(r() * 55),
      sentiment: { positive: pos, negative: neg, neutral: neu },
      viralTopics: topics,
      trendingHashtags: topics[0] ? topics[0].hashtags : ['#StatePulse'],
      trendingPosts: topics.map(function (t, i) {
        return {
          title: t.topic,
          platform: t.platform,
          engagement: t.volume,
          handle: '@sim_' + state.replace(/\s/g, '_').slice(0, 10).toLowerCase() + i
        };
      }),
      regionalNews: [
        'Simulated desk: local administration FAQ on ' + (area || 'civic') + ' queries.',
        'Simulated desk: district-level discussion volume shifted vs 24h ago.'
      ],
      activity: fmt(40000 + r() * 900000),
      mostDiscussed: topics.map(function (t) { return t.topic; }),
      mostActivePlatforms: PLATFORMS.slice().sort(function () { return r() - 0.5; }).slice(0, 3),
      mostActiveLocations: [state.split(' ')[0] + ' HQ', 'District cluster A', 'District cluster B'],
      demographics: ageMix(r),
      topAccounts: ['@sim_civic_watch', '@sim_local_desk', '@sim_edu_forum'].map(function (h) {
        return { handle: h, note: 'Fictional demonstration account' };
      }),
      emergingIssues: ['Capacity rumours', 'Clarification requests', 'Regional comparison posts'],
      timeline: [nowIso(600), nowIso(240), nowIso(40)].map(function (tm, i) {
        return { time: tm, event: ['Seed posts', 'Local amplification', 'Statewide mentions'][i] };
      })
    };
  }

  function narrativesFromTrends(trends) {
    return (trends || []).slice(0, 8).map(function (t, i) {
      const s = t.sentimentDistribution || { positive: 40, negative: 30, neutral: 30 };
      const response = s.positive >= 50 ? 'Positive public response'
        : s.negative >= 45 ? 'Negative public response'
        : 'Mixed / neutral response';
      const r = rng(hash(t.id + 'narr'));
      return {
        id: 'narr-' + (t.id || i),
        narrativeTitle: t.name || t.title,
        topic: t.category || t.field || 'Public discourse',
        sourceContent: t.earliestObservedSource || t.source,
        platforms: PLATFORMS.slice(0, 3 + (i % 3)),
        reach: t.views,
        engagement: t.likes,
        sentiment: response,
        publicReaction: t.narrative || t.description,
        positivePct: s.positive,
        negativePct: s.negative,
        neutralPct: s.neutral,
        sentimentTrend: [s.positive - 8, s.positive - 3, s.positive, Math.min(90, s.positive + 4)],
        mostAffectedDemographic: 'Estimated 18–34 (simulated cohort)',
        ageGroups: t.ageGroups || t.demographics,
        geographicDistribution: t.geographicConcentration,
        audienceReaction: 'Estimated reactions only — not verified survey data.',
        supportingOpinions: ['Scheme is useful if portals stay up', 'Need clearer eligibility notes'],
        opposingOpinions: ['Process feels opaque', 'Regional allocation concerns'],
        keyThemes: t.relatedKeywords || ['eligibility', 'portal', 'jobs'],
        narrativeGrowth: t.growthVelocity,
        timeline: t.timeline,
        criticism_of_government: s.negative > 40,
        volume: t.relatedPostsCount + ' related items (sim.)',
        dataStatus: SIM_LABEL
      };
    });
  }

  function coordinationFor(trend) {
    const r = rng(hash((trend && trend.id) || 'coord'));
    return {
      trendId: trend && trend.id,
      whereStarted: (trend && trend.trendOrigin) || pick(STATES, r),
      firstPlatform: pick(PLATFORMS, r),
      firstDetectedTime: trend && trend.firstObservedTimestamp,
      originalContent: trend && (trend.earliestObservedSource || trend.source),
      sourceAccount: '@sim_origin_' + Math.floor(r() * 900),
      sourceUrl: 'https://example.invalid/sim/' + (trend && trend.id),
      spreadHow: 'Cross-posted captions with high lexical overlap (indicator, not proof of collusion).',
      platformsInvolved: PLATFORMS,
      timeline: trend && trend.timeline,
      majorAccounts: ['@sim_amp_01', '@sim_amp_02', '@sim_local_page'],
      engagementPattern: 'Burst within 12 minutes, then organic-looking tail (simulated).',
      similarPosts: Math.round(20 + r() * 80) + ' near-duplicate captions',
      coordinatedAmplification: 'Coordinated behaviour indicator: timestamp clustering',
      botSpamIndicators: r() > 0.55 ? 'Possible automated activity (identical intervals)' : 'No strong automation indicator',
      geographicActivity: trend && trend.geographicConcentration,
      networkNote: 'Edges are demonstration relationships among fictional handles.',
      dataStatus: SIM_LABEL
    };
  }

  const ALERT_TYPES = [
    'New viral trend', 'Rapid trend growth', 'Suspicious account activity', 'Spam activity',
    'Bot activity', 'Possible account attack', 'Cybersecurity event', 'Content spike',
    'Major sentiment change', 'New state-level trend', 'Copyright detection', 'Suspicious URL',
    'Administrator action', 'Content moderation event', 'Phishing attempt'
  ];

  function makeAlert(i, extra) {
    extra = extra || {};
    const r = rng(hash('alert-' + i + Date.now().toString().slice(-5)));
    const sev = extra.severity || pick(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], r);
    return {
      id: extra.id || ('alt-live-' + i + '-' + Date.now().toString().slice(-6)),
      timestamp: nowIso(r() * 20),
      alertType: extra.alertType || pick(ALERT_TYPES, r),
      severity: sev,
      severityIcon: sev === 'CRITICAL' ? '🔴' : sev === 'HIGH' ? '🟠' : sev === 'MEDIUM' ? '🟡' : '🟢',
      title: extra.title || (pick(ALERT_TYPES, r) + ' — simulated feed item'),
      description: extra.description || extra.whyTriggered || 'Demonstration event for operator training. Not a confirmed real-world incident.',
      whyTriggered: extra.whyTriggered || 'Threshold crossed in demo engine.',
      source: extra.source || 'Drishti demo correlator',
      relatedPlatform: extra.relatedPlatform || pick(PLATFORMS, r),
      platformsInvolved: extra.platformsInvolved || [pick(PLATFORMS, r)],
      relatedContent: extra.relatedContent || 'Simulated item ID SIM-' + (1000 + i),
      recommendedAction: extra.recommendedReviewAction || 'Review, preserve logs, escalate only with human approval.',
      recommendedReviewAction: extra.recommendedReviewAction || 'Human review recommended.',
      status: extra.status || pick(['New', 'Acknowledged', 'Monitoring', 'Closed'], r),
      evidence: extra.evidence || 'Demo evidence packet (fictional).',
      confidence: extra.confidence || (70 + Math.floor(r() * 25)) + '%',
      dataStatus: SIM_LABEL
    };
  }

  function seedAlerts() {
    const base = [
      makeAlert(1, { severity: 'CRITICAL', alertType: 'Rapid trend growth', title: 'Velocity spike on employment-mission cluster (demo)' }),
      makeAlert(2, { severity: 'HIGH', alertType: 'Bot activity', title: 'Possible automated activity around identical shortlinks (demo)' }),
      makeAlert(3, { severity: 'HIGH', alertType: 'Suspicious URL', title: 'Lookalike KYC domain submitted to scanner (demo)' }),
      makeAlert(4, { severity: 'MEDIUM', alertType: 'Major sentiment change', title: 'Negative share rose in one state-topic pair (demo)' }),
      makeAlert(5, { severity: 'MEDIUM', alertType: 'New state-level trend', title: 'Kerala / education cluster acceleration (demo)' }),
      makeAlert(6, { severity: 'LOW', alertType: 'Copyright detection', title: 'Similarity indicator on reused civic clip (demo)' }),
      makeAlert(7, { severity: 'LOW', alertType: 'Administrator action', title: 'Case SIM-2026-044 marked Evidence Collected' })
    ];
    return base;
  }

  function cases() {
    return [
      {
        caseId: 'SIM-2026-041',
        incidentType: 'Phishing kit hosting (simulated)',
        datetime: nowIso(2200),
        platform: 'Telegram',
        reportedEntity: 'Fictional channel @sim_kyc_helpdesk',
        description: 'Lookalike customer-support lures. No real persons accused.',
        evidence: 'Screenshot hashes (demo), URL list (example.invalid).',
        relatedContent: 'Forwarded APK warning card',
        relatedUrl: 'https://example.invalid/sim-kyc',
        actionsTaken: ['Logged', 'Advisory drafted (pending approval)'],
        investigationStatus: 'Under Review',
        evidenceStatus: 'Evidence Collected',
        caseStatus: 'Under Review',
        actionLog: [{ t: nowIso(2000), by: 'Admin (demo)', a: 'Opened case' }]
      },
      {
        caseId: 'SIM-2026-044',
        incidentType: 'Impersonation page (simulated)',
        datetime: nowIso(1600),
        platform: 'Facebook',
        reportedEntity: 'Fictional page "Official Helpdesk India Sim"',
        description: 'Brand-mimic page for training. Not a live enforcement record.',
        evidence: 'Page ID SIM-FB-8891',
        relatedContent: 'Boosted post copy',
        relatedUrl: 'https://example.invalid/fb/sim',
        actionsTaken: ['Flagged for platform report (not auto-submitted)'],
        investigationStatus: 'Reported',
        evidenceStatus: 'Evidence Collected',
        caseStatus: 'Reported',
        actionLog: [{ t: nowIso(1500), by: 'Admin (demo)', a: 'Queued human-approved report pack' }]
      },
      {
        caseId: 'SIM-2026-051',
        incidentType: 'Spam burst (simulated)',
        datetime: nowIso(400),
        platform: 'X',
        reportedEntity: 'Cluster of fictional handles',
        description: 'Near-duplicate investment spam. Coordination indicator only.',
        evidence: 'Text-similarity 0.91 (demo model)',
        relatedContent: 'Hashtag cluster',
        relatedUrl: 'https://example.invalid/x/sim',
        actionsTaken: ['Monitoring'],
        investigationStatus: 'Under Review',
        evidenceStatus: 'Partial',
        caseStatus: 'Escalated',
        actionLog: [{ t: nowIso(300), by: 'Analyst (demo)', a: 'Escalated to review queue' }]
      },
      {
        caseId: 'SIM-2026-060',
        incidentType: 'Resolved awareness case (simulated)',
        datetime: nowIso(8000),
        platform: 'YouTube',
        reportedEntity: 'Fictional explainer channel',
        description: 'Mislabelled clip; creator corrected title.',
        evidence: 'Description diff',
        relatedContent: 'Civic explainer',
        relatedUrl: 'https://example.invalid/yt/sim',
        actionsTaken: ['Documented', 'Closed'],
        investigationStatus: 'Resolved',
        evidenceStatus: 'Archived',
        caseStatus: 'Closed',
        actionLog: [{ t: nowIso(7900), by: 'Admin (demo)', a: 'Closed after correction' }]
      }
    ];
  }

  function analyzeUrl(raw) {
    const url = (raw || '').trim() || 'https://example.invalid/unknown';
    let host = 'unknown';
    try {
      host = new URL(url.startsWith('http') ? url : 'https://' + url).hostname;
    } catch (e) {
      host = url.replace(/^https?:\/\//, '').split('/')[0] || 'unknown';
    }
    const r = rng(hash(host));
    const lookalike = /kyc|sbi-|pnb-|aadhaar|free-crypto|wallet-connect|login-verify/i.test(host);
    const ipish = /^\d+\.\d+\./.test(host);
    let risk = Math.round(12 + r() * 40);
    if (lookalike) risk = 78 + Math.floor(r() * 18);
    if (ipish) risk += 15;
    if (host.indexOf('example.invalid') >= 0) risk = Math.max(risk, 55);
    risk = Math.min(99, risk);
    const verdict = risk >= 75 ? 'HIGH RISK' : risk >= 45 ? 'SUSPICIOUS' : risk >= 20 ? 'UNKNOWN' : 'SAFE';
    return {
      url: url,
      domain: host,
      domainAge: lookalike ? 'Simulated: 4 hours' : 'Simulated: 3 years',
      https: /^https:\/\//i.test(url) || url.indexOf('http://') !== 0,
      redirects: lookalike ? 'Multiple hop indicators (not fetched live)' : 'None observed in metadata',
      suspiciousCharacteristics: lookalike ? ['Lookalike brand tokens', 'Newly seen host (demo)'] : ['None strong'],
      threatIndicators: lookalike ? ['Credential harvest pattern (heuristic)'] : [],
      reputation: lookalike ? 'Unknown / untrusted (simulated)' : 'Insufficient history',
      phishingIndicators: lookalike ? 'High (heuristic)' : 'Low',
      malwareIndicators: /apk|exe|dmg/i.test(url) ? 'File lure in path' : 'Not indicated',
      riskScore: risk,
      verdict: verdict,
      recommendedAction: verdict === 'HIGH RISK' ? 'Do not visit. Flag, investigate, escalate with approval.'
        : verdict === 'SUSPICIOUS' ? 'Monitor and investigate. Do not auto-block without authority.'
        : 'Monitor. Insufficient evidence for enforcement.',
      note: 'Prototype does not fetch the URL. Heuristic simulation only.',
      dataStatus: SIM_LABEL
    };
  }

  function authenticityFor(kind, name) {
    const r = rng(hash((kind || 'text') + (name || '')));
    const fake = Math.round(8 + r() * 70);
    const real = Math.round(12 + r() * (90 - fake));
    const uncertain = Math.max(4, 100 - fake - real);
    const low = Math.max(real, fake, uncertain) < 55 || uncertain > 35;
    return {
      kind: kind,
      name: name || 'Untitled',
      authenticityScore: real,
      fakeScore: fake,
      uncertainScore: uncertain,
      manipulationIndicators: fake > 50 ? ['Inconsistent lighting (sim.)', 'Metadata gaps'] : ['Minor compression artefacts'],
      aiGeneratedIndicators: fake > 60 ? ['Frequency-domain artefacts (sim. model)'] : ['Not strongly indicated'],
      sourceInfo: 'Uploader-provided / unknown',
      metadata: 'EXIF/C2PA not verified in this prototype',
      textInconsistencies: kind === 'Article' || kind === 'Text' ? ['Unsourced statistics'] : ['N/A'],
      sourceCredibility: 'Unrated — simulated',
      relatedSources: ['PIB fact-check desk (placeholder)', 'Independent news (placeholder)'],
      similarContent: ['2 near-duplicate items in demo index'],
      publicationDate: nowIso(1200),
      detectionResult: low ? 'Insufficient evidence / Requires human verification.'
        : (real >= fake ? 'Likely authentic (low-moderate confidence)' : 'Likely manipulated (low-moderate confidence)'),
      explanation: 'This is a simulated forensic readout. The system cannot determine absolute truth.',
      dataStatus: SIM_LABEL
    };
  }

  function creatorPlatform(id) {
    const r = rng(hash('creator-' + id));
    const mkItem = function (prefix, i, title, metrics) {
      return Object.assign({
        id: prefix + '-' + (i + 1),
        title: title,
        published: (i + 1) + ' days ago',
        timeAgo: (i + 1) + ' days ago',
        category: pick(['Education', 'Tech', 'Civic', 'Lifestyle'], r),
        hashtags: ['#Demo', '#CreatorStudio', '#India'],
        sentiment: { positive: 40 + Math.floor(r() * 40), negative: 8 + Math.floor(r() * 20), neutral: 20 },
        growth: '+' + Math.round(2 + r() * 18) + '%',
        performanceTimeline: [40, 55, 62, 70, 68, 74].map(function (n) { return n + Math.floor(r() * 8); }),
        dataStatus: SIM_LABEL
      }, metrics);
    };
    if (id === 'facebook') {
      const posts = [
        mkItem('fb', 0, 'Page update: campus hiring AMA (sim.)', { views: '210,400', likes: '18,200', comments: '940', shares: '2,100', saves: '640', reach: '390,000', engagementRate: '4.8%', reactions: '21,400' }),
        mkItem('fb', 1, 'Group clip: MSME GST explainer', { views: '88,200', likes: '6,400', comments: '510', shares: '1,820', saves: '220', reach: '142,000', engagementRate: '6.1%', reactions: '7,100' }),
        mkItem('fb', 2, 'Live replay: product teardown', { views: '154,000', likes: '11,800', comments: '1,240', shares: '3,050', saves: '410', reach: '260,000', engagementRate: '5.4%', reactions: '13,200' })
      ];
      return {
        id: 'facebook',
        name: 'Facebook',
        kpis: { pageReach: '1.12M', followers: '86,400', reactions: '142K', comments: '18.2K', shares: '24.6K', videoPerf: '68% avg 3s view' },
        posts: posts,
        defaultId: posts[0].id
      };
    }
    if (id === 'telegram') {
      const posts = [
        mkItem('tg', 0, 'Channel brief: weekly cyber hygiene (sim.)', { views: '64,800', likes: '2,140', comments: '180', shares: '4,900', saves: '0', reach: '64,800', engagementRate: '11.2%', forwards: '4,900' }),
        mkItem('tg', 1, 'PDF: scam red-flag checklist', { views: '41,200', likes: '1,020', comments: '96', shares: '6,400', saves: '0', reach: '41,200', engagementRate: '18.4%', forwards: '6,400' }),
        mkItem('tg', 2, 'Poll: which fraud vector spiked?', { views: '28,600', likes: '860', comments: '240', shares: '1,100', saves: '0', reach: '28,600', engagementRate: '7.7%', forwards: '1,100' })
      ];
      return {
        id: 'telegram',
        name: 'Telegram',
        kpis: { subscribers: '52,300', views: '412K', forwards: '28.4K', reactions: '9.1K', engagement: '9.8%' },
        posts: posts,
        defaultId: posts[0].id
      };
    }
    return null;
  }

  function copyrightCases() {
    return [
      {
        id: 'cr-sim-1',
        original: '5 Productivity Hacks — Audience Retention',
        reused: '“5 Hacks” recut with affiliate overlay (fictional account)',
        platform: 'Instagram',
        account: '@sim_clips_mirror',
        url: 'https://example.invalid/ig/sim-reuse',
        similarity: 87,
        portion: '00:31–00:58 visual+audio',
        detected: nowIso(800),
        evidence: 'Perceptual hash match (demo)',
        status: 'Review'
      },
      {
        id: 'cr-sim-2',
        original: 'Complete JavaScript Tutorial',
        reused: 'Shorts compilation using intro bumper',
        platform: 'YouTube',
        account: '@sim_code_vault',
        url: 'https://example.invalid/yt/sim-reuse',
        similarity: 64,
        portion: 'Intro bumper 8s',
        detected: nowIso(1600),
        evidence: 'Audio fingerprint (demo)',
        status: 'Evidence saved'
      }
    ];
  }

  const store = {
    label: SIM_LABEL,
    states: STATES,
    categories: CATEGORIES,
    platforms: PLATFORMS,
    trends: [],
    alerts: seedAlerts(),
    cases: cases(),
    copyright: copyrightCases(),
    facebook: creatorPlatform('facebook'),
    telegram: creatorPlatform('telegram'),
    incidents: [
      { id: 'inc-fraud', name: 'Cyber fraud', steps: ['Detect', 'Collect evidence', 'Verify', 'Classify', 'Assess severity', 'Preserve evidence', 'Report', 'Restrict/block where authorized', 'Escalate', 'Monitor', 'Resolve', 'Document'] },
      { id: 'inc-scam', name: 'Scam accounts' },
      { id: 'inc-phish', name: 'Phishing' },
      { id: 'inc-spam', name: 'Spam' },
      { id: 'inc-bot', name: 'Bot attacks' },
      { id: 'inc-abuse', name: 'Account abuse' },
      { id: 'inc-mal', name: 'Malicious content' },
      { id: 'inc-url', name: 'Suspicious URLs' },
      { id: 'inc-imp', name: 'Impersonation' },
      { id: 'inc-coord', name: 'Coordinated abuse' }
    ]
  };

  function seedGovGlobals() {
    if (store.seeded && store.trends.length) {
      window.INDIAN_VIRAL_TRENDS = store.trends;
      return;
    }
    const source = (window.INDIAN_VIRAL_TRENDS || []).filter(function (t) {
      return t && t.id && String(t.id).indexOf('trend-cat-') !== 0;
    });
    const enriched = enrichExistingTrends(source);
    const extras = extraCategoryTrends();
    store.trends = enriched.concat(extras);
    store.seeded = true;
    window.INDIAN_VIRAL_TRENDS = store.trends;
    if (!window.CREATOR_PLATFORM_DATA) window.CREATOR_PLATFORM_DATA = {};
    window.CREATOR_PLATFORM_DATA.facebook = {
      platformName: 'Facebook',
      posts: store.facebook.posts,
      recentPosts: store.facebook.posts.slice()
    };
    window.CREATOR_PLATFORM_DATA.telegram = {
      platformName: 'Telegram',
      posts: store.telegram.posts,
      recentPosts: store.telegram.posts.slice()
    };
  }

  function tick() {
    store.trends.forEach(function (t) {
      const n = t.viewsNumeric || 100000;
      const delta = Math.round(n * (0.0004 + Math.random() * 0.0012));
      t.viewsNumeric = n + delta;
      t.views = fmt(t.viewsNumeric);
      if (Math.random() > 0.7) {
        t.viralityScore = Math.max(40, Math.min(99, (t.viralityScore || 70) + (Math.random() > 0.5 ? 1 : -1)));
      }
    });
    if (store.facebook && store.facebook.posts) {
      store.facebook.posts.forEach(function (p) {
        const v = parseInt(String(p.views).replace(/[^0-9]/g, ''), 10) || 1000;
        p.views = fmt(v + Math.round(8 + Math.random() * 40));
      });
    }
    if (store.telegram && store.telegram.posts) {
      store.telegram.posts.forEach(function (p) {
        const v = parseInt(String(p.views).replace(/[^0-9]/g, ''), 10) || 1000;
        p.views = fmt(v + Math.round(3 + Math.random() * 20));
      });
    }
    if (Math.random() > 0.55) {
      store.alerts.unshift(makeAlert(store.alerts.length + 1));
      store.alerts = store.alerts.slice(0, 40);
    }
    const mapped = store.alerts.map(function (a) {
      return {
        id: a.id,
        title: a.title,
        detail: a.description,
        severity: a.severity,
        timeAgo: 'Live feed',
        suggestedAction: a.recommendedAction,
        actionKey: 'view_spam_log',
        alertType: a.alertType,
        platform: a.relatedPlatform,
        status: a.status
      };
    });
    window.CREATOR_SECURITY_ALERTS = mapped.slice(0, 12);
  }

  function counts() {
    const list = store.alerts || [];
    return {
      CRITICAL: list.filter(function (a) { return a.severity === 'CRITICAL'; }).length,
      HIGH: list.filter(function (a) { return a.severity === 'HIGH'; }).length,
      MEDIUM: list.filter(function (a) { return a.severity === 'MEDIUM'; }).length,
      LOW: list.filter(function (a) { return a.severity === 'LOW'; }).length
    };
  }

  window.DrishtiDemo = {
    SIM_LABEL: SIM_LABEL,
    store: store,
    states: STATES,
    categories: CATEGORIES,
    platforms: PLATFORMS,
    fmt: fmt,
    seedGovGlobals: seedGovGlobals,
    enrichExistingTrends: enrichExistingTrends,
    statePulse: statePulse,
    narrativesFromTrends: narrativesFromTrends,
    coordinationFor: coordinationFor,
    analyzeUrl: analyzeUrl,
    authenticityFor: authenticityFor,
    tick: tick,
    counts: counts,
    makeAlert: makeAlert,
    getTrend: function (id) {
      return store.trends.find(function (t) { return t.id === id; }) || store.trends[0];
    }
  };

  seedGovGlobals();
})();
