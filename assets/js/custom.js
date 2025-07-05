// === Custom JS migrado de index.html ===

document.addEventListener('DOMContentLoaded', function () {

  // Animação de entrada dos cards de valores (se a biblioteca anime.js estiver disponível)
  if (typeof anime !== "undefined") {
    // Existing animation for .valor-card
    anime({
      targets: '.valor-card',
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [50, 0],
      delay: anime.stagger(100), // 100ms de atraso entre cada card
      duration: 800, // 800ms de duração para cada card
      easing: 'easeOutElastic(1, .8)'
    });

    // New animation for other card types
    anime({
      targets: [
        '.principle-card',
        '.exp-card',
        '.skill-category-card',
        '.service-card',
        '.portfolio-card',
        '.clientes-card'
      ],
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [50, 0],
      delay: anime.stagger(200), // Delay entre cada card
      duration: 1200, // Duração da animação
      easing: 'easeOutElastic(1, .8)'
    });
  }

  // Binary Code Cascade Effect for the #inicio section
  const jarvisMatrixCanvas = document.querySelector('.jarvis-matrix-canvas');
  if (jarvisMatrixCanvas) {
    const ctx = jarvisMatrixCanvas.getContext('2d');
    let width, height;
    const characters = '01'; // Binary characters
    const fontSize = 16;
    let columns;
    let drops = [];

    // Function to resize the canvas and reinitialize drops
    function resizeJarvisMatrixCanvas() {
      width = jarvisMatrixCanvas.width = window.innerWidth;
      height = jarvisMatrixCanvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);

      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = 1; // Start drops at the top of each column
      }
    }

    // Event listener for window resize with debounce for performance
    window.addEventListener('resize', debounce(resizeJarvisMatrixCanvas, 250));
    resizeJarvisMatrixCanvas(); // Initial resize

    // Animation loop for the binary cascade
    function animateJarvisMatrix() {
      // Semi-transparent black rectangle to fade out previous frames
      ctx.fillStyle = 'rgba(10, 25, 47, 0.05)'; // Using primary background color with low opacity
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ffc3'; // Green color for the binary code
      ctx.font = `${fontSize}px monospace`; // Monospace font for consistent character width

      // Loop through each column
      for (let i = 0; i < drops.length; i++) {
        // Get a random binary character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        // Draw the character at the current drop position
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // If the drop reaches the bottom, reset it to the top with a random chance
        if (drops[i] * fontSize * 0.8 > height && Math.random() > 0.975) { // 2.5% chance to reset, adjusted threshold
          drops[i] = 0;
        }

        // Move the drop down slower and with a nonuniform speed
        // Each drop will move between 0.1 and 0.6 units per frame (0.1 + random value up to 0.5)
        drops[i] += (Math.random() * 0.5) + 0.1;
      }

      requestAnimationFrame(animateJarvisMatrix); // Loop the animation
    }
    animateJarvisMatrix(); // Start the binary cascade animation
  }


  // Particle Background for sections with cards
  class ParticleBackground {
    constructor(canvasId, particleCount = 60, particleColor = 'rgba(100, 255, 218, 0.2)') {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) {
        console.warn(`Canvas with ID '${canvasId}' not found. Particle background will not be initialized.`);
        return;
      }
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.particleCount = particleCount;
      this.particleColor = particleColor;
      this.animationFrameId = null; // To store the animation frame ID for cancellation

      this.resize = this.resize.bind(this); // Bind 'this' context
      this.animate = this.animate.bind(this); // Bind 'this' context

      this.resize();
      // Add a resize listener with debounce
      window.addEventListener('resize', debounce(this.resize, 250));

      // Observe the section for intersection to start/stop animation
      const section = this.canvas.parentElement;
      if (section) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (!this.animationFrameId) { // Start animation only if not already running
                this.animate();
              }
            } else {
              if (this.animationFrameId) { // Stop animation if not visible
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
              }
            }
          });
        }, { threshold: 0.1 }); // Trigger when 10% of the section is visible
        observer.observe(section);
      } else {
        // If no parent section, start animation immediately
        this.animate();
      }
    }

    resize() {
      const parent = this.canvas.parentElement;
      if (parent) {
        this.width = this.canvas.width = parent.clientWidth;
        this.height = this.canvas.height = parent.clientHeight;
      } else {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
      }
      this.particles = [];
      for (let i = 0; i < this.particleCount; i++) {
        this.particles.push(this.createParticle());
      }
    }

    createParticle() {
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: Math.random() * 2 + 1, // Radius
        dx: (Math.random() - 0.5) * 0.5, // Speed X
        dy: (Math.random() - 0.5) * 0.5 // Speed Y
      };
    }

    drawParticle(p) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = this.particleColor;
      this.ctx.fill();
    }

    updateParticle(p) {
      p.x += p.dx;
      p.y += p.dy;

      // Bounce off edges
      if (p.x < 0 || p.x > this.width) p.dx *= -1;
      if (p.y < 0 || p.y > this.height) p.dy *= -1;
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      for (let p of this.particles) {
        this.drawParticle(p);
        this.updateParticle(p);
      }
      this.animationFrameId = requestAnimationFrame(this.animate);
    }
  }

  // Initialize ParticleBackground for each relevant section
  new ParticleBackground('sobreBgCanvas', 60, 'rgba(100, 255, 218, 0.2)'); // Existing 'Sobre' section
  new ParticleBackground('formacaoBgCanvas', 60, 'rgba(100, 255, 218, 0.2)');
  new ParticleBackground('skillsBgCanvas', 60, 'rgba(100, 255, 218, 0.2)');
  new ParticleBackground('experienciasBgCanvas', 60, 'rgba(100, 255, 218, 0.2)');
  new ParticleBackground('servicosBgCanvas', 60, 'rgba(100, 255, 218, 0.2)');
  new ParticleBackground('portfolioBgCanvas', 60, 'rgba(100, 255, 218, 0.2)');
  new ParticleBackground('clientesBgCanvas', 60, 'rgba(100, 255, 218, 0.2)');


  // Efeito de rolagem suave para links de navegação
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Fecha o menu hamburguer após clicar em um item (apenas para dispositivos móveis)
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
    document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          bsCollapse.hide();
        }
      });
    });
  }

  // Ativação do AOS (Animate On Scroll)
  AOS.init({
    duration: 1200, // Duração da animação em ms
    once: true,     // Animar apenas uma vez ao rolar para baixo
    mirror: false,  // Se os elementos devem animar de volta ao rolar para cima
  });

  // Configuração do Swiper para o carrossel de clientes (testemunhos)
  const swiperClientes = new Swiper('.swiper-container-clientes', {
    slidesPerView: 1, // Exibe 1 slide por vez em telas muito pequenas
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination-clientes',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next-clientes',
      prevEl: '.swiper-button-prev-clientes',
    },
    breakpoints: {
      // Quando a largura da janela for >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // Quando a largura da janela for >= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      // Quando a largura da janela for >= 1200px
      1200: {
        slidesPerView: 4, // 4 cards em telas maiores
        spaceBetween: 40,
      }
    }
  });


  // Lógica para o formulário de contato dentro da modal
  const contactFormModal = document.getElementById('contactFormModal');
  const formMessageModal = document.getElementById('formMessageModal');

  if (contactFormModal) {
    const sendWhatsappModalBtn = document.getElementById('sendWhatsappModal');
    const sendEmailModalBtn = document.getElementById('sendEmailModal');

    // Function to display messages (success/error)
    function displayMessage(message, isSuccess) {
      formMessageModal.textContent = message;
      formMessageModal.style.color = isSuccess ? '#28a745' : '#dc3545'; // Green for success, red for error
      formMessageModal.style.display = 'block';
      setTimeout(() => {
        formMessageModal.style.display = 'none';
      }, 5000); // Hide message after 5 seconds
    }

    // Function to get form data
    function getFormData() {
      const nome = document.getElementById('modalNome').value;
      const email = document.getElementById('modalEmail').value;
      const telefone = document.getElementById('modalTelefone').value;
      const mensagem = document.getElementById('modalMensagem').value;
      return { nome, email, telefone, mensagem };
    }

    // Function to validate form data
    function validateForm(data) {
      if (!data.nome || !data.email || !data.mensagem) {
        displayMessage('Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Mensagem).', false);
        return false;
      }
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        displayMessage('Por favor, insira um e-mail válido.', false);
        return false;
      }
      return true;
    }

    // WhatsApp send logic
    if (sendWhatsappModalBtn) {
      sendWhatsappModalBtn.addEventListener('click', () => {
        const data = getFormData();
        if (validateForm(data)) {
          const whatsappMessage = `Olá, meu nome é ${data.nome}. Meu e-mail é ${data.email}. ${data.telefone ? `Meu telefone é ${data.telefone}.` : ''}\n\n${data.mensagem}\n\n*Solicitação de Orçamento*`;
          const whatsappUrl = `https://wa.me/5541999999999?text=${encodeURIComponent(whatsappMessage)}`;
          window.open(whatsappUrl, '_blank');
          displayMessage('Mensagem para WhatsApp gerada! Por favor, envie-a.', true);
          contactFormModal.reset();
          // Optionally close modal after sending
          const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
          if (contactModal) contactModal.hide();
        }
      });
    }

    // Email send logic
    if (sendEmailModalBtn) {
      sendEmailModalBtn.addEventListener('click', () => {
        const data = getFormData();
        if (validateForm(data)) {
          const subject = encodeURIComponent('Solicitação de Orçamento - Portfólio');
          const body = encodeURIComponent(`Olá Mariane,\n\nMeu nome é ${data.nome}.\nMeu e-mail é ${data.email}.\n${data.telefone ? `Meu telefone é ${data.telefone}.\n` : ''}\n${data.mensagem}\n\nAtenciosamente,\n${data.nome}`);
          const mailtoUrl = `mailto:marinanideveloper@gmail.com?subject=${subject}&body=${body}`;
          window.location.href = mailtoUrl;
          displayMessage('E-mail gerado! Por favor, envie-o pelo seu cliente de e-mail.', true);
          contactFormModal.reset();
          // Optionally close modal after sending
          const contactModal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
          if (contactModal) contactModal.hide();
        }
      });
    }
  }


  // Lógica do carrossel para cards de clientes (versão manual)
  const carouselTrack = document.querySelector('.clientes-carousel-track');
  const prevButton = document.querySelector('.clientes-carousel-button.prev');
  const nextButton = document.querySelector('.clientes-carousel-button.next');
  const cards = document.querySelectorAll('.clientes-card');

  if (carouselTrack && cards.length > 0) {
    let currentCarouselIndex = 0;
    let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight); // Largura do card + margem

    // Função para atualizar a posição do carrossel e o estado dos botões
    function updateCarouselPosition() {
      carouselTrack.style.transform = `translateX(-${currentCarouselIndex * cardWidth}px)`;

      // Atualiza o estado dos botões (habilitado/desabilitado)
      const trackWrapper = carouselTrack.parentElement;
      const visibleCardsCount = cardWidth > 0 ? Math.floor(trackWrapper.clientWidth / cardWidth) : 0;
      const maxIndex = Math.max(0, cards.length - visibleCardsCount); // Índice máximo para rolagem

      if (prevButton) {
        prevButton.disabled = currentCarouselIndex === 0;
      }
      if (nextButton) {
        nextButton.disabled = currentCarouselIndex >= maxIndex;
      }
    }

    // Chama a função de atualização ao carregar e ao redimensionar
    window.addEventListener('load', updateCarouselPosition);
    window.addEventListener('resize', debounce(() => {
      cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight); // Recalcula a largura do card
      // Ajusta o índice atual para não exceder o novo limite visível
      const trackWrapper = carouselTrack.parentElement;
      const visibleCardsCount = cardWidth > 0 ? Math.floor(trackWrapper.clientWidth / cardWidth) : 0;
      const maxIndex = Math.max(0, cards.length - visibleCardsCount);
      currentCarouselIndex = Math.min(currentCarouselIndex, maxIndex);
      updateCarouselPosition(); // Atualiza a posição e o estado dos botões
    }, 250));

    // Adiciona listeners para os botões de navegação do carrossel
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        currentCarouselIndex = Math.max(0, currentCarouselIndex - 1);
        updateCarouselPosition();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        const trackWrapper = carouselTrack.parentElement;
        const visibleCardsCount = cardWidth > 0 ? Math.floor(trackWrapper.clientWidth / cardWidth) : 0;
        const maxIndex = Math.max(0, cards.length - visibleCardsCount);

        currentCarouselIndex = Math.min(maxIndex, currentCarouselIndex + 1);
        updateCarouselPosition();
      });
    }
  }
});

// Função debounce para otimizar o evento de redimensionamento
function debounce(func, delay) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}
