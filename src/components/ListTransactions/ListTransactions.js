import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ListTransactions() {
  const [transactionArray, setTransactionArray] = useState([]);
  // const [totalBalance, setTotalBalance] = useState(0);

  // const API = process.env.REACT_APP_API_URL;
  // console.log(API);

  async function fetchData() {
    let url =
      process.env.NODE_ENV === "production"
        ? "https://project-budgeting-app-backend.onrender.com"
        : "http://localhost:3001";

    try {
      const result = await axios.get(`${url}/transactions`);

      // console.log(result);

      const sortedTransactions = result.data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

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
                      <span className="text-danger">
                        -${Number(item.amount).toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-success">
                        +${Number(item.amount).toFixed(2)}
                      </span>
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
