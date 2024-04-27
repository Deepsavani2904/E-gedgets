import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddUser from "../AddUser";
import Product from "../Product";
import BuyProduct from "../BuyProduct";

const Admin = () => {
  return (
    <>
        <Routes>
             <Route path="/" element={<Navigate to='/addUser' />} />
             <Route path="/addUser" element={<AddUser />} />
             <Route path="/product" element={<Product />} />
             <Route path="/buyProduct" element={<BuyProduct />} />
             <Route path="*" element={<Navigate to='/addUser'/> } />
        </Routes>
    </>
  )
};

export default Admin;
