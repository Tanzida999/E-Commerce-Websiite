import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const { _id } = useParams();
  const { data: productData } = useGetProductByIdQuery(_id);
  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addProductReview] = useCreateReviewMutation();

  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setQuantity(productData.quantity || "");
      setBrand(productData.brand || "");
      setStock(productData.countInStock || "");
      setImage(productData.image || "");
      setCategory(productData.category || "");
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name is required!");
      return;
    }
    try {
      await updateProduct({
        _id,
        name,
        description,
        price,
        quantity,
        brand,
        countInStock: stock,
        image,
        category,
      }).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/allproducts");
    } catch (error) {
      toast.error("Product update failed");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(_id).unwrap();
        toast.success("Product deleted successfully");
        navigate("/admin/allproducts");
      } catch (error) {
        toast.error("Delete failed. Try again.");
      }
    }
  };

  const handleReviewSubmit = async () => {
    if (!rating || !comment) {
      toast.error("Both rating and comment are required!");
      return;
    }

    try {
      await addProductReview({
        productId: _id,
        rating,
        comment,
      }).unwrap();
      toast.success("Review added successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add review");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AdminMenu />
        <div className="col-span-3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Update Product</h2>
          <label className="block cursor-pointer border p-3 rounded-lg text-center font-bold bg-gray-100">
            {image ? "Change Image" : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={uploadFileHandler}
              className="hidden"
            />
          </label>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-3 rounded-lg w-full"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded-lg w-full mt-4"
          ></textarea>

          {/* Review fields */}
          {/* <div className="col-span-2 mt-4">
            <label className="block">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-3 rounded-lg w-full"
            />
          </div>
          <div className="col-span-2 mt-4">
            <label className="block">Comment</label>
            <textarea
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-3 rounded-lg w-full"
            ></textarea>
          </div> */}

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-6 py-3 rounded-lg"
            >
              Delete
            </button>
            {/* <button
              onClick={handleReviewSubmit}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4"
            >
              Add Review
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
