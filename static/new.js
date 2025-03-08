// static/js/script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any tooltips
    var tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltips.length > 0) {
        tooltips.forEach(function(tooltip) {
            new bootstrap.Tooltip(tooltip);
        });
    }

    // Add fade-out to alert messages after 5 seconds
    var alerts = document.querySelectorAll('.alert:not(.alert-sticky)');
    if (alerts.length > 0) {
        alerts.forEach(function(alert) {
            setTimeout(function() {
                alert.classList.add('fade');
                setTimeout(function() {
                    alert.remove();
                }, 500);
            }, 5000);
        });
    }

    // Form validation
    var forms = document.querySelectorAll('.needs-validation');
    if (forms.length > 0) {
        Array.from(forms).forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }
});

// Dark mode toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// static/js/attendance.js
document.addEventListener('DOMContentLoaded', function() {
    // Date picker initialization
    const datePicker = document.getElementById('attendance-date');
    if (datePicker) {
        // You can use native date input or initialize a date picker library here
        datePicker.valueAsDate = new Date();
        datePicker.addEventListener('change', function() {
            document.getElementById('date-form').submit();
        });
    }

    // Bulk attendance selection
    const bulkSelectAll = document.getElementById('select-all-students');
    if (bulkSelectAll) {
        bulkSelectAll.addEventListener('change', function() {
            const statusSelects = document.querySelectorAll('.attendance-status');
            statusSelects.forEach(function(select) {
                select.value = bulkSelectAll.value;
            });
        });
    }

    // Confirmation for bulk attendance submission
    const bulkAttendanceForm = document.getElementById('bulk-attendance-form');
    if (bulkAttendanceForm) {
        bulkAttendanceForm.addEventListener('submit', function(event) {
            const isConfirmed = confirm('Are you sure you want to submit attendance for all selected students?');
            if (!isConfirmed) {
                event.preventDefault();
            }
        });
    }
    
    // Attendance statistics chart (if using a chart library)
    const attendanceStatsChart = document.getElementById('attendance-stats-chart');
    if (attendanceStatsChart) {
        // This is a placeholder for chart initialization
        // You would use a library like Chart.js here
        console.log('Chart would be initialized here');
        
        // Example using Chart.js (you would need to include the library)
        /*
        new Chart(attendanceStatsChart, {
            type: 'pie',
            data: {
                labels: ['Present', 'Absent', 'Half Day', 'OD'],
                datasets: [{
                    data: [
                        document.getElementById('present-count').value,
                        document.getElementById('absent-count').value,
                        document.getElementById('halfday-count').value,
                        document.getElementById('od-count').value
                    ],
                    backgroundColor: ['#2ecc71', '#e74c3c', '#f39c12', '#3498db']
                }]
            }
        });
        */
    }
});

// static/js/requests.js
document.addEventListener('DOMContentLoaded', function() {
    // Date range validation for leave requests
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    if (startDateInput && endDateInput) {
        // Set minimum date as today
        const today = new Date().toISOString().split('T')[0];
        startDateInput.min = today;
        
        startDateInput.addEventListener('change', function() {
            // End date must be >= start date
            endDateInput.min = startDateInput.value;
            
            // If end date is already set and is before new start date, reset it
            if (endDateInput.value && endDateInput.value < startDateInput.value) {
                endDateInput.value = startDateInput.value;
            }
        });
        
        // Calculate total days for leave request
        function updateDays() {
            const days = document.getElementById('total-days');
            if (!days) return;
            
            if (startDateInput.value && endDateInput.value) {
                const start = new Date(startDateInput.value);
                const end = new Date(endDateInput.value);
                const diffTime = Math.abs(end - start);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include both start and end days
                
                days.textContent = diffDays;
                document.getElementById('days-count').value = diffDays;
            }
        }
        
        startDateInput.addEventListener('change', updateDays);
        endDateInput.addEventListener('change', updateDays);
    }
    
    // File upload preview for documents
    const fileInput = document.getElementById('document-upload');
    const filePreview = document.getElementById('file-preview');
    
    if (fileInput && filePreview) {
        fileInput.addEventListener('change', function() {
            filePreview.innerHTML = '';
            
            if (this.files && this.files.length > 0) {
                for (let i = 0; i < this.files.length; i++) {
                    const file = this.files[i];
                    const listItem = document.createElement('div');
                    listItem.className = 'file-item';
                    listItem.innerHTML = `
                        <i class="bi bi-file-earmark"></i>
                        <span>${file.name}</span>
                        <small>(${(file.size / 1024).toFixed(2)} KB)</small>
                    `;
                    filePreview.appendChild(listItem);
                }
            }
        });
    }
    
    // Confirmation for request actions
    const actionButtons = document.querySelectorAll('.request-action');
    if (actionButtons.length > 0) {
        actionButtons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                const action = this.dataset.action;
                const requestId = this.dataset.requestId;
                
                let message = '';
                if (action === 'approve') {
                    message = 'Are you sure you want to approve this request?';
                } else if (action === 'reject') {
                    message = 'Are you sure you want to reject this request?';
                }
                
                if (!confirm(message)) {
                    event.preventDefault();
                }
            });
        });
    }
});

