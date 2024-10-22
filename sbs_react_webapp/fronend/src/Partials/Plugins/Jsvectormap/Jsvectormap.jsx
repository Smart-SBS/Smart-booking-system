import React, { useEffect } from 'react'
import CardAction from '../../Widgets/CardAction/CardAction';

import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world.js';
import { Link } from 'react-router-dom';

const Jsvectormap = () => {

  useEffect(() => {
    const map = new jsVectorMap({
      selector: '#MyMap',
      map: 'world',
      markers: [
        { name: 'Egypt', coords: [26.8206, 30.8025] },
        { name: 'United Kingdom', coords: [55.3781, 3.4360] },
        {
          name: 'United States',
          coords: [37.0902, -95.7129],
          style: { fill: 'red' }
        }
      ],
      lines: [
        {
          from: 'United Kingdom',
          to: 'United States',
          style: {
            stroke: 'red',
          }
        }
      ],
      series: {
        regions: [
          {
            attribute: 'fill',
            legend: {
              title: 'Some title',
            },
            scale: {
              myScaleOne: 'var(--theme-color1)',
              myScaleTwo: 'var(--theme-color2)',
              myScaleThree: 'var(--theme-color3)',
            },
            values: {
              CN: 'myScaleTwo',
              MX: 'myScaleOne',
              LY: 'myScaleOne',
              RU: 'myScaleThree',
            }
          }
        ]
      },
      lineStyle: {
        stroke: '#676767',
        strokeWidth: 1.5,
        fill: '#ff5566',
        fillOpacity: 1,
        strokeDasharray: '6 3 6',
        animation: true
      }
    });
  }, []);

  const JsvectorCode = `
    import jsVectorMap from 'jsvectormap';
    import 'jsvectormap/dist/maps/world.js';
    import 'jsvectormap/dist/js/jsvectormap.js';
    import 'jsvectormap/dist/css/jsvectormap.css';

    useEffect(() => {
        const map = new jsVectorMap({
            selector: '#MyMap',
            map: 'world',
        })
    }, []);

    return (
        <div id="MyMap" style={{height: "400px"}}></div>
    )
  `;

  return (
    <div className="px-4 py-3 page-body">
      <div className="card border-0 bg-transparent">
        <div className="card-header mb-4 border-bottom px-0">
          <h5 className="card-title mb-0 text-primary">Jsvectormap</h5>
          <div className="dropdown card-action">
            <CardAction />
          </div>
        </div>
        <div className="card-body p-0">
          <div className="row g-xl-4 g-3 mb-4">
            <div className="col-12">
              <p className="lead">Jsvectormap is a lightweight JavaScript library for creating interactive maps and pretty data visualization..</p>
              <ul>
                <li>Interactive map is a powerful tool for presentation.</li>
                <li>It give the ability to create layers of information that can be shown or hidden at the click of a button on a region or maybe a marker.</li>
                <li>Data can be quickly updated, and these updates made transparent to users.</li>
                <li>Zoom functions that allow users to focus on either the details of a particular region, or to gain a quick overview of a wider area.</li>
              </ul>
              <div className="rounded-4" data-lang="html">
                <pre className='h6 language-html text-primary'><code>{JsvectorCode}</code></pre>
              </div>
            </div>
            <div className="col-12">
              <div id="MyMap" style={{ height: "400px" }}></div>
            </div>
          </div>
        </div>
        <div className="card-footer px-0 mt-4">
          <div className="btn-group d-flex">
            <Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/inputmask">
              <span>
                <svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l14 0"></path>
                  <path d="M5 12l6 6"></path>
                  <path d="M5 12l6 -6"></path>
                </svg>
                <span>Previous</span>
              </span>
              <h5 className="mb-0 ps-4">Inputmask</h5>
            </Link>
            <Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/sortablejs">
              <span>
                <span>Next</span>
                <svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l14 0"></path>
                  <path d="M13 18l6 -6"></path>
                  <path d="M13 6l6 6"></path>
                </svg>
              </span>
              <h5 className="mb-0 pe-4">Sortablejs</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Jsvectormap