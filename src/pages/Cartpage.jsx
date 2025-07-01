import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { CircleX } from "lucide-react";
import { removeProductFromCart } from "../redux/slices/cartSlice";
import { removeFromCart } from "../services/cart";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Cartpage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const { cartlist } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Todo: implement onclick functionality
  const remove = async (productId) => {
    dispatch(removeProductFromCart({ productId }));
    localStorage.setItem("cart", JSON.stringify(cartlist));
    const response = await removeFromCart(productId._id);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  // place order function
  const onSubmit = async (data) => {
    if (Object.keys(errors).length > 0) {
      return toast.error("All fields are requried");
    }

    // call the api to place the order
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-2 px-6 md:px-16 lg:px-24">
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-semibold">Shopping Cart</h2>
        <p className="text-primary">{cartlist.length} items</p>
      </div>
      <div className="h-full w-full flex flex-col md:flex-row gap-2">
        <Table className={"w-full md:w-11/12"}>
          <TableHeader className={"border-b border-zinc-700"}>
            <TableRow>
              <TableHead>Product Details</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartlist &&
              cartlist.length > 0 &&
              cartlist.map((item, index) => (
                <TableRow key={index} className={"border-b border-zinc-700"}>
                  <TableCell className={"flex gap-2"}>
                    <img
                      src={item.productId.productImages[0]}
                      alt="product image"
                      className="size-20 object-cover rounded-md"
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="text-lg font-semibold">
                        {item.productId.name}
                      </h2>
                      <p className="text-md text-zinc-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    <CircleX
                      onClick={() => remove(item.productId)}
                      color="red"
                      className="cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Todo: here the form will be added to place the order */}
        <div className="w-full md:w-6/12 md:px-6">
          <h2 className="text-2xl font-semibold text-primary mb-2">
            Place Order
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-between gap-2"
          >
            {/* first name and last name */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  type={"text"}
                  placeHolder={"First name"}
                  {...register("firstName", { required: true })}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  type={"text"}
                  placeHolder={"Last name"}
                  {...register("lastName", { required: true })}
                />
              </div>
            </div>
            {/* email */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type={"email"}
                placeHolder={"email"}
                {...register("email", { required: true })}
              />
            </div>
            {/* street */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                type={"text"}
                placeHolder={"street"}
                {...register("street", { required: true })}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              {/* city */}
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  type={"text"}
                  placeHolder={"city"}
                  {...register("city", { required: true })}
                />
              </div>
              {/* postal code */}
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="postal">Postal code</Label>
                <Input
                  id="postal"
                  type={"number"}
                  placeHolder={"Postal code"}
                  {...register("postal", { required: true, minLength: 5 })}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              {/* province */}
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  type="text"
                  placeHolder={"province"}
                  {...register("province", { required: true })}
                />
              </div>
              {/* country */}
              <div className="w-full flex flex-col gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  type="text"
                  placeHolder={"country"}
                  {...register("country", { required: true })}
                />
              </div>
            </div>
            {/* phone number */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone-number">Phone number</Label>
              <Input
                id="email"
                type={"number"}
                placeHolder={"Phone number"}
                {...register("phone-number", { required: true, minLength: 11 })}
              />
            </div>
            <Button type="submit" className={"cursor-pointer mt-2"}>
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
