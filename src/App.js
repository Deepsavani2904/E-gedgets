import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserLogin from "./Components/Page/LoginPage/Login";
import SignUp from "./Components/Page/LoginPage/SignUp";
import { useSelector } from "react-redux";
import AddUser from "./Components/Page/pages/AddUser";
import Product from "./Components/Page/pages/Product";
import BuyProduct from "./Components/Page/pages/BuyProduct";
import { useEffect, useState } from "react";
import UserBuyProduct from "./Components/Page/pages/UserBuyProduct";
import UserBuyProductList from "./Components/Page/pages/UserBuyProductList";
import User from "./Components/Page/pages/role/User";
import Admin from "./Components/Page/pages/role/Admin";
import Wallte from "./Components/Page/pages/Wallte";
import Transaction from "./Components/Page/pages/Transaction";
import CreditTransaction from "./Components/Page/pages/CreditTransaction";

function App() {
  const [check, setCheck] = useState("");
  const state = useSelector((state) => state.login);

  useEffect(() => {
    const isLoginObj = JSON.parse(localStorage.getItem("isLogin"));
    setCheck(isLoginObj?.data?.role);
  }, []);
  console.log(check,"check");

  return (
    <BrowserRouter>
    <Routes>
    {
      state?
      <>
             <Route path="/" element={<Navigate to={check === "admin"? "/addUser" : check === "user" ? "/userbuyProduct" : "/login" } />} />
             <Route path="/addUser" element={<AddUser />} />
             <Route path="/product" element={<Product />} />
             <Route path="/buyProduct" element={<BuyProduct />} />
             <Route path="/userbuyProduct" element={<UserBuyProduct />} />
             <Route path="/UserBuyProductList" element={<UserBuyProductList />} />
             <Route path="/wallte" element={<Wallte />} />
             <Route path="/transaction" element={<Transaction />} >
                <Route path="" element={<CreditTransaction />} />
                <Route path="credit" element={<CreditTransaction />} />
             </Route>
             <Route path="*" element={<Navigate to={check == "user"? "/userbuyProduct": "addUser"} />} />
      </>
      :
      <>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
      </>
    }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
