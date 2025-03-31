import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        const fetchCartAmount = async () => {
            const amount = await getCartAmount();
            setSubtotal(amount);
        };
        
        fetchCartAmount();
    }, [getCartAmount]);

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'} />
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>{currency}{subtotal}.00</p>
                </div>
                <hr/>
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee}.00</p>
                </div>
                <hr/>
                <div className='flex justify-between'>
                    <p>Total</p>
                    <p>{currency}{subtotal === 0 ? 0 : subtotal + delivery_fee}.00</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartTotal