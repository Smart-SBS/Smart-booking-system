/* eslint-disable react/prop-types */
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import AddShop from "./Partials/Apps/Shops/AddShop";
import OffersPage from "./Partials/Apps/OffersPage/OffersPage";
import NotFound from "./NotFound/NotFound";
import AddOpeningHours from "./Partials/Apps/OpeningHours/AddOpeningHours";
import EditOpeningHours from "./Partials/Apps/OpeningHours/EditOpeningHours";
import LoadingFallback from "./Partials/Apps/LoadingFallback/LoadingFallback";
import useJwtExpiration from "./Partials/Apps/useJwtExpiration";

const Signin = lazy(() => import("./Partials/Pages/Authentication/Signin/Signin"));
const UserActivation = lazy(() => import("./Partials/Pages/Authentication/UserActivation/UserActivation"));
const NewProject = lazy(() => import("./Partials/Apps/MyProjects/NewProject/NewProject"));
const OpeningHours = lazy(() => import("./Partials/Apps/OpeningHours/OpeningHours"));
const PasswordReset = lazy(() => import("./Partials/Pages/Authentication/PasswordReset/PasswordReset"));
const TwoStep = lazy(() => import("./Partials/Pages/Authentication/TwoStep/TwoStep"));
const Invoices = lazy(() => import("./Partials/Apps/Users/Invoices/Invoices"));
const MyProfile = lazy(() => import("./Partials/Apps/Users/MyProfile/MyProfile"));
const Index = lazy(() => import("./Partials/Workspace/Dashboard/Index"));
const Tables = lazy(() => import("./Partials/Pages/Tables/Tables"));
const MyWallet = lazy(() => import("./Partials/Workspace/MyWallet/MyWallet"));
const ClientsList = lazy(() => import("./Partials/Apps/MyProjects/ClientsList/ClientsList"));
const Adduser = lazy(() => import("./Partials/Apps/AddUser/Adduser"));
const EditUser = lazy(() => import("./Partials/Apps/EditUser/EditUser"));
const City = lazy(() => import('./Partials/Apps/Cities/City'));
const AddCity = lazy(() => import('./Partials/Apps/Cities/AddCity'));
const EditCity = lazy(() => import("./Partials/Apps/Cities/EditCity"));
const Area = lazy(() => import('./Partials/Apps/Area/Area'));
const EditBusiness = lazy(() => import('./Partials/Apps/EditBusiness/EditBusiness'));
const AddArea = lazy(() => import("./Partials/Apps/Area/AddArea"));
const EditArea = lazy(() => import("./Partials/Apps/Area/EditArea"));
const Category = lazy(() => import("./Partials/Apps/Category/Category"));
const AddCategory = lazy(() => import("./Partials/Apps/Category/AddCategory"));
const EditCategory = lazy(() => import("./Partials/Apps/Category/EditCategory"));
const SubCategory = lazy(() => import("./Partials/Apps/SubCategory/SubCategory"));
const AddSubCategory = lazy(() => import("./Partials/Apps/SubCategory/AddSubCategory"));
const EditSubCategory = lazy(() => import("./Partials/Apps/SubCategory/EditSubCategory"));
const ShopList = lazy(() => import("./Partials/Apps/Shops/ShopList"));
const EditShop = lazy(() => import("./Partials/Apps/Shops/EditShop"));
const GalleryPage = lazy(() => import("./Partials/Apps/Gallery Page/GalleryPage"));
const ReviewPage = lazy(() => import("./Partials/Apps/Review Page/ReviewPage"));
const FaqPage = lazy(() => import("./Partials/Apps/FaqPage/FaqPage"));
const CataloguePage = lazy(() => import("./Partials/Apps/CataloguePage/CataloguePage"));
const AddCatalogue = lazy(() => import("./Partials/Apps/CataloguePage/AddCatalogue"));
const EditCatalogue = lazy(() => import("./Partials/Apps/CataloguePage/EditCatalogue"));
const CatalogueGallery = lazy(() => import("./Partials/Apps/CataloguePage/CatalogueGallery"));

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const isTokenExpired = useJwtExpiration();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token || isTokenExpired) {
      navigate('/signin', { replace: true });
    }
  }, [isTokenExpired, navigate]);

  return isTokenExpired ? null : children;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/send-token" element={<PasswordReset />} />
        <Route path="/resetPassword" element={<TwoStep />} />
        <Route path="/userActivation" element={<UserActivation />} />

        {/* All other routes wrapped in AuthWrapper */}
        <Route path="/*" element={
          <AuthWrapper>
            <Routes>
              {/* Root route */}
              <Route path="/" element={<Navigate to="/admin/index" replace />} />

              {/* Protected routes */}
              <Route path="/admin/index" element={<Index />} />
              <Route path="/admin/payments" element={<MyWallet />} />
              <Route path="/admin/app/orders" element={<Invoices />} />
              <Route path="/admin/users" element={<ClientsList />} />
              <Route path="/admin/user/my-profile" element={<MyProfile />} />
              <Route path="/admin/user/add-user" element={<Adduser />} />
              <Route path="/admin/user/edit-user/:userName/:userId" element={<EditUser />} />
              <Route path="/admin/businessList" element={<Tables />} />
              <Route path="/admin/addBusiness" element={<NewProject />} />
              <Route path="/admin/editBusiness/:businessName/:businessId" element={<EditBusiness />} />
              <Route path="/admin/cities" element={<City />} />
              <Route path="/admin/addCity" element={<AddCity />} />
              <Route path="/admin/editCity/:cityName/:cityId" element={<EditCity />} />
              <Route path="/admin/areas" element={<Area />} />
              <Route path="/admin/addArea" element={<AddArea />} />
              <Route path="/admin/editArea/:areaName/:areaId" element={<EditArea />} />
              <Route path="/admin/categories" element={<Category />} />
              <Route path="/admin/addCategory" element={<AddCategory />} />
              <Route path="/admin/editCategory/:categoryName/:categoryId" element={<EditCategory />} />
              <Route path="/admin/subCategories" element={<SubCategory />} />
              <Route path="/admin/addSubCategory" element={<AddSubCategory />} />
              <Route path="/admin/editSubCategory/:subCategoryName/:subCategoryId" element={<EditSubCategory />} />
              <Route path="/admin/shops" element={<ShopList />} />
              <Route path="/admin/addShop" element={<AddShop />} />
              <Route path="/admin/editShop/:shopName/:shopId" element={<EditShop />} />
              <Route path="/admin/shop/gallery/:shopName/:shopId" element={<GalleryPage />} />
              <Route path="/admin/shop/offers/:shopName/:shopId/:catalogName/:catalogId" element={<OffersPage />} />
              <Route path="/admin/shop/review/:shopName/:shopId/:catalogName/:catalogId" element={<ReviewPage />} />
              <Route path="/admin/shop/faq/:shopName/:shopId/:catalogName/:catalogId" element={<FaqPage />} />
              <Route path="/admin/shop/catalogue/:shopName/:shopId" element={<CataloguePage />} />
              <Route path="/admin/shop/opening-hours/:shopName/:shopId" element={<OpeningHours />} />
              <Route path="/admin/shop/addCatalogue/:shopName/:shopId" element={<AddCatalogue />} />
              <Route path="/admin/shop/addOpeningHours/:shopName/:shopId" element={<AddOpeningHours />} />
              <Route path="/admin/shop/editOpeningHours/:shopName/:shopId" element={<EditOpeningHours />} />
              <Route path="/admin/shop/catalogueGallery/:shopName/:shopId/:catalogName/:catalogId" element={<CatalogueGallery />} />
              <Route path="/admin/shop/editCatalogue/:shopName/:shopId/:catalogName/:catalogId" element={<EditCatalogue />} />

              {/* Catch-all for undefined routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthWrapper>
        } />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;