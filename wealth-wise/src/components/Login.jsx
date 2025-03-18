// Importing necessary libraries and components
import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom'; 
//import { storeAuthToken } from '../utils/auth.jsx';
//import axios from 'axios'; 

// Define the Login component
function Login() {
  // Initializing state variables
const [email, setEmail] =useState('');
const [password, setPassword] = useState('');

function handleSubmit(){

}
    


  // Render the login form component
  return (
    <div className = 'flex items-center justify-center flex-col bg-gray-100 min-h-screen' >
<h2 className='text-2xl text-gray-800 py-5 font-bold text-center'>Welcomee! back to WealthWise</h2>
<p  className='text-xl text-gray-800 py-5 font-bold text-center'>Gain financial literacy and Start your business!</p>
    <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
      <h2 className='font-medium text-blue-500 text-xl text-center'>Login</h2>

      
    {/*{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}*/}

      
      <form onSubmit={handleSubmit} className='p-4 mt-2' >
        <div>
          <label className='font-medium text-sm text-gray-700 block'>Email Adress :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-green-500 focus:border-green-500'
            required
          />
        </div>
        <div>
          <label className='font-medium text-sm text-gray-700 block'>Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-green-500 focus:border-green-500'
            required
          />
        </div>

        
        <button type="submit" 
        
        className='w-full mt-6 bg-green-500 text-white py-2 rounded-md hover:bg-blue-500'
        >
         Login
        </button>
      </form>
<div className='w-full max-w-md p-8 text-center'>
  <p>Do not have an account?  <Link to=""  className='text-blue-800 hover:text-green-300 hover:text-2xl'>Create account</Link></p>
</div>

    </div>
    </div>
  );
}


export default Login;
