// Game Constants and Configuration
const GAME = {
    // Ranks and progression
    RANKS: [
        { name: "Street Dealer", minWealth: 0 },
        { name: "Local Supplier", minWealth: 50000 },
        { name: "District Boss", minWealth: 250000 },
        { name: "City Boss", minWealth: 1000000 },
        { name: "Regional Kingpin", minWealth: 5000000 },
        { name: "International Kingpin", minWealth: 10000000 },
        { name: "Global Cartel Leader", minWealth: 50000000 }
    ],
    
    // Initial game settings
    INITIAL: {
        CASH: 2000,
        DEBT: 5500,
        INVENTORY_SPACE: 100,
        INTEREST_RATE: 0.10, // 10% per day
    },
    
    // Random events configuration
    EVENTS: {
        PRICE_CHANGE_CHANCE: 0.8,
        POLICE_BUST_CHANCE: 0.05,
        PRODUCT_SCARCITY_CHANCE: 0.2,
        BULK_DEAL_CHANCE: 0.1,
    },
    
    // Products available in the game
    PRODUCTS: [
        { name: "Acid", minPrice: 1000, maxPrice: 4499, weight: 1 },
        { name: "Cocaine", minPrice: 15000, maxPrice: 29999, weight: 3 },
        { name: "Ecstasy", minPrice: 10, maxPrice: 59, weight: 1 },
        { name: "PCP", minPrice: 1000, maxPrice: 3499, weight: 2 },
        { name: "Heroin", minPrice: 5000, maxPrice: 13999, weight: 2 },
        { name: "Weed", minPrice: 300, maxPrice: 899, weight: 5 },
        { name: "Shrooms", minPrice: 600, maxPrice: 1349, weight: 2 },
        { name: "Speed", minPrice: 70, maxPrice: 249, weight: 1 },
    ],
};

// Cities and their districts
const WORLD_MAP = {
    "New York": {
        unlocked: true,
        districts: ["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island", "Harlem"]
    },
    "Los Angeles": {
        unlocked: false,
        districts: ["Downtown", "Hollywood", "Venice Beach", "Beverly Hills", "Compton", "East LA"]
    },
    "Tokyo": {
        unlocked: false,
        districts: ["Shibuya", "Shinjuku", "Roppongi", "Akihabara", "Ginza", "Ueno"]
    },
    "London": {
        unlocked: false,
        districts: ["Soho", "Camden", "Brixton", "Hackney", "Shoreditch", "Kensington"]
    },
    "Paris": {
        unlocked: false,
        districts: ["Montmartre", "Pigalle", "Belleville", "La Chapelle", "Barbès", "Saint-Denis"]
    },
    "Moscow": {
        unlocked: false,
        districts: ["Arbat", "Presnensky", "Tverskoy", "Taganka", "Zamoskvorechye", "Basmanny"]
    },
    "Sydney": {
        unlocked: false,
        districts: ["Kings Cross", "Redfern", "Surry Hills", "Cabramatta", "Parramatta", "Blacktown"]
    },
    "Rio de Janeiro": {
        unlocked: false,
        districts: ["Copacabana", "Ipanema", "Rocinha", "Maré", "Cidade de Deus", "Complexo do Alemão"]
    },
    "Mexico City": {
        unlocked: false,
        districts: ["Tepito", "Iztapalapa", "Doctores", "Guerrero", "Peralvillo", "Morelos"]
    },
    "Bangkok": {
        unlocked: false,
        districts: ["Patpong", "Klong Toey", "Khao San", "Nana", "Huai Khwang", "Din Daeng"]
    },
    "Amsterdam": {
        unlocked: false,
        districts: ["Red Light District", "Bijlmer", "Nieuw-West", "Zuidoost", "Noord", "Oost"]
    },
    "Berlin": {
        unlocked: false,
        districts: ["Kreuzberg", "Neukölln", "Wedding", "Friedrichshain", "Moabit", "Gesundbrunnen"]
    },
    "Bogotá": {
        unlocked: false,
        districts: ["Kennedy", "Ciudad Bolivar", "Suba", "Bosa", "Los Mártires", "Santa Fe"]
    },
    "Johannesburg": {
        unlocked: false,
        districts: ["Hillbrow", "Berea", "Yeoville", "Diepsloot", "Alexandra", "Soweto"]
    },
    "Mumbai": {
        unlocked: false,
        districts: ["Dharavi", "Kamathipura", "Dongri", "Sewri", "Wadala", "Worli"]
    },
    "Lagos": {
        unlocked: false,
        districts: ["Mushin", "Ajegunle", "Makoko", "Apapa", "Oshodi", "Shomolu"]
    },
    "Istanbul": {
        unlocked: false,
        districts: ["Tarlabaşı", "Balat", "Dolapdere", "Kasımpaşa", "Karaköy", "Çarşamba"]
    },
    "Hong Kong": {
        unlocked: false,
        districts: ["Mong Kok", "Sham Shui Po", "Yau Ma Tei", "Wan Chai", "North Point", "Kwun Tong"]
    },
    "Dubai": {
        unlocked: false,
        districts: ["Deira", "Al Qusais", "Naif", "Al Murar", "Al Baraha", "Hor Al Anz"]
    },
    "Vancouver": {
        unlocked: false,
        districts: ["Downtown Eastside", "Chinatown", "Strathcona", "Hastings-Sunrise", "Mount Pleasant", "Grandview-Woodland"]
    }
};

