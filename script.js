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
const logo = document.getElementById("logo");


const form = document.getElementById("session-form");
const output = document.getElementById("session-output");
let hours_total = JSON.parse(localStorage.getItem("hours_total")) || 0;
let hours_display = document.getElementById("hours-logged");


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
        calculatehours();
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
            if (logo){
                showItem(logo, false);
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
            if (logo){
                showItem(logo, true);
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
    const id = Date.now();

    const entry = {course, hours, details, id};

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
            deletebtn.textContent = "♒︎ Delete";
            deletebtn.classList.add("delete-btn");

            entry.appendChild(course);
            entry.appendChild(hours);   
            entry.appendChild(details);
            entry.appendChild(deletebtn);

            output.appendChild(entry);
 
            deletebtn.addEventListener("click", () => {
                showDelete(true);
                const y_delete = document.getElementById("yes-delete");
                const n_delete = document.getElementById("no-delete");
                y_delete.addEventListener("click", function(){
                    deleteSession(data.id);
                    showDelete(false);
                })
                n_delete.addEventListener("click", function(){
                    showDelete(false);
                })
            });

        });
    }
    
}

function addhours(entries){
    const hour_display = document.getElementById("hours-logged");
    let total =0;
    
    if (hour_display){
        entries.forEach(entry =>{
            total += Number(entry.hours);
        })
    }
    return Number(total);
}

function subtracthours(bought){
    const hour_display = document.getElementById("hours-logged");
    let total=0;
    
    if (hour_display){
        bought.forEach(item =>{
            total += Number(item.item_value);
        })
    }
    return Number(total);
}

function calculatehours(){
    const hour_display = document.getElementById("hours-logged");
    let items_bought = JSON.parse(localStorage.getItem("items_bought")) || [];

    let added = addhours(sessions);
    let subtracted = subtracthours(items_bought);

    hours_total = added-subtracted;
    hour_display.innerHTML = Number(hours_total);

    localStorage.setItem("hours_total", JSON.stringify(hours_total));
}

function deleteSession(id) {
        // remove from localStorage

        sessions = sessions.filter(session => session.id !== id);
        localStorage.setItem("sessions", JSON.stringify(sessions));

        genCourseBtns();
        displayEntries(sessions);
        calculatehours();
        // remove from UI
}
function showDelete(isVisible) {
    const itemPopup = document.querySelector(".delete-popup");
    const itemPopupOverlay = document.querySelector(".popup-overlay");

    if (isVisible) {   
        itemPopup.classList.add("show");
        itemPopupOverlay.classList.add("show");
    } else {
        itemPopup.classList.remove("show");
        itemPopupOverlay.classList.remove("show");
    }
}



displayEntries(sessions);
calculatehours();