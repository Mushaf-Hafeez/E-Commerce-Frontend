import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { Switch } from "../components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { myProducts, updateStock } from "../services/product";

const ProductListpage = () => {
  const [products, setProducts] = useState([]);
  const { role } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await myProducts();
    if (response.success) {
      setProducts(response.myProducts);
    } else {
      toast.error(response.message);
    }
    return;
  };

  const toggleStock = async (id) => {
    setProducts(
      products.map((product) =>
        product._id === id
          ? {
              ...product,
              inStock: !product.inStock,
            }
          : product
      )
    );
    const response = await updateStock(id);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  useEffect(() => {
    if (role !== "seller") {
      navigate("/unauthorized");
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-full w-full px-2 flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">product List</h2>
      <Table className={"rounded-md text-bllack dark:text-white"}>
        <TableHeader className={"border-b border-zinc-700"}>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className={"text-right"}>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products &&
            products.length > 0 &&
            products.map((product) => (
              <TableRow
                key={product._id}
                className={"border-b border-zinc-700"}
              >
                <TableCell>
                  <img
                    className="size-20 object-cover rounded-md"
                    src={product.productImages[0]}
                    alt="product image"
                  />
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell className={"text-right"}>
                  <Switch
                    onClick={() => toggleStock(product._id)}
                    checked={product.inStock}
                    className={"cursor-pointer"}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductListpage;
