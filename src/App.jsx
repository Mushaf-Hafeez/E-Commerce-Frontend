import { Outlet, Route, Routes } from "react-router-dom";

// importing pages and components
import Homepage from "./pages/Homepage";
import Navbar from "./custom_components/Navbar";
import Errorpage from "./pages/Errorpage";
import Authpage from "./pages/Authpage";
import Productspage from "./pages/Productspage";
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
import Categorypage from "./pages/Categorypage";
import Successpage from "./pages/Successpage";
import Cancelpage from "./pages/Cancelpage";
import MyOrderspage from "./pages/MyOrderspage";
import ReceivedOrderspage from "./pages/ReceivedOrderspage";

const App = () => {
  return (
    <main>
      <Navbar />
      <Outlet />

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
          <Route
            index
            element={
              <ProtectedRoutepage>
                <Profilepage />
              </ProtectedRoutepage>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoutepage>
                <Profilepage />
              </ProtectedRoutepage>
            }
          />
          <Route
            path="add-product"
            element={
              <ProtectedRoutepage>
                <AddProductpage />
              </ProtectedRoutepage>
            }
          />
          <Route
            path="product-list"
            element={
              <ProtectedRoutepage>
                <ProductListpage />
              </ProtectedRoutepage>
            }
          />
          <Route
            path="myOrders"
            element={
              <ProtectedRoutepage>
                <MyOrderspage />
              </ProtectedRoutepage>
            }
          />
          <Route
            path="receivedOrders"
            element={
              <ProtectedRoutepage>
                <ReceivedOrderspage />
              </ProtectedRoutepage>
            }
          />
        </Route>
        <Route path="/unauthorized" element={<Unauthorizedpage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </main>
  );
};

export default App;
