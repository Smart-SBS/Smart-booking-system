import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chart from 'react-apexcharts'
import { CardData, RecentSellers, SalesRevenueData, YearData } from './Components/DashboardData'
import { MyAnalytics } from './Components/MyAnalyticsChart'
import { SalesAnalytics } from './Components/SalesAnalyticsChart'
import { EmployeeSalary } from './Components/EmployeeSalaryChart'
import CountingAnimation from '../../../Common/CommonCounting/CountingAnimation'
import avatar5 from '../../../assets/images/xs/avatar5.jpg';
import avatar6 from '../../../assets/images/xs/avatar6.jpg';
import avatar1 from '../../../assets/images/xs/avatar1.jpg';
import avatar4 from '../../../assets/images/xs/avatar4.jpg';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'

const Index = () => {
	const screenWidth = useSelector((state) => state.screenWidth.screenWidth);
	const Img_url = import.meta.env.VITE_IMG_URL
	const APP_URL = import.meta.env.VITE_API_URL || '/api';
	const [chartKey, setChartKey] = useState(0);
	const [userData, setUserData] = useState(null)
	const token = localStorage.getItem("jwtToken");

	//get user details
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const decoded = jwtDecode(token)
				const { user_id } = decoded.data
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

	//use effect to set chart key
	useEffect(() => {
		setChartKey(prevKey => prevKey + 1);
	}, [screenWidth]);

	return (
		<div className="px-4 py-3 page-body">
			<div className="card mb-3">
				<div className="card-body">
					<div className="row g-4 li_animate">
						<div className="col-xl-4 col-lg-4">
							<span className="small">Welcome back!</span>
							<h2 className="fw-bold mb-xl-5 mb-4">My Dashboard</h2>
							<div className="d-flex align-items-center justify-content-start">
								<img
									src={userData?.profile_pic ? `${Img_url}/profile/list/${userData.profile_pic}` : `${Img_url}/default/list/user.webp`}
									alt={userData?.firstname || "User profile"}
									className="me-2 avatar rounded-circle xl"
									onError={(e) => { e.target.src = `${Img_url}/default/list/user.webp`; }}
								/>
								<div className="ms-3">
									<h4 className="mb-0 text-gradient title-font">
										Hello, {userData ? `${userData.firstname} ${userData.lastname}` : 'User'}!
									</h4>
									<span className="text-muted small">{userData?.email || 'Email not available'}</span>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-lg-3 col-md-4 col-sm-4">
							<ul className="list-inline d-flex flex-column mb-0 ms-5 ms-sm-0 ps-4 ps-sm-0">
								{YearData.map((data, index) => (
									<li key={index} className="list-inline-item mb-4">
										<span className="small text-muted">{data.year}<span className={`ps - 2 ${data.icon} ${data.text_color}`}> {data.per}</span></span>
										<h6 className="mb-0 mt-1">
											<CountingAnimation
												start={0}
												separator={'.'}
												currency={data.currency}
												end={data.value}
												duration={5000}
											/>
										</h6>
									</li>
								))}
								<li className="list-inline-item">
									<button type="button" className="btn btn-primary px-lg-3 py-lg-2">View Reports</button>
								</li>
							</ul>
						</div>
						<div className="col-xl-5 col-lg-5 col-md-8 col-sm-8">
							<Chart
								id="apex-MyAnalytics"
								className="apex-extra-none"
								key={chartKey}
								options={MyAnalytics}
								series={MyAnalytics.series}
								height={MyAnalytics.chart.height}
								type={MyAnalytics.chart.type}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="row g-3">
				{CardData.map((data, index) => (
					<div key={index} className="col-lg-3 col-md-6 col-sm-6">
						<div className="card p-3 px-4">
							<div>{data.title}</div>
							<div className="py-4 m-0 text-center h2">
								<CountingAnimation
									start={0}
									separator={'.'}
									currency={data.currency}
									end={data.value}
									duration={5000}
								/>
							</div>
							<div className="d-flex">
								<small className="text-muted">{data.year}</small>
								<div className="ms-auto">{data.per}</div>
							</div>
						</div>
					</div>
				))}
				<div className="col-xxl-8 col-xl-7 col-lg-12">
					<div className="card">
						<div className="card-header">
							<h6 className="card-title">Sales Analytics</h6>
						</div>
						<div className="card-body">
							<div>
								<Chart
									key={chartKey}
									options={SalesAnalytics}
									series={SalesAnalytics.series}
									height={SalesAnalytics.chart.height}
									type={SalesAnalytics.chart.type}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-xxl-4 col-xl-5 col-lg-6 col-md-6">
					<div className="card">
						<div className="card-header">
							<h6 className="card-title mb-0">Sales Revenue</h6>
						</div>
						<div className="card-body custom_scroll" style={{ height: "320px" }}>
							<table className="table table-hover mb-0">
								<tbody>
									{SalesRevenueData.map((data, index) => (
										<tr key={index}>
											<td>
												{data.country}
												<div className="progress mt-1" style={{ height: "2px" }}>
													<div className="progress-bar bg-primary" style={{ width: data.width }}></div>
												</div>
											</td>
											<td className="text-end"><span className="text-muted">{data.revenue}</span></td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
					<div className="card">
						<div className="card-header">
							<h6 className="card-title mb-0">Customer rating</h6>
						</div>
						<div className="card-body custom_scroll" style={{ height: "280px" }}>
							<div className="d-flex align-items-center">
								<div className="avatar rounded-circle no-thumbnail theme-color4 text-white"><i className="fa fa-star fa-lg"></i></div>
								<h6 className="ms-3 mb-0">4.9 Rating </h6>
							</div>
							<div className="avatar-list avatar-list-stacked my-4 px-3">
								<img className="avatar rounded-circle me-1" src={avatar5} data-toggle="tooltip" title="Avatar" alt="avatar" />
								<img className="avatar rounded-circle me-1" src={avatar6} data-toggle="tooltip" title="Avatar" alt="avatar" />
								<img className="avatar rounded-circle me-1" src={avatar1} data-toggle="tooltip" title="Avatar" alt="avatar" />
								<img className="avatar rounded-circle me-1" src={avatar4} data-toggle="tooltip" title="Avatar" alt="avatar" />
								<span>+195K raters</span>
							</div>
							<p className="text-muted small mb-0">Loved the layout! It is user-friendly and helps to navigate faster as per our requirements</p>
						</div>
						<div className="card-footer py-2">
							<a href="/rate-application" title="Rate Our Application">Rate Our Application<i className="fa fa-long-arrow-right ms-2"></i></a>
						</div>
					</div>
				</div>
				<div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
					<div className="card">
						<div className="card-header">
							<h6 className="card-title mb-0">Employee Salary</h6>
						</div>
						<div className="card-body py-1">
							<div>
								<Chart
									key={chartKey}
									options={EmployeeSalary}
									series={EmployeeSalary.series}
									height={EmployeeSalary.chart.height}
									type={EmployeeSalary.chart.type}
								/>
							</div>
						</div>
						<div className="card-footer py-2">
							<a href="/salary-report" title="View report">View report<i className="fa fa-long-arrow-right ms-2"></i></a>
						</div>
					</div>
				</div>
				<div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
					<div className="card">
						<div className="card-header">
							<h6 className="card-title mb-0">Recent Sellers</h6>
						</div>
						<div className="card-body custom_scroll" style={{ height: "320px" }}>
							<ul className="list-group list-group-flush user-list mb-0" role="tablist">
								{RecentSellers.map((data, index) => (
									<li key={index} className="list-group-item b-dashed">
										<a href={`/ seller / ${data.cust_id}`} className="d-flex">
											{data.img ?
												<img className="avatar rounded-circle" src={data.img} alt="" />
												: <div className="avatar rounded-circle no-thumbnail">{data.initial}</div>}
											<div className="flex-fill ms-3">
												<h6 className="d-flex justify-content-between mb-0"><span>{data.name}</span></h6>
												<span className="text-muted small">{data.cust_id}</span>
											</div>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Index