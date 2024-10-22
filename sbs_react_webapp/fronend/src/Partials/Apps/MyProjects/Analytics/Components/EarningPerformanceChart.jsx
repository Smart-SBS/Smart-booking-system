export var EarningPerformance = {
    series: [{
        name: 'Hire models',
        data: [31, 40, 28, 51, 42, 109, 100, 40, 28, 51, 42, 22]
    }, {
        name: 'Fixed rate',
        data: [11, 32, 42, 109, 100, 40, 28, 45, 32, 34, 52, 41]
    }],
    chart: {
        height: 340,
        type: 'area',
        toolbar: {
            show: false,
        }
    },
    colors: ['var(--theme-color1)', 'var(--theme-color2)'],
    fill: {
        type: "gradient",
        gradient: {
            //shade: "dark",
            //type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ['var(--theme-color1)', 'var(--theme-color2)'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 0.3,
            stops: [0, 100]
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 1,
    },
    xaxis: {
        categories: ["Jan","Feb","March","April","May","Jun","July","Aug","Sept","Oct","Nov","Dec",]
    },
};