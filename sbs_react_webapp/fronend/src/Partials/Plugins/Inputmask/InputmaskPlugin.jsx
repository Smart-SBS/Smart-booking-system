import React, { useEffect, useRef } from 'react'
import Inputmask from 'inputmask';

import CardAction from '../../Widgets/CardAction/CardAction';
import { Link } from 'react-router-dom';

const InputmaskPlugin = () => {

  const dateInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const placeholderInputRef = useRef(null);
  const repeatingInputRef = useRef(null);
  const rightAlignedInputRef = useRef(null);
  const currencyInputRef = useRef(null);
  const ipAddressInputRef = useRef(null);
  const emailAddressInputRef = useRef(null);

  useEffect(() => {
    Inputmask({ mask: '99/99/9999' }).mask(dateInputRef.current);
    Inputmask({ mask: '(999) 999-9999' }).mask(phoneInputRef.current);
    Inputmask({ mask: '(999) 999-9999', placeholder: ' ' }).mask(placeholderInputRef.current);
    Inputmask({ mask: '9', repeat: 10, greedy: false }).mask(repeatingInputRef.current);
    Inputmask('decimal', { rightAlignNumerics: false }).mask(rightAlignedInputRef.current);
    Inputmask('€ 999.999.999,99', { numericInput: true }).mask(currencyInputRef.current);
    Inputmask({ mask: '999.999.999.999' }).mask(ipAddressInputRef.current);
    Inputmask({
      mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
      greedy: false,
      onBeforePaste: (pastedValue, opts) => pastedValue.toLowerCase().replace('mailto:', ''),
      definitions: {
        '*': {
          validator: '[0-9A-Za-z!#$%&"*+/=?^_`{|}~\\-]',
          cardinality: 1,
          casing: 'lower'
        }
      }
    }).mask(emailAddressInputRef.current);
  }, []);

  const inputmaskCode = `
    import Inputmask from 'inputmask';

    const dateInputRef = useRef(null);
    useEffect(() => {
        Inputmask({ mask: '99/99/9999' }).mask(dateInputRef.current);
    }, []);

    return (
        <input className="form-control form-control-lg" ref={dateInputRef} inputMode="text" />
    )
  `;

  return (
    <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Inputmask</h5>
					<div className="dropdown card-action">
              <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
          <div className="row g-xl-4 g-3 mb-4">
            <div className="col-12">
              <p className="lead">Inputmask is a javascript library that creates an input mask. Inputmask can run against vanilla javascript, jQuery, and jqlite.<a href="https://robinherbots.github.io/Inputmask/#/">View more</a> </p>
              <div className="rounded-4 " data-lang="html">
                  <pre className='h6 language-html text-primary'><code>{inputmaskCode}</code></pre>
              </div>
            </div>
            <div className="col-12">
              <label className="form-label">Date</label>
              <input className="form-control form-control-lg" ref={dateInputRef} inputMode="text" />
              <div className="form-text">Custom date format: <code>mm/dd/yyyy</code></div>
            </div>
            <div className="col-12">
              <label className="form-label">Phone number</label>
              <input className="form-control form-control-lg" ref={phoneInputRef} inputMode="text" />
              <div className="form-text">Phone number format: <code>(999) 999-9999</code></div>
            </div>
              <div className="col-12">
                <label className="form-label">Placeholder</label>
                <input className="form-control form-control-lg" ref={placeholderInputRef} inputMode="text" />
                <div className="form-text">Phone number format with placeholder: <code>(999) 999-9999</code></div>
              </div>
              <div className="col-12">
                <label className="form-label">Repeating mask</label>
                <input className="form-control form-control-lg" ref={repeatingInputRef} inputMode="text" />
                <div className="form-text">Mask <code>9</code>, <code>99</code> or ... <code>9999999999</code></div>
              </div>
              <div className="col-12">
                <label className="form-label">Right aligned</label>
                <input className="form-control form-control-lg" ref={rightAlignedInputRef} inputMode="decimal" style={{ textAlign: 'right' }} />
                <div className="form-text">Numeric format</div>
              </div>
              <div className="col-12">
                <label className="form-label">Currency</label>
                <input className="form-control form-control-lg" ref={currencyInputRef} inputMode="text" />
                <div className="form-text">Currency format: <code>€ ___.__1.234,56</code></div>
              </div>
              <div className="col-12">
                <label className="form-label">IP Address</label>
                <input className="form-control form-control-lg" ref={ipAddressInputRef} inputMode="text" />
                <div className="form-text">Custom format: <code>999.999.999.999</code></div>
              </div>
              <div className="col-12">
                <label className="form-label">Email Address</label>
                <input className="form-control form-control-lg" ref={emailAddressInputRef} inputMode="text" />
                <div className="form-text">Custom format: <code>_@_</code></div>
              </div>
            </div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/flatpickr">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Flatpickr</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/jsvectormap">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Jsvectormap</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
  )
}

export default InputmaskPlugin