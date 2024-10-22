import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSelectedMod } from '../../Redux/actions/moreSettingsActions';
import UserDropdown from '../../Partials/Widgets/UserDropdown/UserDropdown';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast';

const CommonHeader = () => {

    const dispatch = useDispatch();
    const [selectedMode, setSelectedMode] = useState('light');
    const [userData, setUserData] = useState({})
    const token = localStorage.getItem("jwtToken");
    const Img_url = import.meta.env.VITE_IMG_URL
    const APP_URL = import.meta.env.VITE_API_URL || '/api';

    const setThemeMode = (mode) => {
        setSelectedMode(mode);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const decoded = jwtDecode(token);
                const { user_id } = decoded.data;
                const res = await axios.get(`${APP_URL}/api/user-details/${user_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                if (res.data.status === 200) {
                    setUserData(res.data.user);
                }
            } catch (error) {
                toast.error("Error fetching user data:", error);
            }
        };

        if (token) {
            fetchUser();
        }
    }, [APP_URL, token]);

    let iconId;
    switch (selectedMode) {
        case 'light':
            iconId = 'sun-fill';
            break;
        case 'dark':
            iconId = 'moon-stars-fill';
            break;
        case 'auto':
            iconId = 'circle-half';
            break;
        default:
            iconId = 'sun-fill';
    }

    useEffect(() => {
        dispatch(setSelectedMod(selectedMode));
    }, [dispatch, selectedMode]);

    return (
        <>
            <header className="px-4" id='headerbarDark' data-bs-theme="none">
                <div className="d-flex justify-content-between align-items-center py-2 w-100">
                    <ul className="header-menu flex-grow-1">
                        {/* <!--[ Start:: notification ]--> */}
                        <li className="nav-item dropdown px-md-1 d-none d-md-inline-flex">
                            <a className="dropdown-toggle gray-6" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" title="notification">
                                <span className="bullet-dot bg-primary animation-blink"></span>
                                <svg className="svg-stroke" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"></path>
                                    <path d="M9 17v1a3 3 0 0 0 6 0v-1"></path>
                                    <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727"></path>
                                    <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727"></path>
                                </svg>
                            </a>
                            <div className="dropdown-menu shadow rounded-4 notification" id="NotificationsDiv">
                                <div className="card border-0">
                                    <div className="card-header d-flex justify-content-between align-items-center py-3">
                                        <h4 className="mb-0 text-gradient title-font">Notifications</h4>
                                        <a href="#" className="btn btn-link" title="view all">View all</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item py-2 py-md-1 col-auto">
                            <div className="vr d-none d-sm-flex h-100 mx-sm-2"></div>
                        </li>
                        {/* <!--[ Start:: theme light/dark ]--> */}
                        <li className="nav-item dropdown px-md-1">
                            <a className="dropdown-toggle gray-6" href="#" id="bd-theme" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="theme-icon-active"><use href={`#${iconId}`}></use></svg>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end p-2 p-xl-3 shadow rounded-4" aria-labelledby="bd-theme">
                                <li className="mb-1"><a className={`dropdown-item rounded-pill ${selectedMode === 'light' ? 'active' : ''}`} href="#" data-bs-theme-value="light" onClick={() => setThemeMode('light')}><svg className="avatar xs me-2 opacity-50 theme-icon" fill="currentColor"><use href="#sun-fill"></use></svg> Light</a></li>
                                <li className="mb-1"><a className={`dropdown-item rounded-pill ${selectedMode === 'dark' ? 'active' : ''}`} href="#" data-bs-theme-value="dark" onClick={() => setThemeMode('dark')}><svg className="avatar xs me-2 opacity-50 theme-icon" fill="currentColor"><use href="#moon-stars-fill"></use></svg> Dark</a></li>
                                <li className="mb-1"><a className={`dropdown-item rounded-pill ${selectedMode === 'auto' ? 'active' : ''}`} href="#" data-bs-theme-value="auto" onClick={() => setThemeMode('auto')}><svg className="avatar xs me-2 opacity-50 theme-icon" fill="currentColor"><use href="#circle-half"></use></svg> Auto</a></li>
                            </ul>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ display: "none" }}>
                                <symbol id="sun-fill" viewBox="0 0 16 16">
                                    <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                                </symbol>
                                <symbol id="moon-stars-fill" viewBox="0 0 16 16">
                                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
                                    <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
                                </symbol>
                                <symbol id="circle-half" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
                                </symbol>
                            </svg>
                        </li>
                        {/* <!--[ Start:: theme setting ]--> */}
                        <li className="nav-item py-2 py-md-1 col-auto">
                            <div className="vr d-none d-sm-flex h-100 mx-sm-2"></div>
                        </li>
                        {/* <!--[ Start:: user detail ]--> */}
                        <li className="nav-item user ms-3">
                            <Link className="dropdown-toggle gray-6 d-flex text-decoration-none align-items-center lh-sm p-0" to='/admin/user/my-profile' role="button" data-bs-toggle="dropdown" aria-expanded="false" title="User" data-bs-auto-close="outside">
                                <img
                                    src={userData?.profile_pic ? `${Img_url}/profile/list/${userData.profile_pic}` : `${Img_url}/default/list/user.webp`}
                                    alt={userData?.firstname || "User profile"}
                                    className="me-2 avatar rounded-circle border border-3"
                                    onError={(e) => { e.target.src = `${Img_url}/default/list/user.webp`; }}
                                />
                                <span className="ms-2 fs-6 d-none d-sm-inline-flex">{userData.firstname}</span>
                            </Link>
                            <UserDropdown />
                        </li>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default CommonHeader