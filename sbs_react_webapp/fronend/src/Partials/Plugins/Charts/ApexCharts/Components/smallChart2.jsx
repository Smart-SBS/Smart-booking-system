export var options2 = {
    chart: {
        type: 'line',
        width: 100,
        height: 35,
        sparkline: {
            enabled: true
        }
    },
    stroke: {
        width: 2
    },
    colors:['var(--theme-color3)'],
    series: [{
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
    }],
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