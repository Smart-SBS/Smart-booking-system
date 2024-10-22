import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction'

import CommonPieChart from '../../../../Common/CommonPieChart/CommonPieChart'
import CommonLineChart from '../../../../Common/CommonPieChart/CommonLineChart'
import CommonBarChart from '../../../../Common/CommonPieChart/CommonBarChart'
import { Link } from 'react-router-dom'

const PeityCharts = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Peity Charts</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
                    <div className="row g-xl-4 g-3">
                        <div className="col-12">
                            <h4>How it works</h4>
                            <p className="lead">Peity (sounds like deity) is a plugin that converts an element's content into a mini <code>svg</code> pie, donut, line or bar chart. <a href="http://benpickles.github.io/peity/">Peity Chart</a></p>
                        </div>
                        <div className="col-12">
                            <h5 className="card-title">Pie Charts</h5>
                            <div className="d-flex">
                                <span className='me-1'><CommonPieChart className='' data={1} total={5} /></span>
                                <span className='me-1'><CommonPieChart className='' data={226} total={360} /></span>
                                <span className='me-1'><CommonPieChart className='' data={0.52} total={1.561} /></span>
                                <span className='me-1'><CommonPieChart className='' data={1} total={4} /></span>
                                <span className='me-1'><CommonPieChart className='' data={226} total={134} /></span>
                                <span className='me-1'><CommonPieChart className='' data={0.52} total={1.041} /></span>
                                <span className='me-1'><CommonPieChart className='' data={1} total={2.5} /></span>
                            </div>
                            <div className="language-html m-0 rounded-4 mt-5" data-lang="html">
                                <pre className='h6 text-black'><code>**HTML**</code></pre>
                                <pre className='h6 text-primary'><code>&lt;span className=&quot;pie&quot;&gt;1/5&lt;/span&gt;</code></pre>
                            </div>
                            <div className="language-html m-0 rounded-4 mt-5" data-lang="html">
                                <pre className='h6 text-black'><code>**JavaScript**</code></pre>
                                <pre className='h6 text-primary'><code>&lt;CommonPieChart className='pie' data={1} total={5} /&gt;</code></pre>
                            </div>
                        </div>
                        <div className="col-12">
                            <h5 className="card-title fw-normal mb-0">Line Charts</h5>
                            <span className='me-1'><CommonLineChart className='line' data={[5, 3, 9, 6, 5, 9, 7, 3, 5, 2]} /></span>
                            <span className='me-1'><CommonLineChart className='line' data={[5,3,2,-1,-3,-2,2,3,5,2]} /></span>
                            <span className='me-1'><CommonLineChart className='line' data={[-1,-3,-6,-4,-5,-4,-7,-3,-5,-2]} /></span>
                            <div className="language-html m-0 rounded-4 mt-5" data-lang="html">
                                <pre className='h6 text-black'><code>**HTML**</code></pre>
                                <pre className='h6 text-primary'><code>&lt;span className=&quot;line&quot;&gt;5,3,9,6,5,9,7,3,5,2&lt;/span&gt;</code></pre>
                            </div>
                            <div className="language-html m-0 rounded-4 mt-5" data-lang="html">
                                <pre className='h6 text-black'><code>**JavaScript**</code></pre>
                                <pre className='h6 text-primary'><code>{`<CommonLineChart className='line' data={[5, 3, 9, 6, 5, 9, 7, 3, 5, 2]} />`}</code></pre>
                            </div>
                        </div>
                        <div className="col-12">
                            <h5 className="card-title fw-normal mb-0">Bar Charts</h5>
                            <span className='me-1'><CommonBarChart className='bar' data={[5, 3, 9, 6, 5, 9, 7, 3, 5, 2]} /></span>
                            <span className='me-1'><CommonBarChart className='bar' data={[5, 8, 9, 4]} /></span>
                            <span className='me-1'><CommonBarChart className='bar' data={[8, 9, 10, 5, 4, 3, 2, 1]} /></span>
                            <div className="language-html m-0 rounded-4 mt-5" data-lang="html">
                                <pre className='h6 text-black'><code>**HTML**</code></pre>
                                <pre className='h6 text-primary'><code>&lt;span className=&quot;bar&quot;&gt;5,3,9,6,5,9,7,3,5,2&lt;/span&gt;</code></pre>
                            </div>
                            <div className="language-html m-0 rounded-4 mt-5" data-lang="html">
                                <pre className='h6 text-black'><code>**JavaScript**</code></pre>
                                <pre className='h6 text-primary'><code>{`<CommonBarChart className='bar' data={[5, 3, 9, 6, 5, 9, 7, 3, 5, 2]} />`}</code></pre>
                            </div>
                        </div>
                    </div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/apex">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Apex chart</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/bootstrap5-tags">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Bootstrap5 tags</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default PeityCharts