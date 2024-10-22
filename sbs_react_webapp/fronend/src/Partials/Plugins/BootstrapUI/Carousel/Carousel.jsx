import React from 'react'
import { Link } from 'react-router-dom';
import CardAction from '../../../Widgets/CardAction/CardAction';

import gallery1 from "../../../../assets/images/gallery/1.jpg";
import gallery2 from "../../../../assets/images/gallery/2.jpg";
import gallery3 from "../../../../assets/images/gallery/3.jpg";
import gallery4 from "../../../../assets/images/gallery/4.jpg";
import gallery5 from "../../../../assets/images/gallery/5.jpg";
import gallery6 from "../../../../assets/images/gallery/6.jpg";

const Carousel = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Carousel</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works <a href="https://getbootstrap.com/docs/5.1/components/carousel/" target="_blank" title="">View more demo</a></h4>
							<p className="lead">The carousel is a slideshow for cycling through a series of content, built with CSS 3D transforms and a bit of JavaScript. It works with a series of images, text, or custom markup. It also includes support for previous/next controls and indicators.</p>
							<h6>Basic Example</h6>
							<div className="carousel slide" data-bs-ride="carousel">
								<div className="carousel-inner">
									<div className="carousel-item active">
										<img src={gallery1} className="d-block w-100 rounded" alt="..."/>
									</div>
									<div className="carousel-item">
										<img src={gallery2} className="d-block w-100 rounded" alt="..."/>
									</div>
									<div className="carousel-item">
										<img src={gallery3} className="d-block w-100 rounded" alt="..."/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>With controls</h5>
							<p>Adding in the previous and next controls. We recommend using <code>&lt;button&gt;</code> elements, but you can also use <code>&lt;a&gt;</code> elements with <code>role="button"</code>.</p>
							<div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
								<div className="carousel-inner">
									<div className="carousel-item active">
										<img src={gallery1} className="d-block w-100 rounded" alt="..."/>
									</div>
									<div className="carousel-item">
										<img src={gallery2} className="d-block w-100 rounded" alt="..."/>
									</div>
									<div className="carousel-item">
										<img src={gallery3} className="d-block w-100 rounded" alt="..."/>
									</div>
								</div>
								<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
									<span className="carousel-control-prev-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Previous</span>
								</button>
								<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
									<span className="carousel-control-next-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Next</span>
								</button>
							</div>
						</div>
						<div className="col-12">
							<h5>With indicators</h5>
							<p>You can also add the indicators to the carousel, alongside the controls, too.</p>
							<div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
								<div className="carousel-indicators">
									<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
									<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
									<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
								</div>
								<div className="carousel-inner">
									<div className="carousel-item active">
										<img src={gallery1} className="d-block w-100 rounded" alt="..."/>
									</div>
									<div className="carousel-item">
										<img src={gallery2} className="d-block w-100 rounded" alt="..."/>
									</div>
									<div className="carousel-item">
										<img src={gallery3} className="d-block w-100 rounded" alt="..."/>
									</div>
								</div>
								<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
									<span className="carousel-control-prev-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Previous</span>
								</button>
								<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
									<span className="carousel-control-next-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Next</span>
								</button>
							</div>
						</div>
						<div className="col-12">
							<h5>With captions</h5>
							<p>Add captions to your slides easily with the <code>.carousel-caption</code> element within any <code>.carousel-item</code>. They can be easily hidden on smaller viewports, as shown below, with optional <a href="#">display utilities</a>. We hide them initially with <code>.d-none</code> and bring them back on medium-sized devices with <code>.d-md-block</code>.</p>
							<div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
								<div className="carousel-indicators">
									<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
									<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
									<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
								</div>
								<div className="carousel-inner">
									<div className="carousel-item active">
									<img src={gallery4} className="d-block w-100 rounded" alt="..."/>
									<div className="carousel-caption d-none d-md-block">
										<h5>First slide label</h5>
										<p>Some representative placeholder content for the first slide.</p>
									</div>
									</div>
									<div className="carousel-item">
									<img src={gallery5} className="d-block w-100 rounded" alt="..."/>
									<div className="carousel-caption d-none d-md-block">
										<h5>Second slide label</h5>
										<p>Some representative placeholder content for the second slide.</p>
									</div>
									</div>
									<div className="carousel-item">
									<img src={gallery6} className="d-block w-100 rounded" alt="..."/>
									<div className="carousel-caption d-none d-md-block">
										<h5>Third slide label</h5>
										<p>Some representative placeholder content for the third slide.</p>
									</div>
									</div>
								</div>
								<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
									<span className="carousel-control-prev-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Previous</span>
								</button>
								<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
									<span className="carousel-control-next-icon" aria-hidden="true"></span>
									<span className="visually-hidden">Next</span>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/cards">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Cards</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/collapse">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Collapse</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Carousel