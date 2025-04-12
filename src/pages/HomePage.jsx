import {  Search } from 'lucide-react'
import React from 'react'
import RecipeCard from '../components/RecipeCard'

const HomePage = () => {
  return (
    <div className='bg-[#faf9fb] p-10 flex-1 '>HomePage
    <div className='max-w-screen-lg mx-auto'>
     <form>
     <label className='input shadow-md flex items-center gap-2'>
     <Search size={"24"}/>
     <input type="text"
      placeholder='what do you want to cook today?'
      />
      </label>
     </form>
     <p className='font-bold text-3cl md:text-5xl mt-4 '>Recommended Recipes</p>
     <h1 className='text-slate-500 font-semibold ml-1 my-2 text-sm  tracking-tight'>Popular choices</h1>
     
     <div className='grid grid-cols-1  gap-3 md:grid-cols-2 lg:grid-cols-3'>
     <RecipeCard />
     <RecipeCard />
     <RecipeCard />
     <RecipeCard />
     <RecipeCard />
     <RecipeCard />
     <RecipeCard />
     <RecipeCard />
     <RecipeCard />
     </div>
    </div>
    </div>
  )
}

export default HomePage