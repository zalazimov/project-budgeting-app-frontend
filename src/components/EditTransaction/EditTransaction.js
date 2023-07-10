import React, { useState, useEffect } from "react";
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

  const [dates, setDates] = useState([]);

  function getDates() {
    const currentDate = new Date();
    const datesBeforeCurrent = [];
    for (let i = 0; i <= 90; i++) {
      const dateBefore = new Date();
      dateBefore.setDate(currentDate.getDate() - i);
      const formattedDate = dateBefore.toISOString().slice(0, 10);
      datesBeforeCurrent.push(formattedDate);
    }
    return datesBeforeCurrent;
  }

  const categoryOptions = [
    "Housing",
    "Transportation",
    "Income",
    "Food",
    "Utilities",
    "Clothing",
    "Medical/HealthCare",
    "Insurance",
    "Household Items",
    "Debt",
    "Personal",
    "Retirement",
    "Education",
    "Savings",
    "Gifts",
    "Entertainment",
  ];

  let url =
    process.env.NODE_ENV === "production"
      ? "https://project-budgeting-app-backend.onrender.com"
      : "http://localhost:3001";

  async function fetchData() {
    try {
      const result = await axios.get(`${url}/transactions/${id}`);
      setTransactionObj(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
    let dateArr = getDates();
    setDates(dateArr);
  }, [id]);

  function handleText(e) {
    setTransactionObj({ ...transactionObj, [e.target.id]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();

    async function updateData() {
      try {
        const result = await axios.put(
          `${url}/transactions/${id}`,
          transactionObj
        );
        setTransactionObj(result.data);
        navigate(`/transactions/${id}`);
      } catch (e) {
        console.log(e);
      }
    }

    updateData();
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
            Date
          </label>
          <select
            className="form-control"
            id="date"
            name="date"
            value={transactionObj.date}
            onChange={handleText}
          >
            {dates.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
          <select
            className="form-control"
            id="category"
            name="category"
            value={transactionObj.category}
            onChange={handleText}
          >
            <option value="">Select Category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
