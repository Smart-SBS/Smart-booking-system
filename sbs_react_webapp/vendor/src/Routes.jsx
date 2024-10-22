import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthWrapper from './utils/AuthWrapper';
import ManageDashboard from './components/ManageDashboard';
import UserProfile from "./components/UserProfile";
import LoadingFallback from './utils/LoadingFallback'

// Custom import function to handle potential loading errors
const lazyImport = (componentPath) => lazy(() =>
    import(`./components/${componentPath}.jsx`)
        .catch(err => {
            console.error(`Error loading component: ${componentPath}`, err);
            return import('./components/ErrorComponent');
        })
);

// Define components using the custom import function
const Home = lazyImport('Home');
const AllShops = lazyImport('AllShops');
const SearchResults = lazyImport('SearchResults');
const PopularCatalogues = lazyImport('PopularCatalogues');
const CatalogueDetailsPage = lazyImport('CatalogueDetailsPage');
const ShopDetailsPage = lazyImport('ShopDetailsPage');
const ChangePassword = lazyImport('ChangePassword');
const MyListings = lazyImport('MyListings');
const MyShops = lazyImport('MyShops');
const Payments = lazyImport('Payments');
const Invoice = lazyImport('Invoice');
const Dashboard = lazyImport('Dashboard');
const Catalogues = lazyImport('Catalogues');
const AddBusiness = lazyImport('AddBusiness');
const AddShop = lazyImport('AddShop');
const AddOffer = lazyImport('AddOffer');
const EditOffer = lazyImport('EditOffer');
const AddCatalogue = lazyImport('AddCatalogue');
const EditBusiness = lazyImport('EditBusiness');
const EditShop = lazyImport('EditShop');
const EditCatalogue = lazyImport('EditCatalogue');
const ShopGallery = lazyImport('ShopGallery');
const ReviewPage = lazyImport('ReviewPage');
const PasswordReset = lazyImport('PasswordReset');
const TwoStep = lazyImport('TwoStep');
const FaqPage = lazyImport('FaqPage');
const Offers = lazyImport('Offers');
const CatalogueGallery = lazyImport('CatalogueGallery');
const FavoritedListings = lazyImport('FavoritedListings');
const NoDataFound = lazyImport('NoDataFound');
const Categories = lazyImport('Categories');
const AddOpeningHours = lazyImport('AddOpeningHours');
const OpeningHours = lazyImport('OpeningHours');
const EditOpeningHours = lazyImport('EditOpeningHours');
const CheckoutPage = lazyImport('CheckoutPage');
const OrderConfirmationPage = lazyImport('OrderConfirmationPage');
const MyOrdersPage = lazyImport('MyOrdersPage');
const NotFound = lazyImport('NotFound');

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/send-token" element={<PasswordReset />} />
                <Route path="/resetPassword" element={<TwoStep />} />
                <Route path="/popular-catalogues" element={<PopularCatalogues />} />
                <Route path="/all-shops" element={<AllShops />} />
                <Route path="/all-catalogues/:type/:name" element={<Categories />} />
                <Route path="/no-data-found" element={<NoDataFound />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/catalog/:categoryName/:catalogName" element={<CatalogueDetailsPage />} />
                <Route path="/shop/:shopName" element={<ShopDetailsPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

                {/* Protected routes */}
                <Route element={<AuthWrapper><Dashboard /></AuthWrapper>}>
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/dashboard" element={<ManageDashboard />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/my-listings" element={<MyListings />} />
                    <Route path="/favorited-listings" element={<FavoritedListings />} />
                    <Route path="/my-shops" element={<MyShops />} />
                    <Route path="/my-orders" element={<MyOrdersPage />} />
                    <Route path="/catalogues/:shopName/:shopId" element={<Catalogues />} />
                    <Route path="/opening-hours/:shopName/:shopId" element={<OpeningHours />} />
                    <Route path="/shop-gallery/:shopId/:shopName" element={<ShopGallery />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/invoice" element={<Invoice />} />
                    <Route path="/add-business" element={<AddBusiness />} />
                    <Route path="/add-shop" element={<AddShop />} />
                    <Route path="/edit-business/:id/:businessName" element={<EditBusiness />} />
                    <Route path="/edit-shop/:id/:shopName" element={<EditShop />} />
                    <Route path="/catalogue-gallery/:shopId/:shopName/:catalogueId/:catalogueName" element={<CatalogueGallery />} />
                    <Route path="/catalogue-reviews/:shopId/:shopName/:catalogueId/:catalogueName" element={<ReviewPage />} />
                    <Route path="/catalogue-faq/:shopId/:shopName/:catalogueId/:catalogueName" element={<FaqPage />} />
                    <Route path="/catalogue-offers/:shopId/:shopName/:catalogueId/:catalogueName" element={<Offers />} />
                    <Route path="/edit-catalogue/:shopName/:shopId/:catalogueId/:catalogueName" element={<EditCatalogue />} />
                    <Route path="/add-catalogue/:shopName/:shopId" element={<AddCatalogue />} />
                    <Route path="/add-opening-hours/:shopName/:shopId" element={<AddOpeningHours />} />
                    <Route path="/edit-opening-hours/:shopName/:shopId" element={<EditOpeningHours />} />
                    <Route path="/add-offer/:shopId/:shopName/:catalogueId/:catalogueName" element={<AddOffer />} />
                    <Route path="/edit-offer/:shopId/:shopName/:catalogueId/:catalogueName/:offerId/:offerName" element={<EditOffer />} />
                </Route>

                {/* Catch-all for undefined routes */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;