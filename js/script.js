// =============================================================================
// PORTFOLIO JAVASCRIPT - Harsh Pandey
// =============================================================================

// =============================================================================
// GLOBAL VARIABLES
// =============================================================================
let lastScrollTop = 0;
const phrases = [
    "Full-Stack Developer",
    "Mobile App Creator", 
    "UI/UX Enthusiast",
    "Problem Solver"
];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

// =============================================================================
// DOM CONTENT LOADED EVENT
// =============================================================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// =============================================================================
// INITIALIZE APPLICATION
// =============================================================================
function initializeApp() {
    setupHeaderScrollEffect();
    setupActiveNavigation();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupModalFunctionality();
    setupFormHandling();
    setupMobileMenu();
    setupParallaxEffects();
    setupTypingEffect();
    setupGlitchEffect();
    
    // Add loading animation
    document.body.classList.add('loaded');
    
    console.log('Portfolio initialized successfully!');
}

// =============================================================================
// HEADER SCROLL EFFECTS
// =============================================================================
function setupHeaderScrollEffect() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when scrolled down
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// =============================================================================
// ACTIVE NAVIGATION HIGHLIGHTING
// =============================================================================
function setupActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        // Update active navigation link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// =============================================================================
// SMOOTH SCROLLING
// =============================================================================
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// =============================================================================
// SCROLL ANIMATIONS
// =============================================================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger effect for grid items
                if (entry.target.closest('.project-grid, .skills-grid')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// =============================================================================
// MODAL FUNCTIONALITY
// =============================================================================
function setupModalFunctionality() {
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            const modalId = event.target.getAttribute('id');
            closeModal(modalId);
        }
    });

    // Close modal with Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal.getAttribute('id'));
            }
        }
    });
}

// Open Modal Function
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation to modal content
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modalSlideIn 0.3s ease forwards';
    }
}

// Close Modal Function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// =============================================================================
// FORM HANDLING
// =============================================================================
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'var(--success-color)';
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            form.reset();
        }, 2000);
    }, 2000);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing error
    clearFieldError(e);
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = 'var(--accent-secondary)';
    
    let errorDiv = field.parentNode.querySelector('.field-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = 'color: var(--accent-secondary); font-size: 0.8rem; margin-top: 0.5rem;';
        field.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
}

function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = 'var(--border-color)';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// =============================================================================
// NOTIFICATION SYSTEM
// =============================================================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--card-bg);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        border-left: 4px solid var(--${type === 'success' ? 'success-color' : 'accent-primary'});
        box-shadow: var(--shadow-glow);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// =============================================================================
// MOBILE MENU
// =============================================================================
function setupMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenu && navbar) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
        
        // Close menu when clicking on a link
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }
}

function toggleMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    navbar.classList.toggle('mobile-active');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    navbar.classList.remove('mobile-active');
    mobileMenu.classList.remove('active');
}

// =============================================================================
// PARALLAX EFFECTS
// =============================================================================
function setupParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for floating shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            shape.style.transform = `translate3d(0, ${rate * (index + 1) * 0.3}px, 0)`;
        });
        
        // Parallax for home visual
        const homeVisual = document.querySelector('.home-visual');
        if (homeVisual) {
            homeVisual.style.transform = `translateY(-50%) translateX(${scrolled * 0.1}px)`;
        }
    });
}

// =============================================================================
// TYPING EFFECT
// =============================================================================
function setupTypingEffect() {
    // Start typing effect after a delay
    setTimeout(() => {
        typeEffect();
    }, 1000);
}

function typeEffect() {
    const subtitleElement = document.querySelector('.home-content .subtitle');
    if (!subtitleElement) return;
    
    const current = phrases[currentPhrase];
    
    if (isDeleting) {
        currentChar--;
    } else {
        currentChar++;
    }
    
    subtitleElement.textContent = "I'm a " + current.substring(0, currentChar);
    
    let typeSpeed = isDeleting ? 50 : 150;
    
    if (!isDeleting && currentChar === current.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

// =============================================================================
// GLITCH EFFECT
// =============================================================================
function setupGlitchEffect() {
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        logo.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    }
}

// =============================================================================
// PERFORMANCE OPTIMIZATIONS
// =============================================================================

// Throttle function for scroll events
function throttle(func, wait) {
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

// Debounce function for resize events
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

// =============================================================================
// THEME MANAGEMENT
// =============================================================================
function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    
    showNotification(`Switched to ${newTheme} theme`, 'success');
}

// =============================================================================
// CURSOR EFFECTS
// =============================================================================
function setupCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--accent-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hide default cursor on hover elements
    document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'var(--accent-secondary)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'var(--accent-primary)';
        });
    });
}

