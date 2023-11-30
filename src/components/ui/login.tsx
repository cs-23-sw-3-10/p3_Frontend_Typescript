import React, { useState } from 'react';
import './login.css';

const Login = () => {
//login page that takes in username and password and sends it to the backend
//if the username and password is correct, then it will redirect to the home page
//if the username and password is incorrect, then it will display an error message
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');




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
        setMessage('Username or password is incorrect');
        console.log("Det er det forkeret password");
        console.log(localStorage.getItem('auth_token'));
          // Handle HTTP errors
          setUsername('');
          setPassword('');
          
      }
      if(response.ok)
      {
        response.text().then(data => {
            localStorage.setItem('auth_token', data);
            console.log(localStorage.getItem('auth_token'));
            }); 
        setMessage('Login successful'); 
        console.log("login success"); 
        setUsername('');
        setPassword('');
      }
  })
  .catch(error => {
      // Handle any errors
      console.log("error");
        console.log(localStorage.getItem('auth_token'));
      console.error('There has been a problem with your fetch operation:', error);
      setUsername('');
      setPassword('');
  });
}
  

function handleLogout(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault();
  console.log(localStorage.getItem('auth_token'));
  localStorage.removeItem('auth_token');
  setMessage('Logout successful');
  //Handle successful logout here (e.g., redirect to login)
}


  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <p>{message}</p>
      <form>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={(e) => handleLogin(e)}>Login</button>
        {localStorage.getItem('auth_token') && <button onClick={(e)=> handleLogout(e)}> Logout </button>}
       
      </form>
    </div>
  )
}


export default Login;