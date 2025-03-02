import { useGetNewProductsQuery } from "../redux/api/productApiSlice.js";
import Loader from "./Loader.jsx";
// import SmallProducts from "../pages/Products/SmallProducts.jsx";
import ProductCarousel from "../pages/Products/ProductCarousel.jsx";

const Header = () => {
  const { data, isLoading, error } = useGetNewProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  if (!data || data.length === 0) {
    return <h1>No data available</h1>;
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                {/* <SmallProducts product={product} /> */}
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