// Initialize the game state
let gameState = {
    cash: GAME.INITIAL.CASH,
    debt: GAME.INITIAL.DEBT,
    day: 1,
    dayLimit: 30, // Will be set based on user choice
    rank: GAME.RANKS[0],
    currentCity: "New York",
    currentDistrict: "Bronx",
    inventory: {
        space: {
            used: 0,
            max: GAME.INITIAL.INVENTORY_SPACE
        },
        items: {}  // Will be filled with { productName: quantity }
    },
    market: {},    // Will be filled with current prices
    events: {
        drugNews: [],
        playerActions: []
    },
    bankAccount: 0,
    netWorth: GAME.INITIAL.CASH - GAME.INITIAL.DEBT
};

// DOM references
let DOM = {};

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    // Gather all the DOM references we'll need
    cacheDOM();
    
    // Set up event listeners
    setupEventListeners();
    
    // Show intro screen first
    DOM.introScreen.style.display = 'flex';
    DOM.gameContainer.style.display = 'none';
});

// Cache DOM elements for later use
function cacheDOM() {
    DOM = {
        // Main containers
        gameContainer: document.getElementById('game-container'),
        introScreen: document.getElementById('intro-screen'),
        
        // Player stats
        cashValue: document.getElementById('cash-value'),
        debtValue: document.getElementById('debt-value'),
        dayValue: document.getElementById('day-value'),
        dayLimit: document.getElementById('day-limit'),
        rankValue: document.getElementById('rank-value'),
        
        // Location elements
        currentCity: document.getElementById('current-city'),
        currentDistrict: document.getElementById('current-district'),
        travelBtn: document.getElementById('travel-btn'),
        
        // Inventory
        spaceUsed: document.getElementById('space-used'),
        maxSpace: document.getElementById('max-space'),
        inventoryList: document.getElementById('inventory-list'),
        
        // Market
        marketList: document.getElementById('market-list'),
        
        // Events logs
        drugNewsLog: document.getElementById('drug-news-log'),
        playerActionsLog: document.getElementById('player-actions-log'),
        eventsTabs: document.querySelectorAll('.tab-button'),
        eventsTabsContent: document.querySelectorAll('.events-tab'),
        
        // Action buttons
        loanSharkBtn: document.getElementById('loan-shark-btn'),
        bankBtn: document.getElementById('bank-btn'),
        endDayBtn: document.getElementById('end-day-btn'),
        
        // Cities list
        citiesList: document.getElementById('cities-list'),
        
        // Modal elements
        modalContainer: document.getElementById('modal-container'),
        modalTitle: document.getElementById('modal-title'),
        modalContent: document.getElementById('modal-content'),
        modalClose: document.getElementById('modal-close'),
        
        // Game setup
        gameDays: document.getElementById('game-days'),
        startGameBtn: document.getElementById('start-game-btn')
    };
}

// Set up all event listeners
function setupEventListeners() {
    // Start game button
    DOM.startGameBtn.addEventListener('click', startGame);
    
    // Travel button
    DOM.travelBtn.addEventListener('click', showTravelOptions);
    
    // End day button
    DOM.endDayBtn.addEventListener('click', endDay);
    
    // Loan shark button
    DOM.loanSharkBtn.addEventListener('click', showLoanSharkModal);
    
    // Bank button
    DOM.bankBtn.addEventListener('click', showBankModal);
    
    // Modal close button
    DOM.modalClose.addEventListener('click', closeModal);
    
    // Event tabs
    DOM.eventsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            DOM.eventsTabs.forEach(t => t.classList.remove('active'));
            DOM.eventsTabsContent.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
}

// Start the game with the selected options
function startGame() {
    // Get the selected number of days
    const selectedDays = DOM.gameDays.value;
    gameState.dayLimit = selectedDays === 'infinite' ? Infinity : parseInt(selectedDays);
    
    // Update the UI
    DOM.dayLimit.textContent = selectedDays === 'infinite' ? '∞' : selectedDays;
    
    // Initialize the game data
    initializeGame();
    
    // Hide intro screen and show game
    DOM.introScreen.style.display = 'none';
    DOM.gameContainer.style.display = 'block';
}

