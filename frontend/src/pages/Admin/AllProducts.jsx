import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error Loading Products</div>;
  }
  return (
    <div className="container mx-[9rem]">
      <AdminMenu />
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          {" "}
          <div className="ml-[2rem] text-xl font-bold h-12">
            All Products ({products.length})
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
