import React from 'react'

const CardTiles = () => {
    return (
        <div className="px-4 py-3 page-body">
            <h4 className="mb-4">Widgets card tiles</h4>
            <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-3 mb-3">
                <div className="col-lg-2 col-md-4 col-6">
                    <div className="card card-social" style={{ "--dynamic-color": "#1877F2" }}>
                        <div className="card-body d-flex align-items-center">
                            <i className="fa fa-facebook fa-2x"></i>
                            <div className="content ms-3">
                                <div className="text">Like</div>
                                <div className="number">123</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                    <div className="card card-social" style={{ "--dynamic-color": "#E4405F" }}>
                        <div className="card-body d-flex align-items-center">
                            <i className="fa fa-instagram fa-2x"></i>
                            <div className="content ms-3">
                                <div className="text">Followers</div>
                                <div className="number">231</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                    <div className="card card-social" style={{ "--dynamic-color": "#1DA1F2" }}>
                        <div className="card-body d-flex align-items-center">
                            <i className="fa fa-twitter fa-2x"></i>
                            <div className="content ms-3">
                                <div className="text">Followers</div>
                                <div className="number">31</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                    <div className="card card-social" style={{ "--dynamic-color": "#ea4335" }}>
                        <div className="card-body d-flex align-items-center">
                            <i className="fa fa-google fa-2x"></i>
                            <div className="content ms-3">
                                <div className="text">Like</div>
                                <div className="number">254</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                    <div className="card card-social" style={{ "--dynamic-color": "#0A66C2" }}>
                        <div className="card-body d-flex align-items-center">
                            <i className="fa fa-linkedin fa-2x"></i>
                            <div className="content ms-3">
                                <div className="text">Followers</div>
                                <div className="number">2510</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                    <div className="card card-social" style={{ "--dynamic-color": "#1769ff" }}>
                        <div className="card-body d-flex align-items-center">
                            <i className="fa fa-behance fa-2x"></i>
                            <div className="content ms-3">
                                <div className="text">Project</div>
                                <div className="number">121</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row-cols-xl-6 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-3 mb-3">
                <div className="col">
                    <div className="card cardtext-color" style={{ "--dynamic-color": "var(--theme-color1)" }}>
                        <div className="card-body">
                            <span className="text-truncate">Users</span>
                            <h3 className="mb-0 mt-1">$5.37</h3>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card cardtext-color" style={{ "--dynamic-color": "var(--theme-color2)" }}>
                        <div className="card-body">
                            <span>Uploads</span>
                            <h3 className="mb-0 mt-1">457</h3>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card cardtext-color" style={{ "--dynamic-color": "var(--theme-color3)" }}>
                        <div className="card-body">
                            <span>Feeds</span>
                            <h3 className="mb-0 mt-1">8,120</h3>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card cardtext-color" style={{ "--dynamic-color": "var(--theme-color4)" }}>
                        <div className="card-body">
                            <span>Comments</span>
                            <h3 className="mb-0 mt-1">481</h3>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card cardtext-color" style={{ "--dynamic-color": "var(--theme-color5)" }}>
                        <div className="card-body">
                            <span>New items</span>
                            <h3 className="mb-0 mt-1">458</h3>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card cardtext-color" style={{ "--dynamic-color": "var(--theme-color6)" }}>
                        <div className="card-body">
                            <span>New items</span>
                            <h3 className="mb-0 mt-1">458</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-3 mb-3">
                <div className="col">
                    <div className="card card-border" style={{ "--dynamic-color": "var(--bs-indigo)" }}>
                        <div className="card-body d-flex justify-content-between">
                            <div className="state">
                                <h4 className="mb-0">62%</h4>
                                <span>Server</span>
                            </div>
                            <i className="fa fa-database fa-2x"></i>
                        </div>
                        <div className="card-footer py-2 small">
                            6.2% higher than last month
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-border" style={{ "--dynamic-color": "var(--bs-pink)" }}>
                        <div className="card-body d-flex justify-content-between">
                            <div className="state">
                                <h4 className="mb-0">45%</h4>
                                <span>Traffic</span>
                            </div>
                            <i className="fa fa-users fa-2x"></i>
                        </div>
                        <div className="card-footer py-2 small">
                            5.8% higher than last month
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-border" style={{ "--dynamic-color": "var(--bs-orange)" }}>
                        <div className="card-body d-flex justify-content-between">
                            <div className="state">
                                <h4 className="mb-0">162</h4>
                                <span>Email</span>
                            </div>
                            <i className="fa fa-envelope fa-2x"></i>
                        </div>
                        <div className="card-footer py-2 small">
                            11% higher than last month
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-border" style={{ "--dynamic-color": "var(--bs-teal)" }}>
                        <div className="card-body d-flex justify-content-between">
                            <div className="state">
                                <h4 className="mb-0">12</h4>
                                <span>Domians</span>
                            </div>
                            <i className="fa fa-hand-o-left fa-2x"></i>
                        </div>
                        <div className="card-footer py-2 small">
                            3.5% higher than last month
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-border" style={{ "--dynamic-color": "var(--bs-blue)" }}>
                        <div className="card-body d-flex justify-content-between">
                            <div className="state">
                                <h4 className="mb-0">10k</h4>
                                <span>Page Views</span>
                            </div>
                            <i className="fa fa-eye fa-2x"></i>
                        </div>
                        <div className="card-footer py-2 small">
                            7% higher than last month
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 g-3 mb-3">
                <div className="col">
                    <div className="card card-avatar" style={{ "--dynamic-color": "#845ec2" }}>
                        <div className="card-body d-flex align-items-center">
                            <div className="avatar lg rounded-circle no-thumbnail"><i className="fa fa-cc-mastercard"></i></div>
                            <div className="ms-3">
                                <span>Total Likes</span>
                                <h5 className="mb-0">952</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-avatar" style={{ "--dynamic-color": "#d65db1" }}>
                        <div className="card-body d-flex align-items-center">
                            <div className="avatar lg rounded-circle no-thumbnail"><i className="fa fa-cc-mastercard"></i></div>
                            <div className="ms-3">
                                <span>Properties</span>
                                <h5 className="mb-0">52</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-avatar" style={{ "--dynamic-color": "#2c73d2" }}>
                        <div className="card-body d-flex align-items-center">
                            <div className="avatar lg rounded-circle no-thumbnail"><i className="fa fa-cc-mastercard"></i></div>
                            <div className="ms-3">
                                <span>Growth</span>
                                <h5 className="mb-0">23%</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-avatar" style={{ "--dynamic-color": "#ff8066" }}>
                        <div className="card-body d-flex align-items-center">
                            <div className="avatar lg rounded-circle no-thumbnail"><i className="fa fa-cc-mastercard"></i></div>
                            <div className="ms-3">
                                <span>Rented</span>
                                <h5 className="mb-0">3,525</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card card-avatar" style={{ "--dynamic-color": "#00c9a7" }}>
                        <div className="card-body d-flex align-items-center">
                            <div className="avatar lg rounded-circle no-thumbnail"><i className="fa fa-cc-mastercard"></i></div>
                            <div className="ms-3">
                                <span>Total Sales</span>
                                <h5 className="mb-0">$3,852</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTiles