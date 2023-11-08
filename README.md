# ETH Metrics
 Ethereum Ecosystem Metrics, Powered by Flipside Pro

### Ecosystem

18 High Level summaries of Ethereum data across 6 categories over the last 30 days. Soon: 90, 365 days.

### Transactions
Coming Soon. Breakdowns of ethereum transactions, types, failure rates, etc.

### ETH
Coming Soon. Breakdowns of the native asset, ETH, including raw transfers, transaction fees paid, typical gas costs. 

### Accounts
Coming Soon. Breakdowns of Externally Owned Accounts (EOAs) and their counterpart in the EVM: Contracts. Trends for daily active users, unique contracts interacted with, and growth of new users. 

### ETH Price
Coming Soon. Historical price and related stats like standard deviation. Will also include a 24-hr forecast with confidence intervals for low and high price (this forecast will also include a retroactive assessment of how it *would have* done in previous 24 hours).

### DEX
Coming Soon. Breakdown of Decentralized Exchange interactions including volume, unique swappers, and Uniswap's Dominance.

### NFT 
Coming Soon. A huge breakdown of Mint, Sale, and Platform level data across both NFT types (ERC1155 and ERC721) and royalty/platform revenue.

# Svelte 

A svelte.js (single page) application builds off of the `public/test-data/` provided. For production, a cloudflare worker calls the /auto_arima API every 24 hours to get the latest transaction summaries & eth price forecast. 
 
 Worker code is provided as a template but note the key value storage that obscures access to the auto_arima API (see #R below)

# R 

Included is a R Plumber API under /auto_arima. The `api_key.txt` file is ignored but is not required for testing, as `ethusd_ohlc.json` is provided as a test file. 

For simplicity the R API handles auto-pagination of requests of to custom views developed in Flipside Pro, and servicing them as JSON.

# Flipside Pro 

Flipside Pro offers professional access to Flipside Crypto data including custom views and integration into our existing SDK using a private warehouse.