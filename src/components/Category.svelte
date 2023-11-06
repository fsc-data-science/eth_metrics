<!-- Category.svelte -->
<script>
    import Card from './Card.svelte';
    export let categoryLabel = "";
    export let names_array = [];
    export let values_array = [];
</script>

<style>
    h3 {
    text-align: center; 
    }
    div {
        display: flex;
        flex-direction: column;
    }
    @media (max-width: 768px) {
        div {
            flex-direction: row;
        }
    }
</style>

<div class="category">
    <h3>{categoryLabel}</h3>
    {#each names_array as name, index}
        <Card name={name} value={values_array[index]} />
    {/each}
</div>
