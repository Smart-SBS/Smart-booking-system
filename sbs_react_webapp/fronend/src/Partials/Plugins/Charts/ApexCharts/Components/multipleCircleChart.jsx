export var multipleCircleChart = {
    chart: {
        height: 250,
        type: 'radialBar',
    },
    colors: ['var(--theme-color1)', 'var(--theme-color2)', 'var(--theme-color3)', 'var(--theme-color4)'],
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                },
                total: {
                    show: true,
                    label: 'Total',
                    formatter: function (w) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 249
                    }
                }
            }
        }
    },
    series: [44, 55, 67, 83],
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],        
}