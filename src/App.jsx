import { Outlet, Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";

// importing pages and components
import Homepage from "./pages/Homepage";
import Navbar from "./custom_components/Navbar";
import Errorpage from "./pages/Errorpage";
import Authpage from "./pages/Authpage";
import OTPpage from "./pages/OTPpage";
import Cartpage from "./pages/Cartpage";
import ForgotPasswordpage from "./pages/ForgotPasswordpage";
import ResetPasswordpage from "./pages/ResetPasswordpage";
import ProtectedRoutepage from "./pages/ProtectedRoute";
import Dashboardpage from "./pages/Dashboardpage";
import Profilepage from "./pages/Profilepage";
import AddProductpage from "./pages/AddProductpage";
import Unauthorizedpage from "./pages/Unauthorizedpage";
import ProductListpage from "./pages/ProductListpage";
import ProductDetailpage from "./pages/ProductDetailpage";
import Successpage from "./pages/Successpage";
import Cancelpage from "./pages/Cancelpage";
import Spinner from "./custom_components/Spinner";

// importing lazy components
const Productspage = lazy(() => import("./pages/Productspage"));
const Categorypage = lazy(() => import("./pages/Categorypage"));
const MyOrderspage = lazy(() => import("./pages/MyOrderspage"));
const ReceivedOrderspage = lazy(() => import("./pages/ReceivedOrderspage"));

const App = () => {
  return (
    <main>
      <Navbar />
      <Outlet />

      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Authpage />} />
          <Route path="/signup" element={<Authpage />} />
          <Route path="/otp-verification" element={<OTPpage />} />
          <Route path="/forgot-password" element={<ForgotPasswordpage />} />
          <Route path="/reset-password/:id" element={<ResetPasswordpage />} />
          <Route path="/products" element={<Productspage />} />
          <Route path="/products/product/:id" element={<ProductDetailpage />} />
          <Route path="/products/:category" element={<Categorypage />} />
          <Route path="/payment/success" element={<Successpage />} />
          <Route path="/payment/cancel" element={<Cancelpage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoutepage>
                <Cartpage />
              </ProtectedRoutepage>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutepage>
                <Dashboardpage />
              </ProtectedRoutepage>
            }
          >
            <Route index element={<Profilepage />} />
            <Route path="profile" element={<Profilepage />} />
            <Route path="add-product" element={<AddProductpage />} />
            <Route path="product-list" element={<ProductListpage />} />
            <Route path="myOrders" element={<MyOrderspage />} />
            <Route path="receivedOrders" element={<ReceivedOrderspage />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorizedpage />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
