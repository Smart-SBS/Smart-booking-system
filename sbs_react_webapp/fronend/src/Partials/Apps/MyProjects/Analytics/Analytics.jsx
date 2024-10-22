import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Chart from 'react-apexcharts'
import CountingAnimation from '../../../../Common/CommonCounting/CountingAnimation'
import CardAction from '../../../Widgets/CardAction/CardAction'

import { ProjectAnalytics } from './Components/ProjectAnalyticsChart'
import { EarningPerformance } from './Components/EarningPerformanceChart'
import { TeamPerformance } from './Components/TeamPerformanceChart'


const Analytics = () => {
    const screenWidth = useSelector((state) => state.screenWidth.screenWidth);

	const [chartKey, setChartKey] = useState(0); // Add a key to force chart refresh

	useEffect(() => {
	// Update the key whenever rightbarHidden changes to force chart refresh
	setChartKey(prevKey => prevKey + 1);
	}, [screenWidth]);

  return (
        <div className="px-4 py-3 page-body">
            <h3 className="mb-4 title-font">Project analytics</h3>
            <ul className="row g-xl-3 g-2 list-unstyled row-deck">
                <li className="col-lg-3 col-md-6">
                    <div className="card border-0">
                        <div className="card-body d-flex justify-content-between">
                            <div className="me-3">
                                <span>Tasks In Progress</span>
                                <h3 className="mt-2 mb-0">
                                    <CountingAnimation
                                    start={0}
                                    separator={'.'}
                                    currency={''}
                                    end={14}
                                    duration={5000}
                                    />
                                </h3>
                            </div>
                            <div className="ac-line-transparent">
                                <Chart
								options={ProjectAnalytics}
								series={ProjectAnalytics.series}
								height={ProjectAnalytics.chart.height}
                                width={ProjectAnalytics.chart.width}
								type={ProjectAnalytics.chart.type}
								/>
                            </div>
                        </div>
                        <div className="card-footer py-2">
                            <small className="text-muted">Current Week <span className="ps-2 fa fa-caret-up text-success"> 2.0%</span></small>
                        </div>
                    </div>
                </li>
                <li className="col-lg-3 col-md-6">
                    <div className="card border-0">
                        <div className="card-body d-flex justify-content-between">
                            <div className="me-3">
                                <span>Task Completed</span>
                                <h3 className="mt-2 mb-0">
                                    <CountingAnimation
                                    start={0}
                                    separator={'.'}
                                    currency={''}
                                    end={108}
                                    duration={5000}
                                    />                                
                                </h3>
                            </div>
                            <div className="ac-line-transparent">
                                <Chart
								options={ProjectAnalytics}
								series={ProjectAnalytics.series}
								height={ProjectAnalytics.chart.height}
                                width={ProjectAnalytics.chart.width}
								type={ProjectAnalytics.chart.type}
								/>
                            </div>
                        </div>
                        <div className="card-footer py-2">
                            <small className="text-muted">Current Week <span className="ps-2 fa fa-caret-up text-success"> 2.0%</span></small>
                        </div>
                    </div>
                </li>
                <li className="col-lg-3 col-md-6">
                    <div className="card bg-gradient-dark text-white border-0">
                        <div className="card-body">
                            <span>Team Performance</span>
                            <p className="small">Current Month <span className="ps-2 fa fa-caret-up"> 7.5%</span></p>
                            <div className="ac-line-transparent">
                                <Chart
                                key={chartKey}
								options={TeamPerformance}
								series={TeamPerformance.series}
								height={TeamPerformance.chart.height}
								type={TeamPerformance.chart.type}
								/>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="col-lg-3 col-md-6">
                    <div className="card border-0">
                        <div className="card-body d-flex justify-content-between">
                            <div className="me-3">
                                <span>Tasks Summary</span>
                                <h3 className="mt-2 mb-0">1.25%</h3>
                            </div>
                            <div className="ac-line-transparent">
                                <Chart
								options={ProjectAnalytics}
								series={ProjectAnalytics.series}
								height={ProjectAnalytics.chart.height}
                                width={ProjectAnalytics.chart.width}
								type={ProjectAnalytics.chart.type}
								/>
                            </div>
                        </div>
                        <div className="card-footer py-2">
                            <small className="text-muted">Current Week <span className="ps-2 fa fa-caret-down text-danger"> 2.0%</span></small>
                        </div>
                    </div>
                </li>
                <li className="col-xl-4 col-lg-4">
                    <div className="card border-0">
                        <div className="card-header">
                            <h6 className="card-title mb-0">Project Statistics</h6>
                        </div>
                        <div className="card-body hstack gap-2">
                            <div className="px-lg-3">
                                <h4 className="fw-bold mb-0 text-success">
                                    <CountingAnimation
                                    start={0}
                                    separator={'.'}
                                    currency={''}
                                    end={42}
                                    duration={5000}
                                    /> 
                                </h4>
                                <label className="small">Total Project</label>
                            </div>
                            <div className="vr"></div>
                            <div className="px-lg-3">
                                <h4 className="fw-bold mb-0 text-warning">
                                    <CountingAnimation
                                    start={0}
                                    separator={'.'}
                                    currency={''}
                                    end={23}
                                    duration={5000}
                                    />
                                </h4>
                                <label className="small">On Going</label>
                            </div>
                            <div className="vr"></div>
                            <div className="px-lg-3">
                                <h4 className="fw-bold mb-0 text-danger">
                                    <CountingAnimation
                                    start={0}
                                    separator={'.'}
                                    currency={''}
                                    end={8}
                                    duration={5000}
                                    />                                    
                                </h4>
                                <label className="small">Pending</label>
                            </div>
                        </div>
                        <div className="card-footer">
                            <ul className="mb-0">
                                <li className="py-2">
                                    <div className="d-flex justify-content-between">
                                        <div>Design Team</div>
                                        <div className="fw-bold">35%</div>
                                    </div>
                                    <div className="progress mt-2" style={{height: "2px"}}>
                                        <div className="progress-bar" role="progressbar" style={{width: "35%"}} aria-valuenow="42" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="d-flex justify-content-between">
                                        <div>Developer Team</div>
                                        <div className="fw-bold">25%</div>
                                    </div>
                                    <div className="progress mt-2" style={{height: "2px"}}>
                                        <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="d-flex justify-content-between">
                                        <div>Management</div>
                                        <div className="fw-bold">20%</div>
                                    </div>
                                    <div className="progress mt-2" style={{height: "2px"}}>
                                        <div className="progress-bar" role="progressbar" style={{width: "20%"}} aria-valuenow="6" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="d-flex justify-content-between">
                                        <div>Marketing</div>
                                        <div className="fw-bold">15%</div>
                                    </div>
                                    <div className="progress mt-2" style={{height: "2px"}}>
                                        <div className="progress-bar" role="progressbar" style={{width: "15%"}} aria-valuenow="36" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </li>
                                <li className="py-2">
                                    <div className="d-flex justify-content-between">
                                        <div>Other</div>
                                        <div className="fw-bold">11%</div>
                                    </div>
                                    <div className="progress mt-2" style={{height: "2px"}}>
                                        <div className="progress-bar" role="progressbar" style={{width: "11%"}} aria-valuenow="6" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li className="col-xl-8 col-lg-8">
                    <div className="card border-0">
                        <div className="card-header">
                            <h6 className="card-title mb-0">Earning Performance</h6>
                            <div className="card-action">
                                <CardAction/>
                            </div>
                        </div>
                        <div className="card-body">
                            <div>
                                <Chart
                                key={chartKey}
								options={EarningPerformance}
								series={EarningPerformance.series}
								height={EarningPerformance.chart.height}
								type={EarningPerformance.chart.type}
								/>
                            </div>
                        </div>
                    </div>
                </li>
            </ul> 
            {/* <!--[ ul.row end ]--> */}
        </div>
    )
}

export default Analytics