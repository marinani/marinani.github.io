// === Custom JS migrated from index.html ===

// Card entrance animation (valores)
document.addEventListener('DOMContentLoaded', function () {
  if (typeof anime !== "undefined") {
    anime({
      targets: '.valor-card',
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [50, 0],
      // Reduzido o delay para um aparecimento mais rápido e a duração para uma animação mais ágil.
      delay: anime.stagger(100), // Era 200, agora 100ms de atraso entre cada card
      duration: 800, // Era 1200, agora 800ms de duração para cada card
      easing: 'easeOutElastic(1, .8)'
    });
  }

  // Particle canvas background for valores cards
  const valoresCanvas = document.getElementById('valoresBgCanvas');
  if (valoresCanvas) {
    const container = document.querySelector('.valores-cards-container');
    const ctx = valoresCanvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeValoresCanvas() {
      const rect = container.getBoundingClientRect();
      width = valoresCanvas.width = rect.width;
      height = valoresCanvas.height = rect.height;
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
    window.addEventListener('resize', resizeValoresCanvas);
    resizeValoresCanvas();

    function animateValores() {
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
      requestAnimationFrame(animateValores);
    }
    animateValores();
  }

  // Particle canvas background for skills cards
  const skillsCanvas = document.getElementById('skillsBgCanvas');
  if (skillsCanvas) {
    const container = document.querySelector('.skills-canvas-wrapper'); // Usar o wrapper para o container
    const ctx = skillsCanvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeSkillsCanvas() {
      const rect = container.getBoundingClientRect();
      width = skillsCanvas.width = rect.width;
      height = skillsCanvas.height = rect.height;
      particles = [];
      for (let i = 0; i < 30; i++) { // Menos partículas para o canvas de habilidades
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5 + 0.5, // Partículas menores
          dx: (Math.random() - 0.5) * 0.3, // Movimento mais lento
          dy: (Math.random() - 0.5) * 0.3
        });
      }
    }
    window.addEventListener('resize', resizeSkillsCanvas);
    resizeSkillsCanvas();

    function animateSkills() {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100, 255, 218, 0.3)'; // Cor do destaque com transparência
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      }
      requestAnimationFrame(animateSkills);
    }
    animateSkills();
  }


  // Consolidated Glow effect for cards (exp-card, edu-card, valor-card)
  // Removido '.skill-badge' deste seletor para desativar o efeito de ponteiro na seção "Sobre".
  document.querySelectorAll('.exp-card, .edu-card, .valor-card').forEach(card => {
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
    });
    card.addEventListener('mouseleave', () => {
      // Nenhuma ação específica de reset para o brilho, pois a opacidade é controlada via CSS.
    });
  });

  // Clientes Carousel Effect (Vanilla JS) - Refatorado e simplificado
  (function () {
    const testimonials = [
      {
        hero: "assets/src/images/projetos/pwmetricas inicial.png",
        title: "Demonstrou profissionalismo e entregou muito mais que foi falado e provou que sabe o que faz!",
        author: "Dyego Pessoa",
        role: "CEO - Pw Mídia/Pw Métricas",
        avatar: "assets/src/images/testemunhas/dyego-pw.jpeg"
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
                <img class="clientes-card__hero" src="${t.hero}" alt="Imagem do projeto de ${t.author}" loading="lazy">
                <img class="clientes-card__avatar" src="${t.avatar}" alt="Avatar de ${t.author}" loading="lazy">
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

      // Calcula a largura total dos cards mais o espaçamento
      const card = track.querySelector('.clientes-card');
      if (!card) return;

      const cardStyle = window.getComputedStyle(card);
      const cardWidth = card.offsetWidth;
      const cardMarginRight = parseFloat(cardStyle.marginRight);
      const totalCardWidth = cardWidth + cardMarginRight;

      const offset = -activeIndex * totalCardWidth;
      track.style.transform = `translateX(${offset}px)`;
    }

    // Inicializa o carrossel
    renderCarousel();

    // Atualiza a posição ao redimensionar a janela
    window.addEventListener('resize', updateCarouselPosition);

  })();

  // === Hero Foto Silhouette Neon Outline ===
  // Reintroduzindo a lógica do canvas para o contorno da silhueta
  const heroFoto = document.querySelector('#inicio .hero-foto');
  const heroImageContainer = document.querySelector('#inicio .hero-image-container');

  if (heroFoto && heroImageContainer) {
    function drawSilhouetteOutline() {
      // Remove canvas anterior se houver
      const oldCanvas = document.getElementById('hero-foto-outline-canvas');
      if (oldCanvas) oldCanvas.remove();

      // Certifica-se de que a imagem esteja completamente carregada antes de tentar desenhá-la
      if (!heroFoto.complete || heroFoto.naturalWidth === 0 || heroFoto.naturalHeight === 0) {
        heroFoto.onload = () => drawSilhouetteOutline(); // Tenta novamente quando a imagem carregar
        return;
      }

      // Obtém as dimensões e posição renderizadas reais do elemento da imagem
      const rect = heroFoto.getBoundingClientRect();

      // Cria um canvas com as mesmas dimensões renderizadas da imagem
      const canvas = document.createElement('canvas');
      canvas.id = 'hero-foto-outline-canvas';
      canvas.width = rect.width;
      canvas.height = rect.height;

      // Posiciona o canvas absolutamente em relação ao seu contêiner (hero-image-container)
      canvas.style.position = 'absolute';
      // Calcula a posição em relação ao heroImageContainer
      // Assumindo que heroImageContainer é o offsetParent e está posicionado (relative/absolute/fixed)
      canvas.style.left = (rect.left - heroImageContainer.getBoundingClientRect().left) + 'px';
      canvas.style.top = (rect.top - heroImageContainer.getBoundingClientRect().top) + 'px';
      canvas.style.pointerEvents = 'none'; // Não interfere com eventos do mouse
      canvas.style.zIndex = -1; // Fica atrás da imagem

      // Garante que o contêiner da imagem é relativamente posicionado
      if (heroImageContainer.style.position === '' || heroImageContainer.style.position === 'static') {
        heroImageContainer.style.position = 'relative';
      }

      // Insere o canvas ANTES da imagem (para ficar atrás)
      heroImageContainer.insertBefore(canvas, heroFoto);

      const ctx = canvas.getContext('2d');

      // --- Simula object-fit: cover para desenhar no canvas ---
      const imgNaturalWidth = heroFoto.naturalWidth;
      const imgNaturalHeight = heroFoto.naturalHeight;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      let sx, sy, sWidth, sHeight; // Retângulo de origem na imagem original
      let dx, dy, dWidth, dHeight; // Retângulo de destino no canvas

      const imageAspectRatio = imgNaturalWidth / imgNaturalHeight;
      const canvasAspectRatio = canvasWidth / canvasHeight;

      if (imageAspectRatio > canvasAspectRatio) {
        // A imagem é mais larga que o canvas, então corta esquerda/direita
        sHeight = imgNaturalHeight;
        sWidth = imgNaturalHeight * canvasAspectRatio;
        sx = (imgNaturalWidth - sWidth) / 2;
        sy = 0;
      } else {
        // A imagem é mais alta que o canvas, então corta topo/base
        sWidth = imgNaturalWidth;
        sHeight = imgNaturalWidth / canvasAspectRatio;
        sx = 0;
        sy = (imgNaturalHeight - sHeight) / 2;
      }

      dx = 0;
      dy = 0;
      dWidth = canvasWidth;
      dHeight = canvasHeight;

      // Desenha a imagem no canvas com a simulação de object-fit: cover
      ctx.drawImage(heroFoto, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

      // Pega os dados dos pixels da imagem desenhada
      const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
      const { data, width, height } = imageData;

      // Cria uma máscara para marcar pixels opacos
      const mask = [];
      for (let y = 0; y < height; y++) {
        mask[y] = [];
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          // Considera um pixel opaco se o canal alpha for maior que um certo limiar
          mask[y][x] = data[idx + 3] > 32; // Ajuste o limiar conforme necessário (ex: 0 para qualquer transparência)
        }
      }

      // Detecta pixels de borda (contorno)
      const edgePoints = [];
      function isEdge(x, y) {
        if (!mask[y] || !mask[y][x]) return false; // Não é um pixel da silhueta ou fora dos limites
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue; // Pula o próprio pixel
            const nx = x + dx, ny = y + dy;
            // Se um pixel vizinho estiver fora dos limites ou for transparente, é uma borda
            if (nx < 0 || ny < 0 || nx >= width || ny >= height || !mask[ny] || !mask[ny][nx]) {
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
      ctx.shadowColor = '#00ffc3'; // Cor do brilho neon
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

    // Função debounce (já existe em utilities.js, mas mantida aqui para auto-contenção desta seção)
    // Esta função debounce é necessária para o event listener de redimensionamento abaixo
    function debounce(func, delay) {
      let timeout;
      return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
      };
    }

    // Desenho inicial ou redesenho no carregamento da imagem
    if (heroFoto.complete && heroFoto.naturalWidth > 0 && heroFoto.naturalHeight > 0) {
      drawSilhouetteOutline();
    } else {
      heroFoto.onload = drawSilhouetteOutline;
    }

    // Redesenha ao redimensionar a janela (ajusta o tamanho do canvas)
    window.addEventListener('resize', debounce(drawSilhouetteOutline, 200));
  }

  // === Lógica para o formulário de contato da modal ===
  const contactModal = document.getElementById('contactModal');
  if (contactModal) {
    const sendWhatsappBtn = document.getElementById('sendWhatsapp');
    const sendEmailBtn = document.getElementById('sendEmail');
    const contactForm = document.getElementById('contactForm');

    // Função para coletar os dados do formulário
    function getFormData() {
      const nome = document.getElementById('modalNome').value;
      const email = document.getElementById('modalEmail').value;
      const telefone = document.getElementById('modalTelefone').value;
      const mensagem = document.getElementById('modalMensagem').value; // Novo campo de mensagem

      return { nome, email, telefone, mensagem };
    }

    // Função para validar o formulário
    function validateForm() {
      const { nome, email, mensagem } = getFormData();
      if (!nome || !email || !mensagem) {
        // Substituído alert() por uma mensagem no console ou uma UI de feedback personalizada
        console.error('Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Mensagem).');
        // Você pode adicionar aqui uma lógica para exibir uma mensagem de erro na UI
        return false;
      }
      // Validação de e-mail básica
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        // Substituído alert() por uma mensagem no console ou uma UI de feedback personalizada
        console.error('Por favor, insira um endereço de e-mail válido.');
        // Você pode adicionar aqui uma lógica para exibir uma mensagem de erro na UI
        return false;
      }
      return true;
    }

    // Evento para enviar por WhatsApp
    if (sendWhatsappBtn) {
      sendWhatsappBtn.addEventListener('click', function() {
        if (!validateForm()) return;

        const formData = getFormData();
        const message = `Olá, meu nome é ${formData.nome}.%0A%0A` +
                        `Meu e-mail é: ${formData.email}%0A` +
                        `Telefone: ${formData.telefone || 'Não informado'}%0A%0A` +
                        `Mensagem: ${formData.mensagem}%0A%0A` +
                        `Gostaria de solicitar um orçamento.`;
        
        // Número de telefone para o WhatsApp (substitua pelo seu número)
        const whatsappNumber = '554197649731'; // Exemplo: 55 para Brasil, 41 para DDD, e o número

        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        // Fecha a modal após o envio
        const modalInstance = bootstrap.Modal.getInstance(contactModal);
        if (modalInstance) modalInstance.hide();
        contactForm.reset(); // Limpa o formulário após o envio
      });
    }

    // Evento para enviar por E-mail
    if (sendEmailBtn) {
      sendEmailBtn.addEventListener('click', function() {
        if (!validateForm()) return;

        const formData = getFormData();
        const subject = encodeURIComponent('Solicitação de Orçamento - Portfólio');
        const body = encodeURIComponent(
          `Olá, meu nome é ${formData.nome}.\n\n` +
          `Meu e-email é: ${formData.email}\n` +
          `Telefone: ${formData.telefone || 'Não informado'}\n\n` +
          `Mensagem: ${formData.mensagem}\n\n` +
          `Gostaria de solicitar um orçamento.`
        );
        
        // Seu endereço de e-mail (substitua pelo seu e-mail)
        const yourEmail = 'marinanideveloper@gmail.com'; 

        window.open(`mailto:${yourEmail}?subject=${subject}&body=${body}`, '_blank');
        // Fecha a modal após o envio
        const modalInstance = bootstrap.Modal.getInstance(contactModal);
        if (modalInstance) modalInstance.hide();
        contactForm.reset(); // Limpa o formulário após o envio
      });
    }

    // Opcional: Limpar formulário ao fechar a modal
    contactModal.addEventListener('hidden.bs.modal', function () {
      contactForm.reset();
    });
  }
});
