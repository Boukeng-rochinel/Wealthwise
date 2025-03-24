import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//import { storeAuthToken } from '../utils/auth.jsx';
import axios from "axios";

// Define the Login component
function Login() {
  // Initializing state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Make a POST request to the login API endpoint with the email and password
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      // // Check if the response contains an authentication token
      if (response.status === 200) {
        const data = response.data;
        // Store the authentication token using the custom utility function
        localStorage.getItem(data.token);
        console.log(data.user);

        // Navigate to the protected dashboard route
        navigate("/Home");
      }
    } catch (error) {
      // Handle any errors that occur during the login process
      if (error.response) {
        // Set the error message to the error response data
        setErrorMessage(
          error.response.data.message || "Invalid email or password."
        );
        console.error(error.message);
      } else {
        // Set a generic error message if no error response data is available
        setErrorMessage("An error occurred.");
        console.log("error occured.");
      }
    } finally {
      // Set the loading status to false after the login process is complete
      setLoading(false);
    }
  };

  // Render the login form component
  return (
    <div className="flex items-center justify-center flex-col bg-gray-100 min-h-screen">
      <h2 className="text-2xl text-gray-800 py-5 font-bold text-center">
        Welcomee! back to 'Wealthwise'
      </h2>
      <p className="text-xl text-gray-800 py-5 font-bold text-center">
        Gain financial literacy and start your business!
      </p>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="font-medium text-blue-500 text-xl text-center">
          Login now
        </h2>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="p-4 mt-2">
          <div>
            <label className="font-medium text-sm text-gray-700 block">
              Email Adress :
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          <div>
            <label className="font-medium text-sm text-gray-700 block">
              Password :
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-green-500 text-white py-2 rounded-md hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="w-full max-w-md p-8 text-center">
          <p>
            Do not have an account?{" "}
            <Link
              to="/Signup"
              className="text-blue-800 hover:text-green-300 hover:text-2xl"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
