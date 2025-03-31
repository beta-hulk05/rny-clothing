import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import {assets} from '../assets/assets'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { Link } from 'react-router-dom'


const Cart = () => {
  const {products, currency, cartItems, updateQuantity, navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    
    // Check if cartItems exists and has entries
    if (cartItems && Object.keys(cartItems).length > 0) {
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            // Find product details from products array
            const product = products.find(p => p._id === itemId);
            
            if (product) {
              tempData.push({
                _id: itemId,
                size: size,
                quantity: cartItems[itemId][size],
                name: product.name,
                price: product.price,
                image: product.image[0],
                total: product.price * cartItems[itemId][size]
              });
            }
          }
        }
      }
      
      setCartData(tempData);
    }
  }, [cartItems, products]);

  // Update this function to use a more explicit approach
  const handleDeleteItem = (itemId, size) => {
    updateQuantity(itemId, size, 0);
  }

  return (
    <div className="border-t pt-14">
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      
      {cartData.length > 0 ? (
        <div>
          <div>
            {cartData.map((item, index) => {
                const productData = products.find(product => product._id === item._id);
                return(
                  <div key={`${item._id}-${item.size}`} className="border-t border-b py-4 text-gray-700 grid grid-cols-[4fr_0.5fr_0.fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                    <div className='flex items-start gap-6'>
                      <img src={productData.image[0]} alt={item.name} className="w-16 sm:w-20" />
                      <div>
                        <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                        <div className='flex items-center gap-5 mt-2'>
                          <p>{currency}{productData.price}</p>
                          <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 rounded">{item.size}</p>
                        </div>
                      </div>  
                    </div>
                    <input 
                      className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 rounded' 
                      type='number' 
                      min={1} 
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, item.size, parseInt(e.target.value))}
                    />
                    <img 
                      src={assets.bin_icon} 
                      alt='Delete' 
                      className='w-4 mr-4 sm:w-5 cursor-pointer' 
                      onClick={() => handleDeleteItem(item._id, item.size)} 
                    />
                  </div>
                )
            })}
          </div> 
          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <div className='p-6'>
                <CartTotal  />
                <div className='w-full text-end'>
                  <button onClick={()=>navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>
                  PROCEED TO CHECKOUT  
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/collection" className="bg-black text-white text-sm my-8 px-8 py-3">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart


