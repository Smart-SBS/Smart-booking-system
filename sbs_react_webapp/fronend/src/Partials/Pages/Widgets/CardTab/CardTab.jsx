import React from 'react'

const CardTab = () => {
    return (
        <div className="px-4 py-3 page-body">
            <h4 className="mb-4">Card tab design</h4>
            <div className="row g-3 row-deck" id="widget_tab">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header align-items-center">
                            <h5 className="card-title mb-0">This is a standard card</h5>
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex" role="tablist" style={{ "--dynamic-color": "var(--theme-color1)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="tab_home" role="tabpanel">
                                    <p><strong>This is some placeholder content the Home tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                                </div>
                                <div className="tab-pane fade" id="tab_profile" role="tabpanel">
                                    <p><strong>This is some placeholder content the Profile tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                                </div>
                                <div className="tab-pane fade" id="tab_contact" role="tabpanel">
                                    <p><strong>This is some placeholder content the Contact tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex m-1" role="tablist" style={{ "--dynamic-color": "var(--theme-color2)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex m-1" role="tablist" style={{ "--dynamic-color": "var(--theme-color3)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex m-1" role="tablist" style={{ "--dynamic-color": "var(--theme-color4)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex m-1" role="tablist" style={{ "--dynamic-color": "var(--theme-color5)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex m-1" role="tablist" style={{ "--dynamic-color": "var(--theme-color6)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex m-1 rounded-pill" role="tablist" style={{ "--dynamic-color": "var(--theme-color2)" }}>
                                <li className="nav-item"><a className="nav-link rounded-pill active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link rounded-pill" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link rounded-pill" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex m-1 rounded-pill" role="tablist" style={{ "--dynamic-color": "var(--theme-color3)" }}>
                                <li className="nav-item"><a className="nav-link rounded-pill active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link rounded-pill" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link rounded-pill" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex m-1 rounded-pill" role="tablist" style={{ "--dynamic-color": "var(--theme-color4)" }}>
                                <li className="nav-item"><a className="nav-link rounded-pill active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link rounded-pill" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link rounded-pill" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex m-1 rounded-pill" role="tablist" style={{ "--dynamic-color": "var(--theme-color5)" }}>
                                <li className="nav-item"><a className="nav-link rounded-pill active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link rounded-pill" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link rounded-pill" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                            <ul className="nav nav-tabs tab-page-toolbar bg-body rounded d-inline-flex m-1 rounded-pill" role="tablist" style={{ "--dynamic-color": "var(--theme-color6)" }}>
                                <li className="nav-item"><a className="nav-link rounded-pill active" data-bs-toggle="tab" href="#tab_home" role="tab">Home</a></li>
                                <li className="nav-item"><a className="nav-link rounded-pill" data-bs-toggle="tab" href="#tab_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link rounded-pill" data-bs-toggle="tab" href="#tab_contact" role="tab">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="card">
                        <ul className="nav nav-tabs tab-card pt-3" role="tablist">
                            <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab2_home" role="tab">Home</a></li>
                            <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab2_profile" role="tab">Profile</a></li>
                            <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab2_contact" role="tab">Contact</a></li>
                        </ul>
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="tab2_home" role="tabpanel">
                                    <p><strong>This is some placeholder content the Home tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                                </div>
                                <div className="tab-pane fade" id="tab2_profile" role="tabpanel">
                                    <p><strong>This is some placeholder content the Profile tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                                </div>
                                <div className="tab-pane fade" id="tab2_contact" role="tabpanel">
                                    <p><strong>This is some placeholder content the Contact tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <ul className="nav nav-tabs tab-heading" role="tablist" style={{ "--dynamic-color": "var(--theme-color4)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab3_home" role="tab">theme-color4</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab3_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab3_contact" role="tab">Contact</a></li>
                            </ul>
                            <ul className="nav nav-tabs tab-heading" role="tablist" style={{ "--dynamic-color": "var(--theme-color3)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab3_home" role="tab">theme-color3</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab3_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab3_contact" role="tab">Contact</a></li>
                            </ul>
                            <ul className="nav nav-tabs tab-heading" role="tablist" style={{ "--dynamic-color": "var(--theme-color2)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab3_home" role="tab">theme-color2</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab3_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab3_contact" role="tab">Contact</a></li>
                            </ul>
                            <hr />
                            <ul className="nav nav-tabs tab-heading" role="tablist" style={{ "--dynamic-color": "var(--theme-color1)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#tab3_home" role="tab">theme-color1</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab3_profile" role="tab">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#tab3_contact" role="tab">Contact</a></li>
                            </ul>
                            <div className="tab-content mt-4">
                                <div className="tab-pane fade active show" id="tab3_home" role="tabpanel">
                                    <p><strong>This is some placeholder content the Home tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                                </div>
                                <div className="tab-pane fade" id="tab3_profile" role="tabpanel">
                                    <p><strong>This is some placeholder content the Profile tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                                </div>
                                <div className="tab-pane fade" id="tab3_contact" role="tabpanel">
                                    <p><strong>This is some placeholder content the Contact tab's associated content.</strong> Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling. You can use it with tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <ul className="nav nav-pills custom-pill mb-3" role="tablist" style={{ "--dynamic-color": "var(--theme-color1)" }}>
                                <li className="nav-item me-1"><a className="nav-link active" data-bs-toggle="tab" href="#nav5-home" role="tab" aria-selected="true">Home</a></li>
                                <li className="nav-item me-1"><a className="nav-link" data-bs-toggle="tab" href="#nav5-profile" role="tab" aria-selected="false">Profile</a></li>
                                <li className="nav-item me-1"><a className="nav-link" data-bs-toggle="tab" href="#nav5-contact" role="tab" aria-selected="false">Contact</a></li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="nav5-home" role="tabpanel">
                                    <div className="mb-0">It is a long established fact that a reader will normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will ma sites still in their infancy.</div>
                                </div>
                                <div className="tab-pane fade" id="nav5-profile" role="tabpanel">
                                    <div className="mb-0">Lorem Ipsum is simply dummy text of the galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <ul className="nav nav-pills custom-pill2 border-bottom mb-3" role="tablist" style={{ "--dynamic-color": "var(--theme-color1)" }}>
                                <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" href="#nav6-home" role="tab" aria-selected="true">Home</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#nav6-profile" role="tab" aria-selected="false">Profile</a></li>
                                <li className="nav-item"><a className="nav-link" data-bs-toggle="tab" href="#nav6-contact" role="tab" aria-selected="false">Contact</a></li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="nav6-home" role="tabpanel">
                                    <div className="mb-0">It is a long established fact that a reader will normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will ma sites still in their infancy.</div>
                                </div>
                                <div className="tab-pane fade" id="nav6-profile" role="tabpanel">
                                    <div className="mb-0">Lorem Ipsum is simply dummy text of the galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTab