import { useLocation } from "react-router-dom";

// importing components
import Login from "../custom_components/Login";
import Signup from "../custom_components/Signup";

const Authpage = () => {
  const { pathname } = useLocation();

  return (
    <div>{pathname.toLowerCase() === "/signup" ? <Signup /> : <Login />}</div>
  );
};

export default Authpage;
