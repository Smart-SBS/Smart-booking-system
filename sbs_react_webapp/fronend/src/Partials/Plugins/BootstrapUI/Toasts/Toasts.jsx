import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction';

import avatar1 from '../../../../assets/images/xs/avatar1.jpg';
import avatar3 from '../../../../assets/images/xs/avatar3.jpg';
import { Link } from 'react-router-dom';

const Toasts = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Toasts</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Things to know when using the toast plugin.</p>
							<ul className="lh-lg">
								<li>Toasts are opt-in for performance reasons, so <strong>you must initialize them yourself</strong>.</li>
								<li>Toasts will automatically hide if you do not specify <code>autohide: false</code>.</li>
							</ul>
							<h6>Basic Example</h6>
							<div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
								<div className="toast-header">
									<img src={avatar1} className="avatar sm rounded me-2" alt="" />
									<strong className="me-auto">Bootstrap</strong>
									<small>11 mins ago</small>
									<button type="button" className="btn-close" data-dismiss="toast" aria-label="Close"></button>
								</div>
								<div className="toast-body">
									Hello, world! This is a toast message.
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Stacking</h5>
							<p>You can stack toasts by wrapping them in a toast container, which will vertically add some spacing.</p>
							<div className="toast fade show mb-2" role="alert" aria-live="assertive" aria-atomic="true">
								<div className="toast-header">
									<img src={avatar3} className="avatar sm rounded me-2" alt="" />
									<strong className="me-auto">Bootstrap</strong>
									<small className="text-muted">just now</small>
									<button type="button" className="btn-close" data-dismiss="toast" aria-label="Close"></button>
								</div>
								<div className="toast-body">
									See? Just like this.
								</div>
							</div>
							<div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
								<div className="toast-header">
									<img src={avatar3} className="avatar sm rounded me-2" alt="" />
									<strong className="me-auto">Bootstrap</strong>
									<small className="text-muted">2 seconds ago</small>
									<button type="button" className="btn-close" data-dismiss="toast" aria-label="Close"></button>
								</div>
								<div className="toast-body">
									Heads up, toasts will stack automatically
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Custom content</h5>
							<p>Customize your toasts by removing sub-components, tweaking with <a href="https://v5.getbootstrap.com/docs/5.0/utilities/api/">utilities</a>, or adding your own markup. Here we’ve created a simpler toast by removing the default <code>.toast-header</code>, adding a custom hide icon from <a href="https://icons.getbootstrap.com/">Bootstrap Icons</a>, and using some <a href="https://v5.getbootstrap.com/docs/5.0/utilities/flex/">flexbox utilities</a> to adjust the layout.</p>
							<div className="toast d-flex align-items-center fade show mb-5" role="alert" aria-live="assertive" aria-atomic="true">
								<div className="toast-body">
									Hello, world! This is a toast message.
								</div>
								<button type="button" className="btn-close ms-auto me-2" data-dismiss="toast" aria-label="Close"></button>
							</div>
							<p>Building on the above example, you can create different toast color schemes with our <a href="https://v5.getbootstrap.com/docs/5.0/utilities/colors/">color utilities</a>. Here we’ve added <code>.bg-primary</code> and <code>.text-white</code> to the <code>.toast</code>, and then added <code>.text-white</code> to our close button. For a crisp edge, we remove the default border with <code>.border-0</code>.</p>
							<div className="toast d-flex align-items-center text-white bg-primary border-0 fade show mb-2" role="alert" aria-live="assertive" aria-atomic="true">
								<div className="toast-body">
									Hello, world! This is a toast message.
								</div>
								<button type="button" className="btn-close btn-close-white ms-auto me-2" data-dismiss="toast" aria-label="Close"></button>
							</div>
							<div className="toast d-flex align-items-center text-white bg-success border-0 fade show mb-2" role="alert" aria-live="assertive" aria-atomic="true">
								<div className="toast-body">
									Hello, world! This is a toast message.
								</div>
								<button type="button" className="btn-close btn-close-white ms-auto me-2" data-dismiss="toast" aria-label="Close"></button>
							</div>
							<div className="toast d-flex align-items-center text-white bg-danger border-0 fade show mb-5" role="alert" aria-live="assertive" aria-atomic="true">
								<div className="toast-body">
									Hello, world! This is a toast message.
								</div>
								<button type="button" className="btn-close btn-close-white ms-auto me-2" data-dismiss="toast" aria-label="Close"></button>
							</div>
							<p>Alternatively, you can also add additional controls and components to toasts.</p>
							<div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
								<div className="toast-body">
									Hello, world! This is a toast message.
									<div className="mt-2 pt-2 border-top">
										<button type="button" className="btn btn-primary btn-sm me-1">Take action</button>
										<button type="button" className="btn btn-secondary btn-sm" data-dismiss="toast">Close</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/spinners">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Spinners</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/bootstrap-icon">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Bootstrap icon</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Toasts