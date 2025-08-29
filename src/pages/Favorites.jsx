import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import { useFavorites } from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFavorites = favorites.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {favorites.length === 0 ? (
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
          <span className="text-8xl">🍳</span>
          <h3 className="text-5xl font-semibold text-gray-700 mt-12 mb-2 font-heading">
            No favorites yet!
          </h3>
          <p className="text-gray-500 mb-6 font-body text-2xl mt-4">
            Browse our recipes and add your favorites to see them here.
          </p>
          <Link
            to="/"
            className="bg-[#fcca59] text-white px-12 py-5 rounded-lg hover:bg-yellow-400 transition-colors duration-200 inline-block font-body font-bold shadow-md text-3xl mt-4"
          >
            Explore Recipes
          </Link>
        </main>
      ) : (
        // Standard layout for the list view
        <main className="container mx-auto px-4 py-8 pt-36">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-heading">
              Your Favorite Recipes
            </h2>
            <p className="text-gray-600 max-w-2xl text-xl mx-auto font-body">
              You have {favorites.length} favorite recipe
              {favorites.length !== 1 ? "s" : ""} saved. Cook them anytime!
            </p>
          </div>

          <div className="flex flex-col items-center">
            {favorites.length > 3 && (
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                placeholder="Search your favorite recipes..."
              />
            )}

            {filteredFavorites.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2 font-heading">
                  No favorites found
                </h3>
                <p className="text-gray-500 font-body">
                  No recipes match "{searchTerm}". Try another search.
                </p>
              </div>
            ) : (
              <div className="w-full mt-6">
                {searchTerm && (
                  <div className="text-center mb-6">
                    <p className="text-gray-600 font-body">
                      Found {filteredFavorites.length} recipe
                      {filteredFavorites.length !== 1 ? "s" : ""} for "
                      {searchTerm}"
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFavorites.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      from="favorites"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default Favorites;