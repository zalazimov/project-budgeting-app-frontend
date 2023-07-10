import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ShowTransactionDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [singleTransaction, setSingleTransaction] = useState(null);
  // const API = process.env.REACT_APP_API_URL;
  // console.log(API);

  useEffect(() => {
    fetchDataObj();
  }, []);

  async function fetchDataObj() {
    let url =
      process.env.NODE_ENV === "production"
        ? "https://project-budgeting-app-backend.onrender.com"
        : "http://localhost:3001";

    try {
      const result = await axios.get(`${url}/transactions/${id}`);
      setSingleTransaction(result.data);
      // console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleDeleteOnClick() {
    let url =
      process.env.NODE_ENV === "production"
        ? "https://project-budgeting-app-backend.onrender.com"
        : "http://localhost:3001";

    async function deleteData() {
      try {
        const result = await axios.delete(`${url}/transactions/${id}`);
        return result.data;
      } catch (e) {
        console.log(e);
      }
    }

    deleteData();
    navigate(`/transactions`);
  }

  return (
    // This is the Show Page
    <div className="container">
      <div className="card mx-auto mt-5" style={{ width: "24rem" }}>
        <div className="card-body">
          <div>
            <h5 className="card-title text-center">
              {singleTransaction?.item_name}
            </h5>

            <p className="card-text">
              <span className="fw-semibold">Date</span>:
              {singleTransaction?.date}
            </p>
            <p className="card-text">
              <span className="fw-semibold">Amount</span>: $
              {singleTransaction?.amount}
            </p>
            <p className="card-text">
              <span className="fw-semibold">Category</span>:
              {singleTransaction?.category}
            </p>
            <p className="card-text">
              <span className="fw-semibold">From</span>:
              {singleTransaction?.from}
            </p>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <Link to="/transactions">
              <button className="btn btn-secondary">Back</button>
            </Link>
            <Link to={`/transactions/${id}/edit`}>
              <button className="btn btn-secondary">Edit</button>
            </Link>
            <button className="btn btn-danger" onClick={handleDeleteOnClick}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowTransactionDetails;
