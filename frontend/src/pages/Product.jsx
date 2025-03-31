import React, {useState, useContext, useEffect} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import {assets} from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Reset state when productId changes
  useEffect(() => {
    setProductData(null);
    setImage('');
    setSize('');
    setLoading(true);
    window.scrollTo(0, 0);
  }, [productId]);

  // Fetch product data when productId or products change
  useEffect(() => {
    const fetchProductData = () => {
      if (!products || products.length === 0) return;
      
      const foundProduct = products.find(item => item._id === productId);
      
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image[0]);
        setLoading(false);
      } else {
        console.error("Product not found with ID:", productId);
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [productId, products, location.key]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[50vh]'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (!productData) {
    return <div className='text-center py-10'>Product not found</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data  */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* ---------Product images------------ */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img  key={index} src={item} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' onClick={() => setImage(item)} />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt='' />
          </div>
        </div>
        {/* --------- Product info-------- */}
            <div className='flex-1'>
              <h1 className='text-2xl font-medium mt-2'>{productData.name}</h1>
              <div className='flex items-center gap-1 mt-2'>
                <img className='w-3.5' src={assets.star_icon} alt='' />
                <img className='w-3.5' src={assets.star_icon} alt='' />
                <img className='w-3.5' src={assets.star_icon} alt='' />
                <img className='w-3.5' src={assets.star_icon} alt='' />
                <img className='w-3.5' src={assets.star_dull_icon} alt='' />
                <p className='pl-2'>(122)</p>
              </div>
              <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
              <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
              <div className='flex flex-col gap-4 my-8'>
                  <p>Select Size</p>
                  <div className='flex gap-2'>
                    {productData.sizes.map((item, index) => (
                    <button onClick={() => setSize(item)} key={index} className={`border border-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}>
                      {item}
                    </button>
                    ))}
                  </div>
              </div>
              <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-6 py-3 text-sm active:bg-gray-700 rounded-md'>ADD TO CART</button>
              <hr className='mt-8 sm:w-4/5' />
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Original product</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange within 7 days.</p>
              </div>
            </div>
      </div>

      {/* ------Product details and review section --------- */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>"Made from 100% organic cotton, this premium t-shirt offers unbeatable softness and breathability. Designed for a relaxed fit, it's perfect for everyday wear. Eco-friendly dye process ensures long-lasting color without harmful chemicals. Machine washable and resistant to shrinking."</p>
        </div>
      </div>

      {/* ------Display related products------- */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      
    </div>
  )
}

export default Product