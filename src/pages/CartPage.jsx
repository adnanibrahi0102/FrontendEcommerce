import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'
import {BASE_URL} from '../api.js'
const CartPage = () => {
    const navigate=useNavigate();
    const {cart,setCart}=useCart();
    const{auth}=useAuth();
    const[clientToken,setClientToken]=useState("")
    const [instance,setInstance]=useState("");
    const [loading,setLoading]=useState(false);
    
    const calculateTotal=()=>{
        let total=0;
        cart?.map((item)=>{
           total=total+Number(item.price)
        })
        return total.toLocaleString('en-US',{
            style:'currency',
             currency:'USD'
        })
    }
    const removeCartItem=(id)=>{
        try {
            let mycart=[...cart]
            let index=mycart.findIndex((item)=>item._id===id);
            mycart.splice(index,1);
            setCart(mycart);
            localStorage.setItem('cart',JSON.stringify(mycart))
        } catch (error) {
            console.log(error)
        }
    }

    //get payment gateway token
    const getToken=async()=>{
        try {
            const {data}=await axios.get(`${BASE_URL}/api/v1/products/braintree-token`)
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }

    const handlePayment=async()=>{
            setLoading(true);
            try {
             const {nonce}=await instance.requestPaymentMethod()
             const {data}=await axios.post(`${BASE_URL}/api/v1/products/braintree-payment`,{
                nonce,cart
             })
             setLoading(false)
             localStorage.removeItem('cart');
             setCart([])
             navigate('/dashboard/user/orders')
             toast.success("payment success")
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
    }

    useEffect(()=>{
        getToken();
    },[auth?.token])
  return (
    <Layout>
      <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h3 className='text-center  p-2 mb-1'>
                    {`Hello ${auth?.token && auth?.user?.name}`}
                </h3>
                <h4 className='text-center'>
                    {cart?.length>=1 ? `You have ${cart?.length} Items in Your Cart ${auth?.token ?"":"Please login to Checkout"}`:"Your Cart is Empty"}
                </h4>
            </div>
        </div>
        <div className="row">
            <div className="col-md-8">
                {
                    cart?.map((product)=>(
                        <div key={product._id} className='row mb-2 card flex-row p-2 '>
                            <div className="col-md-4">
                                <img src={`${BASE_URL}/api/v1/products/product-photo/${product._id}`} className="img-thumbnail" width="100px" height='90px' alt={product.name}/>
                            </div>
                            <div className="col-md-8">
                                <p className='card-title'>{product.name}</p>
                                <p className='card-text'>
                                     {product.description.substring(0, 30)}..
                                </p>
                                <p className='card-text'>Price:${product.price}</p>
                                <button className='btn btn-danger' onClick={()=>removeCartItem(product._id)}>Remove</button>
                                
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="col-md-4 text-center">
                <h2 >Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr />
                <h4>Total :{calculateTotal()}</h4>

                <div className='mt-2'>
                 {
                    !clientToken||!cart?.length?(''):(
                        <>
                        
                        <DropIn
                  options={{
                    authorization: clientToken,
                    paypal:{
                        flow: "vault",
                    }
                  }}
                  onInstance={(instance)=>{
                    setInstance(instance)
                  }}
                  />
                  <button className='btn btn-primary' onClick={handlePayment}disabled={loading||!instance}>{loading?"Processing...":"Make Payment"}</button>

                        </>
                    )
                 }
                  
                </div>
            </div>
        </div>
      </div>
    </Layout>
  )
}

export default CartPage
