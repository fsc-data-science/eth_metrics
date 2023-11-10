<script>
    export let name = "";
    export let value = "";

    // Formatting the value as a number with commas
    $: formattedValue = typeof value === 'number' ? parseFloat(value.toFixed(2)).toLocaleString() : value;
</script>


<style>
.card {
    border: 1px solid black;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin: 0.5rem;
    min-width: 5rem; /* Adjusted minimum width */
    border-radius: 0.5rem;
    background: linear-gradient(270deg, rgb(231, 231, 231) 1%, #ffffff 100%);
}
.card p {
    text-align: center;
}
.card h4 {
    text-align: center;
    font-weight: bold;
}
</style>


<div class="card">
    <h4>{name}</h4>
    <p>{formattedValue}</p>
</div>
