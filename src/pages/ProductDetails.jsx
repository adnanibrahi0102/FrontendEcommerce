import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/products/get-product/${params?.slug}`
      );
      console.log(data);
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct(); 
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`${import.meta.env.VITE_API}/api/v1/products/product-photo/${product._id}`}
              className="img-thumbnail"
              alt={product.name}
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="text-center">Name: {product.name}</h2>
            <p className="lead">Description: {product.description}</p>
            <p className="fs-5">Price: ${product.price}</p>
            <p className="fs-5">Category: {product?.category?.name}</p>

            <button className="btn btn-secondary mt-3">Add To Cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
