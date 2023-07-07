import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar navbar-expand-lg bg-success-subtle">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <div className="nav-item">
              <Link className="nav-link" to="/transactions">
                <span className="fs-1 fw-light">
                  Budget<span className="fw-bold">Expert</span>
                </span>{" "}
                <span>by Zalman</span>
              </Link>
            </div>
          </div>
          <div className="navbar-nav ms-auto">
            <div className="nav-item">
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
