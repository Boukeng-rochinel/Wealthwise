import React, { useState } from "react";
import axios from "axios";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      // Perform the search
      const response = await axios.post("http://localhost:5000/users/search", {
        email: search,
      });

      // Update the search results state
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
      setError("Error searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search Users</h1>

      {/* Search Input */}
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter email to search"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Display Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Search Results */}
      <div>
        <h2>Search Results</h2>
        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <div key={user._id}>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
