import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice.js";
import Loader from "./components/Loader.jsx";
import Header from "./components/Header.jsx";
import Message from "./components/Message.jsx";
import Product from "./pages/Products/Product.jsx";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword && <Header />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.message}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] text-[3rem]">Special Products</h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem]"
            >
              Shop
            </Link>
          </div>

          <div className="flex justify-center flex-wrap mt-[2rem]">
            {data?.products?.map((product) => (
              <div key={product._id}>
                <Product product={product} />{" "}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
