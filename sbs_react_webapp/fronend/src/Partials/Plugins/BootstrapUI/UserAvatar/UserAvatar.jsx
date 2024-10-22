import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction';

import avatar1 from '../../../../assets/images/xs/avatar1.jpg';
import avatar2 from '../../../../assets/images/xs/avatar2.jpg';
import avatar3 from '../../../../assets/images/xs/avatar3.jpg';
import avatar4 from '../../../../assets/images/xs/avatar4.jpg';
import { Link } from 'react-router-dom';

const UserAvatar = () => {
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Avatar</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
							<h4>How it works</h4>
							<p className="lead">Toggle contextual overlays for displaying lists of links and more with the Bootstrap dropdown plugin.</p>
							<img className="avatar rounded me-3 xs" src={avatar1} alt="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar xs"/>
							<img className="avatar rounded me-3 sm" src={avatar1} alt="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar sm"/>
							<img className="avatar rounded me-3" src={avatar1} alt="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"/>
							<img className="avatar rounded me-3 lg" src={avatar1} alt="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar lg"/>
							<img className="avatar rounded me-3 xl" src={avatar1} alt="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar xl"/>
							<div className="d-flex align-items-center mt-3">
								<span className="me-3 avatar rounded xs no-thumbnail small">xs</span>
								<span className="me-3 avatar rounded sm no-thumbnail">sm</span>
								<span className="me-3 avatar rounded no-thumbnail">ME</span>
								<span className="me-3 avatar rounded lg no-thumbnail fs-3">lg</span>
								<span className="me-3 avatar rounded xl no-thumbnail fs-1">xl</span>
							</div>
						</div>
						<div className="col-12">
							<h6>Avatar Rounded Circle</h6>
							<img className="avatar rounded-circle me-4 xs" src={avatar1} alt="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar xs"/>
							<img className="avatar rounded-circle me-4 sm" src={avatar1} alt="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar sm"/>
							<img className="avatar rounded-circle me-4" src={avatar1} alt="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar"/>
							<img className="avatar rounded-circle me-4 lg" src={avatar1} alt="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar lg"/>
							<img className="avatar rounded-circle me-4 xl" src={avatar1} alt="avatar" data-bs-toggle="tooltip" data-bs-placement="top" title="Avatar xl"/>
							<div className="d-flex align-items-center mt-3">
								<span className="me-4 avatar rounded-circle xs no-thumbnail small">ME</span>
								<span className="me-4 avatar rounded-circle sm no-thumbnail">ME</span>
								<span className="me-4 avatar rounded-circle no-thumbnail">ME</span>
								<span className="me-4 avatar rounded-circle lg no-thumbnail fs-3">ME</span>
								<span className="me-4 avatar rounded-circle xl no-thumbnail fs-1">ME</span>
							</div>
						</div>
						<div className="col-12">
							<h6>Avatar team groups list</h6>
							<div className="d-flex align-items-center mb-3">
								<label className="me-3">Team:</label>
								<a href="#"><img className="avatar xs rounded-circle lift me-1" src={avatar1} alt="avatar" data-bs-toggle="tooltip" title="Avatar xs"/></a>
								<a href="#"><img className="avatar xs rounded-circle lift me-1" src={avatar2} alt="avatar" data-bs-toggle="tooltip" title="Avatar xs"/></a>
								<a href="#"><img className="avatar xs rounded-circle lift me-1" src={avatar3} alt="avatar" data-bs-toggle="tooltip" title="Avatar xs"/></a>
								<a href="#"><img className="avatar xs rounded-circle lift me-1" src={avatar4} alt="avatar" data-bs-toggle="tooltip" title="Avatar xs"/></a>
							</div>
							<div className="d-flex align-items-center mb-3">
								<label className="me-3">Team:</label>
								<a href="#"><img className="avatar sm rounded-circle lift me-1" src={avatar1} alt="avatar" data-bs-toggle="tooltip" title="Avatar sm"/></a>
								<a href="#"><img className="avatar sm rounded-circle lift me-1" src={avatar2} alt="avatar" data-bs-toggle="tooltip" title="Avatar sm"/></a>
								<a href="#"><img className="avatar sm rounded-circle lift me-1" src={avatar3} alt="avatar" data-bs-toggle="tooltip" title="Avatar sm"/></a>
								<a href="#"><img className="avatar sm rounded-circle lift me-1" src={avatar4} alt="avatar" data-bs-toggle="tooltip" title="Avatar sm"/></a>
							</div>
							<div className="d-flex align-items-center mb-3">
								<label className="me-3">Team:</label>
								<a href="#"><img className="avatar rounded-circle lift me-1" src={avatar1} alt="avatar" data-bs-toggle="tooltip" title="Avatar"/></a>
								<a href="#"><img className="avatar rounded-circle lift me-1" src={avatar2} alt="avatar" data-bs-toggle="tooltip" title="Avatar"/></a>
								<a href="#"><img className="avatar rounded-circle lift me-1" src={avatar3} alt="avatar" data-bs-toggle="tooltip" title="Avatar"/></a>
								<a href="#"><img className="avatar rounded-circle lift me-1" src={avatar4} alt="avatar" data-bs-toggle="tooltip" title="Avatar"/></a>
							</div>
							<div className="d-flex align-items-center">
								<label className="me-3">Team:</label>
								<a href="#"><img className="avatar lg rounded-circle lift me-1" src={avatar1} alt="avatar" data-bs-toggle="tooltip" title="Avatar lg"/></a>
								<a href="#"><img className="avatar lg rounded-circle lift me-1" src={avatar2} alt="avatar" data-bs-toggle="tooltip" title="Avatar lg"/></a>
								<a href="#"><img className="avatar lg rounded-circle lift me-1" src={avatar3} alt="avatar" data-bs-toggle="tooltip" title="Avatar lg"/></a>
								<a href="#"><img className="avatar lg rounded-circle lift me-1" src={avatar4} alt="avatar" data-bs-toggle="tooltip" title="Avatar lg"/></a>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/alerts">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Alerts</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/badges">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Badges</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default UserAvatar