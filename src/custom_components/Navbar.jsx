import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { ToggleButton } from "./ToggleButton";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { name, profilePic } = useSelector((state) => state.profile);

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
        <Link to={"/products"}>All Products</Link>
        <ToggleButton />
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link to={"/addToCart"}>
              <ShoppingCart size={"18"} />
            </Link>
            <Avatar>
              <AvatarImage src={profilePic} />
              <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
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
