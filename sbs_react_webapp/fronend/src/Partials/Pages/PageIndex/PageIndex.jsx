import React from 'react'

const PageIndex = () => {
	return (
		<div className="px-4 py-3 page-body">
			<ul className="row g-2 list-unstyled li_animate row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-2 row-deck mb-lg-5 mb-4">
				<li className="col">
					<a className="card hr-arrow p-4" href="/pages/table" title="Tables" style={{ "--dynamic-color": "var(--theme-color1)" }}>
						<svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 22 22" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
							<path d="M4 12l16 0"></path>
							<path d="M12 4l0 16"></path>
						</svg>
						<h6 className="title mb-1">Tables</h6>
						<p className="small text-muted mb-0 d-none d-xl-inline-flex">Description text here...</p>
						<div className="go-corner">
							<div className="go-arrow">→</div>
						</div>
					</a>
				</li>
				<li className="col">
					<a className="card hr-arrow p-4" href="/pages/form" title="Forms" style={{ "--dynamic-color": "var(--theme-color2)" }}>
						<svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 22 22" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M12 3a3 3 0 0 0 -3 3v12a3 3 0 0 0 3 3"></path>
							<path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3"></path>
							<path d="M13 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-7"></path>
							<path d="M5 7h-1a1 1 0 0 0 -1 1v8a1 1 0 0 0 1 1h1"></path>
							<path d="M17 12h.01"></path>
							<path d="M13 12h.01"></path>
						</svg>
						<h6 className="title mb-1">Forms</h6>
						<p className="small text-muted mb-0 d-none d-xl-inline-flex">Description text here...</p>
						<div className="go-corner">
							<div className="go-arrow">→</div>
						</div>
					</a>
				</li>
				<li className="col">
					<a className="card hr-arrow p-4" href="/pages/pricing" title="Pricing Table" style={{ "--dynamic-color": "var(--theme-color3)" }}>
						<svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 22 22" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2"></path>
							<path d="M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5"></path>
						</svg>
						<h6 className="title mb-1">Pricing Table</h6>
						<p className="small text-muted mb-0 d-none d-xl-inline-flex">Description text here...</p>
						<div className="go-corner">
							<div className="go-arrow">→</div>
						</div>
					</a>
				</li>
				<li className="col">
					<a className="card hr-arrow p-4" href="/pages/gallery" title="Image Gallery" style={{ "--dynamic-color": "var(--theme-color5)" }}>
						<svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 22 22" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M7.5 7c2.485 0 4.5 1.974 4.5 4.409v.591h-8.397a.61 .61 0 0 1 -.426 -.173a.585 .585 0 0 1 -.177 -.418c0 -2.435 2.015 -4.409 4.5 -4.409z"></path>
							<path d="M16.5 17c-2.485 0 -4.5 -1.974 -4.5 -4.409v-.591h8.397c.333 0 .603 .265 .603 .591c0 2.435 -2.015 4.409 -4.5 4.409z"></path>
							<path d="M7 16.5c0 -2.485 1.972 -4.5 4.405 -4.5h.595v8.392a.61 .61 0 0 1 -.173 .431a.584 .584 0 0 1 -.422 .177c-2.433 0 -4.405 -2.015 -4.405 -4.5z"></path>
							<path d="M17 7.5c0 2.485 -1.972 4.5 -4.405 4.5h-.595v-8.397a.61 .61 0 0 1 .175 -.428a.584 .584 0 0 1 .42 -.175c2.433 0 4.405 2.015 4.405 4.5z"></path>
						</svg>
						<h6 className="title mb-1">Image Gallery</h6>
						<p className="small text-muted mb-0 d-none d-xl-inline-flex">Description text here...</p>
						<div className="go-corner">
							<div className="go-arrow">→</div>
						</div>
					</a>
				</li>
				<li className="col">
					<a className="card hr-arrow p-4" href="/app/filemanager" title="Search Page" style={{ "--dynamic-color": "var(--theme-color6)" }}>
						<svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 22 22" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
							<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
							<path d="M21 21l-6 -6"></path>
						</svg>
						<h6 className="title mb-1">Search Page</h6>
						<p className="small text-muted mb-0 d-none d-xl-inline-flex">Description text here...</p>
						<div className="go-corner">
							<div className="go-arrow">→</div>
						</div>
					</a>
				</li>
			</ul>
		</div>
	)
}

export default PageIndex