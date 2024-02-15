import { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";
export const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {
        const res = await axios.get("http://localhost:5000/api/products");
        if (res.status === 200) {
            setData(res.data);
        }

    };

    const onDeleteProduct = async (id)=>{
        if(window.confirm("Emin misin")){
            const res = await axios.delete(`http://localhost:5000/api/products/${id}`);
            if(res.status===200){
                getProducts();
            }
        }
    };
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>name</th>
                        <th>category</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((product, index) => (
                        <tr key={product.Id}>
                            <td>{index + 1}</td>
                            <td>{product.Name}</td>
                            <td>{product.Category}</td>
                            <td>{product.Price}</td>
                            <td>
                                <div className="buttons">
                                    <button className="btn">View</button>
                                    <Link to={`/update/${product.Id}`}>
                                    <button className="btn2">Edit</button>
                                    </Link>
                                    <button className="btn3" onClick={() =>onDeleteProduct(product.id)}>Delete</button>

                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>


            </table>
        </div>
    )
}

