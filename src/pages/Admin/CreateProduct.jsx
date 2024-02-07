import { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { Select } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../../api.js'
const CreateProduct = () => {
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
      productData.append("category",category);

      const data=await axios.post(`${BASE_URL}/api/v1/products/create-product`,productData)
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
  return (
    <Layout>
      <div className="container-fluid m-3 p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="mb-1 w-75 text-center">
              <h1>Create a Product</h1>
              <form onSubmit={handleSubmit} className="text-center">
              <Select
                showSearch
                style={{ width: 300 }}
                onChange={(value) => setCategory(value)}
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
                      >
                        <Option value="0">Yes</Option>
                        <Option value="1">No</Option>
                      </Select>
                    </label>
                  </div>
                </div>
                <div className="mt-3 mx-auto">
                    <button type="submit" className="btn btn-info">Create Product</button>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
