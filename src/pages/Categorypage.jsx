import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../services/product";

import toast from "react-hot-toast";
import { Input } from "../components/ui/input";
import Spinner from "../custom_components/Spinner";
import Product from "../custom_components/Product";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Categorypage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // get the category from the params
  let { category: urlCategory } = useParams();
  const [category, setCategory] = useState(urlCategory);

  if (search !== "") {
    products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

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
    fetchProducts();
  }, [category]);

  useEffect(() => {
    if (search && search !== "") {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  return (
    <div className="min-h-screen w-full flex flex-col gap-2 px-6 md:px-16 lg:px-24 py-5">
      <h2 className="text-2xl font-semibold">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </h2>
      <div className="flex items-center justify-between">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={"w-52"}
          placeholder="Search products..."
        />

        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="keyboard">Keyboard</SelectItem>
              <SelectItem value="mouse">Mouse</SelectItem>
              <SelectItem value="mousepad">Mousepad</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
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
