import React, { useEffect } from 'react'
import CardAction from '../../Widgets/CardAction/CardAction';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import { Link } from 'react-router-dom';

const Flatpickrc = () => {
    useEffect(() => {
        // Initialize Flatpickr
        const basicPicker = flatpickr('.f-basic', {
          enableTime: true,
          dateFormat: 'Y-m-d H:i',
        });
    
        const hfdPicker = flatpickr('.f-hfd', {
          altInput: true,
          altFormat: 'F j, Y',
          dateFormat: 'Y-m-d',
        });
    
        const dateDisablePicker = flatpickr('.f-date-disable', {
          disable: ['2023-04-24', '2023-05-17', '2025-03-08', new Date(2025, 4, 9)],
          dateFormat: 'Y-m-d',
        });
    
        return () => {
          // Destroy Flatpickr instances when the component unmounts
          basicPicker.destroy();
          hfdPicker.destroy();
          dateDisablePicker.destroy();
        };
      }, []); // Empty dependency array to run this effect only once
     
    const flatpickrCode = `
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.min.css';

    const basicPicker = flatpickr('.f-basic', {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
    });

    return (
    	<input type="text" className="form-control f-basic flatpickr-input" placeholder="Select Date.." readOnly="readonly"/>
    )
  `;
    
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Flatpickr</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
                    <div className="row g-xl-4 g-3 mb-4">
                        <div className="col-12">
							<h6>How to use</h6>
							<p className="lead">flatpickr is a lightweight and powerful datetime picker.</p>
                            <div className="rounded-4 " data-lang="html">
                                <pre className='h6 language-html text-primary'><code>{flatpickrCode}</code></pre>
                            </div>
                        </div>
						<div className="col-12">
							<label className="form-label">flatpickr without any config</label>
							<input type="text" className="form-control f-basic flatpickr-input" placeholder="Select Date.." readOnly="readonly"/>
						</div>
						<div className="col-12">
							<h5>Human-friendly Dates</h5>
							<p>altInput hides your original input and creates a new one.</p>
							<p>Upon date selection, the original input will contain a Y-m-d... string, while the altInput will display the date in a more legible, customizable format.</p>
							<p className="mb-4">Enabling this option is highly recommended.</p>
							<label className="form-label">flatpickr without any config</label>
							<input type="text" className="form-control f-hfd flatpickr-input" placeholder="Select Date.." readOnly="readonly"/>
						</div>
						<div className="col-12">
							<h5>Disabling dates</h5>
							<p>If you’d like to make certain dates unavailable for selection, there are multiple methods of doing so.</p>
							<ul>
								<li>Disabling specific date</li>
								<li>Disabling a date range</li>
								<li>Disabling dates using a function</li>
							</ul>
							<p className="mb-5">All of those are possible with the disable option</p>
							<label className="form-label">flatpickr without any config</label>
							<input type="text" className="form-control f-date-disable flatpickr-input" placeholder="Select Date.." readOnly="readonly"/>
						</div>
                    </div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/datatables">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Datatables</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/inputmask">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Inputmask</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Flatpickrc