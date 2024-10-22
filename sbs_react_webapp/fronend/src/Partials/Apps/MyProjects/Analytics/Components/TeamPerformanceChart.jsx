export var TeamPerformance = {
    chart: {
        type: 'bar',
        height: 40,
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
    colors:['#ffffff'],
    series: [{
        data: [25,66,41,89,63,25,25,66,41,89,63,25,25,66,41,89,63,25,25,66,41,89,63,25,25,66,41,89,63,25]
    }],
    labels: [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
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