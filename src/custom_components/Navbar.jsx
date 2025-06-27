import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { ToggleButton } from "./ToggleButton";
import { logout } from "../services/auth";
import toast from "react-hot-toast";

import { setIsAuthenticated } from "../redux/slices/authSlice";
import {
  setName,
  setEmail,
  setProfilePic,
  setRole,
} from "../redux/slices/profileSlice";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { name, profilePic } = useSelector((state) => state.profile);
  const { cartlist } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout function
  const handleClick = async () => {
    const response = await logout();
    if (response.success) {
      localStorage.clear();
      dispatch(setIsAuthenticated(null));
      dispatch(setName(null));
      dispatch(setEmail(null));
      dispatch(setProfilePic(null));
      dispatch(setRole(null));
      toast.success(response.message);
      navigate("/");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <nav className="relative flex item-center justify-between px-8 md:px-16 lg:px-24 py-4 shadow-lg">
      {/* logo */}
      <h3 className="text-xl font-merinda font-semibold">
        <Link to="/">
          E<span className="text-primary">-</span>
          Com
        </Link>
      </h3>

      {/* navlinks */}
      <div className="flex items-center gap-4">
        <Link to={"/products"}>Products</Link>
        <ToggleButton />
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link to={"/cart"} className="relative">
              <span className="absolute -top-4 left-2 bg-primary rounded-full px-2 py-0.5 animate-bounce text-[10px]">
                {cartlist.length}
              </span>
              <ShoppingCart size={"18"} />
            </Link>
            <div className="relative group">
              <Avatar
                onClick={() => navigate("/dashboard/profile")}
                className={"cursor-pointer"}
              >
                <AvatarImage src={profilePic} className={"object-cover"} />
                <AvatarFallback className={"bg-zinc-900 text-white"}>
                  {name.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -left-5 py-2 bg-zinc-100 dark:bg-zinc-900 text-sm hidden group-hover:flex flex-col items-start gap-1 rounded-md shadow-md">
                <Link
                  className="px-2 py-1 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  to={"/dashboard/profile"}
                >
                  Profile
                </Link>
                <button
                  className="w-full px-2 py-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  onClick={handleClick}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Button className={"rounded-full "} asChild>
            <Link to={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
