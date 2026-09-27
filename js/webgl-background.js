/* ==========================================================================
   SOCIALPULSE AI - CINEMATIC 3D BACKGROUND & MOUSE PARALLAX SYSTEM
   ========================================================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('webgl-bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Mouse state with smooth lerping
  const mouse = {
    x: width / 2,
    y: height / 2,
    targetX: width / 2,
    targetY: height / 2,
    normX: 0,
    normY: 0
  };

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Starfield & Data particle layers
  const STAR_COUNT = prefersReducedMotion ? 40 : 120;
  const stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 1000 + 100,
      size: Math.random() * 1.6 + 0.4,
      brightness: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      hue: Math.random() > 0.6 ? 230 : Math.random() > 0.3 ? 190 : 270 // cyan, indigo, violet
    });
  }

  // Floating data nodes (Audience Behaviour Metaphor)
  const NODE_COUNT = prefersReducedMotion ? 6 : 18;
  const nodes = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 3 + 1.5,
      alpha: Math.random() * 0.4 + 0.2
    });
  }

  // Occasional subtle shooting star
  let shootingStar = null;
  function spawnShootingStar() {
    if (prefersReducedMotion) return;
    if (shootingStar || Math.random() > 0.004) return;
    shootingStar = {
      x: Math.random() * width * 0.8,
      y: Math.random() * height * 0.4,
      len: Math.random() * 100 + 60,
      speed: Math.random() * 8 + 6,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
      opacity: 1
    };
  }

  // Window resize handler
  function onResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', onResize);

  // Mouse movement listener
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  // Render loop
  function render() {
    // Smooth lerping for mouse parallax
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    mouse.normX = (mouse.x / width - 0.5) * 2; // -1 to 1
    mouse.normY = (mouse.y / height - 0.5) * 2;

    // Pass global CSS variables for card reflections
    document.documentElement.style.setProperty('--mouse-x', `${mouse.x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mouse.y}px`);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Clear frame with adaptive theme background
    if (isLight) {
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      // Soft atmospheric nebula glow for light mode
      const grad1 = ctx.createRadialGradient(
        width * 0.3 - mouse.normX * 60,
        height * 0.35 - mouse.normY * 40,
        0,
        width * 0.3,
        height * 0.35,
        width * 0.65
      );
      grad1.addColorStop(0, 'rgba(99, 102, 241, 0.07)');
      grad1.addColorStop(0.5, 'rgba(14, 165, 233, 0.04)');
      grad1.addColorStop(1, 'rgba(248, 250, 252, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 + mouse.normX * 40,
        height * 0.7 + mouse.normY * 50,
        0,
        width * 0.75,
        height * 0.7,
        width * 0.55
      );
      grad2.addColorStop(0, 'rgba(139, 92, 246, 0.05)');
      grad2.addColorStop(0.6, 'rgba(99, 102, 241, 0.02)');
      grad2.addColorStop(1, 'rgba(248, 250, 252, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);
    } else {
      // Clear frame with deep space gradient
      ctx.fillStyle = '#05070d';
      ctx.fillRect(0, 0, width, height);

      // 1. Soft atmospheric nebula glow
      const grad1 = ctx.createRadialGradient(
        width * 0.3 - mouse.normX * 60,
        height * 0.35 - mouse.normY * 40,
        0,
        width * 0.3,
        height * 0.35,
        width * 0.65
      );
      grad1.addColorStop(0, 'rgba(99, 102, 241, 0.09)');
      grad1.addColorStop(0.5, 'rgba(0, 242, 254, 0.03)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(
        width * 0.75 + mouse.normX * 40,
        height * 0.7 + mouse.normY * 50,
        0,
        width * 0.75,
        height * 0.7,
        width * 0.55
      );
      grad2.addColorStop(0, 'rgba(139, 92, 246, 0.07)');
      grad2.addColorStop(0.6, 'rgba(244, 63, 94, 0.02)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);
    }

    // 2. 3D Stars with depth projection and parallax
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];

      if (!prefersReducedMotion) {
        star.z -= 0.3;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 1.5;
          star.y = (Math.random() - 0.5) * height * 1.5;
        }
        star.brightness += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
      }

      // 3D perspective projection
      const k = 400 / star.z;
      const px = star.x * k + centerX - mouse.normX * (1000 - star.z) * 0.025;
      const py = star.y * k + centerY - mouse.normY * (1000 - star.z) * 0.025;

      if (px >= 0 && px <= width && py >= 0 && py <= height) {
        const sz = Math.max(0.5, star.size * k);
        const alpha = Math.min(1, Math.max(0.1, star.brightness * (1 - star.z / 1000)));

        ctx.fillStyle = isLight
          ? `hsla(${star.hue}, 60%, 45%, ${alpha * 0.7})`
          : `hsla(${star.hue}, 80%, 75%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, sz, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. Floating interconnected data nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (!prefersReducedMotion) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      const parallaxX = n.x - mouse.normX * 12;
      const parallaxY = n.y - mouse.normY * 12;

      ctx.fillStyle = isLight
        ? `rgba(14, 165, 233, ${n.alpha * 0.5})`
        : `rgba(0, 242, 254, ${n.alpha * 0.6})`;
      ctx.beginPath();
      ctx.arc(parallaxX, parallaxY, n.radius, 0, Math.PI * 2);
      ctx.fill();

      // Connect nearby nodes with subtle data line
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const lineAlpha = (1 - dist / 140) * (isLight ? 0.12 : 0.15);
          ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(parallaxX, parallaxY);
          ctx.lineTo(n2.x - mouse.normX * 12, n2.y - mouse.normY * 12);
          ctx.stroke();
        }
      }
    }

    // 4. Subtle shooting star
    spawnShootingStar();
    if (shootingStar) {
      const s = shootingStar;
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.opacity -= 0.015;

      ctx.strokeStyle = isLight
        ? `rgba(99, 102, 241, ${s.opacity * 0.6})`
        : `rgba(255, 255, 255, ${s.opacity * 0.7})`;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - Math.cos(s.angle) * s.len, s.y - Math.sin(s.angle) * s.len);
      ctx.stroke();

      if (s.opacity <= 0 || s.x > width || s.y > height) {
        shootingStar = null;
      }
    }

    requestAnimationFrame(render);
  }

  render();
})();
