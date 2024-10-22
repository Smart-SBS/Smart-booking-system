import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction'
import { Link } from 'react-router-dom'

const Navbar = () => {
  	return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Navbar</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Here’s what you need to know before getting started with the navbar:</p>
							<ul>
								<li>Navbars require a wrapping <code>.navbar</code> with <code>.navbar-expand{'-sm|-md|-lg|-xl|-xxl'}</code> for responsive collapsing and <a href="#color-schemes">color scheme</a> classes.</li>
								<li>Navbars and their contents are fluid by default. Change the <a href="#containers">container</a> to limit their horizontal width in different ways.</li>
								<li>Use our <a href="https://getbootstrap.com/docs/5.1/utilities/spacing/">spacing</a> and <a href="https://getbootstrap.com/docs/5.1/utilities/flex/">flex</a> utility classes for controlling spacing and alignment within navbars.</li>
								<li>Navbars are responsive by default, but you can easily modify them to change that. Responsive behavior depends on our Collapse JavaScript plugin.</li>
								<li>Ensure accessibility by using a <code>&lt;nav&gt;</code> element or, if using a more generic element such as a <code>&lt;div&gt;</code>, add a <code>role="navigation"</code> to every navbar to explicitly identify it as a landmark region for users of assistive technologies.</li>
								<li>Indicate the current item by using <code>aria-current="page"</code> for the current page or <code>aria-current="true"</code> for the current item in a set.</li>
							</ul>
						</div>
						<div className="col-12">
							<h6>Basic Example</h6>
							<div className="mb-3 pb-3 border-bottom">
								<nav className="navbar navbar-expand-lg navbar-light bg-light">
									<div className="container-xxl">
									<a className="navbar-brand" href="#">Navbar</a>
									<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
										<span className="navbar-toggler-icon"></span>
									</button>
									<div className="collapse navbar-collapse" id="navbarSupportedContent">
										<ul className="navbar-nav me-auto mb-2 mb-lg-0">
										<li className="nav-item">
											<a className="nav-link active" aria-current="page" href="#">Home</a>
										</li>
										<li className="nav-item">
											<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item dropdown">
											<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
											Dropdown
											</a>
											<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
											<li><a className="dropdown-item" href="#">Action</a></li>
											<li><a className="dropdown-item" href="#">Another action</a></li>
											<li><hr className="dropdown-divider"/></li>
											<li><a className="dropdown-item" href="#">Something else here</a></li>
											</ul>
										</li>
										<li className="nav-item">
											<a className="nav-link disabled">Disabled</a>
										</li>
										</ul>
										<form className="d-flex">
										<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
										<button className="btn btn-outline-success" type="button">Search</button>
										</form>
									</div>
									</div>
								</nav>
							</div>
							<h5>Color schemes</h5>
							<p>Theming the navbar has never been easier thanks to the combination of theming classes and <code>background-color</code> utilities. Choose from <code>.navbar-light</code> for use with light background colors, or <code>.navbar-dark</code> for dark background colors. Then, customize with <code>.bg-*</code> utilities.</p>
							<nav className="navbar mb-2 navbar-expand-lg navbar-dark bg-dark">
								<div className="container-xxl">
									<a className="navbar-brand" href="#">Navbar</a>
									<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
									</button>
									<div className="collapse navbar-collapse" id="navbarColor01">
									<ul className="navbar-nav me-auto mb-2 mb-lg-0">
										<li className="nav-item">
										<a className="nav-link active" aria-current="page" href="#">Home</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Features</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Pricing</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">About</a>
										</li>
									</ul>
									<form className="d-flex">
										<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
										<button className="btn btn-outline-light" type="button">Search</button>
									</form>
									</div>
								</div>
							</nav>
							<nav className="navbar mb-2 navbar-expand-lg navbar-dark bg-primary">
								<div className="container-xxl">
									<a className="navbar-brand" href="#">Navbar</a>
									<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
									<span className="navbar-toggler-icon"></span>
									</button>
									<div className="collapse navbar-collapse" id="navbarColor02">
									<ul className="navbar-nav me-auto mb-2 mb-lg-0">
										<li className="nav-item">
										<a className="nav-link active" aria-current="page" href="#">Home</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Features</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Pricing</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">About</a>
										</li>
									</ul>
									<form className="d-flex">
										<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
										<button className="btn btn-outline-light" type="button">Search</button>
									</form>
									</div>
								</div>
							</nav>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/modal">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Modal</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/navstabs">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Navstabs</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Navbar