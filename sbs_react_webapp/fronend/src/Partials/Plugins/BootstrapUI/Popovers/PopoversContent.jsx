import React from 'react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import CardAction from '../../../Widgets/CardAction/CardAction';
import { Link } from 'react-router-dom';

const popToggle = (
	<Popover id="popover-positioned-top">
		<Popover.Header><b>Popover title</b></Popover.Header>
	  	<Popover.Body>And here's some amazing content. It's very engaging. Right?</Popover.Body>
	</Popover>
  );

const popDismis = (
	<Popover id="popover-positioned-top">
		<Popover.Header><b>Dismissible popover</b></Popover.Header>
		<Popover.Body>And here's some amazing content. It's very engaging. Right?</Popover.Body>
	</Popover>
);

const popTop = (
	<Popover id="popover-positioned-top">
	  <Popover.Body>Top Popover</Popover.Body>
	</Popover>
  );
  
const popRight = (
	<Popover id="popover-positioned-right">
	  <Popover.Body>Right Popover</Popover.Body>
</Popover>
);

const popBottom = (
  <Popover id="popover-positioned-bottom">
    <Popover.Body>Bottom Popover</Popover.Body>
  </Popover>
);

const popLeft = (
  <Popover id="popover-positioned-left">
    <Popover.Body>Left Popover</Popover.Body>
  </Popover>
);

const PopoversContent = () => {
      
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Popovers</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Things to know when using the popover plugin:</p>
							<ul className="lh-lg">
								<li>Popovers rely on the 3rd party library <a href="https://popper.js.org/">Popper</a> for positioning. You must include <a href="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js">popper.min.js</a> before bootstrap.js or use <code>bootstrap.bundle.min.js</code> / <code>bootstrap.bundle.js</code> which contains Popper in order for popovers to work!</li>
								<li>Popovers require the <a href="https://getbootstrap.com/docs/5.1/components/tooltips/">tooltip plugin</a> as a dependency.</li>
								<li>Popovers are opt-in for performance reasons, so <strong>you must initialize them yourself</strong>.</li>
								<li>Zero-length <code>title</code> and <code>content</code> values will never show a popover.</li>
								<li>Specify <code>container: 'body'</code> to avoid rendering problems in more complex components (like our input groups, button groups, etc).</li>
								<li>Triggering popovers on hidden elements will not work.</li>
								<li>Popovers for <code>.disabled</code> or <code>disabled</code> elements must be triggered on a wrapper element.</li>
								<li>When triggered from anchors that wrap across multiple lines, popovers will be centered between the anchors' overall width. Use <code>.text-nowrap</code> on your <code>&lt;a&gt;</code>s to avoid this behavior.</li>
								<li>Popovers must be hidden before their corresponding elements have been removed from the DOM.</li>
								<li>Popovers can be triggered thanks to an element inside a shadow DOM.</li>
							</ul>
							<h6>Basic Example</h6>
                            <OverlayTrigger trigger="click" placement="right" overlay={popToggle}>
								<Button variant="danger" className="me-1 btn-lg">Click to toggle popover</Button>
							</OverlayTrigger>
						</div>
						<div className="col-12">
							<h5>Four directions</h5>
							<p>Four options are available: top, right, bottom, and left aligned. Directions are mirrored when using Bootstrap in RTL.</p>
                            <OverlayTrigger trigger="click" placement="top" overlay={popTop}>
                                <Button variant="secondary" className="me-1">Popover on top</Button>
                            </OverlayTrigger>
                            <OverlayTrigger trigger="click" placement="right" overlay={popRight}>
                                <Button variant="secondary" className="me-1">Popover on right</Button>
                            </OverlayTrigger>
                            <OverlayTrigger trigger="click" placement="bottom" overlay={popBottom}>
                                <Button variant="secondary" className="me-1">Popover on bottom</Button>
                            </OverlayTrigger>
                            <OverlayTrigger trigger="click" placement="left" overlay={popLeft}>
                                <Button variant="secondary">Popover on left</Button>
                            </OverlayTrigger>
						</div>
						<div className="col-12">
							<h5>Dismiss on next click</h5>
							<p>Use the <code>focus</code> trigger to dismiss popovers on the user’s next click of a different element than the toggle element.</p>
							<OverlayTrigger trigger="focus" placement="right" overlay={popDismis}>
								<Button variant="danger" className="me-1 btn-lg">Click to toggle popover</Button>
							</OverlayTrigger>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/placeholders">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Placeholders</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/progress">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Progress</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default PopoversContent