export var simpleDonut = {
    chart: {
        height: 250,
        type: 'donut',
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        position: 'top',
        horizontalAlign: 'center',
        show: true,
    },
    colors: ['var(--theme-color1)', 'var(--theme-color2)', 'var(--theme-color3)', 'var(--theme-color4)'],
    series: [44, 55, 41, 17],
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
}