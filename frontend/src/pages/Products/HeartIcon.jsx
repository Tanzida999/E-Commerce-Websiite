import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoritesToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];

  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, [dispatch]);
  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      //remove product from the localstorage as well

      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      //add the product to localStorage as well
      addFavoritesToLocalStorage(product);
    }
  };
  return (
    <div
      onClick={toggleFavorites}
      className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavorite ? (
        <FaHeart className="text-pink-600" />
      ) : (
        <FaRegHeart className="text-White" />
      )}
    </div>
  );
};

export default HeartIcon;
