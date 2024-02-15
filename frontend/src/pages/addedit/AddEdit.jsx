import "./addedit.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const initialState ={
name:"",
category: "",
price:"",

};
export const AddEdit = () => {
    const[data,setData]=useState(initialState);
    const {name, category, price} = data;
    const {id} = useParams();
    const navigate = useNavigate();
//verileri aktarıyoruz
    useEffect(()=>{
        if(id){
            // getProductId(id);
        }
    },[id]);
    const createProduct = async(data)=>{
        const res = await axios.post("http://localhost:5000/api/products/new",data);
        if(res.status===200){
            window.confirm(res.data);
        }
    };

    
//     const getProductId = async(id)=>{
//         const res = await axios.get(`http://localhost:5000/products/${id}`);
//         if(res.status===200){
//             setData(res.data);    
//  }
//     };

    const updateProduct = async(data,id)=>{
        const res = await axios.put(`http://localhost:5000/api/products/${id}`,data);
        if(res.status===200){
            window.confirm(res.data);
        }
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name || !category || !price){
            window.confirm("Lütfen bütün alanları doldurun");
            return;
        }
        if(!id){
            createProduct(data);

        }
        else{
            updateProduct(data,id);
        }
        navigate("/");
        
        
    }
    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setData({...data, [name]:value});
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className="form">
            <div className="input-wrapper">
                <label htmlFor="name">name</label>
                <input type="text" id="name" name="name" placeholder="Adinizi giriniz" onChange={handleInputChange} value={name}></input>
            </div>
            <div className="input-wrapper">
                <label htmlFor="category">Category</label>
                <input type="text" id="category" name="category" placeholder="Kategori giriniz" onChange={handleInputChange} value={category}></input>
            </div>
            <div className="input-wrapper">
                <label htmlFor="price">Fiyat</label>
                <input type="text" id="price" name="price" placeholder="Adinizi giriniz" onChange={handleInputChange} value={price}></input>
            </div>
            <br></br>
            <input type="submit" className="btn btn-success" value="Add"></input>
        </form>
    </div>
  )
};
