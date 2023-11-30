<script>
    import Category from '../components/Category.svelte';
    import { uppercaseKeys, processEcosystemCards } from '../utils/DataProcess.js';
    let cardsData = null; 
    let categories = [];

    processEcosystemCards().then(data => {
        cardsData = data;  
        cardsData = uppercaseKeys(cardsData);
       // console.log(cardsData);
    });

    $: if (cardsData) {
    categories = [
        {
            label: "Transactions",
            names: ["# Tx", "# Failed", "% Failed"],
            values: [cardsData?.TOTAL_FACT_TX, cardsData?.TOTAL_FAILED_TX, cardsData?.TOTAL_PERCENT_FAILED_TX],
            format: ['million', 'number', 'percent']
        },
        {
            label: "Raw Ether",
            names: ["#Transfers", "Transfer Volume", "Fees Paid"],
            values: [cardsData?.TOTAL_RAW_ETH_TRANSFERS, cardsData?.TOTAL_ETH_TRANSFER_VOLUME, cardsData?.TOTAL_ETH_TX_FEES],
            format: ['million', 'eth', 'eth']
        
        },
        {
            label: "Accounts",
            names: ["Avg DAU", "# New Users", "# New Contracts"],
            values: [cardsData?.AVG_DAILY_USER, cardsData?.N_NEW_EOAS, cardsData?.TOTAL_NEW_CONTRACTS],
            format: ['floor', 'number', 'number']
        
        },
        {
            label: "ETH Price",
            names: ["Low (USD)", "High (USD)", "24 Hr Forecast"],
            // put forecast here 
            values: [cardsData?.MONTH_LOW_PRICE, + cardsData?.MONTH_HIGH_PRICE, 0],
            format: ['dollar', 'dollar', 'dollar']
        
        },
        {
            label: "DEX",
            names: ["# Swap Tx", "Volume (Billion USD)", "Uniswap %"],
            values: [cardsData?.TOTAL_SWAP_TX, cardsData?.TOTAL_USD_SWAP_VOLUME, cardsData?.TOTAL_UNISWAP_DOMINANCE],
            format: ['million', 'billion-dollar', 'percent']
        
        },
        {
            label: "NFT",
            names: ["# Mint Tx", "# Sale Tx", "Mint+Sale Volume (ETH)"],
            values: [cardsData?.TOTAL_MINT_TX, cardsData?.TOTAL_NFT_SALES_TX, cardsData?.TOTAL_ETH_MINT_SALES_VOLUME],
            format: ['number', 'number', 'eth']
        }
    ];
    }

</script>

<div class = 'central_layout'>
    <p>Key Summary Stats on Ethereum over the last 30 days</p>
    <p>(Updates 12AM UTC every day)</p>
</div>
<div class = 'central_layout'>
    {#if cardsData}
    {#each categories as category}
    <Category categoryLabel={category.label} names_array={category.names} values_array={category.values} format_array = {category.format} />
    {/each}
    {:else}
    <p>Loading...</p>
    {/if}
</div>