const courseset = document.getElementById("coursebtns");
let select = document.getElementById("dynamicDropdown");
let courselist = [];

function genCourseBtns() {
    if (!courseset) return;
    courseset.innerHTML = ""; // clear old buttons

    const allCourses = new Set();
    sessions.forEach(entry => allCourses.add(entry.course));

    createCourse("All Courses");
    allCourses.forEach(course => createCourse(course));
}

function createCourse(coursename) {
    if (!courseset) return;

    const cbtn = document.createElement("button");
    cbtn.textContent = coursename;
    cbtn.classList.add("course-tag");

    cbtn.addEventListener("click", () => {
        if (coursename === "All Courses") {
            displayEntries(sessions);
        } else {
            const filtered = sessions.filter(entry => entry.course === coursename);
            displayEntries(filtered);
        }
    });

    courselist.push(coursename);
    courseset.appendChild(cbtn);
    
    updateDropdown();
}


function updateDropdown(set) {

  // Clear existing options to prevent duplicates
    select.innerHTML = '<option disabled selected>bro an option</option>';

    if (set!=null){
        for (let i = 0; i<set.length; i++){
            let el = document.createElement("option"); 
            el.textContent = "hullo"; // Set visible text
            el.value = "pls work";       // Set value for form submission
            select.appendChild(el);
        };
    }


  // Loop through the array and append new options
    // if (set){
    //     set.forEach(course => {// Create <option> element
    //         el.textContent = "pls bro"; // Set visible text
    //         el.value = "pls work";       // Set value for form submission
    //         select.appendChild(el); // Add to the dropdown
    // });
    // }
}

// Call the function whenever the array changes
genCourseBtns();
