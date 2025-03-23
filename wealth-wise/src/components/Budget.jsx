import React, { useState } from "react";
import Sidebar from "./sidebar";
import Footer from "./footer";

function Budgeting() {
  // State management for sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // State management for budget form visibility
  const [showBudgetForm, setShowBudgetForm] = useState(false);

  // State management for savings goal form visibility
  const [showSavingsForm, setShowSavingsForm] = useState(false);

  // State management for budgets and savings goals
  const [budgets, setBudgets] = useState([]);
  const [savingsGoals, setSavingsGoals] = useState([]);

  // State management for balance
  const [balance, setBalance] = useState(0);

  // State management for errors
  const [error, setError] = useState("");

  // Function to handle budget form submission
  const handleBudgetSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const budget = {
      category: formData.get("category"),
      amount: parseFloat(formData.get("amount")),
      time: formData.get("time"),
    };

    // Validate input
    if (!budget.category || !budget.amount || !budget.time) {
      setError("Please fill out all fields.");
      return;
    }

    // Calculate balance (assuming balance is budget amount minus expenses)
    const expenses = 0; // You can add logic to calculate expenses
    const newBalance = budget.amount - expenses;
    setBalance(newBalance);

    // Send budget data to backend (simulated here)
    console.log("Budget data sent to backend:", budget);

    // Update budgets state
    setBudgets([...budgets, budget]);

    // Hide the form after submission
    setShowBudgetForm(false);
    setError("");
  };

  // Function to handle savings goal form submission
  const handleSavingsGoalSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const savingsGoal = {
      category: formData.get("category"),
      targetAmount: parseFloat(formData.get("targetAmount")),
      time: formData.get("time"),
    };

    // Validate input
    if (!savingsGoal.category || !savingsGoal.targetAmount || !savingsGoal.time) {
      setError("Please fill out all fields.");
      return;
    }

    // Send savings goal data to backend (simulated here)
    console.log("Savings goal data sent to backend:", savingsGoal);

    // Update savings goals state
    setSavingsGoals([...savingsGoals, savingsGoal]);

    // Hide the form after submission
    setShowSavingsForm(false);
    setError("");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      {sidebarVisible && (
        <Sidebar
          setSidebarVisible={setSidebarVisible}
          setShowBudgetForm={setShowBudgetForm}
          setShowSavingsForm={setShowSavingsForm}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Menu Button (visible when sidebar is hidden) */}
        {!sidebarVisible && (
          <button
            className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded hover:bg-gray-700 transition duration-300"
            onClick={() => setSidebarVisible(true)}
          >
            Menu
          </button>
        )}

        {/* Hero Section */}
        <section
          className="hero min-h-96 max-h-121 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-white text-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('save-and-read.jpeg')",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Background color with opacity
          }}
        >
          <h1 className="text-4xl font-bold mb-4 animate-bounce">Take control of your finances</h1>
          <h3 className="text-xl mb-8 animate-pulse">Track your income, expenses, and saving goals</h3>
          <div className="flex gap-4">
            <button
              onClick={() => setShowBudgetForm(true)} // First CTA: Leads to Budget Page
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            >
              Create Budget
            </button>
            <button
              onClick={() => setShowSavingsForm(true)} // Second CTA: Leads to Savings Page
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 transform hover:scale-105"
            >
              Set Savings Goal
            </button>
          </div>
        </section>

        {/* Budgeting Section */}
        <section className="budgeting mt-8">
          <div className="flex flex-row items-center">
            <div className="w-1/2">
              <img src="/src/assets/budget-sec.jpeg" alt="Budgeting" className="w-full h-auto rounded-lg transform hover:scale-105 transition duration-300" />
            </div>
            <div className="w-1/2 pl-8">
              <h1 className="text-2xl font-bold">Budgeting</h1>
              <p className="mt-4">Stop spending without counting, create a budget and keep track of your expenses.</p>
              {showBudgetForm ? (
                <form onSubmit={handleBudgetSubmit} className="mt-4 relative">
                  <button
                    type="button"
                    onClick={() => setShowBudgetForm(false)}
                    className="absolute top-0 right-0 text-red-500 text-xl hover:text-red-700 transition duration-300"
                  >
                    ✕
                  </button>
                  {/* Form fields for budget */}
                </form>
              ) : (
                <button
                  onClick={() => setShowBudgetForm(true)}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 transform hover:scale-105"
                >
                  Create Budget
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Savings Section */}
        <section className="savings mt-8">
          <div className="flex flex-row items-center">
            <div className="w-1/2 pr-8">
              <h1 className="text-2xl font-bold">Save and secure your future now</h1>
              {showSavingsForm ? (
                <form onSubmit={handleSavingsGoalSubmit} className="mt-4 relative">
                  <button
                    type="button"
                    onClick={() => setShowSavingsForm(false)}
                    className="absolute top-0 right-0 text-red-500 text-xl hover:text-red-700 transition duration-300"
                  >
                    ✕
                  </button>
                  {/* Form fields for savings goal */}
                </form>
              ) : (
                <button
                  onClick={() => setShowSavingsForm(true)}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 transform hover:scale-105"
                >
                  Create Goal
                </button>
              )}
            </div>
            <div className="w-1/2">
              <img src="/src/assets/savigs-sec.jpg" alt="Savings" className="w-full h-auto rounded-lg transform hover:scale-105 transition duration-300" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Budgeting;