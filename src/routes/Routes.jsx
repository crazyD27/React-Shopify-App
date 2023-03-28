import { Routes, Route } from 'react-router-dom';
import Home from '../components/home/Home';
import SideBar from '../components/sidebar/Sidebar';

const Routing = () => {
  return (
      
    <div className="routes">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<SideBar />} />
      </Routes>
    </div>
  );
}

export default Routing;