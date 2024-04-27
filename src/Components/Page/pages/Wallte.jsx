import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getWalletData } from "../../../Redux/action/action";
import { HOC } from "./HOC";

const Wallte = () => {
    const state = useSelector((state) => state.wallet);
   const dispatch = useDispatch()
    useEffect(() => {
      const loginObj = JSON.parse(localStorage.getItem('isLogin'));
      const token = loginObj.token;
      dispatch(getWalletData(token))
    }, []);
    console.log(state,"state");
    
  return (
    <>
  <Table responsive className="mt-5" hover variant="white">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {state?.map((x, i) => {
             return <tr key={i}>
                  <td>{x?.userId}</td>
                  <td>{x?.amount?.toFixed(2)+"₹"}</td>
                </tr>
          })}
        </tbody>
      </Table> 
    </>
  )
};

export default HOC(Wallte);
