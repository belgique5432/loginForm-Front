import './App.css'
import { useState } from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import party from './assets/party.webp'
import { API_URL } from './config';

console.log("API_URL:", API_URL);

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch(`https://loginform-back.onrender.com/token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Token:', data.access_token);
        navigate('/Dashboard');
        
      } else {
        setErrorMsg(data.detail)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center  text-gray-500'>


        <form action="" onSubmit={handleSubmit} className='flex flex-col justify-center text-red mt-5 bg-white rounded p-5 max-w-sm w-full'>
          <h2 className='text-2xl'>Join Session</h2>
          <label htmlFor="" className='mt-3 self-start'>Enter User</label>
          <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Enter User' className=' mt-3 bg-gray-200 rounded'/>
          <label htmlFor="" className='mt-3 self-start'>Enter Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password' className=' mt-3 bg-gray-200 rounded'/>
          <button type='submit' className='mt-5 bg-blue-500 text-white rounded'>Join</button>
                   {errorMsg && (
            <div className=''>
              {errorMsg}
            </div>
          )}
           <button className='text-blue-600 mt-5' onClick={() => navigate('/')}>Or Register</button>
        </form>

      </div>

    </>
  )
}

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      user_name : username,
      password: password,
    }

    try {
      const response = await fetch(`https://loginform-back.onrender.com/create_user`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/Login');
        
      } else {
        if (Array.isArray(data.detail) && data.detail[0]?.msg) {
          setErrorMsg(data.detail[0].msg);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

    return (
    <>
      <div className='flex flex-col justify-center items-center  text-gray-500'>
        <form action="" onSubmit={handleSubmit} className='flex flex-col justify-center text-red mt-5 bg-white rounded p-5 max-w-sm w-full'>
          <h2 className='text-2xl'>Register</h2>
          <label htmlFor="" className='mt-3 self-start'>Enter User</label>
          <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Enter User' className=' mt-3 bg-gray-200 rounded'/>
          <label htmlFor="" className='mt-3 self-start'>Enter Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Password' className=' mt-3 bg-gray-200 rounded'/>
          <button type='submit' className='mt-5 bg-blue-500 text-white rounded'>Join</button>
          {errorMsg && (
            <div className=''>
              {errorMsg}
            </div>
          )}
                  <button className='text-blue-600 mt-5' onClick={() => navigate('/Login')}>Or Log In</button>
        </form>

      </div>
    </>
  )
}

function Dashboard() {
  return <>
<div className='w-full max-w-2xl mx-auto flex flex-col justify-center items-center h-60 bg-gray-100 rounded-lg p-4'>
  <div className='flex justify-center flex-col w-full md:w-3/4 bg-white rounded-lg h-40 shadow-md p-4 relative'>
    <h1 className='text-xl font-semibold text-center mb-4'>
      Felicidades, iniciaste sesión
    </h1>
    <img 
      className='absolute -bottom-4 right-4 w-16 h-16 rounded-full border-2 border-yellow-400'
      src={party} 
      alt="Celebración" 
    />
  </div>
</div>

  
  </>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />}/>
        <Route path='/Login' element={<LoginForm />}/>
        <Route path='/Dashboard' element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}