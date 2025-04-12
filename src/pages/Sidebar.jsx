import { Heart, Home } from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return <>
   <DesktopSidebar />
   <MobileSidebar />
 </>
}
export default Sidebar

const DesktopSidebar=()=>{
    return (  
        <div className="p-3 md:p-10 border-r min-h-screen w-24 md:w-64 hidden sm:block">
        <div className="flex flex-col gap-20 sticky top-10 left-0">
         <div className="w-full">
            <img src="/logo.svg" alt="logo" className="hidden md:block"/>
            <img src="/mobile-logo.svg" alt="logo" className="block md:hidden" />
         </div>
         <ul className="flex flex-col items-center md:items-start gap-8">
         <Link to={"/"} className="flex gap-1">
         <Home />
         <span className="font-bold hidden md:block">Home</span>
         </Link>
         <Link to={"/favorites"} className="flex gap-1">
         <Heart size={24} />
         <span className="font-bold hidden md:block">Favorites</span>
         </Link>
         </ul>
        </div>
        </div>
    )
}

const MobileSidebar=()=>{
  return(
    <div className="flex justify-center fixed w-full bottom-0 left-0 z-10 bg-white gap-10 border-t p-2 sm:hidden">
     <Home size={24} className="cursor-pointer"/>
     <Heart size={24} className="cursor-pointer"/>
    </div>
  )
}