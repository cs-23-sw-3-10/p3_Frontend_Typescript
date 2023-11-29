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




function handleLogin(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault();

  const body = {
    username: username,
    password: password
  }

 
    fetch('http://localhost:8080/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (!response.ok) {
          // Handle HTTP errors
          throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.text(); // or response.json() if your server responds with JSON
  })
  .then(data => {
      // Handle the response data
      console.log("login success"); 
      localStorage.setItem('auth_token', data);
      // You might want to store the token in localStorage or sessionStorage
  })
  .catch(error => {
      // Handle any errors
      console.error('There has been a problem with your fetch operation:', error);
  });
}
  

function handleLogout(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault();
  console.log(localStorage.getItem('auth_token'));
  console.log("Logout success");
  //Handle successful logout here (e.g., redirect to login)
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