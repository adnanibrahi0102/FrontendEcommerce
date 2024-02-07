import React from "react";
import { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {BASE_URL} from '../../api.js'
const Products = () => {
  const [products, setProducts] = useState([]);
  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/products/get-Allproducts`
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(data.message);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1 className="text-center">All Products List</h1>
        <div className="d-flex flex-wrap">
          {products?.map((product) => (
            <Link
              key={product._id}
              to={`/dashboard/admin/product/${product.slug}`}
              className="text-decoration-none"
            >
              <div
                className="card m-2"
                style={{
                  width: "18rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "transform 0.2s",
                }}
              >
                <img
                  src={`${BASE_URL}/api/v1/products/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "300px",
                    border: "1px solid black",
                    objectFit: "-moz-initial",
                    background: "white",
                    borderRadius: "5px",
                    overflow:'hidden'
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Price:</strong> ${product.price}
                  </li>
                  <li className="list-group-item">
                    <strong>Quantity:</strong> {product.quantity}
                  </li>
                  
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default Products;
