export var multipleRadarSeries = {
    chart: {
        height: 350,
        type: 'radar',
        dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
        }
    },
    colors: ['var(--theme-color1)', 'var(--theme-color2)', 'var(--theme-color3)'],
    series: [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100, 20],
    }, {
        name: 'Series 2',
        data: [20, 30, 40, 80, 20, 80],
    }, {
        name: 'Series 3',
        data: [44, 76, 78, 13, 43, 10],
    }],
    stroke: {
        width: 0
    },
    fill: {
        opacity: 0.4
    },
    markers: {
        size: 0
    },
    labels: ['2011', '2012', '2013', '2014', '2015', '2016']
}