let startTime = null;
let elapsed = 0; // ms accumulated before pauses

const startBtn = document.getElementById('start');
const saveBtn = document.getElementById('save');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');


let hour = 0;
let minute = 0;
let second = 0;
let count = 0;
let timer = false;
let isRunning = false;



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

    setTimeout(stopWatch, 100);
}
if (startBtn){
    startBtn.addEventListener('click', function () {
    if (!timer) {
        timer = true;
        isRunning = true;
        startTime = Date.now(); // record when we started
        stopWatch();
    }
    });
}

if (stopBtn){
    stopBtn.addEventListener('click', function () {
        if (timer) {
            isRunning =true;
            elapsed += Date.now() - startTime; // save accumulated time
            timer = false;
        }
    });
}

// resetBtn.addEventListener('click', function () {
//     timer = false;
//     isRunning = false;
//     elapsed = 0;
//     startTime = null;
//     document.getElementById('hr').innerHTML = "00";
//     document.getElementById('min').innerHTML = "00";
//     document.getElementById('sec').innerHTML = "00";
// });

if (saveBtn) {

    saveBtn.addEventListener('click', function () {
        let hour_temp = document.getElementById('hr');
        let real_hour = document.getElementById('hr').textContent;
        if (timer){
            elapsed += Date.now() - startTime;
            timer = false;
        }
        if (isRunning){
            let min = document.getElementById('min').textContent;
            if (Number(min)>=30){
                hour_temp.textContent = Number(hour_temp.textContent)+1;
            }
        // convert elapsed ms to minutes for the hours field
            let hr = hour_temp.textContent;
            let sec = document.getElementById('sec').textContent;


            hr
        // 3. Combine them into your display field

            document.getElementById("session-hours").value = `${(hr)}`;
            document.getElementById("session-time").value = `Time Spent: ${real_hour} : ${min} : ${sec}`;
        
            showSessionPopup(true);
            
            elapsed = 0;
            startTime = null;
            document.getElementById('hr').innerHTML = "00";
            document.getElementById('min').innerHTML = "00";
            document.getElementById('sec').innerHTML = "00";
            }
        }
        );

    isRunning = false;
}


document.addEventListener("keydown", function(event) {
      // event.key gives the key pressed
    if (event.key === 'Enter'){
        event.preventDefault();
    }
});