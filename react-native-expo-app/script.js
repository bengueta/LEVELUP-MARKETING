// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ==========================================
// CONFIGURATION
// ==========================================
const CONFIG = {
    // Countdown end date (set to 14 days from now for urgency)
    countdownEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    animationEnabled: true
};

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}

function savePreference(key, value) {
    try {
        localStorage.setItem(`coreside_${key}`, value);
    } catch (e) {
        console.warn('localStorage not available');
    }
}

function getPreference(key, defaultValue) {
    try {
        return localStorage.getItem(`coreside_${key}`) || defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

// ==========================================
// LOADER
// ==========================================
const loader = {
    el: $('#loader'),
    progress: $('#loaderProgress'),
    logo: $('.loader-logo'),
    text: $('.loader-text'),
    
    init() {
        let progress = 0;
        
        gsap.to(this.logo, { opacity: 1, duration: 0.4 });
        gsap.to(this.text, { opacity: 1, duration: 0.3, delay: 0.2 });
        
        const interval = setInterval(() => {
            progress += Math.random() * 25;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.complete();
            }
            gsap.to(this.progress, { width: `${progress}%`, duration: 0.15 });
        }, 60);
    },
    
    complete() {
        setTimeout(() => {
            gsap.to(this.el, {
                yPercent: -100,
                duration: 0.7,
                ease: 'power3.inOut',
                onComplete: () => {
                    this.el.style.display = 'none';
                    animations.init();
                    urgencyBar.show();
                }
            });
        }, 200);
    }
};

// ==========================================
// COUNTDOWN TIMER - Research: +147% conversions
// ==========================================
const countdown = {
    timer: null,
    
    init() {
        this.update();
        this.timer = setInterval(() => this.update(), 1000);
    },
    
    update() {
        const now = new Date().getTime();
        const end = CONFIG.countdownEndDate.getTime();
        const diff = end - now;
        
        if (diff <= 0) {
            clearInterval(this.timer);
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        $('#timerDays').textContent = String(days).padStart(2, '0');
        $('#timerHours').textContent = String(hours).padStart(2, '0');
        $('#timerMinutes').textContent = String(minutes).padStart(2, '0');
        $('#timerSeconds').textContent = String(seconds).padStart(2, '0');
    }
};

// ==========================================
// URGENCY BAR
// ==========================================
const urgencyBar = {
    el: $('#urgencyBar'),
    closeBtn: $('#urgencyClose'),
    header: $('#header'),
    
    init() {
        this.closeBtn.addEventListener('click', () => this.hide());
        
        if (getPreference('urgencyHidden', 'false') === 'true') {
            this.el.remove();
            this.header.classList.remove('with-urgency');
        }
    },
    
    show() {
        if (getPreference('urgencyHidden', 'false') === 'false') {
            countdown.init();
            gsap.to(this.el, {
                y: 0,
                duration: 0.5,
                delay: 0.5,
                ease: 'power3.out',
                onStart: () => this.el.classList.add('visible')
            });
        }
    },
    
    hide() {
        gsap.to(this.el, {
            y: -100,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
                this.el.remove();
                this.header.classList.remove('with-urgency');
                savePreference('urgencyHidden', 'true');
            }
        });
    }
};

// ==========================================
// ACCESSIBILITY PANEL
// ==========================================
const a11yPanel = {
    toggle: $('#a11yToggle'),
    panel: $('#a11yPanel'),
    overlay: $('#a11yOverlay'),
    closeBtn: $('#a11yClose'),
    
    init() {
        this.loadPreferences();
        this.bindEvents();
    },
    
    loadPreferences() {
        const theme = getPreference('theme', 'dark');
        const fontSize = getPreference('fontSize', 'normal');
        const contrast = getPreference('contrast', 'normal');
        const motion = getPreference('motion', 'normal');
        
        document.body.dataset.theme = theme;
        document.body.dataset.fontSize = fontSize;
        document.body.dataset.contrast = contrast;
        document.body.dataset.motion = motion;
        
        CONFIG.animationEnabled = motion !== 'reduced';
        
        this.updateButtons();
    },
    
    updateButtons() {
        const theme = document.body.dataset.theme;
        const fontSize = document.body.dataset.fontSize;
        const contrast = document.body.dataset.contrast;
        const motion = document.body.dataset.motion;
        
        $$('[data-theme-btn]').forEach(btn => {
            const isActive = btn.dataset.themeBtn === theme;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
        
        $$('[data-font]').forEach(btn => {
            const isActive = btn.dataset.font === fontSize;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
        
        $$('[data-contrast-btn]').forEach(btn => {
            const isActive = btn.dataset.contrastBtn === contrast;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
        
        $$('[data-motion-btn]').forEach(btn => {
            const isActive = btn.dataset.motionBtn === motion;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });
    },
    
    bindEvents() {
        this.toggle.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.panel.classList.contains('open')) {
                this.close();
            }
        });
        
        // Theme buttons
        $$('[data-theme-btn]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.dataset.theme = btn.dataset.themeBtn;
                savePreference('theme', btn.dataset.themeBtn);
                this.updateButtons();
            });
        });
        
        // Font size buttons
        $$('[data-font]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.dataset.fontSize = btn.dataset.font;
                savePreference('fontSize', btn.dataset.font);
                this.updateButtons();
            });
        });
        
        // Contrast buttons
        $$('[data-contrast-btn]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.dataset.contrast = btn.dataset.contrastBtn;
                savePreference('contrast', btn.dataset.contrastBtn);
                this.updateButtons();
            });
        });
        
        // Motion buttons
        $$('[data-motion-btn]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.dataset.motion = btn.dataset.motionBtn;
                savePreference('motion', btn.dataset.motionBtn);
                CONFIG.animationEnabled = btn.dataset.motionBtn !== 'reduced';
                this.updateButtons();
            });
        });
        
        // Reset button
        const resetBtn = $('#a11yReset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }
    },
    
    open() {
        this.panel.classList.add('open');
        this.overlay.classList.add('visible');
        this.panel.setAttribute('aria-hidden', 'false');
        this.toggle.setAttribute('aria-expanded', 'true');
        this.closeBtn.focus();
    },
    
    close() {
        this.panel.classList.remove('open');
        this.overlay.classList.remove('visible');
        this.panel.setAttribute('aria-hidden', 'true');
        this.toggle.setAttribute('aria-expanded', 'false');
        this.toggle.focus();
    },
    
    reset() {
        document.body.dataset.theme = 'dark';
        document.body.dataset.fontSize = 'normal';
        document.body.dataset.contrast = 'normal';
        document.body.dataset.motion = 'normal';
        CONFIG.animationEnabled = true;
        
        savePreference('theme', 'dark');
        savePreference('fontSize', 'normal');
        savePreference('contrast', 'normal');
        savePreference('motion', 'normal');
        
        this.updateButtons();
        
        // Announce to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = 'הגדרות הנגישות אופסו';
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 2000);
    }
};

