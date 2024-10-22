import React from 'react'
import { Link } from 'react-router-dom'
import CardAction from '../../../Widgets/CardAction/CardAction'

const Collapse = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Collapse</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lea">Toggle the visibility of content across your project with a few classes and our JavaScript plugins.</p>
							<p>Click the buttons below to show and hide another element via class changes:</p>
							<ul>
								<li><code>.collapse</code> hides content</li>
								<li><code>.collapsing</code> is applied during transitions</li>
								<li><code>.collapse.show</code> shows content</li>
							</ul>
							<p>Generally, we recommend using a button with the <code>data-bs-target</code> attribute. While not recommended from a semantic point of view, you can also use a link with the <code>href</code> attribute (and a <code>role="button"</code>). In both cases, the <code>data-bs-toggle="collapse"</code> is required.</p>
							<p>
								<a className="me-1 btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
								Link with href
								</a>
								<button className="me-1 btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
								Button with data-bs-target
								</button>
							</p>
							<div className="collapse" id="collapseExample">
								<div className="card card-body bg-body">
								Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Horizontal</h5>
							<p>The collapse plugin also supports horizontal collapsing. Add the <code>.collapse-horizontal</code> modifier class to transition the <code>width</code> instead of <code>height</code> and set a <code>width</code> on the immediate child element. Feel free to write your own custom Sass, use inline styles, or use our <a href="https://getbootstrap.com/docs/5.1/utilities/sizing/">width utilities</a>.</p>
							<p>
								<button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
									Toggle width collapse
								</button>
							</p>
							<div style={{minHeight: "120px"}}>
								<div className="collapse collapse-horizontal" id="collapseWidthExample">
									<div className="card card-body bg-body" style={{width: "300px"}}>
									This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Multiple targets</h5>
							<p>
								<a className="me-1 btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Toggle first element</a>
								<button className="me-1 btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Toggle second element</button>
								<button className="me-1 btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>
							</p>
							<div className="row">
								<div className="col">
									<div className="collapse multi-collapse" id="multiCollapseExample1">
									<div className="card card-body bg-body">
										Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
									</div>
									</div>
								</div>
								<div className="col">
									<div className="collapse multi-collapse" id="multiCollapseExample2">
									<div className="card card-body bg-body">
										Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
									</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/carousel">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Carousel</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/dropdowns">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Dropdowns</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Collapse