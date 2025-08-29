import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import recipesData from "../data/recipes.json";

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // load recipes on component mount
  useEffect(() => {
    try {
      setRecipes(recipesData);
      setFilteredRecipes(recipesData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading recipes:", error);
      setLoading(false);
    }
  }, []);

  // filter recipes based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, recipes]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading delicious recipes...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="w-full bg-[#fcca59] py-22 h-180 flex flex-col items-center justify-center">
        <div className="text-center mb-8 mt-30 opacity-100 container mx-auto px-4 flex flex-col items-center justify-center">
          <h2 className="text-6xl max-w-3xl font-medium text-gray-800 mb-4 font-serif">
            Discover Timeless Flavors
          </h2>
          <p className="text-gray-600 text-[22px] max-w-4xl pt-4 px-4 mx-auto text-center font-body">
            Explore Filipino recipes you&apos;ll love! From classic favorites
            to everyday comfort food, enjoy recipes made simple and delicious.
            Perfect for everyday meals or special occasions, bring the taste of
            the Philippines straight to your kitchen.
          </p>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder="Search for recipes, ingredients, or dishes..."
        />
      </div>

      <main className="container mx-auto px-4 py-8 pt-4">
        <h2 className="text-center font-bold text-[48px] pt-10 pb-10 font-serif">
          Classic Filipino Recipes
        </h2>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 font-heading">
              No recipes found
            </h3>
            <p className="text-gray-500 font-body">
              {searchTerm
                ? `No recipes match "${searchTerm}". Try a different search term.`
                : "No recipes available at the moment."}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 px-6.5">
              <p className="text-gray-600">
                {searchTerm
                  ? `Found ${filteredRecipes.length} recipe${
                      filteredRecipes.length !== 1 ? "s" : ""
                    } for "${searchTerm}"`
                  : `Showing all ${filteredRecipes.length} recipes`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-14 justify-items-center">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Homepage;