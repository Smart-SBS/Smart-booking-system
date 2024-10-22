import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Chart from 'react-apexcharts'
import CardAction from '../../../Widgets/CardAction/CardAction';

import { spark1 } from './Components/spark1';
import { spark2 } from './Components/spark2';
import { spark3 } from './Components/spark3';
import { options1 } from './Components/smallChart1';
import { options2 } from './Components/smallChart2';
import { options3 } from './Components/smallChart3';
import { options4 } from './Components/smallChart4';
import { stackedArea } from './Components/stackedAreaChart';
import { dateTime } from './Components/dateTimeChart';
import { timeLine } from './Components/timeLineChart';
import { basicBar } from './Components/basicBarChart';
import { candleStick } from './Components/candleStickChart';
import { basicColumn } from './Components/basicColumnChart';
import { basicHeatmap } from './Components/basicHeatMapChart';
import { scatterChart } from './Components/scatterChart';
import { basicLineColumn } from './Components/basicLineColumnChart';
import { basicRadar } from './Components/basicRadar';
import { multipleRadarSeries } from './Components/multipleRadarSeriesChart';
import { radarPolygon } from './Components/radarPolygonChart';
import { simpleDonut } from './Components/simpleDonutChart';
import { circleChart } from './Components/circleChart';
import { multipleCircleChart } from './Components/multipleCircleChart';
import { circleGradient } from './Components/circleGradientChart';
import { strokedGauge } from './Components/strokedGaugeChart';
import { simpleBubble } from './Components/simpleBubbleChart';


