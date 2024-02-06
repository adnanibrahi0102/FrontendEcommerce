import {useState,useEffect} from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';
const PrivateRoute = () => {
    const [ok,setOk]=useState(false);
    const {auth,setAuth}=useAuth();

    useEffect(()=>{
        const authCheck=async()=>{
            const res=await axios.get(`${import.meta.env.VITE_API}/api/v1/auth/userAuth`)
           console.log(res.data)
            if(res.data.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }

        }
        if(auth?.token) authCheck()
    },[auth?.token])
  return ok ?<Outlet/>:<Loading/>
}

export default PrivateRoute
