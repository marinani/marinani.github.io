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
    
    // Smooth scroll para navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy loading para imagens
    const images = document.querySelectorAll('img');
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
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
    
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