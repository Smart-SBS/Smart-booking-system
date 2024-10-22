import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction'
import { Link } from 'react-router-dom'

const Navstabs = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Navs and tabs</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Navigation available in Bootstrap share general markup and styles, from the base <code>.nav</code> class to the active and disabled states. Swap modifier classes to switch between each style.</p>
							<p className="lead">The base <code>.nav</code> component is built with flexbox and provide a strong foundation for building all types of navigation components. It includes some style overrides (for working with lists), some link padding for larger hit areas, and basic disabled styling.</p>
							<div className="card">
								<div className="card-header">
									<h6 className="card-title mb-0">Basic Example</h6>
								</div>
								<div className="card-body">
									<ul className="nav">
										<li className="nav-item">
										<a className="nav-link active" aria-current="page" href="#">Active</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item">
										<a className="nav-link disabled">Disabled</a>
										</li>
									</ul>
								</div>
								<div className="card-footer">
									<h5>Horizontal alignment</h5>
									<p>Centered with <code>.justify-content-center</code>, Right-aligned with <code>.justify-content-end</code>:</p>
									<ul className="nav justify-content-center">
										<li className="nav-item">
										<a className="nav-link active" aria-current="page" href="#">Active</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item">
										<a className="nav-link disabled">Disabled</a>
										</li>
									</ul>
									<ul className="nav justify-content-end">
										<li className="nav-item">
										<a className="nav-link active" aria-current="page" href="#">Active</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item">
										<a className="nav-link disabled">Disabled</a>
										</li>
									</ul>
								</div>
								<div className="card-footer">
									<h5>Vertical</h5>
									<p>Stack your navigation by changing the flex item direction with the <code>.flex-column</code> utility. Need to stack them on some viewports but not others? Use the responsive versions (e.g., <code>.flex-sm-column</code>).</p>
									<ul className="nav flex-column">
										<li className="nav-item">
										<a className="nav-link active" aria-current="page" href="#">Active</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item">
										<a className="nav-link disabled">Disabled</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Tabs</h5>
							<p>Takes the basic nav from above and adds the <code>.nav-tabs</code> class to generate a tabbed interface. Use them to create tabbable regions with our <a href="#javascript-behavior">tab JavaScript plugin</a>.</p>
							<ul className="nav nav-tabs">
								<li className="nav-item">
									<a className="nav-link active" aria-current="page" href="#">Active</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Link</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Link</a>
								</li>
								<li className="nav-item">
									<a className="nav-link disabled">Disabled</a>
								</li>
							</ul>
						</div>
						<div className="col-12">
							<h5>Pills</h5>
							<p>Take that same HTML, but use <code>.nav-pills</code> instead:</p>
							<ul className="nav nav-pills">
								<li className="nav-item">
									<a className="nav-link active" aria-current="page" href="#">Active</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Link</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Link</a>
								</li>
								<li className="nav-item">
									<a className="nav-link disabled">Disabled</a>
								</li>
							</ul>
						</div>
						<div className="col-12">
							<h5>Fill and justify</h5>
							<p>Force your <code>.nav</code>’s contents to extend the full available width one of two modifier classes. To proportionately fill all available space with your <code>.nav-item</code>s, use <code>.nav-fill</code>. Notice that all horizontal space is occupied, but not every nav item has the same width.</p>
							<ul className="nav nav-pills nav-fill border rounded p-2">
								<li className="nav-item">
									<a className="nav-link active" aria-current="page" href="#">Active</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Much longer nav link</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">Link</a>
								</li>
								<li className="nav-item">
									<a className="nav-link disabled">Disabled</a>
								</li>
							</ul>
						</div>
						<div className="col-12">
							<h5>Tabs with dropdowns</h5>
							<div className="card">
								<div className="card-body">
									<ul className="nav nav-tabs">
										<li className="nav-item">
										<a className="nav-link active" aria-current="page" href="#">Active</a>
										</li>
										<li className="nav-item dropdown">
										<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
										<ul className="dropdown-menu">
											<li><a className="dropdown-item" href="#">Action</a></li>
											<li><a className="dropdown-item" href="#">Another action</a></li>
											<li><a className="dropdown-item" href="#">Something else here</a></li>
											<li><hr className="dropdown-divider"/></li>
											<li><a className="dropdown-item" href="#">Separated link</a></li>
										</ul>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item">
										<a className="nav-link disabled">Disabled</a>
										</li>
									</ul>
								</div>
								<div className="card-footer">
									<h5>Pills with dropdowns</h5>
									<ul className="nav nav-pills">
										<li className="nav-item">
										<a className="nav-link active" aria-current="page" href="#">Active</a>
										</li>
										<li className="nav-item dropdown">
										<a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
										<ul className="dropdown-menu">
											<li><a className="dropdown-item" href="#">Action</a></li>
											<li><a className="dropdown-item" href="#">Another action</a></li>
											<li><a className="dropdown-item" href="#">Something else here</a></li>
											<li><hr className="dropdown-divider"/></li>
											<li><a className="dropdown-item" href="#">Separated link</a></li>
										</ul>
										</li>
										<li className="nav-item">
										<a className="nav-link" href="#">Link</a>
										</li>
										<li className="nav-item">
										<a className="nav-link disabled">Disabled</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>JavaScript behavior</h5>
							<div className="card">
								<div className="card-body">
									<ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
										<li className="nav-item" role="presentation">
										<button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
										</li>
										<li className="nav-item" role="presentation">
										<button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
										</li>
										<li className="nav-item" role="presentation">
										<button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
										</li>
									</ul>
									<div className="tab-content" id="myTabContent">
										<div className="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
										<p><strong>This is some placeholder content the Home tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
										<div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
										<p><strong>This is some placeholder content the Profile tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
										<div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
										<p><strong>This is some placeholder content the Contact tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
									</div>
								</div>
								<div className="card-footer">
									<h5>The tabs plugin also works with pills.</h5>
									<ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
										<li className="nav-item" role="presentation">
										<button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
										</li>
										<li className="nav-item" role="presentation">
										<button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
										</li>
										<li className="nav-item" role="presentation">
										<button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
										</li>
									</ul>
									<div className="tab-content" id="pills-tabContent">
										<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
										<p><strong>This is some placeholder content the Home tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
										<div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
										<p><strong>This is some placeholder content the Profile tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
										<div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
										<p><strong>This is some placeholder content the Contact tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
									</div>
								</div>
								<div className="card-footer">
									<h5>And with vertical pills.</h5>
									<div className="d-flex align-items-start">
										<div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
										<button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</button>
										<button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button>
										<button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button>
										<button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button>
										</div>
										<div className="tab-content" id="v-pills-tabContent">
										<div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
										<p><strong>This is some placeholder content the Home tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
										<div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
										<p><strong>This is some placeholder content the Profile tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
										<div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
										<p><strong>This is some placeholder content the Messages tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
										<div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
										<p><strong>This is some placeholder content the Settings tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
										</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/navbar">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Navbar</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/offcanvas">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">offcanvas</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Navstabs