// ==========================================
// ANIMATIONS
// ==========================================
const animations = {
    init() {
        if (!CONFIG.animationEnabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.showAllElements();
            return;
        }
        
        this.heroAnimations();
        this.scrollAnimations();
    },
    
    showAllElements() {
        gsap.set('#heroBadge, .hero-title-word, #heroSubtitle, #heroStats, #heroActions, #heroTrust, #heroScroll', {
            opacity: 1,
            y: 0,
            transform: 'none'
        });
    },
    
    heroAnimations() {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        
        tl.to('#heroBadge', { opacity: 1, y: 0, duration: 0.6 })
          .to('.hero-title-word', { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 }, '-=0.3')
          .to('#heroSubtitle', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
          .to('#heroStats', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
          .to('#heroActions', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
          .to('#heroTrust', { opacity: 1, duration: 0.5 }, '-=0.2')
          .to('#heroScroll', { opacity: 1, duration: 0.5 }, '-=0.2');
        
        // Counter animation
        const counterEl = $('[data-count]');
        if (counterEl) {
            const target = parseInt(counterEl.dataset.count);
            gsap.to(counterEl, {
                innerText: target,
                duration: 2,
                delay: 1.2,
                snap: { innerText: 1 },
                ease: 'power2.out'
            });
        }
    },
    
    scrollAnimations() {
        // Problem cards
        gsap.utils.toArray('.problem-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });
        
        // Track cards
        gsap.utils.toArray('.track-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 60,
                opacity: 0,
                duration: 0.7,
                delay: i * 0.15,
                ease: 'power3.out'
            });
        });
        
        // Testimonials
        gsap.utils.toArray('.testimonial').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });
        
        // About section
        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            x: -60,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            x: 60,
            opacity: 0,
            duration: 0.8,
            delay: 0.1,
            ease: 'power3.out'
        });
        
        // Parallax effect on hero gradient
        gsap.to('.hero-gradient', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 150,
            opacity: 0.05
        });
    }
};

// ==========================================
// HEADER
// ==========================================
const header = {
    el: $('#header'),
    
    init() {
        window.addEventListener('scroll', () => {
            this.el.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }
};

// ==========================================
// SMOOTH SCROLL
// ==========================================
const smoothScroll = {
    init() {
        $$('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = $(href);
                
                if (target) {
                    const offset = window.innerWidth <= 768 ? 60 : 80;
                    
                    if (CONFIG.animationEnabled) {
                        gsap.to(window, {
                            scrollTo: { y: target, offsetY: offset },
                            duration: 0.8,
                            ease: 'power3.inOut'
                        });
                    } else {
                        target.scrollIntoView({ behavior: 'auto' });
                    }
                    
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                }
            });
        });
    }
};

