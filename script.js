// Smooth scroll to section
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}



// Create animated particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.prepend(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// Typing effect for tagline
function typeEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;

    const texts = [
        'Student | AI, ML & Cybersecurity Enthusiast',
        'Building Secure Digital Solutions 🔒',
        'Passionate About Ethical Hacking 💻',
        'Learning & Growing Every Day 🚀'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            tagline.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            tagline.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

// Scroll reveal animation
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');

                // Animate skill bars when skills section is visible
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }

                // Stagger animation for children
                const children = entry.target.querySelectorAll('.project-card, .about-card, .leadership-card, .contact-item, .skill-category');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .section.revealed { opacity: 1 !important; transform: translateY(0) !important; }
        .animate-in { animation: fadeSlideIn 0.6s ease-out forwards; }
        @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Animate skill progress bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = width;
        }, index * 100);
    });
}

// Navbar scroll effect
function initNavbarEffect() {
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(17, 24, 39, 0.98)';
            nav.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
            nav.style.padding = '10px 40px';
        } else {
            nav.style.background = 'rgba(17, 24, 39, 0.95)';
            nav.style.boxShadow = 'none';
            nav.style.padding = '15px 40px';
        }
    });
}

// Active nav link highlight
function initActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        nav ul li a.active { color: #8b5cf6; background: rgba(139, 92, 246, 0.1); }
        nav ul li a::after {
            content: ''; position: absolute; bottom: 0; left: 50%; width: 0; height: 2px;
            background: linear-gradient(90deg, #8b5cf6, #a78bfa); transition: all 0.3s ease; transform: translateX(-50%);
        }
        nav ul li a:hover::after, nav ul li a.active::after { width: 80%; }
    `;
    document.head.appendChild(style);
}

// Card 3D tilt effect
function initCardTilt() {
    const cards = document.querySelectorAll('.project-card, .about-card, .leadership-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${-rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// Magnetic button effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Text scramble effect
function scrambleText(element) {
    const originalText = element.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
    let iteration = 0;

    const interval = setInterval(() => {
        element.textContent = originalText.split('')
            .map((char, index) => {
                if (index < iteration) return originalText[index];
                if (char === ' ') return ' ';
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');

        if (iteration >= originalText.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
}

// Form submission handler
function initFormHandler() {
    const form = document.querySelector('.contact-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const button = form.querySelector('button[type="submit"]');
            const originalContent = button.innerHTML;

            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            button.disabled = true;

            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Sent!';
                button.style.background = 'linear-gradient(135deg, #8b5cf6, #a78bfa)';

                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

                setTimeout(() => {
                    form.reset();
                    button.innerHTML = originalContent;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i><span>${message}</span>`;

    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #8b5cf6, #a78bfa)' : 'rgba(139, 92, 246, 0.9)'};
        color: #f9fafb; padding: 15px 25px; border-radius: 15px;
        display: flex; align-items: center; gap: 10px; font-weight: 600;
        z-index: 10000; animation: slideInRight 0.5s ease-out;
        box-shadow: 0 10px 40px rgba(139, 92, 246, 0.3);
    `;

    document.body.appendChild(notification);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.5s ease-out reverse forwards';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Parallax effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.home');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = Math.max(0, 1 - scrolled / 600);
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function () {

    createParticles();
    typeEffect();
    initScrollReveal();
    initNavbarEffect();
    initActiveNavLink();
    initCardTilt();
    initMagneticButtons();
    initFormHandler();
    initSmoothScroll();
    initParallax();

    // Mobile nav toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu when a nav link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    console.log('🛡️ Portfolio loaded with animations!');
});