// Initialize the game data and display
function initializeGame() {
    // Reset the game state to initial values
    gameState = {
        cash: GAME.INITIAL.CASH,
        debt: GAME.INITIAL.DEBT,
        day: 1,
        dayLimit: gameState.dayLimit,
        rank: GAME.RANKS[0],
        currentCity: "New York",
        currentDistrict: "Bronx",
        inventory: {
            space: {
                used: 0,
                max: GAME.INITIAL.INVENTORY_SPACE
            },
            items: {}
        },
        market: {},
        events: {
            drugNews: [],
            playerActions: []
        },
        bankAccount: 0,
        netWorth: GAME.INITIAL.CASH - GAME.INITIAL.DEBT
    };
    
    // Generate initial market prices
    generateMarketPrices();
    
    // Update all displays
    updatePlayerStats();
    updateLocationDisplay();
    updateInventoryDisplay();
    updateMarketDisplay();
    updateUnlockedCities();
    
    // Add initial event
    addPlayerActionEvent("Welcome to Dope Wars Global! You owe the Loan Shark $5,500. Start trading to make money!");
    addDrugNewsEvent("The local market is active. Check prices and start dealing!");
}

// Generate random market prices for the current location
function generateMarketPrices() {
    gameState.market = {};
    
    GAME.PRODUCTS.forEach(product => {
        // Determine if product is available (1 in 8 chance of being unavailable)
        const isAvailable = Math.random() > 0.125;
        
        if (isAvailable) {
            // Generate a random price within the range
            const range = product.maxPrice - product.minPrice;
            let price = Math.floor(Math.random() * range + product.minPrice);
            
            // Apply potential modifiers based on location
            price = applyLocationModifiers(price, product.name);
            
            // Store in the market
            gameState.market[product.name] = price;
        }
    });
}

// Apply price modifiers based on location
function applyLocationModifiers(basePrice, productName) {
    let modifier = 1.0; // Default: no modification
    
    // Each city has its own price trends
    switch(gameState.currentCity) {
        case "New York":
            // Standard US prices
            break;
        case "Los Angeles":
            if (productName === "Weed") modifier = 0.7; // Cheaper weed
            break;
        case "Tokyo":
            modifier = 1.5; // Everything is more expensive
            if (productName === "Speed") modifier = 2.0; // Especially speed
            break;
        case "London":
            if (productName === "Cocaine") modifier = 1.3;
            break;
        case "Amsterdam":
            if (productName === "Weed" || productName === "Shrooms") modifier = 0.5; // Much cheaper
            break;
        case "Bogotá":
            if (productName === "Cocaine") modifier = 0.4; // Source location
            break;
        // Add more cities with unique modifiers
    }
    
    // Each district within cities can have additional modifiers
    const district = gameState.currentDistrict;
    
    // Apply specific district modifiers
    // These are just examples, you can expand with real district effects
    if (district.includes("Downtown") || 
        district.includes("Upscale") || 
        district.includes("Beverly") ||
        district.includes("Ginza")) {
        modifier *= 1.2; // Price premium in wealthy areas
    }
    
    if (district.includes("Slum") || 
        district.includes("Ghetto") || 
        district.includes("Favela") ||
        district.includes("Compton")) {
        modifier *= 0.9; // Slightly cheaper in poor areas but more dangerous
    }
    
    // Random small fluctuation (±5%)
    modifier *= 0.95 + Math.random() * 0.1;
    
    return Math.round(basePrice * modifier);
}

// Update player stats display
function updatePlayerStats() {
    DOM.cashValue.textContent = formatMoney(gameState.cash);
    DOM.debtValue.textContent = formatMoney(gameState.debt);
    DOM.dayValue.textContent = gameState.day;
    DOM.rankValue.textContent = gameState.rank.name;
    
    // Update player rank based on net worth
    updatePlayerRank();
}

// Update player rank based on net worth
function updatePlayerRank() {
    // Calculate net worth (cash + inventory value + bank account - debt)
    const inventoryValue = calculateInventoryValue();
    gameState.netWorth = gameState.cash + inventoryValue + gameState.bankAccount - gameState.debt;
    
    // Find the highest rank the player qualifies for
    let newRank = GAME.RANKS[0];
    for (let i = GAME.RANKS.length - 1; i >= 0; i--) {
        if (gameState.netWorth >= GAME.RANKS[i].minWealth) {
            newRank = GAME.RANKS[i];
            break;
        }
    }
    
    // If rank changed, update and notify
    if (newRank.name !== gameState.rank.name) {
        const isPromotion = GAME.RANKS.indexOf(newRank) > GAME.RANKS.indexOf(gameState.rank);
        gameState.rank = newRank;
        
        if (isPromotion) {
            addPlayerActionEvent(`Congratulations! You've been promoted to ${newRank.name}!`);
            
            // If reached International Kingpin or higher, unlock all cities
            if (newRank.minWealth >= 10000000) {
                unlockAllCities();
                addPlayerActionEvent("You've reached international status! All cities are now unlocked.");
            }
        } else {
            addPlayerActionEvent(`Your rank has decreased to ${newRank.name}.`);
        }
        
        // Update the display
        DOM.rankValue.textContent = gameState.rank.name;
    }
}

