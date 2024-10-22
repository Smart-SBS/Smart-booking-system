import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction';

import gallery1 from '../../../../assets/images/gallery/1.jpg';
import { Link } from 'react-router-dom';

const Placeholders = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Placeholders</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Create placeholders with the <code>.placeholder</code> class and a grid column class (e.g., <code>.col-6</code>) to set the <code>width</code>. They can replace the text inside an element or be added as a modifier class to an existing component.</p>
							<p className="lead">We apply additional styling to <code>.btn</code>s via <code>::before</code> to ensure the <code>height</code> is respected. You may extend this pattern for other situations as needed, or add a <code>&amp;nbsp;</code> within the element to reflect the height when actual text is rendered in its place.</p>
							<h6>Basic Example</h6>
							<p aria-hidden="true"><span className="placeholder col-6"></span></p>
							<a href="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-4" aria-hidden="true"></a>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-12">
							<div className="card">
								<img src={gallery1} className="card-img-top" alt="..."/>
							
								<div className="card-body">
								<h5 className="card-title">Card title</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<a href="#" className="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-12">
							<div className="card" aria-hidden="true">
								<img src={gallery1} className="card-img-top" alt="..."/>
								<div className="card-body">
								<h5 className="card-title placeholder-glow">
									<span className="placeholder col-6"></span>
								</h5>
								<p className="card-text placeholder-glow">
									<span className="placeholder col-7"></span>
									<span className="placeholder col-4"></span>
									<span className="placeholder col-4"></span>
									<span className="placeholder col-6"></span>
									<span className="placeholder col-8"></span>
								</p>
								<a href="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-6"></a>
								</div>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12">
							<div className="card" aria-hidden="true" style={{maxWidth: "540px"}}>
								<div className="row g-0">
									<div className="col-md-4">
									<img src={gallery1} className="img-fluid rounded-start" alt="..."/>
									</div>
									<div className="col-md-8">
									<div className="card-body">
										<h5 className="card-title placeholder-glow">
											<span className="placeholder col-6"></span>
										</h5>
										<p className="card-text placeholder-glow">
											<span className="placeholder col-7"></span>
											<span className="placeholder col-4"></span>
											<span className="placeholder col-4"></span>
											<span className="placeholder col-6"></span>
											<span className="placeholder col-8"></span>
										</p>
										<a href="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-6"></a>
									</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Width and Color</h5>
							<p>You can change the <code>width</code> through grid column classes, width utilities, or inline styles.</p>
							<span className="placeholder col-6"></span>
							<span className="placeholder w-75"></span>
							<span className="placeholder" style={{width: "25%"}}></span>
							<div className="my-4">
								<p>By default, the <code>placeholder</code> uses <code>currentColor</code>. This can be overridden with a custom color or utility class.</p>
								<span className="placeholder col-12"></span>
								<span className="placeholder col-12 bg-primary"></span>
								<span className="placeholder col-12 bg-secondary"></span>
								<span className="placeholder col-12 bg-success"></span>
								<span className="placeholder col-12 bg-danger"></span>
								<span className="placeholder col-12 bg-warning"></span>
								<span className="placeholder col-12 bg-info"></span>
								<span className="placeholder col-12 bg-light"></span>
								<span className="placeholder col-12 bg-dark"></span>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/pagination">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Pagination</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/popovers">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Popovers</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Placeholders