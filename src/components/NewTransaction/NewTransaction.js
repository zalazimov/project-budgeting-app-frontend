import React from "react";
import { v4 } from "uuid";

function NewTransaction() {
  const id = v4().slice(0, 4);
  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
}

export default NewTransaction;
