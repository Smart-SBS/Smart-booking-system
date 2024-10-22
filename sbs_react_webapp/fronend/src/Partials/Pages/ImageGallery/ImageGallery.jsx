import React from 'react'

import profileImg from '../../../assets/images/profile_av.png';
import Gallery from './Components/Gallery';

const ImageGallery = () => {
    return (
        <div className="px-4 py-3 page-body">
            <ul className="row g-lg-4 g-2 list-unstyled li_animate mb-5">
                <li className="col-lg-5 col-md-5 col-12">
                    <div className="d-flex align-items-center">
                        <img className="avatar lg rounded-circle border border-3" src={profileImg} alt="avatar" />
                        <div className="ms-3">
                            <h4 className="mb-0 text-gradient title-font">Radhika!</h4>
                            <span className="text-muted small">radhika.SBS@gmail.com</span>
                        </div>
                    </div>
                </li>
                <li className="col-lg-7 col-md-7 col-12">
                    <ul className="list-unstyled d-none d-lg-flex align-items-start justify-content-md-end p-0 mb-0 ps-5 ps-md-0 ms-4 ms-md-0">
                        <li className="px-lg-4 px-3 ps-0">
                            <h6>Google drive</h6>
                            <small className="text-muted">15 GB ( Basic Plan )</small>
                            <div className="progress mt-1" style={{ height: "2px" }}>
                                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: "10%" }} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </li>
                        <li className="px-lg-4 px-3 border-start">
                            <h6>Dropbox</h6>
                            <small className="text-muted">2 GB ( Free Plan )</small>
                            <div className="progress mt-1" style={{ height: "2px" }}>
                                <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </li>
                        <li className="ps-lg-4 ps-3 border-start">
                            <h6>FTP Drive</h6>
                            <small className="text-muted">30 GB ( Regular plan )</small>
                            <div className="progress mt-1" style={{ height: "2px" }}>
                                <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
            <Gallery />
        </div>
    )
}

export default ImageGallery