import { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const {auth,setAuth}=useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location=useLocation();
  

  const handleSubmit=async(e)=>{
    e.preventDefault();
        try {
          const response= await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/login`,{
            email,
            password
          })
          if(response.data.success){
            console.log(response.data.message);
            toast.success(response.data.message);
            setAuth({
              ...auth,
              user:response.data.user,
              token:response.data.token
            })
            localStorage.setItem('auth',JSON.stringify(response.data))
            setTimeout(() => {
              navigate(location.state||"/");
             }, 2000); 
          }else{
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error)
        }
  }
  return (
    <div>
       <Layout>
       <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="registration-box p-4 border rounded"
          style={{ width: "400px", maxHeight: "400px" }}
        >
          <h2 className="text-center mb-4 ">Login Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
    </div>
  )
}

export default Login
