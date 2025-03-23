import React, { useState, useEffect } from "react";
import axios from "axios";


function Budget(){
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ name: "", amount: 0 });
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [monthlyBudgets, setMonthlyBudgets] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all budgets
  const fetchBudgets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("url/api/budgets");
      setBudgets(response.data);
    } catch (error) {
      setError("Failed to fetch budgets. Please try again later.");
      console.error("Error fetching budgets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch budgets for a specific month
  const fetchMonthlyBudgets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/budgets/monthly/${year}/${month}");
      setMonthlyBudgets(response.data);
    } catch (error) {
      setError("Failed to fetch monthly budgets. Please try again later.");
      console.error("Error fetching monthly budgets:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new budget
  const createBudget = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/budgets", newBudget);
      setBudgets([...budgets, response.data]);
      setNewBudget({ name: "", amount: 0 }); // Reset form
    } catch (error) {
      setError("Failed to create budget. Please try again later.");
      console.error("Error creating budget:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update a budget
  const updateBudget = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/budgets/${selectedBudget.id}`, selectedBudget);
      setBudgets(budgets.map(b => (b.id === selectedBudget.id ? response.data : b)));
      setSelectedBudget(null); // Reset selected budget
    } catch (error) {
      setError("Failed to update budget. Please try again later.");
      console.error("Error updating budget:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a budget
  const deleteBudget = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/budgets/${id}`);
      setBudgets(budgets.filter(b => b.id !== id));
    } catch (error) {
      setError("Failed to delete budget. Please try again later.");
      console.error("Error deleting budget:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all budgets on component mount
  useEffect(() => {
    fetchBudgets();
  }, []);

  // Fetch monthly budgets when month or year changes
  useEffect(() => {
    fetchMonthlyBudgets();
  }, [month, year]);

  return (
    <div>
      <h1>Budget Management</h1>

      {/* Display error messages */}
      {error && <div style={{ color: "red", margin: "10px 0" }}>{error}</div>}

      {/* Loading indicator */}
      {loading && <div>Loading...</div>}

      {/* Create Budget Form */}
      <div>
        <h2>Create New Budget</h2>
        <input
          type="text"
          placeholder="Budget Name"
          value={newBudget.name}
          onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newBudget.amount}
          onChange={(e) => setNewBudget({ ...newBudget, amount: parseFloat(e.target.value) })}
        />
        <button onClick={createBudget} disabled={loading}>
          Create Budget
        </button>
      </div>

      {/* List of All Budgets */}
      <div>
        <h2>All Budgets</h2>
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id}>
              {budget.name} - ${budget.amount}
              <button onClick={() => setSelectedBudget(budget)} disabled={loading}>
                Edit
              </button>
              <button onClick={() => deleteBudget(budget.id)} disabled={loading}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Budget Form */}
      {selectedBudget && (
        <div>
          <h2>Edit Budget</h2>
          <input
            type="text"
            value={selectedBudget.name}
            onChange={(e) => setSelectedBudget({ ...selectedBudget, name: e.target.value })}
          />
          <input
            type="number"
            value={selectedBudget.amount}
            onChange={(e) => setSelectedBudget({ ...selectedBudget, amount: parseFloat(e.target.value) })}
          />
          <button onClick={updateBudget} disabled={loading}>
            Update Budget
          </button>
          <button onClick={() => setSelectedBudget(null)} disabled={loading}>
            Cancel
          </button>
        </div>
      )}

      {/* Monthly Budgets */}
      <div>
        <h2>Monthly Budgets</h2>
        <div>
          <label>Year: </label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
          <label>Month: </label>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          />
        </div>
        <ul>
          {monthlyBudgets.map((budget) => (
            <li key={budget.id}>
              {budget.name} - ${budget.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Budget;