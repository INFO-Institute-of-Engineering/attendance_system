// Password visibility toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const eyeIcon = document.querySelector('.eye-icon');
    const passwordInput = document.getElementById('password');
    
    // Toggle password visibility when eye icon is clicked
    if (eyeIcon) {
        eyeIcon.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.innerHTML = '&#128064;'; // Open eye
            } else {
                passwordInput.type = 'password';
                eyeIcon.innerHTML = '&#128065;'; // Closed eye
            }
        });
    }
    
    // Form submission handler
    document.getElementById("loginForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        // Show loading state
        const loginBtn = document.querySelector('.login-btn');
        const originalBtnText = loginBtn.textContent;
        loginBtn.textContent = 'Logging in...';
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
            let response = await fetch("http://localhost:5000/auth/login", {
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
                    localStorage.setItem('authToken', data.token);
                }
                
                // Redirect based on user role if provided
                if (data.role === 'student') {
                    setTimeout(() => window.location.href = '/student/dashboard', 1000);
                } else if (data.role === 'staff') {
                    setTimeout(() => window.location.href = '/staff/dashboard', 1000);
                } else {
                    setTimeout(() => window.location.href = '/dashboard', 1000);
                }
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
            loginBtn.textContent = originalBtnText;
            loginBtn.disabled = false;
        }
    });
    
    // Forgot password link handler
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function() {
            // Redirect to password reset page or show modal
            alert('Please contact your administrator to reset your password.');
            // Alternative: window.location.href = '/reset-password';
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
            messageContainer.style.borderRadius = '5px';
            messageContainer.style.marginBottom = '20px';
            messageContainer.style.textAlign = 'center';
            messageContainer.style.transition = 'all 0.3s ease';
        }
        
        // Set message and style based on type
        messageContainer.textContent = message;
        
        if (type === 'error') {
            messageContainer.style.backgroundColor = 'rgba(255, 87, 87, 0.2)';
            messageContainer.style.color = '#ff5757';
            messageContainer.style.border = '1px solid #ff5757';
        } else if (type === 'success') {
            messageContainer.style.backgroundColor = 'rgba(87, 255, 87, 0.2)';
            messageContainer.style.color = '#57ff57';
            messageContainer.style.border = '1px solid #57ff57';
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