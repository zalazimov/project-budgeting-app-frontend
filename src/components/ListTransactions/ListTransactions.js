import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function ListTransactions() {
  const { id } = useParams();
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
      setTotalBalance(balance.toFixed(2));

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
                    className="text-decoration-none"
                    to={`/transactions/${id}`}
                  >
                    {item.date}
                  </Link>
                </td>
                <td>
                  <Link to={`/transactions/${id}`}>{item.item_name}</Link>
                </td>
                <td>
                  <Link
                    className="text-decoration-none"
                    to={`/transactions/${id}`}
                  >
                    {item.category !== "Income" ? (
                      <span className="text-danger">
                        -${item.amount.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-success">
                        +${item.amount.toFixed(2)}
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
