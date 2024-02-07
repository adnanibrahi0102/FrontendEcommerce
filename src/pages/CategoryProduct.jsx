import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../api.js'
const CategoryProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const getproductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/products/product-category/${
          params.slug
        }`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getproductsByCategory();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-2">
        <h3 className="text-center">Category - {category?.name}</h3>
        <h4 className="text-center">{products?.length} results found </h4>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((product) => (
              <div
                key={product._id}
                className="card m-2 "
                style={{ width: "18rem" }}
              >
                <div className="card-img-container">
                  <img
                    style={{
                      height: "312px",
                      objectFit: "cover",
                      background: "white",
                      borderRadius: "5px",
                      overflow: "hidden",
                      transition: "transform 0.3s ease",
                    }}
                    src={`${
                      BASE_URL
                    }/api/v1/products/product-photo/${product._id}`}
                    className="img-thumbnail card-img-top"
                    alt={product.name}
                  />
                  <div className="overlay"></div>
                </div>
                <div className="card-body text-center p-2">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 30)}..
                  </p>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">Quantity: {product.quantity}</p>
                  <button className="btn btn-secondary ms-2">
                    Add To Cart
                  </button>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => navigate(`/product-details/${product.slug}`)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
