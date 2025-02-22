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
    return (
      <div className="text-red-500 text-center">Error Loading Products</div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <AdminMenu />
      <div className="p-3">
        <div className="ml-8 text-xl font-bold h-12">
          All Products ({products.length})
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length === 0 ? (
            <div className="text-center w-full">No products available</div>
          ) : (
            products.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block"
              >
                <div className="flex flex-col bg-white shadow-md rounded-md h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                  <div className="p-4 flex-1">
                    <div className="flex justify-between">
                      <h5 className="text-xl font-semibold">{product?.name}</h5>
                      <p className="text-gray-400 text-sm">
                        {moment(product.createAt).format("MMM Do YYYY")}
                      </p>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      {product?.description?.substring(0, 160)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/admin/product/update/${product._id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300"
                      >
                        Update Product{" "}
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="home"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </Link>
                      <p className="text-xl font-semibold">${product?.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
