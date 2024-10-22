import React, { useEffect } from 'react'
import Inputmask from 'inputmask';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Select2 from "select2";
import "select2/dist/css/select2.css";

const Forms = () => {

    useEffect(() => {
        Inputmask({ "mask": "(999) 999-9999" }).mask(".phone-number");

        flatpickr('.f-basic', {
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
        });

        Select2('.select2');

    }, []);

    return (
        <div className="px-4 py-3 page-body">
            <h3 className="title-font mb-3">Forms</h3>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-header py-3 bg-transparent border-bottom-0">
                            <h6 className="card-title mb-0"><strong>Personal Information</strong></h6>
                            <div className="form-check form-switch card-toggle-one">
                                <input className="form-check-input" type="checkbox" role="switch" id="boxlayout" />
                                <label className="form-check-label" htmlFor="boxlayout">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body card-main-one">
                            <form>
                                <div className="row">
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">First Name</label>
                                        <fieldset className="form-icon-group left-icon position-relative">
                                            <input type="text" className="form-control" />
                                            <div className="form-icon position-absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                                </svg>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">Last Name</label>
                                        <fieldset className="form-icon-group left-icon position-relative">
                                            <input type="text" className="form-control" />
                                            <div className="form-icon position-absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                                </svg>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">Email Address</label>
                                        <fieldset className="form-icon-group left-icon position-relative">
                                            <input type="email" className="form-control" />
                                            <div className="form-icon position-absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                                                </svg>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">Phone Number</label>
                                        <fieldset className="form-icon-group left-icon position-relative">
                                            <input type="text" className="form-control phone-number" placeholder="Ex: (000) 000-00-00" />
                                            <div className="form-icon position-absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                </svg>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">Password</label>
                                        <fieldset className="form-icon-group left-icon position-relative">
                                            <input type="password" className="form-control" />
                                            <div className="form-icon position-absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                </svg>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">Confirm Password</label>
                                        <fieldset className="form-icon-group left-icon position-relative">
                                            <input type="password" className="form-control" />
                                            <div className="form-icon position-absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                </svg>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="col-12">
                                        <button className="me-1 btn btn-primary" type="button">Save</button>
                                        <button className="btn btn-outline-secondary" type="button">Cancel</button>
                                    </div>
                                </div>
                            </form>
                            <div className="form-code">
                                <pre className="language-html m-0" data-lang="html"><code className="language-html">&lt;form&gt;
                                    &lt;div className=&quot;row&quot;&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;First Name&lt;/label&gt;
                                    &lt;fieldset className=&quot;form-icon-group left-icon position-relative&quot;&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot;&gt;
                                    &lt;div className=&quot;form-icon position-absolute&quot;&gt;
                                    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; className=&quot;bi bi-person&quot; viewBox=&quot;0 0 16 16&quot;&gt;
                                    &lt;path d=&quot;M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z&quot;/&gt;
                                    &lt;/svg&gt;
                                    &lt;/div&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;Last Name&lt;/label&gt;
                                    &lt;fieldset className=&quot;form-icon-group left-icon position-relative&quot;&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot;&gt;
                                    &lt;div className=&quot;form-icon position-absolute&quot;&gt;
                                    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; className=&quot;bi bi-person&quot; viewBox=&quot;0 0 16 16&quot;&gt;
                                    &lt;path d=&quot;M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z&quot;/&gt;
                                    &lt;/svg&gt;
                                    &lt;/div&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;Email Address&lt;/label&gt;
                                    &lt;fieldset className=&quot;form-icon-group left-icon position-relative&quot;&gt;
                                    &lt;input type=&quot;email&quot; className=&quot;form-control&quot;&gt;
                                    &lt;div className=&quot;form-icon position-absolute&quot;&gt;
                                    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; className=&quot;bi bi-envelope-fill&quot; viewBox=&quot;0 0 16 16&quot;&gt;
                                    &lt;path d=&quot;M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z&quot;/&gt;
                                    &lt;/svg&gt;
                                    &lt;/div&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;Phone Number&lt;/label&gt;
                                    &lt;fieldset className=&quot;form-icon-group left-icon position-relative&quot;&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control phone-number&quot; placeholder=&quot;Ex: (000) 000-00-00&quot;&gt;
                                    &lt;div className=&quot;form-icon position-absolute&quot;&gt;
                                    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; className=&quot;bi bi-phone&quot; viewBox=&quot;0 0 16 16&quot;&gt;
                                    &lt;path d=&quot;M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z&quot;/&gt;
                                    &lt;path d=&quot;M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z&quot;/&gt;
                                    &lt;/svg&gt;
                                    &lt;/div&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;Password&lt;/label&gt;
                                    &lt;fieldset className=&quot;form-icon-group left-icon position-relative&quot;&gt;
                                    &lt;input type=&quot;password&quot; className=&quot;form-control&quot;&gt;
                                    &lt;div className=&quot;form-icon position-absolute&quot;&gt;
                                    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; className=&quot;bi bi-eye&quot; viewBox=&quot;0 0 16 16&quot;&gt;
                                    &lt;path d=&quot;M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z&quot;/&gt;
                                    &lt;path d=&quot;M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z&quot;/&gt;
                                    &lt;/svg&gt;
                                    &lt;/div&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;Confirm Password&lt;/label&gt;
                                    &lt;fieldset className=&quot;form-icon-group left-icon position-relative&quot;&gt;
                                    &lt;input type=&quot;password&quot; className=&quot;form-control&quot;&gt;
                                    &lt;div className=&quot;form-icon position-absolute&quot;&gt;
                                    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; className=&quot;bi bi-eye&quot; viewBox=&quot;0 0 16 16&quot;&gt;
                                    &lt;path d=&quot;M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z&quot;/&gt;
                                    &lt;path d=&quot;M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z&quot;/&gt;
                                    &lt;/svg&gt;
                                    &lt;/div&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;col-12&quot;&gt;
                                    &lt;button className=&quot;btn btn-primary&quot;&gt;Save&lt;/button&gt;
                                    &lt;button className=&quot;btn btn-outline-secondary&quot;&gt;Cancel&lt;/button&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/form&gt;</code></pre>
                            </div>
                        </div>

                    </div>
                    {/* <!-- Personal Information Card End --> */}

                    <div className="card mb-4">
                        <div className="card-header py-3 bg-transparent border-bottom-0">
                            <h6 className="card-title mb-0"><strong>Company Information</strong></h6>
                            <div className="form-check form-switch card-toggle-two">
                                <input className="form-check-input" type="checkbox" role="switch" id="card-toggle-two" />
                                <label className="form-check-label" htmlFor="card-toggle-two">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body card-main-two">
                            <form>
                                <div className="row">
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">Company Name</label>
                                        <fieldset className="form-icon-group left-icon position-relative">
                                            <input type="text" className="form-control" />
                                            <div className="form-icon position-absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                                                    <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                                                </svg>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">Company Number</label>
                                        <fieldset className="form-icon-group left-icon position-relative">
                                            <input type="text" className="form-control phone-number" placeholder="Ex: (000) 000-00-00" />
                                            <div className="form-icon position-absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                                                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                </svg>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">Employees</label>
                                        <input type="hidden" className="form-control" />
                                        <fieldset>
                                            <select className="array-select form-control form-select" aria-label="example">
                                                <option defaultValue>Select Employees</option>
                                                <option>0-10</option>
                                                <option>11-50</option>
                                                <option>51-100</option>
                                                <option>100+</option>
                                            </select>
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">Company Type</label>
                                        <select className="form-select array-select form-control" aria-label="example">
                                            <option defaultValue>Select Type</option>
                                            <option>Real Estate</option>
                                            <option>Hospital</option>
                                            <option>Information Technology (IT)</option>
                                            <option>Goverment</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">Joining Date</label>
                                        <fieldset className="form-icon-group left-icon position-relative">
                                            <input type="text" className="form-control f-basic flatpickr-input" placeholder="Select Date.." readOnly="readonly" />
                                            <div className="form-icon position-absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-check" viewBox="0 0 16 16">
                                                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                                </svg>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="mb-3 col-md-6 col-12">
                                        <label className="col-form-label">End Date</label>
                                        <fieldset className="form-icon-group left-icon position-relative">
                                            <input type="text" className="form-control f-basic flatpickr-input" placeholder="Select Date.." readOnly="readonly" />
                                            <div className="form-icon position-absolute">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-check" viewBox="0 0 16 16">
                                                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                                </svg>
                                            </div>
                                        </fieldset>
                                    </div>
                                    <div className="col-12">
                                        <button className="me-1 btn btn-primary" type="button">Save</button>
                                        <button className="btn btn-outline-secondary" type="button">Cancel</button>
                                    </div>
                                </div>
                            </form>
                            <div className="form-code">
                                <pre className="language-html m-0" data-lang="html"><code className="language-html">&lt;form&gt;
                                    &lt;div className=&quot;row&quot;&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;Company Name&lt;/label&gt;
                                    &lt;fieldset className=&quot;form-icon-group left-icon position-relative&quot;&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot;&gt;
                                    &lt;div className=&quot;form-icon position-absolute&quot;&gt;
                                    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; className=&quot;bi bi-building&quot; viewBox=&quot;0 0 16 16&quot;&gt;
                                    &lt;path fillRule=&quot;evenodd&quot; d=&quot;M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z&quot;/&gt;
                                    &lt;path d=&quot;M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z&quot;/&gt;
                                    &lt;/svg&gt;
                                    &lt;/div&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;Company Number&lt;/label&gt;
                                    &lt;fieldset className=&quot;form-icon-group left-icon position-relative&quot;&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control phone-number&quot; placeholder=&quot;Ex: (000) 000-00-00&quot;&gt;
                                    &lt;div className=&quot;form-icon position-absolute&quot;&gt;
                                    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; className=&quot;bi bi-phone&quot; viewBox=&quot;0 0 16 16&quot;&gt;
                                    &lt;path d=&quot;M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z&quot;/&gt;
                                    &lt;path d=&quot;M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z&quot;/&gt;
                                    &lt;/svg&gt;
                                    &lt;/div&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;Employees&lt;/label&gt;
                                    &lt;input type=&quot;hidden&quot; className=&quot;form-control&quot;&gt;
                                    &lt;fieldset&gt;
                                    &lt;select className=&quot;array-select form-control form-select&quot; aria-label=&quot;example&quot;&gt;
                                    &lt;option defaultValue&gt;Select Employees&lt;/option&gt;
                                    &lt;option&gt;0-10&lt;/option&gt;
                                    &lt;option&gt;11-50&lt;/option&gt;
                                    &lt;option&gt;51-100&lt;/option&gt;
                                    &lt;option&gt;100+&lt;/option&gt;
                                    &lt;/select&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;Company Type&lt;/label&gt;
                                    &lt;select className=&quot;form-select array-select form-control&quot; aria-label=&quot;example&quot;&gt;
                                    &lt;option defaultValue&gt;Select Type&lt;/option&gt;
                                    &lt;option&gt;Real Estate&lt;/option&gt;
                                    &lt;option&gt;Hospital&lt;/option&gt;
                                    &lt;option&gt;Information Technology (IT)&lt;/option&gt;
                                    &lt;option&gt;Goverment&lt;/option&gt;
                                    &lt;/select&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;Joining Date&lt;/label&gt;
                                    &lt;fieldset className=&quot;form-icon-group left-icon position-relative&quot;&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control f-basicc flatpickr-input&quot; placeholder=&quot;Select Date..&quot; readOnly=&quot;readonly&quot;&gt;
                                    &lt;div className=&quot;form-icon position-absolute&quot;&gt;
                                    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; className=&quot;bi bi-calendar-check&quot; viewBox=&quot;0 0 16 16&quot;&gt;
                                    &lt;path d=&quot;M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z&quot;/&gt;
                                    &lt;path d=&quot;M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z&quot;/&gt;
                                    &lt;/svg&gt;
                                    &lt;/div&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-3 col-md-6 col-12&quot;&gt;
                                    &lt;label className=&quot;col-form-label&quot;&gt;End Date&lt;/label&gt;
                                    &lt;fieldset className=&quot;form-icon-group left-icon position-relative&quot;&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control f-basicc flatpickr-input&quot; placeholder=&quot;Select Date..&quot; readOnly=&quot;readonly&quot;&gt;
                                    &lt;div className=&quot;form-icon position-absolute&quot;&gt;
                                    &lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; className=&quot;bi bi-calendar-check&quot; viewBox=&quot;0 0 16 16&quot;&gt;
                                    &lt;path d=&quot;M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z&quot;/&gt;
                                    &lt;path d=&quot;M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z&quot;/&gt;
                                    &lt;/svg&gt;
                                    &lt;/div&gt;
                                    &lt;/fieldset&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;col-12&quot;&gt;
                                    &lt;button className=&quot;btn btn-primary&quot;&gt;Save&lt;/button&gt;
                                    &lt;button className=&quot;btn btn-outline-secondary&quot;&gt;Cancel&lt;/button&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/form&gt;</code></pre>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Company Information Card End --> */}

                    <div className="card mb-4">
                        <div className="card-header py-3 bg-transparent border-bottom-0">
                            <h6 className="card-title mb-0"><strong>Float Label</strong></h6>
                            <div className="form-check form-switch card-toggle-three">
                                <input className="form-check-input" type="checkbox" role="switch" id="card-toggle-three" />
                                <label className="form-check-label" htmlFor="card-toggle-three">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body card-main-three">
                            <form className="form-floating">
                                <div className="mb-4">
                                    <span className="form-floating">
                                        <input type="text" className="form-control" id="TextInput" placeholder="Name" />
                                        <label className="form-label" htmlFor="TextInput">Text Input</label>
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <span className="form-floating">
                                        <input type="email" className="form-control" id="emailInput" placeholder="password" />
                                        <label className="form-label" htmlFor="emailInput">Email Input</label>
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <span className="form-floating">
                                        <textarea className="form-control" id="TextArea" rows="5" cols="30" placeholder="Comment"></textarea>
                                        <label className="form-label" htmlFor="TextArea">Text Area</label>
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <div className="form-floating">
                                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                                            <option defaultValue>Open this select menu</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Works with selects</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="me-1 btn btn-primary" type="button">Save</button>
                                    <button className="btn btn-outline-secondary" type="button">Cancel</button>
                                </div>
                            </form>
                            <div className="form-code">
                                <pre className="language-html m-0" data-lang="html"><code className="language-html">&lt;form className=&quot;form-floating&quot;&gt;
                                    &lt;div className=&quot;mb-4&quot;&gt;
                                    &lt;span className=&quot;form-floating&quot;&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;TextInput&quot; placeholder=&quot;Name&quot;&gt;
                                    &lt;label className=&quot;form-label&quot; htmlFor=&quot;TextInput&quot;&gt;Text Input&lt;/label&gt;
                                    &lt;/span&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-4&quot;&gt;
                                    &lt;span className=&quot;form-floating&quot;&gt;
                                    &lt;input type=&quot;email&quot; className=&quot;form-control&quot; id=&quot;emailInput&quot; placeholder=&quot;password&quot;&gt;
                                    &lt;label className=&quot;form-label&quot; htmlFor=&quot;emailInput&quot;&gt;Email Input&lt;/label&gt;
                                    &lt;/span&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-4&quot;&gt;
                                    &lt;span className=&quot;form-floating&quot;&gt;
                                    &lt;textarea className=&quot;form-control&quot; id=&quot;TextArea&quot; rows=&quot;5&quot; cols=&quot;30&quot; placeholder=&quot;Comment&quot;&gt;&lt;/textarea&gt;
                                    &lt;label className=&quot;form-label&quot; htmlFor=&quot;TextArea&quot;&gt;Text Area&lt;/label&gt;
                                    &lt;/span&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-4&quot;&gt;
                                    &lt;div className=&quot;form-floating&quot;&gt;
                                    &lt;select className=&quot;form-select&quot; id=&quot;floatingSelect&quot; aria-label=&quot;Floating label select example&quot;&gt;
                                    &lt;option defaultValue&gt;Open this select menu&lt;/option&gt;
                                    &lt;option value=&quot;1&quot;&gt;One&lt;/option&gt;
                                    &lt;option value=&quot;2&quot;&gt;Two&lt;/option&gt;
                                    &lt;option value=&quot;3&quot;&gt;Three&lt;/option&gt;
                                    &lt;/select&gt;
                                    &lt;label htmlFor=&quot;floatingSelect&quot;&gt;Works with selects&lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;mb-4&quot;&gt;
                                    &lt;button className=&quot;btn btn-primary&quot;&gt;Save&lt;/button&gt;
                                    &lt;button className=&quot;btn btn-outline-secondary&quot;&gt;Cancel&lt;/button&gt;
                                    &lt;/div&gt;
                                    &lt;/form&gt;</code></pre>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Form Validation --> */}

                    <div className="card mb-4">
                        <div className="card-header py-3 bg-transparent border-bottom-0">
                            <h6 className="card-title mb-0"><strong>Checkout form</strong></h6>
                            <div className="form-check form-switch card-toggle-four">
                                <input className="form-check-input" type="checkbox" role="switch" id="card-toggle-four" />
                                <label className="form-check-label" htmlFor="card-toggle-four">Show Code</label>
                            </div>
                        </div>
                        <div className="card-body card-main-four">
                            <div className="row g-5 form">
                                <div className="col-md-5 col-lg-4 order-md-last">
                                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                                        <span className="text-primary h6">Your cart</span>
                                        <span className="badge bg-primary rounded-pill">3</span>
                                    </h4>
                                    <ul className="list-group mb-3">
                                        <li className="list-group-item d-flex justify-content-between lh-sm">
                                            <div>
                                                <h6 className="my-0">Product name</h6>
                                                <small className="text-muted">Brief description</small>
                                            </div>
                                            <span className="text-muted">$12</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between lh-sm">
                                            <div>
                                                <h6 className="my-0">Second product</h6>
                                                <small className="text-muted">Brief description</small>
                                            </div>
                                            <span className="text-muted">$8</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between lh-sm">
                                            <div>
                                                <h6 className="my-0">Third item</h6>
                                                <small className="text-muted">Brief description</small>
                                            </div>
                                            <span className="text-muted">$5</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between bg-light">
                                            <div className="text-success">
                                                <h6 className="my-0">Promo code</h6>
                                                <small>EXAMPLECODE</small>
                                            </div>
                                            <span className="text-success">−$5</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Total (USD)</span>
                                            <strong>$20</strong>
                                        </li>
                                    </ul>

                                    <form className="card p-2">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Promo code" />
                                            <button className="btn btn-secondary" type="button">Redeem</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-7 col-lg-8">
                                    <h4 className="mb-3 h6">Billing address</h4>
                                    <form className="needs-validation" noValidate="" />
                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <label htmlFor="firstName" className="form-label">First name</label>
                                            <input type="text" className="form-control" id="firstName" placeholder="" defaultValue="" required="" />
                                            <div className="invalid-feedback">
                                                Valid first name is required.
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <label htmlFor="lastName" className="form-label">Last name</label>
                                            <input type="text" className="form-control" id="lastName" placeholder="" defaultValue="" required="" />
                                            <div className="invalid-feedback">
                                                Valid last name is required.
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="username" className="form-label">Username</label>
                                            <div className="input-group has-validation">
                                                <span className="input-group-text">@</span>
                                                <input type="text" className="form-control" id="username" placeholder="Username" required="" />
                                                <div className="invalid-feedback">
                                                    Your username is required.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="email" className="form-label">Email <span className="text-muted">(Optional)</span></label>
                                            <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                            <div className="invalid-feedback">
                                                Please enter a valid email address for shipping updates.
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <input type="text" className="form-control" id="address" placeholder="1234 Main St" required="" />
                                            <div className="invalid-feedback">
                                                Please enter your shipping address.
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
                                            <input type="text" className="form-control" id="address2" placeholder="Apartment or suite" />
                                        </div>

                                        <div className="col-md-5">
                                            <label htmlFor="country" className="form-label">Country</label>
                                            <select className="form-select" id="country" required="">
                                                <option value="">Choose...</option>
                                                <option>United States</option>
                                            </select>
                                            <div className="invalid-feedback">
                                                Please select a valid country.
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="state" className="form-label">State</label>
                                            <select className="form-select" id="state" required="">
                                                <option value="">Choose...</option>
                                                <option>California</option>
                                            </select>
                                            <div className="invalid-feedback">
                                                Please provide a valid state.
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="zip" className="form-label">Zip</label>
                                            <input type="text" className="form-control" id="zip" placeholder="" required="" />
                                            <div className="invalid-feedback">
                                                Zip code required.
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="same-address" />
                                        <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                                    </div>

                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="save-info" />
                                        <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
                                    </div>

                                    <hr className="my-4" />

                                    <h4 className="mb-3 h6">Payment</h4>

                                    <div className="my-3">
                                        <div className="form-check">
                                            <input id="credit" type="radio" className="form-check-input" required="" defaultChecked />
                                            <label className="form-check-label" htmlFor="credit">Credit card</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="debit" type="radio" className="form-check-input" required="" />
                                            <label className="form-check-label" htmlFor="debit">Debit card</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="paypal" type="radio" className="form-check-input" required="" />
                                            <label className="form-check-label" htmlFor="paypal">PayPal</label>
                                        </div>
                                    </div>

                                    <div className="row gy-3">
                                        <div className="col-md-6">
                                            <label htmlFor="cc-name" className="form-label">Name on card</label>
                                            <input type="text" className="form-control" id="cc-name" placeholder="" required="" />
                                            <small className="text-muted">Full name as displayed on card</small>
                                            <div className="invalid-feedback">
                                                Name on card is required
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                            <input type="text" className="form-control" id="cc-number" placeholder="" required="" />
                                            <div className="invalid-feedback">
                                                Credit card number is required
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                            <input type="text" className="form-control" id="cc-expiration" placeholder="" required="" />
                                            <div className="invalid-feedback">
                                                Expiration date required
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                            <input type="text" className="form-control" id="cc-cvv" placeholder="" required="" />
                                            <div className="invalid-feedback">
                                                Security code required
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                                    {/* </form> */}
                                </div>
                            </div>
                            <div className="form-code">
                                <pre className="language-html m-0" data-lang="html"><code className="language-html">&lt;div className=&quot;row g-5&quot;&gt;
                                    &lt;div className=&quot;col-md-5 col-lg-4 order-md-last&quot;&gt;
                                    &lt;h4 className=&quot;d-flex justify-content-between align-items-center mb-3&quot;&gt;
                                    &lt;span className=&quot;text-primary h6&quot;&gt;Your cart&lt;/span&gt;
                                    &lt;span className=&quot;badge bg-primary rounded-pill&quot;&gt;3&lt;/span&gt;
                                    &lt;/h4&gt;
                                    &lt;ul className=&quot;list-group mb-3&quot;&gt;
                                    &lt;li className=&quot;list-group-item d-flex justify-content-between lh-sm&quot;&gt;
                                    &lt;div&gt;
                                    &lt;h6 className=&quot;my-0&quot;&gt;Product name&lt;/h6&gt;
                                    &lt;small className=&quot;text-muted&quot;&gt;Brief description&lt;/small&gt;
                                    &lt;/div&gt;
                                    &lt;span className=&quot;text-muted&quot;&gt;$12&lt;/span&gt;
                                    &lt;/li&gt;
                                    &lt;li className=&quot;list-group-item d-flex justify-content-between lh-sm&quot;&gt;
                                    &lt;div&gt;
                                    &lt;h6 className=&quot;my-0&quot;&gt;Second product&lt;/h6&gt;
                                    &lt;small className=&quot;text-muted&quot;&gt;Brief description&lt;/small&gt;
                                    &lt;/div&gt;
                                    &lt;span className=&quot;text-muted&quot;&gt;$8&lt;/span&gt;
                                    &lt;/li&gt;
                                    &lt;li className=&quot;list-group-item d-flex justify-content-between lh-sm&quot;&gt;
                                    &lt;div&gt;
                                    &lt;h6 className=&quot;my-0&quot;&gt;Third item&lt;/h6&gt;
                                    &lt;small className=&quot;text-muted&quot;&gt;Brief description&lt;/small&gt;
                                    &lt;/div&gt;
                                    &lt;span className=&quot;text-muted&quot;&gt;$5&lt;/span&gt;
                                    &lt;/li&gt;
                                    &lt;li className=&quot;list-group-item d-flex justify-content-between bg-light&quot;&gt;
                                    &lt;div className=&quot;text-success&quot;&gt;
                                    &lt;h6 className=&quot;my-0&quot;&gt;Promo code&lt;/h6&gt;
                                    &lt;small&gt;EXAMPLECODE&lt;/small&gt;
                                    &lt;/div&gt;
                                    &lt;span className=&quot;text-success&quot;&gt;&minus;$5&lt;/span&gt;
                                    &lt;/li&gt;
                                    &lt;li className=&quot;list-group-item d-flex justify-content-between&quot;&gt;
                                    &lt;span&gt;Total (USD)&lt;/span&gt;
                                    &lt;strong&gt;$20&lt;/strong&gt;
                                    &lt;/li&gt;
                                    &lt;/ul&gt;

                                    &lt;form className=&quot;card p-2&quot;&gt;
                                    &lt;div className=&quot;input-group&quot;&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; placeholder=&quot;Promo code&quot;&gt;
                                    &lt;button type=&quot;submit&quot; className=&quot;btn btn-secondary&quot;&gt;Redeem&lt;/button&gt;
                                    &lt;/div&gt;
                                    &lt;/form&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;col-md-7 col-lg-8&quot;&gt;
                                    &lt;h4 className=&quot;mb-3 h6&quot;&gt;Billing address&lt;/h4&gt;
                                    &lt;form className=&quot;needs-validation&quot; noValidate=&quot;&quot;&gt;
                                    &lt;div className=&quot;row g-3&quot;&gt;
                                    &lt;div className=&quot;col-sm-6&quot;&gt;
                                    &lt;label htmlFor=&quot;firstName&quot; className=&quot;form-label&quot;&gt;First name&lt;/label&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;firstName&quot; placeholder=&quot;&quot; value=&quot;&quot; required=&quot;&quot;&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Valid first name is required.
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-sm-6&quot;&gt;
                                    &lt;label htmlFor=&quot;lastName&quot; className=&quot;form-label&quot;&gt;Last name&lt;/label&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;lastName&quot; placeholder=&quot;&quot; value=&quot;&quot; required=&quot;&quot;&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Valid last name is required.
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-12&quot;&gt;
                                    &lt;label htmlFor=&quot;username&quot; className=&quot;form-label&quot;&gt;Username&lt;/label&gt;
                                    &lt;div className=&quot;input-group has-validation&quot;&gt;
                                    &lt;span className=&quot;input-group-text&quot;&gt;@&lt;/span&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;username&quot; placeholder=&quot;Username&quot; required=&quot;&quot;&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Your username is required.
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-12&quot;&gt;
                                    &lt;label htmlFor=&quot;email&quot; className=&quot;form-label&quot;&gt;Email &lt;span className=&quot;text-muted&quot;&gt;(Optional)&lt;/span&gt;&lt;/label&gt;
                                    &lt;input type=&quot;email&quot; className=&quot;form-control&quot; id=&quot;email&quot; placeholder=&quot;you@example.com&quot;&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Please enter a valid email address for shipping updates.
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-12&quot;&gt;
                                    &lt;label htmlFor=&quot;address&quot; className=&quot;form-label&quot;&gt;Address&lt;/label&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;address&quot; placeholder=&quot;1234 Main St&quot; required=&quot;&quot;&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Please enter your shipping address.
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-12&quot;&gt;
                                    &lt;label htmlFor=&quot;address2&quot; className=&quot;form-label&quot;&gt;Address 2 &lt;span className=&quot;text-muted&quot;&gt;(Optional)&lt;/span&gt;&lt;/label&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;address2&quot; placeholder=&quot;Apartment or suite&quot;&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-md-5&quot;&gt;
                                    &lt;label htmlFor=&quot;country&quot; className=&quot;form-label&quot;&gt;Country&lt;/label&gt;
                                    &lt;select className=&quot;form-select&quot; id=&quot;country&quot; required=&quot;&quot;&gt;
                                    &lt;option value=&quot;&quot;&gt;Choose...&lt;/option&gt;
                                    &lt;option&gt;United States&lt;/option&gt;
                                    &lt;/select&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Please select a valid country.
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-md-4&quot;&gt;
                                    &lt;label htmlFor=&quot;state&quot; className=&quot;form-label&quot;&gt;State&lt;/label&gt;
                                    &lt;select className=&quot;form-select&quot; id=&quot;state&quot; required=&quot;&quot;&gt;
                                    &lt;option value=&quot;&quot;&gt;Choose...&lt;/option&gt;
                                    &lt;option&gt;California&lt;/option&gt;
                                    &lt;/select&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Please provide a valid state.
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-md-3&quot;&gt;
                                    &lt;label htmlFor=&quot;zip&quot; className=&quot;form-label&quot;&gt;Zip&lt;/label&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;zip&quot; placeholder=&quot;&quot; required=&quot;&quot;&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Zip code required.
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;hr className=&quot;my-4&quot;&gt;

                                    &lt;div className=&quot;form-check&quot;&gt;
                                    &lt;input type=&quot;checkbox&quot; className=&quot;form-check-input&quot; id=&quot;same-address&quot;&gt;
                                    &lt;label className=&quot;form-check-label&quot; htmlFor=&quot;same-address&quot;&gt;Shipping address is the same as my billing address&lt;/label&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;form-check&quot;&gt;
                                    &lt;input type=&quot;checkbox&quot; className=&quot;form-check-input&quot; id=&quot;save-info&quot;&gt;
                                    &lt;label className=&quot;form-check-label&quot; htmlFor=&quot;save-info&quot;&gt;Save this information for next time&lt;/label&gt;
                                    &lt;/div&gt;

                                    &lt;hr className=&quot;my-4&quot;&gt;

                                    &lt;h4 className=&quot;mb-3 h6&quot;&gt;Payment&lt;/h4&gt;

                                    &lt;div className=&quot;my-3&quot;&gt;
                                    &lt;div className=&quot;form-check&quot;&gt;
                                    &lt;input id=&quot;credit&quot; name=&quot;paymentMethod&quot; type=&quot;radio&quot; className=&quot;form-check-input&quot; checked=&quot;&quot; required=&quot;&quot;&gt;
                                    &lt;label className=&quot;form-check-label&quot; htmlFor=&quot;credit&quot;&gt;Credit card&lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;form-check&quot;&gt;
                                    &lt;input id=&quot;debit&quot; name=&quot;paymentMethod&quot; type=&quot;radio&quot; className=&quot;form-check-input&quot; required=&quot;&quot;&gt;
                                    &lt;label className=&quot;form-check-label&quot; htmlFor=&quot;debit&quot;&gt;Debit card&lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;div className=&quot;form-check&quot;&gt;
                                    &lt;input id=&quot;paypal&quot; name=&quot;paymentMethod&quot; type=&quot;radio&quot; className=&quot;form-check-input&quot; required=&quot;&quot;&gt;
                                    &lt;label className=&quot;form-check-label&quot; htmlFor=&quot;paypal&quot;&gt;PayPal&lt;/label&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;row gy-3&quot;&gt;
                                    &lt;div className=&quot;col-md-6&quot;&gt;
                                    &lt;label htmlFor=&quot;cc-name&quot; className=&quot;form-label&quot;&gt;Name on card&lt;/label&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;cc-name&quot; placeholder=&quot;&quot; required=&quot;&quot;&gt;
                                    &lt;small className=&quot;text-muted&quot;&gt;Full name as displayed on card&lt;/small&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Name on card is required
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-md-6&quot;&gt;
                                    &lt;label htmlFor=&quot;cc-number&quot; className=&quot;form-label&quot;&gt;Credit card number&lt;/label&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;cc-number&quot; placeholder=&quot;&quot; required=&quot;&quot;&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Credit card number is required
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-md-3&quot;&gt;
                                    &lt;label htmlFor=&quot;cc-expiration&quot; className=&quot;form-label&quot;&gt;Expiration&lt;/label&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;cc-expiration&quot; placeholder=&quot;&quot; required=&quot;&quot;&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Expiration date required
                                    &lt;/div&gt;
                                    &lt;/div&gt;

                                    &lt;div className=&quot;col-md-3&quot;&gt;
                                    &lt;label htmlFor=&quot;cc-cvv&quot; className=&quot;form-label&quot;&gt;CVV&lt;/label&gt;
                                    &lt;input type=&quot;text&quot; className=&quot;form-control&quot; id=&quot;cc-cvv&quot; placeholder=&quot;&quot; required=&quot;&quot;&gt;
                                    &lt;div className=&quot;invalid-feedback&quot;&gt;
                                    Security code required
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;
                                    &lt;hr className=&quot;my-4&quot;&gt;
                                    &lt;button className=&quot;w-100 btn btn-primary btn-lg&quot; type=&quot;submit&quot;&gt;Continue to checkout&lt;/button&gt;
                                    &lt;/form&gt;
                                    &lt;/div&gt;
                                    &lt;/div&gt;</code></pre>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Forms