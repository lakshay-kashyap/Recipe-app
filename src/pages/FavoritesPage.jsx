import React from 'react'
import RecipeCard from '../components/RecipeCard'
const FavoritesPage = () => {
  const fav=true;
  return (
    <div className='bg-[#faf9fb] p-10 flex-1 min-h-screen'>
    <div classname='max-w-screen-lg mx-auto'>
     <p className='font-bold text-3xl md:text-5xl mt-4 '>My Favorite Recipes</p>
     {!fav && (
      <div className='h-[80vh] flex items-center gap-4 flex-col'>
           <img src="404.svg" className='h-3/4' alt="404" />
           <p className='text-2xl font-semibold p-4'>You have not added any favorite recipes</p>
                  </div>
     )}
     {fav &&(
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
       <RecipeCard/>
       <RecipeCard/>
       <RecipeCard/>
       <RecipeCard/>
       <RecipeCard/>
       <RecipeCard/>
      </div>
     )}
    </div>
</div>
  )
}

export default FavoritesPage