export const routePatterns = [
    { pattern: "admin/index", title: "Dashboard" },
    { pattern: "admin/payments", title: "Payments" },
    { pattern: "admin/app/orders", title: "Orders" },
    // user routes
    { pattern: "admin/users", title: "Users / List" },
    { pattern: "admin/user/my-profile", title: "User / My Profile" },
    { pattern: "admin/user/add-user", title: "User / Add User" },
    { pattern: "admin/user/edit-user/:userName/:userId", title: "User / Edit User" },
    // business routes
    { pattern: "admin/businessList", title: "Business / List" },
    { pattern: "admin/addBusiness", title: "Business / Add New" },
    { pattern: "admin/editBusiness/:businessName/:businessId", title: "Business / Edit Business" },
    // city routes
    { pattern: "admin/cities", title: "Cities / List" },
    { pattern: "admin/addCity", title: "Cities / Add New" },
    { pattern: "admin/editCity/:cityName/:cityId", title: "Cities / Edit City" },
    // area routes
    { pattern: "admin/areas", title: "Areas / List" },
    { pattern: "admin/addArea", title: "Areas / Add New" },
    { pattern: "admin/editArea/:areaName/:areaId", title: "Areas / Edit Area" },
    // category routes
    { pattern: "admin/categories", title: "Categories / List" },
    { pattern: "admin/addCategory", title: "Categories / Add New" },
    { pattern: "admin/editCategory/:categoryName/:categoryId", title: "Categories / Edit Category" },
    // sub category routes
    { pattern: "admin/subCategories", title: "Sub Categories / List" },
    { pattern: "admin/addSubCategory", title: "Sub Categories / Add New" },
    { pattern: "admin/editSubCategory/:subCategoryName/:subCategoryId", title: "Sub Categories / Edit Sub Category" },
    // shop routes
    { pattern: "admin/shops", title: "Shops / List" },
    { pattern: "admin/addShop", title: "Shops / Add New" },
    { pattern: "admin/editShop/:shopName/:shopId", title: "Shops / Edit Shop" },
    { pattern: "admin/shop/gallery/:shopName/:shopId", title: "Shops / Gallery" },
    { pattern: "admin/shop/offers/:shopName/:shopId/:catalogName/:catalogId", title: "Catalogue / Offers" },
    { pattern: "admin/shop/review/:shopName/:shopId/:catalogName/:catalogId", title: "Catalogue / Review" },
    { pattern: "admin/shop/faq/:shopName/:shopId/:catalogName/:catalogId", title: "Catalogue / Faqs" },
    { pattern: "admin/shop/catalogue/:shopName/:shopId", title: "Shops / Catalogues" },
    { pattern: "admin/shop/opening-hours/:shopName/:shopId", title: "Shops / Opening Hours" },
    { pattern: "admin/shop/addCatalogue/:shopName/:shopId", title: "Catalogue / Add Catalogue" },
    { pattern: "admin/shop/addOpeningHours/:shopName/:shopId", title: "Shops / Add Opening Hours" },
    { pattern: "admin/shop/editOpeningHours/:shopName/:shopId", title: "Shops / Edit Opening Hours" },
    { pattern: "admin/shop/catalogueGallery/:shopName/:shopId/:catalogName/:catalogId", title: "Catalogue / Catalogue Gallery" },
    { pattern: "admin/shop/editCatalogue/:shopName/:shopId/:catalogName/:catalogId", title: "Catalogue / Edit Catalogue" },
];