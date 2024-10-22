import React from 'react'
import CardAction from '../../../Widgets/CardAction/CardAction';

import '../WeatherIcon/WeatherIconStyle.css'
import { Link } from 'react-router-dom';
// import 'weather-icons/css/weather-icons.css';

const WeatherIcon = () => {

	const weatherCode = `
    <i className="wi wi-day-cloudy-gusts"></i>
	<i className="wi wi-day-cloudy-gusts"></i>
	<i className="wi wi-day-cloudy-windy"></i>
  `;

  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Weather icon</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
					<div className="row g-xl-5 g-4">
						<div className="col-12">							
                        <div className="rounded-4" data-lang="html">
							<pre className='h6 language-html text-primary'><code>{weatherCode}</code></pre>
						</div>
						</div>
						<div className="col-12">
							<h6 className="fw-bold">Day / Sunny Icons</h6>
							<div className="row g-3 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-2 icons-list">
								<div className="col"><i className="wi wi-day-cloudy-gusts"></i> wi-day-cloudy-gusts </div>
								<div className="col"><i className="wi wi-day-cloudy-gusts"></i> wi-day-cloudy-gusts </div>
								<div className="col"><i className="wi wi-day-cloudy-windy"></i> wi-day-cloudy-windy </div>
								<div className="col"><i className="wi wi-day-cloudy"></i> wi-day-cloudy </div>
								<div className="col"><i className="wi wi-day-fog"></i> wi-day-fog </div>
								<div className="col"><i className="wi wi-day-hail"></i> wi-day-hail </div>
								<div className="col"><i className="wi wi-day-lightning"></i> wi-day-lightning </div>
								<div className="col"><i className="wi wi-day-rain-mix"></i> wi-day-rain-mix </div>
								<div className="col"><i className="wi wi-day-rain-wind"></i> wi-day-rain-wind </div>
								<div className="col"><i className="wi wi-day-rain"></i> wi-day-rain </div>
								<div className="col"><i className="wi wi-day-showers"></i> wi-day-showers </div>
								<div className="col"><i className="wi wi-day-snow"></i> wi-day-snow </div>
								<div className="col"><i className="wi wi-day-sprinkle"></i> wi-day-sprinkle </div>
								<div className="col"><i className="wi wi-day-sunny-overcast"></i> wi-day-sunny-overcast </div>
								<div className="col"><i className="wi wi-day-sunny"></i> wi-day-sunny </div>
								<div className="col"><i className="wi wi-day-storm-showers"></i> wi-day-storm-showers </div>
								<div className="col"><i className="wi wi-day-thunderstorm"></i> wi-day-thunderstorm </div>
							</div> 
						</div>
						<div className="col-12">
							<h6 className="fw-bold">Neutral / Cloudy Icons</h6>
							<div className="row g-3 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-2 icons-list">
								<div className="col"><i className="wi wi-cloudy-gusts"></i> wi-cloudy-gusts </div>
								<div className="col"><i className="wi wi-cloudy-windy"></i> wi-cloudy-windy </div>
								<div className="col"><i className="wi wi-cloudy"></i> wi-cloudy </div>
								<div className="col"><i className="wi wi-fog"></i> wi-fog </div>
								<div className="col"><i className="wi wi-hail"></i> wi-hail </div>
								<div className="col"><i className="wi wi-lightning"></i> wi-lightning </div>
								<div className="col"><i className="wi wi-rain-mix"></i> wi-rain-mix </div>
								<div className="col"><i className="wi wi-rain-wind"></i> wi-rain-wind </div>
								<div className="col"><i className="wi wi-rain"></i> wi-rain </div>
								<div className="col"><i className="wi wi-showers"></i> wi-showers </div>
								<div className="col"><i className="wi wi-snow"></i> wi-snow </div>
								<div className="col"><i className="wi wi-sprinkle"></i> wi-sprinkle </div>
								<div className="col"><i className="wi wi-storm-showers"></i> wi-storm-showers </div>
								<div className="col"><i className="wi wi-thunderstorm"></i> wi-thunderstorm </div>
							</div> 
						</div>
						<div className="col-12">
							<h6 className="fw-bold">Night / Moons Icons</h6>
							<div className="row g-3 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-2 icons-list">
								<div className="col"><i className="wi wi-night-alt-cloudy-gusts"></i> wi-night-alt-cloudy-gusts </div>
								<div className="col"><i className="wi wi-night-alt-cloudy-windy"></i> wi-night-alt-cloudy-windy </div>
								<div className="col"><i className="wi wi-night-alt-hail"></i> wi-night-alt-hail </div>
								<div className="col"><i className="wi wi-night-alt-lightning"></i> wi-night-alt-lightning </div>
								<div className="col"><i className="wi wi-night-alt-rain-mix"></i> wi-night-alt-rain-mix </div>
								<div className="col"><i className="wi wi-night-alt-rain-wind"></i> wi-night-alt-rain-wind </div>
								<div className="col"><i className="wi wi-night-alt-rain"></i> wi-night-alt-rain </div>
								<div className="col"><i className="wi wi-night-alt-showers"></i> wi-night-alt-showers </div>
								<div className="col"><i className="wi wi-night-alt-snow"></i> wi-night-alt-snow </div>
								<div className="col"><i className="wi wi-night-alt-sprinkle"></i> wi-night-alt-sprinkle </div>
								<div className="col"><i className="wi wi-night-alt-storm-showers"></i> wi-night-alt-storm-showers </div>
								<div className="col"><i className="wi wi-night-alt-thunderstorm"></i> wi-night-alt-thunderstorm </div>
								<div className="col"><i className="wi wi-night-clear"></i> wi-night-clear </div>
								<div className="col"><i className="wi wi-night-cloudy-gusts"></i> wi-night-cloudy-gusts </div>
								<div className="col"><i className="wi wi-night-cloudy-windy"></i> wi-night-cloudy-windy </div>
								<div className="col"><i className="wi wi-night-cloudy"></i> wi-night-cloudy </div>
								<div className="col"><i className="wi wi-night-hail"></i> wi-night-hail </div>
								<div className="col"><i className="wi wi-night-lightning"></i> wi-night-lightning </div>
								<div className="col"><i className="wi wi-night-rain-mix"></i> wi-night-rain-mix </div>
								<div className="col"><i className="wi wi-night-rain-wind"></i> wi-night-rain-wind </div>
								<div className="col"><i className="wi wi-night-rain"></i> wi-night-rain </div>
								<div className="col"><i className="wi wi-night-showers"></i> wi-night-showers </div>
								<div className="col"><i className="wi wi-night-snow"></i> wi-night-snow </div>
								<div className="col"><i className="wi wi-night-sprinkle"></i> wi-night-sprinkle </div>
								<div className="col"><i className="wi wi-night-storm-showers"></i> wi-night-storm-showers </div>
								<div className="col"><i className="wi wi-night-thunderstorm"></i> wi-night-thunderstorm </div>
							</div> 
						</div>
						<div className="col-12">
							<h6 className="fw-bold">Miscellaneous Icons</h6>
							<div className="row g-3 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-2 icons-list">
								<div className="col"><i className="wi wi-celsius"></i> wi-celsius </div>
								<div className="col"><i className="wi wi-cloud-down"></i> wi-cloud-down </div>
								<div className="col"><i className="wi wi-cloud-refresh"></i> wi-cloud-refresh </div>
								<div className="col"><i className="wi wi-cloud-up"></i> wi-cloud-up </div>
								<div className="col"><i className="wi wi-cloud"></i> wi-cloud </div>
								<div className="col"><i className="wi wi-degrees"></i> wi-degrees </div>
								<div className="col"><i className="wi wi-down-left"></i> wi-down-left </div>
								<div className="col"><i className="wi wi-down"></i> wi-down </div>
								<div className="col"><i className="wi wi-fahrenheit"></i> wi-fahrenheit </div>
								<div className="col"><i className="wi wi-horizon-alt"></i> wi-horizon-alt </div>
								<div className="col"><i className="wi wi-horizon"></i> wi-horizon </div>
								<div className="col"><i className="wi wi-left"></i> wi-left </div>
								<div className="col"><i className="wi wi-lightning"></i> wi-lightning </div>
								<div className="col"><i className="wi wi-night-fog"></i> wi-night-fog </div>
								<div className="col"><i className="wi wi-refresh-alt"></i> wi-refresh-alt </div>
								<div className="col"><i className="wi wi-refresh"></i> wi-refresh </div>
								<div className="col"><i className="wi wi-right"></i> wi-right </div>
								<div className="col"><i className="wi wi-sprinkles"></i> wi-sprinkles </div>
								<div className="col"><i className="wi wi-strong-wind"></i> wi-strong-wind </div>
								<div className="col"><i className="wi wi-sunrise"></i> wi-sunrise </div>
								<div className="col"><i className="wi wi-sunset"></i> wi-sunset </div>
								<div className="col"><i className="wi wi-thermometer-exterior"></i> wi-thermometer-exterior </div>
								<div className="col"><i className="wi wi-thermometer-internal"></i> wi-thermometer-internal </div>
								<div className="col"><i className="wi wi-thermometer"></i> wi-thermometer </div>
								<div className="col"><i className="wi wi-tornado"></i> wi-tornado </div>
								<div className="col"><i className="wi wi-up-right"></i> wi-up-right </div>
								<div className="col"><i className="wi wi-up"></i> wi-up </div>
								<div className="col"><i className="wi wi-wind-east"></i> wi-wind-east </div>
								<div className="col"><i className="wi wi-wind-north-east"></i> wi-wind-north-east </div>
								<div className="col"><i className="wi wi-wind-north-west"></i> wi-wind-north-west </div>
								<div className="col"><i className="wi wi-wind-north"></i> wi-wind-north </div>
								<div className="col"><i className="wi wi-wind-south-east"></i> wi-wind-south-east </div>
								<div className="col"><i className="wi wi-wind-south-west"></i> wi-wind-south-west </div>
								<div className="col"><i className="wi wi-wind-south"></i> wi-wind-south </div>
								<div className="col"><i className="wi wi-wind-west"></i> wi-wind-west </div>
							</div> 
						</div>
					</div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/linear-icon">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Linear icon</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/apex">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Apex Charts</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default WeatherIcon