import './index.css';
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
render(<App />, document.getElementById("root"));

// setLoding(true);
    // try {
    //   const data = {  
    //     username: email,
    //     password: password,
    //   }
    //   const response = await axios.post(`${Api_Url}login/`, data);
    //   localStorage.setItem('isLogged', response.data.user.id);
    //   navigate('/accueil');
    // } catch (error) {
    //   console.error('Login error:', error);
    //   // alert('An error occurred. Please try again.');
    // } finally {
    //   setLoding(false);
    // }