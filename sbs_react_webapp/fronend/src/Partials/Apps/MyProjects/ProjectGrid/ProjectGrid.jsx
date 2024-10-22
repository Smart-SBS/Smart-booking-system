import React from 'react'
import { GridData } from './Components/ProjectGridData'
import CardAction from '../../../Widgets/CardAction/CardAction'

const ProjectGrid = () => {
  return (
        <div className="px-4 py-3 page-body">
            <ul className="row g-3 li_animate list-unstyled">
                {GridData.map((data, index) => {
                return(
                <li key={index} className="col-lg-6 col-md-6">
                    <div className="card">
                        <div className="card-header flex-nowrap align-items-center">
                            <a href="#" className="h6 card-title mb-0">{data.title}</a>
                            <CardAction/>
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-1">
                                <i className="fa fa-user me-3"></i>
                                <span className="pe-2">Client: </span>
                                <a href="#">Monsters.Inc</a>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-credit-card me-3"></i>
                                <span className="pe-2">Budget: </span>
                                <a href="#">$2,742</a>
                            </div>
                            <div className="my-4">
                                <span className="text-muted">Progress / 50%</span>
                                <div className="progress mt-2" style={{height: "3px"}}>
                                    <div className="progress-bar bg-primary" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div className="hstack gap-3 mb-4">
                                <div>
                                    <p className="mb-1 text-muted small">Task: </p>
                                    287
                                </div>
                                <div className="ms-auto">
                                    <p className="mb-1 text-muted small">Started: </p>
                                    11 Jan, 2023
                                </div>
                                <div className="vr"></div>
                                <div>
                                    <p className="mb-1 text-muted small">Deadline: </p>
                                    25 Jan, 2023
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="avatar-list avatar-list-stacked d-flex">
                                    <span className="pe-3">Team</span>
                                    {data.team.map((img, index) => {
                                        return(
                                        <img key={index} className="avatar sm rounded-circle" src={img} data-bs-toggle="tooltip" title="Avatar"/>
                                    )})}
                                </div>
                                <a href="#" data-bs-toggle="offcanvas" data-bs-target="#project_detail">View Detail</a>
                            </div>
                        </div>
                    </div>
                </li>
                )})}
            </ul>
        </div>
    )
}

export default ProjectGrid