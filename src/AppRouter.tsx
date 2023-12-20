import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminMainLayout from "./app/components/layouts/admin/AdminMainLayout";
import AuthLayout from "./app/components/layouts/auth/AuthLayout";
import RequireAuth from "./app/components/layouts/auth/RequireAuth";
import UserMainLayout from "./app/components/layouts/client/UserMainLayout";
import AdminSuperMainLayout from "./app/components/layouts/super_admin/AdminSuperMainLayout";
import SellerInfo from "./app/pages/admin/seller/SellerInfo";
import Logs from "./app/pages/admin/settings/activities/Logs";
import SettingMain from "./app/pages/admin/settings/main/SettingMain";
import AccountLayout from "./app/pages/client/account/AccountLayout";
import UserNotification from "./app/pages/client/account/notification/UserNotification";
import UserWishlist from "./app/pages/client/account/wishlist/UserWishlist";
import Cart from "./app/pages/client/home/Cart";
import ReturnPayment from "./app/pages/client/home/components/payment/ReturnPayment";
import Payment from "./app/pages/client/home/Payment";
// Components

// Pages
const Dashboard = React.lazy(() => import("@app/app/pages/admin/dashboard/Dashboard"));
const AuthUser = React.lazy(() => import("@app/app/pages/client/auth/AuthUser"));
const CheckOtp = React.lazy(() => import("@app/app/pages/client/auth/CheckOtp"));
const ChangePass = React.lazy(() => import("@app/app/pages/client/auth/ChangePass"));
const EmailForm = React.lazy(() => import("@app/app/pages/client/auth/Email"));
const NotFound = React.lazy(() => import("@app/app/pages/errors/NotFound"));

// Client
const ProductCategory = React.lazy(() => import("@app/app/pages/client/category/ProductCategory"));
const Home = React.lazy(() => import("@app/app/pages/client/home/Home"));
const ProductDetail = React.lazy(() => import("@app/app/pages/client/ProductDetail/ProductDetail"));
const FlashSalePage = React.lazy(() => import("@app/app/pages/client/flashsale/FlashSalePage"));

const ListOrder = React.lazy(() => import("@app/app/pages/client/account/orders/ListOrder"));
const OrderDetail = React.lazy(() => import("@app/app/pages/client/account/orders/OrderDetail"));
const UserProfile = React.lazy(() => import("@app/app/pages/client/account/profile/UserProfile"));
const UserRating = React.lazy(() => import("@app/app/pages/client/account/rating/UserRating"));
const Discount = React.lazy(() => import("@app/app/pages/client/account/voucher/Discount"));
const Address = React.lazy(() => import("@app/app/pages/client/account/address/Address"));
const UserSearch = React.lazy(() => import("@app/app/pages/client/search/UserSearch"));
const StoreIndex = React.lazy(() => import("@app/app/pages/client/store/StoreIndex"));

// Admin
const SwitchPageAdmin = React.lazy(() => import("@app/app/pages/admin/auth/SwitchPageAdmin"));
const SigninAdmin = React.lazy(() => import("@app/app/pages/admin/auth/SigninAdmin"));
const SignupAdmin = React.lazy(() => import("@app/app/pages/admin/auth/SignupAdmin"));
const AdminOrderList = React.lazy(() => import("@app/app/pages/admin/orders/list/Order"));
const AdminOrderDetail = React.lazy(() => import("@app/app/pages/admin/orders/detail/OrderDetail"));
const AdminProductList = React.lazy(() => import("@app/app/pages/admin/products/list/Product"));
const AdminProductCreate = React.lazy(() => import("@app/app/pages/admin/products/create/ProductCreate"));
const AdminProductEdit = React.lazy(() => import("@app/app/pages/admin/products/edit/ProductEdit"));
const AdminCategory = React.lazy(() => import("@app/app/pages/admin/products/categories/Category"));
const Evouncher = React.lazy(() => import("@app/app/pages/admin/products/evouncher/Evouncher"));
const AdminProductReview = React.lazy(() => import("@app/app/pages/admin/products/review/ProductReview"));
const AdminSupplier = React.lazy(() => import("@app/app/pages/admin/products/suppliers/Supplier"));
const AdminProductBin = React.lazy(() => import("@app/app/pages/admin/products/bin/Bin"));
const AdminSupplierCreate = React.lazy(() => import("@app/app/pages/admin/products/suppliers/CreateSupplier"));
const AdminSupplierEdit = React.lazy(() => import("@app/app/pages/admin/products/suppliers/EditSupplier"));
const AdminProductInventory = React.lazy(() => import("@app/app/pages/admin/products/inventory/ProductInventory"));
const AdminProductPrintQRCode = React.lazy(() => import("@app/app/pages/admin/products/print_qr_code/PrintQRCode"));
const AdminShipOverview = React.lazy(() => import("@app/app/pages/admin/ships/ShipOverview"));
// const AdminReportProfit = React.lazy(() => import("@app/app/pages/admin/reports/profit"));
const AdminAccountStoreInfo = React.lazy(() => import("@app/app/pages/admin/dashboard/profile/info/AccountStoreInfo"));
const AdminAccountStoreSetting = React.lazy(
  () => import("@app/app/pages/admin/dashboard/profile/info/setting/StoreSetting")
);
const AdminAccountStoreDepots = React.lazy(
  () => import("@app/app/pages/admin/dashboard/profile/info/depots/StoreDepots")
);
const AdminAccountStoreBusinessLicense = React.lazy(
  () => import("@app/app/pages/admin/dashboard/profile/info/business_license/BusinessLicense")
);
const AdminReportSales = React.lazy(() => import("@app/app/pages/admin/reports/sales/SalesReport"));
const AdminBusinessEfficiency = React.lazy(
  () => import("@app/app/pages/admin/dev_center/biz_efficiency/BusinessEfficiency")
);
const AdminTrafficWebsite = React.lazy(() => import("@app/app/pages/admin/dev_center/traffic_website/TrafficWebsite"));
const AdminOperationalEfficiency = React.lazy(
  () => import("@app/app/pages/admin/dev_center/operational_efficiency/OperationalEfficiency")
);
const RoleManage = React.lazy(() => import("@app/app/pages/admin/manage_seller/role/RoleManage"));

