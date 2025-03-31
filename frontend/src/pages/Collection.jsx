import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const {products, search} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [sortBy, setSortBy] = useState('relevant');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item => item !== e.target.value));
    }
    else{
      setCategory(prev=> [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if(subcategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value));
    }
    else{
      setSubCategory(prev=> [...prev, e.target.value]);
    }
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  }

  const applyFilter = () => {
    let productsCopy = products.slice();
    
    // Apply search filter if search term exists
    if (search && search.trim() !== '') {
      const searchTerm = search.toLowerCase();
      productsCopy = productsCopy.filter(
        item => 
          item.name.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm) ||
          item.subCategory.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    
    // Apply subcategory filter
    if(subcategory.length > 0){
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subCategory));
    }

    // Apply sorting
    switch(sortBy) {
      case 'low-to-high':
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case 'high-to-low':
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        productsCopy.sort((a, b) => b.date - a.date);
        break;
      default:
        break;
    }

    setFilterProducts(productsCopy);
  }

  useEffect(() => {
    setFilterProducts(products);
  }, [products])

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, sortBy, products, search]) // Added search as dependency

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm-gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter? 'rotate-90' : ''}`} alt='' />
        </p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3 accent-black' value={'Men'} onChange={toggleCategory}  /> Men
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3 accent-black' value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3 accent-black' value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>
        {/* subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3 accent-black' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3 accent-black' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type='checkbox' className='w-3 accent-black' value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>

      </div>

      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl ml-4 mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Sort by dropdown */}
          <select 
            className='border-2 border-gray-300 px-2 text-sm'
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-to-high'>Price: Low to High</option>
            <option value='high-to-low'>Price: High to Low</option>
            <option value='newest'>Newest First</option>
          </select>
        </div>

        {/* Search results count when search is active */}
        {search && search.trim() !== '' && (
          <div className='ml-4 mb-4 text-sm text-gray-600'>
            Found {filterProducts.length} results for "{search}"
          </div>
        )}

        {/* Map products */}
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6 ml-4'>
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
          ) : (
            <div className='col-span-full text-center py-8 text-gray-500'>
              {search && search.trim() !== '' 
                ? `No products match your search for "${search}"` 
                : 'No products match your selected filters'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection