const n_session_btn = document.getElementById("new-session");
const c_session_btn = document.getElementById("close-session");
const s_session_btn = document.getElementById("submit-session");

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

function uploadSession() {

    const course = document.getElementById("session-name").value.trim();
    const hours = document.getElementById("session-hours").value.trim();
    const details = document.getElementById("session-details").value.trim();

    const entry = {course, hours, details};

    let sessions = JSON.parse(localStorage.getItem("sessions")) || [];
    sessions.push(entry);

    localStorage.setItem("sessions", JSON.stringify(sessions));

    displayEntries(entry);
}


function displayEntries(data) {
    const entry = document.createElement("div");
    entry.classList.add("session-entry-card");
    entry.innerHTML = `
        <h3>${data.course}</h3>
        <p><strong>Hours:</strong> ${data.hours}</p>
        <p>${data.details}</p>
        <button class="delete-btn">Delete</button>
    `;
    output.appendChild(entry);

    entry.querySelector(".delete-btn").addEventListener("click", () => {
        deleteSession(data.details, entry);
    });

    form.reset();
    showSessionPopup(false);
    
}

function deleteSession(id, element) {
        // remove from localStorage
        let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

        sessions = sessions.filter(session => session.details !== id);

        localStorage.setItem("sessions", JSON.stringify(sessions));

        // remove from UI
        element.remove();
}
