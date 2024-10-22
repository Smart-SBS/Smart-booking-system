import React from 'react'
import Chart from 'react-apexcharts'
import CountingAnimation from '../../CommonCounting/CountingAnimation'
import { TaskData } from './RightbarData'
import { TaskAssign } from './TaskAssignChart'

const Tasks = () => {
    return (
        <ul className="row g-1 list-unstyled li_animate">
            <li className="col-12 text-uppercase text-muted">
                <div className="d-flex justify-content-between small">
                    <span>Assigned Tasks</span>
                    <a href="#" title="view all task">View All</a>
                </div>
            </li>
            {TaskData.map((data, index) => {
                return (
                    <li key={index} className="col-6">
                        <div className="card border-0">
                            <div className="card-body p-3">
                                <div className="fs-5 fw-bold">
                                    <CountingAnimation
                                        start={0}
                                        separator={'.'}
                                        currency={''}
                                        end={data.counter_end}
                                        duration={8000}
                                    />
                                </div>
                                <span className="text-muted">{data.task_name}</span>
                            </div>
                        </div>
                    </li>
                )
            })}
            <li className="col-12">
                <div className="card border-0">
                    <div className="card-header">
                        <h6 className="card-title mb-0">Tasks Analysis</h6>
                    </div>
                    <div className="card-body pt-0">
                        <div>
                            <Chart
                                options={TaskAssign}
                                series={TaskAssign.series}
                                height={TaskAssign.chart.height}
                                type={TaskAssign.chart.type}
                            />
                        </div>
                        <a href="#" title="view all task" className="btn btn-dark w-100">View My Task</a>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default Tasks