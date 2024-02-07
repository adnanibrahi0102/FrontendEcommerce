import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import {BASE_URL} from '../../api.js'
const Orders = () => {
  const [orders, setOrders] = useState(null);
  const { auth } = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/auth/orders`
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
  return (
    <Layout>
      <div className="container-fluid p-3 p-4">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((order, index) => {
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
                        <td>{order?.status}</td>
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
                    order?.products.map((product)=>(
                        <div key={product._id} className='row mb-2 card flex-row p-2 '>
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
  );
};

export default Orders;
