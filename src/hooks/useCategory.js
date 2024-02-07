import axios from "axios";
import { useState,useEffect } from "react";
import { BASE_URL} from '../api.js'
export default function useCategory(){
    const [categories,setCategories]=useState([])


    const getCategory=async()=>{
        try {
          const {data}=  await axios.get(`${BASE_URL}/api/v1/category/getall-categories`)
         
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
