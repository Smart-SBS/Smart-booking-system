import React from 'react'

const ProjectDetails = () => {
  return (
         <div className="px-4 py-3 page-body">
            <div className="card p-4">
                <h5>Ergonomic real-time adapter</h5>
                <div className="d-flex justify-content-between">
                    <p>Status: <span className="fw-bold text-success">Active</span></p>
                    <p>Priority: <span className="fw-bold text-danger">High</span></p>
                </div>
                <div className="row g-2 mt-4">
                    <div className="col-6">
                        <dl className="dl-horizontal">
                            <dt className="small">Created by:</dt><dd>Alex Smith</dd>
                            <dt className="small">Messages:</dt><dd>162</dd>
                            <dt className="small">Client:</dt><dd><a href="#"> ZMK Tech LLP.</a></dd>
                            <dt className="small">Version:</dt><dd>v1.2.0</dd>
                        </dl>
                    </div>
                    <div className="col-6">
                        <dl className="dl-horizontal">
                            <dt className="small">Last Updated:</dt><dd>16.08.2022 12:15:57</dd>
                            <dt className="small">Created:</dt><dd>10.07.2022 23:36:57</dd>
                        </dl>
                    </div>
                </div>
                <div className="bg-body p-3 mb-4">
                    <h6>Completed:</h6>
                    <div className="progress">
                        <div style={{width: "60%"}} className="progress-bar"></div>
                    </div>
                    <small className="text-muted">Project completed in <strong>60%</strong>. Remaining close the project, sign a contract and invoice.</small>
                </div>
                <h5>Project description</h5>
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                <div className="my-4">
                    <h5>Project tag</h5>
                    <span className="badge bg-primary me-1" href="#">Photoshop</span>
                    <span className="badge bg-secondary me-1" href="#">HTML, SCSS</span>
                    <span className="badge bg-warning me-1" href="#">Laravel 7.0.0</span>
                    <span className="badge bg-info" href="#">ReactJs</span>
                </div>
                <h5>Project files</h5>
                <ul className="list-unstyled d-flex flex-wrap">
                    <li className="d-flex p-3 rounded bg-body dashed mb-1 me-1">
                        <div className="avatar bg-card me-2 fs-5 d-flex align-items-center justify-content-center"><i className="fa fa-file-pdf-o"></i></div>
                        <div>
                            <h6 className="text-truncate mb-0">Design file.pdf</h6>
                            <span className="file-size">2.7 mb</span>
                        </div>
                    </li>
                    <li className="d-flex p-3 rounded bg-body dashed mb-1 me-1">
                        <div className="avatar bg-card me-2 fs-5 d-flex align-items-center justify-content-center"><i className="fa fa-file-powerpoint-o"></i></div>
                        <div>
                            <h6 className="text-truncate mb-0">Design file.psd</h6>
                            <span className="file-size">22.5 mb</span>
                        </div>
                    </li>
                    <li className="d-flex p-3 rounded bg-body dashed mb-1 me-1">
                        <div className="avatar bg-card me-2 fs-5 d-flex align-items-center justify-content-center"><i className="fa fa-file-text-o"></i></div>
                        <div>
                            <h6 className="text-truncate mb-0">Project detail.doc</h6>
                            <span className="file-size">2.8 mb</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProjectDetails