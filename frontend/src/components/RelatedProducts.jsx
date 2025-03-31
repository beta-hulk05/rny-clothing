import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { useParams } from 'react-router-dom'

const RelatedProducts = ({category, subCategory}) => {
  const {products} = useContext(ShopContext)
  const [related, setRelated] = useState([]);
  const { productId } = useParams();  // Get current product ID

  useEffect(() => {
    if(products.length > 0 && category && subCategory){
      // Filter products with same category and subcategory, but exclude current product
      const filteredProducts = products.filter(item => 
        item.category === category && 
        item.subCategory === subCategory && 
        item._id !== productId  // Exclude current product
      );
      
      // Limit to 5 products
      setRelated(filteredProducts.slice(0,5));
    }
  },[products, category, subCategory, productId])

  // Don't render if no related products
  if (related.length === 0) {
    return null;
  }

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md: grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
        {
          related.map((item,index) => (
            <ProductItem 
              key={index} 
              id={item._id} 
              name={item.name} 
              price={item.price} 
              image={item.image} 
            />
          ))
        }
      </div>
    </div>
  )
}

export default RelatedProducts