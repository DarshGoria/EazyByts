$(document).ready(function() {
    let courses = {};

    $('#openCourseModalBtn').on('click', function() {
        $('#courseModal').modal('show');
    });

    $('#addCourseBtn').on('click', function() {
        const courseName = $('#courseName').val().trim();
        const courseId = $('#courseId').val().trim();

        if (courseName && courseId) {
            addCourse(courseName, courseId);
            $('#courseName').val('');
            $('#courseId').val('');
            $('#courseModal').modal('hide');
        } else {
            alert('Please enter both course name and course ID.');
        }
    });

    function addCourse(courseName, courseId) {
        courses[courseId] = [];

        const courseCard = `
            <div class="col-md-4">
                <div class="course-card">
                    <h3>${courseName} (${courseId})</h3>
                    <p id="student-count-${courseId}">Students enrolled: 0</p>
                    <button class="btn btn-primary upload-btn" onclick="uploadMaterial('${courseId}')">Upload Material</button>
                    <button class="btn btn-warning student-btn" onclick="openStudentModal('${courseId}')">Manage Students</button>
                    <button class="btn btn-info view-students-btn" onclick="viewStudents('${courseId}')">View Students</button>
                </div>
            </div>
        `;
        $('#courseGrid').append(courseCard);
    }

    window.uploadMaterial = function(courseId) {
        alert(`Upload material for Course ${courseId}`);
    }

    window.openStudentModal = function(courseId) {
        $('#studentModal').modal('show');
        $('#studentList').html('');
        $('#addStudentBtn').off().on('click', function() {
            const studentName = $('#studentName').val().trim();
            const studentId = $('#studentId').val().trim();
            const studentPhone = $('#studentPhone').val().trim();

            if (studentName && studentId && studentPhone) {
                const student = { name: studentName, id: studentId, phone: studentPhone };
                courses[courseId].push(student);
                updateStudentList(courseId);
                updateStudentCount(courseId, 1);
                $('#studentName').val('');
                $('#studentId').val('');
                $('#studentPhone').val('');
            }
        });
        updateStudentList(courseId);
    }

    function updateStudentList(courseId) {
        const studentList = $('#studentList');
        studentList.html('');
        courses[courseId].forEach((student, index) => {
            const studentItem = `
                <div class="alert alert-secondary student-item" role="alert" data-index="${index}">
                    ${student.name} (ID: ${student.id}, Phone: ${student.phone})
                    <button type="button" class="close remove-student-btn" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `;
            studentList.append(studentItem);
        });

        $('.remove-student-btn').on('click', function() {
            const index = $(this).parent().data('index');
            courses[courseId].splice(index, 1);
            updateStudentList(courseId);
            updateStudentCount(courseId, -1);
        });
    }

    function updateStudentCount(courseId, delta) {
        const studentCountElement = $(`#student-count-${courseId}`);
        let studentCount = parseInt(studentCountElement.text().replace('Students enrolled: ', ''));
        studentCount += delta;
        studentCountElement.text(`Students enrolled: ${studentCount}`);
    }

    window.viewStudents = function(courseId) {
        $('#studentModal').modal('show');
        updateStudentList(courseId);
    }
});
