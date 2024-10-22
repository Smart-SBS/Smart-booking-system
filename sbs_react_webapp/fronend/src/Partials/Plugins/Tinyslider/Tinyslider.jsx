import React, { useEffect } from 'react'
import CardAction from '../../Widgets/CardAction/CardAction';

import {tns} from 'tiny-slider';
import 'tiny-slider/src/tiny-slider.scss'
import { Link } from 'react-router-dom';

const Tinyslider = () => {

    useEffect(() => {
        var slider = tns({
            container: '.my-slider',
            slideBy: "page",
            mouseDrag: true,
            swipeAngle: false,
            speed: 2000,
            nav: false,
            autoplay: true,
            controls: false,
            autoplayButtonOutput: false,
            responsive: {
                1024: {
                    items: 3,
                }
            },
        });
    
        return () => {
            slider.destroy();
          };
    }, [])

    const tinyCode = `
    import {tns} from 'tiny-slider';
    import 'tiny-slider/src/tiny-slider.scss'

    useEffect(() => {
        var slider = tns({
            container: '.my-slider',
            slideBy: "page",
            mouseDrag: true,
            swipeAngle: false,
            speed: 2000,
            nav: false,
            autoplay: true,
            controls: false,
            autoplayButtonOutput: false,
            responsive: {
                1024: {
                    items: 3,
                }
            },
        });
    
        return () => {
            slider.destroy();
          };
      }, []);

    return (
        <div className="my-slider mb-4">
            <div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color1)"}}><h4>1</h4></div>
            <div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color2)"}}><h4>2</h4></div>
            <div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color3)"}}><h4>3</h4></div>
        </div>
    )
  `;
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Tiny slider</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
                    <div className="row g-xl-4 g-3 mb-4">
                        <div className="col-12">
							<p className="lead">Here's an example of Tiny Slider with custom navigation buttons and a variety of additional options. For more info, please visit the <a href="http://ganlanyuan.github.io/tiny-slider/demo/" target="_blank">official website</a>.</p>
							<div className="my-slider mb-4">
								<div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color1)"}}><h4>1</h4></div>
								<div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color2)"}}><h4>2</h4></div>
								<div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color3)"}}><h4>3</h4></div>
								<div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color4)"}}><h4>4</h4></div>
								<div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color5)"}}><h4>6</h4></div>
								<div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color1)"}}><h4>7</h4></div>
								<div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color2)"}}><h4>8</h4></div>
								<div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color3)"}}><h4>9</h4></div>
								<div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color4)"}}><h4>10</h4></div>
								<div className="item p-3 text-light rounded-4" style={{height: "100px", backgroundColor: "var(--theme-color5)"}}><h4>11</h4></div>
							</div>
                            <div className="rounded-4 " data-lang="html">
                                <pre className='h6 language-html text-primary'><code>{tinyCode}</code></pre>
                            </div>
                        </div>
                    </div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/tagify">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Tagify</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/toast-calendar">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Toast calendar</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Tinyslider