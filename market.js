const prices = { pokeball: 200, potion: 300 };

function buyItem(type) {
    const cost = prices[type];
    if (gameState.money >= cost) {
        gameState.money -= cost;
        gameState.inventory[type + "s"]++;
        updateUI();
    } else {
        alert(translations[currentLanguage].no_money);
    }
}