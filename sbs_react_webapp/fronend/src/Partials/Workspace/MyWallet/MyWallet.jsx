import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Chart from 'react-apexcharts'

import { RecentTransaction } from './Components/MyWalletData'
import CalenderTab from '../../Widgets/CalenderTab/CalenderTab'
import WalletTable from './Components/WalletTable'

const MyWallet = () => {
  const screenWidth = useSelector((state) => state.screenWidth.screenWidth);

  const [chartKey, setChartKey] = useState(0); // Add a key to force chart refresh

  useEffect(() => {
    // Update the key whenever rightbarHidden changes to force chart refresh
    setChartKey(prevKey => prevKey + 1);
  }, [screenWidth]);

  return (
    // <!-- start: page body area -->
    <div className="ps-1 pt-1 pb-1 page-body">
      <div className="card bg-transparent border-0">
        <div className="card-header">
          <h3 className="title-font mb-0">My Payments</h3>
        </div>
        <div className="card-body">
          <h6 className="card-title">Recent transaction</h6>
          <ul className="row g-3 list-unstyled row-deck">
            {RecentTransaction.map((data, index) => {
              return (
                <li key={index} className="col-xl-3 col-lg-6">
                  <div className="card">
                    <div className="card-body d-flex align-items-start">
                      <div className="avatar rounded no-thumbnail"><i className={data.icon}></i></div>
                      <div className="ms-3 me-auto">
                        <h5 className={`fw-normal ${data.theme_color} mb-1`}>{data.title}</h5>
                        <p>{data.value}</p>
                        <Chart
                          key={chartKey}
                          options={data.options}
                          series={data.series}
                          height={data.options.chart.height}
                          type={data.options.chart.type}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          {/* <!--[ ul.row end ]--> */}
          <CalenderTab />
          <hr />
          <WalletTable />
        </div>
      </div>
    </div>
  )
}

export default MyWallet 