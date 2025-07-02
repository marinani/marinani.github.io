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
      // Recalcula as posições das partículas ao redimensionar
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
    }
    window.addEventListener('resize', resize);
    resize();

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

  // Consolidated Glow effect for cards (exp-card, edu-card)
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

  // Card tab switching logic for clientes card (mantido, mas verifique se o HTML usa isso)
  const clientCard = document.querySelector(".card[data-state]");
  if (clientCard) {
    const buttons = clientCard.querySelectorAll(".card-buttons button");
    const sections = clientCard.querySelectorAll(".card-section");
    buttons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const targetSection = btn.getAttribute("data-section");
        const section = clientCard.querySelector(targetSection);
        if (targetSection !== "#about") {
          clientCard.classList.add("is-active");
        } else {
          clientCard.classList.remove("is-active");
        }
        clientCard.setAttribute("data-state", targetSection);
        sections.forEach((s) => s.classList.remove("is-active"));
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        section.classList.add("is-active");
      });
    });
  }

  // === Hero Foto Silhouette Neon Outline ===
  // Reintroduzindo a lógica do canvas para o contorno da silhueta
  const heroFoto = document.querySelector('#inicio .hero-foto');
  const heroImageContainer = document.querySelector('#inicio .hero-image-container');

  if (heroFoto && heroImageContainer) {
    function drawSilhouetteOutline() {
      // Remove canvas anterior se houver
      const oldCanvas = document.getElementById('hero-foto-outline-canvas');
      if (oldCanvas) oldCanvas.remove();

      // Cria canvas do mesmo tamanho da imagem exibida
      const canvas = document.createElement('canvas');
      canvas.id = 'hero-foto-outline-canvas';
      // Garante que o canvas tem o mesmo tamanho renderizado da imagem
      canvas.width = heroFoto.offsetWidth;
      canvas.height = heroFoto.offsetHeight;

      // Posiciona o canvas absolutamente em relação ao seu contêiner (hero-image-container)
      canvas.style.position = 'absolute';
      canvas.style.left = heroFoto.offsetLeft + 'px';
      canvas.style.top = heroFoto.offsetTop + 'px';
      canvas.style.pointerEvents = 'none'; // Não interfere com eventos do mouse
      canvas.style.zIndex = -1; // Fica atrás da imagem

      // Garante que o contêiner da imagem é relativo para posicionar o canvas corretamente
      if (heroImageContainer.style.position === '' || heroImageContainer.style.position === 'static') {
        heroImageContainer.style.position = 'relative';
      }

      // Insere o canvas ANTES da imagem (para ficar atrás)
      heroImageContainer.insertBefore(canvas, heroFoto);

      const ctx = canvas.getContext('2d');

      // Desenha a imagem no canvas temporariamente para obter os dados dos pixels
      // Certifique-se de que a imagem esteja completamente carregada antes de tentar desenhá-la
      if (!heroFoto.complete) {
        heroFoto.onload = () => drawSilhouetteOutline(); // Tenta novamente quando a imagem carregar
        return;
      }
      ctx.drawImage(heroFoto, 0, 0, canvas.width, canvas.height);

      // Pega os dados dos pixels
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const { data, width, height } = imageData;

      // Cria uma matriz para marcar pixels opacos
      const mask = [];
      for (let y = 0; y < height; y++) {
        mask[y] = [];
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          // Considera um pixel opaco se o canal alpha for maior que um certo limiar
          mask[y][x] = data[idx + 3] > 32; // Ajuste o limiar conforme necessário
        }
      }

      // Detecta pixels de borda (contorno)
      const edgePoints = [];
      function isEdge(x, y) {
        if (!mask[y][x]) return false; // Não é um pixel da silhueta
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue; // Pula o próprio pixel
            const nx = x + dx, ny = y + dy;
            // Se um pixel vizinho estiver fora dos limites ou for transparente, é uma borda
            if (nx < 0 || ny < 0 || nx >= width || ny >= height || !mask[ny][nx]) {
              return true;
            }
          }
        }
        return false;
      }
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (isEdge(x, y)) {
            edgePoints.push([x, y]);
          }
        }
      }

      // Limpa o canvas e desenha o contorno neon
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.shadowColor = '#00ffc3'; // Cor do brilho
      ctx.shadowBlur = 12; // Intensidade do brilho
      ctx.strokeStyle = '#64ffda'; // Cor da linha do contorno
      ctx.lineWidth = 2.5; // Espessura da linha
      ctx.beginPath();
      for (let i = 0; i < edgePoints.length; i++) {
        const [x, y] = edgePoints[i];
        ctx.moveTo(x, y);
        ctx.lineTo(x + 0.5, y + 0.5); // Desenha um pequeno segmento para cada ponto de borda
      }
      ctx.stroke();
      ctx.restore();
    }

    // Função debounce para otimizar o redesenho em redimensionamentos
    function debounce(func, delay) {
      let timeout;
      return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
      };
    }

    // Tenta desenhar imediatamente ou ao carregar a imagem
    if (heroFoto.complete && heroFoto.naturalWidth > 0 && heroFoto.naturalHeight > 0) {
      drawSilhouetteOutline();
    } else {
      heroFoto.onload = drawSilhouetteOutline;
    }

    // Redesenha ao redimensionar (ajusta tamanho do canvas)
    window.addEventListener('resize', debounce(drawSilhouetteOutline, 200));
  }

  // Clientes Carousel Effect (Vanilla JS) - Refatorado e simplificado
  (function () {
    const testimonials = [
      {
        hero: "/images/projetos/pwmetricas inicial.png",
        title: "Demonstrou profissionalismo e entregou muito mais que foi falado e provou que sabe o que faz!",
        author: "Dyego Pessoa",
        role: "CEO - Pw Mídia/Pw Métricas",
        avatar: "/images/testemunhas/dyego-pw.jpeg"
      },
      {
        hero: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        title: "O sistema ficou perfeito, superou minhas expectativas.",
        author: "Carlos Pereira",
        role: "Analista de TI",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        hero: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        title: "Muito atenciosa, resolveu problemas que outros não conseguiram.",
        author: "Maria Oliveira",
        role: "Gerente de Projeto",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        hero: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
        title: "Entrega rápida e comunicação excelente. Recomendo para qualquer projeto!",
        author: "João Silva",
        role: "Empreendedor",
        avatar: "https://randomuser.me/api/portraits/men/65.jpg"
      }
    ];

    const root = document.querySelector('.clientes-carousel-root'); // Seleciona a div vazia
    if (!root) return;

    let activeIndex = 0;
    const amount = testimonials.length;
    let track; // Variável para o elemento track

    function renderCarousel() {
      root.innerHTML = `
        <div class="clientes-carousel-track-wrapper">
          <ul class="clientes-carousel-track">
            ${testimonials.map((t, i) => `
              <li class="clientes-card" data-index="${i}">
                <img class="clientes-card__hero" src="${t.hero}" alt="${t.author}'s project hero">
                <img class="clientes-card__avatar" src="${t.avatar}" alt="${t.author}'s avatar">
                <div class="clientes-card__content-mark">
                  <article class="clientes-card__content">
                    <h1 class="clientes-card__title">${t.title}</h1>
                    <h2 class="clientes-card__author">${t.author}${t.role ? ' - ' + t.role : ''}</h2>
                  </article>
                </div>
              </li>
            `).join('')}
          </ul>
        </div>
        <div class="clientes-carousel-actions">
          <button type="button" aria-label="Anterior" id="clientes-carousel-prev">
            <svg viewBox="0 0 24 24"><path fill="#fff" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/></svg>
          </button>
          <button type="button" aria-label="Próximo" id="clientes-carousel-next">
            <svg viewBox="0 0 24 24"><path fill="#fff" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
          </button>
        </div>
      `;

      track = root.querySelector('.clientes-carousel-track');

      const prevButton = document.getElementById('clientes-carousel-prev');
      const nextButton = document.getElementById('clientes-carousel-next');

      if (prevButton) {
        prevButton.onclick = () => {
          activeIndex = (activeIndex - 1 + amount) % amount;
          updateCarouselPosition();
        };
      }
      if (nextButton) {
        nextButton.onclick = () => {
          activeIndex = (activeIndex + 1) % amount;
          updateCarouselPosition();
        };
      }

      updateCarouselPosition(); // Define a posição inicial
    }

    function updateCarouselPosition() {
      if (!track) return;

      const cardWidth = track.querySelector('.clientes-card') ? track.querySelector('.clientes-card').offsetWidth + 30 : 0; // Card width + margin
      const offset = -activeIndex * cardWidth;
      track.style.transform = `translateX(${offset}px)`;
    }

    // Inicializa o carrossel
    renderCarousel();

    // Atualiza a posição ao redimensionar a janela
    window.addEventListener('resize', updateCarouselPosition);

  })();
});
