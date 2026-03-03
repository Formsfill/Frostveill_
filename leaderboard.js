// ============================
// Hamburger Menu
// ============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if(hamburger && navLinks){
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ============================
// Copy Server IP
// ============================
function copyIP(){
    navigator.clipboard.writeText("frostveill.falixsrv.me");
    alert("Server IP Copied!");
}

// ============================
// Live Server Status
// ============================
const statusElem = document.getElementById("server-status");
if(statusElem){
    fetch("https://api.mcsrvstat.us/2/frostveill.falixsrv.me")
    .then(res => res.json())
    .then(data => {
        if(data.online){
            statusElem.innerHTML = `🟢 Server Online | Players: ${data.players.online}/${data.players.max}`;
        } else {
            statusElem.innerHTML = "🔴 Server Offline";
        }
    })
    .catch(() => {
        statusElem.innerHTML = "⚠ Unable to fetch server status";
    });
}

// ============================
// Leaderboard + Private Edit Mode
// ============================

// Default leaderboard
let defaultPlayers = [
  {name: "DragonSlayer", hearts: 25},
  {name: "FrostKing", hearts: 22},
  {name: "ShadowNinja", hearts: 18},
  {name: "NightWalker", hearts: 15},
  {name: "BladeMaster", hearts: 12}
];

const cardsContainer = document.getElementById("top-players-cards");
const inputsContainer = document.getElementById("player-inputs");
const editContainer = document.getElementById("edit-leaderboard");

// Load leaderboard from LocalStorage if exists
let players = JSON.parse(localStorage.getItem('myLeaderboard')) || defaultPlayers;

// Show edit inputs only if URL has ?edit=true
if(window.location.search.includes('edit=true') && editContainer){
    editContainer.style.display = 'block';
}

// Render leaderboard cards
function renderLeaderboard(){
    if(!cardsContainer) return;
    cardsContainer.innerHTML = '';
    players.forEach((player,index)=>{
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<p>#${index+1} ${player.name} ❤️ ${player.hearts}</p>`;
        cardsContainer.appendChild(card);
    });
}

// Render editable inputs (admin only)
function renderInputs(){
    if(!inputsContainer || !editContainer) return;
    inputsContainer.innerHTML = '';
    players.forEach((player,index)=>{
        const row = document.createElement('div');
        row.style.margin='5px 0';
        row.innerHTML=`
            <input type="text" id="name-${index}" value="${player.name}" placeholder="Player Name">
            <input type="number" id="hearts-${index}" value="${player.hearts}" placeholder="Hearts">
        `;
        inputsContainer.appendChild(row);
    });
}

// Update leaderboard from inputs
function updateLeaderboard(){
    players.forEach((player,index)=>{
        const nameInput = document.getElementById(`name-${index}`);
        const heartsInput = document.getElementById(`hearts-${index}`);
        if(nameInput) player.name = nameInput.value;
        if(heartsInput) player.hearts = parseInt(heartsInput.value) || 0;
    });
    // Save changes to LocalStorage
    localStorage.setItem('myLeaderboard', JSON.stringify(players));
    renderLeaderboard();
}

// Initial render
renderLeaderboard();
renderInputs();

// ============================
// Contact Form Handling
// ============================
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {'Accept': 'application/json'}
        })
        .then(response => {
            if(response.ok){
                if(contactStatus) contactStatus.textContent = "✅ Message sent!";
                contactForm.reset();
            } else {
                if(contactStatus) contactStatus.textContent = "❌ Failed to send. Try again.";
            }
        })
        .catch(() => {
            if(contactStatus) contactStatus.textContent = "❌ Failed to send. Check your connection.";
        });
    });
}

// ============================
// Countdown Timer
// ============================

// Load countdown date from LocalStorage or use default
let storedDate = localStorage.getItem('countdownDate');
let countdownDate = storedDate ? new Date(storedDate) : new Date("2026-03-10T18:00:00");

// Show admin input if ?edit=true
const editTimer = document.getElementById('edit-timer');
if(window.location.search.includes('edit=true') && editTimer){
    editTimer.style.display = 'block';
}

// Update countdown every second
function updateCountdownDisplay(){
    if(!countdownDate || isNaN(countdownDate.getTime())) return;
    const now = new Date();
    const diff = countdownDate - now;

    const timerElem = document.getElementById('timer');
    if(!timerElem) return;

    if(diff <= 0){
        timerElem.textContent = "🚀 Event Started!";
        return;
    }

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2,'0');
    document.getElementById('hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');
}

// Update countdown from admin input
function updateCountdown(){
    const input = document.getElementById('new-timer').value;
    if(!input) return alert("Select a valid date & time!");
    countdownDate = new Date(input);
    if(isNaN(countdownDate.getTime())) return alert("Invalid date!");
    localStorage.setItem('countdownDate', countdownDate);
    alert("Countdown updated!");
}

// Start the timer
updateCountdownDisplay();
setInterval(updateCountdownDisplay, 1000);
// ============================
// FAQ Accordion (Corrected)
// ============================

// Wait until the page fully loads
window.addEventListener("load", () => {
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(button => {
        button.addEventListener("click", () => {
            const answer = button.nextElementSibling;

            // If answer is already open, close it
            if (answer.style.maxHeight && answer.style.maxHeight !== "0px") {
                answer.style.maxHeight = null;
                button.classList.remove("active");
            } else {
                // Close all other answers
                document.querySelectorAll(".faq-answer").forEach(a => {
                    a.style.maxHeight = null;
                    if(a.previousElementSibling) a.previousElementSibling.classList.remove("active");
                });

                // Open this answer
                answer.style.maxHeight = answer.scrollHeight + "px";
                button.classList.add("active");
            }
        });
    });
});
