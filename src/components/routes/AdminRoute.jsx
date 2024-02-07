import {useState,useEffect} from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';
import { BASE_URL } from '../../api';
const AdminRoute = () => {
    const [ok,setOk]=useState(false);
    const {auth}=useAuth();

    useEffect(()=>{
        const authCheck=async()=>{
            const res=await axios.get(`${BASE_URL}/api/v1/auth/adminAuth`)
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
  return ok ?<Outlet/>:<Loading path=''/>
}

export default AdminRoute;
