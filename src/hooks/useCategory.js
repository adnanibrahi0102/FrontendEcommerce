import axios from "axios";
import { useState,useEffect } from "react";

export default function useCategory(){
    const [categories,setCategories]=useState([])


    const getCategory=async()=>{
        try {
          const {data}=  await axios.get(`${import.meta.env.VITE_API}/api/v1/category/getall-categories`)
         
          setCategories(data?.categories)
        } catch (error) {
           console.log(error)
    }
}

useEffect(()=>{
    getCategory();
},[])
return categories;
}
