import React from 'react'

import g4 from '../../../../../assets/images/gallery/4.jpg';
import profileImg from '../../../../../assets/images/profile_av.png';

const ContactDetail = () => {
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="c_details">
            <div className="offcanvas-header p-0">
                <div>
                    <div style={{ height: "160px", overflow: "hidden" }}>
                        <img src={g4} className="card-img-top rounded-0" alt="..." />
                    </div>
                    <div className="card-body position-relative pt-5">
                        <img className="avatar xl rounded-circle img-thumbnail" src={profileImg} alt="" style={{ position: "absolute", top: "-40px", left: "2rem" }} />
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" style={{ position: "absolute", right: "1rem", top: "-145px" }}></button>
                    </div>
                </div>
            </div>
            <div className="offcanvas-body custom_scroll">
                <ul className="px-3 list-unstyled">
                    <li className="mb-3 pb-3 border-bottom">
                        <h4 className="mb-1">Alice Harding</h4>
                        <p className="text-muted">Web Designer</p>
                        <ul className="social list-inline mb-3">
                            <li className="list-inline-item"><a href="#" className="p-2 me-1"><i className="fa fa-facebook-f"></i></a></li>
                            <li className="list-inline-item"><a href="#" className="p-2 me-1"><i className="fa fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="#" className="p-2 me-1"><i className="fa fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a href="#" className="p-2 me-1"><i className="fa fa-linkedin"></i></a></li>
                        </ul>
                        <button type="button" className="btn btn-primary me-1">Message</button>
                        <button type="button" className="btn btn-outline-secondary">Edit</button>
                    </li>
                    <li className="d-flex align-items-start py-3">
                        <svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="22" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z" />
                        </svg>
                        <div className="flex-fill ms-3">
                            <small className="text-muted">Designation</small>
                            <p className="mb-0">UI UX Designer</p>
                        </div>
                    </li>
                    <li className="d-flex align-items-start py-3">
                        <svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="22" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                        </svg>
                        <div className="flex-fill ms-3">
                            <small className="text-muted">Email Address</small>
                            <p className="mb-0">aliceharding@mail.us</p>
                        </div>
                    </li>
                    <li className="d-flex align-items-start py-3">
                        <svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="22" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                        </svg>
                        <div className="flex-fill ms-3">
                            <small className="text-muted">Mobile</small>
                            <p className="mb-0">+1 881 472 3113</p>
                        </div>
                    </li>
                    <li className="d-flex align-items-start py-3">
                        <svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="22" fill="currentColor" viewBox="0 0 16 16" style={{ minWidth: "22px" }}>
                            <path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z" />
                            <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                        </svg>
                        <div className="flex-fill ms-3">
                            <small className="text-muted">Address</small>
                            <p className="mb-0">387 Holt Court, Thomasville, Alaska, PO2867</p>
                        </div>
                    </li>
                    <li className="d-flex align-items-start py-3">
                        <svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="22" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>
                        <div className="flex-fill ms-3">
                            <small className="text-muted">DOB</small>
                            <p className="mb-0">March 10, 1990</p>
                        </div>
                    </li>
                    <li className="d-flex align-items-start py-3">
                        <svg className="mt-1" xmlns="http://www.w3.org/2000/svg" width="22" fill="currentColor" viewBox="0 0 16 16" style={{ minWidth: "22px" }}>
                            <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                        </svg>
                        <div className="flex-fill ms-3">
                            <small className="text-muted">Bio</small>
                            <p className="mb-0">Interdum quam sit primis in lobortis laoreet molestie sed pulvinar natoque proin ad nam curae libero hac odio dui eros adipiscing lacinia tempus purus tristique</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ContactDetail