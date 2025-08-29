import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";

const RecipeCard = ({ recipe, from = "recipes" }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  const isRecipeFavorite = isFavorite(recipe.id);

  return (
    <div className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-128 w-112 flex flex-col">
        <div className="relative h-75 overflow-hidden flex-shrink-0">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "/assets/placeholder-recipe.svg";
            }}
          />

          {/* Favorites Heart Button */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 hover:scale-110 cursor-pointer ${
              isRecipeFavorite
                ? "bg-red-400 text-white shadow-lg"
                : "bg-white bg-opacity-90 text-gray-600 hover:bg-opacity-100"
            }`}
            aria-label={
              isRecipeFavorite ? "Remove from favorites" : "Add to favorites"
            }>
            <Heart
              className="w-5 h-5"
              fill={isRecipeFavorite ? "currentColor" : "none"}
              stroke="currentColor"
            />
          </button>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-[26px] font-semibold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors duration-200 font-heading">
            {recipe.name}
          </h3>
          <p className="text-gray-600 text-lg line-clamp-3 leading-relaxed flex-grow font-body">
            {recipe.description}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-md text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-body">
              {recipe.ingredients?.length || 0} ingredients
            </span>

            <Link
              to={`/recipe/${recipe.id}`}
              state={{ from }}
              className="text-yellow-500 text-base font-medium font-body shadow-lg rounded-full bg-white border-2 border-yellow-400 px-6 py-3 hover:bg-yellow-400 hover:text-white transition-colors duration-300">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
