import {Link} from "react-router-dom";
import "./header.css";
export const Header = () => (
    <div className="header">
        <Link to="/" className="logo">
            Product CRUD
        </Link>
        <Link to="/" className="logo">
            Category CRUD
        </Link>
        <div className="header-right">
            <Link to="/add" className="active" >Add product</Link>
            <Link to="/add" className="active" >Add category</Link>
            <a href="#contact">Category List</a>
            <a href="#about">About</a>
        </div>

    </div>



)