import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [userDetails, setUserDetails] = useState({
    // must match name of form inputs
    userName: '',
    userEmail: ''
  });
  useEffect(() => {
    getApi();
    console.log("Page Loaded");
  }, [])
  const getApi = async () => {
    const res = await axios.get('/results');
    console.log(res.data);
    setUserDetails({
      name: res.data.name,
      city: res.data.city,
      age: res.data.age
    })
  }
  const setData = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    })
  }
  const submitForm = async (e) => {
    // stops page from reloading
    e.preventDefault();
    console.log("inside submitForm");
    // stringify converts js to json form for backend
    const body = JSON.stringify({
      // must match backend names
      userName: userDetails.userName,
      userEmail: userDetails.userEmail
    });
    // so browser knows sending from front end to backend
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post("/register", body, config);
    console.log(res.data.result);
  }
  return (
    <div className="App">
      <h1>Hello from React</h1>
      {/* <h4>Name: {userDetails.name}</h4>
      <h4>City: {userDetails.city}</h4>
      <h4>Age: {userDetails.age}</h4> */}
      {/* no need for action/method in react forms axios takes care of this */}
      <form>
        <input type='text' name='userName' onChange={setData}/>
        <input type='email' name='userEmail' onChange={setData}/>
        <button type='submit' onClick={submitForm}>Register</button>
      </form>
    </div>
  );
}
export default App;