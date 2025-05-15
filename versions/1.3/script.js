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

// Enhanced events configuration
const ENHANCED_EVENTS = {
    PRICE_CHANGE_CHANCE: 0.9,        // Increased from 0.8
    POLICE_BUST_CHANCE: 0.1,         // Doubled from 0.05
    PRODUCT_SCARCITY_CHANCE: 0.3,    // Increased from 0.2
    BULK_DEAL_CHANCE: 0.15,          // Increased from 0.1
    PRICE_CRASH_CHANCE: 0.2,         // New event
    MARKET_FLOOD_CHANCE: 0.15,       // New event
    HIGH_DEMAND_CHANCE: 0.25,        // New event
    GANG_WAR_CHANCE: 0.05            // New event
};

// Storage options configuration
const STORAGE_OPTIONS = {
    "Small Safehouse": {
        description: "A small apartment to store your goods",
        capacity: 200,
        cost: 50000,
        requiredRank: 1, // Local Supplier
        locations: "all"
    },
    "Warehouse": {
        description: "A medium-sized storage facility",
        capacity: 500,
        cost: 250000,
        requiredRank: 2, // District Boss
        locations: "all"
    },
    "Secure Compound": {
        description: "A large secure compound with guards",
        capacity: 1000,
        cost: 1000000,
        requiredRank: 3, // City Boss
        locations: "all"
    },
    "Private Island": {
        description: "An offshore location for maximum storage",
        capacity: 5000,
        cost: 10000000,
        requiredRank: 5, // International Kingpin
        locations: "all"
    }
};

// Police system configuration
const POLICE_SYSTEM = {
    // Heat level affects police encounter probability
    heatLevel: 0,  // 0-100 scale
    
    // Different types of encounters
    encounters: {
        SEARCH: {
            name: "Police Search",
            description: "Police are searching suspicious individuals.",
            heatThreshold: 20,
            successChance: 0.6,  // Chance of avoiding consequences
            consequences: {
                inventory: 0.3,   // Lose 30% of inventory if caught
                cash: 0.1        // Lose 10% of cash as bribe/fine if caught
            }
        },
        RAID: {
            name: "Police Raid",
            description: "Police are conducting targeted raids.",
            heatThreshold: 50,
            successChance: 0.4,
            consequences: {
                inventory: 0.6,   // Lose 60% of inventory if caught
                cash: 0.2        // Lose 20% of cash as fine
            }
        },
        BUST: {
            name: "Major Bust Operation",
            description: "Police are conducting a major operation.",
            heatThreshold: 80,
            successChance: 0.2,
            consequences: {
                inventory: 1.0,   // Lose all inventory
                cash: 0.5,       // Lose 50% of cash as fine/legal fees
                jailTime: 3      // Lose 3 days in jail
            }
        }
    },
    
    // Districts have different police activity levels
    districtActivity: {
        "high": 1.5,    // Wealthy areas, financial districts
        "medium": 1.0,  // Standard areas
        "low": 0.5      // Poor areas, slums
    }
};

// Bank account types
const BANK_ACCOUNTS = {
    "Standard Account": {
        description: "A basic bank account",
        interestRate: 0.02, // 2% per day
        depositFee: 0,
        withdrawalFee: 0,
        minimumBalance: 0,
        requiredRank: 0, // Available to all
        unlocked: true
    },
    "Premium Account": {
        description: "Higher interest rates with minimum balance",
        interestRate: 0.03, // 3% per day
        depositFee: 0,
        withdrawalFee: 0.01, // 1% fee
        minimumBalance: 50000,
        requiredRank: 1, // Local Supplier
        unlocked: false
    },
    "Offshore Account": {
        description: "Hide your money from authorities with this untraceable account",
        interestRate: 0.01, // Lower interest
        depositFee: 0.05, // 5% deposit fee
        withdrawalFee: 0.05, // 5% withdrawal fee
        minimumBalance: 100000,
        requiredRank: 3, // City Boss
        unlocked: false,
        policeProtection: true // Money is safe from police
    },
    "Cryptocurrency Wallet": {
        description: "Highly volatile but potentially lucrative digital currency",
        interestRate: 0.05, // Base 5% rate
        volatility: 0.10, // +/- 10% possible daily fluctuation
        depositFee: 0.02,
        withdrawalFee: 0.02,
        minimumBalance: 200000,
        requiredRank: 4, // Regional Kingpin
        unlocked: false,
        policeProtection: true
    }
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
    DOM.endDayBtn.addEventListener('click', enhancedEndDay);
    
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

    // Add enhanced properties to gameState
    enhanceGameState();
    
    // Generate initial market prices
    generateMarketPrices();
    
    // Update all displays
    updatePlayerStats();
    updateLocationDisplay();
    updateInventoryDisplay();
    updateMarketDisplay();
    updateUnlockedCities();
    
    // Update the UI with new elements
    updateUI();

    // Set up enhanced event listeners
    setupEnhancedEventListeners();
    
    // Update heat display
    updateHeatDisplay();
    
    // Add initial event
    addPlayerActionEvent("Welcome to Dope Wars Global! You owe the Loan Shark $5,500. Start trading to make money!");
    addDrugNewsEvent("The local market is active. Check prices and start dealing!");
}

// Enhance gameState with new properties
function enhanceGameState() {
    // Add storage properties
    gameState.storage = {
        ownedProperties: {},
        totalCapacity: GAME.INITIAL.INVENTORY_SPACE
    };
    
    // Add police properties
    gameState.police = {
        heatLevel: 0,
        lastEncounter: 0,
        bribesGiven: 0
    };
    
    // Add enhanced banking
    gameState.banking = {
        accounts: {
            "Standard Account": {
                balance: 0,
                unlocked: true
            }
        },
        totalSavings: 0
    };
}

