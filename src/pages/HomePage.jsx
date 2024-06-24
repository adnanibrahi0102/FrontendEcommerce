import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

import VideoFrame from "../components/VideoFrame.jsx";
import { BASE_URL } from '../api.js';

const HomePage = () => {

  const Carasoul = React.lazy(()=>import("../components/Carasoul"));
  const VideoCarasoul = React.lazy(()=>import("../components/VideoCarasoul"));

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  

  // Get total number of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/products/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more products
  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/category/getall-categories`);
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(BASE_URL);
    getAllCategories();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/products/product-list/${page}`);
      setLoading(false);
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  const handleFilter = (value, id) => {
    let checkedValue = [...checked];
    if (value) {
      checkedValue.push(id);
    } else {
      checkedValue = checkedValue.filter((category) => category !== id);
    }
    setChecked(checkedValue);
  };

  // Get filtered products
  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/products/product-filter`, { checked, radio });
      if (data.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filteredProducts();
  }, [radio, checked]);

  return (
    <Layout>
      <div className="row mt-2">
        <div className="col-md-9">
          <React.Suspense fallback={ <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>}>
              <Carasoul />
          </React.Suspense>
         
        </div>
        <div className="col-md-3 border p-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="m-2 border p-2">
            {categories.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center">Filter By Price</h4>
          <div className="m-2 border p-2 mt-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((product) => (
                <Radio key={product._id} value={product.array}>
                  {product.name}
                </Radio>
              ))}
            </Radio.Group>
          </div>
          <button
            className="btn btn-danger btn-sm w-100"
            onClick={() => window.location.reload()}
          >
            Clear Filters
          </button>
        </div>
      </div>
      <React.Suspense fallback={ <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>}>
      <VideoCarasoul />
      <VideoFrame />
      </React.Suspense>
      <div className="row mt-2">
        <h3 className="text-center">All Products</h3>
        {
          loading ? (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            products.map((product) => (
              <div key={product._id} className="col-md-4 mt-3">
                <div className="card p-4">
                  <div
                    className="card-img-container"
                    style={{ position: "relative" }}
                  >
                    <img
                      style={{
                        height: "350px",
                        objectFit: "cover",
                      }}
                      src={`${BASE_URL}/api/v1/products/product-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                    />
                    <div className="overlay"></div>
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text fw-bold">Price: ${product.price}</p>
                    <button
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem("cart", JSON.stringify([...cart, product]));
                        toast.success("Item Added to Cart");
                      }}
                      className="btn btn-secondary me-2"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => navigate(`/product-details/${product.slug}`)}
                      className="btn btn-primary"
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        }
      </div>

      <div className="row">
        <div className="col-md-12 mt-3 text-center">
          {products && products.length < total && (
            <button
              onClick={() => setPage(page + 1)}
              className="btn btn-warning mb-2"
            >
              {loading ? "Loading" : "Load More"}
            </button>
          )}
        </div>
        <div className="container-fluid p-0">
          <video
            autoPlay
            loop
            muted
            className="w-100"
            style={{ minHeight: '100vh', objectFit: 'cover' }}
          >
            <source src="https://imagescdn.thecollective.in/img/app/shopmedia/production/7/7-41-12645.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
