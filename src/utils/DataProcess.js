// File: DataProcess.js

export function uppercaseKeys(data) {
    if (typeof data === 'string') {
    return data;
} else if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
    return data.map(uppercaseKeys);
    } else {
    const newObject = {};
    for (const key in data) {
        newObject[key.toUpperCase()] = uppercaseKeys(data[key]);
    }
    return newObject;
    }
} else {
    return data;
}
}

// Define the path for the ecosystem_cards
// reads from local 
// const TX_STATS_PATH = 'test-data/ecosystem_17_cards.json';
// production 
const TX_STATS_PATH = "http://ethmetrics.carlos-mercado.workers.dev";

// Fetch function to load the JSON file
export async function fetchData(path) {
    //console.log(path)
        try {
        const response = await fetch(path);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        
        // Unboxing: If data is an array with only one item, return that item
        if (Array.isArray(data) && data.length === 1) {
            data = data[0];
            
        }

        return data;
    } catch (error) {
        console.error("There was a problem fetching the data:", error);
        return null;
    }
}

// Process the data for the Ecosystem cards
export async function processEcosystemCards() {
    const txStatsData = await fetchData(TX_STATS_PATH);
    // will need to insert forecast here as 9th card 

    return txStatsData;
}
