import React, {useEffect, useState} from 'react';
import Routing from './routes/Routes';
import GoToTop from './GoToTop';
import './App.scss';

import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const currentUrl = new URL(window.location.href);
  const baseUrl = currentUrl.origin
  console.log(currentUrl)
  console.log(baseUrl);
  const createNewCampaign = (e) => {
    axios.post('https://api.myrefera.com/campaign/get/token/', {
      shop_name: baseUrl,
    },)
    .then(function (response) {
    console.log("Get Token", response);
    localStorage.setItem("token",response.data.token)
    })
    .catch(function (error) {
    console.log(error);
    })
  }

  useEffect(() => {
    if(localStorage.getItem("token") !=null || undefined || "") {
      createNewCampaign()
    }
  }, [])
  return (
    <div className="App">
      <Routing />
      <GoToTop />
      <ToastContainer autoclose={3000} />
    </div>
  );
}

export default App;