const ApexCharts = () => {

    const screenWidth = useSelector((state) => state.screenWidth.screenWidth);

	const [chartKey, setChartKey] = useState(0); // Add a key to force chart refresh

	useEffect(() => {
	// Update the key whenever rightbarHidden changes to force chart refresh
	setChartKey(prevKey => prevKey + 1);
	}, [screenWidth]);

    const chartCode = `
    import Chart from 'react-apexcharts'

        var spark1 = {
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

    return (
        <div id="apexspark1">
            <Chart
            options={spark1}
            series={spark1.series}
            height={spark1.chart.height}
            type={spark1.chart.type}
            />
        </div>
    )
  `;

  return (
    <div className="px-4 py-3 page-body">
			
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Apex Charts</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-4 g-3">
                        <div className="col-12">
                            <p className="lead">A modern JavaScript charting library that allows you to build interactive data visualizations with simple API and 100+ ready-to-use samples. Use them with or without <a href="https://apexcharts.com/">Apex Chart</a> in any project.</p>
                            <div className="rounded-4" data-lang="html">
                                <pre className='h6 language-html text-primary'><code>{chartCode}</code></pre>
                            </div>
                        </div>
						<div className="col-lg-4 col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div id="apexspark1">
                                        <Chart
                                        key={chartKey}
                                        options={spark1}
                                        series={spark1.series}
                                        height={spark1.chart.height}
                                        type={spark1.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div id="apexspark2">
                                        <Chart
                                        key={chartKey}
                                        options={spark2}
                                        series={spark2.series}
                                        height={spark2.chart.height}
                                        type={spark2.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div id="apexspark3">
                                        <Chart
                                        key={chartKey}
                                        options={spark3}
                                        series={spark3.series}
                                        height={spark3.chart.height}
                                        type={spark3.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <div id="apexspark-chart1">
                                        <Chart
                                        key={chartKey}
                                        options={options1}
                                        series={options1.series}
                                        height={options1.chart.height}
                                        type={options1.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <div id="apexspark-chart2">
                                        <Chart
                                        key={chartKey}
                                        options={options2}
                                        series={options2.series}
                                        height={options2.chart.height}
                                        type={options2.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <div id="apexspark-chart3">
                                        <Chart
                                        key={chartKey}
                                        options={options3}
                                        series={options3.series}
                                        height={options3.chart.height}
                                        type={options3.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <div id="apexspark-chart4">
                                        <Chart
                                        key={chartKey}
                                        options={options4}
                                        series={options4.series}
                                        height={options4.chart.height}
                                        type={options4.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-8 col-xl-12 col-lg-12">
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Basic CandleStick</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-CandleStick">
                                        <Chart
                                        key={chartKey}
                                        options={candleStick}
                                        series={candleStick.series}
                                        height={candleStick.chart.height}
                                        type={candleStick.chart.type}
                                        width={candleStick.chart.width}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Basic Column</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-basic-column">
                                        <Chart
                                        key={chartKey}
                                        options={basicColumn}
                                        series={basicColumn.series}
                                        height={basicColumn.chart.height}
                                        type={basicColumn.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Basic Line Column</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-chart-line-column">
                                        <Chart
                                        key={chartKey}
                                        options={basicLineColumn}
                                        series={basicLineColumn.series}
                                        height={basicLineColumn.chart.height}
                                        type={basicLineColumn.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Simple Bubble</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-simple-bubble">
                                        <Chart
                                        key={chartKey}
                                        options={simpleBubble}
                                        series={simpleBubble.series}
                                        height={simpleBubble.chart.height}
                                        type={simpleBubble.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Area Datetime</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" className="btn btn-outline-secondary" id="one_month">1M</button>
                                        <button type="button" className="btn btn-outline-secondary" id="six_months">6M</button>
                                        <button type="button" className="btn btn-outline-secondary active" id="one_year">1Y</button>
                                        <button type="button" className="btn btn-outline-secondary" id="ytd">YTD</button>
                                        <button type="button" className="btn btn-outline-secondary" id="all">ALL</button>
                                    </div>
                                    <div id="apex-datetime-chart">
                                        <Chart
                                        key={chartKey}
                                        options={dateTime}
                                        series={dateTime.series}
                                        height={dateTime.chart.height}
                                        type={dateTime.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Stacked Area</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-stacked-area">
                                        <Chart
                                        key={chartKey}
                                        options={stackedArea}
                                        series={stackedArea.series}
                                        height={stackedArea.chart.height}
                                        type={stackedArea.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Basic Heatmap Chart</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-basic-heatmap">
                                        <Chart
                                        key={chartKey}
                                        options={basicHeatmap}
                                        series={basicHeatmap.series}
                                        height={basicHeatmap.chart.height}
                                        type={basicHeatmap.chart.type}
                                        />  
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Basic Scatter Chart</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-basic-scatter">
                                        <Chart
                                        key={chartKey}
                                        options={scatterChart}
                                        series={scatterChart.series}
                                        height={scatterChart.chart.height}
                                        type={scatterChart.chart.type}
                                        />  
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Timeline</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-timeline">
                                        <Chart
                                        key={chartKey}
                                        options={timeLine}
                                        series={timeLine.series}
                                        height={timeLine.chart.height}
                                        type={timeLine.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Basic Bar</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-basic-bar">
                                        <Chart
                                        key={chartKey}
                                        options={basicBar}
                                        series={basicBar.series}
                                        height={basicBar.chart.height}
                                        type={basicBar.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-4 col-xl-12 col-lg-12">
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Basic Radar</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-basic-radar">
                                        <Chart
                                        key={chartKey}
                                        options={basicRadar}
                                        series={basicRadar.series}
                                        height={basicRadar.chart.height}
                                        type={basicRadar.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Radar Multiple Series</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-radar-multiple-series">
                                        <Chart
                                        key={chartKey}
                                        options={multipleRadarSeries}
                                        series={multipleRadarSeries.series}
                                        height={multipleRadarSeries.chart.height}
                                        type={multipleRadarSeries.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Radar with Polygon Fill</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-radar-polygon-fill">
                                        <Chart
                                        key={chartKey}
                                        options={radarPolygon}
                                        series={radarPolygon.series}
                                        height={radarPolygon.chart.height}
                                        type={radarPolygon.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Simple Donut</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-simple-donut">
                                        <Chart
                                        key={chartKey}
                                        options={simpleDonut}
                                        series={simpleDonut.series}
                                        height={simpleDonut.chart.height}
                                        type={simpleDonut.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Circle Chart</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-circle-chart">
                                        <Chart
                                        key={chartKey}
                                        options={circleChart}
                                        series={circleChart.series}
                                        height={circleChart.chart.height}
                                        type={circleChart.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Circle Chart Multiple</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-circle-chart-multiple">
                                        <Chart
                                        key={chartKey}
                                        options={multipleCircleChart}
                                        series={multipleCircleChart.series}
                                        height={multipleCircleChart.chart.height}
                                        type={multipleCircleChart.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Circle Gradient</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-circle-gradient">
                                        <Chart
                                        key={chartKey}
                                        options={circleGradient}
                                        series={circleGradient.series}
                                        height={circleGradient.chart.height}
                                        type={circleGradient.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">Stroked Gauge</h6>
                                    <div className="card-action">
                                        <CardAction/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div id="apex-stroked-gauge">
                                        <Chart
                                        key={chartKey}
                                        options={strokedGauge}
                                        series={strokedGauge.series}
                                        height={strokedGauge.chart.height}
                                        type={strokedGauge.chart.type}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/weather-icon">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Weather icon</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/peity">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Peity chart</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default ApexCharts