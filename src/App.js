import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import ListTransactions from "./components/ListTransactions/ListTransactions";
import "./App.css";
import ShowTransactionDetails from "./components/ShowTransactionDetails/ShowTransactionDetails";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/transactions" element={<ListTransactions />} />
          <Route
            path="/transactions/:id"
            element={<ShowTransactionDetails />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
