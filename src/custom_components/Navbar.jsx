import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";
import { useSelector } from "react-redux";
import { Menu, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="relative flex item-center justify-between px-8 md:px-16 lg:px-24 py-4 shadow-lg">
      {/* logo */}
      <h3 className="text-xl font-merinda font-semibold">
        <Link to="/">E-Com</Link>
      </h3>

      {/* navlinks */}
      <div className="flex items-center gap-4">
        <Link to={"/products"}>All Products</Link>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link to={"/addToCart"}>
              <ShoppingCart size={"18"} />
            </Link>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
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
