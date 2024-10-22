import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction'
import { Link } from 'react-router-dom'

const Pagination = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Pagination</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Documentation and examples for showing pagination to indicate a series of related content exists across multiple pages.</p>
							<h6>Basic Example</h6>
							<nav aria-label="Page navigation">
								<ul className="pagination">
									<li className="page-item"><a className="page-link" href="#">Previous</a></li>
									<li className="page-item"><a className="page-link" href="#">1</a></li>
									<li className="page-item"><a className="page-link" href="#">2</a></li>
									<li className="page-item"><a className="page-link" href="#">3</a></li>
									<li className="page-item"><a className="page-link" href="#">Next</a></li>
								</ul>
							</nav>
						</div>
						<div className="col-12">
							<h5>Working with icons</h5>
							<p>Looking to use an icon or symbol in place of text for some pagination links? Be sure to provide proper screen reader support with <code>aria</code> attributes.</p>
							<nav aria-label="Page navigation">
								<ul className="pagination">
									<li className="page-item">
									<a className="page-link" href="#" aria-label="Previous">
										<span aria-hidden="true">&laquo;</span>
									</a>
									</li>
									<li className="page-item"><a className="page-link" href="#">1</a></li>
									<li className="page-item"><a className="page-link" href="#">2</a></li>
									<li className="page-item"><a className="page-link" href="#">3</a></li>
									<li className="page-item">
									<a className="page-link" href="#" aria-label="Next">
										<span aria-hidden="true">&raquo;</span>
									</a>
									</li>
								</ul>
							</nav>
						</div>
						<div className="col-12">
							<h5>Sizing</h5>
							<p>Fancy larger or smaller pagination? Add <code>.pagination-lg</code> or <code>.pagination-sm</code> for additional sizes.</p>
							<nav aria-label="...">
								<ul className="pagination pagination-lg">
									<li className="page-item active" aria-current="page">
									<span className="page-link">1</span>
									</li>
									<li className="page-item"><a className="page-link" href="#">2</a></li>
									<li className="page-item"><a className="page-link" href="#">3</a></li>
								</ul>
							</nav>
							<nav aria-label="...">
								<ul className="pagination pagination-sm">
									<li className="page-item active" aria-current="page">
									<span className="page-link">1</span>
									</li>
									<li className="page-item"><a className="page-link" href="#">2</a></li>
									<li className="page-item"><a className="page-link" href="#">3</a></li>
								</ul>
							</nav>
						</div>
						<div className="col-12">
							<h5>Alignment</h5>
							<p>Change the alignment of pagination components with <a href="https://getbootstrap.com/docs/5.1/utilities/flex/">flexbox utilities</a>.</p>
							<div className="card">
								<div className="card-body">
									<nav aria-label="Page navigation">
										<ul className="pagination justify-content-center">
										<li className="page-item disabled">
											<a className="page-link">Previous</a>
										</li>
										<li className="page-item"><a className="page-link" href="#">1</a></li>
										<li className="page-item"><a className="page-link" href="#">2</a></li>
										<li className="page-item"><a className="page-link" href="#">3</a></li>
										<li className="page-item">
											<a className="page-link" href="#">Next</a>
										</li>
										</ul>
									</nav>
								</div>
								<div className="card-footer">
									<nav aria-label="Page navigation">
										<ul className="pagination justify-content-end">
										<li className="page-item disabled">
											<a className="page-link">Previous</a>
										</li>
										<li className="page-item"><a className="page-link" href="#">1</a></li>
										<li className="page-item"><a className="page-link" href="#">2</a></li>
										<li className="page-item"><a className="page-link" href="#">3</a></li>
										<li className="page-item">
											<a className="page-link" href="#">Next</a>
										</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/offcanvas">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Offcanvas</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/placeholders">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Placeholder</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Pagination