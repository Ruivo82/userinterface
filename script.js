/**
 * PORTAL DO CIDADÃO - REPÚBLICA PORTUGUESA (SÁTIRA OFICIAL & ANTI-UX)
 * Sistema de Popups Chatos, Atalhos Invertidos (Ctrl+C / Ctrl+V) e Digitação em Marcha-Atrás
 */

(function () {
  'use strict';

  // ==============================================================
  // 1. ESTADO GLOBAL DO PROCEDIMENTO ADMINISTRATIVO
  // ==============================================================
  const appState = {
    currentStep: 1,
    startTime: Date.now(),
    totalClicks: 0,
    trapsAvoided: 0,
    sessionSeconds: 225, // 3 minutos e 45 segundos
    sessionInterval: null,
    idleTimer: null,

    // Token do Diário da República & Referência Oficial Invertida
    activeToken: '',
    targetReference: 'PT-8492-9104-X',

    // Dossiê do Cidadão Reclamante
    citizenDossier: {
      nif: '',
      password: '',
      ministry: '',
      ministryName: '',
      influence: 'sem_cunha',
      influenceName: 'Cidadão Comum (Sem Cunha)',
      subject: '',
      complaintText: '',
      certFileName: ''
    },

    // Estado dos Elementos Escondidos & Anúncios Piratas
    isCredentialsStamped: false,
    isStep2StampFound: false,
    pirateCountdownInterval: null,
    step4Translated: false,

    // Contagem Oficial de Erros e Infrações Burocráticas
    errors: {
      total: 0,
      validation: 0,
      paste: 0,
      inverted: 0,
      closeBtn: 0,
      escape: 0,
      censored: 0,
      courtesy: 0,
      peek: 0,
      idle: 0,
      pirate: 0,
      drawers: 0,
      trollBtns: 0,
      jumpscares: 0
    }
  };

  function recordError(type) {
    const errorKey = type || 'validation';
    if (appState.errors[errorKey] !== undefined) {
      appState.errors[errorKey]++;
    } else {
      appState.errors.validation++;
    }
    appState.errors.total++;
  }

  // ==============================================================
  // 2. MOTOR DE SOM TÁTIL (SEM FICHEIROS EXTERNOS)
  // ==============================================================
  let audioContext = null;

  function initAudio() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  function playKeyClick() {
    try {
      initAudio();
      if (!audioContext) return;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.03);

      gain.gain.setValueAtTime(0.06, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + 0.03);
    } catch (e) {}
  }

  function playAnnoyingBuzzer() {
    try {
      initAudio();
      if (!audioContext) return;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, audioContext.currentTime);
      osc.frequency.setValueAtTime(120, audioContext.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + 0.22);
    } catch (e) {}
  }

  function playCartoonSlip() {
    try {
      initAudio();
      if (!audioContext) return;
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, audioContext.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + 0.12);
    } catch (e) {}
  }

  function playMinisterialChime() {
    try {
      initAudio();
      if (!audioContext) return;
      const now = audioContext.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    } catch (e) {}
  }

  // ==============================================================
  // 2.1 MOTOR DE JUMP SCARES BRUTAIS PARA CADA ABA
  // ==============================================================
  function createDistortionCurve(k = 65) {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  function playTerrifyingJumpScareSound(scareType) {
    try {
      initAudio();
      if (!audioContext) return;
      const now = audioContext.currentTime;

      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(0.95, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);

      const distortion = audioContext.createWaveShaper();
      distortion.curve = createDistortionCurve(70);
      distortion.oversample = '4x';

      // Frequências dissonantes e estridentes por tipo de aba
      let freqs = [1850, 2220, 2780, 3400, 4150];
      if (scareType === 2 || scareType === 'key') freqs = [1420, 1950, 2600, 3250, 4000];
      else if (scareType === 3 || scareType === 'rules') freqs = [2100, 2580, 3120, 3750, 4420];
      else if (scareType === 4 || scareType === 'dispatch') freqs = [1620, 2080, 2720, 3350, 4250];
      else if (scareType === 5) freqs = [1350, 1850, 2450, 3180, 3950];

      freqs.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const oscGain = audioContext.createGain();
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'square';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.linearRampToValueAtTime(freq * (1 + (Math.random() * 0.4 - 0.2)), now + 0.35);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.65, now + 1.5);

        // LFO caótico e rápido (vibrato de garganta rasgada a 44Hz)
        const lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();
        lfo.frequency.setValueAtTime(42 + idx * 7, now);
        lfoGain.gain.setValueAtTime(260, now);
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + 1.6);

        oscGain.gain.setValueAtTime(0.22, now);
        oscGain.gain.exponentialRampToValueAtTime(0.008, now + 1.5);

        osc.connect(oscGain);
        oscGain.connect(distortion);
        osc.start(now);
        osc.stop(now + 1.6);
      });

      // Ruído branco violento e ensurdecedor (berro/rugido rasgado)
      const bufferSize = Math.floor(audioContext.sampleRate * 1.6);
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = audioContext.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const bandpass = audioContext.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(2800, now);
      bandpass.Q.setValueAtTime(2.6, now);

      const noiseGain = audioContext.createGain();
      noiseGain.gain.setValueAtTime(0.75, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.55);

      whiteNoise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(distortion);
      whiteNoise.start(now);
      whiteNoise.stop(now + 1.6);

      // Impacto sub-grave violento (110Hz -> 25Hz)
      const subOsc = audioContext.createOscillator();
      const subGain = audioContext.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(110, now);
      subOsc.frequency.exponentialRampToValueAtTime(25, now + 0.65);
      subGain.gain.setValueAtTime(0.85, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start(now);
      subOsc.stop(now + 0.9);

      distortion.connect(masterGain);
      masterGain.connect(audioContext.destination);
    } catch (err) {}
  }

  const MONSTER_SVGS = {
    1: {
      title: "O TEU NIF FOI CONDENADO À EXECUÇÃO FISCAL ETERNA!",
      svg: `<svg viewBox="0 0 500 500" class="jumpscare-monster-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-skull-dark" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="50%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#000000" />
          </radialGradient>
          <radialGradient id="grad-eye-red" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="25%" stop-color="#ff0000" />
            <stop offset="70%" stop-color="#990000" />
            <stop offset="100%" stop-color="#000000" />
          </radialGradient>
        </defs>
        <path d="M120 220 C100 100, 160 30, 250 30 C340 30, 400 100, 380 220 C370 290, 340 310, 320 340 L310 420 L190 420 L180 340 C160 310, 130 290, 120 220 Z" fill="url(#grad-skull-dark)" stroke="#e2e8f0" stroke-width="4" />
        <path d="M250 30 L230 90 L260 130 L240 170" stroke="#ff0000" stroke-width="4" fill="none" />
        <path d="M340 80 L300 120 L320 150" stroke="#7f1d1d" stroke-width="3" fill="none" />
        <path d="M140 140 L180 160 L160 190" stroke="#7f1d1d" stroke-width="3" fill="none" />
        <path d="M160 180 C150 240, 210 250, 220 200 C220 160, 170 150, 160 180 Z" fill="#000000" stroke="#ff0000" stroke-width="5" />
        <path d="M340 180 C350 240, 290 250, 280 200 C280 160, 330 150, 340 180 Z" fill="#000000" stroke="#ff0000" stroke-width="5" />
        <circle cx="190" cy="200" r="16" fill="url(#grad-eye-red)" />
        <circle cx="190" cy="200" r="4" fill="#ffffff" />
        <circle cx="310" cy="200" r="16" fill="url(#grad-eye-red)" />
        <circle cx="310" cy="200" r="4" fill="#ffffff" />
        <polygon points="250,225 235,270 265,270" fill="#000000" stroke="#990000" stroke-width="3" />
        <path d="M170 310 Q250 320 330 310 L350 480 Q250 510 150 480 Z" fill="#000000" stroke="#ff0000" stroke-width="6" />
        <polygon points="180,310 190,340 200,310" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <polygon points="205,310 215,350 225,310" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <polygon points="230,310 240,360 250,310" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <polygon points="255,310 265,360 275,310" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <polygon points="280,310 290,350 300,310" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <polygon points="305,310 315,340 325,310" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <polygon points="170,470 180,430 190,470" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <polygon points="195,475 210,420 225,475" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <polygon points="235,480 250,410 265,480" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <polygon points="275,480 290,420 305,480" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <polygon points="315,475 325,435 335,475" fill="#fef08a" stroke="#7f1d1d" stroke-width="2" />
        <path d="M210 350 L210 400 M260 360 L260 415 M295 350 L295 395" stroke="#ff0000" stroke-width="4" stroke-linecap="round" />
      </svg>`
    },

    2: {
      title: "CHAVE INVÁLIDA! A TUA ALMA FOI PENHORADA PELO FISCO!",
      svg: `<svg viewBox="0 0 500 500" class="jumpscare-monster-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-ghost-pale" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="60%" stop-color="#64748b" />
            <stop offset="100%" stop-color="#0f172a" />
          </radialGradient>
        </defs>
        <ellipse cx="250" cy="210" rx="130" ry="170" fill="url(#grad-ghost-pale)" stroke="#ffffff" stroke-width="4" />
        <ellipse cx="190" cy="180" rx="28" ry="38" fill="#000000" stroke="#7f1d1d" stroke-width="4" />
        <ellipse cx="310" cy="180" rx="28" ry="38" fill="#000000" stroke="#7f1d1d" stroke-width="4" />
        <path d="M190 215 Q180 320 170 420" stroke="#000000" stroke-width="8" fill="none" />
        <path d="M200 215 Q195 280 190 380" stroke="#990000" stroke-width="5" fill="none" />
        <path d="M310 215 Q320 320 330 420" stroke="#000000" stroke-width="8" fill="none" />
        <path d="M300 215 Q305 280 310 380" stroke="#990000" stroke-width="5" fill="none" />
        <ellipse cx="250" cy="310" rx="65" ry="45" fill="#000000" stroke="#ff0000" stroke-width="4" />
        <path d="M190 310 L310 310" stroke="#dc2626" stroke-width="3" />
        <line x1="210" y1="280" x2="210" y2="340" stroke="#ffffff" stroke-width="3" />
        <line x1="235" y1="275" x2="235" y2="345" stroke="#ffffff" stroke-width="3" />
        <line x1="265" y1="275" x2="265" y2="345" stroke="#ffffff" stroke-width="3" />
        <line x1="290" y1="280" x2="290" y2="340" stroke="#ffffff" stroke-width="3" />
        <g fill="#e2e8f0" stroke="#000000" stroke-width="4">
          <path d="M10 280 Q60 250 110 270 L100 290 Q60 275 10 300 Z" />
          <path d="M10 320 Q80 290 140 310 L130 330 Q80 315 10 345 Z" />
          <path d="M10 370 Q90 340 150 365 L140 385 Q80 365 10 400 Z" />
          <path d="M490 280 Q440 250 390 270 L400 290 Q440 275 490 300 Z" />
          <path d="M490 320 Q420 290 360 310 L370 330 Q420 315 490 345 Z" />
          <path d="M490 370 Q410 340 350 365 L360 385 Q420 365 490 400 Z" />
        </g>
      </svg>`
    },

    3: {
      title: "NÃO HÁ TOLERÂNCIA DE PONTO NO PURGATÓRIO!",
      svg: `<svg viewBox="0 0 500 500" class="jumpscare-monster-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-ghoul-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#475569" />
            <stop offset="70%" stop-color="#1e293b" />
            <stop offset="100%" stop-color="#020617" />
          </radialGradient>
        </defs>
        <path d="M110 180 C90 70, 170 20, 250 20 C330 20, 410 70, 390 180 C380 270, 370 330, 350 380 L150 380 C130 330, 120 270, 110 180 Z" fill="url(#grad-ghoul-blue)" stroke="#94a3b8" stroke-width="4" />
        <path d="M120 90 Q170 120 180 160" stroke="#7e22ce" stroke-width="4" fill="none" />
        <path d="M380 90 Q330 120 320 160" stroke="#7e22ce" stroke-width="4" fill="none" />
        <path d="M250 20 L250 110 M250 60 L280 85 M250 75 L220 95" stroke="#991b1b" stroke-width="3" fill="none" />
        <circle cx="170" cy="170" r="42" fill="#ffffff" stroke="#ff0000" stroke-width="5" />
        <circle cx="160" cy="165" r="16" fill="#000000" />
        <circle cx="156" cy="160" r="5" fill="#ff0000" />
        <path d="M135 155 Q150 160 148 175 M190 150 Q175 165 180 180" stroke="#ef4444" stroke-width="2" fill="none" />
        <circle cx="330" cy="175" r="48" fill="#ffffff" stroke="#ff0000" stroke-width="5" />
        <circle cx="345" cy="180" r="22" fill="#000000" />
        <circle cx="348" cy="175" r="7" fill="#ff0000" />
        <path d="M295 160 Q320 170 315 190 M360 150 Q345 165 355 195" stroke="#ef4444" stroke-width="2" fill="none" />
        <ellipse cx="250" cy="330" rx="100" ry="85" fill="#000000" stroke="#b91c1c" stroke-width="7" />
        <g fill="#fef9c3" stroke="#000000" stroke-width="2">
          <rect x="180" y="255" width="16" height="26" />
          <rect x="205" y="252" width="18" height="32" />
          <rect x="235" y="250" width="20" height="35" />
          <rect x="265" y="252" width="18" height="32" />
          <rect x="295" y="255" width="16" height="28" />
          <rect x="190" y="380" width="16" height="24" />
          <rect x="220" y="375" width="18" height="28" />
          <rect x="250" y="372" width="20" height="32" />
          <rect x="280" y="375" width="18" height="28" />
        </g>
        <circle cx="250" cy="330" r="30" fill="#450a0a" />
      </svg>`
    },

    4: {
      title: "DESPACHO REJEITADO! CONDENADO AO ARQUIVO MORTO!",
      svg: `<svg viewBox="0 0 500 500" class="jumpscare-monster-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-maw-void" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#000000" />
            <stop offset="70%" stop-color="#18181b" />
            <stop offset="100%" stop-color="#713f12" />
          </radialGradient>
        </defs>
        <circle cx="250" cy="250" r="220" fill="#18181b" stroke="#dc2626" stroke-width="6" />
        <ellipse cx="250" cy="90" rx="36" ry="24" fill="#ffffff" stroke="#990000" stroke-width="4" />
        <circle cx="250" cy="90" r="10" fill="#000000" />
        <circle cx="140" cy="110" r="28" fill="#ffffff" stroke="#990000" stroke-width="3" />
        <circle cx="145" cy="112" r="8" fill="#ff0000" />
        <circle cx="360" cy="110" r="28" fill="#ffffff" stroke="#990000" stroke-width="3" />
        <circle cx="355" cy="112" r="8" fill="#ff0000" />
        <ellipse cx="90" cy="200" rx="30" ry="20" fill="#ffffff" stroke="#990000" stroke-width="3" />
        <circle cx="95" cy="200" r="9" fill="#000000" />
        <ellipse cx="410" cy="200" rx="30" ry="20" fill="#ffffff" stroke="#990000" stroke-width="3" />
        <circle cx="405" cy="200" r="9" fill="#000000" />
        <circle cx="120" cy="340" r="24" fill="#ffffff" stroke="#990000" stroke-width="3" />
        <circle cx="120" cy="340" r="7" fill="#000000" />
        <circle cx="380" cy="340" r="24" fill="#ffffff" stroke="#990000" stroke-width="3" />
        <circle cx="380" cy="340" r="7" fill="#000000" />
        <circle cx="250" cy="260" r="120" fill="url(#grad-maw-void)" stroke="#ff0000" stroke-width="8" />
        <circle cx="250" cy="260" r="75" fill="#000000" stroke="#7f1d1d" stroke-width="4" />
        <circle cx="250" cy="260" r="35" fill="#000000" />
        <g fill="#fef08a" stroke="#450a0a" stroke-width="1.5">
          <polygon points="250,145 240,175 260,175" />
          <polygon points="250,375 240,345 260,345" />
          <polygon points="135,260 165,250 165,270" />
          <polygon points="365,260 335,250 335,270" />
          <polygon points="170,180 190,205 205,190" />
          <polygon points="330,180 310,205 295,190" />
          <polygon points="170,340 190,315 205,330" />
          <polygon points="330,340 310,315 295,330" />
        </g>
        <g fill="#ffffff" stroke="#990000" stroke-width="1.5">
          <polygon points="250,195 244,215 256,215" />
          <polygon points="250,325 244,305 256,305" />
          <polygon points="185,260 205,254 205,266" />
          <polygon points="315,260 295,254 295,266" />
        </g>
      </svg>`
    },

    5: {
      title: "CERTIDÃO RECUSADA! A DÍVIDA É PARA TODA A ETERNIDADE!",
      svg: `<svg viewBox="0 0 500 500" class="jumpscare-monster-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-demon-horns" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#991b1b" />
            <stop offset="60%" stop-color="#450a0a" />
            <stop offset="100%" stop-color="#000000" />
          </radialGradient>
        </defs>
        <path d="M170 120 C120 -20, 20 -10, 40 100 C50 140, 80 160, 130 150 Z" fill="#0f172a" stroke="#ff0000" stroke-width="5" />
        <path d="M330 120 C380 -20, 480 -10, 460 100 C450 140, 420 160, 370 150 Z" fill="#0f172a" stroke="#ff0000" stroke-width="5" />
        <polygon points="250,80 340,180 310,350 250,440 190,350 160,180" fill="url(#grad-demon-horns)" stroke="#ef4444" stroke-width="6" />
        <polygon points="250,165 262,200 298,200 270,220 280,255 250,235 220,255 230,220 202,200 238,200" fill="none" stroke="#facc15" stroke-width="3" />
        <polygon points="185,210 230,230 205,245" fill="#facc15" stroke="#ff0000" stroke-width="4" />
        <circle cx="210" cy="230" r="5" fill="#000000" />
        <polygon points="315,210 270,230 295,245" fill="#facc15" stroke="#ff0000" stroke-width="4" />
        <circle cx="290" cy="230" r="5" fill="#000000" />
        <polygon points="210,320 250,335 290,320 270,390 250,420 230,390" fill="#000000" stroke="#dc2626" stroke-width="5" />
        <polygon points="215,322 225,345 235,325" fill="#ffffff" />
        <polygon points="265,325 275,345 285,322" fill="#ffffff" />
        <path d="M250 350 Q250 420 240 450 L230 470 M240 450 L255 470" stroke="#ef4444" stroke-width="5" fill="none" />
      </svg>`
    },

    'rules': {
      title: "LEI Nº 666: TODA A ESPERANÇA SERÁ TRIBUTADA!",
      svg: `<svg viewBox="0 0 500 500" class="jumpscare-monster-svg" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="250" cy="220" rx="140" ry="180" fill="#0284c7" fill-opacity="0.25" stroke="#38bdf8" stroke-width="6" />
        <ellipse cx="250" cy="220" rx="130" ry="170" fill="#030712" stroke="#ffffff" stroke-width="2" />
        <circle cx="180" cy="180" r="35" fill="#000000" stroke="#38bdf8" stroke-width="4" />
        <circle cx="320" cy="180" r="35" fill="#000000" stroke="#38bdf8" stroke-width="4" />
        <circle cx="180" cy="180" r="8" fill="#ffffff" />
        <circle cx="320" cy="180" r="8" fill="#ffffff" />
        <ellipse cx="250" cy="330" rx="60" ry="90" fill="#000000" stroke="#38bdf8" stroke-width="6" />
        <path d="M190 330 C190 280, 310 280, 310 330 C310 400, 190 400, 190 330 Z" fill="#000000" />
        <path d="M180 220 L180 340 M320 220 L320 340" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6,6" />
      </svg>`
    },

    'dispatch': {
      title: "O MINISTRO EXIGE O TEU SACRIFÍCIO DE SANGUE!",
      svg: `<svg viewBox="0 0 500 500" class="jumpscare-monster-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad-muscle-raw" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ef4444" />
            <stop offset="60%" stop-color="#991b1b" />
            <stop offset="100%" stop-color="#450a0a" />
          </radialGradient>
        </defs>
        <path d="M130 190 C110 80, 170 30, 250 30 C330 30, 390 80, 370 190 C360 280, 340 330, 320 370 L180 370 C160 330, 140 280, 130 190 Z" fill="url(#grad-muscle-raw)" stroke="#ffffff" stroke-width="4" />
        <path d="M160 70 Q250 120 340 70 M150 110 Q250 150 350 110 M140 160 Q250 200 360 160" stroke="#fecaca" stroke-width="2" fill="none" />
        <circle cx="180" cy="180" r="38" fill="#ffffff" stroke="#7f1d1d" stroke-width="5" />
        <circle cx="180" cy="180" r="14" fill="#000000" />
        <circle cx="177" cy="176" r="4" fill="#ffffff" />
        <circle cx="320" cy="180" r="38" fill="#ffffff" stroke="#7f1d1d" stroke-width="5" />
        <circle cx="320" cy="180" r="14" fill="#000000" />
        <circle cx="317" cy="176" r="4" fill="#ffffff" />
        <rect x="170" y="270" width="160" height="70" fill="#000000" stroke="#ffffff" stroke-width="3" />
        <g fill="#fef08a" stroke="#7f1d1d" stroke-width="2">
          <rect x="180" y="275" width="20" height="30" />
          <rect x="205" y="275" width="20" height="30" />
          <rect x="230" y="275" width="20" height="30" />
          <rect x="255" y="275" width="20" height="30" />
          <rect x="280" y="275" width="20" height="30" />
          <rect x="305" y="275" width="20" height="30" />
          <rect x="180" y="310" width="20" height="25" />
          <rect x="205" y="310" width="20" height="25" />
          <rect x="230" y="310" width="20" height="25" />
          <rect x="255" y="310" width="20" height="25" />
          <rect x="280" y="310" width="20" height="25" />
          <rect x="305" y="310" width="20" height="25" />
        </g>
      </svg>`
    }
  };

  let isJumpScareActive = false;
  let jumpscareDismissTimeout = null;

  function triggerTabJumpScare(scareKey, onComplete) {
    if (isJumpScareActive) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }
    isJumpScareActive = true;

    const overlay = document.getElementById('jumpscare-overlay');
    const stage = document.getElementById('jumpscare-monster-stage');
    const textEl = document.getElementById('jumpscare-blood-text');

    if (appState.errors.jumpscares !== undefined) {
      appState.errors.jumpscares++;
    } else {
      appState.errors.jumpscares = 1;
    }
    recordError('jumpscares');

    const scareData = MONSTER_SVGS[scareKey] || MONSTER_SVGS[1];

    if (stage) stage.innerHTML = scareData.svg;
    if (textEl) textEl.textContent = scareData.title;

    playTerrifyingJumpScareSound(scareKey);
    document.body.classList.add('screamer-earthquake');

    if (overlay) {
      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');
    }

    if (typeof onComplete === 'function') {
      try {
        onComplete();
      } catch (err) {}
    }

    const dismissScare = () => {
      if (!isJumpScareActive) return;
      isJumpScareActive = false;
      if (jumpscareDismissTimeout) clearTimeout(jumpscareDismissTimeout);
      document.body.classList.remove('screamer-earthquake');
      if (overlay) {
        overlay.style.display = 'none';
        overlay.setAttribute('aria-hidden', 'true');
      }
    };

    if (overlay) {
      overlay.onclick = dismissScare;
    }

    jumpscareDismissTimeout = setTimeout(dismissScare, 1400);
  }

  // ==============================================================
  // 3. SISTEMA DE POPUPS CHATOS E BUROCRÁTICOS
  // ==============================================================
  const popupOverlay = document.getElementById('annoying-popup-overlay');
  const popupCard = document.getElementById('annoying-popup-card');
  const popupBadgeText = document.getElementById('popup-badge-text');
  const popupCloseBtn = document.getElementById('popup-close-btn');
  const popupTitleText = document.getElementById('popup-title-text');
  const popupMessageText = document.getElementById('popup-message-text');
  const popupFineText = document.getElementById('popup-fine-text');
  const popupBtnTrap = document.getElementById('popup-btn-trap');
  const popupBtnConfirm = document.getElementById('popup-btn-confirm');

  let currentPopupActions = {
    onConfirm: null,
    onTrap: null
  };

  function showAnnoyingPopup({ badge, title, message, fine, confirmBtnText, trapBtnText, onConfirm, onTrap, errorType, isError }) {
    playAnnoyingBuzzer();
    appState.trapsAvoided++;
    if (isError !== false) {
      recordError(errorType || 'validation');
    }

    if (popupBadgeText) popupBadgeText.textContent = badge || 'AVISO DE INFRAÇÃO ADMINISTRATIVA';
    if (popupTitleText) popupTitleText.textContent = title || 'Irregularidade Detetada no Balcão';
    if (popupMessageText) popupMessageText.textContent = message || 'O cidadão violou as instruções deste balcão governamental.';
    if (popupFineText) popupFineText.textContent = fine || 'Aumento de 48 horas no tempo de espera do processo.';

    if (popupBtnConfirm) popupBtnConfirm.textContent = confirmBtnText || 'Reconheço o Erro e Peço Desculpa ao Estado';
    if (popupBtnTrap) popupBtnTrap.textContent = trapBtnText || 'Interpor Recurso e Pagar Custas Judiciais';

    currentPopupActions.onConfirm = onConfirm || null;
    currentPopupActions.onTrap = onTrap || null;

    popupCard.classList.remove('popup-shake-anim');
    popupOverlay.style.display = 'flex';
  }

  function hideAnnoyingPopup() {
    popupOverlay.style.display = 'none';
    resetIdleTimer();
  }

  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playAnnoyingBuzzer();
      recordError('closeBtn');
      popupCard.classList.remove('popup-shake-anim');
      void popupCard.offsetWidth;
      popupCard.classList.add('popup-shake-anim');

      popupTitleText.textContent = 'Não Vale Tentar Fechar no "X"!';
      popupMessageText.textContent = 'O Código do Procedimento Administrativo exige que assuma os seus atos e clique formalmente no botão verde de pedido de desculpas!';
      popupFineText.textContent = 'Penalização adicional: Perdeu a prioridade na fila virtual.';
    });
  }

  if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
      if (e.target === popupOverlay) {
        playAnnoyingBuzzer();
        recordError('escape');
        popupCard.classList.remove('popup-shake-anim');
        void popupCard.offsetWidth;
        popupCard.classList.add('popup-shake-anim');

        setBannerDecree('Tentativa de evasão administrativa: Não pode clicar fora do formulário para fugir às suas obrigações cívicas!');
      }
    });
  }

  if (popupBtnConfirm) {
    popupBtnConfirm.addEventListener('click', () => {
      playKeyClick();
      hideAnnoyingPopup();
      if (typeof currentPopupActions.onConfirm === 'function') {
        currentPopupActions.onConfirm();
      }
    });
  }

  if (popupBtnTrap) {
    popupBtnTrap.addEventListener('click', () => {
      playAnnoyingBuzzer();
      recordError('validation');
      popupBadgeText.textContent = 'TRIBUNAL TRIBUTÁRIO &bull; DECISÃO SUMÁRIA';
      popupTitleText.textContent = 'Recurso Indeferido Liminarmente!';
      popupMessageText.textContent = 'O juiz de serviço estava a almoçar e indeferiu o recurso por falta de cópia autenticada. Foram emitidas custas judiciais no valor de 240,00€ a cobrar no IRS.';
      popupFineText.textContent = 'A única saída honrosa é pedir desculpa ao Estado no botão verde.';
      popupBtnTrap.style.display = 'none';
    });
  }

  // ==============================================================
  // 3.1. SISTEMA DE ANÚNCIOS PIRATAS: BETANOL 365
  // ==============================================================
  const pirateAdOverlay = document.getElementById('pirate-ad-overlay');
  const pirateAdCard = document.getElementById('pirate-ad-card');
  const pirateFakeX = document.getElementById('pirate-fake-x');
  const btnBetanolGamble = document.getElementById('btn-betanol-gamble');
  const btnPirateRealClose = document.getElementById('btn-pirate-real-close');

  function showPirateAd(context) {
    playAnnoyingBuzzer();
    recordError('pirate');

    // Abre um novo separador com o anúncio pirata do Betanol 365, tal como nos sites piratas!
    try {
      window.open('betanol.html', '_blank');
    } catch (e) {}

    if (appState.pirateCountdownInterval) {
      clearInterval(appState.pirateCountdownInterval);
      appState.pirateCountdownInterval = null;
    }

    if (btnPirateRealClose) {
      btnPirateRealClose.disabled = true;
      let countdown = 3;
      btnPirateRealClose.textContent = `Aguarde ${countdown}s para dispensar o patrocinador...`;

      appState.pirateCountdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
          btnPirateRealClose.textContent = `Aguarde ${countdown}s para dispensar o patrocinador...`;
        } else {
          clearInterval(appState.pirateCountdownInterval);
          appState.pirateCountdownInterval = null;
          btnPirateRealClose.disabled = false;
          btnPirateRealClose.textContent = 'Fechar Anúncio e Voltar ao Serviço Público »';
        }
      }, 1000);
    }

    if (pirateAdCard) {
      pirateAdCard.classList.remove('popup-shake-anim');
    }
    if (pirateAdOverlay) {
      pirateAdOverlay.style.display = 'flex';
    }

    setBannerDecree('Transmissão pirata BETANOL aberta em novo separador! Aposta já no trânsito da Segunda Circular.');
  }

  function hidePirateAd() {
    if (appState.pirateCountdownInterval) {
      clearInterval(appState.pirateCountdownInterval);
      appState.pirateCountdownInterval = null;
    }
    if (pirateAdOverlay) {
      pirateAdOverlay.style.display = 'none';
    }
    resetIdleTimer();
  }

  if (pirateFakeX) {
    pirateFakeX.addEventListener('click', (e) => {
      e.stopPropagation();
      playAnnoyingBuzzer();
      recordError('closeBtn');
      recordError('pirate');

      // Tentar fechar no [X] como num site pirata abre um novo separador de aposta!
      try {
        window.open('betanol.html', '_blank');
      } catch (err) {}

      if (pirateAdCard) {
        pirateAdCard.classList.remove('popup-shake-anim');
        void pirateAdCard.offsetWidth;
        pirateAdCard.classList.add('popup-shake-anim');
      }

      showAnnoyingPopup({
        badge: 'STREAMING PIRATA • LIGA DO DESENRASCANÇO',
        title: 'Pensavas que Fechavas no "X"?',
        message: 'Isto funciona exatamente como os sites piratas de futebol! Clicar no [X] pequenino abriu mais um separador do Betanol. Aguarda pelo botão no rodapé se quiseres voltar ao balcão.',
        fine: 'Mais 1 clique em anúncios piratas contabilizado no teu cadastro.',
        confirmBtnText: 'Compreendi a lição, vou aguardar pelo rodapé',
        errorType: 'closeBtn'
      });
    });
  }

  if (btnBetanolGamble) {
    btnBetanolGamble.addEventListener('click', () => {
      playAnnoyingBuzzer();
      recordError('pirate');

      // Abre o casino pirata num novo separador
      try {
        window.open('betanol.html', '_blank');
      } catch (err) {}

      showAnnoyingPopup({
        badge: 'BETANOL PRO • CASA DE APOSTAS DO POVO',
        title: 'Aposta Registada com o Reembolso do IRS!',
        message: 'A tua aposta na Segunda Circular parada foi enviada para o sistema! O portal do Betanol abriu num novo separador para confirmares a transmissão ao vivo.',
        fine: 'Odd 1.01 registada. O ganho de 10 cêntimos será creditado em senhas de café.',
        confirmBtnText: 'Voltar ao balcão e conferir a odd',
        errorType: 'pirate'
      });
    });
  }

  if (btnPirateRealClose) {
    btnPirateRealClose.addEventListener('click', () => {
      if (!btnPirateRealClose.disabled) {
        playKeyClick();
        hidePirateAd();
      }
    });
  }

  // ==============================================================
  // 4. DETETOR DE INATIVIDADE (POPUP CHATO AOS 25 SEGUNDOS)
  // ==============================================================
  function resetIdleTimer() {
    if (appState.idleTimer) clearTimeout(appState.idleTimer);
    if (appState.currentStep < 5) {
      appState.idleTimer = setTimeout(() => {
        if (popupOverlay.style.display !== 'flex') {
          showAnnoyingPopup({
            badge: 'GUARDA NACIONAL REPUBLICANA DA VIRTUALIDADE',
            title: 'Está a Dormir no Balcão de Atendimento?',
            message: 'Já se passaram 25 segundos sem mexer o rato nem escrever nada! Há 14 contribuintes virtuais atrás de si à espera da vez na bicha.',
            fine: 'Risco de cancelamento da senha por abandono de posto.',
            confirmBtnText: 'Prometo que estou acordado e vou continuar',
            trapBtnText: 'Desistir e ceder a minha vez ao senhor atrás',
            errorType: 'idle'
          });
        }
      }, 25000);
    }
  }

  // ==============================================================
  // 5. CRONÓMETRO DE SESSÃO & TRACKER DE CLIQUES
  // ==============================================================
  function startSessionTimer() {
    const clockEl = document.getElementById('session-clock');
    appState.sessionInterval = setInterval(() => {
      appState.sessionSeconds--;

      if (appState.sessionSeconds <= 0) {
        appState.sessionSeconds = 240;
        setBannerDecree('A sessão do servidor expirou! Mas como o Conselho de Ministros decretou tolerância de ponto, foram concedidos mais 4 minutos de graça.');
      }

      const m = Math.floor(appState.sessionSeconds / 60);
      const s = appState.sessionSeconds % 60;
      if (clockEl) {
        clockEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }

  let pirateRogueClicks = 0;
  function handleRoguePirateAdClicks(e) {
    if (!e || !e.target) return;
    if (e.target.closest('#btn-pirate-real-close') || e.target.closest('#jumpscare-overlay') || e.target.closest('.jumpscare-overlay')) return;
    pirateRogueClicks++;
    // Como nos sites piratas, a cada 10 cliques ou no 5.º clique abre um novo separador com o anúncio!
    if (pirateRogueClicks === 5 || pirateRogueClicks % 10 === 0) {
      try {
        window.open('betanol.html', '_blank');
        recordError('pirate');
        setBannerDecree('Pop-under pirata BETANOL aberto em novo separador! Trânsito garantido na Segunda Circular.');
      } catch (err) {}
    }
  }

  document.addEventListener('click', (e) => {
    appState.totalClicks++;
    playKeyClick();
    resetIdleTimer();
    handleRoguePirateAdClicks(e);
  });

  document.addEventListener('mousemove', resetIdleTimer);
  document.addEventListener('keydown', resetIdleTimer);

  function setBannerDecree(text) {
    const el = document.getElementById('banner-notice-text');
    if (el) el.textContent = text;
  }

  // ==============================================================
  // 6. NAVEGAÇÃO ENTRE FASES DO PROCEDIMENTO
  // ==============================================================
  function switchProcedureStep(stepNum) {
    const panes = document.querySelectorAll('.gov-pane');
    panes.forEach(p => p.classList.remove('active'));

    const targetPane = document.getElementById(`gov-pane-${stepNum}`);
    if (targetPane) {
      targetPane.classList.add('active');
      appState.currentStep = stepNum;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    for (let i = 1; i <= 5; i++) {
      const stepNode = document.getElementById(`step-node-${i}`);
      if (stepNode) {
        stepNode.classList.remove('active', 'completed');
        if (i < stepNum) {
          stepNode.classList.add('completed');
        } else if (i === stepNum) {
          stepNode.classList.add('active');
        }
      }
    }

    if (stepNum === 2) {
      initStep2TokenAndInvertedKeys();
    } else if (stepNum === 3) {
      if (typeof setDossierTab === 'function') setDossierTab('rules');
    } else if (stepNum === 4) {
      initStep4Review();
    } else if (stepNum === 5) {
      initStep5Triumph();
    }
  }

  // Configuração das Abas do Cabeçalho: APENAS DÁ O SUSTO SEM MUDAR DE ETAPA!
  for (let s = 1; s <= 5; s++) {
    const stepTab = document.getElementById(`step-node-${s}`);
    if (stepTab) {
      stepTab.addEventListener('click', () => {
        // Dispara apenas o susto terrífico correspondente à aba clicada, sem avançar de etapa!
        triggerTabJumpScare(s);
        setBannerDecree(`Acesso direto à Aba ${s} intercetado! O balcão só transita mediante cumprimento dos formulários.`);
      });
      stepTab.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerTabJumpScare(s);
        }
      });
    }
  }

  // ==============================================================
  // 7. ETAPA 1: AUTENTICAÇÃO POR NIF E CHAVE MÓVEL
  // ==============================================================
  const fieldNif = document.getElementById('field-nif');
  const fieldPass = document.getElementById('field-pass');
  const btnTaxEyeTrap = document.getElementById('btn-tax-eye-trap');
  const btnForgotPass = document.getElementById('btn-forgot-password');
  const checkGov2 = document.getElementById('check-gov-2');
  const btnTrapCancelLogin = document.getElementById('btn-trap-cancel-login');
  const btnRealLoginSubmit = document.getElementById('btn-real-login-submit');
  const rowLoginActions = document.getElementById('row-login-actions');
  let loginSwapCount = 0;
  const btnStampCredentials = document.getElementById('btn-stamp-credentials');
  const sealStampedBadge = document.getElementById('seal-stamped-badge');
  const btnTrapFastTrack = document.getElementById('btn-trap-fast-track');

  if (btnRealLoginSubmit) {
    btnRealLoginSubmit.addEventListener('mouseenter', () => {
      if (loginSwapCount < 2) {
        loginSwapCount++;
        recordError('trollBtns');
        playCartoonSlip();
        if (rowLoginActions) {
          rowLoginActions.classList.toggle('swapped');
        }
        setBannerDecree('Remodelação Governamental: Os botões de acesso trocaram de lugar à sua frente!');
      }
      btnRealLoginSubmit.textContent = 'Autorizar Penhora de Vencimento pelo Fisco \u00BB';
      btnRealLoginSubmit.style.background = '#f59e0b';
    });

    btnRealLoginSubmit.addEventListener('mouseleave', () => {
      btnRealLoginSubmit.textContent = 'Entrar no Balcão Único do Cidadão \u00BB';
      btnRealLoginSubmit.style.background = '';
    });
  }

  if (btnTrapFastTrack) {
    btnTrapFastTrack.addEventListener('click', () => {
      showPirateAd('via_verde_trap');
    });
  }

  if (btnStampCredentials) {
    btnStampCredentials.addEventListener('click', () => {
      playKeyClick();
      appState.isCredentialsStamped = true;
      btnStampCredentials.classList.add('stamped');
      if (sealStampedBadge) {
        sealStampedBadge.style.display = 'inline-block';
      }
      showAnnoyingPopup({
        badge: 'NOTARIADO CENTRAL DA REPÚBLICA',
        title: 'Credenciais Autenticadas com Selo Branco!',
        message: 'O Selo Oficial da República foi aposto com sucesso sobre o seu NIF e palavra-passe. O balcão reconhece agora a validade notarial do documento perante a Portaria n.º 2026.',
        fine: 'Pode agora prosseguir para a entrada no Balcão Único.',
        confirmBtnText: 'Prosseguir com as credenciais carimbadas',
        isError: false
      });
    });
  }

  if (fieldNif) {
    fieldNif.addEventListener('paste', (e) => {
      e.preventDefault();
      showAnnoyingPopup({
        badge: 'COMISSÃO NACIONAL DE COMBATE À PREGUIÇA',
        title: 'Tentativa de Chico-Espertice com Copy/Paste!',
        message: 'É expressamente proibido colar números de contribuinte neste balcão. O Estado Português exige que cada algarismo seja digitado com o suor dos seus próprios dedos.',
        fine: 'Obrigatoriedade de digitar o NIF à mão, algarismo a algarismo.',
        errorType: 'paste'
      });
    });
  }

  if (btnTaxEyeTrap) {
    btnTaxEyeTrap.addEventListener('click', () => {
      fieldPass.value = '';
      showAnnoyingPopup({
        badge: 'MINISTÉRIO DAS FINANÇAS &bull; DIREÇÃO DE IMPOSTOS',
        title: 'Taxa de Visualização de Palavra-passe Não Liquidada',
        message: 'A visualização de senhas da Chave Móvel Digital está sujeita a 23% de IVA e taxa de imposto de selo. Por falta de pagamento prévio por Multibanco, a palavra-passe foi limpa!',
        fine: 'Terá de escrever a palavra-passe toda de novo para aprender.',
        confirmBtnText: 'Prometo que não volto a espreitar senhas',
        trapBtnText: 'Pedir isenção de IVA para ver a senha',
        errorType: 'peek'
      });
    });
  }

  if (btnForgotPass) {
    btnForgotPass.addEventListener('click', () => {
      showAnnoyingPopup({
        badge: 'AGÊNCIA PARA A MODERNIZAÇÃO ADMINISTRATIVA',
        title: 'Agendamento de Nova Chave Móvel Digital',
        message: 'A recuperação automática de senhas está suspensa. O próximo balcão com vaga disponível fica em Bragança, no dia 14 de Novembro de 2028 às 08h15.',
        fine: 'Mais vale lembrar-se da senha que definiu originalmente.',
        confirmBtnText: 'Vou tentar lembrar-me da palavra-passe',
        errorType: 'validation'
      });
    });
  }

  if (btnTrapCancelLogin) {
    btnTrapCancelLogin.addEventListener('click', () => {
      showAnnoyingPopup({
        badge: 'TRIBUNAL CONSTITUCIONAL DA REPÚBLICA',
        title: 'Recurso Constitucional Deferido... Com Custas!',
        message: 'O Tribunal aceitou a sua desistência com agrado! O formulário foi anulado e a sua senha de atendimento foi atirada para o caixote do lixo.',
        fine: 'Volta diretamente para o início da fila sem direito a resmungar.',
        confirmBtnText: 'Voltar ao balcão e começar do zero',
        errorType: 'validation',
        onConfirm: () => {
          fieldNif.value = '';
          fieldPass.value = '';
          document.getElementById('check-gov-1').checked = false;
          document.getElementById('check-gov-2').checked = false;
        }
      });
    });
  }

  if (btnRealLoginSubmit) {
    btnRealLoginSubmit.addEventListener('click', () => {
      const nif = fieldNif.value.trim().replace(/\D/g, '');
      const pass = fieldPass.value;

      if (!nif || nif.length !== 9) {
        showAnnoyingPopup({
          badge: 'AUTORIDADE TRIBUTÁRIA E ADUANEIRA (AT)',
          title: 'NIF Incompleto ou Fictício Detetado',
          message: 'O contribuinte tentou validar um NIF que não tem 9 algarismos! O Fisco não tolera números cortados pela metade.',
          fine: 'Insira os 9 algarismos completos do seu documento oficial.',
          errorType: 'validation',
          onConfirm: () => fieldNif.focus()
        });
        return;
      }

      const firstDigit = nif[0];
      if (firstDigit !== '1' && firstDigit !== '2' && firstDigit !== '5') {
        showAnnoyingPopup({
          badge: 'DIREÇÃO-GERAL DE IDENTIFICAÇÃO FISCAL',
          title: 'NIF Não Homologado em Território Nacional',
          message: `O NIF iniciado por "${firstDigit}" não é reconhecido pelas Finanças. Os NIFs portugueses válidos começam rigorosamente por 1 (solteiro/individual), 2 (casado/individual) ou 5 (empresa).`,
          fine: 'Correção obrigatória antes de poder entrar no portal.',
          errorType: 'validation',
          onConfirm: () => fieldNif.focus()
        });
        return;
      }

      if (!pass || pass.length < 8) {
        showAnnoyingPopup({
          badge: 'CENTRO NACIONAL DE CIBERSEGURANÇA',
          title: 'Palavra-passe Curta Demais para o Estado',
          message: 'A sua Chave Móvel Digital possui menos de 8 carateres. O Governo exige pelo menos 8 carateres para evitar que hackers entrem para pagar os seus impostos por si.',
          fine: 'Adicione mais carateres até satisfazer o algoritmo.',
          errorType: 'validation',
          onConfirm: () => fieldPass.focus()
        });
        return;
      }

      if (!/[A-Z]/.test(pass)) {
        showAnnoyingPopup({
          badge: 'CENTRO NACIONAL DE CIBERSEGURANÇA',
          title: 'Falta de Letra Maiúscula na Chave Móvel',
          message: 'A palavra-passe tem de ter pelo menos uma letra MAIÚSCULA em sinal de respeito e autoridade perante o sistema.',
          fine: 'Coloque pelo menos uma letra maiúscula.',
          errorType: 'validation',
          onConfirm: () => fieldPass.focus()
        });
        return;
      }

      if (!/\d/.test(pass)) {
        showAnnoyingPopup({
          badge: 'CENTRO NACIONAL DE CIBERSEGURANÇA',
          title: 'Falta de Algarismo Numérico na Chave',
          message: 'A palavra-passe tem obrigatoriamente de incluir pelo menos um número. Não pode ser só palavras bonitas.',
          fine: 'Adicione um dígito numérico.',
          errorType: 'validation',
          onConfirm: () => fieldPass.focus()
        });
        return;
      }

      if (!checkGov2.checked) {
        showAnnoyingPopup({
          badge: 'SECRETARIA DE ESTADO DOS ASSUNTOS FISCAIS',
          title: 'Falta de Autorização de Abate no IRS',
          message: 'É estritamente mandatório pelo Código Tributário autorizar o abate da sua indignação no próximo reembolso do IRS. Não podemos admitir queixas sem a respetiva contrapartida orçamental!',
          fine: 'Marque a segunda caixa de seleção para avançar.',
          errorType: 'validation'
        });
        return;
      }

      if (!appState.isCredentialsStamped) {
        showAnnoyingPopup({
          badge: 'CARTÓRIO NOTARIAL DO ESTADO',
          title: 'Credenciais Sem Selo Branco Obrigatório!',
          message: 'Não pode entrar no balcão sem autenticar as credenciais! Localize e carregue no botão "CARIMBAR COM O SELO DA REPÚBLICA" na Câmara do Selo Notarial antes de tentar entrar.',
          fine: 'Falta de formalidade notarial prévia.',
          errorType: 'validation',
          onConfirm: () => {
            const chamber = document.getElementById('seal-chamber');
            if (chamber) chamber.scrollIntoView({ behavior: 'smooth' });
          }
        });
        return;
      }

      appState.citizenDossier.nif = nif;
      appState.citizenDossier.password = pass;
      triggerTabJumpScare(2, () => switchProcedureStep(2));
    });
  }

  // ==============================================================
  // 8. ETAPA 2: A ZONA DE TECLAS INVERTIDAS & 2FA
  // ==============================================================
  const drTokenDisplay = document.getElementById('dr-token-display');
  const otpCells = document.querySelectorAll('.otp-cell');
  const btnOtpRenew = document.getElementById('btn-otp-renew');
  const btnOtpValidate = document.getElementById('btn-otp-validate');

  // Elementos da Zona de Teclas Invertidas
  const targetRefSample = document.getElementById('target-ref-sample');
  const btnCopyTargetRef = document.getElementById('btn-copy-target-ref');
  const fieldInvertedRef = document.getElementById('field-inverted-ref');

  // Elementos do Armário de Arquivo & Procura de Carimbo
  const drawerBtn1 = document.getElementById('drawer-btn-1');
  const drawerBtn2 = document.getElementById('drawer-btn-2');
  const drawerBtn3 = document.getElementById('drawer-btn-3');
  const cabinetStatusText = document.getElementById('cabinet-status-text');

  // Elementos do Botão Troll Encolhedor (Austeridade)
  const btnTrollFastPass = document.getElementById('btn-troll-fast-pass');
  const trollShrinkNotice = document.getElementById('troll-shrink-notice');
  let shrinkStep = 0;

  function initStep2TokenAndInvertedKeys() {
    // Gera código 2FA
    const p1 = Math.floor(Math.random() * 899) + 100;
    const p2 = Math.floor(Math.random() * 899) + 100;
    appState.activeToken = `${p1}${p2}`;

    if (drTokenDisplay) {
      drTokenDisplay.textContent = `${p1} ${p2}`;
    }

    otpCells.forEach(cell => cell.value = '');
    if (otpCells[0]) otpCells[0].focus();

    // Gera Referência Oficial Longa
    const rNum1 = Math.floor(Math.random() * 8999) + 1000;
    const rNum2 = Math.floor(Math.random() * 8999) + 1000;
    const letters = ['X', 'Z', 'K', 'W', 'Q'];
    const letter = letters[Math.floor(Math.random() * letters.length)];
    appState.targetReference = `PT-${rNum1}-${rNum2}-${letter}`;

    if (targetRefSample) {
      targetRefSample.textContent = appState.targetReference;
    }

    if (fieldInvertedRef) {
      fieldInvertedRef.value = '';
    }

    // Reinicia estado das gavetas do arquivo morto
    appState.isStep2StampFound = false;
    if (drawerBtn1) drawerBtn1.classList.remove('drawer-opened-fail', 'drawer-opened-success');
    if (drawerBtn2) drawerBtn2.classList.remove('drawer-opened-fail', 'drawer-opened-success');
    if (drawerBtn3) drawerBtn3.classList.remove('drawer-opened-fail', 'drawer-opened-success');
    if (cabinetStatusText) {
      cabinetStatusText.textContent = 'Nenhuma gaveta aberta. O botão de homologação permanece trancado sem carimbo oficial.';
      cabinetStatusText.style.color = '#64748b';
    }

    // Reinicia botão troll de austeridade
    shrinkStep = 0;
    if (btnTrollFastPass) {
      btnTrollFastPass.style.transform = 'scale(1)';
      btnTrollFastPass.style.opacity = '1';
    }
    if (trollShrinkNotice) {
      trollShrinkNotice.textContent = '';
    }
  }

  // Comportamento do Botão Troll Encolhedor por Austeridade
  if (btnTrollFastPass) {
    btnTrollFastPass.addEventListener('mouseenter', () => {
      if (shrinkStep < 4) {
        shrinkStep++;
        recordError('trollBtns');
        playCartoonSlip();
        const scales = [0.75, 0.48, 0.25, 0.10];
        const texts = [
          'Cativação orçamental de 25% aplicada pelo Ministério das Finanças!',
          'Corte de despesa pública! O botão perdeu mais 25% do seu tamanho.',
          'Austeridade máxima: O botão foi reduzido a uma migalha orçamental.',
          'O botão evaporou-se dos autos por falta de verbas comunitárias.'
        ];
        btnTrollFastPass.style.transform = `scale(${scales[shrinkStep - 1]})`;
        if (trollShrinkNotice) trollShrinkNotice.textContent = texts[shrinkStep - 1];
        if (shrinkStep === 4) btnTrollFastPass.style.opacity = '0.35';
      }
    });

    btnTrollFastPass.addEventListener('click', () => {
      recordError('trollBtns');
      playAnnoyingBuzzer();
      showAnnoyingPopup({
        badge: 'MEMORANDO DA TROIKA \u2022 REGULAMENTO 2011',
        title: 'Atalho VIP Cancelado por Austeridade!',
        message: 'A via rápida governamental foi extinta em 2011 por imposição do FMI e da Comissão Europeia. Para validar o código, tem de abrir o armário de arquivo e resolver as teclas invertidas como todos os contribuintes!',
        fine: 'Penalização por tentativa de fuga à fila pública.',
        confirmBtnText: 'Voltar à austeridade e abrir as gavetas',
        errorType: 'trollBtns'
      });
    });
  }

  // Comportamento do OTP de 6 números
  otpCells.forEach((cell, idx) => {
    cell.addEventListener('input', (e) => {
      const val = e.target.value.replace(/\D/g, '');
      e.target.value = val;

      if (val && idx < otpCells.length - 1) {
        otpCells[idx + 1].focus();
      }
    });

    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !cell.value && idx > 0) {
        otpCells[idx - 1].focus();
      }
    });

    cell.addEventListener('paste', (e) => {
      e.preventDefault();
      showAnnoyingPopup({
        badge: 'IMPRENSA NACIONAL &bull; GABINETE DE FRAUDE',
        title: 'Proibido Colar o Código do Diário da República!',
        message: 'A colagem automática de códigos foi banida por portaria ministerial. Deve transcrever os 6 números com calma e decoro cívico.',
        fine: 'Obrigatoriedade de teclar os 6 dígitos individualmente.',
        errorType: 'paste'
      });
    });
  });

  // ==============================================================
  // A MECÂNICA HILARIANTE: ATALHOS INVERTIDOS & TECLAS EM MARCHA-ATRÁS
  // ==============================================================

  // Se o utilizador carregar no botão de copiar a referência:
  // Ela é copiada INVERTIDA para a área de transferência!
  if (btnCopyTargetRef) {
    btnCopyTargetRef.addEventListener('click', () => {
      playKeyClick();
      const reversedRef = appState.targetReference.split('').reverse().join('');
      appState.lastCopiedRef = reversedRef;
      navigator.clipboard.writeText(reversedRef).then(() => {
        setBannerDecree(`Referência copiada para a área de transferência em modo espelho: "${reversedRef}" (Norma NP-404).`);
      }).catch(() => {});

      showAnnoyingPopup({
        badge: 'DIREÇÃO-GERAL DE SIMPLIFICAÇÃO COMPLEXA',
        title: 'Referência Copiada... Mas de Trás para a Frente!',
        message: `O texto copiado foi invertido automaticamente para "${reversedRef}". Em cumprimento da portaria de segurança, para colar direito terá de descobrir o truque do balcão!`,
        fine: 'Boa sorte a tentar colar no campo abaixo.',
        confirmBtnText: 'Vou tentar colar mesmo assim',
        isError: false
      });
    });
  }

  // Interceção da zona onde o utilizador tenta Ctrl+C / Ctrl+V e digitação
  if (fieldInvertedRef) {
    
    // Interceta atalhos no teclado:
    fieldInvertedRef.addEventListener('keydown', (e) => {
      const isCtrl = e.ctrlKey || e.metaKey;

      // 1. O utilizador tentou Ctrl+C no campo:
      // Inversão: Ctrl+C atua como PASTE (cola invertido)!
      if (isCtrl && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        playAnnoyingBuzzer();

        const textToPaste = appState.lastCopiedRef || appState.targetReference;
        const reversed = textToPaste.split('').reverse().join('');
        fieldInvertedRef.value = reversed;
        showAnnoyingPopup({
          badge: 'SECRETARIA DE ESTADO DA TRANSIÇÃO DIGITAL',
          title: 'Atalhos Trocados: Fez Ctrl+C e o Campo Colou?!',
          message: 'Avisámos que neste balcão os atalhos foram invertidos pela Norma NP-404! O Ctrl+C cola e o Ctrl+V copia! O texto foi colado ao contrário.',
          fine: 'Confira o que ficou escrito no campo.',
          errorType: 'paste'
        });
        return;
      }

      // 2. Se for Ctrl+V: deixamos prosseguir para o evento 'paste' nativo
      if (isCtrl && (e.key === 'v' || e.key === 'V')) {
        return;
      }

      // 3. DIGITAÇÃO DIRETA COM TECLAS INVERTIDAS (MARCHA-ATRÁS):
      // Se teclar letras, números ou hífen, o carater entra no INÍCIO do campo!
      if (!isCtrl && e.key.length === 1 && !e.altKey) {
        e.preventDefault();
        playKeyClick();
        // Insere o caráter na posição inicial (marcha-atrás)!
        fieldInvertedRef.value = e.key + fieldInvertedRef.value;
        return;
      }

      // Se carregar em Backspace: apaga do início em vez do fim!
      if (e.key === 'Backspace') {
        e.preventDefault();
        playKeyClick();
        if (fieldInvertedRef.value.length > 0) {
          fieldInvertedRef.value = fieldInvertedRef.value.slice(1);
        }
        return;
      }
    });

    // Interceção do evento Paste padrão do browser (via Ctrl+V ou clique direito)
    fieldInvertedRef.addEventListener('paste', (e) => {
      e.preventDefault();
      playAnnoyingBuzzer();

      const pasted = (e.clipboardData || window.clipboardData).getData('text') || appState.lastCopiedRef || appState.targetReference;
      const reversed = pasted.split('').reverse().join('');
      fieldInvertedRef.value = reversed;

      if (fieldInvertedRef.value === appState.targetReference) {
        showAnnoyingPopup({
          badge: 'DIREÇÃO-GERAL DE MODERNIZAÇÃO ADMINISTRATIVA',
          title: 'Genial! Dupla Inversão Descodificada!',
          message: `Ao colar a referência que já tinha sido copiada ao contrário pelo botão oficial, as duas inversões anularam-se e a referência ficou rigorosamente correta: "${appState.targetReference}"!\n\nO Estado Português felicita a sua destreza burocrática.`,
          fine: 'Pode agora homologar o código e avançar para a queixa.',
          isError: false
        });
      } else {
        showAnnoyingPopup({
          badge: 'AUTORIDADE DE NORMAS DIGITAIS',
          title: 'Apanhado! Tentou Usar Ctrl+V?',
          message: `Detetada tentativa de colar com Ctrl+V! O texto "${pasted}" foi inserido ao contrário como "${reversed}" para testar se estava atento!`,
          fine: 'O código ficou de pernas para o ar.',
          errorType: 'inverted'
        });
      }
    });
  }

  // Renovar Token / Parecer
  if (btnOtpRenew) {
    btnOtpRenew.addEventListener('click', () => {
      initStep2TokenAndInvertedKeys();
      showAnnoyingPopup({
        badge: 'TRIBUNAL DE CONTAS DA REPÚBLICA',
        title: 'Novo Parecer Jurídico Adjudicado!',
        message: 'Foi contratada uma sociedade de advogados por ajuste direto no valor de 450.000€ para emitir um novo código e nova referência. Os dados foram atualizados.',
        fine: 'Despesa pública imputada aos contribuintes em geral.',
        confirmBtnText: 'Entendido, vou tentar outra vez',
        isError: false
      });
    });
  }

  // Procura do Carimbo Oficial nas Gavetas do Arquivo Morto
  if (drawerBtn1) {
    drawerBtn1.addEventListener('click', () => {
      playAnnoyingBuzzer();
      recordError('drawers');
      drawerBtn1.classList.add('drawer-opened-fail');
      if (cabinetStatusText) {
        cabinetStatusText.textContent = 'Gaveta A: Processos de 1994 cobertos de pó e teias de aranha. Nenhum carimbo encontrado.';
        cabinetStatusText.style.color = 'var(--flag-red)';
      }
      showAnnoyingPopup({
        badge: 'ARQUIVO MORTO DA SECRETARIA-GERAL',
        title: 'Nuvem de Pó e Teias de Aranha!',
        message: 'Abriu a Gaveta A e deparou-se com processos amarelados sobre o Euro 2004 e faturas da Expo 98. Levantou tanto pó que fez o funcionário do balcão espirrar durante 5 minutos!',
        fine: 'Penalização por perturbação do sossego do arquivo morto.',
        errorType: 'drawers'
      });
    });
  }

  if (drawerBtn2) {
    drawerBtn2.addEventListener('click', () => {
      recordError('drawers');
      drawerBtn2.classList.add('drawer-opened-fail');
      if (cabinetStatusText) {
        cabinetStatusText.textContent = 'Gaveta B: Encontrou panfletos publicitários do Betanol 365! O anúncio disparou no balcão.';
        cabinetStatusText.style.color = 'var(--flag-gold)';
      }
      showPirateAd('drawer_betanol');
    });
  }

  if (drawerBtn3) {
    drawerBtn3.addEventListener('click', () => {
      playKeyClick();
      appState.isStep2StampFound = true;
      drawerBtn3.classList.add('drawer-opened-success');
      if (cabinetStatusText) {
        cabinetStatusText.textContent = 'Gaveta C: Carimbo Oficial da 2ª Série recuperado e aplicado ao processo com sucesso!';
        cabinetStatusText.style.color = 'var(--flag-green)';
      }
      showAnnoyingPopup({
        badge: 'DIREÇÃO-GERAL DO PATRIMÓNIO DO ESTADO',
        title: 'Carimbo Ministerial Encontrado!',
        message: 'Encontrou o Carimbo Oficial da 2ª Série escondido por baixo de um maço de senhas antigas! O requerimento recebeu a chancela a óleo obrigatória para homologação.',
        fine: 'O botão de homologação está agora formalmente autorizado a despachar.',
        isError: false
      });
    });
  }

  // Validação da Etapa 2 (Exige OTP, Referência com Teclas Invertidas E Carimbo do Arquivo)
  if (btnOtpValidate) {
    btnOtpValidate.addEventListener('click', () => {
      let enteredOtp = '';
      otpCells.forEach(c => enteredOtp += c.value);

      if (enteredOtp.length < 6) {
        showAnnoyingPopup({
          badge: 'IMPRENSA NACIONAL &bull; VERIFICAÇÃO DE TEXTO',
          title: 'Código do Visor Incompleto!',
          message: 'Preencheu apenas parte das caixas de números do visor verde! Transcreva todos os 6 algarismos.',
          fine: 'Preencha todas as 6 caixas para desbloquear.',
          errorType: 'validation',
          onConfirm: () => {
            for (let i = 0; i < otpCells.length; i++) {
              if (!otpCells[i].value) { otpCells[i].focus(); break; }
            }
          }
        });
        return;
      }

      if (enteredOtp !== appState.activeToken) {
        showAnnoyingPopup({
          badge: 'DIÁRIO DA REPÚBLICA &bull; 2ª SÉRIE',
          title: 'Código Divergente do Decreto em Vigor!',
          message: `O número que escreveu (${enteredOtp}) não bate certo com o código no visor (${appState.activeToken}). Olhe com mais atenção!`,
          fine: 'Corrija os algarismos errados.',
          errorType: 'validation',
          onConfirm: () => {
            otpCells.forEach(c => c.value = '');
            if (otpCells[0]) otpCells[0].focus();
          }
        });
        return;
      }

      // Validação da Referência Invertida:
      const enteredRef = fieldInvertedRef.value.trim();

      if (!enteredRef) {
        showAnnoyingPopup({
          badge: 'GABINETE DE TRANSCRIÇÃO DE PROTOCOLO',
          title: 'Falta Preencher a Referência Obrigatória!',
          message: 'Tem de preencher o campo da referência oficial! Lembre-se da dica das teclas invertidas.',
          fine: 'Insira a referência no campo.',
          errorType: 'inverted',
          onConfirm: () => fieldInvertedRef.focus()
        });
        return;
      }

      if (enteredRef !== appState.targetReference) {
        showAnnoyingPopup({
          badge: 'AUDITORIA DE DIGITAÇÃO EM MARCHA-ATRÁS',
          title: 'Referência de Protocolo Incorreta!',
          message: `A referência inserida foi "${enteredRef}", mas a oficial é "${appState.targetReference}".\n\nComo as teclas estão invertidas (marcha-atrás), para o texto sair correto tem de digitar de trás para a frente (ou colar o texto que foi copiado em espelho)!`,
          fine: 'Obrigatoriedade de acertar na referência exata.',
          errorType: 'inverted',
          onConfirm: () => fieldInvertedRef.focus()
        });
        return;
      }

      // Validação do Carimbo da Gaveta
      if (!appState.isStep2StampFound) {
        showAnnoyingPopup({
          badge: 'INSPEÇÃO-GERAL DOS REGISTOS E NOTARIADO',
          title: 'Falta o Carimbo Ministerial da Gaveta C!',
          message: 'O formulário carece do Carimbo Oficial da 2ª Série! Procure no Armário de Arquivo Morto acima e abra a gaveta correta para resgatar o carimbo antes de homologar.',
          fine: 'Rejeição liminar por carência de chancela física.',
          errorType: 'validation',
          onConfirm: () => {
            const cabinet = document.getElementById('gov-filing-cabinet');
            if (cabinet) cabinet.scrollIntoView({ behavior: 'smooth' });
          }
        });
        return;
      }

      // Sucesso na Etapa 2!
      triggerTabJumpScare(3, () => switchProcedureStep(3));
    });
  }

  // ==============================================================
  // 9. ETAPA 3: REQUERIMENTO OFICIAL MOD. 22-B
  // ==============================================================
  const selectMinistry = document.getElementById('select-ministry');
  const ministryHelpText = document.getElementById('ministry-help-text');
  const radioTiles = document.querySelectorAll('.gov-radio-tile');
  const fieldGovSubject = document.getElementById('field-gov-subject');
  const fieldGovText = document.getElementById('field-gov-text');
  const govCharCounter = document.getElementById('gov-char-counter');
  const certFilenameLabel = document.getElementById('cert-filename-label');
  const govFileNative = document.getElementById('gov-file-native');
  const btnBrowseCert = document.getElementById('btn-browse-cert');
  const btnAutoStampCert = document.getElementById('btn-auto-stamp-cert');
  const btnCopyTargetMinuta = document.getElementById('btn-copy-target-minuta');

  const btnBackToStep2 = document.getElementById('btn-back-to-step-2');
  const btnSubmitComplaintStep = document.getElementById('btn-submit-complaint-step');

  // Elementos do Dossiê de Despacho (Abas), Decoy Pirata e Botão em Fuga
  const pirateBaitStep3 = document.getElementById('pirate-bait-step3');
  const tabBtnRules = document.getElementById('tab-btn-rules');
  const tabBtnDispatch = document.getElementById('tab-btn-dispatch');
  const tabPanelRules = document.getElementById('tab-panel-rules');
  const tabPanelDispatch = document.getElementById('tab-panel-dispatch');
  const btnSwitchToDispatch = document.getElementById('btn-switch-to-dispatch');
  const dodgeAlertBox = document.getElementById('dodge-alert-box');
  let complaintDodgeCount = 0;

  if (pirateBaitStep3) {
    pirateBaitStep3.addEventListener('click', () => {
      showPirateAd('stream_bait');
    });
  }

  function setDossierTab(tab) {
    playKeyClick();
    if (tab === 'rules') {
      if (tabBtnRules) tabBtnRules.classList.add('active');
      if (tabBtnDispatch) tabBtnDispatch.classList.remove('active');
      if (tabPanelRules) tabPanelRules.style.display = 'block';
      if (tabPanelDispatch) tabPanelDispatch.style.display = 'none';
    } else if (tab === 'dispatch') {
      if (tabBtnDispatch) tabBtnDispatch.classList.add('active');
      if (tabBtnRules) tabBtnRules.classList.remove('active');
      if (tabPanelDispatch) tabPanelDispatch.style.display = 'block';
      if (tabPanelRules) tabPanelRules.style.display = 'none';
    }
  }

  if (tabBtnRules) tabBtnRules.addEventListener('click', () => triggerTabJumpScare('rules', () => setDossierTab('rules')));
  if (tabBtnDispatch) tabBtnDispatch.addEventListener('click', () => triggerTabJumpScare('dispatch', () => setDossierTab('dispatch')));
  if (btnSwitchToDispatch) btnSwitchToDispatch.addEventListener('click', () => triggerTabJumpScare('dispatch', () => setDossierTab('dispatch')));

  const officialMinutaText = "Exmo. Senhor Ministro, venho por este meio expor com a devida vénia republicana que este balcão necessita de resolução célere e urgente.";

  function updateGovTextCounter() {
    if (!fieldGovText || !govCharCounter) return;
    const count = fieldGovText.value.length;
    govCharCounter.textContent = `${count} / 80 carateres obrigatórios (máx 350)`;

    if (count >= 80 && count <= 350) {
      govCharCounter.style.color = 'var(--flag-green)';
    } else if (count > 350) {
      govCharCounter.style.color = 'var(--flag-red)';
      govCharCounter.textContent = `${count} / 350 carateres (EXCESSO VERBAL)`;
    } else {
      govCharCounter.style.color = 'var(--gov-ink-muted)';
    }
  }

  // ZONA 2: Cópia da Minuta Oficial (com inversão estratégica para a área de transferência)
  if (btnCopyTargetMinuta) {
    btnCopyTargetMinuta.addEventListener('click', () => {
      playKeyClick();
      const reversedMinuta = officialMinutaText.split('').reverse().join('');
      appState.lastCopiedMinuta = reversedMinuta;
      navigator.clipboard.writeText(reversedMinuta).then(() => {
        setBannerDecree(`Minuta ministerial copiada para o clipboard em modo espelho (Portaria n.º 42-A).`);
      }).catch(() => {});

      showAnnoyingPopup({
        badge: 'GABINETE DE SIMPLIFICAÇÃO MINISTERIAL',
        title: 'Minuta Copiada em Modo Espelho!',
        message: 'A minuta protocolar foi copiada para a área de transferência ao contrário. Em cumprimento da Portaria n.º 42-A de combate a queixas pré-fabricadas, se a colar com Ctrl+V ela desinverter-se-á pela mecânica oficial do balcão!',
        fine: 'Boa sorte a colar no formulário abaixo.',
        confirmBtnText: 'Vou tentar colar no requerimento',
        isError: false
      });
    });
  }

  if (selectMinistry) {
    selectMinistry.addEventListener('change', () => {
      const val = selectMinistry.value;
      if (val === 'financas') {
        ministryHelpText.textContent = 'Aviso Tributário: A queixa foi reencaminhada para liquidação prévia de imposto extraordinário de paciência.';
        ministryHelpText.style.color = 'var(--flag-red)';
      } else if (val === 'saude') {
        ministryHelpText.textContent = 'Aviso do SNS: O médico que deveria ler este requerimento está à espera de vaga há 6 anos.';
        ministryHelpText.style.color = 'var(--flag-gold)';
      } else if (val === 'primeiro_ministro') {
        ministryHelpText.textContent = 'Atenção: Enquanto o utilizador preenchia a página, o Ministro tutelar apresentou a demissão ao Presidente.';
        ministryHelpText.style.color = 'var(--flag-red)';
      } else {
        ministryHelpText.textContent = 'Ministério afeto com sucesso nos trâmites burocráticos do Estado.';
        ministryHelpText.style.color = 'var(--gov-ink-muted)';
      }
    });
  }

  radioTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      radioTiles.forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      const input = tile.querySelector('input');
      if (input) {
        input.checked = true;
        appState.citizenDossier.influence = input.value;
        const headline = tile.querySelector('.tile-headline');
        appState.citizenDossier.influenceName = headline ? headline.textContent : input.value;
      }
    });
  });

  if (fieldGovText) {
    fieldGovText.addEventListener('input', updateGovTextCounter);

    // Interceção de Atalhos de Teclado no Requerimento:
    fieldGovText.addEventListener('keydown', (e) => {
      const isCtrl = e.ctrlKey || e.metaKey;

      // 1. Se carregar em Ctrl+C no requerimento vazio ou sem seleção:
      if (isCtrl && (e.key === 'c' || e.key === 'C')) {
        if (!fieldGovText.value || fieldGovText.selectionStart === fieldGovText.selectionEnd) {
          e.preventDefault();
          playAnnoyingBuzzer();

          // Em vez de copiar, cola de emergência a minuta!
          const textToPaste = appState.lastCopiedMinuta || officialMinutaText;
          const reversed = textToPaste.split('').reverse().join('');
          fieldGovText.value = reversed;
          updateGovTextCounter();

          showAnnoyingPopup({
            badge: 'SECRETARIA DE ESTADO DA TRANSIÇÃO DIGITAL',
            title: 'Atalhos Trocados: Fez Ctrl+C no Campo!',
            message: 'Avisámos que neste balcão os atalhos foram invertidos pela Norma NP-404! O Ctrl+C atua como colagem governamental.',
            fine: 'Norma de atalhos NP-404 ativa.',
            errorType: 'paste'
          });
        }
      }
    });

    // Interceção do Paste no Requerimento (inversão tática):
    fieldGovText.addEventListener('paste', (e) => {
      e.preventDefault();
      playAnnoyingBuzzer();

      const pasted = (e.clipboardData || window.clipboardData).getData('text') || appState.lastCopiedMinuta || officialMinutaText;
      const reversed = pasted.split('').reverse().join('');

      // Insere o texto invertido no campo
      const start = fieldGovText.selectionStart || 0;
      const end = fieldGovText.selectionEnd || 0;
      const current = fieldGovText.value || '';
      fieldGovText.value = current.substring(0, start) + reversed + current.substring(end);
      fieldGovText.selectionStart = fieldGovText.selectionEnd = start + reversed.length;

      updateGovTextCounter();

      // Se após inverter ficou com a saudação oficial "Exmo. Senhor Ministro", é porque usou a minuta que já estava espelhada!
      if (fieldGovText.value.toLowerCase().startsWith('exmo. senhor ministro')) {
        showAnnoyingPopup({
          badge: 'DIREÇÃO-GERAL DO PROTOCOLO DE ESTADO',
          title: 'Dupla Inversão Concluída com Sucesso!',
          message: 'Parabéns pela destreza cívica! Como a minuta oficial já tinha sido copiada ao contrário e o campo inverte na colagem, as duas inversões cancelaram-se mutuamente e o texto ficou impecável!\n\nRequisito dos 80 carateres e saudação protocolar cumpridos com distinção.',
          fine: 'Pode agora anexar a certidão e submeter a queixa.',
          isError: false
        });
      } else {
        showAnnoyingPopup({
          badge: 'INSPEÇÃO-GERAL DA ADMINISTRAÇÃO PÚBLICA',
          title: 'Apanhado com Ctrl+V! Texto Invertido!',
          message: `Detetada tentativa de despachar o requerimento com Ctrl+V! Em cumprimento da Portaria Ministerial de Combate à Preguiça Digital, o texto colado foi invertido:\n\n"${reversed.substring(0, 60)}..."\n\nO requerimento DEVE principiar por "Exmo. Senhor Ministro". Se não quiser redigir à mão, utilize o botão da minuta governamental que já traz a inversão calibrada!`,
          fine: 'Texto de pernas para o ar.',
          errorType: 'paste'
        });
      }
    });
  }

  if (btnBrowseCert && govFileNative) {
    btnBrowseCert.addEventListener('click', () => govFileNative.click());

    govFileNative.addEventListener('change', (e) => {
      const f = e.target.files[0];
      if (f) {
        if (!f.name.endsWith('.txt')) {
          showAnnoyingPopup({
            badge: 'CONSERVATÓRIA DOS REGISTOS CENTRAIS',
            title: 'Formato de Certidão Rejeitado Liminarmente!',
            message: 'O Governo da República aceita estritamente documentos com extensão .txt em texto puro. Ficheiros PDF, Word ou imagens não têm carimbo reconhecido.',
            fine: 'Anexe unicamente um documento de texto simples com extensão .txt.',
            errorType: 'validation'
          });
          return;
        }
        appState.citizenDossier.certFileName = f.name;
        certFilenameLabel.textContent = f.name;
        certFilenameLabel.style.color = 'var(--flag-green)';
      }
    });
  }

  if (btnAutoStampCert) {
    btnAutoStampCert.addEventListener('click', () => {
      appState.citizenDossier.certFileName = 'certidao_resiliencia_cidadao_mod3.txt';
      certFilenameLabel.textContent = 'certidao_resiliencia_cidadao_mod3.txt (Carimbado em Triplicado)';
      certFilenameLabel.style.color = 'var(--flag-green)';
      setBannerDecree('Certidão oficial emitida pela Junta de Freguesia e anexada aos autos com carimbo a óleo.');
    });
  }

  if (btnBackToStep2) {
    btnBackToStep2.addEventListener('click', () => triggerTabJumpScare(2, () => switchProcedureStep(2)));
  }

  if (btnSubmitComplaintStep) {
    btnSubmitComplaintStep.addEventListener('mouseenter', () => {
      if (complaintDodgeCount < 3) {
        complaintDodgeCount++;
        recordError('trollBtns');
        playCartoonSlip();

        const dodges = [
          { x: -50, y: -16, txt: 'O Secretário de Estado foi tomar café! O botão fugiu para o gabinete ao lado.' },
          { x: 55, y: -20, txt: 'O processo foi transferido por ajuste direto para a delegação de Bragança!' },
          { x: -20, y: 20, txt: 'Tolerância de ponto decretada à pressa! O botão recusa ser premido.' }
        ];
        const cur = dodges[complaintDodgeCount - 1];
        btnSubmitComplaintStep.style.transform = `translate(${cur.x}px, ${cur.y}px)`;

        if (dodgeAlertBox) {
          dodgeAlertBox.style.display = 'block';
          dodgeAlertBox.textContent = cur.txt;
          dodgeAlertBox.style.color = '#92400e';
        }
      } else if (complaintDodgeCount === 3) {
        complaintDodgeCount++;
        btnSubmitComplaintStep.style.transform = 'translate(0px, 0px)';
        btnSubmitComplaintStep.textContent = 'Cansado de Fugir: Conferir Parecer Ministerial \u00BB';
        if (dodgeAlertBox) {
          dodgeAlertBox.textContent = 'O botão cansou-se de correr e aceitou finalmente o despacho com cara de frete.';
          dodgeAlertBox.style.color = 'var(--flag-green)';
        }
      }
    });

    btnSubmitComplaintStep.addEventListener('click', () => {
      const minVal = selectMinistry.value;
      const minName = selectMinistry.options[selectMinistry.selectedIndex].text;
      const subject = fieldGovSubject.value.trim();
      const body = fieldGovText.value.trim();

      if (!minVal) {
        showAnnoyingPopup({
          badge: 'GABINETE DO PRIMEIRO-MINISTRO',
          title: 'Falta de Ministério de Destino!',
          message: 'Tem de escolher para onde quer enviar a sua queixa! Sem ministério indicado, o processo fica perdido entre gavetas para sempre.',
          fine: 'Escolha um ministério na lista suspensa.',
          errorType: 'validation',
          onConfirm: () => selectMinistry.focus()
        });
        return;
      }

      if (!subject || subject.length < 15 || subject.length > 60) {
        showAnnoyingPopup({
          badge: 'SECRETARIA-GERAL DO GOVERNO',
          title: 'Assunto Fora da Medida Regulamentar!',
          message: `O assunto da reclamação tem ${subject.length} carateres. O protocolo de comunicação do Estado exige entre 15 e 60 carateres rigorosos.`,
          fine: 'Ajuste a extensão do assunto.',
          errorType: 'validation',
          onConfirm: () => fieldGovSubject.focus()
        });
        return;
      }

      const bannedWords = ['crise', 'greve', 'vergonha', 'urgente', 'imposto', 'corrupção'];
      const foundBanned = bannedWords.find(w => subject.toLowerCase().includes(w));
      if (foundBanned) {
        showAnnoyingPopup({
          badge: 'SECRETARIA DE ESTADO DA PROPAGANDA POSITIVA',
          title: `Termo Derrotista Proibido: "${foundBanned.toUpperCase()}"`,
          message: `O assunto contém a palavra censurada "${foundBanned}". O Governo exige que os cidadãos mantenham o otimismo nacional e não usem palavras alarmistas nos títulos!`,
          fine: 'Reescreva o assunto sem recorrer a termos de afobamento ou indignação.',
          errorType: 'censored',
          onConfirm: () => fieldGovSubject.focus()
        });
        return;
      }

      if (body.length < 80) {
        showAnnoyingPopup({
          badge: 'TRIBUNAL DE CONTAS DA ESCRITA',
          title: 'Queixa Demasiado Curta (Preguiça Administrativa)',
          message: `A sua queixa só tem ${body.length} carateres! O regulamento exige no mínimo 80 carateres de queixume fundamentado com princípio, meio e fim.`,
          fine: 'Escreva mais umas linhas com detalhes dos seus motivos.',
          errorType: 'validation',
          onConfirm: () => fieldGovText.focus()
        });
        return;
      }

      if (body.length > 350) {
        showAnnoyingPopup({
          badge: 'TRIBUNAL DE CONTAS DA ESCRITA',
          title: 'Tagarelice Administrativa Excessiva!',
          message: `O seu requerimento ultrapassou os 350 carateres (${body.length} inseridos). Nenhum Secretário de Estado tem tempo para ler testamentos deste tamanho!`,
          fine: 'Corte as partes supérfluas do texto.',
          errorType: 'validation',
          onConfirm: () => fieldGovText.focus()
        });
        return;
      }

      const startsPolite = /^(exmo\.? senhor ministro|ao governo da república|aos cuidados do governo)/i.test(body);
      if (!startsPolite) {
        showAnnoyingPopup({
          badge: 'DIREÇÃO-GERAL DO PROTOCOLO DE ESTADO',
          title: 'Falta de Vénia Constitucional Obrigatória!',
          message: 'Apresentou a queixa sem o devido respeito solene! O texto DEVE principiar obrigatoriamente por "Exmo. Senhor Ministro" ou "Ao Governo da República".',
          fine: 'Adicione a saudação oficial no início do texto.',
          errorType: 'courtesy',
          onConfirm: () => fieldGovText.focus()
        });
        return;
      }

      if (!appState.citizenDossier.certFileName) {
        showAnnoyingPopup({
          badge: 'JUNTA DE FREGUESIA &bull; SERVIÇO DE CERTIDÕES',
          title: 'Falta da Certidão em Triplicado (.txt)!',
          message: 'Não anexou a certidão de paciência obrigatória! Carregue no botão "Carimbar e Emitir Certidão Oficial" para resolver o assunto na hora.',
          fine: 'Sem certidão carimbada, o processo não pode subir a despacho.',
          errorType: 'validation'
        });
        return;
      }

      appState.citizenDossier.ministry = minVal;
      appState.citizenDossier.ministryName = minName;
      appState.citizenDossier.subject = subject;
      appState.citizenDossier.complaintText = body;

      triggerTabJumpScare(4, () => switchProcedureStep(4));
    });
  }

  // ==============================================================
  // 10. ETAPA 4: REVISÃO & MODAL MINISTERIAL
  // ==============================================================
  const revDossierCode = document.getElementById('rev-dossier-code');
  const revNif = document.getElementById('rev-nif');
  const revMinistry = document.getElementById('rev-ministry');
  const revInfluence = document.getElementById('rev-influence');
  const revSubject = document.getElementById('rev-subject');
  const revValidatedRef = document.getElementById('rev-validated-ref');
  const revCert = document.getElementById('rev-cert');
  const revChars = document.getElementById('rev-chars');
  const revBodyText = document.getElementById('rev-body-text');

  const btnBackToStep3 = document.getElementById('btn-back-to-step-3');
  const btnOpenMinisterialModal = document.getElementById('btn-open-ministerial-modal');
  const browserTranslateWidget = document.getElementById('browser-translate-widget');
  const btnTriggerTranslation = document.getElementById('btn-trigger-translation');
  const btnDismissTranslation = document.getElementById('btn-dismiss-translation');
  const translateStatusText = document.getElementById('translate-status-text');
  const untranslatedLockMsg = document.getElementById('untranslated-lock-msg');

  const STEP4_LATIN_DATA = {
    nif: '239841029 (Contribuens Perpetuus Inops)',
    ministry: 'Ministerium Fiscalis et Cativationum Perpetuarum',
    influence: 'CIVIS VULGARIS (SINE CUNHA AUT AMICITIA POLITICA)',
    subject: 'De chronica inoperantia servitiorum et lacrimis civium',
    ref: 'PT-8492-9104-X (Codex Nullus)',
    cert: 'certificatio_resilientiae_sine_spe.txt',
    chars: '138 carateres in lingua notariorum imperii',
    bodyText: 'Exmo. Domino Ministro, his litteris humillime expono publicam administrationem prorsus non operari, sed pecuniam civium per cativationes continenter consumi. Petimus iustitiam celerrimam sine mora.'
  };

  function applyStep4Translation(isSilent = false) {
    appState.step4Translated = true;

    if (revNif) revNif.textContent = appState.citizenDossier.nif || '239841029';
    if (revMinistry) revMinistry.textContent = appState.citizenDossier.ministryName || 'Ministério das Finanças';
    if (revInfluence) revInfluence.textContent = (appState.citizenDossier.influenceName || 'Cidadão Comum (Sem Cunha)').toUpperCase();
    if (revSubject) revSubject.textContent = appState.citizenDossier.subject || 'Inoperância crónica dos serviços públicos';
    if (revValidatedRef) revValidatedRef.textContent = appState.targetReference || 'PT-8492-9104-X';
    if (revCert) revCert.textContent = appState.citizenDossier.certFileName || 'certidao_resiliencia_cidadao.txt';
    if (revChars) revChars.textContent = `${(appState.citizenDossier.complaintText || '').length} carateres validados sob juramento`;
    if (revBodyText) revBodyText.textContent = appState.citizenDossier.complaintText || 'Exmo. Senhor Ministro, venho por este meio expor com a devida vénia republicana que este balcão necessita de resolução célere e urgente.';

    if (untranslatedLockMsg) untranslatedLockMsg.style.display = 'none';
    if (btnOpenMinisterialModal) {
      btnOpenMinisterialModal.style.display = 'inline-flex';
      btnOpenMinisterialModal.classList.add('btn-advance-revealed');
    }
    if (browserTranslateWidget) browserTranslateWidget.classList.add('translated');
    if (btnTriggerTranslation) {
      btnTriggerTranslation.disabled = true;
      btnTriggerTranslation.textContent = 'Página Traduzida (Concluído)';
    }
    if (translateStatusText) {
      translateStatusText.textContent = 'Página traduzida com sucesso sob fé pública! O botão de envio ministerial foi desbloqueado abaixo.';
    }

    if (!isSilent) {
      playMinisterialChime();
      setBannerDecree('Página traduzida com sucesso sob fé pública! O botão de envio ao Conselho de Ministros foi revelado.');
    }
  }

  function initStep4Review() {
    if (revDossierCode) revDossierCode.textContent = `PT-${Math.floor(Math.random() * 8999) + 1000}`;
    
    if (!appState.step4Translated) {
      if (revNif) revNif.textContent = STEP4_LATIN_DATA.nif;
      if (revMinistry) revMinistry.textContent = STEP4_LATIN_DATA.ministry;
      if (revInfluence) revInfluence.textContent = STEP4_LATIN_DATA.influence;
      if (revSubject) revSubject.textContent = STEP4_LATIN_DATA.subject;
      if (revValidatedRef) revValidatedRef.textContent = STEP4_LATIN_DATA.ref;
      if (revCert) revCert.textContent = STEP4_LATIN_DATA.cert;
      if (revChars) revChars.textContent = STEP4_LATIN_DATA.chars;
      if (revBodyText) revBodyText.textContent = STEP4_LATIN_DATA.bodyText;

      if (btnOpenMinisterialModal) btnOpenMinisterialModal.style.display = 'none';
      if (untranslatedLockMsg) untranslatedLockMsg.style.display = 'flex';
      if (browserTranslateWidget) browserTranslateWidget.classList.remove('translated');
      if (btnTriggerTranslation) {
        btnTriggerTranslation.disabled = false;
        btnTriggerTranslation.textContent = 'Traduzir Página';
      }
      if (translateStatusText) {
        translateStatusText.textContent = 'Norma UE 2026: O dossiê foi redigido em latim de Bruxelas. O botão de submissão só surge após traduzir a página.';
      }
    } else {
      applyStep4Translation(true);
    }
  }

  if (btnTriggerTranslation) {
    btnTriggerTranslation.addEventListener('click', () => {
      applyStep4Translation();
    });
  }

  if (btnDismissTranslation) {
    btnDismissTranslation.addEventListener('click', () => {
      recordError('trollBtns');
      showAnnoyingPopup({
        badge: 'MINISTÉRIO DAS FINANÇAS &bull; INSPEÇÃO LINGUÍSTICA',
        title: 'Recusa de Tradução Autuada!',
        message: 'O contribuinte recusou traduzir o dossiê oficial para Português de Portugal. De acordo com o Artigo 19.º da Constituição, os atos administrativos só transitam em julgado se forem compreensíveis antes de serem ignorados pelo Ministro.',
        fine: 'Coima simulada de 180€ por desobediência sintática.',
        confirmBtnText: 'Prometo traduzir a página',
        errorType: 'validation'
      });
    });
  }

  // Deteção da Tradução Nativa do Navegador (Google Chrome / Edge / Bing)
  const browserTranslationObserver = new MutationObserver(() => {
    if (appState.currentStep === 4 && !appState.step4Translated) {
      const htmlEl = document.documentElement;
      const isBrowserTranslated = 
        htmlEl.classList.contains('translated-ltr') ||
        htmlEl.classList.contains('translated-rtl') ||
        htmlEl.hasAttribute('data-google-lang') ||
        document.querySelector('font[vertical-align]') !== null ||
        document.querySelector('.goog-te-banner-frame') !== null;
      
      if (isBrowserTranslated) {
        applyStep4Translation();
      }
    }
  });

  browserTranslationObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'lang'],
    childList: true,
    subtree: true
  });

  if (btnBackToStep3) {
    btnBackToStep3.addEventListener('click', () => triggerTabJumpScare(3, () => switchProcedureStep(3)));
  }

  if (btnOpenMinisterialModal) {
    btnOpenMinisterialModal.addEventListener('click', () => {
      modalGovTrap.style.display = 'flex';
    });
  }

  if (modalBtnSurrender) {
    modalBtnSurrender.addEventListener('click', () => {
      modalGovTrap.style.display = 'none';
      showAnnoyingPopup({
        badge: 'MINISTÉRIO DAS FINANÇAS &bull; GABINETE DO FISCO',
        title: 'Queixa Retirada com Sucesso!',
        message: 'O contribuinte desistiu da reclamação por receio de auditoria fiscal e elogiou publicamente o Governo. A queixa foi destruída e volta ao início da fila.',
        fine: 'Evitou a inspeção tributária, mas perdeu a vez no balcão.',
        confirmBtnText: 'Voltar ao início de cabeça baixa',
        errorType: 'validation',
        onConfirm: () => triggerTabJumpScare(1, () => switchProcedureStep(1))
      });
    });
  }

  if (modalBtnArchive) {
    modalBtnArchive.addEventListener('click', () => {
      modalGovTrap.style.display = 'none';
      showAnnoyingPopup({
        badge: 'COMISSÃO PARLAMENTAR DE INQUÉRITO',
        title: 'Requerimento Arquivado por Falta de Quórum!',
        message: 'Os deputados foram tomar café e não houve quórum para votar a sua queixa. O texto foi apagado e terá de o redigir na próxima comissão.',
        fine: 'Redija o texto de novo quando houver deputados no plenário.',
        confirmBtnText: 'Voltar à etapa de redação da queixa',
        errorType: 'validation',
        onConfirm: () => {
          fieldGovText.value = '';
          fieldGovSubject.value = '';
          appState.citizenDossier.certFileName = '';
          certFilenameLabel.textContent = 'Nenhuma certidão anexada';
          triggerTabJumpScare(3, () => switchProcedureStep(3));
        }
      });
    });
  }

  let modalDodgeCount = 0;
  if (modalBtnRealPublish) {
    modalBtnRealPublish.addEventListener('mouseenter', () => {
      if (modalDodgeCount < 2) {
        modalDodgeCount++;
        recordError('trollBtns');
        playCartoonSlip();
        const jumps = [35, -35];
        modalBtnRealPublish.style.transform = `translateX(${jumps[modalDodgeCount - 1]}px)`;
        if (modalBtnSurrender) {
          modalBtnSurrender.classList.add('popup-shake-anim');
          setTimeout(() => modalBtnSurrender.classList.remove('popup-shake-anim'), 350);
        }
      } else if (modalDodgeCount === 2) {
        modalBtnRealPublish.style.transform = 'translateX(0px)';
      }
    });

    modalBtnRealPublish.addEventListener('click', () => {
      modalGovTrap.style.display = 'none';
      launchStateTransmission();
    });
  }

  function launchStateTransmission() {
    govTransmissionBox.style.display = 'block';
    btnOpenMinisterialModal.disabled = true;
    btnBackToStep3.disabled = true;

    const milestones = [
      { p: 20, txt: 'A remeter petição para 4 secretarias de estado...' },
      { p: 55, txt: 'A aguardar parecer do Secretário de Estado (que foi almoçar fora)...' },
      { p: 85, txt: 'A constituir uma Comissão Parlamentar Eventual para avaliar a queixa...' },
      { p: 100, txt: 'Requerimento homologado e arquivado na gaveta ministerial com sucesso!' }
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < milestones.length) {
        const item = milestones[idx];
        transStateText.textContent = item.txt;
        govProgressBar.style.width = `${item.p}%`;
        transPctText.textContent = `${item.p}%`;
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          triggerTabJumpScare(5, () => switchProcedureStep(5));
        }, 600);
      }
    }, 450);
  }

  // ==============================================================
  // 11. ETAPA 5: SUCESSO & DESPACHO MINISTERIAL
  // ==============================================================
  const resTicketId = document.getElementById('res-ticket-id');
  const resTimestamp = document.getElementById('res-timestamp');
  const resDuration = document.getElementById('res-duration');
  const resClicks = document.getElementById('res-clicks');
  const resTraps = document.getElementById('res-traps');
  const resCivicRank = document.getElementById('res-civic-rank');

  // Elementos da Contagem Oficial de Erros
  const resTotalErrors = document.getElementById('res-total-errors');
  const resErrorsVerdict = document.getElementById('res-errors-verdict');
  const resErrorRank = document.getElementById('res-error-rank');
  const resErrorDesc = document.getElementById('res-error-desc');
  const cntErrValidation = document.getElementById('cnt-err-validation');
  const cntErrPaste = document.getElementById('cnt-err-paste');
  const cntErrInverted = document.getElementById('cnt-err-inverted');
  const cntErrCloseBtn = document.getElementById('cnt-err-close-btn');
  const cntErrEscape = document.getElementById('cnt-err-escape');
  const cntErrCensored = document.getElementById('cnt-err-censored');
  const cntErrCourtesy = document.getElementById('cnt-err-courtesy');
  const cntErrPeek = document.getElementById('cnt-err-peek');
  const cntErrIdle = document.getElementById('cnt-err-idle');
  const cntErrPirate = document.getElementById('cnt-err-pirate');
  const cntErrDrawers = document.getElementById('cnt-err-drawers');
  const cntErrTroll = document.getElementById('cnt-err-troll');

  const btnDownloadOfficialProof = document.getElementById('btn-download-official-proof');
  const btnNewLegislature = document.getElementById('btn-new-legislature');

  let generatedGovTicket = '';

  function getErrorEvaluation(total) {
    if (total === 0) {
      return {
        verdict: 'Ficha Imaculada (0 infrações)',
        rank: 'Cidadão Exemplar da República',
        desc: 'Não cometeu uma única infração burocrática. O Ministério suspeita de conluio ou infiltração direta da Função Pública.'
      };
    } else if (total <= 3) {
      return {
        verdict: `${total} infrações ligeiras`,
        rank: 'Contribuinte Resiliente',
        desc: 'Pequenos deslizes cívicos perfeitamente tolerados pelo Estado face ao denso emaranhado de portarias em vigor.'
      };
    } else if (total <= 7) {
      return {
        verdict: `${total} infrações registadas`,
        rank: 'Cidadão Trapalhão com Boa Vontade',
        desc: 'Tropeçou nas teclas invertidas e nas rasteiras regimentais. Recomenda-se leitura atenta do Diário da República.'
      };
    } else if (total <= 12) {
      return {
        verdict: `${total} infrações graves`,
        rank: 'Chico-Esperto Reincidente',
        desc: 'Insistiu no uso de atalhos proibidos e tentou escapar ao protocolo. O seu processo foi remetido para auditoria das Finanças.'
      };
    } else {
      return {
        verdict: `${total} infrações gravíssimas`,
        rank: 'Inimigo Público do Código do Procedimento',
        desc: 'Colecionou tantos erros e multas que a Autoridade Tributária ordenou uma inspeção fiscal retroativa aos últimos 5 anos.'
      };
    }
  }

  function initStep5Triumph() {
    clearInterval(appState.sessionInterval);
    if (appState.idleTimer) clearTimeout(appState.idleTimer);

    const randNum = Math.floor(Math.random() * 899999) + 100000;
    generatedGovTicket = `#GOV-PT-${randNum}`;

    const totalSeconds = Math.max(1, Math.floor((Date.now() - appState.startTime) / 1000));
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const durStr = `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} às ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    if (resTicketId) resTicketId.textContent = generatedGovTicket;
    if (resTimestamp) resTimestamp.textContent = dateStr;
    if (resDuration) resDuration.textContent = durStr;
    if (resClicks) resClicks.textContent = `${appState.totalClicks} cliques com o rato no balcão`;
    if (resTraps) resTraps.textContent = `${appState.trapsAvoided} pareceres e armadilhas enfrentados`;

    let rank = 'Doutorado em Filas das Finanças e Teclas Invertidas';
    if (appState.trapsAvoided > 4) rank = 'Comendador da Ordem da Paciência Cívica';
    else if (totalSeconds < 90) rank = 'Velocista da Burocracia Republicana';
    if (resCivicRank) resCivicRank.textContent = rank;

    // Atualização da Auditoria Oficial de Erros
    const totalErrs = appState.errors.total;
    const evalData = getErrorEvaluation(totalErrs);

    if (resTotalErrors) resTotalErrors.textContent = totalErrs;
    if (resErrorsVerdict) resErrorsVerdict.textContent = evalData.verdict;
    if (resErrorRank) resErrorRank.textContent = evalData.rank;
    if (resErrorDesc) resErrorDesc.textContent = evalData.desc;

    if (cntErrValidation) cntErrValidation.textContent = appState.errors.validation;
    if (cntErrPaste) cntErrPaste.textContent = appState.errors.paste;
    if (cntErrInverted) cntErrInverted.textContent = appState.errors.inverted;
    if (cntErrCloseBtn) cntErrCloseBtn.textContent = appState.errors.closeBtn;
    if (cntErrEscape) cntErrEscape.textContent = appState.errors.escape;
    if (cntErrCensored) cntErrCensored.textContent = appState.errors.censored;
    if (cntErrCourtesy) cntErrCourtesy.textContent = appState.errors.courtesy;
    if (cntErrPeek) cntErrPeek.textContent = appState.errors.peek;
    if (cntErrIdle) cntErrIdle.textContent = appState.errors.idle;
    if (cntErrPirate) cntErrPirate.textContent = appState.errors.pirate;
    if (cntErrDrawers) cntErrDrawers.textContent = appState.errors.drawers;
    if (cntErrTroll) cntErrTroll.textContent = appState.errors.trollBtns;
    const cntErrJumpscares = document.getElementById('cnt-err-jumpscares');
    if (cntErrJumpscares) cntErrJumpscares.textContent = appState.errors.jumpscares || 0;
  }

  // Descarregar Certidão Oficial Homologada (.TXT)
  if (btnDownloadOfficialProof) {
    btnDownloadOfficialProof.addEventListener('click', () => {
      const totalErrs = appState.errors.total;
      const evalData = getErrorEvaluation(totalErrs);

      const content = [
        '========================================================================',
        '   REPÚBLICA PORTUGUESA - CERTIDÃO DE DESPACHO E ENTRADA DE PROCESSO    ',
        '========================================================================',
        '',
        `Número de Processo     : ${generatedGovTicket}`,
        `Data e Hora de Registo : ${resTimestamp.textContent}`,
        `NIF do Contribuinte    : ${appState.citizenDossier.nif}`,
        `Ministério Notificado  : ${appState.citizenDossier.ministryName}`,
        `Grau de Influência     : ${appState.citizenDossier.influenceName}`,
        `Assunto Oficial        : ${appState.citizenDossier.subject}`,
        `Referência Validada    : ${appState.targetReference}`,
        `Certidão em Triplicado : ${appState.citizenDossier.certFileName}`,
        '',
        '--- TEXTO INTEGRAL DA RECLAMAÇÃO HOMOLOGADA ---',
        appState.citizenDossier.complaintText,
        '',
        '--- AUDITORIA DE RESILIÊNCIA FISCAL E CÍVICA ---',
        `Tempo de Luta com o Balcão : ${resDuration.textContent}`,
        `Cliques Efetuados com o Rato : ${resClicks.textContent}`,
        `Armadilhas e Popups Vencidos : ${resTraps.textContent}`,
        `Grau de Cidadania Atribuído  : ${resCivicRank.textContent}`,
        '',
        '========================================================================',
        '   AUDITORIA DISCIPLINAR DO CONTRIBUINTE & CONTAGEM DE ERROS           ',
        '========================================================================',
        `Total de Erros Cometidos       : ${totalErrs} infrações registadas`,
        `Classificação do Ministério    : ${evalData.rank}`,
        `Parecer Disciplinar Oficial    : ${evalData.desc}`,
        '',
        'Detalhamento das Infrações no Balcão:',
        `  - Erros de Validação e Campos Vazios          : ${appState.errors.validation}`,
        `  - Tentativas de Chico-Espertice com Copy/Paste: ${appState.errors.paste}`,
        `  - Falhas na Referência e Teclas Invertidas   : ${appState.errors.inverted}`,
        `  - Tentativas Ilícitas de Fechar no [X]        : ${appState.errors.closeBtn}`,
        `  - Fugas ao Modal (Cliques Fora do Cartão)     : ${appState.errors.escape}`,
        `  - Palavras Censuradas Utilizadas ("crise")    : ${appState.errors.censored}`,
        `  - Falta de Saudação ("Exmo. Senhor Ministro") : ${appState.errors.courtesy}`,
        `  - Taxas por Espreitar a Palavra-Passe (IVA)   : ${appState.errors.peek}`,
        `  - Momentos de Sono na Fila Virtual (25s)      : ${appState.errors.idle}`,
        `  - Cliques em Anúncios Piratas do Betanol      : ${appState.errors.pirate}`,
        `  - Gavetas do Arquivo Morto Falhadas           : ${appState.errors.drawers}`,
        `  - Rasteiras de Botões Trolls e em Fuga        : ${appState.errors.trollBtns}`,
        `  - Paragens Cardíacas / Jump Scares de Abas    : ${appState.errors.jumpscares || 0}`,
        '',
        'Despacho Ministerial: A queixa foi carimbada e depositada na pasta de arquivo.',
        'Previsão de Apreciação: Até ao final do próximo Quadro Comunitário de Apoio.',
        'Ministério da Burocracia & Transição Lenta • Portugal 2026'
      ].join('\r\n');

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Certidao_Homologada_${generatedGovTicket.replace('#', '')}.txt`;
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }

  if (btnNewLegislature) {
    btnNewLegislature.addEventListener('click', () => {
      window.location.reload();
    });
  }

  // ==============================================================
  // 12. INICIALIZAÇÃO DO SISTEMA
  // ==============================================================
  window.addEventListener('DOMContentLoaded', () => {
    startSessionTimer();
    resetIdleTimer();
    switchProcedureStep(1);
  });

})();
