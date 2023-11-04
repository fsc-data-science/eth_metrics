<script>
    export let name = "";
    export let value = "";

    // Formatting the value as a number with commas
    $: formattedValue = typeof value === 'number' ? value.toLocaleString() : value;
</script>

<style>
    .card {
        border: 1px solid black;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* This gives a soft shadow */
        padding: 10px;
        margin: 10px;
        border-radius: 5px; /* Optional: For rounded corners */
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
