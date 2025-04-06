document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles in the background
    createParticles();
    
    // File upload handling
    const fileInput = document.getElementById('attachment');
    const fileName = document.querySelector('.file-name');
    
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                fileName.textContent = fileInput.files[0].name;
            } else {
                fileName.textContent = 'No file chosen';
            }
        });
    }
    
    // Date validation
    const fromTimeInput = document.getElementById('fromTime');
    const toTimeInput = document.getElementById('toTime');
    
    if (fromTimeInput && toTimeInput) {
        // Set minimum time as today
        const today = new Time().toISOString().split('T')[0];
        fromTimeInput.setAttribute('min', today);
        
        // Update to-time min value when from-date changes
        fromTimeInput.addEventListener('change', function() {
            toTimeInput.setAttribute('min', fromTimeInput.value);
            
            // If to-time is earlier than from-date, reset it
            if (toTimeInput.value && toTimeInput.value < fromTimeInput.value) {
                toTimeInput.value = fromTimeInput.value;
            }
        });
    }
    
    // Form submission
    const leaveRequestForm = document.getElementById('leaveRequestForm');
    
    if (leaveRequestForm) {
        leaveRequestForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitBtn = document.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            // Get form values
            const leaveType = document.getElementById('leaveType').value;
            const fromDate = document.getElementById('fromDate').value;
            const toDate = document.getElementById('toDate').value;
            const reason = document.getElementById('reason').value;
            const contactNumber = document.getElementById('contactNumber').value;
            
            // Create form data for file upload
            const formData = new FormData();
            formData.append('leaveType', leaveType);
            formData.append('fromDate', fromDate);
            formData.append('toDate', toDate);
            formData.append('reason', reason);
            formData.append('contactNumber', contactNumber);
            
            if (fileInput.files.length > 0) {
                formData.append('attachment', fileInput.files[0]);
            }
            
            try {
                // For demo purposes, simulate API call with timeout
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // In a real application, you would send the data to your backend
                // const response = await fetch('/api/student/leave-request', {
                //     method: 'POST',
                //     body: formData
                // });
                
                // const data = await response.json();
                
                // if (response.ok) {
                //     showNotification('Leave request submitted successfully!', 'success');
                //     leaveRequestForm.reset();
                //     fileName.textContent = 'No file chosen';
                // } else {
                //     showNotification(data.message || 'Failed to submit leave request.', 'error');
                // }
                
                // For demo, always show success
                showNotification('Leave request submitted successfully!', 'success');
                leaveRequestForm.reset();
                fileName.textContent = 'No file chosen';
                
                // Update the timeline to show the request as submitted
                updateTimeline();
                
            } catch (error) {
                console.error('Error submitting leave request:', error);
                showNotification('Connection error. Please try again later.', 'error');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Add active class to current nav item
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Remove active class from all links
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
        });
    });
    
    // Notification bell click handler
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', function() {
            alert('Notifications feature coming soon!');
        });
    }
    
    // Logout functionality
    const logoutButton = document.querySelector('.logout a');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('Are you sure you want to logout?')) {
                // Clear any stored tokens
                localStorage.removeItem('authToken');
                
                // Redirect to login page
                window.location.href = '/templates/student/student-login.html';
            }
        });
    }
    
    // Check authentication
    checkAuth();
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

// Function to show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create notification content
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        </div>
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <div class="notification-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    // Add notification to the DOM
    const notificationsContainer = document.querySelector('.notifications-container');
    if (!notificationsContainer) {
        const container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);
        container.appendChild(notification);
    } else {
        notificationsContainer.appendChild(notification);
    }
    
    // Style the notification
    notification.style.cssText = `
        display: flex;
        align-items: center;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 82, 82, 0.9)'};
        color: white;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        position: relative;
        max-width: 350px;
    `;
    
    // Style notification container if it was just created
    const container = document.querySelector('.notifications-container');
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        max-width: 350px;
    `;
    
    // Style notification parts
    notification.querySelector('.notification-icon').style.cssText = `
        margin-right: 15px;
        font-size: 1.5rem;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        flex: 1;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        cursor: pointer;
        margin-left: 15px;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    `;
    
    notification.querySelector('.notification-close').addEventListener('mouseover', function() {
        this.style.opacity = '1';
    });
    
    notification.querySelector('.notification-close').addEventListener('mouseout', function() {
        this.style.opacity = '0.7';
    });
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // Show notification with animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Function to close notification
    function closeNotification(notif) {
        notif.style.transform = 'translateX(120%)';
        setTimeout(() => {
            notif.remove();
            
            // Remove container if empty
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    }
}

// Function to update timeline
function updateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Reset all items to pending
    timelineItems.forEach(item => {
        item.classList.remove('active');
        item.classList.add('pending');
    });
    
    // Set first item (Request Submitted) to active
    if (timelineItems.length > 0) {
        timelineItems[0].classList.remove('pending');
        timelineItems[0].classList.add('active');
        
        // Update date to current date and time
        const dateElement = timelineItems[0].querySelector('.timeline-date');
        if (dateElement) {
            const now = new Date();
            const formattedDate = `${now.toLocaleDateString()} - ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
            dateElement.textContent = formattedDate;
        }
    }
    
    // Add new request to history
    addToHistory();
}

// Function to add new request to history
function addToHistory() {
    const historyContainer = document.querySelector('.request-history');
    if (!historyContainer) return;
    
    // Get form values
    const leaveType = document.getElementById('leaveType').value;
    const fromDate = new Date(document.getElementById('fromDate').value);
    const toDate = new Date(document.getElementById('toDate').value);
    
    // Format dates
    const fromFormatted = fromDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const toFormatted = toDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Create new history item
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    // Get month and day
    const month = fromDate.toLocaleDateString('en-US', { month: 'short' });
    const day = fromDate.getDate();
    
    historyItem.innerHTML = `
        <div class="history-date">
            <span class="month">${month}</span>
            <span class="day">${day}</span>
        </div>
        <div class="history-details">
            <h4>${leaveType}</h4>
            <p>${fromFormatted} - ${toFormatted}</p>
            <span class="status pending">Pending</span>
        </div>
    `;
    
    // Add to history container (at the beginning)
    if (historyContainer.firstChild) {
        historyContainer.insertBefore(historyItem, historyContainer.firstChild);
    } else {
        historyContainer.appendChild(historyItem);
    }
}

// Function to check authentication
function checkAuth() {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
        // Redirect to login page
        window.location.href = '/templates/student/student-login.html';
        return;
    }
    
    // In a real application, you would validate the token with your backend
    // For demo purposes, we'll just assume it's valid
    
    // Load student data
    loadStudentData();
}

// Function to load student data
function loadStudentData() {
    // In a real application, you would fetch this data from your backend
    // For demo purposes, we'll use mock data
    
    const studentData = {
        name: 'John Doe',
        id: 'CSE2023001',
        leaveRequests: [
            {
                type: 'Medical Leave',
                fromDate: '2023-04-10',
                toDate: '2023-04-12',
                status: 'approved'
            },
            {
                type: 'Personal Leave',
                fromDate: '2023-03-22',
                toDate: '2023-03-23',
                status: 'rejected'
            }
        ]
    };
    
    // Update UI with student data
    updateStudentUI(studentData);
}

// Function to update UI with student data
function updateStudentUI(data) {
    // Update name
    document.querySelectorAll('.student-name').forEach(el => {
        el.textContent = data.name;
    });
    
    // Update ID
    document.querySelectorAll('.student-id').forEach(el => {
        el.textContent = data.id;
    });
    
    // Update leave history (if needed)
    // This would be more complex in a real application
}