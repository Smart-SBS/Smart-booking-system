import React, { useEffect } from 'react'
import Tagify from '@yaireo/tagify';

import CardAction from '../../Widgets/CardAction/CardAction';

import 'prismjs/themes/prism.css';
import { Link } from 'react-router-dom';

const TagifyC = () => {

    useEffect(() => {
        const inputEl1 = document.querySelector('input[name=basic]');
        if (inputEl1) {
          new Tagify(inputEl1);
        }

        const inputEl2 = document.querySelector('input[name=input-custom-dropdown]');
        if (inputEl2) {
        new Tagify(inputEl2, {
            whitelist: ["css", "html", "javascript"],
            dropdown: {
            enabled: 1,
            },
        });
        }

        const textareaEl = document.querySelector('textarea[name=tags2]');
        if (textareaEl) {
        new Tagify(textareaEl, {
            enforceWhitelist: true,
            whitelist: [
            "The Godfather",
            "The Matrix",
            ],
        });
        }

        const inputEl3 = document.querySelector('.customLook');
        if (inputEl3) {
        new Tagify(inputEl3);
        }

        const inputEl4 = document.querySelector('input[name=users-list-tags]');
        if (inputEl4) {
        new Tagify(inputEl4, {
            dropdown: {
            enabled: 1,
            maxItems: 1, // Allow only one item from the dropdown to be added
            position: "text",
            closeOnSelect: false,
            },
            whitelist: ["abatisse2@nih.gov", "Justinian Hattersley"], // Whitelisted suggestions
        });
        }

        const inputEl5 = document.querySelector('input[name=tags3]');
        if (inputEl5) {
        new Tagify(inputEl5, {
            dropdown: {
            enabled: 1,
            maxItems: 6, // Set maximum number of tags to 6
            position: "input",
            closeOnSelect: false,
            highlightFirst: true,
            },
        });
        }
    }, []);



    const tagifyCode = `
    import Tagify from '@yaireo/tagify';

    useEffect(() => {
        const inputEl = document.querySelector('input[name=basic]');
        if (inputEl) {
          new Tagify(inputEl);
        }
      }, []);

    return (
        <input name='basic' value='tag1, tag2 autofocus' />
    )
  `;

  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Tagify</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
                    <div className="row g-xl-4 g-3 mb-4">
                        <div className="col-12">
							<p className="lead">Transforms an input field or a textarea into a Tags component, in an easy, customizable way, with great performance and small code footprint, exploded with features. <a href="https://yaireo.github.io/tagify/" target="_blank">Tagify</a></p>
                            <div className="rounded-4 " data-lang="html">
                                <pre className='h6 language-html text-primary'><code>{tagifyCode}</code></pre>
                            </div>
						</div>
						<div className="col-12">
							<h5>Basic example</h5>
							<p>Passing the input element as a parameter to Tagify will transform it into a tags-component. Without any settings, the user will be allowed to create any tags they want, without a count limit.</p>
							<input name='basic' defaultValue='tag1, tag2 autofocus'/>
						</div>
						<div className="col-12">
							<h5>Same using custom suggestions:</h5>
							<p>The suggestions are styled as tags this time. Clicking on a suggested it, it will be added to Tagify</p>
							<input name='input-custom-dropdown' className='some_class_name' placeholder='write some tags' defaultValue='css, html, javascript'/>
						</div>
						<div className="col-12">
							<h5>Textarea</h5>
							<p>In this example, the field is pre-ocupied with 3 tags, and last tag is not included in the whitelist, and will be removed because the <code>enforceWhitelist</code> setting flag is set to <code>true</code></p>
							<textarea name='tags2' placeholder='Movie names' defaultValue='The Godfather, The Matrix' />
						</div>
						<div className="col-12">
							<h5>Easy to customize</h5>
							<p>The easiest way to customize styles (colors, borders, spacing, radii, etc.) is by using <a href="https://github.com/yairEO/tagify#css-variables" target="_blank">CSS variables.</a></p>
							<input className='customLook' defaultValue='some.name@website.com'/>
							<button type="button">+</button>
						</div>
						<div className="col-12">
							<h5>Users list</h5>
							<p>This example shows how to customize Tagify further. It also includes an Add All option as the first item in the suggestions dropdown list.</p>
							<input name='users-list-tags' defaultValue='abatisse2@nih.gov, Justinian Hattersley'/>
						</div>
						<div className="col-12">
							<h5>Advance options</h5>
							<p>In this example, the dropdown.enabled setting is set (minimum charactes typed to show the dropdown) to 3. Maximum number of tags is set to 6</p>
							<input name='tags3' defaultValue='[{"value":"point"}, {"value":"soft"}]' pattern='^[A-Za-z_✲ ]{1,15}$'/>
						</div>
                    </div>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/sweetalert2">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Sweetalert2</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/tiny-slider">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Tiny slider</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default TagifyC