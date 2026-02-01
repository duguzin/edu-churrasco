// EduChurrasco - JavaScript 

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 EduChurrasco - Site carregado com sucesso!');
    
    // ============================================
    // PRELOADER
    // ============================================
    window.addEventListener('load', function() {
        setTimeout(function() {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 300);
            }
            
            document.body.classList.add('loaded');
        }, 800);
    });
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    const headerHeight = header.offsetHeight;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adicionar/remover classe quando rolar
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Esconder/mostrar header
        if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
            // Rolar para baixo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Rolar para cima
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executar uma vez ao carregar

// ============================================
// SCROLL DOWN INDICATOR - INTERATIVIDADE
// ============================================
const scrollDown = document.querySelector('.scroll-down');

if (scrollDown) {
    // Suavizar scroll ao clicar/tocar
    scrollDown.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector('#sobre');
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
    
    // Feedback visual ao tocar (mobile)
    scrollDown.addEventListener('touchstart', function() {
        this.style.opacity = '0.6';
    });
    
    scrollDown.addEventListener('touchend', function() {
        this.style.opacity = '1';
    });
    
    // Esconder quando o usuário rolar
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            scrollDown.style.opacity = '0';
            scrollDown.style.pointerEvents = 'none';
        } else {
            scrollDown.style.opacity = '0.8';
            scrollDown.style.pointerEvents = 'auto';
        }
        
        lastScroll = currentScroll;
    });
}
    
    // ============================================
    // MENU MOBILE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMenu() {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
        
        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!navList.contains(event.target) && 
                !menuToggle.contains(event.target) && 
                navList.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // ============================================
    // CONTADORES ANIMADOS
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * target);
            element.textContent = value;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target;
            }
        };
        
        window.requestAnimationFrame(step);
    }
    
    function initCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            if (target > 0) {
                animateCounter(stat, target);
            }
        });
    }
    
    // Iniciar contadores quando visíveis
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '50px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initCounters();
                statsObserver.disconnect();
            }
        });
    }, observerOptions);
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // ============================================
    // ANIMAÇÕES AO ROLAR
    // ============================================
    const animatedElements = document.querySelectorAll('.feature, .portfolio-item, .info-card');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => fadeInObserver.observe(el));
    
    // ============================================
    // GALERIA INTERATIVA
    // ============================================
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        // Click para ampliar
        item.addEventListener('click', function(e) {
            if (window.innerWidth > 768) { // Apenas em desktop
                e.preventDefault();
                
                const img = this.querySelector('img').src;
                const title = this.querySelector('h3').textContent;
                const desc = this.querySelector('p').textContent;
                
                // Criar lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox-overlay';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <button class="lightbox-close" aria-label="Fechar">
                            <i class="fas fa-times"></i>
                        </button>
                        <img src="${img}" alt="${title}" loading="lazy">
                        <div class="lightbox-info">
                            <h3>${title}</h3>
                            <p>${desc}</p>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Animar entrada
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                
                // Fechar lightbox
                const closeBtn = lightbox.querySelector('.lightbox-close');
                closeBtn.addEventListener('click', closeLightbox);
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === this) {
                        closeLightbox();
                    }
                });
                
                function closeLightbox() {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        lightbox.remove();
                        document.body.style.overflow = '';
                    }, 300);
                }
            }
        });
    });
    
    // ============================================
    // FORMULÁRIO NEWSLETTER
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (!validateEmail(emailInput.value)) {
                showNotification('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Simular envio
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Inscrição realizada com sucesso!', 'success');
                emailInput.value = '';
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showNotification(message, type = 'info') {
        // Remover notificações anteriores
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Criar notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            background: ${type === 'error' ? '#dc3545' : '#25D366'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // ============================================
    // ANIMAÇÃO DO FLAME
    // ============================================
    function animateFlames() {
        const flames = document.querySelectorAll('.flame, .flame-small, .flame-loader');
        
        flames.forEach(flame => {
            const randomHeight = flame.classList.contains('flame-small') ? 
                Math.random() * 5 + 15 : 
                Math.random() * 10 + 25;
            
            flame.style.height = `${randomHeight}px`;
            
            // Sutil mudança de cor
            const hue = Math.random() * 10 + 15; // 15-25 graus
            flame.style.background = `linear-gradient(to top, 
                hsl(${hue}, 100%, 60%), 
                hsl(${hue + 10}, 100%, 50%))`;
        });
    }
    
    // Animar a cada 400ms
    if (window.innerWidth > 768) {
        setInterval(animateFlames, 400);
    }
    
    // ============================================
    // SUAVIZAR SCROLL PARA ÂNCORAS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const headerOffset = header.offsetHeight;
                const offsetPosition = targetPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // DETECTAR DISPOSITIVO
    // ============================================
    function isTouchDevice() {
        return ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0) || 
               (navigator.msMaxTouchPoints > 0);
    }
    
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
    
    // ============================================
    // PERFORMANCE - Lazy Load Images
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ============================================
    // WHATSAPP CLICK TRACKING
    // ============================================
    document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
        link.addEventListener('click', function() {
            // Aqui você pode adicionar Google Analytics ou outro tracking
            console.log('WhatsApp clicado:', this.href);
        });
    });
    
    // ============================================
    // ADICIONAR ANIMAÇÕES CSS DINÂMICAS
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        /* Animações para elementos */
        .feature, .portfolio-item, .info-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature.animate-in, 
        .portfolio-item.animate-in, 
        .info-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature.animate-in { transition-delay: 0.1s; }
        .portfolio-item.animate-in { transition-delay: 0.2s; }
        .info-card.animate-in { transition-delay: 0.3s; }
        
        /* Lightbox */
        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox-overlay.active {
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: var(--black);
            border-radius: var(--radius-lg);
            overflow: hidden;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .lightbox-overlay.active .lightbox-content {
            transform: scale(1);
        }
        
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: var(--orange);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10001;
            font-size: 1.2rem;
            transition: var(--transition);
        }
        
        .lightbox-close:hover {
            background: var(--orange-dark);
            transform: rotate(90deg);
        }
        
        .lightbox-content img {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .lightbox-info {
            padding: 30px;
            color: white;
        }
        
        /* Animações de notificação */
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        /* Ajustes para touch */
        .touch-device .portfolio-item:hover {
            transform: none !important;
        }
        
        .touch-device .contact-method:hover {
            transform: none !important;
            border-color: transparent !important;
        }
        
        /* Imagens lazy loaded */
        img.loaded {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
});

// Performance: Otimizar resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recalcular elementos que dependem do viewport
        document.querySelectorAll('.hero-stats').forEach(stats => {
            // Atualizar layout se necessário
        });
    }, 250);
});

// Verificar preferência por redução de movimento
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    // Desativar animações
    document.documentElement.style.setProperty('--transition', 'none');
}