import React from 'react'
import Layout from '../components/layout/Layout.jsx'
import { useSearch } from '../context/search'
const SearchProducts = () => {
    const { values, setValues } = useSearch()
    
  return (
  <Layout>
      <div className="container">
          <div className="text-center">
            <h1>Search results</h1>
              <h6>{values?.results.length<1?"No Products Found":` Found ${values?.results.length}`}</h6>
              <div className="d-flex flex-wrap justify-content-center mt-3">
            {values?.results.map((product) => (
              <div key={product._id} className="card m-2 " style={{ width: "18rem" }}>
                <img
                  style={{
                    height: "312px",
                    border: "1px solid black",
                    objectFit: "-moz-initial",
                    background: "white",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                  src={`${
                    import.meta.env.VITE_API
                  }/api/v1/products/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 30)}..
                  </p>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">Quantity: {product.quantity}</p>
                  <button className="btn btn-secondary ms-2">
                    Add To Cart
                  </button>
                  <button className="btn btn-primary ms-2">More Details</button>
                </div>
              </div>
            ))}
          </div>
          </div>
      </div>
  </Layout>
  )
}

export default SearchProducts
