//import logo from './logo.svg';
//import './App.css';
import { Header } from './components/Header';
import { AddEdit } from './pages/addedit/AddEdit';
import {  Product } from './pages/product/Product';
import { Routes, Route } from 'react-router-dom';
import {BrowserRouter as Router} from "react-router-dom";
import { Chat } from './pages/chat/Chat';
import { Category } from './pages/category/Category';
import { AddEditCategory } from './pages/addeditcategory/AddEditCategory';

function App() {
  return (
    <Router>
      <Header></Header>
      <div className='container'>
        <Routes>
          <Route path="/product" element={<Product/>} />
          <Route path="/category" element={<Category/>} />
          <Route path="/addProduct" element={<AddEdit/>} />
          <Route path="/addCategory" element={<AddEditCategory/>} />
          <Route path="/update/:id" element={<AddEdit/>} />
          <Route path="/updateCategory/:id" element={<AddEditCategory/>} />
          <Route path="/chat" element={<Chat/>} />

          </Routes>
      </div>
      {/* <Home></Home> */}
    </Router>
  );
}

export default App;
//        <Route path="/add" element={<AddEdit/>} />