// =============================================================================
// LOADING ANIMATIONS
// =============================================================================
function setupLoadingAnimation() {
    window.addEventListener('load', () => {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">HP</div>
                <div class="loader-text">Loading Portfolio...</div>
                <div class="loader-bar">
                    <div class="loader-progress"></div>
                </div>
            </div>
        `;
        
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary-bg);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(loader);
        
        // Simulate loading progress
        const progressBar = loader.querySelector('.loader-progress');
        let progress = 0;
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            progressBar.style.width = Math.min(progress, 100) + '%';
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.remove();
                        document.body.classList.add('loaded');
                    }, 500);
                }, 300);
            }
        }, 100);
    });
}

// =============================================================================
// SCROLL TO TOP
// =============================================================================
function setupScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent-gradient);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-glow);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }, 100));
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =============================================================================
// PARTICLE SYSTEM
// =============================================================================
function createParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 250));
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#00f5ff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// =============================================================================
// KEYBOARD SHORTCUTS
// =============================================================================
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + D to toggle dark mode
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleTheme();
        }
        
        // Ctrl/Cmd + K for quick navigation
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            showQuickNav();
        }
        
        // Number keys for quick section navigation
        const numKey = parseInt(e.key);
        if (numKey >= 1 && numKey <= 5) {
            const sections = ['home', 'about', 'portfolio', 'skills', 'contact'];
            const targetSection = document.getElementById(sections[numKey - 1]);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

function showQuickNav() {
    const quickNav = document.createElement('div');
    quickNav.className = 'quick-nav-modal';
    quickNav.innerHTML = `
        <div class="quick-nav-content">
            <h3>Quick Navigation</h3>
            <div class="quick-nav-items">
                <a href="#home" class="quick-nav-item" data-key="1">
                    <span class="key">1</span>
                    <span class="label">Home</span>
                </a>
                <a href="#about" class="quick-nav-item" data-key="2">
                    <span class="key">2</span>
                    <span class="label">About</span>
                </a>
                <a href="#portfolio" class="quick-nav-item" data-key="3">
                    <span class="key">3</span>
                    <span class="label">Portfolio</span>
                </a>
                <a href="#skills" class="quick-nav-item" data-key="4">
                    <span class="key">4</span>
                    <span class="label">Skills</span>
                </a>
                <a href="#contact" class="quick-nav-item" data-key="5">
                    <span class="key">5</span>
                    <span class="label">Contact</span>
                </a>
            </div>
        </div>
    `;
    
    quickNav.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(quickNav);
    
    // Close on click outside or escape
    quickNav.addEventListener('click', (e) => {
        if (e.target === quickNav) {
            quickNav.remove();
        }
    });
    
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            quickNav.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
    
    // Navigation functionality
    quickNav.querySelectorAll('.quick-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(item.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                quickNav.remove();
            }
        });
    });
}

// =============================================================================
// EASTER EGGS
// =============================================================================
function setupEasterEggs() {
    // Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        konamiCode = konamiCode.slice(-konamiSequence.length);
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            triggerEasterEgg();
        }
    });
    
    // Click logo 10 times easter egg
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            clickCount++;
            
            if (clickCount === 10) {
                triggerSecretMode();
                clickCount = 0;
            }
            
            // Reset count after 3 seconds
            setTimeout(() => {
                clickCount = 0;
            }, 3000);
        });
    }
}

function triggerEasterEgg() {
    showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
    
    // Add rainbow effect to entire page
    document.body.style.animation = 'rainbow 2s infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 10000);
}

function triggerSecretMode() {
    showNotification('🚀 Developer mode activated!', 'success');
    
    // Add matrix effect
    createMatrixEffect();
}

function createMatrixEffect() {
    const matrix = document.createElement('div');
    matrix.className = 'matrix-effect';
    matrix.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        color: #00ff00;
        overflow: hidden;
    `;
    
    document.body.appendChild(matrix);
    
    const chars = '01ハーシュパンデイソフトウェア開発者';
    const columns = Math.floor(window.innerWidth / 14);
    const drops = new Array(columns).fill(1);
    
    function drawMatrix() {
        matrix.innerHTML = '';
        
        for (let i = 0; i < columns; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const drop = document.createElement('div');
            drop.textContent = char;
            drop.style.cssText = `
                position: absolute;
                left: ${i * 14}px;
                top: ${drops[i] * 14}px;
                opacity: ${Math.random()};
            `;
            matrix.appendChild(drop);
            
            if (drops[i] * 14 > window.innerHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 100);
    
    // Remove matrix effect after 15 seconds
    setTimeout(() => {
        clearInterval(matrixInterval);
        matrix.remove();
    }, 15000);
}

// =============================================================================
// INITIALIZATION WITH ERROR HANDLING
// =============================================================================
window.addEventListener('load', function() {
    try {
        // Initialize all features
        setupLoadingAnimation();
        setupScrollToTop();
        setupCustomCursor();
        createParticleSystem();
        setupKeyboardShortcuts();
        setupEasterEggs();
        
        console.log('🚀 Portfolio loaded successfully!');
        console.log('💡 Try the Konami Code or click the logo 10 times!');
        console.log('⌨️ Keyboard shortcuts: Ctrl+D (theme), Ctrl+K (navigation), 1-5 (sections)');
        
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// =============================================================================
// SERVICE WORKER REGISTRATION
// =============================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// =============================================================================
// GLOBAL ERROR HANDLING
// =============================================================================
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// =============================================================================
// EXPORT FUNCTIONS FOR GLOBAL ACCESS
// =============================================================================
window.portfolioAPI = {
    openModal,
    closeModal,
    showNotification,
    toggleTheme,
    showQuickNav
};