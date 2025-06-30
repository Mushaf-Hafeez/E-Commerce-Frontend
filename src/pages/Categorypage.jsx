import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../services/product";

import toast from "react-hot-toast";
import { Input } from "../components/ui/input";
import Spinner from "../custom_components/Spinner";
import Product from "../custom_components/Product";

const Categorypage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (search !== "") {
    products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // get the category from the url
  const { category } = useParams();

  const fetchProducts = async () => {
    setIsLoading(true);
    const response = await getProductsByCategory(category);
    if (response.success) {
      setProducts(response.products);
      setFilteredProducts(response.products);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (search && search !== "") {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col gap-2 px-6 md:px-16 lg:px-24 py-5">
      <h2 className="text-2xl font-semibold">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
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
          {products && products.length === 0 ? (
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

export default Categorypage;
