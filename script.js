// =====================
// Elements
// =====================
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");
const windowBox = document.querySelector(".letter-window");

// =====================
// 🎵 Background Music
// =====================
const bgMusic = new Audio("bg-music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;

// =====================
// 🔊 NO Music
// =====================
const noSound = new Audio("no3.mp3");
noSound.loop = true;
noSound.volume = 0;
let noSoundFade;

// =====================
// ❌ Escape logic
// =====================
let escapeCount = 0;
const maxEscapes = 3;

// =====================
// Envelope click
// =====================
envelope.addEventListener("click", () => {
    bgMusic.play();
    envelope.style.display = "none";
    letter.style.display = "flex";
    setTimeout(() => windowBox.classList.add("open"), 50);
});

// =====================
// Move NO button
// =====================
function moveNoButton() {
    if (escapeCount >= maxEscapes) return;
    escapeCount++;

    const angle = Math.random() * Math.PI * 2;
    const dist = 220;

    noBtn.style.transform =
        `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", e => {
    e.preventDefault();
    moveNoButton();
});

// =====================
// NO click
// =====================
noBtn.addEventListener("click", () => {
    if (escapeCount < maxEscapes) return;

    bgMusic.pause();

    clearInterval(noSoundFade);
    noSound.currentTime = 0;
    noSound.volume = 0;
    noSound.play();

    noSoundFade = setInterval(() => {
        if (noSound.volume < 0.9) noSound.volume += 0.05;
        else clearInterval(noSoundFade);
    }, 100);

    windowBox.classList.add("shake");
    setTimeout(() => windowBox.classList.remove("shake"), 400);

    title.textContent = "Ouchie ansakit 😿";
    catImg.src = "cat_heart.gif";
    finalText.innerHTML = "si jo ay super sad… 🐾💔";
    finalText.style.display = "block";

    showBalloonMessage("mag yes ka na plssss 🥺🎈");
});

// =====================
// YES click
// =====================
yesBtn.addEventListener("click", () => {
    clearInterval(noSoundFade);
    noSound.pause();
    noSound.currentTime = 0;

    bgMusic.play();

    title.textContent = "YIPPEEEE!! 💖";
    catImg.src = "cat_dance.gif";

    windowBox.classList.add("final");
    buttons.style.display = "none";

    finalText.innerHTML = "See you on our date! 🐱💖";
    finalText.style.display = "block";
});

// =====================
// 🎈 Balloon
// =====================
function showBalloonMessage(text) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.textContent = text;
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 4000);
}

// =====================
// 🐾 Paw prints
// =====================
function createPaw(x, y) {
    const paw = document.createElement("img");
    paw.src = "paw.png";
    paw.className = "paw";

    const size = 30;
    paw.style.left = x - size / 2 + "px";
    paw.style.top = y - size / 2 + "px";

    document.body.appendChild(paw);
    setTimeout(() => paw.remove(), 1000);
}

document.addEventListener("mousemove", e => {
    if (Math.random() > 0.92) createPaw(e.clientX, e.clientY);
});

document.addEventListener("touchmove", e => {
    const t = e.touches[0];
    if (Math.random() > 0.85) createPaw(t.clientX, t.clientY);
});
