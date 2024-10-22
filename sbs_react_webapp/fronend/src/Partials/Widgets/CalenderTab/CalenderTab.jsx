import React from 'react'

const CalenderTab = () => {

    const handleScroll = (evt) => {
        const scrollContainer = document.querySelector(".calendar-tab .nav");
        scrollContainer.scrollLeft += evt.deltaY;
    };

    return (
        <div className="calendar-tab">
            <ul className="nav nav-pills text-muted text-uppercase" role="tablist" onWheel={handleScroll}>
                <li className="nav-item">
                    Sun
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_1" type="button" role="tab">01</button>
                </li>
                <li className="nav-item">
                    Mon
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_2" type="button" role="tab">02</button>
                </li>
                <li className="nav-item">
                    Tue
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_3" type="button" role="tab">03</button>
                </li>
                <li className="nav-item">
                    Wed
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_4" type="button" role="tab">04</button>
                </li>
                <li className="nav-item">
                    Thu
                    <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#c_date_5" type="button" role="tab">05</button>
                </li>
                <li className="nav-item">
                    Fri
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_6" type="button" role="tab">06</button>
                </li>
                <li className="nav-item">
                    Sat
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_7" type="button" role="tab">07</button>
                </li>
                <li className="nav-item">
                    Sun
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_8" type="button" role="tab">08</button>
                </li>
                <li className="nav-item">
                    Mon
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_9" type="button" role="tab">09</button>
                </li>
                <li className="nav-item">
                    Tue
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_10" type="button" role="tab">10</button>
                </li>
                <li className="nav-item">
                    Wed
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_11" type="button" role="tab">11</button>
                </li>
                <li className="nav-item">
                    Thu
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_12" type="button" role="tab">12</button>
                </li>
                <li className="nav-item">
                    Fri
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_13" type="button" role="tab">13</button>
                </li>
                <li className="nav-item">
                    Sat
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_14" type="button" role="tab">14</button>
                </li>
                <li className="nav-item">
                    Sun
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_15" type="button" role="tab">15</button>
                </li>
                <li className="nav-item">
                    Sun
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_16" type="button" role="tab">16</button>
                </li>
                <li className="nav-item">
                    Mon
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_17" type="button" role="tab">17</button>
                </li>
                <li className="nav-item">
                    Tue
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_18" type="button" role="tab">18</button>
                </li>
                <li className="nav-item">
                    Wed
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_19" type="button" role="tab">19</button>
                </li>
                <li className="nav-item">
                    Thu
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_20" type="button" role="tab">20</button>
                </li>
                <li className="nav-item">
                    Fri
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_21" type="button" role="tab">21</button>
                </li>
                <li className="nav-item">
                    Sat
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_22" type="button" role="tab">22</button>
                </li>
                <li className="nav-item">
                    Sun
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_23" type="button" role="tab">23</button>
                </li>
                <li className="nav-item">
                    Mon
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_24" type="button" role="tab">24</button>
                </li>
                <li className="nav-item">
                    Tue
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_25" type="button" role="tab">25</button>
                </li>
                <li className="nav-item">
                    Wed
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_26" type="button" role="tab">26</button>
                </li>
                <li className="nav-item">
                    Thu
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_27" type="button" role="tab">27</button>
                </li>
                <li className="nav-item">
                    Fri
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_28" type="button" role="tab">28</button>
                </li>
                <li className="nav-item">
                    Sat
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_29" type="button" role="tab">29</button>
                </li>
                <li className="nav-item">
                    Sun
                    <button className="nav-link" data-bs-toggle="pill" data-bs-target="#c_date_30" type="button" role="tab">30</button>
                </li>
            </ul>
        </div>
    )
}

export default CalenderTab