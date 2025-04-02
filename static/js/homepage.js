document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles in the background
    createParticles();
    
    // Add hover effects to portal cards
    const portalCards = document.querySelectorAll('.portal-card');
    portalCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add touch effects for mobile
    portalCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        }, {passive: true});
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'translateY(0)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }, {passive: true});
    });
    
    // Adjust particle count based on screen size
    window.addEventListener('resize', adjustParticlesForScreenSize);
    adjustParticlesForScreenSize();
});

function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Determine particle count based on screen size
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 25 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size (smaller on mobile)
        const size = isMobile ? 
            (Math.random() * 5 + 3) : 
            (Math.random() * 10 + 5);
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            pointer-events: none;
            animation: float ${duration}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

function adjustParticlesForScreenSize() {
    // Recreate particles when screen size changes
    const isMobile = window.innerWidth <= 768;
    const particlesContainer = document.querySelector('.particles');
    
    if (particlesContainer) {
        if (isMobile) {
            particlesContainer.style.opacity = '0.5';
        } else {
            particlesContainer.style.opacity = '1';
        }
        
        // Debounce the particle recreation
        clearTimeout(window.particleTimeout);
        window.particleTimeout = setTimeout(createParticles, 300);
    }
}

function redirectToStudentPortal() {
    window.location.href = "/templates/student/student-login.html";
}

function redirectToStaffPortal() {
    window.location.href = "/templates/staff-login.html"; 
}