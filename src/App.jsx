import { Outlet, Route, Routes } from "react-router-dom";

// importing pages and components
import Homepage from "./pages/Homepage";
import Navbar from "./custom_components/Navbar";
import Errorpage from "./pages/Errorpage";
import Authpage from "./pages/Authpage";
import Products from "./pages/Productspage";
import OTPpage from "./pages/OTPpage";
import Cartpage from "./pages/Cartpage";
import ForgotPasswordpage from "./pages/ForgotPasswordpage";
import ResetPasswordpage from "./pages/ResetPasswordpage";

const App = () => {
  return (
    <main>
      <Navbar />
      <Outlet />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Authpage />} />
        <Route path="/signup" element={<Authpage />} />
        <Route path="/signup" element={<Authpage />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/otp-verification" element={<OTPpage />} />
        <Route path="/forgot-password" element={<ForgotPasswordpage />} />
        <Route path="/reset-password/:id" element={<ResetPasswordpage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </main>
  );
};

export default App;
