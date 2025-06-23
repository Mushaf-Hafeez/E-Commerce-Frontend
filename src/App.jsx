import { Outlet, Route, Routes } from "react-router-dom";

// importing pages and components
import Homepage from "./pages/Homepage";
import Navbar from "./custom_components/Navbar";
import Errorpage from "./pages/Errorpage";
import Authpage from "./pages/Authpage";
import Products from "./pages/Products";
import OTP from "./pages/OTP";

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
        <Route path="//otp-verification" element={<OTP />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </main>
  );
};

export default App;
