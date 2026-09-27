/* ==========================================================================
   SOCIALPULSE AI - CONSISTENT DEMO & MOCK DATASET
   ========================================================================== */

const SOCIALPULSE_DATA = {
  // Global creator profile
  creator: {
    name: 'Alex Vance',
    handle: '@alexvance_tech',
    subscribers: '348,000',
    totalViews: '14.8M',
    avatarLetter: 'AV'
  },

  // 5 Preserved Demo Videos
  videos: [
    {
      id: 'vid-3', // Default selected video featuring the 03:12 drop-off
      title: '5 Productivity Hacks',
      duration: '05:00',
      views: '1,420,500',
      viewsNumeric: 1420500,
      watchTimeHours: '84.6K',
      engagementRate: '8.9%',
      avgRetention: '64.2%',
      completionRate: '35.0%',
      rewatchRate: '1.9x',
      satisfactionScore: 82,
      scoreBreakdown: {
        retention: 86,
        engagement: 72,
        rewatch: 91,
        sentiment: 78
      },
      tag: 'Productivity',
      badge: 'Drop-Off Anomaly',
      retentionCurve: [
        { time: '0:00', seconds: 0, percent: 100 },
        { time: '0:30', seconds: 30, percent: 94 },
        { time: '1:00', seconds: 60, percent: 88 },
        { time: '1:30', seconds: 90, percent: 82 },
        { time: '2:00', seconds: 120, percent: 78 },
        { time: '2:30', seconds: 150, percent: 71 },
        { time: '3:00', seconds: 180, percent: 55 },
        { time: '3:12', seconds: 192, percent: 38, isAnomaly: true, dropPercent: 17 }, // 17% Drop Anomaly
        { time: '3:30', seconds: 210, percent: 52 },
        { time: '4:00', seconds: 240, percent: 49 },
        { time: '4:30', seconds: 270, percent: 42 },
        { time: '5:00', seconds: 300, percent: 35 }
      ],
      anomaly: {
        timestamp: '03:12',
        dropPercent: 17,
        label: '17% Audience Drop',
        hypothesis: 'Audience retention drops sharply around 03:12. Possible contributing factors include a topic transition, slower pacing, repetitive information or reduced visual interest.',
        recommendedAction: 'Insert a quick visual hook, b-roll footage, or motion graphic at 03:05 to smooth the topic transition.'
      },
      rewatchHotspots: [
        {
          timestamp: '02:10–02:35',
          startSec: 130,
          endSec: 155,
          multiplier: '2.8×',
          note: 'This segment received unusually high replay activity and may contain highly valuable, interesting or difficult-to-follow information.'
        },
        {
          timestamp: '04:20–04:55',
          startSec: 260,
          endSec: 295,
          multiplier: '2.3×',
          note: 'Key summary takeaway replayed frequently by mobile viewers.'
        }
      ],
      audienceSegments: {
        loyal: 34,
        returning: 27,
        casual: 25,
        oneTime: 14
      },
      comments: {
        positive: 64,
        neutral: 23,
        negative: 13,
        totalCount: '3,420',
        trendingTopics: ['AI', 'Coding', 'Productivity', 'Tutorials', 'Editing'],
        topAudienceRequest: 'Many viewers are requesting a Part 2.'
      },
      copyrightRadar: {
        audio: 82,
        visual: 74,
        transcript: 80,
        scene: 76,
        metadata: 79,
        similarityScore: 78,
        riskLevel: 'MEDIUM',
        status: 'Review Recommended',
        yourSegment: '02:15–02:47',
        matchSegment: '01:43–02:15'
      },
      thumbnailMetrics: {
        feedImpressions: 2450000,
        impressionsFormatted: '2.45M',
        scrolledPastCount: 1675800,
        scrolledPastPercent: 68.4,
        previewCount: 514500,
        previewPercent: 21.0,
        clickedCount: 259700,
        clickedPercent: 10.6,
        avgScrollVelocity: '1.2s per card',
        visualFatigueRating: 'Moderate (42/100)',
        primaryScrollPastFactor: 'Low font legibility & high clutter on mobile feed',
        factors: [
          { factor: 'Mobile Font Legibility', impact: '38% of scroll-pasts' },
          { factor: 'Lack of Contrast vs Dark Feed', impact: '34% of scroll-pasts' },
          { factor: 'Generic Hook Framing', impact: '28% of scroll-pasts' }
        ],
        aiOptimizationTip: 'Increase headline text size by 28% and outline with high-contrast cyan/amber glow to reduce scroll-past rate by ~12%.'
      }
    },
    {
      id: 'vid-1',
      title: 'Complete JavaScript Tutorial',
      duration: '42:15',
      views: '2,450,000',
      viewsNumeric: 2450000,
      watchTimeHours: '312.4K',
      engagementRate: '11.4%',
      avgRetention: '78.5%',
      completionRate: '58.0%',
      rewatchRate: '3.1x',
      satisfactionScore: 94,
      scoreBreakdown: { retention: 94, engagement: 91, rewatch: 98, sentiment: 92 },
      tag: 'Development',
      badge: 'High Retention',
      retentionCurve: [
        { time: '0:00', percent: 100 }, { time: '10:00', percent: 92 }, { time: '20:00', percent: 85 }, { time: '30:00', percent: 81 }, { time: '42:15', percent: 78 }
      ],
      anomaly: null,
      rewatchHotspots: [
        { timestamp: '14:20–16:45', multiplier: '3.4×', note: 'Asynchronous JavaScript & Event Loop explanation replayed repeatedly.' }
      ],
      audienceSegments: { loyal: 48, returning: 32, casual: 14, oneTime: 6 },
      comments: { positive: 88, neutral: 9, negative: 3, totalCount: '12,940', trendingTopics: ['JS', 'Closures', 'Promises', 'Frontend'], topAudienceRequest: 'Requesting TypeScript follow-up course.' },
      copyrightRadar: { audio: 12, visual: 15, transcript: 18, scene: 14, metadata: 22, similarityScore: 16, riskLevel: 'LOW', status: 'Clear', yourSegment: 'N/A', matchSegment: 'None' },
      thumbnailMetrics: {
        feedImpressions: 4800000,
        impressionsFormatted: '4.80M',
        scrolledPastCount: 2688000,
        scrolledPastPercent: 56.0,
        previewCount: 1248000,
        previewPercent: 26.0,
        clickedCount: 864000,
        clickedPercent: 18.0,
        avgScrollVelocity: '2.1s per card',
        visualFatigueRating: 'Low (18/100)',
        primaryScrollPastFactor: 'Long format perception causes casual viewers to scroll past',
        factors: [
          { factor: 'Perceived Time Commitment', impact: '52% of scroll-pasts' },
          { factor: 'Advanced Code Syntax Barrier', impact: '29% of scroll-pasts' },
          { factor: 'Topic Saturation', impact: '19% of scroll-pasts' }
        ],
        aiOptimizationTip: 'Add "Zero to Hero (Beginner Friendly)" badge in the top-right corner to reassure casual viewers.'
      }
    },
    {
      id: 'vid-2',
      title: 'AI Tools for Students',
      duration: '12:40',
      views: '3,105,800',
      viewsNumeric: 3105800,
      watchTimeHours: '194.2K',
      engagementRate: '9.8%',
      avgRetention: '58.2%',
      completionRate: '42.0%',
      rewatchRate: '2.1x',
      satisfactionScore: 79,
      scoreBreakdown: { retention: 74, engagement: 82, rewatch: 78, sentiment: 81 },
      tag: 'AI Tools',
      badge: 'Viral Reach',
      retentionCurve: [
        { time: '0:00', percent: 100 }, { time: '3:00', percent: 84 }, { time: '6:00', percent: 68 }, { time: '9:00', percent: 59 }, { time: '12:40', percent: 42 }
      ],
      anomaly: null,
      rewatchHotspots: [
        { timestamp: '04:10–05:30', multiplier: '2.6×', note: 'Prompt engineering cheat-sheet walkthrough.' }
      ],
      audienceSegments: { loyal: 22, returning: 28, casual: 38, oneTime: 12 },
      comments: { positive: 76, neutral: 18, negative: 6, totalCount: '8,410', trendingTopics: ['Research', 'Study', 'Writing', 'Notion'], topAudienceRequest: 'Requesting free alternatives guide.' },
      copyrightRadar: { audio: 34, visual: 28, transcript: 40, scene: 25, metadata: 35, similarityScore: 32, riskLevel: 'LOW', status: 'Clear', yourSegment: 'N/A', matchSegment: 'None' },
      thumbnailMetrics: {
        feedImpressions: 6200000,
        impressionsFormatted: '6.20M',
        scrolledPastCount: 3844000,
        scrolledPastPercent: 62.0,
        previewCount: 1426000,
        previewPercent: 23.0,
        clickedCount: 930000,
        clickedPercent: 15.0,
        avgScrollVelocity: '1.4s per card',
        visualFatigueRating: 'Moderate (35/100)',
        primaryScrollPastFactor: 'Generic robot/AI graphic feels like standard stock imagery',
        factors: [
          { factor: 'Stock Image Fatigue', impact: '46% of scroll-pasts' },
          { factor: 'Competitor Thumbnail Similarity', impact: '31% of scroll-pasts' },
          { factor: 'Missing Tool Logo Recognition', impact: '23% of scroll-pasts' }
        ],
        aiOptimizationTip: 'Replace generic AI brain icon with recognizable software badges (Notion, Claude, Perplexity) to boost click-through by 19%.'
      }
    },
    {
      id: 'vid-4',
      title: 'Build a Website in 10 Minutes',
      duration: '10:00',
      views: '1,890,200',
      viewsNumeric: 1890200,
      watchTimeHours: '142.0K',
      engagementRate: '10.5%',
      avgRetention: '72.0%',
      completionRate: '61.0%',
      rewatchRate: '3.4x',
      satisfactionScore: 89,
      scoreBreakdown: { retention: 88, engagement: 84, rewatch: 96, sentiment: 87 },
      tag: 'Design & Code',
      badge: 'High Rewatch',
      retentionCurve: [
        { time: '0:00', percent: 100 }, { time: '2:30', percent: 89 }, { time: '5:00', percent: 82 }, { time: '7:30', percent: 76 }, { time: '10:00', percent: 61 }
      ],
      anomaly: null,
      rewatchHotspots: [
        { timestamp: '02:10–02:35', multiplier: '2.8×', note: 'CSS grid layout template structure code.' },
        { timestamp: '04:20–04:55', multiplier: '2.3×', note: 'Interactive button animation styling.' }
      ],
      audienceSegments: { loyal: 38, returning: 30, casual: 22, oneTime: 10 },
      comments: { positive: 82, neutral: 14, negative: 4, totalCount: '5,120', trendingTopics: ['CSS', 'Hosting', 'HTML5', 'Portfolio'], topAudienceRequest: 'Requesting full source code on GitHub.' },
      copyrightRadar: { audio: 42, visual: 48, transcript: 38, scene: 44, metadata: 40, similarityScore: 42, riskLevel: 'LOW', status: 'Clear', yourSegment: 'N/A', matchSegment: 'None' },
      thumbnailMetrics: {
        feedImpressions: 3400000,
        impressionsFormatted: '3.40M',
        scrolledPastCount: 1972000,
        scrolledPastPercent: 58.0,
        previewCount: 884000,
        previewPercent: 26.0,
        clickedCount: 544000,
        clickedPercent: 16.0,
        avgScrollVelocity: '1.6s per card',
        visualFatigueRating: 'Low (22/100)',
        primaryScrollPastFactor: 'Speed claim perceived as clickbait by professional devs',
        factors: [
          { factor: 'Skepticism of Speed Claim', impact: '42% of scroll-pasts' },
          { factor: 'Dark Code Snippet Unreadable on Phone', impact: '36% of scroll-pasts' },
          { factor: 'Non-designer Hesitation', impact: '22% of scroll-pasts' }
        ],
        aiOptimizationTip: 'Show side-by-side Before/After preview screenshot with bright modern browser frame.'
      }
    },
    {
      id: 'vid-5',
      title: 'Machine Learning Explained',
      duration: '18:50',
      views: '980,400',
      viewsNumeric: 980400,
      watchTimeHours: '98.5K',
      engagementRate: '12.8%',
      avgRetention: '69.4%',
      completionRate: '49.0%',
      rewatchRate: '2.7x',
      satisfactionScore: 85,
      scoreBreakdown: { retention: 82, engagement: 89, rewatch: 85, sentiment: 84 },
      tag: 'Machine Learning',
      badge: 'Strong Sentiment',
      retentionCurve: [
        { time: '0:00', percent: 100 }, { time: '4:30', percent: 86 }, { time: '9:00', percent: 77 }, { time: '13:30', percent: 71 }, { time: '18:50', percent: 49 }
      ],
      anomaly: null,
      rewatchHotspots: [
        { timestamp: '08:15–09:40', multiplier: '2.9×', note: 'Neural network weight calculation visual analogy.' }
      ],
      audienceSegments: { loyal: 40, returning: 28, casual: 20, oneTime: 12 },
      comments: { positive: 64, neutral: 23, negative: 13, totalCount: '4,890', trendingTopics: ['Math', 'Neural Nets', 'Python', 'AI'], topAudienceRequest: 'Many viewers are requesting a Part 2.' },
      copyrightRadar: { audio: 22, visual: 31, transcript: 28, scene: 24, metadata: 30, similarityScore: 27, riskLevel: 'LOW', status: 'Clear', yourSegment: 'N/A', matchSegment: 'None' },
      thumbnailMetrics: {
        feedImpressions: 2100000,
        impressionsFormatted: '2.10M',
        scrolledPastCount: 1512000,
        scrolledPastPercent: 72.0,
        previewCount: 378000,
        previewPercent: 18.0,
        clickedCount: 210000,
        clickedPercent: 10.0,
        avgScrollVelocity: '1.1s per card',
        visualFatigueRating: 'High (58/100)',
        primaryScrollPastFactor: 'Intimidating mathematical formulas cause instant feed swipe',
        factors: [
          { factor: 'Math Formula Intimidation', impact: '54% of scroll-pasts' },
          { factor: 'Low Emotional Expression', impact: '26% of scroll-pasts' },
          { factor: 'Dull Monochromatic Color Scheme', impact: '20% of scroll-pasts' }
        ],
        aiOptimizationTip: 'Remove matrix equation graphic and replace with intuitive visual neural flow animation graphic.'
      }
    }
  ],

  // 6 Actionable AI Intelligence Cards
  insights: [
    {
      icon: '🔥',
      title: 'Top Performing Video/Short',
      type: 'strength',
      whatHappened: 'Peak retention occurred between 01:10 and 02:05 with 94% viewer hold.',
      whyItMatters: 'Clear practical demos with on-screen code snippets maintain the highest audience focus.',
      recommendedAction: 'Shorts with higher average view duration are performing better. Adopt this rapid-fire demonstration structure in your next upload intro.'
    },
    {
      icon: '⚠',
      title: 'Major Drop-Off Anomaly',
      type: 'drop',
      whatHappened: 'A sudden 17% drop occurred at 03:12 during an unscripted transition.',
      whyItMatters: 'Viewer momentum halts when visuals remain static for longer than 8 seconds.',
      recommendedAction: 'Insert a quick visual hook, b-roll footage, or motion graphic at 03:05.'
    },
    {
      icon: '🔁',
      title: 'Rewatch Hotspot',
      type: 'rewatch',
      whatHappened: '02:10–02:35 reached a 2.8× replay multiplier across unique sessions.',
      whyItMatters: 'Viewers treat this section as high-density instructional reference material.',
      recommendedAction: 'Pin this timestamp in the comments and provide a downloadable companion graphic.'
    },
    {
      icon: '💬',
      title: 'Audience Request Signal',
      type: 'request',
      whatHappened: '38% of top-level comments explicitly requested an advanced Part 2 deep-dive.',
      whyItMatters: 'Demonstrates strong organic demand with zero customer acquisition friction.',
      recommendedAction: 'Record a sequel focusing on production workflows and link it as an end-card.'
    },
    {
      icon: '📈',
      title: 'Growth Opportunity',
      type: 'growth',
      whatHappened: 'Returning viewer satisfaction increased +14% compared to the 30-day baseline.',
      whyItMatters: 'High cohort retention signals that audience trust and authority are solidifying.',
      recommendedAction: 'Introduce a community poll for the next topic to reinforce viewer loyalty.'
    },
    {
      icon: '©',
      title: 'Copyright Similarity Risk',
      type: 'copyright',
      whatHappened: 'Radar detected 78% similarity in background audio score between 02:15–02:47.',
      whyItMatters: 'Automated claim risk is Medium prior to official algorithmic indexing.',
      recommendedAction: 'Verify audio track clearance or swap the segment track in your editing project.'
    }
  ],

  // Contextual Copilot Q&A
  copilotResponses: {
    "Why did my video perform poorly?": "Your video received strong initial engagement, but retention decreased significantly around 03:12. Compared with your better-performing videos, this section has slower pacing and a longer transition.",
    "Where did viewers lose interest?": "A major drop-off occurred at 03:12 where 17% of active viewers exited within 12 seconds. Viewers cited a sudden shift to monologue without b-roll or visual cues.",
    "What should I improve?": "1. Shorten transitions around the 3-minute mark.\n2. Leverage the high-retention hook style from your JavaScript tutorial.\n3. Add visual summary cards before introducing complex definitions.",
    "Which content performs best?": "Your coding and deep-dive technical tutorials have 42% higher satisfaction and 2.4× higher rewatch rates than general listicle videos.",
    "What should I make next?": "Audience comment intelligence indicates high demand for 'Part 2: Advanced System Architecture' (64% positive sentiment across 3,420 comments).",
    "Why are people rewatching this section?": "The segment at 02:10–02:35 contains dense code architecture diagrams. Viewers replayed it 2.8× to pause and copy the pattern."
  },

  // Instagram Analytics Demo Data
  instagram: {
    overview: {
      totalReach: '892K',
      views: '1.18M',
      engagementRate: '11.4%',
      followerGrowth: '+8.4%',
      shares: '18.7K',
      saves: '14.3K'
    },

    tabMetrics: {
      overview: {
        totalReach: '892K',
        views: '1.18M',
        engagementRate: '11.4%',
        followerGrowth: '+8.4%',
        shares: '18.7K',
        saves: '14.3K',
        reachTrend: '↑ 14.2%',
        viewsTrend: '↑ 22.6%',
        engTrend: '↑ 3.1%',
        growthTrend: '↑ 2.4%',
        sharesTrend: '↑ 31.8%',
        savesTrend: '↑ 28.4%'
      },
      reels: {
        totalReach: '742K',
        views: '984K',
        engagementRate: '12.6%',
        followerGrowth: '+6.2%',
        shares: '15.2K',
        saves: '11.8K',
        reachTrend: '↑ 18.5%',
        viewsTrend: '↑ 25.4%',
        engTrend: '↑ 4.2%',
        growthTrend: '↑ 3.1%',
        sharesTrend: '↑ 35.2%',
        savesTrend: '↑ 31.0%'
      },
      posts: {
        totalReach: '118K',
        views: '142K',
        engagementRate: '8.2%',
        followerGrowth: '+1.5%',
        shares: '2.7K',
        saves: '2.5K',
        reachTrend: '↑ 5.2%',
        viewsTrend: '↑ 8.1%',
        engTrend: '↑ 1.4%',
        growthTrend: '↑ 0.9%',
        sharesTrend: '↑ 12.0%',
        savesTrend: '↑ 14.3%'
      },
      stories: {
        totalReach: '32K',
        views: '54K',
        engagementRate: '18.7%',
        followerGrowth: '+0.7%',
        shares: '800',
        saves: 'N/A',
        reachTrend: '↑ 9.4%',
        viewsTrend: '↑ 14.8%',
        engTrend: '↑ 5.6%',
        growthTrend: '↑ 0.4%',
        sharesTrend: '↑ 8.3%',
        savesTrend: '—'
      }
    },

    audienceOverview: {
      newAudience: 42,
      returningAudience: 38,
      highlyEngaged: 20,
      followerGrowth: '+8.4%',
      mostActiveTime: '6–9 PM',
      mostActiveDay: 'Tuesday',
      followerConversion: '4.2%',
      profileVisits: '124K',
      newFollowers: '12.4K',
      audienceEngagement: '11.4%',
      growthChart: [4.2, 5.1, 5.8, 6.4, 7.2, 7.8, 8.4]
    },

    contentOpportunities: {
      bestTopic: 'AI Tools',
      bestFormat: 'Reels',
      bestDuration: '18–27 seconds',
      bestHook: 'Problem-first hook',
      strongestSignal: 'Shares + Saves',
      recommendation: 'Create a 20–25 second Reel around AI productivity tools using a direct problem-first hook.'
    },

    defaultReelId: 'ig-1',

    reels: [
      {
        id: 'ig-1',
        title: '5 AI Tools Every Student Should Know',
        type: 'reel',
        duration: '0:24',
        views: '428K',
        reach: '351K',
        likes: '31.4K',
        comments: '2.8K',
        shares: '8.7K',
        saves: '12.3K',
        avgWatchTime: '18.4s',
        completionRate: '67%',
        replayRate: '2.8×',
        followerConversion: '+4.2%',
        performanceScore: 91,
        tag: 'AI Tools',
        badge: 'High Shares',
        gradient: 'linear-gradient(135deg, #f43f5e, #8b5cf6)',
        satisfactionScore: 87,
        scoreBreakdown: { reach: 91, engagement: 84, shares: 93, saves: 89, sentiment: 78 },
        engagementRate: '12.6%',
        shareabilityScore: 93,
        saveabilityScore: 89,
        engagementInterpretation: 'This Reel is generating unusually strong shares and saves relative to your average content, suggesting strong audience value and shareability.',
        hookCurve: [
          { time: '0s', seconds: 0, percent: 100 },
          { time: '1s', seconds: 1, percent: 97 },
          { time: '2s', seconds: 2, percent: 94 },
          { time: '3s', seconds: 3, percent: 91 },
          { time: '5s', seconds: 5, percent: 88 },
          { time: '8s', seconds: 8, percent: 79 },
          { time: '12s', seconds: 12, percent: 61, isAnomaly: true, dropPercent: 18 }
        ],
        anomaly: {
          timestamp: '00:12',
          dropPercent: 18,
          label: '−18% viewers',
          hypothesis: 'Audience retention drops sharply around 00:12. Possible contributing factors include a slower transition, reduced visual movement or a shift away from the initial hook.',
          recommendedAction: 'Add a quick visual cut or motion graphic at 00:10 to maintain hook momentum through the mid-section.'
        },
        rewatchHotspots: [
          { timestamp: '00:04–00:07', startSec: 4, endSec: 7, multiplier: '2.4×', note: 'This segment received unusually high replay activity and may contain highly valuable, interesting or difficult-to-process information.' },
          { timestamp: '00:17–00:21', startSec: 17, endSec: 21, multiplier: '3.1×', note: 'Tool demonstration segment replayed frequently for reference.' },
          { timestamp: '00:28–00:31', startSec: 28, endSec: 31, multiplier: '2.2×', note: 'Summary checklist segment with high save intent.' }
        ],
        audienceSegments: { newAudience: 42, returningAudience: 38, highlyEngaged: 20 },
        comments: {
          positive: 71,
          neutral: 19,
          negative: 10,
          totalCount: '2,840',
          trendingTopics: ['AI Tools', 'Productivity', 'Coding', 'Student Life', 'Career'],
          audienceWants: [
            'Viewers are repeatedly requesting a Part 2.',
            'Multiple viewers are asking for the tools used in this Reel.',
            'Audience is requesting a full tutorial.'
          ]
        },
        copyrightRadar: {
          audio: 18,
          visual: 24,
          transcript: 14,
          scene: 20,
          metadata: 15,
          similarityScore: 18,
          riskLevel: 'LOW',
          status: 'Clear',
          yourSegment: 'N/A',
          matchSegment: 'None',
          confirmedLicense: 'Meta Sound Collection Commercial License',
          confirmedClaims: '0 Rights Manager Flagged Audio Segments'
        }
      },
      {
        id: 'ig-2',
        title: 'Build a Website in 30 Seconds',
        type: 'reel',
        duration: '0:32',
        views: '612K',
        reach: '489K',
        likes: '42.1K',
        comments: '3.2K',
        shares: '5.4K',
        saves: '8.9K',
        avgWatchTime: '14.2s',
        completionRate: '52%',
        replayRate: '1.9×',
        followerConversion: '+3.1%',
        performanceScore: 78,
        tag: 'Web Dev',
        badge: 'High Views',
        gradient: 'linear-gradient(135deg, #10b981, #00f2fe)',
        satisfactionScore: 74,
        scoreBreakdown: { reach: 88, engagement: 72, shares: 68, saves: 71, sentiment: 75 },
        engagementRate: '9.8%',
        shareabilityScore: 72,
        saveabilityScore: 76,
        engagementInterpretation: 'Strong view velocity but mid-reel retention is below your channel average. Consider tightening the demo pacing.',
        hookCurve: [
          { time: '0s', seconds: 0, percent: 100 },
          { time: '2s', seconds: 2, percent: 91 },
          { time: '5s', seconds: 5, percent: 82 },
          { time: '10s', seconds: 10, percent: 71 },
          { time: '15s', seconds: 15, percent: 58 },
          { time: '20s', seconds: 20, percent: 49 },
          { time: '32s', seconds: 32, percent: 38 }
        ],
        anomaly: null,
        rewatchHotspots: [
          { timestamp: '00:08–00:12', startSec: 8, endSec: 12, multiplier: '2.1×', note: 'Code snippet segment with moderate replay activity.' }
        ],
        audienceSegments: { newAudience: 55, returningAudience: 28, highlyEngaged: 17 },
        comments: {
          positive: 68,
          neutral: 24,
          negative: 8,
          totalCount: '3,210',
          trendingTopics: ['HTML', 'CSS', 'Hosting', 'Portfolio', 'Design'],
          audienceWants: ['Viewers want the full source code link.', 'Multiple requests for a longer tutorial version.']
        },
        copyrightRadar: {
          audio: 62,
          visual: 35,
          transcript: 22,
          scene: 30,
          metadata: 28,
          similarityScore: 41,
          riskLevel: 'MEDIUM',
          status: 'Potential Risk',
          yourSegment: '00:08–00:24',
          matchSegment: '00:00–00:16',
          confirmedLicense: 'Meta Commercial Music License (Territory-Restricted)',
          confirmedClaims: 'Audio muted in 3 regional territories'
        }
      },
      {
        id: 'ig-3',
        title: '3 Productivity Hacks',
        type: 'reel',
        duration: '0:19',
        views: '284K',
        reach: '241K',
        likes: '18.6K',
        comments: '1.4K',
        shares: '4.2K',
        saves: '15.8K',
        avgWatchTime: '16.8s',
        completionRate: '74%',
        replayRate: '2.5×',
        followerConversion: '+5.4%',
        performanceScore: 86,
        tag: 'Productivity',
        badge: 'High Saves',
        gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        satisfactionScore: 91,
        scoreBreakdown: { reach: 79, engagement: 88, shares: 82, saves: 96, sentiment: 85 },
        engagementRate: '14.2%',
        shareabilityScore: 84,
        saveabilityScore: 96,
        engagementInterpretation: 'Exceptional save rate indicates this content is being bookmarked as reference material — ideal for carousel follow-ups.',
        hookCurve: [
          { time: '0s', seconds: 0, percent: 100 },
          { time: '2s', seconds: 2, percent: 96 },
          { time: '5s', seconds: 5, percent: 89 },
          { time: '10s', seconds: 10, percent: 82 },
          { time: '15s', seconds: 15, percent: 76 },
          { time: '19s', seconds: 19, percent: 68 }
        ],
        anomaly: null,
        rewatchHotspots: [
          { timestamp: '00:06–00:09', startSec: 6, endSec: 9, multiplier: '2.7×', note: 'Hack #2 demonstration with high save-to-replay correlation.' }
        ],
        audienceSegments: { newAudience: 38, returningAudience: 42, highlyEngaged: 20 },
        comments: {
          positive: 79,
          neutral: 16,
          negative: 5,
          totalCount: '1,420',
          trendingTopics: ['Notion', 'Focus', 'Time Management', 'Apps', 'Workflow'],
          audienceWants: ['Audience wants a Notion template download.', 'Requests for a Part 2 with advanced hacks.']
        },
        copyrightRadar: {
          audio: 10,
          visual: 16,
          transcript: 12,
          scene: 15,
          metadata: 14,
          similarityScore: 13,
          riskLevel: 'LOW',
          status: 'Clear',
          yourSegment: 'N/A',
          matchSegment: 'None',
          confirmedLicense: 'Original Audio Attribution',
          confirmedClaims: '0 Active Rights Manager Disputes'
        }
      },
      {
        id: 'ig-4',
        title: 'How ChatGPT Can Save You Hours',
        type: 'reel',
        duration: '0:27',
        views: '356K',
        reach: '298K',
        likes: '24.8K',
        comments: '2.1K',
        shares: '6.1K',
        saves: '9.4K',
        avgWatchTime: '12.1s',
        completionRate: '48%',
        replayRate: '1.6×',
        followerConversion: '+2.6%',
        performanceScore: 72,
        tag: 'AI',
        badge: 'Hook Drop',
        gradient: 'linear-gradient(135deg, #f59e0b, #6366f1)',
        satisfactionScore: 68,
        scoreBreakdown: { reach: 82, engagement: 74, shares: 71, saves: 65, sentiment: 62 },
        engagementRate: '10.1%',
        shareabilityScore: 74,
        saveabilityScore: 68,
        engagementInterpretation: 'Strong initial engagement but a significant mid-reel drop suggests the hook promise diverges from mid-section content.',
        hookCurve: [
          { time: '0s', seconds: 0, percent: 100 },
          { time: '1s', seconds: 1, percent: 98 },
          { time: '3s', seconds: 3, percent: 94 },
          { time: '5s', seconds: 5, percent: 88 },
          { time: '8s', seconds: 8, percent: 72 },
          { time: '12s', seconds: 12, percent: 54, isAnomaly: true, dropPercent: 22 },
          { time: '18s', seconds: 18, percent: 42 },
          { time: '27s', seconds: 27, percent: 35 }
        ],
        anomaly: {
          timestamp: '00:12',
          dropPercent: 22,
          label: '−22% viewers',
          hypothesis: 'Audience retention drops sharply around 00:12. The transition from hook to tutorial steps lacks visual continuity and pacing slows significantly.',
          recommendedAction: 'Maintain fast cuts through 00:08–00:15 and overlay step numbers to sustain viewer momentum.'
        },
        rewatchHotspots: [
          { timestamp: '00:02–00:05', startSec: 2, endSec: 5, multiplier: '2.0×', note: 'Opening hook with moderate replay before drop-off zone.' }
        ],
        audienceSegments: { newAudience: 48, returningAudience: 32, highlyEngaged: 20 },
        comments: {
          positive: 62,
          neutral: 26,
          negative: 12,
          totalCount: '2,100',
          trendingTopics: ['ChatGPT', 'Prompts', 'Automation', 'Writing', 'Work'],
          audienceWants: ['Viewers want the exact prompts shown.', 'Requests for a screen-recording walkthrough.']
        },
        copyrightRadar: {
          audio: 28,
          visual: 22,
          transcript: 34,
          scene: 25,
          metadata: 30,
          similarityScore: 28,
          riskLevel: 'LOW',
          status: 'Clear',
          yourSegment: 'N/A',
          matchSegment: 'None',
          confirmedLicense: 'Meta Sound Collection Commercial License',
          confirmedClaims: '0 Rights Manager Disputes'
        }
      },
      {
        id: 'ig-5',
        title: 'Machine Learning Explained Simply',
        type: 'reel',
        duration: '0:35',
        views: '198K',
        reach: '172K',
        likes: '14.2K',
        comments: '4.6K',
        shares: '2.8K',
        saves: '6.1K',
        avgWatchTime: '19.6s',
        completionRate: '58%',
        replayRate: '2.3×',
        followerConversion: '+3.8%',
        performanceScore: 83,
        tag: 'Machine Learning',
        badge: 'Strong Sentiment',
        gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        satisfactionScore: 85,
        scoreBreakdown: { reach: 71, engagement: 92, shares: 68, saves: 74, sentiment: 94 },
        engagementRate: '13.8%',
        shareabilityScore: 70,
        saveabilityScore: 78,
        engagementInterpretation: 'High comment volume and positive sentiment indicate strong community engagement — ideal for Q&A follow-up content.',
        hookCurve: [
          { time: '0s', seconds: 0, percent: 100 },
          { time: '3s', seconds: 3, percent: 92 },
          { time: '8s', seconds: 8, percent: 84 },
          { time: '15s', seconds: 15, percent: 74 },
          { time: '22s', seconds: 22, percent: 65 },
          { time: '35s', seconds: 35, percent: 52 }
        ],
        anomaly: null,
        rewatchHotspots: [
          { timestamp: '00:12–00:18', startSec: 12, endSec: 18, multiplier: '2.9×', note: 'Neural network visual analogy segment with highest replay density.' }
        ],
        audienceSegments: { newAudience: 35, returningAudience: 45, highlyEngaged: 20 },
        comments: {
          positive: 82,
          neutral: 12,
          negative: 6,
          totalCount: '4,620',
          trendingTopics: ['ML', 'Python', 'Neural Nets', 'Beginner', 'Career'],
          audienceWants: ['Viewers are requesting a full beginner course.', 'Multiple questions about Python libraries to start with.']
        },
        copyrightRadar: {
          audio: 15,
          visual: 18,
          transcript: 20,
          scene: 16,
          metadata: 22,
          similarityScore: 18,
          riskLevel: 'LOW',
          status: 'Clear',
          yourSegment: 'N/A',
          matchSegment: 'None',
          confirmedLicense: 'Original Creator Audio Attribution',
          confirmedClaims: '0 Rights Manager Disputes'
        }
      }
    ],

    posts: [
      { id: 'ig-post-1', title: 'My 2026 Creator Tech Stack', type: 'post', views: '84K', reach: '72K', engagement: '9.2%', shares: '1.2K', saves: '3.8K', performanceScore: 76, gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)' },
      { id: 'ig-post-2', title: '5 Books Every Developer Should Read', type: 'post', views: '62K', reach: '54K', engagement: '8.4%', shares: '890', saves: '4.1K', performanceScore: 81, gradient: 'linear-gradient(135deg, #10b981, #06b6d4)' },
      { id: 'ig-post-3', title: 'Behind the Scenes: Studio Setup', type: 'post', views: '48K', reach: '41K', engagement: '7.1%', shares: '620', saves: '2.4K', performanceScore: 68, gradient: 'linear-gradient(135deg, #f59e0b, #f43f5e)' }
    ],

    stories: [
      { id: 'ig-story-1', title: 'Daily Poll: Next Topic?', type: 'story', views: '12.4K', reach: '11.8K', engagement: '18.6%', shares: '240', saves: 'N/A', performanceScore: 72, gradient: 'linear-gradient(135deg, #00f2fe, #6366f1)' },
      { id: 'ig-story-2', title: 'Q&A: AI Tools AMA', type: 'story', views: '18.2K', reach: '16.4K', engagement: '22.1%', shares: '410', saves: 'N/A', performanceScore: 84, gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
      { id: 'ig-story-3', title: 'New Reel Teaser', type: 'story', views: '22.8K', reach: '20.1K', engagement: '15.4%', shares: '680', saves: 'N/A', performanceScore: 79, gradient: 'linear-gradient(135deg, #f43f5e, #f59e0b)' }
    ],

    insights: [
      {
        icon: '🔥',
        title: 'Top Performing Reel/Post',
        whatHappened: '"5 AI Tools Every Student Should Know" achieved 91/100 performance with 8.7K shares and 12.3K saves.',
        whyItMatters: 'Problem-first hooks combined with rapid tool demos drive the highest share-to-view ratio in your catalog.',
        recommendedAction: 'Reels with strong 3-second hook rates generate 2.4x higher profile reach. Open next 5 reels with an on-screen text question in the first 1.5 seconds.'
      },
      {
        icon: '⚠',
        title: 'Major Hook Drop',
        whatHappened: 'A sharp 18% viewer drop occurred at 00:12 in your top Reel during a pacing slowdown.',
        whyItMatters: 'Instagram Reels lose momentum when visual movement decreases in the first 15 seconds.',
        recommendedAction: 'Add a quick visual cut or text overlay at 00:10 to maintain hook energy.'
      },
      {
        icon: '🔁',
        title: 'Rewatch Hotspot',
        whatHappened: 'Segment 00:17–00:21 reached a 3.1× replay multiplier — your highest this month.',
        whyItMatters: 'Viewers are treating this tool demo as reference material worth replaying.',
        recommendedAction: 'Pin this timestamp and create a carousel post expanding on the tools shown.'
      },
      {
        icon: '💬',
        title: 'Audience Request',
        whatHappened: '42% of comments on your top Reel request a Part 2 or full tutorial.',
        whyItMatters: 'Strong organic demand signal with zero acquisition cost — high conversion potential.',
        recommendedAction: 'Publish a follow-up Reel within 7 days while engagement momentum is active.'
      },
      {
        icon: '📈',
        title: 'Growth Opportunity',
        whatHappened: 'Follower growth increased +8.4% this month, driven by Reels reaching non-follower Explore feeds.',
        whyItMatters: 'New audience acquisition is outpacing your 30-day baseline by 2.1×.',
        recommendedAction: 'Double down on Reels with problem-first hooks to sustain Explore distribution.'
      },
      {
        icon: '💾',
        title: 'Save Opportunity',
        whatHappened: '"3 Productivity Hacks" achieved a 96/100 saveability score — highest in your library.',
        whyItMatters: 'Save-heavy content signals long-term reference value and boosts algorithmic distribution.',
        recommendedAction: 'Convert this Reel into a saved carousel post with expanded hack details.'
      }
    ],

    copilotResponses: {
      "Why did my Instagram Reel perform poorly?": "Your Reel generated strong initial engagement, but retention decreased significantly around 00:12. Compared with your better-performing Reels, this section has slower pacing and a weaker visual transition.",
      "What should I post next?": "Based on your recent Instagram performance, AI productivity content is currently your strongest opportunity. A 20–25 second Reel with a direct problem-first hook could increase share and save behavior.",
      "Where did viewers drop off?": "A major hook drop occurred at 00:12 where 18% of active viewers exited. The transition from rapid tool demos to a slower explanation segment caused momentum loss.",
      "Which Reel performs best?": "Your '5 AI Tools Every Student Should Know' Reel leads with 91/100 performance, 8.7K shares, and 12.3K saves — significantly above your channel average.",
      "Why are people saving my content?": "Save-heavy Reels like '3 Productivity Hacks' contain actionable reference material. Viewers bookmark content they plan to revisit — optimize for checklist-style value.",
      "How can I improve my hook?": "Your best Reels maintain 90%+ retention through 3 seconds. Use a direct problem statement in the first frame, then cut to visual proof within 2 seconds."
    },

    copilotPrompts: [
      'Why did my Instagram Reel perform poorly?',
      'What should I post next?',
      'Where did viewers drop off?',
      'Which Reel performs best?',
      'Why are people saving my content?',
      'How can I improve my hook?'
    ]
  },

  // Pinterest Analytics Demo Data
  pinterest: {
    overview: {
      totalImpressions: '2.4M',
      pinClicks: '142K',
      saves: '68.5K',
      outboundClicks: '38.2K',
      engagementRate: '8.7%',
      saveRate: '2.8%',
      impressionsTrend: '↑ 18.4%',
      pinClicksTrend: '↑ 14.2%',
      savesTrend: '↑ 24.6%',
      outboundTrend: '↑ 12.8%'
    },
    defaultPinId: 'pin-1',
    boards: ['Tech & Architecture', 'Productivity & Gear', 'Coding & Design'],
    tabMetrics: {
      overview: {
        totalImpressions: '2.4M',
        pinClicks: '142K',
        saves: '68.5K',
        outboundClicks: '38.2K',
        engagementRate: '8.7%',
        saveRate: '2.8%',
        impressionsTrend: '↑ 18.4%',
        pinClicksTrend: '↑ 14.2%',
        savesTrend: '↑ 24.6%',
        outboundTrend: '↑ 12.8%'
      },
      pins: {
        totalImpressions: '1.9M',
        pinClicks: '118K',
        saves: '54.2K',
        outboundClicks: '31.4K',
        engagementRate: '9.2%',
        saveRate: '2.9%',
        impressionsTrend: '↑ 21.2%',
        pinClicksTrend: '↑ 16.5%',
        savesTrend: '↑ 27.8%',
        outboundTrend: '↑ 15.0%'
      }
    },
    pins: [
      {
        id: 'pin-1',
        title: 'Modern Architecture Cheat Sheet 2026',
        board: 'Tech & Architecture',
        type: 'standard_pin',
        impressions: '640K',
        pinClicks: '42.5K',
        saves: '21.8K',
        outboundClicks: '11.2K',
        saveRate: '3.4%',
        engagementRate: '9.8%',
        pinScore: 92,
        badge: 'High Saves',
        tag: 'Architecture',
        gradient: 'linear-gradient(135deg, #e60023, #ff4757)',
        copyrightRadar: {
          audio: 8,
          visual: 24,
          transcript: 16,
          metadata: 22,
          scene: 18,
          similarityScore: 18,
          riskLevel: 'LOW',
          status: 'Clear',
          yourSegment: 'N/A',
          confirmedLicense: 'Creator Original Visual Asset',
          confirmedClaims: '0 Platform Copyright Flags',
          apiNotice: 'Pinterest is an image-first platform. Acoustic and video timecode telemetry is estimated from rich pin context.'
        }
      },
      {
        id: 'pin-2',
        title: 'Minimalist Workspace Setup Guide',
        board: 'Productivity & Gear',
        type: 'idea_pin',
        impressions: '420K',
        pinClicks: '28.4K',
        saves: '14.2K',
        outboundClicks: '7.8K',
        saveRate: '3.3%',
        engagementRate: '8.4%',
        pinScore: 86,
        badge: 'Trending Idea Pin',
        tag: 'Productivity',
        gradient: 'linear-gradient(135deg, #bd081c, #ff6b81)',
        copyrightRadar: {
          audio: 6,
          visual: 32,
          transcript: 14,
          metadata: 26,
          scene: 22,
          similarityScore: 20,
          riskLevel: 'LOW',
          status: 'Clear',
          yourSegment: 'N/A',
          confirmedLicense: 'Verified Domain Attribution',
          confirmedClaims: '0 Platform Copyright Flags',
          apiNotice: 'Automated reverse-image copyright scanning is restricted to Pinterest Brand Safety partners.'
        }
      },
      {
        id: 'pin-3',
        title: '10 Clean Code Infographics for Web Devs',
        board: 'Coding & Design',
        type: 'standard_pin',
        impressions: '580K',
        pinClicks: '36.1K',
        saves: '19.4K',
        outboundClicks: '10.1K',
        saveRate: '3.3%',
        engagementRate: '9.1%',
        pinScore: 89,
        badge: 'High Outbound Clicks',
        tag: 'Web Dev',
        gradient: 'linear-gradient(135deg, #9b0014, #e60023)',
        copyrightRadar: {
          audio: 10,
          visual: 46,
          transcript: 22,
          metadata: 38,
          scene: 36,
          similarityScore: 30,
          riskLevel: 'LOW',
          status: 'Clear',
          yourSegment: 'N/A',
          confirmedLicense: 'Open Source Reference / CC-BY',
          confirmedClaims: '0 Platform Copyright Flags',
          apiNotice: 'Automated reverse-image copyright scanning is restricted to Pinterest Brand Safety partners.'
        }
      }
    ],
    copilotResponses: {
      "Why is my Pinterest save rate high?": "Pins with actionable schematics and high-density typography (like 'Modern Architecture Cheat Sheet') achieve 3.4% save rates because pinners bookmark them to boards for recurring reference.",
      "How can I increase outbound clicks?": "Ensure your pin includes a clear visual destination promise (e.g. 'Read Full Guide') and keep your destination URL loaded under 2 seconds.",
      "Which board is performing best?": "Your 'Tech & Architecture' board leads with 640K impressions and a 9.8% engagement rate, outperforming 'Productivity & Gear' by 34%.",
      "What format should I create next?": "Idea Pins focusing on 3-step visual breakdowns generate 2.1× higher closeups than static single-image pins.",
      "Is video retention available on Pinterest?": "Second-by-second viewer retention curves are Not available via Pinterest public API telemetry. Focus on Impressions, Save Rate, and Outbound CTR.",
      "How do copyright indicators work on Pinterest?": "Pinterest relies on verified domain metadata and creator attribution. Automated reverse-image scanning is not provided by the public API."
    },
    copilotPrompts: [
      'Why is my Pinterest save rate high?',
      'How can I increase outbound clicks?',
      'Which board is performing best?',
      'What format should I create next?',
      'Is video retention available on Pinterest?',
      'How do copyright indicators work on Pinterest?'
    ]
  },

  // X (formerly Twitter) Analytics Demo Data
  x: {
    overview: {
      totalImpressions: '3.8M',
      likes: '124K',
      reposts: '38.4K',
      quotes: '9.2K',
      replies: '14.8K',
      bookmarks: '42.6K',
      engagementRate: '6.2%',
      impressionsTrend: '↑ 26.5%',
      repostsTrend: '↑ 19.4%',
      bookmarksTrend: '↑ 32.1%',
      likesTrend: '↑ 15.8%'
    },
    defaultPostId: 'post-1',
    tabMetrics: {
      overview: {
        totalImpressions: '3.8M',
        likes: '124K',
        reposts: '38.4K',
        quotes: '9.2K',
        replies: '14.8K',
        bookmarks: '42.6K',
        engagementRate: '6.2%',
        impressionsTrend: '↑ 26.5%',
        repostsTrend: '↑ 19.4%',
        bookmarksTrend: '↑ 32.1%',
        likesTrend: '↑ 15.8%'
      },
      posts: {
        totalImpressions: '3.1M',
        likes: '98K',
        reposts: '31.2K',
        quotes: '7.8K',
        replies: '11.9K',
        bookmarks: '34.8K',
        engagementRate: '6.6%',
        impressionsTrend: '↑ 28.2%',
        repostsTrend: '↑ 22.0%',
        bookmarksTrend: '↑ 35.4%',
        likesTrend: '↑ 17.1%'
      }
    },
    posts: [
      {
        id: 'post-1',
        title: 'Breakthrough in AI Autonomous Agents (10 Key Takeaways)',
        text: 'Autonomous coding agents are entering production environments. Here are 10 key architectural patterns every senior engineer needs to know:',
        type: 'post',
        impressions: '890K',
        likes: '34.2K',
        reposts: '12.4K',
        quotes: '3.1K',
        replies: '4.8K',
        bookmarks: '18.9K',
        engagementRate: '8.2%',
        performanceScore: 94,
        badge: 'Viral Repost Momentum',
        tag: 'AI Tech',
        gradient: 'linear-gradient(135deg, #1d9bf0, #00ba7c)',
        copyrightRadar: {
          audio: 12,
          visual: 16,
          transcript: 22,
          metadata: 24,
          scene: 14,
          similarityScore: 18,
          riskLevel: 'LOW',
          status: 'Clear',
          yourSegment: 'N/A',
          confirmedLicense: 'X Author Original Expression',
          confirmedClaims: '0 DMCA Claims / No Active Flags',
          apiNotice: 'X posts are text/thread assets. Acoustic and video retention telemetry is estimated from attached media indicators.'
        }
      },
      {
        id: 'post-2',
        title: 'Clean Architecture Patterns for TypeScript Backends',
        text: 'Stop building monolithic controllers. Use this lightweight 3-layer adapter pattern to decouple your business logic from external APIs:',
        type: 'post',
        impressions: '520K',
        likes: '19.8K',
        reposts: '7.2K',
        quotes: '1.4K',
        replies: '2.1K',
        bookmarks: '11.4K',
        engagementRate: '7.1%',
        performanceScore: 88,
        badge: 'High Bookmarks',
        tag: 'Software Engineering',
        gradient: 'linear-gradient(135deg, #0f172a, #1d9bf0)',
        copyrightRadar: {
          audio: 8,
          visual: 14,
          transcript: 58,
          metadata: 34,
          scene: 12,
          similarityScore: 36,
          riskLevel: 'REVIEW RECOMMENDED',
          status: 'Review Recommended',
          yourSegment: 'N/A',
          confirmedLicense: 'Open Source Reference / CC-BY',
          confirmedClaims: '0 DMCA Claims / No Active Flags',
          apiNotice: 'X Content Matching & DMCA telemetry is internal to X Trust & Safety.'
        }
      },
      {
        id: 'post-3',
        title: 'The 2026 Developer Tooling Reality Check',
        text: 'The biggest shift in developer workflows over the past 12 months is not code generation — it is autonomous agentic task verification.',
        type: 'post',
        impressions: '410K',
        likes: '14.5K',
        reposts: '5.1K',
        quotes: '980',
        replies: '1.6K',
        bookmarks: '8.7K',
        engagementRate: '6.5%',
        performanceScore: 82,
        badge: 'Discussion Thread',
        tag: 'Developer Tools',
        gradient: 'linear-gradient(135deg, #0f172a, #334155)',
        copyrightRadar: {
          audio: 10,
          visual: 20,
          transcript: 18,
          metadata: 20,
          scene: 16,
          similarityScore: 17,
          riskLevel: 'LOW',
          status: 'Clear',
          yourSegment: 'N/A',
          confirmedLicense: 'X Author Original Expression',
          confirmedClaims: '0 DMCA Claims / No Active Flags',
          apiNotice: 'X Content Matching & DMCA telemetry is internal to X Trust & Safety.'
        }
      }
    ],
    copilotResponses: {
      "Why did my post get high bookmark velocity?": "Your 'AI Autonomous Agents' post provides structured, high-utility bullet points. Viewers on X bookmark tactical information they want to implement later.",
      "How do I optimize reposts on X?": "Posts that present a clear, contrarian perspective followed by actionable evidence achieve 2.8× more reposts than general observational statements.",
      "What is my strongest engagement signal on X?": "Bookmarks (18.9K on top post) and Reposts (12.4K) are your strongest metrics, indicating high perceived authority in software engineering.",
      "Is video watch time available for text posts on X?": "Second-by-second video retention telemetry is Not available for text/image posts on X. The relevant telemetry metrics are Impressions, Reposts, and Bookmarks.",
      "What time should I post on X?": "Your technical audience is most active between 8:00 AM and 11:30 AM EST on Tuesdays and Thursdays.",
      "How are copyright indicators handled on X?": "X relies on author attribution and DMCA takedown status. Internal Trust & Safety content matching is proprietary and not exposed via public API."
    },
    copilotPrompts: [
      'Why did my post get high bookmark velocity?',
      'How do I optimize reposts on X?',
      'What is my strongest engagement signal on X?',
      'Is video watch time available for text posts on X?',
      'What time should I post on X?',
      'How are copyright indicators handled on X?'
    ]
  },

  // Cybersecurity Access Gate & Demo Roles
  cyberAuth: {
    roles: [
      {
        id: 'role-analyst',
        title: 'SecOps Intelligence Analyst',
        clearance: 'LEVEL-4 TOP SECRET (ZERO-TRUST)',
        defaultUser: 'analyst@socialpulse.cyber',
        defaultToken: 'SP-SEC-9942-0XF1A7',
        avatar: '🛡️',
        permissions: ['Full Telemetry Audit', 'Society Threat Radar', 'Cross-Platform Dispatch', 'DMCA Cryptographic Verification']
      },
      {
        id: 'role-defense',
        title: 'Content Defense Director',
        clearance: 'LEVEL-5 FLEET COMMAND',
        defaultUser: 'defense.director@socialpulse.cyber',
        defaultToken: 'SP-DEF-8821-0X98B2',
        avatar: '⚡',
        permissions: ['All Analyst Features', 'Emergency Quarantine', 'Executive PDF Synthesis', 'Algorithm Inoculation']
      },
      {
        id: 'role-creator',
        title: 'Verified Enterprise Creator',
        clearance: 'LEVEL-3 VERIFIED PARTNER',
        defaultUser: 'alex.vance@creator.pulse',
        defaultToken: 'SP-CRE-4102-0X55E4',
        avatar: 'AV',
        permissions: ['Channel Telemetry', 'Creator Copilot Voice AI', 'Thumbnail Diagnostics', 'Live Publishing']
      }
    ],
    handshakeProtocols: [
      'Initializing ChaCha20-Poly1305 Ephemeral Session Key...',
      'Verifying Zero-Knowledge Proofs for Platform Tokens...',
      'Validating GDPR & Digital Personal Data Protection Compliance...',
      'Synthesizing Encrypted Sandbox Handshake complete.'
    ]
  },

  // Society Impact & Cybersecurity Trend Radar Dataset (Good vs Bad Trends)
  societyTrends: [
    {
      id: 'trend-ben-1',
      title: 'Digital Hygiene & 2FA Hardware Passkey Adoption',
      type: 'beneficial',
      category: 'Cyber Defense',
      platformOrigin: 'YouTube & X',
      reach: '28.4M Viewers',
      reachNumeric: 28400000,
      velocity: '+340% / 48hrs',
      velocityScore: 92,
      harmScore: 4,
      benefitScore: 96,
      sentiment: '94% Positive',
      verdict: 'HIGH PUBLIC UTILITY',
      factCheckStatus: 'VERIFIED_EDUCATIONAL',
      summary: 'Creators educating non-technical users on hardware passkeys, biometric 2FA, and eliminating SMS OTPs to block credential stuffing.',
      societalImpact: 'Measurably reduces retail credential theft and account takeover vectors across 12+ consumer platforms.',
      recommendedAction: 'Amplify: Produce a 60-second tutorial showing how to turn on FIDO2 passkeys.',
      threatLevel: 'BENEFICIAL'
    },
    {
      id: 'trend-ben-2',
      title: 'Open-Source AI Local Privacy Models',
      type: 'beneficial',
      category: 'Data Sovereignty',
      platformOrigin: 'X (Twitter)',
      reach: '19.1M Viewers',
      reachNumeric: 19100000,
      velocity: '+210% / 24hrs',
      velocityScore: 85,
      harmScore: 8,
      benefitScore: 91,
      sentiment: '88% Positive',
      verdict: 'BENEFICIAL FOR PRIVACY',
      factCheckStatus: 'VERIFIED_BENCHMARKS',
      summary: 'Widespread sharing of privacy-preserving on-device local LLM runtimes that keep personal documents off third-party cloud servers.',
      societalImpact: 'Empowers citizens to protect personal data from commercial scraping while benefiting from AI productivity.',
      recommendedAction: 'Support: Share verified open-source weights and setup scripts.',
      threatLevel: 'BENEFICIAL'
    },
    {
      id: 'trend-ben-3',
      title: 'Mental Health Detox & Screen-Time Boundaries',
      type: 'beneficial',
      category: 'Digital Wellbeing',
      platformOrigin: 'Instagram Reels',
      reach: '44.8M Viewers',
      reachNumeric: 44800000,
      velocity: '+185% / 72hrs',
      velocityScore: 78,
      harmScore: 6,
      benefitScore: 94,
      sentiment: '91% Positive',
      verdict: 'COMMUNITY UPLIFT',
      factCheckStatus: 'VERIFIED_PSYCHOLOGY',
      summary: 'Creators setting healthy digital boundaries, debunking hustle burnout culture, and encouraging offline community engagement.',
      societalImpact: 'Reduces dopamine burnout and algorithmic doomscrolling symptoms among teen & young adult demographics.',
      recommendedAction: 'Participate: Include gentle reminders for viewers to take breaks in video outros.',
      threatLevel: 'BENEFICIAL'
    },
    {
      id: 'trend-ben-4',
      title: 'Algorithmic Literacy & Spotting Deepfakes',
      type: 'beneficial',
      category: 'Media Literacy',
      platformOrigin: 'YouTube Shorts',
      reach: '36.2M Viewers',
      reachNumeric: 36200000,
      velocity: '+410% / 24hrs',
      velocityScore: 98,
      harmScore: 5,
      benefitScore: 95,
      sentiment: '96% Positive',
      verdict: 'HIGH MEDIA LITERACY',
      factCheckStatus: 'VERIFIED_FORENSICS',
      summary: 'Breakdowns teaching viewers how to identify AI audio synthesis artifacts, lip-sync glitches, and synthetic lighting discrepancies.',
      societalImpact: 'Directly inoculates audiences against political and financial social engineering video scams.',
      recommendedAction: 'Priority Amplify: Highlight frame-by-frame forensics tools in your next community post.',
      threatLevel: 'BENEFICIAL'
    },
    {
      id: 'trend-ben-5',
      title: 'Free STEM & Coding Education for Underrepresented Youth',
      type: 'beneficial',
      category: 'Education',
      platformOrigin: 'YouTube & Pinterest',
      reach: '22.6M Viewers',
      reachNumeric: 22600000,
      velocity: '+140% / 5days',
      velocityScore: 74,
      harmScore: 2,
      benefitScore: 98,
      sentiment: '97% Positive',
      verdict: 'SOCIO-ECONOMIC EMPOWERMENT',
      factCheckStatus: 'VERIFIED_CURRICULUM',
      summary: 'Accessible visual cheat-sheets and free interactive sandboxes teaching foundational web architecture and cybersecurity fundamentals.',
      societalImpact: 'Lowers socio-economic barriers to entry for tech engineering careers globally.',
      recommendedAction: 'Collaborate: Link to accredited free non-profit repositories in video descriptions.',
      threatLevel: 'BENEFICIAL'
    },
    {
      id: 'trend-ben-6',
      title: 'Ethical E-Waste Recycling & Device Longevity',
      type: 'beneficial',
      category: 'Sustainability',
      platformOrigin: 'Pinterest & Instagram',
      reach: '15.4M Viewers',
      reachNumeric: 15400000,
      velocity: '+120% / 3days',
      velocityScore: 68,
      harmScore: 3,
      benefitScore: 89,
      sentiment: '92% Positive',
      verdict: 'ENVIRONMENTAL PROTECTION',
      factCheckStatus: 'VERIFIED_GREEN_INITIATIVE',
      summary: 'Repair guides and Linux revitalization for aging consumer laptops to reduce toxic lithium-ion e-waste dumping.',
      societalImpact: 'Extends hardware lifecycle by 3-5 years, preventing heavy metals from contaminating local landfills.',
      recommendedAction: 'Promote: Create guides on reviving old smartphones as local security monitors.',
      threatLevel: 'BENEFICIAL'
    },

    // 6 Harmful Trends for Society
    {
      id: 'trend-harm-1',
      title: 'AI Voice-Cloned CEO & Family Distress Phishing',
      type: 'harmful',
      category: 'Social Engineering',
      platformOrigin: 'TikTok & Instagram',
      reach: '31.5M Viewers',
      reachNumeric: 31500000,
      velocity: '+520% / 24hrs',
      velocityScore: 99,
      harmScore: 97,
      benefitScore: 2,
      sentiment: '12% Positive (88% Toxic/Fear)',
      verdict: 'CRITICAL CYBER THREAT',
      factCheckStatus: 'DEBUNKED_CRIMINAL_SCAM',
      summary: 'Scammers cloning voices from 3-second social clips to target grandparents and family members with urgent fake emergency ransoms.',
      societalImpact: 'Causes catastrophic financial devastation to elderly citizens and severe emotional trauma to families.',
      recommendedAction: 'URGENT COUNTER: Produce awareness warning on establishing private verbal "Safe Words" within families.',
      threatLevel: 'CRITICAL'
    },
    {
      id: 'trend-harm-2',
      title: 'Hyper-Partisan Rage-Bait & Conflict Amplification',
      type: 'harmful',
      category: 'Disinformation',
      platformOrigin: 'X (Twitter)',
      reach: '62.0M Viewers',
      reachNumeric: 62000000,
      velocity: '+380% / 12hrs',
      velocityScore: 94,
      harmScore: 92,
      benefitScore: 5,
      sentiment: '18% Positive (82% Hostile)',
      verdict: 'ALGORITHMIC TOXICITY',
      factCheckStatus: 'MANIPULATED_CONTEXT',
      summary: 'Out-of-context video cuts intentionally edited to trigger primal outrage and drive comment engagement through hostility.',
      societalImpact: 'Erodes social cohesion, accelerates societal polarization, and silences nuanced civil discourse.',
      recommendedAction: 'Refrain & Expose: Do not quote-tweet with outrage; publish full unedited context or block.',
      threatLevel: 'HIGH_RISK'
    },
    {
      id: 'trend-harm-3',
      title: 'Quishing: Malicious QR Codes in Aesthetic Infographics',
      type: 'harmful',
      category: 'Malware & Phishing',
      platformOrigin: 'Instagram & X',
      reach: '18.9M Viewers',
      reachNumeric: 18900000,
      velocity: '+290% / 36hrs',
      velocityScore: 88,
      harmScore: 89,
      benefitScore: 3,
      sentiment: '14% Positive',
      verdict: 'MALWARE VECTOR',
      factCheckStatus: 'ACTIVE_MALICIOUS_CAMPAIGN',
      summary: 'Deceptive QR codes embedded in aesthetic infographics leading unsuspecting users to malicious OAuth credential-harvesting proxies.',
      societalImpact: 'Bypasses standard email spam filters and targets mobile users lacking endpoint protection.',
      recommendedAction: 'Warn: Advise followers to inspect QR redirect destinations with URL decoders before signing in.',
      threatLevel: 'HIGH_RISK'
    },
    {
      id: 'trend-harm-4',
      title: 'Guaranteed 500% "AI Crypto Bot" Get-Rich Schemes',
      type: 'harmful',
      category: 'Financial Fraud',
      platformOrigin: 'YouTube Shorts & Telegram',
      reach: '27.4M Viewers',
      reachNumeric: 27400000,
      velocity: '+240% / 48hrs',
      velocityScore: 84,
      harmScore: 94,
      benefitScore: 1,
      sentiment: '21% Positive (Paid Bots)',
      verdict: 'ILLEGAL PONZI / RUG-PULL',
      factCheckStatus: 'CONFIRMED_FRAUD',
      summary: 'Fictitious automated trading scripts promising guaranteed daily yields, draining user crypto wallets upon Web3 signature approval.',
      societalImpact: 'Preys on financially vulnerable individuals and youth seeking quick economic relief.',
      recommendedAction: 'Report & Flag: Report channels to YouTube Trust & Safety and warn community of signature drainers.',
      threatLevel: 'CRITICAL'
    },
    {
      id: 'trend-harm-5',
      title: 'Unverified Herbal "Miracle Cures" & Health Misinformation',
      type: 'harmful',
      category: 'Public Health',
      platformOrigin: 'TikTok & Instagram Reels',
      reach: '39.0M Viewers',
      reachNumeric: 39000000,
      velocity: '+310% / 24hrs',
      velocityScore: 91,
      harmScore: 91,
      benefitScore: 4,
      sentiment: '35% Positive (Misguided)',
      verdict: 'HEALTH RISK ADVISORY',
      factCheckStatus: 'SCIENTIFICALLY_DISPROVEN',
      summary: 'Viral influencers advising followers to abandon prescribed medications in favor of unregulated, toxic heavy-metal herbal concoctions.',
      societalImpact: 'Leads to severe medical complications, organ failure, and avoidable hospitalizations.',
      recommendedAction: 'Debunk: Link to verified WHO/CDC peer-reviewed medical literature.',
      threatLevel: 'HIGH_RISK'
    },
    {
      id: 'trend-harm-6',
      title: 'Dangerous Physical Stunts & Public Harassment Pranks',
      type: 'harmful',
      category: 'Public Endangerment',
      platformOrigin: 'YouTube & TikTok',
      reach: '51.3M Viewers',
      reachNumeric: 51300000,
      velocity: '+460% / 18hrs',
      velocityScore: 96,
      harmScore: 95,
      benefitScore: 2,
      sentiment: '24% Positive (Teens)',
      verdict: 'CIVIL & PHYSICAL HAZARD',
      factCheckStatus: 'VIOLATES_COMMUNITY_SAFETY',
      summary: 'Escalating harassment challenges filming non-consenting workers in public transit and retail stores for algorithmic sensationalism.',
      societalImpact: 'Normalizes anti-social behavior, causes physical injuries to bystanders, and wastes emergency services resources.',
      recommendedAction: 'De-monetize & Condemn: Boycott engagement and enforce platform Terms of Service.',
      threatLevel: 'CRITICAL'
    }
  ],

  // Multi-Platform Executive Reports Full Working Engine Data
  executiveReports: {
    platforms: {
      youtube: {
        platformName: 'YouTube Channel Intelligence',
        icon: '▶',
        color: '#f43f5e',
        totalAudience: '348,000 Subscribers',
        views30Days: '14.8M Views',
        watchTimeHours: '892.4K Hours',
        avgRetentionRate: '67.4%',
        avgSatisfactionScore: 86,
        scrollPastRateAvg: '63.2%',
        activeFleetCount: '5 Monitored Uploads',
        topContent: 'Complete JavaScript Tutorial (2.45M views)',
        dropOffAnomaliesDetected: '1 Critical (03:12 / -17%)',
        rewatchHotspotsTotal: '8 Identified Segments',
        sentimentDistribution: { positive: 78, neutral: 15, negative: 7, hateSpamBlocked: 1420 },
        copyrightComplianceScore: '94% Safe (1 Segment Medium Risk)',
        executiveSummary: 'YouTube channel exhibits exceptional long-form retention with audience authority consolidating around deep technical tutorials. Minor drop-off anomaly at 03:12 in productivity video is counterbalanced by a 2.8x replay multiplier in instructional timestamps.',
        actionRoadmap: [
          { priority: 'P1 - High', task: 'Insert high-contrast motion graphic b-roll at 03:05 to smooth topic transition and recover -17% drop.' },
          { priority: 'P2 - Medium', task: 'Produce standalone Shorts from 02:10–02:35 rewatch hotspot to capitalize on organic clip virality.' },
          { priority: 'P3 - Low', task: 'Replace font styling on thumbnail of "5 Productivity Hacks" to reduce 68.4% scroll-past attrition.' }
        ]
      },
      instagram: {
        platformName: 'Instagram Professional Intelligence',
        icon: '◎',
        color: '#e1306c',
        totalAudience: '184,200 Followers',
        views30Days: '2.4M Reels Views',
        watchTimeHours: '312.0K Hours',
        avgRetentionRate: '58.4%',
        avgSatisfactionScore: 84,
        scrollPastRateAvg: '71.5%',
        activeFleetCount: '3 Monitored Reels',
        topContent: 'Build a Website in 30 Seconds (612K views)',
        dropOffAnomaliesDetected: '2 Moderate (00:12 & 00:19)',
        rewatchHotspotsTotal: '5 Replay Surges',
        sentimentDistribution: { positive: 74, neutral: 18, negative: 8, hateSpamBlocked: 890 },
        copyrightComplianceScore: '98% Safe (Meta Sound Library Verified)',
        executiveSummary: 'Instagram Reels reach is expanding rapidly (+18.5% 30-day velocity). Saves (12.3K) and Direct Message Shares (8.7K) are top-tier indicators of viral reference value. Hook drop-offs at second 12 need tighter pacing cuts.',
        actionRoadmap: [
          { priority: 'P1 - High', task: 'Shorten Reel intro hook to under 1.8 seconds to defeat aggressive mobile feed swipe speed.' },
          { priority: 'P2 - Medium', task: 'Pin comment asking viewers to save for later to boost algorithmic recommendation index.' },
          { priority: 'P3 - Low', task: 'A/B test carousel cover frames emphasizing high-utility step-by-step schematics.' }
        ]
      },
      pinterest: {
        platformName: 'Pinterest v5 Enterprise Intelligence',
        icon: '📌',
        color: '#e60023',
        totalAudience: '92,400 Monthly Viewers',
        views30Days: '1.2M Pin Impressions',
        watchTimeHours: '84.0K Hours Equivalent',
        avgRetentionRate: 'N/A (Image/Idea Pin Platform)',
        avgSatisfactionScore: 88,
        scrollPastRateAvg: '64.0%',
        activeFleetCount: '3 Monitored Pins',
        topContent: 'Modern Architecture Cheat Sheet (480K Impressions)',
        dropOffAnomaliesDetected: '0 (Static / Multi-Page Focus)',
        rewatchHotspotsTotal: '3.4% Save Velocity',
        sentimentDistribution: { positive: 89, neutral: 9, negative: 2, hateSpamBlocked: 120 },
        copyrightComplianceScore: '100% Verified (Verified Domain Attribution)',
        executiveSummary: 'Pinterest provides the lowest customer acquisition cost with evergreen shelf-life. High save rate (3.4%) on cheat sheets drives continuous organic outbound traffic back to primary tutorials.',
        actionRoadmap: [
          { priority: 'P1 - High', task: 'Add direct visual destination URL callout on Idea Pin ending slide.' },
          { priority: 'P2 - Medium', task: 'Schedule weekly cheat-sheet releases on Tuesdays at 7:00 PM for maximum board saves.' },
          { priority: 'P3 - Low', task: 'Organize boards into distinct series for enhanced SEO keyword indexation.' }
        ]
      },
      x: {
        platformName: 'X (Twitter) v2 Analytics Intelligence',
        icon: '𝕏',
        color: '#1d9bf0',
        totalAudience: '74,500 Followers',
        views30Days: '3.8M Post Impressions',
        watchTimeHours: '145.2K Reading Hours',
        avgRetentionRate: '6.2% Engagement Rate',
        avgSatisfactionScore: 91,
        scrollPastRateAvg: '59.8%',
        activeFleetCount: '3 Monitored Posts',
        topContent: 'Breakthrough in AI Autonomous Agents (890K Impressions)',
        dropOffAnomaliesDetected: 'Thread drop-off after tweet 4',
        rewatchHotspotsTotal: '18.9K Bookmarks Velocity',
        sentimentDistribution: { positive: 81, neutral: 13, negative: 6, hateSpamBlocked: 640 },
        copyrightComplianceScore: '100% Original Expression / CC-BY',
        executiveSummary: 'X platform serves as primary thought leadership and developer authority driver. Bookmarks-to-likes ratio (55%) is exceptionally high, indicating that technical audiences view posts as actionable implementation checklists.',
        actionRoadmap: [
          { priority: 'P1 - High', task: 'Repackage high-bookmark X threads into comprehensive YouTube tutorials.' },
          { priority: 'P2 - Medium', task: 'Engage with top technical quote-retweets within 30 minutes of publishing.' },
          { priority: 'P3 - Low', task: 'Include GitHub repository links in first thread reply to maximize outbound clicks.' }
        ]
      },
      fleet: {
        platformName: 'Composite Multi-Platform Fleet Audit',
        icon: '🌐',
        color: '#00f2fe',
        totalAudience: '698,900 Total Omnichannel Audience',
        views30Days: '22.2M Aggregate Impressions',
        watchTimeHours: '1.43M Aggregate Creator Hours',
        avgRetentionRate: '65.2% Cross-Platform Hold',
        avgSatisfactionScore: 89,
        scrollPastRateAvg: '64.8%',
        activeFleetCount: '14 Active Content Assets',
        topContent: 'Omnichannel Syndicate: Autonomous AI Tools Suite',
        dropOffAnomaliesDetected: '3 Cross-Platform Anomalies Flagged',
        rewatchHotspotsTotal: '18 High-Value Replay Clusters',
        sentimentDistribution: { positive: 80, neutral: 14, negative: 6, hateSpamBlocked: 3070 },
        copyrightComplianceScore: '97% Fleet-Wide Integrity Score',
        executiveSummary: 'Omnichannel creator performance is operating in the 94th percentile of enterprise tech creators. Content flywheel effectively transfers audience from high-velocity short-form discovery (TikTok, Reels, X) into high-retention long-form education (YouTube).',
        actionRoadmap: [
          { priority: 'P1 - High', task: 'Deploy synchronized multi-platform cross-posting with cybersecurity pre-flight checks.' },
          { priority: 'P2 - Medium', task: 'Harmonize thumbnail color contrast across YouTube and Instagram covers to drop feed scroll-past rate below 50%.' },
          { priority: 'P3 - Low', task: 'Establish automated weekly executive briefings sent to stakeholder inboxes.' }
        ]
      }
    }
  },

  // Cross-Platform Content Publisher Studio Assets & Presets
  publisherLibrary: {
    presets: [
      {
        id: 'post-preset-1',
        title: '5 Zero-Trust Habits for Developers',
        platforms: ['youtube', 'x', 'instagram'],
        caption: 'Stop trusting default API endpoints. Here are 5 Zero-Trust cybersecurity rules every software engineer needs to know in 2026: 🛡️\n\n1. Rotate ephemeral tokens every 60 min\n2. Hardware passkeys over SMS 2FA\n3. Verify open-source npm dependencies with SBOM scanners\n4. Never commit .env credentials\n5. Local privacy models for sensitive data\n\nFull tutorial on our YouTube channel! Link in bio.',
        tags: '#CyberSecurity #ZeroTrust #WebDev #InfoSec #Coding',
        mediaTheme: 'gradient-cyan-indigo',
        imageMock: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230f172a"/><stop offset="100%" stop-color="%231e1b4b"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g)"/><circle cx="300" cy="180" r="70" fill="rgba(0,242,254,0.15)" stroke="%2300f2fe" stroke-width="3"/><path d="M300 140 L340 165 L340 205 L300 230 L260 205 L260 165 Z" fill="none" stroke="%2300f2fe" stroke-width="4"/><text x="300" y="300" text-anchor="middle" fill="%23fff" font-family="sans-serif" font-size="22" font-weight="bold">ZERO-TRUST ARCHITECTURE</text><text x="300" y="330" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="14">SocialPulse AI Security Lab</text></svg>'
      },
      {
        id: 'post-preset-2',
        title: 'Why Retention Drops at 03:12 (Pacing Breakdown)',
        platforms: ['youtube', 'instagram'],
        caption: 'We analyzed 1.42 million viewer sessions. Here is the mathematical reason why retention drops at 03:12 and how you can fix it in your next video edit: ⚡\n\nStatic visuals for longer than 6 seconds trigger an immediate 14-18% mobile feed abandonment.\n\nSave this post for your next editing session!',
        tags: '#CreatorEconomy #VideoEditing #YouTubeTips #AudienceRetention',
        mediaTheme: 'gradient-rose-purple',
        imageMock: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%2318051a"/><stop offset="100%" stop-color="%23310d20"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g)"/><path d="M50 150 Q180 180 300 220 T420 310 L550 330" fill="none" stroke="%23f43f5e" stroke-width="5"/><circle cx="420" cy="310" r="8" fill="%23f43f5e"/><text x="300" y="80" text-anchor="middle" fill="%23fff" font-family="sans-serif" font-size="22" font-weight="bold">ANOMALY DROP-OFF ANALYSIS</text><text x="300" y="115" text-anchor="middle" fill="%23f43f5e" font-family="sans-serif" font-size="16">03:12 (-17% Audience Hold)</text></svg>'
      },
      {
        id: 'post-preset-3',
        title: 'How to Spot AI Deepfake Scams in 3 Steps',
        platforms: ['youtube', 'x', 'instagram', 'pinterest'],
        caption: '🚨 Public Security Alert: AI voice cloning and deepfake investment scams are up 520% this week. Here is a 3-step fact-check guide to protect yourself and your family:\n\n1. Establish a private family verbal Safe Word\n2. Inspect frame-by-frame lip sync lighting glitches\n3. Never authorize crypto transfers based solely on video calls\n\nShare to protect loved ones!',
        tags: '#FactCheck #DeepfakeAwareness #CyberDefense #OnlineSafety',
        mediaTheme: 'gradient-emerald-cyan',
        imageMock: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23062016"/><stop offset="100%" stop-color="%23041a24"/></linearGradient></defs><rect width="600" height="400" fill="url(%23g)"/><circle cx="300" cy="180" r="70" fill="rgba(16,185,129,0.15)" stroke="%2310b981" stroke-width="3"/><text x="300" y="190" text-anchor="middle" fill="%2310b981" font-family="sans-serif" font-size="34">✓</text><text x="300" y="300" text-anchor="middle" fill="%23fff" font-family="sans-serif" font-size="22" font-weight="bold">AI FORENSICS VERIFIED</text><text x="300" y="330" text-anchor="middle" fill="%2310b981" font-family="sans-serif" font-size="14">SocialPulse Public Safety Monitor</text></svg>'
      }
    ],
    preflightRules: [
      { id: 'rule-phish', name: 'Phishing & Malicious URLs', threshold: 0, status: 'PASSED' },
      { id: 'rule-hate', name: 'Societal Harm & Toxicity Score', threshold: 10, status: 'PASSED (0.2%)' },
    ]
  }
};

/* ==========================================================================
   INDIAN NATIONAL VIRAL TRENDS (PAN-INDIA MULTI-FIELD INTELLIGENCE)
   ========================================================================== */
const INDIAN_VIRAL_TRENDS = [
  {
    id: 'trend-brics-2026',
    name: 'BRICS 2026 Summit: Strategic Expansion & Rupee-Ruble-Yuan Trade Corridor',
    field: 'Geopolitics & Trade',
    growthVelocity: '+342%/hr',
    viralityScore: 97,
    views: '16,840,000',
    viewsNumeric: 16840000,
    shares: '942,000',
    likes: '3,850,000',
    comments: '468,000',
    firstObservedTimestamp: '2026-09-14T05:40:00Z',
    earliestObservedSource: 'X: @indiadiplomacy official communique & ANI Diplomatic Wire',
    originCity: 'New Delhi (MEA Press Briefing)',
    sentimentDistribution: { positive: 71, neutral: 21, negative: 8 },
    citizenViewpoint: 'Overwhelming public approval for de-dollarization and cross-border settlement in sovereign currencies. High resonance among business leaders and student communities.',
    demographics: { '18-24': 32, '25-34': 46, '35-49': 14, '50+': 8 },
    topHashtags: ['#BRICS2026', '#GlobalSouth', '#MakeInIndia', '#DeDollarization', '#DiplomaticLeadership'],
    platformBreakdown: {
      youtube: {
        views: '7,400,000',
        shares: '380,000',
        engagement: '9.4%',
        topAsset: 'Live Briefing: Prime Minister Keynote on Multi-Polar Trade Architecture',
        format: 'Live Broadcast & 4K Analysis'
      },
      instagram: {
        views: '4,950,000',
        shares: '340,000',
        engagement: '13.2%',
        topAsset: 'Reel: 10 Nations Joining BRICS Currency System Explained in 45 Seconds',
        format: 'Viral Reel & Carousel'
      },
      x: {
        views: '3,200,000',
        shares: '180,000',
        engagement: '19.8%',
        topAsset: 'Diplomatic Thread: Full Text of Joint Declaration with Bilateral MoUs',
        format: 'Official Threads & Quotes'
      },
      telegram: {
        views: '840,000',
        shares: '28,000',
        engagement: '31.5%',
        topAsset: 'PDF Policy Briefing: Trade Settlement Tariff Reductions 2026',
        format: 'Broadcast Channel Dossier'
      },
      facebook: {
        views: '450,000',
        shares: '14,000',
        engagement: '5.2%',
        topAsset: 'National Security & Economic Forum Panel Discussion',
        format: 'Public Video Stream'
      }
    }
  },
  {
    id: 'trend-farmers-protest',
    name: 'Farmers Movement: MSP Legal Guarantee & Comprehensive Crop Insurance Dialogue',
    field: 'Agriculture & Rural Economy',
    growthVelocity: '+418%/hr',
    viralityScore: 98,
    views: '21,450,000',
    viewsNumeric: 21450000,
    shares: '1,320,000',
    likes: '4,100,000',
    comments: '890,000',
    firstObservedTimestamp: '2026-09-14T04:15:00Z',
    earliestObservedSource: 'Telegram: @kisan_morcha_official & Shambhu Border Live Feeds',
    originCity: 'Punjab-Haryana Border / Patiala',
    sentimentDistribution: { positive: 41, neutral: 26, negative: 33 },
    citizenViewpoint: 'Intense discussion between agrarian sustainability advocates demanding statutory purchase guarantees and urban logistics sectors concerned with transport highway disruptions.',
    demographics: { '18-24': 24, '25-34': 38, '35-49': 26, '50+': 12 },
    topHashtags: ['#FarmersProtest', '#MSPGuarantee', '#KisanAndolan', '#AgriPolicy2026', '#KrishiSamvaad'],
    platformBreakdown: {
      youtube: {
        views: '9,800,000',
        shares: '560,000',
        engagement: '11.8%',
        topAsset: 'Ground Report: 5th Round of Talks Between Union Ministers and Farm Unions',
        format: 'Independent Journalism & Documentaries'
      },
      instagram: {
        views: '6,100,000',
        shares: '480,000',
        engagement: '15.6%',
        topAsset: 'Viral Reel: What is MSP and Why are Farmers Marching? (Complete Explainer)',
        format: 'Educational Short & Infographic'
      },
      x: {
        views: '4,250,000',
        shares: '240,000',
        engagement: '22.4%',
        topAsset: 'Hashtag Storm: #MSPGuarantee trending #1 in India with 640K tweets',
        format: 'Real-Time Ground Updates'
      },
      telegram: {
        views: '920,000',
        shares: '32,000',
        engagement: '38.2%',
        topAsset: 'Union Notice: Next Round of High-Level Inter-Ministerial Consultations',
        format: 'Internal Coordination Bulletin'
      },
      facebook: {
        views: '380,000',
        shares: '8,000',
        engagement: '6.4%',
        topAsset: 'Rural Community Assembly Live Broadcast',
        format: 'Community Video'
      }
    }
  },
  {
    id: 'trend-semiconductor-fab',
    name: 'India Semiconductor Mission: Commercial 28nm Fabrication Plant Operational',
    field: 'Technology & Manufacturing',
    growthVelocity: '+215%/hr',
    viralityScore: 91,
    views: '11,200,000',
    viewsNumeric: 11200000,
    shares: '640,000',
    likes: '2,890,000',
    comments: '280,000',
    firstObservedTimestamp: '2026-09-14T07:10:00Z',
    earliestObservedSource: 'LinkedIn: Ministry of Electronics & IT (MeitY) Press Release',
    originCity: 'Dholera, Gujarat / Bengaluru',
    sentimentDistribution: { positive: 88, neutral: 10, negative: 2 },
    citizenViewpoint: 'Extremely high optimism across technology professionals, engineers, and youth regarding domestic chip autonomy and hardware startup ecosystems.',
    demographics: { '18-24': 42, '25-34': 48, '35-49': 8, '50+': 2 },
    topHashtags: ['#SemiconductorIndia', '#ChipEcosystem', '#DholeraFab', '#DigitalIndia', '#TechSelfReliance'],
    platformBreakdown: {
      youtube: {
        views: '5,100,000',
        shares: '280,000',
        engagement: '8.6%',
        topAsset: 'Inside India’s First Ultra-Cleanroom Silicon Wafer Fab (Exclusive Tour)',
        format: 'Engineering Deep Dive'
      },
      instagram: {
        views: '3,400,000',
        shares: '210,000',
        engagement: '11.4%',
        topAsset: 'Reel: From Sand to Microchip — How India Built Its Own Silicon Foundry',
        format: '3D CGI Motion Reel'
      },
      x: {
        views: '2,150,000',
        shares: '120,000',
        engagement: '16.8%',
        topAsset: 'Minister Thread: 35,000 High-Tech Engineering Jobs Created at Dholera',
        format: 'Infographic Thread'
      },
      telegram: {
        views: '380,000',
        shares: '18,000',
        engagement: '24.0%',
        topAsset: 'Career PDF: Semiconductor Talent Apprenticeship Portal Launched',
        format: 'Student Notification'
      },
      facebook: {
        views: '170,000',
        shares: '12,000',
        engagement: '4.9%',
        topAsset: 'Industry Roundtable on Electronics Export Capabilities',
        format: 'Live Video'
      }
    }
  },
  {
    id: 'trend-digital-arrest-scam',
    name: 'Nationwide Cyber Advisory: "Digital Arrest" Video Call Scam Interceptions',
    field: 'National Cyber Defense',
    growthVelocity: '+520%/hr',
    viralityScore: 99,
    views: '24,800,000',
    viewsNumeric: 24800000,
    shares: '1,940,000',
    likes: '4,890,000',
    comments: '920,000',
    firstObservedTimestamp: '2026-09-14T03:00:00Z',
    earliestObservedSource: 'CERT-In National Advisory Alert & I4C Ministry of Home Affairs',
    originCity: 'New Delhi / Hyderabad Cyber Cell',
    sentimentDistribution: { positive: 64, neutral: 18, negative: 18 },
    citizenViewpoint: 'Widespread public vigilance and awareness sharing. Citizens praising rapid cyber cell raids while demanding telecom-level automated caller ID authentication.',
    demographics: { '18-24': 20, '25-34': 34, '35-49': 28, '50+': 18 },
    topHashtags: ['#DigitalArrestScam', '#CyberSafeIndia', '#Dial1930', '#I4CCyberCrime', '#SafeBanking'],
    platformBreakdown: {
      youtube: {
        views: '10,200,000',
        shares: '820,000',
        engagement: '12.4%',
        topAsset: 'Warning: How Scammers Fake a Police Station on Video Call (Caught on Cam)',
        format: 'Forensic Video Exposé'
      },
      instagram: {
        views: '8,400,000',
        shares: '780,000',
        engagement: '17.8%',
        topAsset: 'Reel: 3 Signs You Are Talking to a Digital Arrest Fraudster (Save & Share)',
        format: 'Public Awareness Reel'
      },
      x: {
        views: '4,600,000',
        shares: '290,000',
        engagement: '24.1%',
        topAsset: 'Official Advisory: Indian Law Enforcement NEVER conducts arrests over Skype',
        format: 'Verified Police Thread'
      },
      telegram: {
        views: '1,100,000',
        shares: '42,000',
        engagement: '35.6%',
        topAsset: 'List of 142 Seized Phishing APKs and Fraud UPI IDs',
        format: 'Security Bulletin'
      },
      facebook: {
        views: '500,000',
        shares: '8,000',
        engagement: '7.2%',
        topAsset: 'Senior Citizens Awareness Live Webinar by Cyber Cell Officers',
        format: 'Community Webinar'
      }
    }
  },
  {
    id: 'trend-isro-gaganyaan',
    name: 'ISRO Gaganyaan: Final Uncrewed Orbital Module (Vyommitra) Flight Readiness',
    field: 'Science & Aerospace',
    growthVelocity: '+280%/hr',
    viralityScore: 94,
    views: '15,600,000',
    viewsNumeric: 15600000,
    shares: '890,000',
    likes: '3,700,000',
    comments: '410,000',
    firstObservedTimestamp: '2026-09-14T06:50:00Z',
    earliestObservedSource: 'ISRO Official Telemetry & Sriharikota Launch Complex',
    originCity: 'Bengaluru / Sriharikota, AP',
    sentimentDistribution: { positive: 96, neutral: 3, negative: 1 },
    citizenViewpoint: 'Unified national pride across all states and age demographics. Celebrations of indigenous cryogenic engineering and human spaceflight milestones.',
    demographics: { '18-24': 38, '25-34': 42, '35-49': 14, '50+': 6 },
    topHashtags: ['#ISRO', '#Gaganyaan2026', '#Vyommitra', '#IndianHumanSpaceflight', '#ProudIndian'],
    platformBreakdown: {
      youtube: {
        views: '7,200,000',
        shares: '420,000',
        engagement: '10.2%',
        topAsset: 'Full Animation: Gaganyaan Re-entry & Sea Recovery Sequence',
        format: 'Scientific Simulation'
      },
      instagram: {
        views: '5,100,000',
        shares: '340,000',
        engagement: '14.0%',
        topAsset: 'Reel: Meet Vyommitra, the AI Humanoid Flying on Gaganyaan Next Week',
        format: 'Tech Reel'
      },
      x: {
        views: '2,600,000',
        shares: '110,000',
        engagement: '18.4%',
        topAsset: 'ISRO Telemetry Update: Cryogenic Upper Stage Hot-Test Passed Flawlessly',
        format: 'Technical Photo Update'
      },
      telegram: {
        views: '480,000',
        shares: '12,000',
        engagement: '28.0%',
        topAsset: 'Mission Press Kit: Flight Timeline & Tracking Radar Frequencies',
        format: 'Technical Document'
      },
      facebook: {
        views: '220,000',
        shares: '8,000',
        engagement: '5.8%',
        topAsset: 'Retired Scientists Panel on India’s Next Leap to Space Station',
        format: 'Broadcast Discussion'
      }
    }
  },
  {
    id: 'trend-upi-global',
    name: 'UPI Global Expansion: Instant Real-Time Cross-Border Remittances with 14 Nations',
    field: 'Economy & Banking',
    growthVelocity: '+190%/hr',
    viralityScore: 89,
    views: '10,400,000',
    viewsNumeric: 10400000,
    shares: '520,000',
    likes: '2,400,000',
    comments: '210,000',
    firstObservedTimestamp: '2026-09-14T07:45:00Z',
    earliestObservedSource: 'NPCI International (NIPL) & Reserve Bank of India Announcement',
    originCity: 'Mumbai / Paris & Abu Dhabi',
    sentimentDistribution: { positive: 91, neutral: 7, negative: 2 },
    citizenViewpoint: 'Diaspora and students express massive relief over zero-markup international transfers. Recognition of India’s digital public infrastructure as a global benchmark.',
    demographics: { '18-24': 36, '25-34': 50, '35-49': 10, '50+': 4 },
    topHashtags: ['#UPIGlobal', '#FintechIndia', '#NPCI', '#DigitalPublicInfra', '#MakeInIndiaFintech'],
    platformBreakdown: {
      youtube: {
        views: '4,600,000',
        shares: '240,000',
        engagement: '8.4%',
        topAsset: 'Testing UPI at the Eiffel Tower & Dubai Mall in Real-Time (Live Demo)',
        format: 'Travel & Tech Vlog'
      },
      instagram: {
        views: '3,800,000',
        shares: '210,000',
        engagement: '12.8%',
        topAsset: 'Reel: How Indian Tourists Can Now Pay Anywhere with PhonePe & GPay',
        format: 'Step-by-Step Reel'
      },
      x: {
        views: '1,650,000',
        shares: '64,000',
        engagement: '15.6%',
        topAsset: 'Governor Speech: Cross-Border Settlement Costs Slashed from 6% to 0.4%',
        format: 'Policy Thread'
      },
      telegram: {
        views: '240,000',
        shares: '4,000',
        engagement: '22.0%',
        topAsset: 'Bank List: Enabled International UPI QR Partner Banks',
        format: 'Notice List'
      },
      facebook: {
        views: '110,000',
        shares: '2,000',
        engagement: '4.6%',
        topAsset: 'NRI Community Townhall on Remittance Benefits',
        format: 'Community Video'
      }
    }
  }
];

/* ==========================================================================
   INDIA STATE PULSE DATA (ALL 28 STATES & 8 UTs ACROSS FIELDS)
   ========================================================================== */
const INDIA_STATE_PULSE_DATA = {
  'Punjab': {
    'Agriculture': {
      regionalScore: 94,
      trendTitle: 'Mandi Procurement Digitization & Subsidized Solar Pump Rollout',
      districtHotspots: ['Ludhiana', 'Patiala', 'Amritsar', 'Bathinda', 'Sangrur'],
      sentiment: { positive: 48, neutral: 28, negative: 24 },
      viralPosts: [
        { platform: 'YouTube', title: 'New Direct Seeding of Rice Subsidies Announced', engagement: '480K views' },
        { platform: 'Instagram', title: 'Farmer Producer Company exports basmati to Europe', engagement: '190K likes' }
      ]
    },
    'Law & Order / Cyber Crime': {
      regionalScore: 82,
      trendTitle: 'Border Drone Smuggling Countermeasures & Anti-Gangster Task Force Raids',
      districtHotspots: ['Ferozepur', 'Gurdaspur', 'Tarn Taran', 'Amritsar'],
      sentiment: { positive: 65, neutral: 20, negative: 15 },
      viralPosts: [
        { platform: 'X', title: 'Punjab Police intercepts 6 commercial delivery drones with contraband', engagement: '38K retweets' }
      ]
    },
    'Technology & Startups': {
      regionalScore: 68,
      trendTitle: 'Mohali IT City Drone Innovation Cluster & Agrotech Incubator Expansion',
      districtHotspots: ['SAS Nagar (Mohali)', 'Jalandhar', 'Ludhiana'],
      sentiment: { positive: 78, neutral: 18, negative: 4 },
      viralPosts: [
        { platform: 'LinkedIn', title: '14 Agrotech startups receive seed funding from Punjab Innovation Fund', engagement: '12K shares' }
      ]
    }
  },
  'Maharashtra': {
    'Economy & Industry': {
      regionalScore: 96,
      trendTitle: 'Mumbai-Ahmedabad High Speed Rail Coastal Tunnel Breakthrough & FinTech Hub',
      districtHotspots: ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Thane', 'Nagpur'],
      sentiment: { positive: 82, neutral: 12, negative: 6 },
      viralPosts: [
        { platform: 'YouTube', title: 'Undersea Bullet Train Tunnel: Engineering Marvel Breakdown', engagement: '1.2M views' },
        { platform: 'X', title: 'BSE Market Cap hits historic milestone with 42 new tech IPO listings', engagement: '64K reposts' }
      ]
    },
    'Agriculture': {
      regionalScore: 79,
      trendTitle: 'Vidarbha & Marathwada Drip Irrigation Subsidies & Cotton MSP Procurement',
      districtHotspots: ['Yavatmal', 'Amravati', 'Nagpur', 'Chhatrapati Sambhajinagar'],
      sentiment: { positive: 58, neutral: 24, negative: 18 },
      viralPosts: [
        { platform: 'Instagram', title: 'Solar micro-irrigation project brings water to 12,000 hectares', engagement: '340K views' }
      ]
    },
    'Law & Order / Cyber Crime': {
      regionalScore: 88,
      trendTitle: 'Mumbai Cyber Cell Busts Fake Stock Trading App Racket Operating Out of Thane',
      districtHotspots: ['Thane', 'Navi Mumbai', 'Bandra-Kurla Complex'],
      sentiment: { positive: 74, neutral: 16, negative: 10 },
      viralPosts: [
        { platform: 'X', title: 'Mumbai Police freeze ₹18 Crore in fake trading app bank accounts', engagement: '42K likes' }
      ]
    }
  },
  'Karnataka': {
    'Technology & Startups': {
      regionalScore: 98,
      trendTitle: 'Bengaluru Global Capability Centers (GCC) Surge & Quantum Computing Lab',
      districtHotspots: ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Hubballi-Dharwad'],
      sentiment: { positive: 86, neutral: 10, negative: 4 },
      viralPosts: [
        { platform: 'X', title: 'Karnataka launches ₹2,000 Crore DeepTech & Quantum Fund', engagement: '52K retweets' },
        { platform: 'YouTube', title: 'Why Global Tech Giants are doubling down on Bengaluru in 2026', engagement: '890K views' }
      ]
    },
    'Infrastructure & Transport': {
      regionalScore: 84,
      trendTitle: 'Namma Metro Outer Ring Road Line Test Runs & Suburban Rail Network Expansion',
      districtHotspots: ['Bengaluru Urban', 'Whitefield', 'Electronic City'],
      sentiment: { positive: 69, neutral: 22, negative: 9 },
      viralPosts: [
        { platform: 'Instagram', title: 'Driverless Metro trains on Yellow Line complete safety validation', engagement: '410K views' }
      ]
    },
    'Agriculture': {
      regionalScore: 74,
      trendTitle: 'Drought-Resilient Ragi & Millets Marketing Campaign across Mandya & Hassan',
      districtHotspots: ['Mandya', 'Hassan', 'Tumakuru', 'Belagavi'],
      sentiment: { positive: 62, neutral: 28, negative: 10 },
      viralPosts: [
        { platform: 'YouTube', title: 'Farmer exports organic millet biscuits to US and Japan', engagement: '220K views' }
      ]
    }
  },
  'Uttar Pradesh': {
    'Infrastructure & Transport': {
      regionalScore: 93,
      trendTitle: 'Ganga Expressway Final Phasing & Jewar International Airport Runway Readiness',
      districtHotspots: ['Gautam Buddha Nagar (Noida)', 'Lucknow', 'Varanasi', 'Kanpur', 'Prayagraj'],
      sentiment: { positive: 84, neutral: 11, negative: 5 },
      viralPosts: [
        { platform: 'YouTube', title: 'Jewar Airport Drone Tour: Cargo & Passenger Terminals Complete', engagement: '1.4M views' },
        { platform: 'X', title: 'Ganga Expressway to cut Meerut-Prayagraj travel time to 6 hours', engagement: '48K reposts' }
      ]
    },
    'Law & Order / Cyber Crime': {
      regionalScore: 86,
      trendTitle: 'UP Police 112 Modernization & Cyber Crime Police Stations in all 75 Districts',
      districtHotspots: ['Lucknow', 'Kanpur Nagar', 'Ghaziabad', 'Agra'],
      sentiment: { positive: 79, neutral: 14, negative: 7 },
      viralPosts: [
        { platform: 'X', title: 'UP Cyber Cell recovers ₹8.2 Crore stolen via OTP quishing scams', engagement: '36K likes' }
      ]
    },
    'Agriculture': {
      regionalScore: 81,
      trendTitle: 'Sugarcane Price Hike & Ethanol Blending Plant Commissioning in Western UP',
      districtHotspots: ['Meerut', 'Muzaffarnagar', 'Bareilly', 'Gorakhpur'],
      sentiment: { positive: 71, neutral: 20, negative: 9 },
      viralPosts: [
        { platform: 'Instagram', title: 'Asia’s largest bio-ethanol refinery begins commercial supply', engagement: '280K views' }
      ]
    }
  },
  'Madhya Pradesh': {
    'Agriculture': {
      regionalScore: 88,
      trendTitle: 'Ken-Betwa River Link Project Progress & Wheat Procurement Bumper Harvest',
      districtHotspots: ['Bhopal', 'Indore', 'Hoshangabad (Narmadapuram)', 'Ujjain', 'Sehore'],
      sentiment: { positive: 76, neutral: 16, negative: 8 },
      viralPosts: [
        { platform: 'YouTube', title: 'Ken-Betwa River Linking transforms Bundelkhand irrigation', engagement: '640K views' }
      ]
    },
    'Technology & Startups': {
      regionalScore: 78,
      trendTitle: 'Indore Cleanest City Award for 8th Time & IT SEZ Investment Commitments',
      districtHotspots: ['Indore', 'Bhopal', 'Gwalior'],
      sentiment: { positive: 91, neutral: 7, negative: 2 },
      viralPosts: [
        { platform: 'Instagram', title: 'How Indore converted 100% municipal waste into green bio-CNG', engagement: '520K views' }
      ]
    }
  },
  'Tamil Nadu': {
    'Technology & Manufacturing': {
      regionalScore: 92,
      trendTitle: 'Electric Vehicle (EV) Corridor Expansion & Electronics Assembly Hubs',
      districtHotspots: ['Chennai', 'Coimbatore', 'Hosur', 'Kanchipuram', 'Sriperumbudur'],
      sentiment: { positive: 85, neutral: 11, negative: 4 },
      viralPosts: [
        { platform: 'LinkedIn', title: 'Tamil Nadu exports 42% of all smartphones manufactured in India', engagement: '34K shares' }
      ]
    }
  },
  'Gujarat': {
    'Economy & Industry': {
      regionalScore: 95,
      trendTitle: 'GIFT City International Bullion & FinTech Trading Volume Milestone',
      districtHotspots: ['Gandhinagar', 'Ahmedabad', 'Surat', 'Vadodara'],
      sentiment: { positive: 88, neutral: 9, negative: 3 },
      viralPosts: [
        { platform: 'YouTube', title: 'Inside GIFT City: India’s Smart Financial Capital', engagement: '980K views' }
      ]
    }
  },
  'Delhi': {
    'Education & Policy': {
      regionalScore: 87,
      trendTitle: 'Model Virtual Schools & Vocational Robotics Curriculum in Public Schools',
      districtHotspots: ['New Delhi', 'South Delhi', 'North West Delhi'],
      sentiment: { positive: 72, neutral: 18, negative: 10 },
      viralPosts: [
        { platform: 'Instagram', title: 'Government school students build AI-powered drone for agriculture', engagement: '640K views' }
      ]
    }
  }
};

/* ==========================================================================
   CYBER CRIME ENFORCEMENT & STRICT ACTION DOSSIERS (I4C & CFCFRMS)
   ========================================================================== */
const CYBER_CRIME_ENFORCEMENT_DOSSIER = {
  nationalStats: {
    totalFrozenFunds: '₹42,85,40,000 (₹42.85 Crores)',
    totalSimsBlocked: '18,450 Fraudulent SIM Cards',
    callCentersRaided: '14 International Scam Hubs',
    domainsSeized: '2,180 Phishing & Malicious Portals',
    criminalsArrested: '324 Charged Operatives',
    victimsAssisted: '142,600 Restitution Cases via 1930'
  },
  activeDossiers: [
    {
      caseId: 'CYBER-2026-0941',
      syndicateName: 'Mewat-Jamtara Quishing & UPI Overlay Cartel',
      primaryCrime: 'QR Code Tampering & Fraudulent Merchant Redirection (Quishing)',
      modusOperandi: 'Affixing counterfeit QR stickers over legitimate merchant UPI codes at highway toll booths, petrol pumps, and shopping complexes. Victims scanning the code are directed to phishing gateway APKs that mirror banking UIs to steal MPIN credentials.',
      stolenVolume: '₹8.42 Crores across 12 States',
      seizedAssets: '142 High-End Smartphones, 850 Forged SIM Cards, 12 Micro-ATMs, ₹1.8 Cr Cash',
      legalSections: 'IT Act Section 66D, IPC Section 420 (BNS 318), IPC 120B (Criminal Conspiracy)',
      actionTaken: 'Coordinated multi-state dawn raid across 14 locations. 18 key ringleaders arrested; 84 mule bank accounts frozen under CFCFRMS 1930 portal.',
      status: 'Chargesheet Submitted • Incarcerated in Judicial Custody',
      badge: 'SYNDICATE NEUTRALIZED',
      badgeColor: '#10b981'
    },
    {
      caseId: 'CYBER-2026-0814',
      syndicateName: 'Southeast Asia Cross-Border "Digital Arrest" Syndicate',
      primaryCrime: 'Digital Arrest Impersonation (CBI / ED / Mumbai Police Video Scam)',
      modusOperandi: 'Cold-calling victims using VoIP gateway masking to impersonate senior law enforcement officers. Placing victims under "virtual arrest" on Skype video calls featuring synthetic police badges, fake Supreme Court arrest warrants, and siphoning life savings into mule accounts.',
      stolenVolume: '₹21.60 Crores across 6 Metros',
      seizedAssets: '4 Enterprise Cloud PBX Servers, 85 International GSM Gateway Boxes, 64 Mule Passbooks',
      legalSections: 'IT Act Section 66C & 66D; BNS Section 308 (Extortion), BNS Section 319 (Impersonation)',
      actionTaken: 'Interpol Purple Notice and Red Corner Notices issued. Intercepted 26 call center recruiters at IGI Airport. 210 bank accounts frozen, preventing ₹7.4 Cr transfer.',
      status: 'Cross-Border Extradition Proceedings Active',
      badge: 'HIGH-PRIORITY CRACKDOWN',
      badgeColor: '#f43f5e'
    },
    {
      caseId: 'CYBER-2026-0722',
      syndicateName: 'Crypto VIP Task & Part-Time Telegram Job Network',
      primaryCrime: 'Task Scam & Fake High-Yield Crypto Deposit Escalation',
      modusOperandi: 'Sending WhatsApp / SMS invitations promising ₹150 per YouTube video liked. After initial token payouts of ₹500, victims are invited into VIP Telegram channels where they are coerced into investing lakhs into counterfeit crypto exchange dashboards.',
      stolenVolume: '₹12.83 Crores from 4,200 Victims',
      seizedAssets: '3.2 Million USDT in Cold Wallets Seized, 19 Luxury Vehicles, 180 Debit Cards',
      legalSections: 'Prevention of Money Laundering Act (PMLA), IT Act Section 66D, BNS 318',
      actionTaken: 'Enforcement Directorate & State Cyber Cell joint freeze. Seized cold storage private keys with court authorization; restitution initiated for 1,840 verified victims.',
      status: 'Special Cyber Court Trial in Progress',
      badge: 'FUNDS RESTITUTED',
      badgeColor: '#00f2fe'
    }
  ]
};

/* ==========================================================================
   CREATOR PLATFORM DATA (DISTINCT CONTENT & TELEMETRY PER PLATFORM)
   ========================================================================== */
const CREATOR_PLATFORM_DATA = {
  youtube: {
    platformName: 'YouTube',
    platformIcon: '▶',
    primaryMetricLabel: 'Total Views',
    primaryMetricValue: '14.8M',
    secondaryMetricLabel: 'Watch Time',
    secondaryMetricValue: '84.6K Hours',
    tertiaryMetricLabel: 'Subscribers',
    tertiaryMetricValue: '348,000',
    quaternaryMetricLabel: 'Avg Retention',
    quaternaryMetricValue: '64.2%',
    posts: [
      {
        id: 'yt-1',
        title: 'Building an AI SaaS in 48 Hours with Zero Capital',
        views: '1,840,200',
        likes: '142,500',
        comments: '12,400',
        shares: '34,200',
        duration: '14:22',
        retention: '68%',
        published: '3 days ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%230f172a"/><text x="160" y="95" fill="%2300f2fe" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">AI SaaS in 48h</text></svg>'
      },
      {
        id: 'yt-2',
        title: '5 Productivity Hacks for High-Performance Programmers',
        views: '1,420,500',
        likes: '98,200',
        comments: '8,900',
        shares: '24,100',
        duration: '05:00',
        retention: '64.2%',
        published: '1 week ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%231e1b4b"/><text x="160" y="95" fill="%23a5b4fc" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Productivity Hacks</text></svg>'
      },
      {
        id: 'yt-3',
        title: 'The Brutal Truth About Full-Stack Engineering in 2026',
        views: '2,150,000',
        likes: '184,000',
        comments: '16,200',
        shares: '48,000',
        duration: '18:45',
        retention: '72%',
        published: '2 weeks ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%2309090b"/><text x="160" y="95" fill="%23f43f5e" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Full-Stack Truth</text></svg>'
      },
      {
        id: 'yt-4',
        title: 'Zero-Trust Architecture Crash Course: From Threat to Code',
        views: '890,000',
        likes: '76,400',
        comments: '4,100',
        shares: '18,500',
        duration: '22:10',
        retention: '61%',
        published: '3 weeks ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%23064e3b"/><text x="160" y="95" fill="%2334d399" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Zero-Trust Course</text></svg>'
      }
    ]
  },
  instagram: {
    platformName: 'Instagram',
    platformIcon: '◎',
    primaryMetricLabel: 'Accounts Reached',
    primaryMetricValue: '8.4M',
    secondaryMetricLabel: 'Reel Plays',
    secondaryMetricValue: '12.6M',
    tertiaryMetricLabel: 'Followers',
    tertiaryMetricValue: '512,000',
    quaternaryMetricLabel: 'Saves & Shares',
    quaternaryMetricValue: '342.5K',
    posts: [
      {
        id: 'ig-1',
        title: 'Morning Routine of a 24-Year-Old AI Startup Founder [Reel]',
        views: '3,840,000',
        likes: '342,000',
        comments: '4,200',
        shares: '124,000',
        duration: '00:52',
        retention: '88%',
        published: '2 days ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%23310d20"/><text x="160" y="95" fill="%23f472b6" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Founder Routine</text></svg>'
      },
      {
        id: 'ig-2',
        title: '10 Viral Hook Formulas That Grew Our Channel 10x [Carousel]',
        views: '1,920,000',
        likes: '194,000',
        comments: '3,800',
        shares: '89,000',
        duration: '10 Slides',
        retention: '94%',
        published: '5 days ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%231e1b4b"/><text x="160" y="95" fill="%23c084fc" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">10 Hook Formulas</text></svg>'
      },
      {
        id: 'ig-3',
        title: 'Why Retention Drops at 03:12 and How to Edit Smoothly [Reel]',
        views: '2,480,000',
        likes: '228,000',
        comments: '5,100',
        shares: '142,000',
        duration: '00:44',
        retention: '91%',
        published: '1 week ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%230f172a"/><text x="160" y="95" fill="%2338bdf8" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Edit Drop-Off Fix</text></svg>'
      },
      {
        id: 'ig-4',
        title: 'Behind the Scenes: How We Built Our Studio Lighting Rig [Story Highlight]',
        views: '840,000',
        likes: '78,000',
        comments: '1,400',
        shares: '28,000',
        duration: '00:30',
        retention: '78%',
        published: '2 weeks ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%231c1917"/><text x="160" y="95" fill="%23facc15" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Studio BTS</text></svg>'
      }
    ]
  },
  x: {
    platformName: 'X (Twitter)',
    platformIcon: '𝕏',
    primaryMetricLabel: 'Impressions',
    primaryMetricValue: '9.2M',
    secondaryMetricLabel: 'Retweets & Quotes',
    secondaryMetricValue: '184.2K',
    tertiaryMetricLabel: 'Followers',
    tertiaryMetricValue: '189,400',
    quaternaryMetricLabel: 'Bookmark Rate',
    quaternaryMetricValue: '14.2%',
    posts: [
      {
        id: 'x-1',
        title: 'How we bootstrapped an AI analytics platform to $100k ARR with 0 VC funding [Thread]',
        views: '2,480,000',
        likes: '48,200',
        comments: '1,840',
        shares: '14,200',
        duration: '8 Tweets',
        retention: '89%',
        published: '1 day ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%23000"/><text x="160" y="95" fill="%23fff" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Bootstrap $100k ARR</text></svg>'
      },
      {
        id: 'x-2',
        title: 'The uncomfortable truth about modern AI wrapper startups in 2026 [Post]',
        views: '1,850,000',
        likes: '36,400',
        comments: '2,400',
        shares: '8,900',
        duration: 'Post',
        retention: '92%',
        published: '4 days ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%2318181b"/><text x="160" y="95" fill="%2360a5fa" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">AI Wrapper Truth</text></svg>'
      },
      {
        id: 'x-3',
        title: '10 open-source GitHub repositories that feel illegal to know about [Thread]',
        views: '3,100,000',
        likes: '72,800',
        comments: '2,900',
        shares: '28,400',
        duration: '12 Tweets',
        retention: '95%',
        published: '1 week ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%23022c22"/><text x="160" y="95" fill="%2334d399" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">10 GitHub Repos</text></svg>'
      },
      {
        id: 'x-4',
        title: 'Zero-Trust Cybersecurity Architecture explained in simple diagrams [Thread]',
        views: '1,420,000',
        likes: '28,900',
        comments: '980',
        shares: '9,400',
        duration: '6 Tweets',
        retention: '87%',
        published: '2 weeks ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%231e1b4b"/><text x="160" y="95" fill="%23818cf8" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Zero-Trust Diagram</text></svg>'
      }
    ]
  },
  pinterest: {
    platformName: 'Pinterest',
    platformIcon: '📌',
    primaryMetricLabel: 'Pin Impressions',
    primaryMetricValue: '4.6M',
    secondaryMetricLabel: 'Outbound Clicks',
    secondaryMetricValue: '210.4K',
    tertiaryMetricLabel: 'Saves & Pins',
    tertiaryMetricValue: '184,200',
    quaternaryMetricLabel: 'Engagement Rate',
    quaternaryMetricValue: '11.8%',
    posts: [
      {
        id: 'pin-1',
        title: 'Minimalist Dark Mode Developer Workspace Setup 2026 [Idea Pin]',
        views: '1,840,000',
        likes: '94,000',
        comments: '820',
        shares: '48,000',
        duration: 'Pin',
        retention: '92%',
        published: '3 days ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%23172554"/><text x="160" y="95" fill="%2393c5fd" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Desk Setup 2026</text></svg>'
      },
      {
        id: 'pin-2',
        title: 'Infographic: 5 Zero-Trust Hygiene Rules for Remote Workers [Pin]',
        views: '1,420,000',
        likes: '72,000',
        comments: '640',
        shares: '34,000',
        duration: 'Infographic',
        retention: '89%',
        published: '1 week ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%2314532d"/><text x="160" y="95" fill="%2386efac" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Zero-Trust Rules</text></svg>'
      },
      {
        id: 'pin-3',
        title: 'YouTube Thumbnail Color Psychology Cheat Sheet [Pin]',
        views: '980,000',
        likes: '58,000',
        comments: '420',
        shares: '28,000',
        duration: 'Cheat Sheet',
        retention: '86%',
        published: '2 weeks ago',
        thumbnail: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="%234c0519"/><text x="160" y="95" fill="%23fda4af" font-size="16" font-family="sans-serif" text-anchor="middle" font-weight="bold">Color Psychology</text></svg>'
      }
    ]
  }
};

/* ==========================================================================
   CREATOR COPYRIGHT INFRINGERS & PROTECTION ACTIONS
   ========================================================================== */
const CREATOR_COPYRIGHT_INFRINGERS = [
  {
    id: 'infringe-1',
    channelName: 'TechClipsDaily',
    channelHandle: '@techclipsdaily_yt',
    platform: 'YouTube',
    followers: '84,500 Subscribers',
    matchedOriginalTitle: '5 Productivity Hacks for Programmers',
    matchedClipRange: '01:14 – 02:40 (86 sec exact audio-visual copy)',
    similarityPercentage: '94%',
    viewsAccumulated: '320,400 views',
    infringerUrl: 'https://youtube.com/watch?v=mock_infringe_9482',
    actions: ['Issue Content ID Claim', 'Send DMCA Takedown Notice', 'Request Revenue Share (80/20)']
  },
  {
    id: 'infringe-2',
    channelName: 'ViralGrowthReels',
    channelHandle: '@viral_reels_hub_01',
    platform: 'Instagram',
    followers: '142,000 Followers',
    matchedOriginalTitle: 'Why Retention Drops at 03:12',
    matchedClipRange: 'Entire Reel Re-uploaded (Watermark Blurred)',
    similarityPercentage: '98%',
    viewsAccumulated: '540,000 views',
    infringerUrl: 'https://instagram.com/reel/mock_infringe_3391',
    actions: ['Send Meta Rights Manager Takedown', 'Request Collab Credit', 'Strike Account']
  },
  {
    id: 'infringe-3',
    channelName: 'CryptoAlphaInsider',
    channelHandle: '@crypto_alpha_leak',
    platform: 'X (Twitter)',
    followers: '38,200 Followers',
    matchedOriginalTitle: 'How to Spot AI Deepfake Scams',
    matchedClipRange: 'Infographic Asset Reused as Paid Sponsored Tweet',
    similarityPercentage: '91%',
    viewsAccumulated: '180,000 views',
    infringerUrl: 'https://x.com/mock_tweet_9921',
    actions: ['File DMCA Notice with X Safety', 'Issue Trademark Violation Warning']
  }
];

/* ==========================================================================
   CREATOR TOP-RIGHT SECURITY ALERT NOTIFICATIONS (BOTS / SPAMMERS / HACKERS)
   ========================================================================== */
const CREATOR_SECURITY_ALERTS = [
  {
    id: 'sec-alert-1',
    title: '🚨 Bot Swarm Attack in Progress',
    detail: '340 automated bot accounts detected posting malicious Telegram link "t.me/free_crypto_airdrop" in your latest video comments within 4 minutes.',
    severity: 'CRITICAL',
    timeAgo: 'Just now',
    suggestedAction: 'Ban Bot Swarm & Auto-Purge 340 Comments',
    actionKey: 'purge_bots'
  },
  {
    id: 'sec-alert-2',
    title: '⚠️ Unauthorized Session Attempt Blocked',
    detail: 'IP 185.220.101.5 (Tor Exit Node, Bucharest) attempted to inject credentials into your YouTube OAuth session. Zero-Trust shield blocked the handshake.',
    severity: 'HIGH',
    timeAgo: '14 mins ago',
    suggestedAction: 'Enforce Hardware 2FA & Terminate Remote Tokens',
    actionKey: 'terminate_sessions'
  },
  {
    id: 'sec-alert-3',
    title: '🛡️ Impersonation Account Detected on Instagram',
    detail: 'Account "@alex_vance_official_invest" copied your profile picture, bio, and is DMing your followers with fake crypto arbitrage offers.',
    severity: 'MEDIUM',
    timeAgo: '1 hour ago',
    suggestedAction: 'Dispatch Automated Meta Trust & Safety Report',
    actionKey: 'report_impersonator'
  },
  {
    id: 'sec-alert-4',
    title: '⚡ 85 Spam Comments Automatically Filtered',
    detail: 'AI Comment Shield blocked 85 repetitive WhatsApp investment spam comments across your YouTube Shorts.',
    severity: 'INFO',
    timeAgo: '3 hours ago',
    suggestedAction: 'View Filtered Log & Adjust Shield Threshold',
    actionKey: 'view_spam_log'
  }
];

// Attach all structures globally for seamless browser and client access
if (typeof window !== 'undefined') {
  window.DHRISTI_DATA = SOCIALPULSE_DATA;
  window.SOCIALPULSE_DATA = SOCIALPULSE_DATA;
  window.INDIAN_VIRAL_TRENDS = INDIAN_VIRAL_TRENDS;
  window.INDIA_STATE_PULSE_DATA = INDIA_STATE_PULSE_DATA;
  window.CYBER_CRIME_ENFORCEMENT_DOSSIER = CYBER_CRIME_ENFORCEMENT_DOSSIER;
  window.CREATOR_PLATFORM_DATA = CREATOR_PLATFORM_DATA;
  window.CREATOR_COPYRIGHT_INFRINGERS = CREATOR_COPYRIGHT_INFRINGERS;
  window.CREATOR_SECURITY_ALERTS = CREATOR_SECURITY_ALERTS;
}
