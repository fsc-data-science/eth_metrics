/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
// Define the cache key and set the cache time-to-live (TTL) in seconds
const CACHE_TTL = 60 * 60 * 24; // Cache for 24 hours

function basicHash(inputString) {
let hash = 0;
for (let i = 0; i < inputString.length; i++) {
const char = inputString.charCodeAt(i);
hash = (hash << 5) - hash + char;
}
// Ensure the hash is a non-negative integer
hash = Math.abs(hash);

// Convert the hash to a string
const hashString = hash.toString();

return 'cacheid_' + hashString;
}

export default {
async fetch(request, env, ctx) {
let data; // This will hold our data, either from cache or the fetch.
    
let query = await env.ethmetrics.get('test_query');
let CACHE_ID = basicHash(query);

// Try to get the data from the cache first
const cacheResponse =  await env.CACHE.get(CACHE_ID);
if (cacheResponse) {
    // If we have a cached response, parse it as we stored it as a string.
    data = JSON.parse(cacheResponse);
} else {
    // If not in cache, perform the API request.
    const BASEURL = await env.ethmetrics.get("base_url");
    
    // Ensure proper encoding of parameters.
    const queryParams = new URLSearchParams({
    query: query,
    api_key: await env.ethmetrics.get('api_key'),
    src: await env.ethmetrics.get('role')
    });
    
    const apiURL = `${BASEURL}/auto_paginate_query?${queryParams}`;
    

    const response = await fetch(apiURL);
    
    if (response.ok) {
    // Parse the response as JSON
    data = await response.json();
    
    // Cache the stringified response with a TTL
        ctx.waitUntil(env.CACHE.put(CACHE_ID, JSON.stringify(data), { expirationTtl: CACHE_TTL }));
    } else {
    // Handle errors, e.g., by returning a fallback response or re-throwing the error
    throw new Error(`API request failed with status ${response.status}`);
    }
}

console.log(JSON.stringify(data));

// Return the response, either from the cache or freshly fetched
return new Response(JSON.stringify(data), {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow access from all origins
        'Access-Control-Allow-Methods': 'GET', // Allow all HTTP methods
        }
});
}
};
