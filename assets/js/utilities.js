// Responsividade JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Função debounce para otimizar o evento de redimensionamento
    // Reutilizada do custom.js ou definida localmente para garantir disponibilidade
    function debounce(func, delay) {
      let timeout;
      return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
      };
    }

    // Ajuste automático de altura para cards
    function adjustCardHeights() {
        const serviceCards = document.querySelectorAll('.service-card');
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        const clientCards = document.querySelectorAll('.clientes-card'); // Adicionado para clientes

        // Reset heights
        [...serviceCards, ...portfolioCards, ...clientCards].forEach(card => {
            card.style.height = 'auto';
        });

        // Ajustar apenas em desktop (ou telas maiores que 768px)
        if (window.innerWidth >= 768) {
            adjustRowHeights(serviceCards);
            adjustRowHeights(portfolioCards);
            adjustRowHeights(clientCards); // Ajusta a altura dos cards de clientes também
        }
    }

    function adjustRowHeights(cards) {
        const rows = [];
        let currentRow = [];
        let currentTop = null;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            // Agrupa cards que estão na mesma linha (top similar)
            if (currentTop === null || Math.abs(rect.top - currentTop) < 10) {
                currentRow.push(card);
                currentTop = rect.top;
            } else {
                // Se o card atual não está na mesma linha, salva a linha anterior e começa uma nova
                if (currentRow.length > 0) {
                    rows.push(currentRow);
                }
                currentRow = [card];
                currentTop = rect.top;
            }
        });

        // Adiciona a última linha
        if (currentRow.length > 0) {
            rows.push(currentRow);
        }

        // Para cada linha, encontra a altura máxima e aplica a todos os cards daquela linha
        rows.forEach(row => {
            const maxHeight = Math.max(...row.map(card => card.offsetHeight));
            row.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        });
    }

    // Inicializa o ajuste de altura ao carregar e redimensionar a página
    // Usando debounce para otimizar o evento de resize
    adjustCardHeights();
    window.addEventListener('resize', debounce(adjustCardHeights, 250)); // Aplicando debounce

    // === NAV ACTIVE SECTION INDICATOR ===
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    const sections = Array.from(navLinks)
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    function onScrollSpy() {
      const navbar = document.querySelector('.navbar');
      // Verifica se a navbar existe antes de tentar acessar offsetHeight
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const scrollPos = window.scrollY + navbarHeight + 32; // Adiciona um offset para ativar antes

      let currentSectionId = null;

      // Encontra a seção atual visível
      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        // Verifica se o topo da seção está dentro da viewport
        if (sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
          currentSectionId = sec.id;
          break; // Encontrou a seção, pode parar de procurar
        }
      }

      // Atualiza a classe 'active' nos links de navegação
      navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + currentSectionId) {
          link.classList.add('active');
          link.blur(); // Remove o foco do link
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy(); // Chama uma vez ao carregar para definir a seção inicial

    // === BACK TO TOP BUTTON ===
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        // Mostra/oculta o botão com base na rolagem
        const toggleBackToTopButton = () => {
            if (window.scrollY > 300) { // Mostra após 300px de rolagem
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        };

        window.addEventListener('scroll', toggleBackToTopButton);
        toggleBackToTopButton(); // Verifica o estado inicial ao carregar

        // Rolagem suave para o topo ao clicar
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Ajustar alturas novamente após a rolagem, para garantir que as posições estejam corretas após qualquer ajuste dinâmico do layout
    // Adicionado um pequeno atraso para garantir que o layout esteja estável
    setTimeout(adjustCardHeights, 100);
});
