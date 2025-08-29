import { useState, useEffect } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext.js";

const loadFavoritesFromStorage = () => {
  try {
    const savedFavorites = localStorage.getItem("pinoy-recipe-favorites");
    console.log("Loading from localStorage:", savedFavorites);
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem("pinoy-recipe-favorites", JSON.stringify(favorites));
    console.log("💾 Saved to localStorage:", favorites);
  } catch (error) {
    console.error("Error saving favorites:", error);
  }
};

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    console.log("Initializing FavoritesProvider...");
    return loadFavoritesFromStorage();
  });

  useEffect(() => {
    console.log("🔄 Favorites changed, saving to localStorage...", favorites);
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  const addToFavorites = (recipe) => {
    setFavorites((prev) => {
      // check kung nasa favs na ang recipe
      if (prev.some((fav) => fav.id === recipe.id)) {
        return prev;
      }
      return [...prev, recipe];
    });
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== recipeId));
  };

  const isFavorite = (recipeId) => {
    return favorites.some((fav) => fav.id === recipeId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    favoritesCount: favorites.length,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export default FavoritesProvider;
