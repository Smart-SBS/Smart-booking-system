import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction';

import g1 from '../../../../assets/images/gallery/1.jpg';
import { Link } from 'react-router-dom';

const Cards = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Cards</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works <a href="https://getbootstrap.com/docs/5.1/components/card/" target="_blank" title="">View more Card's</a></h4>
							<p className="lead">Bootstrap’s cards provide a flexible and extensible content container with multiple variants and options.</p>
							<div className="card" style={{width: "18rem"}}>
								<img src={g1} className="card-img-top" alt="..."/>
								<div className="card-body">
									<h5 className="card-title">Card title</h5>
									<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
									<a href="#" className="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Body</h5>
							<p>The building block of a card is the <code>.card-body</code>. Use it whenever you need a padded section within a card.</p>
							<div className="card">
								<div className="card-body">
									This is some text within a card body.
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Titles, text, and links</h5>
							<p>Card titles are used by adding <code>.card-title</code> to a <code>&lt;h*&gt;</code> tag. In the same way, links are added and placed next to each other by adding <code>.card-link</code> to an <code>&lt;a&gt;</code> tag.</p>
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Card title</h5>
									<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
									<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
									<a href="#" className="card-link">Card link</a>
									<a href="#" className="card-link">Another link</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/buttons">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Buttons</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/carousel">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Carousel</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Cards