// Update UI with new elements
function updateUI() {
    // Add Storage button to actions panel
    const actionsPanel = document.getElementById('actions-panel');
    const storageBtn = document.createElement('button');
    storageBtn.id = 'storage-btn';
    storageBtn.textContent = 'Storage Options';
    actionsPanel.appendChild(storageBtn);
    
    // Add Heat Level indicator to player stats
    const playerStats = document.getElementById('player-stats');
    const heatDiv = document.createElement('div');
    heatDiv.id = 'heat';
    heatDiv.innerHTML = 'Heat: <span id="heat-value">0</span>';
    playerStats.appendChild(heatDiv);
    
    // Update DOM cache
    DOM.storageBtn = storageBtn;
    DOM.heatValue = document.getElementById('heat-value');
}

// Set up enhanced event listeners
function setupEnhancedEventListeners() {
    // Storage button
    if (DOM.storageBtn) {
        DOM.storageBtn.addEventListener('click', showStorageOptionsModal);
    }
    
    // Replace bank button functionality
    if (DOM.bankBtn) {
        DOM.bankBtn.removeEventListener('click', showBankModal);
        DOM.bankBtn.addEventListener('click', showEnhancedBankModal);
    }
}

// Update heat display
function updateHeatDisplay() {
    if (!DOM.heatValue) return;
    
    DOM.heatValue.textContent = Math.round(gameState.police.heatLevel);
    
    // Add visual indicator for heat level
    if (gameState.police.heatLevel > 70) {
        DOM.heatValue.className = 'high-heat';
    } else if (gameState.police.heatLevel > 40) {
        DOM.heatValue.className = 'medium-heat';
    } else {
        DOM.heatValue.className = '';
    }
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
    
    let bankTotal = gameState.bankAccount;
    
    // If using enhanced banking, calculate total from all accounts
    if (gameState.banking && gameState.banking.totalSavings !== undefined) {
        bankTotal = gameState.banking.totalSavings;
    }
    
    gameState.netWorth = gameState.cash + inventoryValue + bankTotal - gameState.debt;
    
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
            enhancedTravelToDistrict(option.dataset.district);
            closeModal();
        });
    });
    
    // Add event listeners to city options
    document.querySelectorAll('.city-option:not(.locked)').forEach(option => {
        option.addEventListener('click', () => {
            enhancedTravelToCity(option.dataset.city);
            closeModal();
        });
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Travel to a different district (original function kept for reference)
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

// Enhanced travel to a different district - now advances time
function enhancedTravelToDistrict(district) {
    if (district !== gameState.currentDistrict) {
        gameState.currentDistrict = district;
        
        // Advance the day
        advanceDayForTravel();
        
        // Generate new market prices
        generateMarketPrices();
        updateLocationDisplay();
        updateMarketDisplay();
        
        addPlayerActionEvent(`You've traveled to ${district}.`);
        addDrugNewsEvent(`Market prices in ${district} have been updated.`);
    }
}

// Travel to a different city (original function kept for reference)
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

// Enhanced travel to a different city - now advances time
function enhancedTravelToCity(city) {
    if (city !== gameState.currentCity && WORLD_MAP[city].unlocked) {
        gameState.currentCity = city;
        gameState.currentDistrict = WORLD_MAP[city].districts[0];
        
        // Advance the day more for traveling to a different city
        advanceDayForTravel(true);
        
        // Generate new market prices
        generateMarketPrices();
        updateLocationDisplay();
        updateMarketDisplay();
        
        addPlayerActionEvent(`You've traveled to ${city}, ${gameState.currentDistrict}.`);
        addDrugNewsEvent(`Market prices in ${city} reflect local supply and demand.`);
    }
}

// Function to advance the day when traveling
function advanceDayForTravel(isCityTravel = false) {
    // City travel takes more time than district travel
    const daysToAdvance = isCityTravel ? 2 : 1;
    
    for (let i = 0; i < daysToAdvance; i++) {
        // Apply interest to debt
        const interestAmount = Math.floor(gameState.debt * GAME.INITIAL.INTEREST_RATE);
        gameState.debt += interestAmount;
        
        // Apply interest to bank accounts
        applyBankInterest();
        
        // Apply heat decay for police system
        decreaseHeatLevel();
        
        // Increment the day
        gameState.day++;
        
        // Check if game is over after day advancement
        if (gameState.day > gameState.dayLimit && gameState.dayLimit !== Infinity) {
            endGame();
            return;
        }
        
        // Add events to log
        if (i === 0) { // Only add these messages once
            addPlayerActionEvent(`Day ${gameState.day}: Travel day.`);
            
            if (interestAmount > 0) {
                addPlayerActionEvent(`Interest added to debt: $${formatMoney(interestAmount)}.`);
            }
        }
    }
    
    // Update displays
    updatePlayerStats();
    updateHeatDisplay();
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
        
        // Increase heat level based on transaction size
        increaseHeatLevel(totalCost);
        updateHeatDisplay();
        
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
    
    // Increase heat level based on transaction size
    increaseHeatLevel(totalValue);
    updateHeatDisplay();
    
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

// Original bank modal (kept for reference)
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

// Show enhanced bank modal
function showEnhancedBankModal() {
    DOM.modalTitle.textContent = "Banking";
    
    let content = `
        <div class="bank-modal">
            <div class="bank-accounts-summary">
                <h3>Your Accounts</h3>
                <p>Cash on Hand: $${formatMoney(gameState.cash)}</p>
                <div class="accounts-list">
    `;
    
    // List all accounts
    for (const [accountName, accountInfo] of Object.entries(BANK_ACCOUNTS)) {
        const playerAccount = gameState.banking.accounts[accountName] || { balance: 0, unlocked: false };
        
        if (playerAccount.unlocked || shouldUnlockAccount(accountName)) {
            // Unlock account if player meets requirements
            if (!playerAccount.unlocked) {
                unlockBankAccount(accountName);
                playerAccount.unlocked = true;
                addPlayerActionEvent(`You've unlocked a new bank account: ${accountName}!`);
            }
            
            content += `
                <div class="account-item">
                    <div class="account-header">
                        <h4>${accountName}</h4>
                        <p class="account-balance">$${formatMoney(playerAccount.balance)}</p>
                    </div>
                    <p class="account-description">${accountInfo.description}</p>
                    <p class="account-details">
                        Interest: ${accountInfo.interestRate * 100}%${accountInfo.volatility ? 
                          ` (±${accountInfo.volatility * 100}% volatility)` : ''}
                    </p>
                    <div class="account-actions">
                        <button 
                            class="account-deposit-btn" 
                            data-account="${accountName}"
                            ${gameState.cash <= 0 ? 'disabled' : ''}
                        >Deposit</button>
                        <button 
                            class="account-withdraw-btn" 
                            data-account="${accountName}"
                            ${playerAccount.balance <= 0 ? 'disabled' : ''}
                        >Withdraw</button>
                    </div>
                </div>
            `;
        } else if (GAME.RANKS.indexOf(gameState.rank) >= accountInfo.requiredRank) {
            // Show locked account that player qualifies for
            content += `
                <div class="account-item locked-account">
                    <div class="account-header">
                        <h4>${accountName} 🔒</h4>
                    </div>
                    <p class="account-description">${accountInfo.description}</p>
                    <p class="account-unlock">
                        Requires $${formatMoney(accountInfo.minimumBalance)} minimum balance to open
                    </p>
                    <div class="account-actions">
                        <button 
                            class="account-unlock-btn" 
                            data-account="${accountName}"
                            ${gameState.cash < accountInfo.minimumBalance ? 'disabled' : ''}
                        >Open Account ($${formatMoney(accountInfo.minimumBalance)})</button>
                    </div>
                </div>
            `;
        }
    }
    
    content += `
                </div>
            </div>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners for deposit buttons
    document.querySelectorAll('.account-deposit-btn:not([disabled])').forEach(button => {
        button.addEventListener('click', () => {
            showDepositModal(button.dataset.account);
        });
    });
    
    // Add event listeners for withdrawal buttons
    document.querySelectorAll('.account-withdraw-btn:not([disabled])').forEach(button => {
        button.addEventListener('click', () => {
            showWithdrawModal(button.dataset.account);
        });
    });
    
    // Add event listeners for unlock buttons
    document.querySelectorAll('.account-unlock-btn:not([disabled])').forEach(button => {
        button.addEventListener('click', () => {
            unlockBankAccount(button.dataset.account, true);
            closeModal();
            showEnhancedBankModal(); // Refresh the bank modal
        });
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Show deposit modal for a specific account
function showDepositModal(accountName) {
    const accountInfo = BANK_ACCOUNTS[accountName];
    const currentBalance = gameState.banking.accounts[accountName].balance;
    const depositFee = accountInfo.depositFee || 0;
    
    DOM.modalTitle.textContent = `Deposit to ${accountName}`;
    
    let content = `
        <div class="deposit-modal">
            <p>Current Balance: $${formatMoney(currentBalance)}</p>
            <p>Cash Available: $${formatMoney(gameState.cash)}</p>
            ${depositFee > 0 ? `<p>Deposit Fee: ${depositFee * 100}%</p>` : ''}
            
            <div class="amount-input">
                <label for="deposit-amount">Amount to deposit:</label>
                <input type="number" id="deposit-amount" min="100" max="${gameState.cash}" step="100" value="${Math.min(1000, gameState.cash)}">
            </div>
            
            ${depositFee > 0 ? 
              `<p>Fee amount: $<span id="fee-amount">${formatMoney(Math.min(1000, gameState.cash) * depositFee)}</span></p>` : ''}
            <p>Final deposit: $<span id="final-deposit">${formatMoney(Math.min(1000, gameState.cash) * (1 - depositFee))}</span></p>
            
            <button id="confirm-deposit">Confirm Deposit</button>
        </div>
    `;
    
    // Replace the current modal content
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    const depositInput = document.getElementById('deposit-amount');
    const finalDepositSpan = document.getElementById('final-deposit');
    const feeAmountSpan = document.getElementById('fee-amount');
    
    depositInput.addEventListener('input', () => {
        const amount = parseInt(depositInput.value) || 0;
        const fee = Math.round(amount * depositFee);
        const finalDeposit = amount - fee;
        
        if (feeAmountSpan) {
            feeAmountSpan.textContent = formatMoney(fee);
        }
        finalDepositSpan.textContent = formatMoney(finalDeposit);
    });
    
    document.getElementById('confirm-deposit').addEventListener('click', () => {
        const amount = parseInt(depositInput.value) || 0;
        if (amount > 0 && amount <= gameState.cash) {
            depositToAccount(accountName, amount);
            closeModal();
            showEnhancedBankModal(); // Return to the bank modal
        }
    });
}

// Show withdraw modal for a specific account
function showWithdrawModal(accountName) {
    const accountInfo = BANK_ACCOUNTS[accountName];
    const currentBalance = gameState.banking.accounts[accountName].balance;
    const withdrawalFee = accountInfo.withdrawalFee || 0;
    
    DOM.modalTitle.textContent = `Withdraw from ${accountName}`;
    
    let content = `
        <div class="withdraw-modal">
            <p>Current Balance: $${formatMoney(currentBalance)}</p>
            ${withdrawalFee > 0 ? `<p>Withdrawal Fee: ${withdrawalFee * 100}%</p>` : ''}
            
            <div class="amount-input">
                <label for="withdraw-amount">Amount to withdraw:</label>
                <input type="number" id="withdraw-amount" min="100" max="${currentBalance}" step="100" value="${Math.min(1000, currentBalance)}">
            </div>
            
            ${withdrawalFee > 0 ? 
              `<p>Fee amount: $<span id="fee-amount">${formatMoney(Math.min(1000, currentBalance) * withdrawalFee)}</span></p>` : ''}
            <p>You will receive: $<span id="final-withdraw">${formatMoney(Math.min(1000, currentBalance) * (1 - withdrawalFee))}</span></p>
            
            <button id="confirm-withdraw">Confirm Withdrawal</button>
        </div>
    `;
    
    // Replace the current modal content
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    const withdrawInput = document.getElementById('withdraw-amount');
    const finalWithdrawSpan = document.getElementById('final-withdraw');
    const feeAmountSpan = document.getElementById('fee-amount');
    
    withdrawInput.addEventListener('input', () => {
        const amount = parseInt(withdrawInput.value) || 0;
        const fee = Math.round(amount * withdrawalFee);
        const finalWithdraw = amount - fee;
        
        if (feeAmountSpan) {
            feeAmountSpan.textContent = formatMoney(fee);
        }
        finalWithdrawSpan.textContent = formatMoney(finalWithdraw);
    });
    
    document.getElementById('confirm-withdraw').addEventListener('click', () => {
        const amount = parseInt(withdrawInput.value) || 0;
        if (amount > 0 && amount <= currentBalance) {
            withdrawFromAccount(accountName, amount);
            closeModal();
            showEnhancedBankModal(); // Return to the bank modal
        }
    });
}

// Deposit money to a specific account
function depositToAccount(accountName, amount) {
    if (amount <= 0 || amount > gameState.cash) return;
    
    const accountInfo = BANK_ACCOUNTS[accountName];
    const depositFee = accountInfo.depositFee || 0;
    
    const fee = Math.round(amount * depositFee);
    const finalDeposit = amount - fee;
    
    // Update cash
    gameState.cash -= amount;
    
    // Update account balance
    gameState.banking.accounts[accountName].balance += finalDeposit;
    
    // Update total savings
    updateTotalSavings();
    
    // Update displays
    updatePlayerStats();
    
    // Add event
    addPlayerActionEvent(`Deposited $${formatMoney(amount)} to ${accountName}${depositFee > 0 ? ` (Fee: $${formatMoney(fee)})` : ''}.`);
}

// Withdraw money from a specific account
function withdrawFromAccount(accountName, amount) {
    const accountBalance = gameState.banking.accounts[accountName].balance;
    if (amount <= 0 || amount > accountBalance) return;
    
    const accountInfo = BANK_ACCOUNTS[accountName];
    const withdrawalFee = accountInfo.withdrawalFee || 0;
    
    const fee = Math.round(amount * withdrawalFee);
    const finalWithdraw = amount - fee;
    
    // Update account balance
    gameState.banking.accounts[accountName].balance -= amount;
    
    // Update cash
    gameState.cash += finalWithdraw;
    
    // Update total savings
    updateTotalSavings();
    
    // Update displays
    updatePlayerStats();
    
    // Add event
    addPlayerActionEvent(`Withdrew $${formatMoney(amount)} from ${accountName}${withdrawalFee > 0 ? ` (Fee: $${formatMoney(fee)})` : ''}.`);
}

// Check if an account should be unlocked
function shouldUnlockAccount(accountName) {
    const accountInfo = BANK_ACCOUNTS[accountName];
    
    // Check if player meets rank requirement
    if (GAME.RANKS.indexOf(gameState.rank) < accountInfo.requiredRank) {
        return false;
    }
    
    // Check if player has enough cash to meet minimum balance
    if (gameState.cash < accountInfo.minimumBalance) {
        return false;
    }
    
    return true;
}

// Unlock a bank account
function unlockBankAccount(accountName, withInitialDeposit = false) {
    const accountInfo = BANK_ACCOUNTS[accountName];
    
    // Initialize account in player's banking data
    if (!gameState.banking.accounts[accountName]) {
        gameState.banking.accounts[accountName] = {
            balance: 0,
            unlocked: true
        };
    }
    
    // Make initial deposit if required
    if (withInitialDeposit && accountInfo.minimumBalance > 0) {
        // Deduct cash for minimum balance
        gameState.cash -= accountInfo.minimumBalance;
        
        // Add to account balance
        gameState.banking.accounts[accountName].balance = accountInfo.minimumBalance;
        
        // Add event
        addPlayerActionEvent(`Opened a new ${accountName} with an initial deposit of $${formatMoney(accountInfo.minimumBalance)}.`);
        
        // Update displays
        updatePlayerStats();
        updateTotalSavings();
    }
}

// Update total savings across all accounts
function updateTotalSavings() {
    let total = 0;
    
    for (const accountName in gameState.banking.accounts) {
        total += gameState.banking.accounts[accountName].balance;
    }
    
    gameState.banking.totalSavings = total;
}

// Deposit money in the bank (original function kept for reference)
function depositMoney(amount) {
    gameState.cash -= amount;
    gameState.bankAccount += amount;
    
    updatePlayerStats();
    addPlayerActionEvent(`Deposited $${formatMoney(amount)} in the bank. Your balance is now $${formatMoney(gameState.bankAccount)}.`);
}

// Withdraw money from the bank (original function kept for reference)
function withdrawMoney(amount) {
    gameState.bankAccount -= amount;
    gameState.cash += amount;
    
    updatePlayerStats();
    addPlayerActionEvent(`Withdrew $${formatMoney(amount)} from the bank. Your balance is now $${formatMoney(gameState.bankAccount)}.`);
}

// End the current day and proceed to the next (original function kept for reference)
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

// Enhanced end day function with all new features
function enhancedEndDay() {
    // Apply interest to debt
    const interestAmount = Math.floor(gameState.debt * GAME.INITIAL.INTEREST_RATE);
    gameState.debt += interestAmount;
    
    // Apply interest to bank accounts (new system)
    applyBankInterest();
    
    // Apply heat decay for police system
    decreaseHeatLevel();
    
    // Increment the day
    gameState.day++;
    
    // Check if game is over
    if (gameState.day > gameState.dayLimit && gameState.dayLimit !== Infinity) {
        endGame();
        return;
    }
    
    // Generate random events with enhanced system
    enhancedRandomEvents();
    
    // Check for police encounter
    checkPoliceEncounter();
    
    // Generate new market prices
    generateMarketPrices();
    
    // Update displays
    updatePlayerStats();
    updateMarketDisplay();
    updateHeatDisplay();
    
    // Add events to log
    addPlayerActionEvent(`Day ${gameState.day}: A new day begins.`);
    
    if (interestAmount > 0) {
        addPlayerActionEvent(`Interest added to debt: $${formatMoney(interestAmount)}.`);
    }
    
    addDrugNewsEvent(`Market prices have updated for day ${gameState.day}.`);
}

// Apply daily interest to all bank accounts
function applyBankInterest() {
    // Backward compatibility check
    if (!gameState.banking || !gameState.banking.accounts) {
        // Apply interest to the basic bank account
        const bankInterest = Math.floor(gameState.bankAccount * 0.02);
        gameState.bankAccount += bankInterest;
        
        if (bankInterest > 0) {
            addPlayerActionEvent(`Interest earned in bank: $${formatMoney(bankInterest)}.`);
        }
        
        return;
    }
    
    // Apply interest to each account
    for (const [accountName, accountData] of Object.entries(gameState.banking.accounts)) {
        if (accountData.balance > 0) {
            const accountInfo = BANK_ACCOUNTS[accountName];
            let interestRate = accountInfo.interestRate;
            
            // Apply volatility for cryptocurrency
            if (accountInfo.volatility) {
                const volatilityAdjustment = (Math.random() * 2 - 1) * accountInfo.volatility;
                interestRate += volatilityAdjustment;
                // Ensure interest rate doesn't go too negative
                interestRate = Math.max(-0.05, interestRate);
            }
            
            const interestAmount = Math.floor(accountData.balance * interestRate);
            accountData.balance += interestAmount;
            
            // Add event if interest is significant
            if (Math.abs(interestAmount) >= 100) {
                if (interestAmount > 0) {
                    addPlayerActionEvent(`Earned $${formatMoney(interestAmount)} interest in your ${accountName}.`);
                } else {
                    addPlayerActionEvent(`Lost $${formatMoney(Math.abs(interestAmount))} in your ${accountName} due to market volatility.`);
                }
            }
        }
    }
    
    // Update total savings
    updateTotalSavings();
}

// Generate random events with enhanced system
function enhancedRandomEvents() {
    // Police bust chance
    if (Math.random() < ENHANCED_EVENTS.POLICE_BUST_CHANCE) {
        policeBust();
    }
    
    // Price spike chance
    if (Math.random() < ENHANCED_EVENTS.PRICE_CHANGE_CHANCE) {
        priceSpike();
    }
    
    // Product scarcity chance
    if (Math.random() < ENHANCED_EVENTS.PRODUCT_SCARCITY_CHANCE) {
        productScarcity();
    }
    
    // Price crash chance (new)
    if (Math.random() < ENHANCED_EVENTS.PRICE_CRASH_CHANCE) {
        priceCrash();
    }
    
    // Market flood chance (new)
    if (Math.random() < ENHANCED_EVENTS.MARKET_FLOOD_CHANCE) {
        marketFlood();
    }
    
    // High demand chance (new)
    if (Math.random() < ENHANCED_EVENTS.HIGH_DEMAND_CHANCE) {
        highDemand();
    }
    
    // Gang war chance (new)
    if (Math.random() < ENHANCED_EVENTS.GANG_WAR_CHANCE) {
        gangWar();
    }
}

// Price crash event - the opposite of a price spike
function priceCrash() {
    // Choose random product
    const productsArray = GAME.PRODUCTS.map(p => p.name);
    const randomProduct = productsArray[Math.floor(Math.random() * productsArray.length)];
    
    // Get the base price range
    const productInfo = GAME.PRODUCTS.find(p => p.name === randomProduct);
    
    // Crash the price to 30-60% of minimum price
    const crashMultiplier = 0.3 + Math.random() * 0.3;
    const newPrice = Math.round(productInfo.minPrice * crashMultiplier);
    
    // Set the new price
    gameState.market[randomProduct] = newPrice;
    
    // Add event
    addDrugNewsEvent(`📉 Price crash! ${randomProduct} prices have plummeted to $${formatMoney(newPrice)} due to market flooding.`);
}

// Market flood event - makes a product very cheap and abundant
function marketFlood() {
    // Choose random product
    const productsArray = GAME.PRODUCTS.map(p => p.name);
    const randomProduct = productsArray[Math.floor(Math.random() * productsArray.length)];
    
    // Get the base price range
    const productInfo = GAME.PRODUCTS.find(p => p.name === randomProduct);
    
    // Lower the price significantly (20-40% of minimum)
    const floodPrice = Math.round(productInfo.minPrice * (0.2 + Math.random() * 0.2));
    
    // Set the new price
    gameState.market[randomProduct] = floodPrice;
    
    // Add event
    addDrugNewsEvent(`🌊 Market flood! A massive shipment of ${randomProduct} has flooded ${gameState.currentCity}, dropping prices to $${formatMoney(floodPrice)}.`);
}

// High demand event - raises prices of all products in an area
function highDemand() {
    const demandMultiplier = 1.5 + Math.random();  // 1.5-2.5x price increase
    let affectedProducts = [];
    
    // Apply price increase to all available products
    for (const product in gameState.market) {
        const newPrice = Math.round(gameState.market[product] * demandMultiplier);
        gameState.market[product] = newPrice;
        affectedProducts.push(product);
    }
    
    // Add event
    addDrugNewsEvent(`🔥 High demand in ${gameState.currentDistrict}! Prices have increased for all available products due to high local demand.`);
    
    // Update market display
    updateMarketDisplay();
}

// Gang war event - affects prices and can result in injury
function gangWar() {
    // Increase some prices due to territory disputes
    let affectedProducts = [];
    const productKeys = Object.keys(gameState.market);
    
    // Select 1-3 random products to affect
    const numAffected = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numAffected && i < productKeys.length; i++) {
        const randomIndex = Math.floor(Math.random() * productKeys.length);
        const product = productKeys[randomIndex];
        
        // Remove this product from future consideration
        productKeys.splice(randomIndex, 1);
        
        // Increase price by 30-100%
        const warMultiplier = 1.3 + Math.random() * 0.7;
        gameState.market[product] = Math.round(gameState.market[product] * warMultiplier);
        affectedProducts.push(product);
    }
    
    // Add event
    addDrugNewsEvent(`⚔️ Gang war! Violence has broken out in ${gameState.currentDistrict}! Territory disputes have affected product availability and prices.`);
    
    // Chance of player getting injured (losing money for medical bills)
    if (Math.random() < 0.4 && gameState.cash > 0) {
        const injuryCost = Math.min(gameState.cash * 0.15, 5000);  // 15% of cash or $5,000, whichever is less
        gameState.cash -= Math.round(injuryCost);
        addPlayerActionEvent(`You were injured in the gang war crossfire! Medical bills cost you $${formatMoney(Math.round(injuryCost))}.`);
        updatePlayerStats();
    }
    
    // Update market display
    updateMarketDisplay();
}

// Increase heat level based on transaction size
function increaseHeatLevel(transactionValue) {
    // Larger transactions draw more attention
    const heatIncrease = Math.log10(transactionValue) * 2;
    gameState.police.heatLevel = Math.min(100, gameState.police.heatLevel + heatIncrease);
    
    // If heat is high, give warnings to player
    if (gameState.police.heatLevel > 70) {
        addPlayerActionEvent("⚠️ Your heat level is very high. Lay low or bribe officials to reduce police attention.");
    } else if (gameState.police.heatLevel > 40) {
        addPlayerActionEvent("Note: Your activities are attracting some police attention.");
    }
}

// Decrease heat level over time
function decreaseHeatLevel() {
    // Heat naturally decreases by 5 points per day
    gameState.police.heatLevel = Math.max(0, gameState.police.heatLevel - 5);
}

// Check for police encounters
function checkPoliceEncounter() {
    // Skip if player had an encounter recently (last 3 days)
    if (gameState.day - gameState.police.lastEncounter < 3) {
        return;
    }
    
    // Get district police activity modifier
    const districtModifier = getDistrictPoliceLevel(gameState.currentDistrict);
    
    // Calculate encounter probability based on heat level and district
    const encounterProbability = (gameState.police.heatLevel / 100) * districtModifier * 0.5;
    
    if (Math.random() < encounterProbability) {
        // Police encounter happens!
        triggerPoliceEncounter();
    }
}

// Determine district police activity level
function getDistrictPoliceLevel(district) {
    // Define high security districts
    const highSecurity = ["Manhattan", "Beverly Hills", "Ginza", "Soho", "Downtown", "Akihabara"];
    
    // Define low security districts
    const lowSecurity = ["Bronx", "Compton", "Rocinha", "Favela", "Slum", "Makoko", "Dharavi"];
    
    if (highSecurity.some(area => district.includes(area))) {
        return POLICE_SYSTEM.districtActivity.high;
    } else if (lowSecurity.some(area => district.includes(area))) {
        return POLICE_SYSTEM.districtActivity.low;
    }
    
    return POLICE_SYSTEM.districtActivity.medium;
}

// Trigger a police encounter
function triggerPoliceEncounter() {
    // Determine the type of encounter based on heat level
    let encounterType;
    
    if (gameState.police.heatLevel >= POLICE_SYSTEM.encounters.BUST.heatThreshold) {
        encounterType = POLICE_SYSTEM.encounters.BUST;
    } else if (gameState.police.heatLevel >= POLICE_SYSTEM.encounters.RAID.heatThreshold) {
        encounterType = POLICE_SYSTEM.encounters.RAID;
    } else {
        encounterType = POLICE_SYSTEM.encounters.SEARCH;
    }
    
    // Record the encounter
    gameState.police.lastEncounter = gameState.day;
    
    // Show encounter modal
    showPoliceEncounterModal(encounterType);
}

// Show police encounter modal
function showPoliceEncounterModal(encounterType) {
    DOM.modalTitle.textContent = encounterType.name;
    
    // Calculate bribe amount based on heat level and player's cash
    const minBribe = 1000 + (gameState.police.heatLevel * 100);
    const recommendedBribe = Math.min(Math.round(gameState.cash * 0.15), minBribe);
    const canAffordBribe = gameState.cash >= minBribe;
    
    // Calculate chances of success for different options
    const runChance = Math.max(10, 50 - gameState.police.heatLevel / 2);
    const fightChance = Math.max(5, 30 - gameState.police.heatLevel / 2);
    const bribeEffectiveness = Math.min(90, Math.round(recommendedBribe / minBribe * 100));
    
    let content = `
        <div class="police-encounter">
            <p class="encounter-description">${encounterType.description} They're checking everyone in ${gameState.currentDistrict}.</p>
            <p class="heat-level">Your current heat level: <span class="heat-value">${Math.round(gameState.police.heatLevel)}/100</span></p>
            
            <div class="encounter-options">
                <div class="option">
                    <h4>Submit to Search</h4>
                    <p>Cooperate with the police and hope they don't find anything.</p>
                    <p>Success chance: ${Math.round(encounterType.successChance * 100)}%</p>
                    <button id="submit-option">Submit</button>
                </div>
                
                <div class="option">
                    <h4>Run</h4>
                    <p>Try to escape the situation. Higher risk but may avoid all consequences.</p>
                    <p>Success chance: ${runChance}%</p>
                    <button id="run-option">Run</button>
                </div>
                
                <div class="option">
                    <h4>Fight</h4>
                    <p>Resist the police. Very high risk but may avoid all consequences.</p>
                    <p>Success chance: ${fightChance}%</p>
                    <button id="fight-option">Fight</button>
                </div>
                
                <div class="option">
                    <h4>Bribe</h4>
                    <p>Offer a bribe to make them look the other way.</p>
                    <p>Minimum bribe: $${formatMoney(minBribe)}</p>
                    <p>Effectiveness: ${bribeEffectiveness}%</p>
                    <button id="bribe-option" ${!canAffordBribe ? 'disabled' : ''}>
                        ${canAffordBribe ? `Bribe $${formatMoney(recommendedBribe)}` : 'Cannot afford bribe'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    document.getElementById('submit-option').addEventListener('click', () => {
        handlePoliceOption('submit', encounterType, recommendedBribe);
    });
    
    document.getElementById('run-option').addEventListener('click', () => {
        handlePoliceOption('run', encounterType, recommendedBribe, runChance);
    });
    
    document.getElementById('fight-option').addEventListener('click', () => {
        handlePoliceOption('fight', encounterType, recommendedBribe, fightChance);
    });
    
    const bribeButton = document.getElementById('bribe-option');
    if (!bribeButton.disabled) {
        bribeButton.addEventListener('click', () => {
            handlePoliceOption('bribe', encounterType, recommendedBribe, bribeEffectiveness);
        });
    }
    
    // Show the modal - can't be closed without selecting an option
    DOM.modalContainer.classList.remove('hidden');
    DOM.modalClose.style.display = 'none';
}

// Handle police encounter option selection
function handlePoliceOption(option, encounterType, bribeAmount, successChance = null) {
    // Restore the close button
    DOM.modalClose.style.display = 'block';
    
    let result, message;
    
    switch(option) {
        case 'submit':
            // Use the encounter's built-in success chance
            result = Math.random() < encounterType.successChance;
            
            if (result) {
                message = "The police search you but don't find anything suspicious. You're free to go.";
                gameState.police.heatLevel = Math.max(0, gameState.police.heatLevel - 10);
            } else {
                applyPoliceConsequences(encounterType);
                message = `The police search you and find incriminating evidence. ${getConsequencesDescription(encounterType)}`;
            }
            break;
            
        case 'run':
            result = Math.random() < (successChance / 100);
            
            if (result) {
                message = "You manage to slip away from the police! However, they're now more suspicious of you.";
                gameState.police.heatLevel += 15; // Running increases heat even if successful
            } else {
                // Failed run has worse consequences
                applyPoliceConsequences(encounterType, 1.5);
                message = `You try to run but are caught! The police are now much more suspicious. ${getConsequencesDescription(encounterType, 1.5)}`;
                gameState.police.heatLevel += 30;
            }
            break;
            
        case 'fight':
            result = Math.random() < (successChance / 100);
            
            if (result) {
                message = "Against all odds, you manage to fight your way out! You should lay low for a while.";
                gameState.police.heatLevel += 50; // Fighting dramatically increases heat
            } else {
                // Failed fight has severe consequences
                applyPoliceConsequences(encounterType, 2);
                message = `You try to fight but are overwhelmed! ${getConsequencesDescription(encounterType, 2)}`;
                gameState.police.heatLevel = 100; // Maximum heat
                
                // Additional jail time for fighting
                if (!encounterType.consequences.jailTime) {
                    serveJailTime(2);
                } else {
                    serveJailTime(encounterType.consequences.jailTime + 2);
                }
            }
            break;
            
        case 'bribe':
            result = Math.random() < (successChance / 100);
            
            // Pay the bribe regardless of outcome
            gameState.cash -= bribeAmount;
            gameState.police.bribesGiven++;
            
            if (result) {
                message = "The officer pockets your cash and tells his colleagues to leave you alone.";
                gameState.police.heatLevel = Math.max(0, gameState.police.heatLevel - 30);
            } else {
                message = "The officer takes your money but decides to search you anyway!";
                applyPoliceConsequences(encounterType, 0.5); // Reduced consequences for attempted bribe
                message += ` ${getConsequencesDescription(encounterType, 0.5)}`;
            }
            break;
    }
    
    // Show result message
    DOM.modalContent.innerHTML = `
        <div class="police-result">
            <p>${message}</p>
            <button id="continue-btn">Continue</button>
        </div>
    `;
    
    // Add event listener to continue button
    document.getElementById('continue-btn').addEventListener('click', () => {
        closeModal();
        updatePlayerStats();
        updateInventoryDisplay();
        updateHeatDisplay();
    });
}

// Apply consequences from police encounter
function applyPoliceConsequences(encounterType, multiplier = 1) {
    const consequences = encounterType.consequences;
    
    // Lose inventory if applicable
    if (consequences.inventory) {
        const inventoryLossRatio = consequences.inventory * multiplier;
        for (const product in gameState.inventory.items) {
            const lostAmount = Math.ceil(gameState.inventory.items[product] * inventoryLossRatio);
            gameState.inventory.items[product] -= lostAmount;
            
            // Update inventory space
            const productInfo = GAME.PRODUCTS.find(p => p.name === product);
            const weightPerUnit = productInfo ? productInfo.weight : 1;
            gameState.inventory.space.used -= lostAmount * weightPerUnit;
            
            // Remove product if quantity is zero or negative
            if (gameState.inventory.items[product] <= 0) {
                delete gameState.inventory.items[product];
            }
        }
    }
    
    // Lose cash if applicable
    if (consequences.cash) {
        const cashLoss = gameState.cash * consequences.cash * multiplier;
        gameState.cash -= Math.round(cashLoss);
        if (gameState.cash < 0) gameState.cash = 0;
    }
    
    // Handle jail time if applicable
    if (consequences.jailTime) {
        serveJailTime(consequences.jailTime);
    }
    
    // Update displays
    updatePlayerStats();
    updateInventoryDisplay();
}

// Serve jail time
function serveJailTime(days) {
    if (days <= 0) return;
    
    const jailDays = Math.round(days);
    
    // Advance game time
    gameState.day += jailDays;
    
    // Apply interest to debt for each day
    const totalInterest = gameState.debt * Math.pow(1 + GAME.INITIAL.INTEREST_RATE, jailDays) - gameState.debt;
    gameState.debt += Math.round(totalInterest);
    
    // Add event
    addPlayerActionEvent(`You served ${jailDays} days in jail. Your debt accrued $${formatMoney(Math.round(totalInterest))} in interest.`);
    
    // Check if game is over after jail time
    if (gameState.day > gameState.dayLimit && gameState.dayLimit !== Infinity) {
        endGame();
    }
}

// Get description of consequences
function getConsequencesDescription(encounterType, multiplier = 1) {
    const consequences = encounterType.consequences;
    let description = "";
    
    if (consequences.inventory) {
        const percent = Math.round(consequences.inventory * multiplier * 100);
        description += `They confiscate ${percent}% of your inventory. `;
    }
    
    if (consequences.cash) {
        const percent = Math.round(consequences.cash * multiplier * 100);
        description += `You lose ${percent}% of your cash as fines. `;
    }
    
    if (consequences.jailTime) {
        const days = Math.round(consequences.jailTime * multiplier);
        description += `You're sentenced to ${days} days in jail.`;
    }
    
    return description;
}

// Function to show available storage options
function showStorageOptionsModal() {
    DOM.modalTitle.textContent = "Purchase Storage";
    
    let content = `
        <div class="storage-modal">
            <h3>Your Current Storage Capacity: ${gameState.storage.totalCapacity}</h3>
            <p>Purchase properties to increase your storage capacity:</p>
            
            <div class="storage-options-list">
    `;
    
    // List all available storage options
    for (const [propertyName, property] of Object.entries(STORAGE_OPTIONS)) {
        const alreadyOwned = gameState.storage.ownedProperties[propertyName];
        const canAfford = gameState.cash >= property.cost;
        const meetsRankRequirement = GAME.RANKS.indexOf(gameState.rank) >= property.requiredRank;
        const disabled = alreadyOwned || !canAfford || !meetsRankRequirement;
        
        content += `
            <div class="storage-option ${disabled ? 'disabled' : ''}">
                <h4>${propertyName} ${alreadyOwned ? '(Owned)' : ''}</h4>
                <p>${property.description}</p>
                <p>Storage Capacity: ${property.capacity}</p>
                <p>Cost: $${formatMoney(property.cost)}</p>
                ${!meetsRankRequirement ? 
                    `<p class="requirement-note">Required Rank: ${GAME.RANKS[property.requiredRank].name}</p>` : ''}
                <button 
                    class="purchase-storage-btn" 
                    data-property="${propertyName}" 
                    ${disabled ? 'disabled' : ''}
                >
                    ${alreadyOwned ? 'Owned' : 'Purchase'}
                </button>
            </div>
        `;
    }
    
    content += `
            </div>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners to purchase buttons
    document.querySelectorAll('.purchase-storage-btn:not([disabled])').forEach(button => {
        button.addEventListener('click', () => {
            purchaseStorage(button.dataset.property);
            closeModal();
        });
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Function to purchase storage
function purchaseStorage(propertyName) {
    const property = STORAGE_OPTIONS[propertyName];
    
    if (gameState.cash >= property.cost && 
        !gameState.storage.ownedProperties[propertyName] &&
        GAME.RANKS.indexOf(gameState.rank) >= property.requiredRank) {
        
        // Deduct cash
        gameState.cash -= property.cost;
        
        // Add to owned properties
        gameState.storage.ownedProperties[propertyName] = true;
        
        // Increase total capacity
        gameState.storage.totalCapacity += property.capacity;
        gameState.inventory.space.max = gameState.storage.totalCapacity;
        
        // Update displays
        updatePlayerStats();
        updateInventoryDisplay();
        
        // Add event
        addPlayerActionEvent(`Purchased ${propertyName} for $${formatMoney(property.cost)}. Your storage capacity is now ${gameState.storage.totalCapacity}.`);
    }
}

// Generate random events for the day (original function kept for reference)
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
    
    // Increase heat level
    gameState.police.heatLevel = Math.min(100, gameState.police.heatLevel + 15);
    updateHeatDisplay();
    
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
    
    let totalBankValue = gameState.bankAccount;
    if (gameState.banking && gameState.banking.totalSavings !== undefined) {
        totalBankValue = gameState.banking.totalSavings;
    }
    
    const finalNetWorth = gameState.cash + inventoryValue + totalBankValue - gameState.debt;
    
    DOM.modalTitle.textContent = "Game Over";
    
    let content = `
        <div class="game-over-modal">
            <h2>Final Results - Day ${gameState.day}</h2>
            
            <div class="final-stats">
                <p>Final Rank: ${gameState.rank.name}</p>
                <p>Cash: $${formatMoney(gameState.cash)}</p>
                <p>Inventory Value: $${formatMoney(inventoryValue)}</p>
                <p>Bank Balance: $${formatMoney(totalBankValue)}</p>
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
    // Restore the close button visibility in case it was hidden
    if (DOM.modalClose) {
        DOM.modalClose.style.display = 'block';
    }
}

// Format money values with commas
function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}