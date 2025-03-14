import { useState ,useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter,Routes,Route, useParams } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import Data from './Component/Data';
import Update from './Component/Update';
import LoginPage from './Component/LoginPage';
import SiderBar from './Component/SiderBar';
import './App.css'


function App() {
  

  return (
    <>
     <Routes>
     <Route path="/" element={<LoginPage />} />
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/Data' element={<Data/>}/>
      <Route path='/update/:id' element={<Update/>}/>
     </Routes>
    </>
  )
}

export default App
