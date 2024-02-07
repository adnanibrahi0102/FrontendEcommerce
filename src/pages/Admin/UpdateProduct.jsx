import { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate ,useParams} from "react-router-dom";
import {BASE_URL} from '../../api.js'

const UpdateProduct = () => {
    const params=useParams();
    
    const { Option } = Select;
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const navigate=useNavigate();
    const [id, setId] = useState("");
    
  
    //get single product
    const getSingleProduct=async()=>{
        try {
            const {data} =await axios.get(`${BASE_URL}/api/v1/products/get-product/${params.slug}`)
            console.log(data)
            setName(data.product.name)
            setPrice(data.product.price)
            setDescription(data.product.description)
            setQuantity(data.product.quantity)
            setCategory(data.product.category)
            setShipping(data.product.shipping)
            setPhoto(data.product.photo)
            setId(data.product._id)
            
          
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
          getSingleProduct();
    },[])
  
    const getAllCategories = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/category/getall-categories`
        );
        console.log(data);
        if (data.success) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };
  
    useEffect(() => {
      getAllCategories();
    }, []);
  
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const productData=new FormData();
        productData.append("name",name);
        productData.append("price",price);
        productData.append("description",description);
        productData.append("quantity",quantity);
        productData.append("shipping",shipping);
        productData.append("photo",photo);
        const categoryId = typeof category === 'object' ? category._id : category;
        productData.append("category", categoryId);
  
        const data=await axios.put(`${BASE_URL}/api/v1/products/update-product/${id}`,productData)
        console.log(data)
        if(data.data && data.data.success){
          toast.success(data.data.message)
         setTimeout(()=>{
          navigate('/dashboard/admin/products');
         },2000)
          
        }
        
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong");
      }
    }

    // //delete product
    const deleteProduct=async()=>{
      try {
        const {data}=await axios.delete(`${BASE_URL}/api/v1/products/delete-product/${id}`)
        if(data.success){
          toast.success(data.message)
          setTimeout(()=>{
             navigate('/dashboard/admin/products');
           },2000)
        }
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong");
      }
    }
  return (
    <Layout>
    <div className="container-fluid m-3 p-4">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="mb-1 w-75 text-center">
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit} className="text-center">
            <Select
              
              showSearch
              style={{ width: 300 }}
              onChange={(value) => setCategory(value)}
              value={category?.name}
              placeholder="Select a Category"
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            
              <div className="mt-3">
                <label className="btn btn-outline-info col-md-5">
                  {photo ? photo.name : "Upload Product Image"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                  
                </label>
                <div className="mt-3">
                  <label className="col-md-5">
                    <input
                      type="text"
                      name="name"
                      placeholder="Write Product Name"
                      className="form-control "
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mt-3">
                  <label className="col-md-5">
                    <textarea
                      name="description"
                      placeholder="Write Product Description"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mt-3">
                  <label className="col-md-5">
                    <input
                      type="number"
                      name="price"
                      placeholder="Write a Price"
                      className="form-control "
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mt-3">
                  <label className="col-md-5">
                    <input
                      type="number"
                      name="quantity"
                      placeholder="Write a Quantity"
                      className="form-control "
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </label>
                </div>
                <div className="mt-3">
                  <label className="col-md-5">
                    <Select
                      placeholder="select shipping"
                      style={{ width: 300 }}
                      onChange={(value) => setShipping(value)}
                      value={shipping?"Yes":"No"}
                    >
                      <Option value="0">Yes</Option>
                      <Option value="1">No</Option>
                    </Select>
                  </label>
                </div>
              </div>
              <div className="mt-3 mx-auto">
                  <button type="submit" className="btn btn-info">Update Product</button>
              </div>
             
            </form>
             <button className="mt-2 btn btn-danger" onClick={deleteProduct}>Delete Product</button>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default UpdateProduct
