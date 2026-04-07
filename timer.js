let startTime = null;
let elapsed = 0; // ms accumulated before pauses

let startBtn = document.getElementById('start');
let saveBtn = document.getElementById('save');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');


let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer = false;


function stopWatch() {
    if (!timer) return;
    
    const now = Date.now();
    const total = elapsed + (now - startTime); // total ms

    const totalSeconds = Math.floor(total / 1000);
    const hour = Math.floor(totalSeconds / 3600);
    const minute = Math.floor((totalSeconds % 3600) / 60);
    const second = totalSeconds % 60;

    document.getElementById('hr').innerHTML = String(hour).padStart(2, '0');
    document.getElementById('min').innerHTML = String(minute).padStart(2, '0');
    document.getElementById('sec').innerHTML = String(second).padStart(2, '0');

    setTimeout(stopWatch, 500);
}

startBtn.addEventListener('click', function () {
    if (!timer) {
        timer = true;
        startTime = Date.now(); // record when we started
        stopWatch();
    }
});

stopBtn.addEventListener('click', function () {
    if (timer) {
        elapsed += Date.now() - startTime; // save accumulated time
        timer = false;
    }
});

resetBtn.addEventListener('click', function () {
    timer = false;
    elapsed = 0;
    startTime = null;
    document.getElementById('hr').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
});

if (saveBtn) {
    saveBtn.addEventListener('click', function () {
        showSessionPopup(true);

        if (timer) {
            elapsed += Date.now() - startTime;
            timer = false;
        }
        // convert elapsed ms to minutes for the hours field
        const totalSeconds = Math.floor(elapsed / 1000);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        document.getElementById("session-hours").value = `${secs}s`;

        elapsed = 0;
        startTime = null;
        document.getElementById('hr').innerHTML = "00";
        document.getElementById('min').innerHTML = "00";
        document.getElementById('sec').innerHTML = "00";
    });
}