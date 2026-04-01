let startBtn = document.getElementById('start');
let saveBtn = document.getElementById('save');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');


let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer = false;

window.addEventListener("DOMContentLoaded", () => {
    let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

    sessions.forEach(session => {
        displayEntries(session);
    });
});


startBtn.addEventListener('click', function () {
    if (!timer){
        timer = true;
        stopWatch();
    }
 });
stopBtn.addEventListener('click', function () {
    timer = false;
});
resetBtn.addEventListener('click', function () {
    timer = false;
    hour = 0;
    minute = 0;
    second = 0;
    count = 0;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
});

function stopWatch() {
    if (timer) {
        count++;

        if (count == 60) {
            second++;
            count = 0;
        }

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }

        let hrString = hour;
        let minString = minute;
        let secString = second;
        if (hour < 10) {
            hrString = "0" + hrString;
        }

        if (minute < 10) {
            minString = "0" + minString;
        }

        if (second < 10) {
            secString = "0" + secString;
        }

        document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        setTimeout(stopWatch, 10);
    }
}

if (saveBtn){
    saveBtn.addEventListener('click', function () {
        showSessionPopup(true);
        timer = false;
        document.getElementById("session-hours").value = second;
        
        hour = 0;
        minute = 0;
        second = 0;
        count = 0;
        document.getElementById('hr').innerHTML = "00";
        document.getElementById('min').innerHTML = "00";
        document.getElementById('sec').innerHTML = "00";
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



function deleteSession(id, element) {
        // remove from localStorage
        let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

        sessions = sessions.filter(session => session.details !== id);

        localStorage.setItem("sessions", JSON.stringify(sessions));

        // remove from UI
        element.remove();
}
