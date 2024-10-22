/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useLocation, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AdminLayout from './Layout/AdminLayout';
import AuthLayout from './Layout/AuthLayout';
import AppRoutes from './Routes';
import NotFound from './NotFound/NotFound';
import ErrorComponent from './Common/ErrorComponent/ErrorComponent';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorComponent error={this.state.error} />;
    }

    return this.props.children;
  }
}

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const menuTitle = useSelector((state) => state.menu.menuTitle);
  const themeColor = useSelector((state) => state.theme.themeColor);
  const layout = useSelector((state) => state.layout.layout);
  const borderStroke = useSelector((state) => state.stroke.borderStroke);
  const borderLayout = useSelector((state) => state.borderLayout.borderLayout);
  const boxLayout = useSelector((state) => state.boxLayout.boxLayout);
  const monochrome = useSelector((state) => state.monochrome.monochrome);
  const borderRadius = useSelector((state) => state.borderRadius.borderRadius);
  const iconColor = useSelector((state) => state.iconColor.iconColor);
  const themeMode = useSelector((state) => state.themeMode.themeMode);

  const authTitleMapping = {
    "/signin": "Signin",
    "/send-token": "SendToken",
    "/resetPassword": "ResetPassword",
    "/userActivation": "UserActivation",
    "/404": "NoPage",
  };

  const adminTitleMapping = {
    "/admin/index": "Index",
    "/admin/payments": "MyWallet",
    "/admin/app/orders": "Invoices",
    "/admin/users": "ClientsList",
    "/admin/user/my-profile": "MyProfile",
    "/admin/user/add-user": "Adduser",
    "/admin/user/edit-user": "EditUser",
    "/admin/businessList": "Tables",
    "/admin/addBusiness": "NewProject",
    "/admin/editBusiness": "EditBusiness",
    "/admin/cities": "City",
    "/admin/addCity": "AddCity",
    "/admin/editCity": "EditCity",
    "/admin/areas": "Area",
    "/admin/addArea": "AddArea",
    "/admin/editArea": "EditArea",
    "/admin/categories": "Category",
    "/admin/addCategory": "AddCategory",
    "/admin/editCategory": "EditCategory",
    "/admin/subCategories": "SubCategory",
    "/admin/addSubCategory": "AddSubCategory",
    "/admin/editSubCategory": "EditSubCategory",
    "/admin/shops": "ShopList",
    "/admin/addShop": "AddShop",
    "/admin/editShop": "EditShop",
    "/admin/shop/gallery": "GalleryPage",
    "/admin/shop/offers": "OffersPage",
    "/admin/shop/review": "ReviewPage",
    "/admin/shop/faq": "FaqPage",
    "/admin/shop/catalogue": "CataloguePage",
    "/admin/shop/opening-hours": "OpeningHours",
    "/admin/shop/addCatalogue": "AddCatalogue",
    "/admin/shop/addOpeningHours": "AddOpeningHours",
    "/admin/shop/editOpeningHours": "EditOpeningHours",
    "/admin/shop/catalogueGallery": "CatalogueGallery",
    "/admin/shop/editCatalogue": "EditCatalogue",
  };

  const API_URL = import.meta.env.VITE_API_URL
  const isAuthRoute = authTitleMapping[pathname];
  const isAdminRoute = Object.keys(adminTitleMapping).some(route => pathname.startsWith(route));
  const [authError, setAuthError] = useState(false);

  const validateToken = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/validate-token`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setAuthError(false);
      }
    } catch (error) {
      console.log(error)
      setAuthError(true);
    }
  };

  useEffect(() => {
    validateToken();
  }, [navigate]);

  useEffect(() => {
    if (authError) {
      localStorage.clear();
      navigate('/signin')
    }
  }, [authError, navigate]);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/index" replace />} />

        {isAuthRoute && (
          <Route element={<AuthLayout />}>
            <Route path={pathname} element={<AppRoutes />} />
          </Route>
        )}

        {isAdminRoute && (
          <Route element={
            <AdminLayout
              menuTitle={menuTitle}
              themeColor={themeColor}
              layout={layout}
              borderStroke={borderStroke}
              borderLayout={borderLayout}
              boxLayout={boxLayout}
              monochrome={monochrome}
              borderRadius={borderRadius}
              iconColor={iconColor}
              themeMode={themeMode}
            />
          }>
            <Route path="/*" element={<AppRoutes />} />
          </Route>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;