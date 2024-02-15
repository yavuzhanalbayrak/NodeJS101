import {Link} from "react-router-dom";
import "./header.css";
export const Header = () => (
    <div className="header">
        <Link to="/product" className="logo">
            Product CRUD
        </Link>
        <Link to="/category" className="logo">
            Category CRUD
        </Link>
        <div className="header-right">
            <Link to="/addProduct" className="active" >Add product</Link>
            <Link to="/addCategory" className="active" >Add category</Link>
            <Link to="/chat" className="active" >Chat</Link>
        </div>

    </div>



)
