import React from 'react';
import { useMatch } from 'react-router-dom';
import PageHeaderAction from './Components/PageHeaderAction';
import { routePatterns } from '../RoutePatterns/RoutePatterns'

const CommonBreadcrumb = ({ toggleSidebar, toggleRightbar }) => {

    let breadcrumbTitle = 'Unknown Page';

    routePatterns.forEach(({ pattern, title }) => {
        const match = useMatch(pattern);
        if (match) {
            breadcrumbTitle = title;
            if (match.params) {
                Object.entries(match.params).forEach(([key, value]) => {
                    breadcrumbTitle = breadcrumbTitle.replace(`:${key}`, value);
                });
            }
        }
    });

    return (
        <div className="px-4 py-2 page-header" id="breadcrumb" data-bs-theme="none">
            <div className="d-flex align-items-center">
                <button className="btn d-none d-xl-inline-flex me-3 px-0 sidebar-toggle" type="button" onClick={toggleSidebar}>
                    <svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                        <path d="M9 4v16"></path>
                        <path d="M15 10l-2 2l2 2"></path>
                    </svg>
                </button>
                <ol className="breadcrumb mb-0 bg-transparent">
                    <li className="breadcrumb-item active">
                        <span>{breadcrumbTitle}</span>
                    </li>
                </ol>
            </div>
            <ul className="list-unstyled action d-flex align-items-center mb-0">
                <PageHeaderAction toggleRightbar={toggleRightbar} />
            </ul>
        </div>
    );
};

export default CommonBreadcrumb;
