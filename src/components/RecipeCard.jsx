import { Heart, HeartPulse, Soup } from "lucide-react";
import React, { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const getInitialFavorites = () => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("favorites")) || [];
      } catch {
        return [];
      }
    }
    return [];
  };
  
  const [isFavorite, setIsFavorite] = useState(() =>
    getInitialFavorites().some((fav) => fav.idMeal === recipe.idMeal)
  );
const addRecipeToFavorites = () => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isFavoriteExists = favorites.some((fav) => fav.idMeal === recipe.idMeal);
  if (isFavoriteExists) {
    favorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
    setIsFavorite(false);

  } else {
    favorites.push(recipe);
    setIsFavorite(true);
 }
  localStorage.setItem("favorites", JSON.stringify(favorites)); 
}

  return (
    <div className="flex flex-col rounded-md bg-[#ecf7d4] overflow-hidden p-3 relative">
      <a
        href={recipe.strYoutube || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="relative h-32"
      >
      <div className="skeleton absolute inset-0 " />
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
          onLoad={(e)=>{
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        />

        <div className="absolute bottom-2 left-2 bg-white p-1 rounded-full flex items-center gap-1 text-sm cursor-pointer">
          <Soup size={16} /> {recipe.strCategory}
        </div>

        <div className="absolute right-2 top-1 bg-white p-1 rounded-full cursor-pointer"
        onClick={(e)=>{
          e.preventDefault();
          addRecipeToFavorites();

        }}>

          {!isFavorite && <Heart size={20} className="hover:fill-red-500 hover:text-red-500" />}
          {isFavorite && <Heart size={20} className="fill-red-500 text-red-500" />}
        </div>
      </a>

      <div className="mt-1 flex">
        <p className="font-bold tracking-wide">{recipe.strMeal}</p>
      </div>

      <p className="my-2 text-sm text-gray-600">{recipe.strArea} Cuisine</p>

      <p className="text-sm text-gray-700 line-clamp-3">
        {recipe.strInstructions}
      </p>

      {recipe.strYoutube && (
        <a
          href={recipe.strYoutube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-sm mt-2"
        >
          Watch on YouTube
        </a>
      )}
    </div>
  );
};

export default RecipeCard;
