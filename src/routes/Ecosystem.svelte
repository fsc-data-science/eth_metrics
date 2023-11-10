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
            values: [cardsData?.TOTAL_FACT_TX, cardsData?.TOTAL_FAILED_TX, 100*cardsData?.TOTAL_PERCENT_FAILED_TX + "%"]
        },
        {
            label: "Raw Ether",
            names: ["#Transfers", "Transfer Volume", "Fees Paid"],
            values: [cardsData?.TOTAL_RAW_ETH_TRANSFERS, cardsData?.TOTAL_ETH_TRANSFER_VOLUME, cardsData?.TOTAL_ETH_TX_FEES]
        
        },
        {
            label: "Accounts",
            names: ["Avg DAU", "# New Users", "# New Contracts"],
            values: [cardsData?.AVG_DAILY_USER, cardsData?.N_NEW_EOAS, cardsData?.TOTAL_NEW_CONTRACTS]
        
        },
        {
            label: "ETH Price",
            names: ["Low (USD)", "High (USD)", "24 Hr Forecast"],
            // put forecast here 
            values: [+ cardsData?.MONTH_LOW_PRICE, + cardsData?.MONTH_HIGH_PRICE, 'TBD']
        
        },
        {
            label: "DEX",
            names: ["# Swap Tx", "Volume (Billion USD)", "Uniswap %"],
            values: [cardsData?.TOTAL_SWAP_TX, cardsData?.TOTAL_USD_SWAP_VOLUME/1e9, 100*cardsData?.TOTAL_UNISWAP_DOMINANCE]
        
        },
        {
            label: "NFT",
            names: ["# Mint Tx", "# Sale Tx", "Mint+Sale Volume (ETH)"],
            values: [cardsData?.TOTAL_MINT_TX, cardsData?.TOTAL_NFT_SALES_TX, cardsData?.TOTAL_ETH_MINT_SALES_VOLUME]
        }
    ];
    }

</script>

<div class = 'central_layout'>
    {#if cardsData}
    {#each categories as category}
    <Category categoryLabel={category.label} names_array={category.names} values_array={category.values} />
    {/each}
    {:else}
    <p>Loading...</p>
    {/if}
</div>