import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props)=> {

    const currency = 'Rs.';
    const delivery_fee = 10;
    const [search,setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();

    const addToCart = async (itemId,size)=>{

        if( !size){
            toast.error('Please select a size!');
            return;
        }

        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                if(cartItems[items][item] > 0){
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        
        if (quantity <= 0) {
            // If quantity is zero or negative, remove the item completely
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    delete cartData[itemId][size];
                    
                    // If no sizes left for this item, remove the item entirely
                    if (Object.keys(cartData[itemId]).length === 0) {
                        delete cartData[itemId];
                    }
                }
            }
        } else {
            // Update quantity for existing item
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            cartData[itemId][size] = quantity;
        }
        
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        try {
            let totalAmount = 0;
            for(const items in cartItems){
                let itemInfo = products.find(product => product._id === items);
                if (itemInfo) {
                    for(const item in cartItems[items]){
                        if(cartItems[items][item] > 0){
                            totalAmount += itemInfo.price * cartItems[items][item];
                        }
                    }
                } else {
                    console.error(`Product not found for ID: ${items}`);
                }
            }
            return totalAmount;
        } catch (error) {
            console.error("Error calculating cart amount:", error);
            return 0; // Return 0 as fallback in case of error
        }
    }

    

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount, navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;



