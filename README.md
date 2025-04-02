# INFO's Attendance Management System

## Overview
A modern, efficient attendance tracking system built using face recognition technology. This system enables automated attendance tracking for classrooms, meetings, and events. This project is a collaboration between the INFO Institute of Engineering organization and the CSE Department of INFO Institute of Engineering.

## Features
- **Face Recognition-Based Attendance**: Automatically mark attendance by detecting and recognizing faces
- **Real-time Processing**: Process attendance data instantly
- **User-friendly Interface**: Simple and intuitive web interface
- **Multiple Authentication Methods**: Support for PIN.
- **Detailed Reports**: Generate comprehensive attendance reports
- **Database Integration**: Secure storage of attendance records

## Technology Stack
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Python
- **Database**: MongoDB Atlas
- **Web Server**: Apache

## Installation

### Prerequisites
- Python 3.8 or higher
- MongoDB Atlas account
- Apache web server
- OpenCV libraries

### Setup Instructions
1. **Clone the repository**
   ```
   git clone https://github.com/INFO-Institute-of-Engineering/attendance_system.git
   cd attendance_system
   ```

2. **Database Configuration**
   - Create a MongoDB Atlas cluster
   - Configure connection string in the application settings
   - Import initial data if needed

3. **Python Environment Setup**
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Application Setup**
   - Configure environment variables or settings files
   - Set up proper permissions for file uploads and logs directories

## Usage

### Admin Portal
1. Access the admin panel at `http://your-server/admin`
2. Default credentials: Username: `admin`, Password: `admin123` (change immediately)
3. Use the admin panel to:
   - Manage students/employees
   - View attendance reports
   - Configure system settings

### Student/Employee Registration
1. Navigate to the registration page
2. Complete the form with required details
3. Upload a clear facial image for recognition

### Taking Attendance
1. Launch the attendance module
2. The system will automatically detect and recognize faces
3. Attendance is marked in real-time and stored in the database

## Project Structure
```
attendance_system/
├── admin/             # Admin panel files
├── assets/            # CSS, JS, and image files
├── database/          # Database configuration and models
├── utils/             # Utility functions
├── models/            # Data models and ML models
├── uploads/           # User uploaded files
├── venv/              # Python virtual environment
├── app.py             # Main application entry point
├── config.py          # Configuration settings
└── README.md          # Project documentation
```

## Contributing
We welcome contributions to improve the Attendance System!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- INFO Institute of Engineering organization for initiating this project
- CSE Department of INFO Institute of Engineering for their collaboration and expertise
- OpenCV community for face recognition tools
- All contributors who have helped build and improve this system
