import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { v4 } from "uuid";

function NewTransaction() {
  const navigate = useNavigate();
  //   const [dates, setDates] = useState([]);

  const id = v4().slice(0, 4);
  const [transactionObj, setTransactionObj] = useState({
    id: id,
    item_name: "",
    amount: "",
    date: "",
    from: "",
    category: "",
  });

  const API = process.env.REACT_APP_API_URL;

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

  //   function getDates() {
  // Get the current date and time
  const currentDate = new Date();
  // Create an array to store the dates
  const datesBeforeCurrent = [];
  // Loop to generate 30 dates before the current date
  for (let i = 1; i <= 60; i++) {
    // Get the date i days before the current date
    const dateBefore = new Date(currentDate);
    dateBefore.setDate(currentDate.getDate() - i);

    // Add the date to the array
    datesBeforeCurrent.push(dateBefore);
  }
  // Output the array of dates
  // console.log(datesBeforeCurrent); // array data type
  // return datesBeforeCurrent;

  //   setDates(getDates());

  function handleText(e) {
    setTransactionObj({ ...transactionObj, [e.target.id]: e.target.value });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    async function newData() {
      try {
        await axios
          .post(`${API}/transactions`, transactionObj)
          .then((result) => navigate(`/transactions/${result.data.data.id}`));

        // setTransactionObj(result.data);
        // console.log(transactionObj);
      } catch (e) {
        console.log(e);
      }
    }

    newData();
    // navigate(`/transactions/${id}`);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="text-center mt-3">New Transaction</h3>
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
            {datesBeforeCurrent.map((option, index) => (
              <option key={index} value={JSON.stringify(option).slice(1, 11)}>
                {/* {option} */}
                {JSON.stringify(option).slice(1, 11)}
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

export default NewTransaction;
