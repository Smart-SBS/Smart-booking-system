import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setThemeColor } from "../../Redux/actions/themeActions";
import { setLayout } from "../../Redux/actions/layoutActions";
import { setBorderStroke } from "../../Redux/actions/stokeActions";
import { setBorderLayout } from "../../Redux/actions/borderLayoutActions";
import { setBorderRadius, setBoxLayout, setIconColor, setMonoChrome } from "../../Redux/actions/moreSettingsActions";

const CommonSettings = () => {

    const dispatch = useDispatch();
    const [selectedLayout, setSelectedLayout] = useState('layout-default');
    const [borderStroke, setBorderStrok] = useState('svgstroke-a');
    const [theme, setTheme] = useState('AppleGreen');
    const [borderLayout, setBorderLayoutt] = useState('layout-border');
    const [boxLayout, setBoxLayoutt] = useState('none');
    const [monochrome, setMonoChrom] = useState('none');
    const [borderRadius, setBorderRadiuss] = useState('none');
    const [iconColor, setIconColorr] = useState('none');

    const ValenciaRed = theme === 'ValenciaRed';
    const SunOrange = theme === 'SunOrange';
    const AppleGreen = theme === 'AppleGreen';
    const CeruleanBlue = theme === 'CeruleanBlue';
    const Mariner = theme === 'Mariner';
    const PurpleHeart = theme === 'PurpleHeart';
    const FrenchRose = theme === 'FrenchRose';
    const Sitter = theme === 'Sitter';

    useEffect(() => {
        dispatch(setThemeColor(theme));
        dispatch(setLayout(selectedLayout));
        dispatch(setBorderStroke(borderStroke));
        dispatch(setBorderLayout(borderLayout));
        dispatch(setBoxLayout(boxLayout));
        dispatch(setMonoChrome(monochrome));
        dispatch(setBorderRadius(borderRadius));
        dispatch(setIconColor(iconColor));
    }, [theme, selectedLayout, borderStroke, borderLayout, boxLayout, monochrome, borderRadius, iconColor]);

    const handleLayoutChange = (e) => {
        setSelectedLayout(e.target.value);
    };

    const handleStrockChange = (e) => {
        setBorderStrok(e.target.value);
    }

    //More App Setting
    const toggleBoxLayout = () => {
        if (boxLayout === 'none') {
            setBoxLayoutt('box-layout rightbar-hide')
        } else {
            setBoxLayoutt('none')
        }
    };

    const toggleMonochrome = () => {
        if (monochrome === 'none') {
            setMonoChrom('monochrome')
        } else {
            setMonoChrom('none')
        }
    };

    const toggleBorderRadius = () => {
        if (borderRadius === 'none') {
            setBorderRadiuss('radius-0')
        } else {
            setBorderRadiuss('none')
        }
    };

    const toggleIconColor = () => {
        if (iconColor === 'none') {
            setIconColorr('icon-color')
        } else {
            setIconColorr('none')
        }
    };

    const toggleCardShadow = () => {
        const elements = document.getElementsByClassName('card');
        const ele = document.getElementById('BoxShadow').checked;

        for (let i = 0; i < elements.length; i++) {
            if (ele) {
                elements[i].classList.add("shadow-active");
            } else {
                elements[i].classList.remove("shadow-active");
            }
        }
    };

    //Layout Section Ligh/Dark
    const toggleTheme = (elementId) => {
        const element = document.getElementById(elementId);

        if (element) {
            if (element.getAttribute('data-bs-theme') === 'none') {
                element.setAttribute('data-bs-theme', 'dark');
            } else {
                element.setAttribute('data-bs-theme', 'none');
            }
        }
    };

    const toggleBorderLayout = () => {
        if (borderLayout === 'none') {
            setBorderLayoutt('layout-border')
        } else {
            setBorderLayoutt('none')
        }
    };

    const toggleBrand = () => {
        toggleTheme('brand');
    };

    const toggleSidebar = () => {
        toggleTheme('sidebar');
    };

    const toggleHeaderDark = () => {
        toggleTheme('headerbarDark');
    };

    const toggleBreadcrumb = () => {
        toggleTheme('breadcrumb');
    };

    const toggleRightbar = () => {
        toggleTheme('rightbar');
    };

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvas_setting" aria-labelledby="offcanvas_setting">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">Template Setting</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" ></button>
            </div>
            <div className="offcanvas-body">
                <div className="mb-4">
                    <h6>Set Theme Color</h6>
                    <ul className="choose-skin list-unstyled mb-0">
                        <li className={`${ValenciaRed ? 'active' : ''}`} onClick={() => setTheme('ValenciaRed')} data-theme="ValenciaRed"><div style={{ "--bvite-theme-color": "#D63B38" }}></div></li>
                        <li className={`${SunOrange ? 'active' : ''}`} onClick={() => setTheme('SunOrange')} data-theme="SunOrange"><div style={{ "--bvite-theme-color": "#F7A614" }}></div></li>
                        <li className={`${AppleGreen ? 'active' : ''}`} onClick={() => setTheme('AppleGreen')} data-theme="AppleGreen"><div style={{ "--bvite-theme-color": "#5BC43A" }}></div></li>
                        <li className={`${CeruleanBlue ? 'active' : ''}`} onClick={() => setTheme('CeruleanBlue')} data-theme="CeruleanBlue"><div style={{ "--bvite-theme-color": "#00B8D6" }}></div></li>
                        <li className={`${Mariner ? 'active' : ''}`} onClick={() => setTheme('Mariner')} data-theme="Mariner"><div style={{ "--bvite-theme-color": "#0066FE" }}></div></li>
                        <li className={`${PurpleHeart ? 'active' : ''}`} onClick={() => setTheme('PurpleHeart')} data-theme="PurpleHeart" ><div style={{ "--bvite-theme-color": "#6238B3" }}></div></li>
                        <li className={`${FrenchRose ? 'active' : ''}`} onClick={() => setTheme('FrenchRose')} data-theme="FrenchRose"><div style={{ "--bvite-theme-color": "#EB5393" }}></div></li>
                        <li className={`${Sitter ? 'active' : ''}`} onClick={() => setTheme('Sitter')} data-theme="Sitter"><div style={{ "--bvite-theme-color": "#351d31" }}></div></li>
                    </ul>
                </div>
                <div className="layout-option mb-4">
                    <h6>Template Layouts</h6>
                    <div>
                        <label><input value="layout-default" type="radio" checked={selectedLayout == 'layout-default'} onChange={handleLayoutChange} /><span className="px-2">Default</span></label>
                        <label><input value="layout-a" type="radio" checked={selectedLayout == 'layout-a'} onChange={handleLayoutChange} /><span className="px-2">Layout A</span></label>
                        <label><input value="layout-b" type="radio" checked={selectedLayout == 'layout-b'} onChange={handleLayoutChange} /><span className="px-2">Layout B</span></label>
                        {/* <label><input value="layout-c" type="radio"/><span className="px-2">Layout C</span></label> */}
                    </div>
                </div>
                <div className="svg-stroke mb-4">
                    <h6>Icon Border Stroke</h6>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input checked={borderStroke == 'svgstroke-a'} onChange={handleStrockChange} type="radio" className="btn-check" id="Stroke_A" value="svgstroke-a" />
                        <label className="btn btn-outline-primary" htmlFor="Stroke_A">Stroke 1</label>

                        <input checked={borderStroke == 'svgstroke-b'} onChange={handleStrockChange} type="radio" className="btn-check" id="Stroke_B" value="svgstroke-b" />
                        <label className="btn btn-outline-primary" htmlFor="Stroke_B">Stroke 2</label>

                        <input checked={borderStroke == 'svgstroke-c'} onChange={handleStrockChange} type="radio" className="btn-check" id="Stroke_C" value="svgstroke-c" />
                        <label className="btn btn-outline-primary" htmlFor="Stroke_C">Stroke 3</label>
                    </div>
                </div>
                <div className="mb-4">
                    <h6>Layout Section Ligh/Dark</h6>
                    <ul className="list-unstyled d-flex flex-wrap">
                        <li className="me-2 mb-2 border-toggle">
                            <input type="checkbox" className="btn-check" id="boder_layout" onClick={toggleBorderLayout} defaultChecked />
                            <label className="btn btn-outline-primary" htmlFor="boder_layout">Layout Border</label>
                        </li>
                        <li className="me-2 mb-2 brand-toggle">
                            <input type="checkbox" className="btn-check" id="brand_dark" onClick={toggleBrand} />
                            <label className="btn btn-outline-primary" htmlFor="brand_dark" >Brand</label>
                        </li>
                        <li className="me-2 mb-2 sidebar-toggle" >
                            <input type="checkbox" className="btn-check" id="Sidebar_dark" onClick={toggleSidebar} />
                            <label className="btn btn-outline-primary" htmlFor="Sidebar_dark" >Sidebar</label>
                        </li>
                        <li className="me-2 mb-2 header-toggle">
                            <input type="checkbox" className="btn-check" id="Header_dark" onClick={toggleHeaderDark} />
                            <label className="btn btn-outline-primary" htmlFor="Header_dark">Header</label>
                        </li>
                        <li className="me-2 mb-2 pheader-toggle">
                            <input type="checkbox" className="btn-check" id="pheader_dark" onClick={toggleBreadcrumb} />
                            <label className="btn btn-outline-primary" htmlFor="pheader_dark">breadcrumb</label>
                        </li>
                        <li className="me-2 mb-2 rightbar-toggle">
                            <input type="checkbox" className="btn-check" id="Rightbar_dark" onClick={toggleRightbar} />
                            <label className="btn btn-outline-primary" htmlFor="Rightbar_dark">Rightbar</label>
                        </li>
                    </ul>
                </div>
                <div className="mb-4">
                    <h6>More App Setting</h6>
                    <div className="form-check form-switch boxlayout-toggle">
                        <input className="form-check-input" type="checkbox" role="switch" id="boxlayout" onClick={toggleBoxLayout} />
                        <label className="form-check-label" htmlFor="boxlayout">Box Layout</label>
                    </div>
                    <div className="form-check form-switch monochrome-toggle">
                        <input className="form-check-input fs-6" type="checkbox" role="switch" id="monochrome" onClick={toggleMonochrome} />
                        <label className="form-check-label" htmlFor="monochrome">Monochrome Mode</label>
                    </div>
                    {/* <div className="form-check form-switch gradient-active">
                    <input className="form-check-input fs-6" type="checkbox" role="switch" id="gradient-active"/>
                    <label className="form-check-label" htmlFor="gradient-active">Gradient Active</label>
                </div> */}
                    <div className="form-check form-switch radius-toggle" onClick={toggleBorderRadius}>
                        <input className="form-check-input fs-6" type="checkbox" role="switch" id="radius0" />
                        <label className="form-check-label" htmlFor="radius0">Border Radius none</label>
                    </div>
                    <div className="form-check form-switch svg-icon-color">
                        <input className="form-check-input fs-6" type="checkbox" role="switch" id="IconColor" onClick={toggleIconColor} />
                        <label className="form-check-label" htmlFor="IconColor">Sidebar Icon color</label>
                    </div>
                    <div className="form-check form-switch cb-shadow">
                        <input className="form-check-input fs-6" type="checkbox" role="switch" id="BoxShadow" onClick={toggleCardShadow} />
                        <label className="form-check-label" htmlFor="BoxShadow">Card box shadow active</label>
                    </div>
                </div>
                <div className="d-flex">
                    <button type="button" className="btn w-100 me-1 py-2 btn-primary">Buy Now</button>
                    <button type="button" className="btn w-100 ms-1 py-2 btn-dark">View Portfolio</button>
                </div>
            </div>
        </div>
    )
}

export default CommonSettings