import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice.js";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings.jsx";

const ProductDetails = () => {
  const { id: productID } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setCOmment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productID);

  const { useInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  return (
    <>
      <div>
        <Link
          to="/"
          className="text-black font-semibold hober:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap  items-between mt-[2rem] ml-[10rem]">
            <div className="flex-shrink-0 mr-[2rem]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]"
              />

              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-2 xl:w-[35rem] lg:w-[45rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}{" "}
              </p>
              <p className="text-3xl my-2 font-extrabold">${product.price}</p>
              <div className="flex items center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-black " />
                    Brand: {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaClock className="mr-2 text-black " />
                    Added:{" "}
                    {product.createdAt
                      ? moment(product.createdAt).fromNow()
                      : "N/A"}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-black " />
                    Reviews: {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" />
                    Rating: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white" />
                    Quantity: {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaBox className="mr-2 text-white" />
                    In Stock: {product.countInStock}
                  </h1>
                </div>
              </div>
              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
