export var timeLine = {
    chart: {
        height: 350,
        type: 'rangeBar',
        toolbar: {
            show: false,
        }
    },        
    plotOptions: {
        bar: {
            horizontal: true,                
        }
    },
    colors: ['#2f4858', '#52616B'],

    series: [{
        name: 'Bob',            
        data: [{
            x: 'Design',
            y: [new Date('2019-03-02').getTime(), new Date('2019-03-03').getTime()]
        }, {
            x: 'Code',
            y: [new Date('2019-03-02').getTime(), new Date('2019-03-04').getTime()]
            
        }, {
            x: 'Test',
            y: [new Date('2019-03-04').getTime(), new Date('2019-03-07').getTime()]
        }, {
            x: 'Deployment',
            y: [new Date('2019-03-11').getTime(), new Date('2019-03-12').getTime()]
        }]
    }, {
        name: 'Joe',
        data: [{
            x: 'Design',
            y: [new Date('2019-03-01').getTime(), new Date('2019-03-02').getTime()] 
        }, {
            x: 'Code',
            y: [new Date('2019-03-03').getTime(), new Date('2019-03-07').getTime()] 
        }, {
            x: 'Test',
            y: [new Date('2019-03-06').getTime(), new Date('2019-03-09').getTime()]
        }, {
            x: 'Deployment',
            y: [new Date('2019-03-10').getTime(), new Date('2019-03-11').getTime()]
        }]
    }],
    yaxis: {
        min: new Date('2019-03-01').getTime(),
        max: new Date('2019-03-14').getTime()
    },
    xaxis: {
        type: 'datetime'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'light',
            type: "vertical",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
        }
    }
}