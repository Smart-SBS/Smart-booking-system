import React from 'react'
import CountingAnimation from '../../CommonCounting/CountingAnimation'
import { EmailData } from './RightbarData'

import avatar1 from '../../../assets/images/xs/avatar1.jpg';
import avatar2 from '../../../assets/images/xs/avatar2.jpg';
import avatar3 from '../../../assets/images/xs/avatar3.jpg';
import avatar4 from '../../../assets/images/xs/avatar4.jpg';

const Emails = () => {
    return (
        <ul className="row g-1 list-unstyled li_animate">
            <li className="col-12 text-uppercase text-muted">
                <div className="d-flex justify-content-between small">
                    <span>Outgoing Emails</span>
                    <a href="#" aria-label="view all">View All</a>
                </div>
            </li>
            {EmailData.map((data, index) => {
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
                                <span className="text-muted">{data.status_name}</span>
                            </div>
                        </div>
                    </li>
                )
            })}

            <li className="col-12 text-uppercase text-muted mt-4">
                <div className="d-flex justify-content-between small">
                    <span>Latest message</span>
                    <a href="#" title="view all task">View All</a>
                </div>
            </li>
            <li className="col-12">
                <ul className="list-group">
                    <li className="list-group-item d-flex align-items-center border-0 mb-1">
                        <img className="rounded-circle avatar sm" src={avatar1} data-bs-toggle="tooltip" title="Avatar Name" alt="Avatar" />
                        <div className="ms-3 w-100">
                            <a href="#" title="Github">Github</a>
                            <small className="text-muted float-end">8 minutes ago</small>
                            <p className="mb-0 small text-muted">Where are we in terms of design?</p>
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center border-0 mb-1">
                        <img className="rounded-circle avatar sm" src={avatar2} data-bs-toggle="tooltip" title="Avatar Name" alt="Avatar" />
                        <div className="ms-3 w-100">
                            <a href="#" title="Themeforest">Themeforest</a>
                            <small className="text-muted float-end">12 minutes ago</small>
                            <p className="mb-0 small text-muted">Where are we in terms of design?</p>
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center border-0 mb-1">
                        <img className="rounded-circle avatar sm" src={avatar3} data-bs-toggle="tooltip" title="Avatar Name" alt="Avatar" />
                        <div className="ms-3 w-100">
                            <a href="#" title="Paybee inc.">Paybee inc.</a>
                            <small className="text-muted float-end">22 minutes ago</small>
                            <p className="mb-0 small text-muted">Where are we in terms of design?</p>
                        </div>
                    </li>
                    <li className="list-group-item d-flex align-items-center border-0 mb-1">
                        <img className="rounded-circle avatar sm" src={avatar4} data-bs-toggle="tooltip" title="Avatar Name" alt="Avatar" />
                        <div className="ms-3 w-100">
                            <a href="#" title="Github">Github</a>
                            <small className="text-muted float-end">28 minutes ago</small>
                            <p className="mb-0 small text-muted">Where are we in terms of design?</p>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    )
}

export default Emails