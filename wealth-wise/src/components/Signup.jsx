import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
     const [loading, setLoading] = useState(false);

    const navigate = useNavigate();



    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
            setImage(file);
        } else {
            setError('Invalid image format. Please upload a JPG or PNG image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirmation) {
            setError('Passwords do not match!');
            return;
        }
        //come work here
        else if(whatsappNumber ){

        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);
        
        formData.append('whatsapp_number', whatsappNumber);
        if (image) formData.append('image', image);

        try {
            const response = await axios.post(
                'url/api/auth/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                    },
                }

            );

            if (response.status === 201 || response.status === 200) {
                const data = response.data
                localStorage.setItem('token', data.token)
                console.log('Registration successful:', data.user);

                const user = {name, password, userType};

                localStorage.setItem('user',JSON.stringify(user));

                navigate('/Home');

            }
        } catch (err) {
            console.error('Registration failed:', err.response?.data || err.message);
            const validationErrors = err.response?.data?.errors;
            setError(validationErrors ? Object.values(validationErrors).flat().join(' ') : 'Registration failed. Please try again.');
        }

        finally {
            // Set the loading status to false after the login process is complete
            setLoading(false);
          }
    };

    return(
        <div className='flex items-center justify-center flex-col bg-gray-100 min-h-screen'>
<div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
            <h2 className='text-2xl text-gray-800 py-5 font-bold text-center'>Welcome to Wealthwise!</h2>
            <p  className='text-xl text-gray-800 py-5 font-bold text-center'>Gain financial literacy and take control of your finances</p>


            <form onSubmit={handleSubmit} className='p-4 mt-2 '>
                <h3 className='font-medium text-blue-500 text-xl text-center'>Sign Up </h3>
                <label className='font-medium text-sm text-gray-700 block'>Name : </label><input
                    type='text'
                    placeholder='Enter your Name' value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-green-500 focus:border-green-500' required /><br />
                <label className='font-mediu text-sm text-gray-700 block'>Email: </label><input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-green-500 focus:border-green-500' required /><br />
                <label className='font-medium text-sm text-gray-700 block'>password:  </label><input
                    type='password'
                    placeholder='Password'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-green-500 focus:border-green-500' required /><br />
                <label className='font-medium text-sm text-gray-700 block'>confirm :  </label><input
                    type='password'
                    placeholder='Confirm your Password'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-green-500 focus:border-green-500' required /><br />
               

                <label className='font-medium text-sm text-gray-700 block'>Phone number: </label><input
                    type='text'
                    placeholder='WhatsApp Number'
                    value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)}
                    className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-green-500 focus:border-green-500' required /><br />
                <label className='font-medium text-sm text-gray-700 block'>Upload profile picture: </label>
                <br /><input

                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                    focus:ring-green-500 focus:border-green-500' /><br />
                <button
                    type='submit'
                    className='w-full mt-6 bg-green-500 text-white py-2 rounded-md hover:bg-blue-500'
                    disabled={loading}
                    >
                    
                    {loading ? 'Signing up...' : 'Register'}
                    Register</button>

{error && <div className='error'>{error}</div>}

            </form>
            </div>
            <div className='w-full max-w-md p-8 text-center'>
                <p>Already have an account?  <Link to="/Login" className='text-blue-800 hover:text-green-300 hover:text-2xl'>Login</Link></p>
            </div>
        </div>
        
        
    );
};

export default Signup;
