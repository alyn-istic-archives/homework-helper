const courseset = document.getElementById("coursebtns");

function genCourseBtns() {
    if (!courseset) return;
    courseset.innerHTML = ""; // clear old buttons

    const allCourses = new Set();
    sessions.forEach(entry => allCourses.add(entry.course));

    createCourse("All");
    allCourses.forEach(course => createCourse(course));
}

function createCourse(coursename) {
    if (!courseset) return;

    const cbtn = document.createElement("button");
    cbtn.textContent = coursename;
    cbtn.classList.add("course-tag");

    cbtn.addEventListener("click", () => {
        if (coursename === "All") {
            displayEntries(sessions);
        } else {
            const filtered = sessions.filter(entry => entry.course === coursename);
            displayEntries(filtered);
        }
    });

    courseset.appendChild(cbtn);
}

genCourseBtns();
