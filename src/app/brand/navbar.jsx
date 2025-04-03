import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { Search, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

const categories = ["All", "Lighting", "Kitchenware", "Home Decor", "Plants", "Office", "Textiles"]

const Navbar = ({ cartItemCount, onCartClick, onSearch }) => {
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isScrolled, setIsScrolled] = useState(false)
  const searchInputRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false)
      searchInputRef.current?.blur()
    }
  }


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
        <Link href='/' className='flex z-40 font-semibold items-center justify-center gap-x-2 rounded-md'>
            <div className='flex justify-center items-center'>
              <img className="h-16 w-16 object-cover rounded-xl p-2" src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1740647241/CONFERIO/dbbzjpqczmrz7cw8pf3w.png" alt="" />
            </div>
          </Link>
          
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-8">
              <a 
                href="/brand" 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Brand
              </a>
              <a 
                // href="/influencers/influencer-shop"
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Influencers
              </a>
              <a 
                href="#" 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Campaigns
              </a>
              <a 
                href="#" 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Analytics
              </a>
              <a 
                href="#" 
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                Pricing
              </a>
            </nav>
          )}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <SearchIcon size={20} />

            </button>
            {/* <div className="flex-1 px-8 overflow-x-auto flex items-center justify-center gap-6 scrollbar-none">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={`whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "text-zinc-900 dark:text-white text-sm font-medium"
                  : "text-zinc-500 dark:text-zinc-400 text-sm hover:text-zinc-900 dark:hover:text-white"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div> */}

        <div className="flex items-center gap-1.5 shrink-0">
          <motion.div className="relative" initial={false} animate={{ width: isSearchOpen ? "auto" : 0 }}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              className={`w-48 sm:w-56 bg-zinc-100 dark:bg-zinc-800 rounded-md text-sm px-3 py-1.5 
                                focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-700
                                transition-all duration-200 ${isSearchOpen ? "opacity-100" : "opacity-0"}`}
              onChange={(e) => onSearch(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            {isSearchOpen && (
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false)
                  onSearch("")
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-zinc-200 
                                    dark:hover:bg-zinc-700 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>
          {/* <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-1.5 rounded-md transition-colors ${
              isSearchOpen ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Search className="w-4 h-4" />
          </button> */}
          {/* <button
            type="button"
            onClick={onCartClick}
            className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md relative"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartItemCount > 0 && (
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-zinc-900 dark:bg-white 
                                    text-white dark:text-zinc-900 text-xs font-medium w-4 h-4 
                                    flex items-center justify-center rounded-full"
              >
                {cartItemCount}
              </motion.span>
            )}
          </button> */}
        </div>
            
            <button  className="hidden md:block button-primary">
              Dashboard
            </button>
            
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg animate-fade-in">
          <div className="px-4 py-3 space-y-2">
            <a 
              href="#" 
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              Home
            </a>
            <a 
              href="#" 
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              Influencers
            </a>
            <a 
              href="#" 
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              Campaigns
            </a>
            <a 
              href="#" 
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              Analytics
            </a>
            <a 
              href="#" 
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
            >
              Pricing
            </a>
            <div className="pt-2">
              <button className="w-full button-primary">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;