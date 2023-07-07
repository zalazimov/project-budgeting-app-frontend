import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link
        className="text-decoration-none text-body-tertiary"
        to="/transactions"
      >
        <h2 className="text-center mt-5">
          <span className="fw-lighter">Welcome to </span>
          <span className="fw-light">Budget</span>
          <span className="fw-bold">Expert</span>
          <br />
          <span className="fw-light fs-6">by Zalman</span>
        </h2>
      </Link>
    </div>
  );
}

export default Home;
