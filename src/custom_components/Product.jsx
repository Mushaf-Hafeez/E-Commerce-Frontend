import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardAction,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ToggleGroup } from "../components/ui/toggle-group";

import { Star } from "lucide-react";
import { addToCart, removeFromCart } from "../services/cart";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../redux/slices/cartSlice";
import { useEffect, useState } from "react";

const Product = ({ item }) => {
  const [index, setIndex] = useState();

  const { cartlist } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // function to add product
  const add = async () => {
    const response = await addToCart(item._id);
    if (response.success) {
      dispatch(addProductToCart(response.cartItem));
      localStorage.setItem("cart", JSON.stringify(cartlist));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  // function to remove product
  // const remove = async () => {
  //   const response = await removeFromCart(item._id);
  //   if (response.success) {
  //     if (response.cartItem) {
  //       dispatch(removeFromCart(response.cartItem));
  //       localStorage.setItem("cart", JSON.stringify(cartlist));
  //       toast.success(response.message);
  //     }
  //   } else {
  //     toast.error(response.message);
  //   }
  // };

  useEffect(() => {
    const index = cartlist.findIndex(
      (cartItem) => cartItem.productId._id === item._id
    );
    setIndex(index);
  }, [cartlist]);

  return (
    <Card className="flex flex-col gap-2 shadow-xl">
      <img
        src={item.productImages[0]}
        alt="product image"
        className="h-52 object-cover"
      />
      <CardContent className={"px-2 space-y-1"}>
        <CardDescription>{item.category}</CardDescription>
        <h3>{item.name.slice(0, 20)}</h3>
        <CardDescription className="flex items-center gap-0.5">
          {Array(4)
            .fill("_")
            .map((_, index) => (
              <Star key={index} size={"20"} strokeWidth={0} fill="#ffbd07" />
            ))}
          ({item.rating})
        </CardDescription>
      </CardContent>
      <CardFooter className={"flex items-center justify-between px-2"}>
        <h3 className="text-primary text-xl font-semibold">Rs {item.price}</h3>
        {index !== -1 ? (
          <div className="flex items-center rounded-md overflow-hidden">
            <Button className={"rounded-[0px]"} size={"icon"}>
              -
            </Button>
            <Button className={"rounded-[0px]"} size={"icon"}>
              {cartlist[index]?.quantity}
            </Button>
            <Button className={"rounded-[0px]"} onClick={add} size={"icon"}>
              +
            </Button>
          </div>
        ) : (
          <Button onClick={add} className={"cursor-pointer"}>
            Add
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Product;
