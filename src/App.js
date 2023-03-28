
import Routing from './routes/Routes';
import GoToTop from './GoToTop';
import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js"

function App() {
  return (
    <div className="App">
      <Routing />
      <GoToTop />
    </div>
  );
}

export default App;
