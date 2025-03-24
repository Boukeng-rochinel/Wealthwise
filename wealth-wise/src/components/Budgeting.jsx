import { useState } from "react";
import React from "react";
//import { Add } from 'lucide-react'

function Budget() {
  const [budget, setBudget] = useState("");
  const [totalExpenses, setTotalExpenses] = useState("");
  const [expenses, setExpenses] = useState("");
  const [allocated, setAllocated] = useState("");

  function handleAddClick(e) {
    e.preventDefault;

    //Duplicate expenses and expenses amount
  }

  return (
    <div>
      <h1>Savings and Budgeting</h1>

      <p>
        Take charge of your finance now by creating a budget for your expenses
        and saving goals for future use
      </p>

      <button>Create budget</button>

      <div>
        <form>
          <label>Budget amount: </label>
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

          <h4> Set expenses and allocate fixed amount for each expenses.</h4>

          <label>Expenses: </label>

          <input
            type="text"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
          />
          <label>Amount allocated:</label>

          <input
            type="number"
            value={allocated}
            onChange={(e) => setAllocated(e.target.value)}
          />

          <button onClick={handleAddClick}>Add</button>
        </form>
        <p>Balance: {budget - totalExpenses}</p>
      </div>
    </div>
  );
}

export default Budget;
