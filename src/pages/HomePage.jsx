import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { Search } from 'lucide-react';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const cuisineList = [
    "Indian", "Italian", "Mexican", "Turkish", "American",
    "British", "Chinese", "French", "Japanese", "Thai", "Greek"
  ];

  const fetchRecipes = async (query = "chicken", initialLoad = false) => {
    setLoading(true);
    setRecipes([]);

    const isCuisine = cuisineList.map(c => c.toLowerCase()).includes(query.toLowerCase());

    try {
      if (isCuisine) {
        const cuisineRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`);
        const cuisineData = await cuisineRes.json();

        if (!cuisineData.meals) {
          setRecipes([]);
          return;
        }

        const detailPromises = cuisineData.meals.slice(0, 10).map(meal =>
          fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
            .then(res => res.json())
            .then(data => data.meals[0])
        );

        const fullMeals = await Promise.all(detailPromises);
        setRecipes(initialLoad ? fullMeals.slice(0, 9) : fullMeals);
      } else {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();
        setRecipes(initialLoad ? (data.meals || []).slice(0, 9) : (data.meals || []));
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIndianMealsRandomized = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian");
      const data = await res.json();
      const allMeals = data.meals;

      if (!allMeals) {
        setRecipes([]);
        return;
      }

      const shuffledMeals = allMeals.sort(() => 0.5 - Math.random());
      const selectedMeals = shuffledMeals.slice(0, 9);

      const detailedPromises = selectedMeals.map(meal =>
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
          .then(res => res.json())
          .then(data => data.meals[0])
      );

      const detailedMeals = await Promise.all(detailedPromises);
      setRecipes(detailedMeals);
    } catch (err) {
      console.error("Failed to fetch Indian meals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndianMealsRandomized();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(searchQuery);
  };

  return (
    <div className='bg-[#faf9fb] p-10 flex-1'>
      <div className='max-w-screen-lg mx-auto'>
        <form onSubmit={handleSearch}>
          <label className='input shadow-md flex items-center gap-2 p-2 rounded-lg bg-white'>
            <Search size={24} />
            <input
              type="text"
              placeholder='What do you want to cook today?'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='bg-transparent outline-none w-full'
            />
          </label>
        </form>

        <p className='font-bold text-3xl md:text-5xl mt-6'>Recommended Recipes</p>
        <h1 className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>Popular Dishes</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
          {loading
            ? Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="animate-pulse flex flex-col gap-3 p-4 bg-white rounded-xl shadow-md">
                  <div className="h-32 bg-gray-200 rounded-md w-full"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              ))
            : recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