// ==========================================
// FORM HANDLING
// ==========================================
const form = {
    el: $('#leadForm'),
    submitBtn: $('#submitBtn'),
    
    init() {
        if (!this.el) return;
        this.el.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Phone input - numbers only
        const phoneInput = $('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9\-+]/g, '');
            });
        }
    },
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const originalHTML = this.submitBtn.innerHTML;
        this.submitBtn.innerHTML = '<span>שולח...</span>';
        this.submitBtn.disabled = true;
        this.submitBtn.setAttribute('aria-busy', 'true');
        
        // Collect form data
        const formData = new FormData(this.el);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            track: formData.get('track'),
            message: formData.get('message')
        };
        
        try {
            // Send email using FormSubmit (free service)
            const response = await fetch('https://formsubmit.co/ajax/info@bengueta.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    track: data.track || 'לא נבחר',
                    message: data.message || 'לא צוין',
                    _subject: `ליד חדש מ-CoreSide: ${data.name}`,
                    _template: 'table'
                })
            });
            
            if (response.ok) {
                this.submitBtn.innerHTML = '<span>✓ נשלח בהצלחה!</span>';
                this.submitBtn.style.background = 'var(--accent-green)';
                
                // Success announcement for screen readers
                const announcement = document.createElement('div');
                announcement.setAttribute('role', 'status');
                announcement.setAttribute('aria-live', 'polite');
                announcement.className = 'sr-only';
                announcement.textContent = 'הטופס נשלח בהצלחה. נחזור אליך בהקדם.';
                document.body.appendChild(announcement);
                
                setTimeout(() => {
                    this.submitBtn.innerHTML = originalHTML;
                    this.submitBtn.style.background = '';
                    this.submitBtn.disabled = false;
                    this.el.reset();
                    announcement.remove();
                }, 3000);
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            // Fallback - open mail client
            const mailtoLink = `mailto:info@bengueta.com?subject=ליד חדש: ${encodeURIComponent(data.name)}&body=${encodeURIComponent(
                `שם: ${data.name}\nטלפון: ${data.phone}\nאימייל: ${data.email}\nמסלול: ${data.track || 'לא נבחר'}\nהודעה: ${data.message || 'לא צוין'}`
            )}`;
            window.location.href = mailtoLink;
            
            this.submitBtn.innerHTML = originalHTML;
            this.submitBtn.disabled = false;
            this.submitBtn.setAttribute('aria-busy', 'false');
        }
    }
};

// ==========================================
// MAGNETIC BUTTONS (Desktop only)
// ==========================================
const magneticButtons = {
    init() {
        if (window.innerWidth <= 768 || !CONFIG.animationEnabled) return;
        
        $$('.btn-primary, .track-cta, .nav-cta').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.15,
                    y: y * 0.15,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }
};

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
const scrollReveal = {
    init() {
        // Add js-enabled class so CSS knows JS is working
        document.body.classList.add('js-enabled');
        
        if (!CONFIG.animationEnabled) return;
        
        // Add scroll-reveal class to elements
        $$('.section-header, .problem-card-premium, .track-card, .testimonial, .faq-item, .about-grid, .form').forEach((el, i) => {
            el.classList.add('scroll-reveal');
            if (i % 3 === 1) el.classList.add('scroll-reveal-delay-1');
            if (i % 3 === 2) el.classList.add('scroll-reveal-delay-2');
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        $$('.scroll-reveal').forEach(el => observer.observe(el));
    }
};

// ==========================================
// PARALLAX ON SCROLL (subtle)
// ==========================================
const parallax = {
    init() {
        if (!CONFIG.animationEnabled || window.innerWidth <= 768) return;
        
        const floatingElements = $$('.floating-element');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            floatingElements.forEach((el, i) => {
                const speed = 0.05 + (i * 0.02);
                gsap.to(el, {
                    y: scrollY * speed,
                    duration: 0.5,
                    ease: 'power1.out'
                });
            });
        });
    }
};

// ==========================================
// INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Check system preferences
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches && !getPreference('theme', null)) {
        document.body.dataset.theme = 'light';
    }
    
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        CONFIG.animationEnabled = false;
        document.body.dataset.motion = 'reduced';
    }
    
    // Initialize all modules
    loader.init();
    urgencyBar.init();
    a11yPanel.init();
    header.init();
    smoothScroll.init();
    form.init();
    magneticButtons.init();
    scrollReveal.init();
    parallax.init();
    
    // Live viewers counter - Random fluctuation for social proof
    const viewerCount = $('#viewerCount');
    if (viewerCount) {
        setInterval(() => {
            const current = parseInt(viewerCount.textContent);
            const change = Math.random() > 0.5 ? 1 : -1;
            const newCount = Math.max(8, Math.min(25, current + change));
            viewerCount.textContent = newCount;
        }, 5000);
    }
});

