import { useGetNewProductsQuery } from "../redux/api/productApiSlice.js";

const Header = () => {
  const { data, isLoading, error } = useGetNewProductsQuery();
  if (!isLoading && !error) {
    console.log(data);
  }

  return <div className="ml-20">Header</div>;
};

export default Header;
