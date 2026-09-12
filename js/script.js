document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hide'), 500);
  });
  // fallback in case load event is slow/blocked
  setTimeout(() => preloader.classList.add('hide'), 2500);

  /* ---------- 3D TILT HERO CARD ---------- */
  const tiltWrap = document.getElementById('tiltCard');
  const tiltCard = tiltWrap.querySelector('.tilt-card');

  tiltWrap.addEventListener('mousemove', (e) => {
    const rect = tiltWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 12;
    const rotateX = -((y - cy) / cy) * 12;
    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  tiltWrap.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });

  /* touch-based gentle tilt for mobile */
  window.addEventListener('deviceorientation', (e) => {
    if (!e.beta || !e.gamma) return;
    const rotateX = Math.max(-10, Math.min(10, (e.beta - 45) / 4));
    const rotateY = Math.max(-10, Math.min(10, e.gamma / 4));
    tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, { passive: true });

  /* ---------- DISCORD POP-OUT PROFILE ---------- */
  const discordTrigger = document.getElementById('discordTrigger');
  const discordCard = document.getElementById('discordCard');
  discordTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    discordCard.classList.toggle('show');
  });
  document.addEventListener('click', (e) => {
    if (!discordCard.contains(e.target) && e.target !== discordTrigger) {
      discordCard.classList.remove('show');
    }
  });

  /* ---------- PARALLAX SILHOUETTES ---------- */
  const silhouettes = document.querySelectorAll('.silhouette');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        silhouettes.forEach(el => {
          const speed = parseFloat(el.dataset.speed) || 0.2;
          el.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * speed * 0.02}deg)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ---------- INTERSECTION OBSERVER: TRIGGERED MOMENTS ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.dispatchEvent(new CustomEvent('revealed'));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  /* Archery target: fire the arrow once when scrolled into view */
  const archeryStage = document.getElementById('archeryStage');
  const arrowSvg = document.getElementById('arrowSvg');
  if (archeryStage) {
    archeryStage.addEventListener('revealed', () => {
      arrowSvg.classList.add('fire');
    });
    observer.observe(archeryStage);
  }

  /* Appreciation card: pop in once visible */
  const appreciateCard = document.getElementById('appreciateCard');
  if (appreciateCard) {
    appreciateCard.addEventListener('revealed', () => {
      appreciateCard.classList.add('pop');
      launchConfetti();
    });
    observer.observe(appreciateCard);
  }

  /* ---------- VINYL PLAY ON HOVER/CLICK ---------- */
  const vinyl = document.getElementById('vinyl');
  const tonearm = document.querySelector('.tonearm');
  vinyl.addEventListener('click', () => {
    vinyl.classList.toggle('playing');
    tonearm.classList.toggle('on');
  });

  /* ---------- CONFETTI (lightweight, no external lib) ---------- */
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const colors = ['#e8b84b', '#ff6f9c', '#49c5b6', '#a78bfa'];

  function launchConfetti() {
    const pieces = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      size: 5 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: 2 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10
    }));

    let frame = 0;
    const maxFrames = 220;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      frame++;
      if (frame < maxFrames) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animate();
  }

});
