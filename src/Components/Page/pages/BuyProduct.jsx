import React, { useEffect } from "react";
import { HOC } from "./HOC";
import { useDispatch, useSelector } from "react-redux";
import { getallBuyproductData } from "../../../Redux/action/action";
import { Table } from "react-bootstrap";

const BuyProduct = () => {
  const state = useSelector((state) =>state.buyProduct);
  const dispatch = useDispatch();

  useEffect(() => {
   const isLoginObj = JSON.parse(localStorage.getItem('isLogin'));
   const token = isLoginObj.token;
   dispatch(getallBuyproductData(token));
  }, []);
  
  console.log(state,"state");
  return (
    <>
       <Table responsive className="mt-5" hover variant="white">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>User Name</th>
            <th>UserId</th>
            <th>ProductId</th>
            <th>Product Name</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {state.map((x, i) => {
             return <tr key={i}>
                <td><img src={`http://localhost:5000/api/images/${x.image}`} width={100} alt="" /></td>
                  <td>{x.userName}</td>
                  <td>{x.userId}</td>
                  <td>{x.productId}</td>
                  <td>{x.productName}</td>
                  <td>{x.productType}</td>
                  <td>{x.productPrice}</td>
                </tr>
          })}
        </tbody>
      </Table>
    </>
  )
};

export default HOC(BuyProduct);