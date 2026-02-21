// spin.js - Korrigierte Version

async function spin() {
    // Lokale Referenzen, um Konflikte mit ui.js zu vermeiden
    const sBtn = document.getElementById("spin-button");
    const nameDisplay = document.getElementById("pokemon-name");
    const cBtn = document.getElementById("catch-button");

    const range = gameState.maxID - gameState.minID + 1;
    const randomId = Math.floor(Math.random() * range) + gameState.minID;

    // Lade-Status anzeigen
    sBtn.innerText = translations[currentLanguage].loading;

    try {
        // Daten von der PokéAPI abrufen
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`);
        const speciesData = await speciesResponse.json();
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const pokemonData = await pokemonResponse.json();

        // Namen lokalisieren (Übersetzung aus der API ziehen)
        const localizedNameEntry = speciesData.names.find(name => name.language.name === currentLanguage);
        const finalName = localizedNameEntry ? localizedNameEntry.name : speciesData.name; 

        // UI aktualisieren (Bild und Name)
        document.getElementById("pokemon-sprite").src = pokemonData.sprites.front_default;
        nameDisplay.innerText = finalName;

        // Pokémon für die capture.js Fang-Logik zwischenspeichern
        lastFoundPokemon = { 
            name: finalName,
            sprite: pokemonData.sprites.front_default 
        };

        // Fang-Button einblenden & Geld-Bonus für den Spin
        cBtn.style.display = "inline-block";
        gameState.money += 50;
        updateUI();
    }

    catch (error) {
        console.error("Fehler beim Spin:", error);
        nameDisplay.innerText = "Error!";
    }

    finally {
        // Button-Text zurücksetzen (aus translations.js)
        sBtn.innerText = translations[currentLanguage].spin;
    }
}
