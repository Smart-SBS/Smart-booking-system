import React from 'react'
import { Dropdown } from 'react-bootstrap'

const PageHeaderAction = ({ toggleRightbar }) => {
    return (
        <>
            <Dropdown className="pe-3 col-auto">
                <div className="vr d-none d-sm-flex h-100 mx-sm-2"></div>
            </Dropdown>
            <Dropdown className="d-none d-xxl-inline-flex">
                <Dropdown.Toggle as="button" className="btn px-0 rightbar-toggle hide-toggle" type="button" onClick={toggleRightbar}>
                    <svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                        <path d="M15 4v16"></path>
                        <path d="M9 10l2 2l-2 2"></path>
                    </svg>
                </Dropdown.Toggle>
            </Dropdown>
            <Dropdown className="d-inline-flex d-xxl-none">
                <Dropdown.Toggle as="button" className="btn border-0 p-0 hide-toggle" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_rightbar">
                    <svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                        <path d="M15 4v16"></path>
                        <path d="M9 10l2 2l-2 2"></path>
                    </svg>
                </Dropdown.Toggle>
            </Dropdown>
        </>
    )
}

export default PageHeaderAction