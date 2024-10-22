import React from 'react'
import { Link } from 'react-router-dom'
import CardAction from '../../../Widgets/CardAction/CardAction'

const Breadcrumb = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Breadcrumb</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Use an ordered or unordered list with linked list items to create a minimally styled breadcrumb. Use our utilities to add additional styles as desired.</p>
							<h6>Basic Examples</h6>
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb">
									<li className="breadcrumb-item active" aria-current="page">Home</li>
								</ol>
							</nav>
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb p-2 rounded border">
									<li className="breadcrumb-item"><a href="#">Home</a></li>
									<li className="breadcrumb-item active" aria-current="page">Library</li>
								</ol>
							</nav>
							<nav aria-label="breadcrumb">
								<ol className="breadcrumb p-2 rounded border border-primary dashed mb-0">
									<li className="breadcrumb-item"><a href="#">Home</a></li>
									<li className="breadcrumb-item"><a href="#">Library</a></li>
									<li className="breadcrumb-item active" aria-current="page">Data</li>
								</ol>
							</nav>
						</div>
						<div className="col-12">
							<h5>Dividers</h5>
							<p>Dividers are automatically added in CSS through <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::before"><code>::before</code></a> and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/content"><code>content</code></a>. They can be changed by modifying a local CSS custom property <code>--bs-breadcrumb-divider</code>, or through the <code>$breadcrumb-divider</code> Sass variable — and <code>$breadcrumb-divider-flipped</code> for its RTL counterpart, if needed. We default to our Sass variable, which is set as a fallback to the custom property. This way, you get a global divider that you can override without recompiling CSS at any time.</p>
							<nav style={{ '--bs-breadcrumb-divider': '>' }} aria-label="breadcrumb">
								<ol className="breadcrumb mb-0">
									<li className="breadcrumb-item"><a href="#">Home</a><span> {'  > '}</span></li>
									<li className="breadcrumb-item active" aria-current="page">Library</li>
								</ol>
							</nav>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/badges">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Badges</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/buttons">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Buttons</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Breadcrumb