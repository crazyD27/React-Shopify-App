import React, {useEffect, useState} from 'react';
import Routing from './routes/Routes';
import GoToTop from './GoToTop';
import './App.scss';

import {useAppBridge} from "@shopify/app-bridge-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const bridge = useAppBridge();
  const shopUrl = bridge.hostOrigin.replace('https://', '').replace('www.', '');
  console.log("shopUrl" ,shopUrl);
  
  return (
    <div className="App">
      <Routing />
      <GoToTop />
      <ToastContainer autoclose={3000} />
    </div>
  );
}

export default App;
