import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);
  const [image, setImage] = useState(productData?.image || "");

  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [stock, setStock] = useState(productData?.countInStock || "");

  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name || "");
      setDescription(productData.description);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setCategory(productData.categories?.[0]?._id || "");
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Item added Successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Item Added Successfully");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name is required!");
      return;
    }

    try {
      const productDetails = {
        _id: params._id,
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
        image,
      };

      console.log("Updating product with:", productDetails);

      const { data, error } = await updateProduct(productDetails);

      console.log("API response:", data, error);

      if (error) {
        toast.error(error.message || "Update failed");
      } else {
        toast.success("Product Successfully Updated");
        navigate("/admin/allproducts");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Product update failed");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are You sure you want to delete this product?"
      );
      if (!answer) return;
      const { data } = await deleteProduct(params._id);
      toast.success(`${data.name} is deleted`);
      navigate("/admin/allproducts");
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed Try again.");
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md-w-3/4 p-3">
          <div className="h-12">Update Product</div>
          <div className="mb-3">
            <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold ">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name"> Name</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[3-rem] border rounded-lg bg-white text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block"> Price</label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[3-rem] border rounded-lg bg-white text-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block"> Quantity</label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[3-rem] border rounded-lg bg-white text-black"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block"> Brand</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[3-rem] border rounded-lg bg-white text-black"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-4">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-white border rounded-lg w-[95%] text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="ml-6">
                <label htmlFor=""> Category</label>
                <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-white text-black"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
              >
                Delette
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
