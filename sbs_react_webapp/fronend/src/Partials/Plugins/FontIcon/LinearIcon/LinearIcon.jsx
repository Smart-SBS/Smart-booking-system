import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction';

import '../LinearIcon/linearIconStyle.css';
import { Link } from 'react-router-dom';

const LinearIcon = () => {

	const linearCode = `
    <i className="icon-user"></i>
	<i className="icon-user-female"></i>
	<i className="icon-user-follow"></i>
	<i className="icon-user-following"></i>
  `;

  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Linear icon</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">
						<div className="rounded-4" data-lang="html">
							<pre className='h6 language-html text-primary'><code>{linearCode}</code></pre>
						</div>
							<div className="row g-3 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-2 icons-list m-0">
								<div className="col"><i className="icon-user"></i> icon-user </div>
								<div className="col"><i className="icon-user-female"></i> icon-user-female </div>
								<div className="col"><i className="icon-user-follow"></i> icon-user-follow </div>
								<div className="col"><i className="icon-user-following"></i> icon-user-following </div>
								<div className="col"><i className="icon-user-unfollow"></i> icon-user-unfollow </div>
								<div className="col"><i className="icon-trophy"></i> icon-trophy </div>
								<div className="col"><i className="icon-speedometer"></i> icon-speedometer </div>
								<div className="col"><i className="icon-social-youtube"></i> icon-social-youtube </div>
								<div className="col"><i className="icon-social-twitter"></i> icon-social-twitter </div>
								<div className="col"><i className="icon-social-tumblr"></i> icon-social-tumblr </div>
								<div className="col"><i className="icon-social-facebook"></i> icon-social-facebook </div>
								<div className="col"><i className="icon-social-dropbox"></i> icon-social-dropbox </div>
								<div className="col"><i className="icon-social-dribbble"></i> icon-social-dribbble </div>
								<div className="col"><i className="icon-shield"></i> icon-shield </div>
								<div className="col"><i className="icon-screen-tablet"></i> icon-screen-tablet </div>
								<div className="col"><i className="icon-screen-smartphone"></i> icon-screen-smartphone </div>
								<div className="col"><i className="icon-screen-desktop"></i> icon-screen-desktop </div>
								<div className="col"><i className="icon-plane"></i> icon-plane </div>
								<div className="col"><i className="icon-notebook"></i> icon-notebook </div>
								<div className="col"><i className="icon-mouse"></i> icon-mouse </div>
								<div className="col"><i className="icon-magnet"></i> icon-magnet </div>
								<div className="col"><i className="icon-magic-wand"></i> icon-magic-wand </div>
								<div className="col"><i className="icon-hourglass"></i> icon-hourglass </div>
								<div className="col"><i className="icon-graduation"></i> icon-graduation </div>
								<div className="col"><i className="icon-ghost"></i> icon-ghost </div>
								<div className="col"><i className="icon-game-controller"></i> icon-game-controller </div>
								<div className="col"><i className="icon-fire"></i> icon-fire </div>
								<div className="col"><i className="icon-envelope-open"></i> icon-envelope-open </div>
								<div className="col"><i className="icon-envelope-letter"></i> icon-envelope-letter </div>
								<div className="col"><i className="icon-energy"></i> icon-energy </div>
								<div className="col"><i className="icon-disc"></i> icon-disc </div>
								<div className="col"><i className="icon-cursor-move"></i> icon-cursor-move </div>
								<div className="col"><i className="icon-crop"></i> icon-crop </div>
								<div className="col"><i className="icon-credit-card"></i> icon-credit-card </div>
								<div className="col"><i className="icon-chemistry"></i> icon-chemistry </div>
								<div className="col"><i className="icon-bell"></i> icon-bell </div>
								<div className="col"><i className="icon-badge"></i> icon-badge </div>
								<div className="col"><i className="icon-anchor"></i> icon-anchor </div>
								<div className="col"><i className="icon-action-redo"></i> icon-action-redo </div>
								<div className="col"><i className="icon-action-undo"></i> icon-action-undo </div>
								<div className="col"><i className="icon-bag"></i> icon-bag </div>
								<div className="col"><i className="icon-basket"></i> icon-basket </div>
								<div className="col"><i className="icon-basket-loaded"></i> icon-basket-loaded </div>
								<div className="col"><i className="icon-book-open"></i> icon-book-open </div>
								<div className="col"><i className="icon-briefcase"></i> icon-briefcase </div>
								<div className="col"><i className="icon-bubbles"></i> icon-bubbles </div>
								<div className="col"><i className="icon-calculator"></i> icon-calculator </div>
								<div className="col"><i className="icon-call-end"></i> icon-call-end </div>
								<div className="col"><i className="icon-call-in"></i> icon-call-in </div>
								<div className="col"><i className="icon-call-out"></i> icon-call-out </div>
								<div className="col"><i className="icon-compass"></i> icon-compass </div>
								<div className="col"><i className="icon-cup"></i> icon-cup </div>
								<div className="col"><i className="icon-diamond"></i> icon-diamond </div>
								<div className="col"><i className="icon-direction"></i> icon-direction </div>
								<div className="col"><i className="icon-directions"></i> icon-directions </div>
								<div className="col"><i className="icon-docs"></i> icon-docs </div>
								<div className="col"><i className="icon-drawer"></i> icon-drawer </div>
								<div className="col"><i className="icon-drop"></i> icon-drop </div>
								<div className="col"><i className="icon-earphones"></i> icon-earphones </div>
								<div className="col"><i className="icon-earphones-alt"></i> icon-earphones-alt </div>
								<div className="col"><i className="icon-feed"></i> icon-feed </div>
								<div className="col"><i className="icon-film"></i> icon-film </div>
								<div className="col"><i className="icon-folder-alt"></i> icon-folder-alt </div>
								<div className="col"><i className="icon-frame"></i> icon-frame </div>
								<div className="col"><i className="icon-globe"></i> icon-globe </div>
								<div className="col"><i className="icon-globe-alt"></i> icon-globe-alt </div>
								<div className="col"><i className="icon-handbag"></i> icon-handbag </div>
								<div className="col"><i className="icon-layers"></i> icon-layers </div>
								<div className="col"><i className="icon-map"></i> icon-map </div>
								<div className="col"><i className="icon-picture"></i> icon-picture </div>
								<div className="col"><i className="icon-pin"></i> icon-pin </div>
								<div className="col"><i className="icon-playlist"></i> icon-playlist </div>
								<div className="col"><i className="icon-present"></i> icon-present </div>
								<div className="col"><i className="icon-printer"></i> icon-printer </div>
								<div className="col"><i className="icon-puzzle"></i> icon-puzzle </div>
								<div className="col"><i className="icon-speech"></i> icon-speech </div>
								<div className="col"><i className="icon-vector"></i> icon-vector </div>
								<div className="col"><i className="icon-wallet"></i> icon-wallet </div>
								<div className="col"><i className="icon-arrow-down"></i> icon-arrow-down </div>
								<div className="col"><i className="icon-arrow-left"></i> icon-arrow-left </div>
								<div className="col"><i className="icon-arrow-right"></i> icon-arrow-right </div>
								<div className="col"><i className="icon-arrow-up"></i> icon-arrow-up </div>
								<div className="col"><i className="icon-bulb"></i> icon-bulb </div>
								<div className="col"><i className="icon-calendar"></i> icon-calendar </div>
								<div className="col"><i className="icon-control-end"></i> icon-control-end </div>
								<div className="col"><i className="icon-control-forward"></i> icon-control-forward </div>
								<div className="col"><i className="icon-control-pause"></i> icon-control-pause </div>
								<div className="col"><i className="icon-control-play"></i> icon-control-play </div>
								<div className="col"><i className="icon-control-rewind"></i> icon-control-rewind </div>
								<div className="col"><i className="icon-control-start"></i> icon-control-start </div>
								<div className="col"><i className="icon-cursor"></i> icon-cursor </div>
								<div className="col"><i className="icon-dislike"></i> icon-dislike </div>
								<div className="col"><i className="icon-equalizer"></i> icon-equalizer </div>
								<div className="col"><i className="icon-graph"></i> icon-graph </div>
								<div className="col"><i className="icon-grid"></i> icon-grid </div>
								<div className="col"><i className="icon-home"></i> icon-home </div>
								<div className="col"><i className="icon-like"></i> icon-like </div>
								<div className="col"><i className="icon-list"></i> icon-list </div>
								<div className="col"><i className="icon-login"></i> icon-login </div>
								<div className="col"><i className="icon-logout"></i> icon-logout </div>
								<div className="col"><i className="icon-loop"></i> icon-loop </div>
								<div className="col"><i className="icon-microphone"></i> icon-microphone </div>
								<div className="col"><i className="icon-music-tone"></i> icon-music-tone </div>
								<div className="col"><i className="icon-music-tone-alt"></i> icon-music-tone-alt </div>
								<div className="col"><i className="icon-note"></i> icon-note </div>
								<div className="col"><i className="icon-pencil"></i> icon-pencil </div>
								<div className="col"><i className="icon-pie-chart"></i> icon-pie-chart </div>
								<div className="col"><i className="icon-question"></i> icon-question </div>
								<div className="col"><i className="icon-rocket"></i> icon-rocket </div>
								<div className="col"><i className="icon-share"></i> icon-share </div>
								<div className="col"><i className="icon-share-alt"></i> icon-share-alt </div>
								<div className="col"><i className="icon-shuffle"></i> icon-shuffle </div>
								<div className="col"><i className="icon-size-actual"></i> icon-size-actual </div>
								<div className="col"><i className="icon-size-fullscreen"></i> icon-size-fullscreen </div>
								<div className="col"><i className="icon-support"></i> icon-support </div>
								<div className="col"><i className="icon-tag"></i> icon-tag </div>
								<div className="col"><i className="icon-trash"></i> icon-trash </div>
								<div className="col"><i className="icon-umbrella"></i> icon-umbrella </div>
								<div className="col"><i className="icon-wrench"></i> icon-wrench </div>
								<div className="col"><i className="icon-ban"></i> icon-ban </div>
								<div className="col"><i className="icon-bubble"></i> icon-bubble </div>
								<div className="col"><i className="icon-camera"></i> icon-camera </div>
								<div className="col"><i className="icon-check"></i> icon-check </div>
								<div className="col"><i className="icon-clock"></i> icon-clock </div>
								<div className="col"><i className="icon-close"></i> icon-close </div>
								<div className="col"><i className="icon-cloud-download"></i> icon-cloud-download </div>
								<div className="col"><i className="icon-cloud-upload"></i> icon-cloud-upload </div>
								<div className="col"><i className="icon-doc"></i> icon-doc </div>
								<div className="col"><i className="icon-envelope"></i> icon-envelope </div>
								<div className="col"><i className="icon-eye"></i> icon-eye </div>
								<div className="col"><i className="icon-flag"></i> icon-flag </div>
								<div className="col"><i className="icon-folder"></i> icon-folder </div>
								<div className="col"><i className="icon-heart"></i> icon-heart </div>
								<div className="col"><i className="icon-info"></i> icon-info </div>
								<div className="col"><i className="icon-key"></i> icon-key </div>
								<div className="col"><i className="icon-link"></i> icon-link </div>
								<div className="col"><i className="icon-lock"></i> icon-lock </div>
								<div className="col"><i className="icon-lock-open"></i> icon-lock-open </div>
								<div className="col"><i className="icon-magnifier"></i> icon-magnifier </div>
								<div className="col"><i className="icon-magnifier-add"></i> icon-magnifier-add </div>
								<div className="col"><i className="icon-magnifier-remove"></i> icon-magnifier-remove </div>
								<div className="col"><i className="icon-paper-clip"></i> icon-paper-clip </div>
								<div className="col"><i className="icon-paper-plane"></i> icon-paper-plane </div>
								<div className="col"><i className="icon-plus"></i> icon-plus </div>
								<div className="col"><i className="icon-power"></i> icon-power </div>
								<div className="col"><i className="icon-refresh"></i> icon-refresh </div>
								<div className="col"><i className="icon-reload"></i> icon-reload </div>
								<div className="col"><i className="icon-settings"></i> icon-settings </div>
								<div className="col"><i className="icon-star"></i> icon-star </div>
								<div className="col"><i className="icon-symbol-female"></i> icon-symbol-female </div>
								<div className="col"><i className="icon-symbol-male"></i> icon-symbol-male </div>
								<div className="col"><i className="icon-target"></i> icon-target </div>
								<div className="col"><i className="icon-volume-1"></i> icon-volume-1 </div>
								<div className="col"><i className="icon-volume-2"></i> icon-volume-2 </div>
								<div className="col"><i className="icon-volume-off"></i> icon-volume-off </div>
							</div> 
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/fontawesome-icon">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Fontawesome icon</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/weather-icon">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Weather icon</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default LinearIcon