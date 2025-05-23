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

// Define city distances from New York and unlock thresholds
const CITY_PROGRESSION = {
    "New York": {
        unlockCost: 0,  // Starting city
        distance: 0,
        specialFeature: "Balanced market with moderate police presence",
        policeActivity: 1.0, // Standard police activity
        marketVolatility: 1.0, // Standard market volatility
        productModifiers: {} // No specific product modifiers
    },
    "Boston": {
        unlockCost: 100000,  // $100k
        distance: 215, // miles from NYC
        specialFeature: "Lower police presence but higher prices",
        policeActivity: 0.7,
        marketVolatility: 1.1,
        productModifiers: {
            "Acid": 1.2, // More expensive
            "Weed": 1.15
        }
    },
    "Philadelphia": {
        unlockCost: 150000,  // $150k
        distance: 95, // miles from NYC
        specialFeature: "Cheap pharmaceuticals but higher police activity",
        policeActivity: 1.2,
        marketVolatility: 0.9,
        productModifiers: {
            "PCP": 0.8, // Cheaper
            "Speed": 0.8
        }
    },
    "Washington DC": {
        unlockCost: 250000,  // $250k
        distance: 225, // miles from NYC
        specialFeature: "Corrupt officials can be bribed more easily",
        policeActivity: 1.3,
        marketVolatility: 0.9,
        bribeEffectiveness: 1.4, // Bribes 40% more effective
        productModifiers: {
            "Cocaine": 1.2 // More expensive
        }
    },
    "Chicago": {
        unlockCost: 350000,  // $350k
        distance: 790, // miles from NYC
        specialFeature: "Gang territories affect market stability",
        policeActivity: 1.1,
        marketVolatility: 1.3, // More volatile market
        gangWarChance: 1.5, // Higher chance of gang wars
        productModifiers: {
            "Heroin": 0.9
        }
    },
    "Miami": {
        unlockCost: 500000,  // $500k
        distance: 1280, // miles from NYC
        specialFeature: "Major drug import hub with volatile prices",
        policeActivity: 1.2,
        marketVolatility: 1.5, // Very volatile market
        productModifiers: {
            "Cocaine": 0.7, // Much cheaper cocaine
            "Speed": 1.2
        }
    },
    "Los Angeles": {
        unlockCost: 750000,  // $750k
        distance: 2790, // miles from NYC
        specialFeature: "Cheap weed but high-priced synthetics",
        policeActivity: 1.2,
        marketVolatility: 1.2,
        productModifiers: {
            "Weed": 0.7, // Cheaper weed
            "Acid": 1.3,
            "Ecstasy": 1.2
        }
    },
    "Vancouver": {
        unlockCost: 1000000,  // $1M
        distance: 2430, // miles from NYC
        specialFeature: "Safe haven with low police presence but high prices",
        policeActivity: 0.6, // Very low police activity
        marketVolatility: 0.8,
        productModifiers: {
            "Weed": 0.8,
            "Shrooms": 0.8,
            "Heroin": 1.3,
            "Cocaine": 1.3
        }
    },
    "Mexico City": {
        unlockCost: 1500000,  // $1.5M
        distance: 2090, // miles from NYC
        specialFeature: "Cartel territory with cheap products but dangerous conditions",
        policeActivity: 1.4, // High police/cartel activity
        policeCorruption: 1.3, // Easier bribes
        marketVolatility: 1.4,
        gangWarChance: 2.0, // Highest chance of gang wars
        productModifiers: {
            "Heroin": 0.6, // Much cheaper
            "Cocaine": 0.65,
            "Weed": 0.7
        }
    },
    "Amsterdam": {
        unlockCost: 2000000,  // $2M
        distance: 3640, // miles from NYC
        specialFeature: "Legal drugs create unique market dynamics",
        policeActivity: 0.5, // Very low police activity
        marketVolatility: 0.7, // Stable market
        productModifiers: {
            "Weed": 0.5, // Much cheaper
            "Shrooms": 0.5,
            "Acid": 0.7,
            "Ecstasy": 0.7
        }
    },
    "London": {
        unlockCost: 2500000,  // $2.5M
        distance: 3470, // miles from NYC
        specialFeature: "High-end market with premium prices",
        policeActivity: 0.9,
        marketVolatility: 0.8,
        productModifiers: {
            "Cocaine": 1.3, // More expensive
            "Ecstasy": 1.1,
            "Heroin": 1.2
        }
    },
    "Paris": {
        unlockCost: 3000000,  // $3M
        distance: 3630, // miles from NYC
        specialFeature: "Luxury drug market with higher prices",
        policeActivity: 0.8,
        marketVolatility: 0.7,
        productModifiers: {
            "Cocaine": 1.4, // Much more expensive
            "Acid": 1.2,
            "Ecstasy": 1.1
        }
    },
    "Berlin": {
        unlockCost: 3500000,  // $3.5M
        distance: 3960, // miles from NYC
        specialFeature: "Techno scene creates high demand for party drugs",
        policeActivity: 0.7,
        marketVolatility: 0.9,
        productModifiers: {
            "Ecstasy": 0.7, // Cheaper
            "Speed": 0.7,
            "Acid": 0.8
        }
    },
    "Moscow": {
        unlockCost: 4000000,  // $4M
        distance: 4660, // miles from NYC
        specialFeature: "Black market operations with high risk/reward",
        policeActivity: 1.5, // Very high police activity
        policeCorruption: 1.5, // Much easier bribes
        marketVolatility: 1.2,
        productModifiers: {
            "Heroin": 0.7,
            "Speed": 0.6
        }
    },
    "Dubai": {
        unlockCost: 4500000,  // $4.5M
        distance: 6840, // miles from NYC
        specialFeature: "Extremely strict laws but premium prices",
        policeActivity: 1.8, // Highest police activity
        marketVolatility: 1.0,
        productModifiers: {
            "Cocaine": 1.7, // Extremely expensive
            "Ecstasy": 1.6,
            "Weed": 1.5,
            "Heroin": 1.5
        }
    },
    "Bangkok": {
        unlockCost: 5000000,  // $5M
        distance: 8650, // miles from NYC
        specialFeature: "Tourist market with varied demand",
        policeActivity: 1.1,
        policeCorruption: 1.4, // Easier bribes
        marketVolatility: 1.3,
        productModifiers: {
            "Heroin": 0.6, // Much cheaper
            "Weed": 0.5,
            "Speed": 0.7,
            "Shrooms": 0.6
        }
    },
    "Hong Kong": {
        unlockCost: 6000000,  // $6M
        distance: 8030, // miles from NYC
        specialFeature: "High security but lucrative market",
        policeActivity: 1.4,
        marketVolatility: 1.1,
        productModifiers: {
            "Cocaine": 1.5, // More expensive
            "Heroin": 0.8,
            "Speed": 1.2
        }
    },
    "Tokyo": {
        unlockCost: 7000000,  // $7M
        distance: 6760, // miles from NYC
        specialFeature: "Extremely high prices but low police activity",
        policeActivity: 0.6,
        marketVolatility: 0.8,
        productModifiers: {
            "Speed": 2.0, // Extremely expensive
            "Cocaine": 2.5,
            "Acid": 1.8,
            "Ecstasy": 1.9
        }
    },
    "Sydney": {
        unlockCost: 8000000,  // $8M
        distance: 9930, // miles from NYC
        specialFeature: "Isolated market with unique price dynamics",
        policeActivity: 0.9,
        marketVolatility: 1.0,
        productModifiers: {
            "Cocaine": 1.8, // Very expensive
            "Ecstasy": 1.3,
            "Weed": 0.9
        }
    },
    "Rio de Janeiro": {
        unlockCost: 9000000,  // $9M
        distance: 4800, // miles from NYC
        specialFeature: "Favela connections give access to cheap product",
        policeActivity: 1.3,
        policeCorruption: 1.5, // Much easier bribes
        gangWarChance: 1.8, // High gang war chance
        marketVolatility: 1.5,
        productModifiers: {
            "Cocaine": 0.5, // Very cheap
            "Weed": 0.6
        }
    }
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
    "Boston": {
        unlocked: false,
        districts: ["Downtown", "Back Bay", "North End", "South Boston", "Roxbury", "Beacon Hill"]
    },
    "Philadelphia": {
        unlocked: false,
        districts: ["Center City", "Fishtown", "Old City", "South Philly", "West Philly", "Kensington"]
    },
    "Washington DC": {
        unlocked: false,
        districts: ["Georgetown", "Adams Morgan", "Capitol Hill", "Dupont Circle", "Shaw", "Anacostia"]
    },
    "Chicago": {
        unlocked: false,
        districts: ["The Loop", "Wicker Park", "Lincoln Park", "South Side", "West Side", "Gold Coast"]
    },
    "Miami": {
        unlocked: false,
        districts: ["South Beach", "Downtown", "Little Havana", "Wynwood", "Coconut Grove", "Liberty City"]
    },
    "Los Angeles": {
        unlocked: false,
        districts: ["Downtown", "Hollywood", "Venice Beach", "Beverly Hills", "Compton", "East LA"]
    },
    "Vancouver": {
        unlocked: false,
        districts: ["Downtown Eastside", "Chinatown", "Strathcona", "Hastings-Sunrise", "Mount Pleasant", "Grandview-Woodland"]
    },
    "Mexico City": {
        unlocked: false,
        districts: ["Tepito", "Iztapalapa", "Doctores", "Guerrero", "Peralvillo", "Morelos"]
    },
    "Amsterdam": {
        unlocked: false,
        districts: ["Red Light District", "Bijlmer", "Nieuw-West", "Zuidoost", "Noord", "Oost"]
    },
    "London": {
        unlocked: false,
        districts: ["Soho", "Camden", "Brixton", "Hackney", "Shoreditch", "Kensington"]
    },
    "Paris": {
        unlocked: false,
        districts: ["Montmartre", "Pigalle", "Belleville", "La Chapelle", "Barbès", "Saint-Denis"]
    },
    "Berlin": {
        unlocked: false,
        districts: ["Kreuzberg", "Neukölln", "Wedding", "Friedrichshain", "Moabit", "Gesundbrunnen"]
    },
    "Moscow": {
        unlocked: false,
        districts: ["Arbat", "Presnensky", "Tverskoy", "Taganka", "Zamoskvorechye", "Basmanny"]
    },
    "Dubai": {
        unlocked: false,
        districts: ["Deira", "Al Qusais", "Naif", "Al Murar", "Al Baraha", "Hor Al Anz"]
    },
    "Bangkok": {
        unlocked: false,
        districts: ["Patpong", "Klong Toey", "Khao San", "Nana", "Huai Khwang", "Din Daeng"]
    },
    "Hong Kong": {
        unlocked: false,
        districts: ["Mong Kok", "Sham Shui Po", "Yau Ma Tei", "Wan Chai", "North Point", "Kwun Tong"]
    },
    "Tokyo": {
        unlocked: false,
        districts: ["Shibuya", "Shinjuku", "Roppongi", "Akihabara", "Ginza", "Ueno"]
    },
    "Sydney": {
        unlocked: false,
        districts: ["Kings Cross", "Redfern", "Surry Hills", "Cabramatta", "Parramatta", "Blacktown"]
    },
    "Rio de Janeiro": {
        unlocked: false,
        districts: ["Copacabana", "Ipanema", "Rocinha", "Maré", "Cidade de Deus", "Complexo do Alemão"]
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

// Game Save/Load System

// Function to save the current game state to localStorage
function saveGame() {
    try {
        // Convert the gameState object to a JSON string
        const gameStateJSON = JSON.stringify(gameState);
        
        // Save the game state to localStorage
        localStorage.setItem('dopeWarsGameSave', gameStateJSON);
        
        // Save the world map state (city unlocks, etc.)
        const worldMapJSON = JSON.stringify(WORLD_MAP);
        localStorage.setItem('dopeWarsWorldMapSave', worldMapJSON);
        
        // Add a timestamp to the save
        localStorage.setItem('dopeWarsGameSaveTime', new Date().toLocaleString());
        
        // Show confirmation to the player
        addPlayerActionEvent("Game saved successfully.");
        
        return true;
    } catch (error) {
        console.error("Error saving game:", error);
        addPlayerActionEvent("Failed to save game. Error: " + error.message);
        return false;
    }
}

// Function to load a saved game from localStorage
function loadGame() {
    try {
        // Get the saved game state from localStorage
        const gameStateJSON = localStorage.getItem('dopeWarsGameSave');
        const worldMapJSON = localStorage.getItem('dopeWarsWorldMapSave');
        
        // Check if save exists
        if (!gameStateJSON || !worldMapJSON) {
            console.log("No saved game found.");
            return false;
        }
        
        // Parse the JSON back to objects
        const savedGameState = JSON.parse(gameStateJSON);
        const savedWorldMap = JSON.parse(worldMapJSON);
        
        // Restore the saved game state
        gameState = savedGameState;
        
        // Restore the world map state
        for (const city in savedWorldMap) {
            if (WORLD_MAP[city]) {
                WORLD_MAP[city].unlocked = savedWorldMap[city].unlocked;
                if (savedWorldMap[city].unlockCost !== undefined) {
                    WORLD_MAP[city].unlockCost = savedWorldMap[city].unlockCost;
                }
                if (savedWorldMap[city].specialFeature !== undefined) {
                    WORLD_MAP[city].specialFeature = savedWorldMap[city].specialFeature;
                }
                if (savedWorldMap[city].policeActivity !== undefined) {
                    WORLD_MAP[city].policeActivity = savedWorldMap[city].policeActivity;
                }
                if (savedWorldMap[city].marketVolatility !== undefined) {
                    WORLD_MAP[city].marketVolatility = savedWorldMap[city].marketVolatility;
                }
                if (savedWorldMap[city].productModifiers !== undefined) {
                    WORLD_MAP[city].productModifiers = savedWorldMap[city].productModifiers;
                }
                // Copy any other properties we need to preserve
                if (savedWorldMap[city].policeCorruption !== undefined) {
                    WORLD_MAP[city].policeCorruption = savedWorldMap[city].policeCorruption;
                }
                if (savedWorldMap[city].gangWarChance !== undefined) {
                    WORLD_MAP[city].gangWarChance = savedWorldMap[city].gangWarChance;
                }
            }
        }

        // Update the UI to reflect the loaded day limit
        DOM.dayLimit.textContent = gameState.dayLimit === Infinity ? '∞' : gameState.dayLimit;
        
        // If we have the game days dropdown, update its selected value to match the saved day limit
        if (DOM.gameDays) {
            if (gameState.dayLimit === Infinity) {
                DOM.gameDays.value = 'infinite';
            } else {
                // Try to find a matching option, or default to the closest one
                const options = Array.from(DOM.gameDays.options).map(opt => parseInt(opt.value) || 'infinite');
                const exactMatch = options.includes(gameState.dayLimit);
                if (exactMatch) {
                    DOM.gameDays.value = gameState.dayLimit.toString();
                }
                // If no exact match, we'll just leave it as is since it's not currently visible
            }
        }
        
        // Update all game displays
        updatePlayerStats();
        updateLocationDisplay();
        updateInventoryDisplay();
        updateMarketDisplay();
        updateUnlockedCities();
        updateHeatDisplay();
        
        // Show confirmation to the player
        addPlayerActionEvent("Game loaded successfully.");
        
        return true;
    } catch (error) {
        console.error("Error loading game:", error);
        addPlayerActionEvent("Failed to load game. Error: " + error.message);
        return false;
    }
}

// Function to check if a saved game exists
function hasSavedGame() {
    return localStorage.getItem('dopeWarsGameSave') !== null;
}

// Function to get the timestamp of the saved game
function getSaveGameTime() {
    return localStorage.getItem('dopeWarsGameSaveTime') || "Unknown";
}

// Function to delete the saved game
function deleteSavedGame() {
    localStorage.removeItem('dopeWarsGameSave');
    localStorage.removeItem('dopeWarsWorldMapSave');
    localStorage.removeItem('dopeWarsGameSaveTime');
}

// Add save/load/new game buttons to the UI
function addSaveLoadButtons() {
    // Add to the DOM cache
    DOM.saveGameBtn = document.createElement('button');
    DOM.saveGameBtn.id = 'save-game-btn';
    DOM.saveGameBtn.textContent = 'Save Game';
    DOM.saveGameBtn.className = 'action-btn';
    
    DOM.loadGameBtn = document.createElement('button');
    DOM.loadGameBtn.id = 'load-game-btn';
    DOM.loadGameBtn.textContent = 'Load Game';
    DOM.loadGameBtn.className = 'action-btn';
    
    DOM.newGameBtn = document.createElement('button');
    DOM.newGameBtn.id = 'new-game-btn';
    DOM.newGameBtn.textContent = 'New Game';
    DOM.newGameBtn.className = 'action-btn';
    
    // Get the actions panel and add buttons
    const actionsPanel = document.getElementById('actions-panel');
    actionsPanel.appendChild(DOM.saveGameBtn);
    actionsPanel.appendChild(DOM.loadGameBtn);
    actionsPanel.appendChild(DOM.newGameBtn);
    
    // Add event listeners
    DOM.saveGameBtn.addEventListener('click', saveGame);
    DOM.loadGameBtn.addEventListener('click', showLoadGameDialog);
    DOM.newGameBtn.addEventListener('click', showNewGameDialog);
    
    // Add save/load buttons to the intro screen
    addContinueButtonToIntroScreen();
}

// Function to add Continue button to intro screen
function addContinueButtonToIntroScreen() {
    const introOptions = document.querySelector('.game-options');
    if (introOptions && hasSavedGame()) {
        // Create continue game button
        const continueBtn = document.createElement('button');
        continueBtn.id = 'continue-game-btn';
        continueBtn.textContent = `Continue`;
        continueBtn.className = 'intro-btn';
        
        // Insert it before the start game button
        const startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            introOptions.insertBefore(continueBtn, startBtn);
            introOptions.insertBefore(document.createElement('br'), startBtn);
        } else {
            introOptions.appendChild(continueBtn);
        }
        
        // Add event listener
        continueBtn.addEventListener('click', () => {
            const success = loadGame();
            if (success) {
                DOM.introScreen.style.display = 'none';
                DOM.gameContainer.style.display = 'block';
            }
        });
    }
}

// Show dialog confirming load saved game
function showLoadGameDialog() {
    if (!hasSavedGame()) {
        addPlayerActionEvent("No saved game found.");
        return;
    }
    
    DOM.modalTitle.textContent = "Load Game";
    
    let content = `
        <div class="load-game-modal">
            <p>Are you sure you want to load your saved game from ${getSaveGameTime()}?</p>
            <p>Any unsaved progress in your current game will be lost.</p>
            
            <div class="modal-buttons">
                <button id="confirm-load">Yes, Load Game</button>
                <button id="cancel-load">Cancel</button>
            </div>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    document.getElementById('confirm-load').addEventListener('click', () => {
        const success = loadGame();
        if (success) {
            closeModal();
        }
    });
    
    document.getElementById('cancel-load').addEventListener('click', () => {
        closeModal();
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Show dialog confirming new game
function showNewGameDialog() {
    DOM.modalTitle.textContent = "New Game";
    
    let content = `
        <div class="new-game-modal">
            <p>Are you sure you want to start a new game?</p>
            <p>Your current game progress will be lost.</p>
            ${hasSavedGame() ? '<p>Your saved game will also be deleted.</p>' : ''}
            
            <div class="modal-buttons">
                <button id="confirm-new-game">Yes, Start New Game</button>
                <button id="cancel-new-game">Cancel</button>
            </div>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    document.getElementById('confirm-new-game').addEventListener('click', () => {
        // Delete any saved game
        deleteSavedGame();
        
        // Return to intro screen
        closeModal();
        DOM.introScreen.style.display = 'flex';
        DOM.gameContainer.style.display = 'none';
        
        // Reset any continue button
        const continueBtn = document.getElementById('continue-game-btn');
        if (continueBtn) {
            continueBtn.remove();
        }
    });
    
    document.getElementById('cancel-new-game').addEventListener('click', () => {
        closeModal();
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Function to update WORLD_MAP with the new city progression data
function updateWorldMapWithProgression() {
    for (const city in WORLD_MAP) {
        // If this city exists in our progression data
        if (CITY_PROGRESSION[city]) {
            // Only New York is unlocked initially
            WORLD_MAP[city].unlocked = city === "New York";
            WORLD_MAP[city].unlockCost = CITY_PROGRESSION[city].unlockCost;
            WORLD_MAP[city].specialFeature = CITY_PROGRESSION[city].specialFeature;
            WORLD_MAP[city].policeActivity = CITY_PROGRESSION[city].policeActivity || 1.0;
            WORLD_MAP[city].marketVolatility = CITY_PROGRESSION[city].marketVolatility || 1.0;
            WORLD_MAP[city].productModifiers = CITY_PROGRESSION[city].productModifiers || {};
            
            // Add optional properties if they exist
            if (CITY_PROGRESSION[city].policeCorruption) {
                WORLD_MAP[city].policeCorruption = CITY_PROGRESSION[city].policeCorruption;
            }
            
            if (CITY_PROGRESSION[city].gangWarChance) {
                WORLD_MAP[city].gangWarChance = CITY_PROGRESSION[city].gangWarChance;
            }
        }
    }
}

// Sort cities by unlock cost to display in order
function getSortedCities() {
    const cities = [];
    for (const city in WORLD_MAP) {
        cities.push({
            name: city,
            unlockCost: WORLD_MAP[city].unlockCost || 0,
            unlocked: WORLD_MAP[city].unlocked
        });
    }
    
    // Sort by unlock cost (ascending)
    cities.sort((a, b) => a.unlockCost - b.unlockCost);
    return cities;
}

// Function to check if a city can be unlocked
function canUnlockCity(city) {
    if (!WORLD_MAP[city] || WORLD_MAP[city].unlocked) return false;
    return gameState.cash >= WORLD_MAP[city].unlockCost;
}

// Function to unlock a specific city
function unlockCity(city) {
    if (!canUnlockCity(city)) return false;
    
    // Deduct cost from cash
    gameState.cash -= WORLD_MAP[city].unlockCost;
    
    // Unlock the city
    WORLD_MAP[city].unlocked = true;
    
    // Update player stats
    updatePlayerStats();
    updateUnlockedCities();
    
    // Add event
    addPlayerActionEvent(`Unlocked ${city} for $${formatMoney(WORLD_MAP[city].unlockCost)}!`);
    addDrugNewsEvent(`New market opened: ${city} is now available with ${WORLD_MAP[city].specialFeature}.`);
    
    return true;
}

// Function to hide unlocked cities panel
function hideUnlockedCitiesPanel() {
    // Hide the unlocked cities panel but keep the right panel and its buttons
    const unlockedCitiesPanel = document.getElementById('unlocked-cities-panel');
    if (unlockedCitiesPanel) {
        unlockedCitiesPanel.style.display = 'none';
    }
    
    // Adjust the right panel to have more space for the action buttons
    const rightPanel = document.getElementById('right-panel');
    if (rightPanel) {
        rightPanel.style.display = 'flex';
        rightPanel.style.flexDirection = 'column';
    }
    
    // Make the actions panel take full height
    const actionsPanel = document.getElementById('actions-panel');
    if (actionsPanel) {
        actionsPanel.style.flex = '1';
    }
}

// Enhanced travel options modal that shows unlock costs
function showEnhancedTravelOptions() {
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
    
    // Other cities, sorted by unlock cost
    content += '<h3>Other Cities</h3>';
    content += '<div class="cities-list">';
    
    const sortedCities = getSortedCities();
    
    for (const cityData of sortedCities) {
        const city = cityData.name;
        if (city !== gameState.currentCity) {
            const isLocked = !WORLD_MAP[city].unlocked;
            const canUnlock = canUnlockCity(city);
            const unlockCost = WORLD_MAP[city].unlockCost;
            const specialFeature = WORLD_MAP[city].specialFeature || '';
            
            let cityClass = '';
            if (isLocked) {
                cityClass = canUnlock ? 'can-unlock' : 'locked';
            }
            
            content += `
                <div class="city-option ${cityClass}" 
                     data-city="${city}"
                     ${isLocked && !canUnlock ? 'disabled' : ''}>
                    ${city} ${isLocked ? '🔒' : '✓'} 
                    ${isLocked ? 
                        `<div class="city-unlock-info">
                            <span class="unlock-cost">Cost: $${formatMoney(unlockCost)}</span>
                            ${canUnlock ? '<button class="unlock-city-btn">Unlock</button>' : ''}
                        </div>` : 
                        ''
                    }
                    <div class="city-feature">${specialFeature}</div>
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
    
    // Add event listeners to unlocked city options
    document.querySelectorAll('.city-option:not(.locked):not(.can-unlock)').forEach(option => {
        option.addEventListener('click', () => {
            enhancedTravelToCity(option.dataset.city);
            closeModal();
        });
    });
    
    // Add event listeners to unlock buttons
    document.querySelectorAll('.unlock-city-btn').forEach(button => {
        const cityOption = button.closest('.city-option');
        const city = cityOption.dataset.city;
        
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling to parent
            if (unlockCity(city)) {
                // Update the city option to make it clickable
                cityOption.classList.remove('can-unlock');
                const unlockInfo = cityOption.querySelector('.city-unlock-info');
                if (unlockInfo) {
                    unlockInfo.remove();
                }
                
                // Add click event for travel
                cityOption.addEventListener('click', () => {
                    enhancedTravelToCity(city);
                    closeModal();
                });
            }
        });
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Enhanced price modifiers based on location
function enhancedPriceModifiers(basePrice, productName) {
    let modifier = 1.0; // Default: no modification
    
    // Apply city-specific modifiers
    const cityInfo = WORLD_MAP[gameState.currentCity];
    if (cityInfo && cityInfo.productModifiers && cityInfo.productModifiers[productName]) {
        modifier *= cityInfo.productModifiers[productName];
    }
    
    // Apply district modifiers (same as before)
    const district = gameState.currentDistrict;
    
    // Apply specific district modifiers
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
    
    // Apply city volatility to the random fluctuation
    const volatility = cityInfo ? (cityInfo.marketVolatility || 1.0) : 1.0;
    const fluctuationRange = 0.05 * volatility; // ±5% base, modified by city volatility
    
    modifier *= (1.0 - fluctuationRange) + (Math.random() * fluctuationRange * 2);
    
    return Math.round(basePrice * modifier);
}

// Enhanced market generation that uses city special features
function enhancedMarketPrices() {
    gameState.market = {};
    
    // Get city volatility (affects product availability)
    const cityInfo = WORLD_MAP[gameState.currentCity];
    const volatility = cityInfo ? (cityInfo.marketVolatility || 1.0) : 1.0;
    
    GAME.PRODUCTS.forEach(product => {
        // Determine if product is available (base 1/8 chance, affected by volatility)
        // Higher volatility means more chance of products being unavailable
        const unavailabilityChance = 0.125 * volatility;
        const isAvailable = Math.random() > unavailabilityChance;
        
        if (isAvailable) {
            // Generate a random price within the range
            const range = product.maxPrice - product.minPrice;
            let price = Math.floor(Math.random() * range + product.minPrice);
            
            // Apply enhanced modifiers based on location
            price = enhancedPriceModifiers(price, product.name);
            
            // Store in the market
            gameState.market[product.name] = price;
        }
    });
}

// Enhanced travel to a different district - now advances time
function enhancedTravelToDistrict(district) {
    if (district !== gameState.currentDistrict) {
        gameState.currentDistrict = district;
        
        // Advance the day
        advanceDayForTravel();
        
        // Generate new market prices
        enhancedMarketPrices();
        updateLocationDisplay();
        updateMarketDisplay();
        
        addPlayerActionEvent(`You've traveled to ${district}.`);
        addDrugNewsEvent(`Market prices in ${district} have been updated.`);
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
        enhancedMarketPrices();
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

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    // Gather all the DOM references we'll need
    cacheDOM();
    
    // Add the city styles to the page
    addCityStyles();
    
    // Set up event listeners
    setupEventListeners();

    // Add Continue button to intro screen if saved game exists
    addContinueButtonToIntroScreen();    

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
    DOM.travelBtn.addEventListener('click', showEnhancedTravelOptions);
    
    // End day button - now with autosave
    DOM.endDayBtn.addEventListener('click', enhancedEndDayWithAutosave);
    
    // Loan shark button
    DOM.loanSharkBtn.addEventListener('click', showLoanSharkModal);
    
    // Bank button
    DOM.bankBtn.addEventListener('click', showEnhancedBankModal);
    
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
    
    // Enhance gameState with new properties
    enhanceGameState();
    
    // Initialize city system (apply progression data to world map)
    initCitySystem();
    
    // Generate initial market prices using enhanced system
    enhancedMarketPrices();
    
    // Update all displays
    updatePlayerStats();
    updateLocationDisplay();
    updateInventoryDisplay();
    updateMarketDisplay();
    updateUnlockedCities();
    
    // Update UI with new elements
    updateUI();
    
    // Set up enhanced event listeners
    setupEnhancedEventListeners();
    
    // Add save/load buttons
    addSaveLoadButtons();
    
    // Update heat display
    updateHeatDisplay();
    
    // Hide unlocked cities panel
    hideUnlockedCitiesPanel();
    
    // Add initial event
    addPlayerActionEvent("Welcome to Dope Wars Global! You owe the Loan Shark $5,500. Start trading to make money!");
    addDrugNewsEvent("The local market is active. Check prices and start dealing!");
}

// Function to initialize the city system
function initCitySystem() {
    // Apply progression data to world map
    updateWorldMapWithProgression();
    
    // Update displays
    updateUnlockedCities();
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
    if (actionsPanel) {
        const storageBtn = document.createElement('button');
        storageBtn.id = 'storage-btn';
        storageBtn.textContent = 'Storage Options';
        actionsPanel.appendChild(storageBtn);
        
        // Add to DOM cache
        DOM.storageBtn = storageBtn;
        
        // Add event listener
        storageBtn.addEventListener('click', showStorageOptionsModal);
    }
    
    // Add Heat Level indicator to player stats
    const playerStats = document.getElementById('player-stats');
    if (playerStats) {
        const heatDiv = document.createElement('div');
        heatDiv.id = 'heat';
        heatDiv.innerHTML = 'Heat: <span id="heat-value">0</span>';
        playerStats.appendChild(heatDiv);
        
        // Update DOM cache
        DOM.heatValue = document.getElementById('heat-value');
    }
}

// Update heat display
function updateHeatDisplay() {
    if (!DOM.heatValue || !gameState.police) return;
    
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

// Set up enhanced event listeners
function setupEnhancedEventListeners() {
    // This function can be used to add any additional event listeners for new features
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
    updateUnlockedCities(); // Check if player can unlock new cities now
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

// Update player stats display
function updatePlayerStats() {
    // Update cash, debt, day, and rank displays
    DOM.cashValue.textContent = formatMoney(gameState.cash);
    DOM.debtValue.textContent = formatMoney(gameState.debt);
    DOM.dayValue.textContent = gameState.day;
    
    // Calculate current net worth for rank determination
    let inventoryValue = calculateInventoryValue();
    let bankValue = gameState.bankAccount;
    
    // Use banking system if available
    if (gameState.banking && gameState.banking.totalSavings !== undefined) {
        bankValue = gameState.banking.totalSavings;
    }
    
    // Calculate net worth
    gameState.netWorth = gameState.cash + inventoryValue + bankValue - gameState.debt;
    
    // Determine player rank based on net worth
    for (let i = GAME.RANKS.length - 1; i >= 0; i--) {
        if (gameState.netWorth >= GAME.RANKS[i].minWealth) {
            // Only update if rank has changed
            if (gameState.rank.name !== GAME.RANKS[i].name) {
                const oldRank = gameState.rank;
                gameState.rank = GAME.RANKS[i];
                
                // Show rank increase message if not the initial rank setup
                if (oldRank.name !== GAME.RANKS[0].name || gameState.day > 1) {
                    addPlayerActionEvent(`Rank increased to ${gameState.rank.name}!`);
                }
            }
            break;
        }
    }
    
    // Update rank display
    DOM.rankValue.textContent = gameState.rank.name;
}

// Calculate the total value of the player's inventory at current market prices
function calculateInventoryValue() {
    let total = 0;
    
    for (const productName in gameState.inventory.items) {
        // Get the current market price if available
        let price = gameState.market[productName];
        
        // If the product is not available in the current market, use its min price
        if (!price) {
            const productInfo = GAME.PRODUCTS.find(p => p.name === productName);
            price = productInfo ? productInfo.minPrice : 0;
        }
        
        total += price * gameState.inventory.items[productName];
    }
    
    return total;
}

// Update inventory display
function updateInventoryDisplay() {
    // Update space usage
    DOM.spaceUsed.textContent = gameState.inventory.space.used;
    DOM.maxSpace.textContent = gameState.inventory.space.max;
    
    // Clear inventory list
    DOM.inventoryList.innerHTML = '';
    
    // Check if inventory is empty
    if (Object.keys(gameState.inventory.items).length === 0) {
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = 4; // Span across all columns
        emptyCell.classList.add('empty-message');
        emptyCell.textContent = 'No items in inventory';
        emptyRow.appendChild(emptyCell);
        DOM.inventoryList.appendChild(emptyRow);
        return;
    }
    
    // Add each inventory item
    for (const productName in gameState.inventory.items) {
        const quantity = gameState.inventory.items[productName];
        const productInfo = GAME.PRODUCTS.find(p => p.name === productName);
        const weight = productInfo ? productInfo.weight : 1;
        
        // Get current market price
        const currentPrice = gameState.market[productName] || '--';
        
        // Create table row
        const row = document.createElement('tr');
        row.classList.add('inventory-item');
        
        // Product name cell (column 1)
        const nameCell = document.createElement('td');
        nameCell.classList.add('item-name');
        nameCell.textContent = `${productName} (${weight})`;
        
        // Quantity cell (column 2)
        const quantityCell = document.createElement('td');
        quantityCell.classList.add('item-quantity');
        quantityCell.textContent = quantity;
        
        // Price cell (column 3)
        const priceCell = document.createElement('td');
        priceCell.classList.add('item-price');
        priceCell.textContent = currentPrice !== '--' ? `$${formatMoney(currentPrice)}` : 'N/A';
        
        // Action cell (column 4)
        const actionCell = document.createElement('td');
        actionCell.classList.add('item-action');
        
        const sellBtn = document.createElement('button');
        sellBtn.classList.add('sell-btn');
        sellBtn.textContent = 'Sell';
        sellBtn.dataset.product = productName;
        sellBtn.disabled = currentPrice === '--'; // Disable if no market price
        
        sellBtn.addEventListener('click', () => {
            showSellModal(productName, quantity);
        });
        
        actionCell.appendChild(sellBtn);
        
        // Add all cells to the row
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        row.appendChild(priceCell);
        row.appendChild(actionCell);
        
        // Add row to the inventory list
        DOM.inventoryList.appendChild(row);
    }
}

// Show modal for selling a product
function showSellModal(productName, maxQuantity) {
    // Check if the product has a market price
    if (!gameState.market[productName]) {
        addPlayerActionEvent(`You can't sell ${productName} here. Try another location.`);
        return;
    }
    
    const price = gameState.market[productName];
    
    DOM.modalTitle.textContent = `Sell ${productName}`;
    
    let content = `
        <div class="sell-modal">
            <p>Current Price: $${formatMoney(price)}</p>
            <p>Quantity Available: ${maxQuantity}</p>
            
            <div class="quantity-input">
                <label for="sell-quantity">Quantity to sell:</label>
                <input type="number" id="sell-quantity" min="1" max="${maxQuantity}" value="1">
            </div>
            
            <p>Total value: $<span id="sell-total">${formatMoney(price)}</span></p>
            
            <div class="sell-actions">
                <button id="max-sell">Sell Max</button>
                <button id="confirm-sell">Confirm Sale</button>
            </div>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    const quantityInput = document.getElementById('sell-quantity');
    const sellTotal = document.getElementById('sell-total');
    
    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 1;
        sellTotal.textContent = formatMoney(price * quantity);
    });
    
    document.getElementById('max-sell').addEventListener('click', () => {
        quantityInput.value = maxQuantity;
        sellTotal.textContent = formatMoney(price * maxQuantity);
    });
    
    document.getElementById('confirm-sell').addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value) || 0;
        if (quantity > 0 && quantity <= maxQuantity) {
            sellProduct(productName, quantity);
            closeModal();
        }
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Update location display
function updateLocationDisplay() {
    DOM.currentCity.textContent = gameState.currentCity;
    DOM.currentDistrict.textContent = gameState.currentDistrict;
}

// Update market display
function updateMarketDisplay() {
    // Clear market list
    DOM.marketList.innerHTML = '';
    
    // Check if market is empty
    if (Object.keys(gameState.market).length === 0) {
        const emptyRow = document.createElement('tr');
        const emptyCell = document.createElement('td');
        emptyCell.colSpan = 4; // Span across all columns
        emptyCell.classList.add('empty-message');
        emptyCell.textContent = 'No products available';
        emptyRow.appendChild(emptyCell);
        DOM.marketList.appendChild(emptyRow);
        return;
    }
    
    // Add each market product
    for (const productName in gameState.market) {
        const price = gameState.market[productName];
        const productInfo = GAME.PRODUCTS.find(p => p.name === productName);
        const weight = productInfo ? productInfo.weight : 1;
        
        // Get inventory quantity if any
        const inventoryQuantity = gameState.inventory.items[productName] || 0;
        
        // Create table row
        const row = document.createElement('tr');
        row.classList.add('market-item');
        
        // Product name cell (column 1)
        const nameCell = document.createElement('td');
        nameCell.classList.add('product-name');
        nameCell.textContent = `${productName} (${weight})`;
        
        // Price cell (column 2)
        const priceCell = document.createElement('td');
        priceCell.classList.add('product-price');
        priceCell.textContent = `$${formatMoney(price)}`;
        
        // Inventory cell (column 3)
        const inventoryCell = document.createElement('td');
        inventoryCell.classList.add('product-inventory');
        inventoryCell.textContent = inventoryQuantity;
        
        // Action cell (column 4)
        const actionCell = document.createElement('td');
        actionCell.classList.add('product-action');
        
        const buyBtn = document.createElement('button');
        buyBtn.classList.add('buy-btn');
        buyBtn.textContent = 'Buy';
        buyBtn.dataset.product = productName;
        
        // Disable buy button if no space
        const freeSpace = gameState.inventory.space.max - gameState.inventory.space.used;
        if (freeSpace < weight) {
            buyBtn.disabled = true;
            buyBtn.title = 'Not enough inventory space';
        }
        
        buyBtn.addEventListener('click', () => {
            showBuyModal(productName, price, weight);
        });
        
        actionCell.appendChild(buyBtn);
        
        // Add all cells to the row
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(inventoryCell);
        row.appendChild(actionCell);
        
        // Add row to the market list
        DOM.marketList.appendChild(row);
    }
}

// Show modal for buying a product
function showBuyModal(productName, price, weight) {
    const freeSpace = gameState.inventory.space.max - gameState.inventory.space.used;
    const maxQuantity = Math.floor(freeSpace / weight);
    const maxAffordable = Math.floor(gameState.cash / price);
    const maxPossible = Math.min(maxQuantity, maxAffordable);
    
    if (maxPossible <= 0) {
        if (maxQuantity <= 0) {
            addPlayerActionEvent("Not enough inventory space to buy this product.");
        } else {
            addPlayerActionEvent("You don't have enough cash to buy this product.");
        }
        return;
    }
    
    DOM.modalTitle.textContent = `Buy ${productName}`;
    
    let content = `
        <div class="buy-modal">
            <p>Price: $${formatMoney(price)}</p>
            <p>Weight per unit: ${weight}</p>
            <p>Cash available: $${formatMoney(gameState.cash)}</p>
            <p>Space available: ${freeSpace}/${gameState.inventory.space.max}</p>
            
            <div class="quantity-input">
                <label for="buy-quantity">Quantity to buy:</label>
                <input type="number" id="buy-quantity" min="1" max="${maxPossible}" value="1">
            </div>
            
            <p>Total cost: $<span id="buy-total">${formatMoney(price)}</span></p>
            <p>Weight: <span id="buy-weight">${weight}</span>/${freeSpace}</p>
            
            <div class="buy-actions">
                <button id="max-buy">Buy Max</button>
                <button id="confirm-buy">Confirm Purchase</button>
            </div>
        </div>
    `;
    
    DOM.modalContent.innerHTML = content;
    
    // Add event listeners
    const quantityInput = document.getElementById('buy-quantity');
    const buyTotal = document.getElementById('buy-total');
    const buyWeight = document.getElementById('buy-weight');
    
    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 1;
        buyTotal.textContent = formatMoney(price * quantity);
        buyWeight.textContent = weight * quantity;
    });
    
    document.getElementById('max-buy').addEventListener('click', () => {
        quantityInput.value = maxPossible;
        buyTotal.textContent = formatMoney(price * maxPossible);
        buyWeight.textContent = weight * maxPossible;
    });
    
    document.getElementById('confirm-buy').addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value) || 0;
        if (quantity > 0 && quantity <= maxPossible) {
            buyProduct(productName, quantity);
            closeModal();
        }
    });
    
    // Show the modal
    DOM.modalContainer.classList.remove('hidden');
}

// Random event for price spike
function priceSpike() {
    // Choose random product
    const productsArray = GAME.PRODUCTS.map(p => p.name);
    const randomProduct = productsArray[Math.floor(Math.random() * productsArray.length)];
    
    // Only apply if product is in market
    if (gameState.market[randomProduct]) {
        // Get the current price
        const currentPrice = gameState.market[randomProduct];
        
        // Increase price by 50-150%
        const spikeMultiplier = 1.5 + Math.random();
        const newPrice = Math.round(currentPrice * spikeMultiplier);
        
        // Set the new price
        gameState.market[randomProduct] = newPrice;
        
        // Add event
        addDrugNewsEvent(`💰 Price spike! ${randomProduct} prices have risen to $${formatMoney(newPrice)} due to increased demand.`);
    }
}

// Random event for product scarcity
function productScarcity() {
    // Choose random product
    const productsArray = GAME.PRODUCTS.map(p => p.name);
    const randomProduct = productsArray[Math.floor(Math.random() * productsArray.length)];
    
    // Remove the product from market
    if (gameState.market[randomProduct]) {
        delete gameState.market[randomProduct];
        
        // Add event
        addDrugNewsEvent(`🚫 ${randomProduct} has become temporarily unavailable in ${gameState.currentCity}, ${gameState.currentDistrict} due to supply issues.`);
    }
}

// Random event for police bust
function policeBust() {
    // Choose random product
    const productsArray = GAME.PRODUCTS.map(p => p.name);
    const randomProduct = productsArray[Math.floor(Math.random() * productsArray.length)];
    
    // Only apply if product is in market
    if (gameState.market[randomProduct]) {
        // Increase price due to reduced supply
        const bustMultiplier = 1.3 + (Math.random() * 0.7);  // 1.3-2.0x price increase
        gameState.market[randomProduct] = Math.round(gameState.market[randomProduct] * bustMultiplier);
        
        // Increase heat level
        if (gameState.police) {
            gameState.police.heatLevel = Math.min(100, gameState.police.heatLevel + 10);
            updateHeatDisplay();
        }
        
        // Add event
        addDrugNewsEvent(`🚔 Police bust! ${randomProduct} prices have increased to $${formatMoney(gameState.market[randomProduct])} after a major bust in ${gameState.currentCity}.`);
        addPlayerActionEvent(`Police presence has increased. Your heat level is now ${Math.round(gameState.police.heatLevel)}.`);
    }
}

// Random event for bulk deal
function bulkDeal() {
    // Choose random product
    const productsArray = GAME.PRODUCTS.map(p => p.name);
    const randomProduct = productsArray[Math.floor(Math.random() * productsArray.length)];
    
    // Only apply if product is in market
    if (gameState.market[randomProduct]) {
        // Reduce price for bulk purchase opportunity
        const discountMultiplier = 0.5 + (Math.random() * 0.2);  // 50-70% of original price
        const discountedPrice = Math.round(gameState.market[randomProduct] * discountMultiplier);
        
        // Get product info for weight calculations
        const productInfo = GAME.PRODUCTS.find(p => p.name === randomProduct);
        const weight = productInfo ? productInfo.weight : 1;
        
        // Calculate maximum affordable quantity based on cash and space
        const freeSpace = gameState.inventory.space.max - gameState.inventory.space.used;
        const maxQuantity = Math.floor(freeSpace / weight);
        const maxAffordable = Math.floor(gameState.cash / discountedPrice);
        const bulkQuantity = Math.min(maxQuantity, maxAffordable, 50);  // Cap bulk deals at 50 units
        
        // Only offer if player can afford and has space for at least 10 units
        if (bulkQuantity >= 10) {
            const totalCost = discountedPrice * bulkQuantity;
            
            // Show bulk deal modal
            DOM.modalTitle.textContent = "Bulk Deal Opportunity";
            
            let content = `
                <div class="bulk-deal-modal">
                    <p>A supplier is offering a bulk deal on ${randomProduct}!</p>
                    <p>Regular price: $${formatMoney(gameState.market[randomProduct])}</p>
                    <p>Bulk deal price: $${formatMoney(discountedPrice)}</p>
                    <p>Quantity: ${bulkQuantity}</p>
                    <p>Total cost: $${formatMoney(totalCost)}</p>
                    <p>This is a limited-time offer!</p>
                    
                    <div class="bulk-actions">
                        <button id="accept-bulk">Accept Deal</button>
                        <button id="reject-bulk">Reject</button>
                    </div>
                </div>
            `;
            
            DOM.modalContent.innerHTML = content;
            
            // Add event listeners
            document.getElementById('accept-bulk').addEventListener('click', () => {
                // Process the purchase
                gameState.cash -= totalCost;
                
                // Update inventory
                if (!gameState.inventory.items[randomProduct]) {
                    gameState.inventory.items[randomProduct] = 0;
                }
                gameState.inventory.items[randomProduct] += bulkQuantity;
                
                // Update inventory space
                gameState.inventory.space.used += bulkQuantity * weight;
                
                // Increase heat level - bulk deals attract more attention
                if (gameState.police) {
                    const heatIncrease = Math.log10(totalCost) * 3;
                    gameState.police.heatLevel = Math.min(100, gameState.police.heatLevel + heatIncrease);
                }
                
                // Update displays
                updatePlayerStats();
                updateInventoryDisplay();
                updateHeatDisplay();
                
                // Add event
                addPlayerActionEvent(`Purchased ${bulkQuantity} ${randomProduct} in a bulk deal for $${formatMoney(totalCost)}.`);
                
                closeModal();
            });
            
            document.getElementById('reject-bulk').addEventListener('click', () => {
                addPlayerActionEvent(`Rejected the bulk deal on ${randomProduct}.`);
                closeModal();
            });
            
            // Show the modal
            DOM.modalContainer.classList.remove('hidden');
            
            // Add event to log
            addDrugNewsEvent(`📦 Bulk deal opportunity: ${randomProduct} available at a discount!`);
        }
    }
}

// The following are asynchronous tasks that exist but need to be defined to avoid errors
async function updateAsyncUI() {
    // This function can be filled in later or left as a placeholder
}

// Update the display with asynchronous data
async function updateAsyncDisplay() {
    // This function can be filled in later or left as a placeholder
}

// Stress the server for bugged demos
async function stressServer() {
    // We don't need this function for the game, but define it to avoid errors
    console.warn("stressServer called, but not implemented");
}

// Process user-input game data
async function processGameData(data) {
    // We don't need this function for the game, but define it to avoid errors
    console.warn("processGameData called with:", data);
}

// Get game nature and generate appropriate description
function gameNature() {
    // This is a fictional function call that may have been referenced
    return "A game about buying and selling products in various cities.";
}

// This is another placeholder for any function references that may be in the code
function getBackground() {
    // Return a default background
    return "black";
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
        updateUnlockedCities(); // Check if player can unlock new cities
        
        // Add event
        addPlayerActionEvent(`Purchased ${propertyName} for $${formatMoney(property.cost)}. Your storage capacity is now ${gameState.storage.totalCapacity}.`);
    }
}

// Add autosave functionality on day end
function enhancedEndDayWithAutosave() {
    // Call the enhanced end day function
    enhancedEndDay();
    
    // Autosave every 3 days
    if (gameState.day % 3 === 0) {
        saveGame();
        addPlayerActionEvent("Game autosaved.");
    }
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
    enhancedPoliceEncounter();
    
    // Generate new market prices
    enhancedMarketPrices();
    
    // Update displays
    updatePlayerStats();
    updateMarketDisplay();
    updateHeatDisplay();
    updateUnlockedCities(); // Check if player can unlock new cities
    
    // Add events to log
    addPlayerActionEvent(`Day ${gameState.day}: A new day begins.`);
    
    if (interestAmount > 0) {
        addPlayerActionEvent(`Interest added to debt: $${formatMoney(interestAmount)}.`);
    }
    
    addDrugNewsEvent(`Market prices have updated for day ${gameState.day}.`);
}

// Generate random events with enhanced system
function enhancedRandomEvents() {
    // Get the city's effect on events
    const cityInfo = WORLD_MAP[gameState.currentCity];
    const volatilityModifier = cityInfo ? cityInfo.marketVolatility || 1.0 : 1.0;
    const gangWarModifier = cityInfo && cityInfo.gangWarChance ? cityInfo.gangWarChance : 1.0;
    
    // Police bust chance - higher in high-police activity cities
    const policeModifier = cityInfo ? cityInfo.policeActivity || 1.0 : 1.0;
    if (Math.random() < ENHANCED_EVENTS.POLICE_BUST_CHANCE * policeModifier) {
        policeBust();
    }
    
    // Price spike chance - affected by market volatility
    if (Math.random() < ENHANCED_EVENTS.PRICE_CHANGE_CHANCE * volatilityModifier) {
        priceSpike();
    }
    
    // Product scarcity chance - affected by market volatility
    if (Math.random() < ENHANCED_EVENTS.PRODUCT_SCARCITY_CHANCE * volatilityModifier) {
        productScarcity();
    }
    
    // Price crash chance (new) - affected by market volatility
    if (Math.random() < ENHANCED_EVENTS.PRICE_CRASH_CHANCE * volatilityModifier) {
        priceCrash();
    }
    
    // Market flood chance (new) - affected by market volatility
    if (Math.random() < ENHANCED_EVENTS.MARKET_FLOOD_CHANCE * volatilityModifier) {
        marketFlood();
    }
    
    // High demand chance (new) - affected by market volatility
    if (Math.random() < ENHANCED_EVENTS.HIGH_DEMAND_CHANCE * volatilityModifier) {
        highDemand();
    }
    
    // Gang war chance (new) - affected by city's gang activity
    if (Math.random() < ENHANCED_EVENTS.GANG_WAR_CHANCE * gangWarModifier) {
        enhancedGangWar();
    }
}

// Enhanced police encounter that considers city-specific police activity
function enhancedPoliceEncounter() {
    // Skip if player had an encounter recently (last 3 days)
    if (gameState.day - gameState.police.lastEncounter < 3) {
        return;
    }
    
    // Get district police activity modifier
    const districtModifier = getDistrictPoliceLevel(gameState.currentDistrict);
    
    // Apply city-specific police activity
    const cityInfo = WORLD_MAP[gameState.currentCity];
    const cityPoliceModifier = cityInfo ? (cityInfo.policeActivity || 1.0) : 1.0;
    
    // Calculate encounter probability based on heat level, district, and city
    const encounterProbability = (gameState.police.heatLevel / 100) * districtModifier * cityPoliceModifier * 0.5;
    
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
    enhancedPoliceModal(encounterType);
}

// Enhanced police encounter handling with city-specific features
function enhancedPoliceModal(encounterType) {
    // Calculate bribe effectiveness based on city corruption level
    const cityInfo = WORLD_MAP[gameState.currentCity];
    const corruptionModifier = cityInfo && cityInfo.policeCorruption ? cityInfo.policeCorruption : 1.0;
    
    // Calculate bribe amount based on heat level and player's cash
    const minBribe = 1000 + (gameState.police.heatLevel * 100);
    // Corrupt cities have lower bribe requirements
    const adjustedMinBribe = Math.round(minBribe / corruptionModifier);
    const recommendedBribe = Math.min(Math.round(gameState.cash * 0.15), adjustedMinBribe);
    const canAffordBribe = gameState.cash >= adjustedMinBribe;
    
    // Calculate chances of success for different options
    const runChance = Math.max(10, 50 - gameState.police.heatLevel / 2);
    const fightChance = Math.max(5, 30 - gameState.police.heatLevel / 2);
    const bribeEffectiveness = Math.min(90, Math.round((recommendedBribe / adjustedMinBribe) * 100 * corruptionModifier));
    
    // Display city-specific info in the police encounter modal
    let citySpecificInfo = "";
    if (corruptionModifier > 1.0) {
        citySpecificInfo = `<p class="city-police-info">The police in ${gameState.currentCity} are known to be corrupt and more receptive to bribes.</p>`;
    } else if (cityInfo && cityInfo.policeActivity > 1.3) {
        citySpecificInfo = `<p class="city-police-info">Warning: ${gameState.currentCity} has extremely strict drug enforcement.</p>`;
    } else if (cityInfo && cityInfo.policeActivity < 0.7) {
        citySpecificInfo = `<p class="city-police-info">${gameState.currentCity} has relaxed police enforcement compared to other cities.</p>`;
    }
    
    // Now build the modal content with this information
    DOM.modalTitle.textContent = encounterType.name;
    
    let content = `
        <div class="police-encounter">
            <p class="encounter-description">${encounterType.description} They're checking everyone in ${gameState.currentDistrict}.</p>
            <p class="heat-level">Your current heat level: <span class="heat-value">${Math.round(gameState.police.heatLevel)}/100</span></p>
            ${citySpecificInfo}
            
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
                    <p>Minimum bribe: $${formatMoney(adjustedMinBribe)}</p>
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
    
    // Get city's corruption modifier for bribes
    const cityInfo = WORLD_MAP[gameState.currentCity];
    const corruptionModifier = cityInfo && cityInfo.policeCorruption ? cityInfo.policeCorruption : 1.0;
    
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
            // Bribes are more effective in corrupt cities
            const adjustedSuccessChance = Math.min(100, successChance * corruptionModifier);
            result = Math.random() < (adjustedSuccessChance / 100);
            
            // Pay the bribe regardless of outcome
            gameState.cash -= bribeAmount;
            gameState.police.bribesGiven++;
            
            if (result) {
                message = `The officer pockets your cash and tells his colleagues to leave you alone.${corruptionModifier > 1.2 ? ' In this city, officials are known to be quite cooperative.' : ''}`;
                gameState.police.heatLevel = Math.max(0, gameState.police.heatLevel - (30 * corruptionModifier));
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
        updateUnlockedCities(); // Check if player can unlock new cities
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
        serveJailTime(consequences.jailTime * multiplier);
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

// Decrease heat level over time - influenced by city
function decreaseHeatLevel() {
    if (!gameState.police) return;
    
    // Calculate city's police modifier for heat decay
    const cityInfo = WORLD_MAP[gameState.currentCity];
    const policeModifier = cityInfo ? (cityInfo.policeActivity || 1.0) : 1.0;
    
    // Cities with high police activity have slower heat decay
    const baseDecay = 5; // 5 points per day
    const decay = baseDecay / policeModifier;
    
    // Heat naturally decreases
    gameState.police.heatLevel = Math.max(0, gameState.police.heatLevel - decay);
}

// Increase heat level based on transaction size
function increaseHeatLevel(transactionValue) {
    if (!gameState.police) return;
    
    // Calculate city's police activity modifier
    const cityInfo = WORLD_MAP[gameState.currentCity];
    const policeModifier = cityInfo ? cityInfo.policeActivity || 1.0 : 1.0;
    
    // Larger transactions draw more attention, modified by city's police presence
    const heatIncrease = Math.log10(transactionValue) * 2 * policeModifier;
    gameState.police.heatLevel = Math.min(100, gameState.police.heatLevel + heatIncrease);
    
    // If heat is high, give warnings to player
    if (gameState.police.heatLevel > 70) {
        addPlayerActionEvent("⚠️ Your heat level is very high. Lay low or bribe officials to reduce police attention.");
    } else if (gameState.police.heatLevel > 40) {
        addPlayerActionEvent("Note: Your activities are attracting some police attention.");
    }
}

// Enhanced gang war that considers city-specific gang activity
function enhancedGangWar() {
    // Get city-specific gang war modifier
    const cityInfo = WORLD_MAP[gameState.currentCity];
    const gangWarModifier = cityInfo && cityInfo.gangWarChance ? cityInfo.gangWarChance : 1.0;
    
    // Increase some prices due to territory disputes
    let affectedProducts = [];
    const productKeys = Object.keys(gameState.market);
    
    // Select 1-3 random products to affect, more in high-gang-activity cities
    const numAffected = Math.round((1 + Math.floor(Math.random() * 3)) * gangWarModifier);
    for (let i = 0; i < numAffected && i < productKeys.length; i++) {
        const randomIndex = Math.floor(Math.random() * productKeys.length);
        const product = productKeys[randomIndex];
        
        // Remove this product from future consideration
        productKeys.splice(randomIndex, 1);
        
        // Increase price by 30-100%, more in high-gang-activity cities
        const warMultiplier = 1.3 + (Math.random() * 0.7 * gangWarModifier);
        gameState.market[product] = Math.round(gameState.market[product] * warMultiplier);
        affectedProducts.push(product);
    }
    
    // Add event with city-specific description
    let gangWarMessage = `⚔️ Gang war! Violence has broken out in ${gameState.currentDistrict}!`;
    
    if (gangWarModifier > 1.5) {
        gangWarMessage += ` Cartel violence is particularly intense in ${gameState.currentCity}.`;
    } else if (gangWarModifier > 1.0) {
        gangWarMessage += ` Gang activity is elevated in this city.`;
    }
    
    addDrugNewsEvent(gangWarMessage);
    
    // Chance of player getting injured (losing money for medical bills)
    // Higher in high-gang-activity cities
    const injuryChance = 0.4 * gangWarModifier;
    if (Math.random() < injuryChance && gameState.cash > 0) {
        const injuryCost = Math.min(gameState.cash * 0.15 * gangWarModifier, 5000 * gangWarModifier);
        gameState.cash -= Math.round(injuryCost);
        addPlayerActionEvent(`You were injured in the gang war crossfire! Medical bills cost you $${formatMoney(Math.round(injuryCost))}.`);
        updatePlayerStats();
    }
    
    // Update market display
    updateMarketDisplay();
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
    updateUnlockedCities(); // Check if player can unlock new cities now
    
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
    updateUnlockedCities(); // Check if player can unlock new cities now
    
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

// Execute a product purchase with heat increase
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

// Execute a product sale with heat increase
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
    updateUnlockedCities(); // Check if player can unlock new cities
    
    // Add event
    addPlayerActionEvent(`Sold ${quantity} ${productName} for $${formatMoney(totalValue)}.`);
}

// Update unlocked cities display with sorted cities
function updateUnlockedCities() {
    // Clear the cities list
    DOM.citiesList.innerHTML = '';
    
    // Sort cities by unlock cost
    const sortedCities = getSortedCities();
    
    // Add each city to the list
    for (const cityData of sortedCities) {
        const city = cityData.name;
        const cityInfo = WORLD_MAP[city];
        const listItem = document.createElement('li');
        
        if (cityInfo.unlocked) {
            listItem.textContent = `${city} ✓`;
        } else {
            listItem.textContent = `${city} 🔒 $${formatMoney(cityInfo.unlockCost)}`;
            listItem.classList.add('locked');
            
            // If player can unlock this city, add a special class
            if (canUnlockCity(city)) {
                listItem.classList.add('can-unlock');
            }
        }
        
        DOM.citiesList.appendChild(listItem);
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

// End the game and show final score
function endGame() {
    // Delete any existing saved game when the game ends
    deleteSavedGame();
    
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
                
                <div class="empire-summary">
                    <p>Cities Unlocked: ${Object.values(WORLD_MAP).filter(city => city.unlocked).length}/${Object.keys(WORLD_MAP).length}</p>
                    <p>Storage Capacity: ${gameState.inventory.space.max}</p>
                    ${gameState.police ? `<p>Final Heat Level: ${Math.round(gameState.police.heatLevel)}/100</p>` : ''}
                    ${gameState.storage && gameState.storage.ownedProperties ? 
                      `<p>Properties Owned: ${Object.keys(gameState.storage.ownedProperties).length}</p>` : ''}
                </div>
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

// Helper function to add city styles to the page
function addCityStyles() {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        /* Save/Load Buttons Styling */
        .action-btn, #continue-game-btn {
            background: linear-gradient(to right, var(--blue-glow), var(--secondary));
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 15px;
            cursor: pointer;
            margin-top: 10px;
            transition: all 0.3s;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            box-shadow: 0 0 8px rgba(0, 195, 255, 0.4);
            font-weight: bold;
            letter-spacing: 0.5px;
        }

        .action-btn:hover, #continue-game-btn:hover {
            background: linear-gradient(to right, var(--secondary), var(--blue-glow));
            box-shadow: 0 0 12px rgba(0, 195, 255, 0.6);
            transform: translateY(-2px);
        }

        #new-game-btn {
            background: linear-gradient(to right, var(--warning), var(--danger));
            box-shadow: 0 0 8px rgba(255, 90, 90, 0.4);
        }

        #new-game-btn:hover {
            background: linear-gradient(to right, var(--danger), var(--warning));
            box-shadow: 0 0 12px rgba(255, 90, 90, 0.6);
        }

        #continue-game-btn {
            padding: 15px 30px;
            font-size: 18px;
            margin-bottom: 15px;
            background: linear-gradient(to right, var(--success), var(--secondary));
        }

        .modal-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }

        .modal-buttons button {
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
        }

        #confirm-load, #confirm-new-game {
            background: linear-gradient(to right, var(--success), #00ff99);
            color: white;
            border: none;
            box-shadow: 0 0 8px rgba(57, 255, 20, 0.4);
        }

        #cancel-load, #cancel-new-game {
            background: linear-gradient(to right, var(--danger), #ff8c8c);
            color: white;
            border: none;
            box-shadow: 0 0 8px rgba(255, 90, 90, 0.4);
        }

        #confirm-new-game {
            background: linear-gradient(to right, var(--warning), var(--danger));
        }
        
        /* City progression styling */
        .cities-list {
            max-height: 350px;
            overflow-y: auto;
        }

        .city-option {
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .city-option.can-unlock {
            border-left-color: var(--highlight);
            opacity: 1;
        }

        .city-unlock-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;
        }

        .unlock-cost {
            color: var(--secondary);
            font-size: 0.9em;
        }

        .unlock-city-btn {
            padding: 5px 10px;
            margin: 0;
            background: linear-gradient(to right, var(--success), #00ff99);
            font-size: 0.9em;
        }

        .city-feature {
            font-size: 0.85em;
            color: var(--text-secondary);
            font-style: italic;
            margin-top: 5px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 5px;
        }

        /* Police encounter city-specific info */
        .city-police-info {
            background-color: rgba(57, 255, 20, 0.1);
            border-left: 3px solid var(--highlight);
            padding: 8px;
            margin-bottom: 15px;
            font-style: italic;
        }
        
        /* Game over empire summary */
        .empire-summary {
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px dotted rgba(255, 255, 255, 0.2);
        }

        /* Right panel styling for hiding unlocked cities */
        #right-panel {
            display: flex;
            flex-direction: column;
        }

        #actions-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
        }

        #actions-panel button {
            margin-top: 8px; /* Adjust spacing between buttons */
        }

        #unlocked-cities-panel {
            display: none; /* This hides the unlocked cities panel */
        }

        /* If you want the buttons to fill the width of the panel */
        #actions-panel button {
            width: 100%;
        }
    `;
    
    document.head.appendChild(styleElement);
}