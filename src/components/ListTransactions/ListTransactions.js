import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function ListTransactions() {
  const [transactionArray, setTransactionArray] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  const API = process.env.REACT_APP_API_URL;
  //   console.log(API);

  async function fetchData() {
    try {
      const result = await axios.get(`${API}/transactions`);
      //   console.log(result.data);
      let balance = 0;
      result.data.forEach((item) => {
        if (item.category !== "Income") {
          balance -= item.amount;
        } else {
          balance += item.amount;
        }
      });
      setTotalBalance(balance);

      const sortedTransactions = result.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      setTransactionArray(sortedTransactions);
      console.log(transactionArray);
      //   setTransactionArray(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <h2 className="h2-main-title">Bank Account Total: ${totalBalance}</h2>
      <div>
        <div className="table-container">
          <table id="transactions">
            <tbody>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
              {transactionArray.map((item) => {
                // console.log(item.category);

                return (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.item_name}</td>
                    {item.category !== "Income" ? (
                      <td>-${item.amount}</td>
                    ) : (
                      <td>${item.amount}</td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListTransactions;
