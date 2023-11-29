<script>
    import { onMount } from 'svelte';

    // Import Highcharts and necessary modules
    import Highcharts from 'highcharts';
    import HighchartsMore from 'highcharts/highcharts-more';
    import HighchartsExporting from 'highcharts/modules/exporting';
    import HighchartsOfflineExporting from 'highcharts/modules/offline-exporting';

    HighchartsMore(Highcharts);
    HighchartsExporting(Highcharts);
    HighchartsOfflineExporting(Highcharts);

    export let data = [];
    export let xKey = 'a';
    export let yKey = 'b';
    export let title = 'Scatterplot';
    export let xaxis = 'X-Axis';
    export let yaxis = 'Y-Axis';
    export let yRange = [0, 10];

    // Create the chart when the component is mounted
    onMount(() => {
        Highcharts.chart('chart-container', {
            chart: {
                type: 'scatter',
                zoomType: 'xy', // Enable box-style zoom
                zoomFactor: 999, // Adjust this value to control zoom sensitivity
            },
            title: {
                text: title,
            },
            xAxis: {
                title: {
                    text: xaxis,
                },
            },
            yAxis: {
                title: {
                    text: yaxis,
                },
                min: yRange[0],
                max: yRange[1],
            },
            plotOptions: {
                scatter: {
                    marker: {
                        symbol: 'circle',
                    },
                    lineColor: 'red', // Line color
                    lineWidth: 2,     // Line width
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormatter: function () {
                            // Customize hoverover text here
                            return `X: ${this.x}, Y: ${this.y}`;
                        },
                    },
                },
            },
            series: [
                {
                    name: 'Scatter Data',
                    data: data.map((item) => [item[xKey], item[yKey]]),
                },
            ],
            // Add a reset zoom button
            navigation: {
                buttonOptions: {
                    enabled: true,
                },
            },
        });
    });
</script>

<!-- Highcharts container -->
<div id="chart-container"></div>

<style>
    #chart-container {
        width: 60%;
        height: 250px; /* Adjust the height as needed */
    }
</style>
