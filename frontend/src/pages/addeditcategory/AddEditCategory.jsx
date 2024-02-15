import "./addeditcategory.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const initialState ={
name:"",


};
export const AddEditCategory = () => {
    const[data,setData]=useState(initialState);
    const {name} = data;
    const {id} = useParams();
    const navigate = useNavigate();
//verileri aktarıyoruz
    useEffect(()=>{
        if(id){
            // getProductId(id);
        }
    },[id]);
    const createCategory = async(data)=>{
        const res = await axios.post("http://localhost:5000/api/categories/new",data);
        if(res.status===200){
            window.confirm(res.data);
        }
    };



    const updateCategory = async(data,id)=>{
        const res = await axios.put(`http://localhost:5000/api/categories/${id}`,data);
        if(res.status===200){
            window.confirm(res.data);
        }
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name){
            window.confirm("Lütfen bütün alanları doldurun");
            return;
        }
        if(!id){
            createCategory(data);

        }
        else{
            updateCategory(data,id);
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

            <input type="submit" className="btn btn-success" value="Add"></input>
        </form>
    </div>
  )
};
