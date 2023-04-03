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
  
  return (
    <div className="App">
      <Routing />
      <GoToTop />
      <ToastContainer autoclose={3000} />
    </div>
  );
}

export default App;
