import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchusers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data.data;
      console.log(users);
      console.log(response.data.message);
      setUsers(users);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchusers();
  }, []);

  const DeleteHandler = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/users/${id}`);
      console.log(response);
      console.log(response.data.message);
      if (!id) {
        console.log("user not Found");
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch {
      console.log("Error deleting user");
    }
  };

  const searchItem = async (search) => {
    try {
      const response = await axios.post("http://localhost:5000/users/search", {
        email: search,
      });
      if (!response.data.length) {
        console.log("User not found");
      }
      console.log(response.data);
    } catch {
      console.log("Error finding user");
    }
  };

  return (
    <>
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          users.map((user, index) => (
            <React.Fragment key={index}>
              <div>{user.email}</div>
              <div>{user.password}</div>
              <button
                className="btn btn-primary"
                onClick={() => DeleteHandler(user._id)}
              >
                Delete
              </button>
            </React.Fragment>
          ))
        )}
      </div>
      <div>
        <input
          type="email"
          value={search}
          placeholder="Search by email"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button
          onClick={() => {
            searchItem(search);
          }}
          className="btn btn-primary"
        >
          search
        </button>
      </div>
    </>
  );
}

export default Home;
