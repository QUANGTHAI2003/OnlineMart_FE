import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminMainLayout from "./app/components/layouts/admin/AdminMainLayout";
import AuthLayout from "./app/components/layouts/auth/AuthLayout";
import RequireAuth from "./app/components/layouts/auth/RequireAuth";
import UserMainLayout from "./app/components/layouts/client/UserMainLayout";

// Components

// Pages
const LoginAdmin = React.lazy(() => import("@app/app/pages/admin/auth/LoginAdmin"));
const SignupAdmin = React.lazy(() => import("@app/app/pages/admin/auth/SignupAdmin"));
const Dashboard = React.lazy(() => import("@app/app/pages/admin/Dashboard"));
const Product = React.lazy(() => import("@app/app/pages/admin/products/Product"));
const LoginUser = React.lazy(() => import("@app/app/pages/client/auth/LoginUser"));
const SignupUser = React.lazy(() => import("@app/app/pages/client/auth/SignupUser"));
const NotFound = React.lazy(() => import("@app/app/pages/errors/NotFound"));

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
        <Route index element={<div>Trang chủ</div>} />
        <Route path="category" element={<div>Trang danh mục</div>} />
        <Route path="product" element={<div>Trang sản phẩm</div>} />
        <Route path="account" element={<div>Trang tài khoản</div>} />
      </Route>
      <Route path="/admin/shop" element={protectedAdminLayout}>
        <Route index element={<Dashboard />} />
        <Route path="products">
          <Route index element={<Product />} />
          <Route path="create" element={<div>Product Create</div>} />
          <Route path="review" element={<div>Product Review</div>} />
        </Route>
        <Route path="orders">
          <Route index element={<div>Order List</div>} />
          <Route path="bill" element={<div>Order Bill</div>} />
        </Route>
        <Route path="info-seller" element={<div>Info Seller</div>} />
        <Route path="manage-seller" element={<div>Manage Seller</div>} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginUser />} />
        <Route path="signup" element={<SignupUser />} />
        <Route path="admin/shop/login" element={<LoginAdmin />} />
        <Route path="admin/shop/signup" element={<SignupAdmin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
