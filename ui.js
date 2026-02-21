let currentLanguage = 'de';

const mainTitle = document.getElementById("main-title");
const spinButtonElement = document.getElementById("spin-button"); // Variable umbenannt, um Konflikt mit spin.js zu vermeiden

function updateUI() {
    // 1. Statistiken aktualisieren
    document.getElementById("stat-money").innerText = gameState.money;
    document.getElementById("stat-balls").innerText = gameState.inventory.pokeballs;
    document.getElementById("stat-potions").innerText = gameState.inventory.potions;

    // 2. Team-Slots aktualisieren
    for (let i = 0; i < 6; i++) {
        const slot = document.getElementById(`slot-${i}`);
        if (slot) {
            if (gameState.team[i]) {
                slot.innerHTML = `<img src="${gameState.team[i].sprite}" title="${gameState.team[i].name}" style="width: 50px;">`;
            } else {
                slot.innerHTML = "";
            }
        }
    }
}

// Funktion Sprache
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Texte übersetzen
    document.getElementById("main-title").innerText = translations[lang].title;
    document.getElementById("spin-button").innerText = translations[lang].spin;
    
    // Team
    const teamLabel = document.getElementById("team-label"); 
    if (teamLabel) {
        teamLabel.innerText = translations[lang].team_title;
    }
    
    // Markt übersetzen
    const buyBtns = document.querySelectorAll(".buy-btn");
    if (buyBtns.length >= 2) {
        buyBtns[0].innerText = translations[lang].buy_ball;
        buyBtns[1].innerText = translations[lang].buy_potion;
    }

    console.log("Sprache geändert auf: " + lang);
    updateUI();
}

// Funktion zum Starten GenWahl
function startGame(min, max) {
    gameState.minID = min;
    gameState.maxID = max;
    gameState.gameActive = true;

    // Menü ausblenden
    document.getElementById("setup-menu").style.display = "none";
    
    // Spiel anzeigen
    document.getElementById("app-container").style.display = "block";
    
    updateUI();
}

updateUI();
