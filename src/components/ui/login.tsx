import React, { useState, useEffect } from 'react';
import './login.css';
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { GET_AUTHENTICATION_TOKEN } from '../../api/queryList';
import { CREATE_BP } from '../../api/mutationList';

const Login = () => {
//login page that takes in username and password and sends it to the backend
//if the username and password is correct, then it will redirect to the home page
//if the username and password is incorrect, then it will display an error message
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [getAuthToken, { loading, error, data }] = useLazyQuery(GET_AUTHENTICATION_TOKEN)



function handleLogin(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault();

  const credentials = btoa(`${username}:${password}`);

  localStorage.setItem('auth_token', '');
  try {
  
  getAuthToken({
    context: {
      headers: {
        Authorization: `Basic ${credentials}`
      }
    }
  }).then((error) => console.log(error.error));

  
    if (data) {
      console.log("Login success", data);
      localStorage.setItem('auth_token', data.authenticate);
      // Handle successful login here (e.g., redirect to home)
    }


  if (loading) console.log("Loading...");
  if (error) console.log("Wrong username or password");
}
catch (e) {
  console.log("Wrong username or passworddsd");
}
}

function handleLogout(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault();
  console.log(localStorage.getItem('auth_token'));
  console.log("Logout success");
  // Handle successful logout here (e.g., redirect to login)
}


  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <form>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={(e) => handleLogin(e)}>Login</button>
        <button onClick={(e)=> handleLogout(e)}> df </button>
      </form>
    </div>
  )
}


export default Login;