// Data Initialization
const INITIAL_DATA = {
    students: [
        { id: '1', rollNo: 'CS101', name: 'John Doe', email: 'john@example.com', course: 'Computer Science', year: '3rd', gender: 'Male', phone: '1234567890', password: '12345' },
        { id: '2', rollNo: 'CS102', name: 'Jane Smith', email: 'jane@example.com', course: 'Computer Science', year: '2nd', gender: 'Female', phone: '0987654321', password: '12345' },
        { id: '3', rollNo: 'EE101', name: 'Mike Ross', email: 'mike@example.com', course: 'Electrical Eng', year: '4th', gender: 'Male', phone: '1122334455', password: '12345' },
        { id: '4', rollNo: 'ME101', name: 'Sarah Connor', email: 'sarah@example.com', course: 'Mechanical Eng', year: '1st', gender: 'Female', phone: '5566778899', password: '12345' },
        { id: '5', rollNo: 'CS103', name: 'David Kim', email: 'david@example.com', course: 'Computer Science', year: '3rd', gender: 'Male', phone: '6677889900', password: '12345' },
    ],
    courses: [
        { id: '1', name: 'Computer Science', code: 'CS', duration: '4 Years' },
        { id: '2', name: 'Electrical Engineering', code: 'EE', duration: '4 Years' },
        { id: '3', name: 'Mechanical Engineering', code: 'ME', duration: '4 Years' },
        { id: '4', name: 'Civil Engineering', code: 'CE', duration: '4 Years' },
    ],
    attendance: [
        { date: '2023-10-01', present: 45, absent: 5 },
        { date: '2023-10-02', present: 48, absent: 2 },
        { date: '2023-10-03', present: 47, absent: 3 },
        { date: '2023-10-04', present: 44, absent: 6 },
        { date: '2023-10-05', present: 49, absent: 1 },
    ],
    requests: [
        { id: '101', studentId: '1', type: 'Correction', description: 'My name is spelled wrong.', status: 'Pending', date: '2023-10-06' },
        { id: '102', studentId: '2', type: 'Complaint', description: 'Fan not working in classroom.', status: 'Resolved', date: '2023-10-05' }
    ]
};

// Initialize Data
function initData() {
    // Check if students exist
    let storedStudents = localStorage.getItem('srms_students');

    if (!storedStudents) {
        localStorage.setItem('srms_students', JSON.stringify(INITIAL_DATA.students));
    } else {
        // MIGRATION FIX: Check if stored students have passwords
        const parsedStudents = JSON.parse(storedStudents);
        if (parsedStudents.length > 0 && !parsedStudents[0].password) {
            console.log('Migrating data: Adding default passwords to students');
            localStorage.setItem('srms_students', JSON.stringify(INITIAL_DATA.students));
        }
    }

    if (!localStorage.getItem('srms_courses')) {
        localStorage.setItem('srms_courses', JSON.stringify(INITIAL_DATA.courses));
    }
    if (!localStorage.getItem('srms_attendance')) {
        localStorage.setItem('srms_attendance', JSON.stringify(INITIAL_DATA.attendance));
    }
    if (!localStorage.getItem('srms_requests')) {
        localStorage.setItem('srms_requests', JSON.stringify(INITIAL_DATA.requests));
    }
}

// Data Helpers
const DataManager = {
    getStudents: () => JSON.parse(localStorage.getItem('srms_students') || '[]'),
    saveStudents: (students) => localStorage.setItem('srms_students', JSON.stringify(students)),

    getCourses: () => JSON.parse(localStorage.getItem('srms_courses') || '[]'),
    saveCourses: (courses) => localStorage.setItem('srms_courses', JSON.stringify(courses)),

    getAttendance: () => JSON.parse(localStorage.getItem('srms_attendance') || '[]'),

    getRequests: () => JSON.parse(localStorage.getItem('srms_requests') || '[]'),
    saveRequests: (requests) => localStorage.setItem('srms_requests', JSON.stringify(requests)),

    addStudent: (student) => {
        const students = DataManager.getStudents();
        students.push({ ...student, id: Date.now().toString(), password: '12345' });
        DataManager.saveStudents(students);
    },

    updateStudent: (id, updatedData) => {
        const students = DataManager.getStudents();
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = { ...students[index], ...updatedData };
            DataManager.saveStudents(students);
        }
    },

    deleteStudent: (id) => {
        const students = DataManager.getStudents();
        const filtered = students.filter(s => s.id !== id);
        DataManager.saveStudents(filtered);
    },

    getStudentById: (id) => {
        const students = DataManager.getStudents();
        return students.find(s => s.id === id);
    },

    getStudentByRollNo: (rollNo) => {
        const students = DataManager.getStudents();
        return students.find(s => s.rollNo === rollNo);
    },

    addRequest: (request) => {
        const requests = DataManager.getRequests();
        requests.push({ ...request, id: Date.now().toString(), status: 'Pending', date: new Date().toISOString().split('T')[0] });
        DataManager.saveRequests(requests);
    },

    updateRequestStatus: (id, status) => {
        const requests = DataManager.getRequests();
        const index = requests.findIndex(r => r.id === id);
        if (index !== -1) {
            requests[index].status = status;
            DataManager.saveRequests(requests);
        }
    },

    deleteRequest: (id) => {
        const requests = DataManager.getRequests();
        const filtered = requests.filter(r => r.id !== id);
        DataManager.saveRequests(filtered);
    }
};

// Run initialization
initData();
