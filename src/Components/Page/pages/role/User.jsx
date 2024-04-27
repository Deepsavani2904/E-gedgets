import React from "react"
import { Navigate, Route, Routes } from "react-router-dom";
import UserBuyProduct from "../UserBuyProduct";
import UserBuyProductList from "../UserBuyProductList";
import Wallte from "../Wallte";
import Transaction from "../Transaction";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/userbuyProduct" />} />
        <Route path="/userbuyProduct" element={<UserBuyProduct />} />
        <Route path="/UserBuyProductList" element={<UserBuyProductList />} />
        <Route path="/wallte" element={<Wallte />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="*" element={<Navigate to="/userbuyProduct" />} />
      </Routes>
    </>
  );
};

export default User;
