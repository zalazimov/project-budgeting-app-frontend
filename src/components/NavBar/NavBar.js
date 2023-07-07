import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar navbar-expand-lg bg-success-subtle">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <div className="nav-item">
              <Link className="nav-link" to="/logs">
                <span className="fs-1 fw-semibold">BudgetExpert</span>
              </Link>
            </div>
          </div>
          <div className="navbar-nav ms-auto">
            <div className="nav-item">
              <Link className="nav-link" to="/logs/new">
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
