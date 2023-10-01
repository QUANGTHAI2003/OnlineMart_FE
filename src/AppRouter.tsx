import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminMainLayout from "./app/components/layouts/admin/AdminMainLayout";
import AuthLayout from "./app/components/layouts/auth/AuthLayout";
import RequireAuth from "./app/components/layouts/auth/RequireAuth";
import UserMainLayout from "./app/components/layouts/client/UserMainLayout";
import AI from "./app/pages/AI";
import AccountLayout from "./app/pages/client/account/AccountLayout";
import UserNotification from "./app/pages/client/account/notification/UserNotification";
import UserWishlist from "./app/pages/client/account/wishlist/UserWishlist";
import Cart from "./app/pages/client/home/Cart";
import Payment from "./app/pages/client/home/Payment";
// Components

// Pages
const Dashboard = React.lazy(() => import("@app/app/pages/admin/Dashboard"));
const AuthUser = React.lazy(() => import("@app/app/pages/client/auth/AuthUser"));
const CheckOtp = React.lazy(() => import("@app/app/pages/client/auth/CheckOtp"));
const ChangePass = React.lazy(() => import("@app/app/pages/client/auth/ChangePass"));
const EmailForm = React.lazy(() => import("@app/app/pages/client/auth/Email"));
const NotFound = React.lazy(() => import("@app/app/pages/errors/NotFound"));

// Client
const ProductCategory = React.lazy(() => import("@app/app/pages/client/category/ProductCategory"));
const Home = React.lazy(() => import("@app/app/pages/client/home/Home"));
const ProductDetail = React.lazy(() => import("@app/app/pages/client/ProductDetail/ProductDetail"));

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

const AdminProductList = React.lazy(() => import("@app/app/pages/admin/products/list/Product"));
const Category = React.lazy(() => import("@app/app/pages/admin/products/categories/Category"));
const AdminProductReview = React.lazy(() => import("@app/app/pages/admin/products/review/ProductReview"));
const AdminProductCreate = React.lazy(() => import("@app/app/pages/admin/products/create/ProductCreate"));

const RoleManage = React.lazy(() => import("@app/app/pages/admin/manage_seller/role/RoleManage"));

const AppRouter: React.FC = () => {
  const protectedAdminLayout = (
    <RequireAuth type="adminShop">
      <AdminMainLayout />
    </RequireAuth>
  );

  const protectedClientLayout = (
    <RequireAuth type="client">
      <UserMainLayout />
    </RequireAuth>
  );

  return (
    <Routes>
      <Route path="/" element={protectedClientLayout}>
        <Route index element={<Home />} />
        <Route path="cua-hang" element={<StoreIndex />}></Route>
        <Route path="category" element={<ProductCategory />} />
        <Route path="ai" element={<AI />} />
        <Route path="checkout" element={<Cart />} />
        <Route path="checkout/payment" element={<Payment />} />
        <Route path="product" element={<ProductDetail />} />
        <Route path="search" element={<UserSearch />} />
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
      </Route>
      <Route path="/admin/shop" element={protectedAdminLayout}>
        <Route index element={<Dashboard />} />
        <Route path="products">
          <Route index element={<AdminProductList />} />
          <Route path="create" element={<AdminProductCreate />} />
          <Route path="review" element={<AdminProductReview />} />
        </Route>
        <Route path="categories" element={<Category />} />
        <Route path="orders">
          <Route index element={<div>Order List</div>} />
          <Route path="bill" element={<div>Order Bill</div>} />
        </Route>
        <Route path="info-seller" element={<div>Seller info</div>} />
        <Route path="manage-seller">
          <Route path="role" element={<RoleManage />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="auth" element={<AuthUser />} />
        <Route path="auth/forgot" element={<CheckOtp />} />
        <Route path="auth/changepass" element={<ChangePass />} />
        <Route path="auth/email" element={<EmailForm />} />
        <Route path="admin/shop/auth/switch" element={<SwitchPageAdmin />} />
        <Route path="admin/shop/auth/signin" element={<SigninAdmin />} />
        <Route path="admin/shop/auth/signup" element={<SignupAdmin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