// Calculate the total value of inventory at current market prices
function calculateInventoryValue() {
    let totalValue = 0;
    
    for (const product in gameState.inventory.items) {
        const quantity = gameState.inventory.items[product];
        const currentPrice = gameState.market[product] || 0;
        totalValue += quantity * currentPrice;
    }
    
    return totalValue;
}

// Update location display
function updateLocationDisplay() {
    DOM.currentCity.textContent = gameState.currentCity;
    DOM.currentDistrict.textContent = gameState.currentDistrict;
}

// Update inventory display
function updateInventoryDisplay() {
    // Update space usage
    DOM.spaceUsed.textContent = gameState.inventory.space.used;
    DOM.maxSpace.textContent = gameState.inventory.space.max;
    
    // Clear the inventory list
    DOM.inventoryList.innerHTML = '';
    
    // Add each item to the inventory list
    for (const product in gameState.inventory.items) {
        const quantity = gameState.inventory.items[product];
        if (quantity > 0) {
            const listItem = document.createElement('li');
            
            // Find the product weight
            const productInfo = GAME.PRODUCTS.find(p => p.name === product);
            const weight = productInfo ? productInfo.weight : 1;
            
            listItem.innerHTML = `
                <span>${product}</span>
                <span>${quantity} (${quantity * weight} space)</span>
            `;
            DOM.inventoryList.appendChild(listItem);
        }
    }
    
    // If inventory is empty, show a message
    if (DOM.inventoryList.children.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.textContent = "Your inventory is empty";
        DOM.inventoryList.appendChild(emptyItem);
    }
}

// Update market display
function updateMarketDisplay() {
    // Clear the market list
    DOM.marketList.innerHTML = '';
    
    // Add each product to the market list
    GAME.PRODUCTS.forEach(product => {
        const row = document.createElement('tr');
        const price = gameState.market[product.name];
        const inventoryQuantity = gameState.inventory.items[product.name] || 0;
        
        // If the product is available in this market
        if (price !== undefined) {
            row.innerHTML = `
                <td>${product.name}</td>
                <td>$${formatMoney(price)}</td>
                <td>${inventoryQuantity}</td>
                <td>
                    <button class="buy-btn" data-product="${product.name}">Buy</button>
                    <button class="sell-btn" data-product="${product.name}" ${inventoryQuantity === 0 ? 'disabled' : ''}>Sell</button>
                </td>
            `;
        } else {
            row.innerHTML = `
                <td>${product.name}</td>
                <td>Not available</td>
                <td>${inventoryQuantity}</td>
                <td>
                    <button class="buy-btn" disabled>Buy</button>
                    <button class="sell-btn" data-product="${product.name}" ${inventoryQuantity === 0 ? 'disabled' : ''}>Sell</button>
                </td>
            `;
        }
        
        DOM.marketList.appendChild(row);
    });
    
    // Add event listeners to buy/sell buttons
    document.querySelectorAll('.buy-btn').forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', () => {
                showBuyModal(button.dataset.product);
            });
        }
    });
    
    document.querySelectorAll('.sell-btn').forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', () => {
                showSellModal(button.dataset.product);
            });
        }
    });
}

// Update unlocked cities display
function updateUnlockedCities() {
    // Clear the cities list
    DOM.citiesList.innerHTML = '';
    
    // Add each city to the list
    for (const city in WORLD_MAP) {
        const cityInfo = WORLD_MAP[city];
        const listItem = document.createElement('li');
        listItem.textContent = `${city} ${cityInfo.unlocked ? '✓' : '🔒'}`;
        
        // Add a class if the city is locked
        if (!cityInfo.unlocked) {
            listItem.classList.add('locked');
        }
        
        DOM.citiesList.appendChild(listItem);
    }
}

