// Responsividade JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Ajuste automático de altura para cards
    function adjustCardHeights() {
        const serviceCards = document.querySelectorAll('.service-card');
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        
        // Reset heights
        [...serviceCards, ...portfolioCards].forEach(card => {
            card.style.height = 'auto';
        });
        
        // Ajustar apenas em desktop
        if (window.innerWidth >= 768) {
            adjustRowHeights(serviceCards);
            adjustRowHeights(portfolioCards);
        }
    }
    
    function adjustRowHeights(cards) {
        const rows = [];
        let currentRow = [];
        let currentTop = null;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (currentTop === null || Math.abs(rect.top - currentTop) < 10) {
                currentRow.push(card);
                currentTop = rect.top;
            } else {
                if (currentRow.length > 0) {
                    rows.push(currentRow);
                }
                currentRow = [card];
                currentTop = rect.top;
            }
        });
        
        if (currentRow.length > 0) {
            rows.push(currentRow);
        }
        
        rows.forEach(row => {
            const maxHeight = Math.max(...row.map(card => card.offsetHeight));
            row.forEach(card => {
                card.style.height = `${maxHeight}px`;
            });
        });
    }

    // Inicializa o ajuste de altura ao carregar e redimensionar a página
    adjustCardHeights();
    window.addEventListener('resize', adjustCardHeights);

    // === NAV ACTIVE SECTION INDICATOR ===
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
    const sections = Array.from(navLinks)
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    function onScrollSpy() {
      const scrollPos = window.scrollY + document.querySelector('.navbar').offsetHeight + 32;
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
        } else {
          link.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', onScrollSpy, { passive: true });
    onScrollSpy(); // Chama uma vez ao carregar para definir a seção inicial
});

// Neon brand letter-by-letter animation
document.addEventListener('DOMContentLoaded', function () {
  const neonBrand = document.querySelector('.neon-brand');
  if (neonBrand && !neonBrand.classList.contains('neon-letters-ready')) {
    const text = neonBrand.textContent;
    neonBrand.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.className = 'neon-letter';
      span.textContent = text[i];
      span.style.animationDelay = `${i * 0.05}s`;
      neonBrand.appendChild(span);
    }
    neonBrand.classList.add('neon-letters-ready');
  }
});

