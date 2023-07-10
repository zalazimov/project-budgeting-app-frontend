import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import piggyBankImage from "../../images/piggybank.png";

function NavBar() {
  const [totalBalance, setTotalBalance] = useState(0);
  const location = useLocation();

  // const API = process.env.REACT_APP_API_URL;
  // console.log(API);

  let url =
    process.env.NODE_ENV === "production"
      ? "https://project-budgeting-app-backend.onrender.com"
      : "http://localhost:3001";

  async function fetchData() {
    try {
      const result = await axios.get(`${url}/transactions`);

      let balance = 0;
      result.data.forEach((item) => {
        let formattedCategory = item.category.toLowerCase();

        if (formattedCategory !== "income") {
          balance -= parseFloat(item.amount);
        } else {
          balance += parseFloat(item.amount);
        }
      });
      setTotalBalance(balance.toFixed(2));
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [location]);

  return (
    <div className="navbar navbar-expand bg-success-subtle">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <div className="nav-item">
              <Link className="nav-link" to="/transactions">
                <span className="fs-1 fw-light">
                  Budget<span className="fw-bold">Expert</span>
                </span>
                <img
                  src={piggyBankImage}
                  alt="Piggy Bank"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "2rem" }}
                />
              </Link>
            </div>
          </div>
          <div className="navbar-nav ms-auto">
            <div className="nav-item">
              <h4 className="mt-2 ">
                Current total balance:
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
              </h4>
            </div>
          </div>
          <div className="navbar-nav ms-auto">
            <div className="nav-item-sm">
              <Link className="nav-link" to="/transactions/new">
                <button className="button mt-2 btn btn-outline-dark btn-lg">
                  NEW TRANSACTION
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
