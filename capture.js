const catchButton = document.getElementById("catch-button");

let lastFoundPokemon = null;

function attemptCatch() {
    const lang = translations[currentLanguage];

    // Pokeball Inventar
    if (gameState.inventory.pokeballs <= 0) {
        alert(lang.no_money);
        return;
    }

    // UI aktualisieren
    gameState.inventory.pokeballs--;
    updateUI();

    // 3. Das Roulette-Zufallsprinzip (50/50 Chance)
    const isCaught = Math.random() < 0.5;

    if (isCaught) {
        if (gameState.team.length < 6) {
            gameState.team.push(lastFoundPokemon);
            alert(lastFoundPokemon.name + " " + lang.catch_success);
        } else {
            alert(lang.team_full);
        }
    } else {
        alert(lastFoundPokemon.name + " " + lang.catch_fail);
    }

    // Button aktualisieren nach Fang
    catchButton.style.display = "none";
    lastFoundPokemon = null;
}