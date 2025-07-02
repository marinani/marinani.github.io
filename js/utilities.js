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
                card.style.height = maxHeight + 'px';
            });
        });
    }
    
    // Smooth scroll para navegação (proteção extra)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Lazy loading para imagens (com fallback)
    const images = document.querySelectorAll('img[data-src]'); // Seleciona apenas imagens com data-src
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    } else {
        // Fallback: carrega todas as imagens imediatamente
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            }
        });
    }
    
    // Ajustar heights nos cards
    adjustCardHeights();
    window.addEventListener('resize', debounce(adjustCardHeights, 250));
    
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Menu mobile toggle
    const navToggler = document.querySelector('.navbar-toggler');
    const navCollapse = document.querySelector('.navbar-collapse');
    
    if (navToggler && navCollapse) {
        // Fechar menu ao clicar em link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navCollapse.classList.contains('show')) {
                    navToggler.click();
                }
            });
        });
    }
});

// Viewport height fix para mobile
function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

// Matrix effect for hero background
document.addEventListener('DOMContentLoaded', function() {
    // Matrix effect only on #inicio
    const matrixContainer = document.querySelector('.jarvis-matrix');
    if (matrixContainer) {
        let canvas = document.createElement('canvas');
        canvas.className = 'jarvis-matrix-canvas';
        matrixContainer.appendChild(canvas);

        function resizeMatrixCanvas() {
            canvas.width = window.innerWidth;
            // Usa offsetHeight do elemento #inicio para garantir que o canvas tenha a altura correta
            canvas.height = document.getElementById('inicio').offsetHeight || window.innerHeight;
        }
        resizeMatrixCanvas();
        window.addEventListener('resize', resizeMatrixCanvas);

        const ctx = canvas.getContext('2d');
        const fontSize = 22;
        let columns = Math.floor(canvas.width / fontSize);
        let drops = Array(columns).fill(1);

        function drawMatrix() {
            ctx.fillStyle = "rgba(10,25,47,0.18)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = fontSize + "px monospace";
            ctx.fillStyle = "#64ffda";
            for (let i = 0; i < drops.length; i++) {
                // Random number or symbol
                const text = Math.random() > 0.5
                    ? String.fromCharCode(48 + Math.floor(Math.random() * 10))
                    : String.fromCharCode(65 + Math.floor(Math.random() * 26));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
                if (drops[i] * fontSize > canvas.height) {
                    drops[i] = 0;
                }
            }
        }

        setInterval(drawMatrix, 60);
    }
});

// SKILLS BADGE GLOW EFFECT
document.addEventListener('DOMContentLoaded', function () {
  const skillBadges = document.querySelectorAll('#sobre .skill-badge');
  skillBadges.forEach(badge => {
    // Add .glow element if not present
    if (!badge.querySelector('.glow')) {
      const glow = document.createElement('div');
      glow.className = 'glow';
      badge.appendChild(glow);
    }
    const glow = badge.querySelector('.glow');
    badge.addEventListener('mousemove', (e) => {
      const rect = badge.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      badge.style.setProperty('--x', `${x}px`);
      badge.style.setProperty('--y', `${y}px`);
      // Optional: 3D tilt effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * -8;
      badge.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const angle = 135 + rotateX - rotateY;
      badge.style.setProperty('--angle', `${angle}deg`);
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = `rotateX(0deg) rotateY(0deg)`;
      badge.style.setProperty('--angle', `135deg`);
    });
  });
});

// Highlight nav item for current section (scrollspy)
document.addEventListener('DOMContentLoaded', function () {
  // === NAV ACTIVE SECTION INDICATOR ===
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link[href^="#"]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function onScrollSpy() {
    const scrollPos = window.scrollY + document.querySelector('.navbar').offsetHeight + 32;
    let currentSectionId = null;
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      if (sec.offsetTop <= scrollPos) {
        currentSectionId = sec.id;
      }
    }
    navLinks.forEach(link => {
      if (link.getAttribute('href') === '#' + currentSectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();
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
      span.style.animationDelay = (i * 0.08) + 's';
      neonBrand.appendChild(span);
    }
    neonBrand.classList.add('neon-letters-ready');
  }
});
