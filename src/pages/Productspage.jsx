import { useEffect, useState } from "react";

import { products } from "../services/product";
import Spinner from "../custom_components/Spinner";
import toast from "react-hot-toast";

import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import Product from "../custom_components/Product";

const Productspage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    const response = await products();
    if (response.success) {
      setAllProducts(response.products);
      setFilteredProducts(response.products);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  // Filter products when search changes
  useEffect(() => {
    if (search && search !== "") {
      const filtered = allProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col gap-2 px-6 md:px-16 lg:px-24 py-5">
      <h2 className="text-2xl font-semibold">All Products</h2>
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={"w-52"}
        placeholder="Search products..."
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {allProducts && allProducts.length === 0 ? (
            "No product"
          ) : (
            <div className="h-full w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((item, index) => (
                <Product item={item} key={index} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Productspage;
