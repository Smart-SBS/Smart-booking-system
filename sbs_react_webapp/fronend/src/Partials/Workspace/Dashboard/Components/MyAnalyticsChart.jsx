export var MyAnalytics = {
    series: [{
        name: 'Revenue',
        data: [13, 23, 20, 8, 13, 27, 33, 12, 67, 22, 43, 21,]
    }, {
        name: 'Cost',
        data: [44, 55, 41, 67, 22, 43, 21, 49, 13, 23, 20, 8,]
    }],
    chart: {
        type: 'bar',
        height: 240,
        stacked: true,
        //stackType: '100%',
        toolbar: {
            show: false,
        },
    },
    colors: ['var(--theme-color1)', 'var(--accent-color)'],
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    xaxis: {
        categories: ['Jan', 'Feb', 'Marc', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
        labels: {
            style: {
                colors: ['#ffffff'],
            }
        }
    },
    fill: {
        opacity: 1
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        position: 'bottom',
    },
    tooltip: {
        y: [{
            title: {
                formatter: function (val) {
                    return val + " (K)"
                }
            }
        }, {
            title: {
                formatter: function (val) {
                    return val + " (K)"
                }
            }
        }]
    },
};
