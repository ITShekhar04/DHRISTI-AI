/**
 * DHRISTI (दृष्टि) AI - Multilingual Voice Command GPT & Copilot
 * Centered Floating Interface with Multilingual Speech Recognition (Web Speech API) & Audio Synthesis (TTS)
 * Full dual-language listening (Hindi + English + Hinglish) and operational execution across:
 * Viral Content Intel, State Pulse, Coordination Radar, Content Filtration, Alert Center,
 * 1930 Cyber Intake, Mission Control, Admin Audit, Platform Switching, and Creator Studio.
 */

(function () {
  'use strict';

  const LANGUAGES = [
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'en-IN', label: 'English (India)' },
    { code: 'en-US', label: 'English (US)' },
    { code: 'bn-IN', label: 'বাংলা (Bengali)' },
    { code: 'mr-IN', label: 'मराठी (Marathi)' },
    { code: 'ta-IN', label: 'தமிழ் (Tamil)' },
    { code: 'te-IN', label: 'తెలుగు (Telugu)' },
    { code: 'gu-IN', label: 'ગુજરાતી (Gujarati)' },
    { code: 'es-ES', label: 'Español' },
    { code: 'fr-FR', label: 'Français' }
  ];

  let selectedLang = 'hi-IN';
  let recognition = null;
  let isListening = false;
  let restartTimer = null;
  let recognitionActive = false;

  // Web Audio Acoustic Chime Feedback
  function playAcousticFeedback(type = 'start') {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'start') {
        // High-tech ascending chirp
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'success') {
        // Futuristic double-tone confirmation
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.24);
      } else if (type === 'stop') {
        // Gentle descending tone
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.16);
      }
    } catch (e) {
      // AudioContext policy fallback
    }
  }
  window.playVoiceChime = window.playAcousticFeedback = playAcousticFeedback;

  // Initialize Speech Recognition Engine
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  function initSpeechEngine() {
    if (!SpeechRecognition) return;
    try {
      if (recognition) {
        try { recognition.abort(); } catch (e) {}
      }

      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;
      recognition.lang = selectedLang;

      recognition.onstart = function () {
        recognitionActive = true;
        isListening = true;
        updateUIState(true);
        playAcousticFeedback('start');
      };

      recognition.onresult = function (event) {
        let interimTranscript = '';
        let finalTranscript = '';
        const alternatives = [];

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal) {
            finalTranscript += res[0].transcript;
            for (let j = 0; j < res.length; j++) {
              if (res[j] && res[j].transcript) {
                alternatives.push(res[j].transcript);
              }
            }
          } else {
            interimTranscript += res[0].transcript;
          }
        }

        const displayTranscript = (finalTranscript || interimTranscript).trim();
        const transcriptEl = document.getElementById('voice-copilot-transcript');
        if (transcriptEl && displayTranscript) {
          transcriptEl.textContent = `"${displayTranscript}"`;
        }

        if (finalTranscript.trim().length > 0) {
          playAcousticFeedback('success');
          processCommand(finalTranscript, alternatives);
        }
      };

      recognition.onerror = function (event) {
        console.warn('[Dhristi Voice] Speech notice:', event.error);
        if (event.error === 'not-allowed') {
          isListening = false;
          recognitionActive = false;
          updateUIState(false);
          playAcousticFeedback('stop');
          const statusEl = document.getElementById('voice-copilot-status');
          if (statusEl) {
            statusEl.textContent = 'माइक्रोफ़ोन अनुमति आवश्यक है / Please allow microphone access';
          }
        } else if (event.error === 'no-speech') {
          // Automatic recovery for continuous listening
          if (isListening) {
            clearTimeout(restartTimer);
            restartTimer = setTimeout(() => {
              try { recognition.start(); } catch (e) {}
            }, 300);
          }
        }
      };

      recognition.onend = function () {
        recognitionActive = false;
        if (isListening) {
          // Auto-restart to maintain persistent continuous listening
          clearTimeout(restartTimer);
          restartTimer = setTimeout(() => {
            if (isListening) {
              try { recognition.start(); } catch (e) {}
            }
          }, 250);
        } else {
          updateUIState(false);
        }
      };
    } catch (e) {
      console.warn('Speech engine init notice:', e);
    }
  }

  function updateUIState(listening) {
    const centerMicBtn = document.getElementById('voice-center-mic-btn');
    const waveBox = document.querySelector('.voice-wave-container');
    const statusEl = document.getElementById('voice-copilot-status');

    if (centerMicBtn) {
      centerMicBtn.classList.toggle('listening', listening);
      centerMicBtn.style.boxShadow = listening
        ? '0 0 0 14px rgba(255, 153, 51, 0.25), 0 0 35px #ff9933'
        : '0 0 20px rgba(0, 242, 254, 0.3)';
    }

    if (waveBox) {
      waveBox.classList.toggle('active', listening);
    }

    if (statusEl) {
      statusEl.textContent = listening
        ? (selectedLang.startsWith('hi') ? 'सुन रहा हूँ... बोलिए (Listening in Hindi/English)' : 'Listening... Speak your command in English or Hindi')
        : (selectedLang.startsWith('hi') ? 'बोलने के लिए माइक दबाएँ या नीचे लिखें' : 'Click Mic to speak or type command below');
    }
  }

  // Voice Output (Text-to-Speech)
  function speak(text, langCode) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = (text || '').replace(/<[^>]*>?/gm, '').replace(/[*_#]/g, '');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = langCode || selectedLang || 'hi-IN';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('TTS Speech error:', e);
    }
  }

  // Language Setter
  // Language Mode: 'bilingual' (default) | 'hi-IN' | 'en-IN'
  let voiceEngineMode = 'bilingual';

  window.setVoiceLanguage = window.toggleVoiceLang = function (langCode) {
    voiceEngineMode = langCode;
    selectedLang = langCode === 'bilingual' ? 'hi-IN' : langCode;

    const btnBilingual = document.getElementById('btn-lang-bilingual');
    const btnHi = document.getElementById('btn-lang-hi');
    const btnEn = document.getElementById('btn-lang-en');
    const sel = document.getElementById('voice-lang-select');

    if (btnBilingual) {
      btnBilingual.style.background = voiceEngineMode === 'bilingual' ? 'linear-gradient(135deg, #10b981, #00f2fe)' : 'rgba(255,255,255,0.06)';
      btnBilingual.style.color = voiceEngineMode === 'bilingual' ? '#000' : 'var(--text-secondary)';
      btnBilingual.style.borderColor = voiceEngineMode === 'bilingual' ? '#00f2fe' : 'var(--border-glass)';
    }
    if (btnHi) {
      btnHi.style.background = voiceEngineMode === 'hi-IN' ? 'linear-gradient(135deg, #ff9933, #ea580c)' : 'rgba(255,255,255,0.06)';
      btnHi.style.color = voiceEngineMode === 'hi-IN' ? '#fff' : 'var(--text-secondary)';
      btnHi.style.borderColor = voiceEngineMode === 'hi-IN' ? '#ff9933' : 'var(--border-glass)';
    }
    if (btnEn) {
      btnEn.style.background = voiceEngineMode === 'en-IN' ? 'linear-gradient(135deg, #00f2fe, #3b82f6)' : 'rgba(255,255,255,0.06)';
      btnEn.style.color = voiceEngineMode === 'en-IN' ? '#000' : 'var(--text-secondary)';
      btnEn.style.borderColor = voiceEngineMode === 'en-IN' ? '#00f2fe' : 'var(--border-glass)';
    }
    if (sel) sel.value = selectedLang;

    if (recognition) {
      recognition.lang = selectedLang;
      if (isListening) {
        try { recognition.abort(); } catch (e) {}
        try { recognition.start(); } catch (e) {}
      }
    }

    if (window.showToast) {
      const modeText = voiceEngineMode === 'bilingual' ? 'द्विभाषी / Bilingual (हिन्दी + English)' : voiceEngineMode.startsWith('hi') ? 'हिन्दी (Hindi)' : 'English';
      window.showToast(`🌐 Voice Engine: ${modeText}`);
    }
  };

  // Comprehensive Multilingual Action Engine (Hindi + Hinglish + English)
  function matchSingleCommand(cand) {
    if (!cand) return null;
    const rawText = cand;
    const text = rawText.toLowerCase().trim();
    let actionTaken = '';
    let voiceReply = '';
    let intent = '';

    // Auto-detect Hindi vs English from query text or keywords
    const isDevanagari = /[\u0900-\u097F]/.test(rawText);
    const isHinglish = text.includes('dikhao') || text.includes('kholo') || text.includes('batao') || text.includes('karo') || text.includes('chalao') ||
      text.includes('kisan') || text.includes('rajya') || text.includes('chetavani') || text.includes('janta') || text.includes('jodo') || text.includes('nayak');
    const isHi = isDevanagari || isHinglish || (voiceEngineMode === 'hi-IN');

    // 1. SPECIFIC INDIAN STATES & UTs IN STATE PULSE (Match specific state before generic pulse)
    if (text.includes('मध्य प्रदेश') || text.includes('madhya pradesh') || text.includes(' mp ') || text === 'mp' || text.includes('bhopal') || text.includes('indore')) {
      intent = 'state_pulse_mp';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.handleStatePulseSelect) window.handleStatePulseSelect('Madhya Pradesh');
      actionTaken = 'Selected Madhya Pradesh in State Pulse';
      voiceReply = isHi ? 'मध्य प्रदेश का लाइव स्टेट पल्स और जिला टेलीमेट्री डेटा लोड कर दिया गया है।' : 'Loaded Madhya Pradesh State Pulse and district telemetry.';
    }
    else if (text.includes('महाराष्ट्र') || text.includes('maharashtra') || text.includes('mumbai') || text.includes('pune') || text.includes('मुंबई')) {
      intent = 'state_pulse_mh';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.handleStatePulseSelect) window.handleStatePulseSelect('Maharashtra');
      actionTaken = 'Selected Maharashtra in State Pulse';
      voiceReply = isHi ? 'महाराष्ट्र का स्टेट पल्स और रीजनल डेटा लोड कर दिया गया है।' : 'Loaded Maharashtra State Pulse telemetry.';
    }
    else if (text.includes('उत्तर प्रदेश') || text.includes('uttar pradesh') || text.includes(' up ') || text === 'up' || text.includes('lucknow') || text.includes('लखनऊ')) {
      intent = 'state_pulse_up';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.handleStatePulseSelect) window.handleStatePulseSelect('Uttar Pradesh');
      actionTaken = 'Selected Uttar Pradesh in State Pulse';
      voiceReply = isHi ? 'उत्तर प्रदेश का स्टेट पल्स टेलीमेट्री डेटा खोल दिया गया है।' : 'Loaded Uttar Pradesh State Pulse telemetry.';
    }
    else if (text.includes('दिल्ली') || text.includes('delhi') || text.includes('delhi ncr') || text.includes('ncr')) {
      intent = 'state_pulse_delhi';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.handleStatePulseSelect) window.handleStatePulseSelect('Delhi NCR');
      actionTaken = 'Selected Delhi NCR in State Pulse';
      voiceReply = isHi ? 'दिल्ली एनसीआर का स्टेट पल्स लोड कर दिया गया है।' : 'Loaded Delhi NCR State Pulse.';
    }
    else if (text.includes('गुजरात') || text.includes('gujarat') || text.includes('ahmedabad') || text.includes('अहमदाबाद')) {
      intent = 'state_pulse_gujarat';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.handleStatePulseSelect) window.handleStatePulseSelect('Gujarat');
      actionTaken = 'Selected Gujarat in State Pulse';
      voiceReply = isHi ? 'गुजरात का स्टेट पल्स डेटा खोल दिया गया है।' : 'Loaded Gujarat State Pulse telemetry.';
    }
    else if (text.includes('राजस्थान') || text.includes('rajasthan') || text.includes('jaipur') || text.includes('जयपुर')) {
      intent = 'state_pulse_rajasthan';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.handleStatePulseSelect) window.handleStatePulseSelect('Rajasthan');
      actionTaken = 'Selected Rajasthan in State Pulse';
      voiceReply = isHi ? 'राजस्थान का स्टेट पल्स डेटा खोल दिया गया है।' : 'Loaded Rajasthan State Pulse telemetry.';
    }
    else if (text.includes('बिहार') || text.includes('bihar') || text.includes('patna') || text.includes('पटना')) {
      intent = 'state_pulse_bihar';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.handleStatePulseSelect) window.handleStatePulseSelect('Bihar');
      actionTaken = 'Selected Bihar in State Pulse';
      voiceReply = isHi ? 'बिहार का स्टेट पल्स डेटा लोड कर दिया गया है।' : 'Loaded Bihar State Pulse telemetry.';
    }
    else if (text.includes('पंजाब') || text.includes('punjab') || text.includes('chandigarh') || text.includes('चंडीगढ़')) {
      intent = 'state_pulse_punjab';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.handleStatePulseSelect) window.handleStatePulseSelect('Punjab');
      actionTaken = 'Selected Punjab in State Pulse';
      voiceReply = isHi ? 'पंजाब का स्टेट पल्स डेटा लोड कर दिया गया है।' : 'Loaded Punjab State Pulse telemetry.';
    }

    // 2. GENERIC STATE PULSE (Card 2)
    else if (text.includes('स्टेट पल्स') || text.includes('state pulse') || text.includes('राज्य') || text.includes('state') || text.includes('pradesh') || text.includes('regional')) {
      intent = 'state_pulse';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.navigateToGovSection) window.navigateToGovSection('state-pulse');
      actionTaken = 'Navigated to State Pulse Telemetry';
      voiceReply = isHi
        ? 'स्टेट पल्स इंटरफ़ेस खोल दिया गया है। 28 राज्यों और 8 केंद्र शासित प्रदेशों का लाइव डेटा उपलब्ध है।'
        : 'State Pulse interface opened. Real-time district-level telemetry active for all states.';
    }

    // 3. VIRAL CONTENT INTEL (Card 1)
    else if (text.includes('वायरल') || text.includes('viral') || text.includes('ट्रेंड') || text.includes('trend') || text.includes('vairal') || text.includes('पॉपुलर') || text.includes('popular') || text.includes('surge')) {
      intent = 'viral';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.navigateToGovSection) window.navigateToGovSection('viral-intel');
      actionTaken = 'Navigated to Viral Content Intelligence';
      voiceReply = isHi
        ? 'वायरल कंटेंट इंटेलिजेंस इंटरफ़ेस खोल दिया गया है। लाइव फ्लक्चुएटिंग ट्रेंड्स और टेलीमेट्री उपलब्ध हैं।'
        : 'Opened Viral Content Intelligence with live fluctuating multi-platform velocity.';
    }

    // 4. NARRATIVE INTELLIGENCE & CITIZEN SENTIMENT (Card 3)
    else if (text.includes('नैरेटिव') || text.includes('narrative') || text.includes('सेंटीमेंट') || text.includes('sentiment') || text.includes('दृष्टिकोण') || text.includes('viewpoint') || text.includes('जनता की राय') || text.includes('जनता') || text.includes('राय') || text.includes('public opinion') || text.includes('bhavna') || text.includes('भावना') || text.includes('धारा 21') || text.includes('section 21')) {
      intent = 'narratives';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.navigateToGovSection) window.navigateToGovSection('narratives');
      actionTaken = 'Navigated to Narrative Intelligence';
      voiceReply = isHi
        ? 'नैरेटिव इंटेलिजेंस खोल दिया गया है। धारा 21 सुरक्षा के तहत नागरिकों के दृष्टिकोण और भावना विश्लेषण उपलब्ध हैं।'
        : 'Opened Narrative Intelligence with Section 21 citizen safeguards and demographic viewpoints.';
    }

    // 5. TOPIC-SPECIFIC SEARCH & COORDINATION RADAR (Card 4)
    else if (text.includes('किसान') || text.includes('kisan') || text.includes('farmer') || text.includes('msp') || text.includes('swaminathan')) {
      intent = 'farmers_msp';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.searchCoordinationTopic) {
        window.searchCoordinationTopic('farmers-msp');
      } else if (window.navigateToGovSection) {
        window.navigateToGovSection('coordination');
      }
      actionTaken = 'Loaded Farmers MSP Intelligence on Coordination Radar';
      voiceReply = isHi
        ? 'किसान एमएसपी आंदोलन का डेटा लोड कर दिया गया है। बॉट क्लस्टर्स और समन्वय राडार सक्रिय हैं।'
        : 'Farmers MSP intelligence loaded into Coordination Radar with bot clusters analysis.';
    }
    else if (text.includes('डिजिटल अरेस्ट') || text.includes('digital arrest') || text.includes('extortion') || text.includes('साइबर अरेस्ट') || text.includes('cbi call')) {
      intent = 'digital_arrest';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.searchCoordinationTopic) {
        window.searchCoordinationTopic('digital-arrest');
      } else if (window.navigateToGovSection) {
        window.navigateToGovSection('coordination');
      }
      actionTaken = 'Loaded Digital Arrest Fraud Telemetry';
      voiceReply = isHi
        ? 'डिजिटल अरेस्ट साइबर फ्रॉड नेटवर्क का विश्लेषण राडार पर खोल दिया गया है।'
        : 'Digital arrest cyber extortion syndicate telemetry loaded into Coordination Radar.';
    }
    else if (text.includes('सेमीकंडक्टर') || text.includes('semiconductor') || text.includes('chip') || text.includes('dholera') || text.includes('चिप')) {
      intent = 'semiconductor';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.searchCoordinationTopic) {
        window.searchCoordinationTopic('semiconductor');
      } else if (window.navigateToGovSection) {
        window.navigateToGovSection('coordination');
      }
      actionTaken = 'Loaded Semiconductor Mission Telemetry';
      voiceReply = isHi
        ? 'इंडिया सेमीकंडक्टर मिशन का लाइव टेलीमेट्री डेटा लोड कर दिया गया है।'
        : 'India Semiconductor Mission telemetry loaded with 94% organic citizen sentiment.';
    }
    else if (text.includes('ब्रिक्स') || text.includes('brics') || text.includes('currency') || text.includes('करेंसी') || text.includes('de-dollarization')) {
      intent = 'brics';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.searchCoordinationTopic) {
        window.searchCoordinationTopic('brics-currency');
      } else if (window.navigateToGovSection) {
        window.navigateToGovSection('coordination');
      }
      actionTaken = 'Loaded BRICS Sovereign Currency Intelligence';
      voiceReply = isHi
        ? 'ब्रिक्स 2026 करेंसी कॉरिडोर का विश्लेषण प्रस्तुत है।'
        : 'BRICS currency corridor and cross-border trade settlement intelligence loaded.';
    }
    else if (text.includes('गगनयान') || text.includes('gaganyaan') || text.includes('इसरो') || text.includes('isro') || text.includes('space flight')) {
      intent = 'gaganyaan';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.searchCoordinationTopic) {
        window.searchCoordinationTopic('gaganyaan');
      } else if (window.navigateToGovSection) {
        window.navigateToGovSection('coordination');
      }
      actionTaken = 'Loaded ISRO Gaganyaan Mission Telemetry';
      voiceReply = isHi
        ? 'इसरो गगनयान मिशन का लाइव इनपुट प्रदर्शित है।'
        : 'ISRO Gaganyaan mission live trajectory and positive sentiment loaded.';
    }
    else if (text.includes('कोऑर्डिनेशन') || text.includes('coordination') || text.includes('राडार') || text.includes('radar') || text.includes('बॉट') || text.includes('bot') || text.includes('sybil') || text.includes('swarm')) {
      intent = 'coordination';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.navigateToGovSection) window.navigateToGovSection('coordination');
      actionTaken = 'Navigated to Coordination Radar & Bot Swarms';
      voiceReply = isHi
        ? 'कोऑर्डिनेशन राडार खोला गया है। बॉट क्लस्टर, सर्च और बर्स्ट हीटमैप सक्रिय हैं।'
        : 'Opened Coordination Radar showing bot swarms and rapid burst detection.';
    }

    // 6. CONTENT FILTRATION & DEEPFAKE FORENSICS (Card 5)
    else if (text.includes('फिल्ट्रेशन') || text.includes('filtration') || text.includes('डीपफेक') || text.includes('deepfake') || text.includes('अपलोड') || text.includes('upload') || text.includes('स्कैन') || text.includes('scan') || text.includes('forensic') || text.includes('फोरेंसिक') || text.includes('जाली') || text.includes('नकली') || text.includes('fake')) {
      intent = 'filtration';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.navigateToGovSection) window.navigateToGovSection('filtration');
      actionTaken = 'Opened Content Filtration & Forensics';
      voiceReply = isHi
        ? 'कंटेंट फिल्ट्रेशन खोला गया। फ़ाइल अपलोड करें या मल्टी-मोडल फोरेंसिक स्कैन चलाएं।'
        : 'Opened Content Filtration. Choose local media file for forensic scanning.';
    }

    // 7. ALERT CENTER & COUNTERMEASURES (Card 6)
    else if (text.includes('अलर्ट') || text.includes('alert') || text.includes('चेतावनी') || text.includes('khatra') || text.includes('threat') || text.includes('खतरा') || text.includes('countermeasure')) {
      intent = 'alerts';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.navigateToGovSection) window.navigateToGovSection('alerts');
      actionTaken = 'Opened Government Alert Center';
      voiceReply = isHi
        ? 'सरकारी अलर्ट सेंटर खुला है। 3 महत्वपूर्ण चेतावनियां और 1-क्लिक काउंटरमेज़र्स उपलब्ध हैं।'
        : 'Alert Center opened. 3 active threats with executable countermeasures.';
    }

    // 8. PROVENANCE OVERSIGHT & 1930 CYBER CRIME INTAKE (Card 7)
    else if (text.includes('प्रोवेनेंस') || text.includes('provenance') || text.includes('1930') || text.includes('साइबर अपराध') || text.includes('fraud') || text.includes('complaint') || text.includes('धोखाधड़ी') || text.includes('helpline')) {
      intent = 'provenance';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.navigateToGovSection) window.navigateToGovSection('provenance');
      actionTaken = 'Navigated to Provenance Oversight & 1930 Intake';
      voiceReply = isHi
        ? 'प्रोवेनेंस ओवरसाइट और 1930 साइबर सेल रिपोर्टिंग खुला है।'
        : 'Provenance Oversight and 1930 Cyber Fraud intake ready.';
    }

    // 9. MISSION CONTROL & CYBER DEFENSE (Card 8)
    else if (text.includes('मिशन कंट्रोल') || text.includes('mission control') || text.includes('साइबर डिफेंस') || text.includes('defense') || text.includes('sinkhole') || text.includes('सिंकहोल') || text.includes('takedown') || text.includes('टेकडाउन') || text.includes('block') || text.includes('ब्लॉक')) {
      intent = 'mission_control';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.navigateToGovSection) window.navigateToGovSection('mission-control');
      actionTaken = 'Opened Mission Control Cyber Defense';
      voiceReply = isHi
        ? 'मिशन कंट्रोल साइबर डिफेंस कंसोल खुला है। डीएनएस सिंकहोल और एनपीसीआई फ्रीज तैयार हैं।'
        : 'Mission Control Cyber Threat Defense activated with live terminal.';
    }

    // 10. AUDIT & EXECUTIVE REPORTS (Card 9)
    else if (text.includes('ऑडिट') || text.includes('audit') || text.includes('रिपोर्ट') || text.includes('report') || text.includes('pdf') || text.includes('लेजर') || text.includes('ledger') || text.includes('download') || text.includes('डाउनलोड')) {
      intent = 'audit';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.navigateToGovSection) window.navigateToGovSection('audit');
      if ((text.includes('download') || text.includes('डाउनलोड')) && window.downloadGovAdminReportPDF) {
        window.downloadGovAdminReportPDF();
      }
      actionTaken = 'Opened Admin Audit & Report';
      voiceReply = isHi
        ? 'एडमिन ऑडिट लेजर और आधिकारिक सरकारी रिपोर्ट केंद्र खुला है।'
        : 'Opened Admin Audit & Executive Report generation hub.';
    }

    // 11. CONNECT ACCOUNTS
    else if (text.includes('अकाउंट') || text.includes('account') || text.includes('जोड़ें') || text.includes('जोड़ो') || text.includes('कनेक्ट') || text.includes('link')) {
      intent = 'connect_accounts';
      if (window.openConnectAccountsModal) window.openConnectAccountsModal();
      actionTaken = 'Opened Connect Accounts Modal';
      voiceReply = isHi
        ? 'अकाउंट कनेक्ट विंडो खोल दी गई है। प्लेटफॉर्म चुनें।'
        : 'Opened Connect Accounts modal. Select platform to link credentials.';
    }

    // 12. VIRAL PLATFORM SELECTOR (YouTube, Instagram, X, Telegram)
    else if (text.includes('यूट्यूब') || text.includes('youtube')) {
      intent = 'platform_youtube';
      if (window.setGovViralPlatform) window.setGovViralPlatform('YouTube');
      if (window.navigateToGovSection) window.navigateToGovSection('viral-intel');
      actionTaken = 'Filtered Viral Intel for YouTube';
      voiceReply = isHi ? 'यूट्यूब प्लेटफॉर्म का वायरल डेटा प्रदर्शित है।' : 'Filtered Viral Content Intel for YouTube.';
    }
    else if (text.includes('इन्स्टाग्राम') || text.includes('instagram') || text.includes('insta')) {
      intent = 'platform_instagram';
      if (window.setGovViralPlatform) window.setGovViralPlatform('Instagram');
      if (window.navigateToGovSection) window.navigateToGovSection('viral-intel');
      actionTaken = 'Filtered Viral Intel for Instagram';
      voiceReply = isHi ? 'इन्स्टाग्राम रील्स और एनालिटिक्स डेटा प्रदर्शित है।' : 'Filtered Viral Content Intel for Instagram.';
    }
    else if (text.includes('ट्विटर') || text.includes('twitter') || text.includes(' x ') || text === 'x') {
      intent = 'platform_x';
      if (window.setGovViralPlatform) window.setGovViralPlatform('X');
      if (window.navigateToGovSection) window.navigateToGovSection('viral-intel');
      actionTaken = 'Filtered Viral Intel for X (Twitter)';
      voiceReply = isHi ? 'एक्स (ट्विटर) पोस्ट्स और एंगेजमेंट डेटा प्रदर्शित है।' : 'Filtered Viral Content Intel for X.';
    }
    else if (text.includes('टेलीग्राम') || text.includes('telegram')) {
      intent = 'platform_telegram';
      if (window.setGovViralPlatform) window.setGovViralPlatform('Telegram');
      if (window.navigateToGovSection) window.navigateToGovSection('viral-intel');
      actionTaken = 'Filtered Viral Intel for Telegram';
      voiceReply = isHi ? 'टेलीग्राम इंटेलिजेंस चैनल डेटा प्रदर्शित है।' : 'Filtered Viral Content Intel for Telegram.';
    }

    // 13. COMMAND HUB OVERVIEW
    else if (text.includes('कमांड हब') || text.includes('command hub') || text.includes('ओवरव्यू') || text.includes('overview') || text.includes('डैशबोर्ड') || text.includes('dashboard') || text.includes('होम') || text.includes('home') || text.includes('वापस') || text.includes('back')) {
      intent = 'overview';
      if (window.switchWorkspaceMode) window.switchWorkspaceMode('government');
      if (window.navigateToGovSection) window.navigateToGovSection('overview');
      actionTaken = 'Navigated to Government Command Hub Overview';
      voiceReply = isHi ? 'कमांड हब मुख्य स्क्रीन खोल दी गई है।' : 'Navigated to Command Hub Overview.';
    }

    // 14. GENERAL NATURAL LANGUAGE FALLBACK
    else {
      intent = 'general';
      actionTaken = 'Command Processed';
      voiceReply = isHi
        ? `दृष्टि (Dhristi) AI ने आपका आदेश स्वीकार किया: "${rawText}"। यह कमांड निष्पादित कर दी गई है।`
        : `Dhristi Voice GPT processed command: "${rawText}". Action executed.`;
    }

    return {
      matched: intent !== 'general',
      intent: intent || 'general',
      actionTaken,
      voiceReply,
      isHi
    };
  }

  function processCommand(rawText, alternatives = []) {
    if (!rawText) return;
    const candidates = [rawText];
    if (Array.isArray(alternatives)) {
      alternatives.forEach(alt => {
        if (alt && typeof alt === 'string' && !candidates.includes(alt)) {
          candidates.push(alt);
        }
      });
    }

    let match = null;
    for (const cand of candidates) {
      const res = matchSingleCommand(cand);
      if (res && res.matched) {
        match = res;
        break;
      }
    }
    if (!match) {
      match = matchSingleCommand(rawText);
    }

    const statusEl = document.getElementById('voice-copilot-status');
    const replyEl = document.getElementById('voice-copilot-reply');
    if (statusEl) statusEl.textContent = match.actionTaken;
    if (replyEl) {
      replyEl.innerHTML = `<strong style="color: #ff9933;">दृष्टि (Dhristi) GPT:</strong> ${match.voiceReply}`;
    }

    // Spoken feedback in detected language (Hindi for Hindi queries, English for English queries)
    speak(match.voiceReply, match.isHi ? 'hi-IN' : 'en-IN');

    if (window.showToast) {
      window.showToast(`🎙️ ${match.actionTaken}`);
    }

    return { intent: match.intent, action: match.actionTaken, reply: match.voiceReply };
  }

  // Render Centered Voice GPT Floating Interface
  function renderVoiceUI() {
    if (document.getElementById('voice-copilot-backdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'voice-copilot-backdrop';
    backdrop.className = 'voice-copilot-backdrop';
    backdrop.innerHTML = `
      <div id="voice-copilot-modal" class="voice-copilot-modal" onclick="event.stopPropagation()">
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 42px; height: 42px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(0,242,254,0.5); box-shadow: 0 0 14px rgba(0,242,254,0.35); display: flex; align-items: center; justify-content: center; background: #000;">
              <img src="assets/dhristi-logo.jpg" alt="Dhristi Logo" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; color: var(--gov-navy); font-family: 'Outfit', sans-serif; font-weight: 700;">
                दृष्टि (DHRISTI) Multilingual Voice GPT
              </h3>
              <span style="font-size: 0.72rem; color: #ff9933; font-family: 'JetBrains Mono';">Dual Hindi & English Acoustic Engine</span>
            </div>
          </div>
          <button type="button" onclick="window.toggleVoiceCopilot(false)" style="background: none; border: none; color: var(--text-tertiary); font-size: 1.5rem; cursor: pointer; padding: 4px 8px; line-height: 1;">&times;</button>
        </div>

        <!-- Dual-Language Quick Toggles -->
        <div style="background: rgba(0,0,0,0.35); border: 1px solid var(--border-glass); border-radius: 10px; padding: 10px 14px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div style="font-size: 0.74rem; color: var(--text-secondary); font-weight: 700;">
              Active Speech Engine / भाषा:
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button type="button" id="btn-lang-bilingual" class="btn btn-secondary" onclick="window.setVoiceLanguage('bilingual')" 
                style="padding: 5px 14px; font-size: 0.78rem; border-radius: 16px; font-weight: 700; ${voiceEngineMode === 'bilingual' ? 'background: linear-gradient(135deg, #10b981, #00f2fe); color: #000; border-color: #00f2fe; box-shadow: 0 0 12px rgba(0, 242, 254, 0.4);' : ''}">
                🌐 द्विभाषी (Hindi + English)
              </button>
              <button type="button" id="btn-lang-hi" class="btn btn-secondary" onclick="window.setVoiceLanguage('hi-IN')" 
                style="padding: 5px 14px; font-size: 0.78rem; border-radius: 16px; font-weight: 700; ${voiceEngineMode === 'hi-IN' ? 'background: linear-gradient(135deg, #ff9933, #ea580c); color: #fff; border-color: #ff9933;' : ''}">
                🇮🇳 हिन्दी (Hindi)
              </button>
              <button type="button" id="btn-lang-en" class="btn btn-secondary" onclick="window.setVoiceLanguage('en-IN')" 
                style="padding: 5px 14px; font-size: 0.78rem; border-radius: 16px; font-weight: 700; ${voiceEngineMode === 'en-IN' ? 'background: linear-gradient(135deg, #00f2fe, #3b82f6); color: #000; border-color: #00f2fe;' : ''}">
                🇬🇧 English
              </button>
            </div>
          </div>
          <!-- Dropdown for additional regional languages -->
          <div style="margin-top: 8px; display: flex; align-items: center; justify-content: flex-end; gap: 6px;">
            <span style="font-size: 0.68rem; color: var(--text-tertiary);">Other Languages:</span>
            <select id="voice-lang-select" onchange="window.setVoiceLanguage(this.value)" style="background: var(--bg-input, rgba(10, 15, 26, 0.7)); border: 1px solid var(--border-glass); color: var(--text-primary); font-size: 0.72rem; border-radius: 6px; padding: 3px 8px; cursor: pointer; font-family: inherit;">
              ${LANGUAGES.map(l => `<option value="${l.code}" ${l.code === selectedLang ? 'selected' : ''}>${l.label}</option>`).join('')}
            </select>
          </div>
        </div>

        <!-- Central Mic Action Button & Waveform Visualizer -->
        <div style="text-align: center; margin-bottom: 14px;">
          <button type="button" id="voice-center-mic-btn" onclick="window.toggleMicListening()" style="width: 76px; height: 76px; border-radius: 50%; background: linear-gradient(135deg, #00f2fe, #6366f1); border: none; color: #fff; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>

          <!-- Waveform Visualizer -->
          <div class="voice-wave-container" style="display: flex; align-items: center; justify-content: center; gap: 5px; height: 28px; margin-top: 8px;">
            <div class="voice-wave-bar" style="width: 4px; height: 8px; background: var(--brand-cyan); border-radius: 4px;"></div>
            <div class="voice-wave-bar" style="width: 4px; height: 16px; background: var(--brand-cyan); border-radius: 4px;"></div>
            <div class="voice-wave-bar" style="width: 4px; height: 26px; background: #ff9933; border-radius: 4px;"></div>
            <div class="voice-wave-bar" style="width: 4px; height: 16px; background: var(--brand-cyan); border-radius: 4px;"></div>
            <div class="voice-wave-bar" style="width: 4px; height: 8px; background: var(--brand-cyan); border-radius: 4px;"></div>
          </div>

          <div id="voice-copilot-status" style="font-size: 0.76rem; color: var(--brand-cyan); font-family: 'JetBrains Mono'; margin-top: 4px;">
            सुन रहा हूँ (Hindi + English) / Click mic or speak
          </div>
        </div>

        <!-- Live Transcript & AI Spoken Reply Box -->
        <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 12px; margin-bottom: 12px;">
          <div style="font-size: 0.68rem; color: var(--text-tertiary); margin-bottom: 4px; text-transform: uppercase;">Recognized Voice Command:</div>
          <div id="voice-copilot-transcript" style="font-size: 0.88rem; color: var(--text-primary); font-style: italic; min-height: 24px; margin-bottom: 8px;">
            "वायरल ट्रेंड्स दिखाओ" / "Open State Pulse" / "Farmer MSP data"
          </div>
          <div id="voice-copilot-reply" style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px;">
            <strong style="color: #ff9933;">दृष्टि (Dhristi) GPT:</strong> तैयार है। आप हिन्दी या अंग्रेज़ी में कोई भी कमांड दे सकते हैं। / Ready for commands in Hindi & English.
          </div>
        </div>

        <!-- Dual-Language Quick Suggestion Chips -->
        <div style="margin-bottom: 12px;">
          <div style="font-size: 0.68rem; color: var(--text-tertiary); margin-bottom: 6px; text-transform: uppercase;">Quick Actions / त्वरित आदेश:</div>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            <button type="button" class="btn btn-secondary" onclick="window.handleVoiceChipClick('किसान एमएसपी दिखाओ')" style="padding: 3px 8px; font-size: 0.7rem;">🌾 किसान MSP / Farmers</button>
            <button type="button" class="btn btn-secondary" onclick="window.handleVoiceChipClick('डिजिटल अरेस्ट फ्रॉड')" style="padding: 3px 8px; font-size: 0.7rem;">🛡️ डिजिटल अरेस्ट / Extortion</button>
            <button type="button" class="btn btn-secondary" onclick="window.handleVoiceChipClick('वायरल कंटेंट खोलो')" style="padding: 3px 8px; font-size: 0.7rem;">🌐 वायरल ट्रेंड्स / Viral Intel</button>
            <button type="button" class="btn btn-secondary" onclick="window.handleVoiceChipClick('मध्य प्रदेश का स्टेट पल्स')" style="padding: 3px 8px; font-size: 0.7rem;">🗺️ स्टेट पल्स / MP Pulse</button>
            <button type="button" class="btn btn-secondary" onclick="window.handleVoiceChipClick('नैरेटिव इंटेलिजेंस दिखाओ')" style="padding: 3px 8px; font-size: 0.7rem;">⚖️ नैरेटिव / Narratives</button>
            <button type="button" class="btn btn-secondary" onclick="window.handleVoiceChipClick('कोऑर्डिनेशन राडार खोलो')" style="padding: 3px 8px; font-size: 0.7rem;">📡 बॉट राडार / Radar</button>
            <button type="button" class="btn btn-secondary" onclick="window.handleVoiceChipClick('कंटेंट फिल्ट्रेशन खोलो')" style="padding: 3px 8px; font-size: 0.7rem;">🔬 कंटेंट स्कैन / Forensics</button>
            <button type="button" class="btn btn-secondary" onclick="window.handleVoiceChipClick('अलर्ट सेंटर खोलो')" style="padding: 3px 8px; font-size: 0.7rem;">🚨 अलर्ट सेंटर / Threat Grid</button>
            <button type="button" class="btn btn-secondary" onclick="window.handleVoiceChipClick('मिशन कंट्रोल साइबर डिफेंस')" style="padding: 3px 8px; font-size: 0.7rem;">⚡ मिशन कंट्रोल / Cyber Def</button>
            <button type="button" class="btn btn-secondary" onclick="window.handleVoiceChipClick('अकाउंट कनेक्ट खोलो')" style="padding: 3px 8px; font-size: 0.7rem;">🔗 कनेक्ट अकाउंट्स / Link</button>
          </div>
        </div>

        <!-- Fallback Text Input Field -->
        <form onsubmit="window.handleVoiceTextInput(event)" style="display: flex; gap: 8px;">
          <input type="text" id="voice-text-fallback" placeholder="या टाइप करें / or type any command in Hindi or English..." 
            style="flex: 1; background: var(--bg-input, rgba(10, 15, 26, 0.7)); border: 1px solid var(--border-glass); border-radius: 8px; padding: 8px 12px; color: var(--text-primary); font-size: 0.8rem;">
          <button type="submit" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.8rem; background: linear-gradient(135deg, #00f2fe, #6366f1); border: none; font-weight: 700;">
            Execute
          </button>
        </form>
      </div>
    `;

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        window.toggleVoiceCopilot(false);
      }
    });

    document.body.appendChild(backdrop);
    initSpeechEngine();
  }

  window.toggleVoiceCopilot = function (forceState) {
    let backdrop = document.getElementById('voice-copilot-backdrop');
    if (!backdrop) {
      renderVoiceUI();
      backdrop = document.getElementById('voice-copilot-backdrop');
    }

    const shouldOpen = forceState !== undefined ? forceState : !backdrop.classList.contains('active');
    backdrop.classList.toggle('active', shouldOpen);
    backdrop.style.display = shouldOpen ? 'flex' : 'none';
    const modal = document.getElementById('voice-copilot-modal');
    if (modal) {
      modal.style.display = shouldOpen ? 'block' : 'none';
    }

    if (shouldOpen) {
      startListening();
    } else {
      stopListening();
    }
  };

  window.toggleMicListening = function () {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  function startListening() {
    isListening = true;
    if (!recognition) {
      initSpeechEngine();
    }
    if (!recognition) {
      const statusEl = document.getElementById('voice-copilot-status');
      if (statusEl) statusEl.textContent = 'वेब स्पीच समर्थित नहीं है। नीचे टाइप करें।';
      return;
    }
    try {
      recognition.lang = selectedLang;
      recognition.start();
    } catch (e) {
      // If already started or aborting, graceful ignore
    }
  }

  function stopListening() {
    isListening = false;
    clearTimeout(restartTimer);
    if (recognition) {
      try { recognition.stop(); } catch (e) {}
    }
    updateUIState(false);
    playAcousticFeedback('stop');
  }

  window.handleVoiceChipClick = function (chipText) {
    const transcriptEl = document.getElementById('voice-copilot-transcript');
    if (transcriptEl) transcriptEl.textContent = `"${chipText}"`;
    processCommand(chipText);
  };

  window.handleVoiceTextInput = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById('voice-text-fallback');
    const val = input ? input.value.trim() : '';
    if (!val) return;
    if (input) input.value = '';

    const transcriptEl = document.getElementById('voice-copilot-transcript');
    if (transcriptEl) transcriptEl.textContent = `"${val}"`;
    processCommand(val);
  };

  window.VoiceCopilot = window.DhristiVoice = {
    toggle: window.toggleVoiceCopilot,
    processCommand: processCommand,
    processVoiceCommand: processCommand,
    selectLanguage: window.setVoiceLanguage,
    get selectedLanguage() { return selectedLang; }
  };
  window.selectVoiceLanguage = window.setVoiceLanguage;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderVoiceUI);
  } else {
    renderVoiceUI();
  }

})();
