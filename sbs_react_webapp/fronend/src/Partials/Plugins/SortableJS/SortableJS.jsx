import React, { useEffect } from 'react'
import Sortable from 'sortablejs';

import CardAction from '../../Widgets/CardAction/CardAction';
import { Link } from 'react-router-dom';

const SortableJS = () => {

    useEffect(() => {
        // Simple list
        const el = document.getElementById('items');
        const sortable = new Sortable(el);
        // List with handle
        const listWithHandle = document.getElementById('listWithHandle');
        new Sortable(listWithHandle, {
        handle: '.fa-arrows',
        animation: 150
        });
    
        // Shared lists
        const list = document.getElementById('list');
        new Sortable(list, {
        group: 'shared',
        animation: 100
        });
    
        const list2 = document.getElementById('list2');
        new Sortable(list2, {
        group: 'shared',
        animation: 100,
        emptyInsertThreshold: 5 // this is the default
        });
   }, []);

   const sortableCode = `
    import Sortable from 'sortablejs';

    useEffect(() => {
        const el = document.getElementById('items');
        const sortable = new Sortable(el);
        })
    }, []);

    return (
        <ul className="list-unstyled" id="items">
            <li className="card mb-1 theme-color1 text-white"><div className="card-body">item 1</div></li>
            <li className="card mb-1 theme-color2 text-white"><div className="card-body">item 2</div></li>
            <li className="card mb-1 theme-color3 text-white"><div className="card-body">item 3</div></li>
            <li className="card mb-1 theme-color4 text-white"><div className="card-body">item 4</div></li>
            <li className="card mb-1 theme-color5 text-white"><div className="card-body">item 5</div></li>
            <li className="card mb-1 theme-color6 text-white"><div className="card-body">item 6</div></li>
        </ul>
    )
  `;

  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Sortable js</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
                    <div className="row g-xl-4 g-3 mb-4">
                        <div className="col-12">
							<h6>How to use</h6>
							<p className="lead">Sortable is a JavaScript library for reorderable drag-and-drop lists.</p>
                            <div className="rounded-4 " data-lang="html">
                                <pre className='h6 language-html text-primary'><code>{sortableCode}</code></pre>
                            </div>
                        </div>
						<div className="col-12">
							<h5>Simple list</h5>
							<ul className="list-unstyled" id="items">
								<li className="card mb-1 theme-color1 text-white"><div className="card-body">item 1</div></li>
								<li className="card mb-1 theme-color2 text-white"><div className="card-body">item 2</div></li>
								<li className="card mb-1 theme-color3 text-white"><div className="card-body">item 3</div></li>
								<li className="card mb-1 theme-color4 text-white"><div className="card-body">item 4</div></li>
								<li className="card mb-1 theme-color5 text-white"><div className="card-body">item 5</div></li>
								<li className="card mb-1 theme-color6 text-white"><div className="card-body">item 6</div></li>
							</ul>
						</div>
						<div className="col-12">
							<h5>Handle</h5>
							<ul className="list-group" id="listWithHandle">
								<li className="list-group-item d-flex justify-content-between align-items-center">
									<span>
										<span className="fa fa-arrows me-2" aria-hidden="true"></span>
										A list item
									</span>
									<span className="badge bg-primary rounded-pill">14</span>
								</li>
								<li className="list-group-item d-flex justify-content-between align-items-center">
									<span>
										<span className="fa fa-arrows me-2" aria-hidden="true"></span>
										A second list item
									</span>
									<span className="badge bg-primary rounded-pill">2</span>
								</li>
								<li className="list-group-item d-flex justify-content-between align-items-center">
									<span>
										<span className="fa fa-arrows me-2" aria-hidden="true"></span>
										A third list item
									</span>
									<span className="badge bg-primary rounded-pill">1</span>
								</li>
							</ul>
						</div>
						<div className="col-12">
							<h5>Shared lists</h5>
							<div className="row g-3">
								<div className="col-md-6">
									<h6>List 1</h6>
									<ul id="list" className="list-group">
										<li className="list-group-item theme-color1 text-white">Item 1</li>
										<li className="list-group-item theme-color2 text-white">Item 2</li>
										<li className="list-group-item theme-color3 text-white">Item 3</li>
										<li className="list-group-item theme-color4 text-white">Item 4</li>
									</ul>
								</div>
								<div className="col-md-6">
									<h6>List 2</h6>
									<ul id="list2" className="list-group">
										<li className="list-group-item theme-color5 text-white">Item 5</li>
									</ul>
								</div>
							</div>
						</div>
                    </div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/jsvectormap">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Jsvectormap</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/sweetalert2">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Sweetalert2</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default SortableJS