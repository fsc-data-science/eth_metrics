<script>
    export let name = "";
    export let value = 0;
    export let format = "number"; 

    function formatValue(value, format) {
    switch (format) {
        case "percent":
            return (value * 100).toFixed(1) + "%";
        case "floor":
            return Math.floor(value).toLocaleString(); 
        case "million":
            return (value / 1e6).toFixed(2).toLocaleString() + " M";
        case "million-dollar":
            return "$ " + (value / 1e6).toLocaleString() + " M";
        case "billion":
            return (value / 1e9).toLocaleString() + " B";
        case "billion-dollar":
            return "$ " + (value / 1e9).toFixed(2).toLocaleString() + " B";
        case "k":
            return (value / 1e3).toLocaleString() + " K";
        case "dollar":
            return "$" + value.toFixed(2).toLocaleString();
        case "eth":
            return "Ξ " + Math.floor(value).toLocaleString(); // Floors, formats with commas, and appends the ETH symbol
        case "number":
        default:
            return value.toLocaleString();
    }
}


    $: formattedValue = formatValue(value, format);
</script>

<style>
    .card {
        border: 1px solid black;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 1rem;
        margin: 0.5rem;
        min-width: 5rem;
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
