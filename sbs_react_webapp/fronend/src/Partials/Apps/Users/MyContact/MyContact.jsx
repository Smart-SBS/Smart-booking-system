import React from 'react'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import ContactDetail from './Components/ContactDetail'
import CardEllipsis from '../../../Widgets/CardEllipsis/CardEllipsis';

import avatar1 from '../../../../assets/images/xs/avatar1.jpg';
import avatar2 from '../../../../assets/images/xs/avatar2.jpg';
import avatar3 from '../../../../assets/images/xs/avatar3.jpg';
import avatar4 from '../../../../assets/images/xs/avatar4.jpg';
import avatar5 from '../../../../assets/images/xs/avatar5.jpg';
import avatar6 from '../../../../assets/images/xs/avatar6.jpg';
import avatar7 from '../../../../assets/images/xs/avatar7.jpg';
import avatar9 from '../../../../assets/images/xs/avatar9.jpg';
import avatar10 from '../../../../assets/images/xs/avatar10.jpg';

const MyContact = () => {
	const tooltip = (
		<Tooltip id="tooltip" >Mutual Friend</Tooltip>
	);
	return (
		<div className="px-4 py-3 page-body">
			<ul className="contacts list-unstyled">
				<li className="d-flex justify-content-between bg-transparent pb-1 border-0">
					<div className="form-check">
						<input className="form-check-input" type="checkbox" value="" id="ca" />
						<label className="form-check-label" htmlFor="ca"><strong className="ms-4">A</strong> -<small>2 Contacts</small></label>
					</div>
					<CardEllipsis />
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="a1" />
						<label className="form-check-label" htmlFor="a1"></label>
					</div>
					<Link className="flex-grow-1" to="#" data-bs-target='#c_details' data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar1} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Alice Harding</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</Link>
					<div className="d-none d-sm-flex">
						<OverlayTrigger overlay={tooltip}><img className="avatar sm rounded-circle" src={avatar3} alt="avatar" /></OverlayTrigger>
						<OverlayTrigger overlay={tooltip}><img className="avatar sm rounded-circle" src={avatar1} alt="avatar" /></OverlayTrigger>
						<OverlayTrigger overlay={tooltip}><img className="avatar sm rounded-circle" src={avatar7} alt="avatar" /></OverlayTrigger>
						<OverlayTrigger overlay={tooltip}><img className="avatar sm rounded-circle" src={avatar9} alt="avatar" /></OverlayTrigger>
					</div>
				</li>
				<li className="d-flex justify-content-between bg-transparent pb-1 border-0">
					<div className="form-check">
						<input className="form-check-input" type="checkbox" value="" id="cb" />
						<label className="form-check-label" htmlFor="cb"><strong className="ms-4">B</strong> -<small>5 Contacts</small></label>
					</div>
					<CardEllipsis />
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="b1" />
						<label className="form-check-label" htmlFor="b1"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar3} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Barber Jonyson</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="b2" />
						<label className="form-check-label" htmlFor="b2"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar4} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Bernard Langley</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="b3" />
						<label className="form-check-label" htmlFor="b3"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar5} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Best Blackburn</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
					<div className="d-none d-sm-flex">
						<a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Mutual Friend"><img className="avatar sm rounded-circle" src={avatar1} alt="avatar" /></a>
						<a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Mutual Friend"><img className="avatar sm rounded-circle" src={avatar2} alt="avatar" /></a>
					</div>
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="b4" />
						<label className="form-check-label" htmlFor="b4"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar6} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Bolton Obrien</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
				</li>
				<li className="d-flex justify-content-between bg-transparent pb-1 border-0">
					<div className="form-check">
						<input className="form-check-input" type="checkbox" value="" id="cc" />
						<label className="form-check-label" htmlFor="cc"><strong className="ms-4">C</strong> -<small>2 Contacts</small></label>
					</div>
					<CardEllipsis />
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="c1" />
						<label className="form-check-label" htmlFor="c1"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar3} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Candice Munoz</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
					<div className="d-none d-sm-flex">
						<a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Mutual Friend"><img className="avatar sm rounded-circle" src={avatar6} alt="avatar" /></a>
						<a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Mutual Friend"><img className="avatar sm rounded-circle" src={avatar2} alt="avatar" /></a>
						<a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Mutual Friend"><img className="avatar sm rounded-circle" src={avatar7} alt="avatar" /></a>
					</div>
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="c2" />
						<label className="form-check-label" htmlFor="c2"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar4} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Cathryn Snider</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
					<div className="d-none d-sm-flex">
						<a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Mutual Friend"><img className="avatar sm rounded-circle" src={avatar3} alt="avatar" /></a>
						<a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Mutual Friend"><img className="avatar sm rounded-circle" src={avatar9} alt="avatar" /></a>
					</div>
				</li>
				<li className="d-flex justify-content-between bg-transparent pb-1 border-0">
					<div className="form-check">
						<input className="form-check-input" type="checkbox" value="" id="cj" />
						<label className="form-check-label" htmlFor="cj"><strong className="ms-4">J</strong> -<small>5 Contacts</small></label>
					</div>
					<CardEllipsis />
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="j1" />
						<label className="form-check-label" htmlFor="j1"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar3} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Jacklyn Morgan</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
					<div className="d-none d-sm-flex">
						<a href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Mutual Friend"><img className="avatar sm rounded-circle" src={avatar10} alt="avatar" /></a>
					</div>
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="j2" />
						<label className="form-check-label" htmlFor="j2"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar4} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Jeannette Stanton</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="j3" />
						<label className="form-check-label" htmlFor="j3"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar5} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Jonynie Cleveland</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="j4" />
						<label className="form-check-label" htmlFor="j4"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar6} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Jonyston Riddle</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
				</li>
				<li className="d-flex justify-content-between bg-transparent pb-1 border-0">
					<div className="form-check">
						<input className="form-check-input" type="checkbox" value="" id="cm" />
						<label className="form-check-label" htmlFor="cm"><strong className="ms-4">M</strong> -<small>2 Contacts</small></label>
					</div>
					<CardEllipsis />
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="m1" />
						<label className="form-check-label" htmlFor="m1"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar3} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Madeleine Fletcher</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
				</li>
				<li className="bg-card">
					<div className="form-check fs-5">
						<input className="form-check-input" type="checkbox" value="" id="m2" />
						<label className="form-check-label" htmlFor="m2"></label>
					</div>
					<a className="flex-grow-1" href="#c_details" data-bs-toggle="offcanvas" role="button">
						<img className="rounded-circle avatar border" src={avatar4} alt="avatar" />
						<div className="ms-3">
							<h6 className="mb-0">Maldonado Rodriquez</h6>
							<span className="text-muted small">+91 1212 258 369</span>
						</div>
					</a>
				</li>
			</ul>

			{/* <!-- start offcanvas: Contact detail --> */}
			<ContactDetail />
		</div>
	)
}

export default MyContact
