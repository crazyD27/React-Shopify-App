import React, {useEffect, useState} from 'react';
import Routing from './routes/Routes';
import GoToTop from './GoToTop';
import './App.scss';



import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRenderCount((count) => count + 1);
    }, 3000); // re-render after 5 seconds

    return () => {
      clearTimeout(timeoutId);
    };
  }, [renderCount]);
  
  return (
    <div className="App">
      <Routing />
      <GoToTop />
      <ToastContainer autoclose={3000} />
    </div>
  );
}

export default App;
