const backgrounds = [
    "images/feesh5.png",
    "images/feesh4.png", 
    "images/feesh3.png",
    "images/feesh2.png",
    "images/feesh.png",
];

const lvlup = document.getElementById("evolve-btn");
let current = 0;

lvlup.addEventListener("click", () => {
    current = (current + 1) % backgrounds.length;
    document.querySelector("body").style.backgroundImage = `url(${backgrounds[current]})`;
});
