function generateDayWiseTimeSeries(baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
}

export var stackedArea = {
    chart: {
        height: 300,
        type: 'area',
        stacked: true,
        toolbar: {
            show: false,
        },
        events: {
            selection: function(chart, e) {
            console.log(new Date(e.xaxis.min) )
            }
        },
    },

    colors: ['#2f4858', '#ff7f81', '#e4bd51'],
    dataLabels: {
        enabled: false
    },

    series: [
        {
            name: 'South',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 60
            })
        },{
            name: 'North',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 20
            })
        },{
            name: 'Central',
            data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
                min: 10,
                max: 15
            })
        }
    ],

    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.8,
        }
    },

    legend: {
        position: 'top',
        horizontalAlign: 'right',
        show: true,
    },
    xaxis: {
        type: 'datetime',            
    },
    grid: {
        yaxis: {
            lines: {
                show: false,
            }
        },
        padding: {
            top: 20,
            right: 0,
            bottom: 0,
            left: 0
        },
    },
    stroke: {
        show: true,
        curve: 'smooth',
        width: 2,
    },
}