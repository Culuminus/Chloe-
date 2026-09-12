document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => setTimeout(() => preloader.classList.add('hide'), 500));
  setTimeout(() => preloader.classList.add('hide'), 2500);

  /* ---------- 3D TILT ON HERO PHOTO ---------- */
  const tiltCard = document.getElementById('tiltCard');
  const heroPhoto = tiltCard.querySelector('.hero-photo');
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 8;
    heroPhoto.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  tiltCard.addEventListener('mouseleave', () => { heroPhoto.style.transform = 'rotateX(0) rotateY(0) scale(1)'; });

  /* ---------- DISCORD POP-OUT PROFILE ---------- */
  const discordTrigger = document.getElementById('discordTrigger');
  const discordCard = document.getElementById('discordCard');
  discordTrigger.addEventListener('click', (e) => { e.stopPropagation(); discordCard.classList.toggle('show'); });
  document.addEventListener('click', (e) => {
    if (!discordCard.contains(e.target) && e.target !== discordTrigger) discordCard.classList.remove('show');
  });

  /* ---------- PARALLAX BUTTERFLIES ---------- */
  const butterflies = document.querySelectorAll('.butterfly');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        butterflies.forEach(el => {
          const speed = parseFloat(el.dataset.speed) || 0.2;
          el.style.marginTop = `${y * speed * -1}px`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ---------- MINI PLAYER (Favorites screen) ---------- */
  const miniPlayBtn = document.getElementById('miniPlayBtn');
  const miniBar = document.querySelector('.np-bar span');
  let miniPlaying = false, miniInterval;
  miniPlayBtn.addEventListener('click', () => {
    miniPlaying = !miniPlaying;
    miniPlayBtn.innerHTML = miniPlaying ? '<i class="bi bi-pause-fill"></i>' : '<i class="bi bi-play-fill"></i>';
    if (miniPlaying) {
      let width = parseFloat(miniBar.style.width) || 35;
      miniInterval = setInterval(() => {
        width = width >= 100 ? 0 : width + 1;
        miniBar.style.width = width + '%';
      }, 200);
    } else {
      clearInterval(miniInterval);
    }
  });

  /* ---------- CARD-IN-CARD TAB SWITCHING ---------- */
  const tabButtons = document.querySelectorAll('.mini-tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function activateTab(tabName) {
    tabButtons.forEach(button => {
      const isActive = button.dataset.tab === tabName;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });

    tabPanels.forEach(panel => {
      const isActive = panel.dataset.panel === tabName;
      panel.classList.toggle('active', isActive);
    });

    if (tabName === 'music') {
      const audio = document.getElementById('cardAudio');
      if (audio && audio.paused) {
        audio.play().catch(() => { });
      }
    }
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => activateTab(button.dataset.tab));
  });

  /* ---------- MAIN PLAYER (Music screen) ---------- */
  const playerPlayBtn = document.getElementById('playerPlayBtn');
  const playerFill = document.getElementById('playerFill');
  const cardAudio = document.getElementById('cardAudio');
  const currentTimeEl = document.getElementById('currentTime');
  const totalTimeEl = document.getElementById('totalTime');

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(safeSeconds / 60);
    const secs = String(safeSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function updateAudioProgress() {
    if (!cardAudio || !cardAudio.duration || Number.isNaN(cardAudio.duration)) return;
    const progress = (cardAudio.currentTime / cardAudio.duration) * 100;
    playerFill.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(cardAudio.currentTime);
    totalTimeEl.textContent = formatTime(cardAudio.duration);
  }

  if (cardAudio) {
    cardAudio.addEventListener('loadedmetadata', updateAudioProgress);
    cardAudio.addEventListener('timeupdate', updateAudioProgress);
    cardAudio.addEventListener('ended', () => {
      playerPlayBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      if (cardAudio) cardAudio.currentTime = 0;
      playerFill.style.width = '0%';
      currentTimeEl.textContent = '0:00';
    });
  }

  playerPlayBtn.addEventListener('click', async () => {
    if (!cardAudio) return;
    if (cardAudio.paused) {
      await cardAudio.play().catch(() => { });
      playerPlayBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
      cardAudio.pause();
      playerPlayBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
  });

  if (cardAudio) {
    cardAudio.volume = 0.8;
    activateTab('music');
    cardAudio.play().catch(() => { });
  }

  /* ---------- SPARKLE BURST ON GRATEFUL + FINAL SCREENS ---------- */
  const canvas = document.getElementById('sparkleCanvas');
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const sparkleColors = ['#C6A15B', '#E9D3CE', '#FCF8F1', '#9C7A3A'];
  function launchSparkles() {
    const pieces = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      r: 2 + Math.random() * 4,
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      speedY: 1.5 + Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 1.5,
      opacity: 1
    }));
    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.speedX; p.y += p.speedY; p.opacity -= 0.004;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.opacity, 0);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      frame++;
      if (frame < 260) requestAnimationFrame(animate); else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    animate();
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        launchSparkles();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const grateful = document.getElementById('gratefulScreen');
  const final = document.getElementById('final');
  if (grateful) observer.observe(grateful);
  if (final) observer.observe(final);

});
