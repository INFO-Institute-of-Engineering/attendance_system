document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles in the background
    createParticles();
    
    // Password visibility toggle
    const eyeIcon = document.querySelector('.eye-icon');
    const passwordInput = document.getElementById('password');
    
    if (eyeIcon) {
        eyeIcon.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordInput.type = 'password';
                eyeIcon.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    }
    
    // Form submission handler
    document.getElementById("loginForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        // Show loading state
        const loginBtn = document.querySelector('.login-btn');
        const originalBtnText = loginBtn.innerHTML;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        loginBtn.disabled = true;
        
        // Get form values
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        
        // Validate inputs
        if (!username || !password) {
            showMessage('Please enter both username and password', 'error');
            resetButton();
            return;
        }
        
        try {
            // Send login request to backend
            let response = await fetch("http://localhost:5000/auth/staff/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
            
            let data = await response.json();
            
            if (response.ok) {
                // Login successful
                showMessage('Login successful! Redirecting...', 'success');
                
                // Store auth token if provided
                if (data.token) {
                    localStorage.setItem('staffAuthToken', data.token);
                }
                
                // Redirect to dashboard
                setTimeout(() => window.location.href = '/staff/dashboard', 1000);
            } else {
                // Login failed
                showMessage(data.message || 'Login failed. Please check your credentials.', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showMessage('Connection error. Please try again later.', 'error');
        } finally {
            resetButton();
        }
        
        // Reset button state
        function resetButton() {
            loginBtn.innerHTML = originalBtnText;
            loginBtn.disabled = false;
        }
    });
    
    // Forgot password link handler
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function() {
            // Redirect to password reset page or show modal
            alert('Please contact your administrator to reset your password.');
        });
    }
    
    // Function to show messages to the user
    function showMessage(message, type) {
        // Check if message container exists, if not create one
        let messageContainer = document.querySelector('.message-container');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'message-container';
            document.querySelector('.left-section').prepend(messageContainer);
            
            // Style the message container
            messageContainer.style.width = '100%';
            messageContainer.style.padding = '10px';
            messageContainer.style.borderRadius = '10px';
            messageContainer.style.marginBottom = '20px';
            messageContainer.style.textAlign = 'center';
            messageContainer.style.transition = 'all 0.3s ease';
        }
        
        // Set message and style based on type
        messageContainer.textContent = message;
        
        if (type === 'error') {
            messageContainer.style.backgroundColor = 'rgba(255, 87, 87, 0.2)';
            messageContainer.style.color = '#ffffff';
            messageContainer.style.border = '1px solid rgba(255, 87, 87, 0.5)';
        } else if (type === 'success') {
            messageContainer.style.backgroundColor = 'rgba(87, 255, 87, 0.2)';
            messageContainer.style.color = '#ffffff';
            messageContainer.style.border = '1px solid rgba(87, 255, 87, 0.5)';
        }
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageContainer.style.opacity = '0';
            setTimeout(() => {
                messageContainer.remove();
            }, 300);
        }, 5000);
    }
});

// Function to create floating particles in the background
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
    
    // Add window resize listener to adjust particles
    window.addEventListener('resize', function() {
        clearTimeout(window.particleTimeout);
        window.particleTimeout = setTimeout(createParticles, 300);
    });
}