let currentLanguage = 'de';

const maintTitle = document.getElementById("main-title");
const spinButton = document.getElementById("spin-button");

function updateUI() {
    document.getElementById("stat-money").innerText = gameState.money;
    document.getElementById("stat-balls").innerText = gameState.inventory.pokeballs;
    document.getElementById("stat-potions").innerText = gameState.inventory.potions;

    //Team Slot
    for (let i = 0; i < 6; i++) {
        const slot = document.getElementById(`slot-${i}`);
        if (gameState.team[i]) {
            slot.innerHTML = `<img src="${gameState.team[i].sprite}"title="${gameState.team[i].name}">`;
            slot.style.borderStyle = "solid";
        } else {
            slot.innerHTML = "";
            slot.style.borderStyle = "dashed";
        }
    }
}

//Übersetzung
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Texte
    document.getElementById("main-title").innerText = translations[lang].title;
    document.getElementById("spin-button").innerText = translations[lang].spin;

    //Team
    const teamLabel = document.getElementById("team-label");
    if (teamLabel) {
        teamLabel.innerText = translations[lang].team_title;
    }
    
    // Markt
    const buyBtns = document.querySelectorAll(".buy-btn");
    buyBtns[0].innerText = translations[lang].buy_ball;
    buyBtns[1].innerText = translations[lang].buy_potion;

    console.log("Sprache geändert auf: " + lang);
    updateUI();
}

function startGame(min, max) {
    gameState.minID = min;
    gameState.maxID = max;
    gameState.gameActive = true;

    document.getElementById("setup-menu").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    
    updateUI();
}

updateUI();