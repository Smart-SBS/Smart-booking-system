import React from 'react'
import { Link } from 'react-router-dom'
import CardAction from '../../../Widgets/CardAction/CardAction'

const Buttons = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Buttons</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead mb-5">Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.</p>
							<h6>Basic Examples</h6>
							<button type="button" className="me-1 btn btn-primary">Primary</button>
							<button type="button" className="me-1 btn btn-secondary">Secondary</button>
							<button type="button" className="me-1 btn btn-success">Success</button>
							<button type="button" className="me-1 btn btn-danger">Danger</button>
							<button type="button" className="me-1 btn btn-warning">Warning</button>
							<button type="button" className="me-1 btn btn-info">Info</button>
							<button type="button" className="me-1 btn btn-light">Light</button>
							<button type="button" className="me-1 btn btn-dark">Dark</button>
							<button type="button" className="me-1 btn btn-link">Link</button>
						</div>
						<div className="col-12">
							<h5>Button tags</h5>
							<p>The <code>.btn</code> classes are designed to be used with the <code>&lt;button&gt;</code> element. However, you can also use these classes on <code>&lt;a&gt;</code> or <code>&lt;input&gt;</code> elements (though some browsers may apply a slightly different rendering).</p>
							<a className="me-1 btn btn-primary" href="#" role="button">Link</a>
							<button className="me-1 btn btn-primary" type="submit">Button</button>
							<input className="me-1 btn btn-primary" type="button" value="Input"/>
							<input className="me-1 btn btn-primary" type="submit" value="Submit"/>
							<input className="me-1 btn btn-primary" type="reset" value="Reset"/>
						</div>
						<div className="col-12">
							<h5>Outline buttons</h5>
							<p>In need of a button, but not the hefty background colors they bring? Replace the default modifier classes with the <code>.btn-outline-*</code> ones to remove all background images and colors on any button.</p>
							<button type="button" className="me-1 btn btn-outline-primary">Primary</button>
							<button type="button" className="me-1 btn btn-outline-secondary">Secondary</button>
							<button type="button" className="me-1 btn btn-outline-success">Success</button>
							<button type="button" className="me-1 btn btn-outline-danger">Danger</button>
							<button type="button" className="me-1 btn btn-outline-warning">Warning</button>
							<button type="button" className="me-1 btn btn-outline-info">Info</button>
							<button type="button" className="me-1 btn btn-outline-light">Light</button>
							<button type="button" className="me-1 btn btn-outline-dark">Dark</button>
						</div>
						<div className="col-12">
							<h5>Sizes</h5>
							<p>Fancy larger or smaller buttons? Add <code>.btn-lg</code> or <code>.btn-sm</code> for additional sizes.</p>
							<button type="button" className="btn btn-primary btn-lg me-1">Large button</button>
							<button type="button" className="btn btn-secondary btn-lg me-1">Large button</button>
							<button type="button" className="btn btn-primary btn-sm me-1">Small button</button>
							<button type="button" className="btn btn-secondary btn-sm me-1">Small button</button>
						</div>
						<div className="col-12">
							<h5>Disabled state</h5>
							<p>Make buttons look inactive by adding the <code>disabled</code> boolean attribute to any <code>&lt;button&gt;</code> element. Disabled buttons have <code>pointer-events: none</code> applied to, preventing hover and active states from triggering.</p>
							<button type="button" className="btn btn-lg btn-primary me-1" disabled>Primary button</button>
							<button type="button" className="btn btn-secondary btn-lg me-1" disabled>Button</button>
							<a className="btn btn-primary btn-lg disabled me-1" role="button" aria-disabled="true">Primary link</a>
							<a className="btn btn-secondary btn-lg disabled me-1" role="button" aria-disabled="true">Link</a>
						</div>
						<div className="col-12">
							<h5>Block buttons</h5>
							<div className="d-grid gap-2">
								<button className="btn btn-primary" type="button">Button</button>
								<button className="btn btn-primary" type="button">Button</button>
							</div>
						</div>
						<div className="col-12">
							<h5>Button group</h5>
							<div className="card">
								<div className="card-body">
									<div className="btn-group" role="group" aria-label="Basic example">
										<button type="button" className="btn btn-primary">Left</button>
										<button type="button" className="btn btn-primary">Middle</button>
										<button type="button" className="btn btn-primary">Right</button>
									</div>
								</div>
								<div className="card-body">
									<p className="lead">Mixed styles</p>
									<div className="btn-group" role="group" aria-label="Basic mixed styles example">
										<button type="button" className="btn btn-danger">Left</button>
										<button type="button" className="btn btn-warning">Middle</button>
										<button type="button" className="btn btn-success">Right</button>
									</div>
								</div>
								<div className="card-body">
									<p className="lead">Outlined styles</p>
									<div className="btn-group" role="group" aria-label="Basic outlined example">
										<button type="button" className="btn btn-outline-primary">Left</button>
										<button type="button" className="btn btn-outline-primary">Middle</button>
										<button type="button" className="btn btn-outline-primary">Right</button>
									</div>	
								</div>
								<div className="card-body">
									<p className="lead">Checkbox and radio button groups</p>
									<p>Combine button-like checkbox and radio <a href="/docs/5.1/forms/checks-radios/">toggle buttons</a> into a seamless looking button group.</p>
									<div className="btn-group" role="group" aria-label="Basic radio toggle button group">
										<input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked/>
										<label className="btn btn-outline-primary" htmlFor="btnradio1">Radio 1</label>
									
										<input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" defaultChecked/>
										<label className="btn btn-outline-primary" htmlFor="btnradio2">Radio 2</label>
									
										<input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" defaultChecked/>
										<label className="btn btn-outline-primary" htmlFor="btnradio3">Radio 3</label>
									</div>
								</div>
								<div className="card-body">
									<p className="lead">Button toolbar</p>
									<p>Combine sets of button groups into button toolbars for more complex components. Use utility classes as needed to space out groups, buttons, and more.</p>
									<div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
										<div className="btn-group me-2" role="group" aria-label="First group">
										<button type="button" className="btn btn-primary">1</button>
										<button type="button" className="btn btn-primary">2</button>
										<button type="button" className="btn btn-primary">3</button>
										<button type="button" className="btn btn-primary">4</button>
										</div>
										<div className="btn-group me-2" role="group" aria-label="Second group">
										<button type="button" className="btn btn-secondary">5</button>
										<button type="button" className="btn btn-secondary">6</button>
										<button type="button" className="btn btn-secondary">7</button>
										</div>
										<div className="btn-group" role="group" aria-label="Third group">
										<button type="button" className="btn btn-info">8</button>
										</div>
									</div>
								</div>
								<div className="card-body">
									<p className="lead">Sizing</p>
									<p>Instead of applying button sizing classes to every button in a group, just add <code>.btn-group-*</code> to each <code>.btn-group</code>, including each one when nesting multiple groups.</p>
									<div className="bd-example">
										<div className="btn-group btn-group-lg me-1" role="group" aria-label="Large button group">
											<button type="button" className="btn btn-outline-dark">Left</button>
											<button type="button" className="btn btn-outline-dark">Middle</button>
											<button type="button" className="btn btn-outline-dark">Right</button>
										</div>
										<div className="btn-group me-1" role="group" aria-label="Default button group">
											<button type="button" className="btn btn-outline-dark">Left</button>
											<button type="button" className="btn btn-outline-dark">Middle</button>
											<button type="button" className="btn btn-outline-dark">Right</button>
										</div>
										<div className="btn-group btn-group-sm me-1" role="group" aria-label="Small button group">
											<button type="button" className="btn btn-outline-dark">Left</button>
											<button type="button" className="btn btn-outline-dark">Middle</button>
											<button type="button" className="btn btn-outline-dark">Right</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/breadcrumb">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Breadcrumb</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/cards">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Cards</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Buttons