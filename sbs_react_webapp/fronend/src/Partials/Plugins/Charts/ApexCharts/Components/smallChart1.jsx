export var options1 = {
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
    colors:['var(--theme-color4)'],
    series: [{
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
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
            show: false,
        }
    }
}