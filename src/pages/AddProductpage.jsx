import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";

import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { CircleX, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { addProduct } from "../services/product";
import { useNavigate } from "react-router-dom";

const AddProductpage = () => {
  const { role } = useSelector((state) => state.profile);
  const [images, setImages] = useState([]);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
    },
  });
  const navigate = useNavigate();

  const removeImage = (name) => {
    setImages(images.filter((image) => image.name !== name));
  };

  const handleChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const onSubmit = async (data) => {
    if (!images || images.length === 0)
      return toast.error("Please select images");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    images.forEach((image) => {
      formData.append("images", image);
    });
    const toastId = toast.loading("loading...");
    const response = await addProduct(formData);
    if (response.success) {
      console.log("response is: ", response);
      setImages([]);
      reset();
      toast.success(response.message, { id: toastId });
    } else {
      toast.error(response.message, { id: toastId });
    }
  };

  useEffect(() => {
    if (role !== "seller") {
      navigate("/unauthorized");
    }
  }, []);

  return (
    <div className="min-h-full w-full px-2 flex flex-col gap-2">
      <h2 className="text-2xl font-semibold">Add product</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-2"
      >
        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Product name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter product name"
            {...register("name", {
              required: "Product name is required",
              maxLength: {
                value: 50,
                message: "Name must be 50 characters or less",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 100,
                message: "Description must be 100 characters or less",
              },
            })}
            id="description"
            cols={24}
            rows={5}
            placeholder="Enter description here"
            className="dark:bg-zinc-900 rounded-md p-2 outline-primary"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Please select a category" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="keyboard">Keyboard</SelectItem>
                  <SelectItem value="mouse">Mouse</SelectItem>
                  <SelectItem value="mousepad">Mousepad</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter price"
            className="w-40"
            min="1"
            {...register("price", {
              required: "Price is required",
              min: { value: 0.01, message: "Price must be greater than 0" },
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Images Upload */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="images"
            className="flex flex-col gap-2 text-zinc-500 dark:bg-zinc-900 p-2 rounded-md cursor-pointer outline-2 outline-zinc-200 dark:outline-zinc-800 dark:hover:bg-zinc-800 transition-colors"
          >
            <Upload size={18} />
            <span className="text-xs">Upload</span>
          </Label>
          <Input
            multiple
            type={"file"}
            id="images"
            onChange={handleChange}
            className={"hidden"}
          />
        </div>
        <div className="flex items-center gap-2">
          {images &&
            images.length > 0 &&
            images.map((image, index) => (
              <div
                key={index}
                className="relative group size-20 rounded-md overflow-hidden flex itmes-center justify-center"
              >
                <img
                  className="object-cover"
                  src={URL.createObjectURL(image)}
                  alt="image"
                />
                <CircleX
                  onClick={() => removeImage(image.name)}
                  className="absolute z-50 top-0 right-0 hidden group-hover:block cursor-pointer"
                  color="black"
                />
              </div>
            ))}
          {images.length === 0 && (
            <span className="text-sm text-red-700">
              <b>NOTE: </b>Images are required
            </span>
          )}
        </div>
        <Button type="submit" className="cursor-pointer">
          Add Product
        </Button>
      </form>
    </div>
  );
};

export default AddProductpage;