// static/js/profile.js
document.addEventListener('DOMContentLoaded', function() {
    // Profile image preview
    const profileImageInput = document.getElementById('profile-image');
    const profileImagePreview = document.getElementById('profile-image-preview');
    
    if (profileImageInput && profileImagePreview) {
        profileImageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    profileImagePreview.src = e.target.result;
                };
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // Password strength meter
    const passwordInput = document.getElementById('new-password');
    const passwordStrength = document.getElementById('password-strength');
    
    if (passwordInput && passwordStrength) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Minimum length check
            if (password.length >= 8) strength += 1;
            
            // Contains lowercase letter
            if (/[a-z]/.test(password)) strength += 1;
            
            // Contains uppercase letter
            if (/[A-Z]/.test(password)) strength += 1;
            
            // Contains number
            if (/[0-9]/.test(password)) strength += 1;
            
            // Contains special character
            if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
            
            // Update strength meter
            passwordStrength.className = 'password-strength';
            
            if (password.length === 0) {
                passwordStrength.textContent = '';
                passwordStrength.className = '';
            } else if (strength < 2) {
                passwordStrength.textContent = 'Weak';
                passwordStrength.classList.add('weak');
            } else if (strength < 4) {
                passwordStrength.textContent = 'Medium';
                passwordStrength.classList.add('medium');
            } else {
                passwordStrength.textContent = 'Strong';
                passwordStrength.classList.add('strong');
            }
        });
    }
    
    // Password confirmation check
    const confirmPasswordInput = document.getElementById('confirm-password');
    const passwordMatch = document.getElementById('password-match');
    
    if (passwordInput && confirmPasswordInput && passwordMatch) {
        function checkPasswordMatch() {
            if (confirmPasswordInput.value === '') {
                passwordMatch.textContent = '';
                passwordMatch.className = '';
                return;
            }
            
            if (passwordInput.value === confirmPasswordInput.value) {
                passwordMatch.textContent = 'Passwords match';
                passwordMatch.className = 'text-success';
            } else {
                passwordMatch.textContent = 'Passwords do not match';
                passwordMatch.className = 'text-danger';
            }
        }
        
        passwordInput.addEventListener('input', checkPasswordMatch);
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    }
});

// static/js/dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    // Student attendance overview (monthly calendar view)
    function generateAttendanceCalendar() {
        const calendarContainer = document.getElementById('attendance-calendar');
        if (!calendarContainer) return;
        
        // Get current month and year
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Create calendar header with month and year
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `<h5>${monthNames[currentMonth]} ${currentYear}</h5>`;
        calendarContainer.appendChild(header);
        
        // Create weekday headers
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const weekdayRow = document.createElement('div');
        weekdayRow.className = 'calendar-weekdays';
        
        weekdays.forEach(weekday => {
            const weekdayCell = document.createElement('div');
            weekdayCell.className = 'weekday';
            weekdayCell.textContent = weekday;
            weekdayRow.appendChild(weekdayCell);
        });
        
        calendarContainer.appendChild(weekdayRow);
        
        // Create calendar days
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid';
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Get attendance data from the hidden input (JSON format)
        const attendanceData = JSON.parse(document.getElementById('attendance-data').value || '{}');
        
        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            
            // Check if we have attendance data for this day
            const dateKey = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            
            if (attendanceData[dateKey]) {
                const status = attendanceData[dateKey];
                dayCell.classList.add(status.toLowerCase());
                
                // Add tooltip with status
                dayCell.setAttribute('data-bs-toggle', 'tooltip');
                dayCell.setAttribute('data-bs-placement', 'top');
                dayCell.setAttribute('title', status);
            }
            
            calendarGrid.appendChild(dayCell);
        }
        
        calendarContainer.appendChild(calendarGrid);
        
        // Initialize tooltips
        var tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        if (tooltips.length > 0) {
            tooltips.forEach(function(tooltip) {
                new bootstrap.Tooltip(tooltip);
            });
        }
    }
    
    // Call function to generate calendar
    generateAttendanceCalendar();
    
    // Staff dashboard statistics
    function updateDashboardStats() {
        const dashboardStats = document.getElementById('dashboard-stats');
        if (!dashboardStats) return;
        
        // This would typically be populated from server-side data
        // Here we're just showing the structure
        
        // Example: Update count animations
        const statCounters = document.querySelectorAll('.stats-number');
        statCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 1000; // ms
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                counter.textContent = Math.floor(current);
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }
    
    // Call function to update dashboard stats
    updateDashboardStats();
});