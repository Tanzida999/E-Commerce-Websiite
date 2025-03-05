import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  selectFavoriteProduct,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import { getFavoritesFromLocalStorage } from "../../Utils/localStorage";
import Product from "./Product";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavoriteProduct);

  useEffect(() => {
    const storedFavorites = getFavoritesFromLocalStorage();
    dispatch(setFavorites(storedFavorites)); // ✅ Load localStorage on mount
  }, [dispatch]);

  return (
    <div className="ml-[10rem]">
      <h1 className="text-lg font-bold ml-[3rem] mt-3">FAVORITE PRODUCTS</h1>
      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
