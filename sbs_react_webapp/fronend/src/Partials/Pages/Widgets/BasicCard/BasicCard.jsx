import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction'
import CardEllipsis from '../../../Widgets/CardEllipsis/CardEllipsis'

import profileImg from '../../../../assets/images/profile_av.png'
import avatar1 from '../../../../assets/images/xs/avatar1.jpg'
import avatar2 from '../../../../assets/images/xs/avatar2.jpg'
import avatar3 from '../../../../assets/images/xs/avatar3.jpg'
import avatar4 from '../../../../assets/images/xs/avatar4.jpg'
import avatar5 from '../../../../assets/images/xs/avatar5.jpg'
import avatar6 from '../../../../assets/images/xs/avatar6.jpg'
import avatar7 from '../../../../assets/images/xs/avatar7.jpg'
import avatar9 from '../../../../assets/images/xs/avatar9.jpg'
import gallery1 from '../../../../assets/images/gallery/1.jpg'
import gallery6 from '../../../../assets/images/gallery/6.jpg'
import gallery7 from '../../../../assets/images/gallery/7.jpg'

const BasicCard = () => {
    return (
        <div className="px-4 py-3 page-body">
            <h4 className="mb-4">Basic card</h4>
            <div className="row g-3 mb-4">
                <div className="col-md-6 col-sm-12">
                    <div className="card mb-3">
                        <div className="card-header">
                            <h5 className="card-title mb-0">This is a standard card</h5>
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                        <div className="card-footer py-2">
                            This is standard card footer
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header">
                            <h5 className="card-title mb-0">This is a standard card</h5>
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                        <div className="card-footer text-end py-2">
                            <button className="btn btn-sm btn-secondary me-1" type="button">Close</button>
                            <button className="btn btn-sm btn-primary" type="button">Save</button>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header mb-3">
                            <h6 className="card-title mb-0">Card with alert</h6>
                        </div>
                        <div className="card-alert alert alert-success mb-0 rounded-0 border-0">
                            Adding action was successful
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header mb-3">
                            <h6 className="card-title mb-0">Card with alert</h6>
                        </div>
                        <div className="card-alert alert alert-danger mb-0 rounded-0 border-0">
                            Adding action failed
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header align-items-center">
                            <h6 className="card-title mb-0">Card with search</h6>
                            <form>
                                <div className="input-group">
                                    <input type="search" className="form-control form-control-sm" placeholder="Search something..." name="s" />
                                    <button className="btn btn-sm btn-secondary" type="button"><span className="fa fa-search"></span></button>
                                </div>
                            </form>
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header align-items-center">
                            <h6 className="card-title mb-0">Panel with custom buttons</h6>
                            <form>
                                <button className="btn btn-sm btn-primary me-1" type="button">Action1</button>
                                <button className="btn btn-sm btn-secondary" type="button">Action2</button>
                            </form>
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="card mb-3">
                        <div className="card-header border-top border-primary">
                            <h6 className="card-title mb-0">Card Primary</h6>
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header border-top border-info">
                            <h6 className="card-title mb-0">Card info</h6>
                            <CardAction />
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header border-top border-warning">
                            <h6 className="card-title mb-0">Card with switch</h6>
                            <div className="card-action">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="onoff" />
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header border-top border-danger">
                            <h6 className="card-title mb-0">Card Danger</h6>
                            <div className="card-action">
                                <CardAction />
                            </div>
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header border-top border-success">
                            <h6 className="card-title mb-0">Card success</h6>
                            <div className="card-action">
                                <a href="#" className="p-1"><i className="fa fa-search"></i></a>
                                <a href="#" className="p-1"><i className="fa fa-share-alt"></i></a>
                            </div>
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header border-top border-dark">
                            <h6 className="card-title mb-0">Card dark</h6>
                            <CardEllipsis />
                        </div>
                        <div className="card-body">
                            Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem.
                        </div>
                    </div>
                </div>
            </div>
            <h5 className="text-uppercase text-primary mb-1">User Card's</h5>
            <p>You can set as per your requirment with real data.</p>
            <div className="row g-3 mb-5">
                <div className="col-lg-7">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <a href="#"><img src={profileImg} alt="..." className="avatar lg rounded" /></a>
                                </div>
                                <div className="col ml-n2">
                                    <h5 className="mb-1"><a href="#">Robert Mark</a></h5>
                                    <p className="small text-muted mb-1">You either die Spongebob or you live long enough to...</p>
                                    <p className="small mb-0"><span className="text-success">●</span> Online</p>
                                </div>
                                <div className="col-auto">
                                    <a href="#!" className="btn btn-sm btn-primary d-none d-md-inline-block">Subscribe</a>
                                </div>
                                <div className="col-auto">
                                    <div className="dropdown">
                                        <a href="#" className="btn btn-link btn-sm dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" data-expanded="false">
                                            <i className="fa fa-more fa-hc-lg"></i>
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="#!" className="dropdown-item">Action</a>
                                            <a href="#!" className="dropdown-item">Another action</a>
                                            <a href="#!" className="dropdown-item">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="card">
                        <div className="card-body d-flex align-items-start">
                            <div className="avatar rounded-circle no-thumbnail">UD</div>
                            <div className="text-truncate ms-3">
                                <h6 className="text-truncate mb-0 me-auto">UI-Design Group</h6>
                                <p>North Carolina, CT, USA</p>
                                <div className="avatar-list avatar-list-stacked d-flex ps-3">
                                    <img className="avatar sm rounded-circle" src={avatar5} data-toggle="tooltip" title="Avatar" />
                                    <img className="avatar sm rounded-circle" src={avatar6} data-toggle="tooltip" title="Avatar" />
                                    <img className="avatar sm rounded-circle" src={avatar1} data-toggle="tooltip" title="Avatar" />
                                    <img className="avatar sm rounded-circle" src={avatar4} data-toggle="tooltip" title="Avatar" />
                                    <img className="avatar sm rounded-circle" src={avatar2} data-toggle="tooltip" title="Avatar" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6">
                    <div className="card text-center mb-3">
                        <div className="card-body">
                            <div><img src={profileImg} className="rounded-circle img-thumbnail" alt="profile-image" /></div>
                            <div className="mt-3">
                                <h5>Freddie J. Plourde</h5>
                                <p className="text-muted">@Founder <span>| </span><span><a href="#" className="text-pink">websitename.com</a></span></p>
                            </div>
                            <div className="social-links list-inline mb-4">
                                <a className="px-2" title="Facebook" data-placement="top" data-bs-toggle="tooltip" href="#"><i className="fa fa-facebook-official"></i></a>
                                <a className="px-2" title="Facebook" data-placement="top" data-bs-toggle="tooltip" href="#"><i className="fa fa-linkedin-square"></i></a>
                                <a className="px-2" title="Facebook" data-placement="top" data-bs-toggle="tooltip" href="#"><i className="fa fa-twitter-square"></i></a>
                            </div>
                            <button type="button" className="btn btn-primary">Message Now</button>
                        </div>
                        <div className="card-footer">
                            <div className="row g-3">
                                <div className="col">
                                    <small>Wallets Balance</small>
                                    <h5 className="mb-0 mt-1">2563</h5>
                                </div>
                                <div className="col">
                                    <small>Income amounts</small>
                                    <h5 className="mb-0 mt-1">6952</h5>
                                </div>
                                <div className="col">
                                    <small>Total Transactions</small>
                                    <h5 className="mb-0 mt-1">1125</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col text-truncate">
                                    <div className="d-flex align-items-center">
                                        <img src={profileImg} data-bs-toggle="tooltip" title="Avatar" alt="Avatar" className="rounded-circle avatar" />
                                        <div className="ms-3">
                                            <a href="#" title="">Kevin Gill</a>
                                            <p className="mb-0">kevin.gill@example.com</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Dropdown --> */}
                                <div className="col-auto">
                                    <div className="dropdown">
                                        <a href="#" className="btn btn-link btn-sm dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" data-expanded="false"></a>
                                        <div className="dropdown-menu">
                                            <a href="#!" className="dropdown-item">Action</a>
                                            <a href="#!" className="dropdown-item">Another action</a>
                                            <a href="#!" className="dropdown-item">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group my-3">
                                <textarea rows="3" className="form-control no-resize" placeholder="Please type what you want..."></textarea>
                            </div>
                            <div className="text-end">
                                <button className="btn btn-primary">Post</button>
                                <button className="btn btn-link"><i className="fa fa-paperclip"></i></button>
                                <button className="btn btn-link"><i className="fa fa-camera"></i></button>
                                <button className="btn btn-link"><i className="fa fa-smile-o"></i></button>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <img className="card-img-top" src={gallery6} alt="Card image cap" />
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <button className="btn btn-sm btn-primary me-1">For Rent</button>
                                    <button className="btn btn-sm btn-secondary">Inquiry</button>
                                </div>
                                <h5 className="mb-0">$8,499/<small className="fs-6">mo</small></h5>
                            </div>
                            <div className="d-flex flex-column mt-3">
                                <h5>Card title</h5>
                                <span><i className="fa fa-map-pin"></i> 603 Jennifer Ln, Gilbertsville, PA, 19525</span>
                            </div>
                        </div>
                        <div className="bg-body d-flex justify-content-between property-info py-2 px-3">
                            <p className="mb-0">Beds: <strong>2</strong></p>
                            <p className="mb-0">Baths: <strong>2</strong></p>
                            <p className="mb-0">Sq Ft: <strong>1425</strong></p>
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex align-items-center">
                                <img className="avatar rounded-circle" src={avatar2} alt="" />
                                <div className="flex-fill ms-2">
                                    <div className="h6 mb-0">By Jony Doe</div>
                                    <span className="small text-muted">8 min ago</span>
                                </div>
                            </div>
                            <p className="mb-0">4 years ago</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col text-truncate">
                                    <div className="d-flex align-items-center">
                                        <img src={profileImg} data-bs-toggle="tooltip" title="avatar" alt="Avatar" className="rounded avatar" />
                                        <div className="ms-3">
                                            <a href="#" title="">Kevin Gill</a>
                                            <p className="mb-0">kevin.gill@example.com</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Dropdown --> */}
                                <div className="col-auto">
                                    <div className="dropdown">
                                        <a href="#" className="btn btn-link btn-sm dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" data-expanded="false"></a>
                                        <div className="dropdown-menu">
                                            <a href="#!" className="dropdown-item">Action</a>
                                            <a href="#!" className="dropdown-item">Another action</a>
                                            <a href="#!" className="dropdown-item">Something else here</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body text-center position-relative">
                            <button type="button" className="btn btn-secondary btn-sm position-absolute top-0 end-0"><i className="fa fa-edit"></i></button>
                            <img className="rounded-pill img-thumbnail" src={profileImg} alt="avatar" />
                            <div className="card-body">
                                <h6>Robert Mark</h6>
                                <span className="text-muted">robert.mark@gmail.com</span>
                                <p>+14 123 456 789</p>
                                <div className="social">
                                    <a className="p-2" href="#" data-bs-toggle="tooltip" title="Facebook"><i className="fa fa-facebook-official"></i></a>
                                    <a className="p-2" href="#" data-bs-toggle="tooltip" title="Github"><i className="fa fa-github"></i></a>
                                    <a className="p-2" href="#" data-bs-toggle="tooltip" title="Linkedin"><i className="fa fa-linkedin"></i></a>
                                    <a className="p-2" href="#" data-bs-toggle="tooltip" title="Instagram"><i className="fa fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body text-center">
                            <h2 className="fw-bold">$45,854</h2>
                            <p className="text-uppercase text-muted mb-3">Revenue today</p>
                            <p className="mb-4">Lorem ipsum dolor sit amit,consectetur eiusmdd tempory incididunt ut labore et dolore magna elit</p>
                            <a href="#" className="btn btn-outline-primary mb-1">View history</a>
                        </div>
                    </div>
                    <div className="card">
                        <img className="card-img-top" src={gallery7} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="mb-4">Girl &amp; Lake</h5>
                            <div className="row g-2 mb-4">
                                <div className="col-5">
                                    <i className="fa fa-camera me-1"></i>ISO 200
                                </div>
                                <div className="col-7">
                                    <i className="fa fa-camera me-1"></i>1/1000
                                </div>
                                <div className="col-5">3780 x 2984</div>
                                <div className="col-7">9.54 MB</div>
                            </div>
                            <div className="row g-2">
                                <div className="col-5"><strong>Created:</strong></div>
                                <div className="col-7">09 Jun 2019 11:32AM</div>
                                <div className="col-5"><strong>Updated:</strong></div>
                                <div className="col-7">19 Jun 2019 9:43PM</div>
                                <div className="col-5"><strong>Bit Depth:</strong></div>
                                <div className="col-7">16 bit</div>
                                <div className="col-5"><strong>Creator:</strong></div>
                                <div className="col-7">Nathan Guerrero</div>
                                <div className="col-5"><strong>Privacy</strong></div>
                                <div className="col-7">
                                    <select className="form-control">
                                        <option value="">Public</option>
                                        <option value="">Private</option>
                                        <option value="">Friends</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row align-items-center mt-3">
                                <div className="col-5"><strong>Collaborators</strong></div>
                                <div className="col-7">
                                    <div className="group-members">
                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar3} alt="avatar" /></a>
                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar1} alt="avatar" /></a>
                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar7} alt="avatar" /></a>
                                        <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"><img className="avatar sm rounded-circle" src={avatar9} alt="avatar" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <div className="card mb-3">
                        <div className="card-body text-center">
                            <img className="rounded-circle img-thumbnail" src={profileImg} alt="" />
                            <h6 className="mt-3 mb-0">Robert Mark</h6>
                            <span>Megan-porter@info.com</span>
                            <ul className="mt-3 list-unstyled d-flex justify-content-center">
                                <li><a className="p-3" target="_blank" href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a className="p-3" target="_blank" href="#"><i className="fa fa-linkedin"></i></a></li>
                                <li><a className="p-3" target="_blank" href="#"><i className="fa fa-linkedin"></i></a></li>
                            </ul>
                            <button className="btn btn-primary btn-sm me-1">Follow</button>
                            <button className="btn btn-outline-primary btn-sm">Message</button>
                        </div>
                    </div>
                    <div className="card mb-3 text-center">
                        <div className="card-body">
                            <div className="avatar lg rounded-circle no-thumbnail me-auto ms-auto">UD</div>
                            <h6 className="text-truncate mb-0 me-auto">UI-Design Group</h6>
                            <p>North Carolina, CT, USA</p>
                            <div className="avatar-list avatar-list-stacked d-flex justify-content-center ps-3">
                                <img className="avatar sm rounded-circle" src={avatar5} data-toggle="tooltip" title="Avatar" />
                                <img className="avatar sm rounded-circle" src={avatar6} data-toggle="tooltip" title="Avatar" />
                                <img className="avatar sm rounded-circle" src={avatar1} data-toggle="tooltip" title="Avatar" />
                                <img className="avatar sm rounded-circle" src={avatar4} data-toggle="tooltip" title="Avatar" />
                                <img className="avatar sm rounded-circle" src={avatar2} data-toggle="tooltip" title="Avatar" />
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body text-center">
                            <img src={profileImg} className="rounded-circle img-thumbnail" alt="profile-image" />
                            <h6 className="fw-bold mt-4 mb-1">Helen Maggie</h6>
                            <p className="text-uppercase small">Support team</p>
                            <button className="btn btn-primary"><i className="fa fa-plus"></i> Request Access</button>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <img className="card-img-top" src={gallery1} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title fw-normal">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!--[ Start:: basic widget ]--> */}
            <h5 className="text-uppercase text-primary mb-1">Basic data widget Card's</h5>
            <p>You can set as per your requirment with real data.</p>
            <div className="row g-3">
                <div className="col-xl-4 col-lg-6 col-md-12">
                    <div className="card p-3 px-4 mb-3">
                        <div>Total revenue</div>
                        <div className="py-4 m-0 text-center h1 text-success">$9,452</div>
                        <div className="d-flex">
                            <small className="text-muted">Income</small>
                            <div className="ms-auto"><i className="fa fa-angle-up text-success me-2"></i>4%</div>
                        </div>
                    </div>
                    <div className="card p-3 px-4 mb-3">
                        <div>Income status</div>
                        <div className="py-4 m-0 text-center h1 text-info">$2,258</div>
                        <div className="d-flex">
                            <small className="text-muted">New income</small>
                            <div className="ms-auto">0%</div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h6 className="text-muted text-uppercase mt-0">Orders</h6>
                            <h2>1,587</h2>
                            <span className="badge bg-primary me-1">+11% </span>
                            <span className="text-muted">From previous period</span>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body d-flex align-items-center">
                            <div className="avatar lg rounded-circle no-thumbnail"><i className="fa fa-cc-mastercard"></i></div>
                            <div className="ms-3">
                                <span>Bounce rate</span>
                                <h5 className="mb-0">52.5</h5>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="mb-0">Mobile App</h5>
                            <small className="text-muted">Ecommerce Application</small>
                            <div className="py-4">
                                <span className="fs-3 fw-bold">%14.</span>
                                <small>84</small>
                                <p>May 01, 2021</p>
                            </div>
                            <div className="avatar-list avatar-list-stacked px-3">
                                <img className="avatar sm rounded-circle" src={avatar5} data-toggle="tooltip" title="Avatar" />
                                <img className="avatar sm rounded-circle" src={avatar6} data-toggle="tooltip" title="Avatar" />
                                <img className="avatar sm rounded-circle" src={avatar1} data-toggle="tooltip" title="Avatar" />
                                <img className="avatar sm rounded-circle" src={avatar4} data-toggle="tooltip" title="Avatar" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <a href="#" title="">View Project<i className="fa fa-long-arrow-right ms-2"></i></a>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-12">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="h2 float-end">45%</div>
                            <h5 className="mb-1">Email</h5>
                            <div className="text-muted">Total Account</div>
                            <div className="mt-3">
                                <div className="progress" style={{ height: "5px" }}>
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "45%" }} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="h2 float-end">27%</div>
                            <h5 className="mb-1">2,510</h5>
                            <div className="text-muted">Total Leads</div>
                            <div className="mt-4">
                                <div className="progress" style={{ height: "5px" }}>
                                    <div className="progress-bar" role="progressbar" style={{ width: "27%" }} aria-valuenow="27" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="h2 float-end">62%</div>
                            <h5 className="mb-1">Server</h5>
                            <div className="text-muted">of 1Tb</div>
                            <div className="mt-4">
                                <div className="progress" style={{ height: "5px" }}>
                                    <div className="progress-bar bg-warning" role="progressbar" style={{ width: "65%" }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="avatar">
                                <i className="fa fa-cc-mastercard fa-2x"></i>
                            </div>
                            <span>Total income</span>
                            <h5 className="mb-0">$7,805</h5>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h6 className="text-muted">Product Sold</h6>
                            <h2 className="mt-4">2,248</h2>
                            <span className="badge bg-primary me-1">+19% </span>
                            <span className="text-muted">Last year</span>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col text-truncate fs-6 fw-bold">Labels</div>
                            </div>
                            <ul className="list-unstyled mt-3 mb-0">
                                <li className="d-flex justify-content-between align-items-center py-1 mt-2">
                                    <a href="#" className="color-600">AngularJs</a>
                                    <span className="badge bg-primary rounded">14</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-center py-1 mt-2">
                                    <a href="#" className="color-600">ReactJs</a>
                                    <span className="badge bg-primary rounded">2</span>
                                </li>
                                <li className="d-flex justify-content-between align-items-center py-1 mt-2">
                                    <a href="#" className="color-600">UI/UX Designer</a>
                                    <span className="badge bg-primary rounded">1</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-xl-5 col-lg-12 col-md-12">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="avatar rounded-circle no-thumbnail bg-warning"><i className="fa fa-trophy fa-lg"></i></div>
                                <div className="flex-fill ms-3 text-truncate">
                                    <span className="h6 mb-0">Awwwards</span>
                                </div>
                            </div>
                            <h5 className="my-4">Best of trendy design in <a href="#">2022</a> on Awwwards</h5>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consec adipiscing elit In vulputate vitae massa eu dapibus ligula.</p>
                            <a href="#" title="">Go to Awards<i className="fa fa-long-arrow-right ms-2"></i></a>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div className="avatar rounded-circle no-thumbnail bg-warning"><i className="fa fa-star fa-lg"></i></div>
                                <div className="flex-fill ms-3 text-truncate">
                                    <span className="h5 mb-0">4.9 Rating </span>
                                </div>
                            </div>
                            <div className="avatar-list avatar-list-stacked my-4 px-3">
                                <img className="avatar rounded-circle" src={avatar5} data-toggle="tooltip" title="Avatar" />
                                <img className="avatar rounded-circle" src={avatar6} data-toggle="tooltip" title="Avatar" />
                                <img className="avatar rounded-circle" src={avatar1} data-toggle="tooltip" title="Avatar" />
                                <img className="avatar rounded-circle" src={avatar4} data-toggle="tooltip" title="Avatar" />
                                <span>+195K raters</span>
                            </div>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consec adipiscing elit In vulputate vitae massa eu dapibus ligula.</p>
                            <a href="#" title="">Rate Out Application<i className="fa fa-long-arrow-right ms-2"></i></a>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="text-warning mb-3">
                                <i className="fa fa-star fa-lg"></i>
                                <i className="fa fa-star fa-lg"></i>
                                <i className="fa fa-star fa-lg"></i>
                                <i className="fa fa-star fa-lg"></i>
                                <i className="fa fa-star fa-lg"></i>
                                <span className="ps-2">4.7 Rating</span>
                            </div>
                            <p className="mb-0">Lorem ipsum dolor sit amet, consec adipiscing elit In vulputate vitae massa eu dapibus ligula.</p>
                        </div>
                        <div className="card-footer d-flex align-items-center">
                            <img className="avatar rounded-circle" src={avatar5} data-toggle="tooltip" title="Avatar" />
                            <div className="ms-3">
                                <h6 className="mb-0">Sabo Masties</h6>
                                <small className="text-muted">Founder @ mevo</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasicCard