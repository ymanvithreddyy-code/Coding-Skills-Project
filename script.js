// Auth Check
function checkAuth() {
    const role = localStorage.getItem('srms_role'); // 'admin' or 'student'
    const publicPages = ['index.html', 'admin-login.html', 'student-login.html', '/'];

    const path = window.location.pathname;
    const isPublicPage = publicPages.some(p => path.endsWith(p));

    if (!role && !isPublicPage) {
        window.location.href = 'index.html';
    } else if (role && isPublicPage) {
        if (role === 'admin') window.location.href = 'dashboard.html';
        if (role === 'student') window.location.href = 'student-dashboard.html';
    }
}

// Sidebar Injection
function loadLayout() {
    const role = localStorage.getItem('srms_role');
    const publicPages = ['index.html', 'admin-login.html', 'student-login.html', '/'];
    const path = window.location.pathname;

    if (publicPages.some(p => path.endsWith(p))) return;

    let sidebarHTML = '';
    let topbarHTML = '';

    if (role === 'admin') {
        sidebarHTML = `
            <div class="sidebar-header">
                <div class="brand">
                    <i class="fas fa-graduation-cap"></i> SRMS Admin
                </div>
            </div>
            <nav class="sidebar-nav">
                <a href="dashboard.html" class="nav-item ${path.includes('dashboard') ? 'active' : ''}">
                    <i class="fas fa-home"></i> Dashboard
                </a>
                <a href="students.html" class="nav-item ${path.includes('students') || path.includes('student') && !path.includes('student-') ? 'active' : ''}">
                    <i class="fas fa-user-graduate"></i> Students
                </a>
                <a href="courses.html" class="nav-item ${path.includes('courses') ? 'active' : ''}">
                    <i class="fas fa-book"></i> Courses
                </a>
                <a href="marks.html" class="nav-item ${path.includes('marks') ? 'active' : ''}">
                    <i class="fas fa-chart-bar"></i> Marks
                </a>
                <a href="attendance.html" class="nav-item ${path.includes('attendance') ? 'active' : ''}">
                    <i class="fas fa-calendar-check"></i> Attendance
                </a>
                <a href="admin-requests.html" class="nav-item ${path.includes('requests') ? 'active' : ''}">
                    <i class="fas fa-envelope-open-text"></i> Requests
                </a>
                <a href="settings.html" class="nav-item ${path.includes('settings') ? 'active' : ''}">
                    <i class="fas fa-cog"></i> Settings
                </a>
            </nav>
        `;
        topbarHTML = `
            <div class="page-title" id="pageTitle">Dashboard</div>
            <div class="user-menu">
                <span>Admin User</span>
                <div class="admin-avatar">A</div>
                <button onclick="logout()" class="btn btn-outline btn-sm" style="border: none;">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        `;
    } else if (role === 'student') {
        const studentName = localStorage.getItem('srms_student_name') || 'Student';
        sidebarHTML = `
            <div class="sidebar-header">
                <div class="brand">
                    <i class="fas fa-user-graduate"></i> Student Portal
                </div>
            </div>
            <nav class="sidebar-nav">
                <a href="student-dashboard.html" class="nav-item ${path.includes('dashboard') ? 'active' : ''}">
                    <i class="fas fa-home"></i> Dashboard
                </a>
                <a href="student-profile.html" class="nav-item ${path.includes('profile') ? 'active' : ''}">
                    <i class="fas fa-id-card"></i> My Profile
                </a>
                <a href="student-marks.html" class="nav-item ${path.includes('marks') ? 'active' : ''}">
                    <i class="fas fa-chart-bar"></i> My Marks
                </a>
                <a href="student-attendance.html" class="nav-item ${path.includes('attendance') ? 'active' : ''}">
                    <i class="fas fa-calendar-check"></i> My Attendance
                </a>
                <a href="student-courses.html" class="nav-item ${path.includes('courses') ? 'active' : ''}">
                    <i class="fas fa-book"></i> My Courses
                </a>
                <a href="student-requests.html" class="nav-item ${path.includes('requests') ? 'active' : ''}">
                    <i class="fas fa-paper-plane"></i> Requests
                </a>
            </nav>
        `;
        topbarHTML = `
            <div class="page-title" id="pageTitle">Dashboard</div>
            <div class="user-menu">
                <span>${studentName}</span>
                <div class="admin-avatar" style="background-color: var(--success-color);">${studentName.charAt(0)}</div>
                <button onclick="logout()" class="btn btn-outline btn-sm" style="border: none;">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        `;
    }

    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = sidebarHTML;

    const topbar = document.createElement('header');
    topbar.className = 'topbar';
    topbar.innerHTML = topbarHTML;

    document.body.prepend(topbar);
    document.body.prepend(sidebar);

    // Set Page Title based on active link
    const activeLink = document.querySelector('.nav-item.active');
    if (activeLink) {
        const title = activeLink.textContent.trim();
        document.getElementById('pageTitle').textContent = title;
    }
}

// Logout
function logout() {
    localStorage.removeItem('srms_role');
    localStorage.removeItem('srms_student_id');
    localStorage.removeItem('srms_student_name');
    localStorage.removeItem('srms_admin_logged_in'); // Cleanup old key
    window.location.href = 'index.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadLayout();
});
