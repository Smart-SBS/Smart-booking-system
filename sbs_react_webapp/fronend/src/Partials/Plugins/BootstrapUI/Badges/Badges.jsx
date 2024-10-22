import React from 'react'
import { Link } from 'react-router-dom';
import CardAction from '../../../Widgets/CardAction/CardAction';

import avatar1 from '../../../../assets/images/xs/avatar1.jpg';
import avatar2 from '../../../../assets/images/xs/avatar2.jpg';
import avatar3 from '../../../../assets/images/xs/avatar3.jpg';
import avatar4 from '../../../../assets/images/xs/avatar4.jpg';
import avatar5 from '../../../../assets/images/xs/avatar5.jpg';
import avatar6 from '../../../../assets/images/xs/avatar6.jpg';
import avatar7 from '../../../../assets/images/xs/avatar7.jpg';
import avatar8 from '../../../../assets/images/xs/avatar8.jpg';

const Badges = () => {
  return (
    <div className="px-4 py-3 page-body">
			
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Badges</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Badges scale to match the size of the immediate parent element by using relative font sizing and em units. As of v5, badges no longer have focus or hover styles for links.</p>
							<h1>Example heading <span className="badge bg-secondary">New</span></h1>
							<h2>Example heading <span className="badge bg-secondary">New</span></h2>
							<h3>Example heading <span className="badge bg-secondary">New</span></h3>
							<h4>Example heading <span className="badge bg-secondary">New</span></h4>
							<h5>Example heading <span className="badge bg-secondary">New</span></h5>
							<h6>Example heading <span className="badge bg-secondary">New</span></h6>
							<hr/>
							<h6>More Examples</h6>
							<div className="d-flex gap-2 mb-3">
								<span className="badge d-flex align-items-center p-1 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
								  	<img className="rounded-circle me-1" src={avatar1} alt="" width="24" height="24"/>Primary
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-pill">
								  	<img className="rounded-circle me-1" src={avatar2} alt="" width="24" height="24"/>Secondary
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill">
								  	<img className="rounded-circle me-1" src={avatar3} alt="" width="24" height="24"/>Success
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-pill">
								  	<img className="rounded-circle me-1" src={avatar4} alt="" width="24" height="24"/>Danger
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill">
								  	<img className="rounded-circle me-1" src={avatar5} alt="" width="24" height="24"/>Warning
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-info-emphasis bg-info-subtle border border-info-subtle rounded-pill">
								  	<img className="rounded-circle me-1" src={avatar6} alt="" width="24" height="24"/>Info
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-dark-emphasis bg-light-subtle border border-dark-subtle rounded-pill">
								  	<img className="rounded-circle me-1" src={avatar7} alt="" width="24" height="24"/>Light
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-dark-emphasis bg-dark-subtle border border-dark-subtle rounded-pill">
								  	<img className="rounded-circle me-1" src={avatar8} alt="" width="24" height="24"/>Dark
								</span>
							</div>
							<div className="d-flex gap-2 mb-3">
								<span className="badge d-flex p-2 align-items-center bg-primary rounded-pill">
									<span className="px-1">Primary</span>
									<a href="#"><svg className="bi ms-1" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex p-2 align-items-center text-primary-emphasis bg-primary-subtle rounded-pill">
									<span className="px-1">Primary</span>
									<a href="#"><svg className="bi ms-1" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex p-2 align-items-center text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
									<span className="px-1">Primary</span>
									<a href="#"><svg className="bi ms-1" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex p-2 align-items-center theme-color1 rounded-pill">
									<span className="px-1">Theme color 1</span>
									<a href="#"><svg className="bi ms-1" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex p-2 align-items-center theme-color2 rounded-pill">
									<span className="px-1">Theme color 2</span>
									<a href="#"><svg className="bi ms-1" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex p-2 align-items-center theme-color3 rounded-pill">
									<span className="px-1">Theme color 3</span>
									<a href="#"><svg className="bi ms-1" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex p-2 align-items-center theme-color4 rounded-pill">
									<span className="px-1">Theme color 4</span>
									<a href="#"><svg className="bi ms-1" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex p-2 align-items-center theme-color5 rounded-pill">
									<span className="px-1">Theme color 5</span>
									<a href="#"><svg className="bi ms-1" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
							</div>
							<div className="d-flex gap-2 mb-3">
								<span className="badge d-flex align-items-center p-1 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
									<img className="rounded-circle me-1" src={avatar1} alt="" width="24" height="24"/>
									Primary
									<span className="vr mx-2"></span>
									<a href="#"><svg className="bi" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-pill">
									<img className="rounded-circle me-1" src={avatar2} alt="" width="24" height="24"/>
									Secondary
									<span className="vr mx-2"></span>
									<a href="#"><svg className="bi" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill">
									<img className="rounded-circle me-1" src={avatar3} alt="" width="24" height="24"/>
									Success
									<span className="vr mx-2"></span>
									<a href="#"><svg className="bi" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-pill">
									<img className="rounded-circle me-1" src={avatar4} alt="" width="24" height="24"/>
									Danger
									<span className="vr mx-2"></span>
									<a href="#"><svg className="bi" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill">
									<img className="rounded-circle me-1" src={avatar5} alt="" width="24" height="24"/>
									Warning
									<span className="vr mx-2"></span>
									<a href="#"><svg className="bi" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-info-emphasis bg-info-subtle border border-info-subtle rounded-pill">
									<img className="rounded-circle me-1" src={avatar6} alt="" width="24" height="24"/>
									Info
									<span className="vr mx-2"></span>
									<a href="#"><svg className="bi" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-light-emphasis bg-light-subtle border border-dark-subtle rounded-pill">
									<img className="rounded-circle me-1" src={avatar7} alt="" width="24" height="24"/>
									Light
									<span className="vr mx-2"></span>
									<a href="#"><svg className="bi" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
								<span className="badge d-flex align-items-center p-1 pe-2 text-dark-emphasis bg-dark-subtle border border-dark-subtle rounded-pill">
									<img className="rounded-circle me-1" src={avatar8} alt="" width="24" height="24"/>
									Dark
									<span className="vr mx-2"></span>
									<a href="#"><svg className="bi" width="16" height="16"><use href="#x-circle-fill"></use></svg></a>
								</span>
							</div>
						</div>
						<div className="col-12">
							<h5>Buttons</h5>
							<p>Badges can be used as part of links or buttons to provide a counter.</p>
							<div className="card-body">
								<button type="button" className="btn btn-primary">
									Notifications <span className="badge bg-secondary">4</span>
								</button>
							</div>
						</div>
						<div className="col-12">
							<h5>Positioned</h5>
							<p>Use utilities to modify a <code>.badge</code> and position it in the corner of a link or button.</p>
							<div className="card">
								<div className="card-body">
									<button type="button" className="btn btn-primary position-relative">
										Inbox
										<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
											99+
											<span className="visually-hidden">unread messages</span>
										</span>
									</button>
								</div>
								<div className="card-body">
									<button type="button" className="btn btn-primary position-relative">
										Profile
										<span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
											<span className="visually-hidden">New alerts</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Background colors</h5>
							<p>Use our background utility classes to quickly change the appearance of a badge. Please note that when using Bootstrap’s default <code>.bg-light</code>, you’ll likely need a text color utility like <code>.text-dark</code> for proper styling. This is because background utilities do not set anything but <code>background-color</code>.</p>
							<span className="badge bg-primary me-1">Primary</span>
							<span className="badge bg-secondary  me-1">Secondary</span>
							<span className="badge bg-success  me-1">Success</span>
							<span className="badge bg-danger  me-1">Danger</span>
							<span className="badge bg-warning text-dark me-1">Warning</span>
							<span className="badge bg-info text-dark me-1">Info</span>
							<span className="badge bg-light text-dark me-1">Light</span>
							<span className="badge bg-dark me-1">Dark</span>
						</div>
						<div className="col-12">
							<h5>Pill badges</h5>
							<p>Use the <code>.rounded-pill</code> utility class to make badges more rounded with a larger <code>border-radius</code>.</p>
							<span className="badge rounded-pill bg-primary me-1">Primary</span>
							<span className="badge rounded-pill bg-secondary me-1">Secondary</span>
							<span className="badge rounded-pill bg-success me-1">Success</span>
							<span className="badge rounded-pill bg-danger me-1">Danger</span>
							<span className="badge rounded-pill bg-warning text-dark me-1">Warning</span>
							<span className="badge rounded-pill bg-info text-dark me-1">Info</span>
							<span className="badge rounded-pill bg-light text-dark me-1">Light</span>
							<span className="badge rounded-pill bg-dark me-1">Dark</span>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/avatar">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Avatar</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/breadcrumb">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Breadcrumb</h5>
						</Link>
					</div>
				</div>
				<svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}}>
					<symbol id="x-circle-fill" viewBox="0 0 16 16">
					  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
					</symbol>
				</svg>
			</div>
		</div>
    )
}

export default Badges