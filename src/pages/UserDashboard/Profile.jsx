import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from '../../context/auth';
import {BASE_URL} from '../../api.js'
const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const {auth,setAuth}=useAuth();

  useEffect(()=>{
      setName(auth?.user?.name);
      setEmail(auth?.user?.email);
      setPhone(auth?.user?.phone);
      setAddress(auth?.user?.address);
  },[auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (response.data.success) {
        console.log(response.data.message);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);

        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data);
    }
  };
  return (
    <Layout>
       <div className="container-fluid">
         <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9">
              <div className="d-flex justify-content-center align-items-center vh-100 bg-dark-subtle text-emphasis-dark">
        <div
          className="registration-box p-4 border rounded"
          style={{ width: "400px", maxHeight: "500px" }}
        >
          <h2 className="text-center mb-4">User Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="Name"
                required
                disabled
              />
            </div>
            <div className="mb-3">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Email"
                required
                disabled
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
                disabled
              />
            </div>
            <div className="mb-3">
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                value={phone}
                className="form-control"
                placeholder="Phone"
                required
                disabled
              />
            </div> 
            <div className="mb-3">
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                rows="3"
                placeholder="Address"
                required
                disabled
              ></textarea>
            </div>
            {/* <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div> */}
          </form>
        </div>
      </div>
            </div>
         </div>
       </div>
    </Layout>
  )
}

export default Profile
