/**
 * DHRISTI (दृष्टि) AI - Multi-Platform Content Publisher with Live Camera & Blockchain Provenance
 * Allows creators to upload or capture photos & record reels directly via device camera,
 * auto-generates perceptual hashes, registers content in the Provenance Ledger, and updates live feeds.
 */

(function () {
  'use strict';

  let mediaStream = null;
  let mediaRecorder = null;
  let recordedChunks = [];
  let capturedMediaData = null; // { type: 'image'|'video', dataUrl, blob }
  let selectedPlatform = 'instagram';
  let isRecording = false;

  window.openCreatorPublishModal = function (defaultPlatform) {
    if (defaultPlatform) selectedPlatform = defaultPlatform;
    else if (window.currentPlatform) selectedPlatform = window.currentPlatform;

    let modal = document.getElementById('creator-publish-modal');
    if (!modal) {
      renderPublishModal();
      modal = document.getElementById('creator-publish-modal');
    }

    // Pre-select platform
    document.querySelectorAll('.platform-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.platform === selectedPlatform);
    });

    modal.classList.add('active');
  };

  window.closeCreatorPublishModal = function () {
    const modal = document.getElementById('creator-publish-modal');
    if (modal) modal.classList.remove('active');
    stopCamera();
  };

  function renderPublishModal() {
    const modal = document.createElement('div');
    modal.id = 'creator-publish-modal';
    modal.className = 'creator-publish-modal';
    modal.innerHTML = `
      <div class="publish-card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--border-glass); padding-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #00f2fe, #6366f1); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
              📸
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; color: var(--gov-navy); font-family: 'Outfit', sans-serif; font-weight: 700;">
                दृष्टि Creator Publisher
              </h3>
              <p style="margin: 0; font-size: 0.75rem; color: var(--text-secondary);">
                Capture with Camera or Attach Media &bull; Multi-Platform Sync
              </p>
            </div>
          </div>
          <button type="button" onclick="window.closeCreatorPublishModal()" style="background: none; border: none; color: var(--text-tertiary); font-size: 1.4rem; cursor: pointer;">&times;</button>
        </div>

        <!-- Target Platform Selection -->
        <div style="margin-bottom: 14px;">
          <label style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-bottom: 6px;">
            TARGET PLATFORM (लक्ष्य प्लेटफॉर्म):
          </label>
          <div class="platform-pill-group">
            <button type="button" class="platform-pill active" data-platform="youtube" onclick="window.selectPublishPlatform('youtube')">
              <span>▶</span> YouTube (Video / Short)
            </button>
            <button type="button" class="platform-pill" data-platform="instagram" onclick="window.selectPublishPlatform('instagram')">
              <span>◎</span> Instagram (Reel / Post)
            </button>
            <button type="button" class="platform-pill" data-platform="pinterest" onclick="window.selectPublishPlatform('pinterest')">
              <span>📌</span> Pinterest (Pin)
            </button>
            <button type="button" class="platform-pill" data-platform="x" onclick="window.selectPublishPlatform('x')">
              <span>𝕏</span> X (Post / Media)
            </button>
            <button type="button" class="platform-pill" data-platform="facebook" onclick="window.selectPublishPlatform('facebook')">
              <span>f</span> Facebook
            </button>
            <button type="button" class="platform-pill" data-platform="telegram" onclick="window.selectPublishPlatform('telegram')">
              <span>✈</span> Telegram
            </button>
          </div>
        </div>

        <!-- Camera Preview Container -->
        <div id="camera-viewfinder-box" class="camera-preview-container">
          <video id="camera-live-feed" class="camera-video-feed" autoplay playsinline muted></video>
          <div class="camera-overlay-controls">
            <button type="button" id="btn-snap-photo" onclick="window.snapCameraPhoto()" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.8rem; background: rgba(0,242,254,0.9); color: #000;">
              📷 Take Photo
            </button>
            <button type="button" id="btn-record-reel" onclick="window.toggleRecordReel()" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.8rem; background: #f43f5e; color: #fff;">
              🔴 <span id="record-btn-text">Record Reel</span>
            </button>
            <button type="button" onclick="window.stopCameraFeed()" class="btn btn-secondary" style="padding: 8px 14px; font-size: 0.8rem;">
              Cancel Camera
            </button>
          </div>
          <div id="recording-timer" style="display: none; position: absolute; top: 12px; left: 12px; background: rgba(244,63,94,0.85); color: #fff; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-family: 'JetBrains Mono'; font-weight: 700;">
            REC 00:00
          </div>
        </div>

        <!-- Captured / Uploaded Media Preview -->
        <div id="media-preview-box" style="display: none; margin-bottom: 16px; border: 1px solid var(--border-glass); border-radius: 12px; overflow: hidden; background: #000; text-align: center; position: relative;">
          <img id="media-preview-img" src="" alt="Captured media" style="display: none; max-height: 220px; width: 100%; object-fit: contain;">
          <video id="media-preview-video" src="" controls style="display: none; max-height: 220px; width: 100%; object-fit: contain;"></video>
          <button type="button" onclick="window.clearCapturedMedia()" style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.2); color: #fff; border-radius: 50%; width: 26px; height: 26px; cursor: pointer;">&times;</button>
        </div>

        <!-- Media Actions (Open Camera or File Upload) -->
        <div style="display: flex; gap: 10px; margin-bottom: 18px;">
          <button type="button" onclick="window.startCameraFeed()" class="btn btn-secondary" style="flex: 1; padding: 10px; font-size: 0.82rem; justify-content: center; gap: 6px; border-color: var(--brand-cyan); color: var(--brand-cyan);">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <span>Open Camera to Post / Reel</span>
          </button>

          <label class="btn btn-secondary" style="flex: 1; padding: 10px; font-size: 0.82rem; justify-content: center; gap: 6px; cursor: pointer;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
            <span>Attach Photo / Video</span>
            <input type="file" id="publish-file-input" accept="image/*,video/*" style="display: none;" onchange="window.handlePublishFileSelect(event)">
          </label>
        </div>

        <!-- Content Form -->
        <form onsubmit="window.handlePublishSubmit(event)">
          <div style="margin-bottom: 14px;">
            <label style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-bottom: 4px;">
              TITLE / HEADLINE:
            </label>
            <input type="text" id="publish-input-title" class="input-box" placeholder="e.g. 3 Viral Hook Rules for High Retention" required style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 9px 12px; color: var(--text-primary); font-size: 0.85rem;">
          </div>

          <div style="margin-bottom: 14px;">
            <label style="font-size: 0.78rem; color: var(--text-secondary); display: block; margin-bottom: 4px;">
              CAPTION / SCRIPT / DESCRIPTION:
            </label>
            <textarea id="publish-input-caption" rows="3" class="input-box" placeholder="Enter caption, hashtags (#AI #CreatorEconomy #Dhristi), and key takeaway..." style="width: 100%; background: var(--bg-input); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 9px 12px; color: var(--text-primary); font-size: 0.82rem; resize: vertical;"></textarea>
          </div>

          <!-- Provenance Checkbox (Section 12 & 13) -->
          <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; padding: 10px 14px; margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.78rem; color: #f8fafc;">
              <input type="checkbox" id="publish-chk-provenance" checked style="accent-color: var(--accent-emerald);">
              <span>Auto-Register Perceptual Fingerprint into Blockchain Provenance</span>
            </label>
            <span style="font-size: 0.7rem; color: var(--accent-emerald); font-family: 'JetBrains Mono'; font-weight: 700;">SHA-256 + PROVENANCE</span>
          </div>

          <button type="submit" id="btn-publish-submit" class="btn btn-primary" style="width: 100%; padding: 12px; justify-content: center; font-size: 0.9rem; font-weight: 700; background: linear-gradient(135deg, #00f2fe, #4facfe, #6366f1); border: none;">
            <span>🚀 Publish & Synchronize to Platform</span>
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  window.selectPublishPlatform = function (platform) {
    selectedPlatform = platform;
    document.querySelectorAll('.platform-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.platform === platform);
    });
  };

  // Camera Handlers
  window.startCameraFeed = async function () {
    const box = document.getElementById('camera-viewfinder-box');
    const video = document.getElementById('camera-live-feed');
    if (!box || !video) return;

    try {
      if (mediaStream) stopCamera();
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: true
      });
      video.srcObject = mediaStream;
      box.classList.add('active');
    } catch (err) {
      console.warn('Camera access error:', err);
      // Create canvas fallback mock simulation if physical camera unavailable or blocked
      simulateCameraPreview(box, video);
    }
  };

  function simulateCameraPreview(box, video) {
    box.classList.add('active');
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 640, 360);
    ctx.fillStyle = '#ff9933';
    ctx.font = '20px Outfit, sans-serif';
    ctx.fillText('दृष्टि Live Studio Viewfinder (Simulation)', 140, 160);
    ctx.font = '14px JetBrains Mono, monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Camera sensor ready • Ready to snap or record', 150, 200);

    const stream = canvas.captureStream(30);
    video.srcObject = stream;
    mediaStream = stream;
    if (window.showToast) window.showToast('Camera active in studio mode.');
  }

  window.stopCameraFeed = function () {
    stopCamera();
    const box = document.getElementById('camera-viewfinder-box');
    if (box) box.classList.remove('active');
  };

  function stopCamera() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      mediaStream = null;
    }
  }

  window.snapCameraPhoto = function () {
    const video = document.getElementById('camera-live-feed');
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg');
    capturedMediaData = { type: 'image', dataUrl };
    showMediaPreview('image', dataUrl);
    window.stopCameraFeed();
    if (window.showToast) window.showToast('Photo captured successfully!');
  };

  let recInterval = null;
  let recSeconds = 0;

  window.toggleRecordReel = function () {
    if (!isRecording) {
      startRecordingReel();
    } else {
      stopRecordingReel();
    }
  };

  function startRecordingReel() {
    if (!mediaStream) return;
    recordedChunks = [];
    try {
      mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorder.ondataavailable = e => {
        if (e.data.size > 0) recordedChunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        capturedMediaData = { type: 'video', dataUrl: videoUrl, blob };
        showMediaPreview('video', videoUrl);
        window.stopCameraFeed();
        if (window.showToast) window.showToast('Reel recorded successfully!');
      };
      mediaRecorder.start();
      isRecording = true;
      document.getElementById('record-btn-text').textContent = 'Stop Reel';
      const timer = document.getElementById('recording-timer');
      if (timer) {
        timer.style.display = 'block';
        recSeconds = 0;
        recInterval = setInterval(() => {
          recSeconds++;
          const m = String(Math.floor(recSeconds / 60)).padStart(2, '0');
          const s = String(recSeconds % 60).padStart(2, '0');
          timer.textContent = `REC ${m}:${s}`;
        }, 1000);
      }
    } catch (e) {
      console.warn('Recording error:', e);
    }
  }

  function stopRecordingReel() {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      isRecording = false;
      document.getElementById('record-btn-text').textContent = 'Record Reel';
      clearInterval(recInterval);
      const timer = document.getElementById('recording-timer');
      if (timer) timer.style.display = 'none';
    }
  }

  function showMediaPreview(type, url) {
    const box = document.getElementById('media-preview-box');
    const img = document.getElementById('media-preview-img');
    const vid = document.getElementById('media-preview-video');
    if (!box) return;

    box.style.display = 'block';
    if (type === 'image') {
      img.src = url;
      img.style.display = 'block';
      vid.style.display = 'none';
    } else {
      vid.src = url;
      vid.style.display = 'block';
      img.style.display = 'none';
    }
  }

  window.clearCapturedMedia = function () {
    capturedMediaData = null;
    const box = document.getElementById('media-preview-box');
    if (box) box.style.display = 'none';
  };

  window.handlePublishFileSelect = function (event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const isVideo = file.type.startsWith('video');
    reader.onload = function (e) {
      capturedMediaData = { type: isVideo ? 'video' : 'image', dataUrl: e.target.result, file };
      showMediaPreview(isVideo ? 'video' : 'image', e.target.result);
      if (window.showToast) window.showToast(`Selected: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  // Submit and Publish
  window.handlePublishSubmit = async function (e) {
    if (e) e.preventDefault();
    const btn = document.getElementById('btn-publish-submit');
    const titleInput = document.getElementById('publish-input-title');
    const captionInput = document.getElementById('publish-input-caption');
    const provenanceChk = document.getElementById('publish-chk-provenance');

    const title = titleInput ? titleInput.value.trim() : 'New Content';
    const caption = captionInput ? captionInput.value.trim() : '';
    const registerProvenance = provenanceChk ? provenanceChk.checked : true;

    btn.disabled = true;
    btn.innerHTML = '<span>Publishing & Fingerprinting...</span>';

    try {
      const newId = `${selectedPlatform}-${Date.now().toString().slice(-4)}`;
      const newPostItem = {
        id: newId,
        title: title,
        caption: caption,
        duration: capturedMediaData?.type === 'video' ? '0:22' : 'Photo',
        views: '1',
        reach: '1',
        likes: '0',
        comments: '0',
        shares: '0',
        timestamp: new Date().toISOString(),
        publishedJustNow: true
      };

      // Register with Provenance Ledger if checked
      if (registerProvenance && window.SocialPulseAPI) {
        try {
          await window.SocialPulseAPI.registerProvenance({
            id: newId,
            title: title,
            duration: newPostItem.duration,
            creatorId: 'alexvance_tech'
          });
        } catch (apiErr) {
          console.warn('Provenance register fallback:', apiErr);
        }
      }

      // Add to in-memory platform dataset live
      if (window.SOCIALPULSE_DATA) {
        if (selectedPlatform === 'youtube') {
          window.SOCIALPULSE_DATA.videos.unshift({
            ...newPostItem,
            duration: '03:45',
            views: '1,200',
            viewsNumeric: 1200,
            watchTimeHours: '45.0',
            engagementRate: '9.4%',
            avgRetention: '68.0%',
            completionRate: '42.0%',
            rewatchRate: '1.4x',
            satisfactionScore: 88,
            scoreBreakdown: { retention: 85, engagement: 88, rewatch: 82, sentiment: 92 },
            retentionCurve: [
              { time: '0:00', seconds: 0, percent: 100 },
              { time: '1:00', seconds: 60, percent: 85 },
              { time: '2:00', seconds: 120, percent: 76 },
              { time: '3:00', seconds: 180, percent: 68 }
            ],
            rewatchHotspots: []
          });
          if (window.selectVideo) window.selectVideo(newId);
        } else if (selectedPlatform === 'instagram' && window.SOCIALPULSE_DATA.instagram) {
          window.SOCIALPULSE_DATA.instagram.reels.unshift(newPostItem);
          if (window.CREATOR_PLATFORM_DATA?.instagram) {
            window.CREATOR_PLATFORM_DATA.instagram.recentPosts.unshift({
              id: newId,
              title: title,
              views: '1.2K',
              likes: '480',
              shares: '88',
              sentiment: '96% Positive',
              retentionPct: '74%',
              timeAgo: 'Just now'
            });
          }
          if (window.renderAllInstagramViews) window.renderAllInstagramViews();
          if (window.selectReel) window.selectReel(newId);
        } else if (selectedPlatform === 'pinterest' && window.SOCIALPULSE_DATA.pinterest) {
          window.SOCIALPULSE_DATA.pinterest.pins.unshift({
            ...newPostItem,
            board: 'Creator Studio',
            impressions: '120',
            pinClicks: '14',
            saves: '8',
            outboundClicks: '2'
          });
          if (window.CREATOR_PLATFORM_DATA?.pinterest) {
            window.CREATOR_PLATFORM_DATA.pinterest.recentPosts.unshift({
              id: newId,
              title: title,
              views: '840',
              likes: '92',
              shares: '34',
              sentiment: '94% Positive',
              retentionPct: '68%',
              timeAgo: 'Just now'
            });
          }
          if (window.renderAllPinterestViews) window.renderAllPinterestViews();
          if (window.selectPin) window.selectPin(newId);
        } else if (selectedPlatform === 'x' && window.SOCIALPULSE_DATA.x) {
          window.SOCIALPULSE_DATA.x.posts.unshift({
            ...newPostItem,
            impressions: '840',
            reposts: '12',
            bookmarks: '24'
          });
          if (window.CREATOR_PLATFORM_DATA?.x) {
            window.CREATOR_PLATFORM_DATA.x.recentPosts.unshift({
              id: newId,
              title: title,
              views: '2.4K',
              likes: '140',
              shares: '68',
              sentiment: '91% Positive',
              retentionPct: '62%',
              timeAgo: 'Just now'
            });
          }
          if (window.renderAllXViews) window.renderAllXViews();
          if (window.selectPost) window.selectPost(newId);
        } else if (selectedPlatform === 'facebook' && window.DrishtiDemo && window.DrishtiDemo.store.facebook) {
          window.DrishtiDemo.store.facebook.posts.unshift({
            ...newPostItem,
            views: '2,400',
            likes: '180',
            comments: '24',
            shares: '41',
            reach: '6,200',
            engagementRate: '4.1%',
            reactions: '210',
            dataStatus: window.DrishtiDemo.SIM_LABEL,
            published: 'Just now'
          });
          if (window.renderAllFacebookViews) window.renderAllFacebookViews();
        } else if (selectedPlatform === 'telegram' && window.DrishtiDemo && window.DrishtiDemo.store.telegram) {
          window.DrishtiDemo.store.telegram.posts.unshift({
            ...newPostItem,
            views: '980',
            likes: '44',
            comments: '9',
            shares: '120',
            forwards: '120',
            reach: '980',
            engagementRate: '12.2%',
            dataStatus: window.DrishtiDemo.SIM_LABEL,
            published: 'Just now'
          });
          if (window.renderAllTelegramViews) window.renderAllTelegramViews();
        }
      }

      window.closeCreatorPublishModal();

      if (window.showToast) {
        window.showToast(`Demo publish: "${title}" added to ${selectedPlatform.toUpperCase()} simulated dataset`);
      }

      // Switch to the platform so the user immediately sees their new post
      if (window.selectPlatform) window.selectPlatform(selectedPlatform);

      // Trigger realtime fluctuating live audience surge on newly published content
      if (window.setAudienceBaseForContent) {
        window.setAudienceBaseForContent('1,850,000');
      }
      const hdrAudiencePill = document.getElementById('header-live-audience-pill');
      if (hdrAudiencePill) hdrAudiencePill.style.display = 'inline-flex';

    } catch (err) {
      console.error('Publish error:', err);
      if (window.showToast) window.showToast('Publish failed: ' + err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span>🚀 Publish & Synchronize to Platform</span>';
    }
  };

})();
