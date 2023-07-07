import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ShowTransactionDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [singleTransaction, setSingleTransaction] = useState(null);
  const API = process.env.REACT_APP_API_URL;
  // console.log(API);

  useEffect(() => {
    fetchDataObj();
  }, []);

  async function fetchDataObj() {
    try {
      const result = await axios.get(`${API}/transactions/${id}`);
      setSingleTransaction(result.data);
      console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  function handleDeleteOnClick() {
    async function deleteData() {
      try {
        const result = await axios.delete(`${API}/transactions/${id}`);
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
      <h1 className="text-center mt-5"></h1>

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
    // <div className="container">
    //   <h1 className="text-center mt-5">Show Transaction</h1>

    //   <div className="card text-center mx-auto mt-5" style={{ width: "18rem" }}>
    //     <div className="card-body">
    //       <div>
    //         <h5>Item Name: {singleTransaction.item_name}</h5>

    //         <h5>Date: {singleTransaction.date}</h5>
    //         <h5>Amount: ${singleTransaction.amount}</h5>
    //         <h5>Category: {singleTransaction.category}</h5>
    //         <h5>From: {singleTransaction.from}</h5>
    //       </div>

    //       <div className="d-flex justify-content-between mt-3">
    //         <Link to="/transactions">
    //           <button className="btn btn-primary">Back</button>
    //         </Link>
    //         <Link to={`/logs/${id}/edit`}>
    //           <button className="btn btn-warning">Edit</button>
    //         </Link>
    //         <button className="btn btn-danger" onClick={handleDeleteOnClick}>
    //           Delete
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ShowTransactionDetails;
// {
// return (
//   <div className="transaction-container">
//     <div>
//       <h2>Show Transaction</h2>
//       <div className="transaction-container-content">
//         <p>Some date</p>
//         <p>Some item name</p>
//         <p>Some amount</p>
//         <p>From</p>
//         <p>Some category</p>
//       </div>
//       <div className="transaction-container-navigation">
//         <ul>
//           <li>
//             <button>Back</button>
//           </li>
//           <li>
//             <button>Edit</button>
//           </li>
//           <li>
//             <button>Delete</button>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </div>
// );
// }
