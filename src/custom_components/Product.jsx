import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardDescription,
  CardAction,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

import { Star } from "lucide-react";
import { addToCart, removeFromCart } from "../services/cart";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../redux/slices/cartSlice";
import { useEffect, useState } from "react";

const Product = ({ item }) => {
  const [index, setIndex] = useState(-1);
  const { cartlist } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // add product to cart
  const add = async () => {
    dispatch(addProductToCart({ productId: item }));
    const response = await addToCart(item._id);
    if (response.success) {
      toast.success(response.message);
    } else {
      dispatch(removeFromCart({ productId: item }));
      toast.error(response.message);
    }
  };

  // remove product from cart
  const remove = async () => {
    dispatch(removeProductFromCart({ productId: item, setIndex }));
    const response = await removeFromCart(item._id);
    if (response.success) {
      toast.success(response.message);
    } else {
      dispatch(addToCart({ productId: item }));
      toast.error(response.message);
    }
  };

  useEffect(() => {
    // const index =
    //   cartlist &&
    //   cartlist.length > 0 &&
    //   cartlist.findIndex((i) => i.productId._id === item._id);
    // if (index !== -1) {
    //   setIndex(index);
    // }

    if (cartlist && cartlist.length > 0) {
      const foundIndex = cartlist.findIndex(
        (i) => i.productId._id === item._id
      );
      setIndex(foundIndex);
    } else {
      setIndex(-1);
    }

    localStorage.setItem("cart", JSON.stringify(cartlist));
  }, [cartlist, add, remove]);

  // Todo: add and remove api calls
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
        {index === -1 ? (
          <Button onClick={add} className={"cursor-pointer"}>
            Add
          </Button>
        ) : (
          <div className="flex items-center rounded-md overflow-hidden">
            <Button onClick={remove} className={"rounded-[0px]"} size={"icon"}>
              -
            </Button>
            <Button className={"rounded-[0px]"} size={"icon"}>
              {cartlist[index]?.quantity}
            </Button>
            <Button onClick={add} className={"rounded-[0px]"} size={"icon"}>
              +
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Product;
