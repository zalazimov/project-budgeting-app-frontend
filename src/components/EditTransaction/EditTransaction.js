import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function EditTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [transactionObj, setTransactionObj] = useState({
    item_name: "",
    amount: "",
    date: "",
    from: "",
    category: "",
  });

  // Check to see about dropdown menu !!!!!!!!
  //   const [isChecked, setIsChecked] = useState(transactionObj.mistakesWereMadeToday);

  const API = process.env.REACT_APP_API_URL;

  async function fetchData() {
    try {
      const result = await axios.get(`${API}/transactions/${id}`);
      setTransactionObj(result.data);
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  function handleText(e) {
    setTransactionObj({ ...transactionObj, [e.target.id]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    async function updateData() {
      try {
        const result = await axios.put(
          `${API}/transactions/${id}`,
          transactionObj
        );

        setTransactionObj(result.data);
        navigate(`/transactions/${id}`);
      } catch (e) {
        console.log(e);
      }
    }

    updateData();
    // navigate(`/logs/${id}`);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center">Edit</h1>
      <form onSubmit={handleOnSubmit} className="w-50">
        <div className="mb-3">
          <label className="fs-5 fw-medium form-label" htmlFor="item_name">
            Item Name:
          </label>
          <input
            className="form-control"
            id="item_name"
            name="item_name"
            type="text"
            value={transactionObj.item_name}
            onChange={handleText}
          />
        </div>
        <div className="mb-3">
          <label className="fs-5 fw-medium form-label" htmlFor="date">
            Title
          </label>
          <input
            className="form-control"
            id="date"
            name="date"
            type="text"
            value={transactionObj.date}
            onChange={handleText}
          />
        </div>
        <div className="mb-3">
          <label className="fs-5 fw-medium form-label" htmlFor="amount">
            Amount
          </label>
          <input
            className="form-control"
            id="amount"
            name="amount"
            type="number"
            value={transactionObj.amount}
            onChange={handleText}
          />
        </div>
        <div className="mb-3">
          <label className="fs-5 fw-medium form-label" htmlFor="category">
            Category
          </label>
          <input
            className="form-control"
            id="category"
            name="category"
            type="text"
            value={transactionObj.category}
            onChange={handleText}
          />
        </div>
        <div className="mb-3">
          <label className="fs-5 fw-medium form-label" htmlFor="from">
            From
          </label>
          <input
            className="form-control"
            id="from"
            name="from"
            type="text"
            value={transactionObj.from}
            onChange={handleText}
          />
        </div>

        <input type="submit" className="btn btn-primary" />
      </form>
      <br />
      <Link to="/transactions">
        <button className="btn btn-secondary">Back</button>
      </Link>
    </div>
  );
}

export default EditTransaction;
