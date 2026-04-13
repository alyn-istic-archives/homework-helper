const courseset = document.getElementById("coursebtns");
let courselist = [];

function genCourseBtns() {
    if (!courseset) return;
    courseset.innerHTML = "";
    courselist = [];

    const allCourses = new Set();
    sessions.forEach(entry => allCourses.add(entry.course));

    // add "All Courses" option
    const defaultOpt = document.createElement("option");
    defaultOpt.value = "all";
    defaultOpt.textContent = "All Courses";
    courseset.appendChild(defaultOpt);

    // add one option per course
    allCourses.forEach(course => {
        const opt = document.createElement("option");
        opt.value = course;
        opt.textContent = course;
        courseset.appendChild(opt);
        courselist.push(course);
    });
}

// listen for changes
if (courseset) {
    courseset.addEventListener("change", () => {
        const selected = courseset.value;
        if (selected === "all") {
            displayEntries(sessions);
        } else {
            const filtered = sessions.filter(entry => entry.course === selected);
            displayEntries(filtered);
        }
    });
}

genCourseBtns();

// const courseset = document.getElementById("coursebtns");
// let select = document.getElementById("dynamicDropdown");
// let courselist = [];

// function genCourseBtns() {
//     if (!courseset) return;
//     courseset.innerHTML = ""; // clear old buttons

//     const allCourses = new Set();
//     sessions.forEach(entry => allCourses.add(entry.course));

//     createCourse("All Courses");
//     allCourses.forEach(course => createCourse(course));
// }

// function createCourse(coursename) {
//     if (!courseset) return;

//     const cbtn = document.createElement("button");
//     cbtn.textContent = coursename;
//     cbtn.classList.add("course-tag");

//     cbtn.addEventListener("click", () => {
//         if (coursename === "All Courses") {
//             displayEntries(sessions);
//         } else {
//             const filtered = sessions.filter(entry => entry.course === coursename);
//             displayEntries(filtered);
//         }
//     });

//     courselist.push(coursename);
//     courseset.appendChild(cbtn);
    
// }



// // Call the function whenever the array changes
// genCourseBtns();
