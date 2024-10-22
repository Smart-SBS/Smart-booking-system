import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

import CardAction from '../../Widgets/CardAction/CardAction';

import gallery1 from '../../../assets/images/gallery/1.jpg';
import { Link } from 'react-router-dom';

const Sweetalert2 = () => {

    useEffect(() => {
        document.querySelector('.sa-basic').addEventListener('click', function () {
        Swal.fire('Our First Alert');
        });
        document.querySelector('.sa-title-text').addEventListener('click', function () {
        Swal.fire({
            title: 'The Internet?',
            text: 'That thing is still around?',
            icon: 'question',
        });
        });
        document.querySelector('.sa-title-error').addEventListener('click', function () {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>',
        });
        });
        document.querySelector('.sa-buttons').addEventListener('click', function () {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: "Don't save",
        }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success');
        } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
        }
        });
        });
        document.querySelector('.sa-position').addEventListener('click', function () {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
        });
        });
        document.querySelector('.sa-image').addEventListener('click', function () {
        Swal.fire({
            title: 'Sweet!',
            text: 'Modal with a custom image.',
            imageUrl: gallery1,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        });
        });
        document.querySelector('.sa-autoclose').addEventListener('click', function () {
        let timerInterval;
        Swal.fire({
            title: 'Auto close alert!',
            html: 'I will close in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
            }, 100);
            },
            willClose: () => {
            clearInterval(timerInterval);
            },
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer');
            }
        });
        });
        document.querySelector('.sa-ajax').addEventListener('click', function () {
        Swal.fire({
            title: 'Submit your Github username',
            input: 'text',
            inputAttributes: {
            autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
            return fetch(`//api.github.com/users/${login}`)
                .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
                })
                .catch((error) => {
                Swal.showValidationMessage(`Request failed: ${error}`);
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire({
                title: `${result.value.login}'s avatar`,
                imageUrl: result.value.avatar_url,
            });
            }
        });
        });
    }, []);

    const sweetAlertCode = `
    import Swal from 'sweetalert2';

    useEffect(() => {
        document.querySelector('.sa-basic').addEventListener('click', function () {
            Swal.fire('Our First Alert');
        });
    }, []);

    return (
        <button className="btn btn-primary sa-basic">Click me</button>
    )
  `;

  return (
        <div className="px-4 py-3 page-body">
			<div className="card border-0 bg-transparent">
				<div className="card-header mb-4 border-bottom px-0">
					<h5 className="card-title mb-0 text-primary">Sweetalert2</h5>
					<div className="dropdown card-action">
                        <CardAction/>
					</div>
				</div>
				<div className="card-body p-0">
                    <div className="row g-xl-4 g-3 mb-4">
                        <div className="col-12">
							<h6>How to use</h6>
							<p className="lead">A beautiful, responsive, customizable, accessible (WAI-ARIA) replacement for JavaScript's popup boxes. Zero dependencies.</p>
                            <div className="rounded-4" data-lang="html">
                                <pre className='h6 language-html text-primary'><code>{sweetAlertCode}</code></pre>
                            </div>
                        </div>
                    </div>
					<ul className="row g-3 list-unstyled">
						<li className="col-lg-6 col-md-12">
							<div className="card">
								<div className="card-body">
									<h6>A basic message</h6>
									<button className="btn btn-primary sa-basic">Click me</button>
								</div>
							</div>
						</li>
						<li className="col-lg-6 col-md-12">
							<div className="card">
								<div className="card-body">
									<h6>A title with a text under</h6>
									<button className="btn btn-primary sa-title-text">Click me</button>
								</div>
							</div>
						</li>
						<li className="col-lg-6 col-md-12">
							<div className="card">
								<div className="card-body">
									<h6>A dialog with three buttons</h6>
									<button className="btn btn-primary sa-buttons">Click me</button>
								</div>
							</div>
						</li>
						<li className="col-lg-6 col-md-12">
							<div className="card">
								<div className="card-body">
									<h6>A custom positioned dialog</h6>
									<button className="btn btn-primary sa-position">Click me</button>
								</div>
							</div>
						</li>
						<li className="col-lg-6 col-md-12">
							<div className="card">
								<div className="card-body">
									<h6>A message with a custom image</h6>
									<button className="btn btn-primary sa-image">Click me</button>
								</div>
							</div>
						</li>
						<li className="col-lg-6 col-md-12">
							<div className="card">
								<div className="card-body">
									<h6>A message with auto close timer</h6>
									<button className="btn btn-primary sa-autoclose">Click me</button>
								</div>
							</div>
						</li>
						<li className="col-lg-6 col-md-12">
							<div className="card">
								<div className="card-body">
									<h6>AJAX request example</h6>
									<button className="btn btn-primary sa-ajax">Click me</button>
								</div>
							</div>
						</li>
						<li className="col-lg-6 col-md-12">
							<div className="card">
								<div className="card-body">
									<h6>A modal with a title, an error icon, a text, and a footer</h6>
									<button className="btn btn-primary sa-title-error">Click me</button>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div className="card-footer px-0 mt-4">
					<div className="btn-group d-flex">
						<Link className="btn btn-lg btn-outline-secondary text-start" to="/docs/sortablejs">
							<span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M5 12l6 6"></path>
									<path d="M5 12l6 -6"></path>
								</svg>
								<span>Previous</span>
							</span>
							<h5 className="mb-0 ps-4">Sortablejs</h5>
						</Link>
						<Link className="btn btn-lg btn-outline-secondary text-end" to="/docs/tagify">
							<span>
								<span>Next</span>
								<svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5 12l14 0"></path>
									<path d="M13 18l6 -6"></path>
									<path d="M13 6l6 6"></path>
								</svg>
							</span>
							<h5 className="mb-0 pe-4">Tagify</h5>
						</Link>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Sweetalert2