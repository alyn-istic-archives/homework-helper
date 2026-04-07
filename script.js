const n_session_btn = document.getElementById("new-session");
const c_session_btn = document.getElementById("close-session");
const s_session_btn = document.getElementById("submit-session");
const u_session_btn = document.getElementById("update");

const nav_btn = document.getElementById("nav-btn");

if (nav_btn){
    showItem(nav_btn, true);
}
let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

const sidebar = document.querySelector(".sidebar");
const content = document.querySelector(".content");
const timercontainer = document.querySelector(".timercontainer");

const form = document.getElementById("session-form");
const output = document.getElementById("session-output");


//event listeners for new session, close session, and submit session buttons
if (n_session_btn){
    n_session_btn.addEventListener("click", function() {
        showSessionPopup(true);
    });
}
if (c_session_btn){
    c_session_btn.addEventListener("click", function() {
        showSessionPopup(false);
    });
}
if (s_session_btn){
    s_session_btn.addEventListener("click", function(event) {
        event.preventDefault();
        showSessionPopup(false);
        uploadSession();
    });
}

if (nav_btn){
    nav_btn.addEventListener("click", function() {
        if (!nav_btn.classList.contains("show")){
            if (timercontainer){
                showItem(timercontainer, false);
            }
            if (content){
                showItem(content, false);
            }if (sidebar){
                showItem(sidebar, false);
            }
            if (nav_btn){
                showItem(nav_btn, true);
            }
        }
        else{
            if (timercontainer){
                showItem(timercontainer, true);
            }
            if (content){
                showItem(content, true);
            }if (sidebar){
                showItem(sidebar, true);
            }
            if (nav_btn){
                showItem(nav_btn, false);
            }
        }
    });
}

function showSessionPopup(isVisible) {
    const sessionPopup = document.querySelector(".session-popup");
    const sessionPopupOverlay = document.querySelector(".popup-overlay");

    if (isVisible) {
        sessionPopup.classList.add("show");
        sessionPopupOverlay.classList.add("show");
    } else {
        sessionPopup.classList.remove("show");
        sessionPopupOverlay.classList.remove("show");
    }
}

function showItem(item, isVisible) {
    if (isVisible) {
        item.classList.add("show");
    } else {
        item.classList.remove("show");
    }
}
function uploadSession() {


    const course = document.getElementById("session-name").value.trim();
    const hours = document.getElementById("session-hours").value.trim();
    const details = document.getElementById("session-details").value.trim();

    const entry = {course, hours, details};

    sessions.push(entry);

    localStorage.setItem("sessions", JSON.stringify(sessions));

    displayEntries(sessions);
    genCourseBtns();

    form.reset();
    showSessionPopup(false);
    
}


function displayEntries(entries) {
    const output = document.getElementById("session-output");
    if (!output) return;
    if (output){
        output.innerHTML = "";
        entries.forEach(data => {
            const entry = document.createElement("div");
            entry.classList.add("session-entry-card");

            const course = document.createElement("h1");
            course.classList.add("sh1");
            course.textContent = data.course;

            const hours = document.createElement("p");
            hours.classList.add("sp");
            hours.textContent = data.hours;

            const details = document.createElement("p");
            details.classList.add("sp");
            details.textContent = data.details;

            const deletebtn = document.createElement("button");
            deletebtn.textContent = "delete";
            deletebtn.classList.add("delete-btn");

            entry.appendChild(course);
            entry.appendChild(details);
            entry.appendChild(hours);
            entry.appendChild(deletebtn);

            output.appendChild(entry);
 
            deletebtn.addEventListener("click", () => {
                deleteSession(data.details, entry);
            });

        });
    }
    
}

function deleteSession(id, element) {
        // remove from localStorage
        sessions = sessions.filter(session => session.details !== id);
        localStorage.setItem("sessions", JSON.stringify(sessions));

        console.log(sessions);
        genCourseBtns();
        console.log(document.getElementById("coursebtns").innerHTML);
        displayEntries(sessions);
        // remove from UI
        element.remove();
}

displayEntries(sessions);