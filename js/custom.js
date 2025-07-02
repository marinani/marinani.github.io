// === Custom JS migrated from index.html ===

// Card entrance animation (valores)
document.addEventListener('DOMContentLoaded', function () {
  if (typeof anime !== "undefined") {
    anime({
      targets: '.valor-card',
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [50, 0],
      delay: anime.stagger(200),
      duration: 1200,
      easing: 'easeOutElastic(1, .8)'
    });
  }

  // Particle canvas background for valores cards
  const canvas = document.getElementById('valoresBgCanvas');
  if (canvas) {
    const container = document.querySelector('.valores-cards-container');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      const rect = container.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }
    window.addEventListener('resize', resize);
    resize();

    particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = '#00ffc3';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Glow effect for .card-exp-glow (exp-card, edu-card, etc)
  document.querySelectorAll('.card-exp-glow').forEach(card => {
    const glow = card.querySelector('.glow');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const angle = 135 + rotateX - rotateY;
      card.style.setProperty('--angle', `${angle}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      card.style.setProperty('--angle', `135deg`);
    });
  });

  // Glow effect for .edu-card (if not already handled by .card-exp-glow)
  document.querySelectorAll('.edu-card').forEach(card => {
    const glow = card.querySelector('.glow');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const angle = 135 + rotateX - rotateY;
      card.style.setProperty('--angle', `${angle}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      card.style.setProperty('--angle', `135deg`);
    });
  });

  // Glow effect for .exp-card and .edu-card (luzinha que segue o mouse)
  document.querySelectorAll('.exp-card, .edu-card').forEach(card => {
    // Adiciona .glow se não existir
    if (!card.querySelector('.glow')) {
      const glow = document.createElement('div');
      glow.className = 'glow';
      card.appendChild(glow);
    }
    const glow = card.querySelector('.glow');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const angle = 135 + rotateX - rotateY;
      card.style.setProperty('--angle', `${angle}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      card.style.setProperty('--angle', `135deg`);
    });
  });

  // Card tab switching logic for clientes card
  document.addEventListener("DOMContentLoaded", function () {
    const card = document.querySelector(".card[data-state]");
    if (!card) return;
    const buttons = card.querySelectorAll(".card-buttons button");
    const sections = card.querySelectorAll(".card-section");
    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetSection = btn.getAttribute("data-section");
        const section = card.querySelector(targetSection);
        if (targetSection !== "#about") {
          card.classList.add("is-active");
        } else {
          card.classList.remove("is-active");
        }
        card.setAttribute("data-state", targetSection);
        sections.forEach((s) => s.classList.remove("is-active"));
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        section.classList.add("is-active");
      });
    });
  });
});

// === Hero Foto Silhouette Neon Outline ===
document.addEventListener('DOMContentLoaded', function () {
  const heroFoto = document.querySelector('#inicio .hero-foto');
  if (!heroFoto) return;

  function drawSilhouetteOutline(img) {
    // Remove canvas anterior se houver
    const oldCanvas = document.getElementById('hero-foto-outline-canvas');
    if (oldCanvas) oldCanvas.remove();

    // Cria canvas do mesmo tamanho da imagem exibida
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-foto-outline-canvas';
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.style.position = 'absolute';
    // Move o canvas 12px para a direita
    canvas.style.left = '350px';
    canvas.style.top = '2';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = -1;
    canvas.style.width = img.width + 'px';
    canvas.style.height = img.height + 'px';

    // Garante que o parent é relativo
    const parent = img.parentElement;
    parent.style.position = 'relative';

    // Insere o canvas ANTES da imagem (para ficar atrás)
    parent.insertBefore(canvas, img);

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Pega os dados dos pixels
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    // Cria uma matriz para marcar pixels opacos
    const mask = [];
    for (let y = 0; y < height; y++) {
      mask[y] = [];
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        mask[y][x] = data[idx + 3] > 32;
      }
    }

    // Detecta pixels de borda (contorno)
    const edgePoints = [];
    function isEdge(x, y) {
      if (!mask[y][x]) return false;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) return true;
          if (!mask[ny][nx]) return true;
        }
      }
      return false;
    }
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        if (isEdge(x, y)) {
          edgePoints.push([x, y]);
        }
      }
    }

    // Limpa o canvas e desenha o contorno neon
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.shadowColor = '#00ffc3';
    ctx.shadowBlur = 12;
    ctx.strokeStyle = '#64ffda';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < edgePoints.length; i++) {
      const [x, y] = edgePoints[i];
      ctx.moveTo(x, y);
      ctx.lineTo(x + 1, y + 1);
    }
    ctx.stroke();
    ctx.restore();
  }

  // Espera a imagem carregar para garantir width/height corretos
  function tryDraw() {
    if (heroFoto.complete && heroFoto.width && heroFoto.height) {
      drawSilhouetteOutline(heroFoto);
    }
  }
  if (heroFoto.complete) {
    tryDraw();
  } else {
    heroFoto.onload = tryDraw;
  }

  // Redesenha ao redimensionar (ajusta tamanho do canvas)
  window.addEventListener('resize', tryDraw);
});
