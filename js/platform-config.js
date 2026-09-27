/**
 * SocialPulse AI - Centralized Platform Configuration
 * Defines content types, KPI cards, metrics, terminology, charts,
 * and platform-grounded AI insights for YouTube, Instagram, Pinterest, and X.
 */

(function () {
  'use strict';

  window.platformConfig = {
    youtube: {
      id: 'youtube',
      name: 'YouTube',
      badge: 'YouTube Data v3',
      icon: '▶',
      brandColor: '#ff0000',
      terminology: {
        itemSingular: 'Video',
        itemPlural: 'Videos',
        creatorRole: '348K Subscribers',
        selectorLabel: 'Active Video:',
        primaryMetric: 'Views',
        secondaryMetric: 'Watch Time',
        retentionLabel: 'Retention & Drop-Off',
        libraryTitle: 'Creator Video Library'
      },
      contentTypes: [
        { id: 'all', label: 'All Videos' },
        { id: 'videos', label: 'Long-form' },
        { id: 'shorts', label: 'Shorts' }
      ],
      kpis: [
        { id: 'views', title: 'Total Views', key: 'totalViews', trend: '↑ 18.4%', subtext: 'Across unique viewer sessions', icon: 'views' },
        { id: 'watchtime', title: 'Watch Time', key: 'watchTime', trend: '↑ 12.1%', subtext: 'Cumulative viewer hours', icon: 'clock' },
        { id: 'engagement', title: 'Engagement Rate', key: 'engagementRate', trend: '↑ 2.3%', subtext: 'Likes, comments & shares', icon: 'thumbs-up' },
        { id: 'retention', title: 'Average Retention', key: 'avgRetention', trend: '↑ 5.7%', subtext: 'Baseline benchmark: 58%', icon: 'activity' },
        { id: 'subscribers', title: 'Subscribers', key: 'subscribers', trend: '↑ 4.2%', subtext: 'Channel community affinity', icon: 'users' },
        { id: 'satisfaction', title: 'Satisfaction Score', key: 'satisfactionScore', max: '/100', trend: 'OPTIMAL', subtext: 'Retention + Rewatch + Sentiment', icon: 'award' }
      ],
      aiInsights: {
        topPerformingTitle: 'Top Performing Video/Short',
        topPerformingSub: 'Complete JavaScript Tutorial achieved 78.5% retention across 2.45M views.',
        coreRecommendation: 'Shorts with higher average view duration are performing better.',
        actionRecommendation: 'Double down on 45-60s rapid-hook Shorts to capture non-subscriber browse feed traffic.',
        cards: [
          {
            icon: '🔥',
            title: 'Top Performing Video/Short',
            what: 'Peak retention occurred between 01:10 and 02:05 with 94% viewer hold on long-form.',
            why: 'Clear practical demos with on-screen code snippets maintain the highest audience focus.',
            action: 'Shorts with higher average view duration are performing better. Adopt rapid demonstration pacing in your next upload intro.',
            accent: 'emerald'
          },
          {
            icon: '⚠',
            title: 'Major Drop-Off Anomaly',
            what: 'A sudden 17% drop occurred at 03:12 during an unscripted talking-head transition.',
            why: 'Viewer momentum halts when visuals remain static for longer than 8 seconds.',
            action: 'Insert a quick visual hook, b-roll footage, or motion graphic at 03:05.',
            accent: 'rose'
          },
          {
            icon: '🔁',
            title: 'Rewatch Hotspot',
            what: '02:10–02:35 reached a 2.8× replay multiplier across unique sessions.',
            why: 'Complex algorithm diagram prompted viewers to pause and scrub backward.',
            action: 'Turn this hotspot explanation diagram into a standalone YouTube Short.',
            accent: 'amber'
          },
          {
            icon: '💡',
            title: 'Best Video Topic & Format',
            what: 'Full-stack project walk-throughs outperform theoretical explainers by 2.6× in completion rate.',
            why: 'Audience seeks tangible proof-of-work skills and deployable code repos.',
            action: 'Schedule "Build & Deploy" titles as primary long-form format on Thursdays.',
            accent: 'indigo'
          },
          {
            icon: '📈',
            title: 'Growth Opportunity',
            what: 'Returning viewer satisfaction increased +14% compared to the 30-day baseline.',
            why: 'High cohort retention signals that audience trust and authority are solidifying.',
            action: 'Introduce a community poll for the next topic to reinforce viewer loyalty.',
            accent: 'indigo'
          },
          {
            icon: '🛡',
            title: 'Copyright Risk Radar Alert',
            what: 'Radar detected 52% similarity score with potential lo-fi background audio match on 02:15–02:47.',
            why: 'Audio stem overlap flagged for creator verification prior to algorithmic indexing.',
            action: 'Verify audio track clearance or swap the segment track in your editing timeline.',
            accent: 'amber'
          }
        ]
      }
    },

    instagram: {
      id: 'instagram',
      name: 'Instagram',
      badge: 'Meta Graph v19',
      icon: '◎',
      brandColor: '#e1306c',
      terminology: {
        itemSingular: 'Reel/Post',
        itemPlural: 'Reels & Posts',
        creatorRole: '185K Followers',
        selectorLabel: 'Active Reel/Post:',
        primaryMetric: 'Reach',
        secondaryMetric: 'Impressions',
        retentionLabel: 'Hook Intelligence',
        libraryTitle: 'Reels & Posts Library'
      },
      contentTypes: [
        { id: 'all', label: 'All Media' },
        { id: 'reels', label: 'Reels' },
        { id: 'posts', label: 'Carousels & Posts' }
      ],
      kpis: [
        { id: 'reach', title: 'Total Reach', key: 'totalReach', trend: '↑ 22.4%', subtext: 'Unique non-follower accounts reached', icon: 'users' },
        { id: 'impressions', title: 'Total Impressions', key: 'totalImpressions', trend: '↑ 19.8%', subtext: 'Cumulative reel & carousel views', icon: 'views' },
        { id: 'engagement', title: 'Engagement Rate', key: 'engagementRate', trend: '↑ 3.1%', subtext: 'Likes, comments & shares / reach', icon: 'thumbs-up' },
        { id: 'saves', title: 'Total Saves', key: 'saves', trend: '↑ 34.2%', subtext: 'Primary algorithmic bookmark signal', icon: 'bookmark' },
        { id: 'likes_comments', title: 'Likes & Comments', key: 'likesAndComments', trend: '↑ 15.6%', subtext: 'High-intent community feedback', icon: 'message-circle' },
        { id: 'satisfaction', title: 'Content Satisfaction Score', key: 'satisfactionScore', max: '/100', trend: 'HIGH', subtext: 'Hook Hold + Save Velocity + Reach', icon: 'award' }
      ],
      aiInsights: {
        topPerformingTitle: 'Top Performing Reel/Post',
        topPerformingSub: 'Developer Setup Reel captured 840K reach with 38.2K saves.',
        coreRecommendation: 'Reels with strong 3-second hook rates generate 2.4x higher profile reach.',
        actionRecommendation: 'Open next 5 reels with an on-screen text question in the first 1.5 seconds.',
        cards: [
          {
            icon: '🎬',
            title: 'Top Performing Reel/Post',
            what: '82% of viewers completed the opening 3-second hook on the "Developer Setup" reel.',
            why: 'High 3-second completion triggers Instagram Explore feed amplification.',
            action: 'Reels with strong 3-second hook rates generate 2.4x higher profile reach.',
            accent: 'emerald'
          },
          {
            icon: '📌',
            title: 'Best Content Type: Reels vs Carousels',
            what: '10-slide educational carousels generate 3.1× more saves than single image posts.',
            why: 'Carousels provide swipe-through reference utility that viewers bookmark.',
            action: 'Pair every high-performing Reel with a companion 7-slide reference carousel.',
            accent: 'indigo'
          },
          {
            icon: '⚡',
            title: 'Save Rate & Share Velocity',
            what: 'Save-to-like ratio reached 0.42 (benchmark is 0.15) on design cheatsheets.',
            why: 'Save density is Instagram\'s #1 ranking signal for account recommendations.',
            action: 'Add clear "Save this guide for your next build" CTA on the final slide.',
            accent: 'amber'
          },
          {
            icon: '🛡',
            title: 'Meta Sound & Audio Clearance',
            what: 'All reels verified using Meta Sound Collection commercial library.',
            why: 'Commercial license tracks prevent regional muting in EU/APAC territories.',
            action: 'Continue prioritizing cleared commercial audio library selections.',
            accent: 'cyan'
          }
        ]
      }
    },

    pinterest: {
      id: 'pinterest',
      name: 'Pinterest',
      badge: 'Pinterest v5 API',
      icon: '📌',
      brandColor: '#e60023',
      terminology: {
        itemSingular: 'Pin',
        itemPlural: 'Pins',
        creatorRole: '420K Monthly Viewers',
        selectorLabel: 'Active Pin:',
        primaryMetric: 'Impressions',
        secondaryMetric: 'Saves',
        retentionLabel: 'Pin Telemetry',
        libraryTitle: 'Published Pins & Idea Boards'
      },
      contentTypes: [
        { id: 'all', label: 'All Pins' },
        { id: 'standard', label: 'Static Pins' },
        { id: 'idea', label: 'Idea Pins' }
      ],
      kpis: [
        { id: 'impressions', title: 'Total Impressions', key: 'totalImpressions', trend: '↑ 18.4%', subtext: 'Cumulative pin impressions in feed', icon: 'views' },
        { id: 'pin_clicks', title: 'Pin Clicks', key: 'pinClicks', trend: '↑ 14.2%', subtext: 'Close-up inspections on pins', icon: 'zoom-in' },
        { id: 'saves', title: 'Saves (Repins)', key: 'saves', trend: '↑ 24.6%', subtext: 'Pins saved to user boards', icon: 'bookmark' },
        { id: 'outbound', title: 'Outbound Clicks', key: 'outboundClicks', trend: '↑ 12.8%', subtext: 'High-intent traffic to creator website', icon: 'external-link' },
        { id: 'save_rate', title: 'Save Rate', key: 'saveRate', trend: '↑ 0.4%', subtext: 'Industry benchmark: 1.8%', icon: 'percent' },
        { id: 'engagement_rate', title: 'Engagement Rate', key: 'engagementRate', trend: '↑ 1.1%', subtext: 'Pin clicks + saves / impressions', icon: 'award' }
      ],
      aiInsights: {
        topPerformingTitle: 'Top Performing Pin',
        topPerformingSub: 'Modern Architecture Cheat Sheet generated 3.4% save rate and 8,420 outbound clicks.',
        coreRecommendation: 'Pins with higher save rates are performing better.',
        actionRecommendation: 'Produce high-contrast vertical infographics (2:3 ratio) to dominate visual search feeds.',
        cards: [
          {
            icon: '📌',
            title: 'Top Performing Pin',
            what: '"Modern Architecture Cheat Sheet" achieved 3.4% save rate — 88% above category benchmark.',
            why: 'High save rates trigger Pinterest\'s visual discovery engine to recommend pins in related feeds.',
            action: 'Pins with higher save rates are performing better. Create a 3-part sequel infographic series.',
            accent: 'emerald'
          },
          {
            icon: '📂',
            title: 'Top Performing Board',
            what: '"Tech & Architecture" board drives 48% of total creator impressions and 62% of saves.',
            why: 'Topic cohesion allows Pinterest search algorithms to categorize your profile authority.',
            action: 'Pin at least 5 new vertical visual assets per week directly to this board.',
            accent: 'indigo'
          },
          {
            icon: '🔗',
            title: 'Outbound Click Intent',
            what: 'Pin clicks to outbound clicks conversion rate is 26.4%, showing strong high-intent traffic.',
            why: 'Pinners clicking through are pre-qualified for GitHub repos, newsletter signups, and docs.',
            action: 'Add a dedicated fast-loading interactive landing page on your domain destination URL.',
            accent: 'amber'
          },
          {
            icon: '🎨',
            title: 'Best Pin Topic & Visual Content',
            what: 'Infographics with dark backgrounds and neon accents receive 42% higher click-throughs.',
            why: 'Contrasting visual cards stand out immediately on Pinterest\'s light discovery feed.',
            action: 'Standardize on high-contrast 1000x1500px aspect ratio templates.',
            accent: 'rose'
          }
        ]
      }
    },

    x: {
      id: 'x',
      name: 'X',
      badge: 'X API v2',
      icon: '𝕏',
      brandColor: '#1d9bf0',
      terminology: {
        itemSingular: 'Post',
        itemPlural: 'Posts',
        creatorRole: '94K Followers',
        selectorLabel: 'Active Post:',
        primaryMetric: 'Impressions',
        secondaryMetric: 'Reposts',
        retentionLabel: 'Engagement Velocity',
        libraryTitle: 'Published Posts & Threads'
      },
      contentTypes: [
        { id: 'all', label: 'All Posts' },
        { id: 'threads', label: 'Threads' },
        { id: 'media', label: 'Media Posts' }
      ],
      kpis: [
        { id: 'impressions', title: 'Total Impressions', key: 'totalImpressions', trend: '↑ 26.5%', subtext: 'Timeline views & algorithm impressions', icon: 'views' },
        { id: 'reposts', title: 'Reposts', key: 'reposts', trend: '↑ 19.4%', subtext: 'Organic virality and secondary reach', icon: 'repeat' },
        { id: 'bookmarks', title: 'Bookmarks', key: 'bookmarks', trend: '↑ 32.1%', subtext: 'High-utility reference saves', icon: 'bookmark' },
        { id: 'likes', title: 'Likes', key: 'likes', trend: '↑ 15.8%', subtext: 'Audience agreement and sentiment signal', icon: 'heart' },
        { id: 'replies', title: 'Replies', key: 'replies', trend: '↑ 8.4%', subtext: 'Active discussion and conversation threads', icon: 'message-square' },
        { id: 'engagement_rate', title: 'Engagement Rate', key: 'engagementRate', trend: '↑ 0.9%', subtext: 'X professional benchmark: 3.5%', icon: 'award' }
      ],
      aiInsights: {
        topPerformingTitle: 'Top Performing Post',
        topPerformingSub: '10 System Architecture Rules reached 640K impressions and 4.2K reposts.',
        coreRecommendation: 'Posts receiving more reposts are generating stronger engagement.',
        actionRecommendation: 'Format actionable insights as numbered lists with bullet points to maximize repost velocity.',
        cards: [
          {
            icon: '𝕏',
            title: 'Top Performing Post',
            what: '"10 System Architecture Rules" achieved 640K impressions with a 6.2% engagement rate.',
            why: 'High bookmark and repost density triggered X\'s recommendation algorithm across tech feeds.',
            action: 'Posts receiving more reposts are generating stronger engagement. Post comprehensive technical breakdowns.',
            accent: 'emerald'
          },
          {
            icon: '💬',
            title: 'Conversation & Discussion Patterns',
            what: 'Replies in the first 30 minutes generate a 3.8× lift in subsequent 24-hour impressions.',
            why: 'X prioritizes active conversation velocity to determine which posts rank on For You feeds.',
            action: 'Actively engage and reply to early comments within 20 minutes of publication.',
            accent: 'indigo'
          },
          {
            icon: '🔖',
            title: 'Bookmark Velocity',
            what: 'Bookmark-to-like ratio reached 0.58 on technical code checklists.',
            why: 'Users bookmark reference material to review later on desktop browsers.',
            action: 'Include explicit "Bookmark this for your next code review" prompt at thread conclusions.',
            accent: 'amber'
          },
          {
            icon: '📊',
            title: 'Best Post Format (Threads vs Single)',
            what: '6-part numbered threads generate 4.8× more profile clicks than standalone single tweets.',
            why: 'Readers inspect author profile after finishing comprehensive multi-tweet threads.',
            action: 'Structure high-value technical topics as concise 5-7 post threads on Tuesday mornings.',
            accent: 'cyan'
          }
        ]
      }
    }
  };
})();
