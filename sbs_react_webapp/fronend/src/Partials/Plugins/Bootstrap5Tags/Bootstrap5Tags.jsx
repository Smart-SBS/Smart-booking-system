import React, { useEffect } from 'react'
import CardAction from '../../Widgets/CardAction/CardAction';
import Tags from "bootstrap5-tags";
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

const Bootstrap5Tags = () => {

    useEffect(() => {
        Tags.init("select");
      }, []);
    
    const htmlCode = `
    import Tags from "bootstrap5-tags";

	useEffect(() => {
		Tags.init("select");
	}, []);

	return (
		<label htmlFor="validationTags" class="form-label">Tags</label>
		<select class="form-select" id="validationTags" name="tags[]" multiple>
			<option  disabled hidden value="">Choose a tag...</option>
			<option value="1">Apple</option>
			<option value="2">Banana</option>
			<option value="3">Orange</option>
		</select>
		<div class="invalid-feedback">Please select a valid tag.</div>
	)
  `;
  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Bootstrap5 tags</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
                    <div className="row g-xl-4 g-3 mb-4">
                        <div className="col-12">
							<h6>How to use</h6>
							<p className="lead">An ES6 native replacement for select using standards Bootstrap 5 (and 4) styles. (almost) No additional CSS needed! Supports creation of new tags.</p>
                            <div className="rounded-4" data-lang="html">
                                <pre className='h6 language-html text-primary'><code>{htmlCode}</code></pre>
                            </div>
                        </div>
                    </div>
					<form className="needs-validation" noValidate method="get">
						<div className="row g-xl-4 g-3">
							<div className="col-lg-10 col-md-12">
								<label htmlFor="validationTags" className="form-label">Tags</label>
								<select className="form-select" id="validationTags" name="tags[]" multiple defaultValue={['1']}>
									<option  disabled hidden value="">Choose a tag...</option>
									<option value="1">Apple</option>
									<option value="2">Banana</option>
									<option value="3">Orange</option>
								</select>
								<div className="invalid-feedback">Please select a valid tag.</div>
							</div>
							<div className="col-lg-10 col-md-12">
								<label htmlFor="validationTagsClear" className="form-label">Tags (allow clear)</label>
								<select className="form-select" id="validationTagsClear" name="tagsClear[]" multiple defaultValue={['1']} data-allow-clear="true">
									<option  disabled hidden value="">Choose a tag...</option>
									<option value="1">Apple</option>
									<option value="2">Banana</option>
									<option value="3">Orange</option>
								</select>
								<div className="invalid-feedback">Please select a valid tag.</div>
							</div>
							<div className="col-lg-10 col-md-12">
								<label htmlFor="validationTagsThreshold" className="form-label">Tags (allow clear + 0 threshold)</label>
								<select className="form-select" id="validationTagsThreshold" name="tagsClearThreshold[]" multiple defaultValue={['1']} data-allow-clear="true" data-suggestions-threshold="0">
									<option  disabled hidden value="">Choose a tag...</option>
									<option value="1">Apple</option>
									<option value="2">Banana</option>
									<option value="3">Orange</option>
								</select>
								<div className="invalid-feedback">Please select a valid tag.</div>
							</div>
							<div className="col-lg-10 col-md-12">
								<label htmlFor="validationTagsShow" className="form-label">Tags (show all + custom color)</label>
								<select className="form-select" id="validationTagsShow" name="tags_show[]" multiple defaultValue={['1', '2']} data-show-all-suggestions="true">
									<option  disabled hidden value="">Choose a tag...</option>
									<option value="1">Apple</option>
									<option value="2" data-badge-style="success">Banana</option>
									<option value="3" data-badge-style="warning" data-badge-classname="text-dark">Orange</option>
									<option value="4" data-badge-style="secondary">Blueberry</option>
									<option value="5">Strawberry</option>
									<option value="6">Cranberry</option>
									<option value="7">Huckleberry</option>
									<option value="8">Chokeberry</option>
									<option value="9">Elderberry</option>
									<option value="10">Gooseberry</option>
									<option value="11">Blackberry</option>
									<option value="12">Raspberry</option>
									<option value="13">Goji berry</option>
									<option value="14">Salmon berry</option>
									<option value="15">Sumac berry</option>
								</select>
								<div className="invalid-feedback">Please select a valid tag.</div>
							</div>
							<div className="col-lg-10 col-md-12">
								<label htmlFor="validationTagsNew" className="form-label">Tags (allow new)</label>
								<select className="form-select" id="validationTagsNew" name="tags_new[]" multiple defaultValue={['1']} data-allow-new="true">
									<option  disabled hidden value="">Choose a tag...</option>
									<option value="1">Apple</option>
									<option value="2">Banana</option>
									<option value="3">Orange</option>
									</select>
								<div className="invalid-feedback">Please select a valid tag.</div>
							</div>
							<div className="col-lg-10 col-md-12">
								<label htmlFor="singleTags" className="form-label">Tags (single)</label>
								<select className="form-select" id="singleTags" name="tags_single" data-allow-clear="1" data-suggestions-threshold="0">
									<option disabled hidden value="">Choose a tag...</option>
									<option value="1">Apple</option>
									<option value="2">Banana</option>
									<option value="3">Orange</option>
								</select>
							</div>
							<div className="col-lg-10 col-md-12">
								<label htmlFor="separatorTags" className="form-label">Tags (with space and comma separator)</label>
								<select className="form-select" id="separatorTags" name="tags_separator[]" multiple data-allow-new="true" data-separator=" |,|  ">
									<option value="">Type a tag...</option>
								</select>
							</div>
							<div className="col-lg-10 col-md-12">
								<input type="reset" defaultValue="Reset" className="btn btn-outline-dark me-1" />
								<button className="btn btn-primary" type="button">Submit form</button>
							</div>
						</div>
					</form>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/peity">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Peity chart</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/datatables">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Datatables</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Bootstrap5Tags