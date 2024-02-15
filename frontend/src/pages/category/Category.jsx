import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Category = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
      getCategories();
  }, []);
  const getCategories = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      if (res.status === 200) {
          setData(res.data);
      }

  };

  const onDeleteCategories = async (id)=>{
      if(window.confirm("Emin misin")){
          const res = await axios.delete(`http://localhost:5000/api/categories/${id}`);
          if(res.status===200){
              getCategories();
          }
      }
  };
  return (
      <div>
          <table>
              <thead>
                  <tr>
                      <th>no</th>
                      <th>name</th>
                  </tr>
              </thead>
              <tbody>
                  {data && data.map((product, index) => (
                      <tr key={product.Id}>
                          <td>{index + 1}</td>
                          <td>{product.Name}</td>

                          <td>
                              <div className="buttons">
                                  <button className="btn">View</button>
                                  <Link to={`/updateCategory/${product.Id}`}>
                                  <button className="btn2">Edit</button>
                                  </Link>
                                  <button className="btn3" onClick={() =>onDeleteCategories(product.Id)}>Delete</button>

                              </div>
                          </td>
                      </tr>
                  ))}

              </tbody>


          </table>
      </div>
  )
}




