//Spinfunktion
const spinButton = document.getElementById("spin-button");
const pokemonNameDisplay = document.getElementById("pokemon-name");
const catchButton = document.getElementById("catch-button");

async function spin() {
    const range = gameState.maxID - gameState.minID + 1;
    const randomId = Math.floor(Math.random() * range) + gameState.minID;

    spinButton.innerText = translations[currentLanguage].loading;

    try {
        //Daten abrufen
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`);
        const speciesData = await speciesResponse.json();
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const pokemonData = await pokemonResponse.json();

        //Filter
        const localizedNameEntry = speciesData.names.find(name => name.language.name === currentLanguage);
        const finalName = localizedNameEntry ? localizedNameEntry.name : speciesData.name; 

        //UI aktualisieren
        document.getElementById("pokemon-sprite").src = pokemonData.sprites.front_default;
        pokemonNameDisplay.innerText = finalName;

        //Fang-Logik
        lastFoundPokemon = { 
            name: finalName,
            sprite: pokemonData.sprites.front_default 
        };

        //Fang-Button
        catchButton.style.display = "inline-block";
        gameState.money += 50;
        updateUI();
    }

    catch (error) {
        console.error("Da ist etwas schiefgelaufen:", error);
        pokemonNameDisplay.innerText = "Error!";
    }

    finally {
        spinButton.innerText = translations[currentLanguage].spin;
    }
}