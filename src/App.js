import React, {useEffect, useState, useContext} from 'react';
import Routing from './routes/Routes';
import GoToTop from './GoToTop';
import './App.scss';
import { useLocation } from 'react-router-dom';
import UserContext from './components/context/UserContext';
import axios from 'axios';
import { API } from './config/Api';


import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {image, name} = useContext(UserContext);
  const token = localStorage.getItem('Token')
  const location = useLocation();
  console.log('Current route:', location.pathname);
  useEffect(() => {
    setTimeout(() => {
      console.log('///////////////////////////////');
      const url = window.location.href;
      console.log(url);
      const queryString = url.split('?')[1];
      const urlParams = new URLSearchParams(queryString);
      const token = urlParams.get('shop');
      console.log(token);
      localStorage.setItem('shop_url', token)
      console.log('///////////////////////////////');
    }, 4000)
  }, [])
  console.log("NAMEEEEE", name)
  console.log("Image", image)
  return (
    <div className="App">
      <Routing />
      <GoToTop />
      <ToastContainer autoclose={3000} />
    </div>
  );
}

export default App;
