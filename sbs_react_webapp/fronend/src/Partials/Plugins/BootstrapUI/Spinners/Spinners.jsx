import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction'
import { Link } from 'react-router-dom'

const Spinners = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Spinners</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Indicate the loading state of a component or page with Bootstrap spinners, built entirely with HTML, CSS, and no JavaScript.</p>
							<div className="card">
								<div className="card-header">
									<h6 className="card-title mb-0">Basic Example</h6>
								</div>
								<div className="card-body">
									<p>Use the border spinners for a lightweight loading indicator.</p>
									<div className="spinner-border" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								</div>
								<div className="card-footer">
									<h5></h5>
									<p>The border spinner uses <code>currentColor</code> for its <code>border-color</code>, meaning you can customize the color with <a href="https://getbootstrap.com/docs/5.0/utilities/colors/">text color utilities</a>. You can use any of our text color utilities on the standard spinner.</p>
									<div className="me-1 spinner-border text-primary" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
									<div className="me-1 spinner-border text-secondary" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
									<div className="me-1 spinner-border text-success" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
									<div className="me-1 spinner-border text-danger" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
									<div className="me-1 spinner-border text-warning" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
									<div className="me-1 spinner-border text-info" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
									<div className="me-1 spinner-border text-light" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
									<div className="me-1 spinner-border text-dark" role="status">
										<span className="visually-hidden">Loading...</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Growing spinner</h5>
							<p>If you don’t fancy a border spinner, switch to the grow spinner. While it doesn’t technically spin, it does repeatedly grow!</p>
							<div className="me-1 spinner-grow text-primary" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div className="me-1 spinner-grow text-secondary" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div className="me-1 spinner-grow text-success" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div className="me-1 spinner-grow text-danger" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div className="me-1 spinner-grow text-warning" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div className="me-1 spinner-grow text-info" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div className="me-1 spinner-grow text-light" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div className="me-1 spinner-grow text-dark" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
						<div className="col-12">
							<h5>Size</h5>
							<p>Add <code>.spinner-border-sm</code> and <code>.spinner-grow-sm</code> to make a smaller spinner that can quickly be used within other components.</p>
							<div className="me-1 spinner-border spinner-border-sm" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div className="me-1 spinner-grow spinner-grow-sm" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div className="me-1 spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
							<div className="me-1 spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						</div>
						<div className="col-12">
							<h5>Buttons</h5>
							<p>Use spinners within buttons to indicate an action is currently processing or taking place. You may also swap the text out of the spinner element and utilize button text as needed.</p>
							<button className="me-1 btn btn-primary" type="button" disabled>
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								<span className="visually-hidden me-2"> Loading...</span>
							</button>
							<button className="me-1 btn btn-primary" type="button" disabled>
								<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
								Loading...
							</button>
							<button className="me-1 btn btn-primary" type="button" disabled>
								<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
								<span className="visually-hidden me-2"> Loading...</span>
							</button>
							<button className="me-1 btn btn-primary" type="button" disabled>
								<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
								Loading...
							</button>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/progress">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Progress bar</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/toasts">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Toasts</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Spinners