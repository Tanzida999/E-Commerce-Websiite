import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      // Check if the product is not already in favorites
      const exists = state.some(
        (product) => product._id === action.payload._id
      );
      if (!exists) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      // Remove the product with the matching ID
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorites: (state, action) => {
      // Set favorites from localStorage
      return action.payload;
    },
  },
});

// ✅ Correct way to export actions
export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoriteSlice.actions;

// ✅ Correct selector function
export const selectFavoriteProduct = (state) => state.favorites;

// ✅ Export reducer
export default favoriteSlice.reducer;
