import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListTransactions() {
  const [transactionArray, setTransactionArray] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  const API = process.env.REACT_APP_API_URL;
  // console.log(API);

  async function fetchData() {
    try {
      const result = await axios.get(`${API}/transactions`);

      let balance = 0;
      result.data.forEach((item) => {
        if (item.category !== "Income") {
          balance -= item.amount;
        } else {
          balance += item.amount;
        }
      });
      setTotalBalance(balance.toFixed(2));

      const sortedTransactions = result.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      // console.log(sortedTransactions);

      setTransactionArray(sortedTransactions);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="text-center">
      <h2 className="mt-4">
        Bank Account Total:{" "}
        <span
          className={
            totalBalance > 100
              ? "text-success"
              : totalBalance >= 0
              ? "text-warning"
              : "text-danger"
          }
        >
          ${totalBalance}
        </span>
      </h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactionArray.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link
                    className="text-decoration-none text-body-secondary"
                    to={`/transactions/${item.id}`}
                  >
                    {item.date}
                  </Link>
                </td>
                <td>
                  <Link to={`/transactions/${item.id}`}>{item.item_name}</Link>
                </td>
                <td>
                  <Link
                    className="text-decoration-none"
                    to={`/transactions/${item.id}`}
                  >
                    {item.category !== "Income" ? (
                      <span className="text-danger">-${item.amount}</span>
                    ) : (
                      <span className="text-success">+${item.amount}</span>
                    )}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListTransactions;
