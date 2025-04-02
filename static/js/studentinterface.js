document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles in the background
    createParticles();
    
    // Add active class to current nav item
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
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
    
    // Quick action cards click handler
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const actionType = this.querySelector('h3').textContent.trim();
            
            switch(actionType) {
                case 'Apply Leave':
                    window.location.href = '/student/leave-application';
                    break;
                case 'Request OD':
                    window.location.href = '/student/od-request';
                    break;
                case 'Half-Day':
                    window.location.href = '/student/half-day-request';
                    break;
                case 'Download Report':
                    generateAttendanceReport();
                    break;
                default:
                    alert('This feature is coming soon!');
            }
        });
    });
    
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
    
    // Fetch student data
    fetchStudentData();
    
    // Add hover effects to cards
    addCardHoverEffects();
    
    // Adjust UI based on screen size
    adjustUIForScreenSize();
    window.addEventListener('resize', adjustUIForScreenSize);
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
}

// Function to fetch student data from the server
async function fetchStudentData() {
    try {
        // Get auth token from localStorage
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            // Redirect to login if no token
            window.location.href = '/templates/student/student-login.html';
            return;
        }
        
        // Simulate API call (replace with actual API endpoint)
        // const response = await fetch('/api/student/data', {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // });
        
        // const data = await response.json();
        
        // For demo purposes, using mock data
        const data = {
            name: 'John Doe',
            id: 'CSE2023001',
            attendance: {
                present: 30,
                absent: 3,
                od: 25,
                percentage: 85
            },
            courses: [
                {
                    name: 'Computer Science and Engineering',
                    department: 'CSE Department',
                    attendance: 85
                },
                {
                    name: 'Database Management Systems',
                    department: 'CSE Department',
                    attendance: 92
                }
            ],
            notices: [
                {
                    type: 'alert',
                    title: 'Attendance Alert',
                    message: 'Your attendance is below 75% in Advanced Programming.',
                    time: '2 hours ago'
                },
                {
                    type: 'info',
                    title: 'Exam Schedule',
                    message: 'Mid-semester exams will begin from next Monday.',
                    time: '1 day ago'
                },
                {
                    type: 'success',
                    title: 'OD Approved',
                    message: 'Your On-Duty request for the workshop has been approved.',
                    time: '2 days ago'
                }
            ]
        };
        
        // Update UI with student data
        updateStudentUI(data);
        
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
}

// Function to update UI with student data
function updateStudentUI(data) {
    // Update name
    document.querySelectorAll('.student-name').forEach(el => {
        el.textContent = data.name;
    });
    
    document.querySelector('.student-name-header').textContent = data.name.split(' ')[0] + '!';
    
    // Update ID
    document.querySelector('.student-id').textContent = data.id;
    
    // Update attendance stats
    const statsElements = document.querySelectorAll('.stat-details h3');
    if (statsElements.length >= 4) {
        statsElements[0].textContent = `${data.attendance.present} Days`;
        statsElements[1].textContent = `${data.attendance.absent} Days`;
        statsElements[2].textContent = `${data.attendance.od} Days`;
        statsElements[3].textContent = `${data.attendance.percentage}%`;
    }
    
    // Update courses (if needed)
    // This would be more complex in a real application
    
    // Update notices (if needed)
    // This would be more complex in a real application
}

// Function to generate attendance report
function generateAttendanceReport() {
    alert('Generating attendance report... This feature will be available soon!');
    // In a real application, this would make an API call to generate a report
}

// Function to add hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.stat-card, .course-card, .notice-card, .action-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Function to adjust UI based on screen size
function adjustUIForScreenSize() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (window.innerWidth <= 992) {
        sidebar.classList.add('collapsed');
        mainContent.style.marginLeft = '80px';
    } else {
        sidebar.classList.remove('collapsed');
        mainContent.style.marginLeft = '280px';
    }
    
    // Adjust particles for screen size
    createParticles();
}