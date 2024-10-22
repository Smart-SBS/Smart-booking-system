/* eslint-disable react/no-unescaped-entities */
import CardAction from '../../../Widgets/CardAction/CardAction'
import { Link } from 'react-router-dom'

const Modal = () => {
	return (
		<div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Modal Popup</h5>
					<div className="dropdown card-action">
						<CardAction />
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Before getting started with Bootstrap’s modal component, be sure to read the following as our menu options have recently changed.</p>
							<ul>
								<li>Modals are built with HTML, CSS, and JavaScript. They’re positioned over everything else in the document and remove scroll from the <code>&lt;body&gt;</code> so that modal content scrolls instead.</li>
								<li>Clicking on the modal “backdrop” will automatically close the modal.</li>
								<li>Bootstrap only supports one modal window at a time. Nested modals aren’t supported as we believe them to be poor user experiences.</li>
								<li>Modals use <code>position: fixed</code>, which can sometimes be a bit particular about its rendering. Whenever possible, place your modal HTML in a top-level position to avoid potential interference from other elements. You’ll likely run into issues when nesting a <code>.modal</code> within another fixed element.</li>
								<li>Once again, due to <code>position: fixed</code>, there are some caveats with using modals on mobile devices. <a href="https://getbootstrap.com/docs/5.1/getting-started/browsers-devices/#modals-and-dropdowns-on-mobile">See our browser support docs</a> for details.</li>
								<li>Due to how HTML5 defines its semantics, <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autofocus">the <code>autofocus</code> HTML attribute</a> has no effect in Bootstrap modals. To achieve the same effect, use some custom JavaScript:</li>
							</ul>
							<div className="card">
								<div className="card-header">
									<h6 className="card-title mb-0">Basic Example</h6>
								</div>
								<div className="card-body">
									{/* <!--[ Button trigger modal ]--> */}
									<button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModalLive">Launch demo modal</button>

									{/* <!--[ Modal ]--> */}
									<div className="modal fade" id="exampleModalLive" tabIndex="-1">
										<div className="modal-dialog">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title" id="exampleModalLiveLabel">Modal title</h5>
													<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div className="modal-body">
													<p>Woohoo, you're reading this text in a modal!</p>
												</div>
												<div className="modal-footer">
													<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
													<button type="button" className="btn btn-primary">Save changes</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="card-footer">
									<h5>Static backdrop</h5>
									<p>When backdrop is set to static, the modal will not close when clicking outside it. Click the button below to try it.</p>
									{/* <!--[ Button trigger modal ]--> */}
									<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
										Launch static backdrop modal
									</button>

									{/* <!--[ Modal ]--> */}
									<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
										<div className="modal-dialog">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title">Modal title</h5>
													<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div className="modal-body">
													...
												</div>
												<div className="modal-footer">
													<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
													<button type="button" className="btn btn-primary">Understood</button>
												</div>
											</div>
										</div>
									</div>

								</div>
								<div className="card-footer">
									<h5>Vertically centered</h5>
									<p>Add <code>.modal-dialog-centered</code> to <code>.modal-dialog</code> to vertically center the modal.</p>
									{/* <!--[ Button trigger modal ]--> */}
									<button type="button" className="me-1 btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Vertically centered modal</button>
									<button type="button" className="me-1 btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable">Vertically centered scrollable modal</button>

									{/* <!--[ Modal Modal Center]--> */}
									<div className="modal fade" id="exampleModalCenter" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" style={{ display: "none" }} aria-hidden="true">
										<div className="modal-dialog modal-dialog-centered">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
													<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div className="modal-body">
													<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
												</div>
												<div className="modal-footer">
													<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
													<button type="button" className="btn btn-primary">Save changes</button>
												</div>
											</div>
										</div>
									</div>

									{/* <!--[ Modal Modal Centered Scrollable]--> */}
									<div className="modal fade" id="exampleModalCenteredScrollable" tabIndex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" style={{ display: "none" }} aria-hidden="true">
										<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title" id="exampleModalCenteredScrollableTitle">Modal title</h5>
													<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div className="modal-body">
													<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
													<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
													<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
													<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
													<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
												</div>
												<div className="modal-footer">
													<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
													<button type="button" className="btn btn-primary">Save changes</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12">
							<h5>Optional sizes</h5>
							<p>Modals have three optional sizes, available via modifier classes to be placed on a <code>.modal-dialog</code>. These sizes kick in at certain breakpoints to avoid horizontal scrollbars on narrower viewports.</p>
							<table className="table">
								<thead>
									<tr>
										<th>Size</th>
										<th>Class</th>
										<th>Modal max-width</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Small</td>
										<td><code>.modal-sm</code></td>
										<td><code>300px</code></td>
									</tr>
									<tr>
										<td>Default</td>
										<td className="text-muted">None</td>
										<td><code>500px</code></td>
									</tr>
									<tr>
										<td>Large</td>
										<td><code>.modal-lg</code></td>
										<td><code>800px</code></td>
									</tr>
									<tr>
										<td>Extra large</td>
										<td><code>.modal-xl</code></td>
										<td><code>1140px</code></td>
									</tr>
									<tr>
										<td>Fullscreen</td>
										<td><code>.modal-fullscreen</code></td>
										<td><code>Always</code></td>
									</tr>
								</tbody>
							</table>
							{/* <!--[ Button trigger modal ]--> */}
							<button type="button" className="me-1 btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen">Full screen</button>
							<button type="button" className="me-1 btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModalXl">Extra large modal</button>
							<button type="button" className="me-1 btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModalLg">Large modal</button>
							<button type="button" className="me-1 btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModalSm">Small modal</button>

							{/* <!--[ Modal Fullscreen ]--> */}
							<div className="modal fade" id="exampleModalFullscreen" tabIndex="-1" aria-labelledby="exampleModalFullscreenLabel" aria-hidden="true" style={{ display: "none" }}>
								<div className="modal-dialog modal-fullscreen">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title h4" id="exampleModalFullscreenLabel">Full screen modal</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div className="modal-body">
											<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
											<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
											<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
											<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
											<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
											<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
											<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
											<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
											<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
											<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
											<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
											<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
											<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
											<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
											<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
											<p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
											<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
											<p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>

							{/* <!--[ Modal XL ]--> */}
							<div className="modal fade" id="exampleModalXl" tabIndex="-1" aria-labelledby="exampleModalXlLabel" style={{ display: "none" }} aria-hidden="true">
								<div className="modal-dialog modal-xl">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title h4" id="exampleModalXlLabel">Extra large modal</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div className="modal-body">
											...
										</div>
									</div>
								</div>
							</div>

							{/* <!--[ Modal LG ]--> */}
							<div className="modal fade" id="exampleModalLg" tabIndex="-1" aria-labelledby="exampleModalLgLabel" aria-hidden="true" style={{ display: "none" }}>
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title h4" id="exampleModalLgLabel">Large modal</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div className="modal-body">
											...
										</div>
									</div>
								</div>
							</div>

							{/* <!--[ Modal SM ]--> */}
							<div className="modal fade" id="exampleModalSm" tabIndex="-1" aria-labelledby="exampleModalSmLabel" aria-hidden="true" style={{ display: "none" }}>
								<div className="modal-dialog modal-sm">
									<div className="modal-content">
										<div className="modal-header">
											<h5 className="modal-title h4" id="exampleModalSmLabel">Small modal</h5>
											<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
										</div>
										<div className="modal-body">
											...
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/listgroup">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Listgroup</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/navbar">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Navbar</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Modal