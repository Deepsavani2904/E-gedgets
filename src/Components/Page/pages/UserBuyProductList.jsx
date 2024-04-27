import React, { useEffect } from "react";
import { HOC } from "./HOC";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOnlyUserBuyProductData } from "../../../Redux/action/action";
// import { HOCUSER } from "./HOCUSER";

const UserBuyProductList = () => {
    const state = useSelector((state) =>state.userProduct);
    const dispatch = useDispatch();
  
    useEffect(() => {
     const isLoginObj = JSON.parse(localStorage.getItem('isLogin'));
     const token = isLoginObj.token;
     dispatch(getOnlyUserBuyProductData(token));
    }, []);
  return(
    <>
        <Table responsive className="mt-5" hover variant="white">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>ProductId</th>
            <th>Type</th>
            <th>Price</th>
            <th>ProductColor</th>
          </tr>
        </thead>
        <tbody>
          {state.map((x, i) => {
             return <tr key={i}>
                <td><img src={`http://localhost:5000/api/images/${x.image}`} width={100} alt="" /></td>
                {/* <td><img src={x.image} width={100} alt="" /></td> */}
                  <td>{x.productName}</td>
                  <td>{x.productId}</td>
                  <td>{x.productType}</td>
                  <td>{x.productPrice}</td>
                  <td>{x.productColor}</td>
                </tr>
          })}
        </tbody>
      </Table> 
    </>
  )
};

export default HOC(UserBuyProductList);
