export var ProjectAnalytics = {
    chart: {
        type: 'bar',
        width: 60,
        height: 60,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        width: 2
    },
    plotOptions: {
        bar: {
            columnWidth: '80%'
        }
    },
    colors:['var(--theme-color5)'],
    series: [{
        data: [25, 66, 41, 89, 63, 25]
    }],
    labels: [1, 2, 3, 4, 5, 6,],
    xaxis: {
        crosshairs: {
            width: 1
        },
    },
    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName) {
                    return ''
                }
            }
        },
        marker: {
            show: false
        }
    }
} 