import React from 'react'

const Notifications = () => {
    return (
        <ul className="row g-3 list-unstyled li_animate">
            <li className="col-12">
                <h5 className="mb-0">Notifications Setting</h5>
                <p className="text-muted">We may still send you important Notifications about your account outside of your Notifications settings.</p>
                <ul className="list-group list-group-flush li_animate">
                    <li className="list-group-item d-flex justify-content-between align-items-start py-4">
                        <div>
                            <h6 className="mb-1">Comments</h6>
                            <small className="text-muted">These are notifications for comments on your posts and replies to your comments.</small>
                        </div>
                        <div className="text-end">
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_email" defaultChecked />
                                <label className="form-check-label" htmlFor="noti_email">Email</label>
                            </div>
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_push" defaultChecked />
                                <label className="form-check-label" htmlFor="noti_push">Push</label>
                            </div>
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_sms" />
                                <label className="form-check-label" htmlFor="noti_sms">SMS</label>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start py-4">
                        <div>
                            <h6 className="mb-1">Reminders</h6>
                            <small className="text-muted">These are notificatios to remind you of updates you might have missed.</small>
                        </div>
                        <div className="text-end">
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_email2" defaultChecked />
                                <label className="form-check-label" htmlFor="noti_email2">Email</label>
                            </div>
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_push2" defaultChecked />
                                <label className="form-check-label" htmlFor="noti_push2">Push</label>
                            </div>
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_sms2" defaultChecked />
                                <label className="form-check-label" htmlFor="noti_sms2">SMS</label>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start py-4">
                        <div>
                            <h6 className="mb-1">Tags</h6>
                            <small className="text-muted">These are notificatios for when someone tags you in comments, postof story.</small>
                        </div>
                        <div className="text-end">
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_email3" defaultChecked />
                                <label className="form-check-label" htmlFor="noti_email3">Email</label>
                            </div>
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_push3" defaultChecked />
                                <label className="form-check-label" htmlFor="noti_push3">Push</label>
                            </div>
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_sms3" />
                                <label className="form-check-label" htmlFor="noti_sms3">SMS</label>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start py-4">
                        <div>
                            <h6 className="mb-1">More activity about you</h6>
                            <small className="text-muted">In semper feugiat commodo himenaeos diam integer praesent cras</small>
                        </div>
                        <div className="text-end text-md-start">
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_email4" />
                                <label className="form-check-label" htmlFor="noti_email4">Email</label>
                            </div>
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_push4" />
                                <label className="form-check-label" htmlFor="noti_push4">Push</label>
                            </div>
                            <div className="form-check form-switch form-check-inline">
                                <input className="form-check-input" type="checkbox" role="switch" id="noti_sms4" />
                                <label className="form-check-label" htmlFor="noti_sms4">SMS</label>
                            </div>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    )
}

export default Notifications