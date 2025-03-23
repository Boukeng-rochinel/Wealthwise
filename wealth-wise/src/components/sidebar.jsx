import React from "react";

const Sidebar = ({ setSidebarVisible, setShowBudgetForm, setShowSavingsForm }) => {
  return (
    <div className="sidebar bg-gray-800 text-white w-64 min-h-screen p-4 transform transition-transform duration-300 ease-in-out">
      <button
        className="absolute top-2 right-2 text-white hover:text-red-500 transition duration-300"
        onClick={() => setSidebarVisible(false)}
      >
        ✕
      </button>
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <ul>
        <li className="mb-2">
          <button
            onClick={() => setShowBudgetForm(true)}
            className="hover:bg-blue-500 p-2 rounded transition duration-300"
          >
            Create Budget
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setShowSavingsForm(true)}
            className="hover:bg-green-500 p-2 rounded transition duration-300"
          >
            Create Savings Goal
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setShowBudgetForm(false)}
            className="hover:bg-blue-500 p-2 rounded transition duration-300"
          >
            View Budgets
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={() => setShowSavingsForm(false)}
            className="hover:bg-green-500 p-2 rounded transition duration-300"
          >
            View Savings Goals
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;