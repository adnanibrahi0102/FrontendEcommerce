import React, { useState ,useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from 'antd';
import {BASE_URL} from '../../api.js'
const {Option}=Select
const AdminOrders = () => {
    const [status,setStatus]=useState(["Not Process","Processing","shipped","delivered","cancel"]);
    const [orders, setOrders] = useState(null);
    const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/auth/all-orders`
      );
      console.log(data);
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    console.log('orderId:', orderId);
    console.log('value:', value);
    try {
      const { data } = await axios.put(`${BASE_URL}/api/v1/auth/change-order-status/${orderId}`, { status: value });
      getOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
            <AdminMenu/>
        </div>
        <div className="col-md-9">
            <h1 className='text-center'>All orders</h1>
            <div className="container">
            {orders?.map((order, index) => {
            console.log(order)
              return (
                <div key={index} className="border shadow mb-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Date</th>
                       
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{index + 1}</th>
                        <td>
                            <Select variant={false} onChange={(value)=>handleChange(order._id,value)} defaultValue={order?.status}>
                              {
                                status.map((item,index)=>(
                                    <Option key={index} value={item}>
                                        {item}
                                    </Option>
                                ))
                              }
                            </Select>
                        </td>
                        <td>{order?.buyer?.name}</td>
                        <td>
                          {order?.payment?.success ? "Success" : "Failed"}
                        </td>
                        
                        <td>{order?.products.length}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                  {
                    order?.products.map((product,i)=>(
                        <div key={`${product._id}-${i}`} className='row mb-2 card flex-row p-2 '>
                            <div className="col-md-4">
                                <img src={`${BASE_URL}/api/v1/products/product-photo/${product._id}`} className="img-thumbnail" width="100px" height='90px' alt={product.name}/>
                            </div>
                            <div className="col-md-8">
                                <p className='card-title'>{product.name}</p>
                                <p className='card-text'>
                                     {product.description}..
                                </p>
                                <p className='card-text'>Price:${product.price}</p>
                             
                                
                            </div>
                        </div>
                    ))
                }
                  </div>
                </div>
              );
            })}
                  </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminOrders
