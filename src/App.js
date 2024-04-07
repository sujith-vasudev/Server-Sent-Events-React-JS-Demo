import './App.css';
import Navbar from './Navbar/navbar'
import { Route, Routes } from 'react-router-dom';
import BasicSSELandingPage from "./Basic/basic_sse"
import Notification from './Notification/Notification';

import Home from './Home/Home';
import ListeningQueueUpdates from './QueueListening/view';

function App() {
console.log(process.env)
  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path='' element={ <Home/> }/>
          <Route path='basic' element={<BasicSSELandingPage/>}/> 
          <Route path='notification' element={<Notification/>}/>
          <Route path='pull_request' element={<ListeningQueueUpdates/>}/>

          <Route path="*" element= {<h2>Page not Found </h2>} />
      </Routes>
    </div>
  );
}

export default App;
