<script>
import Scatterplot from '../components/Scatterplot.svelte';

const data = [
    { a: 1, b: 4 },
    { a: 2, b: 5 },
    { a: 3, b: 6 },
    { a: 4, b: 7 },
];
</script>

<Scatterplot
{data}
xKey="a"
yKey="b"
title="My Scatterplot"
xaxis="X-Axis Label"
yaxis="Y-Axis Label"
yRange={[0, 10]}
/>