// super admin
const DashboardSuperAdmin = React.lazy(() => import("@app/app/pages/super_admin/Dashboard"));
const Shops = React.lazy(() => import("@app/app/pages/super_admin/shops/list/Shops"));

const AppRouter: React.FC = () => {
  const protectedAdminLayout = (
    <RequireAuth type="adminShop">
      <AdminMainLayout />
    </RequireAuth>
  );

  const protectedSuperAdminLayout = (
    // <RequireAuth type="superAdmin">
    <AdminSuperMainLayout />
    // </RequireAuth>
  );

  // const protectedClientLayout = (
  //   <RequireAuth type="client">
  //     <UserMainLayout />
  //   </RequireAuth>
  // );

  return (
    <Routes>
      <Route path="/" element={<UserMainLayout />}>
        <Route index element={<Home />} />
        <Route path="category/:slug/:id" element={<ProductCategory />} />
        <Route path="store/:slug" element={<StoreIndex />} />
        <Route path="category" element={<ProductCategory />} />
        <Route path="checkout" element={<Cart />} />
        <Route path="checkout/payment" element={<Payment />} />
        <Route path="product/:slug/:id" element={<ProductDetail />} />
        <Route path="search" element={<UserSearch />} />
        <Route path="flash_sale" element={<FlashSalePage />} />
        <Route path="account" element={<AccountLayout />}>
          <Route path="edit_profile" element={<UserProfile />} />
          <Route path="notifications" element={<UserNotification />} />
          <Route path="orders" element={<ListOrder />} />
          <Route path="order/:id" element={<OrderDetail />} />
          <Route path="address" element={<Address />} />
          <Route path="wishlist" element={<UserWishlist />} />
          <Route path="my_rating" element={<UserRating />} />
          <Route path="voucher" element={<Discount />} />
        </Route>
        <Route path="thank" element={<ReturnPayment />} />
      </Route>
      <Route path="/admin/shop" element={protectedAdminLayout}>
        <Route index element={<Dashboard />} />
        <Route path="profile">
          <Route index element={<AdminAccountStoreInfo />} />
          <Route path="store_setting" element={<AdminAccountStoreSetting />} />
          <Route path="store_depot" element={<AdminAccountStoreDepots />} />
          <Route path="business_license" element={<AdminAccountStoreBusinessLicense />} />
        </Route>
        <Route path="products">
          <Route index element={<AdminProductList />} />
          <Route path="create" element={<AdminProductCreate />} />
          <Route path="edit/:id" element={<AdminProductEdit />} />
          <Route path="review" element={<AdminProductReview />} />
          <Route path="inventory" element={<AdminProductInventory />} />
          <Route path="print_qrcode" element={<AdminProductPrintQRCode />} />
        </Route>
        <Route path="evoucher" element={<Evouncher />} />
        <Route path="categories" element={<AdminCategory />} />
        <Route path="suppliers">
          <Route index element={<AdminSupplier />} />
          <Route path="create" element={<AdminSupplierCreate />} />
          <Route path="edit/:id" element={<AdminSupplierEdit />} />
        </Route>
        <Route path="orders">
          <Route index element={<AdminOrderList />} />
          <Route path=":id" element={<AdminOrderDetail />} />
          <Route path="bill" element={<div>Order Bill</div>} />
        </Route>
        <Route path="manage-seller">
          <Route index element={<SellerInfo />} />
          <Route path="role" element={<RoleManage />} />
        </Route>
        <Route path="ships">
          <Route index element={<AdminShipOverview />}></Route>
        </Route>
        <Route path="reports">
          {/* <Route path="profit" element={<AdminReportProfit />} /> */}
          <Route path="sales" element={<AdminReportSales />} />
        </Route>
        <Route path="dev_center">
          <Route path="biz_efficiency" element={<AdminBusinessEfficiency />} />
          <Route path="traffic_website" element={<AdminTrafficWebsite />} />
          <Route path="product_insight" element={<div>Chỉ số sản phẩm</div>} />
          <Route path="operational_efficiency" element={<AdminOperationalEfficiency />} />
        </Route>
        <Route path="settings">
          <Route index element={<SettingMain />} />
          <Route path="logs" element={<Logs />} />
          <Route path="bin" element={<AdminProductBin />} />
        </Route>
      </Route>

      <Route path="/admin/super" element={protectedSuperAdminLayout}>
        <Route index element={<DashboardSuperAdmin />} />
        <Route path="review" element={<Shops />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="auth" element={<AuthUser />} />
        <Route path="auth/verify-otp" element={<CheckOtp />} />
        <Route path="auth/changepass" element={<ChangePass />} />
        <Route path="auth/send-otp" element={<EmailForm />} />
        <Route path="admin/shop/auth/switch" element={<SwitchPageAdmin />} />
        <Route path="admin/shop/auth/signin" element={<SigninAdmin />} />
        <Route path="admin/shop/auth/signup" element={<SignupAdmin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
