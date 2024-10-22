const PricingTable = () => {
    return (
        <div className="px-4 py-3 page-body">
            <div className="pricing-header pb-md-4 mx-auto">
                <h1 className="display-6 fw-normal">Pricing</h1>
                <p className="fs-5 text-body-secondary">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>
            </div>
            <div className="table-responsive">
                <svg xmlns="http://www.w3.org/2000/svg" fill="var(--primary-color)" viewBox="0 0 16 16" style={{ display: "none" }}>
                    <symbol id="check" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </symbol>
                </svg>
                <table className="table table-v1 table-hover text-center">
                    <thead>
                        <tr className="text-muted small text-uppercase">
                            <th style={{ width: "58%" }}></th>
                            <th style={{ width: "14%" }}>Free</th>
                            <th style={{ width: "14%" }}>Professional</th>
                            <th style={{ width: "14%" }}>Enterprise</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td scope="row" className="text-start">
                                <p className="mb-1">Public</p>
                                <span className="text-muted">Imperdiet cursus condimentum litora dis</span>
                            </td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                        </tr>
                        <tr>
                            <td scope="row" className="text-start">
                                <p className="mb-1">Private</p>
                                <span className="text-muted">Lacinia duis facilisis senectus mus bibendum tincidunt</span>
                            </td>
                            <td></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                        </tr>
                        <tr>
                            <td scope="row" className="text-start">
                                <p className="mb-1">Permissions</p>
                                <span className="text-muted">Finibus luctus ridiculus ad dapibus</span>
                            </td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                        </tr>
                        <tr>
                            <td scope="row" className="text-start">
                                <p className="mb-1">Sharing</p>
                                <span className="text-muted">Bibendum consequat vitae semper etiam maximus phasellus</span>
                            </td>
                            <td></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                        </tr>
                        <tr>
                            <td scope="row" className="text-start">
                                <p className="mb-1">Unlimited members</p>
                                <span className="text-muted">Sapien molestie non viverra egestas metus habitant quam</span>
                            </td>
                            <td></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                        </tr>
                        <tr>
                            <td scope="row" className="text-start">
                                <p className="mb-1">Extra security</p>
                                <span className="text-muted">Lorem ipsum dolor sit amet feugiat ullamcorper vivamus</span>
                            </td>
                            <td></td>
                            <td></td>
                            <td><svg width="20" height="20"><use href="#check"></use></svg></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td scope="row" className="text-start">

                            </td>
                            <td><button type="button" className="btn btn-outline-secondary text-uppercase">Registrar</button></td>
                            <td><button type="button" className="btn btn-primary text-uppercase">Buy Now $99</button></td>
                            <td><button type="button" className="btn btn-dark text-uppercase">Contact Us</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PricingTable