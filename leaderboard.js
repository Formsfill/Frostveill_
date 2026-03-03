// ============================
// Hamburger Menu
// ============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

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
fetch("https://api.mcsrvstat.us/2/frostveill.falixsrv.me")
.then(res => res.json())
.then(data => {
    const status = document.getElementById("server-status");
    if(data.online){
        status.innerHTML = `🟢 Server Online | Players: ${data.players.online}/${data.players.max}`;
    } else {
        status.innerHTML = "🔴 Server Offline";
    }
});

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
if(window.location.search.includes('edit=true')){
    editContainer.style.display = 'block';
}

// Render leaderboard cards
function renderLeaderboard(){
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
    if(!editContainer) return;
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
        player.name = nameInput.value;
        player.hearts = parseInt(heartsInput.value)||0;
    });
    // Save changes to LocalStorage (only in your browser)
    localStorage.setItem('myLeaderboard', JSON.stringify(players));
    renderLeaderboard();
}

// Initial render
renderLeaderboard();
renderInputs();b

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            contactStatus.textContent = "✅ Message sent!";
            contactForm.reset();
        } else {
            contactStatus.textContent = "❌ Failed to send. Try again.";
        }
    }).catch(() => {
        contactStatus.textContent = "❌ Failed to send. Check your connection.";
    });
});
// Default countdown target
let targetTime = new Date("2026-03-10T18:00:00").getTime();

// Show edit box only if ?edit=true is in URL
const editDiv = document.getElementById("edit-timer");
if (!window.location.search.includes("edit=true")) {
  editDiv.style.display = "none";
}

const timerEl = document.getElementById("timer");
const updateBtn = document.getElementById("update-btn");

updateBtn.addEventListener("click", () => {
  const input = document.getElementById("new-time").value;
  if (input) {
    targetTime = new Date(input).getTime();
  }
});

function updateTimer() {
  const now = new Date().getTime();
  const distance = targetTime - now;

  if (distance <= 0) {
    timerEl.innerHTML = "Event Started!";
    clearInterval(interval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);

  timerEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const interval = setInterval(updateTimer, 1000);
updateTimer();
