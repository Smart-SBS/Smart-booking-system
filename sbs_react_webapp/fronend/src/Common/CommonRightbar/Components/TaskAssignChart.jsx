export var TaskAssign = {
    chart: {
        height: 240,
        type: 'bar',
        toolbar: {
            show: false,
        },
    },
    colors: ['var(--theme-color1)', 'var(--theme-color2)', 'var(--theme-color4)'],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '80%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [{
        name: 'Pending',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        name: 'In Progress',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
        name: 'Completed',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    },
    fill: {
        opacity: 1

    },
}