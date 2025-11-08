// Main JavaScript for Portfolio Website
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.initTypewriter();
        this.initCounters();
        this.initScrollReveal();
        this.initMobileMenu();
    }

    setupEventListeners() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add loading states for external links
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', () => {
                link.style.opacity = '0.7';
                setTimeout(() => {
                    link.style.opacity = '1';
                }, 1000);
            });
        });
    }

    initAnimations() {
        // Animate navigation on scroll
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
            }
            
            lastScrollY = currentScrollY;
        });

        // Animate particles
        this.animateParticles();
    }

    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            // Random size and position
            const size = Math.random() * 8 + 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random animation duration
            const duration = Math.random() * 4 + 4;
            particle.style.animationDuration = `${duration}s`;
            
            // Random delay
            const delay = Math.random() * 2;
            particle.style.animationDelay = `${delay}s`;
        });
    }

    initTypewriter() {
        // Typewriter effect for name
        if (document.getElementById('typed-name')) {
            new Typed('#typed-name', {
                strings: ['Jannu Hans'],
                typeSpeed: 100,
                startDelay: 500,
                showCursor: false,
                onComplete: () => {
                    // Start tagline after name is complete
                    if (document.getElementById('typed-tagline')) {
                        new Typed('#typed-tagline', {
                            strings: [
                                'Full Stack Developer & AI Enthusiast',
                                'Competitive Programming Expert',
                                'Research Intern @ IIIT Guwahati'
                            ],
                            typeSpeed: 50,
                            backSpeed: 30,
                            backDelay: 2000,
                            startDelay: 300,
                            loop: true,
                            showCursor: true,
                            cursorChar: '|'
                        });
                    }
                }
            });
        }
    }

    initCounters() {
        const counters = document.querySelectorAll('.counter');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 100); // Stagger animations
                }
            });
        }, observerOptions);

        revealElements.forEach(element => observer.observe(element));
    }

    initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // Animate menu icon
                const icon = mobileMenuBtn.querySelector('svg');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    icon.style.transform = 'rotate(90deg)';
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.querySelector('svg').style.transform = 'rotate(0deg)';
                }
            });
        }
    }

    // Utility functions
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Enhanced project card interactions
class ProjectCards {
    constructor() {
        this.init();
    }

    init() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            this.addHoverEffects(card);
            this.addClickEffects(card);
        });
    }

    addHoverEffects(card) {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.02,
                rotateX: 5,
                translateY: -8,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                rotateX: 0,
                translateY: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    }

    addClickEffects(card) {
        card.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(245, 158, 11, 0.3);
                border-radius: 50%;
                left: ${x - 10}px;
                top: ${y - 10}px;
                pointer-events: none;
                z-index: 1000;
            `;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            anime({
                targets: ripple,
                scale: [0, 4],
                opacity: [0.6, 0],
                duration: 600,
                easing: 'easeOutCubic',
                complete: () => ripple.remove()
            });
        });
    }
}

// Achievement tracker
class AchievementTracker {
    constructor() {
        this.achievements = {
            codeforces: { rating: 1365, rank: 'Pupil' },
            codechef: { rating: 1689, stars: 3 },
            leetcode: { rating: 1781, percentile: 8.34 },
            totalProblems: 1200
        };
        
        this.init();
    }

    init() {
        this.updateAchievementDisplay();
        this.animateAchievements();
    }

    updateAchievementDisplay() {
        // Update achievement cards with real data
        const achievementCards = document.querySelectorAll('.achievement-card');
        
        achievementCards.forEach((card, index) => {
            const counter = card.querySelector('.counter');
            const subtitle = card.querySelector('p:last-child');
            
            switch(index) {
                case 0:
                    counter.setAttribute('data-target', this.achievements.codeforces.rating);
                    subtitle.textContent = this.achievements.codeforces.rank;
                    break;
            
                case 1:
                    counter.setAttribute('data-target', this.achievements.totalProblems);
                    // subtitle already correct
                    break;
            
                case 2:
                    counter.setAttribute('data-target', this.achievements.leetcode.rating);
                    subtitle.textContent = `Top ${this.achievements.leetcode.percentile}% Globally`;
                    break;
            }
            
        });
    }

    animateAchievements() {
        // Add pulsing effect to achievement cards
        const cards = document.querySelectorAll('.achievement-card');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                anime({
                    targets: card,
                    scale: [1, 1.05, 1],
                    duration: 1000,
                    easing: 'easeInOutSine',
                    loop: true,
                    direction: 'alternate',
                    delay: index * 200
                });
            }, 1000);
        });
    }
}

// Form validation and interaction (for contact page)
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.setupValidation();
        this.setupInteractions();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Update field appearance
        if (isValid) {
            field.classList.remove('border-red-500');
            field.classList.add('border-green-500');
            this.clearFieldError(field);
        } else {
            field.classList.remove('border-green-500');
            field.classList.add('border-red-500');
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message text-red-500 text-sm mt-1';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    clearErrors(field) {
        field.classList.remove('border-red-500', 'border-green-500');
        this.clearFieldError(field);
    }

    handleSubmit() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            this.submitForm();
        } else {
            this.showFormError('Please correct the errors above');
        }
    }

    submitForm() {
        // Simulate form submission
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showSuccessMessage();
            this.form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4';
        successDiv.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        
        this.form.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    showFormError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4';
        errorDiv.textContent = message;
        
        this.form.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    setupInteractions() {
        // Add focus animations
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                anime({
                    targets: input,
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });

            input.addEventListener('blur', () => {
                anime({
                    targets: input,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main app
    new PortfolioApp();
    
    // Initialize project cards
    new ProjectCards();
    
    // Initialize achievement tracker
    new AchievementTracker();
    
    // Initialize form validator if contact form exists
    if (document.getElementById('contact-form')) {
        new FormValidator('contact-form');
    }
    
    // Add smooth page transitions
    document.body.style.opacity = '0';
    anime({
        targets: document.body,
        opacity: 1,
        duration: 500,
        easing: 'easeOutCubic'
    });
});

// Export for use in other modules
window.PortfolioApp = PortfolioApp;
window.ProjectCards = ProjectCards;
window.AchievementTracker = AchievementTracker;
window.FormValidator = FormValidator;