// Show travel options modal
function showTravelOptions() {
    DOM.modalTitle.textContent = "Travel";
    let content = '<div class="travel-options">';
    
    // Current city's districts
    content += `<h3>Districts in ${gameState.currentCity}</h3>`;
    content += '<div class="districts-list">';
    
    WORLD_MAP[gameState.currentCity].districts.forEach(district => {
        const isCurrentDistrict = district === gameState.currentDistrict;
        content += `
            <div class="district-option ${isCurrentDistrict ? 'current' : ''}" 
                 data-district="${district}" 
                 data-city="${gameState.currentCity}"
                 ${isCurrentDistrict ? 'disabled' : ''}>
                ${district} ${isCurrentDistrict ? '(current)' : ''}
            </div>
        `;
    });
    content += '</div>';
    
    // Other unlocked cities
    content += '<h3>Other Cities</h3>';
    content += '<div class="cities-list">';
    
    for (const city in WORLD_MAP) {
        if (city !== gameState.currentCity) {
            const isLocked = !WORLD_MAP[city].unlocked;
            content += `
                <div class="city-option ${isLocked ? 'locked' : ''}" 
                     data-city="${city}"
                     ${isLocked ? 'disabled' : ''}>
                    ${city} ${isLocked ? '🔒' : ''} 
                    ${isLocked ? `<span class="unlock-hint">(unlock at $10M)</span>` : ''}
                </div>
            `;
        }
    }
    content += '</div>';
    content += '</div>';
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners to district options
    document.querySelectorAll('.district-option:not([disabled])').forEach(option => {
        option.addEventListener('click', () => {
            travelToDistrict(option.dataset.district);
            closeModal();
        });
    });
    
    // Add event listeners to city options
    document.querySelectorAll('.city-option:not(.locked)').forEach(option => {
        option.addEventListener('click', () => {
            travelToCity(option.dataset.city);
            closeModal();
        });
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Travel to a different district
function travelToDistrict(district) {
    if (district !== gameState.currentDistrict) {
        gameState.currentDistrict = district;
        generateMarketPrices();
        updateLocationDisplay();
        updateMarketDisplay();
        addPlayerActionEvent(`You've traveled to ${district}.`);
        addDrugNewsEvent(`Market prices in ${district} have been updated.`);
    }
}

// Travel to a different city
function travelToCity(city) {
    if (city !== gameState.currentCity && WORLD_MAP[city].unlocked) {
        gameState.currentCity = city;
        gameState.currentDistrict = WORLD_MAP[city].districts[0];
        generateMarketPrices();
        updateLocationDisplay();
        updateMarketDisplay();
        addPlayerActionEvent(`You've traveled to ${city}, ${gameState.currentDistrict}.`);
        addDrugNewsEvent(`Market prices in ${city} reflect local supply and demand.`);
    }
}

// Unlock all cities in the world map
function unlockAllCities() {
    for (const city in WORLD_MAP) {
        WORLD_MAP[city].unlocked = true;
    }
    updateUnlockedCities();
    addDrugNewsEvent("Breaking News: Global markets are now open to your operation!");
}

// Show buy modal for a product
function showBuyModal(productName) {
    const price = gameState.market[productName];
    const maxAffordable = Math.floor(gameState.cash / price);
    const productInfo = GAME.PRODUCTS.find(p => p.name === productName);
    const weightPerUnit = productInfo ? productInfo.weight : 1;
    const spaceLeft = gameState.inventory.space.max - gameState.inventory.space.used;
    const maxFitInInventory = Math.floor(spaceLeft / weightPerUnit);
    const maxPurchase = Math.min(maxAffordable, maxFitInInventory);
    
    DOM.modalTitle.textContent = `Buy ${productName}`;
    
    let content = `
        <div class="buy-modal">
            <p>Current price: $${formatMoney(price)}</p>
            <p>You can afford: ${maxAffordable}</p>
            <p>Inventory space available: ${spaceLeft} (can fit ${maxFitInInventory})</p>
            <p>Weight per unit: ${weightPerUnit}</p>
            
            <div class="quantity-selector">
                <label for="buy-quantity">Quantity to buy:</label>
                <input type="number" id="buy-quantity" min="1" max="${maxPurchase}" value="1">
            </div>
            
            <div class="total-cost">
                Total cost: $<span id="total-buy-cost">${formatMoney(price)}</span>
            </div>
            
            <button id="confirm-buy" ${maxPurchase <= 0 ? 'disabled' : ''}>
                Confirm Purchase
            </button>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    const quantityInput = document.getElementById('buy-quantity');
    const totalCostSpan = document.getElementById('total-buy-cost');
    const confirmButton = document.getElementById('confirm-buy');
    
    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 0;
        totalCostSpan.textContent = formatMoney(quantity * price);
    });
    
    confirmButton.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value) || 0;
        if (quantity > 0 && quantity <= maxPurchase) {
            buyProduct(productName, quantity);
            closeModal();
        }
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Execute a product purchase
function buyProduct(productName, quantity) {
    const price = gameState.market[productName];
    const totalCost = price * quantity;
    
    if (gameState.cash >= totalCost) {
        // Update cash
        gameState.cash -= totalCost;
        
        // Update inventory
        if (!gameState.inventory.items[productName]) {
            gameState.inventory.items[productName] = 0;
        }
        gameState.inventory.items[productName] += quantity;
        
        // Update inventory space
        const productInfo = GAME.PRODUCTS.find(p => p.name === productName);
        const weightPerUnit = productInfo ? productInfo.weight : 1;
        gameState.inventory.space.used += quantity * weightPerUnit;
        
        // Update displays
        updatePlayerStats();
        updateInventoryDisplay();
        updateMarketDisplay();
        
        // Add event
        addPlayerActionEvent(`Bought ${quantity} ${productName} for $${formatMoney(totalCost)}.`);
    }
}

// Show sell modal for a product
function showSellModal(productName) {
    const price = gameState.market[productName];
    const quantityOwned = gameState.inventory.items[productName] || 0;
    
    DOM.modalTitle.textContent = `Sell ${productName}`;
    
    let content = `
        <div class="sell-modal">
            <p>Current price: $${formatMoney(price || 0)}</p>
            <p>You own: ${quantityOwned}</p>
            
            <div class="quantity-selector">
                <label for="sell-quantity">Quantity to sell:</label>
                <input type="number" id="sell-quantity" min="1" max="${quantityOwned}" value="1">
            </div>
            
            <div class="total-value">
                Total value: $<span id="total-sell-value">${formatMoney(price || 0)}</span>
            </div>
            
            <button id="confirm-sell" ${quantityOwned <= 0 || !price ? 'disabled' : ''}>
                Confirm Sale
            </button>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    const quantityInput = document.getElementById('sell-quantity');
    const totalValueSpan = document.getElementById('total-sell-value');
    const confirmButton = document.getElementById('confirm-sell');
    
    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 0;
        totalValueSpan.textContent = formatMoney(quantity * (price || 0));
    });
    
    confirmButton.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value) || 0;
        if (quantity > 0 && quantity <= quantityOwned) {
            sellProduct(productName, quantity);
            closeModal();
        }
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Execute a product sale
function sellProduct(productName, quantity) {
    const price = gameState.market[productName];
    const totalValue = price * quantity;
    
    // Update cash
    gameState.cash += totalValue;
    
    // Update inventory
    gameState.inventory.items[productName] -= quantity;
    if (gameState.inventory.items[productName] <= 0) {
        delete gameState.inventory.items[productName];
    }
    
    // Update inventory space
    const productInfo = GAME.PRODUCTS.find(p => p.name === productName);
    const weightPerUnit = productInfo ? productInfo.weight : 1;
    gameState.inventory.space.used -= quantity * weightPerUnit;
    
    // Update displays
    updatePlayerStats();
    updateInventoryDisplay();
    updateMarketDisplay();
    
    // Add event
    addPlayerActionEvent(`Sold ${quantity} ${productName} for $${formatMoney(totalValue)}.`);
}

// Show loan shark modal
function showLoanSharkModal() {
    DOM.modalTitle.textContent = "Loan Shark";
    
    let content = `
        <div class="loan-shark-modal">
            <p>Current debt: $${formatMoney(gameState.debt)}</p>
            <p>Interest rate: ${GAME.INITIAL.INTEREST_RATE * 100}% per day</p>
            
            <div class="loan-options">
                <div class="borrow-section">
                    <h3>Borrow Money</h3>
                    <div class="input-group">
                        <label for="borrow-amount">Amount to borrow:</label>
                        <input type="number" id="borrow-amount" min="100" step="100" value="1000">
                    </div>
                    <button id="confirm-borrow">Borrow</button>
                </div>
                
                <div class="repay-section">
                    <h3>Repay Debt</h3>
                    <div class="input-group">
                        <label for="repay-amount">Amount to repay:</label>
                        <input type="number" id="repay-amount" min="100" max="${gameState.cash}" step="100" value="${Math.min(1000, gameState.cash)}">
                    </div>
                    <button id="confirm-repay" ${gameState.cash <= 0 ? 'disabled' : ''}>Repay</button>
                </div>
            </div>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    document.getElementById('confirm-borrow').addEventListener('click', () => {
        const amount = parseInt(document.getElementById('borrow-amount').value) || 0;
        if (amount >= 100) {
            borrowMoney(amount);
            closeModal();
        }
    });
    
    document.getElementById('confirm-repay').addEventListener('click', () => {
        const amount = parseInt(document.getElementById('repay-amount').value) || 0;
        if (amount > 0 && amount <= gameState.cash) {
            repayDebt(amount);
            closeModal();
        }
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Borrow money from the loan shark
function borrowMoney(amount) {
    gameState.cash += amount;
    gameState.debt += amount;
    
    updatePlayerStats();
    addPlayerActionEvent(`Borrowed $${formatMoney(amount)} from the Loan Shark. Your debt is now $${formatMoney(gameState.debt)}.`);
}

// Repay debt to the loan shark
function repayDebt(amount) {
    const actualRepayment = Math.min(amount, gameState.debt);
    
    gameState.cash -= actualRepayment;
    gameState.debt -= actualRepayment;
    
    updatePlayerStats();
    
    addPlayerActionEvent(`Repaid $${formatMoney(actualRepayment)} to the Loan Shark. Your debt is now $${formatMoney(gameState.debt)}.`);
    
    if (gameState.debt === 0) {
        addPlayerActionEvent("You've paid off your debt completely!");
    }
}

// Show bank modal
function showBankModal() {
    DOM.modalTitle.textContent = "Bank";
    
    let content = `
        <div class="bank-modal">
            <p>Account balance: $${formatMoney(gameState.bankAccount)}</p>
            <p>Interest rate: 2% per day</p>
            
            <div class="bank-options">
                <div class="deposit-section">
                    <h3>Deposit Money</h3>
                    <div class="input-group">
                        <label for="deposit-amount">Amount to deposit:</label>
                        <input type="number" id="deposit-amount" min="100" max="${gameState.cash}" step="100" value="${Math.min(1000, gameState.cash)}">
                    </div>
                    <button id="confirm-deposit" ${gameState.cash <= 0 ? 'disabled' : ''}>Deposit</button>
                </div>
                
                <div class="withdraw-section">
                    <h3>Withdraw Money</h3>
                    <div class="input-group">
                        <label for="withdraw-amount">Amount to withdraw:</label>
                        <input type="number" id="withdraw-amount" min="100" max="${gameState.bankAccount}" step="100" value="${Math.min(1000, gameState.bankAccount)}">
                    </div>
                    <button id="confirm-withdraw" ${gameState.bankAccount <= 0 ? 'disabled' : ''}>Withdraw</button>
                </div>
            </div>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    document.getElementById('confirm-deposit').addEventListener('click', () => {
        const amount = parseInt(document.getElementById('deposit-amount').value) || 0;
        if (amount > 0 && amount <= gameState.cash) {
            depositMoney(amount);
            closeModal();
        }
    });
    
    document.getElementById('confirm-withdraw').addEventListener('click', () => {
        const amount = parseInt(document.getElementById('withdraw-amount').value) || 0;
        if (amount > 0 && amount <= gameState.bankAccount) {
            withdrawMoney(amount);
            closeModal();
        }
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Deposit money in the bank
function depositMoney(amount) {
    gameState.cash -= amount;
    gameState.bankAccount += amount;
    
    updatePlayerStats();
    addPlayerActionEvent(`Deposited $${formatMoney(amount)} in the bank. Your balance is now $${formatMoney(gameState.bankAccount)}.`);
}

// Withdraw money from the bank
function withdrawMoney(amount) {
    gameState.bankAccount -= amount;
    gameState.cash += amount;
    
    updatePlayerStats();
    addPlayerActionEvent(`Withdrew $${formatMoney(amount)} from the bank. Your balance is now $${formatMoney(gameState.bankAccount)}.`);
}

// End the current day and proceed to the next
function endDay() {
    // Apply interest to debt
    const interestAmount = Math.floor(gameState.debt * GAME.INITIAL.INTEREST_RATE);
    gameState.debt += interestAmount;
    
    // Apply interest to bank account
    const bankInterest = Math.floor(gameState.bankAccount * 0.02);
    gameState.bankAccount += bankInterest;
    
    // Increment the day
    gameState.day++;
    
    // Check if game is over
    if (gameState.day > gameState.dayLimit && gameState.dayLimit !== Infinity) {
        endGame();
        return;
    }
    
    // Generate random events
    generateRandomEvents();
    
    // Generate new market prices
    generateMarketPrices();
    
    // Update displays
    updatePlayerStats();
    updateMarketDisplay();
    
    // Add events to log
    addPlayerActionEvent(`Day ${gameState.day}: A new day begins.`);
    
    if (interestAmount > 0) {
        addPlayerActionEvent(`Interest added to debt: $${formatMoney(interestAmount)}.`);
    }
    
    if (bankInterest > 0) {
        addPlayerActionEvent(`Interest earned in bank: $${formatMoney(bankInterest)}.`);
    }
    
    addDrugNewsEvent(`Market prices have updated for day ${gameState.day}.`);
}

// Generate random events for the day
function generateRandomEvents() {
    // Chance for cop bust
    if (Math.random() < GAME.EVENTS.POLICE_BUST_CHANCE) {
        policeBust();
    }
    
    // Chance for price spike on a random product
    if (Math.random() < GAME.EVENTS.PRICE_CHANGE_CHANCE) {
        priceSpike();
    }
    
    // Chance for product scarcity
    if (Math.random() < GAME.EVENTS.PRODUCT_SCARCITY_CHANCE) {
        productScarcity();
    }
}

// Police bust event
function policeBust() {
    // Get random product from inventory
    const productsOwned = Object.keys(gameState.inventory.items);
    if (productsOwned.length === 0) return;
    
    const randomProduct = productsOwned[Math.floor(Math.random() * productsOwned.length)];
    const quantity = gameState.inventory.items[randomProduct];
    const lostQuantity = Math.ceil(quantity * (0.3 + Math.random() * 0.4)); // Lose 30-70% of stock
    
    // Update inventory
    gameState.inventory.items[randomProduct] -= lostQuantity;
    if (gameState.inventory.items[randomProduct] <= 0) {
        delete gameState.inventory.items[randomProduct];
    }
    
    // Update inventory space
    const productInfo = GAME.PRODUCTS.find(p => p.name === randomProduct);
    const weightPerUnit = productInfo ? productInfo.weight : 1;
    gameState.inventory.space.used -= lostQuantity * weightPerUnit;
    
    // Update displays
    updateInventoryDisplay();
    
    // Add event
    addDrugNewsEvent(`🚨 Police bust! Authorities raided ${gameState.currentDistrict}.`);
    addPlayerActionEvent(`You lost ${lostQuantity} ${randomProduct} in the police raid.`);
}

// Price spike event
function priceSpike() {
    // Choose random product
    const productsArray = GAME.PRODUCTS.map(p => p.name);
    const randomProduct = productsArray[Math.floor(Math.random() * productsArray.length)];
    
    // Get the base price range
    const productInfo = GAME.PRODUCTS.find(p => p.name === randomProduct);
    const priceRange = productInfo.maxPrice - productInfo.minPrice;
    
    // Spike the price by 2-5x
    const spikeMultiplier = 2 + Math.floor(Math.random() * 4);
    const newPrice = productInfo.maxPrice + Math.floor(priceRange * (spikeMultiplier - 1) * Math.random());
    
    // Set the new price
    gameState.market[randomProduct] = newPrice;
    
    // Add event
    addDrugNewsEvent(`💰 Price spike! ${randomProduct} prices have soared to $${formatMoney(newPrice)} due to a supply shortage.`);
}

// Product scarcity event
function productScarcity() {
    // Choose random product
    const productsArray = GAME.PRODUCTS.map(p => p.name);
    const randomProduct = productsArray[Math.floor(Math.random() * productsArray.length)];
    
    // Remove it from the market
    delete gameState.market[randomProduct];
    
    // Add event
    addDrugNewsEvent(`⚠️ Product shortage! ${randomProduct} is unavailable in ${gameState.currentDistrict} today due to a major bust.`);
}

// End the game and show final score
function endGame() {
    // Calculate final score
    const inventoryValue = calculateInventoryValue();
    const finalNetWorth = gameState.cash + inventoryValue + gameState.bankAccount - gameState.debt;
    
    DOM.modalTitle.textContent = "Game Over";
    
    let content = `
        <div class="game-over-modal">
            <h2>Final Results - Day ${gameState.day}</h2>
            
            <div class="final-stats">
                <p>Final Rank: ${gameState.rank.name}</p>
                <p>Cash: $${formatMoney(gameState.cash)}</p>
                <p>Inventory Value: $${formatMoney(inventoryValue)}</p>
                <p>Bank Account: $${formatMoney(gameState.bankAccount)}</p>
                <p>Debt: $${formatMoney(gameState.debt)}</p>
                <p class="net-worth">Net Worth: $${formatMoney(finalNetWorth)}</p>
            </div>
            
            <button id="new-game-btn">Play Again</button>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listener to new game button
    document.getElementById('new-game-btn').addEventListener('click', () => {
        closeModal();
        DOM.introScreen.style.display = 'flex';
        DOM.gameContainer.style.display = 'none';
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Add an event to the drug news log
function addDrugNewsEvent(message) {
    const event = document.createElement('div');
    event.classList.add('event');
    event.textContent = message;
    
    // Add to the game state events array
    gameState.events.drugNews.unshift(message);
    if (gameState.events.drugNews.length > 50) gameState.events.drugNews.pop();
    
    // Add to the DOM
    DOM.drugNewsLog.insertBefore(event, DOM.drugNewsLog.firstChild);
    
    // Limit the number of events shown
    if (DOM.drugNewsLog.children.length > 15) {
        DOM.drugNewsLog.removeChild(DOM.drugNewsLog.lastChild);
    }
}

// Add an event to the player actions log
function addPlayerActionEvent(message) {
    const event = document.createElement('div');
    event.classList.add('event');
    event.textContent = message;
    
    // Add to the game state events array
    gameState.events.playerActions.unshift(message);
    if (gameState.events.playerActions.length > 50) gameState.events.playerActions.pop();
    
    // Add to the DOM
    DOM.playerActionsLog.insertBefore(event, DOM.playerActionsLog.firstChild);
    
    // Limit the number of events shown
    if (DOM.playerActionsLog.children.length > 15) {
        DOM.playerActionsLog.removeChild(DOM.playerActionsLog.lastChild);
    }
}

// Close the modal
function closeModal() {
    DOM.modalContainer.classList.add('hidden');
}

// Format money values with commas
function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}