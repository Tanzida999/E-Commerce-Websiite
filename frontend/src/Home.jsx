import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice.js";
import Loader from "./components/Loader.jsx";
import Header from "./components/Header.jsx";
import Message from "./components/Message.jsx";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return <>{!keyword ? <Header /> : null}</>;
};

export default Home;
