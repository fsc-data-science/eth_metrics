<!-- Category.svelte -->
<script>
    import Card from './Card.svelte';
    export let categoryLabel = "";
    export let names_array = [];
    export let values_array = [];
</script>

<style>
    .category {
        display: flex;
        flex-direction: column; /* default to vertical layout */
    }
    @media (max-width: 768px) { /* adjust breakpoint as needed */
        .category {
            flex-direction: row; /* change to horizontal layout for smaller screens */
        }
    }
</style>

<div class="category">
    <h3>{categoryLabel}</h3>
    {#each names_array as name, index}
        <Card name={name} value={values_array[index]} />
    {/each}
</div>
