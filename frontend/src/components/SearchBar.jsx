import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, products } = useContext(ShopContext)
  const [searchResults, setSearchResults] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  
  // Show search by default on collection page
  useEffect(() => {
    if (location.pathname === '/collection') {
      setShowSearch(true)
    } else {
      setShowSearch(false)
      setSearch('') // Clear search when leaving collection page
    }
  }, [location.pathname, setShowSearch, setSearch])

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  // Close search on click outside, except on collection page
  const handleClickOutside = (e) => {
    if (location.pathname === '/collection') return;
    
    if (e.target.id !== 'searchInput' && e.target.id !== 'searchButton') {
      setShowSearch(false)
    }
  }

  // Add click outside listener
  useEffect(() => {
    if (showSearch) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showSearch, location.pathname])
  
  // Filter products for dropdown results
  useEffect(() => {
    if (search && search.trim() !== '') {
      const searchTerm = search.toLowerCase()
      const filteredResults = products.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.subCategory.toLowerCase().includes(searchTerm)
      )
      // Show up to 6 results in dropdown
      setSearchResults(filteredResults.slice(0, 6))
    } else {
      setSearchResults([])
    }
  }, [search, products])
  
  // Navigate to product page when clicked
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
    if (location.pathname !== '/collection') {
      setShowSearch(false)
    }
  }
  
  // Handle "See all results" click
  const handleSeeAllResults = () => {
    navigate('/collection')
    // Don't close search bar as we're going to Collection page
  }

  return (
    <div className={`transition-all duration-300 ease-in-out ${showSearch ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'}`}>
      <div className="border-t border-gray-200 py-4 px-2">
        <div className="relative max-w-2xl mx-auto">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              id="searchInput"
              type="text"
              placeholder="Search products, categories..."
              className="w-full px-4 py-2 focus:outline-none"
              value={search}
              onChange={handleSearchChange}
              autoFocus={showSearch}
            />
            <button 
              id="searchButton" 
              className="bg-gray-100 px-4 py-2 border-l border-gray-300"
            >
              <img src={assets.search_icon} className="w-5 h-5" alt="Search" />
            </button>
          </div>
          
          {/* Scrollable search results dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 shadow-lg rounded-md z-20 max-h-80 overflow-y-auto">
              {searchResults.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleProductClick(product._id)}
                >
                  <img 
                    src={Array.isArray(product.image) ? product.image[0] : product.image} 
                    className="w-12 h-12 object-cover rounded" 
                    alt={product.name} 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.category} • {product.subCategory}</div>
                  </div>
                  <div className="text-sm font-semibold">Rs. {product.price}</div>
                </div>
              ))}
              
              {/* See all results link */}
              {search && search.trim() !== '' && location.pathname !== '/collection' && (
                <div 
                  onClick={handleSeeAllResults}
                  className="text-center py-3 text-blue-600 hover:text-blue-800 cursor-pointer bg-gray-50 hover:bg-gray-100 font-medium text-sm"
                >
                  See all results for "{search}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchBar