<script>
    import { processEcosystemCards } from '../utils/DataProcess.js';

    let cardsData = null; 

    processEcosystemCards().then(data => {
        cardsData = data;  
    });

</script>

<h2>Ecosystem Page</h2>

{#if cardsData}
    {#each Object.entries(cardsData) as [key, value]}
        <h3>{key}</h3>
        <p>{value}</p>
    {/each}
{:else}
    <p>Loading...</p>
{/if}