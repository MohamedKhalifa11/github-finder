import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GitHubUser } from "../types";

interface FavoritesState {
  favorites: GitHubUser[];
}

const initialState: FavoritesState = {
  favorites: [],
};

// Create a Redux slice for managing favorite GitHub users
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    // Add a user to favorites if not already present
    addFavorite: (state, action: PayloadAction<GitHubUser>) => {
      const existingIndex = state.favorites.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (existingIndex === -1) {
        state.favorites.push(action.payload);
      }
    },
    // Remove a user from favorites by their ID
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter(
        (user) => user.id !== action.payload,
      );
    },
    // Toggle a user in the favorites list (add if not present, remove if already exists)
    toggleFavorite: (state, action: PayloadAction<GitHubUser>) => {
      const existingIndex = state.favorites.findIndex(
        (user) => user.id === action.payload.id,
      );
      if (existingIndex === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(existingIndex, 1);
      }
    },
  },
});

// Use these actions in components
export const { addFavorite, removeFavorite, toggleFavorite } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
